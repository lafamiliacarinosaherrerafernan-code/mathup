param(
    [Parameter(Mandatory = $true)]
    [string]$InputDirectory,

    [Parameter(Mandatory = $true)]
    [string]$OutputDirectory,

    [int]$ItemsPerSheet = 16,
    [int]$Columns = 2,
    [int]$CellWidth = 720,
    [int]$CellHeight = 260
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$files = Get-ChildItem -LiteralPath $InputDirectory -File |
    Where-Object { $_.Extension -match '^\.(png|jpg|jpeg)$' } |
    Sort-Object Name
New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null

$rows = [Math]::Ceiling($ItemsPerSheet / $Columns)
$font = New-Object System.Drawing.Font("Arial", 18, [System.Drawing.FontStyle]::Bold)
$labelBrush = [System.Drawing.Brushes]::Black
$borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::LightGray, 1)

try {
    for ($offset = 0; $offset -lt $files.Count; $offset += $ItemsPerSheet) {
        $sheetNumber = [int]($offset / $ItemsPerSheet) + 1
        $bitmap = New-Object System.Drawing.Bitmap($($Columns * $CellWidth), $($rows * $CellHeight))
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        $graphics.Clear([System.Drawing.Color]::White)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

        try {
            for ($local = 0; $local -lt $ItemsPerSheet -and ($offset + $local) -lt $files.Count; $local++) {
                $file = $files[$offset + $local]
                $column = $local % $Columns
                $row = [int]($local / $Columns)
                $x = $column * $CellWidth
                $y = $row * $CellHeight
                $graphics.DrawRectangle($borderPen, $x, $y, $CellWidth - 1, $CellHeight - 1)
                $graphics.DrawString($file.BaseName, $font, $labelBrush, $x + 10, $y + 8)

                $image = [System.Drawing.Image]::FromFile($file.FullName)
                try {
                    $maxWidth = $CellWidth - 30
                    $maxHeight = $CellHeight - 55
                    $scale = [Math]::Min($maxWidth / $image.Width, $maxHeight / $image.Height)
                    $drawWidth = [int]($image.Width * $scale)
                    $drawHeight = [int]($image.Height * $scale)
                    $drawX = $x + [int](($CellWidth - $drawWidth) / 2)
                    $drawY = $y + 45 + [int](($maxHeight - $drawHeight) / 2)
                    $graphics.DrawImage($image, $drawX, $drawY, $drawWidth, $drawHeight)
                }
                finally {
                    $image.Dispose()
                }
            }

            $outputPath = Join-Path $OutputDirectory ("sheet-{0:D2}.png" -f $sheetNumber)
            $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
        }
        finally {
            $graphics.Dispose()
            $bitmap.Dispose()
        }
    }
}
finally {
    $font.Dispose()
    $borderPen.Dispose()
}
