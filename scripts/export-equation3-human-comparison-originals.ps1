param([switch]$Force)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$queuePath = Join-Path $projectRoot 'artifacts\equation3-human-comparison\review-queue.jsonl'
$outputDir = Join-Path $projectRoot 'artifacts\equation3-human-comparison\original-documents'
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$rows = Get-Content -LiteralPath $queuePath | Where-Object { $_.Trim() } | ForEach-Object { $_ | ConvertFrom-Json }
$documents = $rows | Group-Object documentId | ForEach-Object { $_.Group[0] }
$word = $null
$manifest = @()
try {
  $word = New-Object -ComObject Word.Application
  $word.Visible = $false
  $word.DisplayAlerts = 0
  foreach ($item in $documents) {
    $sourcePath = Join-Path $projectRoot ($item.documentPath -replace '/', '\')
    $pdfPath = Join-Path $outputDir ($item.documentId + '.pdf')
    if ($Force -or -not (Test-Path -LiteralPath $pdfPath)) {
      $document = $word.Documents.OpenNoRepairDialog($sourcePath, $false, $true, $false)
      try { $document.ExportAsFixedFormat($pdfPath, 17) } finally { $document.Close($false) }
    }
    $sourceHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $sourcePath).Hash.ToLowerInvariant()
    if ($sourceHash -ne $item.documentSha256) { throw "Hash DOC distinto para $($item.documentId)" }
    $manifest += [ordered]@{
      documentId = $item.documentId
      sourcePath = $item.documentPath
      sourceSha256 = $sourceHash
      pdfPath = ('artifacts/equation3-human-comparison/original-documents/' + $item.documentId + '.pdf')
      pdfSha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $pdfPath).Hash.ToLowerInvariant()
      pageCount = $null
      conversion = 'MICROSOFT_WORD_EXPORT_FIXED_FORMAT_PDF'
    }
  }
} finally {
  if ($word) { $word.Quit() }
}
$manifest | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $outputDir 'manifest.json') -Encoding UTF8
Write-Host "Vistas oficiales completas disponibles: $($manifest.Count)/$($documents.Count)"
