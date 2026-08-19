param(
  [string]$MatchesJson = 'tmp/madrid-convocatorias/matches.json',
  [string]$OutputDirectory = 'tmp/madrid-convocatorias/statement-ocr'
)

$ErrorActionPreference = 'Stop'
$matches = [IO.File]::ReadAllText([IO.Path]::GetFullPath($MatchesJson), [Text.Encoding]::UTF8) | ConvertFrom-Json
$ocrScript = Join-Path $PSScriptRoot 'ocr_image_layout.ps1'
$count = 0

foreach ($course in @('2bach-mates', '2bach-ccss')) {
  $assetCourse = if ($course -eq '2bach-mates') { 'mates' } else { 'ccss' }
  $sourceDirectory = Join-Path (Get-Location) "assets/madrid-pau/$assetCourse/statements"
  $targetDirectory = Join-Path ([IO.Path]::GetFullPath($OutputDirectory)) $assetCourse
  if (-not (Test-Path -LiteralPath $targetDirectory)) {
    New-Item -ItemType Directory -Path $targetDirectory | Out-Null
  }
  foreach ($match in @($matches.courses.$course | Where-Object status -ne 'high-confidence')) {
    $images = @(Get-ChildItem -LiteralPath $sourceDirectory -Filter "$($match.id)-*.jpg" | Sort-Object Name)
    foreach ($image in $images) {
      $target = Join-Path $targetDirectory ($image.BaseName + '.json')
      if (-not (Test-Path -LiteralPath $target)) {
        & $ocrScript -InputImage $image.FullName -OutputJson $target | Out-Null
      }
      $count += 1
    }
  }
}

[pscustomobject]@{ cachedImages = $count; output = [IO.Path]::GetFullPath($OutputDirectory) } | ConvertTo-Json
