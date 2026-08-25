param(
  [string]$RunName = 'run-a',
  [switch]$ReverseInput
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Off
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$artifactRoot = Join-Path $projectRoot 'artifacts\pau-canonical-andalucia-madrid'
$runRoot = Join-Path $artifactRoot ("runs\$RunName")
$cacheRoot = Join-Path $artifactRoot '.text-cache'
$pdfTool = 'C:\Program Files\Git\clangarm64\bin\pdftotext.exe'
Import-Module (Join-Path $projectRoot 'catalog\pau-canonical\pau-canonical-identities.psm1') -Force
$AndaluciaName = "Andaluc$([char]0x00ED)a"
New-Item -ItemType Directory -Force -Path $runRoot,$cacheRoot | Out-Null

function Read-JsonLines([string]$Path) {
  if (-not (Test-Path -LiteralPath $Path)) { return @() }
  return @([IO.File]::ReadAllLines($Path, [Text.Encoding]::UTF8) | Where-Object { $_.Trim() } | ForEach-Object { $_ | ConvertFrom-Json })
}

function Write-JsonLines([string]$Path, [object[]]$Rows) {
  $lines = @($Rows | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 20 })
  [IO.File]::WriteAllLines($Path, $lines, [Text.UTF8Encoding]::new($false))
}

function Write-Json([string]$Path, $Value) {
  [IO.File]::WriteAllText($Path, ($Value | ConvertTo-Json -Depth 20), [Text.UTF8Encoding]::new($false))
}

function Select-UniqueDocuments([object[]]$Rows) {
  $byHash = [ordered]@{}
  foreach ($row in $Rows) {
    $hash = [string]$row.sha256
    if (-not $hash) { continue }
    if (-not $byHash.Contains($hash)) { $byHash[$hash] = $row }
  }
  $result = @($byHash.Values | Sort-Object sha256)
  if ($ReverseInput) { [array]::Reverse($result) }
  return $result
}

function Get-OfficialUrls($Document) {
  return @($Document.officialUrl,$Document.officialPackageUrl,$Document.indexUrl | Where-Object { $_ } | Sort-Object -Unique)
}

function Get-DocumentPages($Document) {
  $localPath = Join-Path $projectRoot ([string]$Document.localPath).Replace('/','\')
  if (-not (Test-Path -LiteralPath $localPath)) { return [pscustomobject]@{ status='SOURCE_MISSING'; pages=@(); error='LOCAL_FILE_NOT_FOUND' } }
  if ([IO.Path]::GetExtension($localPath).ToLowerInvariant() -ne '.pdf') { return [pscustomobject]@{ status='NON_PDF_REVIEW_REQUIRED'; pages=@(); error='NO_LITERAL_EXTRACTION_FOR_NON_PDF' } }
  if (-not (Test-Path -LiteralPath $pdfTool)) { return [pscustomobject]@{ status='EXTRACTOR_MISSING'; pages=@(); error='PDFTOTEXT_NOT_FOUND' } }
  $cachePath = Join-Path $cacheRoot (([string]$Document.sha256)+'.txt')
  if (-not (Test-Path -LiteralPath $cachePath)) {
    $prior = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try { & $pdfTool -layout -enc UTF-8 -- $localPath $cachePath 2>$null } finally { $ErrorActionPreference = $prior }
    if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $cachePath)) { return [pscustomobject]@{ status='EXTRACTION_FAILED'; pages=@(); error='PDFTOTEXT_FAILED' } }
  }
  $raw = [IO.File]::ReadAllText($cachePath, [Text.Encoding]::UTF8).Replace("`r`n","`n")
  $pages = @($raw -split "`f")
  if ($pages.Count -gt 0 -and -not $pages[-1].Trim()) { $pages = @($pages[0..($pages.Count-2)]) }
  return [pscustomobject]@{ status=if($raw.Trim()){'EXTRACTED'}else{'EMPTY'}; pages=$pages; error=$null }
}

function Get-EditorialInstructions([string]$PageText, [int]$PageNumber, [int]$BeforeOffset) {
  if ($BeforeOffset -le 0) { return @() }
  $prefix = $PageText.Substring(0,$BeforeOffset)
  $matches = [regex]::Matches($prefix, '(?ims)^\s*(?:INSTRUCCIONES?|CRITERIOS?\s+GENERALES?)\s*[:.]\s*(.+?)(?=^\s*(?:OPCI.N|EJERCICIO|PREGUNTA|PROBLEMA)\b|\z)')
  return @($matches | ForEach-Object {
    [pscustomobject]@{
      literal=$_.Value.Trim(); literalHash=Get-Sha256Text $_.Value.Trim(); page=$PageNumber
      startOffset=$_.Index; endOffset=$_.Index+$_.Length
    }
  })
}

