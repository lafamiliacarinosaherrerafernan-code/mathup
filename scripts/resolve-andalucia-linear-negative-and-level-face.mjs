// Official-page-read complete problems; no positivity restriction is invented.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[
 {index:916,kind:'linear-negative-abscissa',constraints:[[1,1,3],[-1,1,3],[1,0,2],[0,-1,0]],objective:[-2,-1,0],domain:{x:[-4,4],y:[0,4]},labels:['x + y ≤ 3','−x + y ≤ 3','x ≤ 2','y ≥ 0'],literals:['x + y ≤ 3','− x + y ≤ 3','x ≤ 2','y ≥ 0','−2x − y'],verticesText:'(−3;0), (2;0), (2;1), (0;3)',wrongVertices:['(0;0), (2;0), (2;1), (0;3)','(−3;0), (3;0), (2;1), (0;3)','(−3;0), (2;0), (2;5), (0;3)']},
 {index:1125,kind:'linear-lower-level-face',constraints:[[1,2,13],[1,-1,4],[-1,2,7],[-1,-1,-5]],objective:[1,1,0],domain:{x:[0,8],y:[0,6]},labels:['x + 2y ≤ 13','x − y ≤ 4','x − 2y ≥ −7','x + y ≥ 5'],literals:['x + 2y ≤ 13','x−y ≤ 4','x − 2y ≥ −7','x+y ≥ 5','F (x, y) = x + y'],verticesText:'(frac{9}{2};frac{1}{2}), (7;3), (3;5), (1;4)',wrongVertices:['(frac{9}{2};frac{1}{2}), (7;3), (3;5), (4;1)','(frac{1}{2};frac{9}{2}), (7;3), (3;5), (1;4)','(frac{9}{2};frac{1}{2}), (7;3), (15;11), (1;4)']},
];
export function solve(c,text){const p=officialParts(text),v=derive(c),reasons=['Añadir una restricción inexistente o intercambiar coordenadas.','Aceptar un corte que incumple otra desigualdad.','No comprobar las fronteras que no intervienen en el cruce.'];
 const vertex=(prompt,steps)=>part(prompt,`Vértices ${c.verticesText}.`,c.wrongVertices.map(x=>`Vértices ${x}.`),reasons,steps,'ALL_PAIRWISE_BOUNDARIES_AND_FEASIBILITY',v);
 if(c.index===916){assert.equal(p.length,3);
 const a=vertex(p[0],[
  ['Despejamos y para identificar los semiplanos, sin añadir x≥0.','y≤3−x; y≤3+x; x≤2; y≥0'],
  ['Las dos cotas superiores y el semiplano y≥0 forman una región bajo una V invertida.','0≤y≤min(3−x;3+x)'],
  ['Para que la cota 3+x no sea negativa necesitamos x≥−3. La restricción x≤2 recorta el extremo derecho.','−3≤x≤2'],
  ['La frontera superior cambia de recta en x=0, donde las dos cotas coinciden.','3−x=3+x ⇒ x=0; y=3'],
  ['Los cortes activos delimitan el polígono mostrado en la gráfica. Las abscisas negativas sí pertenecen al recinto.','A=(−3;0); B=(2;0); C=(2;1); D=(0;3)'],
  ['Comprobamos un punto interior negativo para no perder la zona izquierda. Las fronteras se incluyen.','(−1;1): 0≤3; 2≤3; −1≤2; 1≥0'],
 ]);a.visual=rationalGraph(c);
 const b=vertex(p[1],[
  ['Sobre y=0, la recta −x+y=3 fija el vértice izquierdo.','−x=3 ⇒ A=(−3;0)'],
  ['El corte de x=2 con y=0 es el vértice inferior derecho.','B=(2;0)'],
  ['La recta x+y=3 corta x=2 en el extremo superior derecho.','2+y=3 ⇒ C=(2;1)'],
  ['Las dos rectas oblicuas se cortan al sumarlas.','x+y=3; −x+y=3 ⇒ 2y=6 ⇒ D=(0;3)'],
  ['Los dos cruces restantes se descartan por incumplir una restricción.','(3;0): x>2; (2;5): x+y=7>3'],
  ['Verificamos las dos desigualdades oblicuas en todos los vértices.','(x+y;−x+y): A=(−3;3), B=(2;−2), C=(3;−1), D=(3;3)'],
  ['Los cuatro también cumplen x≤2 e y≥0; no existen más intersecciones factibles.','A–B–C–D es el contorno del recinto'],
 ]);
 const d=part(p[2],'Máximo 6 en (−3;0); mínimo −5 en (2;1).',['Máximo 0 en (0;0); mínimo −5 en (2;1).','Máximo 6 en (−3;0); mínimo −4 en (2;0).','Máximo 5 en (2;1); mínimo −6 en (−3;0).'],['Excluir indebidamente las abscisas negativas.','Omitir el vértice C al buscar el mínimo.','Cambiar el signo completo de la función objetivo.'],[
  ['El recinto es un polígono cerrado y acotado. Evaluamos la función en sus cuatro vértices.','F(x,y)=−2x−y'],
  ['Calculamos los valores sobre el eje x, cuidando los signos.','F(A)=−2·(−3)=6; F(B)=−2·2=−4'],
  ['Calculamos los otros dos valores.','F(C)=−4−1=−5; F(D)=−3'],
  ['Comparamos: ninguno de los extremos se repite en otro vértice.','−5<−4<−3<6'],
  ['Una identidad con holguras no negativas prueba el máximo global de forma independiente.','6−F=2(3+x−y)+3y≥0'],
  ['La igualdad exige y=0 y −x+y=3; por tanto, el máximo es único.','F=6 ⇒ (x,y)=(−3;0)'],
  ['Otra identidad demuestra el mínimo global. La igualdad exige x=2 e x+y=3.','F+5=(3−x−y)+(2−x)≥0 ⇒ F mínimo=−5 en (2;1)'],
 ],'LINEAR_DUAL_CERTIFICATES_WITH_NEGATIVE_ABSCISSA',v);return[a,b,d];}
 assert.equal(c.index,1125);assert.equal(p.length,2);
 const a=vertex(p[0],[
  ['Escribimos las cotas superiores e inferiores para y sin invertir incorrectamente las desigualdades.','y≤frac{13−x}{2}; y≥x−4; y≤frac{x+7}{2}; y≥5−x'],
  ['Las dos cotas inferiores se cruzan en el vértice inferior.','x−4=5−x ⇒ A=(frac{9}{2};frac{1}{2})'],
  ['La primera cota superior corta y=x−4 en el vértice derecho.','x+2(x−4)=13 ⇒ 3x=21 ⇒ B=(7;3)'],
  ['Las dos cotas superiores se cruzan en el vértice más alto.','13−x=x+7 ⇒ x=3; y=5 ⇒ C=(3;5)'],
  ['La cota y=(x+7)/2 corta y=5−x en el vértice izquierdo.','x−2(5−x)=−7 ⇒ 3x=3 ⇒ D=(1;4)'],
  ['Descartamos los cruces de fronteras no adyacentes: cada uno incumple otra restricción.','(−3;8): x−2y=−19<−7; (15;11): x+2y=37>13'],
  ['Sustituimos los cuatro vértices en las restricciones.','(x+2y;x−y;x−2y;x+y): A=(frac{11}{2};4;frac{7}{2};5), B=(13;4;1;10), C=(13;−2;−7;8), D=(9;−3;−7;5)'],
  ['La gráfica muestra A–B–C–D, incluidas sus fronteras. Un punto interior confirma el sombreado.','(4;3): 10≤13; 1≤4; −2≥−7; 7≥5'],
 ]);a.visual=rationalGraph(c);
 const b=part(p[1],'Máximo 10 en (7;3); mínimo 5 en todo el segmento (1;4)–(frac{9}{2};frac{1}{2}).',['Máximo 10 en (7;3); mínimo 5 solo en (1;4).','Máximo 8 en (3;5); mínimo 5 en todo el segmento (1;4)–(frac{9}{2};frac{1}{2}).','Máximo 10 en (7;3); mínimo 5 en todo el segmento (1;4)–(3;5).'],['No reconocer que toda una arista minimiza la función.','Elegir el vértice de mayor ordenada sin comparar x+y.','Propagar la igualdad a una arista equivocada.'],[
  ['Evaluamos el objetivo en los cuatro vértices.','F=x+y; F(A)=5; F(B)=10; F(C)=8; F(D)=5'],
  ['El máximo es 10 en B. El mínimo 5 coincide en A y D, que son extremos de una misma arista.','5<8<10'],
  ['La restricción x+y≥5 demuestra que no puede haber valores menores en el recinto.','F−5=x+y−5≥0'],
  ['La igualdad corresponde al segmento AD completo. Lo parametrizamos sin incluir puntos externos.','(x,y)=(1+frac{7}{2}t;4−frac{7}{2}t), 0≤t≤1'],
  ['Cada punto del segmento cumple las demás restricciones; la suma x+y se mantiene en 5.','x+2y=9−frac{7}{2}t≤13; x−y=−3+7t≤4; x−2y=−7+frac{21}{2}t≥−7'],
  ['Una cota independiente demuestra el máximo global mediante las dos primeras holguras.','10−F=frac{2}{3}(13−x−2y)+frac{1}{3}(4−x+y)≥0'],
  ['La igualdad exige que ambas holguras sean cero y determina un punto único.','x+2y=13; x−y=4 ⇒ (x,y)=(7;3)'],
  ['El máximo es único; el mínimo tiene infinitas soluciones, exactamente las del segmento indicado.','F máximo=10; F mínimo=5'],
 ],'LINEAR_EXACT_LEVEL_FACE_AND_DUAL_UPPER_BOUND',{...v,minimumFace:{from:[1,4],to:[4.5,.5],value:5}});return[a,b];
}
export function buildNegativeLevelFaceBatch(id='batch-0296',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildNegativeLevelFaceBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0296-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0296.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0)}));}
