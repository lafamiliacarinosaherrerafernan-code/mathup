param(
  [Parameter(Mandatory = $true)]
  [string]$InputImage,

  [Parameter(Mandatory = $true)]
  [string]$ProblemId,

  [Parameter(Mandatory = $true)]
  [string]$OutputImage,

  [string]$NextProblemId = "",
  [string]$LayoutJson = "",
  [switch]$SolutionOnly,
  [int]$MaxWidth = 1400,
  [int]$JpegQuality = 86
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$ownsLayout = -not $LayoutJson
$layoutPath = if ($LayoutJson) {
  (Resolve-Path -LiteralPath $LayoutJson).Path
} else {
  Join-Path ([System.IO.Path]::GetTempPath()) ("madrid-pau-layout-" + [guid]::NewGuid().ToString("N") + ".json")
}
try {
  if ($ownsLayout) {
    & (Join-Path $PSScriptRoot "ocr_image_layout.ps1") -InputImage $InputImage -OutputJson $layoutPath | Out-Null
  }
  $layout = Get-Content -LiteralPath $layoutPath -Raw | ConvertFrom-Json
  $idPattern = (($ProblemId -split '\.') | ForEach-Object { [regex]::Escape($_) }) -join '\s*[\.,]\s*'
  $startLine = $layout.lines | Where-Object { $_.text -match "(?i)Problema\s+$idPattern(?:\s|$)" } | Select-Object -First 1
  if (-not $startLine) { throw "No se localizó el encabezado del problema $ProblemId en $InputImage" }

  $endY = [double]$layout.height - 150
  if ($NextProblemId) {
    $nextIdPattern = (($NextProblemId -split '\.') | ForEach-Object { [regex]::Escape($_) }) -join '\s*[\.,]\s*'
    $nextLine = $layout.lines | Where-Object { $_.text -match "(?i)Problema\s+$nextIdPattern(?:\s|$)" } | Select-Object -First 1
    if ($nextLine) {
      $intermediateMarkers = @($layout.lines | Where-Object {
        $_.y -gt $startLine.y -and $_.y -lt $nextLine.y -and
        $_.text -match '^(?i)(Opci[oó]n\s+|\d+\.\d+(?:\.\d+)?\.?\s|Año\s+)'
      })
      $endY = if ($intermediateMarkers.Count) {
        $marker = $intermediateMarkers | Sort-Object y | Select-Object -First 1
        [double]$marker.y - [math]::Max(220, [double]$marker.height * 3.5)
      } else {
        [double]$nextLine.y - [math]::Max(220, [double]$nextLine.height * 3.5)
      }
    }
  }

  # El índice lógico del recopilatorio no siempre coincide con el orden
  # físico de los problemas en la página (por ejemplo, Opción A/B). Cortamos
  # ante el primer encabezado editorial posterior al problema actual aunque
  # no sea el siguiente identificador del manifiesto. Así nunca se arrastran
  # referencias como "1.17.2. Ordinaria" u "Opción A" al enunciado visible.
  $physicalFollowingHeading = $layout.lines | Where-Object {
    [double]$_.y -gt ([double]$startLine.y + [double]$startLine.height) -and
    [double]$_.y -lt $endY -and
    [string]$_.text -match '(?i)^(?:Opci.{0,2}n\s+[AB]\b|(?:Problema\s+)?\d+\.\d+\.\d+\.?\s)'
  } | Sort-Object y | Select-Object -First 1
  if ($physicalFollowingHeading) {
    $endY = [double]$physicalFollowingHeading.y - [math]::Max(220, [double]$physicalFollowingHeading.height * 3.5)
  }

  $cropX = 380
  $cropStartLine = $startLine
  if ($SolutionOnly) {
    $solutionLine = $layout.lines | Where-Object {
      [double]$_.y -gt [double]$startLine.y -and
      [double]$_.y -lt $endY -and
      [string]$_.text -match '(?i)^Soluci.{0,2}n\s*:'
    } | Select-Object -First 1
    if ($solutionLine) {
      $cropStartLine = $solutionLine
      $followingHeading = $layout.lines | Where-Object {
        [double]$_.y -gt ([double]$solutionLine.y + [double]$solutionLine.height) -and
        [double]$_.y -lt $endY -and
        [string]$_.text -match '(?i)^(?:Opci.{0,2}n\s+|(?:Problema\s+)?\d+\.\d+\.\d+\.?\s)'
      } | Sort-Object y | Select-Object -First 1
      if ($followingHeading) {
        $endY = [double]$followingHeading.y - [math]::Max(220, [double]$followingHeading.height * 3.5)
      }
    }
  }
  $cropY = [math]::Max(0, [int][math]::Floor([double]$cropStartLine.y - 20))
  $cropWidth = [math]::Min([int]$layout.width - $cropX - 180, 3040)
  $cropHeight = [math]::Max(120, [int][math]::Ceiling($endY - $cropY))

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

        # Se ocultan solo el número interno y la puntuación total. El texto
        # del enunciado que comienza en la misma línea se conserva intacto.
        $words = @($startLine.words)
        $statementWordIndex = 0
        for ($index = 0; $index -lt $words.Count; $index += 1) {
          if ($words[$index].text -match '(?i)^puntos?\)?$') {
            $statementWordIndex = $index + 1
            break
          }
        }
        if ($statementWordIndex -gt 0 -and $statementWordIndex -lt $words.Count) {
          $statementWord = $words[$statementWordIndex]
          $maskLeft = [math]::Max(0, [int]([double]$startLine.x - $cropX - 8))
          $maskTop = [math]::Max(0, [int]([double]$startLine.y - $cropY - 8))
          $maskRight = [math]::Min($cropWidth, [int]([double]$statementWord.x - $cropX - 10))
          $maskBottom = [math]::Min($cropHeight, [int]([double]$startLine.y + [double]$startLine.height - $cropY + 8))
          if ($maskRight -gt $maskLeft) {
            $graphics.FillRectangle(
              [System.Drawing.Brushes]::White,
              [System.Drawing.Rectangle]::new($maskLeft, $maskTop, $maskRight - $maskLeft, $maskBottom - $maskTop)
            )
          }
        }

        # Las puntuaciones de los apartados tampoco forman parte del contenido
        # matemático. Se eliminan sin tocar la letra del apartado ni su texto.
        foreach ($line in $layout.lines) {
          if ([double]$line.y -lt $cropY -or [double]$line.y -gt ($cropY + $cropHeight)) { continue }
          $lineWords = @($line.words)
          for ($wordIndex = 0; $wordIndex -lt $lineWords.Count; $wordIndex += 1) {
            if ($lineWords[$wordIndex].text -notmatch '(?i)^puntos?\)?[\.,:]?$') { continue }
            $scoreStart = $wordIndex
            while ($scoreStart -gt 0 -and ($wordIndex - $scoreStart) -lt 3) {
              $scoreStart -= 1
              if ($lineWords[$scoreStart].text -match '^\(') { break }
            }
            if ($lineWords[$scoreStart].text -notmatch '^\(') { continue }
            $scoreLeft = [math]::Max(0, [int]([double]$lineWords[$scoreStart].x - $cropX - 5))
            $scoreTop = [math]::Max(0, [int]([double]$line.y - $cropY - 6))
            $scoreRight = [math]::Min(
              $cropWidth,
              [int]([double]$lineWords[$wordIndex].x + [double]$lineWords[$wordIndex].width - $cropX + 7)
            )
            $scoreBottom = [math]::Min($cropHeight, [int]([double]$line.y + [double]$line.height - $cropY + 7))
            if ($scoreRight -gt $scoreLeft) {
              $graphics.FillRectangle(
                [System.Drawing.Brushes]::White,
                [System.Drawing.Rectangle]::new($scoreLeft, $scoreTop, $scoreRight - $scoreLeft, $scoreBottom - $scoreTop)
              )
            }
          }
        }

        if ($SolutionOnly -and $cropHeight -gt 30) {
          $graphics.FillRectangle(
            [System.Drawing.Brushes]::White,
            [System.Drawing.Rectangle]::new(0, $cropHeight - 25, $cropWidth, 25)
          )
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
        $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new(
          [System.Drawing.Imaging.Encoder]::Quality,
          [long]$JpegQuality
        )
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
} finally {
  if ($ownsLayout -and (Test-Path -LiteralPath $layoutPath)) { Remove-Item -LiteralPath $layoutPath -Force }
}

[pscustomobject]@{
  input = (Resolve-Path -LiteralPath $InputImage).Path
  problemId = $ProblemId
  output = [System.IO.Path]::GetFullPath($OutputImage)
} | ConvertTo-Json -Compress
