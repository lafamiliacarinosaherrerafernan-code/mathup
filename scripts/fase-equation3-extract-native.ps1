param(
  [string]$OutputRoot = 'artifacts/equation3-andalucia-2012/native-evidence',
  [switch]$ReverseInput
)

$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$sourceRoot = Join-Path $projectRoot 'sources\pau-official\andalucia\ccss-ii\2012\official-doc'
$objectMapPath = Join-Path $projectRoot 'artifacts\equation3-andalucia-2012\doc-object-map\doc-object-ole-map.jsonl'
$outputRootPath = Join-Path $projectRoot $OutputRoot
New-Item -ItemType Directory -Force -Path $outputRootPath | Out-Null

Add-Type -TypeDefinition @'
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

public sealed class MathupCompoundFileReader {
  private const uint FREE = 0xffffffff;
  private const uint END = 0xfffffffe;
  private const uint FATSECT = 0xfffffffd;
  private const uint DIFSECT = 0xfffffffc;
  private readonly byte[] data;
  private readonly int sectorSize;
  private readonly int miniSectorSize;
  private readonly uint miniCutoff;
  private readonly List<uint> fat = new List<uint>();
  private readonly List<uint> miniFat = new List<uint>();
  private readonly List<DirectoryEntry> entries = new List<DirectoryEntry>();
  private byte[] miniStream = new byte[0];

  private sealed class DirectoryEntry {
    public int Id;
    public string Name = "";
    public byte Type;
    public uint Left;
    public uint Right;
    public uint Child;
    public uint Start;
    public ulong Size;
  }

  public sealed class StreamRecord {
    public string Path { get; set; }
    public string Name { get; set; }
    public byte[] Data { get; set; }
  }

  public MathupCompoundFileReader(byte[] bytes) {
    if (bytes == null) throw new ArgumentNullException("bytes");
    data = bytes;
    byte[] signature = {0xd0,0xcf,0x11,0xe0,0xa1,0xb1,0x1a,0xe1};
    if (data.Length < 512 || !signature.SequenceEqual(data.Take(8))) throw new InvalidDataException("Not a CFB file");
    ushort major = U16(0x1a);
    sectorSize = 1 << U16(0x1e);
    miniSectorSize = 1 << U16(0x20);
    miniCutoff = U32(0x38);
    BuildFat();
    BuildDirectory(major);
    BuildMiniFat();
    DirectoryEntry root = entries.FirstOrDefault(e => e.Type == 5);
    if (root != null && root.Size > 0) miniStream = ReadRegularStream(root.Start, root.Size);
  }

  public List<StreamRecord> GetStreams() {
    var result = new List<StreamRecord>();
    DirectoryEntry root = entries.FirstOrDefault(e => e.Type == 5);
    if (root != null && root.Child != FREE) WalkTree(root.Child, "", result, new HashSet<uint>());
    return result;
  }

  private ushort U16(int offset) { return BitConverter.ToUInt16(data, offset); }
  private uint U32(int offset) { return BitConverter.ToUInt32(data, offset); }
  private ulong U64(byte[] source, int offset) { return BitConverter.ToUInt64(source, offset); }

  private byte[] Sector(uint id) {
    long offset = ((long)id + 1L) * sectorSize;
    if (id >= 0xfffffffa || offset < 0 || offset + sectorSize > data.LongLength) throw new InvalidDataException("Invalid sector " + id);
    byte[] value = new byte[sectorSize];
    Buffer.BlockCopy(data, (int)offset, value, 0, sectorSize);
    return value;
  }

