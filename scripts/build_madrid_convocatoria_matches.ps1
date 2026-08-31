param(
  [string]$BankPath = 'data/madrid-pau-bank.js',
  [string]$AuthoredPath = 'data/madrid-pau-authored.js',
  [string]$CcssOcrDirectory = 'tmp/madrid-convocatorias/ccss-ocr',
  [string]$MatesOcrDirectory = 'tmp/madrid-convocatorias/mates-ocr',
  [string]$StatementOcrDirectory = 'tmp/madrid-convocatorias/statement-ocr',
  [string]$OutputJson = 'tmp/madrid-convocatorias/matches.json'
)

$ErrorActionPreference = 'Stop'

function Read-WindowJson([string]$Path, [string]$VariableName) {
  $text = [IO.File]::ReadAllText([IO.Path]::GetFullPath($Path), [Text.Encoding]::UTF8)
  $prefix = "window.$VariableName = "
  $offset = $text.IndexOf($prefix, [StringComparison]::Ordinal)
  if ($offset -lt 0) { throw "No se encontró $prefix en $Path" }
  return $text.Substring($offset + $prefix.Length).Trim().TrimEnd(';') | ConvertFrom-Json
}

function Remove-Diacritics([string]$Text) {
  if (-not $Text) { return '' }
  $formD = $Text.Normalize([Text.NormalizationForm]::FormD)
  $builder = [Text.StringBuilder]::new()
  foreach ($character in $formD.ToCharArray()) {
    if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($character) -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
      $null = $builder.Append($character)
    }
  }
  return $builder.ToString().Normalize([Text.NormalizationForm]::FormC)
}

