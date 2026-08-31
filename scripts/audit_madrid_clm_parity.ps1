param(
  [string]$BankPath = "data/madrid-pau-bank.js",
  [string]$AuthoredPath = "data/madrid-pau-authored.js",
  [string]$ExamPath = "bach-exam.js",
  [string]$AppPath = "app.js"
)

$ErrorActionPreference = "Stop"
$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))

function Read-ProjectFile([string]$Path) {
  $resolved = [System.IO.Path]::GetFullPath((Join-Path $projectRoot $Path))
  if (-not (Test-Path -LiteralPath $resolved -PathType Leaf)) { throw "No existe $Path" }
  return [System.IO.File]::ReadAllText($resolved, [System.Text.Encoding]::UTF8)
}

$bankSource = Read-ProjectFile $BankPath
$match = [regex]::Match($bankSource, 'window\.MADRID_PAU_BANK\s*=\s*(\{[\s\S]*\})\s*;\s*$')
if (-not $match.Success) { throw "El banco de Madrid no contiene JSON válido." }
$bank = $match.Groups[1].Value | ConvertFrom-Json
$authoredSource = Read-ProjectFile $AuthoredPath
$authoredMatch = [regex]::Match($authoredSource, 'window\.MADRID_PAU_AUTHORED\s*=\s*(\{[\s\S]*\})\s*;\s*$')
if (-not $authoredMatch.Success) { throw "El banco de autoría de Madrid no contiene JSON válido." }
$authored = $authoredMatch.Groups[1].Value | ConvertFrom-Json
$examSource = Read-ProjectFile $ExamPath
$appSource = Read-ProjectFile $AppPath
$errors = [System.Collections.Generic.List[string]]::new()
$warnings = [System.Collections.Generic.List[string]]::new()
$courseReports = [System.Collections.Generic.List[object]]::new()

$courseConfig = [ordered]@{
  '2bach-mates' = [ordered]@{ course = 'mates'; topics = 0..13; blocks = @('algebra','analisis','geometria','probabilidad-estadistica'); slots = @('algebra','analisis','geometria','probabilidad-estadistica') }
  '2bach-ccss' = [ordered]@{ course = 'ccss'; topics = 0..10; blocks = @('algebra','analisis','probabilidad','estadistica'); slots = @('algebra','analisis','probabilidad','estadistica') }
}

