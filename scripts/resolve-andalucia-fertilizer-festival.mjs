// Two individually read official 2025 exercises. No inferred missing numerals.
import fs from 'node:fs';import crypto from 'node:crypto';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch,buildParts,compute,critical} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[
 {index:94,literals:['dos tipos de abonos ecológicos','el doble de la producción','máximo beneficio'],constraints:[[1,0,200],[-3,2,100],[1,2,500],[-1,0,0],[0,-1,0]],objective:[15,10,0],labels:['x≤200','−3x+2y≤100','x+2y≤500','x≥0','y≥0'],domain:{x:[0,230],y:[0,240]}},
 {index:285,literals:['celebración de las fiestas locales','Manteniendo la misma proporción','si se aumenta el nivel de confianza'],kind:'proportion',n:200,successes:130,center:.65,confidence:.965,nextConfidence:.99,error:.02,population:'proporción poblacional de personas favorables a celebrar las fiestas en mayo',unit:'proporción'},
];
export function solve(c,text){
 if(c.index===94){
  assert.doesNotMatch(text,/(?:^|\n)\s*[abc]\)/);const proof=derive(c);assert.equal(proof.max,4500);
  const answer=(x,y,z)=>`${x} kg de A y ${y} kg de B; beneficio máximo ${z} €.`;
  const r=part({id:'whole',prompt:text},answer(200,150,4500),[answer(100,200,3500),answer(200,0,3000),answer(0,50,500)],[
   'Elegir el vértice de mayor producción B sin comparar el beneficio de ambos abonos.','Producir solo A por su mayor beneficio unitario e ignorar la capacidad disponible para B.','Usar únicamente B y no comparar los demás vértices factibles.'
  ],[
   ['Definimos x como kilogramos mensuales de abono A e y como kilogramos de B. Son cantidades no negativas, no necesariamente enteras.','x≥0; y≥0'],
   ['Sumamos el beneficio de cada kilogramo vendido. El enunciado indica que se vende toda la producción.','Maximizar Z=15x+10y'],
   ['Traducimos la cota de producción de A.','x≤200'],
   ['El doble de B menos el triple de A da la segunda restricción; respetamos el orden de la resta.','2y−3x≤100'],
   ['La última condición limita A más el doble de B.','x+2y≤500'],
   ['Representamos las rectas frontera y sus semiplanos. La región sombreada es la intersección con el primer cuadrante.','x≤200; y≤50+1,5x; y≤250−0,5x; x,y≥0'],
   ['En los ejes, el origen y los cortes admisibles dan tres vértices.','O=(0;0); A=(200;0); D=(0;50)'],
   ['En x=200 la tercera restricción es la más exigente para y.','200+2y=500 ⇒ B=(200;150); 2·150−3·200=−300≤100'],
   ['Restamos las dos fronteras oblicuas para hallar su intersección.','−3x+2y=100; x+2y=500 ⇒ 4x=400 ⇒ C=(100;200)'],
   ['Evaluamos el objetivo en todos los vértices del polígono O–A–B–C–D.','Z(O)=0; Z(A)=3000; Z(B)=4500; Z(C)=3500; Z(D)=500'],
   ['Una cota independiente demuestra el máximo para todos los puntos de la región, no solo para los vértices.','Z = 10x + 5(x+2y) ≤ 10·200 + 5·500 = 4500'],
   ['La igualdad exige x=200 y x+2y=500. Así el óptimo es único.','x=200; y=150'],
   ['Comprobamos todas las restricciones e interpretamos el resultado con unidades.','200≤200; 300−600=−300≤100; 200+300=500; beneficio=4500 €'],
  ],'ALL_BOUNDARY_INTERSECTIONS_AND_NONNEGATIVE_DUAL_BOUND',{...proof,dual:[10,0,5,0,0],maximum:4500,optimum:[200,150],wrongPoints:[[100,200],[200,0],[0,50]]});
  r.visual=rationalGraph(c);return[r];
 }
 assert.equal(c.index,285);const p=officialParts(text);assert.equal(p.length,3);const result=buildParts(c,text);
 result[0].prompt=p[0].prompt;result[1].prompt=p[1].prompt;
 const v=compute(c);result.push(part(p[2],'El error máximo aumenta al aumentar el nivel de confianza, manteniendo n y p̂.',[
  'El error máximo disminuye al aumentar el nivel de confianza, manteniendo n y p̂.','El error máximo no cambia al aumentar el nivel de confianza, manteniendo n y p̂.','El error máximo se duplica necesariamente con cualquier aumento del nivel de confianza.'
 ],['Confundir mayor confianza con mayor precisión.','Ignorar el valor crítico normal de la fórmula del error.','Atribuir un factor fijo a un cambio que depende del nuevo valor crítico.'],[
  ['Identificamos los factores que permanecen constantes: tamaño muestral y proporción estimada.','n=200; p̂=0,65; q̂=0,35'],
  ['El margen del intervalo de confianza es el valor crítico multiplicado por el error típico.','E=z·√(frac{p̂·q̂}{n})'],
  ['En un intervalo bilateral, aumentar la confianza exige acumular más probabilidad a la izquierda del valor crítico positivo.','Φ(z)=frac{1+C}{2}; C aumenta ⇒ z aumenta'],
  ['El error típico es positivo y constante. Por tanto el margen crece, no disminuye.','√(frac{0,65·0,35}{200})≈0,033727; E aumenta'],
  ['Comprobamos con dos niveles de confianza sin modificar la muestra.','E al 96,5%≈0,071108; E al 99%≈0,086875'],
  ['Mayor confianza produce un intervalo más ancho y una estimación menos precisa con la misma muestra. No existe un factor universal de duplicación.','Amplitud=2E; mayor confianza ⇒ mayor amplitud'],
 ],'NORMAL_QUANTILE_MONOTONICITY_WITH_FIXED_SAMPLING_VARIANCE',{confidence:.965,largerConfidence:.99,margin:v.margin,largerMargin:critical(.99)*v.se,fixedVariance:v.variance,fixedN:200}));return result;
}
export function intervalConsistencyFinding(){
 const read=p=>fs.readFileSync(p,'utf8').trim().split(/\r?\n/).map(JSON.parse),sha=x=>crypto.createHash('sha256').update(x).digest('hex');
 const q=read('artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl')[141],source=read('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl').find(r=>r.exerciseId===q.exerciseId);
 const docHash='eb859ec01d70086dca9d66db3bfc243537cc50589e2d9484faef7d8974134320',pngHash='1254b925984afc2dc4cea87b2604d94c37221141a9be4066ee931992c2afaa18';
 assert.equal(sha(fs.readFileSync(source.provenance.localPath)),docHash);assert.equal(sha(fs.readFileSync('tmp/pdfs/inference-source-glyphs/q141.png')),pngHash);
 const center=.64,error=.0784,pBounds=[.63995,.64005],errorBounds=[.07835,.07845];
 const nBounds=[critical(.95)**2*pBounds[1]*(1-pBounds[1])/errorBounds[1]**2,1.96**2*pBounds[0]*(1-pBounds[0])/errorBounds[0]**2];
 const possibleN=[];for(let n=Math.ceil(nBounds[0]);n<=Math.floor(nBounds[1]);n++)possibleN.push(n);
 assert.deepEqual(possibleN,[144]);const countBounds=pBounds.map(p=>144*p);assert.ok(Math.ceil(countBounds[0])>Math.floor(countBounds[1]));
 return {...q,sourceLiteral:source.officialPrompt,blockerCodes:['OFFICIAL_INTERVAL_INCONSISTENT_WITH_DISCRETE_SAMPLE_UNDER_WALD'],blockerEvidence:{
  officialSource:{path:source.provenance.localPath,documentHash:docHash,page:2,question:'6',inspectedPageHash:pngHash},
  recoveredOfficialCommon:'A partir de un estudio muestral se sabe que, con un nivel de confianza del 95%, la proporción de estudiantes de una universidad que tienen carnet de conducir pertenece al intervalo (0.5616, 0.7184).',
  resolvedParts:{a:{estimatedProportion:center},b:{margin:error},d:{relation:'AMPLITUDE_DECREASES_WITH_N_AT_FIXED_CONFIDENCE_AND_PROPORTION'}},
  attemptedPart:'c',method:'COURSE_WALD_PROPORTION_INTERVAL_INVERSE_WITH_FOUR_DECIMAL_ROUNDING_BOUNDS',
  nominalCalculation:{tableCritical:1.96,nominalN:144,nominalSuccesses:92.16},roundingProof:{pBounds,errorBounds,nBounds,possibleN,countBounds,possibleIntegerSuccesses:[]},
  failure:'Even allowing rounding to four decimals and either the exact normal quantile or 1.96, n must equal 144, but no integer number of students produces the implied proportion. The nominal textbook inverse gives 144; it is not evidence of a feasible Bernoulli sample.',
  requiredReview:'Confirm the intended interval construction or corrected official endpoints before enabling the complete exercise. Do not change endpoints or invent a student count.',
  sourceTextNowRecovered:true,missingHistoricalAnswerIsNotABlocker:true,automaticMathematicalRepair:false,
 }};
}
export function buildFertilizerFestivalBatch(id='batch-0339',selected=cases){const result=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const r of result.batch.records){if(r.correctionEvidence.parameters.index===94){r.primaryTopic='Programación lineal';r.secondaryTopics=['Región factible','Optimización'];r.block='Sistemas y programación lineal';r.examSlot=2;r.deliveryScope='WHOLE_OFFICIAL_EXERCISE';}else r.secondaryTopics=['Intervalos de confianza','Tamaño muestral'];r.qualityGates.pedagogical='SOURCE_READ_FULL_PRODUCTION_AND_INFERENCE_REASONING';}/* The conditional discrete-Wald diagnostic is not a final blocker: prior rounding of the estimated proportion still needs examination. */result.batch.blockedRecords=[];return result;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildFertilizerFestivalBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0339-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0339.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