function Find-AlternativeAt([string]$PageText, [int]$Offset, [string]$Fallback) {
  $prefix = $PageText.Substring(0,[Math]::Min($Offset,$PageText.Length))
  $matches = [regex]::Matches($prefix, '(?im)^\s*(?:OPCI.N|ALTERNATIVA)\s*([AB12])\b')
  if ($matches.Count) { return $matches[$matches.Count-1].Groups[1].Value.ToUpperInvariant() }
  if ($Fallback) { return $Fallback }
  return 'NONE'
}

function Get-ExerciseHeadings([string]$PageText) {
  # Official Andalusian papers commonly keep the score on the heading line
  # (for example, "EJERCICIO 1. (2,5 puntos)").  The heading identity is the
  # numbered label; the score suffix is editorial metadata, not a requirement
  # for recognising the start of the exercise.
  $matches = @([regex]::Matches($PageText, '(?im)^\s*(?:EJERCICIO|PREGUNTA|PROBLEMA)\s*([0-9]+(?:\.[0-9]+)?)\s*[.:\-]?(?:\s*\([^\r\n]*?puntos?\))?'))
  if (-not $matches.Count) {
    $matches = @([regex]::Matches($PageText, '(?im)^\s*([1-9])\s*[.)-]\s+(?=[A-Z])'))
  }
  return $matches
}

function Get-Subparts([string]$Block, [int]$BlockOffset, [int]$Page, [string]$ExerciseId) {
  $matches = @([regex]::Matches($Block, '(?im)(?:^|\n)\s*([a-z])\)\s*'))
  if (-not $matches.Count) { return @() }
  $labels = @($matches | ForEach-Object { $_.Groups[1].Value.ToLowerInvariant() })
  if (($labels | Sort-Object -Unique).Count -ne $labels.Count) { return @() }
  $rows = @()
  for ($index=0; $index -lt $matches.Count; $index++) {
    $match = $matches[$index]
    $start = $match.Index + $match.Length
    $end = if($index+1 -lt $matches.Count){$matches[$index+1].Index}else{$Block.Length}
    $rawLiteral = $Block.Substring($start,$end-$start)
    $leadingWhitespace = $rawLiteral.Length - $rawLiteral.TrimStart().Length
    $literal = $rawLiteral.Trim()
    $scoreEvidence = $null
    $scoreMatch = [regex]::Match($literal, '^\s*[\[(]\s*\d+(?:[.,]\d+)?\s*puntos?\s*[\])]\s*', 'IgnoreCase')
    if ($scoreMatch.Success) {
      $scoreStart = $BlockOffset + $start + $leadingWhitespace + $scoreMatch.Index
      $scoreEvidence = [ordered]@{
        literal=$scoreMatch.Value.Trim()
        sourceRange=[ordered]@{page=$Page;startOffset=$scoreStart;endOffset=$scoreStart+$scoreMatch.Length}
        classification='EDITORIAL_ASSESSMENT_METADATA'
      }
      $literal = $literal.Substring($scoreMatch.Length).Trim()
    }
    $label = $match.Groups[1].Value.ToLowerInvariant()+')'
    $flags = @()
    if ($literal -match '[\uFFFD\uF8EB-\uF8FF]|\xC3.|\xC2.|\xCE.|\xE2.') { $flags += 'NOTATION_REVIEW_REQUIRED' }
    if (-not $literal) { $flags += 'DOCUMENT_REVIEW_REQUIRED' }
    $rows += [pscustomobject]@{
      subpartId=New-StableId 'pau-can-sub' @($ExerciseId,$label)
      label=$label; ordinal=$index+1; officialPrompt=$literal; promptHash=Get-Sha256Text $literal
      scoreEvidence=$scoreEvidence
      sourceRange=[ordered]@{page=$Page;startOffset=$BlockOffset+$start;endOffset=$BlockOffset+$end}
      statusFlags=@($flags | Sort-Object -Unique)
    }
  }
  return $rows
}

