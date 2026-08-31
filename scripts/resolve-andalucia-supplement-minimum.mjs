// Page-inspected official exercise. The unbounded relaxation has an integral
// optimum, so no rounding or assumption that tablets are divisible is required.
import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {vertices,feasible} from './resolve-andalucia-linear-region-official.mjs';
import {rationalGraph,renderRationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[{index:423,literals:['comprimido de UNAL aporta 5','5 de proteínas y 3 calorías','10 unidades de calcio, 20 de proteínas y 6 calorías'],constraints:[[-5,-2,-10],[-1,-1,-4],[-1,-3,-6],[-1,0,0],[0,-1,0]],objective:[.6,1,0],domain:{x:[0,8],y:[0,8]},labels:['5x+2y≥10','x+y≥4','x+3y≥6','x≥0','y≥0'],optimum:[3,1],extreme:2.8}];
export const observations=[[423,'f9236ec66af0dbd3fbd0231fdcaa6d922425c04d48178ea0737073e76e8eb7d5',1,'A.1','6a807f08eadf28d2ec0162dc998d333be86492dabc768911fc0ddc7f86272baa',0]];
export const statement='(2.5 puntos) Se quiere elaborar dos suplementos alimenticios UNAL y DOSAL con idea de completar la dieta de ciertos individuos. Cada comprimido de UNAL aporta 5 unidades de calcio, 5 de proteínas y 1 caloría y tiene un coste 0.6 euros, mientras que un comprimido de DOSAL aporta 2 unidades de calcio, 5 de proteínas y 3 calorías, siendo su coste de 1 euro. Sabiendo que los mínimos diarios requeridos son 10 unidades de calcio, 20 de proteínas y 6 calorías, encuentre la combinación de comprimidos de los dos suplementos que satisfacen las necesidades diarias con el menor coste.';
export function replacements(r){return r.queueIndex===423?[[r.sourceLiteral,statement,'OFFICIAL_EXAM_INSTRUCTIONS_SEPARATED_FROM_COMPLETE_EXERCISE']]:[];}
export function validateWholeExerciseBoundary(r,c,glyphs){
 if(c.subparts.length===0)return;
 const e=r.segmentationEvidence;
 assert.equal(e?.rule,'OFFICIAL_EXAM_INSTRUCTIONS_SEPARATED_FROM_COMPLETE_EXERCISE');
 assert.equal(e.documentHash,c.documentHash);assert.equal(e.page,glyphs.evidence?.page);
 assert.equal(e.pageImageHash,glyphs.evidence?.pngHash);
 assert.deepEqual(e.historicalSubparts,c.subparts);
 assert.ok(e.editorialPrefix&&r.sourceLiteral.startsWith(e.editorialPrefix));
 assert.match(e.editorialPrefix,/Si obtiene resultados directamente con la calculadora/);
 assert.match(e.editorialPrefix,/OPCIÓN A/);
 const normalized=s=>s.normalize('NFKC').replace(/\s+/g,' ').trim();
 assert.equal(normalized(r.sourceLiteral.slice(e.editorialPrefix.length)),normalized(glyphs.text));
 assert.doesNotMatch(glyphs.text,/(?:^|\n)\s*[a-z]\)\s/);
 assert.ok(glyphs.changes.some(x=>x.rule===e.rule&&x.before===r.sourceLiteral&&x.after===glyphs.text));
}
export function northeastGraph(c){
 assert.ok(c.constraints.every(([a,b])=>a<=0&&b<=0),'This graph requires all lower bounds and northeast recession');
 const g=rationalGraph(c),clip=[[1,0,c.domain.x[1]],[0,1,c.domain.y[1]]];
 const points=vertices([...c.constraints,...clip]),center=points.reduce((v,p)=>v.map((x,i)=>x+p[i]/points.length),[0,0]);
 return {...g,plotVersion:'linear-northeast-unbounded-v1',polygon:points.sort((a,b)=>Math.atan2(a[1]-center[1],a[0]-center[0])-Math.atan2(b[1]-center[1],b[0]-center[0])),viewportOnlyConstraints:clip,recessionDirections:[[1,0],[0,1]],optima:{minimum:{point:c.optimum,value:c.extreme},maximum:{attained:false,unboundedAbove:true}}};
}
export function renderNortheastGraph(g){
 assert.equal(g.plotVersion,'linear-northeast-unbounded-v1');assert.ok(g.constraints.every(([a,b])=>a<=0&&b<=0));
 assert.ok(g.polygon.every(p=>feasible(p,g.constraints)));assert.ok(g.vertices.every(v=>feasible(v.point,g.constraints)));
 let svg=renderRationalGraph({...g,plotVersion:'linear-rational-polygon-v1'});
 svg=svg.replace(/(<polygon[^>]*?)stroke="#147a52" stroke-width="2"/,'$1stroke="none"');
 return svg.replace('Todos los puntos de la zona sombreada cumplen las restricciones.','Región no acotada: continúa hacia arriba y hacia la derecha.');
}
export function solve(c,source=statement){const evidence=derive(c);const p=part({id:'whole',prompt:source},'3 comprimidos UNAL y 1 DOSAL; coste mínimo diario 2,80 €.',[
 '0 comprimidos UNAL y 5 DOSAL; coste mínimo diario 5,00 €.','6 comprimidos UNAL y 0 DOSAL; coste mínimo diario 3,60 €.','2 comprimidos UNAL y 2 DOSAL; coste mínimo diario 3,20 €.'
 ],['Elegir solo DOSAL y omitir la combinación de menor coste.','Elegir solo UNAL y omitir el ahorro de la mezcla.','Elegir una mezcla factible sin minimizar su coste.'],[
 ['Definimos las cantidades diarias de comprimidos. Al ser comprimidos, buscamos al final una combinación entera no negativa.','x=UNAL; y=DOSAL; x,y≥0'],
 ['Cada nutriente tiene una cantidad mínima, de modo que sus desigualdades son cotas inferiores.','Calcio: 5x+2y≥10; proteínas: 5x+5y≥20; calorías: x+3y≥6'],
 ['Simplificamos la restricción de proteínas dividiendo sus dos miembros por cinco.','x+y≥4'],
 ['El coste es una suma de costes unitarios; minimizamos, no maximizamos.','C=0,6x+y'],
 ['Dibujamos las tres fronteras y escogemos los semiplanos superiores en el primer cuadrante. La región sigue hacia arriba y a la derecha.','y≥5−frac{5x}{2}; y≥4−x; y≥2−frac{x}{3}'],
 ['Sobre el eje y la cota más exigente es la de calcio; sobre el eje x lo es la de calorías.','x=0 ⇒ y≥5; y=0 ⇒ x≥6'],
 ['El cruce de calcio y proteínas da un vértice con coordenadas racionales.','5x+2y=10; x+y=4 ⇒ 3x=2 ⇒ (x;y)=(frac{2}{3};frac{10}{3})'],
 ['El cruce de proteínas y calorías da el otro vértice interior.','x+y=4; x+3y=6 ⇒ 2y=2 ⇒ (x;y)=(3;1)'],
 ['El cruce restante no pertenece a la región: no aporta suficientes proteínas.','5x+2y=10; x+3y=6 ⇒ (frac{18}{13};frac{20}{13}); x+y=frac{38}{13}<4'],
 ['Comparamos los cuatro vértices de la relajación continua, sin suponer que basta para un recinto no acotado.','C(0;5)=5; C(frac{2}{3};frac{10}{3})=frac{56}{15}; C(3;1)=2,8; C(6;0)=3,6'],
 ['Una combinación de las cotas de proteínas y calorías demuestra el mínimo global, incluso fuera de la ventana gráfica.','C=0,4(x+y)+0,2(x+3y)≥0,4·4+0,2·6=2,8'],
 ['La igualdad requiere alcanzar ambas cotas simultáneamente. Su única intersección es la combinación obtenida.','x+y=4; x+3y=6 ⇒ x=3; y=1'],
 ['El óptimo continuo ya tiene cantidades enteras, por lo que también resuelve la compra de comprimidos enteros. Verificamos todos los nutrientes y el coste.','Calcio=17≥10; proteínas=20; calorías=6; C=0,6·3+1=2,8 €'],
 ],'ALL_VERTICES_AND_INDEPENDENT_DUAL_LOWER_BOUND',{...evidence,constraints:c.constraints,optimum:[3,1],cost:2.8,dual:[.4,.2],integerOptimum:true,wrongPoints:[[0,5],[6,0],[2,2]]});p.visual=northeastGraph(c);return[p];}
export function buildSupplementBatch(id='batch-0371',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas/programación lineal';x.examSlot=2;x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';
 const start=x.sourceLiteral.indexOf('(2.5 puntos)');assert.ok(start>0);
 x.segmentationEvidence={rule:'OFFICIAL_EXAM_INSTRUCTIONS_SEPARATED_FROM_COMPLETE_EXERCISE',documentHash:observations[0][1],page:observations[0][2],pageImageHash:observations[0][4],historicalSubparts:structuredClone(x.sourceSubparts),editorialPrefix:x.sourceLiteral.slice(0,start),canonicalSourceUnchanged:true};
 x.qualityGates.pedagogical='FULL_SOURCE_BOUND_LINEAR_SOLUTION_AND_UNBOUNDED_GRAPH';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildSupplementBatch(),a='artifacts/pau-andalucia-resolution/audit/correction-0371-original-records.json';if(!fs.existsSync(a))fs.writeFileSync(a,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0371.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({exerciseId:r.exerciseId,answers:r.parts.map(p=>p.answer)}))));}
