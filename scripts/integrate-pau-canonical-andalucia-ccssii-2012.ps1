param(
  [string]$OutputRoot = "artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a",
  [switch]$ReverseInput
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$repo = Split-Path -Parent $PSScriptRoot
Import-Module (Join-Path $repo 'catalog/pau-canonical/pau-canonical-identities.psm1') -Force

function Read-JsonLines([string]$Path) {
  $rows = @(Get-Content -LiteralPath $Path -Encoding utf8 | Where-Object { $_.Trim() } | ForEach-Object { $_ | ConvertFrom-Json })
  if ($ReverseInput) { [array]::Reverse($rows) }
  return $rows
}
function Write-JsonLines([string]$Path, [object[]]$Rows) {
  $text = (($Rows | ForEach-Object { $_ | ConvertTo-Json -Depth 100 -Compress }) -join "`n") + "`n"
  [IO.File]::WriteAllText($Path, $text, [Text.UTF8Encoding]::new($false))
}
function Write-Json([string]$Path, [object]$Value) {
  [IO.File]::WriteAllText($Path, (($Value | ConvertTo-Json -Depth 100) + "`n"), [Text.UTF8Encoding]::new($false))
}
function ConvertFrom-JsonEscapedString([string]$Value) {
  return ((('"' + $Value + '"') | ConvertFrom-Json))
}

$Text = @{
  Andalucia=(ConvertFrom-JsonEscapedString 'Andaluc\u00eda')
  Subject=(ConvertFrom-JsonEscapedString 'Matem\u00e1ticas Aplicadas a las CCSS II')
  AlgebraBlock=(ConvertFrom-JsonEscapedString 'Bloque de \u00e1lgebra')
  AnalysisBlock=(ConvertFrom-JsonEscapedString 'Bloque de an\u00e1lisis')
  StatisticsBlock=(ConvertFrom-JsonEscapedString 'Bloque de estad\u00edstica')
  LinearProgramming=(ConvertFrom-JsonEscapedString 'Programaci\u00f3n lineal')
  LimitsContinuity=(ConvertFrom-JsonEscapedString 'L\u00edmites y continuidad')
  BinomialNormal=(ConvertFrom-JsonEscapedString 'Distribuci\u00f3n binomial y normal')
  SamplingInference=(ConvertFrom-JsonEscapedString 'Muestreo e inferencia estad\u00edstica')
  Authority=(ConvertFrom-JsonEscapedString 'Junta de Andaluc\u00eda / Distrito \u00danico Andaluz')
}

$RuntimeTopics = @{
  0=@{key='matrices';label='Matrices';blockId='algebra';blockLabel=$Text.AlgebraBlock}
  1=@{key='determinantes';label='Determinantes';blockId='algebra';blockLabel=$Text.AlgebraBlock}
  2=@{key='sistemas-con-determinantes';label='Sistemas con determinantes';blockId='algebra';blockLabel=$Text.AlgebraBlock}
  3=@{key='programacion-lineal';label=$Text.LinearProgramming;blockId='algebra';blockLabel=$Text.AlgebraBlock}
  4=@{key='limites-y-continuidad';label=$Text.LimitsContinuity;blockId='analisis';blockLabel=$Text.AnalysisBlock}
  5=@{key='derivadas-y-aplicaciones';label='Derivadas y aplicaciones';blockId='analisis';blockLabel=$Text.AnalysisBlock}
  6=@{key='integrales-indefinidas';label='Integrales indefinidas';blockId='analisis';blockLabel=$Text.AnalysisBlock}
  7=@{key='integrales-definidas';label='Integrales definidas';blockId='analisis';blockLabel=$Text.AnalysisBlock}
  8=@{key='probabilidad';label='Probabilidad';blockId='probabilidad';blockLabel='Bloque de probabilidad'}
  9=@{key='distribucion-binomial-y-normal';label=$Text.BinomialNormal;blockId='estadistica';blockLabel=$Text.StatisticsBlock}
  10=@{key='muestreo-e-inferencia-estadistica';label=$Text.SamplingInference;blockId='estadistica';blockLabel=$Text.StatisticsBlock}
}
function Normalize-ClassificationText([string]$Text) {
  if ($null -eq $Text) { return '' }
  $d=$Text.Normalize([Text.NormalizationForm]::FormD)
  -join ($d.ToCharArray() | Where-Object {[Globalization.CharUnicodeInfo]::GetUnicodeCategory($_) -ne [Globalization.UnicodeCategory]::NonSpacingMark}) | ForEach-Object {$_.ToLowerInvariant()}
}
function New-Taxonomy([int]$QuestionNumber,[string]$Text,[int[]]$Fallback=@()) {
  $n=Normalize-ClassificationText $Text; $idx=@(); $ev=@()
  switch($QuestionNumber) {
    1 { if($n -match 'matri|ecuacion matricial'){$idx=@(0);$ev+=@{rule='OFFICIAL_Q1_MATRIX_KEYWORDS';basis='matri|ecuacion matricial'}}else{$idx=@(3);$ev+=@{rule='OFFICIAL_Q1_LINEAR_PROGRAMMING_STRUCTURE';basis='pregunta oficial 1 sin evidencia matricial'}} }
    2 {
      if($n -match 'contin|asint|limit|dominio'){$idx+=4;$ev+=@{rule='OFFICIAL_Q2_LIMIT_CONTINUITY_KEYWORDS';basis='continuidad/asintota/limite/dominio'}}
      if($n -match 'deriv|monoton|crec|decrec|curv|tangent|extrem|maxim|minim|represent|grafic'){$idx+=5;$ev+=@{rule='OFFICIAL_Q2_DERIVATIVE_APPLICATION_KEYWORDS';basis='derivadas/monotonia/tangencia/extremos/representacion'}}
      if(-not $idx.Count -and $Fallback.Count){$idx=@($Fallback);$ev+=@{rule='INHERITED_FROM_WHOLE_EXERCISE';basis='apartado sin senal textual suficiente; misma pregunta oficial'}}
      if(-not $idx.Count){$idx=@(5);$ev+=@{rule='OFFICIAL_Q2_ANALYSIS_STRUCTURE_FALLBACK';basis='pregunta oficial 2 del modelo CCSS II 2012'}}
    }
    3 { $idx=@(8);$ev+=@{rule='OFFICIAL_Q3_PROBABILITY_STRUCTURE';basis='pregunta oficial 3'} }
    4 { $idx=@(10);$ev+=@{rule='OFFICIAL_Q4_STATISTICAL_INFERENCE_STRUCTURE';basis='pregunta oficial 4'} }
    default { throw "Pregunta oficial no clasificable: $QuestionNumber" }
  }
  $idx=@($idx|Sort-Object -Unique); $topics=@($idx|ForEach-Object{$t=$RuntimeTopics[$_];[ordered]@{runtimeTopicIndex=$_;runtimeTopicLabel=$t.label;topicKey=$t.key;blockId=$t.blockId;blockLabel=$t.blockLabel}});$first=$RuntimeTopics[$idx[0]]
  [ordered]@{courseId='2bach-ccss';block=[ordered]@{id=$first.blockId;label=$first.blockLabel};topics=$topics;classificationEvidence=@($ev)}
}
function New-Modality([bool]$Eligible,[string[]]$Reasons){[ordered]@{canonicalEligible=$Eligible;runtimeAvailableNow=$false;reasonCodes=@($Reasons)}}
function Get-LearnerPlainText([object]$Source) {
  (@($Source.learnerBlocks | Where-Object {$_.type -eq 'text'} | ForEach-Object {[string]$_.text}) -join ' ')
}
function Get-SubpartPlainText([string]$WholeText,[string]$Label) {
  $escaped=[regex]::Escape($Label)
  $m=[regex]::Match($WholeText,"(?ms)(?:^|\n)\s*$escaped\)\s*(.*?)(?=(?:\n\s*[a-z]\))|$)")
  if($m.Success){return $m.Groups[1].Value}
  return ''
}

$baselinePath = Join-Path $repo 'artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl'
$baselineSummaryPath = Join-Path $repo 'artifacts/pau-canonical-andalucia-madrid/runs/run-a/summary.json'
$sourcePath = Join-Path $repo 'artifacts/andalucia-ccssii-2012-doc/runs/run-a/recovered-exercises.jsonl'
$equationPath = Join-Path $repo 'artifacts/equation3-post-human-correction/corrected-equations-55.jsonl'
$validationDir = Join-Path $repo 'artifacts/equation3-human-validation-final'
$layoutPath = Join-Path $validationDir 'abcabc-layout-reconstruction.json'
$required = @($baselinePath,$baselineSummaryPath,$sourcePath,$equationPath,(Join-Path $validationDir 'summary.json'),(Join-Path $validationDir 'object-validation-statuses.jsonl'),(Join-Path $validationDir 'exercise-validation-statuses.jsonl'),$layoutPath)
foreach ($path in $required) { if (-not (Test-Path -LiteralPath $path)) { throw "Falta evidencia requerida: $path" } }

$baseline = @(Read-JsonLines $baselinePath)
$sources = @(Read-JsonLines $sourcePath)
$equations = @(Read-JsonLines $equationPath)
$objectStatuses = @(Read-JsonLines (Join-Path $validationDir 'object-validation-statuses.jsonl'))
$exerciseStatuses = @(Read-JsonLines (Join-Path $validationDir 'exercise-validation-statuses.jsonl'))
$humanSummary = Get-Content -Raw -Encoding utf8 -LiteralPath (Join-Path $validationDir 'summary.json') | ConvertFrom-Json
$layout = Get-Content -Raw -Encoding utf8 -LiteralPath $layoutPath | ConvertFrom-Json
$baselineSummary = Get-Content -Raw -Encoding utf8 -LiteralPath $baselineSummaryPath | ConvertFrom-Json

if ($baseline.Count -ne 1618 -or $sources.Count -ne 48 -or $equations.Count -ne 55) { throw "Censo inesperado: baseline=$($baseline.Count), source=$($sources.Count), equations=$($equations.Count)" }
if ($humanSummary.final.validatedObjects -ne 55 -or $humanSummary.final.validatedDependentExercises -ne 27 -or $humanSummary.final.independentExercises -ne 21) { throw 'La validación humana Equation.3 no coincide con 55/27/21.' }
if ($humanSummary.abcabc.status -ne 'DOCUMENT_LAYOUT_HUMAN_VALIDATED' -or $humanSummary.abcabc.reconstructionSha256 -ne 'f152e84ef8985c54ad42b77818407b9038fdbc25d6b2fbae6a6e6c75a21beac7') { throw 'La validación ABCABC no coincide con la evidencia aprobada.' }

$eqById = @{}; foreach ($eq in $equations) { $eqById[$eq.objectId] = $eq }
$validatedObjectIds = @{}; foreach ($status in $objectStatuses) { if ($status.status -eq 'EQUATION3_HUMAN_VALIDATED') { $validatedObjectIds[$status.objectId] = $true } }
$validatedExerciseIds = @{}; foreach ($status in $exerciseStatuses) { if ($status.status -eq 'EQUATION3_HUMAN_VALIDATED') { $validatedExerciseIds[$status.documentExerciseId] = $true } }

$canonical = foreach ($source in ($sources | Sort-Object documentExerciseId)) {
  if ($source.materializationStatus -ne 'MATERIALIZABLE') { throw "No materializable: $($source.documentExerciseId)" }
  $exerciseId = New-StableId 'pau-can-doc-ex' @($source.sourceDocumentSha256,$source.subject,$source.documentExerciseId)
  $sessionId = New-StableId 'pau-doc-session' @($source.sourceDocumentSha256,$source.subject,[string]$source.year,[string]$source.model)
  $content = foreach ($block in $source.learnerBlocks) {
    if ($block.type -eq 'text') {
      [ordered]@{ type='text'; text=[string]$block.text }
      continue
    }
    $objectId = [string]$block.objectId
    if (-not $eqById.ContainsKey($objectId)) { throw "Objeto sin representación final: $objectId" }
    if (-not $validatedObjectIds.ContainsKey($objectId)) { throw "Objeto sin validación humana final: $objectId" }
    $eq = $eqById[$objectId]
    $equationBlock = [ordered]@{
      type='math-equation3'; objectId=$objectId; validationStatus='EQUATION3_HUMAN_VALIDATED'
      mathAst=$eq.mathAst; mathAstSha256=$eq.mathAstSha256
      derived=[ordered]@{ mathml=$eq.derived.mathml; mathmlSha256=$eq.derived.mathmlSha256; latex=$eq.derived.latex; latexSha256=$eq.derived.latexSha256 }
      sourceAuthority=$eq.sourceAuthority
    }
    if ($source.documentExerciseId -eq $layout.documentExerciseId -and $objectId -eq $layout.sourceObjectId) {
      [ordered]@{ type='document-layout'; layoutType='paired-labeled-matrices'; objectId=$objectId; validationStatus='DOCUMENT_LAYOUT_HUMAN_VALIDATED'; reconstructionSha256=$layout.reconstructionSha256; items=$layout.items; sourceEquation=$equationBlock }
    } else { $equationBlock }
  }
  $wholePlainText=Get-LearnerPlainText $source
  $wholeTaxonomy=New-Taxonomy ([int]$source.exerciseNumber) $wholePlainText
  $wholeTopicIndexes=@($wholeTaxonomy.topics|ForEach-Object{[int]$_.runtimeTopicIndex})
  $subparts = for ($i=0; $i -lt $source.subparts.Count; $i++) {
    $sp = $source.subparts[$i]
    $subpartText=Get-SubpartPlainText $wholePlainText ([string]$sp.label)
    [ordered]@{ subpartId=(New-StableId 'pau-can-doc-sub' @($exerciseId,[string]$sp.label)); label=[string]$sp.label; ordinal=$i+1; characterOffset=[int]$sp.characterOffset; taxonomy=(New-Taxonomy ([int]$source.exerciseNumber) $subpartText $wholeTopicIndexes) }
  }
  $scores = foreach ($score in $source.scoreEvidence) { [ordered]@{ literal=$score.literal; points=$score.points; characterOffset=[int]$score.characterOffset; classification='EDITORIAL_ASSESSMENT_METADATA' } }
  $eqStatus = if ($source.documentObjects.Count -eq 0) { 'EQUATION3_NOT_APPLICABLE' } elseif ($validatedExerciseIds.ContainsKey($source.documentExerciseId)) { 'EQUATION3_HUMAN_VALIDATED' } else { throw "Ejercicio dependiente sin validación: $($source.documentExerciseId)" }
  $layoutStatus = if ($source.documentExerciseId -eq $layout.documentExerciseId) { 'DOCUMENT_LAYOUT_HUMAN_VALIDATED' } else { 'DOCUMENT_LAYOUT_NOT_APPLICABLE' }
  [ordered]@{
    schemaVersion='mathup.pau-canonical-doc-exercise.v1'; exerciseId=$exerciseId; sessionId=$sessionId
    documentExerciseId=$source.documentExerciseId; documentId=$source.documentId; documentHash=$source.sourceDocumentSha256
    community=(Get-CanonicalCommunity $source.community); subject=(Get-CanonicalSubject $source.subject); year=2012; sitting=$null
    model=[int]$source.model; alternativeKey=[string]$source.option; questionKey=[string]$source.exerciseNumber
    learnerContent=@($content); subparts=@($subparts); scoreEvidence=@($scores); criteriaEvidence=@($source.criteriaEvidence)
    pauContext=[ordered]@{isPau=$true;communityId='andalucia';communityLabel=$Text.Andalucia;subjectId='2bach-ccss';subjectLabel=$Text.Subject;year=2012;sitting=$null;sourceInteraction='open-response'}
    taxonomy=$wholeTaxonomy
    deliveryPolicy=[ordered]@{communityFilterRequired=$true;subjectFilterRequired=$true;runtimeConnected=$false;runtimeMismatchCodes=@('ANDALUCIA_COMMUNITY_NOT_CONFIGURED','CANONICAL_LAYER_NOT_CONNECTED','RUNTIME_BLOCK_MODE_IS_CHALLENGE_NOT_BLOCK_EXAM');modalities=[ordered]@{studyPractice=(New-Modality $true @('CANONICALLY_ELIGIBLE','RUNTIME_NOT_CONNECTED'));blockChallenge=(New-Modality $true @('CANONICALLY_ELIGIBLE','RUNTIME_NOT_CONNECTED'));blockExam=(New-Modality $true @('CANONICALLY_ELIGIBLE','RUNTIME_MODE_MISMATCH'));fullExam=(New-Modality $true @('CANONICALLY_ELIGIBLE','RUNTIME_NOT_CONNECTED'));openResponse=(New-Modality $true @('SOURCE_FORMAT_OPEN_RESPONSE','RUNTIME_NOT_CONNECTED'));multipleChoice=(New-Modality $false @('ANSWER_NOT_VALIDATED','DISTRACTORS_NOT_AVAILABLE'));aiTrainer=(New-Modality $false @('PROHIBITED_FOR_2BACH_PAU'))}}
    answerPolicy=[ordered]@{answerState='ANSWER_REVIEW_REQUIRED';solutionState='SOLUTION_REVIEW_REQUIRED';officialCriteriaRole='OFFICIAL_CORRECTION_EVIDENCE_ONLY';automaticCorrectionEligible=$false;pedagogicalSolutionEligible=$false;canonicalOptionsStored=$false;distractorsGenerated=$false;correctOptionPosition=$null}
    selectionPolicy=[ordered]@{requiredFilters=@('subject','community','block','availability');deduplicationKey='exerciseId';noRepeatWithinAttempt=$true;multipleChoiceMaterialization='SESSION_ONLY_DETERMINISTIC_SHUFFLE';futureAuditDimensions=@('community','subject')}
    sourceRange=[ordered]@{ startCp=[int]$source.traceability.rangeStart; endCp=[int]$source.traceability.rangeEnd }
    provenance=[ordered]@{ authority=$Text.Authority; localPath=$source.traceability.sourcePath; sourceDocumentSha256=$source.sourceDocumentSha256; rawTextSha256=$source.traceability.rawTextSha256; traceabilityPolicy='OFFICIAL_DOC_HASH_AND_CHARACTER_RANGE' }
    validation=[ordered]@{ document='DOCUMENT_VERIFIED'; structure='STRUCTURE_VERIFIED'; equation3=$eqStatus; layout=$layoutStatus }
    reviewStates=@('ANSWER_REVIEW_REQUIRED','SOLUTION_REVIEW_REQUIRED'); publicationState='NOT_PUBLISHED'
    sourceRecordIds=@(); sourceRecordPolicy='NEW_OFFICIAL_DOCUMENTARY_MATERIAL_NO_LEGACY_SOURCE_RECORD'
  }
}

$newIds = @($canonical.exerciseId)
if (($newIds | Sort-Object -Unique).Count -ne 48) { throw 'Identidades duplicadas en los 48 ejercicios.' }
$baselineIds = @($baseline.exerciseId)
if (@($newIds | Where-Object { $baselineIds -contains $_ }).Count) { throw 'Colisión entre identidad nueva y baseline.' }

$index = @(@(
  foreach ($row in $baseline) { [ordered]@{ exerciseId=$row.exerciseId; schemaVersion=$row.schemaVersion; community=$row.community; subject=$row.subject; year=$row.year; source='BASELINE_1618'; publicationState='UNCHANGED' } }
  foreach ($row in $canonical) { [ordered]@{ exerciseId=$row.exerciseId; schemaVersion=$row.schemaVersion; community=$row.community; subject=$row.subject; year=$row.year; source='CCSSII_2012_DOC_OVERLAY'; publicationState=$row.publicationState } }
) | Sort-Object { $_['exerciseId'] })

$coverage = [ordered]@{
  schemaVersion='mathup.pau-canonical-ccssii-2012-coverage.v1'
  before=[ordered]@{ total=1618; mathematicsII=826; ccssII=792; ccssII2012=0; subparts=2610 }
  added=[ordered]@{ total=48; mathematicsII=0; ccssII=48; ccssII2012=48; subparts=(@($canonical.subparts).Count) }
  after=[ordered]@{ total=$index.Count; mathematicsII=826; ccssII=840; ccssII2012=48; subparts=(2610 + @($canonical.subparts).Count) }
}
$ledger = foreach ($row in $canonical) { [ordered]@{ documentExerciseId=$row.documentExerciseId; exerciseId=$row.exerciseId; documentId=$row.documentId; documentHash=$row.documentHash; model=$row.model; option=$row.alternativeKey; exercise=$row.questionKey; subparts=$row.subparts.Count; blockId=$row.taxonomy.block.id; topicIndexes=@($row.taxonomy.topics.runtimeTopicIndex); equation3=$row.validation.equation3; layout=$row.validation.layout; reviewStates=$row.reviewStates; runtimeConnected=$row.deliveryPolicy.runtimeConnected; publicationState=$row.publicationState } }

$out = Join-Path $repo $OutputRoot
New-Item -ItemType Directory -Force -Path $out | Out-Null
Write-JsonLines (Join-Path $out 'andalucia-ccssii-2012-canonical-exercises.jsonl') @($canonical)
Write-JsonLines (Join-Path $out 'andalucia-canonical-index.jsonl') @($index)
Write-JsonLines (Join-Path $out 'integration-ledger.jsonl') @($ledger)
$taxonomyDelivery = foreach($row in $canonical){[ordered]@{exerciseId=$row.exerciseId;communityId=$row.pauContext.communityId;subjectId=$row.pauContext.subjectId;year=$row.pauContext.year;taxonomy=$row.taxonomy;subparts=@($row.subparts|ForEach-Object{[ordered]@{subpartId=$_.subpartId;label=$_.label;taxonomy=$_.taxonomy}});deliveryPolicy=$row.deliveryPolicy;answerPolicy=$row.answerPolicy;selectionPolicy=$row.selectionPolicy}}
Write-JsonLines (Join-Path $out 'taxonomy-and-delivery-mapping.jsonl') @($taxonomyDelivery)
$coverageByBlock=[ordered]@{};foreach($g in @($canonical|Group-Object {[string]$_['taxonomy']['block']['id']}|Sort-Object Name)){$coverageByBlock[$g.Name]=$g.Count}
$coverageByTopic=[ordered]@{};foreach($g in @($canonical|ForEach-Object{$_['taxonomy']['topics']}|ForEach-Object{$_}|Group-Object {[int]$_['runtimeTopicIndex']}|Sort-Object {[int]$_.Name})){$coverageByTopic[$g.Name]=[ordered]@{label=$RuntimeTopics[[int]$g.Name]['label'];exercises=$g.Count}}
$runtimeCompatibility=[ordered]@{schemaVersion='mathup.pau-runtime-compatibility.v1';community=$Text.Andalucia;subject=$Text.Subject;publicRuntimeModified=$false;publicRuntimeConnected=$false;runtimeCommunityConfiguration=[ordered]@{supportedNow=@('Castilla-La Mancha','Madrid');missing=$Text.Andalucia;mismatch='ANDALUCIA_COMMUNITY_NOT_CONFIGURED'};canonicalTaxonomySource=[ordered]@{file='app.js';courseId='2bach-ccss';exactTopics=@($RuntimeTopics.GetEnumerator()|Sort-Object Key|ForEach-Object{$_.Value.label});exactBlocks=@($Text.AlgebraBlock,$Text.AnalysisBlock,'Bloque de probabilidad',$Text.StatisticsBlock)};coverageByBlock=$coverageByBlock;coverageByTopic=$coverageByTopic;aiTrainer=[ordered]@{eligible=$false;reason='PROHIBITED_FOR_2BACH_PAU'};multipleChoice=[ordered]@{eligibleNow=$false;canonicalOptionsStored=$false;distractorsGenerated=$false;futureRule='SESSION_ONLY_DETERMINISTIC_SHUFFLE'};officialCriteriaUsage='OFFICIAL_CORRECTION_EVIDENCE_ONLY';automaticCorrectionEligible=0;pedagogicalSolutionEligible=0}
Write-Json (Join-Path $out 'runtime-compatibility.json') $runtimeCompatibility
Write-Json (Join-Path $out 'coverage-before-after.json') $coverage
$preservation = [ordered]@{ inputRecords=$baselineSummary.sourceRecordPreservation.inputRecords; uniqueSourceRecordIds=$baselineSummary.sourceRecordPreservation.uniqueSourceRecordIds; missingSourceRecordIds=$baselineSummary.sourceRecordPreservation.missingSourceRecordIds; sourceRecordIdSetHash=$baselineSummary.sourceRecordPreservation.sourceRecordIdSetHash; policy='BASELINE_SET_UNCHANGED_NEW_OFFICIAL_DOC_ROWS_HAVE_NO_LEGACY_SOURCE_RECORD' }
Write-Json (Join-Path $out 'source-record-preservation.json') $preservation

$files = @('andalucia-ccssii-2012-canonical-exercises.jsonl','andalucia-canonical-index.jsonl','integration-ledger.jsonl','taxonomy-and-delivery-mapping.jsonl','runtime-compatibility.json','coverage-before-after.json','source-record-preservation.json')
$semantic = [ordered]@{}; foreach ($file in $files) { $semantic[$file] = Get-Sha256File (Join-Path $out $file) }
Write-Json (Join-Path $out 'semantic-hashes.json') $semantic
$summary = [ordered]@{ schemaVersion='mathup.pau-canonical-ccssii-2012-integration-summary.v1'; runName=(Split-Path $out -Leaf); reverseInput=[bool]$ReverseInput; baselineExercises=1618; addedExercises=48; finalExercises=$index.Count; mathematicsII=$coverage.after.mathematicsII; ccssII=$coverage.after.ccssII; ccssII2012=$coverage.after.ccssII2012; addedSubparts=$coverage.added.subparts; duplicateExerciseIds=0; equation3ValidatedObjects=55; equation3ValidatedDependentExercises=27; equation3IndependentExercises=21; abcabcStatus=$humanSummary.abcabc.status; abcabcReconstructionSha256=$humanSummary.abcabc.reconstructionSha256; pendingReviewStates=[ordered]@{ ANSWER_REVIEW_REQUIRED=48; SOLUTION_REVIEW_REQUIRED=48 }; taxonomy=[ordered]@{exactRuntimeTopicNamesUsed=$true;blocks=$coverageByBlock;topics=$coverageByTopic;subpartsClassified=$coverage.added.subparts};delivery=[ordered]@{publicRuntimeConnected=$false;aiTrainerEligible=0;multipleChoiceEligible=0;canonicalOptionsStored=0;automaticCorrectionEligible=0;pedagogicalSolutionEligible=0};runtimeMismatchCodes=@('ANDALUCIA_COMMUNITY_NOT_CONFIGURED','CANONICAL_LAYER_NOT_CONNECTED','RUNTIME_BLOCK_MODE_IS_CHALLENGE_NOT_BLOCK_EXAM');sourceRecordPreservation=$preservation; publicationConnected=$false; productionFilesModified=0; answersGenerated=0; solutionsGenerated=0; distractorsGenerated=0; semanticHashes=$semantic }
Write-Json (Join-Path $out 'summary.json') $summary
$summary | ConvertTo-Json -Depth 20
