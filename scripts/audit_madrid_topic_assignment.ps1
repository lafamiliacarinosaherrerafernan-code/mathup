param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("mates", "ccss")]
  [string]$Course,

  [Parameter(Mandatory = $true)]
  [string]$InputOcr,

  [Parameter(Mandatory = $true)]
  [string]$OutputJson
)

$ErrorActionPreference = "Stop"

function Add-Topic {
  param([System.Collections.Generic.HashSet[int]]$Topics, [int]$Index)
  $null = $Topics.Add($Index)
}

function Test-Any {
  param([string]$Text, [string[]]$Patterns)
  foreach ($pattern in $Patterns) {
    if ($Text -match $pattern) { return $true }
  }
  return $false
}

function Get-MatesTopics {
  param([int]$Chapter, [string]$Text)
  $topics = [System.Collections.Generic.HashSet[int]]::new()
  # El PDF de Matemáticas II está ordenado por capítulos:
  # 1 Álgebra, 2 Geometría, 3 Análisis, 4 Probabilidad y 5 Estadística.
  if ($Chapter -eq 2) {
    if (Test-Any $Text @('vector', 'base', 'dependencia lineal', 'producto vectorial', 'producto escalar', 'producto mixto', 'combinaci')) { Add-Topic $topics 3 }
    if (Test-Any $Text @('recta', 'plano', 'ecuaci', 'posici', 'intersecci', 'coplanar')) { Add-Topic $topics 4 }
    if (Test-Any $Text @('distancia', 'ngulo', 'perpendicular', 'proyecci', 'sim', 'rea', 'volumen', 'altura', 'esfera', 'circunferencia', 'nica', 'par.bola', 'hip.rbola')) { Add-Topic $topics 5 }
    return @($topics | Sort-Object)
  }
  if ($Chapter -eq 3) {
    if (Test-Any $Text @('mit', 'indeterminaci', 'as.ntot')) { Add-Topic $topics 6 }
    if (Test-Any $Text @('continu', 'discontinu', 'bolzano')) { Add-Topic $topics 7 }
    if (Test-Any $Text @('derivad', 'recta tangente', 'pendiente')) { Add-Topic $topics 8 }
    if (Test-Any $Text @('xim', 'nim', 'monoton', 'crec', 'decrec', 'extremo', 'inflex', 'convex', 'ncav', 'optim', 'representa.*funci')) { Add-Topic $topics 9 }
    # Todo ejercicio de integral definida o de área exige obtener y usar una
    # primitiva. Se conserva también su asignación específica a integrales
    # definidas para que pueda aparecer en ambos entrenamientos pertinentes.
    if (Test-Any $Text @('integral', 'primitiv', 'familia de funciones', 'constante de integraci', 'rea', 'recinto', 'regi.n limitada')) { Add-Topic $topics 10 }
    if (Test-Any $Text @('integral defin', 'regla de barrow', 'rea', 'recinto', 'regi.n limitada')) { Add-Topic $topics 11 }
    return @($topics | Sort-Object)
  }
  if ($Chapter -eq 5) {
    Add-Topic $topics 13
    return @($topics)
  }
  switch ($Chapter) {
    1 {
      if (Test-Any $Text @('matri', 'inversa', 'traspuest', 'traza', 'a\^?\s*\d', 'producto.*(?:a|b|m|x)')) { Add-Topic $topics 0 }
      if (Test-Any $Text @('determinante', 'rango', 'menor complementario', 'cofactor', 'adjunta', 'sarrus', 'invertible')) { Add-Topic $topics 1 }
      if (Test-Any $Text @('sistema', 'ecuaciones', 'rouch', 'cramer', 'compatible', 'incompatible', 'inc[oó]gnita')) { Add-Topic $topics 2 }
    }
    2 {
      if (Test-Any $Text @('l[ií]mit', 'indeterminaci', 'as[ií]ntot')) { Add-Topic $topics 6 }
      if (Test-Any $Text @('continu', 'discontinu', 'bolzano')) { Add-Topic $topics 7 }
      if (Test-Any $Text @('derivad', 'recta tangente', 'pendiente')) { Add-Topic $topics 8 }
      if (Test-Any $Text @('m[aá]xim', 'm[ií]nim', 'monoton', 'crec', 'decrec', 'extremo', 'inflex', 'convex', 'c[oó]ncav', 'optim', 'representa.*funci')) { Add-Topic $topics 9 }
      if (Test-Any $Text @('integral indefin', 'primitiv', 'familia de funciones', 'constante de integraci')) { Add-Topic $topics 10 }
      if (Test-Any $Text @('integral defin', 'regla de barrow', '[aá]rea', 'recinto', 'regi[oó]n limitada')) { Add-Topic $topics 11 }
    }
    3 {
      if (Test-Any $Text @('vector', 'base', 'dependencia lineal', 'producto vectorial', 'producto escalar', 'producto mixto')) { Add-Topic $topics 3 }
      if (Test-Any $Text @('recta', 'plano', 'ecuaci[oó]n param', 'posici[oó]n relativa', 'intersecci')) { Add-Topic $topics 4 }
      if (Test-Any $Text @('distancia', '[aá]ngulo', 'perpendicular', 'proyecci', 'sim[eé]tric', '[aá]rea', 'volumen', 'altura')) { Add-Topic $topics 5 }
    }
    4 {
      if (Test-Any $Text @('probabilidad', 'suceso', 'bayes', 'condicionad', 'independ', 'urna', 'diagrama de [aá]rbol')) { Add-Topic $topics 12 }
      if (Test-Any $Text @('binomial', 'normal', 'distribuci[oó]n', 'variable aleatoria', 'tipific', 'media.*desviaci')) { Add-Topic $topics 13 }
    }
  }
  return @($topics | Sort-Object)
}

