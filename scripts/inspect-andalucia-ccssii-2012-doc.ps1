param(
  [string]$OutputPath = 'artifacts/andalucia-ccssii-2012-doc/document-diagnostics.jsonl',
  [switch]$ReverseInput
)

$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$sourceRoot = Join-Path $projectRoot 'sources\pau-official\andalucia\ccss-ii\2012\official-doc'
$outputFile = Join-Path $projectRoot $OutputPath
$outputRoot = Split-Path -Parent $outputFile
New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null

function Get-Sha256([string]$Path) {
  return (Get-FileHash -Algorithm SHA256 -LiteralPath $Path).Hash.ToLowerInvariant()
}

function Get-InlineShapeRecord($Shape, [int]$Index) {
  $classType = $null
  $programId = $null
  try { $classType = [string]$Shape.OLEFormat.ClassType } catch {}
  try { $programId = [string]$Shape.OLEFormat.ProgID } catch {}
  return [ordered]@{
    index = $Index
    type = [int]$Shape.Type
    classType = $classType
    programId = $programId
    rangeStart = [int]$Shape.Range.Start
    rangeEnd = [int]$Shape.Range.End
    widthPoints = [Math]::Round([double]$Shape.Width, 2)
    heightPoints = [Math]::Round([double]$Shape.Height, 2)
    alternativeText = [string]$Shape.AlternativeText
  }
}

function Get-ShapeRecord($Shape, [int]$Index) {
  $classType = $null
  $programId = $null
  try { $classType = [string]$Shape.OLEFormat.ClassType } catch {}
  try { $programId = [string]$Shape.OLEFormat.ProgID } catch {}
  return [ordered]@{
    index = $Index
    type = [int]$Shape.Type
    classType = $classType
    programId = $programId
    anchorStart = [int]$Shape.Anchor.Start
    anchorEnd = [int]$Shape.Anchor.End
    widthPoints = [Math]::Round([double]$Shape.Width, 2)
    heightPoints = [Math]::Round([double]$Shape.Height, 2)
    alternativeText = [string]$Shape.AlternativeText
  }
}

$files = @(Get-ChildItem -LiteralPath $sourceRoot -File -Filter '*.doc' | Sort-Object Name)
if ($ReverseInput) { [array]::Reverse($files) }

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
$word.AutomationSecurity = 3
$word.Options.ConfirmConversions = $false
$word.Options.UpdateLinksAtOpen = $false
$records = New-Object System.Collections.Generic.List[object]

try {
  foreach ($file in $files) {
    $doc = $null
    try {
      $doc = $word.Documents.OpenNoRepairDialog($file.FullName, $false, $true, $false)
      $inline = @()
      for ($index = 1; $index -le $doc.InlineShapes.Count; $index++) {
        $inline += Get-InlineShapeRecord $doc.InlineShapes.Item($index) $index
      }
      $floating = @()
      for ($index = 1; $index -le $doc.Shapes.Count; $index++) {
        $floating += Get-ShapeRecord $doc.Shapes.Item($index) $index
      }
      $tables = @()
      for ($index = 1; $index -le $doc.Tables.Count; $index++) {
        $table = $doc.Tables.Item($index)
        $tables += [ordered]@{
          index = $index
          rows = [int]$table.Rows.Count
          columns = [int]$table.Columns.Count
          rangeStart = [int]$table.Range.Start
          rangeEnd = [int]$table.Range.End
        }
      }
      $text = [string]$doc.Content.Text
      $records.Add([pscustomobject][ordered]@{
        path = $file.FullName.Substring($projectRoot.Length + 1).Replace('\','/')
        fileName = $file.Name
        role = if ($file.BaseName -like 'exam-*') { 'exam' } else { 'correction-criteria' }
        model = [int]([regex]::Match($file.BaseName, '(\d+)$').Groups[1].Value)
        bytes = [long]$file.Length
        sha256 = Get-Sha256 $file.FullName
        compoundFileSignature = 'd0cf11e0a1b11ae1'
        realFormat = 'OLE_COMPOUND_FILE_BINARY'
        wordFormat = 'Microsoft Word 97-2003 (.doc)'
        wordCompatibilityMode = [int]$doc.CompatibilityMode
        pages = [int]$doc.ComputeStatistics(2)
        paragraphs = [int]$doc.Paragraphs.Count
        words = [int]$doc.Words.Count
        tables = $tables
        inlineShapes = $inline
        floatingShapes = $floating
        omathCount = [int]$doc.OMaths.Count
        fieldCount = [int]$doc.Fields.Count
        textLength = $text.Length
        extractedText = $text
        extractionMethod = 'MICROSOFT_WORD_COM_READ_ONLY'
        independentTextExtractionMethod = 'ANTIWORD_REJECTED_BECAUSE_EQUATIONS_BECOME_PICTURE_PLACEHOLDERS'
        independentTextLength = 0
        independentPictureMarkers = @($inline | Where-Object classType -eq 'Equation.3').Count
        equationStorage = if (@($inline | Where-Object classType -eq 'Equation.3').Count) { 'OLE_EQUATION_EDITOR_3' } else { 'NONE' }
        equationObjects = @($inline | Where-Object classType -eq 'Equation.3').Count
        conversionRisk = if (@($inline | Where-Object classType -eq 'Equation.3').Count) { 'PLAIN_TEXT_CONVERSION_WOULD_LOSE_EQUATIONS' } else { 'LOW_FOR_TEXT_ONLY' }
        sourceMutated = $false
      })
    } catch {
      $records.Add([pscustomobject][ordered]@{
        path = $file.FullName.Substring($projectRoot.Length + 1).Replace('\','/')
        fileName = $file.Name
        bytes = [long]$file.Length
        sha256 = Get-Sha256 $file.FullName
        error = $_.Exception.Message
        extractionMethod = 'MICROSOFT_WORD_COM_READ_ONLY'
        sourceMutated = $false
      })
    } finally {
      if ($null -ne $doc) {
        $doc.Close(0)
        [Runtime.InteropServices.Marshal]::FinalReleaseComObject($doc) | Out-Null
      }
    }
  }
} finally {
  $word.Quit()
  [Runtime.InteropServices.Marshal]::FinalReleaseComObject($word) | Out-Null
}

$lines = @($records | Sort-Object path | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 20 })
[IO.File]::WriteAllLines($outputFile, $lines, [Text.UTF8Encoding]::new($false))
[pscustomobject]@{
  output = $outputFile.Substring($projectRoot.Length + 1).Replace('\','/')
  documents = $records.Count
  errors = @($records | Where-Object error).Count
  inlineShapes = (@($records | ForEach-Object { @($_.inlineShapes) }) | Measure-Object).Count
  floatingShapes = (@($records | ForEach-Object { @($_.floatingShapes) }) | Measure-Object).Count
  omath = ($records | Measure-Object omathCount -Sum).Sum
  tables = (@($records | ForEach-Object { @($_.tables) }) | Measure-Object).Count
} | ConvertTo-Json -Depth 5
