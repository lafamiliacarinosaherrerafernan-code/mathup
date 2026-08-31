param(
  [switch]$SkipDownload
)

$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$sourceRoot = Join-Path $projectRoot 'sources\pau-official\andalucia'
$artifactRoot = Join-Path $projectRoot 'artifacts\andalucia-official-pau-library'
$workRoot = Join-Path $sourceRoot '.work'
$packageRoot = Join-Path $workRoot 'packages'
$indexUrl = 'https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/?q=grados&d=g_b_examenes_anteriores.php'
$baseUrl = 'https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/examanes_anios_anteriores/selectividad/'
$authority = 'Junta de Andalucía / Distrito Único Andaluz'
$downloadDate = (Get-Date).ToString('yyyy-MM-dd')
$pdfTool = 'C:\Program Files\Git\clangarm64\bin\pdftotext.exe'

New-Item -ItemType Directory -Force -Path $sourceRoot, $artifactRoot, $workRoot, $packageRoot | Out-Null
Add-Type -AssemblyName System.IO.Compression.FileSystem

function Get-SubjectSlug([string]$subject) {
  if ($subject -eq 'Matemáticas II') { return 'matematicas-ii' }
  return 'ccss-ii'
}

function Get-PdfText([string]$pdfPath) {
  if (-not (Test-Path -LiteralPath $pdfTool)) { return '' }
  $txt = Join-Path $workRoot (([guid]::NewGuid().ToString()) + '.txt')
  try {
    & $pdfTool -enc UTF-8 -layout -- $pdfPath $txt 2>$null
    if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $txt)) { return '' }
    return [IO.File]::ReadAllText($txt)
  } finally {
    if (Test-Path -LiteralPath $txt) { Remove-Item -LiteralPath $txt -Force }
  }
}

function Get-PdfPageCount([string]$text) {
  if (-not $text) { return $null }
  $count = ([regex]::Matches($text, "`f")).Count
  if ($count -gt 0) { return $count }
  return 1
}

function Get-Sitting([string]$text, [string]$entryName) {
  $joined = "$entryName`n$text"
  if ($joined -match '(?i)CONVOCATORIA\s+EXTRAORDINARIA|SEPTIEMBRE|JULIO') { return 'Extraordinaria' }
  if ($joined -match '(?i)CONVOCATORIA\s+ORDINARIA|JUNIO') { return 'Ordinaria' }
  return 'No verificable'
}

function Get-Role([string]$entryName) {
  if ($entryName -match '(?i)criter|(?:^|[-_])cr(?:[-_.]|$)') { return 'correction-criteria' }
  if ($entryName -match '(?i)tabla') { return 'auxiliary-table' }
  return 'exam'
}

function Get-Model([string]$entryName) {
  $base = [IO.Path]::GetFileNameWithoutExtension($entryName)
  $kind = if ($entryName -match '(?i)suplente\s*2|ordinaria_incident') { 'Suplente 2' }
    elseif ($entryName -match '(?i)suplente\s*1|suplente') { 'Suplente 1' }
    elseif ($entryName -match '(?i)ordinaria_incompat') { 'Suplente 1' }
    elseif ($entryName -match '(?i)reserva|(?:^|[/_])r[ab](?:[/_]|$)') { 'Reserva' }
    elseif ($entryName -match '(?i)titular') { 'Titular' }
    else { 'Modelo no verificable' }
  $variant = if ($base -match '(?i)(?:^|[-_ ])A(?:[-_ ]|$)|\bA\b') { 'A' }
    elseif ($base -match '(?i)(?:^|[-_ ])B(?:[-_ ]|$)|\bB\b') { 'B' }
    else { $null }
  if ($variant) { return "$kind $variant" }
  return $kind
}

function Get-YearFromText([string]$text, [string]$entryName, $packageYear) {
  if ($null -ne $packageYear -and [string]$packageYear -ne '') { return [int]$packageYear }
  $joined = "$entryName`n$text"
  $matches = [regex]::Matches($joined, '(?<!\d)(20(?:0\d|1\d|2[0-6]))(?!\d)')
  if ($matches.Count -gt 0) { return [int]$matches[0].Groups[1].Value }
  return $null
}

