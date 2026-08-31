// Official-page-checked quadrilateral and pentagon. Exact rational vertices,
// global dual bounds and feasibility certificates; no source edits.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[
 {index:377,kind:'linear-range-closed',constraints:[[-4,1,-4],[2,1,15],[-1,3,10],[0,-1,0]],objective:[4,-7,0],domain:{x:[0,8],y:[0,6]},labels:['4x − y ≥ 4','2x + y ≤ 15','3y − x ≤ 10','y ≥ 0'],literals:['4x − y ≥ 4','2x + y ≤ 15','3y − x ≤ 10','4x − 7 y'],verticesText:'(1;0), (frac{15}{2};0), (5;5), (2;4)',wrongVertices:['(1;0), (15;0), (5;5), (2;4)','(1;0), (frac{15}{2};0), (5;5), (4;2)','(1;0), (frac{15}{2};0), (frac{19}{6};frac{26}{3}), (2;4)']},
 {index:491,kind:'linear-pentagon-membership',constraints:[[1,2,11],[-1,2,5],[3,1,18],[-1,0,0],[0,-1,0]],objective:[2,3,0],domain:{x:[0,7],y:[0,6]},labels:['x + 2y ≤ 11','x ≥ 2y − 5','3x + y ≤ 18','x ≥ 0','y ≥ 0'],literals:['x  2y  11','3x  y  18','2x  3y','(5.5, 2)'],verticesText:'(0;0), (6;0), (5;3), (3;4), (0;frac{5}{2})',wrongVertices:['(0;0), (6;0), (5;3), (3;4), (0;5)','(0;0), (6;0), (5;3), (4;3), (0;frac{5}{2})','(0;0), (6;0), (frac{31}{7};frac{33}{7}), (3;4), (0;frac{5}{2})']},
];
export function solve(c,text){const p=officialParts(text),v=derive(c);assert.equal(p.length,3);
 const vertex=(steps)=>{const r=part(p[0],`Vértices ${c.verticesText}.`,c.wrongVertices.map(s=>`Vértices ${s}.`),['Confundir el corte de una recta con la coordenada que realmente satisface la igualdad.','Intercambiar coordenadas al resolver un sistema.','Admitir una intersección que no satisface todas las desigualdades.'],steps,'LINEAR_EXACT_INTERSECTIONS_AND_FEASIBILITY',v);r.visual=rationalGraph(c);return r;};
 if(c.index===377)return[
 vertex([
  ['Despejamos y y seleccionamos la intersección de los cuatro semiplanos.','0≤y; y≤4x−4; y≤15−2x; y≤frac{x+10}{3}'],
  ['Sobre el eje horizontal deben cumplirse todas las cotas. No añadimos una restricción nueva sobre x.','y=0 ⇒ x≥1; x≤frac{15}{2}; x≥−10 ⇒ A=(1;0), B=(frac{15}{2};0)'],
  ['Intersecamos las fronteras segunda y tercera. Sustituimos y=15−2x.','3(15−2x)−x=10 ⇒ 45−7x=10 ⇒ C=(5;5)'],
  ['Intersecamos las fronteras primera y tercera.','3(4x−4)−x=10 ⇒ 11x=22 ⇒ D=(2;4)'],
  ['El cruce de las fronteras primera y segunda no pertenece al recinto y se descarta.','4x−4=15−2x ⇒ (x,y)=(frac{19}{6};frac{26}{3}); 3y−x=frac{137}{6}>10'],
  ['Sustituimos los cuatro vértices en todas las expresiones originales.','(4x−y;2x+y;3y−x): A=(4;2;−1), B=(30;15;−frac{15}{2}), C=(15;15;10), D=(4;8;10)'],
  ['El punto interior confirma el sombreado. Unimos A, B, C y D en ese orden; todas las fronteras se incluyen.','(3;2): 10≥4; 8≤15; 3≤10; 2≥0'],
 ]),
 part(p[1],'Máximo 30 en (frac{15}{2};0); mínimo −20 en (2;4).',[
  'Máximo 30 en (frac{15}{2};0); mínimo −15 en (5;5).','Máximo 4 en (1;0); mínimo −20 en (2;4).','Máximo −20 en (2;4); mínimo 30 en (frac{15}{2};0).'],['Omitir D al comparar los valores.','Omitir B al buscar el máximo.','Intercambiar los dos extremos.'],[
  ['En un polígono cerrado y acotado, una función lineal alcanza sus extremos en vértices o aristas.','F(x,y)=4x−7y'],
  ['Evaluamos los vértices del eje horizontal.','F(A)=4; F(B)=4·frac{15}{2}=30'],
  ['Evaluamos los otros dos vértices.','F(C)=20−35=−15; F(D)=8−28=−20'],
  ['Comparamos los cuatro valores, incluidos los negativos.','−20<−15<4<30'],
  ['Una cota independiente demuestra el máximo global. Ambas holguras son no negativas.','30−F=2(15−2x−y)+9y≥0'],
  ['La igualdad exige y=0 y 2x+y=15, por lo que B es el único máximo.','y=0; 2x=15 ⇒ (x,y)=(frac{15}{2};0)'],
  ['Otra combinación de holguras prueba el mínimo global.','F+20=frac{5}{11}(4x−y−4)+frac{24}{11}(10+x−3y)≥0'],
  ['Para la igualdad deben anularse ambas holguras; su intersección es D, el único mínimo.','4x−y=4; 3y−x=10 ⇒ (x,y)=(2;4)'],
 ],'LINEAR_EXTREMA_GLOBAL_DUAL_BOUNDS',v),
 part(p[2],'F toma todos los valores de [−20;30].',['F toma todos los valores de [−15;30].','F toma todos los valores de [−20;4].','F toma todos los valores de (−20;30).'],['Omitir el vértice mínimo D.','Omitir el vértice máximo B.','Excluir extremos que sí se alcanzan en el recinto cerrado.'],[
  ['Los extremos obtenidos en el apartado anterior proporcionan las cotas de la función.','−20≤F(x,y)≤30'],
  ['Ambas cotas se alcanzan en puntos admitidos; por eso el intervalo tiene extremos cerrados.','F(2;4)=−20; F(frac{15}{2};0)=30'],
  ['El segmento que une esos dos vértices está contenido en el recinto, intersección convexa de semiplanos.','(x,y)=(2+frac{11}{2}t;4−4t), 0≤t≤1'],
  ['Sustituimos el segmento en la función, sin redondear.','F=4(2+frac{11}{2}t)−7(4−4t)=−20+50t'],
  ['Para cada valor entre las dos cotas existe un parámetro del segmento que lo alcanza.','u∈[−20;30] ⇒ t=frac{u+20}{50}∈[0;1] ⇒ F=u'],
  ['Así queda demostrada toda la imagen de F, no solo su mínimo y máximo.','F(recinto)=[−20;30]'],
 ],'LINEAR_RANGE_CONVEX_SEGMENT_CERTIFICATE',{...v,range:[-20,30]})];
 assert.equal(c.index,491);return[
 vertex([
  ['Despejamos las tres cotas de y; también debemos estar en el primer cuadrante.','y≤frac{11−x}{2}; y≤frac{x+5}{2}; y≤18−3x; x,y≥0'],
  ['Los ejes proporcionan tres vértices. Se conserva siempre el menor corte permitido por todas las cotas.','y=0 ⇒ 0≤x≤6; x=0 ⇒ 0≤y≤frac{5}{2}; A=(0;0), B=(6;0), E=(0;frac{5}{2})'],
  ['Intersecamos las fronteras primera y tercera. Eliminamos y.','x+2y=11; 3x+y=18 ⇒ 6x+2y=36 ⇒ 5x=25 ⇒ C=(5;3)'],
  ['Intersecamos las fronteras primera y segunda.','x+2y=11; −x+2y=5 ⇒ 4y=16 ⇒ D=(3;4)'],
  ['El cruce restante se descarta porque viola la primera restricción.','−x+2y=5; 3x+y=18 ⇒ (x,y)=(frac{31}{7};frac{33}{7}); x+2y=frac{97}{7}>11'],
  ['Verificamos los cinco vértices por sustitución en las tres restricciones oblicuas.','(x+2y;−x+2y;3x+y): A=(0;0;0), B=(6;−6;18), C=(11;1;18), D=(11;5;13), E=(5;5;frac{5}{2})'],
  ['Sombreamos el pentágono A–B–C–D–E, incluidas sus fronteras. Un punto interior satisface todas las restricciones.','(1;1): 3≤11; 1≤5; 4≤18; x,y≥0'],
 ]),
 part(p[1],'Máximo 19 en (5;3); mínimo 0 en (0;0).',['Máximo 18 en (3;4); mínimo 0 en (0;0).','Máximo 12 en (6;0); mínimo 0 en (0;0).','Máximo 19 en (5;3); mínimo frac{15}{2} en (0;frac{5}{2}).'],['Elegir el vértice de mayor ordenada sin comparar la función ponderada.','Considerar únicamente el eje x.','Excluir el origen al buscar el mínimo.'],[
  ['La función lineal se optimiza en el polígono cerrado y acotado. Evaluamos sus cinco vértices.','F=2x+3y'],
  ['Comenzamos por los vértices del eje horizontal.','F(A)=0; F(B)=12'],
  ['Evaluamos los vértices con ambas coordenadas positivas.','F(C)=10+9=19; F(D)=6+12=18'],
  ['Evaluamos E y comparamos todos los valores.','F(E)=frac{15}{2}; 0<frac{15}{2}<12<18<19'],
  ['La no negatividad de x e y demuestra globalmente el mínimo; la igualdad exige x=y=0.','F=2x+3y≥0'],
  ['Una combinación no negativa de dos holguras demuestra globalmente el máximo.','19−F=frac{7}{5}(11−x−2y)+frac{1}{5}(18−3x−y)≥0'],
  ['La igualdad requiere las dos fronteras activas, cuya única intersección es C.','x+2y=11; 3x+y=18 ⇒ (x,y)=(5;3)'],
 ],'LINEAR_PENTAGON_EXTREMA_GLOBAL_BOUNDS',v),
 part(p[2],'No pertenece: incumple 3x+y≤18; las demás restricciones se cumplen.',['No pertenece: incumple x+2y≤11; las demás restricciones se cumplen.','No pertenece: incumple x≥2y−5; las demás restricciones se cumplen.','Sí pertenece: cumple todas las restricciones del recinto.'],['Atribuir el fallo a una restricción que sí se satisface.','Cambiar el sentido de la segunda desigualdad.','No verificar la tercera desigualdad.'],[
  ['Para pertenecer al recinto deben cumplirse todas las desigualdades, no basta con estar en el primer cuadrante.','x=5,5=frac{11}{2}; y=2'],
  ['Comprobamos la primera restricción.','x+2y=frac{11}{2}+4=frac{19}{2}=9,5≤11'],
  ['Comprobamos la segunda en su forma original.','x=frac{11}{2}≥2·2−5=−1'],
  ['La tercera restricción no se cumple.','3x+y=frac{33}{2}+2=frac{37}{2}=18,5>18'],
  ['Las dos coordenadas sí son no negativas.','frac{11}{2}≥0; 2≥0'],
  ['Una sola desigualdad incumplida basta para excluir el punto. Aquí se incumple exactamente la tercera.','(5,5;2)∉recinto'],
 ],'EXPLICIT_ALL_INEQUALITIES_POINT_MEMBERSHIP',{point:[5.5,2],leftSides:[9.5,-1.5,18.5,-5.5,-2],upperBounds:[11,5,18,0,0],failedConstraintIndex:2})];
}
export function buildRangePentagonBatch(id='batch-0294',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildRangePentagonBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0294-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0294.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0)}));}