function Get-CcssTopics {
  param([int]$Chapter, [string]$Text)
  $topics = [System.Collections.Generic.HashSet[int]]::new()
  switch ($Chapter) {
    1 {
      if (Test-Any $Text @('matri', 'inversa', 'traspuest', 'traza', 'ecuaci[oó]n matricial')) { Add-Topic $topics 0 }
      if (Test-Any $Text @('determinante', 'rango', 'menor complementario', 'cofactor', 'adjunta', 'sarrus', 'invertible')) { Add-Topic $topics 1 }
      if (Test-Any $Text @('sistema', 'ecuaciones', 'rouch', 'cramer', 'compatible', 'incompatible', 'inc[oó]gnita')) { Add-Topic $topics 2 }
    }
    2 { Add-Topic $topics 3 }
    3 {
      if (Test-Any $Text @('l[ií]mit', 'continu', 'discontinu', 'bolzano', 'as[ií]ntot')) { Add-Topic $topics 4 }
      if (Test-Any $Text @('derivad', 'tangente', 'm[aá]xim', 'm[ií]nim', 'monoton', 'crec', 'decrec', 'extremo', 'inflex', 'optim', 'representa.*funci')) { Add-Topic $topics 5 }
      # Las integrales definidas y las áreas también entrenan el cálculo de
      # primitivas; por eso pueden alimentar los dos temas sin salir del
      # bloque de análisis ni mezclar ejercicios de otra comunidad.
      if (Test-Any $Text @('integral', 'primitiv', 'constante de integraci', '[aÃ¡]rea', 'recinto', 'regi[oÃ³]n limitada')) { Add-Topic $topics 6 }
      if (Test-Any $Text @('integral defin', 'barrow', '[aá]rea', 'recinto', 'regi[oó]n limitada')) { Add-Topic $topics 7 }
    }
    4 { Add-Topic $topics 8 }
    5 {
      if (Test-Any $Text @('binomial', 'normal', 'distribuci[oó]n', 'variable aleatoria', 'tipific')) { Add-Topic $topics 9 }
      if (Test-Any $Text @('muestra', 'muestral', 'intervalo de confianza', 'nivel de confianza', 'error m[aá]ximo', 'tama[nñ]o.*muestr', 'estimaci')) { Add-Topic $topics 10 }
    }
  }
  return @($topics | Sort-Object)
}

