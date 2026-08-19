param(
  [Parameter(Mandatory = $true)]
  [string]$InputPdf,

  [Parameter(Mandatory = $true)]
  [string]$OutputText,

  [int]$FirstPage = 1,
  [int]$LastPage = 0,
  [int]$TargetWidth = 2600
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Runtime.WindowsRuntime

$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime]
$null = [Windows.Data.Pdf.PdfPageRenderOptions, Windows.Data.Pdf, ContentType = WindowsRuntime]
$null = [Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapPixelFormat, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapAlphaMode, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Globalization.Language, Windows.Globalization, ContentType = WindowsRuntime]

function Await-WinRtOperation {
  param(
    [Parameter(Mandatory = $true)]
    [object]$Operation,

    [Parameter(Mandatory = $true)]
    [type]$ResultType
  )

  $method = [System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object {
      $_.Name -eq "AsTask" -and
      $_.IsGenericMethodDefinition -and
      $_.GetGenericArguments().Count -eq 1 -and
      $_.GetParameters().Count -eq 1 -and
      $_.ToString().StartsWith("System.Threading.Tasks.Task``1[TResult] AsTask[TResult]")
    } |
    Select-Object -First 1

  if (-not $method) {
    throw "No se ha encontrado el adaptador AsTask para operaciones WinRT."
  }

  $task = $method.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
  $task.Wait()
  return $task.Result
}

function Await-WinRtAction {
  param(
    [Parameter(Mandatory = $true)]
    [object]$Action
  )

  $method = [System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object {
      $_.Name -eq "AsTask" -and
      -not $_.IsGenericMethodDefinition -and
      $_.GetParameters().Count -eq 1 -and
      $_.GetParameters()[0].ParameterType.Name -eq "IAsyncAction"
    } |
    Select-Object -First 1

  if (-not $method) {
    throw "No se ha encontrado el adaptador AsTask para acciones WinRT."
  }

  $task = $method.Invoke($null, @($Action))
  $task.Wait()
}

$resolvedPdf = (Resolve-Path -LiteralPath $InputPdf).Path
$resolvedOutput = [System.IO.Path]::GetFullPath($OutputText)
$outputDirectory = Split-Path -Parent $resolvedOutput
if ($outputDirectory -and -not (Test-Path -LiteralPath $outputDirectory)) {
  New-Item -ItemType Directory -Path $outputDirectory | Out-Null
}

$storageFile = Await-WinRtOperation `
  ([Windows.Storage.StorageFile]::GetFileFromPathAsync($resolvedPdf)) `
  ([Windows.Storage.StorageFile])

$pdf = Await-WinRtOperation `
  ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($storageFile)) `
  ([Windows.Data.Pdf.PdfDocument])

$language = [Windows.Globalization.Language]::new("es-ES")
$ocr = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($language)
if (-not $ocr) {
  $ocr = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
}
if (-not $ocr) {
  throw "Windows no dispone de un motor OCR compatible."
}

$pageCount = [int]$pdf.PageCount
$startIndex = [Math]::Max(0, $FirstPage - 1)
$endIndex = if ($LastPage -gt 0) {
  [Math]::Min($pageCount - 1, $LastPage - 1)
} else {
  $pageCount - 1
}

$builder = [System.Text.StringBuilder]::new()
for ($pageIndex = $startIndex; $pageIndex -le $endIndex; $pageIndex += 1) {
  $page = $pdf.GetPage([uint32]$pageIndex)
  $stream = [Windows.Storage.Streams.InMemoryRandomAccessStream]::new()
  try {
    $renderOptions = [Windows.Data.Pdf.PdfPageRenderOptions]::new()
    if ($TargetWidth -gt 0) {
      $renderOptions.DestinationWidth = [uint32]$TargetWidth
    }
    Await-WinRtAction ($page.RenderToStreamAsync($stream, $renderOptions))
    $stream.Seek(0)
    $decoder = Await-WinRtOperation `
      ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) `
      ([Windows.Graphics.Imaging.BitmapDecoder])
    $bitmap = Await-WinRtOperation `
      ($decoder.GetSoftwareBitmapAsync(
        [Windows.Graphics.Imaging.BitmapPixelFormat]::Bgra8,
        [Windows.Graphics.Imaging.BitmapAlphaMode]::Premultiplied
      )) `
      ([Windows.Graphics.Imaging.SoftwareBitmap])
    try {
      $result = Await-WinRtOperation `
        ($ocr.RecognizeAsync($bitmap)) `
        ([Windows.Media.Ocr.OcrResult])
      [void]$builder.AppendLine("===== PÁGINA $($pageIndex + 1) =====")
      [void]$builder.AppendLine($result.Text)
      [void]$builder.AppendLine()
    } finally {
      if ($bitmap -and $bitmap -is [System.IDisposable]) {
        $bitmap.Dispose()
      }
    }
  } finally {
    if ($stream -and $stream -is [System.IDisposable]) {
      $stream.Dispose()
    }
    if ($page -and $page -is [System.IDisposable]) {
      $page.Dispose()
    }
  }
  Write-Progress -Activity "OCR de $([System.IO.Path]::GetFileName($resolvedPdf))" `
    -Status "Página $($pageIndex + 1) de $pageCount" `
    -PercentComplete ((($pageIndex + 1) / $pageCount) * 100)
}

[System.IO.File]::WriteAllText(
  $resolvedOutput,
  $builder.ToString(),
  [System.Text.UTF8Encoding]::new($false)
)

[pscustomobject]@{
  Input = $resolvedPdf
  Output = $resolvedOutput
  Pages = ($endIndex - $startIndex + 1)
} | ConvertTo-Json -Compress
