// Formula recovery is evidenced separately against rendered official PDF pages.
// These solutions do not infer absent source data from legacy answer records.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
import {cases as intactCases,solve as solveIntact} from './resolve-andalucia-linear-last-intact-regions.mjs';
export const cases=[
 {index:73,kind:'pdf-five-halfplanes-face',constraints:[[2,1,6],[4,1,10],[-1,1,3],[-1,0,0],[0,-1,0]],objective:[4,2,-3],domain:{x:[0,4],y:[0,6]},labels:['2x+y≤6','4x+y≤10','−x+y≤3','x≥0','y≥0'],literals:['Represente gráficamente la región','determine sus vértices','Calcule el máximo','BLOQUE B'],V:[[0,0],[2.5,0],[2,2],[1,4],[0,3]]},
 {...intactCases.find(c=>c.index===1636),index:363,literals:['Sea el recinto determinado','(4.1, 11.7)','Represente dicho recinto','sus valores extremos']},
 {index:509,kind:'pdf-pentagon-membership-extrema',constraints:[[2,-3,1],[4,1,9],[1,1,5],[-9,1,0],[0,-1,0]],objective:[5,-3,0],domain:{x:[0,3],y:[0,6]},labels:['2x−3y≤1','4x+y≤9','x+y≤5','9x−y≥0','y≥0'],literals:['región del plano definida','Dibuje la región','si los puntos','máximo y el mínimo'],V:[[0,0],[.5,0],[2,1],[4/3,11/3],[.5,4.5]]},
];
const make=(p,a,w,reasons,steps,proof)=>part(p,a,w,reasons,steps,'PDF_BOUND_HALFPLANES_GLOBAL_EXTREMA_AND_POINT_TESTS',proof);
export function solve(c,text){const p=officialParts(text),v=derive(c);
 if(c.index===363){
  // Independently inspected PDF contains the same complete mathematical task
  // as the separate official record 1636; preserve this record's own prompts.
  assert.deepEqual(c.constraints,intactCases.find(x=>x.index===1636).constraints);
  assert.deepEqual(c.objective,[.6,1,0]);return solveIntact({...c,index:1636},text);
 }
 if(c.index===73){assert.equal(p.length,2);
  const a=make(p[0],'Pentágono con vértices (0;0), (frac{5}{2};0), (2;2), (1;4), (0;3).',[
   'Pentágono con vértices (0;0), (3;0), (2;2), (1;4), (0;3).',
   'Pentágono con vértices (0;0), (frac{5}{2};0), (2;2), (4;1), (0;3).',
   'Pentágono con vértices (0;0), (frac{5}{2};0), (2;2), (1;4), (0;6).'
  ],['Tomar el corte x=3 sin verificar 4x+y≤10.','Intercambiar las coordenadas del cruce oblicuo.','Tomar el corte y=6 sin verificar −x+y≤3.'],[
   ['Trabajamos en el primer cuadrante bajo las tres rectas.','0≤y≤min(6−2x;10−4x;x+3); x≥0'],
   ['En el eje x, el límite más restrictivo es 5/2.','y=0 ⇒ x≤min(3;frac{5}{2})=frac{5}{2}'],
   ['En el eje y, el límite más restrictivo es 3.','x=0 ⇒ y≤min(6;10;3)=3'],
   ['El cruce de las dos rectas descendentes se obtiene restando.','2x+y=6; 4x+y=10 ⇒ x=2, y=2'],
   ['La recta ascendente corta 2x+y=6 en otro vértice.','y=x+3 ⇒ 3x+3=6 ⇒ (x;y)=(1;4)'],
   ['El cruce restante no es factible: supera el límite de la primera restricción.','4x+y=10; y=x+3 ⇒ (frac{7}{5};frac{22}{5}); 2x+y=frac{36}{5}>6'],
   ['Incluimos el origen y verificamos todos los vértices en las cinco desigualdades.','(0;0), (frac{5}{2};0), (2;2), (1;4), (0;3)'],
   ['Unimos esos vértices en ese orden y sombreamos el recinto cerrado.','(1;1) interior: 3<6; 5<10; 0<3']
  ],v);a.visual=rationalGraph(c);
  const b=make(p[1],'Máximo 9 en todo el segmento de (1;4) a (2;2).',[
   'Máximo 9 únicamente en los dos puntos (1;4) y (2;2).','Máximo 12 en todo el segmento de (1;4) a (2;2).','Máximo 7 únicamente en (frac{5}{2};0).'
  ],['Omitir los puntos interiores del lado óptimo.','Olvidar el término constante −3.','Seleccionar solo el vértice de mayor x.'],[
   ['Evaluamos la función afín en los cinco vértices.','f=4x+2y−3'],
   ['Los valores respectivos son −3, 7, 9, 9 y 3.','f(0;0)=−3; f(frac{5}{2};0)=7; f(2;2)=9; f(1;4)=9; f(0;3)=3'],
   ['La primera restricción proporciona una cota válida para todo el recinto.','f=2(2x+y)−3≤2·6−3=9'],
   ['El máximo se alcanza exactamente cuando la primera restricción es igualdad.','2x+y=6 ⇒ y=6−2x'],
   ['La segunda restricción fija el extremo derecho del segmento.','4x+(6−2x)≤10 ⇒ x≤2'],
   ['La tercera fija el extremo izquierdo; las dos coordenadas son no negativas en el tramo.','−x+(6−2x)≤3 ⇒ x≥1'],
   ['Cualquier punto del tramo cumple todas las restricciones y da 9.','(x;y)=(t;6−2t), 1≤t≤2; f=9']
  ],v);return[a,b];
 }
 assert.equal(c.index,509);assert.equal(p.length,3);
 const a=make(p[0],'Pentágono con vértices (0;0), (frac{1}{2};0), (2;1), (frac{4}{3};frac{11}{3}), (frac{1}{2};frac{9}{2}).',[
  'Pentágono con vértices (0;0), (frac{1}{2};0), (1;2), (frac{4}{3};frac{11}{3}), (frac{1}{2};frac{9}{2}).',
  'Pentágono con vértices (0;0), (frac{1}{2};0), (2;1), (frac{11}{3};frac{4}{3}), (frac{1}{2};frac{9}{2}).',
  'Pentágono con vértices (0;0), (frac{1}{2};0), (2;1), (frac{4}{3};frac{11}{3}), (frac{9}{2};frac{1}{2}).'
 ],['Intercambiar las coordenadas del cruce de las dos primeras rectas.','Intercambiar x e y al resolver las fronteras superiores.','Invertir las coordenadas del cruce con y=9x.'],[
  ['Escribimos las cotas inferiores y superiores de y.','max(0;frac{2x−1}{3})≤y≤min(9−4x;5−x;9x)'],
  ['Como y≥0 y y≤9x, también x≥0. Los cruces con y=0 dan los dos primeros vértices.','y=0 ⇒ 0≤x≤frac{1}{2}; O=(0;0), P=(frac{1}{2};0)'],
  ['Intersecamos la primera y segunda frontera.','2x−3y=1; 4x+y=9 ⇒ 14x=28 ⇒ Q=(2;1)'],
  ['Intersecamos la segunda y tercera frontera.','4x+y=9; x+y=5 ⇒ 3x=4 ⇒ S=(frac{4}{3};frac{11}{3})'],
  ['Intersecamos la tercera y cuarta frontera.','x+y=5; y=9x ⇒ T=(frac{1}{2};frac{9}{2})'],
  ['La región solo existe hasta x=2 porque la cota inferior no puede superar 9−4x.','frac{2x−1}{3}≤9−4x ⇒ x≤2'],
  ['Las cotas activas cambian en x=1/2 y x=4/3, y no aparecen otros vértices factibles.','superior: 9x, después 5−x, después 9−4x; inferior: 0, después frac{2x−1}{3}'],
  ['La gráfica recorre O–P–Q–S–T y sombrea la intersección de los cinco semiplanos.','(1;1) interior: −1<1; 5<9; 2<5; 8>0; 1>0']
 ],v);a.visual=rationalGraph(c);
 const b=make(p[1],'A(2;2) no pertenece; B(1;3,5) sí pertenece.',[
  'A(2;2) sí pertenece; B(1;3,5) sí pertenece.','A(2;2) no pertenece; B(1;3,5) no pertenece.','A(2;2) sí pertenece; B(1;3,5) no pertenece.'
 ],['No comprobar la restricción 4x+y≤9 para A.','Invertir una desigualdad al comprobar B.','Intercambiar los dictámenes de los dos puntos.'],[
  ['Cada punto debe cumplir las cinco restricciones.','2x−3y≤1; 4x+y≤9; x+y≤5; 9x−y≥0; y≥0'],
  ['Para A, evaluamos las cinco expresiones en el mismo orden.','A=(2;2): −2, 10, 4, 16, 2'],
  ['La segunda desigualdad falla; basta una violación para excluir A.','4·2+2=10>9'],
  ['Para B, calculamos de nuevo las cinco expresiones.','B=(1;3,5): −8,5; 7,5; 4,5; 5,5; 3,5'],
  ['Comparamos con los límites, respetando el sentido de cada desigualdad.','−8,5≤1; 7,5≤9; 4,5≤5; 5,5≥0; 3,5≥0'],
  ['Todas se satisfacen estrictamente para B; es un punto interior.','A fuera; B dentro']
 ],{points:[[2,2],[1,3.5]],membership:[false,true]});
 const d=make(p[2],'Máximo 7 en (2;1); mínimo −11 en (frac{1}{2};frac{9}{2}).',[
  'Máximo frac{53}{3} en (frac{4}{3};frac{11}{3}); mínimo 0 en (0;0).',
  'Máximo 7 en (2;1); mínimo −frac{13}{3} en (frac{4}{3};frac{11}{3}).',
  'Máximo frac{5}{2} en (frac{1}{2};0); mínimo −11 en (frac{1}{2};frac{9}{2}).'
 ],['Cambiar −3y por +3y al optimizar la función.','Omitir el vértice superior izquierdo al buscar el mínimo.','Omitir Q al buscar el máximo.'],[
  ['Calculamos F=5x−3y en cada vértice del pentágono cerrado.','F(O)=0; F(P)=frac{5}{2}; F(Q)=7; F(S)=−frac{13}{3}; F(T)=−11'],
  ['La tabla sugiere máximo 7 en Q y mínimo −11 en T.','−11<−frac{13}{3}<0<frac{5}{2}<7'],
  ['Verificamos globalmente la cota superior con las holguras de las dos primeras restricciones.','7−F=frac{17}{14}(1−2x+3y)+frac{9}{14}(9−4x−y)≥0'],
  ['Ambos coeficientes son positivos, de modo que la igualdad exige las dos fronteras simultáneamente.','2x−3y=1; 4x+y=9 ⇒ Q=(2;1)'],
  ['Verificamos la cota inferior con las holguras de la tercera y cuarta restricción.','F+11=frac{11}{5}(5−x−y)+frac{4}{5}(9x−y)≥0'],
  ['La igualdad exige x+y=5 e y=9x, con una única intersección.','T=(frac{1}{2};frac{9}{2})'],
  ['Sustituimos en el objetivo y confirmamos ambos valores sin aristas óptimas adicionales.','F(2;1)=10−3=7; F(frac{1}{2};frac{9}{2})=frac{5}{2}−frac{27}{2}=−11']
 ],v);return[a,b,d];
}
export function buildRecoveredRegionsBatch(id='batch-0308',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildRecoveredRegionsBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0308-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0308.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:3,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0)}));}
