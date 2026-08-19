param(
  [Parameter(Mandatory = $true)]
  [string]$MatesManifest,

  [Parameter(Mandatory = $true)]
  [string]$MatesStatements,

  [Parameter(Mandatory = $true)]
  [string]$MatesSolutions,

  [Parameter(Mandatory = $true)]
  [string]$CcssManifest,

  [Parameter(Mandatory = $true)]
  [string]$CcssStatements,

  [Parameter(Mandatory = $true)]
  [string]$CcssSolutions,

  [Parameter(Mandatory = $true)]
  [string]$OutputJs
)

$ErrorActionPreference = "Stop"

# Clasificaciones secundarias revisadas manualmente. Un mismo problema oficial
# puede alimentar más de un tema cuando su resolución trabaja de forma real
# ambos contenidos (por ejemplo, vectores y métrica, o matrices e inversas).
$ReviewedAdditionalTopics = @{
  'madrid-mates-2.1.3' = @(3)
  'madrid-mates-2.1.6' = @(3)
  'madrid-mates-2.1.8' = @(3)
  'madrid-mates-2.2.8' = @(3)
  'madrid-mates-4.2.4' = @(13)
  'madrid-mates-4.3.3' = @(13)
  'madrid-mates-4.4.2' = @(13)
  'madrid-mates-4.6.2' = @(13)
  'madrid-mates-4.6.6' = @(13)
  'madrid-mates-4.9.3' = @(13)
  'madrid-mates-4.10.4' = @(13)
  'madrid-ccss-1.2.1' = @(1)
  'madrid-ccss-1.3.2' = @(1)
  'madrid-ccss-1.4.2' = @(1)
  'madrid-ccss-1.6.1' = @(1)
  'madrid-ccss-1.9.1' = @(1)
  'madrid-ccss-1.10.1' = @(1)
  'madrid-ccss-1.12.2' = @(1)
  'madrid-ccss-1.12.7' = @(1)
  'madrid-ccss-1.13.2' = @(1)
  'madrid-ccss-1.14.3' = @(1)
  'madrid-ccss-1.14.7' = @(1)
  'madrid-ccss-1.15.1' = @(1)
}

function Build-CourseRecords {
  param([string]$ManifestPath, [string]$StatementPath, [string]$SolutionPath)
  $manifest = Get-Content -LiteralPath $ManifestPath -Raw | ConvertFrom-Json
  $statementData = Get-Content -LiteralPath $StatementPath -Raw | ConvertFrom-Json
  $solutionData = Get-Content -LiteralPath $SolutionPath -Raw | ConvertFrom-Json
  $statements = @{}
  $solutions = @{}
  foreach ($entry in $statementData.records) { $statements[$entry.id] = @($entry.assets) }
  foreach ($entry in $solutionData.records) { $solutions[$entry.id] = [string]$entry.asset }

  return @($manifest.records | ForEach-Object {
    if (-not $statements.ContainsKey($_.id)) { throw "Falta el enunciado exportado de $($_.id)" }
    if (-not $solutions.ContainsKey($_.id)) { throw "Falta la solución exportada de $($_.id)" }
    $partLabels = @($_.partLabels | ForEach-Object { [string]$_ } | Where-Object { $_ })
    if (-not $partLabels.Count) {
      $partLabels = @(0..([Math]::Max(1, [int]$_.exerciseUnits) - 1) | ForEach-Object { [char](97 + $_) })
    }
    $reviewedTopics = @($_.topicIndexes | ForEach-Object { [int]$_ })
    if ($ReviewedAdditionalTopics.ContainsKey([string]$_.id)) {
      $reviewedTopics = @($reviewedTopics + $ReviewedAdditionalTopics[[string]$_.id] | Sort-Object -Unique)
    }
    [ordered]@{
      id = [string]$_.id
      sourceId = [string]$_.sourceId
      community = "madrid"
      course = [string]$_.course
      year = [int]$_.year
      session = [string]$_.session
      blockId = [string]$_.blockId
      topicIndexes = @($reviewedTopics)
      partLabels = @($partLabels)
      exerciseUnits = [int]$_.exerciseUnits
      referenceTable = if ($_.referenceTable) { [string]$_.referenceTable } else { "" }
      statementAssets = @($statements[$_.id])
      solutionAsset = [string]$solutions[$_.id]
    }
  })
}

$matesRecords = @(Build-CourseRecords $MatesManifest $MatesStatements $MatesSolutions)
$ccssRecords = @(Build-CourseRecords $CcssManifest $CcssStatements $CcssSolutions)

# Tres problemas oficiales aparecen completos en el PDF de enunciados, pero el
# índice OCR no generó entrada de manifiesto. Se conservan explícitamente para
# que una regeneración del banco no los elimine.
$ccssSupplemental = @(
  [ordered]@{ id='madrid-ccss-4.14.6'; sourceId='4.14.6'; community='madrid'; course='ccss'; year=2013; session='Ordinaria-Coincidente'; blockId='probabilidad'; topicIndexes=@(8); partLabels=@('a','b'); exerciseUnits=2; referenceTable=''; statementAssets=@(); solutionAsset='' },
  [ordered]@{ id='madrid-ccss-4.15.6'; sourceId='4.15.6'; community='madrid'; course='ccss'; year=2014; session='Ordinaria-Coincidente'; blockId='probabilidad'; topicIndexes=@(8); partLabels=@('a','b'); exerciseUnits=2; referenceTable=''; statementAssets=@(); solutionAsset='' },
  [ordered]@{ id='madrid-ccss-4.20.2'; sourceId='4.20.2'; community='madrid'; course='ccss'; year=2019; session='Modelo'; blockId='probabilidad'; topicIndexes=@(8); partLabels=@('a','b'); exerciseUnits=2; referenceTable=''; statementAssets=@(); solutionAsset='' }
)
foreach ($supplemental in $ccssSupplemental) {
  if ($supplemental.id -notin @($ccssRecords | ForEach-Object { $_.id })) {
    $ccssRecords += $supplemental
  }
}

$runtime = [ordered]@{
  schemaVersion = 1
  community = "madrid"
  "2bach-mates" = $matesRecords
  "2bach-ccss" = $ccssRecords
}

$json = $runtime | ConvertTo-Json -Depth 8 -Compress
$content = @"
// Generado desde los PDF oficiales de Madrid aportados por la usuaria.
// Los enunciados y las soluciones visuales conservan la notación original.
window.MADRID_PAU_BANK = $json;
"@
$resolvedOutput = [System.IO.Path]::GetFullPath($OutputJs)
$directory = Split-Path -Parent $resolvedOutput
if (-not (Test-Path -LiteralPath $directory)) { New-Item -ItemType Directory -Path $directory | Out-Null }
[System.IO.File]::WriteAllText($resolvedOutput, $content, [System.Text.UTF8Encoding]::new($false))

[pscustomobject]@{
  output = $resolvedOutput
  mates = @($runtime["2bach-mates"]).Count
  ccss = @($runtime["2bach-ccss"]).Count
} | ConvertTo-Json -Compress
