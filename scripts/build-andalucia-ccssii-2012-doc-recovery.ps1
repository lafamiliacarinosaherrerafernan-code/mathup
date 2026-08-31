param(
  [string]$RunName = 'run-a',
  [switch]$ReverseInput
)

$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$sourceRoot = Join-Path $projectRoot 'sources\pau-official\andalucia\ccss-ii\2012\official-doc'
$artifactRoot = Join-Path $projectRoot 'artifacts\andalucia-ccssii-2012-doc'
$runRoot = Join-Path $artifactRoot "runs\$RunName"
$objectRoot = Join-Path $artifactRoot 'document-objects'
$registryPath = Join-Path $projectRoot 'sources\pau-official\andalucia\coverage-closure-registry.jsonl'
$pairPath = Join-Path $projectRoot 'artifacts\official-pau-coverage-closure\andalucia-exam-criteria-matches.jsonl'

New-Item -ItemType Directory -Force -Path $runRoot,$objectRoot | Out-Null
Add-Type -AssemblyName System.Drawing

function Get-Sha256([string]$Path) { (Get-FileHash -Algorithm SHA256 -LiteralPath $Path).Hash.ToLowerInvariant() }
function Get-TextSha256([string]$Value) {
  $sha = [Security.Cryptography.SHA256]::Create()
  try { ([BitConverter]::ToString($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($Value)))).Replace('-','').ToLowerInvariant() }
  finally { $sha.Dispose() }
}
function To-Relative([string]$Path) { $Path.Substring($projectRoot.Length + 1).Replace('\','/') }
function Write-JsonLines([string]$Path, [object[]]$Rows) {
  $lines = @($Rows | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 30 })
  [IO.File]::WriteAllLines($Path, $lines, [Text.UTF8Encoding]::new($false))
}
function Normalize-ExtractedText([string]$Text) {
  (($Text -replace "`v", "`n") -replace "`r", "`n") -replace "`n{3,}", "`n`n"
}
function Remove-ScoreLiterals([string]$Text) {
  [regex]::Replace($Text, '(?i)\s*\((\d+(?:[\.,]\d+)?)\s*puntos?\)', '')
}
function Convert-EmfToPng([string]$EmfPath, [string]$PngPath) {
  $image = [Drawing.Image]::FromFile($EmfPath)
  try {
    $bitmap = New-Object Drawing.Bitmap($image.Width, $image.Height, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $bitmap.SetResolution($image.HorizontalResolution, $image.VerticalResolution)
    $graphics = [Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.Clear([Drawing.Color]::White)
      $graphics.DrawImage($image, 0, 0, $image.Width, $image.Height)
      $bitmap.Save($PngPath, [Drawing.Imaging.ImageFormat]::Png)
    } finally { $graphics.Dispose(); $bitmap.Dispose() }
  } finally { $image.Dispose() }
}
function Get-RegistryRecord([string]$FileName) {
  $lines = [IO.File]::ReadAllLines($registryPath, [Text.Encoding]::UTF8)
  foreach ($line in $lines) {
    $row = $line | ConvertFrom-Json
    if ([IO.Path]::GetFileName($row.localPath) -eq $FileName) { return $row }
  }
  throw "No registry record for $FileName"
}
function Get-RangeBlocks($Doc, [int]$Start, [int]$End, $ObjectRows, [switch]$Learner) {
  $blocks = New-Object System.Collections.Generic.List[object]
  $cursor = $Start
  $inside = @($ObjectRows | Where-Object { $_.rangeStart -ge $Start -and $_.rangeStart -lt $End } | Sort-Object rangeStart)
  foreach ($obj in $inside) {
    if ($obj.rangeStart -gt $cursor) {
      $text = Normalize-ExtractedText ([string]$Doc.Range($cursor, $obj.rangeStart).Text)
      if ($Learner) { $text = Remove-ScoreLiterals $text }
      if ($text.Length -gt 0) { $blocks.Add([pscustomobject][ordered]@{ type='text'; text=$text }) }
    }
    $blocks.Add([pscustomobject][ordered]@{ type='document-object'; objectId=$obj.objectId })
    $cursor = $obj.rangeEnd
  }
  if ($cursor -lt $End) {
    $text = Normalize-ExtractedText ([string]$Doc.Range($cursor, $End).Text)
    if ($Learner) { $text = Remove-ScoreLiterals $text }
    if ($text.Length -gt 0) { $blocks.Add([pscustomobject][ordered]@{ type='text'; text=$text }) }
  }
  return $blocks.ToArray()
}
function Blocks-ToText([object[]]$Blocks) {
  (@($Blocks | ForEach-Object { if ($_.type -eq 'text') { $_.text } else { "{{DOCUMENT_OBJECT:$($_.objectId)}}" } }) -join '')
}

$pairRows = @([IO.File]::ReadAllLines($pairPath,[Text.Encoding]::UTF8) | ForEach-Object { $_ | ConvertFrom-Json } | Where-Object {
  $_.year -eq 2012 -and $_.subject -match 'CCSS II$' -and $_.classification -eq 'CRITERIA_MATCH_EXACT'
})
$expectedExactCriteriaPairCount = @($pairRows).Count
if ($expectedExactCriteriaPairCount -ne 6) { throw "Expected 6 exact exam-criteria pairs, found $expectedExactCriteriaPairCount" }
$files = @(Get-ChildItem -LiteralPath $sourceRoot -File -Filter '*.doc' | Sort-Object Name)
if ($ReverseInput) { [array]::Reverse($files) }
$documents = New-Object System.Collections.Generic.List[object]
$objects = New-Object System.Collections.Generic.List[object]
$exercises = New-Object System.Collections.Generic.List[object]
$criteriaSections = @{}

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
$word.AutomationSecurity = 3
$word.Options.ConfirmConversions = $false
$word.Options.UpdateLinksAtOpen = $false
try {
  foreach ($file in $files) {
    $doc = $null
    try {
      $doc = $word.Documents.OpenNoRepairDialog($file.FullName, $false, $true, $false)
      $registry = Get-RegistryRecord $file.Name
      $sha = Get-Sha256 $file.FullName
      if ($sha -ne ([string]$registry.sha256).ToLowerInvariant()) { throw "Registry hash mismatch: $($file.Name)" }
      $role = if ($file.BaseName -like 'exam-*') { 'exam' } else { 'correction-criteria' }
      $model = [int]([regex]::Match($file.BaseName, '(\d+)$').Groups[1].Value)
      $documentId = "ade2012-$role-m$model-$($sha.Substring(0,16))"
      $docObjects = New-Object System.Collections.Generic.List[object]
      for ($i=1; $i -le $doc.InlineShapes.Count; $i++) {
        $shape = $doc.InlineShapes.Item($i)
        $classType = ''; try { $classType = [string]$shape.OLEFormat.ClassType } catch {}
        $objectId = "adobj-$($sha.Substring(0,16))-$($i.ToString('D3'))"
        $emfPath = Join-Path $objectRoot "$objectId.emf"
        $pngPath = Join-Path $objectRoot "$objectId.png"
        if (-not (Test-Path -LiteralPath $emfPath)) {
          $bits = [byte[]]$shape.Range.EnhMetaFileBits
          [IO.File]::WriteAllBytes($emfPath, $bits)
        }
        $emfSha = Get-Sha256 $emfPath
        if (-not (Test-Path -LiteralPath $pngPath)) { Convert-EmfToPng $emfPath $pngPath }
        $row = [pscustomobject][ordered]@{
          objectId=$objectId; documentId=$documentId; sourceDocumentSha256=$sha; sourcePath=To-Relative $file.FullName
          index=$i; rangeStart=[int]$shape.Range.Start; rangeEnd=[int]$shape.Range.End
          objectType='OLE_EQUATION_EDITOR_3'; classType=$classType; extraction='WORD_ENHMETAFILEBITS'
          emfPath=To-Relative $emfPath; emfSha256=$emfSha; emfBytes=(Get-Item $emfPath).Length
          pngPreviewPath=To-Relative $pngPath; pngPreviewSha256=Get-Sha256 $pngPath; pngPreviewBytes=(Get-Item $pngPath).Length
          vectorPreserved=$true; semanticExpressionExtracted=$false; reviewStatus='DOCUMENT_OBJECT_VECTOR_PRESERVED'
        }
        $docObjects.Add($row); $objects.Add($row)
      }
      $paragraphs = @()
      for ($i=1; $i -le $doc.Paragraphs.Count; $i++) {
        $p = $doc.Paragraphs.Item($i)
        $paragraphs += [pscustomobject]@{ index=$i; start=[int]$p.Range.Start; end=[int]$p.Range.End; text=(Normalize-ExtractedText ([string]$p.Range.Text)).Trim() }
      }
      $documents.Add([pscustomobject][ordered]@{
        documentId=$documentId; role=$role; model=$model; path=To-Relative $file.FullName; sha256=$sha; bytes=$file.Length
        realFormat='OLE_COMPOUND_FILE_BINARY'; wordFormat='Microsoft Word 97-2003 (.doc)'; compatibilityMode=[int]$doc.CompatibilityMode
        pages=[int]$doc.ComputeStatistics(2); paragraphs=[int]$doc.Paragraphs.Count; tables=[int]$doc.Tables.Count
        inlineObjects=[int]$doc.InlineShapes.Count; equationEditorObjects=@($docObjects | Where-Object classType -eq 'Equation.3').Count
        omathObjects=[int]$doc.OMaths.Count; floatingShapes=[int]$doc.Shapes.Count; extractionStatus='EXTRACTED_READ_ONLY'
        registryDocumentId=$registry.documentId; registryStatus=$registry.verificationStatus; sourceMutated=$false
      })
      $heads = New-Object System.Collections.Generic.List[object]
      $option = $null
      foreach ($p in $paragraphs) {
        if ($p.text -match '(?i)^OPCI.N\s+([AB])') { $option=$Matches[1].ToUpperInvariant(); continue }
        if ($p.text -match '(?i)^EJERCICIO\s+(\d+)') {
          $heads.Add([pscustomobject]@{ start=$p.start; option=$option; number=[int]$Matches[1] })
        }
      }
      if ($role -eq 'exam') {
        if ($heads.Count -ne 8) { throw "Expected 8 exercise headings in $($file.Name), found $($heads.Count)" }
        for ($h=0; $h -lt $heads.Count; $h++) {
          $head=$heads[$h]; $end=if($h+1 -lt $heads.Count){$heads[$h+1].start}else{[int]$doc.Content.End}
          $optionValue=if($head.option){[string]$head.option}elseif($h -lt 4){'A'}else{'B'}
          $rawBlocks=@(Get-RangeBlocks $doc $head.start $end $docObjects.ToArray())
          $learnerBlocks=@(Get-RangeBlocks $doc $head.start $end $docObjects.ToArray() -Learner)
          $rawText=Blocks-ToText $rawBlocks
          $scoreEvidence=@([regex]::Matches($rawText,'(?i)\((\d+(?:[\.,]\d+)?)\s*puntos?\)') | ForEach-Object {
            [pscustomobject][ordered]@{ literal=$_.Value; points=[double]($_.Groups[1].Value.Replace(',','.')); characterOffset=$_.Index }
          })
          $subparts=@([regex]::Matches($rawText,'(?m)^\s*([a-d])\)') | ForEach-Object { [pscustomobject][ordered]@{ label=$_.Groups[1].Value.ToLowerInvariant(); characterOffset=$_.Index } })
          $usedObjects=@($docObjects | Where-Object { $_.rangeStart -ge $head.start -and $_.rangeStart -lt $end } | ForEach-Object objectId)
          $exerciseId="ade2012-m$model-$($optionValue.ToLowerInvariant())-e$($head.number)-$($sha.Substring(0,12))"
          $criteriaKey="$model|$optionValue|$($head.number)"
          $exercises.Add([pscustomobject][ordered]@{
            schemaVersion='mathup.pau-document-recovered-exercise.v1'; documentExerciseId=$exerciseId; documentId=$documentId
            sourceDocumentSha256=$sha; community=$registry.community; subject=$registry.subject; year=2012
            sitting='No verificable'; model=$model; option=$optionValue; exerciseNumber=$head.number
            rawBlocks=$rawBlocks; learnerBlocks=$learnerBlocks; subparts=$subparts; scoreEvidence=$scoreEvidence
            criteriaEvidence=@(); documentObjects=$usedObjects
            materializationStatus=if(@($usedObjects | Where-Object { -not (Test-Path (Join-Path $projectRoot (@($docObjects|Where-Object objectId -eq $_)[0].emfPath))) }).Count){'DOCUMENT_OBJECT_REVIEW_REQUIRED'}else{'MATERIALIZABLE'}
            traceability=[ordered]@{ sourcePath=To-Relative $file.FullName; rangeStart=$head.start; rangeEnd=$end; rawTextSha256=Get-TextSha256 $rawText }
            criteriaLookupKey=$criteriaKey
          })
        }
      } else {
        if ($heads.Count -ne 8) { throw "Expected 8 criteria headings in $($file.Name), found $($heads.Count)" }
        for($h=0;$h -lt $heads.Count;$h++){
          $head=$heads[$h];$end=if($h+1 -lt $heads.Count){$heads[$h+1].start}else{[int]$doc.Content.End}
          $optionValue=if($head.option){[string]$head.option}elseif($h -lt 4){'A'}else{'B'}
          $text=Normalize-ExtractedText ([string]$doc.Range($head.start,$end).Text)
          $criteriaSections["$model|$optionValue|$($head.number)"]=[pscustomobject][ordered]@{
            criteriaDocumentId=$documentId; sourceDocumentSha256=$sha; sourcePath=To-Relative $file.FullName
            match='CRITERIA_MATCH_EXACT'; scope="option-$optionValue-exercise-$($head.number)"; literal=$text
            rangeStart=$head.start; rangeEnd=$end; literalSha256=Get-TextSha256 $text
          }
        }
      }
    } finally {
      if ($null -ne $doc) { $doc.Close(0); [Runtime.InteropServices.Marshal]::FinalReleaseComObject($doc)|Out-Null }
    }
  }
} finally { $word.Quit(); [Runtime.InteropServices.Marshal]::FinalReleaseComObject($word)|Out-Null }

foreach($exercise in $exercises){
  if(-not $criteriaSections.ContainsKey($exercise.criteriaLookupKey)){ throw "Missing criteria section $($exercise.criteriaLookupKey)" }
  $exercise.criteriaEvidence=@($criteriaSections[$exercise.criteriaLookupKey])
  $exercise.PSObject.Properties.Remove('criteriaLookupKey')
}

$documentRows=@($documents|Sort-Object path)
$objectRows=@($objects|Sort-Object documentId,index)
$exerciseRows=@($exercises|Sort-Object model,option,exerciseNumber)
Write-JsonLines (Join-Path $runRoot 'documents.jsonl') $documentRows
Write-JsonLines (Join-Path $runRoot 'document-objects.jsonl') $objectRows
Write-JsonLines (Join-Path $runRoot 'recovered-exercises.jsonl') $exerciseRows
$semanticPayload=[ordered]@{documents=$documentRows;objects=$objectRows;exercises=$exerciseRows}
$semanticJson=$semanticPayload|ConvertTo-Json -Compress -Depth 40
$summary=[ordered]@{
  phase='ANDALUCIA_CCSSII_2012_DOC_RECOVERY'; runName=$RunName; reversed=[bool]$ReverseInput
  sourceDocuments=$documentRows.Count; exams=@($documentRows|Where-Object role -eq exam).Count; criteria=@($documentRows|Where-Object role -eq 'correction-criteria').Count
  exactCriteriaPairs=$expectedExactCriteriaPairCount; equationObjects=$objectRows.Count; objectsRecoveredExactly=@($objectRows|Where-Object vectorPreserved).Count
  objectsPending=@($objectRows|Where-Object {$_.reviewStatus -ne 'DOCUMENT_OBJECT_VECTOR_PRESERVED'}).Count
  detectedExercises=$exerciseRows.Count; materializableExercises=@($exerciseRows|Where-Object materializationStatus -eq MATERIALIZABLE).Count
  subparts=(@($exerciseRows|ForEach-Object {@($_.subparts)})|Measure-Object).Count
  scoreEvidence=(@($exerciseRows|ForEach-Object {@($_.scoreEvidence)})|Measure-Object).Count
  criteriaLinks=(@($exerciseRows|ForEach-Object {@($_.criteriaEvidence)})|Measure-Object).Count
  potentialAndaluciaTotal=1618+@($exerciseRows|Where-Object materializationStatus -eq MATERIALIZABLE).Count
  semanticSha256=Get-TextSha256 $semanticJson
  productionModified=$false; answersGenerated=0; solutionsGenerated=0; distractorsGenerated=0
}
[IO.File]::WriteAllText((Join-Path $runRoot 'summary.json'),($summary|ConvertTo-Json -Depth 10),[Text.UTF8Encoding]::new($false))
$summary|ConvertTo-Json -Depth 10
