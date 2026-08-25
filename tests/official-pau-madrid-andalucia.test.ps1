param()

$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$failures = New-Object Collections.Generic.List[string]
$passes = New-Object Collections.Generic.List[string]

function Assert-True([bool]$condition, [string]$message) {
  if ($condition) { $passes.Add($message) } else { $failures.Add($message) }
}

function Read-JsonLines([string]$path) {
  return @(Get-Content -LiteralPath $path -Encoding UTF8 | Where-Object { $_.Trim() } | ForEach-Object { $_ | ConvertFrom-Json })
}

function Test-Registry([object[]]$registry, [string]$community) {
  foreach ($document in $registry) {
    $absolute = Join-Path $projectRoot ($document.localPath.Replace('/','\'))
    Assert-True (Test-Path -LiteralPath $absolute -PathType Leaf) "${community}: existe $($document.documentId)"
    if (-not (Test-Path -LiteralPath $absolute -PathType Leaf)) { continue }
    $bytes = [IO.File]::ReadAllBytes($absolute)
    Assert-True ($bytes.Length -ge 5 -and [Text.Encoding]::ASCII.GetString($bytes,0,5) -eq '%PDF-') "${community}: firma PDF $($document.documentId)"
    $actual = (Get-FileHash -LiteralPath $absolute -Algorithm SHA256).Hash.ToLowerInvariant()
    Assert-True ($actual -eq ([string]$document.sha256).ToLowerInvariant()) "${community}: SHA-256 $($document.documentId)"
  }
}

$madridRegistry = @(Read-JsonLines (Join-Path $projectRoot 'sources\pau-official\madrid\document-registry.jsonl') | Where-Object verificationStatus -eq 'DOWNLOADED_VERIFIED_PDF')
$andaluciaRegistry = @(Read-JsonLines (Join-Path $projectRoot 'sources\pau-official\andalucia\document-registry.jsonl'))
$coverage = Get-Content -LiteralPath (Join-Path $projectRoot 'artifacts\official-pau-madrid-andalucia\coverage-matrix-2000-2026.json') -Encoding UTF8 -Raw | ConvertFrom-Json
$decisions = @(Read-JsonLines (Join-Path $projectRoot 'artifacts\official-pau-madrid-andalucia\madrid-historical-reconciliation.jsonl'))
$summary = Get-Content -LiteralPath (Join-Path $projectRoot 'artifacts\official-pau-madrid-andalucia\summary.json') -Encoding UTF8 -Raw | ConvertFrom-Json
$impact = Get-Content -LiteralPath (Join-Path $projectRoot 'artifacts\official-pau-madrid-andalucia\impact-on-prior-madrid-not-found.json') -Encoding UTF8 -Raw | ConvertFrom-Json

Assert-True ($madridRegistry.Count -eq 79) 'Madrid: 79 PDF oficiales verificados'
Assert-True ($andaluciaRegistry.Count -eq 397) 'Andalucía: 397 PDF oficiales únicos censados'
Assert-True (@($andaluciaRegistry | Where-Object documentRole -eq 'exam').Count -eq 204) 'Andalucía: 204 PDF de examen'
Assert-True (@($andaluciaRegistry | Where-Object documentRole -eq 'correction-criteria').Count -eq 178) 'Andalucía: 178 PDF de criterios'
Assert-True ($coverage.Count -eq 191) 'Matriz combinada: 191 filas documentales'
Assert-True (@($coverage | Where-Object { $_.year -ge 2010 -and -not $_.officialPdfCensused }).Count -eq 17) 'Cobertura obligatoria: 17 huecos explícitos'
Assert-True (@($coverage | Where-Object { $_.community -match 'Andaluc' -and $_.year -ge 2010 -and -not $_.officialPdfCensused }).Count -eq 1) 'Andalucía 2010-2026: un hueco explícito'
Assert-True (@($coverage | Where-Object { $_.community -match 'Andaluc' -and $_.subject -eq 'Matemáticas II' -and $_.year -ge 2010 -and -not $_.officialPdfCensused }).Count -eq 0) 'Andalucía Matemáticas II: cobertura anual 2010-2026'
Assert-True (@($coverage | Where-Object { $_.community -match 'Andaluc' -and $_.subject -match 'CCSS' -and $_.year -eq 2012 -and -not $_.officialPdfCensused }).Count -eq 1) 'Andalucía CCSS II 2012: carencia documentada'
Assert-True (@($coverage | Where-Object { $_.year -lt 2000 -or $_.year -gt 2026 }).Count -eq 0) 'Matriz limitada a 2000-2026'
Assert-True (@($coverage | Group-Object community,subject).Count -eq 4) 'Matriz separa dos comunidades y dos materias'
Assert-True ($decisions.Count -eq 1728) 'Madrid: 1.728 registros históricos decididos'
Assert-True (@($decisions | Where-Object classification -eq 'DOCUMENT_MATCH_EXACT').Count -eq 0) 'Madrid: 0 coincidencias exactas sin sobrecertificación'
Assert-True (@($decisions | Where-Object classification -eq 'DOCUMENT_MATCH_STRUCTURAL').Count -eq 37) 'Madrid: 37 coincidencias estructurales'
Assert-True (@($decisions | Where-Object classification -eq 'AMBIGUOUS').Count -eq 3) 'Madrid: 3 coincidencias ambiguas'
Assert-True (@($decisions | Where-Object classification -eq 'HUMAN_REVIEW_REQUIRED').Count -eq 469) 'Madrid: 469 revisiones humanas requeridas'
Assert-True (@($decisions | Where-Object classification -eq 'NOT_FOUND').Count -eq 1219) 'Madrid: 1.219 no localizados'
Assert-True (@($decisions | Where-Object { $_.sourceRecordIds.Count -gt 0 }).Count -eq 1679) 'Madrid: 1.679 registros enlazados a sourceRecordId canónico'
Assert-True (@($decisions | Where-Object { $_.sourceRecordIds.Count -eq 0 }).Count -eq 49) 'Madrid: 49 registros históricos sin observación canónica materializada'
Assert-True ($summary.madridEstimatedUnique -eq 1723) 'Madrid: 1.723 literales únicos estimados'
Assert-True ($summary.madridDuplicateGroups -eq 5) 'Madrid: cinco grupos duplicados exactos'
Assert-True ($summary.andaluciaDetectedExercises -eq 1616) 'Andalucía: 1.616 unidades de ejercicio detectadas provisionalmente'
Assert-True ($impact.summary.priorMadridNotFoundDeclared -eq 1687) 'Impacto: línea base de 1.687 NOT_FOUND Madrid'
Assert-True ($impact.summary.priorMadridNotFoundSourceIdsMapped -eq 1679) 'Impacto: 1.679 sourceRecordId previos mapeados'
Assert-True ($impact.summary.sourceRecordIdsWithExactOrStructural -eq 37) 'Impacto: 37 sourceRecordId con contraste estructural'

Test-Registry $madridRegistry 'Madrid'
Test-Registry $andaluciaRegistry 'Andalucía'

$result = [pscustomobject]@{
  generatedAt=(Get-Date).ToString('o')
  passed=$passes.Count
  failed=$failures.Count
  failures=$failures
}
$resultPath = Join-Path $projectRoot 'artifacts\official-pau-madrid-andalucia\test-results.json'
[IO.File]::WriteAllText($resultPath, ($result | ConvertTo-Json -Depth 5), [Text.UTF8Encoding]::new($false))
$result | ConvertTo-Json -Depth 5
if ($failures.Count -gt 0) { exit 1 }
