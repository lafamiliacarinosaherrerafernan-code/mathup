$ErrorActionPreference = 'Stop'

$output = Join-Path $PSScriptRoot '..\tmp\pdfs\andalucia-phase28-targets'
New-Item -ItemType Directory -Force -Path $output | Out-Null

$poppler = 'C:\Users\aherr\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe'
$root = Join-Path $PSScriptRoot '..\documentos\PAU Comunidades\Andalucía'

$targets = @(
  @{ File = Join-Path $root 'CCSS II\CCSS II_3_2008.pdf'; Page = 1; Name = 'ccss-reserva3-2008' },
  @{ File = Join-Path $root 'Matemáticas II\Mates II_4_2019.pdf'; Page = 1; Name = 'mates-reserva4-2019' },
  @{ File = Join-Path $root 'Matemáticas II\Mates II_ord_2026.pdf'; Page = 2; Name = 'mates-ordinaria-2026' }
)

foreach ($target in $targets) {
  & $poppler -f $target.Page -l $target.Page -png -r 180 $target.File (Join-Path $output $target.Name)
  if ($LASTEXITCODE -ne 0) { throw "No se pudo renderizar $($target.File)" }
}

Get-ChildItem -LiteralPath $output -Filter '*.png' | Select-Object FullName, Length