$stopWords = [Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
@(
  'para','como','donde','desde','hasta','entre','sobre','segun','siendo','dado','dada','dados','dadas',
  'calcula','calcular','halle','hallar','halla','determina','determinar','obtenga','obtener','estudia','estudiar',
  'razona','razonar','resuelve','resolver','siguiente','siguientes','funcion','valor','valores','punto','puntos',
  'apartado','problema','ecuacion','ecuaciones','matriz','matrices','sistema','sistemas','numero','numeros',
  'sean','considera','considerar','considere','representa','representar','indica','indicar','real','reales',
  'tiene','tienen','puede','pueden','cada','todos','todas','cual','cuales','cuando','solo','forma','mediante'
) | ForEach-Object { $null = $stopWords.Add($_) }

function Get-Tokens([string]$Text) {
  $plain = Remove-Diacritics ([Net.WebUtility]::HtmlDecode([regex]::Replace([string]$Text, '<[^>]+>', ' ')))
  $plain = $plain.ToLowerInvariant()
  $tokens = [regex]::Matches($plain, '[a-z0-9]{3,}') | ForEach-Object Value | Where-Object {
    -not $stopWords.Contains($_) -and $_ -notmatch '^\d{1,2}$'
  }
  return @($tokens | Sort-Object -Unique)
}

function Get-VisibleSource([string]$Header) {
  $plain = (Remove-Diacritics $Header) -replace '^\s*\d{1,2}\.\d{1,2}\.?\s*', ''
  $year = [regex]::Match($plain, '\b(?:19|20)\d{2}\b').Value
  if (-not $year) { return '' }
  $optionMatch = [regex]::Match($plain, '(?i)Opci.n\s*([AB])')
  $parts = [Collections.Generic.List[string]]::new()
  if ($plain -match '(?i)\bModelo\b') {
    $parts.Add('Modelo')
  } elseif ($plain -match '(?i)\bExtraordinaria\b' -and $plain -notmatch '(?i)\b(?:Junio|Julio|Septiembre)\b') {
    $parts.Add('Extraordinaria')
  } elseif ($plain -match '(?i)\bOrdinaria\b' -and $plain -notmatch '(?i)\b(?:Junio|Julio|Septiembre)\b') {
    $parts.Add('Ordinaria')
  } else {
    if ($plain -match '(?i)\bGeneral\b') { $parts.Add('General') }
    if ($plain -match '(?i)\bEspecifica\b') { $parts.Add("Espec$([char]0x00ED)fica") }
    $month = [regex]::Match($plain, '(?i)\b(Junio|Julio|Septiembre)\b').Groups[1].Value
    if ($month) { $parts.Add($month.Substring(0,1).ToUpperInvariant() + $month.Substring(1).ToLowerInvariant()) }
    if ($plain -match '(?i)extra(?:ordinaria)?' -and $parts -notcontains 'Extraordinaria') { $parts.Add('Extraordinaria') }
  }
  if ($plain -match '(?i)coincid') { $parts.Add('Coincidente') }
  if ($plain -match '(?i)reserva') { $parts.Add('Reserva') }
  if ($optionMatch.Success) { $parts.Add("Opci$([char]0x00F3)n $($optionMatch.Groups[1].Value.ToUpperInvariant())") }
  $parts.Add($year)
  return ($parts -join '-')
}

function Test-Header([string]$Text) {
  $plain = Remove-Diacritics $Text
  return $plain -match '(?i)\b(?:Modelo|Junio|Julio|Septiembre|Ordinaria|Extraordinaria)\b' -and
    $plain -match '\b(?:19|20)\d{2}\b' -and
    ($plain -match '^\s*(?:\d{1,2}\.\d{1,2}\.?\s*)?(?:Modelo|General-|Especifica-|Junio|Julio|Septiembre|Ordinaria|Extraordinaria)')
}

function Build-Segments([string]$OcrDirectory) {
  $segments = [Collections.Generic.List[object]]::new()
  $current = $null
  $files = @(Get-ChildItem -LiteralPath $OcrDirectory -Filter 'page-*.json' | Sort-Object Name)
  foreach ($file in $files) {
    $page = [int]($file.BaseName -replace '\D', '')
    if ($page -lt 9) { continue }
    $ocr = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8) | ConvertFrom-Json
    $lines = @($ocr.lines | Sort-Object y, x)
    for ($lineIndex = 0; $lineIndex -lt $lines.Count; $lineIndex += 1) {
      $lineText = [string]$lines[$lineIndex].text
      if (Test-Header $lineText) {
        $header = $lineText
        if ($header -notmatch '(?i)Opci.n\s*[AB]' -and $lineIndex + 1 -lt $lines.Count -and [string]$lines[$lineIndex + 1].text -match '(?i)^\s*-?\s*Opci.n\s*[AB]') {
          $header += ' ' + [string]$lines[$lineIndex + 1].text
          $lineIndex += 1
        }
        $visibleSource = Get-VisibleSource $header
        if ($visibleSource) {
          $year = [int][regex]::Match($visibleSource, '(?:19|20)\d{2}$').Value
          $current = [pscustomobject]@{
            segment = $segments.Count + 1
            header = $header.Trim()
            visibleSource = $visibleSource
            year = $year
            startPage = $page
            endPage = $page
            lines = [Collections.Generic.List[string]]::new()
          }
          $segments.Add($current)
          continue
        }
      }
      if ($current) {
        $current.endPage = $page
        $current.lines.Add($lineText)
      }
    }
  }
  return @($segments | ForEach-Object {
    [pscustomobject]@{
      segment = $_.segment
      header = $_.header
      visibleSource = $_.visibleSource
      year = $_.year
      startPage = $_.startPage
      endPage = $_.endPage
      text = ($_.lines -join ' ')
      tokens = @(Get-Tokens ($_.lines -join ' '))
    }
  })
}