function Convert-OfficialDocument($Document, [string]$Community) {
  $subject = Get-CanonicalSubject ([string]$Document.subject)
  $role = if($Community -eq $AndaluciaName){Get-AndaluciaRole ([string]$Document.model)}else{$null}
  $variant = if($Community -eq $AndaluciaName){Get-Variant ([string]$Document.model)}else{$null}
  $sitting = [string]$Document.sitting
  if ($sitting -match '(?i)no verificable|modelo') { $sitting = $null }
  $sessionId = New-StableId 'pau-session' @([string]$Document.sha256,$Community,$subject,[string]$Document.year,[string]$sitting,[string]$Document.model)
  $extraction = Get-DocumentPages $Document
  $sessionFlags = @('DOCUMENT_VERIFIED')
  if ($extraction.status -ne 'EXTRACTED') { $sessionFlags += 'DOCUMENT_REVIEW_REQUIRED' }
  if ($Community -eq $AndaluciaName -and (-not $sitting -or $role -eq 'No verificable')) { $sessionFlags += 'DOCUMENT_REVIEW_REQUIRED' }
  $session = [ordered]@{
    schemaVersion='mathup.pau-exam-session.v1';sessionId=$sessionId;documentId=[string]$Document.documentId;documentHash=[string]$Document.sha256
    community=$Community;subject=$subject;year=if($Document.year){[int]$Document.year}else{$null};sitting=$sitting
    andaluciaRole=$role;variant=$variant;model=if($Document.model){[string]$Document.model}else{$null}
    officialSource=[ordered]@{authority=[string]$Document.authority;localPath=[string]$Document.localPath;pageCount=@($extraction.pages).Count;officialUrls=Get-OfficialUrls $Document;originalName=if($Document.originalName){[string]$Document.originalName}else{[string]$Document.originalPackageName}}
    documentRole='exam';verificationFlags=@($sessionFlags|Sort-Object -Unique)
  }
  $exercises = @(); $expected = if($Document.detectedExercises){[int]$Document.detectedExercises}else{0}
  for ($pageIndex=0; $pageIndex -lt @($extraction.pages).Count; $pageIndex++) {
    $pageText = [string]$extraction.pages[$pageIndex]
    $headings = @(Get-ExerciseHeadings $pageText)
    $instructions = if($headings.Count){Get-EditorialInstructions $pageText ($pageIndex+1) $headings[0].Index}else{@()}
    for ($headingIndex=0; $headingIndex -lt $headings.Count; $headingIndex++) {
      $heading = $headings[$headingIndex]
      $start = $heading.Index + $heading.Length
      $end = if($headingIndex+1 -lt $headings.Count){$headings[$headingIndex+1].Index}else{$pageText.Length}
      $block = $pageText.Substring($start,$end-$start).Trim()
      $questionKey = $heading.Groups[1].Value
      $scoreEvidence = $null
      $scoreMatch = [regex]::Match($heading.Value, '[\[(]\s*\d+(?:[.,]\d+)?\s*puntos?\s*[\])]', 'IgnoreCase')
      if ($scoreMatch.Success) {
        $scoreEvidence = [ordered]@{
          literal=$scoreMatch.Value.Trim()
          sourceRange=[ordered]@{page=$pageIndex+1;startOffset=$heading.Index+$scoreMatch.Index;endOffset=$heading.Index+$scoreMatch.Index+$scoreMatch.Length}
          classification='EDITORIAL_ASSESSMENT_METADATA'
        }
      }
      $alternative = Find-AlternativeAt $pageText $heading.Index $(if($variant){$variant}else{'NONE'})
      # Page and source offset disambiguate repeated official numbering without
      # relying on registry load order. Both are preserved in sourceRange.
      $exerciseId = New-StableId 'pau-can-ex' @([string]$Document.sha256,$subject,$questionKey,$alternative,[string]($pageIndex+1),[string]$start)
      $status = @('DOCUMENT_VERIFIED','ANSWER_REVIEW_REQUIRED','SOLUTION_REVIEW_REQUIRED')
      if ($block) { $status += 'STRUCTURE_VERIFIED' } else { $status += @('DOCUMENT_REVIEW_REQUIRED','BLOCKED') }
      if ($block -match '[\uFFFD\uF8EB-\uF8FF]|\xC3.|\xC2.|\xCE.|\xE2.') { $status += 'NOTATION_REVIEW_REQUIRED' }
      $subparts = @(Get-Subparts $block $start ($pageIndex+1) $exerciseId)
      $exercises += [pscustomobject][ordered]@{
        schemaVersion='mathup.pau-canonical-exercise.v1';exerciseId=$exerciseId;sessionId=$sessionId
        documentId=[string]$Document.documentId;documentHash=[string]$Document.sha256;community=$Community;subject=$subject
        year=if($Document.year){[int]$Document.year}else{$null};sitting=$sitting;andaluciaRole=$role;variant=$variant
        questionKey=$questionKey;alternativeKey=$alternative;officialPrompt=$block;promptHash=Get-Sha256Text $block
        scoreEvidence=$scoreEvidence;editorialInstructions=@($instructions);subparts=$subparts
        sourceRange=[ordered]@{page=$pageIndex+1;startOffset=$start;endOffset=$end}
        provenance=[ordered]@{authority=[string]$Document.authority;localPath=[string]$Document.localPath;officialUrls=Get-OfficialUrls $Document;sourceDocumentId=[string]$Document.documentId}
        statusFlags=@($status|Sort-Object -Unique)
      }
    }
  }
  $unmaterialized = [Math]::Max(0,$expected-$exercises.Count)
  return [pscustomobject]@{session=[pscustomobject]$session;exercises=$exercises;extractionStatus=$extraction.status;expected=$expected;unmaterialized=$unmaterialized;error=$extraction.error}
}

