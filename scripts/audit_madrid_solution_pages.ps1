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

$resolvedInput = (Resolve-Path -LiteralPath $InputOcr).Path
$text = [System.IO.File]::ReadAllText($resolvedInput, [System.Text.Encoding]::UTF8)
$pageMatches = [regex]::Matches(
  $text,
  '=====\s+P[^\r\n]*?GINA\s+(\d+)\s+=====',
  [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
)

$records = [System.Collections.Generic.List[object]]::new()
$seen = [System.Collections.Generic.HashSet[string]]::new()

for ($pageIndex = 0; $pageIndex -lt $pageMatches.Count; $pageIndex += 1) {
  $pageMatch = $pageMatches[$pageIndex]
  $pageNumber = [int]$pageMatch.Groups[1].Value
  $start = $pageMatch.Index + $pageMatch.Length
  $end = if ($pageIndex + 1 -lt $pageMatches.Count) {
    $pageMatches[$pageIndex + 1].Index
  } else {
    $text.Length
  }
  $pageText = $text.Substring($start, [Math]::Max(0, $end - $start))
  $problemMatches = [regex]::Matches(
    $pageText,
    'Problema\s+([1-5]\.\d{1,2}\.\d{1,2})',
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
  )
  foreach ($problemMatch in $problemMatches) {
    $sourceId = $problemMatch.Groups[1].Value
    if (-not $seen.Add($sourceId)) { continue }
    $records.Add([pscustomobject]@{
      id = "madrid-$Course-$sourceId"
      sourceId = $sourceId
      page = $pageNumber
    })
  }
}

$output = [pscustomobject]@{
  generatedAt = (Get-Date).ToString('o')
  source = $resolvedInput
  course = $Course
  totalSolutions = $records.Count
  records = $records
}

$resolvedOutput = [System.IO.Path]::GetFullPath($OutputJson)
$outputDirectory = Split-Path -Parent $resolvedOutput
if (-not (Test-Path -LiteralPath $outputDirectory)) {
  New-Item -ItemType Directory -Path $outputDirectory | Out-Null
}
[System.IO.File]::WriteAllText(
  $resolvedOutput,
  ($output | ConvertTo-Json -Depth 5),
  [System.Text.UTF8Encoding]::new($false)
)
$output | Select-Object course, totalSolutions | ConvertTo-Json -Compress
