// The official page separates the boxed exam instructions from exercise A.1.
// Preserve that historical prefix, but do not mistake its b)-e) for subparts.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[{index:615,kind:'linear-official-triangle-editorial-prefix',constraints:[[-3,7,15],[1,-1,3],[-1,-3,-11]],objective:[4,-1,-16],domain:{x:[0,10],y:[0,8]},labels:['7y ≤ 15 + 3x','y ≥ x − 3','3y ≥ −x + 11'],literals:['Consideremos el recinto','7y ≤ 15 + 3x','y ≥ x − 3','3y ≥ −x + 11','4x − y − 16']}];
export function solve(c,text){
 const start=text.indexOf('Consideremos el recinto');assert.ok(start>0);assert.match(text.slice(0,start),/OPCIÓN A/);
 const p=officialParts(text.slice(start));assert.equal(p.length,2);const v=derive(c);
 const a=part(p[0],'Triángulo con vértices (2;3), (5;2), (9;6).',[
 'Triángulo con vértices (3;2), (5;2), (9;6).','Triángulo con vértices (2;3), (5;2), (6;9).','Triángulo con vértices (0;0), (5;2), (9;6).'
 ],['Intercambiar las coordenadas del primer cruce.','Intercambiar las coordenadas del cruce superior.','Añadir el origen aunque incumple una restricción.'],[
 ['La región reúne los tres semiplanos; no añadimos restricciones de signo inexistentes.','max(x−3;frac{11−x}{3})≤y≤frac{15+3x}{7}'],
 ['Cortamos la primera frontera con la tercera.','7y=15+3x; x+3y=11 ⇒ 7y=15+3(11−3y) ⇒ 16y=48 ⇒ A=(2;3)'],
 ['Cortamos las dos fronteras inferiores.','y=x−3; x+3y=11 ⇒ 4x−9=11 ⇒ B=(5;2)'],
 ['Cortamos la primera frontera con la segunda.','7(x−3)=15+3x ⇒ 4x=36 ⇒ C=(9;6)'],
 ['Comprobamos las tres holguras en cada cruce. Todas son no negativas.','(15+3x−7y;3−x+y;x+3y−11): A=(0;4;0), B=(16;0;0), C=(0;0;16)'],
 ['La cota inferior izquierda intersecta la superior solo para x≥2; la inferior derecha exige x≤9. El recinto queda acotado.','frac{11−x}{3}≤frac{15+3x}{7} ⇒ x≥2; x−3≤frac{15+3x}{7} ⇒ x≤9'],
 ['Unimos A–B–C y sombreamos el interior. El punto (5;3) satisface estrictamente las tres condiciones.','21<30; 3>2; 9>6'],
 ],'THREE_EXACT_INTERSECTIONS_AND_ALL_SLACKS',v);a.visual=rationalGraph(c);
 const b=part(p[1],'Máximo 14 en (9;6); mínimo −11 en (2;3).',[
 'Máximo 30 en (9;6); mínimo 5 en (2;3).','Máximo 2 en (5;2); mínimo −11 en (2;3).','Máximo 14 en (9;6); mínimo 2 en (5;2).'
 ],['Omitir el término constante −16.','Escoger un vértice intermedio como máximo.','Omitir el vértice de menor valor.'],[
 ['La función es afín y el triángulo cerrado y acotado. Sus extremos se alcanzan en vértices o aristas.','H(x,y)=4x−y−16'],
 ['Evaluamos sin omitir el término constante.','H(2;3)=8−3−16=−11'],
 ['Evaluamos el segundo vértice.','H(5;2)=20−2−16=2'],
 ['Evaluamos el tercer vértice y comparamos.','H(9;6)=36−6−16=14; −11<2<14'],
 ['La siguiente identidad con holguras no negativas demuestra la cota inferior en toda la región.','H+11=frac{13}{16}(15+3x−7y)+frac{25}{16}(x+3y−11)≥0'],
 ['Otra identidad demuestra la cota superior.','14−H=frac{3}{4}(15+3x−7y)+frac{25}{4}(3−x+y)≥0'],
 ['La igualdad inferior exige las fronteras primera y tercera; la superior exige primera y segunda. Ambos puntos son únicos.','H mínimo=−11 en A=(2;3); H máximo=14 en C=(9;6)'],
 ],'GLOBAL_DUAL_BOUNDS_WITH_CONSTANT_TERM',v);
 return[a,b];
}
export function buildEditorialTriangleBatch(id='batch-0303',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildEditorialTriangleBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0303-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0303.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:1,parts:2}));}