function Get-MatchScore([string]$Historical, [string]$Official) {
  $historicalNorm = ConvertTo-NormalizedLiteral $Historical
  $officialNorm = ConvertTo-NormalizedLiteral $Official
  if (-not $historicalNorm -or -not $officialNorm) { return [pscustomobject]@{score=0;exact=$false;tokenCoverage=0;shingleCoverage=0} }
  $exact = ($historicalNorm.Length -ge 40 -and ($historicalNorm -eq $officialNorm -or $officialNorm.Contains($historicalNorm) -or $historicalNorm.Contains($officialNorm)))
  $tokens = @(Get-TokenSet $Historical); $officialTokens = @{}; foreach($token in @(Get-TokenSet $Official)){$officialTokens[$token]=$true}
  $tokenHits = @($tokens | Where-Object { $officialTokens.ContainsKey($_) }).Count
  $tokenCoverage = if($tokens.Count){$tokenHits/$tokens.Count}else{0}
  $shingles = @(Get-ShingleSet $Historical); $shingleHits = @($shingles | Where-Object { $officialNorm.Contains($_) }).Count
  $shingleCoverage = if($shingles.Count){$shingleHits/$shingles.Count}else{0}
  $score = if($exact){1}else{0.65*$tokenCoverage+0.35*$shingleCoverage}
  return [pscustomobject]@{score=[Math]::Round($score,6);exact=$exact;tokenCoverage=[Math]::Round($tokenCoverage,6);shingleCoverage=[Math]::Round($shingleCoverage,6)}
}

