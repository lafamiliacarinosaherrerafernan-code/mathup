import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';

export const observations=[
 [1085,'8cd46d9e803e35632ac299c603e2a3d3553404b6f62e87872d9fb2cf86471f3b',2,'NONE.3','8ad999bce2a361ab9dc0e56bbc51520b2bcac9364a37a4b5b89c3fa12d828522',0],
 [1091,'a236b382afd7ddbc35f4e83791a322bcf96c07c5859fa715a0b6e74f5e2921e1',1,'B.3','a1d68b6bc9aceccacbace2fc0bfb82dfe958604b0cadbf8dccb42b65d637a9f6',0],
];
export const statements={
 1085:'Considera las matrices A=matrix{1,0,2;1,1,1;2,3,0} y B=matrix{2,0,−3;3,−1,−3;−1,−2,−1}.\na) Calcula A^{−1}.\nb) Halla la matriz X que verifica A^tX+B=I, siendo I la matriz identidad y A^t la traspuesta de A.',
 1091:'Considera la matriz A=matrix{k,1+k;1−k,0}, con k real. Determina, si existen, los valores de k en cada caso.\na) rango(A)=1.\nb) A²=A.\nc) A tiene inversa.\nd) det(A)=−2.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_INVERSE_PARAMETER_MATRIX_LAYOUT']]:[];
