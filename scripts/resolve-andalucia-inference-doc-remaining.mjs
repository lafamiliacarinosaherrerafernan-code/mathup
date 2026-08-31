// Official 2012 DOC-derived statements and previously human-validated Equation.3.
// No grading guidance is promoted to a pedagogical solution.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {buildRegionParts} from './resolve-andalucia-inference-critical-regions.mjs';
import {part,officialParts,sizePart} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:18,whole:true,kind:'mean',sigma:2,n:18,center:10.8,nullValue:11,tail:'left',levels:[.01],unit:'puntos del índice',literals:['desviación típica 2','18 alumnos','10.8','significación del 1%','no es inferior a 11'],conclusion:'No se rechaza que la madurez lectora media sea al menos 11 al 1%. Es compatible con la muestra, pero no queda demostrada por ella.'},
 {index:21,kind:'proportion',n:300,successes:35,center:35/300,nullValue:.05,tail:'right',levels:[.05],tasks:['rejection','decision'],includeHypotheses:true,literals:['5%','300 artículos','35 están defectuosos','H_{0}: p≤0.05','región crítica','significación del 5%'],conclusion:'Se rechaza que la proporción defectuosa sea a lo sumo el 5%: los datos aportan evidencia de un aumento.'},
 {index:29,kind:'proportion',n:1000,successes:240,center:.24,nullValue:.26,tail:'left',levels:[.05],tasks:['rejection','decision'],includeHypotheses:true,literals:['al menos el 26%','240 de los 1000','H_{0}: p≥0.26','región crítica','significación del 5%'],conclusion:'No se rechaza el informe del Ayuntamiento al 5%. La muestra no demuestra una proporción inferior al 26%; no rechazar no certifica la afirmación.'},
 {index:34,kind:'proportion',n:470,successes:110,center:110/470,nullValue:.23,tail:'right',levels:[.05],tasks:['acceptance','decision'],includeHypotheses:true,literals:['no supera el 23%','110 de los 470','H_{0}:p≤0.23','región de aceptación','significación del 5%'],conclusion:'No se rechaza que la proporción no supere el 23%. No hay evidencia estadística suficiente del aumento; este contraste tampoco identifica por sí solo un efecto causal del regalo.'},
 {index:43,task:'minimum-and-monotonicity',kind:'mean',sigma:1200,confidence:.95,error:450,strict:true,unit:'g',literals:['desviación típica 1200 g','95%','error menor de 450 g','aumenta o disminuye','tamaño de la muestra']},
 {index:46,whole:true,kind:'proportion',n:950,successes:200,center:200/950,nullValue:.25,tail:'left',levels:[.05],literals:['al menos el 25%','950 personas','200 de ellas','significación del 5%','mayor o igual que 0.25'],conclusion:'Se rechaza al 5% que la proporción sea al menos el 25%; la muestra aporta evidencia de una proporción inferior. No equivale a una certeza absoluta.'},
];
export function buildDocParts(c,text){
 if(c.task!=='minimum-and-monotonicity')return buildRegionParts(c,text);
 const p=officialParts(text);assert.equal(p.length,2);
 return [sizePart(c,p[0]),part(p[1],'El error disminuye en proporción inversa a √(n).',[
  'El error aumenta en proporción directa a √(n).','El error disminuye en proporción inversa a n.','El error no cambia si se mantiene la confianza.'
 ],['Invertir la relación entre precisión y tamaño.','Dividir por el tamaño, no por su raíz.','Ignorar el tamaño en el error típico.'],[
  ['La confianza y la desviación poblacional permanecen fijas: no cambiamos el cuantil ni la dispersión de cada calabaza.','confianza = 95%; σ = 1200 g'],
  ['El error máximo de estimación es la semiamplitud del intervalo.','E(n) = frac{z·σ}{√(n)}'],
  ['Un aumento del tamaño incrementa el denominador positivo.','n₂ > n₁ ⇒ √(n₂) > √(n₁)'],
  ['El numerador permanece constante; por ello disminuye el cociente.','E(n₂) < E(n₁)'],
  ['Comprobamos una relación exacta: cuadruplicar el tamaño reduce el margen a la mitad, no a su cuarta parte.','E(4n) = E(n)/2'],
  ['La mejora de precisión es real, aunque requiere multiplicar por cuatro la muestra para reducir el error a la mitad.','E(n) > 0; E(n) es decreciente'],
 ],'FIXED_CONFIDENCE_MARGIN_MONOTONICITY',{relativeN:4,relativeMargin:.5})];
}
export function buildDocBatch(id='batch-0257',selected=cases){
 const r=buildBatch(selected,id,buildDocParts,(_c,x)=>({parts:x.parts.map(p=>({partId:p.partId,...p.verification}))}));
 for(const x of r.batch.records)if(x.correctionEvidence.parameters.whole){assert.equal(x.sourceSubparts.length,0);x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';}
 return r;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDocBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0257-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0257.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(x=>({index:x.correctionEvidence.parameters.index,answers:x.parts.map(p=>p.answer)})),null,2));}
