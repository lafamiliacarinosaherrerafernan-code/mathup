param(
    [Parameter(Mandatory = $true)]
    [string]$InputPath,

    [Parameter(Mandatory = $true)]
    [string]$OutputTsv
)

$ErrorActionPreference = "Stop"
$resolvedInput = (Resolve-Path -LiteralPath $InputPath).Path
$outputParent = Split-Path -Parent $OutputTsv
New-Item -ItemType Directory -Path $outputParent -Force | Out-Null
$absoluteOutput = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputTsv))

$word = $null
$document = $null

try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $document = $word.Documents.Open($resolvedInput, $false, $true)
    $rows = @("asset`tpage`tparagraph")

    for ($index = 1; $index -le $document.InlineShapes.Count; $index++) {
        $shape = $document.InlineShapes.Item($index)
        $page = $shape.Range.Information(3)
        $paragraph = $shape.Range.Paragraphs.Item(1).Range.Text
        $paragraph = ($paragraph -replace "[\r\n\t]+", " " -replace "\s+", " ").Trim()
        $rows += ("image{0:D3}`t{1}`t{2}" -f $index, $page, $paragraph)
        [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($shape)
    }

    [System.IO.File]::WriteAllLines($absoluteOutput, $rows, [System.Text.UTF8Encoding]::new($false))
    Write-Output ("ASSETS={0}" -f $document.InlineShapes.Count)
}
finally {
    if ($null -ne $document) {
        $document.Close($false)
        [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($document)
    }
    if ($null -ne $word) {
        $word.Quit()
        [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($word)
    }
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}