export const cases=[
 {index:1085,slot:1,literals:['Considera las matrices','Calcula A−1','AtX + B = I']},
 {index:1091,slot:1,literals:['Considera la matriz A','rango(A) = 1','det(A) = −2']},
];
export const proof=c=>({
 1085:{detA:-1,inverse:[[3,-6,2],[-2,4,-1],[-1,3,-1]],X:[[2,-6,1],[-3,14,0],[0,-4,1]]},
 1091:{determinant:'k²−1',rankOne:[-1,1],idempotent:[1],invertible:'k≠−1 y k≠1',detMinusTwo:'sin solución real'},
}[c.index]);
const M=a=>`matrix{${a.map(r=>r.join(',')).join(';')}}`;
export function solve(c){const ps=officialParts(statements[c.index]);if(c.index===1085){const p=proof(c);return[
 part(ps[0],`A^{−1}=${M(p.inverse)}.`,[`A^{−1}=${M([[3,-2,-1],[-6,4,3],[2,-1,-1]])}.`,`A^{−1}=${M([[-3,6,-2],[2,-4,1],[1,-3,1]])}.`,`A^{−1}=${M([[1,0,2],[1,1,1],[2,3,0]])}.`],['Trasponer la inversa calculada.','Cambiar el signo de todos los cofactores.','Confundir la matriz original con su inversa.'],[
  ['Calculamos el determinante de A para comprobar que es invertible.','det(A)=−1≠0'],
  ['Formamos la matriz de cofactores.','C=matrix{−3,2,1;6,−4,−3;−2,1,1}'],
  ['Trasponemos la matriz de cofactores para obtener la adjunta.','adj(A)=matrix{−3,6,−2;2,−4,1;1,−3,1}'],
  ['Aplicamos la fórmula de la inversa.','A^{−1}=frac1{det(A)}adj(A)'],
  ['Como det(A)=−1, cambiamos todos los signos de la adjunta.','A^{−1}=matrix{3,−6,2;−2,4,−1;−1,3,−1}'],
  ['Verificamos multiplicando por la matriz original.','AA^{−1}=A^{−1}A=I_3'],
 ],'DETERMINANT_ADJUGATE_AND_TWO_SIDED_PRODUCT_CHECK',p),
 part(ps[1],`X=${M(p.X)}.`,[`X=${M([[2,-3,0],[-6,14,-4],[1,0,1]])}.`,`X=${M([[-2,6,-1],[3,-14,0],[0,4,-1]])}.`,`X=${M([[1,-6,2],[0,14,-3],[1,-4,0]])}.`],['Trasponer la solución final.','Cambiar el signo de la matriz al despejar.','Multiplicar por A^{−1} en lugar de por (A^t)^{−1}.'],[
  ['Aislamos el producto que contiene X.','A^tX=I−B'],
  ['Como A es invertible, también lo es A^t.','det(A^t)=det(A)=−1≠0'],
  ['Usamos la identidad de la inversa de una traspuesta.','(A^t)^{−1}=(A^{−1})^t=matrix{3,−2,−1;−6,4,3;2,−1,−1}'],
  ['Calculamos el segundo miembro.','I−B=matrix{−1,0,3;−3,2,3;1,2,2}'],
  ['Despejamos mediante multiplicación a la izquierda.','X=(A^t)^{−1}(I−B)'],
  ['Efectuamos el producto matricial.','X=matrix{2,−6,1;−3,14,0;0,−4,1}'],
  ['Comprobamos sustituyendo en la ecuación original.','A^tX+B=I_3'],
 ],'TRANSPOSE_INVERSE_ISOLATION_AND_DIRECT_EQUATION_CHECK',p)
 ];}if(c.index===1091){const p=proof(c);return[
 part(ps[0],'k=−1 o k=1.',['Solo k=1.','Solo k=−1.','k≠−1 y k≠1.'],['Olvidar una de las dos raíces de k²−1=0.','Conservar únicamente la raíz positiva.','Confundir rango uno con invertibilidad.'],[
  ['Calculamos el determinante de la matriz 2×2.','det(A)=k·0−(1+k)(1−k)=k²−1'],
  ['Para que el rango sea menor que 2 debe anularse el determinante.','k²−1=0'],
  ['Resolvemos la diferencia de cuadrados.','(k−1)(k+1)=0 ⇒ k=−1 o k=1'],
  ['Comprobamos k=1.','A=matrix{1,2;0,0}, que tiene rango 1'],
  ['Comprobamos k=−1.','A=matrix{−1,0;2,0}, que tiene rango 1'],
  ['Ninguna de las dos matrices es nula, por lo que el rango no baja a cero.','rango(A)=1 en ambos casos'],
 ],'DETERMINANT_ZERO_AND_NONZERO_ROW_RANK_CHECK',p),
 part(ps[1],'k=1.',['k=−1.','k=0.','k=−1 o k=1.'],['Usar solo det(A)=0, condición insuficiente para A²=A.','Suponer que la matriz cero corresponde a k=0.','Confundir idempotencia con rango uno.'],[
  ['Calculamos el cuadrado de la matriz.','A²=matrix{1,k(1+k);k(1−k),1−k²}'],
  ['Igualamos la entrada (1,1) con la de A.','1=k'],
  ['La primera ecuación ya obliga a k=1.','k=1'],
  ['Sustituimos en la matriz.','A=matrix{1,2;0,0}'],
  ['Calculamos de nuevo el cuadrado para verificar.','A²=matrix{1,2;0,0}=A'],
  ['Por tanto, no existe ningún otro valor real que cumpla simultáneamente todas las entradas.','Solución única: k=1'],
 ],'ENTRYWISE_IDEMPOTENCE_AND_DIRECT_SQUARE_CHECK',p),
 part(ps[2],'A tiene inversa si k≠−1 y k≠1.',['A tiene inversa solo si k=−1 o k=1.','A tiene inversa para todo k real.','A tiene inversa solo si k=0.'],['Invertir la condición det(A)≠0.','Ignorar los valores que anulan el determinante.','Evaluar únicamente un valor particular.'],[
  ['Una matriz cuadrada tiene inversa exactamente cuando su determinante no es cero.','det(A)≠0'],
  ['Usamos el determinante ya calculado.','k²−1≠0'],
  ['Factorizamos.','(k−1)(k+1)≠0'],
  ['Excluimos las dos raíces.','k≠1 y k≠−1'],
  ['Para cualquier otro real, el rango es 2.','rango(A)=2'],
  ['Comprobación: para k=0, det(A)=−1 y la matriz sí es invertible.','A(0)=matrix{0,1;1,0}'],
 ],'NONZERO_DETERMINANT_CHARACTERIZATION',p),
 part(ps[3],'No existe ningún valor real de k.',['k=1.','k=−1.','k=−1 o k=1.'],['Resolver k²−1=0 en lugar de k²−1=−2.','Confundir el valor de k con una raíz del caso de rango uno.','Reutilizar las soluciones del apartado a).'],[
  ['Imponemos el valor indicado al determinante.','k²−1=−2'],
  ['Aislamos el cuadrado.','k²=−1'],
  ['Para k real se cumple siempre k²≥0.','k² no puede ser −1'],
  ['Por tanto, la ecuación no tiene solución real.','Conjunto solución: ∅'],
  ['Los valores k=±1 producen determinante cero, no −2.','det(A(±1))=0'],
  ['Concluimos dentro del dominio real del parámetro.','No existe k∈R'],
 ],'REAL_SQUARE_NONNEGATIVITY_AND_SUBSTITUTION_CHECK',p)
 ];}throw Error('Unknown inverse-parameter source');}

export function buildInverseParameterMatricesBatch(id='batch-0477',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=x.correctionEvidence.parameters.index===1085?['Matriz inversa','Ecuaciones matriciales']:['Determinantes','Rango y matrices idempotentes'];x.block='Álgebra';x.examSlot=x.correctionEvidence.parameters.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'EXACT_MATRIX_DATA_WITH_SYMBOLIC_AND_DIRECT_PRODUCT_VERIFICATION'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_MATRIX_METHOD_WITH_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildInverseParameterMatricesBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0477-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0477.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
