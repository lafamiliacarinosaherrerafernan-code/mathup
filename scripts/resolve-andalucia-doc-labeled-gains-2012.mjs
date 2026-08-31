// Resolve the official, human-validated F/G layout without changing that evidence.
import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {T,mul,matrix} from './resolve-andalucia-matrix-order-three.mjs';
import {nativeSourceEvidence} from './resolve-andalucia-doc-derivatives-2012.mjs';
export const cases=[{index:20,literals:['tres artículos diferentes','grande y normal','ganancia total'],F:[[100,150,80],[200,250,140]],G:[[6,8,5],[4,5,3]]}];
export const layoutPath='artifacts/equation3-human-validation-final/abcabc-layout-reconstruction.json';
export function approvedGainsLayout(){const x=JSON.parse(fs.readFileSync(layoutPath,'utf8'));
 assert.equal(x.status,'DOCUMENT_LAYOUT_HUMAN_VALIDATED');assert.equal(x.reconstructionSha256,'f152e84ef8985c54ad42b77818407b9038fdbc25d6b2fbae6a6e6c75a21beac7');
 assert.deepEqual(x.items.map(m=>m.matrix.map(r=>r.map(Number))),[cases[0].F,cases[0].G]);
 for(const m of x.items)assert.deepEqual(m.columnHeaders,['A','B','C']);
 return x;
}
export function solve(c,text){const p=officialParts(text);assert.equal(p.length,3);const mk=(i,a,w,why,s,e)=>part(p[i],a,w,why,s,'INDEPENDENT_ENTRYWISE_SALES_TIMES_UNIT_GAIN',e),{F,G}=c,U=mul(T(F),G),V=mul(F,T(G));
 const pair=(a,b)=>`FᵗG=${matrix(a)}; FGᵗ=${matrix(b)}.`;
 const a=mk(0,pair(U,V),[pair(T(U),V),pair(U,T(V)),pair(U.map(r=>r.map(x=>2*x)),V)],['Cambiar FᵗG por GᵗF, que transpone las entradas no diagonales.','Cambiar FGᵗ por GFᵗ.','Contar dos veces cada contribución en el primer producto.'],[
  ['Las filas de F y G identifican grande y normal; sus columnas identifican los artículos A, B y C.','F:2×3; G:2×3'],
  ['Transponemos F. El primer producto tendrá tres filas y tres columnas.','FᵗG:(3×2)·(2×3) ⇒ 3×3'],
  ['Cada entrada suma las dos contribuciones de formato. Calculamos la primera fila.','U₁₁=100·6+200·4=1400; U₁₂=100·8+200·5=1800; U₁₃=100·5+200·3=1100'],
  ['La segunda fila utiliza las cantidades del artículo B.','U₂₁=150·6+250·4=1900; U₂₂=150·8+250·5=2450; U₂₃=150·5+250·3=1500'],
  ['La tercera fila utiliza las cantidades del artículo C.','U₃₁=80·6+140·4=1040; U₃₂=80·8+140·5=1340; U₃₃=80·5+140·3=820'],
  ['Reunimos las entradas del primer producto.',`FᵗG=${matrix(U)}`],
  ['El segundo producto suma los tres artículos por pareja de formatos.','FGᵗ:(2×3)·(3×2) ⇒ 2×2'],
  ['Calculamos las dos entradas de la primera fila.','V₁₁=100·6+150·8+80·5=2200; V₁₂=100·4+150·5+80·3=1390'],
  ['Calculamos las dos de la segunda fila.','V₂₁=200·6+250·8+140·5=3900; V₂₂=200·4+250·5+140·3=2470'],
  ['Reunimos el segundo producto y comprobamos sus dimensiones.',`FGᵗ=${matrix(V)}:2×2`],
 ],{F,G,U,V});
 const article=(v,label='FᵗG')=>`${label}: A=${v[0]} €; B=${v[1]} €; C=${v[2]} €.`;
 const b=mk(1,article([1400,2450,820]),[article([1400,1800,1100]),article([1400,1900,1040]),article([600,1200,400])],['Tomar toda la primera fila en lugar de la diagonal.','Tomar la primera columna en lugar de la diagonal.','Omitir las ventas en formato normal.'],[
  ['Para cada artículo sumamos cantidad vendida por ganancia unitaria en los dos formatos.','ganancia del artículo j=F₁ⱼG₁ⱼ+F₂ⱼG₂ⱼ'],
  ['Esta suma coincide con la entrada j,j del primer producto.','ganancia del artículo j=(FᵗG)ⱼⱼ'],
  ['Aplicamos la expresión al artículo A.','100·6+200·4=1400 €'],
  ['Aplicamos la expresión al artículo B.','150·8+250·5=2450 €'],
  ['Aplicamos la expresión al artículo C.','80·5+140·3=820 €'],
  ['Las entradas no diagonales mezclan cantidades de un artículo y ganancias unitarias de otro. Por eso no sirven para esta pregunta.','diagonal de FᵗG: 1400, 2450, 820'],
  ['Verificamos el total sumando las tres ganancias efectivas.','1400+2450+820=4670 €'],
 ],{F,G,articleGains:[1400,2450,820],total:4670});
 const format=(v,total)=>`FGᵗ: grande=${v[0]} €; normal=${v[1]} €; total=${total} €.`;
 const d=mk(2,format([2200,2470],4670),[format([3590,6370],9960),format([1390,3900],5290),format([2470,2200],4670)],['Sumar las filas, incluyendo productos cruzados de formatos.','Usar las entradas no diagonales.','Intercambiar grande y normal sin cambiar sus etiquetas.'],[
  ['Ahora fijamos un formato y sumamos las ganancias de sus tres artículos.','ganancia del formato i=Fᵢ₁Gᵢ₁+Fᵢ₂Gᵢ₂+Fᵢ₃Gᵢ₃'],
  ['La expresión corresponde a la diagonal del segundo producto.','ganancia del formato i=(FGᵗ)ᵢᵢ'],
  ['La primera fila representa el formato grande.','100·6+150·8+80·5=2200 €'],
  ['La segunda fila representa el formato normal.','200·4+250·5+140·3=2470 €'],
  ['Sumamos ambos formatos para obtener la ganancia total de la empresa.','2200+2470=4670 €'],
  ['Comprobamos de forma independiente que agrupar por artículos da exactamente la misma suma de seis productos.','1400+2450+820=4670 €'],
 ],{F,G,formatGains:[2200,2470],total:4670});
 return[a,b,d];}
export function buildLabeledGainsBatch(id='batch-0364',selected=cases){const layout=approvedGainsLayout(),r=buildBatch(selected,id,solve,(_c,x)=>({nativeSourceEvidence:nativeSourceEvidence(x.exerciseId),layoutSha256:layout.reconstructionSha256,parts:x.parts.map(p=>p.verification)}));
 for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Productos matriciales','Aplicaciones económicas','Matrices con etiquetas'];x.block='Álgebra';x.examSlot=1;x.statementLayoutEvidence={path:layoutPath,reconstructionSha256:layout.reconstructionSha256,status:layout.status};x.qualityGates.pedagogical='ENTRYWISE_PRODUCTS_AND_DISTINCT_ARTICLE_FORMAT_DIAGONALS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildLabeledGainsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0364-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0364.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records[0].parts.length}));}
