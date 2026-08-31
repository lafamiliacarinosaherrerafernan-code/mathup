param(
  [switch]$SkipDownload
)

$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$sourceRoot = Join-Path $projectRoot 'sources\pau-official\madrid'
$artifactRoot = Join-Path $projectRoot 'artifacts\madrid-official-pau-reconciliation'
$workRoot = Join-Path $sourceRoot '.work'
$downloadDate = (Get-Date).ToString('yyyy-MM-dd')
$upmBase = 'https://www.upm.es'

New-Item -ItemType Directory -Force -Path $sourceRoot, $artifactRoot, $workRoot | Out-Null

function New-DocumentEntry {
  param($Subject, $Year, $Sitting, $Model, $Authority, $IndexUrl, $Url, $OriginalName)
  [pscustomobject]@{
    subject = $Subject
    year = [int]$Year
    sitting = $Sitting
    model = $Model
    authority = $Authority
    indexUrl = $IndexUrl
    sourceUrl = $Url
    originalName = $OriginalName
  }
}

function Add-ExplicitDocuments {
  $communityIndex = 'https://www.comunidad.madrid/educacion/examenes-pau-estadisticas'
  $rows = @(
    # Comunidad de Madrid, 2020-2024.
    @('Matemáticas II',2020,'Ordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2020/09/18/matematicas-ii-julio2020.pdf','matematicas-ii-julio2020.pdf'),
    @('Matemáticas II',2020,'Extraordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2020/09/18/matematicas-ii_sept_2020.pdf','matematicas-ii_sept_2020.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2020,'Ordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2020/09/18/matematicas-aplicadas-ccss-ii-julio2020.pdf','matematicas-aplicadas-ccss-ii-julio2020.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2020,'Extraordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2020/09/18/matematicas-acs-ii_sept_2020.pdf','matematicas-acs-ii_sept_2020.pdf'),
    @('Matemáticas II',2021,'Ordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2021/09/20/matematicas-ii_-_junio_21.pdf','matematicas-ii-junio-21.pdf'),
    @('Matemáticas II',2021,'Extraordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2021/09/20/matematicas-ii-julio_21.pdf','matematicas-ii-julio-21.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2021,'Ordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2021/09/20/matematicas-acs-ii_-_junio_21.pdf','matematicas-acs-ii-junio-21.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2021,'Extraordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2021/09/20/matematicas-acs-ii-julio_21.pdf','matematicas-acs-ii-julio-21.pdf'),
    @('Matemáticas II',2022,'Ordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2022/09/13/matematicas-ii-junio_22.pdf','matematicas-ii-junio-22.pdf'),
    @('Matemáticas II',2022,'Extraordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2022/09/13/matematicas-ii_extra-julio-22.pdf','matematicas-ii-julio-22.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2022,'Ordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2022/09/13/matematicas-acs-ii-junio_22.pdf','matematicas-acs-ii-junio-22.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2022,'Extraordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2022/09/13/matematicas-acs-ii_extra-julio-22.pdf','matematicas-acs-ii-julio-22.pdf'),
    @('Matemáticas II',2023,'Ordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2023/07/04/matematicas-ii-junio23.pdf','matematicas-ii-junio-23.pdf'),
    @('Matemáticas II',2023,'Extraordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2024/03/18/matematicas-ii-jul23.pdf','matematicas-ii-julio-23.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2023,'Ordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2023/07/04/matematicas-acs-ii-junio23.pdf','matematicas-acs-ii-junio-23.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2023,'Extraordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2024/03/18/matematicas-acs-ii-jul23.pdf','matematicas-acs-ii-julio-23.pdf'),
    @('Matemáticas II',2024,'Ordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2024/06/20/matematicas-ii-junio_24.pdf','matematicas-ii-junio-24.pdf'),
    @('Matemáticas II',2024,'Extraordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2024/08/20/matematicas-ii-julio_24.pdf','matematicas-ii-julio-24.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2024,'Ordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2024/06/20/matematicas-acs-junio_24.pdf','matematicas-acs-junio-24.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2024,'Extraordinaria',$null,'Comunidad de Madrid',$communityIndex,'https://www.comunidad.madrid/docs/assets/2024/08/20/matematicas-acs-julio_24.pdf','matematicas-acs-julio-24.pdf'),
    # UCM, 2025-2026. Las páginas institucionales identifican convocatoria normal/coincidente.
    @('Matemáticas II',2025,'Ordinaria','Normal','UCM','https://www.ucm.es/ejercicios-de-la-pau-convocatoria-ordinaria/','https://www.ucm.es/file/matemÁticas-ii-17','matematicas-ii-2025-ordinaria-normal.pdf'),
    @('Matemáticas II',2025,'Ordinaria','Coincidente','UCM','https://www.ucm.es/ejercicios-de-la-pau-convocatoria-ordinaria/','https://www.ucm.es/file/matemÁticas-ii-18','matematicas-ii-2025-ordinaria-coincidente.pdf'),
    @('Matemáticas II',2025,'Extraordinaria','Normal','UCM','https://www.ucm.es/ejercicios-de-la-pau-convocatoria','https://www.ucm.es/file/matemÁticas-ii-20','matematicas-ii-2025-extraordinaria-normal.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2025,'Ordinaria','Normal','UCM','https://www.ucm.es/ejercicios-de-la-pau-convocatoria-ordinaria/','https://www.ucm.es/file/matemÁticas-accss-ii-2','ccss-ii-2025-ordinaria-normal.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2025,'Ordinaria','Coincidente','UCM','https://www.ucm.es/ejercicios-de-la-pau-convocatoria-ordinaria/','https://www.ucm.es/file/matemÁticas-accss-ii-3','ccss-ii-2025-ordinaria-coincidente.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2025,'Extraordinaria','Normal','UCM','https://www.ucm.es/ejercicios-de-la-pau-convocatoria','https://www.ucm.es/file/matemÁticas-accss-ii-5','ccss-ii-2025-extraordinaria-normal.pdf'),
    @('Matemáticas II',2026,'Ordinaria','Normal','UCM','https://www.ucm.es/ejercicios-de-la-pau-convocatoria-ordinaria-1','https://www.ucm.es/file/matemÁticas-ii-26','matematicas-ii-2026-ordinaria-normal.pdf'),
    @('Matemáticas II',2026,'Ordinaria','Coincidente','UCM','https://www.ucm.es/ejercicios-de-la-pau-convocatoria-ordinaria-1','https://www.ucm.es/file/matemÁticas-ii-25','matematicas-ii-2026-ordinaria-coincidente.pdf'),
    @('Matemáticas II',2026,'Extraordinaria','Normal','UCM','https://www.ucm.es/ejercicios-de-la-pau-convocatoria-1','https://www.ucm.es/file/matemÁticas-ii-28','matematicas-ii-2026-extraordinaria-normal.pdf'),
    @('Matemáticas II',2026,'Extraordinaria','Coincidente','UCM','https://www.ucm.es/ejercicios-de-la-pau-convocatoria-1','https://www.ucm.es/file/matemÁticas-ii-27','matematicas-ii-2026-extraordinaria-coincidente.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2026,'Ordinaria','Normal','UCM','https://www.ucm.es/ejercicios-de-la-pau-convocatoria-ordinaria-1','https://www.ucm.es/file/maccss-ii-3','ccss-ii-2026-ordinaria-normal.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2026,'Ordinaria','Coincidente','UCM','https://www.ucm.es/ejercicios-de-la-pau-convocatoria-ordinaria-1','https://www.ucm.es/file/maccss-ii-2','ccss-ii-2026-ordinaria-coincidente.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2026,'Extraordinaria','Normal','UCM','https://www.ucm.es/ejercicios-de-la-pau-convocatoria-1','https://www.ucm.es/file/matemÁticas-aplicadas-a-las-ciencias-sociales-ii-1','ccss-ii-2026-extraordinaria-normal.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2026,'Extraordinaria','Coincidente','UCM','https://www.ucm.es/ejercicios-de-la-pau-convocatoria-1','https://www.ucm.es/file/matemÁticas-aplicadas-a-lasciencias-sociales-ii','ccss-ii-2026-extraordinaria-coincidente.pdf')
  )
  foreach ($r in $rows) { New-DocumentEntry @r }
}

function Add-UcmHistoricalFallbacks {
  # Copias institucionales UCM usadas cuando el índice histórico UPM conserva
  # el enlace pero el destino antiguo ya no devuelve un PDF.
  $rows = @(
    @('Matemáticas II',2011,'Extraordinaria',$null,'UCM','https://www.ucm.es/','https://www.ucm.es/data/cont/docs/3-2012-11-13-EXA_MATEMATICASII_S2011.pdf','EXA_MATEMATICASII_S2011.pdf'),
    @('Matemáticas II',2014,'Extraordinaria',$null,'UCM','https://www.ucm.es/','https://www.ucm.es/data/cont/docs/3-2014-09-16-EXA_MATEMATICASII_S2014.pdf','EXA_MATEMATICASII_S2014.pdf'),
    @('Matemáticas II',2014,'Ordinaria','Coincidente','UCM','https://www.ucm.es/','https://www.ucm.es/data/cont/docs/3-2014-06-23-COIN_MATEM%C3%81TICASII_J2014.pdf','COIN_MATEMATICASII_J2014.pdf'),
    @('Matemáticas II',2016,'Ordinaria','Normal','UCM','https://www.ucm.es/mas-examenes-2015-16','https://www.ucm.es/data/cont/docs/3-2016-06-08-MATEM%C3%81TICAS%20II.pdf','MATEMATICAS-II-2016-ordinaria-normal.pdf'),
    @('Matemáticas II',2016,'Ordinaria','Coincidente','UCM','https://www.ucm.es/mas-examenes-2015-16','https://www.ucm.es/data/cont/docs/3-2016-06-13-MATEM%C3%81TICAS%20II.pdf','MATEMATICAS-II-2016-ordinaria-coincidente.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2013,'Ordinaria','Coincidente','UCM','https://www.ucm.es/','https://www.ucm.es/data/cont/docs/3-2013-07-02-COIN_MATAPLICADAS_J2013.pdf','COIN_MATAPLICADAS_J2013.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2013,'Extraordinaria','Coincidente','UCM','https://www.ucm.es/','https://www.ucm.es/data/cont/docs/3-2013-09-17-COIN_MATEM%C3%81TICASAPLI_S2013.pdf','COIN_MATEMATICASAPLI_S2013.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2015,'Ordinaria','Coincidente','UCM','https://www.ucm.es/','https://www.ucm.es/data/cont/docs/3-2015-06-15-COIN_MATAPLICADAS_J2015.pdf','COIN_MATAPLICADAS_J2015.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2015,'Extraordinaria','Coincidente','UCM','https://www.ucm.es/','https://www.ucm.es/data/cont/docs/3-2015-09-21-COIN_MATAPLI_S2015.pdf','COIN_MATAPLI_S2015.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2016,'Ordinaria','Coincidente','UCM','https://www.ucm.es/mas-examenes-2015-16','https://www.ucm.es/data/cont/docs/3-2016-06-13-MATEM%C3%81TICAS%20APLICADAS%20A%20LAS%20CIENCIAS%20SOCIALES%20II.pdf','MATEMATICAS-CCSS-II-2016-ordinaria-coincidente.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2016,'Extraordinaria','Coincidente','UCM','https://www.ucm.es/mas-examenes-2015-16','https://www.ucm.es/data/cont/docs/3-2016-09-19-MATEM%C3%81TICAS%20APLICADAS%20A%20LAS%20CC.%20SOCIALES%20II.pdf','MATEMATICAS-CCSS-II-2016-extraordinaria-coincidente.pdf'),
    @('Matemáticas Aplicadas a las CCSS II',2019,'Ordinaria','Normal','UCM','https://www.ucm.es/','https://www.ucm.es/data/cont/docs/3-2019-07-03-MATEM%C3%81TICAS%20ACS%20II.pdf','MATEMATICAS-CCSS-II-2019-ordinaria-normal.pdf')
  )
  foreach ($r in $rows) { New-DocumentEntry @r }
}

function Get-UpmDocuments {
  $archives = @(
    'https://www.upm.es/FuturosEstudiantes/Ingresar/Acceso/ArticulosRelacionados?fmt=detail&id=CON03570&prefmt=articulo',
    'https://www.upm.es/FuturosEstudiantes/Ingresar/Acceso/ArticulosRelacionados?fmt=detail&id=6a0bf1be3d719210VgnVCM10000009c7648a____&prefmt=articulo',
    'https://www.upm.es/FuturosEstudiantes/Ingresar/Acceso/ArticulosRelacionados?fmt=detail&id=17e33965cdede110VgnVCM10000009c7648a____&prefmt=articulo'
  )
  $result = @()
  foreach ($archive in $archives) {
    $html = (Invoke-WebRequest -UseBasicParsing -Uri $archive).Content
    $links = [regex]::Matches($html, 'href="([^"]+\.pdf[^"]*)"', 'IgnoreCase') |
      ForEach-Object { [System.Net.WebUtility]::HtmlDecode($_.Groups[1].Value) } |
      Sort-Object -Unique
    foreach ($relative in $links) {
      $name = [System.IO.Path]::GetFileName(([uri]::UnescapeDataString($relative)))
      $subject = $null
      if ($name -match '(?i)(Matem.ticas II|MatematicasII)' -and $name -notmatch '(?i)Aplic') { $subject = 'Matemáticas II' }
      elseif ($name -match '(?i)(Matem.ticas Aplic|Matematicas_Sociales|MACCSS|M\.A\.CC\.SS)') { $subject = 'Matemáticas Aplicadas a las CCSS II' }
      if (-not $subject) { continue }

      $year = $null; $sitting = $null; $model = $null
      if ($name -match '^(?<yy>17|18|19|20|21|22|23)J(?!L)') { $year = 2000 + [int]$Matches.yy; $sitting = 'Ordinaria' }
      elseif ($name -match '^(?<yy>17|18|19|20|21|22|23)(JL|S)') { $year = 2000 + [int]$Matches.yy; $sitting = 'Extraordinaria' }
      elseif ($name -match '^(?<yy>10|11|12|13|14|15|16)J|^J\s?(?<yy2>10|11|12|13)') {
        $token = if ($Matches.yy) { $Matches.yy } else { $Matches.yy2 }; $year = 2000 + [int]$token; $sitting = 'Ordinaria'
      }
      elseif ($name -match '^(?<yy>10|11|12|13|14|15|16)S|^S\s?(?<yy2>10|11|12|13)') {
        $token = if ($Matches.yy) { $Matches.yy } else { $Matches.yy2 }; $year = 2000 + [int]$token; $sitting = 'Extraordinaria'
      }
      elseif ($name -match '^JE10') { $year = 2010; $sitting = 'Ordinaria'; $model = 'Coincidente' }
      elseif ($name -match '^J09') { $year = 2009; $sitting = 'Ordinaria' }
      elseif ($name -match '^09S') { $year = 2009; $sitting = 'Extraordinaria' }
      elseif ($name -match '(Jun|Sep)(?<start>04|05|06|07)-(?<end>05|06|07|08)') {
        $year = 2000 + [int]$Matches.end
        $sitting = if ($Matches[1] -eq 'Jun') { 'Ordinaria' } else { 'Extraordinaria' }
      }
      if (-not $year -or $year -gt 2019) { continue }
      if ($name -match '(?i)Espec.fica|\bFE\b') { $model = 'Específica' }
      elseif (-not $model -and $name -match '(?i)\bFG\b') { $model = 'General' }
      $url = ([uri]::new([uri]$upmBase, $relative)).AbsoluteUri
      $result += New-DocumentEntry $subject $year $sitting $model 'UPM' $archive $url $name
    }
  }
  $result
}

function Get-SubjectSlug($subject) {
  if ($subject -eq 'Matemáticas II') { 'matematicas-ii' } else { 'ccss-ii' }
}

function Get-PdfPageCount($pdfPath) {
  $tool = 'C:\Program Files\Git\clangarm64\bin\pdftotext.exe'
  if (-not (Test-Path -LiteralPath $tool)) { return $null }
  $txt = Join-Path $workRoot (([guid]::NewGuid().ToString()) + '.txt')
  $stderr = Join-Path $workRoot (([guid]::NewGuid().ToString()) + '.stderr.txt')
  try {
    $quotedPdf = '"' + $pdfPath + '"'
    $quotedTxt = '"' + $txt + '"'
    $process = Start-Process -FilePath $tool -ArgumentList @('-enc','UTF-8','-layout',$quotedPdf,$quotedTxt) -Wait -PassThru -NoNewWindow -RedirectStandardError $stderr
    if ($process.ExitCode -ne 0 -or -not (Test-Path -LiteralPath $txt)) { return $null }
    $raw = [System.IO.File]::ReadAllText($txt)
    $count = ([regex]::Matches($raw, "`f")).Count
    if ($count -gt 0) { return $count }
    if ($raw.Length -gt 0) { return 1 }
    return $null
  } finally {
    if (Test-Path -LiteralPath $txt) { Remove-Item -LiteralPath $txt -Force }
    if (Test-Path -LiteralPath $stderr) { Remove-Item -LiteralPath $stderr -Force }
  }
}

$plan = @((Add-ExplicitDocuments)) + @((Add-UcmHistoricalFallbacks)) + @((Get-UpmDocuments))
$plan = $plan | Sort-Object subject, year, sitting, model, sourceUrl -Unique
$planPath = Join-Path $sourceRoot 'download-plan.json'
[System.IO.File]::WriteAllText($planPath, ($plan | ConvertTo-Json -Depth 6), [System.Text.UTF8Encoding]::new($false))

$registry = @()
foreach ($entry in $plan) {
  $slug = Get-SubjectSlug $entry.subject
  $sessionSlug = $entry.sitting.ToLowerInvariant()
  if ($entry.model) { $sessionSlug += '-' + ($entry.model.ToLowerInvariant() -replace '[^a-záéíóúñ0-9]+','-') }
  $folder = Join-Path $sourceRoot "$slug\$($entry.year)\$sessionSlug"
  New-Item -ItemType Directory -Force -Path $folder | Out-Null
  $localName = ($entry.originalName -replace '[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ._ -]','_')
  $destination = Join-Path $folder $localName
  $status = 'LOCATED_NOT_DOWNLOADED'; $errorMessage = $null
  if (-not $SkipDownload) {
    try {
      if (-not (Test-Path -LiteralPath $destination)) {
        $part = Join-Path $workRoot (([guid]::NewGuid().ToString()) + '.part')
        try {
          Invoke-WebRequest -UseBasicParsing -Uri $entry.sourceUrl -OutFile $part
          $bytes = [System.IO.File]::ReadAllBytes($part)
          if ($bytes.Length -lt 5 -or [System.Text.Encoding]::ASCII.GetString($bytes,0,5) -ne '%PDF-') {
            throw 'La respuesta institucional no es un PDF válido.'
          }
          Move-Item -LiteralPath $part -Destination $destination
        } finally {
          if (Test-Path -LiteralPath $part) { Remove-Item -LiteralPath $part -Force }
        }
      }
      $status = 'DOWNLOADED_VERIFIED_PDF'
    } catch {
      $status = 'DOWNLOAD_FAILED'
      $errorMessage = $_.Exception.Message
    }
  }
  $sha = $null; $pages = $null; $size = $null; $documentId = $null
  if (Test-Path -LiteralPath $destination) {
    $sha = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash.ToLowerInvariant()
    $pages = Get-PdfPageCount $destination
    $size = (Get-Item -LiteralPath $destination).Length
    $documentId = 'madrid-official-' + $sha.Substring(0,24)
  }
  $registry += [pscustomobject]@{
    documentId = $documentId
    sha256 = $sha
    subject = $entry.subject
    community = 'Madrid'
    year = $entry.year
    sitting = $entry.sitting
    model = $entry.model
    authority = $entry.authority
    indexUrl = $entry.indexUrl
    officialUrl = $entry.sourceUrl
    originalName = $entry.originalName
    localPath = if (Test-Path -LiteralPath $destination) { $destination.Substring($projectRoot.Length + 1).Replace('\','/') } else { $null }
    pages = $pages
    bytes = $size
    downloadedAt = if (Test-Path -LiteralPath $destination) { $downloadDate } else { $null }
    verificationStatus = $status
    error = $errorMessage
  }
}

$registryPath = Join-Path $sourceRoot 'document-registry.jsonl'
$registryLines = $registry | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 6 }
[System.IO.File]::WriteAllLines($registryPath, $registryLines, [System.Text.UTF8Encoding]::new($false))

$coverage = @()
foreach ($subject in @('Matemáticas II','Matemáticas Aplicadas a las CCSS II')) {
  foreach ($year in 2000..2026) {
    foreach ($sitting in @('Ordinaria','Extraordinaria')) {
      $docs = @($registry | Where-Object { $_.subject -eq $subject -and $_.year -eq $year -and $_.sitting -eq $sitting })
      $located = @($docs | Where-Object { $_.officialUrl }).Count -gt 0
      $censused = @($docs | Where-Object { $_.verificationStatus -eq 'DOWNLOADED_VERIFIED_PDF' }).Count -gt 0
      $coverage += [pscustomobject]@{
        subject = $subject; year = $year; sitting = $sitting
        models = @($docs.model | Where-Object { $_ } | Sort-Object -Unique)
        authorities = @($docs.authority | Sort-Object -Unique)
        officialSources = @($docs.officialUrl | Sort-Object -Unique)
        officialPdfLocated = $located
        officialPdfCensused = $censused
        documentIds = @($docs.documentId | Where-Object { $_ })
        historicalExercises = 0
        reconciledExercises = 0
        status = if ($censused) { 'COVERED_OFFICIAL' } elseif ($located) { 'OFFICIAL_DOWNLOAD_FAILED' } elseif ($year -lt 2005) { 'NOT_FOUND_NO_INSTITUTIONAL_ARCHIVE_LOCATED' } else { 'NOT_FOUND_IN_OFFICIAL_INDEXES' }
      }
    }
  }
}
$coveragePath = Join-Path $artifactRoot 'coverage-matrix.json'
[System.IO.File]::WriteAllText($coveragePath, ($coverage | ConvertTo-Json -Depth 8), [System.Text.UTF8Encoding]::new($false))

$summary = [pscustomobject]@{
  generatedAt = (Get-Date).ToString('o')
  projectRootReference = 'APP MARGARITA SALAS'
  plannedDocuments = $plan.Count
  registryDocuments = $registry.Count
  verifiedPdfs = @($registry | Where-Object verificationStatus -eq 'DOWNLOADED_VERIFIED_PDF').Count
  failedDownloads = @($registry | Where-Object verificationStatus -eq 'DOWNLOAD_FAILED').Count
  totalBytes = ($registry | Measure-Object bytes -Sum).Sum
  coverage2010To2026 = @($coverage | Where-Object { $_.year -ge 2010 -and $_.officialPdfCensused }).Count
  expectedCoverageRows2010To2026 = 68
  workDirectoryEmpty = (@(Get-ChildItem -LiteralPath $workRoot -Force).Count -eq 0)
}
[System.IO.File]::WriteAllText((Join-Path $artifactRoot 'library-summary.json'), ($summary | ConvertTo-Json -Depth 5), [System.Text.UTF8Encoding]::new($false))

Write-Host ($summary | ConvertTo-Json -Depth 5)
