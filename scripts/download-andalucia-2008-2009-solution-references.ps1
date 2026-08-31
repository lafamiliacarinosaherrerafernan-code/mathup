param(
  [string]$HomeFile = 'tmp\emestrada-home.html',
  [string]$OutputDirectory = 'tmp\andalucia-solution-references'
)

$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$homePath = Join-Path $projectRoot $HomeFile
$outputPath = Join-Path $projectRoot $OutputDirectory
New-Item -ItemType Directory -Force -Path $outputPath | Out-Null

$html = [IO.File]::ReadAllText($homePath, [Text.Encoding]::UTF8)
$hrefs = [regex]::Matches($html, 'href="(?<url>https://www\.emestrada\.org/(?<slug>20(?:08|09)-ejercicios-resueltos-selectividad-[^"]+)/)"') |
  ForEach-Object {
    [pscustomobject]@{ Url = $_.Groups['url'].Value; Slug = $_.Groups['slug'].Value }
  } |
  Where-Object {
    $_.Slug -match '(matrices-y-determinantes-matematicas|sistemas-ecuaciones-lineales-matematicas|espacio-afin-y-euclideo-matematicas|funciones-matematicas|integrales-matematicas|matrices-y-determinantes-sociales|sistemas-ecuaciones-lineales-ciencias-sociales|programacion-lineal-sociales|funciones-sociales|probabilidad-sociales|teoria-de-muestras-sociales|contraste-de-hipotesis-sociales)$'
  } |
  Sort-Object Url -Unique

$manifest = @()
foreach ($entry in $hrefs) {
  $pagePath = Join-Path $outputPath ($entry.Slug + '.html')
  Invoke-WebRequest -Uri $entry.Url -OutFile $pagePath
  $page = [IO.File]::ReadAllText($pagePath, [Text.Encoding]::UTF8)
  $match = [regex]::Match($page, 'pdfemb-data=(?<encoded>[A-Za-z0-9_\-=]+)')
  if (-not $match.Success) { throw "No se encontró pdfemb-data en $($entry.Url)" }
  $encoded = [Uri]::UnescapeDataString($match.Groups['encoded'].Value).Replace('-','+').Replace('_','/')
  switch ($encoded.Length % 4) { 2 { $encoded += '==' } 3 { $encoded += '=' } }
  $metadata = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($encoded)) | ConvertFrom-Json
  $pdfPath = Join-Path $outputPath ($entry.Slug + '.pdf')
  Invoke-WebRequest -Uri $metadata.url -OutFile $pdfPath
  $manifest += [pscustomobject]@{
    slug = $entry.Slug
    pageUrl = $entry.Url
    pdfUrl = [string]$metadata.url
    localPdf = (Resolve-Path $pdfPath).Path
    bytes = (Get-Item $pdfPath).Length
    sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $pdfPath).Hash.ToLowerInvariant()
  }
}

$manifest | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $outputPath 'manifest.json') -Encoding utf8
$manifest | Format-Table slug,bytes -AutoSize
