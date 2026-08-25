param(
  [int]$Port = 8846,
  [ValidateSet('', 'first-3', 'object-1', 'recheck-10')]
  [string]$Pilot = '',
  [string]$NodePath = ''
)

$projectRoot = Split-Path -Parent $PSScriptRoot
$configuredNode = if ($NodePath) { $NodePath } elseif ($env:MATHUP_NODE_PATH) { $env:MATHUP_NODE_PATH } else { '' }
$node = if ($configuredNode) {
  if (-not (Test-Path -LiteralPath $configuredNode)) { throw "No se encuentra Node.js en la ruta configurada: $configuredNode" }
  (Resolve-Path -LiteralPath $configuredNode).Path
} else {
  (Get-Command node -ErrorAction SilentlyContinue).Source
}
if (-not $node) { throw 'No se ha encontrado Node.js. Usa -NodePath, define MATHUP_NODE_PATH o incorpora node a PATH.' }
$server = Join-Path $projectRoot 'tools\equation3-human-comparison\server.mjs'
$pilotArg = if ($Pilot) { @('--pilot', $Pilot) } else { @() }
& $node $server '--port' $Port @pilotArg
