param([string]$RunName='run-a')
$ErrorActionPreference='Stop'
$root=(Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$artifactRoot=Join-Path $root 'artifacts\andalucia-ccssii-2012-doc'
$runRoot=Join-Path $artifactRoot "runs\$RunName"
$outRoot=Join-Path $artifactRoot 'comparison-corpus'
New-Item -ItemType Directory -Force -Path $outRoot|Out-Null
function Read-Jsonl([string]$Path){@([IO.File]::ReadAllLines($Path,[Text.Encoding]::UTF8)|ForEach-Object{$_|ConvertFrom-Json})}
$ex=Read-Jsonl (Join-Path $runRoot 'recovered-exercises.jsonl')
$objects=Read-Jsonl (Join-Path $runRoot 'document-objects.jsonl')
$objectMap=@{};foreach($o in $objects){$objectMap[$o.objectId]=$o}
$rows=@()
foreach($e in $ex){
  $rendered=@()
  foreach($b in $e.learnerBlocks){
    if($b.type -eq 'text'){$rendered+=[ordered]@{type='text';text=$b.text}}
    else{$o=$objectMap[$b.objectId];$rendered+=[ordered]@{type='equation-image';objectId=$b.objectId;src=('../'+$o.pngPreviewPath.Substring('artifacts/andalucia-ccssii-2012-doc/'.Length));emfSha256=$o.emfSha256}}
  }
  $rows+=[ordered]@{
    documentExerciseId=$e.documentExerciseId;model=$e.model;option=$e.option;exerciseNumber=$e.exerciseNumber
    sourcePath=$e.traceability.sourcePath;sourceSha256=$e.sourceDocumentSha256;sourceRange=@($e.traceability.rangeStart,$e.traceability.rangeEnd)
    extractedBlocks=$rendered;canonicalStructure=[ordered]@{subparts=$e.subparts;scoreEvidence=$e.scoreEvidence;criteriaEvidence=$e.criteriaEvidence}
    comparisonStatus='READY_FOR_DOCUMENT_COMPARISON';visualCertification='NOT_PERFORMED'
  }
}
$jsonl=@($rows|ForEach-Object{$_|ConvertTo-Json -Compress -Depth 30})
[IO.File]::WriteAllLines((Join-Path $outRoot 'comparison-corpus.jsonl'),$jsonl,[Text.UTF8Encoding]::new($false))
$data=$rows|ConvertTo-Json -Compress -Depth 30
$html=@"
<!doctype html><html lang="es"><head><meta charset="utf-8"><title>CCSS II Andalucía 2012 · comparación documental</title>
<style>body{font:16px system-ui;margin:24px;background:#f4f7fb;color:#10214b}.case{background:white;border:1px solid #cbd7ec;border-radius:14px;padding:20px;margin:18px 0}.meta{font-size:13px;color:#52658c}.content{white-space:pre-wrap;line-height:1.55}.eq{display:block;max-width:100%;height:auto;margin:10px auto;border:1px dashed #cbd7ec;background:white}.scores{font-size:13px;color:#76520a}</style></head><body><h1>DOC original → extracción fiel → estructura canónica paralela</h1><p>Corpus aislado. Las ecuaciones son vistas derivadas de los metarchivos vectoriales originales; no contienen OCR ni reconstrucción.</p><main id="app"></main><script>
const rows=$data;const app=document.getElementById('app');for(const r of rows){const el=document.createElement('section');el.className='case';const h=document.createElement('h2');h.textContent='Modelo '+r.model+' · Opción '+r.option+' · Ejercicio '+r.exerciseNumber;el.append(h);const m=document.createElement('div');m.className='meta';m.textContent=r.documentExerciseId+' · '+r.sourcePath+' · rango '+r.sourceRange.join('–');el.append(m);const c=document.createElement('div');c.className='content';el.append(c);for(const b of r.extractedBlocks){if(b.type==='text'){c.append(document.createTextNode(b.text))}else{const i=document.createElement('img');i.className='eq';i.src=b.src;i.alt='Objeto matemático original '+b.objectId;c.append(i)}}const s=document.createElement('div');s.className='scores';s.textContent='Puntuaciones separadas: '+(r.canonicalStructure.scoreEvidence.map(x=>x.literal).join(', ')||'ninguna explícita')+' · apartados: '+(r.canonicalStructure.subparts.map(x=>x.label+')').join(', ')||'sin apartados');el.append(s);app.append(el)}
</script></body></html>
"@
[IO.File]::WriteAllText((Join-Path $outRoot 'index.html'),$html,[Text.UTF8Encoding]::new($false))
[pscustomobject]@{cases=$rows.Count;output=('artifacts/andalucia-ccssii-2012-doc/comparison-corpus/index.html')}|ConvertTo-Json
