param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("mates", "ccss")]
  [string]$Course,

  [Parameter(Mandatory = $true)]
  [string]$ExerciseCatalog,

  [Parameter(Mandatory = $true)]
  [string]$SolutionCatalog,

  [Parameter(Mandatory = $true)]
  [string]$OutputJson
)

$ErrorActionPreference = "Stop"

$exerciseData = Get-Content -LiteralPath $ExerciseCatalog -Raw | ConvertFrom-Json
$solutionData = Get-Content -LiteralPath $SolutionCatalog -Raw | ConvertFrom-Json
$solutionPages = @{}
foreach ($solution in $solutionData.records) {
  $solutionPages[$solution.sourceId] = [int]$solution.page
}

# El OCR de los solucionarios omite o desplaza estos cinco encabezados. Las
# páginas se comprobaron visualmente entre los problemas anterior y posterior.
$solutionPageOverrides = if ($Course -eq "mates") {
  @{
    '1.25.7' = 188
    '3.10.12' = 474
  }
} else {
  @{
    '2.22.2' = 199
    '3.24.2' = 393
    '3.25.2' = 403
  }
}

function Get-BlockId {
  param([string]$CourseId, [int[]]$Topics)
  if ($CourseId -eq "mates") {
    if (@($Topics | Where-Object { $_ -in 0..2 }).Count) { return "algebra" }
    if (@($Topics | Where-Object { $_ -in 3..5 }).Count) { return "geometria" }
    if (@($Topics | Where-Object { $_ -in 6..11 }).Count) { return "analisis" }
    if (@($Topics | Where-Object { $_ -in 12..13 }).Count) { return "probabilidad-estadistica" }
  } else {
    if (@($Topics | Where-Object { $_ -in 0..3 }).Count) { return "algebra" }
    if (@($Topics | Where-Object { $_ -in 4..7 }).Count) { return "analisis" }
    if ($Topics -contains 8) { return "probabilidad" }
    if (@($Topics | Where-Object { $_ -in 9..10 }).Count) { return "estadistica" }
  }
  throw "El ejercicio no tiene un bloque válido: $($Topics -join ',')"
}

function Get-ReferenceTable {
  param([string]$Text, [string]$CourseId, [int[]]$Topics)
  if ($Text -match '(?i)binomial') { return "binomial" }
  if ($Text -match '(?i)normal|tipific') { return "normal" }
  if ($CourseId -eq "mates" -and $Topics -contains 13) { return "binomial" }
  if ($CourseId -eq "ccss" -and $Topics -contains 10) { return "normal" }
  if ($CourseId -eq "ccss" -and $Topics -contains 9) { return "binomial" }
  return $null
}

$records = foreach ($exercise in $exerciseData.records) {
  $sourceId = [string]$exercise.sourceId
  $solutionPage = if ($solutionPageOverrides.ContainsKey($sourceId)) {
    [int]$solutionPageOverrides[$sourceId]
  } elseif ($solutionPages.ContainsKey($sourceId)) {
    [int]$solutionPages[$sourceId]
  } else {
    0
  }
  $topics = @($exercise.topicIndexes | ForEach-Object { [int]$_ } | Sort-Object -Unique)
  [pscustomobject]@{
    id = [string]$exercise.id
    sourceId = $sourceId
    community = "madrid"
    course = $Course
    year = [int]$exercise.year
    session = [string]$exercise.session
    exercisePage = [int]$exercise.page
    solutionPage = $solutionPage
    blockId = Get-BlockId $Course $topics
    topicIndexes = $topics
    partLabels = @($exercise.partLabels)
    exerciseUnits = [int]$exercise.exerciseUnits
    referenceTable = Get-ReferenceTable ([string]$exercise.excerpt) $Course $topics
    solutionFormat = @("planteamiento", "desarrollo", "resultado", "comprobacion")
    classificationStatus = [string]$exercise.classificationStatus
    solutionMatchStatus = if ($solutionPageOverrides.ContainsKey($sourceId)) { "manual-page-reviewed" } elseif ($solutionPage) { "exact-id" } else { "missing" }
  }
}

$blockCounts = $records | Group-Object blockId | Sort-Object Name | ForEach-Object {
  [pscustomobject]@{
    blockId = $_.Name
    problems = $_.Count
    exerciseUnits = [int](($_.Group | Measure-Object exerciseUnits -Sum).Sum)
  }
}

$output = [pscustomobject]@{
  schemaVersion = 1
  community = "madrid"
  course = $Course
  totalProblems = @($records).Count
  missingSolutions = @($records | Where-Object { -not $_.solutionPage }).Count
  unclassified = @($records | Where-Object { -not $_.topicIndexes.Count }).Count
  blockCounts = @($blockCounts)
  records = @($records)
}

$resolvedOutput = [System.IO.Path]::GetFullPath($OutputJson)
$outputDirectory = Split-Path -Parent $resolvedOutput
if (-not (Test-Path -LiteralPath $outputDirectory)) {
  New-Item -ItemType Directory -Path $outputDirectory | Out-Null
}
[System.IO.File]::WriteAllText(
  $resolvedOutput,
  ($output | ConvertTo-Json -Depth 8),
  [System.Text.UTF8Encoding]::new($false)
)
$output | Select-Object community, course, totalProblems, missingSolutions, unclassified, blockCounts | ConvertTo-Json -Depth 5
