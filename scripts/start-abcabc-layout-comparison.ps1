param(
  [int]$Port = 8849,
  [string]$NodePath = ''
)
$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$configuredNode = if ($NodePath) { $NodePath } elseif ($env:MATHUP_NODE_PATH) { $env:MATHUP_NODE_PATH } else { '' }
$Node = if ($configuredNode) {
  if (-not (Test-Path -LiteralPath $configuredNode)) { throw "No se encuentra Node.js en la ruta configurada: $configuredNode" }
  (Resolve-Path -LiteralPath $configuredNode).Path
} else {
  (Get-Command node -ErrorAction SilentlyContinue).Source
}
if (-not $Node -or -not (Test-Path -LiteralPath $Node)) {
  throw 'No se ha encontrado Node.js. Usa -NodePath, define MATHUP_NODE_PATH o incorpora node a PATH.'
}
& $Node (Join-Path $ProjectRoot 'tools\abcabc-layout-comparison\server.mjs') --port $Port
