param(
  [string]$OutputRoot = 'artifacts/user-supplied-andalucia-reconciliation'
)

$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$outputDir = Join-Path $projectRoot $OutputRoot
$textCache = Join-Path $outputDir '.text-cache'
$scanOverridesPath = Join-Path $outputDir 'scan-structure-overrides.json'
$pdfInfo = 'C:\Users\aherr\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdfinfo.exe'
$pdfText = 'C:\Program Files\Git\clangarm64\bin\pdftotext.exe'
$sources = @(
  [ordered]@{
    subject = 'Matemáticas II'
    courseId = '2bach-mates'
    root = Join-Path $projectRoot 'documentos\PAU Comunidades\Andalucía\Matemáticas II'
    prefix = 'Mates II'
  },
  [ordered]@{
    subject = 'Matemáticas Aplicadas a las CCSS II'
    courseId = '2bach-ccss'
    root = Join-Path $projectRoot 'documentos\PAU Comunidades\Andalucía\CCSS II'
    prefix = 'CCSS II'
  }
)

New-Item -ItemType Directory -Force -Path $outputDir,$textCache | Out-Null
$scanOverrides = @{}
if (Test-Path -LiteralPath $scanOverridesPath) {
  $scanOverrideData = Get-Content -LiteralPath $scanOverridesPath -Raw | ConvertFrom-Json
  foreach ($property in $scanOverrideData.documents.PSObject.Properties) {
    $scanOverrides[$property.Name] = @($property.Value)
  }
}

function Get-Sha256([string]$Path) {
  return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant()
}

function Get-NameMetadata([System.IO.FileInfo]$File, $Source) {
  $escaped = [regex]::Escape([string]$Source.prefix)
  $match = [regex]::Match($File.BaseName, "^$escaped`_(ord|extra|[0-9]+)_([0-9]{4})$")
  if (-not $match.Success) {
    return [ordered]@{ validName=$false; year=$null; sitting=$null; reserveNumber=$null }
  }
  $kind = $match.Groups[1].Value
  return [ordered]@{
    validName = $true
    year = [int]$match.Groups[2].Value
    sitting = if ($kind -eq 'ord') { 'Ordinaria' } elseif ($kind -eq 'extra') { 'Extraordinaria' } else { 'Reserva' }
    reserveNumber = if ($kind -match '^\d+$') { [int]$kind } else { $null }
  }
}

function Get-PdfPageCount([string]$Path) {
  $lines = & $pdfInfo -enc UTF-8 -- $Path 2>$null
  if ($LASTEXITCODE -ne 0) { return $null }
  $line = @($lines | Where-Object { $_ -match '^Pages:\s+\d+' } | Select-Object -First 1)
  if (-not $line) { return $null }
  return [int]([regex]::Match([string]$line, '\d+').Value)
}

function Get-PdfText([string]$Path, [string]$Hash) {
  $cachePath = Join-Path $textCache "$Hash.txt"
  if (-not (Test-Path -LiteralPath $cachePath)) {
    & $pdfText -enc UTF-8 -layout -- $Path $cachePath 2>$null
    if ($LASTEXITCODE -ne 0) { return '' }
  }
  return [IO.File]::ReadAllText($cachePath, [Text.Encoding]::UTF8)
}

