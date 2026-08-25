$ErrorActionPreference='Stop'
$root=(Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$artifactRoot=Join-Path $root 'artifacts\andalucia-ccssii-2012-doc'
$sandbox=Join-Path $artifactRoot 'rollback-sandbox'
if(-not $sandbox.StartsWith($artifactRoot,[StringComparison]::OrdinalIgnoreCase)){throw 'Unsafe rollback sandbox'}
$sources=Get-ChildItem (Join-Path $root 'sources\pau-official\andalucia\ccss-ii\2012\official-doc') -Filter '*.doc' -File|Sort Name
$before=@($sources|ForEach-Object{[ordered]@{name=$_.Name;sha256=(Get-FileHash $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant()}})
New-Item -ItemType Directory -Force -Path $sandbox|Out-Null
Copy-Item -LiteralPath (Join-Path $artifactRoot 'runs\run-a\summary.json') -Destination $sandbox
$trialExists=Test-Path (Join-Path $sandbox 'summary.json')
Remove-Item -LiteralPath $sandbox -Recurse -Force
$after=@($sources|ForEach-Object{[ordered]@{name=$_.Name;sha256=(Get-FileHash $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant()}})
$same=(($before|ConvertTo-Json -Compress)-eq($after|ConvertTo-Json -Compress))
$result=[ordered]@{sandboxCreated=$trialExists;sandboxRemoved=(-not(Test-Path $sandbox));sourceHashesUnchanged=$same;documents=$before.Count;rollback='PASS'}
[IO.File]::WriteAllText((Join-Path $artifactRoot 'rollback-result.json'),($result|ConvertTo-Json),[Text.UTF8Encoding]::new($false))
$result|ConvertTo-Json
