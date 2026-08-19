param(
    [Parameter(Mandatory = $true)]
    [string]$InputPath,

    [Parameter(Mandatory = $true)]
    [string]$OutputHtml
)

$ErrorActionPreference = "Stop"
$resolvedInput = (Resolve-Path -LiteralPath $InputPath).Path
$outputParent = Split-Path -Parent $OutputHtml
New-Item -ItemType Directory -Path $outputParent -Force | Out-Null
$absoluteOutput = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputHtml))

$word = $null
$document = $null

try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $document = $word.Documents.Open($resolvedInput, $false, $true)
    $pageCount = $document.ComputeStatistics(2)
    $document.SaveAs2($absoluteOutput, 10)

    Write-Output ("PAGES={0}" -f $pageCount)
    Write-Output ("INLINE_SHAPES={0}" -f $document.InlineShapes.Count)
    Write-Output ("FLOATING_SHAPES={0}" -f $document.Shapes.Count)
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
