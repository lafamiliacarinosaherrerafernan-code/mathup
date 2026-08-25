param([string]$RunName='run-a')
$ErrorActionPreference='Stop'
$root=(Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$run=Join-Path $root "artifacts\andalucia-ccssii-2012-doc\runs\$RunName"
$fail=New-Object System.Collections.Generic.List[string];$pass=0
function Assert([bool]$Condition,[string]$Name){if($Condition){$script:pass++}else{$script:fail.Add($Name)}}
$summary=Get-Content -LiteralPath (Join-Path $run 'summary.json') -Raw -Encoding UTF8|ConvertFrom-Json
$docs=@([IO.File]::ReadAllLines((Join-Path $run 'documents.jsonl'),[Text.Encoding]::UTF8)|ForEach-Object{$_|ConvertFrom-Json})
$objects=@([IO.File]::ReadAllLines((Join-Path $run 'document-objects.jsonl'),[Text.Encoding]::UTF8)|ForEach-Object{$_|ConvertFrom-Json})
$ex=@([IO.File]::ReadAllLines((Join-Path $run 'recovered-exercises.jsonl'),[Text.Encoding]::UTF8)|ForEach-Object{$_|ConvertFrom-Json})
Assert ($summary.sourceDocuments -eq 12) '12 documents'
Assert ($summary.exams -eq 6) '6 exams'
Assert ($summary.criteria -eq 6) '6 criteria'
Assert ($summary.exactCriteriaPairs -eq 6) '6 exact pairs'
Assert ($summary.equationObjects -eq 55) '55 equation objects'
Assert ($summary.objectsRecoveredExactly -eq 55) '55 recovered objects'
Assert ($summary.objectsPending -eq 0) '0 object extraction failures'
Assert ($summary.detectedExercises -eq 48) '48 exercises'
Assert ($summary.materializableExercises -eq 48) '48 materializable'
Assert ($summary.criteriaLinks -eq 48) '48 criteria links'
Assert ($summary.potentialAndaluciaTotal -eq 1666) 'potential total 1666'
Assert (@($docs|Where-Object sourceMutated).Count -eq 0) 'sources not mutated'
Assert (@($docs|Where-Object {$_.realFormat -ne 'OLE_COMPOUND_FILE_BINARY'}).Count -eq 0) 'binary DOC format'
Assert (@($objects|Where-Object {$_.classType -ne 'Equation.3'}).Count -eq 0) 'Equation.3 only'
Assert (@($objects|Where-Object {-not (Test-Path (Join-Path $root $_.emfPath))}).Count -eq 0) 'EMF exists'
Assert (@($objects|Where-Object {-not (Test-Path (Join-Path $root $_.pngPreviewPath))}).Count -eq 0) 'PNG exists'
Assert (@($ex|Where-Object {$_.sitting -ne 'No verificable'}).Count -eq 0) 'sitting not inferred'
Assert (@($ex|Where-Object {$_.scoreEvidence.Count -gt 0 -and (($_.learnerBlocks|ConvertTo-Json -Compress) -match '(?i)\b\d+(?:[\.,]\d+)?\s+puntos?\b')}).Count -eq 0) 'scores absent from learner blocks'
Assert (@($ex|Where-Object {$_.PSObject.Properties.Name -contains 'answer'}).Count -eq 0) 'no answers'
Assert (@($ex|Where-Object {$_.PSObject.Properties.Name -contains 'solution'}).Count -eq 0) 'no solutions'
Assert (@($ex|Where-Object {$_.PSObject.Properties.Name -contains 'distractors'}).Count -eq 0) 'no distractors'
Assert ((@($ex|Group-Object model|Where-Object Count -ne 8)).Count -eq 0) '8 exercises each model'
Assert ((@($ex|Group-Object option|Where-Object Count -ne 24)).Count -eq 0) '24 each option'
Assert ($summary.productionModified -eq $false) 'production untouched'
if($fail.Count){[pscustomobject]@{passed=$pass;failed=$fail.Count;failures=$fail}|ConvertTo-Json -Depth 5;exit 1}
[pscustomobject]@{passed=$pass;failed=0}|ConvertTo-Json
