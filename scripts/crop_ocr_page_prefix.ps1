param(
  [Parameter(Mandatory = $true)]
  [string]$InputImage,

  [Parameter(Mandatory = $true)]
  [string]$EndProblemId,

  [Parameter(Mandatory = $true)]
  [string]$OutputImage,

  [Parameter(Mandatory = $true)]
  [string]$LayoutJson,

  [int]$MaxWidth = 1400,
  [int]$JpegQuality = 86
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$layout = Get-Content -LiteralPath $LayoutJson -Raw | ConvertFrom-Json
$escapedEndId = (($EndProblemId -split '\.') | ForEach-Object { [regex]::Escape($_) }) -join '\s*[\.,]\s*'
$endLine = $layout.lines | Where-Object {
  $_.text -match "(?i)Problema\s+$escapedEndId(?:\s|$)"
} | Select-Object -First 1
if (-not $endLine) {
  throw "No se localizó el encabezado del problema $EndProblemId en $InputImage"
}

$cropX = 380
$cropY = 300
$cropWidth = [math]::Min([int]$layout.width - $cropX - 180, 3040)
$cropHeight = [math]::Max(120, [int][math]::Floor([double]$endLine.y - 25 - $cropY))

$source = [System.Drawing.Bitmap]::FromFile((Resolve-Path -LiteralPath $InputImage).Path)
try {
  $cropped = [System.Drawing.Bitmap]::new($cropWidth, $cropHeight)
  try {
    $graphics = [System.Drawing.Graphics]::FromImage($cropped)
    try {
      $graphics.Clear([System.Drawing.Color]::White)
      $graphics.DrawImage(
        $source,
        [System.Drawing.Rectangle]::new(0, 0, $cropWidth, $cropHeight),
        [System.Drawing.Rectangle]::new($cropX, $cropY, $cropWidth, $cropHeight),
        [System.Drawing.GraphicsUnit]::Pixel
      )

      # Las puntuaciones no forman parte del enunciado que ve el alumno.
      foreach ($line in $layout.lines) {
        if ([double]$line.y -lt $cropY -or [double]$line.y -gt ($cropY + $cropHeight)) { continue }
        $words = @($line.words)
        for ($wordIndex = 0; $wordIndex -lt $words.Count; $wordIndex += 1) {
          if ($words[$wordIndex].text -notmatch '(?i)^puntos?\)?[\.,:]?$') { continue }
          $scoreStart = $wordIndex
          while ($scoreStart -gt 0 -and ($wordIndex - $scoreStart) -lt 3) {
            $scoreStart -= 1
            if ($words[$scoreStart].text -match '^\(') { break }
          }
          if ($words[$scoreStart].text -notmatch '^\(') { continue }
          $left = [math]::Max(0, [int]([double]$words[$scoreStart].x - $cropX - 5))
          $top = [math]::Max(0, [int]([double]$line.y - $cropY - 6))
          $right = [math]::Min($cropWidth, [int]([double]$words[$wordIndex].x + [double]$words[$wordIndex].width - $cropX + 7))
          $bottom = [math]::Min($cropHeight, [int]([double]$line.y + [double]$line.height - $cropY + 7))
          if ($right -gt $left) {
            $graphics.FillRectangle([System.Drawing.Brushes]::White, [System.Drawing.Rectangle]::new($left, $top, $right - $left, $bottom - $top))
          }
        }
      }
    } finally {
      $graphics.Dispose()
    }

    $final = $cropped
    if ($MaxWidth -gt 0 -and $cropped.Width -gt $MaxWidth) {
      $targetHeight = [int][math]::Round($cropped.Height * ($MaxWidth / [double]$cropped.Width))
      $final = [System.Drawing.Bitmap]::new($MaxWidth, $targetHeight)
      $resizeGraphics = [System.Drawing.Graphics]::FromImage($final)
      try {
        $resizeGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $resizeGraphics.DrawImage($cropped, 0, 0, $MaxWidth, $targetHeight)
      } finally {
        $resizeGraphics.Dispose()
      }
    }

    try {
      $resolvedOutput = [System.IO.Path]::GetFullPath($OutputImage)
      $outputDirectory = Split-Path -Parent $resolvedOutput
      if (-not (Test-Path -LiteralPath $outputDirectory)) { New-Item -ItemType Directory -Path $outputDirectory | Out-Null }
      $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg' | Select-Object -First 1
      $parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
      $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]$JpegQuality)
      $final.Save($resolvedOutput, $codec, $parameters)
    } finally {
      if ($final -ne $cropped) { $final.Dispose() }
    }
  } finally {
    $cropped.Dispose()
  }
} finally {
  $source.Dispose()
}

[pscustomobject]@{
  input = (Resolve-Path -LiteralPath $InputImage).Path
  endProblemId = $EndProblemId
  output = [System.IO.Path]::GetFullPath($OutputImage)
} | ConvertTo-Json -Compress
