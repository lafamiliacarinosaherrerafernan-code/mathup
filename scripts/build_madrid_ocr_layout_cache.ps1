param(
  [Parameter(Mandatory = $true)]
  [string]$ManifestJson,

  [Parameter(Mandatory = $true)]
  [ValidateSet("exercise", "solution")]
  [string]$Kind,

  [Parameter(Mandatory = $true)]
  [string]$ImageDirectory,

  [Parameter(Mandatory = $true)]
  [string]$OutputDirectory
)

$ErrorActionPreference = "Stop"
$manifest = Get-Content -LiteralPath $ManifestJson -Raw | ConvertFrom-Json
$pageProperty = if ($Kind -eq "exercise") { "exercisePage" } else { "solutionPage" }
$pages = @(
  $manifest.records |
    ForEach-Object { [int]$_.$pageProperty } |
    Where-Object { $_ -gt 0 } |
    Sort-Object -Unique
)
$resolvedImages = (Resolve-Path -LiteralPath $ImageDirectory).Path
$resolvedOutput = [System.IO.Path]::GetFullPath($OutputDirectory)
if (-not (Test-Path -LiteralPath $resolvedOutput)) {
  New-Item -ItemType Directory -Path $resolvedOutput | Out-Null
}

$built = 0
$existing = 0
for ($index = 0; $index -lt $pages.Count; $index += 1) {
  $page = $pages[$index]
  $inputImage = Join-Path $resolvedImages ("page-{0:D4}.png" -f $page)
  $outputJson = Join-Path $resolvedOutput ("page-{0:D4}.json" -f $page)
  if (Test-Path -LiteralPath $outputJson) {
    $existing += 1
  } else {
    & (Join-Path $PSScriptRoot "ocr_image_layout.ps1") `
      -InputImage $inputImage `
      -OutputJson $outputJson | Out-Null
    $built += 1
  }
  Write-Progress -Activity "Diseño OCR $Kind" -Status "Página $($index + 1) de $($pages.Count)" -PercentComplete ((($index + 1) / $pages.Count) * 100)
}

[pscustomobject]@{
  kind = $Kind
  requestedPages = $pages.Count
  built = $built
  existing = $existing
  output = $resolvedOutput
} | ConvertTo-Json -Compress
