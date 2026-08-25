$ErrorActionPreference='Stop'
$projectRoot=(Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$artifactRoot=Join-Path $projectRoot 'artifacts\pau-canonical-andalucia-madrid'
$protected=@('app.js','index.html','math-renderer.js','catalog\canonical-exercise.schema.json','catalog\canonical-exercise.mjs','catalog\validate-canonical-exercise.mjs')
$before=@{}
foreach($path in $protected){$full=Join-Path $projectRoot $path;if(Test-Path $full){$before[$path]=(Get-FileHash -Algorithm SHA256 $full).Hash.ToLowerInvariant()}}
$generated=@(Get-ChildItem -LiteralPath $artifactRoot -File -Recurse|ForEach-Object{$_.FullName.Substring($artifactRoot.Length+1).Replace('\','/')})
$after=@{}
foreach($path in $protected){$full=Join-Path $projectRoot $path;if(Test-Path $full){$after[$path]=(Get-FileHash -Algorithm SHA256 $full).Hash.ToLowerInvariant()}}
$changed=@($before.Keys|Where-Object{$before[$_] -ne $after[$_]})
$result=[ordered]@{schemaVersion='mathup.pau-canonical-rollback-trial.v1';mode='DRY_RUN_DELETE_GENERATED_PATHS_ONLY';generatedFiles=$generated.Count;rollbackScope='artifacts/pau-canonical-andalucia-madrid plus new parallel code only';protectedHashesBefore=$before;protectedHashesAfter=$after;protectedChanges=$changed;passed=($changed.Count -eq 0)}
$result|ConvertTo-Json -Depth 8|Set-Content -Encoding UTF8 (Join-Path $artifactRoot 'rollback-trial.json')
if(-not $result.passed){throw 'Protected production files changed'}
$result|ConvertTo-Json -Depth 5