# Revisión visual de los casos en los que el OCR omite precisamente la
# fórmula que permite clasificar el problema. Estas asignaciones se basan en
# la página oficial, no en palabras aproximadas ni en el solucionario.
$manualMatesTopics = @{
  '2.2.7' = @(3)
  '3.2.7' = @(6, 10, 11)
  '3.7.2' = @(8)
  '3.7.6' = @(10, 11)
  '3.8.3' = @(6)
  '3.9.2' = @(6)
  '3.9.8' = @(10)
  '3.10.5' = @(10)
  '3.10.8' = @(4, 5)
  '3.10.12' = @(10)
  '3.11.5' = @(6)
  '3.11.9' = @(10)
  '3.11.11' = @(6)
  '3.11.12' = @(10, 11)
  '3.13.5' = @(10, 11)
  '3.13.8' = @(6)
  '3.14.4' = @(10)
  '3.15.2' = @(10, 11)
  '3.15.5' = @(6)
  '3.15.6' = @(7, 8, 9)
  '3.15.9' = @(6, 10, 11)
  '3.16.11' = @(6, 10, 11)
  '3.17.4' = @(10, 11)
  '3.20.9' = @(8, 10)
  '3.25.4' = @(6, 10)
  '4.2.2' = @(12)
}

$manualCcssTopics = @{
  '1.1.3' = @(2)
  '1.2.5' = @(2)
  '1.6.3' = @(2)
  '1.9.2' = @(2)
  '1.9.3' = @(2)
  '1.10.2' = @(2)
  '1.12.1' = @(2)
  '1.13.4' = @(2)
  '1.14.9' = @(2)
  '1.24.4' = @(2)
  '1.26.2' = @(2)
  '1.26.3' = @(3)
  '3.1.2' = @(4, 5)
  '3.1.6' = @(4, 5)
  '3.2.3' = @(5)
  '3.3.4' = @(4, 5)
  '3.3.5' = @(6, 7)
  '3.5.1' = @(5)
  '3.5.4' = @(4)
  '3.6.3' = @(5)
  '3.6.6' = @(4, 5)
  '3.7.5' = @(4)
  '3.10.4' = @(4)
  '3.11.5' = @(5)
  '3.12.2' = @(5)
  '3.12.6' = @(5)
  '3.13.1' = @(5)
  '3.13.3' = @(5)
  '3.14.9' = @(5, 6, 7)
  '3.15.1' = @(4, 6, 7)
  '3.17.8' = @(4, 5)
  '3.18.12' = @(5)
  '3.19.3' = @(5)
  '3.19.11' = @(5)
  '3.22.3' = @(4, 5)
  '3.23.5' = @(4, 5)
  '3.23.11' = @(4, 5)
  '3.23.15' = @(5)
  '3.26.1' = @(5, 6)
}