function Get-ExerciseStructure([string]$Text) {
  $normalized = $Text.Replace("`r`n","`n")
  # Muchos cuadernillos antiguos incluyen, después del examen, los criterios de
  # corrección con los enunciados repetidos. Esa segunda copia no es otro examen.
  $criteria = [regex]::Match($normalized, '(?im)^\s*CRITERIOS\b')
  if ($criteria.Success) { $normalized = $normalized.Substring(0, $criteria.Index) }
  # En algunos PDF el límite de una integral queda al principio de la misma
  # línea que el encabezado (p. ej. "0 Ejercicio 2"). El prefijo numérico no
  # forma parte del número del ejercicio.
  $headings = @([regex]::Matches($normalized, '(?im)^\s*(?:[0-9]+\s+)?(?:EJERCICIO|PROBLEMA|PREGUNTA)\s+([0-9]+(?:\.[0-9]+)?)\s*[.):-]?'))
  if (-not $headings.Count) {
    $headings = @([regex]::Matches($normalized, '(?im)^\s*([1-9])\s*[.)-]\s+(?=[A-ZÁÉÍÓÚÑ])'))
  }
  $exercises = @()
  for ($index=0; $index -lt $headings.Count; $index++) {
    $heading = $headings[$index]
    $start = $heading.Index + $heading.Length
    $end = if ($index+1 -lt $headings.Count) { $headings[$index+1].Index } else { $normalized.Length }
    $block = $normalized.Substring($start, [Math]::Max(0,$end-$start))
    $parts = @([regex]::Matches($block, '(?im)(?:^|\n)\s*([a-z])\)\s*') | ForEach-Object { $_.Groups[1].Value.ToLowerInvariant()+')' } | Select-Object -Unique)
    $exercises += [ordered]@{
      label = $heading.Groups[1].Value
      heading = $heading.Value.Trim()
      parts = $parts
      partCount = [Math]::Max(1, $parts.Count)
    }
  }
  return @($exercises)
}

function Get-VisualScanStructure([string]$FileName) {
  if (-not $scanOverrides.ContainsKey($FileName)) { return @() }
  $counts = @($scanOverrides[$FileName])
  $exerciseCount = $counts.Count
  $perOption = if ($exerciseCount -eq 8) { 4 } elseif ($exerciseCount -eq 6) { 3 } else { $exerciseCount }
  $result = @()
  for ($index=0; $index -lt $exerciseCount; $index++) {
    $option = if ($index -lt $perOption) { 'A' } else { 'B' }
    $question = ($index % $perOption) + 1
    $partCount = [int]$counts[$index]
    $parts = if ($partCount -le 1) { @() } else { @(0..($partCount-1) | ForEach-Object { ([char](97+$_)).ToString() + ')' }) }
    $result += [ordered]@{
      label = "$option.$question"
      heading = "OPCIÓN $option · EJERCICIO $question"
      parts = $parts
      partCount = $partCount
    }
  }
  return @($result)
}

function Read-Registry([string]$Path) {
  if (-not (Test-Path -LiteralPath $Path)) { return @() }
  return @([IO.File]::ReadAllLines($Path, [Text.Encoding]::UTF8) | Where-Object { $_.Trim() } | ForEach-Object { $_ | ConvertFrom-Json })
}

$existing = @(
  (Read-Registry (Join-Path $projectRoot 'sources\pau-official\andalucia\document-registry.jsonl')) +
  (Read-Registry (Join-Path $projectRoot 'sources\pau-official\andalucia\coverage-closure-registry.jsonl'))
)
$existingByHash = @{}
foreach ($row in $existing) {
  if ($row.sha256 -and -not $existingByHash.ContainsKey([string]$row.sha256)) { $existingByHash[[string]$row.sha256] = $row }
}

$canonical2012ByHash = @{}
$canonical2012Path = Join-Path $projectRoot 'artifacts\pau-canonical-andalucia-ccssii-2012-integration\runs\run-a\andalucia-ccssii-2012-canonical-exercises.jsonl'
foreach ($row in (Read-Registry $canonical2012Path)) {
  $hash = [string]$row.documentHash
  if (-not $canonical2012ByHash.ContainsKey($hash)) { $canonical2012ByHash[$hash] = New-Object System.Collections.Generic.List[object] }
  $canonical2012ByHash[$hash].Add($row)
}

