import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:8,kind:'event-algebra',pA:.8,pB:.7,pUnion:.94,literals:['P(A)=0.8','P(B)=0.7','P(A∪B)=0.94','P(A/B)','P(A^{C}∪B^{C})']},
 {index:26,kind:'event-algebra',pA:.6,pB:.25,conditional:.4,literals:['P(A)=0.60','P(B)=0.25','incompatibles','independientes','P(A/B)=0.40']},
];
const fmt=x=>Number(x.toFixed(6)).toLocaleString('es-ES',{useGrouping:false,maximumFractionDigits:6});
const pair=(u,i)=>`P(A∪B)=${fmt(u)}; P(A∩B)=${fmt(i)}.`;
export function buildSetParts(c,text){
 const ps=officialParts(text);assert.equal(ps.length,3);
 if(c.index===8){
  const joint=c.pA+c.pB-c.pUnion;
  return [part(ps[0],'Sí: P(A∩B) = 0,56 = P(A)P(B).',[
   'No: P(A∩B) = 0,94 ≠ P(A)P(B).','Sí: P(A∩B) = 0 = P(A)P(B).','No: P(A∩B) = 0,06 ≠ P(A)P(B).'
  ],['Usar la unión en lugar de la intersección.','Confundir independencia e incompatibilidad.','Usar el complemento de la unión como intersección.'],[
   ['La independencia exige una igualdad entre la intersección y el producto de marginales.', 'P(A∩B)=P(A)P(B)'],
   ['Primero obtenemos la intersección desde la unión oficial; no suponemos independencia para calcularla.', 'P(A∪B)=P(A)+P(B)−P(A∩B)'],
   ['Despejamos y sustituimos los tres datos.', 'P(A∩B)=0,8+0,7−0,94=0,56'],
   ['Calculamos ahora el producto sin usar la intersección.', 'P(A)P(B)=0,8·0,7=0,56'],
   ['La igualdad demuestra independencia en este experimento.', '0,56=0,56 ⇒ A y B independientes'],
   ['Contrastamos usando la condicionada y su marginal.', 'P(A|B)=frac{0,56}{0,7}=0,8=P(A)'],
   ['Independencia no significa que no puedan ocurrir juntos: su intersección tiene probabilidad positiva.', 'P(A∩B)=0,56>0'],
  ],'UNION_PRODUCT_AND_CONDITIONAL_IDENTITY',{joint,product:c.pA*c.pB,independent:true}),
  part(ps[1],'0,8',['0,7','0,56','0,94'],['Invertir la condición y calcular P(B|A).','Dar solo la probabilidad conjunta.','Dar la unión.'],[
   ['La barra del enunciado indica probabilidad condicionada a B; la representamos mediante la barra vertical convencional.', 'P(A|B)'],
   ['La condición tiene probabilidad positiva y es el nuevo universo.', 'P(B)=0,7>0'],
   ['La intersección se deduce de la fórmula de la unión.', 'P(A∩B)=0,8+0,7−0,94=0,56'],
   ['Aplicamos la definición de condicionada, no la suma de sucesos.', 'P(A|B)=frac{P(A∩B)}{P(B)}'],
   ['Sustituimos y dividimos.', 'P(A|B)=frac{0,56}{0,7}=0,8'],
   ['Verificamos mediante la regla del producto.', '0,8·0,7=0,56=P(A∩B)'],
   ['La probabilidad coincide con P(A), coherente con la independencia demostrada.', 'P(A|B)=P(A)=0,8'],
  ],'CONDITIONAL_FROM_UNION',{numerator:joint,denominator:.7,value:joint/.7}),
  part(ps[2],'0,44',['0,06','0,5','0,56'],['Complementar la unión, en vez de la intersección.','Sumar las probabilidades complementarias sin descontar su solapamiento.','Dar la intersección en vez de su complemento.'],[
   ['La C elevada del documento oficial denota el complementario, no una variable ni una potencia numérica.', 'Aᶜ: no A; Bᶜ: no B'],
   ['Aplicamos la ley de De Morgan que corresponde a la unión de complementarios.', 'Aᶜ∪Bᶜ=(A∩B)ᶜ'],
   ['Obtenemos la probabilidad de la intersección con los datos originales.', 'P(A∩B)=0,8+0,7−0,94=0,56'],
   ['Calculamos su complemento.', 'P(Aᶜ∪Bᶜ)=1−0,56=0,44'],
   ['Comprobamos por inclusión-exclusión de los dos complementarios.', 'P(Aᶜ)=0,2; P(Bᶜ)=0,3; P(Aᶜ∩Bᶜ)=1−0,94=0,06'],
   ['La suma descuenta una vez la intersección de los complementarios.', '0,2+0,3−0,06=0,44'],
   ['El resultado mide que al menos uno de los dos sucesos no ocurra.', 'P(Aᶜ∪Bᶜ)=0,44'],
  ],'DE_MORGAN_AND_COMPLEMENT_INCLUSION_EXCLUSION',{joint,value:1-joint,complementIntersection:1-c.pUnion})];
 }
 const scenarios=[
  {i:0,rule:'incompatibles',formula:'A∩B=∅ ⇒ P(A∩B)=0',wrong:[[.7,.15],[.85,.15],[.6,.25]],reason:['Aplicar independencia cuando se afirma incompatibilidad.','Sumar marginales pero inventar una intersección positiva.','Usar los marginales como unión e intersección.']},
  {i:.15,rule:'independientes',formula:'P(A∩B)=P(A)P(B)=0,60·0,25=0,15',wrong:[[.85,0],[.85,.15],[.45,.15]],reason:['Confundir independencia e incompatibilidad.','Omitir la resta de la intersección en la unión.','Restar la intersección únicamente a P(A).']},
  {i:.10,rule:'P(A|B)=0,40',formula:'P(A∩B)=P(A|B)P(B)=0,40·0,25=0,10',wrong:[[.61,.24],[.45,.4],[.7,.15]],reason:['Multiplicar la condicionada por P(A) en vez de P(B).','Confundir la condicionada con la intersección.','Suponer independencia pese a P(A|B) distinto de P(A).']},
 ];
 return ps.map((p,k)=>{const s=scenarios[k],u=c.pA+c.pB-s.i;
  return part(p,pair(u,s.i),s.wrong.map(([a,b])=>pair(a,b)),s.reason,[
   ['Este apartado es un supuesto independiente de los otros; conservamos solo los dos marginales comunes.', 'P(A)=0,60; P(B)=0,25'],
   [`Usamos exactamente la condición de este apartado: ${s.rule}.`,s.formula],
   ['Una vez obtenida la intersección, calculamos la unión por inclusión-exclusión.', 'P(A∪B)=P(A)+P(B)−P(A∩B)'],
   ['Sustituimos y calculamos sin contar dos veces la parte común.', `P(A∪B)=0,60+0,25−${fmt(s.i)}=${fmt(u)}`],
   ['Comprobamos las cuatro regiones disjuntas: ambas, solo A, solo B y ninguna.', `${fmt(s.i)}; ${fmt(c.pA-s.i)}; ${fmt(c.pB-s.i)}; ${fmt(1-u)}`],
   ['Todas son no negativas y su suma recupera la probabilidad total.', `${fmt(s.i)}+${fmt(c.pA-s.i)}+${fmt(c.pB-s.i)}+${fmt(1-u)}=1`],
   ['Respondemos a las dos probabilidades solicitadas conservando sus etiquetas.',pair(u,s.i)],
  ],'EVENT_REGIONS_AND_SCENARIO_CONSTRAINT',{pA:c.pA,pB:c.pB,scenario:s.rule,intersection:s.i,union:u,cells:[s.i,c.pA-s.i,c.pB-s.i,1-u],wrong:s.wrong});
 });
}
export function buildSetBatch(id='batch-0260',selected=cases){
 const result=buildBatch(selected,id,buildSetParts,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));
 const originals=fs.readFileSync('artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a/andalucia-ccssii-2012-canonical-exercises.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
 const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
 for(const r of result.batch.records){r.primaryTopic='Probabilidad';r.secondaryTopics=['Operaciones con sucesos','Independencia y probabilidad condicionada'];const c=originals.find(x=>x.exerciseId===r.exerciseId);
  r.equationEvidence=c.learnerContent.filter(b=>b.type==='math-equation3').map(b=>{assert.equal(b.validationStatus,'EQUATION3_HUMAN_VALIDATED');assert.equal(sha(b.derived.latex),b.derived.latexSha256);assert.equal(sha(b.derived.mathml),b.derived.mathmlSha256);return {objectId:b.objectId,validationStatus:b.validationStatus,mathAstSha256:b.mathAstSha256,mathmlSha256:b.derived.mathmlSha256,latexSha256:b.derived.latexSha256,documentHash:b.sourceAuthority.documentSha256};});
  r.qualityGates.pedagogical='EXPLICIT_EVENT_ALGEBRA_AND_INDEPENDENT_CONSTRAINTS';
 }return result;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildSetBatch();const p='artifacts/pau-andalucia-resolution/audit/correction-0260-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0260.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}
