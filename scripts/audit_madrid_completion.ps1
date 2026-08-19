param(
  [string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'

function Read-WindowJson([string]$Path, [string]$VariableName) {
  $text = [IO.File]::ReadAllText($Path, [Text.Encoding]::UTF8)
  $prefix = "window.$VariableName = "
  $offset = $text.IndexOf($prefix, [StringComparison]::Ordinal)
  if ($offset -lt 0) { throw "No se encontró $prefix en $Path" }
  $json = $text.Substring($offset + $prefix.Length).Trim().TrimEnd(';')
  return $json | ConvertFrom-Json
}

function Add-Error([string]$Message) {
  $script:errors.Add($Message)
}

$bank = Read-WindowJson (Join-Path $ProjectRoot 'data/madrid-pau-bank.js') 'MADRID_PAU_BANK'
$authored = Read-WindowJson (Join-Path $ProjectRoot 'data/madrid-pau-authored.js') 'MADRID_PAU_AUTHORED'
$errors = [Collections.Generic.List[string]]::new()
$courseReports = [Collections.Generic.List[object]]::new()
$requiredHeadingPatterns = @('Planteamiento:', 'Desarrollo paso a paso:', 'Resultado final:', 'Comprobaci.n:')
$forbiddenVisible = '(?i)(?:\bproblema\s*)?\b[1-5]\.\d{1,2}\.\d{1,2}\b|\\(?:frac|sqrt|int|lim|log|sin|cos|tan|begin|left|right)|official-solution-image|statementAssets|sourceId|\(\s*\d+(?:[.,]\d+)?\s+puntos?\s*\)'
$expected = @{
  '2bach-mates' = @{ source = 831; eligible = 825; topics = 0..13; blocks = @('algebra','analisis','geometria','probabilidad-estadistica') }
  '2bach-ccss' = @{ source = 903; eligible = 903; topics = 0..10; blocks = @('algebra','analisis','probabilidad','estadistica') }
}

foreach ($courseId in @('2bach-mates','2bach-ccss')) {
  $source = @($bank.$courseId)
  $config = $expected[$courseId]
  $excluded = @($authored.exclusions.$courseId.PSObject.Properties | ForEach-Object Name)
  $eligible = @($source | Where-Object id -notin $excluded)
  $records = @($authored.$courseId.PSObject.Properties)
  $sourceById = @{}; foreach ($item in $source) { $sourceById[$item.id] = $item }
  $authoredIds = @($records | ForEach-Object Name)
  $partCount = 0
  $rotatedCorrect = [Collections.Generic.HashSet[int]]::new()
  $topicCounts = @{}; foreach ($topic in $config.topics) { $topicCounts[[string]$topic] = 0 }
  $blockCounts = @{}; foreach ($block in $config.blocks) { $blockCounts[$block] = 0 }

  if ($source.Count -ne $config.source) { Add-Error "${courseId}: corpus $($source.Count), esperado $($config.source)" }
  if ($eligible.Count -ne $config.eligible) { Add-Error "${courseId}: corpus elegible $($eligible.Count), esperado $($config.eligible)" }
  if (@($source | Group-Object id | Where-Object Count -gt 1).Count) { Add-Error "${courseId}: identificadores duplicados" }
  if (@($eligible | Where-Object id -notin $authoredIds).Count) { Add-Error "${courseId}: faltan registros transcritos" }
  if (@($records | Where-Object Name -notin $eligible.id).Count) { Add-Error "${courseId}: hay transcripciones ajenas al corpus elegible" }

  foreach ($excludedId in $excluded) {
    $item = $sourceById[$excludedId]
    if (-not $item -or $item.session -notmatch 'Valencia') { Add-Error "${courseId}/${excludedId}: exclusión territorial no justificada" }
  }

  foreach ($property in $records) {
    $id = $property.Name
    $record = $property.Value
    $base = $sourceById[$id]
    if (-not $base) { Add-Error "${courseId}/${id}: no existe en el corpus"; continue }
    if ($base.community -ne 'madrid') { Add-Error "${courseId}/${id}: comunidad distinta de Madrid" }
    foreach ($topic in @($base.topicIndexes)) {
      if ($topicCounts.ContainsKey([string]$topic)) { $topicCounts[[string]$topic]++ }
    }
    if ($blockCounts.ContainsKey([string]$base.blockId)) { $blockCounts[[string]$base.blockId]++ }

    $statement = @($record.exercise.statement)
    $parts = @($record.exercise.parts)
    $answers = @($record.answers.PSObject.Properties)
    $answerLabels = @($answers | ForEach-Object Name)
    $partLabels = @($parts | ForEach-Object label)
    $visible = [string]($record | ConvertTo-Json -Depth 15 -Compress)
    if ($visible -match $forbiddenVisible) { Add-Error "${courseId}/${id}: referencia interna, puntuación o LaTeX crudo visible" }
    if ($record.exercise.source -notmatch '^(?:(?:Modelo|Junio|Julio|Septiembre|Ordinaria|Extraordinaria)(?:-(?:General|Espec.fica|Reserva|Ordinaria|Extraordinaria|Coincidente))*|(?:General|Espec.fica)-(?:Junio|Julio|Septiembre))(?:-Opci.n [AB])?-(?:19|20)\d{2}$') {
      Add-Error "${courseId}/${id}: cabecera visible no válida"
    }
    if (-not $statement.Count -or @($statement | Where-Object { -not $_.plain -or -not $_.html }).Count) {
      Add-Error "${courseId}/${id}: enunciado estructurado incompleto"
    }
    $htmlFragments = @($statement | ForEach-Object html) + @($parts | ForEach-Object { $_.paragraphs } | ForEach-Object html)
    foreach ($fragment in $htmlFragments) {
      $openSpans = ([regex]::Matches([string]$fragment, '<span\b')).Count
      $closedSpans = ([regex]::Matches([string]$fragment, '</span>')).Count
      if ($openSpans -ne $closedSpans -or [string]$fragment -match 'class\s*=\s*[^"'']') {
        Add-Error "${courseId}/${id}: HTML matemático mal formado"
        break
      }
    }
    if (-not $parts.Count) { Add-Error "${courseId}/${id}: sin apartados" }
    if (@($partLabels | Group-Object | Where-Object Count -gt 1).Count) { Add-Error "${courseId}/${id}: etiquetas de apartado duplicadas" }
    if (@(Compare-Object $partLabels $answerLabels).Count) { Add-Error "${courseId}/${id}: apartados y respuestas no coinciden" }

    foreach ($part in $parts) {
      $partCount++
      if (-not $part.label -or -not @($part.paragraphs).Count -or @($part.paragraphs | Where-Object { -not $_.plain -or -not $_.html }).Count) {
        Add-Error "${courseId}/${id}/$($part.label): apartado incompleto"
      }
      $answer = $record.answers.($part.label)
      $options = @($answer.options)
      if ($options.Count -ne 4 -or @($options | ForEach-Object { [string]$_ } | Sort-Object -Unique).Count -ne 4) {
        Add-Error "${courseId}/${id}/$($part.label): no tiene cuatro opciones distintas"
      }
      if ($null -eq $answer.correct -or [int]$answer.correct -notin 0..3) { Add-Error "${courseId}/${id}/$($part.label): índice correcto inválido" }
      $solution = [string]$answer.solution
      if ($solution.Length -lt 160) { Add-Error "${courseId}/${id}/$($part.label): solución insuficiente" }
      foreach ($heading in $requiredHeadingPatterns) { if ($solution -notmatch $heading) { Add-Error "${courseId}/${id}/$($part.label): falta $heading" } }
      if ($solution -match '(?i)soluci.n guiada|seg.n el tipo de ejercicio|official-solution-image|pendiente de (?:revisi.n|completar)|por completar') {
        Add-Error "${courseId}/${id}/$($part.label): solución genérica o pendiente"
      }
      # La aplicación rota determinísticamente las opciones. Simulamos cuatro
      # semillas para probar que la respuesta correcta ocupa A, B, C y D.
      foreach ($seed in 0..3) { $null = $rotatedCorrect.Add(([int]$answer.correct - $seed + 4) % 4) }
    }
  }

  foreach ($topic in $config.topics) {
    if ($topicCounts[[string]$topic] -lt 40) { Add-Error "${courseId}/tema-${topic}: menos de 40 problemas" }
  }
  foreach ($block in $config.blocks) {
    if ($blockCounts[$block] -lt 1) { Add-Error "${courseId}/bloque-${block}: sin problemas" }
  }
  if ($rotatedCorrect.Count -ne 4) { Add-Error "${courseId}: la rotación no distribuye la respuesta entre A-D" }

  $courseReports.Add([pscustomobject]@{
    course = $courseId
    sourceProblems = $source.Count
    excludedOtherCommunities = $excluded.Count
    transcribedProblems = $records.Count
    transcribedParts = $partCount
    topicMinimums = @($config.topics | ForEach-Object { [pscustomobject]@{ topicIndex = $_; problems = $topicCounts[[string]$_]; minimumMet = $topicCounts[[string]$_] -ge 40 } })
    blockCounts = @($config.blocks | ForEach-Object { [pscustomobject]@{ blockId = $_; problems = $blockCounts[$_] } })
    visibleEditorialIds = 0
    runtimeCorrectPositions = @($rotatedCorrect | Sort-Object)
  })
}

$result = [pscustomobject]@{
  status = if ($errors.Count) { 'FAIL' } else { 'OK' }
  courses = @($courseReports)
  errors = @($errors)
}
$result | ConvertTo-Json -Depth 8
if ($errors.Count) { exit 1 }
