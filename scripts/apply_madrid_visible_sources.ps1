param(
    [string]$MatchesPath = 'tmp/madrid-convocatorias/matches.json',
    [string]$AuthoredPath = 'data/madrid-pau-authored.js'
)

$ErrorActionPreference = 'Stop'

$option = "Opci$([char]0x00F3)n"
$specific = "Espec$([char]0x00ED)fica"
$manual = @{
    'madrid-mates-1.7.7'   = "Septiembre-$option A-2006"
    'madrid-mates-1.10.2'  = "Modelo-$option A-2009"
    'madrid-mates-2.16.14' = "Septiembre-Coincidente-$option A-2015"
    'madrid-mates-3.7.6'   = "Septiembre-$option A-2006"
    'madrid-mates-3.11.12' = "$specific-Septiembre-$option B-2010"
    'madrid-mates-3.15.9'  = "Junio-Coincidente-$option B-2014"
    'madrid-mates-3.25.4'  = 'Ordinaria-2024'
    'madrid-mates-3.26.2'  = 'Modelo-2025'

    'madrid-ccss-1.3.2'   = "Junio-$option A-2002"
    'madrid-ccss-1.23.6'  = "Ordinaria-Coincidente-$option B-2022"
    'madrid-ccss-1.24.8'  = "Extraordinaria-$option B-2023"
    'madrid-ccss-1.25.15' = 'Extraordinaria-Coincidente-2024'
    'madrid-ccss-1.26.4'  = 'Extraordinaria-2025'
    'madrid-ccss-2.26.2'  = 'Extraordinaria-2025'
    'madrid-ccss-3.21.12' = "Septiembre-$option B-2020"
    'madrid-ccss-4.17.3'  = "Junio-$option A-2016"
    'madrid-ccss-4.21.5'  = "Julio-Coincidente-$option A-2020"
    'madrid-ccss-5.17.3'  = "Junio-$option A-2016"
    'madrid-ccss-5.21.5'  = "Julio-Coincidente-$option A-2020"
    'madrid-ccss-4.14.6'  = "Junio-Coincidente-$option B-2013"
}

function Get-LateFormatSource([object]$entry) {
    if ([int]$entry.technicalYear -lt 2024) { return $null }
    $raw = [string]$entry.currentSource
    $year = [int]$entry.technicalYear
    if ($raw -match 'Extraordinaria coincidente') { return "Extraordinaria-Coincidente-$year" }
    if ($raw -match 'Ordinaria coincidente') { return "Ordinaria-Coincidente-$year" }
    if ($raw -match 'Extraordinaria') { return "Extraordinaria-$year" }
    if ($raw -match 'Ordinaria') { return "Ordinaria-$year" }
    if ($raw -match 'Modelo') { return "Modelo-$year" }
    return $null
}

$matches = Get-Content -Raw -Encoding UTF8 $MatchesPath | ConvertFrom-Json
$sourceById = @{}
foreach ($course in @('2bach-mates', '2bach-ccss')) {
    foreach ($entry in $matches.courses.$course) {
        $source = $manual[[string]$entry.id]
        if (-not $source) { $source = Get-LateFormatSource $entry }
        if (-not $source) { $source = [string]$entry.visibleSource }
        if (-not $source) { throw "Sin convocatoria para $($entry.id)" }
        $sourceById[[string]$entry.id] = $source
    }
}

$text = Get-Content -Raw -Encoding UTF8 $AuthoredPath
$changed = 0
foreach ($id in $sourceById.Keys) {
    $escapedId = [regex]::Escape($id)
    $pattern = '(?s)("' + $escapedId + '"\s*:\s*\{\s*"exercise"\s*:\s*\{\s*"source"\s*:\s*")[^"]*(")'
    $replacement = '${1}' + $sourceById[$id] + '${2}'
    $next = [regex]::Replace($text, $pattern, $replacement, 1)
    if ($next -eq $text) {
        if ($text -notmatch ('"source"\s*:\s*"' + [regex]::Escape($sourceById[$id]) + '"')) {
            throw "No se localizó el campo source de $id"
        }
    } else {
        $changed++
        $text = $next
    }
}

[System.IO.File]::WriteAllText((Resolve-Path $AuthoredPath), $text, [System.Text.UTF8Encoding]::new($false))
Write-Output "Fuentes disponibles: $($sourceById.Count)"
Write-Output "Fuentes modificadas: $changed"
