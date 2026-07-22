$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$serverScript = Join-Path $root "serve_app.py"
$port = 8765
$healthUrl = "http://127.0.0.1:$port/index.html"
$appUrl = "${healthUrl}?nocache=$([DateTimeOffset]::Now.ToUnixTimeMilliseconds())"
$logPath = Join-Path $root "launcher.log"

function Write-LauncherLog([string]$message) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss.fff"
    Add-Content -LiteralPath $logPath -Value "[$timestamp] $message" -Encoding UTF8
}

function Test-AppServer {
    try {
        $connection = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
            Select-Object -First 1
        if (-not $connection) {
            return $false
        }

        $process = Get-CimInstance Win32_Process -Filter "ProcessId=$($connection.OwningProcess)"
        return $process.CommandLine -and $process.CommandLine.Contains($serverScript)
    }
    catch {
        return $false
    }
}

try {
    Write-LauncherLog "Starting desktop launcher."

    if (-not (Test-AppServer)) {
        $pythonCandidates = @(
            "C:\Users\aherr\AppData\Local\Programs\Python\Python312-arm64\python.exe",
            "C:\Users\aherr\AppData\Local\Programs\Python\Python312\python.exe"
        )
        $python = $pythonCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1

        if (-not $python) {
            $pythonCommand = Get-Command python.exe -ErrorAction SilentlyContinue
            if ($pythonCommand) {
                $python = $pythonCommand.Source
            }
        }

        if (-not $python) {
            throw "No se encontro Python para iniciar la aplicacion."
        }

        if (-not (Test-Path -LiteralPath $serverScript)) {
            throw "No se encontro serve_app.py."
        }

        Write-LauncherLog "Launching local server with $python."
        Start-Process -FilePath $python `
            -ArgumentList @("`"$serverScript`"", "--port", "$port", "--bind", "127.0.0.1") `
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
