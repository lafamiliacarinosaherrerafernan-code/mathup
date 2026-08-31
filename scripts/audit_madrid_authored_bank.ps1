param(
  [string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'

function Read-AssignedJson([string]$Path, [string]$Assignment) {
  $content = [IO.File]::ReadAllText($Path, [Text.Encoding]::UTF8)
  $prefix = "window.$Assignment = "
  $start = $content.IndexOf($prefix, [System.StringComparison]::Ordinal)
  if ($start -lt 0) { throw "No se encontró $prefix en $Path" }
  $json = $content.Substring($start + $prefix.Length).Trim()
  if ($json.EndsWith(';')) { $json = $json.Substring(0, $json.Length - 1) }
  return $json | ConvertFrom-Json
}

function Test-MadridExamEligible([string]$CourseId, $Exercise) {
  $topics = @($Exercise.topicIndexes)
  if ($CourseId -eq '2bach-mates') {
    return $Exercise.blockId -in @('algebra', 'analisis', 'geometria', 'probabilidad-estadistica')
  }
  if ($Exercise.blockId -eq 'algebra') { return @($topics | Where-Object { $_ -in @(0, 1, 2, 3) }).Count -gt 0 }
  if ($Exercise.blockId -eq 'analisis') { return @($topics | Where-Object { $_ -in @(4, 5, 6, 7) }).Count -gt 0 }
  if ($Exercise.blockId -in @('probabilidad', 'estadistica')) { return @($topics | Where-Object { $_ -in @(8, 9, 10) }).Count -gt 0 }
  return $false
}

$bank = Read-AssignedJson (Join-Path $ProjectRoot 'data/madrid-pau-bank.js') 'MADRID_PAU_BANK'
$authored = Read-AssignedJson (Join-Path $ProjectRoot 'data/madrid-pau-authored.js') 'MADRID_PAU_AUTHORED'
$errors = [System.Collections.Generic.List[string]]::new()
$counts = [ordered]@{}
$minimumPerTopic = 40

foreach ($courseId in @('2bach-mates', '2bach-ccss')) {
  $sourceRecords = @($bank.$courseId)
  $excludedProperties = @($authored.exclusions.$courseId.PSObject.Properties | Where-Object { $_ -and $_.Name })
  $excludedIds = @($excludedProperties | ForEach-Object { $_.Name })
  foreach ($excludedProperty in $excludedProperties) {
    $excludedRecord = @($sourceRecords | Where-Object { $_.id -eq $excludedProperty.Name })
    if ($excludedRecord.Count -ne 1) {
      $errors.Add("$courseId/$($excludedProperty.Name): exclusión sin registro único en el corpus")
    } elseif ($excludedRecord[0].session -notmatch 'Valencia') {
      $errors.Add("$courseId/$($excludedProperty.Name): exclusión de comunidad no justificada")
    }
  }
  $baseRecords = @($sourceRecords | Where-Object { $_.id -notin $excludedIds })
  $baseById = @{}
  foreach ($base in $baseRecords) { $baseById[$base.id] = $base }
  $courseAuthored = $authored.$courseId
  $properties = @($courseAuthored.PSObject.Properties)
  $authoredIds = @($properties | ForEach-Object { $_.Name })
  $missingIds = @($baseRecords | Where-Object { $_.id -notin $authoredIds } | ForEach-Object { $_.id })
  $valid = 0
  $authoredByTopic = @{}
  $topicRouted = 0
  $blockRouted = 0
  $examRouted = 0

  foreach ($property in $properties) {
    $id = $property.Name
    $record = $property.Value
    if (-not $baseById.ContainsKey($id)) {
      $errors.Add("$courseId/$id no existe en el corpus oficial")
      continue
    }
    foreach ($topicIndex in @($baseById[$id].topicIndexes)) {
      $topicKey = [string]$topicIndex
      if (-not $authoredByTopic.ContainsKey($topicKey)) { $authoredByTopic[$topicKey] = 0 }
      $authoredByTopic[$topicKey]++
    }
    if (@($baseById[$id].topicIndexes).Count) { $topicRouted++ }
    if ([string]$baseById[$id].blockId) { $blockRouted++ }
    if (Test-MadridExamEligible $courseId $baseById[$id]) { $examRouted++ }
    if ($record.exercise.source -notmatch '^(?:(?:Modelo|Junio|Julio|Septiembre|Ordinaria|Extraordinaria)(?:-(?:General|Espec.fica|Reserva|Ordinaria|Extraordinaria|Coincidente))*|(?:General|Espec.fica)-(?:Junio|Julio|Septiembre))(?:-Opci.n [AB])?-(?:19|20)\d{2}$') {
      $errors.Add("${courseId}/${id}: etiqueta visible no válida: $($record.exercise.source)")
    }
    $visiblePayload = [string]($record | ConvertTo-Json -Depth 12 -Compress)
    if ($visiblePayload -match '(?i)(?:\bproblema\s*)?\b[1-5]\.\d{1,2}\.\d{1,2}\b') {
      $errors.Add("${courseId}/${id}: contiene una numeración editorial visible")
    }
    $statement = @($record.exercise.statement)
    if (-not $statement.Count -or -not ($statement | Where-Object { $_.plain -and $_.html })) {
      $errors.Add("${courseId}/${id}: falta enunciado matemático estructurado")
    }
    if (($statement.html -join ' ') -match '<img|statementAssets|sourceId|\(\s*\d+(?:[.,]\d+)?\s+puntos?\s*\)|\bopción\s+[ab]\b') {
      $errors.Add("${courseId}/${id}: el enunciado contiene imagen o referencia interna visible")
    }
    $parts = @($record.exercise.parts)
    if (-not $parts.Count) { $errors.Add("${courseId}/${id}: no tiene apartados") }
    foreach ($part in $parts) {
      if (-not $part.label -or -not @($part.paragraphs).Count) {
        $errors.Add("${courseId}/${id}: apartado vacío")
        continue
      }
      $answer = $record.answers.($part.label)
      $options = @($answer.options)
      if ($options.Count -ne 4 -or @($options | Select-Object -Unique).Count -ne 4) {
        $errors.Add("$courseId/$id/$($part.label): deben existir cuatro opciones distintas")
      }
      if ($null -eq $answer.correct -or [int]$answer.correct -lt 0 -or [int]$answer.correct -gt 3) {
        $errors.Add("$courseId/$id/$($part.label): índice correcto inválido")
      }
      $solution = [string]$answer.solution
      foreach ($heading in @('Planteamiento:', 'Desarrollo paso a paso:', 'Resultado final:', 'Comprobaci.n:')) {
        if ($solution -notmatch $heading) {
          $errors.Add("$courseId/$id/$($part.label): falta $heading")
        }
      }
      if ($solution -match 'official-solution-image|Solución guiada|según el tipo de ejercicio') {
        $errors.Add("$courseId/$id/$($part.label): solución genérica o visual no permitida")
      }
    }
    $valid++
  }

  $counts[$courseId] = [ordered]@{
    sourceCorpus = $sourceRecords.Count
    excludedOtherCommunities = $excludedIds.Count
    corpus = $baseRecords.Count
    authored = $properties.Count
    validated = $valid
    remaining = $baseRecords.Count - $properties.Count
    missingIds = $missingIds
    routing = [ordered]@{
      topic = $topicRouted
      block = $blockRouted
      exam = $examRouted
      allThree = $topicRouted -eq $properties.Count -and $blockRouted -eq $properties.Count -and $examRouted -eq $properties.Count
    }
    topics = @(
      $baseRecords.topicIndexes | ForEach-Object { $_ } | Sort-Object -Unique | ForEach-Object {
        $topicKey = [string]$_
        $topicAuthored = if ($authoredByTopic.ContainsKey($topicKey)) { [int]$authoredByTopic[$topicKey] } else { 0 }
        [ordered]@{
          topicIndex = [int]$_
          authored = $topicAuthored
          minimum = $minimumPerTopic
          minimumMet = $topicAuthored -ge $minimumPerTopic
        }
      }
    )
  }
}

$remainingTotal = [int]$counts['2bach-mates'].remaining + [int]$counts['2bach-ccss'].remaining
$allTopicMinimumsMet = -not @(
  $counts['2bach-mates'].topics + $counts['2bach-ccss'].topics |
    Where-Object { -not $_.minimumMet }
).Count
$result = [ordered]@{
  status = if ($errors.Count) { 'FAIL' } elseif ($remainingTotal -gt 0 -or -not $allTopicMinimumsMet) { 'PARTIAL' } else { 'OK' }
  minimumPerTopic = $minimumPerTopic
  allTopicMinimumsMet = $allTopicMinimumsMet
  counts = $counts
  errors = @($errors)
}
$result | ConvertTo-Json -Depth 8
if ($errors.Count) { exit 1 }
if ($result.status -ne 'OK') { exit 2 }
