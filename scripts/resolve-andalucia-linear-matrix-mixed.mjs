// Two official mixed questions: optimize on a given polygon and solve a
// matrix equation. Matrix entries were inspected on the official PDF page.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:135,kind:'linear-square-and-skew-matrix',literals:['(1, 0)','(0, 1)','(−1, 0)','(0, −1)','3x + 2y + 7','x + y + 6','A − At'],A:[[5,-2],[3,1]],B:[[-1,3],[2,-1]],X:[[.4,-.2],[.2,-.6]],wrongX:[[[-.4,.2],[-.2,.6]],[[.4,.2],[-.2,-.6]],[[3/11,1/11],[13/11,-14/11]]]},
 {index:398,kind:'matrix-and-pentagon-optimal-face',literals:['A(0, 2)','B(2, 0)','C(4, 0)','D(6, 3)','E(3,6)','4x − 3y + 8'],A:[[0,1],[2,0]],C:[[0,2],[-1,2]],D:[[1,-1],[2,-1]],X:[[0,3],[-2,0]],wrongX:[[[-3,3],[-2,6]],[[0,-1],[6,0]],[[0,1.5],[-1,0]]]},
];
export function solve(c,text){
 if(c.index===135){const start=text.indexOf('a) (1 punto) Se considera');assert.ok(start>=0);text=text.slice(start);}
 const p=officialParts(text);assert.equal(p.length,2);
 if(c.index===135)return [
 part(p[0],'F: máximo 10 en (1;0). G: mínimo 5 en todo el segmento de (−1;0) a (0;−1).',[
 'F: máximo 9 en (0;1). G: mínimo 5 en todo el segmento de (−1;0) a (0;−1).',
 'F: máximo 10 en (1;0). G: mínimo 5 únicamente en (−1;0) y (0;−1).',
 'F: máximo 10 en (1;0). G: mínimo 7 en todo el segmento de (1;0) a (0;1).'
 ],['Escoger el segundo vértice sin comparar todos los valores de F.','Omitir los puntos interiores de la arista óptima.','Elegir la arista de máximo de G como si fuera la de mínimo.'],[
 ['El recinto es el cuadrado cerrado con los cuatro vértices dados; las funciones son afines.','V₁=(1;0); V₂=(0;1); V₃=(−1;0); V₄=(0;−1)'],
 ['Evaluamos F en cada vértice, conservando el término independiente.','F(V₁)=10; F(V₂)=9; F(V₃)=4; F(V₄)=5'],
 ['El máximo de una función afín sobre un polígono es el mayor valor de sus vértices. Aquí solo un vértice alcanza ese valor.','máximo F=10, únicamente en (1;0)'],
 ['Evaluamos ahora G por separado, sin reutilizar la tabla de F.','G(V₁)=7; G(V₂)=7; G(V₃)=5; G(V₄)=5'],
 ['Los vértices V₃ y V₄ son adyacentes y tienen el mismo mínimo. Todo su segmento tiene ese valor por afinidad.','(x;y)=(−t;t−1), 0≤t≤1 ⇒ x+y=−1 ⇒ G=5'],
 ['Comprobamos que no hay más minimizadores: el cuadrado satisface x+y≥−1; la igualdad corta exactamente esa arista.','G−5=x+y+1≥0; G=5 ⇔ x+y=−1'],
 ['Como control global, cualquier punto del cuadrado es combinación convexa de sus vértices; sus valores de F y G son las mismas combinaciones de la tabla.','F≤10; G≥5'],
 ],'AFFINE_VERTEX_VALUES_AND_COMPLETE_OPTIMAL_FACE',{vertices:[[1,0],[0,1],[-1,0],[0,-1]],F:[10,9,4,5],G:[7,7,5,5],minimumFace:[[-1,0],[0,-1]]}),
 part(p[1],'X=[[frac{2}{5},−frac{1}{5}],[frac{1}{5},−frac{3}{5}]]',[
 'X=[[−frac{2}{5},frac{1}{5}],[−frac{1}{5},frac{3}{5}]]','X=[[frac{2}{5},frac{1}{5}],[−frac{1}{5},−frac{3}{5}]]','X=[[frac{3}{11},frac{1}{11}],[frac{13}{11},−frac{14}{11}]]'
 ],['Usar Aᵗ−A en vez de A−Aᵗ.','Transponer la matriz solución.','Resolver AX=B olvidando restar Aᵗ.'],[
 ['La ecuación tiene la incógnita a la derecha de A−Aᵗ, por lo que debemos multiplicar por la inversa a la izquierda.','(A−Aᵗ)X=B'],
 ['Transponemos intercambiando filas y columnas y restamos entrada a entrada.','Aᵗ=[[5,3],[−2,1]]; A−Aᵗ=[[0,−5],[5,0]]'],
 ['Comprobamos que la matriz es invertible antes de despejar.','det(A−Aᵗ)=0·0−(−5)·5=25≠0'],
 ['Aplicamos la fórmula de la inversa de una matriz de orden dos.','(A−Aᵗ)⁻¹=[[0,frac{1}{5}],[−frac{1}{5},0]]'],
 ['Multiplicamos por B respetando el orden y calculamos las cuatro entradas.','X=[[0,frac{1}{5}],[−frac{1}{5},0]]·[[−1,3],[2,−1]]=[[frac{2}{5},−frac{1}{5}],[frac{1}{5},−frac{3}{5}]]'],
 ['Verificación independiente: sustituimos en la ecuación original; el producto devuelve exactamente B.','[[0,−5],[5,0]]·[[frac{2}{5},−frac{1}{5}],[frac{1}{5},−frac{3}{5}]]=[[−1,3],[2,−1]]'],
 ['La invertibilidad garantiza que no existe otra solución.','X única'],
 ],'MATRIX_SUBSTITUTION_IN_ORIGINAL_EQUATION',{A:c.A,B:c.B,X:c.X,wrongX:c.wrongX})];
 return [part(p[0],'X=[[0,3],[−2,0]]',[
 'X=[[−3,3],[−2,6]]','X=[[0,−1],[6,0]]','X=[[0,frac{3}{2}],[−1,0]]'
 ],['Usar D sin transponer.','Multiplicar por la inversa de A a la derecha.','Omitir el factor 2 del segundo miembro.'],[
 ['La ecuación es AX=2(C−Dᵗ). Primero transponemos D, no C.','Dᵗ=[[1,2],[−1,−1]]'],
 ['Restamos las entradas correspondientes.','C−Dᵗ=[[0−1,2−2],[−1−(−1),2−(−1)]]=[[−1,0],[0,3]]'],
 ['Multiplicamos toda la diferencia por 2.','2(C−Dᵗ)=[[−2,0],[0,6]]'],
 ['A es invertible y su inversa debe actuar por la izquierda.','det(A)=−2≠0; A⁻¹=[[0,frac{1}{2}],[1,0]]'],
 ['Calculamos el producto que determina X.','X=A⁻¹·2(C−Dᵗ)=[[0,frac{1}{2}],[1,0]]·[[−2,0],[0,6]]=[[0,3],[−2,0]]'],
 ['Verificamos por sustitución independiente en el primer miembro original.','AX=[[0,1],[2,0]]·[[0,3],[−2,0]]=[[−2,0],[0,6]]=2(C−Dᵗ)'],
 ['La matriz hallada tiene las dimensiones requeridas y es la única solución por invertibilidad de A.','X de orden 2×2, única'],
 ],'MATRIX_TRANSPOSE_AND_SUBSTITUTION',{A:c.A,C:c.C,D:c.D,X:c.X,wrongX:c.wrongX}),
 part(p[1],'Máximo 24 en (4;0); mínimo 2 en todo el segmento de (0;2) a (3;6).',[
 'Máximo 23 en (6;3); mínimo 2 en todo el segmento de (0;2) a (3;6).',
 'Máximo 24 en (4;0); mínimo 2 únicamente en (0;2) y (3;6).',
 'Máximo 24 en (4;0); mínimo 16 en (2;0).'
 ],['Elegir el vértice con mayor x sin evaluar el término −3y.','Omitir el interior del segmento de mínimos.','Elegir un vértice que no tiene el menor valor.'],[
 ['Trabajamos en el polígono cerrado indicado, sin imponer integridad a sus puntos.','A=(0;2); B=(2;0); C=(4;0); D=(6;3); E=(3;6)'],
 ['Evaluamos la función afín en los primeros tres vértices.','F(A)=2; F(B)=16; F(C)=24'],
 ['Evaluamos los otros dos y comparamos los cinco resultados.','F(D)=24−9+8=23; F(E)=12−18+8=2'],
 ['Solo C alcanza el mayor valor. Por afinidad y convexidad, ningún punto interior o de otra arista puede superarlo ni igualarlo.','máximo F=24 únicamente en C=(4;0)'],
 ['A y E son los extremos de una arista y comparten el mínimo; no son los únicos puntos que lo alcanzan.','(x;y)=(3t;2+4t), 0≤t≤1'],
 ['Sustituimos todo el segmento para comprobar que la función es constante.','F(3t;2+4t)=12t−6−12t+8=2'],
 ['Cualquier punto del polígono es combinación convexa de los vértices. Para que el valor combinado sea 2 solo pueden intervenir A y E.','mínimo F=2 en toda la arista AE'],
 ],'CONVEX_COMBINATION_AND_COMPLETE_OPTIMAL_FACE',{vertices:[[0,2],[2,0],[4,0],[6,3],[3,6]],values:[2,16,24,23,2],minimumFace:[[0,2],[3,6]]})];
}
export function buildLinearMatrixBatch(id='batch-0306',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Matrices','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='SOURCE_SPECIFIC_MIXED_LINEAR_AND_MATRIX_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildLinearMatrixBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0306-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0306.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
