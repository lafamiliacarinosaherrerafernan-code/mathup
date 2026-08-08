$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$serverScript = Join-Path $root "serve_app.ps1"
$port = 8799
$healthUrl = "http://127.0.0.1:$port/index.html"
$appUrl = "${healthUrl}?nocache=$([DateTimeOffset]::Now.ToUnixTimeMilliseconds())"
$logPath = Join-Path $root "launcher.log"

function Write-LauncherLog([string]$message) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss.fff"
    Add-Content -LiteralPath $logPath -Value "[$timestamp] $message" -Encoding UTF8
}

function Test-AppServer {
    try {
        $response = Invoke-WebRequest `
            -Uri $healthUrl `
            -UseBasicParsing `
            -TimeoutSec 2 `
            -Headers @{ "Cache-Control" = "no-cache" }

        return $response.StatusCode -eq 200 -and
            $response.Content -match '<div id="app"></div>'
    }
    catch {
        return $false
    }
}

try {
    Write-LauncherLog "Starting desktop launcher."

    if (-not (Test-AppServer)) {
        if (-not (Test-Path -LiteralPath $serverScript)) {
            throw "No se encontro el servidor local de la aplicacion."
        }

        $powershell = Join-Path $env:SystemRoot "System32\WindowsPowerShell\v1.0\powershell.exe"
        if (-not (Test-Path -LiteralPath $powershell)) {
            throw "No se encontro Windows PowerShell para iniciar la aplicacion."
        }

        Write-LauncherLog "Launching local server with Windows PowerShell."
        Start-Process -FilePath $powershell `
            -ArgumentList @(
                "-NoProfile",
                "-ExecutionPolicy", "Bypass",
                "-WindowStyle", "Hidden",
                "-File", "`"$serverScript`"",
                "-Port", "$port",
                "-Bind", "127.0.0.1"
            ) `
            -WorkingDirectory $root `
            -WindowStyle Hidden

        $ready = $false
        for ($attempt = 0; $attempt -lt 50; $attempt += 1) {
            Start-Sleep -Milliseconds 200
            if (Test-AppServer) {
                $ready = $true
                break
            }
        }

        if (-not $ready) {
            throw "El servidor no respondio despues de 10 segundos."
        }
    }

    Write-LauncherLog "Opening $appUrl."
    Start-Process -FilePath $appUrl
}
catch {
    Write-LauncherLog "ERROR: $($_.Exception.Message)"
    Add-Type -AssemblyName PresentationFramework
    [System.Windows.MessageBox]::Show(
        "No se pudo abrir Aula Matematica Margarita Salas.`n`n$($_.Exception.Message)",
        "Aula Matematica Margarita Salas",
        "OK",
        "Error"
    ) | Out-Null
    exit 1
}
