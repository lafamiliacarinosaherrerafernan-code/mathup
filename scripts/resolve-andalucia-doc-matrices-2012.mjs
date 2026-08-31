// Source-bound 2012 exercises. No inferred entries or reused historical answers.
import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts} from './resolve-andalucia-inference-multipart.mjs';
import {nativeSourceEvidence} from './resolve-andalucia-doc-derivatives-2012.mjs';
export const cases=[
 {index:1,literals:['9 unidades de A y 5 de B','3 de A y 7 de B','4 de A y 6 de B','una unidad más','el primer cliente no compró nada','80 y 100 euros']},
 {index:5,literals:['A^{2}⋅X=A−B⋅C','1 & 1 \\\\ 0 & 2','1 & 0 & 1 \\\\ −1 & 1 & 4','−1 & 0 \\\\ −1 & 1 \\\\ 2 & 0']},
];
export function projectNativeMatrices(text){const changes=[];const projected=text.replace(/\\left\(\\begin\{matrix\}([\s\S]*?)\\end\{matrix\}\\right\)/g,(before,body,offset)=>{
 const rows=body.split(/\\\\/).map(r=>r.split('&').map(v=>v.trim()));
 assert.ok(rows.length&&rows.every(r=>r.length===rows[0].length&&r.every(v=>/^(?:[−-]?\d+|[a-zA-Z])$/.test(v))),'Only complete native integer or single-identifier matrices');
 const after='[['+rows.map(r=>r.join(',')).join('],[')+']]';changes.push({offset,before,after,rule:'NATIVE_ROUND_ATOMIC_MATRIX_TO_RENDERER_ROUND_MATRIX'});return after;
});return{text:projected,changes};}
export function solve(c,text){
 const pp=c.index===5?[{id:'whole',prompt:projectNativeMatrices(text).text}]:officialParts(text);
 const mk=(i,a,w,why,s,e)=>part(pp[i],a,w,why,s,'INDEPENDENT_MATRIX_PRODUCTS_AND_SOURCE_ACCOUNTING',e);
 if(c.index===1){
 const E=[[9,5],[3,7],[4,6]],F=[[18,10],[6,14],[5,7]],M=[[0,0],[6,14],[5,7]],T=[[27,15],[15,35],[14,20]];
 const format=(E,F,M)=>`Filas: clientes 1, 2 y 3; columnas: A y B. Enero=${JSON.stringify(E)}; Febrero=${JSON.stringify(F)}; Marzo=${JSON.stringify(M)}.`;
 return [
 mk(0,format(E,F,M),[
  format(E,[[18,10],[6,14],[8,12]],[[0,0],[6,14],[8,12]]),
  format(E,F,[[18,10],[6,14],[5,7]]),
  format([[5,9],[7,3],[6,4]],[[10,18],[14,6],[7,5]],[[0,0],[14,6],[7,5]])
 ],['Duplicar también las compras del tercer cliente en vez de añadir una unidad.','Ignorar que el primer cliente no compra en marzo.','Intercambiar columnas sin cambiar su identificación A y B.'],[
 ['Fijamos las filas en el orden de los tres clientes y las columnas en el orden de los productos A y B.','Orden de cada matriz: 3×2'],
 ['Cada fila de enero contiene las dos cantidades del cliente correspondiente.','E=[[9,5],[3,7],[4,6]]'],
 ['En febrero se duplican únicamente las filas de los dos primeros clientes.','2·[9,5]=[18,10]; 2·[3,7]=[6,14]'],
 ['Al tercer cliente se le añade una unidad de cada producto; no se multiplica su fila por dos.','[4+1,6+1]=[5,7]; F=[[18,10],[6,14],[5,7]]'],
 ['En marzo la primera fila es cero y las otras dos se conservan respecto a febrero.','M=[[0,0],[6,14],[5,7]]'],
 ['Comprobamos las tres reglas del texto y mantenemos la misma interpretación de todas las filas y columnas.','E: enero; F: febrero; M: marzo; todas 3×2'],
 ],{E,F,M}),
 mk(1,'T=[[27,15],[15,35],[14,20]]',[
  'T=[[27,15],[9,21],[9,13]]','T=[[27,15],[9,21],[12,18]]','T=[[27,15],[15,35],[20,30]]'
 ],['Sumar enero y febrero, omitiendo marzo.','Multiplicar enero por tres, suponiendo compras constantes.','Arrastrar la duplicación incorrecta de las compras del tercer cliente.'],[
 ['El total trimestral se obtiene sumando matrices del mismo orden, entrada a entrada.','T=E+F+M'],
 ['Sumamos las compras de A y B del primer cliente.','[9+18+0,5+10+0]=[27,15]'],
 ['Sumamos las compras del segundo cliente.','[3+6+6,7+14+14]=[15,35]'],
 ['Sumamos las compras del tercero, que aumentó una unidad en febrero y las mantuvo en marzo.','[4+5+5,6+7+7]=[14,20]'],
 ['Reunimos las filas respetando la identificación original.','T=[[27,15],[15,35],[14,20]]'],
 ['Verificamos por productos: A suma 16+29+11 y B suma 18+31+21 durante los tres meses.','Total A=56=27+15+14; total B=70=15+35+20'],
 ],{T,wrong:[[[27,15],[9,21],[9,13]],[[27,15],[9,21],[12,18]],[[27,15],[15,35],[20,30]]]}),
 mk(2,'Clientes: 3660, 4700 y 3120 euros; total: 11480 euros.',[
  'Clientes: 3900, 4300 y 3000 euros; total: 11200 euros.',
  'Clientes: 3660, 2820 y 2020 euros; total: 8500 euros.',
  'Clientes: 42, 50 y 34 euros; total: 126 euros.'
 ],['Intercambiar los precios de A y B.','Facturar solo enero y febrero.','Sumar unidades y confundirlas con importes monetarios.'],[
 ['El vector de precios debe seguir el mismo orden A, B de las columnas de T.','p=[[80],[100]] euros/unidad'],
 ['Multiplicamos cantidades trimestrales por precios para obtener una columna de importes por cliente.','I=T·p; (3×2)(2×1)→3×1'],
 ['Calculamos el importe del primer cliente.','27·80+15·100=2160+1500=3660 euros'],
 ['Calculamos el importe del segundo cliente.','15·80+35·100=1200+3500=4700 euros'],
 ['Calculamos el importe del tercer cliente.','14·80+20·100=1120+2000=3120 euros'],
 ['Sumamos los tres importes para obtener la facturación del trimestre.','3660+4700+3120=11480 euros'],
 ['Comprobamos independientemente facturando el total vendido de cada producto.','56·80+70·100=4480+7000=11480 euros'],
 ],{prices:[80,100],invoices:[3660,4700,3120],total:11480,wrong:[[3900,4300,3000,11200],[3660,2820,2020,8500],[42,50,34,126]]})];
 }
 assert.equal(c.index,5);
 const p=mk(0,'X=[[6,frac{1}{4}],[-2,frac{1}{4}]]',[
 'X=[[4,frac{1}{2}],[-4,frac{1}{2}]]',
 'X=[[0,frac{1}{4}],[-8,frac{25}{4}]]',
 'X=[[-4,-frac{5}{4}],[2,frac{3}{4}]]'
 ],['Usar la inversa de A en vez de la inversa de A².','Multiplicar por la inversa a la derecha, cambiando el orden.','Sumar BC en el segundo miembro en lugar de restarlo.'],[
 ['Comprobamos dimensiones: BC es 2×2 y puede restarse de A; la incógnita X también es 2×2.','A:2×2; B:2×3; C:3×2'],
 ['Calculamos el cuadrado por producto matricial, no elevando cada entrada al cuadrado.','A²=[[1·1+1·0,1·1+1·2],[0·1+2·0,0·1+2·2]]=[[1,3],[0,4]]'],
 ['Multiplicamos cada fila de B por cada columna de C.','BC=[[−1+0+2,0+0+0],[1−1+8,0+1+0]]=[[1,0],[8,1]]'],
 ['Restamos entrada a entrada y conservamos el orden de la ecuación.','A−BC=[[0,1],[-8,1]]'],
 ['El determinante de A² es cuatro, distinto de cero; la solución es única.','det(A²)=1·4−3·0=4'],
 ['Despejamos multiplicando a la izquierda por la inversa.','(A²)⁻¹=[[1,-frac{3}{4}],[0,frac{1}{4}]]; X=(A²)⁻¹(A−BC)'],
 ['Calculamos las cuatro entradas del producto.','X=[[0+6,1−frac{3}{4}],[−2,frac{1}{4}]]=[[6,frac{1}{4}],[-2,frac{1}{4}]]'],
 ['Verificamos sustituyendo X en el primer miembro de la ecuación original.','A²X=[[6−6,frac{1}{4}+frac{3}{4}],[−8,1]]=[[0,1],[-8,1]]=A−BC'],
 ],{A:[[1,1],[0,2]],B:[[1,0,1],[-1,1,4]],C:[[-1,0],[-1,1],[2,0]],X:[[6,.25],[-2,.25]],wrong:[[[4,.5],[-4,.5]],[[0,.25],[-8,6.25]],[[-4,-1.25],[2,.75]]]});
 const projection=projectNativeMatrices(text);p.promptRepresentationEvidence={original:text,projected:projection.text,changes:projection.changes,mathematicalChange:false};return[p];
}
export function buildDocMatricesBatch(id='batch-0356',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({nativeSourceEvidence:nativeSourceEvidence(x.exerciseId),parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){if(!x.sourceSubparts.length)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.primaryTopic='Matrices';x.secondaryTopics=['Productos matriciales','Ecuaciones matriciales'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='DOC_BOUND_FULL_MATRIX_COMPUTATIONS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDocMatricesBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0356-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0356.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