function Get-ExerciseCount([string]$text) {
  if (-not $text) { return 0 }
  $patterns = @(
    '(?im)^\s*(?:EJERCICIO|PROBLEMA|PREGUNTA)\s+\d+',
    '(?im)^\s*\d+[.)]\s+' 
  )
  $best = 0
  foreach ($pattern in $patterns) {
    $count = ([regex]::Matches($text, $pattern)).Count
    if ($count -gt $best) { $best = $count }
  }
  return $best
}

function New-PackagePlan {
  $items = @()
  foreach ($year in 2010..2026) {
    foreach ($subject in @('Matemáticas II','Matemáticas Aplicadas a las CCSS II')) {
      $suffix = if ($subject -eq 'Matemáticas II') { 'matematicas' } else { 'matematicas_aplicadas' }
      $name = "sel_${year}_${suffix}.zip"
      $items += [pscustomobject]@{ subject=$subject; year=$year; officialUrl=$baseUrl+$name; originalName=$name; scope='annual' }
    }
  }
  foreach ($subject in @('Matemáticas II','Matemáticas Aplicadas a las CCSS II')) {
    $suffix = if ($subject -eq 'Matemáticas II') { 'matematicas' } else { 'matematicas_aplicadas' }
    $name = "sel_${suffix}.zip"
    $items += [pscustomobject]@{ subject=$subject; year=$null; officialUrl=$baseUrl+$name; originalName=$name; scope='historical-aggregate' }
  }
  return $items
}

$plan = @(New-PackagePlan)
[IO.File]::WriteAllText((Join-Path $sourceRoot 'download-plan.json'), ($plan | ConvertTo-Json -Depth 5), [Text.UTF8Encoding]::new($false))