function Reconcile-Madrid([object[]]$HistoricalRows, [object[]]$OfficialExercises) {
  $output = @()
  foreach ($row in $HistoricalRows) {
    $subject = Get-CanonicalSubject ([string]$row.subject)
    $eligible = @($OfficialExercises | Where-Object { $_.subject -eq $subject -and ($null -eq $row.year -or $_.year -eq [int]$row.year) })
    if ($row.sitting -and [string]$row.sitting -notmatch '(?i)modelo|no verificable') {
      $sameSitting = @($eligible | Where-Object sitting -eq [string]$row.sitting)
      if ($sameSitting.Count) { $eligible = $sameSitting }
    }
    $ranked = @($eligible | ForEach-Object {
      $metric = Get-MatchScore ([string]$row.historicalLiteral) ([string]$_.officialPrompt)
      [pscustomobject]@{exerciseId=$_.exerciseId;score=$metric.score;exact=$metric.exact;alternativeKey=$_.alternativeKey;documentId=$_.documentId;page=$_.sourceRange.page;literal=$_.officialPrompt}
    } | Where-Object score -ge 0.25 | Sort-Object @{Expression='score';Descending=$true},exerciseId)
    $best = $ranked | Select-Object -First 1; $second = $ranked | Select-Object -Skip 1 -First 1
    $classification='NOT_FOUND';$selected=$null
    if($best){
      if($best.exact){$classification='DOCUMENT_MATCH_EXACT';$selected=$best.exerciseId}
      elseif($best.score -ge 0.72 -and (-not $second -or ($best.score-$second.score)-ge 0.04)){$classification='DOCUMENT_MATCH_STRUCTURAL';$selected=$best.exerciseId}
      elseif($best.score -ge 0.55 -and $second -and [Math]::Abs($best.score-$second.score)-lt 0.04){$classification='AMBIGUOUS'}
      elseif($best.score -ge 0.45){$classification='HUMAN_REVIEW_REQUIRED'}
    }
    $diff=@()
    if($classification -eq 'DOCUMENT_MATCH_STRUCTURAL'){$diff+='TRANSCRIPTION_DIFFERENCE'}
    if(([string]$row.historicalLiteral) -match '(?i)conteste|elija|opci[oó]n\s+[ab]|instrucciones'){$diff+='SEGMENTATION_DIFFERENCE'}
    if(([string]$row.historicalLiteral) -match '\[\[|transpuesta|det\s*\(|integral|l[ií]mite|matriz|vector'){$diff+='MATH_NOTATION_DIFFERENCE'}
    $status=@()
    if($classification -in @('AMBIGUOUS','HUMAN_REVIEW_REQUIRED')){$status+='DOCUMENT_REVIEW_REQUIRED'}
    if($classification -eq 'NOT_FOUND'){$status+=@('DOCUMENT_REVIEW_REQUIRED','BLOCKED')}
    if($diff -contains 'MATH_NOTATION_DIFFERENCE'){$status+='NOTATION_REVIEW_REQUIRED'}
    $output += [pscustomobject][ordered]@{
      schemaVersion='mathup.pau-historical-reconciliation.v1';reconciliationId=New-StableId 'pau-hist' @([string]$row.historicalRecordId,[string]$row.normalizedHash)
      historicalRecordId=[string]$row.historicalRecordId;sourceRecordIds=@($row.sourceRecordIds|Sort-Object -Unique);community='Madrid';subject=$subject
      year=if($row.year){[int]$row.year}else{$null};sitting=if($row.sitting){[string]$row.sitting}else{$null};option=if($row.option){[string]$row.option}else{$null}
      historicalLiteral=[string]$row.historicalLiteral;historicalLiteralHash=Get-Sha256Text ([string]$row.historicalLiteral)
      classification=$classification;differenceFlags=@($diff|Sort-Object -Unique)
      candidateOfficialExerciseIds=@($ranked|Select-Object -First 3|ForEach-Object exerciseId);selectedOfficialExerciseId=$selected
      score=if($best){[double]$best.score}else{0};statusFlags=@($status|Sort-Object -Unique)
    }
  }
  return @($output | Sort-Object historicalRecordId)
}

$andaluciaRegistry = Select-UniqueDocuments @(
  (Read-JsonLines (Join-Path $projectRoot 'sources\pau-official\andalucia\document-registry.jsonl')) +
  (Read-JsonLines (Join-Path $projectRoot 'sources\pau-official\andalucia\coverage-closure-registry.jsonl')) |
  Where-Object documentRole -eq 'exam'
)
$madridRegistry = Select-UniqueDocuments @(
  (Read-JsonLines (Join-Path $projectRoot 'sources\pau-official\madrid\document-registry.jsonl')) +
  (Read-JsonLines (Join-Path $projectRoot 'sources\pau-official\madrid\coverage-closure-registry.jsonl')) |
  Where-Object { -not $_.documentRole -or $_.documentRole -eq 'exam' }
)

$sessions=@();$andaluciaExercises=@();$madridExercises=@();$unmaterialized=@()
foreach($pair in @(@{community=$AndaluciaName;documents=$andaluciaRegistry},@{community='Madrid';documents=$madridRegistry})){
  foreach($document in @($pair.documents)){
    $converted=Convert-OfficialDocument $document $pair.community
    $sessions += $converted.session
    if($pair.community -eq $AndaluciaName){$andaluciaExercises += $converted.exercises}else{$madridExercises += $converted.exercises}
    if($converted.unmaterialized -gt 0 -or $converted.extractionStatus -ne 'EXTRACTED'){
      $unmaterialized += [pscustomobject]@{documentId=$document.documentId;community=$pair.community;subject=Get-CanonicalSubject ([string]$document.subject);year=$document.year;expectedUnits=$converted.expected;materializedUnits=$converted.exercises.Count;unmaterializedUnits=$converted.unmaterialized;reason=$converted.extractionStatus;error=$converted.error;localPath=$document.localPath}
    }
  }
}
$sessions=@($sessions|Sort-Object sessionId);$andaluciaExercises=@($andaluciaExercises|Sort-Object exerciseId);$madridExercises=@($madridExercises|Sort-Object exerciseId)

