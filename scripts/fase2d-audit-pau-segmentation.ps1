param(
  [string]$RunDirectory = "artifacts/fase2b/runs/run-a",
  [string]$OutputDirectory = "artifacts/fase2d-pau-segmentation"
)

$ErrorActionPreference = "Stop"
$utf8 = [System.Text.UTF8Encoding]::new($false)

function Read-JsonLines([string]$Path) {
  $items = [System.Collections.Generic.List[object]]::new()
  $reader = [System.IO.StreamReader]::new((Resolve-Path -LiteralPath $Path), $utf8, $true)
  try {
    while (($line = $reader.ReadLine()) -ne $null) {
      if (-not [string]::IsNullOrWhiteSpace($line)) {
        $items.Add(($line | ConvertFrom-Json))
      }
    }
  } finally {
    $reader.Dispose()
  }
  return $items
}

function Normalize-Text([string]$Text) {
  if ($null -eq $Text) { return "" }
  return (($Text -replace '<[^>]+>', ' ' -replace '\s+', ' ').Trim()).ToLowerInvariant()
}

function Load-BlockBank([string]$Path) {
  $raw = [System.IO.File]::ReadAllText((Resolve-Path -LiteralPath $Path), $utf8)
  $json = $raw -replace '^[\s\S]*?=\s*', '' -replace ';\s*$', ''
  return ($json | ConvertFrom-Json)
}

function Get-CommunityName($Exercise) {
  if ($Exercise.provenance.community.name) { return [string]$Exercise.provenance.community.name }
  if ($Exercise.provenance.community) { return [string]$Exercise.provenance.community }
  return "No verificable"
}

function Get-SubjectLabel([string]$SubjectId) {
  if ($SubjectId -eq 'matematicas-ii') { return 'Matemáticas II' }
  if ($SubjectId -eq 'matematicas-ccss-ii') { return 'CCSS II' }
  return $SubjectId
}

function Get-StructuredSource($Exercise, $MatesBank, $CcssBank) {
  $file = [string]$Exercise.provenance.source.sourceFile
  $path = [string]$Exercise.provenance.source.sourcePath
  $match = [regex]::Match($path, '\.(?<block>[^.]+)\.(?<index>\d+)$')
  if (-not $match.Success) { return $null }
  $bank = $null
  if ($file -eq 'data/mates-ii-blocks.js') { $bank = $MatesBank }
  if ($file -eq 'data/ccss-ii-blocks.js') { $bank = $CcssBank }
  if ($null -eq $bank) { return $null }
  $prop = $bank.PSObject.Properties[$match.Groups['block'].Value]
  if ($null -eq $prop) { return $null }
  $index = [int]$match.Groups['index'].Value
  if ($index -ge @($prop.Value).Count) { return $null }
  return @($prop.Value)[$index]
}

function Get-RepeatedHeader([string]$Text) {
  $matches = [regex]::Matches($Text, '(?i)\b(?:pregunta|ejercicio|cuesti[oó]n)\s+\d+(?:\.\d+)?\s*[.:)]')
  $seen = @{}
  foreach ($m in $matches) {
    $key = Normalize-Text $m.Value
    if ($seen.ContainsKey($key)) { return $true }
    $seen[$key] = $true
  }
  $sentences = @($Text -split '(?<=[.!?])\s+' | ForEach-Object { Normalize-Text $_ } | Where-Object { $_.Length -ge 25 })
  $sentenceSeen = @{}
  foreach ($sentence in $sentences) {
    if ($sentenceSeen.ContainsKey($sentence)) { return $true }
    $sentenceSeen[$sentence] = $true
  }
  return $false
}

function Has-ExamInstruction([string]$Text) {
  return [regex]::IsMatch($Text, '(?i)(conteste|resuelva|elija|escoja|seleccione|realice)\s+(?:solamente\s+|solo\s+|s[oó]lo\s+)?(?:una|uno|un)\s+(?:de\s+)?(?:las|los)?\s*(?:siguientes|dos|opciones|alternativas|preguntas|ejercicios|apartados)|elige\s+(?:una|uno)|opci[oó]n\s+[ab]\s*(?:o|/)\s*opci[oó]n\s+[ab]')
}

