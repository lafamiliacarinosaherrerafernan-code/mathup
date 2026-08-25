param()

$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$artifactRoot = Join-Path $projectRoot 'artifacts\official-pau-madrid-andalucia'
$workRoot = Join-Path $artifactRoot '.work'
$pdfTool = 'C:\Program Files\Git\clangarm64\bin\pdftotext.exe'
New-Item -ItemType Directory -Force -Path $artifactRoot, $workRoot | Out-Null

function Read-JsonLines([string]$path) {
  if (-not (Test-Path -LiteralPath $path)) { return @() }
  return @(Get-Content -LiteralPath $path -Encoding UTF8 | Where-Object { $_.Trim() } | ForEach-Object { $_ | ConvertFrom-Json })
}

function Remove-Diacritics([string]$value) {
  if (-not $value) { return '' }
  $formD = $value.Normalize([Text.NormalizationForm]::FormD)
  $builder = New-Object Text.StringBuilder
  foreach ($ch in $formD.ToCharArray()) {
    if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($ch) -ne [Globalization.UnicodeCategory]::NonSpacingMark) { [void]$builder.Append($ch) }
  }
  return $builder.ToString().Normalize([Text.NormalizationForm]::FormC)
}

function Normalize-Literal([string]$value) {
  $v = (Remove-Diacritics $value).ToLowerInvariant()
  $v = $v -replace '<[^>]+>',' '
  $v = $v -replace '[^a-z0-9λμσπxyz]+',' '
  return ($v -replace '\s+',' ').Trim()
}

function Get-Tokens([string]$value) {
  return @((Normalize-Literal $value).Split(' ') | Where-Object { $_.Length -ge 2 } | Sort-Object -Unique)
}

function Get-Shingles([string]$value, [int]$width = 4) {
  $tokens = @((Normalize-Literal $value).Split(' ') | Where-Object { $_ })
  $result = @()
  if ($tokens.Count -lt $width) { return $result }
  for ($i=0; $i -le $tokens.Count-$width; $i++) { $result += ($tokens[$i..($i+$width-1)] -join ' ') }
  return @($result | Sort-Object -Unique)
}

