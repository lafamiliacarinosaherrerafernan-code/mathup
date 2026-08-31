param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("mates", "ccss")]
  [string]$Course,

  [Parameter(Mandatory = $true)]
  [string]$ManifestJson,

  [Parameter(Mandatory = $true)]
  [string]$ImageDirectory,

  [Parameter(Mandatory = $true)]
  [string]$LayoutDirectory,

  [Parameter(Mandatory = $true)]
  [string]$OutputDirectory,

  [Parameter(Mandatory = $true)]
  [string]$OutputManifest
)

$ErrorActionPreference = "Stop"
$manifest = Get-Content -LiteralPath $ManifestJson -Raw | ConvertFrom-Json
$records = @($manifest.records)
$resolvedOutput = [System.IO.Path]::GetFullPath($OutputDirectory)
if (-not (Test-Path -LiteralPath $resolvedOutput)) {
  New-Item -ItemType Directory -Path $resolvedOutput | Out-Null
}

function Find-ProblemIdOnPage {
  param([object]$Layout, [string]$PreferredId)
  $preferredPattern = (($PreferredId -split '\.') | ForEach-Object { [regex]::Escape($_) }) -join '\s*[\.,]\s*'
  $preferred = $Layout.lines | Where-Object { $_.text -match "(?i)Problema\s+$preferredPattern(?:\s|$)" } | Select-Object -First 1
  if ($preferred) { return $PreferredId }
  $first = $Layout.lines | Where-Object { $_.text -match '(?i)Problema\s+([0-9]+)\s*[\.,]\s*([0-9]+)\s*[\.,]\s*([0-9]+)' } | Select-Object -First 1
  if (-not $first) { return "" }
  $match = [regex]::Match([string]$first.text, '(?i)Problema\s+([0-9]+)\s*[\.,]\s*([0-9]+)\s*[\.,]\s*([0-9]+)')
  return "$($match.Groups[1].Value).$($match.Groups[2].Value).$($match.Groups[3].Value)"
}

$exported = for ($index = 0; $index -lt $records.Count; $index += 1) {
  $record = $records[$index]
  $page = [int]$record.solutionPage
  $next = if ($index + 1 -lt $records.Count) { $records[$index + 1] } else { $null }
  $nextPage = if ($next) { [int]$next.solutionPage } else { $page + 1 }
  $image = Join-Path $ImageDirectory ("page-{0:D4}.png" -f $page)
  $layoutPath = Join-Path $LayoutDirectory ("page-{0:D4}.json" -f $page)
  $layout = Get-Content -LiteralPath $layoutPath -Raw | ConvertFrom-Json
  $actualId = Find-ProblemIdOnPage $layout ([string]$record.sourceId)
  if (-not $actualId) { throw "No se localizó ningún encabezado de solución en la página $page ($($record.sourceId))." }

  $nextActualId = ""
  if ($next -and $nextPage -eq $page) {
    $nextActualId = Find-ProblemIdOnPage $layout ([string]$next.sourceId)
  }
  $baseName = ($record.id -replace '[^A-Za-z0-9._-]', '-')
  $output = Join-Path $resolvedOutput "$baseName.jpg"
  & (Join-Path $PSScriptRoot "crop_ocr_problem.ps1") `
    -InputImage $image `
    -ProblemId $actualId `
    -NextProblemId $nextActualId `
    -LayoutJson $layoutPath `
    -SolutionOnly `
    -OutputImage $output | Out-Null

  [pscustomobject]@{
    id = [string]$record.id
    sourceId = [string]$record.sourceId
    asset = ($output.Substring((Get-Location).Path.Length + 1) -replace '\\', '/')
    format = @("planteamiento", "desarrollo", "resultado", "comprobacion")
  }
}

$result = [pscustomobject]@{
  schemaVersion = 1
  community = "madrid"
  course = $Course
  count = @($exported).Count
  records = @($exported)
}
$resolvedManifest = [System.IO.Path]::GetFullPath($OutputManifest)
$manifestDirectory = Split-Path -Parent $resolvedManifest
if (-not (Test-Path -LiteralPath $manifestDirectory)) { New-Item -ItemType Directory -Path $manifestDirectory | Out-Null }
[System.IO.File]::WriteAllText($resolvedManifest, ($result | ConvertTo-Json -Depth 6), [System.Text.UTF8Encoding]::new($false))
$result | Select-Object community, course, count | ConvertTo-Json -Compress
