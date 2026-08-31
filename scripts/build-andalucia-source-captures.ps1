$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$artifact = Join-Path $root 'artifacts\andalucia-source-app-visual-parity'
$captures = Join-Path $artifact 'source-captures'
$docPdf = Join-Path $artifact 'doc-pdf'
$docStage = Join-Path $artifact 'doc-stage'
New-Item -ItemType Directory -Force -Path $captures, $docPdf, $docStage | Out-Null
$queue = Get-Content (Join-Path $artifact 'review-queue.json') -Raw | ConvertFrom-Json
$word = $null
try {
  foreach ($row in $queue) {
    if (-not $row.sourceFile) { continue }
    # Windows PowerShell 5 interpreta JSON UTF-8 sin BOM con su página ANSI;
    # resolvemos por el nombre ASCII del archivo para no depender del acento de
    # `Andalucía` contenido en la ruta serializada.
    $source = Get-ChildItem -LiteralPath (Join-Path $root 'documentos') -Recurse -File -Filter $row.sourceFile |
      Select-Object -First 1 -ExpandProperty FullName
    if (-not $source) { throw "Source not found: $($row.sourceFile)" }
    $pdf = $source
    if ([IO.Path]::GetExtension($source) -ieq '.doc') {
      # Estos ocho casos quedan expresamente en revisión humana. Word 2012
      # muestra un diálogo de reparación al automatizar los binarios antiguos;
      # no se fuerza una conversión que pudiera alterar su representación.
      continue
    }
    $page = if ($null -ne $row.sourcePage) { [int]$row.sourcePage } else { 1 }
    $target = Join-Path $captures $row.exerciseId
    & pdftoppm -f $page -l $page -r 120 -png -singlefile $pdf $target
    if ($LASTEXITCODE -ne 0) { throw "pdftoppm failed for $source page $page" }
  }
} finally {
  if ($null -ne $word) { $word.Quit(); [Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null }
}
$count = (Get-ChildItem -LiteralPath $captures -Filter '*.png').Count
Write-Output "source_captures=$count; manual_source_pending=$($queue.Count - $count)"