$records = New-Object System.Collections.Generic.List[object]
$docQueue = New-Object System.Collections.Generic.List[object]
foreach ($source in $sources) {
  if (-not (Test-Path -LiteralPath $source.root)) { throw "No existe la carpeta: $($source.root)" }
  $files = @(Get-ChildItem -LiteralPath $source.root -File | Where-Object { $_.Extension.ToLowerInvariant() -in @('.pdf','.doc') } | Sort-Object Name)
  foreach ($file in $files) {
    if ($file.Name -eq 'Tabla función distribuón normal.pdf') { continue }
    $metadata = Get-NameMetadata $file $source
    $hash = Get-Sha256 $file.FullName
    if ($file.Extension.ToLowerInvariant() -eq '.doc') {
      $docQueue.Add([pscustomobject]@{ file=$file; source=$source; metadata=$metadata; hash=$hash })
      continue
    }
    $text = Get-PdfText $file.FullName $hash
    $exercises = @(Get-ExerciseStructure $text)
    $structureExtraction = if($exercises.Count){'PDFTOTEXT_UTF8_LAYOUT'}else{'EMPTY_OR_FAILED'}
    if ($scanOverrides.ContainsKey($file.Name)) {
      $exercises = @(Get-VisualScanStructure $file.Name)
      $structureExtraction = 'VISUAL_PDF_REVIEW_AT_ORIGINAL_RESOLUTION'
    }
    $matched = if ($existingByHash.ContainsKey($hash)) { $existingByHash[$hash] } else { $null }
    $records.Add([pscustomobject][ordered]@{
      fileName=$file.Name; relativePath=$file.FullName.Substring($projectRoot.Length+1).Replace('\','/'); sha256=$hash
      subject=$source.subject; courseId=$source.courseId; year=$metadata.year; sitting=$metadata.sitting
      reserveNumber=$metadata.reserveNumber; extension=$file.Extension.ToLowerInvariant(); bytes=[long]$file.Length
      pages=Get-PdfPageCount $file.FullName; exercises=$exercises; exerciseCount=$exercises.Count
      partCount=(@($exercises | ForEach-Object { [int]$_.partCount }) | Measure-Object -Sum).Sum
      textExtraction=if($text.Trim()){'PDFTOTEXT_UTF8_LAYOUT'}else{'EMPTY_OR_FAILED'}
      structureExtraction=$structureExtraction
      currentCorpusHashMatch=[bool]$matched
      currentCorpusDocumentId=if($matched){[string]$matched.documentId}else{$null}
      currentCorpusOriginalName=if($matched){[string]($matched.originalName ?? $matched.originalPackageName)}else{$null}
      sourcePriority='USER_SUPPLIED_PRIMARY'; sourceMutated=$false
    })
  }
}

if ($docQueue.Count) {
  $word = New-Object -ComObject Word.Application
  $word.Visible = $false
  $word.DisplayAlerts = 0
  $word.AutomationSecurity = 3
  $word.Options.UpdateLinksAtOpen = $false
  try {
    foreach ($item in $docQueue) {
      $doc = $null
      try {
        $doc = $word.Documents.OpenNoRepairDialog($item.file.FullName, $false, $true, $false)
        $text = [string]$doc.Content.Text
        $exercises = @(Get-ExerciseStructure $text)
        $structureSource = 'MICROSOFT_WORD_COM_READ_ONLY'
        if (-not $exercises.Count -and $canonical2012ByHash.ContainsKey($item.hash)) {
          $exercises = @($canonical2012ByHash[$item.hash] | Sort-Object alternativeKey,questionKey | ForEach-Object {
            $partLabels = @($_.subparts | ForEach-Object { ([string]$_.label).TrimEnd(')') + ')' })
            [ordered]@{
              label = "$($_.alternativeKey).$($_.questionKey)"
              heading = "OPCIÓN $($_.alternativeKey) · EJERCICIO $($_.questionKey)"
              parts = $partLabels
              partCount = [Math]::Max(1, $partLabels.Count)
            }
          })
          $structureSource = 'CANONICAL_EQUATION3_RECOVERY_MATCHED_BY_DOCUMENT_SHA256'
        }
        $matched = if ($existingByHash.ContainsKey($item.hash)) { $existingByHash[$item.hash] } else { $null }
        $records.Add([pscustomobject][ordered]@{
          fileName=$item.file.Name; relativePath=$item.file.FullName.Substring($projectRoot.Length+1).Replace('\','/'); sha256=$item.hash
          subject=$item.source.subject; courseId=$item.source.courseId; year=$item.metadata.year; sitting=$item.metadata.sitting
          reserveNumber=$item.metadata.reserveNumber; extension='.doc'; bytes=[long]$item.file.Length
          pages=[int]$doc.ComputeStatistics(2); exercises=$exercises; exerciseCount=$exercises.Count
          partCount=(@($exercises | ForEach-Object { [int]$_.partCount }) | Measure-Object -Sum).Sum
          textExtraction='MICROSOFT_WORD_COM_READ_ONLY'; structureExtraction=$structureSource; equationObjects=[int]$doc.InlineShapes.Count
          currentCorpusHashMatch=[bool]$matched
          currentCorpusDocumentId=if($matched){[string]$matched.documentId}else{$null}
          currentCorpusOriginalName=if($matched){[string]($matched.originalName ?? $matched.originalPackageName)}else{$null}
          sourcePriority='USER_SUPPLIED_PRIMARY'; sourceMutated=$false
        })
      } finally {
        if ($null -ne $doc) { $doc.Close(0); [Runtime.InteropServices.Marshal]::FinalReleaseComObject($doc) | Out-Null }
      }
    }
  } finally {
    $word.Quit(); [Runtime.InteropServices.Marshal]::FinalReleaseComObject($word) | Out-Null
  }
}

$ordered = @($records | Sort-Object subject,year,sitting,reserveNumber,fileName)
$inventoryPath = Join-Path $outputDir 'user-document-inventory.jsonl'
[IO.File]::WriteAllLines($inventoryPath, @($ordered | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 12 }), [Text.UTF8Encoding]::new($false))

$duplicates = @($ordered | Group-Object sha256 | Where-Object Count -gt 1 | ForEach-Object {
  [ordered]@{sha256=$_.Name; count=$_.Count; files=@($_.Group.fileName | Sort-Object)}
})
$summary = [ordered]@{
  schemaVersion='mathup.user-supplied-andalucia-inventory.v1'
  sourceAuthority='Archivos aportados por el usuario'
  sourcePriority='PRIMARY_FOR_ANDALUCIA_RECONCILIATION'
  excludedFiles=@('Tabla función distribuón normal.pdf')
  totals=[ordered]@{
    documents=$ordered.Count
    mathematicsII=@($ordered | Where-Object courseId -eq '2bach-mates').Count
    ccssII=@($ordered | Where-Object courseId -eq '2bach-ccss').Count
    pdf=@($ordered | Where-Object extension -eq '.pdf').Count
    doc=@($ordered | Where-Object extension -eq '.doc').Count
    pages=($ordered | Measure-Object pages -Sum).Sum
    detectedExercises=($ordered | Measure-Object exerciseCount -Sum).Sum
    detectedParts=($ordered | Measure-Object partCount -Sum).Sum
    currentCorpusHashMatches=@($ordered | Where-Object currentCorpusHashMatch).Count
    currentCorpusHashMisses=@($ordered | Where-Object { -not $_.currentCorpusHashMatch }).Count
    duplicateHashGroups=$duplicates.Count
  }
  coverage=@($ordered | Group-Object subject,year,sitting | ForEach-Object {
    $rows=@($_.Group)
    [ordered]@{subject=$rows[0].subject;year=$rows[0].year;sitting=$rows[0].sitting;documents=$rows.Count;detectedExercises=($rows|Measure-Object exerciseCount -Sum).Sum}
  } | Sort-Object subject,year,sitting)
  duplicateHashes=$duplicates
  inventoryFile='user-document-inventory.jsonl'
}
[IO.File]::WriteAllText((Join-Path $outputDir 'inventory-summary.json'), ($summary | ConvertTo-Json -Depth 12), [Text.UTF8Encoding]::new($false))
$summary | ConvertTo-Json -Depth 12
