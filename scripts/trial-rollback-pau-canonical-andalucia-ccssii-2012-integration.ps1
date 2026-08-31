param([string]$RunRoot = "artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a")
$ErrorActionPreference='Stop'; $repo=Split-Path -Parent $PSScriptRoot
Import-Module (Join-Path $repo 'catalog/pau-canonical/pau-canonical-identities.psm1') -Force
$baseline=Join-Path $repo 'artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl'; $overlay=Join-Path $repo $RunRoot
$result=[ordered]@{schemaVersion='mathup.pau-canonical-ccssii-2012-rollback-trial.v1'; baselineExists=(Test-Path $baseline); overlayExists=(Test-Path $overlay); action='LOGICAL_OVERLAY_DETACH_ONLY'; baselineCount=(Get-Content $baseline|Measure-Object -Line).Lines; baselineSha256=(Get-Sha256File $baseline); restoredCount=(Get-Content $baseline|Measure-Object -Line).Lines; productionMutationRequired=$false; result='PASSED'}
$path=Join-Path (Split-Path $overlay -Parent) 'rollback.json'; [IO.File]::WriteAllText($path,(($result|ConvertTo-Json -Depth 10)+"`n"),[Text.UTF8Encoding]::new($false)); $result|ConvertTo-Json
