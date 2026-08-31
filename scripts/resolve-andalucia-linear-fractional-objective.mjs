// 2021 extraordinary official Q2: the PDF, not its flattened text, proves
// the objective coefficients -1/5 and 5/2 and the requested level 47/3.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[{index:1322,kind:'linear-fractional-objective',constraints:[[5,-4,-19],[3,-4,-13],[-1,0,7],[1,1,-2]],objective:[-1/5,5/2,0],domain:{x:[-8,0],y:[-3,6]},labels:['5x − 4y ≤ −19','3x − 4y ≤ −13','x ≥ −7','−x − y ≥ 2'],literals:['5x − 4y ≤ −19','3x − 4y ≤ −13','x ≥ −7','−x−y ≥ 2','G(x, y) = − 1 x + 5 y','valor 47'],pdfObjectiveEvidence:{page:1,coefficients:[[-1,5],[5,2]],requestedLevel:[47,3]}}];
export function solve(c,text){const p=officialParts(text),v=derive(c);assert.equal(p.length,3);
 const a=part(p[0],'Vértices (−7;−2), (−3;1), (−7;5).',['Vértices (−7;−4), (−3;1), (−7;5).','Vértices (7;−2), (−3;1), (7;5).','Vértices (−7;−2), (3;−1), (−7;5).'],['Usar el corte con la primera recta aunque incumple la segunda.','Perder el signo negativo de la cota de x.','Cambiar ambos signos del vértice común.'],[
  ['Despejamos las cotas de y; al dividir por un coeficiente negativo se invierte la desigualdad.','y≥frac{5x+19}{4}; y≥frac{3x+13}{4}; x≥−7; y≤−x−2'],
  ['La segunda cota inferior no puede superar la superior. Esta condición acota x por la derecha.','frac{3x+13}{4}≤−x−2 ⇒ 7x≤−21 ⇒ x≤−3'],
  ['En ese intervalo la segunda cota inferior es al menos tan exigente como la primera. No eliminamos una restricción sin demostrarlo.','frac{3x+13}{4}−frac{5x+19}{4}=frac{−x−3}{2}≥0'],
  ['Sobre la frontera vertical x=−7, la segunda cota y la superior fijan dos vértices.','y≥frac{−21+13}{4}=−2; y≤7−2=5 ⇒ A=(−7;−2), C=(−7;5)'],
  ['Las cotas se encuentran en el extremo derecho. La primera cota también pasa por ese punto.','x=−3 ⇒ y=1 ⇒ B=(−3;1); 5(−3)−4=−19'],
  ['El aparente corte (−7;−4) con la primera frontera no pertenece al recinto porque incumple la segunda.','3(−7)−4(−4)=−5>−13'],
  ['La intersección es el triángulo cerrado ABC que muestra la gráfica. No añadimos x≥0 ni y≥0.','−7≤x≤−3; frac{3x+13}{4}≤y≤−x−2'],
 ],'ALL_BOUNDARY_INTERSECTIONS_AND_REDUNDANCY_PROOF',v);a.visual=rationalGraph(c);
 const b=part(p[1],'Mínimo −frac{18}{5} en (−7;−2); máximo frac{139}{10} en (−7;5).',['Mínimo −frac{43}{5} en (−7;−4); máximo frac{139}{10} en (−7;5).','Mínimo frac{31}{10} en (−3;1); máximo frac{139}{10} en (−7;5).','Mínimo −frac{18}{5} en (−7;−2); máximo frac{31}{10} en (−3;1).'],['Evaluar un punto no factible sin comprobar la segunda desigualdad.','Omitir el vértice inferior izquierdo al minimizar.','Omitir el vértice superior izquierdo al maximizar.'],[
  ['Recuperamos los coeficientes fraccionarios directamente del PDF oficial y evaluamos el objetivo en A.','G=−frac{1}{5}x+frac{5}{2}y; G(A)=frac{7}{5}−5=−frac{18}{5}'],
  ['Evaluamos el vértice derecho sin redondear.','G(B)=frac{3}{5}+frac{5}{2}=frac{6+25}{10}=frac{31}{10}'],
  ['Evaluamos el vértice superior izquierdo.','G(C)=frac{7}{5}+frac{25}{2}=frac{14+125}{10}=frac{139}{10}'],
  ['Comparamos los tres valores.','−frac{18}{5}<frac{31}{10}<frac{139}{10}'],
  ['Una combinación no negativa de restricciones demuestra el máximo en todos los puntos del triángulo.','frac{139}{10}−G=frac{5}{2}(−2−x−y)+frac{27}{10}(x+7)≥0'],
  ['La igualdad superior exige x=−7 e y=−x−2, de donde C es el único máximo.','x=−7; y=5'],
  ['Otra combinación demuestra la cota inferior y su punto de igualdad.','G+frac{18}{5}=frac{5}{8}(4y−3x−13)+frac{67}{40}(x+7)≥0'],
  ['La igualdad inferior exige x=−7 y 4y−3x−13=0, de donde A es el único mínimo.','x=−7; y=−2'],
 ],'EXACT_FRACTIONAL_OBJECTIVE_DUAL_CERTIFICATES',v);
 const d=part(p[2],'No: frac{47}{3}>frac{139}{10}, que es el máximo del recinto.',['Sí: basta tomar un punto sobre la recta G=frac{47}{3}, aunque no pertenezca al recinto.','Sí: frac{47}{3} está entre −frac{18}{5} y frac{139}{10}.','No: frac{47}{3}<−frac{18}{5}, que es el mínimo del recinto.'],['Confundir una recta del plano con su intersección con la región factible.','Comparar incorrectamente las fracciones.','Usar el extremo inferior y un sentido de desigualdad falsos.'],[
  ['Los valores alcanzables de G deben estar entre su mínimo y su máximo sobre la región.','−frac{18}{5}≤G≤frac{139}{10}'],
  ['El valor solicitado en el PDF es 47/3. Lo comparamos con el máximo usando denominadores positivos.','frac{47}{3} y frac{139}{10}'],
  ['Multiplicamos en cruz para conservar una comparación exacta.','47·10=470; 139·3=417'],
  ['La diferencia es estrictamente positiva.','frac{47}{3}−frac{139}{10}=frac{53}{30}>0'],
  ['Por tanto, la recta de nivel pedida queda fuera del rango alcanzable; ningún punto del recinto puede satisfacerla.','G=frac{47}{3} es imposible en la región'],
  ['No basta resolver una ecuación en el plano: cualquier solución candidata debe respetar todas las restricciones.','Respuesta: no'],
 ],'EXACT_RATIONAL_RANGE_EXCLUSION',{requested:[47,3],maximum:[139,10],difference:[53,30],attainable:false});return[a,b,d];
}
export function buildFractionalObjectiveBatch(id='batch-0299',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildFractionalObjectiveBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0299-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0299.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0)}));}
