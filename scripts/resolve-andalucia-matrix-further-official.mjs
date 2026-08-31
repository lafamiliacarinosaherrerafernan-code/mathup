// Ten questions read on official PDF pages. Extraction defects are preserved separately.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {I,T,mul,add,scale,det,inverse,matrix,scalar,inverseSteps} from './resolve-andalucia-matrix-order-three.mjs';
export const cases=[
 {index:553,A:[[1,0,0],[0,2,0],[0,-1,1]],R:[[1,2,0],[3,-1,1]],literals:['Pruebe que se verifica','determine la dimensión']},
 {index:557,A:[[-1,11],[5,-4]],B:[[5,0],[-3,9]],C:[[4,6],[1,3]],literals:['sistema de ecuaciones matriciales','inversa de C']},
 {index:565,A:[[6,0],[2,4]],B:[[-4],[6]],C:[[-2,-2]],literals:['Justifique cuáles','ecuación matricial']},
 {index:568,A:[[2,-5],[1,-3]],B:[[3,-1,2],[0,1,1]],C:[[1,2,3],[-1,5,3]],literals:['Resuelva la ecuación matricial']},
 {index:583,A:[[5,2,0],[8,5,0],[0,0,5]],B:[[1],[-2],[10]],literals:['sea no invertible','𝑎 = 5']},
 {index:590,A:[[2,1,0],[0,2,1],[3,4,1]],B:[[2,-1,0]],C:[[1,3,-1]],literals:['𝑎 = 2','𝐵𝑡 ∙ 𝐶']},
 {index:605,M:[[7,2],[7,8]],N:[[4,3],[4,-1]],C:[[3,-2],[1,1]],D:[[0,1],[-1,2]],literals:['2A − 5B','3A− B','D2']},
 {index:621,A:[[2,-1],[3,1]],B:[[-1,1],[3,0]],literals:['¿Es A simétrica?','a = 3 y b = 1']},
 {index:634,A:[[7,-6,-2],[3,1,4],[-5,0,-4]],B:[[2,2,3],[5,3,4],[-4,0,1]],C:[[1,2,-1],[-2,-3,0]],literals:['𝐴𝑡 − 𝑋 ∙ 𝐴 = 3𝐼3','𝐶𝑡 ∙ 𝐷 = 𝐵']},
 {index:656,M:[[1,3],[2,5]],N:[[0,-1],[-1,0]],R:[[1,2],[3,-1]],literals:['valores de x e y','Resuelva la ecuación matricial']},
];
const reasons=['Cambiar un signo al trasladar términos.','Omitir un factor o un término de la ecuación.','Multiplicar en el lado incorrecto o transponer indebidamente.'];
const invSteps=(A,name)=>A.length===3?inverseSteps(A,name):[
 ['Calculamos el determinante mediante las dos diagonales.',`det(${name})=${scalar(A[0][0])}·(${scalar(A[1][1])})−(${scalar(A[0][1])})·(${scalar(A[1][0])})=${scalar(det(A))}`],
 ['El determinante no se anula, por lo que podemos invertir.',`det(${name})≠0`],
 ['Intercambiamos las entradas diagonales y negamos las otras dos.',`adj(${name})=${matrix([[A[1][1],-A[0][1]],[-A[1][0],A[0][0]]])}`],
 ['Dividimos toda la adjunta por el determinante.',`${name}⁻¹=${matrix(inverse(A))}`],
 ['Comprobamos por multiplicación en ambos sentidos.',`${name}${name}⁻¹=${name}⁻¹${name}=I₂`],
];
export function solve(c,text){
 const p=officialParts(text);assert.equal(p.length,[557,583,590].includes(c.index)?3:2);
 const make=(i,a,w,steps,proof,why=reasons)=>part(p[i],a,w,why,steps,'OFFICIAL_MATRIX_TASK_WITH_INDEPENDENT_SUBSTITUTION',proof);
 const mat=(i,label,value,wrong,steps,proof={})=>make(i,`${label}=${matrix(value)}`,wrong.map(w=>`${label}=${matrix(w)}`),steps,{value,wrong,...proof});
 if(c.index===553){const V=inverse(c.A),A2=mul(c.A,c.A),P=scale(add(add(A2,scale(c.A,-4)),scale(I(3),5)),.5),X=T(mul(c.R,V));return[
  mat(0,'A⁻¹',P,[scale(P,2),scale(P,-1),c.A],[
   ['La igualdad que debemos demostrar expresa la inversa como un polinomio en A.',`A=${matrix(c.A)}`],
   ['Calculamos el cuadrado mediante productos fila-columna.',`A²=${matrix(A2)}`],
   ['Restamos cuatro veces A y sumamos cinco veces la identidad.',`A²−4A+5I₃=${matrix(scale(P,2))}`],
   ['Dividimos todas las entradas por dos y llamamos P a la matriz resultante.',`P=${matrix(P)}`],
   ['Multiplicamos A por P y P por A; ambos productos son la identidad.',`AP=PA=${matrix(I(3))}`],
   ['Esto demuestra la igualdad solicitada, no solo una coincidencia entre entradas.',`A⁻¹=frac{1}{2}(A²−4A+5I₃)=${matrix(P)}`],
  ],{A2,P}),
  make(1,`X:3×2; X=${matrix(X)}`,[scale(X,-1),T(mul(c.R,c.A)),T(c.R)].map(w=>`X:3×2; X=${matrix(w)}`),[
   ['El segundo miembro tiene dos filas y tres columnas.',`R=${matrix(c.R)}`],
   ['Como A es 3×3, Xᵗ debe ser 2×3 y X debe ser 3×2.','XᵗA=R ⇒ X:3×2'],
   ['Multiplicamos por A⁻¹ a la derecha.','Xᵗ=RA⁻¹'],
   ['Utilizamos la inversa demostrada en el apartado anterior.',`Xᵗ=${matrix(mul(c.R,V))}`],
   ['Transponemos el resultado completo para obtener la incógnita.',`X=${matrix(X)}`],
   ['La sustitución en la ecuación original reproduce R.',`XᵗA=${matrix(c.R)}`],
  ],{value:X,wrong:[scale(X,-1),T(mul(c.R,c.A)),T(c.R)],dimension:[3,2]})];}
 if(c.index===557){const X=scale(add(c.A,scale(c.B,-2)),1/11),Y=add(c.B,scale(X,4)),V=inverse(c.C);return[
  make(0,`X=${matrix(X)}; Y=${matrix(Y)}`,[[scale(X,-1),add(c.B,scale(X,-4))],[scale(X,11),add(c.B,scale(X,44))],[Y,X]].map(([x,y])=>`X=${matrix(x)}; Y=${matrix(y)}`),[
   ['Usamos la segunda ecuación para expresar Y en función de X.','−4X+Y=B ⇒ Y=B+4X'],
   ['Sustituimos esa expresión en la primera ecuación.','3X+2(B+4X)=A'],
   ['Distribuimos y agrupamos; el coeficiente es 11, no 7.','11X=A−2B'],
   ['Calculamos cada entrada y dividimos por once.',`X=${matrix(X)}`],
   ['Recuperamos la segunda incógnita con la ecuación despejada.',`Y=B+4X=${matrix(Y)}`],
   ['Verificamos simultáneamente las dos ecuaciones.',`3X+2Y=${matrix(c.A)}; −4X+Y=${matrix(c.B)}`],
  ],{X,Y,wrong:[[scale(X,-1),add(c.B,scale(X,-4))],[scale(X,11),add(c.B,scale(X,44))],[Y,X]]}),
  make(1,'C tiene inversa si m≠2.',['C tiene inversa si m≠−2.','C tiene inversa si m≠0.','C tiene inversa solo si m=2.'],[
   ['La matriz depende del parámetro situado en su segunda fila.','C=[[4,6],[m,3]]'],
   ['Calculamos la diferencia de los productos diagonales.','det(C)=4·3−6m=12−6m'],
   ['Buscamos el único valor singular.','12−6m=0 ⇒ m=2'],
   ['La inversa existe exactamente cuando el determinante es distinto de cero.','det(C)≠0 ⇔ m≠2'],
   ['Se excluye únicamente ese valor real.','m∈ℝ; m≠2'],
  ],{roots:[2],wrongRoots:[[-2],[0]],polynomial:[12,-6]},['Cambiar el signo de la raíz.','Ignorar el término independiente.','Invertir la condición de singularidad.']),
  mat(2,'C⁻¹',V,[scale(V,6),scale(V,-1),T(V)],invSteps(c.C,'C'))];}
 if(c.index===565){const R=add(c.A,T(mul(c.B,c.C)),-1),W=[add(c.A,mul(c.B,c.C),-1),add(c.A,T(mul(c.B,c.C))),scale(R,-1)],X=mul(inverse(c.A),add(scale(T(c.C),5),c.B,-1));return[
  make(0,`B+2CA no está definida; A−(BC)ᵗ=${matrix(R)}`,W.map(w=>`B+2CA no está definida; A−(BC)ᵗ=${matrix(w)}`),[
   ['Anotamos primero las dimensiones.','A:2×2; B:2×1; C:1×2'],
   ['CA es una fila 1×2 y B es una columna 2×1: no se pueden sumar.','B+2CA: suma no definida'],
   ['BC sí existe y es de tamaño 2×2.',`BC=${matrix(mul(c.B,c.C))}`],
   ['Transponemos el producto completo, no solo una de sus matrices.',`(BC)ᵗ=${matrix(T(mul(c.B,c.C)))}`],
   ['Restamos entrada a entrada matrices del mismo tamaño.',`A−(BC)ᵗ=${matrix(R)}`],
  ],{value:R,wrong:W,firstOperationDefined:false}),
  mat(1,'X',X,[mul(inverse(c.A),add(scale(T(c.C),5),c.B)),mul(inverse(c.A),add(T(c.C),c.B,-1)),scale(X,-1)],[
   ['Multiplicamos por cinco ambos miembros para eliminar el factor exterior.','B+AX=5Cᵗ'],
   ['Pasamos B restando.','AX=5Cᵗ−B'],
   ['La incógnita es una columna 2×1.',`5Cᵗ−B=${matrix(add(scale(T(c.C),5),c.B,-1))}`],...invSteps(c.A,'A'),
   ['Multiplicamos por A⁻¹ a la izquierda.',`X=${matrix(X)}`],
   ['Verificamos también el factor de un quinto de la ecuación original.',`frac{1}{5}(B+AX)=Cᵗ=${matrix(T(c.C))}`],
  ])];}
 if(c.index===568){const R=add(mul(c.A,c.A),mul(c.B,T(c.C)),-1),X=mul(inverse(c.A),add(scale(c.C,2),c.B,-1));return[
  mat(0,'A²−BCᵗ',R,[add(mul(c.A,c.A),mul(c.B,T(c.C))),add(c.A.map(r=>r.map(v=>v*v)),mul(c.B,T(c.C)),-1),scale(R,-1)],[
   ['A² es un producto de matrices, no el cuadrado de cada entrada.',`A²=${matrix(mul(c.A,c.A))}`],
   ['Transponemos C para hacer compatible el producto.',`Cᵗ=${matrix(T(c.C))}`],
   ['Multiplicamos la matriz 2×3 por la matriz 3×2.',`BCᵗ=${matrix(mul(c.B,T(c.C)))}`],
   ['Ambos resultados son 2×2 y se pueden restar.','(2×2)−(2×2)'],
   ['Restamos cada par de entradas correspondientes.',`A²−BCᵗ=${matrix(R)}`],
  ]),
  mat(1,'X',X,[mul(inverse(c.A),add(scale(c.C,2),c.B)),mul(inverse(c.A),add(c.C,c.B,-1)),scale(X,-1)],[
   ['Restamos B a ambos lados de la igualdad.','AX=2C−B'],
   ['Calculamos el segundo miembro, que es 2×3.',`2C−B=${matrix(add(scale(c.C,2),c.B,-1))}`],...invSteps(c.A,'A'),
   ['Multiplicamos a la izquierda sin cambiar el orden.',`X=A⁻¹(2C−B)=${matrix(X)}`],
   ['Verificamos todas las entradas en la ecuación original.',`AX+B=2C=${matrix(scale(c.C,2))}`],
  ])];}
 if(c.index===583){const V=inverse(c.A),X=mul(V,c.B);return[
  make(0,'A no es invertible para a∈{−4,0,4}.',['A no es invertible para a∈{−4,4}.','A no es invertible para a∈{0,16}.','A no es invertible para a∈{0,4}.'],[
   ['Desarrollamos por la tercera columna, que contiene dos ceros.','det(A)=a·det([[a,2],[8,a]])'],
   ['Calculamos el determinante de orden dos.','det(A)=a(a²−16)'],
   ['Factorizamos la diferencia de cuadrados.','det(A)=a(a−4)(a+4)'],
   ['El producto se anula si se anula cualquiera de los tres factores.','a=0 o a=4 o a=−4'],
   ['El enunciado pide precisamente los valores NO invertibles.','a∈{−4,0,4}'],
  ],{roots:[-4,0,4],wrongRoots:[[-4,4],[0,16],[0,4]],polynomial:[0,-16,0,1]},['Olvidar el factor a.','No extraer las dos raíces de a²=16.','Descartar la raíz negativa.']),
  mat(1,'A⁻¹',V,[T(V),scale(V,-1),scale(V,45)],inverseSteps(c.A,'A')),
  mat(2,'X',X,[mul(c.A,c.B),scale(X,-1),T([[1,2,2]])],[
   ['Para a=5 el determinante vale 45 y la matriz es invertible.','det(A)=5(25−16)=45'],
   ['La matriz B es una columna de tres entradas.',`B=${matrix(c.B)}`],
   ['Despejamos mediante la inversa por la izquierda.','AX=B ⇒ X=A⁻¹B'],
   ['Usamos la inversa del apartado anterior.',`A⁻¹=${matrix(V)}`],
   ['Los productos fila-columna dan la solución.',`X=${matrix(X)}`],
   ['Comprobamos las tres ecuaciones escalares.','5·1+2·(−2)=1; 8·1+5·(−2)=−2; 5·2=10'],
  ])];}
 if(c.index===590){const V=inverse(c.A),R=add(mul(T(c.B),c.C),I(3),-1),X=mul(R,V);return[
  make(0,'A tiene inversa si a∉{1,3}.',['A tiene inversa si a∉{−1,−3}.','A tiene inversa si a≠1.','A tiene inversa solo si a∈{1,3}.'],[
   ['Desarrollamos el determinante por la primera fila.','det(A)=a(a−4)−(0−3)'],
   ['Distribuimos el producto y conservamos el signo del cofactor.','det(A)=a²−4a+3'],
   ['Buscamos dos números cuyo producto sea tres y suma sea menos cuatro.','a²−4a+3=(a−1)(a−3)'],
   ['Las raíces son precisamente los valores que se excluyen.','det(A)=0 ⇔ a=1 o a=3'],
   ['La condición completa de inversibilidad es la siguiente.','a∈ℝ; a∉{1,3}'],
  ],{roots:[1,3],polynomial:[3,-4,1]},['Cambiar los signos de las raíces.','Olvidar una de las dos raíces.','Confundir invertible y singular.']),
  mat(1,'A⁻¹',V,[T(V),scale(V,-1),c.A],inverseSteps(c.A,'A')),
  mat(2,'X',X,[mul(V,R),mul(add(mul(T(c.B),c.C),I(3)),V),scale(X,-1)],[
   ['La transpuesta de B es 3×1; al multiplicarla por C resulta 3×3.',`BᵗC=${matrix(mul(T(c.B),c.C))}`],
   ['Restamos la identidad antes de despejar.','XA=BᵗC−I₃'],
   ['Formamos el segundo miembro.',`BᵗC−I₃=${matrix(R)}`],
   ['A está a la derecha de X: su inversa también debe multiplicar por la derecha.','X=(BᵗC−I₃)A⁻¹'],
   ['Calculamos los nueve productos fila-columna.',`X=${matrix(X)}`],
   ['La comprobación recupera el producto exterior original.',`XA+I₃=${matrix(mul(T(c.B),c.C))}`],
  ])];}
 if(c.index===605){const A=scale(add(scale(c.N,5),c.M,-1),1/13),B=add(scale(A,3),c.N,-1),R=add(I(2),mul(c.D,c.D)),X=mul(R,inverse(c.C));const wrong=[[scale(A,-1),add(scale(A,-3),c.N,-1)],[B,A],[scale(A,13),add(scale(A,39),c.N,-1)]];return[
  make(0,`A=${matrix(A)}; B=${matrix(B)}`,wrong.map(([a,b])=>`A=${matrix(a)}; B=${matrix(b)}`),[
   ['Llamamos M y N a los segundos miembros oficiales.',`M=${matrix(c.M)}; N=${matrix(c.N)}`],
   ['La segunda ecuación permite despejar B.','3A−B=N ⇒ B=3A−N'],
   ['Sustituimos en la primera y distribuimos el coeficiente −5.','2A−5(3A−N)=M ⇒ −13A=M−5N'],
   ['Despejamos y calculamos las entradas.',`A=frac{1}{13}(5N−M)=${matrix(A)}`],
   ['Recuperamos B utilizando la segunda ecuación.',`B=3A−N=${matrix(B)}`],
   ['Verificamos ambos segundos miembros.',`2A−5B=${matrix(c.M)}; 3A−B=${matrix(c.N)}`],
  ],{A,B,wrong}),
  mat(1,'X',X,[mul(inverse(c.C),R),mul(add(I(2),mul(c.D,c.D),-1),inverse(c.C)),scale(X,-1)],[
   ['Calculamos D² como producto matricial.',`D²=${matrix(mul(c.D,c.D))}`],
   ['Pasamos D² sumando.','XC=I₂+D²'],
   ['Formamos el segundo miembro.',`I₂+D²=${matrix(R)}`],...invSteps(c.C,'C'),
   ['Multiplicamos a la derecha por la inversa de C.',`X=(I₂+D²)C⁻¹=${matrix(X)}`],
   ['Sustituimos en la ecuación original y obtenemos la identidad.','XC−D²=I₂'],
  ])];}
 if(c.index===621){const X=add(scale(mul(c.A,c.B),.5),scale(I(2),3));return[
  make(0,'a=−1; b=0; A sí es simétrica.',['a=−1; b=0; A no es simétrica.','a=1; b=0; A no es simétrica.','a=−1; b=−4; A sí es simétrica.'],[
   ['Elevamos la matriz paramétrica al cuadrado por multiplicación.','A²=[[4−a,−2−b],[2a+ab,−a+b²]]'],
   ['Igualamos la entrada superior izquierda con cinco.','4−a=5 ⇒ a=−1'],
   ['Igualamos la entrada superior derecha con menos dos.','−2−b=−2 ⇒ b=0'],
   ['Verificamos también las dos entradas inferiores.','2(−1)+(−1)·0=−2; −(−1)+0²=1'],
   ['La matriz obtenida coincide con su transpuesta.','A=[[2,−1],[−1,0]]=Aᵗ'],
  ],{a:-1,b:0,symmetric:true,wrong:[{a:-1,b:0,symmetric:false},{a:1,b:0,symmetric:false},{a:-1,b:-4,symmetric:true}]}),
  mat(1,'X',X,[add(scale(mul(c.A,c.B),.5),scale(I(2),-3)),add(mul(c.A,c.B),scale(I(2),3)),add(scale(mul(c.B,c.A),.5),scale(I(2),3))],[
   ['Este apartado fija nuevos valores a=3 y b=1, distintos de los del apartado anterior.',`A=${matrix(c.A)}`],
   ['Multiplicamos A por B en el orden indicado.',`AB=${matrix(mul(c.A,c.B))}`],
   ['Dividimos ambos miembros por dos.','frac{1}{2}AB=X−3I₂'],
   ['Pasamos tres veces la identidad sumando.','X=frac{1}{2}AB+3I₂'],
   ['Calculamos la matriz incógnita.',`X=${matrix(X)}`],
   ['Verificamos la ecuación con los parámetros de este apartado.',`2(X−3I₂)=AB=${matrix(mul(c.A,c.B))}`],
  ])];}
 if(c.index===634){const R=add(T(c.A),scale(I(3),3),-1),X=mul(R,inverse(c.A));return[
  mat(0,'X',X,[mul(inverse(c.A),R),mul(add(T(c.A),scale(I(3),3)),inverse(c.A)),scale(X,-1)],[
   ['Trasladamos XA y 3I₃ sin perder el signo de la incógnita.','Aᵗ−XA=3I₃ ⇒ XA=Aᵗ−3I₃'],
   ['Transponemos A y restamos tres a cada entrada diagonal.',`Aᵗ−3I₃=${matrix(R)}`],...inverseSteps(c.A,'A'),
   ['Multiplicamos por A⁻¹ a la derecha.',`X=(Aᵗ−3I₃)A⁻¹=${matrix(X)}`],
   ['La sustitución verifica todas las entradas de la identidad.','Aᵗ−XA=3I₃'],
  ]),
  make(1,'Sí existe: a=−2.',['Sí existe: a=2.','Sí existe: a=0.','No existe ningún valor real.'],[
   ['Transponemos C antes de multiplicar por D.','Cᵗ=[[1,−2],[2,−3],[−1,0]]'],
   ['Calculamos el producto conservando el parámetro.','CᵗD=[[a²−2,2,−1−2a],[2a²−3,3,−2−3a],[−a²,0,1]]'],
   ['Una entrada da a²=4, que por sí sola permite dos valores.','a²−2=2 ⇒ a=±2'],
   ['La entrada superior derecha determina el signo.','−1−2a=3 ⇒ a=−2'],
   ['Sustituimos ese valor en las nueve entradas, no solo en las utilizadas.',`CᵗD(−2)=${matrix(c.B)}=B`],
   ['Así existe un único valor que satisface todas las ecuaciones.','a=−2'],
  ],{a:-2,wrong:[2,0],noneIsFalse:true})];}
 const X=mul(add(c.R,scale(c.N,2)),inverse(c.M));return[
  make(0,'x=frac{6}{7}; y=frac{9}{7}.',['x=frac{6}{7}; y=frac{−9}{7}.','x=frac{9}{7}; y=frac{6}{7}.','x=frac{3}{7}; y=frac{9}{14}.'],[
   ['Multiplicamos la matriz izquierda por la columna (x,−y).','[[2,−1],[3,−1]]·[[x],[−y]]=[[2x+y],[3x+y]]'],
   ['En el lado derecho, la segunda columna se multiplica por cero.','[[1,x],[y,−1]]·[[3],[0]]=[[3],[3y]]'],
   ['Igualamos las dos entradas de las columnas.','2x+y=3; 3x+y=3y'],
   ['De la segunda ecuación obtenemos y=3x/2 y sustituimos en la primera.','2x+frac{3x}{2}=3 ⇒ 7x=6'],
   ['Calculamos las dos incógnitas.','x=frac{6}{7}; y=frac{9}{7}'],
   ['Verificamos ambas entradas de la igualdad original.','2·frac{6}{7}+frac{9}{7}=3; 3·frac{6}{7}+frac{9}{7}=frac{27}{7}=3y'],
  ],{x:6/7,y:9/7,wrong:[[6/7,-9/7],[9/7,6/7],[3/7,9/14]]}),
  mat(1,'X',X,[mul(inverse(c.M),add(c.R,scale(c.N,2))),mul(add(c.R,scale(c.N,-2)),inverse(c.M)),scale(X,-1)],[
   ['Llamamos M a la matriz que multiplica a X y N a la matriz multiplicada por dos.',`M=${matrix(c.M)}; N=${matrix(c.N)}`],
   ['Pasamos el término −2N al otro miembro sumando.','XM=R+2N'],
   ['Calculamos el segundo miembro completo.',`R+2N=${matrix(add(c.R,scale(c.N,2)))}`],...invSteps(c.M,'M'),
   ['Multiplicamos a la derecha para cancelar M.',`X=(R+2N)M⁻¹=${matrix(X)}`],
   ['La sustitución devuelve exactamente la matriz R.',`XM−2N=${matrix(c.R)}`],
  ])];
}
export function buildFurtherMatrixBatch(id='batch-0315',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Ecuaciones matriciales','Dimensiones','Determinantes'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='COMPLETE_SOURCE_MATRIX_QUESTION_ALL_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildFurtherMatrixBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0315-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0315.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
