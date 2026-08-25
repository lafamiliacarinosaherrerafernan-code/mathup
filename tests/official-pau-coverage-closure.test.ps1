$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$artifactRoot = Join-Path $projectRoot 'artifacts\official-pau-coverage-closure'
$madridRegistryPath = Join-Path $projectRoot 'sources\pau-official\madrid\coverage-closure-registry.jsonl'
$andaluciaRegistryPath = Join-Path $projectRoot 'sources\pau-official\andalucia\coverage-closure-registry.jsonl'

function Assert($Condition, [string]$Message) {
  if (-not $Condition) { throw "FAIL: $Message" }
}

$madrid = @([IO.File]::ReadAllLines($madridRegistryPath, [Text.Encoding]::UTF8) | Where-Object { $_.Trim() } | ForEach-Object { $_ | ConvertFrom-Json })
$andalucia = @([IO.File]::ReadAllLines($andaluciaRegistryPath, [Text.Encoding]::UTF8) | Where-Object { $_.Trim() } | ForEach-Object { $_ | ConvertFrom-Json })
$coverage = [IO.File]::ReadAllText((Join-Path $artifactRoot 'coverage-matrix-2000-2026.json'), [Text.Encoding]::UTF8) | ConvertFrom-Json
$criteria = @([IO.File]::ReadAllLines((Join-Path $artifactRoot 'andalucia-exam-criteria-matches.jsonl'), [Text.Encoding]::UTF8) | Where-Object { $_.Trim() } | ForEach-Object { $_ | ConvertFrom-Json })
$summary = [IO.File]::ReadAllText((Join-Path $artifactRoot 'summary.json'), [Text.Encoding]::UTF8) | ConvertFrom-Json

Assert (@($madrid | Where-Object verificationStatus -eq 'DOWNLOADED_VERIFIED_OFFICIAL_PDF').Count -eq 24) 'Deben existir 24 PDF UAH verificados.'
Assert (@($andalucia | Where-Object documentRole -eq 'exam').Count -eq 6) 'Deben existir 6 exámenes oficiales DOC de Andalucía 2012.'
Assert (@($andalucia | Where-Object documentRole -eq 'correction-criteria').Count -eq 6) 'Deben existir 6 criterios oficiales DOC de Andalucía 2012.'
Assert (@($andalucia | Where-Object { $_.verificationStatus -ne 'DOWNLOADED_VERIFIED_OFFICIAL_NON_PDF' }).Count -eq 0) 'Los DOC deben conservarse como oficial no PDF.'
Assert ($criteria.Count -eq 184) 'Deben clasificarse los 178 criterios PDF previos y 6 criterios DOC nuevos.'
Assert (@($criteria | Where-Object { $_.classification -notin @('CRITERIA_MATCH_EXACT','CRITERIA_MATCH_STRUCTURAL','CRITERIA_MATCH_AMBIGUOUS','CRITERIA_NOT_FOUND') }).Count -eq 0) 'Toda relación de criterios debe tener clasificación permitida.'
Assert ([int]$summary.targetedAnnualGapsResolved -eq 5) 'Los cinco huecos anuales prioritarios deben quedar resueltos.'

foreach ($subject in @('Matemáticas II','Matemáticas Aplicadas a las CCSS II')) {
  foreach ($community in @('Madrid','Andalucía')) {
    $rows = @($coverage | Where-Object { $_.community -eq $community -and $_.subject -eq $subject -and $_.year -ge 2010 -and $_.year -le 2026 })
    $years = @($rows | Where-Object { $_.yearCovered -eq $true } | Select-Object -ExpandProperty year -Unique)
    Assert ($years.Count -eq 17) "$community / $subject debe tener cobertura anual 17/17."
  }
}

$missingMadridCcss2011Extra = @($coverage | Where-Object {
  $_.community -eq 'Madrid' -and $_.subject -eq 'Matemáticas Aplicadas a las CCSS II' -and
  $_.year -eq 2011 -and $_.sittingModel -eq 'Extraordinaria' -and -not $_.sessionCovered
})
Assert ($missingMadridCcss2011Extra.Count -eq 1) 'Debe quedar explícita la convocatoria Madrid CCSS II extraordinaria 2011 no localizada.'

$sourceIds = @($madrid + $andalucia | Where-Object documentId | Select-Object -ExpandProperty documentId)
Assert (($sourceIds | Where-Object { -not $_ }).Count -eq 0) 'Todo documento suplementario descargado debe tener documentId.'
Assert (@($madrid.sha256 | Sort-Object -Unique).Count -eq 22) 'Los 24 enlaces UAH deben conservar 22 contenidos PDF distintos; dos pares son alias byte a byte.'
Assert (Test-Path -LiteralPath (Join-Path $projectRoot 'docs\CIERRE-COBERTURA-OFICIAL-PAU-MADRID-ANDALUCIA-MATHUP.md')) 'Debe existir el informe final.'

[pscustomobject]@{ passed=$true; assertions=13; madridOfficialPdfs=$madrid.Count; andaluciaOfficialDocs=$andalucia.Count; criteria=$criteria.Count } | ConvertTo-Json
