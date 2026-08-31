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

$exported = for ($index = 0; $index -lt $records.Count; $index += 1) {
  $record = $records[$index]
  $next = if ($index + 1 -lt $records.Count) { $records[$index + 1] } else { $null }
  $page = [int]$record.exercisePage
  $nextPage = if ($next) { [int]$next.exercisePage } else { $page + 1 }
  $baseName = ($record.id -replace '[^A-Za-z0-9._-]', '-')
  $assets = [System.Collections.Generic.List[string]]::new()
  $firstOutput = Join-Path $resolvedOutput "$baseName-1.jpg"
  $firstImage = Join-Path $ImageDirectory ("page-{0:D4}.png" -f $page)
  $firstLayout = Join-Path $LayoutDirectory ("page-{0:D4}.json" -f $page)
  $samePageNext = $next -and $nextPage -eq $page
  & (Join-Path $PSScriptRoot "crop_ocr_problem.ps1") `
    -InputImage $firstImage `
    -ProblemId $record.sourceId `
    -NextProblemId $(if ($samePageNext) { $next.sourceId } else { "" }) `
    -LayoutJson $firstLayout `
    -OutputImage $firstOutput | Out-Null
  $assets.Add(($firstOutput.Substring((Get-Location).Path.Length + 1) -replace '\\', '/'))

  # Si el problema continúa en la página donde comienza el siguiente,
  # conservamos también ese prefijo. No se añade una segunda imagen si el
  # siguiente problema empieza en la franja superior de encabezado.
  if ($next -and $nextPage -gt $page) {
    for ($continuationPage = $page + 1; $continuationPage -le $nextPage; $continuationPage += 1) {
      if ($continuationPage -lt $nextPage) { continue }
      $layoutPath = Join-Path $LayoutDirectory ("page-{0:D4}.json" -f $continuationPage)
      if (-not (Test-Path -LiteralPath $layoutPath)) { continue }
      $layout = Get-Content -LiteralPath $layoutPath -Raw | ConvertFrom-Json
      $escapedNext = (([string]$next.sourceId -split '\.') | ForEach-Object { [regex]::Escape($_) }) -join '\s*[\.,]\s*'
      $nextLine = $layout.lines | Where-Object { $_.text -match "(?i)Problema\s+$escapedNext(?:\s|$)" } | Select-Object -First 1
      if (-not $nextLine -or [double]$nextLine.y -le 620) { continue }
      $meaningfulPrefix = @($layout.lines | Where-Object {
        [double]$_.y -ge 300 -and [double]$_.y -lt [double]$nextLine.y -and
        $_.text -notmatch '^(?i)\s*(?:Año\s+\d{4}|Opci[oó]n\s+[A-Z]|Modelo|Ordinaria|Extraordinaria|\d+(?:\.\d+){1,2}\.?\s*(?:Ordinaria|Extraordinaria|Modelo)?|\d{1,4})\s*$'
      })
      $meaningfulCharacters = (($meaningfulPrefix | ForEach-Object text) -join ' ').Trim().Length
      if ($meaningfulCharacters -lt 80) { continue }
      $partNumber = $assets.Count + 1
      $continuationOutput = Join-Path $resolvedOutput "$baseName-$partNumber.jpg"
      & (Join-Path $PSScriptRoot "crop_ocr_page_prefix.ps1") `
        -InputImage (Join-Path $ImageDirectory ("page-{0:D4}.png" -f $continuationPage)) `
        -EndProblemId $next.sourceId `
        -LayoutJson $layoutPath `
        -OutputImage $continuationOutput | Out-Null
      $assets.Add(($continuationOutput.Substring((Get-Location).Path.Length + 1) -replace '\\', '/'))
    }
  }

  [pscustomobject]@{
    id = [string]$record.id
    sourceId = [string]$record.sourceId
    assets = @($assets)
  }
}

$output = [pscustomobject]@{
  schemaVersion = 1
  community = "madrid"
  course = $Course
  count = @($exported).Count
  records = @($exported)
}
$resolvedManifest = [System.IO.Path]::GetFullPath($OutputManifest)
$manifestDirectory = Split-Path -Parent $resolvedManifest
if (-not (Test-Path -LiteralPath $manifestDirectory)) { New-Item -ItemType Directory -Path $manifestDirectory | Out-Null }
[System.IO.File]::WriteAllText($resolvedManifest, ($output | ConvertTo-Json -Depth 6), [System.Text.UTF8Encoding]::new($false))
$output | Select-Object community, course, count | ConvertTo-Json -Compress
