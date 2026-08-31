import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';

export const observations=[
 [1071,'497e6d1a54cf3d5393bc8727864e641ec08a5aca088f46eb0e0ed8d8075d7b6d',2,'A.6','8700d757a546447507c3c10ee46ae1d89613adc305c1a636e5759c99ae838d10',0],
 [1075,'0ea3fd4fc59736e3847d6552e64377975175a3605c7742e73d7a41dbf219269c',1,'A.3','13deead994c6e05eaadb352bbd34931e96b8e0a4d903ceb777f888efbf6ddc65',0],
];
export const statements={
 1071:'Considera las matrices A=matrix{1,2m,−1;3,0,−2;−3m,1,2} y B=matrix{1,−1,3;0,2,1;2,5,4}.\na) Determina los valores de m para que la matriz A tenga inversa.\nb) Calcula para m=1, si es posible, la matriz X tal que AX=B^t, donde B^t denota la matriz traspuesta de B.',
 1075:'Halla la matriz X que verifica la igualdad AXA^{−1}+B=CA^{−1}, sabiendo que A=matrix{0,−1,0;−1,−3,0;1,4,1}, C=matrix{1,−1,2;0,0,−1;1,0,−1} y BA=matrix{1,1,0;1,1,−1;−1,−5,−3}.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_PARAMETRIC_MATRIX_EQUATIONS_LAYOUT']]:[];
export const cases=[
 {index:1071,slot:1,literals:['1 2m −1','−3m 1 2','AX = Bt']},
 {index:1075,slot:1,literals:['AXA−1 + B = CA−1','A =','BA =']},
];
export const proof=c=>({
 1071:{determinant:'12m²−12m−1',excluded:['1/2−√3/3','1/2+√3/3'],m1Determinant:-1,X:[[5,14,37],[2,3,9],[8,20,53]]},
 1075:{determinant:-1,difference:[[0,-2,2],[-1,-1,0],[2,5,2]],X:[[1,-5,6],[0,2,-2],[1,2,4]]},
}[c.index]);
const M=a=>`matrix{${a.map(r=>r.join(',')).join(';')}}`;
export function solve(c){const ps=c.index===1075?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]);if(c.index===1071)return[
 part(ps[0],'m≠frac{1}{2}−frac{sqrt{3}}{3} y m≠frac{1}{2}+frac{sqrt{3}}{3}.',['m=frac{1}{2}−frac{sqrt{3}}{3} o m=frac{1}{2}+frac{sqrt{3}}{3}.','m≠0 y m≠1.','A tiene inversa para todo m∈R.'],['Confundir los valores que anulan el determinante con los permitidos.','Sustituir valores sencillos sin calcular el determinante.','Omitir las dos raíces reales del determinante.'],[
  ['Una matriz cuadrada tiene inversa exactamente cuando su determinante no se anula.','A invertible ⇔ det(A)≠0'],
  ['Desarrollamos el determinante por la primera fila.','det(A)=1·2−2m(6−6m)−3'],
  ['Reducimos el polinomio en el parámetro.','det(A)=12m²−12m−1'],
  ['Resolvemos la ecuación que identifica los únicos valores prohibidos.','12m²−12m−1=0'],
  ['Aplicamos la fórmula cuadrática y simplificamos el radical.','m=frac{12±sqrt{144+48}}{24}=frac{12±8sqrt3}{24}=frac12±frac{sqrt3}{3}'],
  ['Excluimos esas raíces y conservamos el resto de números reales.','m∈R\{frac12−frac{sqrt3}{3},frac12+frac{sqrt3}{3}}'],
  ['Comprobamos que el determinante se anula en ambas raíces y no en un valor permitido, por ejemplo m=1.','det(A)|_{m=1}=−1≠0'],
 ],'SYMBOLIC_DETERMINANT_AND_ROOT_SUBSTITUTION',proof(c)),
 part(ps[1],M(proof(c).X),[M([[5,2,8],[14,3,20],[37,9,53]]),M([[5,14,37],[2,3,9],[-8,-20,-53]]),M([[1,0,2],[-1,2,5],[3,1,4]])],['Trasponer la matriz solución en vez de comprobar AX=B^t.','Cambiar el signo de una fila durante la reducción.','Confundir el segundo miembro B^t con la incógnita X.'],[
  ['Sustituimos m=1 y comprobamos que A es invertible.','A=matrix{1,2,−1;3,0,−2;−3,1,2}; det(A)=−1'],
  ['Trasponemos B para construir correctamente el segundo miembro.','B^t=matrix{1,0,2;−1,2,5;3,1,4}'],
  ['Como A es invertible, la solución es única.','X=A^{−1}B^t'],
  ['Resolvemos simultáneamente las tres columnas mediante eliminación de Gauss sobre [A|B^t].','[A|B^t]→[I|matrix{5,14,37;2,3,9;8,20,53}]'],
  ['Leemos la matriz solución.','X=matrix{5,14,37;2,3,9;8,20,53}'],
  ['Verificamos por multiplicación directa, sin reutilizar la reducción.','AX=matrix{1,0,2;−1,2,5;3,1,4}=B^t'],
  ['La igualdad verificada y det(A)≠0 garantizan unicidad.','X es la única solución'],
 ],'GAUSSIAN_ELIMINATION_AND_DIRECT_MATRIX_PRODUCT',proof(c))
 ];if(c.index===1075)return[part(ps[0],M(proof(c).X),[M(proof(c).difference),M([[1,0,1],[-5,2,2],[6,-2,4]]),M([[-1,5,-6],[0,-2,2],[-1,-2,-4]])],['Detenerse en C−BA sin despejar X.','Trasponer por error la matriz solución.','Multiplicar toda la solución por −1 durante la eliminación.'],[
  ['Partimos de la igualdad dada y evitamos calcular B por separado.','AXA^{−1}+B=CA^{−1}'],
  ['Multiplicamos toda la igualdad por A a la derecha.','AXA^{−1}A+BA=CA^{−1}A'],
  ['Usamos A^{−1}A=I para simplificar.','AX+BA=C'],
  ['Aislamos el producto AX con los datos proporcionados.','AX=C−BA=matrix{0,−2,2;−1,−1,0;2,5,2}'],
  ['Calculamos el determinante para justificar que podemos despejar de forma única.','det(A)=−1≠0'],
  ['Resolvemos A X=C−BA por columnas mediante eliminación.','X=matrix{1,−5,6;0,2,−2;1,2,4}'],
  ['Comprobamos la identidad equivalente usando solo productos y sumas.','AX=matrix{0,−2,2;−1,−1,0;2,5,2}; AX+BA=C'],
  ['Como A es invertible, multiplicar a la derecha por A fue reversible y la matriz satisface también la ecuación original.','AXA^{−1}+B=CA^{−1}'],
 ],'REVERSIBLE_MATRIX_ISOLATION_GAUSS_AND_DIRECT_PRODUCT',proof(c))];throw Error('Unknown parametric matrix source');}

export function buildParametricMatrixEquationsBatch(id='batch-0472',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic='Matrices';x.secondaryTopics=c.index===1071?['Determinantes con parámetro','Ecuaciones matriciales']:['Ecuaciones matriciales','Matriz inversa'];x.block='Álgebra';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'EXACT_MATRIX_DATA_WITH_SYMBOLIC_DETERMINANT_AND_DIRECT_PRODUCT_VERIFICATION'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_MATRIX_METHOD_WITH_INDEPENDENT_PRODUCT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildParametricMatrixEquationsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0472-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0472.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
