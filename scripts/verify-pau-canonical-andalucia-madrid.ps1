param([string]$ArtifactRoot = (Join-Path (Resolve-Path (Join-Path $PSScriptRoot '..')).Path 'artifacts\pau-canonical-andalucia-madrid'))
$ErrorActionPreference = 'Stop'
function Read-Json([string]$Path) { [IO.File]::ReadAllText($Path,[Text.Encoding]::UTF8) | ConvertFrom-Json }
$paths=@{}
foreach($name in @('run-a','run-b','run-order-reversed')){
  $paths[$name]=Join-Path $ArtifactRoot "runs\$name\semantic-hashes.json"
  if(-not(Test-Path -LiteralPath $paths[$name])){throw "Missing semantic hashes: $name"}
}
[object[]]$a=Read-Json $paths['run-a'];[object[]]$b=Read-Json $paths['run-b'];[object[]]$reversed=Read-Json $paths['run-order-reversed']
$comparisons=@()
for($index=0;$index -lt $a.Count;$index++){
  $comparisons += [pscustomobject]@{path=[string]$a[$index].path;runA=[string]$a[$index].sha256;runB=[string]$b[$index].sha256;reversed=[string]$reversed[$index].sha256;identical=($a[$index].path -eq $b[$index].path -and $a[$index].path -eq $reversed[$index].path -and $a[$index].sha256 -eq $b[$index].sha256 -and $a[$index].sha256 -eq $reversed[$index].sha256)}
}
$result=[ordered]@{schemaVersion='mathup.pau-canonical-reproducibility.v1';semanticFiles=$comparisons.Count;identicalFiles=@($comparisons|Where-Object identical).Count;allIdentical=(-not @($comparisons|Where-Object{-not $_.identical}).Count);comparisons=$comparisons}
$result|ConvertTo-Json -Depth 8|Set-Content -Encoding UTF8 (Join-Path $ArtifactRoot 'reproducibility.json')
if(-not $result.allIdentical){throw 'Semantic artifacts are not reproducible'}
$result|ConvertTo-Json -Depth 5