foreach ($courseId in $courseConfig.Keys) {
  $config = $courseConfig[$courseId]
  $records = @($bank.$courseId)
  $foreign = @($records | Where-Object { $_.community -ne 'madrid' -or $_.course -ne $config.course })
  if ($foreign.Count) { $errors.Add("$courseId contiene $($foreign.Count) registros ajenos a Madrid o a su modalidad.") }

  $missingMetadata = @($records | Where-Object {
    -not $_.id -or -not $_.year -or -not $_.blockId -or -not @($_.topicIndexes).Count
  })
  if ($missingMetadata.Count) { $errors.Add("$courseId contiene $($missingMetadata.Count) registros sin metadatos de navegación completos.") }

  $missingAssets = @($records | Where-Object {
    $entry = $authored.$courseId.($_.id)
    (-not @($_.statementAssets).Count -or -not $_.solutionAsset) -and
    (-not $entry.exercise.statement -or -not @($entry.exercise.parts).Count)
  })
  if ($missingAssets.Count) { $errors.Add("$courseId contiene $($missingAssets.Count) registros sin enunciado o solución oficial asociada.") }

  $excludedIds = @($authored.exclusions.$courseId.PSObject.Properties | ForEach-Object { $_.Name })
  $eligibleRecords = @($records | Where-Object { $_.id -notin $excludedIds })
  $structured = @($eligibleRecords | Where-Object {
    $entry = $authored.$courseId.($_.id)
    $parts = @($entry.exercise.parts)
    $entry.exercise.statement -and $parts.Count -and @($parts | Where-Object {
      $answer = $entry.answers.($_.label)
      @($answer.options).Count -eq 4 -and
      (@($answer.options | Select-Object -Unique).Count -eq 4) -and
      $answer.correct -ge 0 -and $answer.correct -lt 4 -and
      $answer.solution
    }).Count -eq $parts.Count
  })
  if ($structured.Count -ne $eligibleRecords.Count) {
    $warnings.Add("${courseId}: $($eligibleRecords.Count - $structured.Count) problemas aún no tienen transcripción, apartados, cuatro opciones y solución didáctica validados.")
  }

  $topics = foreach ($topicIndex in $config.topics) {
    $topicRecords = @($records | Where-Object { $_.topicIndexes -contains $topicIndex })
    $units = [int](($topicRecords | Measure-Object exerciseUnits -Sum).Sum)
    if ($units -lt 40) { $errors.Add("$courseId tema $topicIndex tiene $units unidades; el mínimo es 40.") }
    [pscustomobject]@{ topicIndex = $topicIndex; problems = $topicRecords.Count; units = $units }
  }
  $blocks = foreach ($blockId in $config.blocks) {
    $blockRecords = @($records | Where-Object blockId -eq $blockId)
    if (-not $blockRecords.Count) { $errors.Add("$courseId bloque $blockId está vacío.") }
    [pscustomobject]@{ blockId = $blockId; problems = $blockRecords.Count }
  }
  $examSlots = if ($courseId -eq '2bach-mates') {
    @(
      [pscustomobject]@{ slot = 1; label = 'Álgebra'; problems = @($records | Where-Object blockId -eq 'algebra').Count }
      [pscustomobject]@{ slot = 2; label = 'Límites, continuidad y derivadas'; problems = @($records | Where-Object { $_.blockId -eq 'analisis' -and -not (@($_.topicIndexes) | Where-Object { $_ -in @(10,11) }) }).Count }
      [pscustomobject]@{ slot = 3; label = 'Integrales'; problems = @($records | Where-Object { $_.blockId -eq 'analisis' -and (@($_.topicIndexes) | Where-Object { $_ -in @(10,11) }) }).Count }
      [pscustomobject]@{ slot = 4; label = 'Geometría'; problems = @($records | Where-Object blockId -eq 'geometria').Count }
      [pscustomobject]@{ slot = 5; label = 'Probabilidad y estadística'; problems = @($records | Where-Object blockId -eq 'probabilidad-estadistica').Count }
    )
  } else {
    @(
      [pscustomobject]@{ slot = 1; label = 'Matrices'; problems = @($records | Where-Object { $_.blockId -eq 'algebra' -and $_.topicIndexes -contains 0 }).Count }
      [pscustomobject]@{ slot = 2; label = 'Sistemas y programación lineal'; problems = @($records | Where-Object { $_.blockId -eq 'algebra' -and (@($_.topicIndexes) | Where-Object { $_ -in @(2,3) }) }).Count }
      [pscustomobject]@{ slot = 3; label = 'Análisis'; problems = @($records | Where-Object { $_.blockId -eq 'analisis' -and (@($_.topicIndexes) | Where-Object { $_ -in @(4,5) }) }).Count }
      [pscustomobject]@{ slot = 4; label = 'Probabilidad o estadística'; problems = @($records | Where-Object { $_.blockId -in @('probabilidad','estadistica') }).Count }
    )
  }
  foreach ($slot in $examSlots) {
    if (-not $slot.problems) { $errors.Add("$courseId no tiene problemas para el hueco de examen $($slot.slot): $($slot.label).") }
  }
  $courseReports.Add([pscustomobject]@{
    courseId = $courseId
    problems = $records.Count
    structured = $structured.Count
    topics = @($topics)
    blocks = @($blocks)
    examSlots = @($examSlots)
  })
}

if ($examSource -notmatch 'record\?\.community\s*===\s*"madrid"') {
  $errors.Add('La selección de Madrid no filtra explícitamente por comunidad.')
}
if ($examSource -notmatch 'pau-\$\{currentPauCommunity\(\)\}') {
  $errors.Add('El historial de exámenes no está aislado por comunidad.')
}
if ($appSource -notmatch 'pau-\$\{currentBachPauCommunity\(\)\}') {
  $errors.Add('El historial de retos no está aislado por comunidad.')
}
if ($appSource -notmatch 'if \(!Array\.isArray\(question\.options\) \|\| question\.options\.length !== 4\)') {
  $errors.Add('El constructor de bloques no protege los problemas abiertos sin cuatro opciones.')
}

[pscustomobject]@{
  status = if ($errors.Count) { 'FAILED' } elseif ($warnings.Count) { 'PARTIAL' } else { 'OK' }
  communityIsolation = -not $errors.Where({ $_ -match 'comunidad|ajenos|aislado' }).Count
  runtimeNavigation = -not $errors.Where({ $_ -match 'navegación|bloque|tema' }).Count
  authoredParityWithClm = -not $warnings.Count
  courses = @($courseReports)
  warnings = @($warnings)
  errors = @($errors)
} | ConvertTo-Json -Depth 8

if ($errors.Count) { exit 1 }
