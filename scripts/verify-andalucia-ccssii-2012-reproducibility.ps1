$ErrorActionPreference='Stop'
$root=(Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$artifactRoot=Join-Path $root 'artifacts\andalucia-ccssii-2012-doc'
$runNames=@('run-a','run-b','run-order-reversed')
$semanticFiles=@('documents.jsonl','document-objects.jsonl','recovered-exercises.jsonl')
$runs=@()
foreach($runName in $runNames){
  $runRoot=Join-Path $artifactRoot "runs\$runName"
  $summary=Get-Content -LiteralPath (Join-Path $runRoot 'summary.json') -Raw -Encoding UTF8|ConvertFrom-Json
  $fileHashes=[ordered]@{}
  foreach($name in $semanticFiles){
    $fileHashes[$name]=(Get-FileHash -LiteralPath (Join-Path $runRoot $name) -Algorithm SHA256).Hash.ToLowerInvariant()
  }
  $runs+=[pscustomobject][ordered]@{runName=$runName;semanticSha256=$summary.semanticSha256;fileHashes=$fileHashes}
}
$semanticEqual=@($runs|Select-Object -ExpandProperty semanticSha256 -Unique).Count -eq 1
$fileHashesEqual=$true
foreach($name in $semanticFiles){
  if(@($runs|ForEach-Object{$_.fileHashes[$name]}|Select-Object -Unique).Count -ne 1){$fileHashesEqual=$false}
}
$result=[ordered]@{
  phase='ANDALUCIA_CCSSII_2012_DOC_RECOVERY'
  runs=$runs
  doubleRunReproducible=$semanticEqual
  orderInvariant=($semanticEqual -and $fileHashesEqual)
  semanticFilesByteIdentical=$fileHashesEqual
  result=if($semanticEqual -and $fileHashesEqual){'PASS'}else{'FAIL'}
}
[IO.File]::WriteAllText((Join-Path $artifactRoot 'reproducibility-result.json'),($result|ConvertTo-Json -Depth 8),[Text.UTF8Encoding]::new($false))
$result|ConvertTo-Json -Depth 8
if($result.result -ne 'PASS'){exit 1}
