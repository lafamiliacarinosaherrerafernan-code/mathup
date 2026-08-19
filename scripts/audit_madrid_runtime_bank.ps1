param(
  [string]$BankPath = "data/madrid-pau-bank.js",
  [string]$AuthoredPath = "data/madrid-pau-authored.js"
)

$ErrorActionPreference = "Stop"

$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$resolvedBank = [System.IO.Path]::GetFullPath((Join-Path $projectRoot $BankPath))
if (-not (Test-Path -LiteralPath $resolvedBank)) {
  throw "No existe el banco de Madrid: $resolvedBank"
}

$source = [System.IO.File]::ReadAllText($resolvedBank, [System.Text.Encoding]::UTF8)
$match = [regex]::Match($source, 'window\.MADRID_PAU_BANK\s*=\s*(\{[\s\S]*\})\s*;\s*$')
if (-not $match.Success) {
  throw "El archivo no contiene una asignación JSON válida a window.MADRID_PAU_BANK."
}
$bank = $match.Groups[1].Value | ConvertFrom-Json
$resolvedAuthored = [System.IO.Path]::GetFullPath((Join-Path $projectRoot $AuthoredPath))
$authoredSource = [System.IO.File]::ReadAllText($resolvedAuthored, [System.Text.Encoding]::UTF8)
$authoredMatch = [regex]::Match($authoredSource, 'window\.MADRID_PAU_AUTHORED\s*=\s*(\{[\s\S]*\})\s*;\s*$')
if (-not $authoredMatch.Success) { throw "El archivo de autoría de Madrid no contiene JSON válido." }
$authored = $authoredMatch.Groups[1].Value | ConvertFrom-Json

$expected = [ordered]@{
  '2bach-mates' = [ordered]@{ sourceCount = 831; runtimeCount = 825; topics = 0..13; blocks = @('algebra', 'analisis', 'geometria', 'probabilidad-estadistica') }
  '2bach-ccss' = [ordered]@{ sourceCount = 903; runtimeCount = 903; topics = 0..10; blocks = @('algebra', 'analisis', 'probabilidad', 'estadistica') }
}

$errors = [System.Collections.Generic.List[string]]::new()
$report = [System.Collections.Generic.List[object]]::new()