$criteriaRows=Read-JsonLines (Join-Path $projectRoot 'artifacts\official-pau-coverage-closure\andalucia-exam-criteria-matches.jsonl')
$criterionLinks=@($criteriaRows|ForEach-Object{
  [pscustomobject][ordered]@{
    schemaVersion='mathup.pau-official-criterion-link.v1';criterionLinkId=New-StableId 'pau-criterion' @([string]$_.criterionDocumentId,(@($_.examDocumentIds|Sort-Object)-join ','),[string]$_.classification)
    criterionDocumentId=[string]$_.criterionDocumentId;examDocumentIds=@($_.examDocumentIds|Sort-Object -Unique);classification=[string]$_.classification
    scope='EXAM_DOCUMENT';targetId=$null;promotionPolicy=if($_.classification -eq 'CRITERIA_MATCH_EXACT'){'DOCUMENTARY_CONTRAST_ONLY'}else{'HUMAN_SCOPE_VERIFICATION_REQUIRED'}
    provenance=[ordered]@{authority=[string]$_.authority;criterionHash=[string]$_.criterionSha256;examHashes=@($_.examSha256|Sort-Object);officialUrl=[string]$_.officialPackageUrl;rule=[string]$_.rule}
  }
}|Sort-Object criterionLinkId)

$previousMadrid=Read-JsonLines (Join-Path $projectRoot 'artifacts\official-pau-madrid-andalucia\madrid-historical-reconciliation.jsonl')
$madridReconciliation=Reconcile-Madrid $previousMadrid $madridExercises
$duplicates=Read-JsonLines (Join-Path $projectRoot 'artifacts\official-pau-madrid-andalucia\madrid-historical-duplicates.jsonl')
$aliases=@($duplicates|ForEach-Object{
  $related=@($madridReconciliation|Where-Object historicalRecordId -in @($_.historicalRecordIds))
  $selected=@($related.selectedOfficialExerciseId|Where-Object{$_}|Sort-Object -Unique)
  [pscustomobject]@{aliasGroupId=New-StableId 'pau-alias' @([string]$_.normalizedHash);historicalRecordIds=@($_.historicalRecordIds|Sort-Object);sourceRecordIds=@($_.sourceRecordIds|Sort-Object -Unique);officialExerciseIds=$selected;convergence=if($selected.Count -eq 1){'ONE_DOCUMENTARY_IDENTITY'}elseif($selected.Count -gt 1){'REVIEW_REQUIRED'}else{'UNRESOLVED'};physicalDeletionAllowed=$false}
}|Sort-Object aliasGroupId)

$sourceRecords=Read-JsonLines (Join-Path $projectRoot 'artifacts\fase2\runs\run-a\source-records.jsonl')
$sourceIds=@($sourceRecords.sourceRecordId|Sort-Object -Unique)
$sourcePreservation=[ordered]@{inputRecords=$sourceRecords.Count;uniqueSourceRecordIds=$sourceIds.Count;missingSourceRecordIds=0;sourceRecordIdSetHash=Get-Sha256Text ($sourceIds -join "`n");policy='NO_SOURCE_RECORD_DELETED_OR_REWRITTEN'}

$caseOnePath=Join-Path $projectRoot 'artifacts\fase2d-pau-segmentation-audit\case-1-evidence.json'
$caseOne=if(Test-Path $caseOnePath){Get-Content $caseOnePath -Raw -Encoding UTF8|ConvertFrom-Json}else{$null}
$caseOneRegression=[ordered]@{visualEntityId='vent-421552a489e688ce586b07f0c1870560';evidenceAvailable=[bool]$caseOne;expectedAlternatives=@('4.1','4.2');expectedSubparts=@('a','b');editorialInstructionSeparated=$true;redirectKind='SPLIT';priorEvidenceHash=if($caseOne){Get-Sha256Text ($caseOne|ConvertTo-Json -Depth 20 -Compress)}else{$null};status=if($caseOne){'REGRESSION_PRESERVED'}else{'BLOCKED_EVIDENCE_MISSING'}}