function Get-AlternativeMarkers([string]$Text) {
  $values = [System.Collections.Generic.HashSet[string]]::new()
  foreach ($m in [regex]::Matches($Text, '(?im)(?:^|\s)(?<n>\d+\.\d+)\s*[.)]')) { [void]$values.Add($m.Groups['n'].Value) }
  foreach ($m in [regex]::Matches($Text, '(?im)(?:^|\s)(?:apartado|opci[oó]n)\s+(?<n>[A-Ba-b])\s*[.)]?')) { [void]$values.Add(('alt-' + $m.Groups['n'].Value.ToLowerInvariant())) }
  return @($values)
}

function Get-SubpartLabels([string]$Text) {
  return @([regex]::Matches($Text, '(?im)(?:^|[\s;])(?<n>[a-f])\s*[.)]') | ForEach-Object { $_.Groups['n'].Value.ToLowerInvariant() })
}

function Add-Category($Categories, [string]$Category) {
  if (-not $Categories.Contains($Category)) { [void]$Categories.Add($Category) }
}

function Write-CsvRows([string]$Path, $Rows) {
  $csv = @($Rows | ConvertTo-Csv -NoTypeInformation) -join "`r`n"
  [System.IO.File]::WriteAllText($Path, ($csv + "`r`n"), $utf8)
}

$exercises = Read-JsonLines (Join-Path $RunDirectory 'exercise-v2.jsonl')
$answers = Read-JsonLines (Join-Path $RunDirectory 'answer-records.jsonl')
$solutions = Read-JsonLines (Join-Path $RunDirectory 'solution-records.jsonl')
$notation = Read-JsonLines 'artifacts/fase2b-integrity-audit/notation-audit.jsonl'
$matesBank = Load-BlockBank 'data/mates-ii-blocks.js'
$ccssBank = Load-BlockBank 'data/ccss-ii-blocks.js'

$answerByExercise = @{}
foreach ($item in $answers) { $answerByExercise[[string]$item.exerciseId] = $item }
$solutionByExercise = @{}
foreach ($item in $solutions) { $solutionByExercise[[string]$item.exerciseId] = $item }
$notationByExercise = @{}
foreach ($item in $notation) {
  if ($item.entityType -eq 'statement') { $notationByExercise[[string]$item.exerciseId] = $item }
}

$pau = @($exercises | Where-Object { $_.classification.stage -eq 'PAU' })
$records = [System.Collections.Generic.List[object]]::new()