function Match-Course([string]$CourseId, [object[]]$Segments, [object]$Bank, [object]$Authored) {
  $excluded = @($Authored.exclusions.$CourseId.PSObject.Properties | ForEach-Object Name)
  $records = @($Bank.$CourseId | Where-Object id -notin $excluded)
  $results = [Collections.Generic.List[object]]::new()
  foreach ($base in $records) {
    $record = $Authored.$CourseId.($base.id)
    $currentSource = [string]$record.exercise.source
    $visibleYearMatch = [regex]::Match($currentSource, '\b(?:19|20)\d{2}\b')
    $searchYear = if ($visibleYearMatch.Success) { [int]$visibleYearMatch.Value } else { [int]$base.year }
    # El primer grupo de probabilidad de Matemáticas II heredó el año técnico
    # 2000, aunque estos ejercicios pertenecen a convocatorias recientes. Se
    # localiza por contenido en todo el documento para no perpetuar ese dato.
    $searchAllYears = $CourseId -eq '2bach-mates' -and $base.id -like 'madrid-mates-4.1.*'
    $exerciseText = @(
      @($record.exercise.statement | ForEach-Object plain)
      @($record.exercise.parts | ForEach-Object { $_.paragraphs } | ForEach-Object plain)
    ) -join ' '
    $tokens = @(Get-Tokens $exerciseText)
    $statementCourse = if ($CourseId -eq '2bach-mates') { 'mates' } else { 'ccss' }
    $statementOcrFiles = @(Get-ChildItem -LiteralPath (Join-Path ([IO.Path]::GetFullPath($StatementOcrDirectory)) $statementCourse) -Filter "$($base.id)-*.json" -ErrorAction SilentlyContinue)
    $statementOcrText = @($statementOcrFiles | ForEach-Object {
      $ocr = [IO.File]::ReadAllText($_.FullName, [Text.Encoding]::UTF8) | ConvertFrom-Json
      @($ocr.lines | ForEach-Object text) -join ' '
    }) -join ' '
    $statementOcrTokens = @(Get-Tokens $statementOcrText)
    $candidateSegments = if ($searchAllYears) { @($Segments) } else { @($Segments | Where-Object year -eq $searchYear) }
    $existingSession = if ($currentSource -match '(?i)coincidente') {
      if ($currentSource -match '(?i)extraordinaria') { 'Extraordinaria-Coincidente' }
      elseif ($currentSource -match '(?i)ordinaria') { 'Ordinaria-Coincidente' }
      else { 'Coincidente' }
    } elseif ($currentSource -match '(?i)reserva') { 'Reserva' }
    elseif ($currentSource -match '(?i)modelo') { 'Modelo' }
    elseif ($currentSource -match '(?i)extraordinaria') { 'Extraordinaria' }
    elseif ($currentSource -match '(?i)ordinaria') { 'Ordinaria' }
    else { [string]$base.session }
    $sessionPattern = switch -Regex ($existingSession) {
      '^Modelo$' { '(?i)^Modelo-'; break }
      '^Ordinaria$' { '(?i)^(?:Junio|Ordinaria|General-Junio)-'; break }
      '^Extraordinaria$' { '(?i)^(?:Julio|Septiembre|Extraordinaria|Espec.fica-(?:Junio|Julio|Septiembre))-'; break }
      'Coincidente$' { '(?i)-Coincidente(?:-|$)'; break }
      '^Reserva$' { '(?i)-Reserva(?:-|$)'; break }
      default { '' }
    }
    $candidates = foreach ($segment in $candidateSegments) {
      $segmentSet = [Collections.Generic.HashSet[string]]::new([string[]]$segment.tokens, [StringComparer]::OrdinalIgnoreCase)
      $matched = @($tokens | Where-Object { $segmentSet.Contains($_) })
      $coverage = if ($tokens.Count) { [Math]::Round($matched.Count / $tokens.Count, 4) } else { 0 }
      $ocrMatched = @($statementOcrTokens | Where-Object { $segmentSet.Contains($_) })
      $ocrCoverage = if ($statementOcrTokens.Count) { [Math]::Round($ocrMatched.Count / $statementOcrTokens.Count, 4) } else { 0 }
      $contentScore = [Math]::Max($coverage, $ocrCoverage)
      $sessionCompatible = [bool]($sessionPattern -and $segment.visibleSource -match $sessionPattern)
      $rankingScore = [Math]::Round($contentScore + $(if ($sessionCompatible) { 0.12 } else { 0 }), 4)
      [pscustomobject]@{
        segment = $segment.segment
        visibleSource = $segment.visibleSource
        header = $segment.header
        startPage = $segment.startPage
        endPage = $segment.endPage
        coverage = $coverage
        ocrCoverage = $ocrCoverage
        contentScore = $contentScore
        rankingScore = $rankingScore
        sessionCompatible = $sessionCompatible
        matchedTokens = $matched.Count
        totalTokens = $tokens.Count
      }
    }
    $ranked = @($candidates | Sort-Object rankingScore, coverage, matchedTokens -Descending)
    $best = $ranked | Select-Object -First 1
    $second = $ranked | Select-Object -Skip 1 -First 1
    $margin = if ($best) { [Math]::Round($best.rankingScore - [double]($second.rankingScore), 4) } else { 0 }
    $status = if (-not $best) { 'unmatched' } elseif ($best.contentScore -ge 0.55 -and ($margin -ge 0.08 -or $best.contentScore -ge 0.82)) { 'high-confidence' } elseif ($best.contentScore -ge 0.35) { 'review' } else { 'low-confidence' }
    $results.Add([pscustomobject]@{
      id = $base.id
      technicalYear = [int]$base.year
      searchYear = $searchYear
      matchedYear = if ($best) { [int][regex]::Match([string]$best.visibleSource, '(?:19|20)\d{2}$').Value } else { 0 }
      existingSession = $existingSession
      currentSource = $currentSource
      visibleSource = [string]$best.visibleSource
      startPage = [int]$best.startPage
      endPage = [int]$best.endPage
      coverage = [double]$best.contentScore
      transcriptCoverage = [double]$best.coverage
      ocrCoverage = [double]$best.ocrCoverage
      margin = $margin
      matchedTokens = [int]$best.matchedTokens
      totalTokens = [int]$best.totalTokens
      status = $status
      candidates = @($ranked | Select-Object -First 3)
    })
  }
  return @($results)
}