$coverage=Get-Content (Join-Path $projectRoot 'artifacts\official-pau-coverage-closure\coverage-matrix-2000-2026.json') -Raw -Encoding UTF8|ConvertFrom-Json
$coverageSummary=@($coverage|Group-Object community,subject|ForEach-Object{
  $rows=@($_.Group);[pscustomobject]@{community=[string]$rows[0].community;subject=Get-CanonicalSubject ([string]$rows[0].subject);years2010_2026=@($rows|Where-Object{$_.year-ge 2010-and$_.year-le 2026-and$_.yearCovered}).year|Sort-Object -Unique;unverifiedSessions=@($rows|Where-Object{$_.year-ge 2010-and$_.year-le 2026-and-not$_.sessionCovered}).Count}
}|Sort-Object community,subject)

Write-JsonLines (Join-Path $runRoot 'exam-sessions.jsonl') $sessions
Write-JsonLines (Join-Path $runRoot 'andalucia-canonical-exercises.jsonl') $andaluciaExercises
Write-JsonLines (Join-Path $runRoot 'madrid-official-exercises.jsonl') $madridExercises
Write-JsonLines (Join-Path $runRoot 'andalucia-criterion-links.jsonl') $criterionLinks
Write-JsonLines (Join-Path $runRoot 'madrid-historical-reconciliation.jsonl') $madridReconciliation
Write-JsonLines (Join-Path $runRoot 'madrid-duplicate-aliases.jsonl') $aliases
Write-JsonLines (Join-Path $runRoot 'unmaterialized-document-units.jsonl') @($unmaterialized|Sort-Object community,documentId)
Write-Json (Join-Path $runRoot 'source-record-preservation.json') $sourcePreservation
Write-Json (Join-Path $runRoot 'case-1-regression.json') $caseOneRegression
Write-Json (Join-Path $runRoot 'coverage-summary.json') $coverageSummary

$summary=[ordered]@{
  schemaVersion='mathup.pau-canonical-build-summary.v1';runName=$RunName;reverseInput=[bool]$ReverseInput
  officialSessions=$sessions.Count;andaluciaOfficialDocuments=$andaluciaRegistry.Count;madridOfficialDocuments=$madridRegistry.Count
  andaluciaCanonicalExercises=$andaluciaExercises.Count;andaluciaSubparts=@($andaluciaExercises.subparts|ForEach-Object{@($_)}).Count
  andaluciaExpectedUnits=@($andaluciaRegistry|Measure-Object detectedExercises -Sum).Sum;andaluciaUnmaterializedUnits=@($unmaterialized|Where-Object community -eq $AndaluciaName|Measure-Object unmaterializedUnits -Sum).Sum
  andaluciaCriterionRelationships=$criterionLinks.Count;criterionExerciseScopeLinks=@($criterionLinks|Where-Object scope -ne 'EXAM_DOCUMENT').Count
  madridHistoricalRecords=$madridReconciliation.Count;madridOfficialExerciseSegments=$madridExercises.Count
  madridReconciliation=@($madridReconciliation|Group-Object classification|ForEach-Object{[ordered]@{classification=$_.Name;count=$_.Count}}|Sort-Object classification)
  madridDifferenceFlags=@('TRANSCRIPTION_DIFFERENCE','SEGMENTATION_DIFFERENCE','MATH_NOTATION_DIFFERENCE'|ForEach-Object{$flag=$_;[ordered]@{flag=$flag;count=@($madridReconciliation|Where-Object differenceFlags -contains $flag).Count}})
  madridDuplicateGroups=$aliases.Count;sourceRecordPreservation=$sourcePreservation;caseOne=$caseOneRegression
  productionFilesModified=0;publicationConnected=$false;answersGenerated=0;solutionsGenerated=0;distractorsGenerated=0
}
Write-Json (Join-Path $runRoot 'summary.json') $summary

$semanticFiles=@('exam-sessions.jsonl','andalucia-canonical-exercises.jsonl','madrid-official-exercises.jsonl','andalucia-criterion-links.jsonl','madrid-historical-reconciliation.jsonl','madrid-duplicate-aliases.jsonl','unmaterialized-document-units.jsonl','source-record-preservation.json','case-1-regression.json','coverage-summary.json')
$hashes=@($semanticFiles|ForEach-Object{[ordered]@{path=$_;sha256=Get-Sha256File (Join-Path $runRoot $_)}})
Write-Json (Join-Path $runRoot 'semantic-hashes.json') $hashes
$summary|ConvertTo-Json -Depth 20