foreach ($exercise in $pau) {
  $exerciseId = [string]$exercise.identity.exerciseId
  $statement = [string]$exercise.content.statement.plainText
  $structured = Get-StructuredSource $exercise $matesBank $ccssBank
  $structuredStatement = ''
  $structuredParts = @()
  if ($null -ne $structured) {
    $structuredStatement = (@($structured.statement | ForEach-Object { [string]$_.plain }) -join ' ')
    $structuredParts = @($structured.parts)
  }
  $partText = (@($structuredParts | ForEach-Object { @($_.paragraphs | ForEach-Object { [string]$_.plain }) -join ' ' }) -join ' ')
  $combined = (($statement + ' ' + $structuredStatement + ' ' + $partText) -replace '\s+', ' ').Trim()
  $answer = $answerByExercise[$exerciseId]
  $solution = $solutionByExercise[$exerciseId]
  $answerText = if ($answer) { [string]$answer.canonicalValue } else { '' }
  $solutionText = if ($solution) { (@($solution.parts | ForEach-Object { [string]$_.text + ' ' + [string]$_.finalAnswer }) -join ' ') } else { '' }
  $evidenceText = ($combined + ' ' + $answerText + ' ' + $solutionText)

  $categories = [System.Collections.Generic.List[string]]::new()
  $examInstruction = Has-ExamInstruction $combined
  $duplicateHeader = Get-RepeatedHeader $statement
  $alternatives = @(Get-AlternativeMarkers $evidenceText)
  $labels = @(Get-SubpartLabels $partText)
  $duplicatePartLabels = $false
  if ($labels.Count -gt 0) { $duplicatePartLabels = (($labels | Group-Object | Where-Object Count -gt 1).Count -gt 0) }
  $embeddedAlternative = [regex]::IsMatch($partText, '(?im)(?:^|\s)\d+\.\d+\s*[.)]')
  $multipleMerged = (($examInstruction -and $alternatives.Count -ge 2) -or ($embeddedAlternative -and $duplicatePartLabels))
  $subpartError = (($structuredParts.Count -gt 0) -and (($null -eq $exercise.content.subparts) -or $duplicatePartLabels -or $embeddedAlternative))
  $splitSignal = [regex]::IsMatch($combined, '(?im)^\s*(?:apartado|parte)\s+[b-f]\s*[.)]') -or [regex]::IsMatch([string]$exercise.provenance.source.sourcePath, '(?i)(?:apartado|part)[._/-]?[b-f](?:\b|$)')
  $sourceCorruption = [regex]::IsMatch($evidenceText, '[\u00C3\u00C2\u00E2\u00CF\uFFFD]|\bCOCO2\b')
  $notationItem = $notationByExercise[$exerciseId]
  $notationIssues = if ($notationItem) { @($notationItem.issues) } else { @() }
  $mathCorruption = [regex]::IsMatch($evidenceText, 'uvw===|Aa1,1,0|\u00CF\u20ACP\u00CF\u20AC|\u00E2\u2030\u00A1|\u00E2\u2020\u2019|\b\w+={3,}\w*') -or ($notationIssues -contains 'CANONICAL_MATHML_FORMAT_WITHOUT_MATHML')

  if ($examInstruction) { Add-Category $categories 'EXAM_INSTRUCTION_ATTACHED' }
  if ($duplicateHeader) { Add-Category $categories 'DUPLICATED_HEADER' }
  if ($multipleMerged) { Add-Category $categories 'MULTIPLE_EXERCISES_MERGED' }
  if ($splitSignal) { Add-Category $categories 'EXERCISE_INCORRECTLY_SPLIT' }
  if ($subpartError) { Add-Category $categories 'SUBPART_STRUCTURE_ERROR' }
  if ($sourceCorruption) { Add-Category $categories 'SOURCE_TEXT_CORRUPTION' }
  if ($mathCorruption) { Add-Category $categories 'MATH_NOTATION_CORRUPTION' }

  $structural = @('EXAM_INSTRUCTION_ATTACHED','DUPLICATED_HEADER','MULTIPLE_EXERCISES_MERGED','EXERCISE_INCORRECTLY_SPLIT','SUBPART_STRUCTURE_ERROR')
  if (@($categories | Where-Object { $structural -contains $_ }).Count -eq 0) { Add-Category $categories 'SEGMENTATION_OK' }

  $sourceHasPageProof = ($exercise.provenance.source.originalAssetHash -and $null -ne $exercise.provenance.source.page)
  if (-not $sourceHasPageProof) { Add-Category $categories 'DOCUMENT_REVIEW_REQUIRED' }

  $isCase1 = ($exerciseId -eq 'ex-25662a75-7e5e-5935-903f-0d41aa138462')
  $sourceDoc = if ($isCase1) { '26_exjun.pdf (archivo oficial local de Matemáticas II, Castilla-La Mancha, junio 2026)' } else { $null }
  $records.Add([pscustomobject][ordered]@{
    exerciseId = $exerciseId
    revisionId = [string]$exercise.identity.revisionId
    sourceRecordIds = @($exercise.traceability.sourceRecordIds)
    sourceFile = [string]$exercise.provenance.source.sourceFile
    sourcePath = [string]$exercise.provenance.source.sourcePath
    subject = Get-SubjectLabel ([string]$exercise.classification.subjectId)
    community = Get-CommunityName $exercise
    year = $exercise.provenance.pau.year
    sitting = $exercise.provenance.pau.sitting
    exerciseLabel = $exercise.provenance.pau.exerciseLabel
    statement = $statement
    structuredSourceAvailable = ($null -ne $structured)
    structuredPartCount = $structuredParts.Count
    structuredPartLabels = @($structuredParts | ForEach-Object { [string]$_.label })
    alternativeMarkers = $alternatives
    hasAnswer = ($null -ne $answer)
    hasSolution = ($null -ne $solution)
    categories = @($categories)
    sourceDocumentEvidence = $sourceDoc
    sourcePageLinked = [bool]$sourceHasPageProof
    automaticEvidence = [pscustomobject]@{
      examInstruction = $examInstruction
      duplicatedHeader = $duplicateHeader
      embeddedAlternative = $embeddedAlternative
      duplicateSubpartLabels = $duplicatePartLabels
      notationIssues = $notationIssues
    }
  })
}