  private void BuildFat() {
    uint fatCount = U32(0x2c);
    var fatSectors = new List<uint>();
    for (int i = 0; i < 109 && fatSectors.Count < fatCount; i++) {
      uint sid = U32(0x4c + i * 4);
      if (sid != FREE) fatSectors.Add(sid);
    }
    uint difat = U32(0x44);
    uint difatCount = U32(0x48);
    for (uint n = 0; n < difatCount && difat != END && difat != FREE; n++) {
      byte[] sec = Sector(difat);
      int slots = sectorSize / 4 - 1;
      for (int i = 0; i < slots && fatSectors.Count < fatCount; i++) {
        uint sid = BitConverter.ToUInt32(sec, i * 4);
        if (sid != FREE) fatSectors.Add(sid);
      }
      difat = BitConverter.ToUInt32(sec, sectorSize - 4);
    }
    if (fatSectors.Count != fatCount) throw new InvalidDataException("FAT sector count mismatch");
    foreach (uint sid in fatSectors) {
      byte[] sec = Sector(sid);
      for (int i = 0; i < sec.Length; i += 4) fat.Add(BitConverter.ToUInt32(sec, i));
    }
  }

  private List<uint> Chain(uint start, IList<uint> table) {
    var chain = new List<uint>();
    var seen = new HashSet<uint>();
    uint current = start;
    while (current != END && current != FREE) {
      if (current == FATSECT || current == DIFSECT || current >= table.Count || !seen.Add(current)) throw new InvalidDataException("Invalid or cyclic chain");
      chain.Add(current);
      current = table[(int)current];
    }
    return chain;
  }

  private byte[] ReadChain(uint start, IList<uint> table, Func<uint,byte[]> readSector) {
    using (var output = new MemoryStream()) {
      foreach (uint sid in Chain(start, table)) {
        byte[] sec = readSector(sid);
        output.Write(sec, 0, sec.Length);
      }
      return output.ToArray();
    }
  }

  private byte[] Trim(byte[] bytes, ulong size) {
    int length = checked((int)Math.Min((ulong)bytes.LongLength, size));
    byte[] result = new byte[length];
    Buffer.BlockCopy(bytes, 0, result, 0, length);
    return result;
  }

  private byte[] ReadRegularStream(uint start, ulong size) { return Trim(ReadChain(start, fat, Sector), size); }

  private void BuildDirectory(ushort major) {
    byte[] directory = ReadChain(U32(0x30), fat, Sector);
    for (int offset = 0, id = 0; offset + 128 <= directory.Length; offset += 128, id++) {
      ushort nameLength = BitConverter.ToUInt16(directory, offset + 0x40);
      string name = nameLength >= 2 && nameLength <= 64 ? Encoding.Unicode.GetString(directory, offset, nameLength - 2) : "";
      byte type = directory[offset + 0x42];
      ulong size = U64(directory, offset + 0x78);
      if (major == 3) size &= 0xffffffffUL;
      entries.Add(new DirectoryEntry {
        Id=id, Name=name, Type=type,
        Left=BitConverter.ToUInt32(directory, offset + 0x44),
        Right=BitConverter.ToUInt32(directory, offset + 0x48),
        Child=BitConverter.ToUInt32(directory, offset + 0x4c),
        Start=BitConverter.ToUInt32(directory, offset + 0x74), Size=size
      });
    }
  }

  private void BuildMiniFat() {
    uint start = U32(0x3c);
    uint count = U32(0x40);
    if (count == 0 || start == END || start == FREE) return;
    byte[] bytes = ReadChain(start, fat, Sector);
    int expected = checked((int)Math.Min((ulong)bytes.LongLength, (ulong)count * (ulong)sectorSize));
    for (int i = 0; i + 4 <= expected; i += 4) miniFat.Add(BitConverter.ToUInt32(bytes, i));
  }

  private byte[] ReadStream(DirectoryEntry entry) {
    if (entry.Size == 0) return new byte[0];
    if (entry.Size >= miniCutoff) return ReadRegularStream(entry.Start, entry.Size);
    if (miniStream.Length == 0 || miniFat.Count == 0) throw new InvalidDataException("Missing mini stream");
    byte[] all = ReadChain(entry.Start, miniFat, sid => {
      long offset = (long)sid * miniSectorSize;
      if (offset < 0 || offset + miniSectorSize > miniStream.LongLength) throw new InvalidDataException("Invalid mini sector");
      byte[] sec = new byte[miniSectorSize];
      Buffer.BlockCopy(miniStream, (int)offset, sec, 0, miniSectorSize);
      return sec;
    });
    return Trim(all, entry.Size);
  }

