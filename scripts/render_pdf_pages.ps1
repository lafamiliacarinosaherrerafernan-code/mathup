param(
  [Parameter(Mandatory = $true)]
  [string]$InputPdf,

  [Parameter(Mandatory = $true)]
  [string]$OutputDirectory,

  [int]$FirstPage = 1,
  [int]$LastPage = 0,
  [int]$TargetWidth = 2200
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Runtime.WindowsRuntime

$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Storage.StorageFolder, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Storage.CreationCollisionOption, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Storage.FileAccessMode, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime]
$null = [Windows.Data.Pdf.PdfPageRenderOptions, Windows.Data.Pdf, ContentType = WindowsRuntime]
$null = [Windows.Storage.Streams.IRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime]

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
$resolvedOutput = [System.IO.Path]::GetFullPath($OutputDirectory)
if (-not (Test-Path -LiteralPath $resolvedOutput)) {
  New-Item -ItemType Directory -Path $resolvedOutput | Out-Null
}

$storageFile = Await-WinRtOperation `
  ([Windows.Storage.StorageFile]::GetFileFromPathAsync($resolvedPdf)) `
  ([Windows.Storage.StorageFile])
$pdf = Await-WinRtOperation `
  ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($storageFile)) `
  ([Windows.Data.Pdf.PdfDocument])
$outputFolder = Await-WinRtOperation `
  ([Windows.Storage.StorageFolder]::GetFolderFromPathAsync($resolvedOutput)) `
  ([Windows.Storage.StorageFolder])

$pageCount = [int]$pdf.PageCount
$startIndex = [Math]::Max(0, $FirstPage - 1)
$endIndex = if ($LastPage -gt 0) {
  [Math]::Min($pageCount - 1, $LastPage - 1)
} else {
  $pageCount - 1
}

for ($pageIndex = $startIndex; $pageIndex -le $endIndex; $pageIndex += 1) {
  $page = $pdf.GetPage([uint32]$pageIndex)
  $outputName = "page-{0:D4}.png" -f ($pageIndex + 1)
  $outputFile = Await-WinRtOperation `
    ($outputFolder.CreateFileAsync(
      $outputName,
      [Windows.Storage.CreationCollisionOption]::ReplaceExisting
    )) `
    ([Windows.Storage.StorageFile])
  $outputStream = Await-WinRtOperation `
    ($outputFile.OpenAsync([Windows.Storage.FileAccessMode]::ReadWrite)) `
    ([Windows.Storage.Streams.IRandomAccessStream])
  try {
    $renderOptions = [Windows.Data.Pdf.PdfPageRenderOptions]::new()
    if ($TargetWidth -gt 0) {
      $renderOptions.DestinationWidth = [uint32]$TargetWidth
    }
    Await-WinRtAction ($page.RenderToStreamAsync($outputStream, $renderOptions))
  } finally {
    if ($outputStream -is [System.IDisposable]) { $outputStream.Dispose() }
    if ($page -is [System.IDisposable]) { $page.Dispose() }
  }
}

[pscustomobject]@{
  Input = $resolvedPdf
  Output = $resolvedOutput
  TotalPages = $pageCount
  RenderedPages = ($endIndex - $startIndex + 1)
} | ConvertTo-Json -Compress
