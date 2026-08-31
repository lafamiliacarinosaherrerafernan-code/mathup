param(
    [int]$Port = 8799,
    [string]$Bind = "127.0.0.1"
)

$ErrorActionPreference = "Stop"

$root = [System.IO.Path]::GetFullPath((Split-Path -Parent $MyInvocation.MyCommand.Path))
$mimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".json"  = "application/json; charset=utf-8"
    ".svg"   = "image/svg+xml"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".gif"   = "image/gif"
    ".webp"  = "image/webp"
    ".ico"   = "image/x-icon"
    ".mp3"   = "audio/mpeg"
    ".m4a"   = "audio/mp4"
    ".mp4"   = "video/mp4"
    ".wav"   = "audio/wav"
    ".pdf"   = "application/pdf"
    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
}

function Write-HttpResponse {
    param(
        [System.Net.Sockets.NetworkStream]$Stream,
        [int]$StatusCode,
        [string]$StatusText,
        [string]$ContentType,
        [byte[]]$Payload,
        [bool]$HeadOnly = $false
    )

    $header = @(
        "HTTP/1.1 $StatusCode $StatusText"
        "Content-Type: $ContentType"
        "Content-Length: $($Payload.Length)"
        "Cache-Control: no-store, no-cache, must-revalidate, max-age=0"
        "Pragma: no-cache"
        "Expires: 0"
        "Connection: close"
        ""
        ""
    ) -join "`r`n"

    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
    $Stream.Write($headerBytes, 0, $headerBytes.Length)

    if (-not $HeadOnly -and $Payload.Length -gt 0) {
        $Stream.Write($Payload, 0, $Payload.Length)
    }

    $Stream.Flush()
}

$address = [System.Net.IPAddress]::Parse($Bind)
$listener = New-Object System.Net.Sockets.TcpListener($address, $Port)
$listener.Start()

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        $client.ReceiveTimeout = 3000
        $client.SendTimeout = 3000

        try {
            $stream = $client.GetStream()
            $reader = New-Object System.IO.StreamReader(
                $stream,
                [System.Text.Encoding]::ASCII,
                $false,
                4096,
                $true
            )

            $requestLine = $reader.ReadLine()
            if ([string]::IsNullOrWhiteSpace($requestLine)) {
                continue
            }

            do {
                $headerLine = $reader.ReadLine()
            } while ($null -ne $headerLine -and $headerLine.Length -gt 0)

            $requestParts = $requestLine.Split(" ")
            if ($requestParts.Length -lt 2) {
                $badRequest = [System.Text.Encoding]::UTF8.GetBytes("Solicitud no valida.")
                Write-HttpResponse $stream 400 "Bad Request" "text/plain; charset=utf-8" $badRequest
                continue
            }

            $method = $requestParts[0].ToUpperInvariant()
            if ($method -ne "GET" -and $method -ne "HEAD") {
                $notAllowed = [System.Text.Encoding]::UTF8.GetBytes("Metodo no permitido.")
                Write-HttpResponse $stream 405 "Method Not Allowed" "text/plain; charset=utf-8" $notAllowed
                continue
            }

            $requestPath = $requestParts[1].Split("?")[0]
            $requestPath = [System.Uri]::UnescapeDataString($requestPath)
            $requestPath = $requestPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)

            if ([string]::IsNullOrWhiteSpace($requestPath)) {
                $requestPath = "index.html"
            }

            $candidatePath = [System.IO.Path]::GetFullPath((Join-Path $root $requestPath))
            $isInsideRoot = $candidatePath.StartsWith(
                $root + [System.IO.Path]::DirectorySeparatorChar,
                [System.StringComparison]::OrdinalIgnoreCase
            ) -or $candidatePath.Equals($root, [System.StringComparison]::OrdinalIgnoreCase)

            if (-not $isInsideRoot -or -not [System.IO.File]::Exists($candidatePath)) {
                $notFound = [System.Text.Encoding]::UTF8.GetBytes("Archivo no encontrado.")
                Write-HttpResponse $stream 404 "Not Found" "text/plain; charset=utf-8" $notFound ($method -eq "HEAD")
                continue
            }

            $extension = [System.IO.Path]::GetExtension($candidatePath).ToLowerInvariant()
            $contentType = if ($mimeTypes.ContainsKey($extension)) {
                $mimeTypes[$extension]
            }
            else {
                "application/octet-stream"
            }

            $payload = [System.IO.File]::ReadAllBytes($candidatePath)
            Write-HttpResponse $stream 200 "OK" $contentType $payload ($method -eq "HEAD")
        }
        catch {
            try {
                $serverError = [System.Text.Encoding]::UTF8.GetBytes("Error interno del servidor.")
                Write-HttpResponse $stream 500 "Internal Server Error" "text/plain; charset=utf-8" $serverError
            }
            catch {
                # La conexión puede haberse cerrado antes de enviar la respuesta.
            }
        }
        finally {
            if ($reader) {
                $reader.Dispose()
            }
            if ($stream) {
                $stream.Dispose()
            }
            $client.Close()
        }
    }
}
finally {
    $listener.Stop()
}