function Get-PdfPages([string]$relativePath) {
  $absolute = Join-Path $projectRoot ($relativePath.Replace('/','\'))
  if (-not (Test-Path -LiteralPath $absolute) -or -not (Test-Path -LiteralPath $pdfTool)) { return @() }
  $txt = Join-Path $workRoot (([guid]::NewGuid().ToString())+'.txt')
  try {
    $previousPreference = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try { & $pdfTool -enc UTF-8 -layout -- $absolute $txt 2>$null } finally { $ErrorActionPreference = $previousPreference }
    if (-not (Test-Path -LiteralPath $txt)) { return @() }
    return @(([IO.File]::ReadAllText($txt) -split "`f") | Where-Object { $_.Trim() })
  } finally { if (Test-Path -LiteralPath $txt) { Remove-Item -LiteralPath $txt -Force } }
}

function Get-HistoricalStatement($record) {
  $pieces = New-Object Collections.Generic.List[string]
  foreach ($paragraph in @($record.exercise.statement)) { if ($paragraph.plain) { $pieces.Add([string]$paragraph.plain) } }
  foreach ($part in @($record.exercise.parts)) {
    if ($part.label) { $pieces.Add([string]$part.label) }
    foreach ($paragraph in @($part.paragraphs)) {
      if ($paragraph -is [string]) { $pieces.Add([string]$paragraph) }
      elseif ($paragraph.plain) { $pieces.Add([string]$paragraph.plain) }
      else { $pieces.Add([string]$paragraph) }
    }
  }
  return ($pieces -join "`n").Trim()
}

function Get-Year([string]$source) {
  $m = [regex]::Match($source, '(?<!\d)(20\d{2})(?!\d)')
  if ($m.Success) { return [int]$m.Groups[1].Value }
  return $null
}

function Get-Sitting([string]$source) {
  if ($source -match '(?i)septiembre|julio|extraordinaria') { return 'Extraordinaria' }
  if ($source -match '(?i)junio|ordinaria') { return 'Ordinaria' }
  return 'Modelo/No verificable'
}

function Get-Option([string]$source) {
  $m = [regex]::Match($source, '(?i)opci[oó]n\s*([AB])')
  if ($m.Success) { return $m.Groups[1].Value.ToUpperInvariant() }
  return $null
}

$madridRegistry = @(Read-JsonLines (Join-Path $projectRoot 'sources\pau-official\madrid\document-registry.jsonl') | Where-Object verificationStatus -eq 'DOWNLOADED_VERIFIED_PDF')
$andaluciaRegistry = @(Read-JsonLines (Join-Path $projectRoot 'sources\pau-official\andalucia\document-registry.jsonl'))

$documentPages = @{}
foreach ($doc in $madridRegistry) { $documentPages[$doc.documentId] = @(Get-PdfPages $doc.localPath) }

$raw = [IO.File]::ReadAllText((Join-Path $projectRoot 'data\madrid-pau-authored.js'))
$json = $raw.Substring($raw.IndexOf('{'))
$json = $json.Substring(0,$json.LastIndexOf('}')+1)
$authored = $json | ConvertFrom-Json
$runtimeObservations = @(Read-JsonLines (Join-Path $projectRoot 'artifacts\fase2\runs\run-a\runtime-observations.jsonl'))
$canonicalSourcesByHistoricalId = @{}
foreach ($observation in $runtimeObservations) {
  $currentId = [string]$observation.original.currentId
  if (-not $currentId.StartsWith('madrid-')) { continue }
  $historicalId = $currentId.Split('|')[0]
  if (-not $canonicalSourcesByHistoricalId.ContainsKey($historicalId)) {
    $canonicalSourcesByHistoricalId[$historicalId] = New-Object Collections.Generic.List[string]
  }
  $sourceRecordId = [string]$observation.sourceRecordId
  if ($sourceRecordId -and -not $canonicalSourcesByHistoricalId[$historicalId].Contains($sourceRecordId)) {
    $canonicalSourcesByHistoricalId[$historicalId].Add($sourceRecordId)
  }
}
$historic = @()
foreach ($subjectKey in @('2bach-mates','2bach-ccss')) {
  $subject = if ($subjectKey -eq '2bach-mates') { 'Matemáticas II' } else { 'Matemáticas Aplicadas a las CCSS II' }
  foreach ($property in $authored.$subjectKey.PSObject.Properties) {
    $literal = Get-HistoricalStatement $property.Value
    $canonicalSourceRecordIds = if ($canonicalSourcesByHistoricalId.ContainsKey($property.Name)) {
      @($canonicalSourcesByHistoricalId[$property.Name] | Sort-Object -Unique)
    } else { @() }
    $historic += [pscustomobject]@{
      historicalRecordId=$property.Name; sourceRecordIds=$canonicalSourceRecordIds; subject=$subject; source=[string]$property.Value.exercise.source
      year=Get-Year ([string]$property.Value.exercise.source); sitting=Get-Sitting ([string]$property.Value.exercise.source)
      option=Get-Option ([string]$property.Value.exercise.source); literal=$literal
      normalizedHash=([BitConverter]::ToString(([Security.Cryptography.SHA256]::Create()).ComputeHash([Text.Encoding]::UTF8.GetBytes((Normalize-Literal $literal)))).Replace('-','').ToLowerInvariant())
    }
  }
}

$decisions = @()
foreach ($item in $historic) {
  $eligibleDocs = @($madridRegistry | Where-Object { $_.subject -eq $item.subject -and $_.year -eq $item.year })
  if ($item.sitting -ne 'Modelo/No verificable') {
    $sameSitting = @($eligibleDocs | Where-Object sitting -eq $item.sitting)
    if ($sameSitting.Count -gt 0) { $eligibleDocs = $sameSitting }
  }
  $itemTokens = @(Get-Tokens $item.literal)
  $itemShingles = @(Get-Shingles $item.literal)
  $matches = @()
  foreach ($doc in $eligibleDocs) {
    $pages = @($documentPages[$doc.documentId])
    for ($pageIndex=0; $pageIndex -lt $pages.Count; $pageIndex++) {
      $page = [string]$pages[$pageIndex]
      $normalizedPage = Normalize-Literal $page
      $pageTokens = @(Get-Tokens $page)
      $pageTokenSet = @{}; foreach ($token in $pageTokens) { $pageTokenSet[$token]=$true }
      $tokenHits = @($itemTokens | Where-Object { $pageTokenSet.ContainsKey($_) }).Count
      $tokenCoverage = if ($itemTokens.Count) { $tokenHits / $itemTokens.Count } else { 0 }
      $shingleHits = @($itemShingles | Where-Object { $normalizedPage.Contains($_) }).Count
      $shingleCoverage = if ($itemShingles.Count) { $shingleHits / $itemShingles.Count } else { 0 }
      $normalizedItem = Normalize-Literal $item.literal
      $exact = $normalizedItem.Length -ge 40 -and $normalizedPage.Contains($normalizedItem)
      $score = if ($exact) { 1.0 } else { (0.65*$tokenCoverage + 0.35*$shingleCoverage) }
      if ($score -ge 0.30) {
        $matches += [pscustomobject]@{ documentId=$doc.documentId; page=$pageIndex+1; score=[Math]::Round($score,6); exact=$exact; tokenCoverage=[Math]::Round($tokenCoverage,6); shingleCoverage=[Math]::Round($shingleCoverage,6) }
      }
    }
  }
  $ranked = @($matches | Sort-Object score -Descending)
  $best = $ranked | Select-Object -First 1
  $second = $ranked | Select-Object -Skip 1 -First 1
  $classification = 'NOT_FOUND'
  if ($best) {
    if ($best.exact) { $classification='DOCUMENT_MATCH_EXACT' }
    elseif ($best.score -ge 0.72 -and (-not $second -or ($best.score-$second.score) -ge 0.04)) { $classification='DOCUMENT_MATCH_STRUCTURAL' }
    elseif ($best.score -ge 0.55 -and $second -and [Math]::Abs($best.score-$second.score) -lt 0.04) { $classification='AMBIGUOUS' }
    elseif ($best.score -ge 0.45) { $classification='HUMAN_REVIEW_REQUIRED' }
  }
  $differenceFlags = @()
  if ($classification -eq 'DOCUMENT_MATCH_STRUCTURAL') { $differenceFlags += 'TRANSCRIPTION_DIFFERENCE' }
  if ($item.literal -match '(?i)conteste|opci[oó]n\s+[ab]|instrucciones') { $differenceFlags += 'SEGMENTATION_DIFFERENCE_POSSIBLE' }
  if ($item.literal -match '\[\[|transpuesta|det\(|integral|limite|límite') { $differenceFlags += 'MATH_NOTATION_DIFFERENCE_POSSIBLE' }
  $decisions += [pscustomobject]@{
    historicalRecordId=$item.historicalRecordId; sourceRecordIds=@($item.sourceRecordIds); subject=$item.subject; historicalSource=$item.source; year=$item.year
    sitting=$item.sitting; option=$item.option; historicalLiteral=$item.literal; normalizedHash=$item.normalizedHash
    classification=$classification; differenceFlags=@($differenceFlags | Sort-Object -Unique)
    officialDocumentId=if ($best) {$best.documentId}else{$null}; officialPage=if($best){$best.page}else{$null}
    score=if($best){$best.score}else{0}; alternativesConsidered=$ranked.Count
  }
}

[IO.File]::WriteAllLines((Join-Path $artifactRoot 'madrid-historical-reconciliation.jsonl'), @($decisions | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 7 }), [Text.UTF8Encoding]::new($false))

$duplicates = @()
foreach ($group in ($historic | Group-Object normalizedHash | Where-Object Count -gt 1)) {
  $duplicates += [pscustomobject]@{
    normalizedHash=$group.Name
    historicalRecordIds=@($group.Group.historicalRecordId | Sort-Object)
    sourceRecordIds=@($group.Group.sourceRecordIds | ForEach-Object { @($_) } | Sort-Object -Unique)
    count=$group.Count
    subjects=@($group.Group.subject | Sort-Object -Unique)
  }
}
[IO.File]::WriteAllLines((Join-Path $artifactRoot 'madrid-historical-duplicates.jsonl'), @($duplicates | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 5 }), [Text.UTF8Encoding]::new($false))

