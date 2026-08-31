import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';

export const observations=[
 [1084,'9b43b63df1b76e5a1b95f77010ec0c24b3448817b7fbfaa1b397a9271c23e44f',2,'NONE.7','a12338e74f2c808b4d3ea62b4b5d8b4528399f663e42a8f223abfc6e77da679e',0],
 [1092,'757725a20faff347660e0d616729eb9219db76a4d18297e2896526290649ec77',1,'NONE.4','199532170f0043d3147cdf5f9012583e9a100546d087a5b0b1621e237423788e',0],
];
export const statements={
 1084:'Considera el triángulo cuyos vértices son A(0,2,3), B(m,0,1) y C(2,1,2).\na) Halla los valores de m sabiendo que el área del triángulo es frac{sqrt{18}}{2} unidades cuadradas.\nb) Para m=0, calcula el coseno del ángulo en el vértice A.',
 1092:'Del paralelogramo ABCD se conocen los vértices A(−1,0,3), B(2,−1,1) y C(3,2,−3).\na) Halla la ecuación del plano que contiene al paralelogramo.\nb) Halla la ecuación de la recta que contiene a la diagonal AC.\nc) Calcula las coordenadas del vértice D.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_TRIANGLE_PARALLELOGRAM_GEOMETRY_LAYOUT']]:[];
