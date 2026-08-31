// Each matrix below is a reading of an inspected official page, not inferred
// from the damaged text extraction. The reversible PDF ledger is separate.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {I,T,mul,add,scale,det,inverse,matrix,inverseSteps} from './resolve-andalucia-matrix-order-three.mjs';
import {solve as previousSolve} from './resolve-andalucia-matrix-final-official.mjs';
export const cases=[
 {index:1065,A:[[1,-1,0],[0,1,-1]],B:[[1,0],[0,1],[2,-2]],C:[[1,1],[3,-2]],literals:['B + 3C','A ⋅ B ⋅ X = C']},
 {index:1076,A:[[2,1],[3,1]],B:[[1,2],[-1,0]],literals:['At ⋅ B − A ⋅ Bt','AX + BA = B']},
 {index:1086,A:[[1,0,1],[-1,-3,2],[1,-1,1]],B:[[3,-2,-1],[0,1,1]],C:[[-2,4],[1,3]],literals:['valores del parámetro k','Para k = −1']},
 {index:1127,P:[[1,0,1],[0,1,0],[1,-1,-1]],J:[[2,1,0],[0,2,0],[0,0,-1]],literals:['Halle la matriz','Compruebe que']},
 {index:1128,A:[[2,1],[0,-1]],B:[[1,-1],[2,0]],C:[[-2,4],[1,-1]],D:[[1,0,1],[0,1,0]],literals:['Razone si se pueden efectuar','Halle la matriz X']},
 {index:1146,A:[[2,1],[3,-2]],B:[[3,-2],[1,4]],v:[[6],[9]],literals:['A + 2X = B','Calcule la matriz Y']},
 {index:1150,A:[[2,3],[3,5]],B:[[3,-5,3],[0,2,1]],C:[[8],[3],[0]],D:[[5],[3]],literals:['Calcule A3','A ⋅ X + B ⋅ C = D']},
 {index:1154,A:[[1,-1,1],[-2,1,0]],B:[[0,-1],[1,0],[-1,2]],C:[[1,3,2],[1,1,1],[0,3,1]],R:[[1,0,0],[0,1,0]],literals:['Resuelva la siguiente ecuación','dimensiones de las matrices']},
 {index:1155,A:[[0,1],[1,0]],B:[[3,2],[2,0]],C:[[1,0],[1,1]],literals:['satisfacen simultáneamente','dimensión 2 × 3']},
 {index:1159,A:[[1,0,-2],[-1,1,0]],B:[[1,-3],[-2,0]],C:[[7,-12,16],[-1,7,12]],literals:['posee inversa','B · X + A = C']},
];
const invSteps=(A,n)=>A.length===3?inverseSteps(A,n):[
 ['Para invertir una matriz de orden dos calculamos su determinante.',`det(${n})=${A[0][0]}·(${A[1][1]})−(${A[0][1]})·(${A[1][0]})=${det(A)}≠0`],
 ['Intercambiamos los elementos de la diagonal y cambiamos de signo los otros dos.',`adj(${n})=${matrix([[A[1][1],-A[0][1]],[-A[1][0],A[0][0]]])}`],
 ['Dividimos la adjunta entre el determinante.',`${n}⁻¹=${matrix(inverse(A))}`],
 ['Verificamos los dos productos con la matriz original.',`${n}${n}⁻¹=${n}⁻¹${n}=I₂`],
];
export function solve(c,text){
 if(c.index===1146)return previousSolve({...c,index:912},text);
 const p=officialParts(text);assert.equal(p.length,[1086,1155].includes(c.index)?3:2);
 const make=(i,a,w,reasons,steps,proof)=>part(p[i],a,w,reasons,steps,'OFFICIAL_MATRIX_SUBPART_INDEPENDENT_PRODUCT_CHECK',proof);
 const mat=(i,label,value,wrong,reasons,steps)=>make(i,`${label}=${matrix(value)}`,wrong.map(v=>`${label}=${matrix(v)}`),reasons,steps,{value,wrong});
 if(c.index===1065){const K=mul(c.A,c.B),X=mul(inverse(K),c.C);return[
  make(0,'ABᵗ: no definida; B+3C: no definida; CBᵗ:2×3; AB+C:2×2.',[
   'ABᵗ:2×2; B+3C: no definida; CBᵗ:2×3; AB+C:2×2.',
   'ABᵗ: no definida; B+3C:3×2; CBᵗ:2×3; AB+C:2×2.',
   'ABᵗ: no definida; B+3C: no definida; CBᵗ:3×2; AB+C:2×2.',
  ],['No transponer las dimensiones de B.','Sumar matrices de distinto tamaño.','Intercambiar filas y columnas del producto.'],[
   ['Anotamos las dimensiones que aparecen en las cuatro operaciones.','A:2×3; B:3×2; Bᵗ:2×3; C:2×2'],
   ['En ABᵗ las dimensiones interiores son tres y dos, diferentes.','(2×3)(2×3): no definido'],
   ['Para sumar se exige igualdad de filas y columnas.','B:3×2; 3C:2×2 ⇒ B+3C no definida'],
   ['CBᵗ tiene dimensiones interiores compatibles.','(2×2)(2×3) ⇒ 2×3'],
   ['AB es de orden dos y puede sumarse con C.','AB:2×2; C:2×2 ⇒ AB+C:2×2'],
  ],{defined:[false,false,true,true],dimensions:[null,null,[2,3],[2,2]]}),
  mat(1,'X',X,[mul(inverse(K),scale(c.C,-1)),mul(c.C,inverse(K)),mul(K,c.C)],['Cambiar el signo del segundo miembro.','Multiplicar la inversa por el lado incorrecto.','Usar AB en lugar de su inversa.'],[
   ['Agrupamos el producto conocido y lo calculamos fila por columna.',`K=AB=${matrix(K)}`],...invSteps(K,'K'),
   ['Multiplicamos KX=C por la inversa a la izquierda.','X=K⁻¹C'],
   ['Calculamos las cuatro entradas de la matriz incógnita.',`X=${matrix(X)}`],
   ['Sustituimos en la ecuación original, con ambas matrices rectangulares.','ABX=C'],
  ])];}
 if(c.index===1076){const R=add(mul(T(c.A),c.B),mul(c.A,T(c.B)),-1),N=add(c.B,mul(c.B,c.A),-1),X=mul(inverse(c.A),N);return[
  mat(0,'AᵗB−ABᵗ',R,[scale(R,-1),add(mul(T(c.A),c.B),mul(c.A,T(c.B))),add(mul(c.A,c.B),mul(c.A,T(c.B)),-1)],['Invertir el orden de la resta.','Sumar los dos productos en lugar de restarlos.','Olvidar la primera transposición.'],[
   ['Transponemos ambas matrices, intercambiando filas y columnas.',`Aᵗ=${matrix(T(c.A))}; Bᵗ=${matrix(T(c.B))}`],
   ['Calculamos el primer producto, manteniendo el orden.',`AᵗB=${matrix(mul(T(c.A),c.B))}`],
   ['Calculamos por separado el segundo producto.',`ABᵗ=${matrix(mul(c.A,T(c.B)))}`],
   ['Restamos las entradas que ocupan la misma posición.',`AᵗB−ABᵗ=${matrix(R)}`],
   ['Comprobamos que sumar el segundo producto reconstruye el primero.',`(AᵗB−ABᵗ)+ABᵗ=${matrix(mul(T(c.A),c.B))}`],
  ]),
  mat(1,'X',X,[mul(inverse(c.A),add(c.B,mul(c.A,c.B),-1)),mul(inverse(c.A),add(c.B,mul(c.B,c.A))),scale(X,-1)],['Cambiar BA por AB, sin conmutatividad.','Pasar BA al otro miembro sin cambiar el signo.','Cambiar el signo de todo el resultado.'],[
   ['Calculamos el producto que se suma al término con X.',`BA=${matrix(mul(c.B,c.A))}`],
   ['Restamos BA en ambos miembros.',`AX=B−BA=${matrix(N)}`],...invSteps(c.A,'A'),
   ['Multiplicamos por la inversa a la izquierda.',`X=A⁻¹(B−BA)=${matrix(X)}`],
   ['Sustituimos para verificar las cuatro igualdades.',`AX+BA=${matrix(c.B)}=B`],
  ])];}
 if(c.index===1086){const V=inverse(c.A);return[
  make(0,'BᵗA: no definida; CB:2×3; BA+B:2×3; B²: no definida.',[
   'BᵗA:3×3; CB:2×3; BA+B:2×3; B²: no definida.',
   'BᵗA: no definida; CB:3×2; BA+B:2×3; B²: no definida.',
   'BᵗA: no definida; CB:2×3; BA+B:2×3; B²:2×3.',
  ],['Confundir las dimensiones de Bᵗ.','Invertir el tamaño del producto CB.','Elevar al cuadrado una matriz rectangular incompatible.'],[
   ['Identificamos los tamaños de las matrices y la transpuesta.','A:3×3; B:2×3; Bᵗ:3×2; C:2×2'],
   ['En BᵗA no coinciden las dimensiones interiores.','(3×2)(3×3): no definido'],
   ['CB sí se puede multiplicar.','(2×2)(2×3) ⇒ 2×3'],
   ['BA es 2×3, del mismo tamaño que B, así que la suma existe.','BA+B:2×3'],
   ['En BB no coinciden tres y dos.','B²:(2×3)(2×3): no definido'],
  ],{defined:[false,true,true,false],dimensions:[null,[2,3],[2,3],null]}),
  make(1,'A es invertible si k≠0 y k≠2.',['A es invertible si k≠0 y k≠−2.','A es invertible si k≠−1 y k≠1.','A es invertible solo si k=0 o k=2.'],['Cambiar el signo del término lineal.','Confundir los ceros con los de k²−1.','Invertir el criterio de no anulación.'],[
   ['Desarrollamos el determinante por la primera fila.','det(A)=1·((−3)·1−2k)+1·(k²+3)'],
   ['Efectuamos los productos y simplificamos.','det(A)=−3−2k+k²+3=k²−2k'],
   ['Sacamos factor común para localizar los ceros.','det(A)=k(k−2)'],
   ['Un producto es cero cuando lo es alguno de sus factores.','det(A)=0 ⇔ k=0 o k=2'],
   ['La inversa existe exactamente fuera de esos dos valores.','k∈ℝ; k≠0; k≠2'],
  ],{excluded:[0,2],coefficients:[0,-2,1],wrongExcluded:[[0,-2],[-1,1]],wrongOnlyRoots:true}),
  mat(2,'A⁻¹',V,[T(V),scale(V,-1),c.A],['No transponer la matriz de cofactores.','Cambiar el signo del determinante.','Confundir la matriz con su inversa.'],[
   ['Sustituimos k=−1 en las dos posiciones donde aparece.',`A=${matrix(c.A)}`],...inverseSteps(c.A,'A'),
  ])];}
 if(c.index===1127){const V=inverse(c.P),A=mul(mul(c.P,c.J),V),J2=mul(c.J,c.J),J3=mul(J2,c.J),A2=mul(A,A),A3=mul(A2,A);return[
  mat(0,'A',A,[mul(mul(V,c.J),c.P),mul(mul(c.P,c.J),c.P),scale(A,-1)],['Invertir los lados de la semejanza.','Usar P en lugar de P⁻¹ a la derecha.','Cambiar el signo de la matriz.'],[
   ['Multiplicamos la ecuación por P a la izquierda.','P(P⁻¹AP)=PJ ⇒ AP=PJ'],
   ['Multiplicamos ahora por P⁻¹ a la derecha.','A=PJP⁻¹'],...inverseSteps(c.P,'P'),
   ['Calculamos el primer producto de la expresión.',`PJ=${matrix(mul(c.P,c.J))}`],
   ['Completamos el producto.',`A=${matrix(A)}`],
   ['La comprobación independiente recupera J.','P⁻¹AP=J'],
  ]),
  mat(1,'A³=PJ³P⁻¹',A3,[mul(mul(c.P,J2),V),scale(A3,-1),mul(mul(V,J3),c.P)],['Calcular el cuadrado en lugar del cubo.','Cambiar el signo del cubo.','Invertir los lados de la semejanza.'],[
   ['Sustituimos la expresión de A en el producto de tres factores.','A³=(PJP⁻¹)(PJP⁻¹)(PJP⁻¹)'],
   ['Por asociatividad, los factores interiores P⁻¹P se cancelan sin cambiar el orden.','A³=PJ(P⁻¹P)J(P⁻¹P)JP⁻¹=PJ³P⁻¹'],
   ['Calculamos las potencias de J con multiplicaciones ordinarias.',`J²=${matrix(J2)}; J³=${matrix(J3)}`],
   ['Calculamos el miembro derecho.',`PJ³P⁻¹=${matrix(mul(mul(c.P,J3),V))}`],
   ['Comprobamos de forma independiente el cubo de la matriz del apartado anterior.',`A²=${matrix(A2)}; A³=${matrix(A3)}`],
  ])];}
 if(c.index===1128){const X=mul(inverse(c.A),add(c.B,c.C,-1));return[
  make(0,'AD+BC: no definida; DᵗB−A²: no definida.',['AD+BC:2×3; DᵗB−A²: no definida.','AD+BC: no definida; DᵗB−A²:3×2.','AD+BC:2×2; DᵗB−A²:2×2.'],['Sumar matrices con diferente número de columnas.','Restar matrices con diferente número de filas.','Ignorar la matriz rectangular D.'],[
   ['A, B y C son de orden dos; D tiene dos filas y tres columnas.','A,B,C:2×2; D:2×3'],
   ['Los dos productos de la primera suma existen, pero tienen tamaños distintos.','AD:2×3; BC:2×2'],
   ['No puede sumarse una matriz 2×3 con una 2×2.','AD+BC: no definida'],
   ['En la segunda operación, DᵗB tiene tres filas y dos columnas.','DᵗB:3×2; A²:2×2'],
   ['La resta exige tamaños iguales y por eso tampoco existe.','DᵗB−A²: no definida'],
  ],{defined:[false,false],productDimensions:[[2,3],[2,2],[3,2],[2,2]]}),
  mat(1,'X',X,[mul(inverse(c.A),add(c.B,c.C)),mul(add(c.B,c.C,-1),inverse(c.A)),scale(X,-1)],['Sumar C en lugar de restarla.','Multiplicar la inversa a la derecha.','Invertir el orden de la resta.'],[
   ['Restamos las matrices del segundo miembro.',`B−C=${matrix(add(c.B,c.C,-1))}`],...invSteps(c.A,'A'),
   ['Multiplicamos AX=B−C por la inversa a la izquierda.',`X=A⁻¹(B−C)=${matrix(X)}`],
   ['Sustituimos para verificar el resultado.',`AX=${matrix(add(c.B,c.C,-1))}`],
  ])];}
 if(c.index===1150){const A2=mul(c.A,c.A),A3=mul(A2,c.A),BC=mul(c.B,c.C),R=add(c.D,BC,-1),X=mul(inverse(c.A),R);return[
  mat(0,'A³',A3,[A2,c.A.map(r=>r.map(x=>x**3)),scale(A3,-1)],['Dar el cuadrado en lugar del cubo.','Elevar cada entrada al cubo en vez de multiplicar matrices.','Cambiar el signo de la potencia.'],[
   ['La potencia de una matriz significa multiplicarla por sí misma, no elevar sus entradas.','A³=(AA)A'],
   ['Calculamos el cuadrado mediante productos fila-columna.',`A²=${matrix(A2)}`],
   ['La primera fila del cubo se obtiene multiplicando la primera fila del cuadrado por A.','13·2+21·3=89; 13·3+21·5=144'],
   ['Calculamos también la segunda fila.','21·2+34·3=144; 21·3+34·5=233'],
   ['Reunimos las cuatro entradas.',`A³=${matrix(A3)}`],
  ]),
  mat(1,'X',X,[mul(inverse(c.A),add(c.D,BC)),mul(c.A,R),scale(X,-1)],['Sumar BC en lugar de restarlo.','Multiplicar por A en lugar de su inversa.','Invertir la resta del segundo miembro.'],[
   ['El producto de B, de tamaño 2×3, por C, de tamaño 3×1, es una columna.',`BC=${matrix(BC)}`],
   ['Restamos esa columna de D.',`AX=D−BC=${matrix(R)}`],...invSteps(c.A,'A'),
   ['Multiplicamos por la inversa en el lado correcto.',`X=A⁻¹(D−BC)=${matrix(X)}`],
   ['Comprobamos las dos entradas de la ecuación original.',`AX+BC=${matrix(c.D)}`],
  ])];}
 if(c.index===1154){const K=mul(c.A,c.B),V=inverse(K),W=inverse(c.C),X=mul(mul(V,c.R),W);return[
  mat(0,'X',X,[mul(mul(V,c.R),c.C),mul(mul(K,c.R),W),scale(X,-1)],['No invertir C al despejar a la derecha.','No invertir AB al despejar a la izquierda.','Cambiar el signo de la matriz incógnita.'],[
   ['Agrupamos el producto de las dos matrices rectangulares.',`K=AB=${matrix(K)}`],
   ['La matriz X debe ser 2×3 para que KXC tenga el tamaño de R.','K:2×2; X:2×3; C:3×3; R:2×3'],...invSteps(K,'K'),...inverseSteps(c.C,'C'),
   ['Multiplicamos por K⁻¹ a la izquierda y por C⁻¹ a la derecha.','KXC=R ⇒ X=K⁻¹RC⁻¹'],
   ['Calculamos las seis entradas.',`X=${matrix(X)}`],
   ['Sustituimos en el producto completo con A y B originales.',`ABXC=${matrix(c.R)}`],
  ]),
  make(1,'D:3×2; E:2×3.',['D:2×3; E:3×2.','D:3×3; E:2×2.','D:2×2; E:3×3.'],['Transponer ambas dimensiones.','Atender solo a los productos e ignorar la igualdad de tamaños.','Asignar a cada incógnita el orden de la otra matriz.'],[
   ['A tiene tamaño 2×3 y B tiene tamaño 3×2.','A:2×3; B:3×2'],
   ['Para que AD exista, D debe tener tres filas.','D:3×d ⇒ AD:2×d'],
   ['Para que EB exista, E debe tener tres columnas.','E:e×3 ⇒ EB:e×2'],
   ['Los dos productos deben tener exactamente el mismo tamaño.','2×d=e×2 ⇒ e=2; d=2'],
   ['Con las dimensiones finales ambos productos son 2×2.','D:3×2; E:2×3 ⇒ AD,EB:2×2'],
  ],{D:[3,2],E:[2,3],wrong:[[[2,3],[3,2]],[[3,3],[2,2]],[[2,2],[3,3]]]})];}
 if(c.index===1155){const X=scale(add(scale(c.A,4),c.B),1/3),Y=add(c.B,X,-1),wrongPairs=[[scale(add(c.A,c.B),1/3),scale(add(scale(c.B,2),c.A,-1),1/3)],[scale(X,3),scale(Y,3)],[Y,X]],C2024=[[1,0],[2024,1]];return[
  make(0,`X=${matrix(X)}; Y=${matrix(Y)}`,wrongPairs.map(([x,y])=>`X=${matrix(x)}; Y=${matrix(y)}`),['Omitir el factor cuatro de A.','Omitir la división entre tres.','Intercambiar las dos incógnitas.'],[
   ['Sumamos ambas ecuaciones matriciales para eliminar Y.','(2X−Y)+(X+Y)=4A+B ⇒ 3X=4A+B'],
   ['Calculamos el segundo miembro entrada a entrada.',`4A+B=${matrix(add(scale(c.A,4),c.B))}`],
   ['Dividimos por tres para hallar X.',`X=${matrix(X)}`],
   ['Despejamos Y de la segunda ecuación y sustituimos X.',`Y=B−X=${matrix(Y)}`],
   ['Verificamos simultáneamente las dos ecuaciones.','2X−Y=4A; X+Y=B'],
  ],{X,Y,wrongPairs}),
  mat(1,'C²⁰²⁴',C2024,[c.C,[[1,0],[-2024,1]],[[2024,0],[2024,2024]]],['Suponer que la potencia no cambia la entrada inferior.','Cambiar el signo de la entrada que se acumula.','Multiplicar todas las entradas por el exponente.'],[
   ['Escribimos la matriz como identidad más una matriz nilpotente.','C=I₂+N; N=[[0,0],[1,0]]'],
   ['La multiplicación directa muestra que el cuadrado de N es nulo.','N²=O'],
   ['En el binomio matricial todos los términos de grado al menos dos se anulan.','Cⁿ=(I₂+N)ⁿ=I₂+nN'],
   ['Sustituimos n por el exponente solicitado.','C²⁰²⁴=I₂+2024N'],
   ['Las diagonales permanecen iguales a uno; solo se acumula la entrada inferior.',`C²⁰²⁴=${matrix(C2024)}`],
  ]),
  make(2,'AᵗB+DDᵗ:2×2; DBᵗ+A: no definida; DᵗAᵗ+D: no definida.',[
   'AᵗB+DDᵗ:3×3; DBᵗ+A: no definida; DᵗAᵗ+D: no definida.',
   'AᵗB+DDᵗ:2×2; DBᵗ+A:2×3; DᵗAᵗ+D: no definida.',
   'AᵗB+DDᵗ:2×2; DBᵗ+A: no definida; DᵗAᵗ+D:3×2.',
  ],['Confundir DDᵗ con DᵗD.','No comprobar las dimensiones interiores de DBᵗ.','Sumar una matriz 3×2 con otra 2×3.'],[
   ['Identificamos los tamaños de las matrices.', 'A,B:2×2; D:2×3; Dᵗ:3×2'],
   ['El primer producto es cuadrado de orden dos.','AᵗB:2×2'],
   ['DDᵗ también tiene tamaño 2×2 y la suma se puede efectuar.','DDᵗ:(2×3)(3×2) ⇒ 2×2'],
   ['DBᵗ no existe, porque tres y dos no coinciden.','DBᵗ:(2×3)(2×2): no definido'],
   ['DᵗAᵗ sí existe, pero es 3×2, distinto del tamaño de D.','DᵗAᵗ+D:(3×2)+(2×3): no definido'],
  ],{defined:[true,false,false],dimensions:[[2,2],null,null]})];}
 const K=mul(c.A,T(c.A)),L=add(K,c.B),X=mul(inverse(c.B),add(c.C,c.A,-1));return[
  make(0,'1) Verdadera: AAᵗ es simétrica. 2) Falsa: AAᵗ+B no tiene inversa.',[
   '1) Verdadera: AAᵗ es simétrica. 2) Verdadera: AAᵗ+B tiene inversa.',
   '1) Falsa: AAᵗ no es simétrica. 2) Falsa: AAᵗ+B no tiene inversa.',
   '1) Falsa: AAᵗ no es simétrica. 2) Verdadera: AAᵗ+B tiene inversa.',
  ],['Confundir diagonal no nula con determinante no nulo.','Suponer que A debe ser cuadrada para que AAᵗ sea simétrica.','Cometer ambas confusiones.'],[
   ['La transpuesta de un producto invierte el orden de los factores.','(AAᵗ)ᵗ=(Aᵗ)ᵗAᵗ=AAᵗ'],
   ['Esto demuestra la primera afirmación; además calculamos el producto.',`AAᵗ=${matrix(K)}`],
   ['Sumamos B al producto anterior.',`AAᵗ+B=${matrix(L)}`],
   ['Calculamos el determinante de esta nueva matriz.','det(AAᵗ+B)=6·2−(−4)(−3)=12−12=0'],
   ['Una matriz con determinante cero no tiene inversa: la segunda afirmación es falsa.','det(AAᵗ+B)=0 ⇒ no invertible'],
  ],{symmetric:true,invertible:false,K,L,determinant:det(L)}),
  mat(1,'X',X,[mul(inverse(c.B),add(c.C,c.A)),mul(c.B,add(c.C,c.A,-1)),scale(X,-1)],['Sumar A en lugar de restarla.','Usar B en vez de su inversa.','Cambiar el signo del segundo miembro.'],[
   ['Restamos A para aislar el producto que contiene la incógnita.',`BX=C−A=${matrix(add(c.C,c.A,-1))}`],...invSteps(c.B,'B'),
   ['X tiene tamaño 2×3 y la inversa de B multiplica a la izquierda.',`X=B⁻¹(C−A)=${matrix(X)}`],
   ['Sustituimos la matriz obtenida para verificar las seis entradas.',`BX+A=${matrix(c.C)}=C`],
  ])];
}
export function buildLateMatrixBatch(id='batch-0317',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Ecuaciones matriciales','Dimensiones','Potencias'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='COMPLETE_SOURCE_MATRIX_QUESTION_ALL_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildLateMatrixBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0317-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0317.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