$andaluciaStructures = @()
foreach ($doc in ($andaluciaRegistry | Where-Object documentRole -eq 'exam')) {
  $andaluciaStructures += [pscustomobject]@{
    documentId=$doc.documentId; subject=$doc.subject; year=$doc.year; sitting=$doc.sitting; model=$doc.model
    officialPackageUrl=$doc.officialPackageUrl; archivePath=$doc.originalArchivePath; localPath=$doc.localPath
    pages=$doc.pages; detectedExercises=$doc.detectedExercises
    segmentationPolicy='ANDALUCIA_DOCUMENT_NATIVE_PENDING_PAGE_LEVEL_CERTIFICATION'
    notes='Titular/Reserva/Suplente y variante A/B se conservan como metadatos propios; no se aplican reglas de Madrid o Castilla-La Mancha.'
  }
}
[IO.File]::WriteAllLines((Join-Path $artifactRoot 'andalucia-exam-structures.jsonl'), @($andaluciaStructures | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 6 }), [Text.UTF8Encoding]::new($false))

$madridCoverage = Get-Content (Join-Path $projectRoot 'artifacts\madrid-official-pau-reconciliation\coverage-matrix.json') -Encoding UTF8 -Raw | ConvertFrom-Json
$andaluciaCoverage = Get-Content (Join-Path $projectRoot 'artifacts\andalucia-official-pau-library\coverage-matrix.json') -Encoding UTF8 -Raw | ConvertFrom-Json
$combined = @()
foreach ($row in $madridCoverage) {
  $hist = @($historic | Where-Object { $_.subject -eq $row.subject -and $_.year -eq $row.year -and ($_.sitting -eq $row.sitting -or $_.sitting -eq 'Modelo/No verificable') })
  $rec = @($decisions | Where-Object { $_.subject -eq $row.subject -and $_.year -eq $row.year -and $_.classification -in @('DOCUMENT_MATCH_EXACT','DOCUMENT_MATCH_STRUCTURAL') })
  $combined += [pscustomobject]@{
    community='Madrid'; subject=$row.subject; year=$row.year; sittingModel=$row.sitting
    officialSource=@($row.authorities) -join ', '; officialPdfLocated=$row.officialPdfLocated; officialPdfCensused=$row.officialPdfCensused
    historicalExercises=$hist.Count; detectedOrReconciledExercises=$rec.Count; status=$row.status
  }
}
foreach ($row in $andaluciaCoverage) {
  $combined += [pscustomobject]@{
    community='Andalucía'; subject=$row.subject; year=$row.year; sittingModel=($row.sitting + $(if(@($row.models).Count){' / '+(@($row.models)-join ', ')}else{''}))
    officialSource=$row.authority; officialPdfLocated=$row.officialPdfLocated; officialPdfCensused=$row.officialPdfCensused
    historicalExercises=0; detectedOrReconciledExercises=$row.detectedExercises; status=$row.status
  }
}
[IO.File]::WriteAllText((Join-Path $artifactRoot 'coverage-matrix-2000-2026.json'), ($combined | ConvertTo-Json -Depth 7), [Text.UTF8Encoding]::new($false))