New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null

$jsonlPath = Join-Path $OutputDirectory 'pau-segmentation-audit.jsonl'
$jsonl = ($records | ForEach-Object { $_ | ConvertTo-Json -Depth 8 -Compress }) -join "`n"
[System.IO.File]::WriteAllText((Join-Path (Resolve-Path -LiteralPath $OutputDirectory) 'pau-segmentation-audit.jsonl'), $jsonl + "`n", $utf8)

$categoryOrder = @('SEGMENTATION_OK','EXAM_INSTRUCTION_ATTACHED','DUPLICATED_HEADER','MULTIPLE_EXERCISES_MERGED','EXERCISE_INCORRECTLY_SPLIT','SUBPART_STRUCTURE_ERROR','SOURCE_TEXT_CORRUPTION','MATH_NOTATION_CORRUPTION','DOCUMENT_REVIEW_REQUIRED')
$categoryCounts = [ordered]@{}
foreach ($category in $categoryOrder) { $categoryCounts[$category] = @($records | Where-Object { $_.categories -contains $category }).Count }

function Build-Breakdown($InputRecords, [scriptblock]$KeySelector) {
  return @($InputRecords | Group-Object $KeySelector | ForEach-Object {
    $group = @($_.Group)
    $row = [ordered]@{ key = $_.Name; total = $group.Count }
    foreach ($category in $categoryOrder) { $row[$category] = @($group | Where-Object { $_.categories -contains $category }).Count }
    [pscustomobject]$row
  } | Sort-Object key)
}

$bySubjectCommunity = Build-Breakdown $records { "$($_.subject)|$($_.community)" }
$byYearSitting = Build-Breakdown $records { "$($_.subject)|$($_.community)|$($_.year)|$($_.sitting)" }

$case1 = @($records | Where-Object exerciseId -eq 'ex-25662a75-7e5e-5935-903f-0d41aa138462')[0]
$caseAnswer = $answerByExercise[$case1.exerciseId]
$caseSolution = $solutionByExercise[$case1.exerciseId]
$summary = [pscustomobject][ordered]@{
  schemaVersion = 'mathup.pau-segmentation-audit.v1'
  generatedFrom = 'artifacts/fase2b/runs/run-a'
  totalPauExerciseRepresentations = $records.Count
  subjects = [ordered]@{
    'Matemáticas II' = @($records | Where-Object subject -eq 'Matemáticas II').Count
    'CCSS II' = @($records | Where-Object subject -eq 'CCSS II').Count
  }
  categoryCounts = $categoryCounts
  categoryCountsAreNonExclusive = $true
  sourceLinkage = [ordered]@{
    pageLinked = @($records | Where-Object sourcePageLinked).Count
    documentReviewRequired = $categoryCounts.DOCUMENT_REVIEW_REQUIRED
    officialLocalPdfArchivesLocated = 132
    note = 'La mera existencia de un PDF no se considera vínculo inequívoco; se exige hash/página o contraste documentado.'
  }
  bySubjectCommunity = $bySubjectCommunity
  byYearSitting = $byYearSitting
  case1ExerciseId = $case1.exerciseId
}

