$ErrorActionPreference='Stop'
$projectRoot=(Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$runRoot=Join-Path $projectRoot 'artifacts\pau-canonical-andalucia-madrid\runs\run-a'
$script:passed=0;$script:failed=0;$script:failures=@()
function Assert([bool]$Condition,[string]$Name){if($Condition){$script:passed++}else{$script:failed++;$script:failures+=$Name}}
function Json([string]$Path){[IO.File]::ReadAllText($Path,[Text.Encoding]::UTF8)|ConvertFrom-Json}
function Jsonl([string]$Path){@([IO.File]::ReadAllLines($Path,[Text.Encoding]::UTF8)|Where-Object{$_.Trim()}|ForEach-Object{$_|ConvertFrom-Json})}
foreach($schema in Get-ChildItem (Join-Path $projectRoot 'catalog\pau-canonical') -Filter '*.schema.json'){try{$null=Json $schema.FullName;Assert $true "schema $($schema.Name)"}catch{Assert $false "schema $($schema.Name)"}}
$summary=Json (Join-Path $runRoot 'summary.json');$sessions=Jsonl (Join-Path $runRoot 'exam-sessions.jsonl');$and=Jsonl (Join-Path $runRoot 'andalucia-canonical-exercises.jsonl');$mad=Jsonl (Join-Path $runRoot 'madrid-historical-reconciliation.jsonl');$criteria=Jsonl (Join-Path $runRoot 'andalucia-criterion-links.jsonl');$source=Json (Join-Path $runRoot 'source-record-preservation.json');$case=Json (Join-Path $runRoot 'case-1-regression.json')
Assert ($sessions.Count -eq $summary.officialSessions) 'session count'
Assert ($and.Count -eq $summary.andaluciaCanonicalExercises) 'Andalucia exercise count'
Assert (@($and.exerciseId|Sort-Object -Unique).Count -eq $and.Count) 'exercise ids unique'
Assert (@($sessions.sessionId|Sort-Object -Unique).Count -eq $sessions.Count) 'session ids unique'
Assert (@($and|Where-Object{$_.officialPrompt -match '^\s*[\[(]\s*\d+(?:[.,]\d+)?\s*puntos?\s*[\])]'}).Count -eq 0) 'exercise scores excluded from learner prompt'
$allSubparts=@($and|ForEach-Object{@($_.subparts)})
Assert (@($allSubparts|Where-Object{$_.officialPrompt -match '^\s*[\[(]\s*\d+(?:[.,]\d+)?\s*puntos?\s*[\])]'}).Count -eq 0) 'subpart scores excluded from learner prompt'
Assert (@($and|Where-Object{$_.scoreEvidence -and $_.scoreEvidence.classification -ne 'EDITORIAL_ASSESSMENT_METADATA'}).Count -eq 0) 'exercise score evidence stays editorial'
Assert (@($allSubparts|Where-Object{$_.scoreEvidence -and $_.scoreEvidence.classification -ne 'EDITORIAL_ASSESSMENT_METADATA'}).Count -eq 0) 'subpart score evidence stays editorial'
Assert (-not @($and|Where-Object{$_|Get-Member answer -ErrorAction SilentlyContinue}).Count) 'no answers generated'
Assert (-not @($and|Where-Object{$_|Get-Member solution -ErrorAction SilentlyContinue}).Count) 'no solutions generated'
Assert ($criteria.Count -eq 184) '184 criterion relationships'
Assert (@($criteria|Where-Object{$_.scope -ne 'EXAM_DOCUMENT'}).Count -eq 0) 'criteria remain documentary evidence'
Assert (@($criteria|Where-Object{$_.promotionPolicy -notin @('DOCUMENTARY_CONTRAST_ONLY','HUMAN_SCOPE_VERIFICATION_REQUIRED')}).Count -eq 0) 'criteria never auto promote'
Assert ($mad.Count -eq 1728) '1728 Madrid historical records decided'
Assert (@($mad|Where-Object{-not $_.classification}).Count -eq 0) 'all Madrid decisions explicit'
Assert ($source.inputRecords -eq 15527) '15527 source records'
Assert ($source.uniqueSourceRecordIds -eq 15527) '15527 unique source ids'
Assert ($source.missingSourceRecordIds -eq 0) 'no source record lost'
Assert ($case.status -eq 'REGRESSION_PRESERVED') 'case 1 preserved'
Assert ($case.redirectKind -eq 'SPLIT') 'case 1 split redirect'
Assert (@($case.expectedAlternatives) -contains '4.1') 'case 1 alternative 4.1'
Assert (@($case.expectedAlternatives) -contains '4.2') 'case 1 alternative 4.2'
Assert ($case.editorialInstructionSeparated) 'case 1 instruction separate'
$coverage=Json (Join-Path $runRoot 'coverage-summary.json')
Assert (@($coverage|Where-Object community -match 'Andaluc').Count -eq 2) 'Andalucia subjects separate'
Assert ((@($coverage|Where-Object community -match 'Andaluc'|Measure-Object unverifiedSessions -Sum).Sum) -eq 37) '37 unverified Andalucia sessions preserved'
Assert (@($coverage|Where-Object{$_.years2010_2026.Count -ne 17}).Count -eq 0) '2010-2026 annual coverage retained'
Assert ($summary.publicationConnected -eq $false) 'not connected to publication'
Assert ($summary.productionFilesModified -eq 0) 'no production files modified'
Assert ($summary.answersGenerated -eq 0 -and $summary.solutionsGenerated -eq 0 -and $summary.distractorsGenerated -eq 0) 'no pedagogical content generated'
$result=[ordered]@{passed=$script:passed;failed=$script:failed;failures=$script:failures}
$result|ConvertTo-Json -Depth 5
if($script:failed){exit 1}