$resolvedInput = (Resolve-Path -LiteralPath $InputOcr).Path
$text = [System.IO.File]::ReadAllText($resolvedInput, [System.Text.Encoding]::UTF8)
# Corrige una pérdida de separador producida por el OCR en el segundo problema estadístico de 2015.
$text = $text -replace '(?i)Problema\s+5\.162\b', 'Problema 5.16.2'
$text = $text -replace '(?i)Problema\s+5\.14,6\b', 'Problema 5.14.6'
$matches = [regex]::Matches($text, 'Problema\s+([1-5])\.(\d{1,2})\.(\d{1,2})', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
$pageMarkers = [regex]::Matches($text, '=====\s+P[^\r\n]*?GINA\s+(\d+)\s+=====', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
$seen = [System.Collections.Generic.HashSet[string]]::new()
$records = [System.Collections.Generic.List[object]]::new()
$pageCursor = 0

for ($index = 0; $index -lt $matches.Count; $index += 1) {
  $match = $matches[$index]
  $id = "$($match.Groups[1].Value).$($match.Groups[2].Value).$($match.Groups[3].Value)"
  if (-not $seen.Add($id)) { continue }
  $end = if ($index + 1 -lt $matches.Count) { $matches[$index + 1].Index } else { $text.Length }
  $length = [Math]::Min(12000, [Math]::Max(0, $end - $match.Index))
  $chunk = $text.Substring($match.Index, $length)
  while ($pageCursor + 1 -lt $pageMarkers.Count -and $pageMarkers[$pageCursor + 1].Index -lt $match.Index) {
    $pageCursor += 1
  }
  $pageNumber = if ($pageMarkers.Count) { [int]$pageMarkers[$pageCursor].Groups[1].Value } else { 0 }
  $prefixStart = if ($pageMarkers.Count) { $pageMarkers[$pageCursor].Index } else { [Math]::Max(0, $match.Index - 1200) }
  $prefix = $text.Substring($prefixStart, $match.Index - $prefixStart)
  $sessionMatches = [regex]::Matches(
    $prefix,
    '(Modelo|Ordinaria(?:-(?:Coincidente|General|Espec[iÃ­]fica|Valencia))?|Extraordinaria(?:-(?:Coincidente|General|Espec[iÃ­]fica))?|Reserva(?:\s*\d+)?)',
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
  )
  $session = if ($sessionMatches.Count) { $sessionMatches[$sessionMatches.Count - 1].Value } else { '' }
  $chapter = [int]$match.Groups[1].Value
  $year = 1999 + [int]$match.Groups[2].Value
  $topicIndexes = if ($Course -eq "mates") {
    Get-MatesTopics $chapter $chunk.ToLowerInvariant()
  } else {
    Get-CcssTopics $chapter $chunk.ToLowerInvariant()
  }
  $manualTopics = if ($Course -eq "mates") { $manualMatesTopics[$id] } else { $manualCcssTopics[$id] }
  if ($null -ne $manualTopics) {
    $topicIndexes = @($manualTopics | Sort-Object -Unique)
  }
  $partLabels = @(
    [regex]::Matches(
      $chunk,
      '(?i)(?:^|\s)([a-d](?:\.\d+)?)\)'
    ) |
      ForEach-Object { $_.Groups[1].Value.ToLowerInvariant() } |
      Sort-Object -Unique
  )
  $records.Add([pscustomobject]@{
    id = "madrid-$Course-$id"
    sourceId = $id
    community = "madrid"
    course = $Course
    chapter = $chapter
    year = $year
    page = $pageNumber
    session = $session
    topicIndexes = @($topicIndexes)
    partLabels = $partLabels
    exerciseUnits = [Math]::Max(1, $partLabels.Count)
    classificationStatus = if ($null -ne $manualTopics) { "manual-page-reviewed" } elseif ($topicIndexes.Count) { "automatic-review-required" } else { "unclassified" }
    excerpt = (($chunk -replace '\s+', ' ').Trim()).Substring(0, [Math]::Min(420, (($chunk -replace '\s+', ' ').Trim()).Length))
  })
}

$previousRecord = $null
foreach ($record in $records) {
  if (-not $record.session -and $previousRecord -and $record.chapter -eq $previousRecord.chapter -and $record.year -eq $previousRecord.year) {
    $record.session = $previousRecord.session
  }
  $previousRecord = $record
}

$topicCount = if ($Course -eq "mates") { 14 } else { 11 }
$coverage = for ($topicIndex = 0; $topicIndex -lt $topicCount; $topicIndex += 1) {
  $assigned = @($records | Where-Object { $_.topicIndexes -contains $topicIndex })
  $exerciseUnits = ($assigned | Measure-Object -Property exerciseUnits -Sum).Sum
  if ($null -eq $exerciseUnits) { $exerciseUnits = 0 }
  [pscustomobject]@{
    topicIndex = $topicIndex
    problemCount = $assigned.Count
    exerciseUnits = [int]$exerciseUnits
    minimumMet = $exerciseUnits -ge 40
  }
}

$output = [pscustomobject]@{
  generatedAt = (Get-Date).ToString("o")
  source = $resolvedInput
  course = $Course
  totalProblems = $records.Count
  unclassified = @($records | Where-Object { -not $_.topicIndexes.Count }).Count
  coverage = $coverage
  records = $records
}

$resolvedOutput = [System.IO.Path]::GetFullPath($OutputJson)
$outputDirectory = Split-Path -Parent $resolvedOutput
if (-not (Test-Path -LiteralPath $outputDirectory)) {
  New-Item -ItemType Directory -Path $outputDirectory | Out-Null
}
[System.IO.File]::WriteAllText($resolvedOutput, ($output | ConvertTo-Json -Depth 8), [System.Text.UTF8Encoding]::new($false))
$output | Select-Object course, totalProblems, unclassified, coverage | ConvertTo-Json -Depth 5
