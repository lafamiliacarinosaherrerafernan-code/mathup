// Two complete official-page-read exercises: optimal face and unattainable level.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[
 {index:672,kind:'linear-optimal-face-membership',constraints:[[-5,3,9],[1,1,11],[6,1,36],[-1,-2,-6]],objective:[10,-6,0],domain:{x:[0,7],y:[0,9]},labels:['5x − 3y ≥ −9','x + y ≤ 11','6x + y ≤ 36','x + 2y ≥ 6'],literals:['5x − 3y ≥ −9','x + y ≤ 11','6x + y ≤ 36','x + 2y ≥ 6','(5, 7)','10x − 6y'],verticesText:'(0;3), (6;0), (5;6), (3;8)',wrongVertices:['(0;3), (6;0), (5;7), (3;8)','(0;3), (6;0), (6;5), (3;8)','(0;3), (6;0), (5;6), (3;−8)']},
 {index:698,kind:'linear-unattainable-level',constraints:[[5,-4,20],[1,8,48],[-1,0,-2],[0,-1,0]],objective:[2,12,0],domain:{x:[0,9],y:[0,7]},labels:['5x − 4y ≤ 20','x + 8y ≤ 48','x ≥ 2','y ≥ 0'],literals:['5x  4y  20','x  8y  48','x  2','2x 12y','100'],verticesText:'(2;0), (4;0), (8;5), (2;frac{23}{4})',wrongVertices:['(2;0), (4;0), (8;5), (2;frac{23}{2})','(2;0), (4;0), (5;8), (2;frac{23}{4})','(2;0), (4;0), (8;5), (0;6)']},
];
export function solve(c,text){const p=officialParts(text),v=derive(c);assert.equal(p.length,3);
 const vertex=steps=>{const r=part(p[0],`Vértices ${c.verticesText}.`,c.wrongVertices.map(s=>`Vértices ${s}.`),['Resolver incorrectamente una intersección de fronteras.','Intercambiar coordenadas o utilizar un cruce no factible.','Cambiar un signo u omitir una restricción.'],steps,'LINEAR_INTERSECTIONS_AND_ALL_CONSTRAINTS',v);r.visual=rationalGraph(c);return r;};
 if(c.index===672)return[
 vertex([
  ['Despejamos y en las cuatro restricciones, sin añadir condiciones de signo inexistentes.','y≤frac{5x+9}{3}; y≤11−x; y≤36−6x; y≥frac{6−x}{2}'],
  ['Intersecamos la primera y cuarta fronteras. Sustituimos y=(6−x)/2 en 5x−3y=−9.','10x−18+3x=−18 ⇒ A=(0;3)'],
  ['La tercera y cuarta fronteras dan el extremo inferior derecho.','x+2(36−6x)=6 ⇒ 11x=66 ⇒ B=(6;0)'],
  ['La segunda y tercera fronteras proporcionan C por resta.','6x+y=36; x+y=11 ⇒ 5x=25 ⇒ C=(5;6)'],
  ['La primera y segunda fronteras proporcionan D.','5x−3(11−x)=−9 ⇒ 8x=24 ⇒ D=(3;8)'],
  ['Los cruces restantes se descartan: cada uno incumple otra restricción.','primera∩tercera: (frac{99}{23};frac{234}{23}), x+y=frac{333}{23}>11; segunda∩cuarta: (16;−5), 6x+y=91>36'],
  ['Sustituimos los cuatro vértices en todas las restricciones.','(5x−3y;x+y;6x+y;x+2y): A=(−9;3;3;6), B=(30;6;36;6), C=(7;11;36;17), D=(−9;11;26;19)'],
  ['Unimos A–B–C–D y sombreamos la intersección, incluidas las fronteras.','(3;3): 6≥−9; 6≤11; 21≤36; 9≥6'],
 ]),
 part(p[1],'No pertenece: incumple x+y≤11 y 6x+y≤36.',['No pertenece: incumple solo x+y≤11.','No pertenece: incumple solo 6x+y≤36.','Sí pertenece: cumple las cuatro restricciones.'],['Comprobar una desigualdad y omitir la otra que también falla.','Comprobar la tercera sin advertir el fallo de la segunda.','No sustituir el punto en todas las restricciones.'],[
  ['La pertenencia exige verificar las cuatro desigualdades simultáneamente.','x=5; y=7'],
  ['La primera desigualdad sí se cumple.','5·5−3·7=4≥−9'],
  ['La segunda no se cumple.','5+7=12>11'],
  ['La tercera tampoco se cumple.','6·5+7=37>36'],
  ['La cuarta sí se cumple.','5+2·7=19≥6'],
  ['Por tanto, el punto queda fuera; fallan exactamente las restricciones segunda y tercera.','(5;7)∉región factible'],
 ],'POINT_ALL_FOUR_INEQUALITIES',{point:[5,7],leftSides:[-4,12,37,-19],upperBounds:[9,11,36,-6],failed:[1,2]}),
 part(p[2],'Máximo 60 en (6;0); mínimo −18 en todo el segmento (0;3)–(3;8).',['Máximo 60 en (6;0); mínimo −18 solo en (0;3).','Máximo 14 en (5;6); mínimo −18 en todo el segmento (0;3)–(3;8).','Máximo 60 en (6;0); mínimo 18 en todo el segmento (0;3)–(3;8).'],['Omitir los demás minimizadores de la arista.','No comparar el valor en B al buscar el máximo.','Perder el signo negativo al evaluar el mínimo.'],[
  ['Evaluamos la función lineal en los cuatro vértices.','F=10x−6y; F(A)=−18; F(B)=60; F(C)=50−36=14; F(D)=30−48=−18'],
  ['El máximo de los valores es 60; el mínimo −18 se repite en vértices consecutivos.','−18<14<60'],
  ['La función es constante en toda la arista AD, no solo en sus extremos.','5x−3y=−9 ⇒ F=2(5x−3y)=−18'],
  ['Parametrizamos el segmento completo para describir todos los mínimos.','(x,y)=(3t;3+5t), 0≤t≤1'],
  ['La sustitución demuestra que esos puntos cumplen las otras tres desigualdades.','x+y=3+8t≤11; 6x+y=3+23t≤36; x+2y=6+13t≥6'],
  ['Una cota global demuestra el mínimo y su condición de igualdad.','F+18=2(5x−3y+9)≥0'],
  ['Otra cota global demuestra el máximo mediante dos holguras no negativas.','60−F=frac{26}{11}(36−6x−y)+frac{46}{11}(x+2y−6)≥0'],
  ['Para alcanzar 60 deben anularse ambas holguras; su intersección única es B.','6x+y=36; x+2y=6 ⇒ (x,y)=(6;0)'],
 ],'LINEAR_COMPLETE_OPTIMAL_FACE_AND_GLOBAL_BOUNDS',{...v,minimumFace:{from:[0,3],to:[3,8],value:-18}})];
 assert.equal(c.index,698);return[
 vertex([
  ['Despejamos las dos fronteras oblicuas. La región está a la derecha de x=2 y sobre el eje x.','y≥frac{5x−20}{4}; y≤frac{48−x}{8}; x≥2; y≥0'],
  ['Sobre el eje x las restricciones dejan el segmento de 2 a 4.','y=0 ⇒ 2≤x≤4 ⇒ A=(2;0), B=(4;0)'],
  ['Intersecamos las dos fronteras oblicuas. Multiplicamos la primera por 2 y sumamos.','10x−8y=40; x+8y=48 ⇒ 11x=88 ⇒ C=(8;5)'],
  ['La recta x=2 se cruza con la frontera superior en D.','2+8y=48 ⇒ y=frac{46}{8}=frac{23}{4} ⇒ D=(2;frac{23}{4})'],
  ['Otros cortes no son factibles: comprobamos las restricciones omitidas.','x=2 y 5x−4y=20 ⇒ y=−frac{5}{2}<0; y=0 y x+8y=48 ⇒ x=48, 5x=240>20'],
  ['Verificamos los cuatro vértices en las dos restricciones oblicuas.','(5x−4y;x+8y): A=(10;2), B=(20;4), C=(20;48), D=(−13;48)'],
  ['La gráfica representa el cuadrilátero A–B–C–D y sus fronteras. Un punto interior confirma el sombreado.','(3;2): 7≤20; 19≤48; 3≥2; 2≥0'],
 ]),
 part(p[1],'Máximo 76 en (8;5); mínimo 4 en (2;0).',['Máximo 73 en (2;frac{23}{4}); mínimo 4 en (2;0).','Máximo 76 en (8;5); mínimo 8 en (4;0).','Máximo 76 en (8;5); mínimo 0 en (0;0).'],['Elegir el vértice de mayor ordenada sin comparar el objetivo completo.','Omitir A al calcular el mínimo.','Admitir el origen pese a que viola x≥2.'],[
  ['El polígono es cerrado y acotado; evaluamos la función en sus cuatro vértices.','F=2x+12y'],
  ['Calculamos los valores sobre el eje x.','F(A)=4; F(B)=8'],
  ['Calculamos los valores en los otros dos vértices, manteniendo la fracción exacta.','F(C)=16+60=76; F(D)=4+12·frac{23}{4}=73'],
  ['Comparamos todos los valores: los extremos son únicos.','4<8<73<76'],
  ['Una cota independiente demuestra el mínimo global y exige x=2, y=0 para la igualdad.','F−4=2(x−2)+12y≥0'],
  ['Una combinación de holguras demuestra el máximo global.','76−F=frac{1}{11}(20−5x+4y)+frac{17}{11}(48−x−8y)≥0'],
  ['Para la igualdad deben estar activas ambas fronteras oblicuas; su intersección es C.','5x−4y=20; x+8y=48 ⇒ (x,y)=(8;5)'],
 ],'LINEAR_EXTREMA_AND_DUAL_BOUND',v),
 part(p[2],'No: F≤76 en todo el recinto, por lo que no puede valer 100.',['Sí: en (8;7), donde F=100, y ese punto pertenece al recinto.','Sí: en (2;8), donde F=100, y ese punto pertenece al recinto.','Sí: en (50;0), donde F=100, y ese punto pertenece al recinto.'],['Satisfacer la ecuación objetivo pero violar x+8y≤48.','Resolver F=100 sin comprobar la frontera superior.','Resolver F=100 sobre un eje pero violar las restricciones del recinto.'],[
  ['El apartado anterior prueba un máximo global, no solo un valor observado en algunos puntos.','F(x,y)≤76 en R'],
  ['El valor solicitado supera esa cota y resulta imposible.','100>76 ⇒ no existe (x,y)∈R con F=100'],
  ['La imposibilidad también se comprueba con la identidad de holguras.','F=100 ⇒ 76−F=−24<0'],
  ['En un punto factible, las dos holguras de esa identidad son no negativas; no pueden sumar un número negativo.','frac{1}{11}(20−5x+4y)+frac{17}{11}(48−x−8y)≥0'],
  ['Encontrar un punto de la recta F=100 no basta: debe pertenecer al recinto.','(8;7): F=100, pero x+8y=64>48'],
  ['Por tanto, la recta de nivel 100 no corta la región factible.','R∩{(x,y): 2x+12y=100}=∅'],
 ],'UNATTAINABLE_LEVEL_BY_GLOBAL_BOUND',{...v,requestedLevel:100,wrongPoints:[[8,7],[2,8],[50,0]]})];
}
export function buildFaceAttainabilityBatch(id='batch-0295',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildFaceAttainabilityBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0295-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0295.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0)}));}
