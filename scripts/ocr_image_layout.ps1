param(
  [Parameter(Mandatory = $true)]
  [string]$InputImage,

  [string]$OutputJson = ""
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Runtime.WindowsRuntime

$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Storage.FileAccessMode, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapPixelFormat, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapAlphaMode, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.SoftwareBitmap, Windows.Graphics.Imaging, ContentType = WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Media.Ocr.OcrResult, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Globalization.Language, Windows.Globalization, ContentType = WindowsRuntime]

function Await-WinRtOperation {
  param([object]$Operation, [type]$ResultType)
  $method = [System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object {
      $_.Name -eq "AsTask" -and $_.IsGenericMethodDefinition -and
      $_.GetGenericArguments().Count -eq 1 -and $_.GetParameters().Count -eq 1 -and
      $_.ToString().StartsWith("System.Threading.Tasks.Task``1[TResult] AsTask[TResult]")
    } | Select-Object -First 1
  $task = $method.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
  $task.Wait()
  return $task.Result
}

$resolvedImage = (Resolve-Path -LiteralPath $InputImage).Path
$storageFile = Await-WinRtOperation `
  ([Windows.Storage.StorageFile]::GetFileFromPathAsync($resolvedImage)) `
  ([Windows.Storage.StorageFile])
$stream = Await-WinRtOperation `
  ($storageFile.OpenAsync([Windows.Storage.FileAccessMode]::Read)) `
  ([Windows.Storage.Streams.IRandomAccessStream])

$language = [Windows.Globalization.Language]::new("es-ES")
$ocr = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($language)
if (-not $ocr) { $ocr = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages() }

try {
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
    $result = Await-WinRtOperation ($ocr.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
    $lines = foreach ($line in $result.Lines) {
      $words = @($line.Words)
      if (-not $words.Count) { continue }
      $left = ($words | ForEach-Object { $_.BoundingRect.X } | Measure-Object -Minimum).Minimum
      $top = ($words | ForEach-Object { $_.BoundingRect.Y } | Measure-Object -Minimum).Minimum
      $right = ($words | ForEach-Object { $_.BoundingRect.X + $_.BoundingRect.Width } | Measure-Object -Maximum).Maximum
      $bottom = ($words | ForEach-Object { $_.BoundingRect.Y + $_.BoundingRect.Height } | Measure-Object -Maximum).Maximum
      [pscustomobject]@{
        text = [string]$line.Text
        x = [math]::Round([double]$left, 2)
        y = [math]::Round([double]$top, 2)
        width = [math]::Round([double]($right - $left), 2)
        height = [math]::Round([double]($bottom - $top), 2)
        words = @($words | ForEach-Object {
          [pscustomobject]@{
            text = [string]$_.Text
            x = [math]::Round([double]$_.BoundingRect.X, 2)
            y = [math]::Round([double]$_.BoundingRect.Y, 2)
            width = [math]::Round([double]$_.BoundingRect.Width, 2)
            height = [math]::Round([double]$_.BoundingRect.Height, 2)
          }
        })
      }
    }
    $output = [pscustomobject]@{
      image = $resolvedImage
      width = [int]$bitmap.PixelWidth
      height = [int]$bitmap.PixelHeight
      lines = @($lines)
    }
    $json = $output | ConvertTo-Json -Depth 8
    if ($OutputJson) {
      $resolvedOutput = [System.IO.Path]::GetFullPath($OutputJson)
      [System.IO.File]::WriteAllText($resolvedOutput, $json, [System.Text.UTF8Encoding]::new($false))
    }
    $json
  } finally {
    if ($bitmap -is [System.IDisposable]) { $bitmap.Dispose() }
  }
} finally {
  if ($stream -is [System.IDisposable]) { $stream.Dispose() }
}
