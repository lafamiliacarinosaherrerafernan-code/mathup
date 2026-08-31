// The institutional page explicitly labels rows and columns; no label is inferred.
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {coffeeMatrixAnchor} from './andalucia-matrix-coffee-pdf-evidence.mjs';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {T,mul,add,matrix} from './resolve-andalucia-matrix-order-three.mjs';
export const cases=[{index:161,M:[[0,3,-1],[1,0,-2]],Nt:[[2,3,-1],[-1,1,0]],P:[[550,400,240],[260,200,100]],Qc:[[220,275,250],[320,390,360]],literals:['industrial cafetero','natural y descafeinado','significado económico']}];
export const coffeeLabels={schemaVersion:'mathup.labeled-matrix-pair.v1',matrices:[
 {label:'P',rowHeaders:['natural','descafeinado'],columnHeaders:['A','B','C'],values:[[550,400,240],[260,200,100]],unit:'kg'},
 {label:'Q',rowHeaders:['natural','descafeinado'],columnHeaders:['A','B','C'],values:[[2.20,2.75,2.50],[3.20,3.90,3.60]],unit:'€/kg'},
]};
export function solve(c,text){const p=officialParts(text),mk=(i,a,w,why,s,e)=>part(p[i],a,w,why,s,'INDEPENDENT_DIMENSIONS_AND_INTEGER_CENT_REVENUES',e),{M,Nt,P,Qc}=c,N=T(Nt),sum=add(M,Nt),MN=mul(M,N),wrongSum=add(M,Nt,-1),wrongMN=mul(N,M);
 const describe=(S,product,middle='no definida')=>`M+Nᵗ=${matrix(S)}; MᵗN: ${middle}; MN=${matrix(product)}.`;
 const a=mk(0,describe(sum,MN),[describe(wrongSum,MN),describe(sum,wrongMN),describe(sum,MN,'definida')],['Restar Nᵗ en vez de sumarla.','Cambiar MN por NM, alterando orden y dimensión.','Ignorar que las dimensiones interiores de Mᵗ y N son distintas.'],[
  ['Identificamos las dimensiones antes de operar y recuperamos N transponiendo la matriz dada.','M:2×3; Nᵗ:2×3; N:3×2'],
  ['La suma está definida porque sus dos matrices tienen idéntica dimensión. Sumamos entrada a entrada.',`M+Nᵗ=${matrix(sum)}`],
  ['La matriz M transpuesta es 3×2 y N también es 3×2; para multiplicar deberían coincidir 2 y 3.','MᵗN no está definida: 2≠3'],
  ['En cambio MN es un producto 2×3 por 3×2, cuyo resultado tiene dos filas y dos columnas.',`N=${matrix(N)}`],
  ['Calculamos la primera fila mediante productos escalares con las columnas de N.','(MN)₁₁=0·2+3·3+(−1)(−1)=10; (MN)₁₂=0·(−1)+3·1+(−1)·0=3'],
  ['Calculamos la segunda fila con el mismo orden.','(MN)₂₁=1·2+0·3+(−2)(−1)=4; (MN)₂₂=1·(−1)+0·1+(−2)·0=−1'],
  ['Reunimos los cuatro resultados y contrastamos la dimensión final.',`MN=${matrix(MN)}:2×2`],
 ],{M,Nt,N,sum,MN,wrongSum,wrongMN});
 const cents=mul(P,T(Qc)),R=cents.map(r=>r.map(x=>x/100)),swapped=T(R),ignored=mul(P,T(Qc.map(r=>r.map(x=>Math.trunc(x/100))))),desc=(X,flip=false)=>`PQᵗ=${matrix(X)}; ingresos natural: ${flip?X[1][1]:X[0][0]} €; descafeinado: ${flip?X[0][0]:X[1][1]} €.`;
 const b=mk(1,desc(R),[desc(swapped),desc(ignored),desc(R,true)],['Intercambiar el producto por QPᵗ, que transpone las entradas no diagonales.','Truncar los precios a euros enteros antes de calcular.','Intercambiar el significado económico de las dos filas.'],[
  ['Las filas de P y Q corresponden a natural y descafeinado; las columnas A, B y C identifican las modalidades.','P: cantidades en kg; Q: precios en €/kg'],
  ['Transponemos Q para poder sumar cantidad por precio a lo largo de las tres modalidades.','P:2×3; Qᵗ:3×2 ⇒ PQᵗ:2×2'],
  ['La primera diagonal combina los kilos y los precios del café natural en sus tres modalidades.','R₁₁=550·2.20+400·2.75+240·2.50=2910 €'],
  ['La segunda diagonal usa los kilos y precios propios del descafeinado.','R₂₂=260·3.20+200·3.90+100·3.60=1972 €'],
  ['Las entradas no diagonales aplican precios de un tipo a cantidades del otro; no representan sus ingresos reales.','R₁₂=550·3.20+400·3.90+240·3.60=4184'],
  ['Completamos la otra entrada no diagonal respetando el orden.','R₂₁=260·2.20+200·2.75+100·2.50=1372'],
  ['Ordenamos los resultados según las filas de cantidades y columnas de precios.',`PQᵗ=${matrix(R)}`],
  ['Los ingresos del natural son 2910 € y los del descafeinado 1972 €. Como comprobación exacta operamos con precios en céntimos.','diagonal en céntimos: 291000 y 197200'],
 ],{P,Qc,cents,R,swapped,ignored,labels:coffeeLabels});
 return[a,b];
}
export function buildCoffeeBatch(id='batch-0363',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Dimensiones matriciales','Aplicaciones económicas','Matrices con etiquetas'];x.block='Álgebra';x.examSlot=1;x.statementLayout={...coffeeLabels,anchor:coffeeMatrixAnchor,partId:'b'};x.qualityGates.pedagogical='DIMENSIONS_ROW_COLUMN_PRODUCTS_AND_ECONOMIC_DIAGONALS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildCoffeeBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0363-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0363.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records[0].parts.length}));}
