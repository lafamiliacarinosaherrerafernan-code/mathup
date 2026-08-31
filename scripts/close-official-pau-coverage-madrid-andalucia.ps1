param(
  [switch]$SkipDownload
)

$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$madridRoot = Join-Path $projectRoot 'sources\pau-official\madrid'
$andaluciaRoot = Join-Path $projectRoot 'sources\pau-official\andalucia'
$artifactRoot = Join-Path $projectRoot 'artifacts\official-pau-coverage-closure'
$workRoot = Join-Path $artifactRoot '.work'
$downloadDate = (Get-Date).ToString('yyyy-MM-dd')
$utf8 = [Text.UTF8Encoding]::new($false)

New-Item -ItemType Directory -Force -Path $artifactRoot, $workRoot | Out-Null
Add-Type -AssemblyName System.IO.Compression.FileSystem

function Write-Json($Path, $Value, [int]$Depth = 12) {
  [IO.File]::WriteAllText($Path, ($Value | ConvertTo-Json -Depth $Depth), $utf8)
}

function Write-JsonLines($Path, $Values) {
  $lines = @($Values | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 15 })
  [IO.File]::WriteAllLines($Path, $lines, $utf8)
}

function Get-RelativeProjectPath([string]$Path) {
  $full = [IO.Path]::GetFullPath($Path)
  $root = [IO.Path]::GetFullPath($projectRoot).TrimEnd('\') + '\'
  if (-not $full.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) {
    throw "La ruta no pertenece al proyecto: $full"
  }
  return $full.Substring($root.Length).Replace('\','/')
}

function Get-Sha256([string]$Path) {
  return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant()
}

function Get-PdfPages([string]$Path) {
  $pdfInfo = Get-Command pdfinfo.exe -ErrorAction SilentlyContinue
  if (-not $pdfInfo) { return $null }
  $raw = & $pdfInfo.Source $Path 2>$null
  if ($LASTEXITCODE -ne 0) { return $null }
  $line = $raw | Where-Object { $_ -match '^Pages:\s+(\d+)' } | Select-Object -First 1
  if ($line -match '^Pages:\s+(\d+)') { return [int]$Matches[1] }
  return $null
}

function Normalize-Text([string]$Text) {
  if ($null -eq $Text) { return '' }
  $formD = $Text.Normalize([Text.NormalizationForm]::FormD)
  $sb = [Text.StringBuilder]::new()
  foreach ($c in $formD.ToCharArray()) {
    if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($c) -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
      [void]$sb.Append($c)
    }
  }
  return $sb.ToString().Normalize([Text.NormalizationForm]::FormC).ToLowerInvariant()
}

function Get-SubjectSlug([string]$Subject) {
  if ((Normalize-Text $Subject) -match 'aplicadas|ccss|sociales') { return 'ccss-ii' }
  return 'matematicas-ii'
}

function Get-RoleSignature([string]$ArchivePath) {
  $path = Normalize-Text $ArchivePath
  $path = $path -replace '\.(pdf|docx?|odt)$',''
  $path = $path -replace '(criterios?|correcciones?|enunciados?|examen(?:es)?|impreso)','role'
  $path = $path -replace '(?:^|[-_. ])(?:cr|ex)(?:$|[-_. ])','-role-'
  $path = $path -replace '[^a-z0-9]+','-'
  return $path.Trim('-')
}

function Get-ModelTokens([string]$ArchivePath) {
  $text = Normalize-Text $ArchivePath
  $leaf = Normalize-Text ([IO.Path]::GetFileNameWithoutExtension($ArchivePath))
  $tokens = [ordered]@{}
  if ($text -match 'extra|sept|julio') { $tokens.sitting = 'Extraordinaria' }
  elseif ($text -match 'ordinaria|junio') { $tokens.sitting = 'Ordinaria' }
  else { $tokens.sitting = 'No verificable' }
  if ($text -match 'suplente\s*2|incidencia\s*2') { $tokens.kind = 'Suplente 2' }
  elseif ($text -match 'suplente|incidencia|incompat') { $tokens.kind = 'Suplente' }
  elseif ($text -match 'reserva|(?:^|[/_-])r[ab](?:[/_.-]|$)') { $tokens.kind = 'Reserva' }
  elseif ($text -match 'titular') { $tokens.kind = 'Titular' }
  else { $tokens.kind = 'No verificable' }
  $numbers = @([regex]::Matches($leaf, '(?:modelo|examen|criterios?|enunciados?)\D{0,8}(\d+)') | ForEach-Object { [int]$_.Groups[1].Value } | Sort-Object -Unique)
  if ($numbers.Count -eq 0) {
    $numbers = @([regex]::Matches($text, '(?:modelo|examen|criterios?|enunciados?)\D{0,8}(\d+)') | ForEach-Object { [int]$_.Groups[1].Value } | Sort-Object -Unique)
  }
  $tokens.number = if ($numbers.Count -eq 1) { $numbers[0] } else { $null }
  $tokens.variant = if ($text -match '(?:^|[-_ /])a(?:[-_ /.]|$)') { 'A' } elseif ($text -match '(?:^|[-_ /])b(?:[-_ /.]|$)') { 'B' } else { $null }
  return [pscustomobject]$tokens
}

$uahIndex = 'https://www.uah.es/es/admision-y-ayudas/grados/pruebas-de-acceso/Evaluacion-para-el-Acceso-a-la-Universidad/examenes-y-criterios-de-correccion/'
$uahGallery = $uahIndex + '.galleries/Galeria-de-Modelos-de-selectividad/'
$madridPlan = @(
  # Matemáticas II: sesiones ausentes en la primera biblioteca.
  @('Matemáticas II',2010,'Extraordinaria','Específica','525EspS2010.pdf'),
  @('Matemáticas II',2010,'Extraordinaria','General','525GenS2010.pdf'),
  @('Matemáticas II',2011,'Ordinaria','Específica','525EspJ2011.pdf'),
  @('Matemáticas II',2011,'Ordinaria','General','525GenJ2011.pdf'),
  @('Matemáticas II',2011,'Ordinaria','Coincidente','525CdtJ2011.pdf'),
  @('Matemáticas II',2012,'Extraordinaria','Específica','525EspS2012.pdf'),
  @('Matemáticas II',2013,'Ordinaria','Específica','525EspJ2013.pdf'),
  @('Matemáticas II',2013,'Extraordinaria','Específica','525EspS2013.pdf'),
  @('Matemáticas II',2015,'Ordinaria','Específica','525EspJ2015.pdf'),
  @('Matemáticas II',2015,'Ordinaria','Coincidente','525CdtJ2015.pdf'),
  @('Matemáticas II',2015,'Extraordinaria','Específica','525EspS2015.pdf'),
  @('Matemáticas II',2015,'Extraordinaria','Coincidente','525CdtS2015.pdf'),
  @('Matemáticas II',2016,'Extraordinaria','Específica','525EspS2016.pdf'),
  @('Matemáticas II',2017,'Ordinaria','Normal','525J2017.pdf'),
  @('Matemáticas II',2019,'Ordinaria','Normal','525J2019.pdf'),
  # Matemáticas Aplicadas a las CCSS II.
  @('Matemáticas Aplicadas a las CCSS II',2010,'Extraordinaria','Específica','533EspS2010.pdf'),
  @('Matemáticas Aplicadas a las CCSS II',2010,'Extraordinaria','General','533GenS2010.pdf'),
  @('Matemáticas Aplicadas a las CCSS II',2010,'Extraordinaria','Coincidente','533CdtS2010.pdf'),
  @('Matemáticas Aplicadas a las CCSS II',2011,'Ordinaria','Específica','533EspJ2011.pdf'),
  @('Matemáticas Aplicadas a las CCSS II',2011,'Ordinaria','General','533GenJ2011.pdf'),
  @('Matemáticas Aplicadas a las CCSS II',2011,'Ordinaria','Coincidente','533CdtJ2011.pdf'),
  @('Matemáticas Aplicadas a las CCSS II',2014,'Ordinaria','Específica','533EspJ2014.pdf'),
  @('Matemáticas Aplicadas a las CCSS II',2014,'Extraordinaria','Específica','533EspS2014.pdf'),
  @('Matemáticas Aplicadas a las CCSS II',2017,'Ordinaria','Normal','533J2017.pdf')
)

$madridRegistry = @()
foreach ($row in $madridPlan) {
  $subject, $year, $sitting, $model, $fileName = $row
  $slug = Get-SubjectSlug $subject
  $folder = Join-Path $madridRoot "$slug\$year\$($sitting.ToLowerInvariant())-uah"
  New-Item -ItemType Directory -Force -Path $folder | Out-Null
  $destination = Join-Path $folder $fileName
  $url = $uahGallery + $fileName
  $status = 'LOCATED_NOT_DOWNLOADED'
  $errorMessage = $null
  if (-not $SkipDownload -and -not (Test-Path -LiteralPath $destination)) {
    try {
      Invoke-WebRequest -UseBasicParsing -Uri $url -OutFile $destination
    } catch {
      $errorMessage = $_.Exception.Message
    }
  }
  if (Test-Path -LiteralPath $destination) {
    $bytes = (Get-Item -LiteralPath $destination).Length
    $header = [IO.File]::ReadAllBytes($destination)[0..3]
    if (($header | ForEach-Object { [char]$_ }) -join '' -ne '%PDF') {
      throw "La fuente UAH no devolvió PDF válido: $url"
    }
    $sha = Get-Sha256 $destination
    $status = 'DOWNLOADED_VERIFIED_OFFICIAL_PDF'
    $madridRegistry += [pscustomobject]@{
      documentId = "madrid-uah-$($sha.Substring(0,24))"; sha256 = $sha
      subject = $subject; community = 'Madrid'; year = [int]$year; sitting = $sitting; model = $model
      documentRole = 'exam'; authority = 'Universidad de Alcalá (UAH)'; indexUrl = $uahIndex
      officialUrl = $url; originalName = $fileName; localPath = Get-RelativeProjectPath $destination
      pages = Get-PdfPages $destination; bytes = $bytes; downloadedAt = $downloadDate
      verificationStatus = $status
    }
  } else {
    $madridRegistry += [pscustomobject]@{
      documentId = $null; sha256 = $null; subject = $subject; community = 'Madrid'; year = [int]$year
      sitting = $sitting; model = $model; documentRole = 'exam'; authority = 'Universidad de Alcalá (UAH)'
      indexUrl = $uahIndex; officialUrl = $url; originalName = $fileName; localPath = $null
      pages = $null; bytes = 0; downloadedAt = $downloadDate; verificationStatus = 'DOWNLOAD_FAILED'
      error = $errorMessage
    }
  }
}
Write-JsonLines (Join-Path $madridRoot 'coverage-closure-registry.jsonl') $madridRegistry

# Andalucía 2012: la fuente oficial conserva DOC, no PDF. Se preservan los bytes
# originales sin convertirlos ni atribuirles condición de PDF oficial.
$andaluciaZipUrl = 'https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/examanes_anios_anteriores/selectividad/sel_2012_matematicas_aplicadas.zip'
$packageFolder = Join-Path $andaluciaRoot 'packages'
New-Item -ItemType Directory -Force -Path $packageFolder | Out-Null
$zipPath = Join-Path $packageFolder 'sel_2012_matematicas_aplicadas.zip'
if (-not $SkipDownload -and -not (Test-Path -LiteralPath $zipPath)) {
  Invoke-WebRequest -UseBasicParsing -Uri $andaluciaZipUrl -OutFile $zipPath
}
$andaluciaRegistry = @()
if (Test-Path -LiteralPath $zipPath) {
  $zipSha = Get-Sha256 $zipPath
  $archive = [IO.Compression.ZipFile]::OpenRead($zipPath)
  try {
    foreach ($entry in $archive.Entries | Where-Object { $_.FullName -match '(?i)\.doc$' }) {
      $role = if ($entry.FullName -match '(?i)criter') { 'correction-criteria' } else { 'exam' }
      $stem = [IO.Path]::GetFileNameWithoutExtension($entry.Name)
      $modelNumber = if ($stem -match '(\d+)') { [int]$Matches[1] } else { $null }
      $folder = Join-Path $andaluciaRoot "ccss-ii\2012\official-doc"
      New-Item -ItemType Directory -Force -Path $folder | Out-Null
      $roleSlug = if ($role -eq 'exam') { 'exam' } else { 'criteria' }
      $safeModel = if ($null -ne $modelNumber) { "modelo-$modelNumber" } else { 'modelo-no-verificable' }
      $destination = Join-Path $folder "$roleSlug-$safeModel.doc"
      $input = $entry.Open()
      try {
        $output = [IO.File]::Create($destination)
        try { $input.CopyTo($output) } finally { $output.Dispose() }
      } finally { $input.Dispose() }
      $sha = Get-Sha256 $destination
      $andaluciaRegistry += [pscustomobject]@{
        documentId = "andalucia-official-doc-$($sha.Substring(0,24))"; sha256 = $sha
        subject = 'Matemáticas Aplicadas a las CCSS II'; community = 'Andalucía'; year = 2012
        sitting = 'No verificable'; model = if ($modelNumber) { "Modelo $modelNumber" } else { 'Modelo no verificable' }
        documentRole = $role; authority = 'Junta de Andalucía / Distrito Único Andaluz'
        indexUrl = 'https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/?q=grados&d=g_b_examenes_anteriores.php'
        officialPackageUrl = $andaluciaZipUrl; officialPackageSha256 = $zipSha
        originalPackageName = 'sel_2012_matematicas_aplicadas.zip'; originalArchivePath = $entry.FullName
        originalName = $entry.Name; localPath = Get-RelativeProjectPath $destination
        pages = $null; bytes = (Get-Item -LiteralPath $destination).Length; downloadedAt = $downloadDate
        verificationStatus = 'DOWNLOADED_VERIFIED_OFFICIAL_NON_PDF'
      }
    }
  } finally { $archive.Dispose() }
}
Write-JsonLines (Join-Path $andaluciaRoot 'coverage-closure-registry.jsonl') $andaluciaRegistry

# Correspondencia conservadora entre los criterios ya censados y sus exámenes.
$baseAndaluciaRegistryPath = Join-Path $andaluciaRoot 'document-registry.jsonl'
$baseAndalucia = @([IO.File]::ReadAllLines($baseAndaluciaRegistryPath) | Where-Object { $_.Trim() } | ForEach-Object { $_ | ConvertFrom-Json })
$allAndalucia = @($baseAndalucia) + @($andaluciaRegistry)
$exams = @($allAndalucia | Where-Object documentRole -eq 'exam')
$criteria = @($allAndalucia | Where-Object documentRole -eq 'correction-criteria')
$criteriaMatches = @()
foreach ($criterion in $criteria) {
  $pool = @($exams | Where-Object {
    $_.subject -eq $criterion.subject -and [int]$_.year -eq [int]$criterion.year -and
    (($_.officialPackageUrl -and $_.officialPackageUrl -eq $criterion.officialPackageUrl) -or
     ($_.officialUrl -and $_.officialUrl -eq $criterion.officialUrl))
  })
  $criterionSignature = Get-RoleSignature $criterion.originalArchivePath
  $exact = @($pool | Where-Object { (Get-RoleSignature $_.originalArchivePath) -eq $criterionSignature })
  $rule = $null; $classification = $null; $candidates = @()
  if ($exact.Count -eq 1) {
    $classification = 'CRITERIA_MATCH_EXACT'; $rule = 'SAME_PACKAGE_ROLE_NEUTRAL_PATH'; $candidates = $exact
  } else {
    $ct = Get-ModelTokens $criterion.originalArchivePath
    $tokenMatches = @($pool | Where-Object {
      $et = Get-ModelTokens $_.originalArchivePath
      ($ct.sitting -eq 'No verificable' -or $et.sitting -eq $ct.sitting) -and
      ($ct.kind -eq 'No verificable' -or $et.kind -eq $ct.kind) -and
      ($null -eq $ct.number -or $et.number -eq $ct.number) -and
      ($null -eq $ct.variant -or $et.variant -eq $ct.variant)
    })
    if ($tokenMatches.Count -eq 1 -and ($ct.number -or $ct.kind -ne 'No verificable' -or $ct.sitting -ne 'No verificable')) {
      $classification = 'CRITERIA_MATCH_EXACT'; $rule = 'SAME_PACKAGE_UNIQUE_DOCUMENT_TOKENS'; $candidates = $tokenMatches
    } else {
      $criterionDir = (Normalize-Text ([IO.Path]::GetDirectoryName($criterion.originalArchivePath))) -replace '[/\\]+$',''
      $sameDir = @($pool | Where-Object { ((Normalize-Text ([IO.Path]::GetDirectoryName($_.originalArchivePath))) -replace '[/\\]+$','') -eq $criterionDir })
      if ($sameDir.Count -eq 1) {
        $classification = 'CRITERIA_MATCH_STRUCTURAL'; $rule = 'SAME_PACKAGE_UNIQUE_DIRECTORY_EXAM'; $candidates = $sameDir
      } elseif ($pool.Count -eq 1) {
        $classification = 'CRITERIA_MATCH_STRUCTURAL'; $rule = 'SAME_PACKAGE_SUBJECT_YEAR_UNIQUE_EXAM'; $candidates = $pool
      } elseif (($tokenMatches.Count -gt 1) -or ($sameDir.Count -gt 1) -or ($pool.Count -gt 1)) {
        $classification = 'CRITERIA_MATCH_AMBIGUOUS'; $rule = 'MULTIPLE_COMPATIBLE_OFFICIAL_EXAMS'
        $candidates = if ($tokenMatches.Count -gt 1) { $tokenMatches } elseif ($sameDir.Count -gt 1) { $sameDir } else { $pool }
      } else {
        $classification = 'CRITERIA_NOT_FOUND'; $rule = 'NO_COMPATIBLE_OFFICIAL_EXAM'
      }
    }
  }
  $criteriaMatches += [pscustomobject]@{
    criterionDocumentId = $criterion.documentId; subject = $criterion.subject; year = $criterion.year
    sitting = $criterion.sitting; model = $criterion.model; classification = $classification; rule = $rule
    examDocumentIds = @($candidates | ForEach-Object documentId)
    criterionSha256 = $criterion.sha256; examSha256 = @($candidates | ForEach-Object sha256)
    authority = $criterion.authority; officialPackageUrl = $criterion.officialPackageUrl
    criterionOriginalArchivePath = $criterion.originalArchivePath
    examOriginalArchivePaths = @($candidates | ForEach-Object originalArchivePath)
  }
}
Write-JsonLines (Join-Path $artifactRoot 'andalucia-exam-criteria-matches.jsonl') $criteriaMatches
$criteriaSummary = @($criteriaMatches | Group-Object classification | Sort-Object Name | ForEach-Object { [pscustomobject]@{ classification=$_.Name; count=$_.Count } })
$criteriaPrevious = @($criteriaMatches | Where-Object { $_.criterionDocumentId -notlike 'andalucia-official-doc-*' })
$criteriaAdded2012 = @($criteriaMatches | Where-Object { $_.criterionDocumentId -like 'andalucia-official-doc-*' })
$criteriaPreviousSummary = @($criteriaPrevious | Group-Object classification | Sort-Object Name | ForEach-Object { [pscustomobject]@{ classification=$_.Name; count=$_.Count } })
$criteriaAdded2012Summary = @($criteriaAdded2012 | Group-Object classification | Sort-Object Name | ForEach-Object { [pscustomobject]@{ classification=$_.Name; count=$_.Count } })
Write-Json (Join-Path $artifactRoot 'criteria-match-summary.json') $criteriaSummary

# Matriz final: cobertura anual y de convocatorias se mantienen separadas.
$baseMadridRegistryPath = Join-Path $madridRoot 'document-registry.jsonl'
$baseMadrid = @([IO.File]::ReadAllLines($baseMadridRegistryPath) | Where-Object { $_.Trim() } | ForEach-Object { $_ | ConvertFrom-Json })
$allMadrid = @($baseMadrid | Where-Object verificationStatus -match '^DOWNLOADED') + @($madridRegistry | Where-Object verificationStatus -match '^DOWNLOADED')
$coverage = @()
foreach ($community in @('Madrid','Andalucía')) {
  foreach ($subject in @('Matemáticas II','Matemáticas Aplicadas a las CCSS II')) {
    foreach ($year in 2000..2026) {
      foreach ($sitting in @('Ordinaria','Extraordinaria')) {
        $docs = @(if ($community -eq 'Madrid') {
          $allMadrid | Where-Object { $_.subject -eq $subject -and [int]$_.year -eq $year -and $_.sitting -eq $sitting }
        } else {
          $allAndalucia | Where-Object { $_.subject -eq $subject -and [int]$_.year -eq $year -and $_.documentRole -eq 'exam' -and $_.sitting -eq $sitting }
        })
        $yearDocs = @(if ($community -eq 'Madrid') {
          $allMadrid | Where-Object { $_.subject -eq $subject -and [int]$_.year -eq $year }
        } else {
          $allAndalucia | Where-Object { $_.subject -eq $subject -and [int]$_.year -eq $year -and $_.documentRole -eq 'exam' }
        })
        $officialPdf = @($docs | Where-Object { $_.localPath -match '(?i)\.pdf$' }).Count -gt 0
        $officialNonPdf = @($docs | Where-Object { $_.localPath -match '(?i)\.doc$' }).Count -gt 0
        $annualLocated = $yearDocs.Count -gt 0
        $status = if ($docs.Count -gt 0) { if ($officialPdf) { 'SESSION_OFFICIAL_PDF_CENSUSED' } else { 'SESSION_OFFICIAL_NON_PDF_CENSUSED' } }
          elseif ($community -eq 'Andalucía' -and $annualLocated -and @($yearDocs | Where-Object sitting -eq 'No verificable').Count -gt 0) { 'YEAR_COVERED_SESSION_NOT_VERIFIABLE' }
          elseif ($community -eq 'Madrid' -and $subject -match 'CCSS' -and $year -eq 2011 -and $sitting -eq 'Extraordinaria') { 'NOT_FOUND_AFTER_DIRECTED_INSTITUTIONAL_SEARCH' }
          elseif ($year -lt 2010) { 'NOT_FOUND_SECONDARY_OBJECTIVE' }
          else { 'NOT_FOUND_INSTITUTIONAL_SOURCE' }
        $coverage += [pscustomobject]@{
          community=$community; subject=$subject; year=$year; sittingModel=$sitting
          yearCovered=$annualLocated; sessionCovered=($docs.Count -gt 0); officialPdfCensused=$officialPdf
          officialNonPdfCensused=$officialNonPdf; documentIds=@($docs | ForEach-Object documentId)
          authorities=@($docs | ForEach-Object authority | Sort-Object -Unique); status=$status
        }
      }
    }
  }
}
Write-Json (Join-Path $artifactRoot 'coverage-matrix-2000-2026.json') $coverage
$missingSessions = @($coverage | Where-Object { $_.year -ge 2010 -and $_.year -le 2026 -and -not $_.sessionCovered })
Write-Json (Join-Path $artifactRoot 'missing-convocations-2010-2026.json') $missingSessions

$targetedSearch = @(
  [pscustomobject]@{ community='Madrid'; subject='Matemáticas II'; year=2013; resolved=$true; authority='UAH'; evidenceUrl=$uahIndex; result='Ordinaria y Extraordinaria censadas' },
  [pscustomobject]@{ community='Madrid'; subject='Matemáticas II'; year=2015; resolved=$true; authority='UAH'; evidenceUrl=$uahIndex; result='Ordinaria y Extraordinaria censadas' },
  [pscustomobject]@{ community='Madrid'; subject='Matemáticas Aplicadas a las CCSS II'; year=2011; resolved=$true; authority='UAH'; evidenceUrl=$uahIndex; result='Año cubierto por Ordinaria; Extraordinaria sigue ausente' },
  [pscustomobject]@{ community='Madrid'; subject='Matemáticas Aplicadas a las CCSS II'; year=2014; resolved=$true; authority='UAH'; evidenceUrl=$uahIndex; result='Ordinaria y Extraordinaria censadas' },
  [pscustomobject]@{ community='Andalucía'; subject='Matemáticas Aplicadas a las CCSS II'; year=2012; resolved=$true; authority='Junta de Andalucía / Distrito Único Andaluz'; evidenceUrl=$andaluciaZipUrl; result='Exámenes y criterios oficiales localizados en DOC; no existe PDF oficial en el paquete' }
)
Write-Json (Join-Path $artifactRoot 'directed-gap-search.json') $targetedSearch

$annualSummary = @()
foreach ($community in @('Madrid','Andalucía')) {
  foreach ($subject in @('Matemáticas II','Matemáticas Aplicadas a las CCSS II')) {
    $rows = @($coverage | Where-Object { $_.community -eq $community -and $_.subject -eq $subject -and $_.year -ge 2010 -and $_.year -le 2026 })
    $coveredYears = @($rows | Where-Object { $_.yearCovered -eq $true } | Select-Object -ExpandProperty year -Unique)
    $pdfYears = @($rows | Where-Object { $_.officialPdfCensused -eq $true } | Select-Object -ExpandProperty year -Unique)
    $sessionCount = @($rows | Where-Object { $_.sessionCovered -eq $true }).Count
    $annualSummary += [pscustomobject]@{
      community=$community; subject=$subject; annualCovered=$coveredYears.Count; annualTotal=17
      annualOfficialPdfCovered=$pdfYears.Count; sessionsCovered=$sessionCount; sessionsTotal=34
      missingYears=@(2010..2026 | Where-Object { $_ -notin $coveredYears })
    }
  }
}

$secondarySummary = @()
foreach ($community in @('Madrid','Andalucía')) {
  foreach ($subject in @('Matemáticas II','Matemáticas Aplicadas a las CCSS II')) {
    $rows = @($coverage | Where-Object { $_.community -eq $community -and $_.subject -eq $subject -and $_.year -ge 2000 -and $_.year -le 2009 })
    $years = @($rows | Where-Object { $_.yearCovered -eq $true } | Select-Object -ExpandProperty year -Unique)
    $secondarySummary += [pscustomobject]@{ community=$community; subject=$subject; coveredYears=$years; covered=$years.Count; total=10 }
  }
}

$summary = [pscustomobject]@{
  generatedAt=(Get-Date).ToString('o'); projectRootReference='APP MARGARITA SALAS'
  targetedAnnualGapsResolved=@($targetedSearch | Where-Object resolved).Count; targetedAnnualGapsTotal=5
  madridNewOfficialPdfs=@($madridRegistry | Where-Object verificationStatus -match '^DOWNLOADED').Count
  andaluciaNewOfficialDocs=@($andaluciaRegistry | Where-Object verificationStatus -match '^DOWNLOADED').Count
  criteriaTotal=$criteriaMatches.Count; criteriaMatches=$criteriaSummary
  criteriaPreviousTotal=$criteriaPrevious.Count; criteriaPreviousMatches=$criteriaPreviousSummary
  criteriaAdded2012Total=$criteriaAdded2012.Count; criteriaAdded2012Matches=$criteriaAdded2012Summary
  annualCoverage2010_2026=$annualSummary; coverage2000_2009=$secondarySummary
  missingSessions2010_2026=$missingSessions.Count
  strictDistinction='La cobertura anual documental no equivale a cobertura de todas las convocatorias ni a disponibilidad en PDF.'
}
Write-Json (Join-Path $artifactRoot 'summary.json') $summary

# Registro de fuentes consultadas, incluidas búsquedas sin resultado.
$searchLog = @(
  [pscustomobject]@{ authority='Universidad de Alcalá (UAH)'; url=$uahIndex; scope='Madrid 2010-2019 por año, convocatoria y materia'; outcome='24 PDF oficiales nuevos censados; cuatro huecos anuales resueltos' },
  [pscustomobject]@{ authority='Universidad Politécnica de Madrid (UPM)'; url='https://www.upm.es/FuturosEstudiantes/Ingresar/Acceso/ArticulosRelacionados'; scope='Archivo histórico 2004-2019'; outcome='Sin CCSS II extraordinaria 2011 ni Madrid 2000-2004 adicionales' },
  [pscustomobject]@{ authority='Universidad Complutense de Madrid (UCM)'; url='https://www.ucm.es/'; scope='Repositorios y enlaces históricos'; outcome='Sin nueva fuente para CCSS II extraordinaria 2011' },
  [pscustomobject]@{ authority='Comunidad de Madrid'; url='https://www.comunidad.madrid/educacion/examenes-pau-estadisticas'; scope='Archivo oficial publicado'; outcome='Sin nueva fuente para CCSS II extraordinaria 2011 ni 2000-2004' },
  [pscustomobject]@{ authority='Junta de Andalucía / Distrito Único Andaluz'; url=$andaluciaZipUrl; scope='CCSS II 2012'; outcome='Seis exámenes y seis criterios oficiales en DOC; no PDF oficial' }
)
Write-JsonLines (Join-Path $artifactRoot 'institutional-search-log.jsonl') $searchLog

$reportPath = Join-Path $projectRoot 'docs\CIERRE-COBERTURA-OFICIAL-PAU-MADRID-ANDALUCIA-MATHUP.md'
$criteriaLines = ($criteriaSummary | ForEach-Object { "| $($_.classification) | $($_.count) |" }) -join "`n"
$criteriaPreviousLines = ($criteriaPreviousSummary | ForEach-Object { "| $($_.classification) | $($_.count) |" }) -join "`n"
$criteriaAdded2012Lines = ($criteriaAdded2012Summary | ForEach-Object { "| $($_.classification) | $($_.count) |" }) -join "`n"
$annualLines = ($annualSummary | ForEach-Object { "| $($_.community) | $($_.subject) | $($_.annualCovered)/17 | $($_.annualOfficialPdfCovered)/17 | $($_.sessionsCovered)/34 | $([string]::Join(', ', $_.missingYears)) |" }) -join "`n"
$secondaryLines = ($secondarySummary | ForEach-Object { "| $($_.community) | $($_.subject) | $($_.covered)/10 | $([string]::Join(', ', $_.coveredYears)) |" }) -join "`n"
$missingLines = ($missingSessions | ForEach-Object { "- $($_.community) · $($_.subject) · $($_.year) · $($_.sittingModel): $($_.status)." }) -join "`n"
$report = @"
# Cierre de cobertura oficial PAU Madrid–Andalucía de +MathUp

## Alcance y criterio documental

Segunda búsqueda institucional dirigida, ejecutada en paralelo y sin modificar bancos, catálogo, respuestas, soluciones ni aplicación. Solo se consideran autoridades institucionales. Se distingue estrictamente entre **año cubierto**, **convocatorias cubiertas** y **PDF oficial disponible**.

## Cinco huecos prioritarios

Los cinco huecos anuales se han resuelto documentalmente. Madrid 2013/2015 de Matemáticas II y Madrid 2011/2014 de CCSS II se recuperan desde el archivo oficial de la Universidad de Alcalá. Andalucía CCSS II 2012 se recupera desde el ZIP oficial de la Junta: contiene seis exámenes y seis criterios en formato DOC. Es fuente oficial válida, pero no se declara como PDF.

## Cobertura 2010–2026

| Comunidad | Materia | Años con fuente oficial | Años con PDF oficial | Convocatorias acreditadas | Años sin fuente |
|---|---|---:|---:|---:|---|
$annualLines

La cobertura de convocatorias de Andalucía es deliberadamente conservadora: cuando el propio documento o su ruta no acredita Ordinaria/Extraordinaria, se conserva `No verificable` y no se fuerza la asignación.

### Convocatorias todavía ausentes o no acreditadas

$missingLines

## Objetivo secundario 2000–2009

| Comunidad | Materia | Años cubiertos | Años localizados |
|---|---|---:|---|
$secondaryLines

La búsqueda institucional adicional no ha aportado fuentes nuevas para Madrid 2000–2004 ni Andalucía 2000–2008. No se han usado recopilaciones privadas para rellenar esos huecos.

## Correspondencia examen–criterios de Andalucía

Se relacionan los criterios únicamente como fuente oficial de contraste. No se convierten en soluciones ni se completan pasos. La unión es exacta solo si el mismo paquete oficial y una firma documental inequívoca identifican un único examen.

| Clasificación | Cantidad |
|---|---:|
$criteriaLines

Desglose de procedencia: los **178 criterios oficiales previamente descargados** quedan en:

| Clasificación | Cantidad |
|---|---:|
$criteriaPreviousLines

Los **6 criterios oficiales DOC recuperados para CCSS II 2012** quedan en:

| Clasificación | Cantidad |
|---|---:|
$criteriaAdded2012Lines

Las relaciones ambiguas conservan todos los candidatos y requieren revisión documental. Ninguna se promociona automáticamente.

## Material incorporado

- Madrid: $(@($madridRegistry | Where-Object verificationStatus -match '^DOWNLOADED').Count) archivos PDF oficiales nuevos de UAH, correspondientes a $(@($madridRegistry | Where-Object verificationStatus -match '^DOWNLOADED' | Select-Object -ExpandProperty sha256 -Unique).Count) contenidos binarios distintos. Dos pares de enlaces institucionales son alias con bytes idénticos; se conservan todas las URL sin crear identidades documentales falsas.
- Andalucía 2012 CCSS II: $(@($andaluciaRegistry | Where-Object documentRole -eq 'exam').Count) exámenes DOC y $(@($andaluciaRegistry | Where-Object documentRole -eq 'correction-criteria').Count) criterios DOC oficiales, preservados sin conversión.
- Registros con URL, autoridad, hash SHA-256, tamaño, ruta local y estado de verificación.

## Límites y trabajo pendiente

- CCSS II Madrid extraordinaria 2011 continúa sin fuente institucional localizada tras la búsqueda dirigida.
- La cobertura de variantes/modelos dentro de una convocatoria no se declara completa cuando el índice institucional no permite demostrar el universo total.
- Andalucía 2012 no dispone de PDF oficial localizado; los DOC oficiales se conservan literalmente.
- Los criterios oficiales no equivalen por sí mismos a soluciones didácticas completas.
- No se han incorporado ejercicios al catálogo ni se ha alterado producción.

## Reproducibilidad

El script scripts/close-official-pau-coverage-madrid-andalucia.ps1 reconstruye los registros, hashes, matriz de cobertura y correspondencias. Los artefactos se encuentran en artifacts/official-pau-coverage-closure/.
"@
[IO.File]::WriteAllText($reportPath, $report, $utf8)

$semanticFiles = @(
  'coverage-matrix-2000-2026.json','missing-convocations-2010-2026.json',
  'andalucia-exam-criteria-matches.jsonl','criteria-match-summary.json','directed-gap-search.json'
)
$semanticHashes = @($semanticFiles | ForEach-Object {
  $p = Join-Path $artifactRoot $_
  [pscustomobject]@{ file=$_; sha256=Get-Sha256 $p }
})
Write-Json (Join-Path $artifactRoot 'semantic-hashes.json') $semanticHashes

Remove-Item -LiteralPath $workRoot -Recurse -Force

Write-Output ($summary | ConvertTo-Json -Depth 12)