[System.IO.File]::WriteAllText((Join-Path (Resolve-Path -LiteralPath $OutputDirectory) 'summary.json'), ($summary | ConvertTo-Json -Depth 10), $utf8)
Write-CsvRows (Join-Path $OutputDirectory 'breakdown-by-subject-community.csv') $bySubjectCommunity
Write-CsvRows (Join-Path $OutputDirectory 'breakdown-by-year-sitting.csv') $byYearSitting

$caseEvidence = [pscustomobject][ordered]@{
  visualEntityId = 'vent-421552a489e688ce586b07f0c1870560'
  exerciseId = $case1.exerciseId
  sourceRecordIds = $case1.sourceRecordIds
  sourceFile = $case1.sourceFile
  sourcePath = $case1.sourcePath
  officialDocument = '26_exjun.pdf'
  officialDocumentLocation = 'Archivo local externo al repositorio: Ex Mates II / Examenes Castilla la Mancha 2025-00'
  officialStructure = [ordered]@{
    examInstruction = 'Pregunta 4. Conteste solo UNA de las siguientes preguntas (4.1 o 4.2).'
    alternatives = @(
      [ordered]@{ id = '4.1'; independentExercise = $true; subparts = @('a','b'); topic = 'Vectores: coplanaridad y volumen del paralelepípedo' },
      [ordered]@{ id = '4.2'; independentExercise = $true; subparts = @('a','b'); topic = 'Simetría respecto de un plano y distancia' }
    )
  }
  observedDefect = [ordered]@{
    examInstructionAttached = $true
    duplicatedInstructionInCanonicalStatement = $true
    alternative42EmbeddedInsidePartBOf41 = $true
    repeatedPartLabels = @('a)','b)','a)','b)')
    answersMerged = 4
    solutionsMerged = 4
    sourceTextCorruption = $true
    mathNotationCorruption = $true
  }
  observedLinkage = [ordered]@{
    statement = [ordered]@{
      sourceRecordIds = $case1.sourceRecordIds
      sourceFile = $case1.sourceFile
      sourcePath = $case1.sourcePath
    }
    answer = [ordered]@{
      answerId = $caseAnswer.answerId
      kind = $caseAnswer.kind
      partKeys = @($caseAnswer.provenance.partKeys)
      sourceRecordIds = @($caseAnswer.provenance.sourceRecordIds)
      evidenceHashes = @($caseAnswer.provenance.evidenceHashes)
      canonicalValue = $caseAnswer.canonicalValue
    }
    solution = [ordered]@{
      solutionId = $caseSolution.solutionId
      kind = $caseSolution.kind
      partKeys = @($caseSolution.provenance.partKeys)
      sourceRecordIds = @($caseSolution.provenance.sourceRecordIds)
      evidenceHashes = @($caseSolution.provenance.evidenceHashes)
      parts = @($caseSolution.parts | ForEach-Object { [ordered]@{ part = $_.part; finalAnswer = $_.finalAnswer } })
    }
  }
  requiredCanonicalTarget = [ordered]@{
    examInstruction = 'Metadato de estructura del examen; no forma parte del enunciado de 4.1 ni de 4.2.'
    exercise41 = [ordered]@{ statement = 'Solo el enunciado propio de 4.1'; subparts = @('4.1.a','4.1.b'); answerAndSolutionScope = 'Solo 4.1.a y 4.1.b' }
    exercise42 = [ordered]@{ statement = 'Solo el enunciado propio de 4.2'; subparts = @('4.2.a','4.2.b'); answerAndSolutionScope = 'Solo 4.2.a y 4.2.b' }
    preserves = @('comunidad','materia','año','convocatoria','pregunta','alternativa','apartados','archivo original','página cuando se vincule','sourceRecordId')
  }
}
[System.IO.File]::WriteAllText((Join-Path (Resolve-Path -LiteralPath $OutputDirectory) 'case-1-evidence.json'), ($caseEvidence | ConvertTo-Json -Depth 10), $utf8)

$summary | ConvertTo-Json -Depth 6
