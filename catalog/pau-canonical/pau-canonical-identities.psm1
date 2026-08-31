Set-StrictMode -Version Latest

function Get-Sha256Text([string]$Value) {
  $sha = [Security.Cryptography.SHA256]::Create()
  try { return ([BitConverter]::ToString($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes([string]$Value))).Replace('-','').ToLowerInvariant()) }
  finally { $sha.Dispose() }
}

function Get-Sha256File([string]$Path) {
  $stream = [IO.File]::OpenRead($Path)
  $sha = [Security.Cryptography.SHA256]::Create()
  try { return ([BitConverter]::ToString($sha.ComputeHash($stream)).Replace('-','').ToLowerInvariant()) }
  finally { $sha.Dispose(); $stream.Dispose() }
}

function New-StableId([string]$Prefix, [string[]]$Parts) {
  return "$Prefix-$((Get-Sha256Text (($Parts | ForEach-Object { [string]$_ }) -join '|' )).Substring(0,32))"
}

function Get-CanonicalSubject([string]$Value) {
  $text = ([string]$Value).Normalize([Text.NormalizationForm]::FormKC)
  $matematicas = "Matem$([char]0x00E1)ticas"
  if ($text -match '(?i)CCSS|CIENCIAS\s+SOCIALES|APLICADAS') { return "$matematicas Aplicadas a las CCSS II" }
  return "$matematicas II"
}

function Get-CanonicalCommunity([string]$Value) {
  if ($Value -match '(?i)andaluc') { return "Andaluc$([char]0x00ED)a" }
  if ($Value -match '(?i)madrid') { return 'Madrid' }
  if ($Value -match '(?i)castilla|clm') { return 'Castilla-La Mancha' }
  return $null
}

function Get-AndaluciaRole([string]$Model) {
  if ($Model -match '(?i)suplente\s*2') { return 'Suplente 2' }
  if ($Model -match '(?i)suplente') { return 'Suplente 1' }
  if ($Model -match '(?i)reserva') { return 'Reserva' }
  if ($Model -match '(?i)titular') { return 'Titular' }
  return 'No verificable'
}

function Get-Variant([string]$Model) {
  $match = [regex]::Match([string]$Model, '(?i)(?:^|\s)([AB])(?:$|\s)')
  if ($match.Success) { return $match.Groups[1].Value.ToUpperInvariant() }
  return $null
}

function ConvertTo-NormalizedLiteral([string]$Value) {
  if (-not $Value) { return '' }
  $text = ([string]$Value).Normalize([Text.NormalizationForm]::FormKC).ToLowerInvariant()
  $text = $text -replace '(?i)\(\s*\d+(?:[.,]\d+)?\s*puntos?\s*\)', ' '
  $text = $text -replace '(?i)\b\d+(?:[.,]\d+)?\s*puntos?\b', ' '
  $formD = $text.Normalize([Text.NormalizationForm]::FormD)
  $builder = [Text.StringBuilder]::new()
  foreach ($char in $formD.ToCharArray()) {
    if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($char) -ne [Globalization.UnicodeCategory]::NonSpacingMark) { [void]$builder.Append($char) }
  }
  $text = $builder.ToString().Normalize([Text.NormalizationForm]::FormC)
  $text = $text -replace '[^a-z0-9]+', ' '
  return ($text -replace '\s+', ' ').Trim()
}

function Get-TokenSet([string]$Value) {
  return @((ConvertTo-NormalizedLiteral $Value).Split(' ') | Where-Object { $_.Length -ge 2 } | Sort-Object -Unique)
}

function Get-ShingleSet([string]$Value, [int]$Width = 4) {
  $tokens = @((ConvertTo-NormalizedLiteral $Value).Split(' ') | Where-Object { $_ })
  if ($tokens.Count -lt $Width) { return @() }
  $values = for ($index = 0; $index -le $tokens.Count - $Width; $index++) { $tokens[$index..($index + $Width - 1)] -join ' ' }
  return @($values | Sort-Object -Unique)
}

Export-ModuleMember -Function Get-Sha256Text,Get-Sha256File,New-StableId,Get-CanonicalSubject,Get-CanonicalCommunity,Get-AndaluciaRole,Get-Variant,ConvertTo-NormalizedLiteral,Get-TokenSet,Get-ShingleSet
