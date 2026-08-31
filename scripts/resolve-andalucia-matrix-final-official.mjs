import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {I,T,mul,add,scale,det,inverse,matrix,inverseSteps} from './resolve-andalucia-matrix-order-three.mjs';
import {solve as solveFurther} from './resolve-andalucia-matrix-further-official.mjs';
export const cases=[
 {index:745,A:[[1,-1],[2,-1]],B:[[0,2],[-1,2]],literals:['2, 3 y 2 filas','4','I 2 − 2X']},
 {index:840,M:[[2,1],[1,2]],N:[[1,-1],[0,2]],literals:['calcule los valores de a','M  A  A']},
 {index:861,M:[[1,0,1],[2,1,0],[1,1,1]],N:[[3,2,2],[5,2,1],[7,4,0]],literals:['Halle el valor de a','siendo a un número real']},
 {index:872,A:[[2,-5],[1,-3]],B:[[3,-1,2],[0,1,1]],C:[[1,2,3],[-1,5,3]],literals:['Calcule A2','A ⋅ X + B = 2 ⋅ C']},
 {index:878,A:[[2,4],[-2,-6]],B:[[1,0,1],[1,-2,0]],literals:['dimensión de la matriz resultante','A−1']},
 {index:912,A:[[2,1],[3,-2]],B:[[3,-2],[1,4]],v:[[6],[9]],literals:['A  2  X  B','Halle la matriz Y']},
 {index:941,A:[[0,1,0],[1,0,1]],B:[[3,-1],[1,2]],literals:['A⋅ At','At ⋅ A','A ⋅ At ⋅ X = B']},
 {index:948,literals:['P ⋅ Q y Q ⋅ P','P ⋅ 2Q = R']},
 {index:1000,A:[[1,0],[-1,1]],literals:['A40 y (At)30','(A−1 + A)2','(At + I2) · X = At − I2']},
 {index:1022,A:[[1,5,6],[0,1,7],[0,0,1]],literals:['(I3 − A)','B ⋅ C − D = O']},
];
const common=['Cambiar el signo de un término.','Omitir una operación o un factor.','Cambiar el orden de multiplicación.'];
const invSteps=(A,label)=>A.length===3?inverseSteps(A,label):[
 ['Calculamos el determinante de la matriz de orden dos.',`det(${label})=${A[0][0]}·(${A[1][1]})−(${A[0][1]})·(${A[1][0]})=${det(A)}`],
 ['El determinante no se anula: la inversa existe.',`det(${label})≠0`],
 ['Intercambiamos las entradas diagonales y negamos las otras dos.',`adj(${label})=${matrix([[A[1][1],-A[0][1]],[-A[1][0],A[0][0]]])}`],
 ['Dividimos cada entrada por el determinante.',`${label}⁻¹=${matrix(inverse(A))}`],
 ['Verificamos la identidad multiplicando en ambos órdenes.',`${label}${label}⁻¹=${label}⁻¹${label}=I₂`],
];
export function solve(c,text){
 if(c.index===872)return solveFurther({...c,index:568},text); // Same native mathematics, separately verified official document.
 const p=officialParts(text);assert.equal(p.length,[861,912,1000].includes(c.index)?3:2);
 const make=(i,a,w,steps,proof,why=common)=>part(p[i],a,w,why,steps,'OFFICIAL_MATRIX_TASK_WITH_INDEPENDENT_SUBSTITUTION',proof);
 const mat=(i,label,value,wrong,steps,proof={})=>make(i,`${label}=${matrix(value)}`,wrong.map(w=>`${label}=${matrix(w)}`),steps,{value,wrong,...proof});
 if(c.index===745){const R=mul(c.A,add(c.A,T(c.B),-1)),X=scale(add(I(2),R,-1),.5);return[
  make(0,'A:2×3; B:3×2; C:2×4.',['A:2×2; B:3×3; C:2×4.','A:2×3; B:3×4; C:2×2.','A:2×4; B:3×2; C:2×3.'],[
   ['Conocemos el número de filas de cada matriz.','A:2×p; B:3×q; C:2×r'],
   ['Para formar AB, las columnas de A deben coincidir con las filas de B.','p=3'],
   ['Para multiplicar AB por C, las columnas de B deben coincidir con las filas de C.','q=2'],
   ['El producto conserva las columnas de la última matriz.','ABC:2×r ⇒ r=4'],
   ['Comprobamos las dos dimensiones interiores y la final.','(2×3)(3×2)(2×4) ⇒ 2×4'],
  ],{dimensions:[[2,3],[3,2],[2,4]],wrong:[[[2,2],[3,3],[2,4]],[[2,3],[3,4],[2,2]],[[2,4],[3,2],[2,3]]]}),
  mat(1,'X',X,[scale(X,-1),add(I(2),R,-1),scale(add(I(2),mul(add(c.A,T(c.B),-1),c.A),-1),.5)],[
   ['Transponemos B antes de realizar la resta.',`Bᵗ=${matrix(T(c.B))}`],
   ['Restamos matrices del mismo tamaño.',`A−Bᵗ=${matrix(add(c.A,T(c.B),-1))}`],
   ['Multiplicamos A por el resultado, manteniendo el orden.',`A(A−Bᵗ)=${matrix(R)}`],
   ['Despejamos la incógnita y dividimos por dos.','I₂−2X=R ⇒ X=frac{1}{2}(I₂−R)'],
   ['Calculamos las cuatro entradas.',`X=${matrix(X)}`],
   ['La sustitución recupera el segundo miembro completo.',`I₂−2X=${matrix(R)}`],
  ])];}
 if(c.index===840){const X=mul(inverse(c.M),add(I(2),c.N,-1));return[
  mat(0,'X',X,[mul(inverse(c.M),add(I(2),c.N)),mul(add(I(2),c.N,-1),inverse(c.M)),scale(X,-1)],[
   ['Llamamos M a la matriz que multiplica a X y N a la matriz sumada.',`M=${matrix(c.M)}; N=${matrix(c.N)}`],
   ['Restamos N para aislar el producto.','MX=I₂−N'],...invSteps(c.M,'M'),
   ['Multiplicamos por M⁻¹ a la izquierda.',`X=M⁻¹(I₂−N)=${matrix(X)}`],
   ['Verificamos todas las entradas de MX+N.','MX+N=I₂'],
  ]),
  make(1,'a=2; b=1.',['a=1; b=2.','a=−2; b=−1.','a=0; b=0.'],[
   ['La matriz M intercambia las filas de la matriz a la que multiplica.','M=[[0,1],[1,0]]'],
   ['Calculamos el producto con las incógnitas.','MA=[[2,1],[a,b]]'],
   ['Igualamos el producto a la matriz A original.','[[2,1],[a,b]]=[[a,b],[2,1]]'],
   ['Las dos filas deben ser iguales entre sí.','a=2; b=1'],
   ['Sustituimos para comprobar la igualdad de las cuatro entradas.','MA=A=[[2,1],[2,1]]'],
  ],{a:2,b:1,wrong:[[1,2],[-2,-1],[0,0]]})];}
 if(c.index===861){const V=inverse(c.M),X=mul(add(c.N,I(3)),V),invWrong=[T(V),scale(V,-1),c.M],wrong=[mul(V,add(c.N,I(3))),mul(add(c.N,I(3),-1),V),scale(X,-1)];return[
  make(0,'a=1.',['a=−1.','a=0.','a=2.'],[
   ['Transponemos M para obtener las filas que multiplicarán a V.','Mᵗ=[[1,2,1],[0,1,1],[1,0,1]]'],
   ['Calculamos cada entrada del producto con el parámetro.','MᵗV=[[3+2a],[a²+a−1],[5]]'],
   ['Igualamos con la columna (5,1,5). La primera entrada determina a.','3+2a=5 ⇒ a=1'],
   ['Comprobamos la segunda ecuación, que es cuadrática.','1²+1−1=1'],
   ['La tercera ecuación es una identidad y también se cumple.','5=5 ⇒ a=1 es la solución común'],
  ],{a:1,wrong:[-1,0,2]}),
  make(1,`M⁻¹=${matrix(V)}; X=${matrix(X)}`,wrong.map((x,j)=>`M⁻¹=${matrix(invWrong[j])}; X=${matrix(x)}`),[
   ...inverseSteps(c.M,'M'),
   ['Despejamos XM pasando la identidad sumando.','XM=N+I₃'],
   ['M está a la derecha, así que su inversa multiplica por ese lado.','X=(N+I₃)M⁻¹'],
   ['Calculamos el segundo miembro y el producto.',`N+I₃=${matrix(add(c.N,I(3)))}; X=${matrix(X)}`],
   ['Verificamos ambas peticiones: la inversa y la ecuación.','MM⁻¹=M⁻¹M=I₃; XM−I₃=N'],
  ],{inverse:V,value:X,wrong,invWrong}),
  make(2,'2VNᵗ: no definida; (N+Mᵗ)V:3×1.',['2VNᵗ:3×3; (N+Mᵗ)V:3×1.','2VNᵗ: no definida; (N+Mᵗ)V:1×3.','2VNᵗ: no definida; (N+Mᵗ)V: no definida.'],[
   ['M y N son cuadradas de orden tres, mientras V es una columna.','M,N:3×3; V:3×1'],
   ['La transpuesta de N sigue siendo 3×3.','Nᵗ:3×3'],
   ['En VNᵗ las dimensiones interiores son uno y tres: no coinciden.','(3×1)(3×3): producto no definido'],
   ['N y Mᵗ tienen el mismo tamaño y se pueden sumar.','N+Mᵗ:3×3'],
   ['La multiplicación por V sí es compatible.','(3×3)(3×1) ⇒ 3×1'],
  ],{firstDefined:false,secondDimension:[3,1]})];}
 if(c.index===878){const K=mul(c.B,T(c.B)),R=add(scale(c.A,.5),scale(T(c.A),2),-1),X=mul(R,inverse(K));return[
  mat(0,'X',X,[mul(inverse(K),R),mul(add(scale(c.A,.5),scale(T(c.A),2)),inverse(K)),scale(X,2)],[
   ['B es 2×3 y Bᵗ es 3×2, por lo que su producto es 2×2.',`K=BBᵗ=${matrix(K)}`],
   ['Calculamos la transpuesta y los dos factores numéricos.',`R=frac{1}{2}A−2Aᵗ=${matrix(R)}`],...invSteps(K,'K'),
   ['Multiplicamos la ecuación XK=R por K⁻¹ a la derecha.',`X=RK⁻¹=${matrix(X)}`],
   ['Verificamos la ecuación sin alterar el orden.','X(BBᵗ)=frac{1}{2}A−2Aᵗ'],
  ]),
  make(1,'AB:2×3; ABᵗ: no definida; BA⁻¹: no definida; BᵗA+A⁻¹: no definida.',[
   'AB:2×3; ABᵗ:2×2; BA⁻¹: no definida; BᵗA+A⁻¹: no definida.',
   'AB:2×3; ABᵗ: no definida; BA⁻¹:2×3; BᵗA+A⁻¹: no definida.',
   'AB:2×3; ABᵗ: no definida; BA⁻¹: no definida; BᵗA+A⁻¹:3×2.',
  ],[
   ['A es invertible porque su determinante vale −4; su inversa es 2×2.','A:2×2; B:2×3; Bᵗ:3×2; A⁻¹:2×2'],
   ['En AB coinciden las dimensiones interiores y el resultado es rectangular.','(2×2)(2×3) ⇒ 2×3'],
   ['En ABᵗ no coinciden las dimensiones interiores.','(2×2)(3×2): no definido'],
   ['Tampoco coinciden en BA⁻¹.','(2×3)(2×2): no definido'],
   ['BᵗA sí es 3×2, pero no puede sumarse a una matriz 2×2.','BᵗA+A⁻¹: suma no definida'],
  ],{defined:[true,false,false,false],dimensions:[[2,3],null,null,null]})];}
 if(c.index===912){const R=mul(c.A,T(c.B)),X=scale(add(c.B,c.A,-1),.5),Y=mul(inverse(c.B),c.v);return[
  mat(0,'ABᵗ',R,[mul(c.A,c.B),mul(c.B,T(c.A)),scale(R,-1)],[
   ['Transponemos B intercambiando sus filas y columnas.',`Bᵗ=${matrix(T(c.B))}`],
   ['La entrada superior izquierda es el producto de la primera fila de A por la primera columna de Bᵗ.','2·3+1·(−2)=4'],
   ['Calculamos la entrada superior derecha.','2·1+1·4=6'],
   ['Calculamos las dos entradas de la segunda fila.','3·3+(−2)·(−2)=13; 3·1+(−2)·4=−5'],
   ['Ordenamos las entradas según fila y columna.',`ABᵗ=${matrix(R)}`],
  ]),
  mat(1,'X',X,[scale(X,-1),scale(X,2),scale(add(c.A,c.B),.5)],[
   ['Partimos de la ecuación completa.','A+2X=B'],
   ['Restamos A a ambos lados.','2X=B−A'],
   ['La resta se realiza entrada a entrada.',`B−A=${matrix(add(c.B,c.A,-1))}`],
   ['Dividimos todas las entradas por dos.',`X=${matrix(X)}`],
   ['Sustituimos la matriz para comprobar la igualdad.',`A+2X=${matrix(c.B)}`],
  ]),
  mat(2,'Y',Y,[mul(c.B,c.v),scale(Y,-1),[[Y[1][0]],[Y[0][0]]]],[
   ['El segundo miembro es una columna 2×1, así que Y también lo es.',`BY=${matrix(c.v)}`],...invSteps(c.B,'B'),
   ['Multiplicamos por B⁻¹ a la izquierda.',`Y=B⁻¹${matrix(c.v)}=${matrix(Y)}`],
   ['La comprobación da las dos entradas oficiales.',`BY=${matrix(c.v)}`],
  ])];}
 if(c.index===941){const K=mul(c.A,T(c.A)),L=mul(T(c.A),c.A),X=mul(inverse(K),c.B),wrongPairs=[[scale(K,-1),L],[K,scale(L,-1)],[scale(K,2),scale(L,2)]];return[
  make(0,`AAᵗ=${matrix(K)}; AᵗA=${matrix(L)}; AB: no definido.`,wrongPairs.map(([k,l])=>`AAᵗ=${matrix(k)}; AᵗA=${matrix(l)}; AB: no definido.`),[
   ['Anotamos las dimensiones antes de calcular.','A:2×3; Aᵗ:3×2; B:2×2'],
   ['AAᵗ está definido y es de orden dos.',`AAᵗ=${matrix(K)}`],
   ['AᵗA también está definido, pero ahora es de orden tres.',`AᵗA=${matrix(L)}`],
   ['En AB las dimensiones interiores tres y dos no coinciden.','(2×3)(2×2): no definido'],
   ['Los dos productos válidos no tienen el mismo tamaño y no son intercambiables.','AAᵗ:2×2; AᵗA:3×3'],
  ],{K,L,wrong:wrongPairs,ABDefined:false}),
  mat(1,'X',X,[mul(c.B,inverse(K)),mul(K,c.B),scale(X,-1)],[
   ['Utilizamos el producto calculado en el apartado anterior.',`K=AAᵗ=${matrix(K)}`],...invSteps(K,'K'),
   ['La ecuación KX=B se resuelve multiplicando a la izquierda.','X=K⁻¹B'],
   ['Calculamos la incógnita.',`X=${matrix(X)}`],
   ['Verificamos el producto con la matriz rectangular original.','AAᵗX=B'],
  ])];}
 if(c.index===948)return[
  make(0,'PQ=[[17,9,5+2b],[a,a,5a]]; QP: no definido.',['PQ=[[17,9,5+b],[a,a,5a]]; QP: no definido.','PQ=[[17,9,5+2b],[a,a,a]]; QP: no definido.','PQ=[[17,9,5+2b],[2a,2a,10a]]; QP: no definido.'],[
   ['La matriz P es 2×2 y Q es 2×3.','PQ:(2×2)(2×3) ⇒ 2×3'],
   ['Multiplicamos la primera fila de P por las columnas de Q.','1·1+2·8=17; 1·1+2·4=9; 1·5+2b=5+2b'],
   ['La segunda fila de P es (a,0).','a·1+0·8=a; a·1+0·4=a; a·5+0·b=5a'],
   ['Organizamos las seis entradas.','PQ=[[17,9,5+2b],[a,a,5a]]'],
   ['El producto inverso tiene dimensiones interiores incompatibles.','QP:(2×3)(2×2): no definido'],
  ],{coefficients:[[17,9,'5+2b'],['a','a','5a']],wrongKind:['OMIT_FACTOR_TWO','OMIT_FACTOR_FIVE','DOUBLE_SECOND_ROW'],QPDefined:false}),
  make(1,'a=5; b=−1; c=34; d=18.',['a=10; b=1; c=17; d=9.','a=5; b=1; c=34; d=18.','a=−5; b=−1; c=34; d=18.'],[
   ['El factor dos multiplica todas las entradas del producto PQ.','P·2Q=2PQ=[[34,18,10+4b],[2a,2a,10a]]'],
   ['Igualamos la segunda fila con la de R.','2a=10; 10a=50 ⇒ a=5'],
   ['La última entrada de la primera fila determina b.','10+4b=6 ⇒ b=−1'],
   ['Las otras dos entradas de esa fila determinan c y d.','c=34; d=18'],
   ['Comprobamos las seis entradas de la igualdad.','2PQ=R=[[34,18,6],[10,10,50]]'],
  ],{a:5,b:-1,c:34,d:18,wrong:[[10,1,17,9],[5,1,34,18],[-5,-1,34,18]]})];
 if(c.index===1000){const A40=[[1,0],[-40,1]],At30=[[1,-30],[0,1]],X=mul(inverse(add(T(c.A),I(2))),add(T(c.A),I(2),-1)),wrongPair=[[[[1,0],[40,1]],At30],[A40,[[1,30],[0,1]]],[c.A,T(c.A)]];return[
  make(0,`A⁴⁰=${matrix(A40)}; (Aᵗ)³⁰=${matrix(At30)}`,wrongPair.map(([a,b])=>`A⁴⁰=${matrix(a)}; (Aᵗ)³⁰=${matrix(b)}`),[
   ['Escribimos A como identidad más una matriz nilpotente.','A=I₂+N; N=[[0,0],[−1,0]]'],
   ['Al multiplicar N por sí misma se obtiene la matriz nula.','N²=O'],
   ['Como I₂ y N conmutan, el binomio solo conserva los dos primeros términos.','Aⁿ=(I₂+N)ⁿ=I₂+nN'],
   ['Sustituimos el primer exponente.',`A⁴⁰=${matrix(A40)}`],
   ['La potencia de una transpuesta es la transpuesta de la potencia.',`(Aᵗ)³⁰=(A³⁰)ᵗ=${matrix(At30)}`],
  ],{A40,At30,wrong:wrongPair}),
  mat(1,'(A⁻¹+A)²',scale(I(2),4),[scale(I(2),2),I(2),scale(I(2),8)],[
   ['La identidad N²=O permite invertir I₂+N.','(I₂+N)(I₂−N)=I₂−N²=I₂'],
   ['Por tanto, la inversa cambia el signo de la única entrada no diagonal.',`A⁻¹=${matrix(inverse(c.A))}`],
   ['La suma cancela las entradas no diagonales.','A⁻¹+A=2I₂'],
   ['Elevamos el producto escalar por la identidad al cuadrado.','(2I₂)²=4I₂'],
   ['Escribimos la matriz resultado.',`(A⁻¹+A)²=${matrix(scale(I(2),4))}`],
  ]),
  mat(2,'X',X,[scale(X,-1),scale(X,2),T(X)],[
   ['Transponemos A y formamos los dos miembros.',`Aᵗ+I₂=${matrix(add(T(c.A),I(2)))}; Aᵗ−I₂=${matrix(add(T(c.A),I(2),-1))}`],...invSteps(add(T(c.A),I(2)),'K'),
   ['Multiplicamos por la inversa a la izquierda.','X=(Aᵗ+I₂)⁻¹(Aᵗ−I₂)'],
   ['Calculamos el resultado.',`X=${matrix(X)}`],
   ['La sustitución reproduce el segundo miembro.','(Aᵗ+I₂)X=Aᵗ−I₂'],
  ])];}
 const N=add(I(3),c.A,-1),N2=mul(N,N),N3=mul(N2,N);return[
  mat(0,'(I₃−A)³',N3,[N2,N,I(3)],[
   ['Restamos la matriz A a la identidad entrada a entrada.',`N=I₃−A=${matrix(N)}`],
   ['Calculamos el cuadrado por multiplicación.',`N²=${matrix(N2)}`],
   ['Solo puede quedar una entrada en la primera fila y tercera columna.','N²₁₃=(−5)(−7)=35'],
   ['La tercera fila de N es nula, así que al multiplicar N² por N todo se anula.','N³=O'],
   ['Expresamos el cubo como la matriz nula de orden tres.',`(I₃−A)³=${matrix(N3)}`],
  ]),
  make(1,'a=2; b=−1.',['a=−2; b=1.','a=2; b=1.','a=frac{4}{3}; b=−1.'],[
   ['Multiplicamos la matriz paramétrica B por la columna C.','BC=[[−1+3a],[−b+9]]'],
   ['Restamos D y exigimos que cada entrada sea cero.','BC−D=[[3a−6],[−b−1]]=O'],
   ['La primera ecuación determina a.','3a−6=0 ⇒ a=2'],
   ['La segunda ecuación determina b.','−b−1=0 ⇒ b=−1'],
   ['Verificamos el producto completo antes de restar D.','BC=[[5],[10]]=D'],
  ],{a:2,b:-1,wrong:[[-2,1],[2,1],[4/3,-1]]})];
}
export function buildFinalMatrixBatch(id='batch-0316',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Ecuaciones matriciales','Dimensiones','Potencias'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='COMPLETE_SOURCE_MATRIX_QUESTION_ALL_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildFinalMatrixBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0316-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0316.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