  private void WalkTree(uint id, string parent, List<StreamRecord> output, HashSet<uint> pathSeen) {
    if (id == FREE || id >= entries.Count || !pathSeen.Add(id)) return;
    DirectoryEntry entry = entries[(int)id];
    WalkTree(entry.Left, parent, output, pathSeen);
    string current = string.IsNullOrEmpty(parent) ? entry.Name : parent + "/" + entry.Name;
    if (entry.Type == 2) output.Add(new StreamRecord { Path=current, Name=entry.Name, Data=ReadStream(entry) });
    if ((entry.Type == 1 || entry.Type == 5) && entry.Child != FREE) WalkTree(entry.Child, current, output, pathSeen);
    WalkTree(entry.Right, parent, output, pathSeen);
  }
}
'@

function Get-Sha256([string]$Path) { (Get-FileHash -Algorithm SHA256 -LiteralPath $Path).Hash.ToLowerInvariant() }
function To-Relative([string]$Path) { $Path.Substring($projectRoot.Length + 1).Replace('\','/') }
function Write-JsonLines([string]$Path, [object[]]$Rows) {
  [IO.File]::WriteAllLines($Path, @($Rows | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 20 }), [Text.UTF8Encoding]::new($false))
}

$mappedRows = @([IO.File]::ReadAllLines($objectMapPath, [Text.Encoding]::UTF8) | ForEach-Object { $_ | ConvertFrom-Json })
$examFiles = @(Get-ChildItem -LiteralPath $sourceRoot -File -Filter 'exam-*.doc' | Sort-Object Name)
if ($ReverseInput) { [array]::Reverse($examFiles) }
$records = New-Object System.Collections.Generic.List[object]

foreach ($file in $examFiles) {
  $docSha = Get-Sha256 $file.FullName
  $expected = @($mappedRows | Where-Object sourceDocumentSha256 -eq $docSha | Sort-Object priorObjectIndex)
  $reader = [MathupCompoundFileReader]::new([IO.File]::ReadAllBytes($file.FullName))
  $allStreams = @($reader.GetStreams())
  $nativeStreams = @($allStreams | Where-Object Name -eq 'Equation Native')
  if ($nativeStreams.Count -ne $expected.Count) {
    throw "Equation Native count mismatch for $($file.Name): streams=$($nativeStreams.Count), mapped=$($expected.Count)"
  }
  foreach ($mapped in $expected) {
    $storagePath = $mapped.oleStorageRoot
    $stream = @($nativeStreams | Where-Object Path -eq ($storagePath + '/Equation Native'))
    if ($stream.Count -ne 1) { throw "Missing or duplicate mapped Equation Native stream $storagePath for $($mapped.objectId)" }
    $stream = $stream[0]
    $storageStreams = @($allStreams | Where-Object { $_.Path.StartsWith($storagePath + '/', [StringComparison]::Ordinal) })
    $objectDir = Join-Path $outputRootPath $mapped.objectId
    New-Item -ItemType Directory -Force -Path $objectDir | Out-Null
    $nativePath = Join-Path $objectDir 'equation-native.bin'
    [IO.File]::WriteAllBytes($nativePath, $stream.Data)
    $headerSize = if ($stream.Data.Length -ge 28) { [BitConverter]::ToUInt16($stream.Data, 0) } else { 0 }
    $mtefOffset = if ($headerSize -ge 28 -and $headerSize -lt $stream.Data.Length) { [int]$headerSize } else { 28 }
    if ($mtefOffset -gt $stream.Data.Length) { $mtefOffset = $stream.Data.Length }
    $mtef = New-Object byte[] ($stream.Data.Length - $mtefOffset)
    if ($mtef.Length) { [Array]::Copy($stream.Data, $mtefOffset, $mtef, 0, $mtef.Length) }
    $mtefPath = Join-Path $objectDir 'mtef-v3.bin'
    [IO.File]::WriteAllBytes($mtefPath, $mtef)
    $presentationEvidence = New-Object System.Collections.Generic.List[object]
    foreach ($related in $storageStreams) {
      if ($related.Name -eq 'Equation Native') { continue }
      $safeName = (($related.Name.ToCharArray() | ForEach-Object {
        $code = [int]$_
        if ($code -lt 32) { '_x{0:x2}_' -f $code } elseif ($_ -match '[\\/:*?"<>|]') { '_' } else { [string]$_ }
      }) -join '')
      $evidencePath = Join-Path $objectDir ('storage-' + $safeName + '.bin')
      [IO.File]::WriteAllBytes($evidencePath, $related.Data)
      $presentationEvidence.Add([pscustomobject][ordered]@{
        name = $related.Name
        path = To-Relative $evidencePath
        sha256 = Get-Sha256 $evidencePath
        bytes = [long]$related.Data.Length
      })
    }
    $records.Add([pscustomobject][ordered]@{
      schemaVersion = 'mathup.equation3-native-evidence.v1'
      objectId = $mapped.objectId
      documentId = $mapped.documentId
      sourceDocumentSha256 = $docSha
      sourcePath = $mapped.sourcePath
      exerciseLinkPending = $false
      priorObjectIndex = [int]$mapped.priorObjectIndex
      priorRangeStart = [int]$mapped.priorRangeStart
      priorRangeEnd = [int]$mapped.priorRangeEnd
      fieldStartCp = [int]$mapped.fieldStartCp
      fieldSeparatorCp = [int]$mapped.fieldSeparatorCp
      fieldEndCp = [int]$mapped.fieldEndCp
      fieldInstruction = $mapped.fieldInstruction
      sprmCPicLocation = [long]$mapped.sprmCPicLocation
      mappingEvidence = $mapped.mappingEvidence
      oleStoragePath = $stream.Path
      oleStorageRoot = $storagePath
      storageEvidence = @($presentationEvidence | ForEach-Object { $_ })
      nativeStreamName = $stream.Name
      nativePath = To-Relative $nativePath
      nativeSha256 = Get-Sha256 $nativePath
      nativeBytes = [long]$stream.Data.Length
      eqnOleHeaderSize = $headerSize
      mtefPath = To-Relative $mtefPath
      mtefSha256 = Get-Sha256 $mtefPath
      mtefBytes = [long]$mtef.Length
      mtefVersionByte = if ($mtef.Length) { [int]$mtef[0] } else { $null }
      emfPath = $mapped.emfPath
      emfSha256 = $mapped.emfSha256
      pngPath = $mapped.pngPath
      pngSha256 = $mapped.pngSha256
      sourceMutated = $false
    })
  }
}

$rows = @($records | Sort-Object objectId)
$registryPath = Join-Path $outputRootPath 'native-stream-registry.jsonl'
Write-JsonLines $registryPath $rows
[pscustomobject][ordered]@{
  documents = $examFiles.Count
  objects = $rows.Count
  equationNativeStreams = @($rows | Where-Object nativeBytes -gt 0).Count
  uniqueObjectIds = @($rows.objectId | Sort-Object -Unique).Count
  exactDocumentMappings = @($rows | Where-Object exerciseLinkPending -eq $false).Count
  mtefVersionCounts = @($rows | Group-Object mtefVersionByte | ForEach-Object { [pscustomobject]@{version=$_.Name;count=$_.Count} })
  output = To-Relative $registryPath
} | ConvertTo-Json -Depth 10
