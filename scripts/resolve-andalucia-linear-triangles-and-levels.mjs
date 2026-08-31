// Three complete official-page-inspected exercises. No historical answer is used.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[
 {index:1248,kind:'linear-triangle-zero-face',constraints:[[-2,1,1],[4,1,13],[-1,-1,-4]],objective:[-3,1.5,0],domain:{x:[0,4],y:[0,6]},labels:['y ≤ 2x + 1','y ≤ 13 − 4x','x ≥ 4 − y'],literals:['y ≤ 2x + 1','y ≤ 13 − 4x','x≥4− y','(1.1 , 2.8)','−3x +1.5y']},
 {index:1473,kind:'linear-upper-level-face',constraints:[[1,2,3],[1,-1,1],[-1,0,1],[0,-1,0]],objective:[2,4,0],domain:{x:[-2,3],y:[0,3]},labels:['x + 2y ≤ 3','x − y ≤ 1','x ≥ −1','y ≥ 0'],literals:['x + 2 y ≤ 3','x − y ≤ 1','x ≥ −1','y ≥ 0','2x + 4 y'],verticesText:'(−1;0), (1;0), (frac{5}{3};frac{2}{3}), (−1;2)',wrongVertices:['(0;0), (1;0), (frac{5}{3};frac{2}{3}), (0;frac{3}{2})','(−1;0), (1;0), (frac{2}{3};frac{5}{3}), (−1;2)','(−1;0), (3;0), (frac{5}{3};frac{2}{3}), (−1;2)']},
 {index:1619,kind:'linear-horizontal-strip',constraints:[[-3,-1,-4],[1,1,6],[0,-1,0],[0,1,5]],objective:[5,3,0],domain:{x:[-1,7],y:[0,6]},labels:['3x + y ≥ 4','x + y ≤ 6','y ≥ 0','y ≤ 5'],literals:['3x + y ≥ 4','x + y ≤ 6','0 ≤ y ≤ 5','5x + 3y'],verticesText:'(frac{4}{3};0), (6;0), (1;5), (−frac{1}{3};5)',wrongVertices:['(frac{4}{3};0), (6;0), (1;5), (frac{1}{3};5)','(frac{4}{3};0), (6;0), (5;1), (−frac{1}{3};5)','(4;0), (6;0), (1;5), (−frac{1}{3};5)']},
];
const vertex=(p,c,steps,visual=true)=>{const r=part(p,`Vértices ${c.verticesText}.`,c.wrongVertices.map(s=>`Vértices ${s}.`),['Añadir positividad no exigida o perder el signo de una coordenada.','Intercambiar las coordenadas al resolver un sistema.','Tomar un corte no factible o dividir incorrectamente al despejar.'],steps,'ALL_PAIRWISE_BOUNDARIES_AND_FEASIBILITY',derive(c));if(visual)r.visual=rationalGraph(c);return r;};
export function solve(c,text){const p=officialParts(text),v=derive(c);
 if(c.index===1248){assert.equal(p.length,3);
 const a=part(p[0],'No pertenece: x+y=3,9<4.',['Sí pertenece: cumple las tres desigualdades.','No pertenece: y=2,8>2x+1=3,2.','Sí pertenece: basta cumplir las dos cotas superiores.'],['No comprobar la tercera restricción.','Invertir la comparación entre 2,8 y 3,2.','Confundir la intersección de tres semiplanos con dos de ellos.'],[
  ['Un punto pertenece al recinto únicamente si satisface simultáneamente las tres restricciones.','P=(1,1;2,8)'],
  ['Sustituimos la abscisa en la primera cota superior.','2x+1=2·1,1+1=3,2'],
  ['La ordenada cumple esta primera condición.','2,8≤3,2'],
  ['Sustituimos en la segunda cota superior y comparamos.','13−4·1,1=8,6; 2,8≤8,6'],
  ['La tercera equivale a x+y≥4. En el punto dado no se cumple.','1,1+2,8=3,9<4'],
  ['Aunque cumple dos desigualdades, incumplir una basta para excluir el punto.','P no pertenece al recinto'],
 ],'ALL_THREE_POINT_INEQUALITIES',{point:[1.1,2.8],left:[.6,7.2,-3.9],bounds:[1,13,-4],belongs:false});
 const b=part(p[1],'Máximo 1,5 en todo el segmento (1;3)–(2;5); mínimo −7,5 en (3;1).',['Máximo 1,5 solo en (2;5); mínimo −7,5 en (3;1).','Máximo 7,5 en (3;1); mínimo −1,5 en (1;3).','Máximo 1,5 en todo el segmento (2;5)–(3;1); mínimo −7,5 en (3;1).'],['Ignorar que la función es constante sobre una arista.','Cambiar el signo de todo el objetivo.','Extender el máximo a la arista equivocada.'],[
  ['Despejamos la tercera restricción y obtenemos dos cotas superiores y una inferior.','4−x≤y≤min(2x+1;13−4x)'],
  ['Intersecamos las dos cotas superiores.','2x+1=13−4x ⇒ x=2; y=5 ⇒ B=(2;5)'],
  ['Intersecamos la cota inferior con cada superior.','4−x=2x+1 ⇒ A=(1;3); 4−x=13−4x ⇒ C=(3;1)'],
  ['Los tres puntos cumplen las restricciones; delimitan el triángulo cerrado que se muestra. Evaluamos el objetivo.','F(A)=−3+4,5=1,5; F(B)=−6+7,5=1,5; F(C)=−9+1,5=−7,5'],
  ['El máximo se repite en A y B. Toda la arista AB satisface y=2x+1 y tiene el mismo valor.','F=−3x+1,5(2x+1)=1,5; 1≤x≤2'],
  ['La primera restricción demuestra la cota superior en cualquier punto del recinto.','1,5−F=1,5(1+2x−y)≥0'],
  ['Las otras dos restricciones demuestran independientemente el mínimo global.','F+7,5=1,5(13−4x−y)+3(x+y−4)≥0'],
  ['La igualdad inferior exige ambas fronteras simultáneamente, por lo que el mínimo es único.','4x+y=13; x+y=4 ⇒ C=(3;1)'],
 ],'LINEAR_OPTIMAL_EDGE_AND_DUAL_CERTIFICATES',v);b.visual=rationalGraph(c);
 const d=part(p[2],'Sí: por ejemplo, (2;4) pertenece al recinto y F(2,4)=0.',['No: F es estrictamente positiva en todo el recinto.','Sí: por ejemplo, (0;0) pertenece al recinto y F(0,0)=0.','Sí: por ejemplo, (2;5) pertenece al recinto y F(2,5)=0.'],['Ignorar el cambio de signo entre los valores extremos.','Resolver F=0 sin comprobar la región.','Confundir un punto de máximo con un cero.'],[
  ['Buscamos puntos de la recta de nivel cero, no solamente vértices.','−3x+1,5y=0 ⇒ y=2x'],
  ['Sustituimos en la primera desigualdad: se cumple para cualquier x.','2x≤2x+1'],
  ['La segunda determina la cota superior de x sobre esa recta.','2x≤13−4x ⇒ x≤frac{13}{6}'],
  ['La tercera determina la cota inferior.','x≥4−2x ⇒ x≥frac{4}{3}'],
  ['El intervalo no es vacío: existe todo un segmento de ceros y podemos escoger x=2.','frac{4}{3}≤x≤frac{13}{6}; y=2x'],
  ['Comprobamos directamente el ejemplo tanto en el recinto como en el objetivo.','4≤5; 4≤5; 2≥0; F(2,4)=−6+6=0'],
 ],'ZERO_LEVEL_LINE_AND_FEASIBLE_INTERVAL',{xInterval:[4/3,13/6],line:[-3,1.5,0],witness:[2,4]});return[a,b,d];}
 if(c.index===1473){assert.equal(p.length,2);
 const a=vertex(p[0],c,[
  ['Despejamos y y no añadimos x≥0, pues el enunciado permite x≥−1.','max(0;x−1)≤y≤frac{3−x}{2}; x≥−1'],
  ['Sobre y=0, las restricciones exigen −1≤x≤1: aparecen los dos vértices inferiores.','A=(−1;0); B=(1;0)'],
  ['Las dos rectas oblicuas se cortan sustituyendo y=x−1.','x+2(x−1)=3 ⇒ 3x=5 ⇒ C=(frac{5}{3};frac{2}{3})'],
  ['La recta superior corta la frontera x=−1 en el vértice izquierdo alto.','−1+2y=3 ⇒ D=(−1;2)'],
  ['Los otros cruces no son factibles: uno incumple x−y≤1 y el otro y≥0.','(3;0): 3>1; (−1;−2): −2<0'],
  ['Sustituimos todos los vértices en las dos expresiones oblicuas.','(x+2y;x−y): A=(−1;−1), B=(1;1), C=(3;1), D=(3;−3)'],
  ['Todos cumplen x≥−1 e y≥0. La gráfica muestra el cuadrilátero completo y sus fronteras.','(0;1) interior: 2<3; −1<1; 0>−1; 1>0'],
 ]);
 const b=part(p[1],'Máximo 6 en todo el segmento (−1;2)–(frac{5}{3};frac{2}{3}); mínimo −2 en (−1;0).',['Máximo 6 solo en (−1;2); mínimo −2 en (−1;0).','Máximo 6 en todo el segmento (−1;2)–(frac{5}{3};frac{2}{3}); mínimo 0 en (0;0).','Máximo 6 en todo el segmento (−1;0)–(1;0); mínimo −2 en (−1;0).'],['No reconocer todos los puntos de la arista óptima.','Imponer indebidamente x≥0 y excluir el verdadero mínimo.','Confundir la arista superior con la base.'],[
  ['Evaluamos el objetivo en los vértices inferiores.','F(A)=2·(−1)=−2; F(B)=2'],
  ['Evaluamos los vértices superiores conservando las fracciones.','F(C)=frac{10}{3}+frac{8}{3}=6; F(D)=−2+8=6'],
  ['Los valores extremos son −2 y 6. La igualdad del máximo en C y D anuncia una arista óptima.','−2<2<6'],
  ['El objetivo es dos veces la expresión de la primera restricción; eso demuestra la cota global.','6−F=2(3−x−2y)≥0'],
  ['La igualdad exige x+2y=3. Al sustituir las otras restricciones, su tramo factible es exactamente CD.','y=frac{3−x}{2}; −1≤x≤frac{5}{3}'],
  ['El mínimo queda demostrado mediante las restricciones x≥−1 e y≥0.','F+2=2(x+1)+4y≥0'],
  ['La igualdad inferior exige x=−1 e y=0; el mínimo es único y el máximo no.','F mínimo=−2 en A; F máximo=6 en todo CD'],
 ],'LINEAR_LEVEL_FACE_AND_NONNEGATIVE_SLACKS',v);return[a,b];}
 assert.equal(c.index,1619);assert.equal(p.length,3);
 const a=vertex(p[0],c,[
  ['Las dos últimas desigualdades delimitan una franja horizontal cerrada.','0≤y≤5'],
  ['Despejamos x en las otras dos restricciones para identificar los lados de la región.','frac{4−y}{3}≤x≤6−y'],
  ['En toda la franja la cota izquierda no supera a la derecha.','frac{4−y}{3}≤6−y ⇔ y≤7; 0≤y≤5'],
  ['Sobre y=0 obtenemos el segmento inferior.','frac{4}{3}≤x≤6'],
  ['Sobre y=5 obtenemos el segmento superior, que incluye abscisas negativas.','−frac{1}{3}≤x≤1'],
  ['Unimos los extremos sobre las rectas oblicuas. La gráfica conserva la parte situada a la izquierda del eje y.','A=(frac{4}{3};0); B=(6;0); C=(1;5); D=(−frac{1}{3};5)'],
  ['Comprobamos un punto interior para verificar el sombreado.','(2;2): 8≥4; 4≤6; 0<2<5'],
 ]);
 const b=vertex(p[1],c,[
  ['La frontera 3x+y=4 corta el borde inferior y=0.','3x=4 ⇒ A=(frac{4}{3};0)'],
  ['La frontera x+y=6 corta el mismo borde inferior.','x=6 ⇒ B=(6;0)'],
  ['Intersecamos x+y=6 con y=5.','x+5=6 ⇒ C=(1;5)'],
  ['Intersecamos 3x+y=4 con y=5 y conservamos el signo negativo.','3x+5=4 ⇒ D=(−frac{1}{3};5)'],
  ['El cruce de las rectas oblicuas queda fuera de la franja. Los bordes horizontales son paralelos.','3x+y=4; x+y=6 ⇒ (x,y)=(−1;7); 7>5'],
  ['Verificamos ambas expresiones en los cuatro vértices.','(3x+y;x+y): A=(4;frac{4}{3}), B=(18;6), C=(8;6), D=(4;frac{14}{3})'],
  ['Todos tienen ordenada entre 0 y 5; no existen otras intersecciones factibles.','Vértices A, B, C y D'],
 ],false);
 const d=part(p[2],'Máximo 30 en (6;0); mínimo frac{20}{3} en (frac{4}{3};0).',['Máximo 20 en (1;5); mínimo frac{20}{3} en (frac{4}{3};0).','Máximo 30 en (6;0); mínimo frac{40}{3} en (−frac{1}{3};5).','Máximo 30 en (6;0); mínimo 0 en (0;0).'],['Elegir el vértice de mayor ordenada sin comparar el objetivo.','Omitir el vértice inferior izquierdo al comparar mínimos.','Aceptar el origen aunque incumple 3x+y≥4.'],[
  ['La región es un polígono cerrado y acotado. Evaluamos los dos vértices del borde inferior.','F(A)=5·frac{4}{3}=frac{20}{3}; F(B)=5·6=30'],
  ['Evaluamos los dos vértices del borde superior.','F(C)=5+15=20; F(D)=−frac{5}{3}+15=frac{40}{3}'],
  ['Ordenamos los cuatro valores sin redondear las fracciones.','frac{20}{3}<frac{40}{3}<20<30'],
  ['Una combinación no negativa de restricciones demuestra la cota superior en todo el recinto.','30−F=5(6−x−y)+2y≥0'],
  ['Para alcanzar 30 deben anularse ambas holguras, lo que fija un único punto.','y=0; x+y=6 ⇒ B=(6;0)'],
  ['Otra combinación demuestra la cota inferior.','F−frac{20}{3}=frac{5}{3}(3x+y−4)+frac{4}{3}y≥0'],
  ['La igualdad inferior exige y=0 y 3x+y=4. Los dos extremos son únicos.','F mínimo=frac{20}{3} en A=(frac{4}{3};0); F máximo=30 en B'],
 ],'LINEAR_EXACT_DUAL_UPPER_AND_LOWER_CERTIFICATES',v);return[a,b,d];
}
export function buildTrianglesLevelsBatch(id='batch-0297',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildTrianglesLevelsBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0297-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0297.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0)}));}
