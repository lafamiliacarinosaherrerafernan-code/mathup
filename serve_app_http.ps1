param(
    [int]$Port = 8799,
    [string]$Bind = "127.0.0.1"
)

$ErrorActionPreference = "Stop"
$root = [System.IO.Path]::GetFullPath((Split-Path -Parent $MyInvocation.MyCommand.Path))
$prefix = "http://${Bind}:$Port/"
$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css" = "text/css; charset=utf-8"
    ".js" = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg" = "image/svg+xml"
    ".png" = "image/png"
    ".jpg" = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif" = "image/gif"
    ".webp" = "image/webp"
    ".ico" = "image/x-icon"
    ".mp3" = "audio/mpeg"
    ".m4a" = "audio/mp4"
    ".mp4" = "video/mp4"
    ".wav" = "audio/wav"
    ".pdf" = "application/pdf"
    ".woff" = "font/woff"
    ".woff2" = "font/woff2"
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add($prefix)
$listener.Start()

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        try {
            $relativePath = [System.Uri]::UnescapeDataString($context.Request.Url.AbsolutePath).TrimStart("/")
            if ([string]::IsNullOrWhiteSpace($relativePath)) { $relativePath = "index.html" }
            $relativePath = $relativePath.Replace("/", [System.IO.Path]::DirectorySeparatorChar)
            $candidatePath = [System.IO.Path]::GetFullPath((Join-Path $root $relativePath))
            $insideRoot = $candidatePath.StartsWith(
                $root + [System.IO.Path]::DirectorySeparatorChar,
                [System.StringComparison]::OrdinalIgnoreCase
            )

            if (-not $insideRoot -or -not [System.IO.File]::Exists($candidatePath)) {
                $context.Response.StatusCode = 404
                $payload = [Text.Encoding]::UTF8.GetBytes("Archivo no encontrado.")
                $context.Response.ContentType = "text/plain; charset=utf-8"
            }
            else {
                $payload = [System.IO.File]::ReadAllBytes($candidatePath)
                $extension = [System.IO.Path]::GetExtension($candidatePath).ToLowerInvariant()
                $context.Response.StatusCode = 200
                $context.Response.ContentType = if ($mimeTypes.ContainsKey($extension)) {
                    $mimeTypes[$extension]
                } else {
                    "application/octet-stream"
                }
            }

            $context.Response.Headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
            $context.Response.Headers["Pragma"] = "no-cache"
            $context.Response.Headers["Expires"] = "0"
            $context.Response.ContentLength64 = $payload.Length
            if ($context.Request.HttpMethod -ne "HEAD") {
                $context.Response.OutputStream.Write($payload, 0, $payload.Length)
            }
        }
        catch {
            try { $context.Response.StatusCode = 500 } catch {}
        }
        finally {
            try { $context.Response.OutputStream.Close() } catch {}
            try { $context.Response.Close() } catch {}
        }
    }
}
finally {
    $listener.Stop()
    $listener.Close()
}
