import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {rank} from './resolve-andalucia-mates-parameter-systems.mjs';import {det3} from './resolve-andalucia-mates-determinants-integrals.mjs';
export const observations=[
 [469,'c32c32963d82d1ee57ab88a8a21a2a7b9559da905b42ecb11e094d10d95ce9e2',1,'A.3','afbeb66b96337ef1f3553601b5f7c8950cc0d751b8765f0fc24ea6766f646db8',0],
 [476,'d178e5a4f53fdde351fb047b350393b1a2fcdf04f1f23a23ebd71625431061fd',2,'B.3','4dbfe39ff32dbd9d5b219ffc29a9f91a540df4c6c3b7bc41a25b7de2cbec7f5a',0],
];
export const statements={
 469:'Considera el sistema de ecuaciones\nsystem{x+(k+1)y+2z=−1;kx+y+z=2;x−2y−z=k+1}\na) [1,75 puntos] Clasifícalo según los distintos valores de k.\nb) [0,75 puntos] Resuélvelo para el caso k=2.',
 476:'Sea M una matriz cuadrada de orden 3 tal que su determinante es det(M)=2. Calcula:\na) [0,75 puntos] El rango de M³.\nb) [0,75 puntos] El determinante de 2M^t (M^t es la matriz traspuesta de M).\nc) [0,75 puntos] El determinante de (M^(−1))².\nd) [0,5 puntos] El determinante de N, donde N es la matriz resultante de intercambiar la primera y segunda filas de M.',
};
export const cases=[{index:469,literals:['sistema de ecuaciones','distintos valores de k','caso k = 2'],topic:'Sistemas con determinantes'},{index:476,literals:['matriz cuadrada de orden 3','intercambiar la primera'],topic:'Determinantes'}];
export function replacements(r){return statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_RANK_PARAMETER_DETERMINANT_LAYOUT']]:[];}
export const coefficients=k=>[[1,k+1,2],[k,1,1],[1,-2,-1]],independent=k=>[-1,2,k+1];
export function proof(c){if(c.index===469){const singular=[0,2].map(k=>{const A=coefficients(k),b=independent(k);return{k,rankA:rank(A),rankAugmented:rank(A.map((r,i)=>[...r,b[i]]))};});assert.deepEqual(singular.map(r=>[r.rankA,r.rankAugmented]),[[2,3],[2,2]]);return{singular,particular:[7/5,-4/5,0],direction:[-1/5,-3/5,1],wrongParticulars:[[7/5,4/5,0],[-7/5,-4/5,0],[1,-1,0]]};}assert.equal(c.index,476);return{order:3,determinant:2,powerDeterminant:8,rank:3,scaledTransposeDeterminant:16,inverseSquaredDeterminant:.25,rowSwapDeterminant:-2,wrong:[[1,2,0],[4,8,2],[4,.5,-.25],[2,0,4]]};}
export function solve(c){const ps=officialParts(statements[c.index]),ev=proof(c),mk=(i,a,d,reasons,steps)=>part(ps[i],a,d,reasons,steps,'DETERMINANT_IDENTITIES_AND_GAUSS_RANK_SUBSTITUTION',ev);
 if(c.index===469)return[
 mk(0,'k∉{0;2}: solución única; k=0: ninguna; k=2: infinitas.',['k∉{0;2}: solución única; k=0: infinitas; k=2: ninguna.','k∉{0;2}: solución única; k=0 o k=2: infinitas.','k∉{0;2}: solución única; k=0 o k=2: ninguna.'],['Intercambiar la compatibilidad de los dos valores singulares.','Confundir determinante nulo con infinitas soluciones.','Confundir determinante nulo con incompatibilidad.'],[
 ['Escribimos las matrices de coeficientes y de términos independientes, sin alterar el parámetro de la tercera ecuación.','A=[[1,k+1,2],[k,1,1],[1,-2,-1]]; b=(−1;2;k+1)'],
 ['Desarrollamos por la primera fila y agrupamos las potencias de k.','det(A)=1+(k+1)²−4k−2=k²−2k=k(k−2)'],
 ['Fuera de 0 y 2, la matriz de coeficientes tiene rango tres, igual al de la ampliada. Por Rouché–Frobenius la solución es única.','k∉{0;2} ⇒ rg(A)=rg(A|b)=3'],
 ['En k=0, restamos la primera fila a la tercera en la ampliada.','A|b=[[1,1,2,−1],[0,1,1,2],[1,-2,-1,1]]; F₃−F₁=[0,−3,−3|2]'],
 ['Sumando tres veces la segunda fila a esa última fila aparece una contradicción. Las primeras dos filas contienen un menor de orden dos igual a uno.','F₃−F₁+3F₂=[0,0,0|8]; rg(A)=2; rg(A|b)=3'],
 ['En k=2, las operaciones F₂−2F₁ y F₃−F₁ dan exactamente la misma fila, incluido el término independiente.','F₂−2F₁=[0,−5,−3|4]; F₃−F₁=[0,−5,−3|4]'],
 ['El menor de las dos primeras filas y columnas vale −5, no cero. Por tanto, ambos rangos son dos y queda una variable libre.','det([[1,3],[2,1]])=−5; rg(A)=rg(A|b)=2<3'],
 ['Concluimos los tres casos con el criterio de rangos, no solo con el determinante.','k=0: incompatible; k=2: compatible indeterminado; demás valores: compatible determinado'],
 ]),mk(1,'(x;y;z)=(frac{7−t}{5};−frac{4+3t}{5};t), t∈ℝ.',['(x;y;z)=(frac{7−t}{5};frac{4−3t}{5};t), t∈ℝ.','(x;y;z)=(−frac{7+t}{5};−frac{4+3t}{5};t), t∈ℝ.','(x;y;z)=(1−frac{t}{5};−1−frac{3t}{5};t), t∈ℝ.'],['Cambiar el signo del término independiente de y.','Cambiar el signo del término independiente de x.','Sustituir los términos constantes sin satisfacer las ecuaciones.'],[
 ['Sustituimos k=2 en todas las ecuaciones oficiales.','system{x+3y+2z=−1;2x+y+z=2;x−2y−z=3}'],
 ['Restamos dos veces la primera ecuación a la segunda; la tercera menos la primera da la misma relación.','−5y−3z=4 ⇒ y=−frac{4+3z}{5}'],
 ['Tomamos z=t como parámetro libre y recuperamos x en la primera ecuación.','x=−1−3y−2t=−1+frac{12+9t}{5}−2t=frac{7−t}{5}'],
 ['Escribimos la familia completa, válida para cualquier parámetro real.','(x;y;z)=(frac{7−t}{5};−frac{4+3t}{5};t), t∈ℝ'],
 ['Comprobamos las dos primeras ecuaciones mediante sustitución y cancelación de términos con t.','x+3y+2z=frac{7−t−12−9t+10t}{5}=−1; 2x+y+z=frac{14−2t−4−3t+5t}{5}=2'],
 ['Comprobamos también la tercera ecuación para no omitir una condición del sistema original.','x−2y−z=frac{7−t+8+6t−5t}{5}=3'],
 ])];
 return[
 mk(0,'Rango de M³: 3.',['Rango de M³: 1.','Rango de M³: 2.','Rango de M³: 0.'],['Confundir matriz elevada al cubo con una única columna independiente.','Confundir el valor del determinante con el rango.','Suponer que la potencia anula el determinante.'],[
 ['El determinante dado es distinto de cero, por lo que M es invertible.','det(M)=2≠0'],
 ['Aplicamos la propiedad del determinante de un producto a las tres copias de M.','det(M³)=det(M)·det(M)·det(M)'],
 ['Sustituimos el valor oficial. La potencia tampoco es singular.','det(M³)=2³=8≠0'],
 ['Una matriz cuadrada de orden tres con determinante no nulo tiene sus tres columnas independientes.','rg(M³)=3'],
 ['Comprobación equivalente: la inversa de M³ existe y es la tercera potencia de la inversa.','M³(M^(−1))³=I₃'],
 ]),mk(1,'Determinante de 2M^t: 16.',['Determinante de 2M^t: 4.','Determinante de 2M^t: 8.','Determinante de 2M^t: 2.'],['Extraer el factor dos una sola vez.','Olvidar multiplicar por el determinante de M.','Ignorar el factor escalar.'],[
 ['Trasponer una matriz no altera el valor de su determinante.','det(M^t)=det(M)=2'],
 ['Multiplicar una matriz de orden tres por dos multiplica sus tres filas por dos.','det(2M^t)=2³det(M^t)'],
 ['Sustituimos la potencia y el determinante dado.','det(2M^t)=8·2'],
 ['Calculamos el valor exacto, conservando un factor dos por cada fila.','det(2M^t)=16'],
 ['Comprobamos el factor mediante la multilinealidad por filas: dos por dos por dos.','2·2·2·det(M)=16'],
 ]),mk(2,'Determinante de (M^(−1))²: frac{1}{4}.',['Determinante de (M^(−1))²: 4.','Determinante de (M^(−1))²: frac{1}{2}.','Determinante de (M^(−1))²: −frac{1}{4}.'],['Olvidar invertir el determinante.','Olvidar elevar al cuadrado.','Asignar un signo negativo a la inversa.'],[
 ['La inversa existe porque el determinante de M no es cero.','det(M)=2≠0'],
 ['El determinante de la inversa es el recíproco, no el opuesto.','det(M^(−1))=frac{1}{det(M)}=frac{1}{2}'],
 ['Aplicamos la propiedad multiplicativa a las dos copias de la inversa.','det((M^(−1))²)=(det(M^(−1)))²'],
 ['Elevamos el recíproco al cuadrado.','det((M^(−1))²)=(frac{1}{2})²=frac{1}{4}'],
 ['Verificamos usando el producto con M², cuya determinante debe dar la unidad.','det(M²)·frac{1}{4}=4·frac{1}{4}=1'],
 ]),mk(3,'Determinante de N: −2.',['Determinante de N: 2.','Determinante de N: 0.','Determinante de N: 4.'],['Suponer que intercambiar filas conserva el signo.','Confundir intercambiar con igualar dos filas.','Multiplicar por dos en vez de cambiar el signo.'],[
 ['N se obtiene con un único intercambio de filas distintas, sin sumas ni multiplicaciones adicionales.','F₁↔F₂'],
 ['La propiedad alternante del determinante indica que un intercambio cambia su signo.','det(N)=−det(M)'],
 ['Sustituimos el dato oficial.','det(N)=−2'],
 ['El intercambio no hace iguales las filas ni destruye la invertibilidad, de modo que el resultado no puede ser cero.','det(N)≠0'],
 ['Comprobamos la reversibilidad: repetir el mismo intercambio recupera M y vuelve a cambiar el signo.','−det(N)=−(−2)=2=det(M)'],
 ])];
}
export function buildRanksBatch(id='batch-0377',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){x.primaryTopic=x.correctionEvidence.parameters.topic;x.secondaryTopics=x.primaryTopic==='Determinantes'?['Matrices']:['Matrices','Determinantes'];x.block='Álgebra';x.examSlot=1;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:x.primaryTopic==='Determinantes'?'MATRIX_DETERMINANT_IDENTITIES':'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS'};x.qualityGates.pedagogical='FULL_MATH_II_RANK_AND_DETERMINANT_JUSTIFICATION';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildRanksBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0377-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0377.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({exerciseId:r.exerciseId,answers:r.parts.map(p=>p.answer)}))));}
