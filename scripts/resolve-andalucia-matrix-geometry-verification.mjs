import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';

export const observations=[
 [1076,'5ea9fab18d8185843726e08994f39cf34f9b7dab32d86c310902a2f203dace2a',2,'B.1','b852fb8add044f158fae465c6582ac69d6b8aa87cff829b0263383a8d7d11e07',0],
 [1083,'c1053dad9ef9e6ce58aeea7d171758b8b6aec6014f2dfbec91a9ace85f5136e5',2,'NONE.4','e5f32094bf11f28fa052bdcb95e5ac3ca93f5be474c7362f7e8f44e25f3638ef',0],
];
export const statements={
 1076:'Sean las matrices A=matrix{2,1;3,1} y B=matrix{1,2;−1,0}.\na) Calcula A^tB−AB^t.\nb) Resuelve la ecuación matricial AX+BA=B.',
 1083:'Considera los puntos A(1,0,−1) y B(2,1,0), y la recta r dada por cases{x+y=1;x+z=2}.\na) Determina la ecuación del plano que es paralelo a r y pasa por A y B.\nb) Determina si la recta que pasa por P(1,2,1) y Q(3,4,1) está contenida en dicho plano.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_MATRIX_GEOMETRY_LAYOUT']]:[];
export const cases=[
 {index:1076,slot:1,literals:['A =','At ⋅ B − A ⋅ Bt','AX + BA = B']},
 {index:1083,slot:4,literals:['A(1, 0, −1)','x+y = 1','P (1, 2, 1)']},
];
export const proof=c=>({
 1076:{AtB:[[-1,4],[0,2]],ABt:[[4,-2],[5,-3]],difference:[[-5,6],[-5,5]],BA:[[8,3],[-2,-1]],rhs:[[-7,-1],[1,1]],X:[[8,2],[-23,-5]]},
 1083:{lineDirection:[1,-1,-1],AB:[1,1,1],planeNormal:[0,1,-1],plane:'y−z−1=0',PValue:0,QValue:2,PQ:[2,2,0]},
}[c.index]);
const M=a=>`matrix{${a.map(r=>r.join(',')).join(';')}}`;
export function solve(c){const ps=officialParts(statements[c.index]);if(c.index===1076){const p=proof(c);return[
 part(ps[0],M(p.difference),[M([[3,6],[-5,5]]),M([[-5,-6],[5,5]]),M([[4,-2],[5,-3]])],['Trasponer solo una matriz en el primer producto.','Cambiar signos al restar las matrices.','Detenerse en AB^t sin efectuar toda la expresión.'],[
  ['Trasponemos A y B antes de construir los productos indicados.','A^t=matrix{2,3;1,1}; B^t=matrix{1,−1;2,0}'],
  ['Multiplicamos A^t por B respetando el orden.','A^tB=matrix{−1,4;0,2}'],
  ['Multiplicamos A por B^t.','AB^t=matrix{4,−2;5,−3}'],
  ['Restamos elemento a elemento.','A^tB−AB^t=matrix{−1−4,4−(−2);0−5,2−(−3)}'],
  ['Simplificamos.','A^tB−AB^t=matrix{−5,6;−5,5}'],
  ['Comprobamos dimensiones: ambos productos y la diferencia son matrices 2×2.','2×2−2×2=2×2'],
 ],'DIRECT_MATRIX_PRODUCTS_AND_ENTRYWISE_SUBTRACTION',p),
 part(ps[1],M(p.X),[M([[7,1],[-1,-1]]),M([[8,-23],[2,-5]]),M([[-8,-2],[23,5]])],['Olvidar que al pasar BA al segundo miembro queda B−BA.','Trasponer la solución obtenida.','Cambiar el signo de toda la solución.'],[
  ['Aislamos el producto que contiene la incógnita.','AX=B−BA'],
  ['Calculamos BA y el segundo miembro.','BA=matrix{8,3;−2,−1}; B−BA=matrix{−7,−1;1,1}'],
  ['Comprobamos que A es invertible.','det(A)=2·1−3·1=−1≠0'],
  ['Calculamos la inversa de A.','A^{−1}=matrix{−1,1;3,−2}'],
  ['Despejamos X multiplicando por A^{−1} a la izquierda.','X=A^{−1}(B−BA)=matrix{8,2;−23,−5}'],
  ['Verificamos el producto de forma independiente.','AX=matrix{−7,−1;1,1}'],
  ['Sumamos BA y recuperamos exactamente el segundo miembro original.','AX+BA=matrix{1,2;−1,0}=B'],
 ],'REVERSIBLE_MATRIX_ISOLATION_AND_DIRECT_PRODUCT_CHECK',p)
 ];}if(c.index===1083){const p=proof(c);return[
 part(ps[0],p.plane,['x+y+z−2=0','y−z+1=0','x−y−1=0'],['Usar como normal el vector AB sin imponer el paralelismo con r.','Cambiar el signo del término independiente al sustituir A.','Tomar una ecuación de los planos que definen r como plano buscado.'],[
  ['Obtenemos un vector director de r como producto vectorial de los normales de sus dos planos.','n_1=(1,1,0), n_2=(1,0,1); v_r=n_1×n_2=(1,−1,−1)'],
  ['Calculamos el vector que une A con B.','AB=B−A=(1,1,1)'],
  ['El plano contiene AB y es paralelo a r; por tanto, un normal es perpendicular a ambos vectores.','n=AB×v_r=(0,2,−2)∼(0,1,−1)'],
  ['Escribimos el plano con normal (0,1,−1) que pasa por A.','0(x−1)+(y−0)−(z+1)=0'],
  ['Simplificamos su ecuación.','y−z−1=0'],
  ['Comprobamos que A y B pertenecen al plano y que v_r es paralelo a él.','A:0−(−1)−1=0; B:1−0−1=0; (0,1,−1)·(1,−1,−1)=0'],
 ],'VECTOR_CROSS_PRODUCTS_AND_POINT_SUBSTITUTION',p),
 part(ps[1],'No; la recta PQ no está contenida en el plano.',['Sí; toda la recta PQ está contenida.','No; P no pertenece al plano, aunque Q sí.','Sí; porque PQ es paralela a r.'],['Comprobar solo el punto P y no la dirección o un segundo punto.','Intercambiar los valores de pertenencia de P y Q.','Confundir la dirección de PQ con la de la recta r.'],[
  ['Una recta está contenida en un plano si un punto suyo pertenece al plano y su vector director es paralelo al plano.','π:y−z−1=0'],
  ['Comprobamos P.','P(1,2,1): 2−1−1=0; P∈π'],
  ['Comprobamos Q.','Q(3,4,1): 4−1−1=2≠0; Q∉π'],
  ['Como uno de sus puntos no pertenece al plano, la recta no puede estar contenida.','PQ⊄π'],
  ['La dirección confirma el mismo resultado.','v_{PQ}=Q−P=(2,2,0); n·v_{PQ}=(0,1,−1)·(2,2,0)=2≠0'],
  ['Concluimos que la recta corta al plano en P, pero no está contenida en él.','PQ∩π={P}'],
 ],'TWO_POINT_MEMBERSHIP_AND_DIRECTION_CHECK',p)
 ];}throw Error('Unknown matrix-geometry source');}

export function buildMatrixGeometryVerificationBatch(id='batch-0474',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.index===1076?'Matrices':'Geometría afín en el espacio';x.secondaryTopics=c.index===1076?['Operaciones con matrices','Ecuaciones matriciales']:['Rectas y planos','Posición relativa'];x.block=c.index===1076?'Álgebra':'Geometría';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'EXACT_MATRIX_OR_SPATIAL_GEOMETRY_DATA_WITH_INDEPENDENT_SUBSTITUTION_CHECK'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_MATRIX_OR_GEOMETRY_METHOD_WITH_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildMatrixGeometryVerificationBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0474-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0474.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
