param(
  [Parameter(Mandatory = $true)]
  [string]$ImageDirectory,

  [Parameter(Mandatory = $true)]
  [string]$OutputDirectory
)

$ErrorActionPreference = 'Stop'
$resolvedImages = (Resolve-Path -LiteralPath $ImageDirectory).Path
$resolvedOutput = [IO.Path]::GetFullPath($OutputDirectory)
if (-not (Test-Path -LiteralPath $resolvedOutput)) {
  New-Item -ItemType Directory -Path $resolvedOutput | Out-Null
}

$images = @(Get-ChildItem -LiteralPath $resolvedImages -Filter 'page-*.png' | Sort-Object Name)
$built = 0
$existing = 0
for ($index = 0; $index -lt $images.Count; $index += 1) {
  $image = $images[$index]
  $outputJson = Join-Path $resolvedOutput ($image.BaseName + '.json')
  if (Test-Path -LiteralPath $outputJson) {
    $existing += 1
  } else {
    & (Join-Path $PSScriptRoot 'ocr_image_layout.ps1') -InputImage $image.FullName -OutputJson $outputJson | Out-Null
    $built += 1
  }
  Write-Progress -Activity 'OCR de exámenes completos' -Status "$($index + 1) de $($images.Count)" -PercentComplete ((($index + 1) / [Math]::Max(1, $images.Count)) * 100)
}

[pscustomobject]@{
  pages = $images.Count
  built = $built
  existing = $existing
  output = $resolvedOutput
} | ConvertTo-Json -Compress