export const cases=[
 {index:1084,slot:4,literals:['A(0, 2, 3)','B(m, 0, 1)','coseno del ángulo']},
 {index:1092,slot:4,literals:['paralelogramo ABCD','A(−1, 0, 3)','diagonal AC']},
];
export const proof=c=>({
 1084:{AB:['m',-2,-2],AC:[2,-1,-1],cross:['0','m−4','4−m'],areaEquation:'2(m−4)²=18',m:[1,7],cosine:'sqrt{3}/3'},
 1092:{AB:[3,-1,-2],AC:[4,2,-6],normal:[10,10,10],plane:'x+y+z−2=0',line:'(x,y,z)=(−1,0,3)+t(4,2,−6)',D:[0,3,-1]},
}[c.index]);
export function solve(c){const ps=officialParts(statements[c.index]);if(c.index===1084){const p=proof(c);return[
 part(ps[0],'m=1 o m=7.',['m=4.','m=−1 o m=7.','m=1 o m=4.'],['Igualar a cero el producto vectorial en vez de imponer el área.','Perder el signo al resolver |m−4|=3.','Conservar el centro m=4 como si fuera una solución del área.'],[
  ['Construimos dos lados del triángulo con origen en A.','AB=(m,−2,−2), AC=(2,−1,−1)'],
  ['Calculamos el producto vectorial que determina el área.','AB×AC=(0,m−4,4−m)'],
  ['El área es la mitad del módulo del producto vectorial.','Área=frac12 sqrt{(m−4)²+(4−m)²}=frac12 sqrt{2(m−4)²}'],
  ['Igualamos al área dada y elevamos al cuadrado.','frac12 sqrt{2(m−4)²}=frac{sqrt{18}}2 ⇒ 2(m−4)²=18'],
  ['Resolvemos la ecuación sin perder ninguna rama.','(m−4)²=9 ⇒ m−4=±3'],
  ['Obtenemos los dos valores.','m=1 o m=7'],
  ['Comprobamos: en ambos casos |m−4|=3 y el módulo del producto vectorial es sqrt{18}.','Área=frac{sqrt{18}}2'],
 ],'VECTOR_PRODUCT_AREA_AND_TWO_BRANCH_EQUATION',p),
 part(ps[1],'cos(A)=frac{sqrt{3}}{3}.',['cos(A)=frac{1}{3}.','cos(A)=frac{sqrt{2}}{2}.','cos(A)=−frac{sqrt{3}}{3}.'],['Dividir el producto escalar entre el producto de los cuadrados de los módulos.','Confundir el ángulo con uno de 45 grados.','Cambiar el signo del producto escalar.'],[
  ['Fijamos m=0 y calculamos los vectores que forman el ángulo en A.','AB=(0,−2,−2), AC=(2,−1,−1)'],
  ['Calculamos su producto escalar.','AB·AC=0·2+(−2)(−1)+(−2)(−1)=4'],
  ['Calculamos los módulos.','|AB|=sqrt8=2sqrt2; |AC|=sqrt6'],
  ['Aplicamos la definición del coseno entre vectores.','cos(A)=frac{AB·AC}{|AB||AC|}=frac4{2sqrt2·sqrt6}'],
  ['Simplificamos el radical.','cos(A)=frac1{sqrt3}=frac{sqrt3}{3}'],
  ['El valor es positivo y está entre 0 y 1, coherente con un ángulo agudo.','0<frac{sqrt3}{3}<1'],
 ],'DOT_PRODUCT_NORM_AND_RADICAL_SIMPLIFICATION',p)
 ];}if(c.index===1092){const p=proof(c);return[
 part(ps[0],'x+y+z−2=0.',['x−y+z−2=0.','x+y+z+2=0.','3x−y−2z+9=0.'],['Cambiar un signo del vector normal.','Cambiar el signo del término independiente.','Usar AB como vector normal del plano.'],[
  ['Calculamos dos vectores del plano a partir de tres vértices.','AB=(3,−1,−2), AC=(4,2,−6)'],
  ['Un vector normal es su producto vectorial.','AB×AC=(10,10,10)'],
  ['Simplificamos el normal.','n=(1,1,1)'],
  ['Escribimos la ecuación del plano que pasa por A.','(x+1)+y+(z−3)=0'],
  ['Reducimos términos.','x+y+z−2=0'],
  ['Comprobamos los tres vértices.','A:−1+0+3−2=0; B:2−1+1−2=0; C:3+2−3−2=0'],
 ],'TWO_DIRECTION_CROSS_PRODUCT_AND_THREE_POINT_CHECK',p),
 part(ps[1],p.line,['(x,y,z)=(−1,0,3)+t(3,−1,−2).','(x,y,z)=(3,2,−3)+t(3,−1,−2).','(x,y,z)=(−1,0,3)+t(1,1,1).'],['Usar la dirección AB en vez de AC.','Combinar el punto C con una dirección que no une A y C.','Usar el normal del plano como dirección de la diagonal.'],[
  ['La diagonal pedida une A con C.','A=(−1,0,3), C=(3,2,−3)'],
  ['Calculamos su vector director.','AC=C−A=(4,2,−6)'],
  ['Usamos A como punto de paso.','r:(x,y,z)=(−1,0,3)+t(4,2,−6)'],
  ['La forma coordenada equivalente es inmediata.','x=−1+4t, y=2t, z=3−6t'],
  ['Comprobamos A con t=0.','r(0)=A'],
  ['Comprobamos C con t=1.','r(1)=(3,2,−3)=C'],
 ],'POINT_DIRECTION_LINE_AND_ENDPOINT_SUBSTITUTION',p),
 part(ps[2],'D=(0,3,−1).',['D=(4,1,−5).','D=(−2,−3,5).','D=(0,−3,1).'],['Calcular B+C−A en lugar de A+C−B.','Calcular A+B−C.','Cambiar los signos de las dos últimas coordenadas.'],[
  ['En un paralelogramo con vértices consecutivos A,B,C,D, las diagonales tienen el mismo punto medio.','A+C=B+D'],
  ['Despejamos el vértice desconocido.','D=A+C−B'],
  ['Sustituimos las coordenadas.','D=(−1,0,3)+(3,2,−3)−(2,−1,1)'],
  ['Operamos coordenada a coordenada.','D=(−1+3−2,0+2+1,3−3−1)'],
  ['Simplificamos.','D=(0,3,−1)'],
  ['Verificamos lados opuestos.','AD=(1,3,−4)=BC=C−B'],
 ],'PARALLELOGRAM_DIAGONAL_MIDPOINT_AND_VECTOR_CHECK',p)
 ];}throw Error('Unknown triangle-parallelogram source');}

export function buildTriangleParallelogramGeometryBatch(id='batch-0476',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.index===1084?'Geometría métrica en el espacio':'Geometría afín en el espacio';x.secondaryTopics=c.index===1084?['Producto vectorial','Ángulos entre vectores']:['Planos y rectas','Paralelogramos'];x.block='Geometría';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'EXACT_SPATIAL_GEOMETRY_DATA_WITH_INDEPENDENT_VECTOR_CHECK'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_SPATIAL_GEOMETRY_METHOD_WITH_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildTriangleParallelogramGeometryBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0476-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0476.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