$bank = Read-WindowJson $BankPath 'MADRID_PAU_BANK'
$authored = Read-WindowJson $AuthoredPath 'MADRID_PAU_AUTHORED'
$ccssSegments = @(Build-Segments $CcssOcrDirectory)
$matesSegments = @(Build-Segments $MatesOcrDirectory)
$matesMatches = @(Match-Course '2bach-mates' $matesSegments $bank $authored)
$ccssMatches = @(Match-Course '2bach-ccss' $ccssSegments $bank $authored)

$output = [pscustomobject]@{
  generatedAt = [DateTime]::UtcNow.ToString('o')
  segments = [pscustomobject]@{ mates = $matesSegments.Count; ccss = $ccssSegments.Count }
  courses = [pscustomobject]@{
    '2bach-mates' = $matesMatches
    '2bach-ccss' = $ccssMatches
  }
  summary = [pscustomobject]@{
    mates = @($matesMatches | Group-Object status | ForEach-Object { [pscustomobject]@{ status = $_.Name; count = $_.Count } })
    ccss = @($ccssMatches | Group-Object status | ForEach-Object { [pscustomobject]@{ status = $_.Name; count = $_.Count } })
  }
}

$resolvedOutput = [IO.Path]::GetFullPath($OutputJson)
$parent = Split-Path -Parent $resolvedOutput
if (-not (Test-Path -LiteralPath $parent)) { New-Item -ItemType Directory -Path $parent | Out-Null }
[IO.File]::WriteAllText($resolvedOutput, ($output | ConvertTo-Json -Depth 12), [Text.UTF8Encoding]::new($false))
$output | Select-Object segments, summary | ConvertTo-Json -Depth 6
