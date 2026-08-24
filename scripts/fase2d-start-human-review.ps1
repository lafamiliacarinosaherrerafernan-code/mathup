param(
  [ValidateRange(1024, 65535)]
  [int]$Port = 8824
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$nodePath = if ($nodeCommand) { $nodeCommand.Source } else {
  Get-ChildItem -LiteralPath 'C:\Program Files\WindowsApps' -Directory -Filter 'OpenAI.Codex*' -ErrorAction SilentlyContinue |
    ForEach-Object { Join-Path $_.FullName 'app\resources\node.exe' } |
    Where-Object { Test-Path -LiteralPath $_ } |
    Select-Object -First 1
}
if (-not $nodePath) {
  throw 'No se ha encontrado Node.js. Abre la herramienta desde Codex o instala Node.js.'
}
$queuePath = Join-Path $projectRoot 'artifacts\fase2d-human-review\review-queue.jsonl'
if (-not (Test-Path -LiteralPath $queuePath)) {
  & $nodePath (Join-Path $projectRoot 'scripts\fase2d-build-human-review-queue.mjs')
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
$serverScript = Join-Path $projectRoot 'tools\fase2d-human-review\server.mjs'
$localUrl = "http://127.0.0.1:$Port/"
$serverProcess = Start-Process -FilePath $nodePath -ArgumentList @($serverScript, "--port=$Port") -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru
$ready = $false
for ($attempt = 0; $attempt -lt 30; $attempt++) {
  if ($serverProcess.HasExited) { throw "El servidor local no pudo iniciarse en el puerto $Port." }
  try {
    $response = Invoke-WebRequest -Uri $localUrl -UseBasicParsing -TimeoutSec 1
    if ($response.StatusCode -eq 200) { $ready = $true; break }
  } catch {
    Start-Sleep -Milliseconds 100
  }
}
if (-not $ready) {
  Stop-Process -Id $serverProcess.Id -ErrorAction SilentlyContinue
  throw "El servidor local no respondió en $localUrl. Prueba otro puerto con -Port 8899."
}
Start-Process $localUrl