foreach ($courseId in $expected.Keys) {
  $sourceRecords = @($bank.$courseId)
  $courseConfig = $expected[$courseId]
  $excludedIds = @($authored.exclusions.$courseId.PSObject.Properties | ForEach-Object Name)
  $records = @($sourceRecords | Where-Object id -notin $excludedIds)
  if ($sourceRecords.Count -ne $courseConfig.sourceCount) {
    $errors.Add("$courseId contiene $($sourceRecords.Count) problemas fuente; se esperaban $($courseConfig.sourceCount).")
  }
  if ($records.Count -ne $courseConfig.runtimeCount) {
    $errors.Add("$courseId expone $($records.Count) problemas en ejecución; se esperaban $($courseConfig.runtimeCount).")
  }

  $duplicateIds = @($sourceRecords | Group-Object id | Where-Object Count -gt 1)
  if ($duplicateIds.Count) {
    $errors.Add("$courseId contiene identificadores duplicados: $($duplicateIds.Name -join ', ').")
  }

  foreach ($record in $records) {
    if ($record.community -ne 'madrid') { $errors.Add("$($record.id) no pertenece exclusivamente a Madrid.") }
    if ($record.id -notlike 'madrid-*') { $errors.Add("$($record.id) no usa un identificador aislado para Madrid.") }
    if (-not $record.year) { $errors.Add("$($record.id) no conserva el año oficial.") }
    if (-not @($record.partLabels).Count) { $errors.Add("$($record.id) no conserva sus apartados oficiales.") }
    if ($record.referenceTable -and $record.referenceTable -notin @('binomial', 'normal')) {
      $errors.Add("$($record.id) referencia una tabla desconocida: $($record.referenceTable).")
    }
    $authoredRecord = $authored.$courseId.($record.id)
    $hasStructuredContent = $authoredRecord.exercise.statement -and @($authoredRecord.exercise.parts).Count
    if (-not @($record.statementAssets).Count -and -not $hasStructuredContent) { $errors.Add("$($record.id) no tiene enunciado visual ni transcripción estructurada.") }
    foreach ($asset in @($record.statementAssets) + @($record.solutionAsset) | Where-Object { $_ }) {
      $resolvedAsset = [System.IO.Path]::GetFullPath((Join-Path $projectRoot ([string]$asset)))
      if (-not $resolvedAsset.StartsWith((Join-Path $projectRoot 'assets\madrid-pau'), [System.StringComparison]::OrdinalIgnoreCase)) {
        $errors.Add("$($record.id) referencia un recurso fuera de assets/madrid-pau: $asset.")
      } elseif (-not (Test-Path -LiteralPath $resolvedAsset -PathType Leaf)) {
        $errors.Add("$($record.id) referencia un recurso inexistente: $asset.")
      }
    }
  }

  $topicReport = foreach ($topicIndex in $courseConfig.topics) {
    $topicRecords = @($records | Where-Object { $_.topicIndexes -contains $topicIndex })
    $exerciseUnits = [int](($topicRecords | Measure-Object exerciseUnits -Sum).Sum)
    if ($exerciseUnits -lt 40) {
      $errors.Add("$courseId, tema $topicIndex solo contiene $exerciseUnits unidades de ejercicio.")
    }
    [pscustomobject]@{ topicIndex = $topicIndex; problems = $topicRecords.Count; exerciseUnits = $exerciseUnits }
  }

  $blockReport = foreach ($blockId in $courseConfig.blocks) {
    $blockRecords = @($records | Where-Object blockId -eq $blockId)
    if (-not $blockRecords.Count) { $errors.Add("$courseId no tiene ejercicios en el bloque $blockId.") }
    [pscustomobject]@{ blockId = $blockId; problems = $blockRecords.Count }
  }

  $report.Add([pscustomobject]@{
    courseId = $courseId
    sourceProblems = $sourceRecords.Count
    excludedOtherCommunities = $excludedIds.Count
    problems = $records.Count
    topics = @($topicReport)
    blocks = @($blockReport)
    tables = @($records | Group-Object referenceTable | ForEach-Object {
      [pscustomobject]@{ table = if ($_.Name) { $_.Name } else { 'none' }; problems = $_.Count }
    })
  })
}

$indexSource = [System.IO.File]::ReadAllText((Join-Path $projectRoot 'index.html'), [System.Text.Encoding]::UTF8)
$bankPosition = $indexSource.IndexOf('data/madrid-pau-bank.js', [System.StringComparison]::Ordinal)
$appPosition = $indexSource.IndexOf('app.js', [System.StringComparison]::Ordinal)
if ($bankPosition -lt 0 -or $appPosition -lt 0 -or $bankPosition -gt $appPosition) {
  $errors.Add('index.html no carga el banco de Madrid antes de app.js.')
}

foreach ($runtimeFile in @('app.js', 'bach-exam.js')) {
  $runtimeSource = [System.IO.File]::ReadAllText((Join-Path $projectRoot $runtimeFile), [System.Text.Encoding]::UTF8)
  if ($runtimeSource -notmatch 'MADRID_PAU_AUTHORED\?\.exclusions' -or $runtimeSource -notmatch 'excluded\[exercise\.id\]') {
    $errors.Add("$runtimeFile no excluye explícitamente los registros territoriales ajenos antes de construir temas, bloques o exámenes.")
  }
}

[pscustomobject]@{
  status = if ($errors.Count) { 'FAILED' } else { 'OK' }
  bank = $BankPath
  community = $bank.community
  courses = @($report)
  errors = @($errors)
} | ConvertTo-Json -Depth 8

if ($errors.Count) { exit 1 }