$packageResults = @()
$registry = @()
foreach ($package in $plan) {
  $zipPath = Join-Path $packageRoot $package.originalName
  $packageStatus = 'LOCATED_NOT_DOWNLOADED'
  $packageError = $null
  if (-not $SkipDownload) {
    try {
      $validExisting = $false
      if (Test-Path -LiteralPath $zipPath) {
        try { $probe = [IO.Compression.ZipFile]::OpenRead($zipPath); $probe.Dispose(); $validExisting = $true } catch { $validExisting = $false }
      }
      if (-not $validExisting) {
        $part = Join-Path $workRoot (([guid]::NewGuid().ToString()) + '.part')
        try {
          Invoke-WebRequest -UseBasicParsing -Uri $package.officialUrl -OutFile $part
          $probe = [IO.Compression.ZipFile]::OpenRead($part); $probe.Dispose()
          Move-Item -LiteralPath $part -Destination $zipPath -Force
        } finally {
          if (Test-Path -LiteralPath $part) { Remove-Item -LiteralPath $part -Force }
        }
      }
      $packageStatus = 'DOWNLOADED_VERIFIED_ZIP'
    } catch {
      $packageStatus = 'DOWNLOAD_FAILED'
      $packageError = $_.Exception.Message
    }
  }
  $packageSha = if (Test-Path -LiteralPath $zipPath) { (Get-FileHash -LiteralPath $zipPath -Algorithm SHA256).Hash.ToLowerInvariant() } else { $null }
  $packageResults += [pscustomobject]@{
    subject=$package.subject; year=$package.year; scope=$package.scope; officialUrl=$package.officialUrl
    localPackagePath=if (Test-Path -LiteralPath $zipPath) { $zipPath.Substring($projectRoot.Length+1).Replace('\','/') } else { $null }
    sha256=$packageSha; verificationStatus=$packageStatus; error=$packageError
  }
  if ($packageStatus -ne 'DOWNLOADED_VERIFIED_ZIP') { continue }

  $archive = [IO.Compression.ZipFile]::OpenRead($zipPath)
  try {
    foreach ($entry in $archive.Entries) {
      if (-not $entry.Name -or $entry.FullName -match '(^|/)\._' -or $entry.Name -notmatch '(?i)\.pdf$') { continue }
      $tempPdf = Join-Path $workRoot (([guid]::NewGuid().ToString()) + '.pdf')
      try {
        $input = $entry.Open(); $output = [IO.File]::Create($tempPdf)
        try { $input.CopyTo($output) } finally { $output.Dispose(); $input.Dispose() }
        $bytes = [IO.File]::ReadAllBytes($tempPdf)
        if ($bytes.Length -lt 5 -or [Text.Encoding]::ASCII.GetString($bytes,0,5) -ne '%PDF-') { continue }
        $sha = (Get-FileHash -LiteralPath $tempPdf -Algorithm SHA256).Hash.ToLowerInvariant()
        $text = Get-PdfText $tempPdf
        $year = Get-YearFromText $text $entry.FullName $package.year
        $sitting = Get-Sitting $text $entry.FullName
        $role = Get-Role $entry.FullName
        $model = Get-Model $entry.FullName
        $subjectSlug = Get-SubjectSlug $package.subject
        $yearSlug = if ($year) { [string]$year } else { 'year-not-verifiable' }
        $sittingSlug = ($sitting.ToLowerInvariant() -replace '[^a-z0-9]+','-').Trim('-')
        $folder = Join-Path $sourceRoot "$subjectSlug\$yearSlug\$sittingSlug"
        New-Item -ItemType Directory -Force -Path $folder | Out-Null
        $modelSlug = (($model.ToLowerInvariant() -replace '[^a-z0-9]+','-').Trim('-'))
        $destination = Join-Path $folder "$role-$modelSlug-$($sha.Substring(0,12)).pdf"
        if (-not (Test-Path -LiteralPath $destination)) { Move-Item -LiteralPath $tempPdf -Destination $destination }
        $documentId = 'andalucia-official-' + $sha.Substring(0,24)
        $registry += [pscustomobject]@{
          documentId=$documentId; sha256=$sha; subject=$package.subject; community='Andalucía'; year=$year
          sitting=$sitting; model=$model; documentRole=$role; authority=$authority; indexUrl=$indexUrl
          officialPackageUrl=$package.officialUrl; originalPackageName=$package.originalName; originalArchivePath=$entry.FullName
          localPath=$destination.Substring($projectRoot.Length+1).Replace('\','/'); pages=Get-PdfPageCount $text
          bytes=(Get-Item -LiteralPath $destination).Length; downloadedAt=$downloadDate
          verificationStatus=if ($year -and $sitting -ne 'No verificable') { 'DOWNLOADED_VERIFIED_METADATA' } else { 'DOWNLOADED_PARTIAL_METADATA' }
          detectedExercises=if ($role -eq 'exam') { Get-ExerciseCount $text } else { 0 }
        }
      } finally {
        if (Test-Path -LiteralPath $tempPdf) { Remove-Item -LiteralPath $tempPdf -Force }
      }
    }
  } finally { $archive.Dispose() }
}

$mergedRegistry = @()
foreach ($hashGroup in ($registry | Group-Object sha256)) {
  $best = $hashGroup.Group | Sort-Object @{Expression={ if ($_.year) { 1 } else { 0 } };Descending=$true}, @{Expression={ if ($_.sitting -ne 'No verificable') { 1 } else { 0 } };Descending=$true}, @{Expression={ if ($_.documentRole -eq 'exam') { 1 } else { 0 } };Descending=$true} | Select-Object -First 1
  $occurrences = @($hashGroup.Group | ForEach-Object {
    [pscustomobject]@{
      officialPackageUrl=$_.officialPackageUrl
      originalPackageName=$_.originalPackageName
      originalArchivePath=$_.originalArchivePath
    }
  } | Sort-Object officialPackageUrl, originalArchivePath -Unique)
  $best | Add-Member -NotePropertyName sourceOccurrences -NotePropertyValue $occurrences -Force
  $mergedRegistry += $best
}
$registry = @($mergedRegistry | Sort-Object subject, year, sitting, model, documentRole, sha256)
[IO.File]::WriteAllLines((Join-Path $sourceRoot 'document-registry.jsonl'), @($registry | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 7 }), [Text.UTF8Encoding]::new($false))
[IO.File]::WriteAllText((Join-Path $sourceRoot 'package-registry.json'), ($packageResults | ConvertTo-Json -Depth 6), [Text.UTF8Encoding]::new($false))

$coverage = @()
foreach ($subject in @('Matemáticas II','Matemáticas Aplicadas a las CCSS II')) {
  foreach ($year in 2000..2026) {
    $docs = @($registry | Where-Object { $_.subject -eq $subject -and $_.year -eq $year -and $_.documentRole -eq 'exam' })
    $sessions = @($docs.sitting | Where-Object { $_ } | Sort-Object -Unique)
    if ($docs.Count -gt 0) {
      foreach ($session in $sessions) {
        $sessionDocs = @($docs | Where-Object sitting -eq $session)
        $coverage += [pscustomobject]@{
          community='Andalucía'; subject=$subject; year=$year; sitting=$session
          models=@($sessionDocs.model | Sort-Object -Unique); authority=$authority; source=$indexUrl
          officialPdfLocated=$true; officialPdfCensused=$true; documents=$sessionDocs.Count
          detectedExercises=($sessionDocs | Measure-Object -Property detectedExercises -Sum).Sum
          status=if ($session -eq 'No verificable') { 'PARTIAL_METADATA_REVIEW_REQUIRED' } else { 'COVERED_OFFICIAL' }
        }
      }
    } else {
      $coverage += [pscustomobject]@{
        community='Andalucía'; subject=$subject; year=$year; sitting='No localizado'
        models=@(); authority=$authority; source=$indexUrl; officialPdfLocated=$false; officialPdfCensused=$false
        documents=0; detectedExercises=0
        status=if ($year -ge 2010) { 'MISSING_REQUIRED_RANGE_OFFICIAL_PACKAGE_NOT_AVAILABLE_OR_FAILED' } else { 'NOT_FOUND_IN_INSTITUTIONAL_ARCHIVE' }
      }
    }
  }
}
[IO.File]::WriteAllText((Join-Path $artifactRoot 'coverage-matrix.json'), ($coverage | ConvertTo-Json -Depth 8), [Text.UTF8Encoding]::new($false))

$summary = [pscustomobject]@{
  generatedAt=(Get-Date).ToString('o'); projectRootReference='APP MARGARITA SALAS'; authority=$authority; indexUrl=$indexUrl
  plannedPackages=$plan.Count; verifiedPackages=@($packageResults | Where-Object verificationStatus -eq 'DOWNLOADED_VERIFIED_ZIP').Count
  failedPackages=@($packageResults | Where-Object verificationStatus -eq 'DOWNLOAD_FAILED').Count
  officialPdfs=$registry.Count; examPdfs=@($registry | Where-Object documentRole -eq 'exam').Count
  criteriaPdfs=@($registry | Where-Object documentRole -eq 'correction-criteria').Count
  auxiliaryPdfs=@($registry | Where-Object documentRole -eq 'auxiliary-table').Count
  verifiedMetadata=@($registry | Where-Object verificationStatus -eq 'DOWNLOADED_VERIFIED_METADATA').Count
  partialMetadata=@($registry | Where-Object verificationStatus -eq 'DOWNLOADED_PARTIAL_METADATA').Count
  detectedExercises=($registry | Where-Object documentRole -eq 'exam' | Measure-Object -Property detectedExercises -Sum).Sum
  totalPdfBytes=($registry | Measure-Object -Property bytes -Sum).Sum
  mandatory2010to2026Missing=@($coverage | Where-Object { $_.year -ge 2010 -and -not $_.officialPdfCensused }).Count
}
[IO.File]::WriteAllText((Join-Path $artifactRoot 'library-summary.json'), ($summary | ConvertTo-Json -Depth 6), [Text.UTF8Encoding]::new($false))
$summary | ConvertTo-Json -Depth 6
