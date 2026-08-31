import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {det3} from './resolve-andalucia-mates-determinants-integrals.mjs';
export const observations=[
 [447,'a54a5b52abe3cf59c81e26bac758d93baa6dfdde0be1df1a3691c9a3436173cb',2,'B.3','6d7f1090c5237c82542a620eadef05716305c5b9af87b1ce98a1612eab4a267d',0],
 [459,'2c5278437c9b39d12317034e63fd1a4e30b153d3926def7914bceb3390e42da6',2,'3.1','9b6c060e7d692b411e5035cd76b8688e238ac21d1a3a1a5f8909d2e47e2fc0b0',0],
];
export const statements={
 447:'Sea el siguiente sistema de ecuaciones\nsystem{λx+y+z=λ+2;2x−λy+z=2;x−y+λz=λ}\na) [1,75 puntos] Discútelo según los valores de λ. ¿Tiene siempre solución?\nb) [0,75 puntos] Resuelve el sistema para λ=−1.',
 459:'Considera el sistema\nsystem{3x−y=a²;(1−a)y+2z=0;4y+(3−a)z=a−5}\na) [1,75 puntos] Discútelo según los valores de a.\nb) [0,75 puntos] Para a=0 resuelve el sistema, si es posible.',
};
export const cases=[{index:447,literals:['λx + y + z','2x − λy + z','x − y + λz'],topic:'Sistemas con determinantes'},{index:459,literals:['(1 − a)y','(3 − a)z','Para a = 0'],topic:'Sistemas con determinantes'}];
export function replacements(r){return statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_PARAMETER_SYSTEM_EQUATIONS_AND_SUBPARTS']]:[];}
export const coefficients=(index,t)=>index===447?[[t,1,1],[2,-t,1],[1,-1,t]]:[[3,-1,0],[0,1-t,2],[0,4,3-t]];
export const independent=(index,t)=>index===447?[t+2,2,t]:[t*t,0,t-5];
export function rank(input){const a=input.map(r=>[...r]);let rank=0;for(let col=0;col<a[0].length&&rank<a.length;col++){let pivot=rank;for(let i=rank+1;i<a.length;i++)if(Math.abs(a[i][col])>Math.abs(a[pivot][col]))pivot=i;if(Math.abs(a[pivot][col])<1e-9)continue;[a[rank],a[pivot]]=[a[pivot],a[rank]];const d=a[rank][col];a[rank]=a[rank].map(x=>x/d);for(let i=0;i<a.length;i++)if(i!==rank){const k=a[i][col];a[i]=a[i].map((x,j)=>x-k*a[rank][j]);}rank++;}return rank;}
export function proof(c){const roots=c.index===447?[-1]:[-1,5];return{roots,singular:roots.map(t=>{const A=coefficients(c.index,t),b=independent(c.index,t);return{parameter:t,coefficientRank:rank(A),augmentedRank:rank(A.map((r,i)=>[...r,b[i]]))};}),evaluatedParameter:c.index===447?-1:0,solution:c.index===447?{point:[1/3,4/3,0],direction:[0,-1,1]}:{point:[-2/3,-2,1],direction:null},wrongSolutions:c.index===447?[[0,1,0],[1/3,1,0],[1/3,4/3,1]]:[[2/3,-2,1],[-2/3,2,-1],[-2,-2,1]]};}
export function solve(c){const ps=officialParts(statements[c.index]),ev=proof(c),mk=(i,a,d,reasons,steps)=>part(ps[i],a,d,reasons,steps,'ROUCHE_FROBENIUS_GAUSS_RANK_AND_DIRECT_SUBSTITUTION',ev);
 if(c.index===447)return[
 mk(0,'λ≠−1: solución única; λ=−1: infinitas soluciones. Siempre tiene solución.',['λ≠−1: solución única; λ=−1: no tiene solución.','Todo λ real: solución única; no hay casos excepcionales.','λ∉{−1;1}: solución única; λ=−1: infinitas; λ=1: ninguna.'],['Confundir determinante nulo con incompatibilidad.','No comprobar el valor que anula el determinante.','Introducir una raíz inexistente del factor cuadrático.'],[
 ['Escribimos la matriz de coeficientes y la ampliada. Rouché–Frobenius exige comparar sus rangos.','A=[[λ,1,1],[2,−λ,1],[1,−1,λ]]; b=(λ+2;2;λ)'],
 ['Desarrollamos el determinante por la primera fila conservando los signos de cofactores.','det(A)=λ(1−λ²)−(2λ−1)+(λ−2)=−λ³−1'],
 ['Factorizamos la suma de cubos. El factor cuadrático nunca se anula para λ real.','det(A)=−(λ+1)(λ²−λ+1); λ²−λ+1=(λ−frac{1}{2})²+frac{3}{4}>0'],
 ['Para λ distinto de −1, el rango de A es tres; la ampliada tiene tres filas, por lo que también tiene rango tres.','λ≠−1 ⇒ rg(A)=rg(A|b)=3: compatible determinado'],
 ['En λ=−1 escribimos las ecuaciones y comparamos filas. La tercera es exactamente la primera cambiada de signo, incluido su término independiente.','system{−x+y+z=1;2x+y+z=2;x−y−z=−1}'],
 ['Las dos primeras filas son independientes: el menor de sus dos primeras columnas es distinto de cero. La tercera no aumenta ninguno de los rangos.','det([[-1,1],[2,1]])=−3≠0; rg(A)=rg(A|b)=2<3'],
 ['Rouché–Frobenius da infinitas soluciones con un parámetro en el único caso singular. No hay valor incompatible.','λ=−1: sistema compatible indeterminado; siempre existe solución'],
 ]),mk(1,'(x;y;z)=(frac{1}{3};frac{4}{3}−t;t), t∈ℝ.',['(x;y;z)=(0;1−t;t), t∈ℝ.','(x;y;z)=(frac{1}{3};1−t;t), t∈ℝ.','(x;y;z)=(frac{1}{3};frac{4}{3}−t;1+t), t∈ℝ.'],['Perder el término de x al restar ecuaciones.','No sumar x al despejar y+z en la primera ecuación.','Añadir una constante indebidamente a z.'],[
 ['Sustituimos el parámetro y conservamos las tres ecuaciones, aunque la tercera resulte dependiente.','system{−x+y+z=1;2x+y+z=2;x−y−z=−1}'],
 ['Restamos la primera ecuación a la segunda para eliminar y y z.','(2x+y+z)−(−x+y+z)=2−1 ⇒ 3x=1 ⇒ x=frac{1}{3}'],
 ['Sustituimos x en la primera ecuación y despejamos la suma restante.','−frac{1}{3}+y+z=1 ⇒ y+z=frac{4}{3}'],
 ['Tomamos z=t como variable libre y expresamos todas las soluciones.','z=t; y=frac{4}{3}−t; (x;y;z)=(frac{1}{3};frac{4}{3}−t;t), t∈ℝ'],
 ['Verificamos las tres ecuaciones para cualquier t, no solo para un valor particular.','−frac{1}{3}+frac{4}{3}−t+t=1; frac{2}{3}+frac{4}{3}−t+t=2; frac{1}{3}−frac{4}{3}+t−t=−1'],
 ])];
 return[
 mk(0,'a∉{−1;5}: solución única; a=5: infinitas soluciones; a=−1: ninguna.',['a∉{−1;5}: solución única; a=−1: infinitas soluciones; a=5: ninguna.','a∉{−1;5}: solución única; a=−1 o a=5: infinitas soluciones.','a∉{−1;5}: solución única; a=−1 o a=5: ninguna.'],['Intercambiar las condiciones de compatibilidad de los casos singulares.','Considerar que todo determinante nulo da infinitas soluciones.','Considerar que todo determinante nulo da incompatibilidad.'],[
 ['Formamos las matrices de coeficientes y términos independientes y aplicaremos Rouché–Frobenius.','A=[[3,-1,0],[0,1−a,2],[0,4,3−a]]; b=(a²;0;a−5)'],
 ['Expandimos por la primera columna. El determinante de orden dos determina los valores singulares.','det(A)=3((1−a)(3−a)−8)=3(a²−4a−5)=3(a−5)(a+1)'],
 ['Fuera de las dos raíces, ambos rangos son tres y hay solución única.','a∉{−1;5} ⇒ rg(A)=rg(A|b)=3'],
 ['En a=5, la tercera ecuación es la segunda cambiada de signo, incluidos los términos independientes.','system{3x−y=25;−4y+2z=0;4y−2z=0}'],
 ['El menor de las primeras dos filas y columnas x,z vale seis. Las filas primera y segunda son independientes, y la tercera es dependiente en ambas matrices.','det([[3,0],[0,2]])=6≠0; rg(A)=rg(A|b)=2<3: infinitas soluciones'],
 ['En a=−1, las partes izquierdas de las dos últimas ecuaciones son proporcionales, pero sus términos independientes no lo son.','system{3x−y=1;2y+2z=0;4y+4z=−6}'],
 ['Restamos el doble de la segunda fila a la tercera en la matriz ampliada. La contradicción eleva solo el rango ampliado.','F₃←F₃−2F₂ ⇒ [0,0,0|−6]; rg(A)=2; rg(A|b)=3'],
 ['Concluimos que el caso −1 es incompatible, el caso 5 es compatible indeterminado y el resto compatible determinado.','a=−1: sin solución; a=5: infinitas; a∉{−1;5}: única'],
 ]),mk(1,'(x;y;z)=(−frac{2}{3};−2;1).',['(x;y;z)=(frac{2}{3};−2;1).','(x;y;z)=(−frac{2}{3};2;−1).','(x;y;z)=(−2;−2;1).'],['Cambiar el signo al dividir y entre tres.','Perder el signo del término independiente en la tercera ecuación.','Olvidar dividir por el coeficiente tres de x.'],[
 ['Para a=0 el determinante no se anula, por lo que la solución será única. Sustituimos en las ecuaciones.','det(A)=−15≠0\nsystem{3x−y=0;y+2z=0;4y+3z=−5}'],
 ['La segunda ecuación permite despejar y en función de z.','y=−2z'],
 ['Sustituimos esa expresión en la tercera ecuación y resolvemos z.','4(−2z)+3z=−5 ⇒ −5z=−5 ⇒ z=1'],
 ['Recuperamos y y después x mediante las dos primeras ecuaciones.','y=−2; 3x=y=−2 ⇒ x=−frac{2}{3}'],
 ['Comprobamos las tres ecuaciones originales con a=0.','3(−frac{2}{3})−(−2)=0; −2+2·1=0; 4(−2)+3·1=−5'],
 ])];
}
export function buildParameterSystemBatch(id='batch-0375',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){x.primaryTopic='Sistemas con determinantes';x.secondaryTopics=['Matrices','Determinantes'];x.block='Álgebra';x.examSlot=1;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_MATH_II_ROUCHE_FROBENIUS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildParameterSystemBatch(),a='artifacts/pau-andalucia-resolution/audit/correction-0375-original-records.json';if(!fs.existsSync(a))fs.writeFileSync(a,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0375.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({exerciseId:r.exerciseId,answers:r.parts.map(p=>p.answer)}))));}
