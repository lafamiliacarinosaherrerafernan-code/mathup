// Both objective fractions and inequalities checked against official PDF pages.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[
 {index:247,kind:'linear-fractional-slope-maximum',constraints:[[-3,-1,-9],[4,7,98],[5,-2,15],[-1,0,0]],objective:[14,8,0],domain:{x:[0,8],y:[0,15]},labels:['3x + y ≥ 9','4x + 7y ≤ 98','5x − 2y ≤ 15','x ≥ 0'],literals:['14x + 8 y','y + 3x ≥ 9','y ≤ − 4 x + 14','5x − 2 y ≤ 15','7','que no sea el óptimo']},
 {index:547,kind:'linear-negative-coordinate-optimal-edge',constraints:[[-1,1,5],[-2,-1,4],[4,1,10],[0,-1,0]],objective:[1,.5,0],domain:{x:[-4,4],y:[0,7]},labels:['y ≤ x + 5','2x + y ≥ −4','4x + y ≤ 10','y ≥ 0'],literals:['y ≤ x + 5','2x + y ≥ −4','4x ≤ 10 − y','y ≥ 0','x + 1 y','2']},
];
export function solve(c,text){const p=officialParts(text),v=derive(c);
 if(c.index===247){assert.equal(p.length,3);const a=part(p[0],'Vértices (0;9), (3;0), (7;10), (0;14).',[
 'Vértices (0;0), (3;0), (7;10), (0;14).','Vértices (0;9), (3;0), (10;7), (0;14).','Vértices (0;9), (3;0), (7;10), (0;98).'
 ],['Olvidar la cota inferior y+3x≥9.','Intercambiar coordenadas de la intersección.','Confundir 4x+7y≤98 con y≤98.'],[
 ['Despejamos las cotas de y sin alterar el sentido de las desigualdades.','y≥9−3x; y≤14−frac{4}{7}x; y≥frac{5x−15}{2}; x≥0'],
 ['Sobre el eje vertical la región queda entre las dos cotas siguientes.','x=0 ⇒ 9≤y≤14 ⇒ A=(0;9), D=(0;14)'],
 ['Intersecamos las dos fronteras inferiores para determinar el cambio de borde.','9−3x=frac{5x−15}{2} ⇒ 18−6x=5x−15 ⇒ B=(3;0)'],
 ['Intersecamos la frontera superior con la segunda cota inferior.','4x+7y=98; 5x−2y=15 ⇒ 43x=301 ⇒ C=(7;10)'],
 ['La intersección de la primera cota inferior con la superior tiene abscisa negativa y no pertenece a la región.','9−3x=14−frac{4}{7}x ⇒ x=−frac{35}{17}<0'],
 ['Comprobamos los cuatro vértices en todas las fronteras originales.','(3x+y;4x+7y;5x−2y): A=(9;63;−18), B=(9;12;15), C=(31;98;15), D=(14;98;−28)'],
 ['Unimos A–B–C–D y sombreamos la intersección, incluyendo las fronteras. Un punto interior verifica el sentido.','(3;5): 14≥9; 47≤98; 5≤15; x≥0'],
 ],'EXHAUSTIVE_BOUNDARY_INTERSECTIONS_AND_FEASIBILITY',v);a.visual=rationalGraph(c);return[a,
 part(p[1],'Máximo 178 en (7;10).',['Máximo 112 en (0;14).','Máximo 196 en (10;7).','Máximo 42 en (3;0).'],['Elegir la mayor ordenada sin comparar la función.','Intercambiar las coordenadas y aceptar un punto no factible.','Confundir un mínimo de los vértices con el máximo.'],[
 ['El recinto es cerrado y acotado; la función lineal alcanza el máximo en un vértice o en una arista.','F=14x+8y'],
 ['Evaluamos los vértices situados en el eje vertical.','F(A)=72; F(D)=112'],
 ['Evaluamos los dos vértices restantes.','F(B)=42; F(C)=98+80=178'],
 ['Comparamos todos los resultados: el mayor es 178.','42<72<112<178'],
 ['La cota se verifica independientemente con una combinación de holguras no negativas.','178−F=frac{68}{43}(98−4x−7y)+frac{66}{43}(15−5x+2y)≥0'],
 ['Ambos coeficientes son positivos. La igualdad exige las dos fronteras correspondientes, cuya única intersección es C.','4x+7y=98; 5x−2y=15 ⇒ (x,y)=(7;10)'],
 ],'EXACT_OBJECTIVE_VALUES_AND_GLOBAL_DUAL_BOUND',v),
 part(p[2],'Por ejemplo, (0;9): es factible y F(0,9)=72<178.',[
 'Por ejemplo, (7;10): es factible y no es óptimo.','Por ejemplo, (0;0): es factible y F(0,0)=0<178.','Por ejemplo, (0;15): es factible y F(0,15)=120<178.'
 ],['Proponer precisamente el punto óptimo.','Comprobar el objetivo sin comprobar la primera restricción.','Aceptar un punto que incumple la cota superior.'],[
 ['Basta exhibir un punto que satisfaga todas las restricciones y tenga un valor inferior al máximo. Elegimos un vértice ya calculado.','P=(0;9)'],
 ['Verificamos la primera desigualdad.','y+3x=9+0=9≥9'],
 ['Verificamos la segunda desigualdad en su forma original.','9≤−frac{4}{7}·0+14=14'],
 ['Verificamos las restantes condiciones.','5·0−2·9=−18≤15; x=0≥0'],
 ['Calculamos el valor del objetivo y lo comparamos con el máximo demostrado.','F(P)=14·0+8·9=72<178'],
 ['El punto pertenece al recinto pero no es óptimo; no es necesario que sea interior.','P=(0;9) satisface lo solicitado'],
 ],'FEASIBLE_NONOPTIMAL_WITNESS',{point:[0,9],value:72,maximum:178})];}
 assert.equal(c.index,547);assert.equal(p.length,2);const a=part(p[0],'Vértices (−3;2), (−2;0), (frac{5}{2};0), (1;6).',[
 'Vértices (0;0), (−2;0), (frac{5}{2};0), (1;6).','Vértices (−3;2), (−2;0), (10;0), (1;6).','Vértices (−3;2), (−2;0), (frac{5}{2};0), (6;1).'
 ],['Imponer x≥0 aunque no figura en el enunciado.','Omitir el coeficiente 4 al hallar el corte horizontal.','Intercambiar coordenadas en la intersección superior.'],[
 ['Despejamos las restricciones. No añadimos ninguna condición de positividad para x.','max(0;−4−2x)≤y≤min(x+5;10−4x)'],
 ['Sobre y=0 obtenemos el segmento horizontal permitido.','x≥−5; x≥−2; x≤frac{5}{2} ⇒ B=(−2;0), C=(frac{5}{2};0)'],
 ['Intersecamos la primera recta con la frontera inferior oblicua.','x+5=−4−2x ⇒ 3x=−9 ⇒ A=(−3;2)'],
 ['Intersecamos las dos fronteras superiores.','x+5=10−4x ⇒ 5x=5 ⇒ D=(1;6)'],
 ['El otro cruce oblicuo se descarta por ordenada negativa.','−4−2x=10−4x ⇒ (x,y)=(7;−18); y<0'],
 ['Comprobamos los vértices con las expresiones originales.','(y−x;2x+y;4x+y;y): A=(5;−4;−10;2), B=(2;−4;−8;0), C=(−frac{5}{2};5;10;0), D=(5;8;10;6)'],
 ['El punto (0;1) comprueba el sombreado. La figura une A–B–C–D e incluye los bordes.','1≤5; 1≥−4; 1≤10; 1≥0'],
 ],'EXACT_INTERSECTIONS_AND_FEASIBILITY',v);a.visual=rationalGraph(c);return[a,
 part(p[1],'Máximo 4 en (1;6); mínimo −2 en todo el segmento (−3;2)–(−2;0).',[
 'Máximo 4 en (1;6); mínimo −2 únicamente en (−3;2).','Máximo frac{5}{2} en (frac{5}{2};0); mínimo −2 en todo el segmento (−3;2)–(−2;0).','Máximo 7 en (1;6); mínimo −2 en todo el segmento (−3;2)–(−2;0).'
 ],['Olvidar que el mismo mínimo se alcanza en toda la arista.','Omitir el vértice superior al comparar.','Leer el coeficiente fraccionario de y como 1.'],[
 ['El coeficiente de y es un medio según la fracción impresa en el PDF.','f=x+frac{1}{2}y'],
 ['Evaluamos los vértices inferiores y el superior.','f(A)=−2; f(B)=−2; f(C)=frac{5}{2}; f(D)=4'],
 ['La cota inferior se deduce directamente de la segunda restricción.','f+2=frac{1}{2}(2x+y+4)≥0'],
 ['Hay igualdad sobre la recta 2x+y=−4. Buscamos la parte que pertenece al recinto.','y=−4−2x; y≥0 ⇒ x≤−2; y≤x+5 ⇒ x≥−3'],
 ['Por tanto, todos los puntos del segmento AB alcanzan el mínimo; no solo sus extremos.','−3≤x≤−2; y=−4−2x ⇒ f=−2'],
 ['Otra combinación no negativa demuestra la cota superior global.','4−f=frac{1}{5}(5+x−y)+frac{3}{10}(10−4x−y)≥0'],
 ['La igualdad superior requiere ambas fronteras activas; su única intersección es D.','y=x+5; 4x+y=10 ⇒ (x,y)=(1;6); f máximo=4'],
 ],'EXACT_DUAL_BOUNDS_AND_OPTIMAL_FACE',v)];
}
export function buildSlopesEdgeBatch(id='batch-0301',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildSlopesEdgeBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0301-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0301.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0)}));}
