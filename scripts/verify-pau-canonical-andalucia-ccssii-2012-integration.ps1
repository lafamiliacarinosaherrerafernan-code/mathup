param([string]$RunRoot = "artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a")
$ErrorActionPreference='Stop'; Set-StrictMode -Version Latest
$repo=Split-Path -Parent $PSScriptRoot; $root=Join-Path $repo $RunRoot
$summary=Get-Content -Raw -Encoding utf8 -LiteralPath (Join-Path $root 'summary.json') | ConvertFrom-Json
$rows=@(Get-Content -Encoding utf8 -LiteralPath (Join-Path $root 'andalucia-ccssii-2012-canonical-exercises.jsonl') | ForEach-Object { $_ | ConvertFrom-Json })
$index=@(Get-Content -Encoding utf8 -LiteralPath (Join-Path $root 'andalucia-canonical-index.jsonl') | ForEach-Object { $_ | ConvertFrom-Json })
$taxonomy=@(Get-Content -Encoding utf8 -LiteralPath (Join-Path $root 'taxonomy-and-delivery-mapping.jsonl') | ForEach-Object { $_ | ConvertFrom-Json })
$runtime=Get-Content -Raw -Encoding utf8 -LiteralPath (Join-Path $root 'runtime-compatibility.json') | ConvertFrom-Json
$fail=@()
function Check([bool]$ok,[string]$name){if(-not $ok){$script:fail+=$name}}
function ConvertFrom-JsonEscapedString([string]$value){ return ('"'+$value+'"' | ConvertFrom-Json) }
$Text = @{
  Andalucia = ConvertFrom-JsonEscapedString 'Andaluc\u00eda'
  ProgramacionLineal = ConvertFrom-JsonEscapedString 'Programaci\u00f3n lineal'
  LimitesContinuidad = ConvertFrom-JsonEscapedString 'L\u00edmites y continuidad'
  DerivadasAplicaciones = ConvertFrom-JsonEscapedString 'Derivadas y aplicaciones'
  IntegralesIndefinidas = ConvertFrom-JsonEscapedString 'Integrales indefinidas'
  IntegralesDefinidas = ConvertFrom-JsonEscapedString 'Integrales definidas'
  Probabilidad = ConvertFrom-JsonEscapedString 'Probabilidad'
  Distribucion = ConvertFrom-JsonEscapedString 'Distribuci\u00f3n binomial y normal'
  Muestreo = ConvertFrom-JsonEscapedString 'Muestreo e inferencia estad\u00edstica'
  Matrices = ConvertFrom-JsonEscapedString 'Matrices'
  Determinantes = ConvertFrom-JsonEscapedString 'Determinantes'
  Sistemas = ConvertFrom-JsonEscapedString 'Sistemas con determinantes'
}
Check ($rows.Count -eq 48) '48 ejercicios'; Check ($index.Count -eq 1666) '1666 total'; Check ($summary.mathematicsII -eq 826) '826 Matemáticas II'; Check ($summary.ccssII -eq 840) '840 CCSS II'; Check ($summary.ccssII2012 -eq 48) '48 CCSS II 2012'; Check ($summary.addedSubparts -eq 104) '104 subapartados'
Check (@($rows.exerciseId | Sort-Object -Unique).Count -eq 48) 'sin duplicados'; Check (@($rows | Where-Object {$_.publicationState -ne 'NOT_PUBLISHED'}).Count -eq 0) 'no publicados'; Check (@($rows | Where-Object {$_.reviewStates -notcontains 'ANSWER_REVIEW_REQUIRED' -or $_.reviewStates -notcontains 'SOLUTION_REVIEW_REQUIRED'}).Count -eq 0) 'revisiones pendientes'
Check ($taxonomy.Count -eq 48) '48 clasificaciones'; Check (@($rows|ForEach-Object{$_.subparts}|Where-Object{$null -ne $_.taxonomy}).Count -eq 104) '104 apartados clasificados'
Check (@($rows|Where-Object{-not $_.pauContext.isPau -or $_.pauContext.communityId -ne 'andalucia' -or $_.pauContext.subjectId -ne '2bach-ccss'}).Count -eq 0) 'aislamiento comunidad/materia'
Check (@($rows|Where-Object{$_.deliveryPolicy.runtimeConnected -or $_.deliveryPolicy.modalities.aiTrainer.canonicalEligible -or $_.deliveryPolicy.modalities.aiTrainer.runtimeAvailableNow}).Count -eq 0) 'sin runtime ni ai-trainer'
Check (@($rows|Where-Object{$_.deliveryPolicy.modalities.multipleChoice.canonicalEligible -or $_.answerPolicy.canonicalOptionsStored -or $_.answerPolicy.distractorsGenerated -or $null -ne $_.answerPolicy.correctOptionPosition}).Count -eq 0) 'sin A/B/C/D prematuro'
Check (@($rows|Where-Object{$_.answerPolicy.officialCriteriaRole -ne 'OFFICIAL_CORRECTION_EVIDENCE_ONLY' -or $_.answerPolicy.automaticCorrectionEligible -or $_.answerPolicy.pedagogicalSolutionEligible}).Count -eq 0) 'criterios solo evidencia'
Check (@($rows|Where-Object{(@($_.selectionPolicy.requiredFilters)-join ',') -ne 'subject,community,block,availability' -or -not $_.selectionPolicy.noRepeatWithinAttempt}).Count -eq 0) 'selección aislada y sin repetición'
Check (@($rows|ForEach-Object{$_.taxonomy.topics}|ForEach-Object{$_}|Where-Object{$_.runtimeTopicLabel -notin @($Text.Matrices,$Text.Determinantes,$Text.Sistemas,$Text.ProgramacionLineal,$Text.LimitesContinuidad,$Text.DerivadasAplicaciones,$Text.IntegralesIndefinidas,$Text.IntegralesDefinidas,$Text.Probabilidad,$Text.Distribucion,$Text.Muestreo)}).Count -eq 0) 'temas exactos del runtime'
Check ($runtime.runtimeCommunityConfiguration.missing -eq $Text.Andalucia -and -not $runtime.publicRuntimeConnected) 'incompatibilidad runtime documentada'
Check ($summary.equation3ValidatedObjects -eq 55 -and $summary.equation3ValidatedDependentExercises -eq 27) 'Equation.3'; Check ($summary.abcabcStatus -eq 'DOCUMENT_LAYOUT_HUMAN_VALIDATED') 'ABCABC'; Check ($summary.sourceRecordPreservation.inputRecords -eq 15527 -and $summary.sourceRecordPreservation.missingSourceRecordIds -eq 0) 'sourceRecordId'; Check (-not $summary.publicationConnected -and $summary.productionFilesModified -eq 0) 'producción intacta'; Check ($summary.answersGenerated -eq 0 -and $summary.solutionsGenerated -eq 0 -and $summary.distractorsGenerated -eq 0) 'sin contenido inventado'
$baseline=@(Get-Content -Encoding utf8 -LiteralPath (Join-Path $repo 'artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl') | ForEach-Object {$_|ConvertFrom-Json})
$beforeByYear=$baseline|Group-Object subject,year|ForEach-Object{"$($_.Name)|$($_.Count)"}|Sort-Object; $afterBaseline=$index|Where-Object {$_.source -eq 'BASELINE_1618'}|Group-Object subject,year|ForEach-Object{"$($_.Name)|$($_.Count)"}|Sort-Object; Check ((@($beforeByYear) -join "`n") -eq (@($afterBaseline) -join "`n")) 'ningún otro año cambia'
if($fail.Count){throw ('Fallos: '+($fail -join ', '))}
[ordered]@{passed=24;failed=0;runRoot=$RunRoot} | ConvertTo-Json
