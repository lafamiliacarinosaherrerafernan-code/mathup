param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("mates", "ccss")]
  [string]$Course,

  [Parameter(Mandatory = $true)]
  [string]$CatalogJson,

  [Parameter(Mandatory = $true)]
  [string]$OutputJson
)

$ErrorActionPreference = "Stop"

function Test-Any {
  param([string]$Text, [string[]]$Patterns)
  foreach ($pattern in $Patterns) {
    if ($Text -match $pattern) { return $true }
  }
  return $false
}

function Get-IntegralKinds {
  param([string]$Text)

  $kinds = [System.Collections.Generic.HashSet[string]]::new()
  $normalized = ($Text -replace '\s+', ' ').ToLowerInvariant()

  if (Test-Any $normalized @(
    'integral indefin',
    'primitiv',
    'antideriv',
    'constante de integraci'
  )) {
    $null = $kinds.Add('primitive-explicit')
  }

  if (Test-Any $normalized @(
    'sabiendo que (?:la )?derivada.+(?:expresi.n|funci.n)',
    '(?:se conoce|se sabe) que.+su derivada.+hallar la expresi.n',
    'derivada.+hallar la expresi.n',
    'derivada.+determinar una funci',
    'derivada.+(?:obtener|obt.ngase|determine).+expresi.n',
    'derivada.+sabiendo que f\s*\(',
    'si la derivada.+la funci.n f sabiendo',
    'la derivada.+viene dada.+obt.ngase la expresi.n',
    'derivada.+obtenga la expresi.n',
    'derivada.+determine la expresi.n',
    'derivada.+encuentre la funci.n',
    'derivada de (?:la )?funci.n.+(?:hallar|obtener|determinar|calcular).+(?:expresi.n|funci.n)',
    'determinar una funci.n f.+su derivada',
    'hallar la expresi.n de f',
    'obtener.+funci.n f sabiendo',
    'funci.n f sabiendo que f\s*\(',
    'primitiva.+(?:pase|cumpla|verifique)'
  )) {
    $null = $kinds.Add('recover-from-derivative')
  }

  if (Test-Any $normalized @(
    'siguientes integrales',
    'las integrales siguientes'
  )) {
    $null = $kinds.Add('multiple-integrals')
  }

  if (Test-Any $normalized @(
    'integral defin',
    'regla de barrow'
  )) {
    $null = $kinds.Add('definite-explicit')
  }

  if (Test-Any $normalized @(
    '.rea.+(?:curva|gr.fica|eje|recinto|regi.n)',
    '(?:recinto|regi.n).+(?:limitad|acotad)',
    '.rea comprendida'
  )) {
    $null = $kinds.Add('area')
  }

  if (
    (Test-Any $normalized @(
      'calcular (?:la|las|el valor de la|el valor de las) integral',
      'calcule (?:la|las|el valor de la|el valor de las) integral',
      'calc.lese (?:la|las|el valor de la|el valor de las) integral'
    )) -and
    -not ($kinds.Contains('primitive-explicit')) -and
    -not ($kinds.Contains('definite-explicit'))
  ) {
    $null = $kinds.Add('integral-bounds-review')
  }

  return @($kinds | Sort-Object)
}

$catalog = Get-Content -Raw -LiteralPath $CatalogJson | ConvertFrom-Json
$records = @($catalog.records | Where-Object { $_.chapter -eq 3 })
$candidates = [System.Collections.Generic.List[object]]::new()

foreach ($record in $records) {
  $kinds = @(Get-IntegralKinds $record.excerpt)
  if (-not $kinds.Count) { continue }
  $candidates.Add([pscustomobject]@{
    id = $record.id
    sourceId = $record.sourceId
    year = $record.year
    session = $record.session
    page = $record.page
    kinds = $kinds
    excerpt = $record.excerpt
  })
}

$summary = @{}
foreach ($kind in @('primitive-explicit', 'recover-from-derivative', 'multiple-integrals', 'definite-explicit', 'area', 'integral-bounds-review')) {
  $summary[$kind] = @($candidates | Where-Object { $_.kinds -contains $kind }).Count
}

$output = [pscustomobject]@{
  generatedAt = (Get-Date).ToString('o')
  course = $Course
  analysisProblems = $records.Count
  integralCandidates = $candidates.Count
  summary = $summary
  records = $candidates
}

$resolvedOutput = [System.IO.Path]::GetFullPath($OutputJson)
$outputDirectory = Split-Path -Parent $resolvedOutput
if (-not (Test-Path -LiteralPath $outputDirectory)) {
  New-Item -ItemType Directory -Path $outputDirectory | Out-Null
}
[System.IO.File]::WriteAllText($resolvedOutput, ($output | ConvertTo-Json -Depth 8), [System.Text.UTF8Encoding]::new($false))
$output | Select-Object course, analysisProblems, integralCandidates, summary | ConvertTo-Json -Depth 5