$priorDecisions = @(Read-JsonLines (Join-Path $projectRoot 'artifacts\pau-documentary-reconciliation\runs\run-a\reconciliation-decisions.jsonl'))
$priorMadridNotFoundSourceIds = New-Object Collections.Generic.HashSet[string]
foreach ($prior in ($priorDecisions | Where-Object status -eq 'NOT_FOUND')) {
  foreach ($sourceRecordId in @($prior.sourceRecordIds)) {
    if ($canonicalSourcesByHistoricalId.Values | Where-Object { $_.Contains([string]$sourceRecordId) }) {
      [void]$priorMadridNotFoundSourceIds.Add([string]$sourceRecordId)
    }
  }
}
$impactRows = @()
foreach ($decision in $decisions) {
  $affected = @($decision.sourceRecordIds | Where-Object { $priorMadridNotFoundSourceIds.Contains([string]$_) })
  if ($affected.Count -eq 0) { continue }
  $impactRows += [pscustomobject]@{
    historicalRecordId=$decision.historicalRecordId
    sourceRecordIds=$affected
    subject=$decision.subject
    year=$decision.year
    sitting=$decision.sitting
    newClassification=$decision.classification
    officialDocumentId=$decision.officialDocumentId
    officialPage=$decision.officialPage
  }
}
$impactSummary = [pscustomobject]@{
  priorMadridNotFoundDeclared=1687
  priorMadridNotFoundSourceIdsMapped=$priorMadridNotFoundSourceIds.Count
  historicalRecordsAffected=$impactRows.Count
  sourceRecordIdsWithExactOrStructural=@($impactRows | Where-Object newClassification -in @('DOCUMENT_MATCH_EXACT','DOCUMENT_MATCH_STRUCTURAL') | ForEach-Object sourceRecordIds | Sort-Object -Unique).Count
  sourceRecordIdsStillNotFound=@($impactRows | Where-Object newClassification -eq 'NOT_FOUND' | ForEach-Object sourceRecordIds | Sort-Object -Unique).Count
  distribution=@($impactRows | Group-Object newClassification | ForEach-Object { [pscustomobject]@{classification=$_.Name;historicalRecords=$_.Count;sourceRecordIds=@($_.Group.sourceRecordIds | ForEach-Object { @($_) } | Sort-Object -Unique).Count} })
}
$impact = [pscustomobject]@{
  summary=$impactSummary
  rows=$impactRows
}
[IO.File]::WriteAllText((Join-Path $artifactRoot 'impact-on-prior-madrid-not-found.json'), ($impact | ConvertTo-Json -Depth 8), [Text.UTF8Encoding]::new($false))

