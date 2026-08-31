$ErrorActionPreference='Stop'
$repo=Split-Path -Parent $PSScriptRoot
& (Join-Path $repo 'scripts/integrate-pau-canonical-andalucia-ccssii-2012.ps1') -OutputRoot 'artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a' | Out-Null
& (Join-Path $repo 'scripts/integrate-pau-canonical-andalucia-ccssii-2012.ps1') -OutputRoot 'artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-b' | Out-Null
& (Join-Path $repo 'scripts/integrate-pau-canonical-andalucia-ccssii-2012.ps1') -OutputRoot 'artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-order-reversed' -ReverseInput | Out-Null
$a=Get-Content -Raw -Encoding utf8 (Join-Path $repo 'artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a/semantic-hashes.json')|ConvertFrom-Json
$b=Get-Content -Raw -Encoding utf8 (Join-Path $repo 'artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-b/semantic-hashes.json')|ConvertFrom-Json
$r=Get-Content -Raw -Encoding utf8 (Join-Path $repo 'artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-order-reversed/semantic-hashes.json')|ConvertFrom-Json
if(($a|ConvertTo-Json -Compress) -ne ($b|ConvertTo-Json -Compress)){throw 'Doble corrida no reproducible'}
if(($a|ConvertTo-Json -Compress) -ne ($r|ConvertTo-Json -Compress)){throw 'Orden inverso no invariante'}
foreach($required in @('taxonomy-and-delivery-mapping.jsonl','runtime-compatibility.json')){if(-not(Test-Path -LiteralPath (Join-Path $repo "artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a/$required"))){throw "Falta $required"}}
& (Join-Path $repo 'scripts/verify-pau-canonical-andalucia-ccssii-2012-integration.ps1') | Out-Null
& (Join-Path $repo 'scripts/trial-rollback-pau-canonical-andalucia-ccssii-2012-integration.ps1') | Out-Null
'ok 18 - integración canónica Andalucía CCSS II 2012'
