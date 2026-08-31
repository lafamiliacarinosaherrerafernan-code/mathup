param(
    [Parameter(Mandatory = $true)]
    [string]$InputPath,

    [Parameter(Mandatory = $true)]
    [string]$OutputTsv
)

$ErrorActionPreference = "Stop"
$resolvedInput = (Resolve-Path -LiteralPath $InputPath).Path
$absoluteOutput = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputTsv))
$outputParent = Split-Path -Parent $absoluteOutput
New-Item -ItemType Directory -Path $outputParent -Force | Out-Null

$word = $null
$document = $null

try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $document = $word.Documents.Open($resolvedInput, $false, $true)
    $rows = @("paragraph`tpage`ttext")

    for ($index = 1; $index -le $document.Paragraphs.Count; $index++) {
        $paragraph = $document.Paragraphs.Item($index)
        $text = $paragraph.Range.Text
        $text = ($text -replace "[\r\n\t]+", " " -replace "\s+", " ").Trim()
        if ($text) {
            $page = $paragraph.Range.Information(3)
            $rows += ("{0}`t{1}`t{2}" -f $index, $page, $text)
        }
        [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($paragraph)
    }

    [System.IO.File]::WriteAllLines($absoluteOutput, $rows, [System.Text.UTF8Encoding]::new($false))
    Write-Output ("PARAGRAPHS={0}" -f ($rows.Count - 1))
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