$summary = [pscustomobject]@{
  generatedAt=(Get-Date).ToString('o'); projectRootReference='APP MARGARITA SALAS'
  madridHistoricRecords=$historic.Count; madridEstimatedUnique=($historic | Group-Object normalizedHash).Count
  madridDuplicateGroups=$duplicates.Count; madridDuplicateRecords=($duplicates | Measure-Object -Property count -Sum).Sum
  madridHistoricalRecordsWithCanonicalSourceIds=@($historic | Where-Object { $_.sourceRecordIds.Count -gt 0 }).Count
  madridCanonicalSourceRecordIds=@($historic.sourceRecordIds | ForEach-Object { @($_) } | Sort-Object -Unique).Count
  madridReconciliation=@($decisions | Group-Object classification | ForEach-Object { [pscustomobject]@{classification=$_.Name;count=$_.Count} })
  impactOnPriorMadridNotFound=$impactSummary
  madridOfficialPdfs=$madridRegistry.Count
  andaluciaOfficialPdfs=$andaluciaRegistry.Count; andaluciaExamPdfs=$andaluciaStructures.Count
  andaluciaDetectedExercises=($andaluciaStructures | Measure-Object -Property detectedExercises -Sum).Sum
  combinedCoverageRows=$combined.Count
  mandatoryMissingRows=@($combined | Where-Object { $_.year -ge 2010 -and -not $_.officialPdfCensused }).Count
}
[IO.File]::WriteAllText((Join-Path $artifactRoot 'summary.json'), ($summary | ConvertTo-Json -Depth 7), [Text.UTF8Encoding]::new($false))
$summary | ConvertTo-Json -Depth 7
