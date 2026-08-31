param(
  [switch]$ConfirmRollback
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectRoot

if (-not $ConfirmRollback) {
  Write-Host "Ensayo seguro: no se ha modificado ningún archivo."
  Write-Host "Para restaurar exclusivamente la integración PAU Andalucía, ejecuta este script con -ConfirmRollback."
  exit 0
}

git restore --source=HEAD -- app.js bach-exam.js index.html

$newFiles = @(
  "data/andalucia-pau-runtime.js",
  "tests/pau-andalucia-runtime.test.mjs",
  "docs/IMPLEMENTACION-PAU-ANDALUCIA-2BACH-MATHUP.md"
)

foreach ($relativePath in $newFiles) {
  $absolutePath = Join-Path $projectRoot $relativePath
  if (Test-Path -LiteralPath $absolutePath) {
    Remove-Item -LiteralPath $absolutePath
  }
}

Write-Host "Rollback PAU Andalucía completado. Los bancos históricos y artefactos canónicos no se han tocado."
