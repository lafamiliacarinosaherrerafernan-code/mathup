// Source-page readings are recorded separately; no damaged extraction is guessed.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {I,T,mul,add,scale,det,inverse,matrix,inverseSteps} from './resolve-andalucia-matrix-order-three.mjs';
export const cases=[
 {index:1171,A:[[.5,1],[0,2]],B:[[1,1],[0,3]],C:[[1,3],[2,5]],literals:['A − B + A ⋅ Bt = C','Para a = 0.5 y b = 1']},
 {index:1173,A:[[1,2],[0,1]],B:[[-1,1]],literals:['(B ⋅ A)t = A ⋅ Bt','X ⋅ A = B']},
 {index:1195,A:[[-6,-2,0],[-2,-3,1],[0,1,0]],B:[[1],[-1],[1]],C:[[-4,2,-1]],D:[[1,-5],[3,-5]],literals:['a12 = a21 = −2','Calcule 2D2']},
 {index:1200,A:[[3,-1],[-6,1]],B:[[2,0],[-2,2]],C:[[3],[1]],D:[[-2,2]],literals:['OPCIÓN B','X ·(A + I2) = 3Bt']},
 {index:1207,A:[[1,2],[0,1]],B:[[.5,0],[.75,0]],literals:['Obtenga la matriz A2014','A3 ⋅ X − 4B = O']},
 {index:1226,A:[[.2,0],[-.4,.6]],B:[[.6,-1],[.8,.8]],C:[[1,0,-1],[2,1,3]],literals:['(2 A + B) ⋅ X = 3A − B','dimensión de la matriz D']},
 {index:1254,A:[[-1,2],[-3,4]],B:[[-1,2,1],[3,0,2]],C:[[3,0,1],[2,-1,-1]],literals:['matrices P y Q','A⋅ X − 2B ⋅Ct = A2']},
 {index:1262,A:[[-.5,5],[-.25,.5]],B:[[1,-1],[2,1]],C:[[1,0,-1],[0,-1,1],[-1,1,0]],literals:['OPCIÓN B','A4 · X = B2 + I2']},
 {index:1288,A:[[2,3],[1,-5]],B:[[1,1],[0,-1]],C:[[4],[1]],literals:['Resuelva la ecuación matricial','tres filas y dos columnas']},
 {index:1308,A:[[1,0,1],[-1,-1,1],[2,-1,0]],B:[[1,-1,1],[-1,-1,-1],[1,-1,1]],C:[[3],[-7],[-2]],literals:['siguientes operaciones','Resuelva la ecuación matricial']},
];
const invSteps=(A,n)=>A.length===3?inverseSteps(A,n):[
 ['Una matriz de orden dos es invertible si su determinante no es cero.',`det(${n})=${A[0][0]}·(${A[1][1]})−(${A[0][1]})·(${A[1][0]})=${det(A)}≠0`],
 ['Intercambiamos la diagonal principal y cambiamos de signo los elementos restantes.',`adj(${n})=${matrix([[A[1][1],-A[0][1]],[-A[1][0],A[0][0]]])}`],
 ['Dividimos la adjunta entre el determinante.',`${n}⁻¹=${matrix(inverse(A))}`],
 ['Comprobamos ambos productos antes de usar la inversa.',`${n}${n}⁻¹=${n}⁻¹${n}=I₂`],
];
export function solve(c,text){
 const p=officialParts(c.index===1200?text.slice(text.indexOf('a) (1 punto)')):text);assert.equal(p.length,c.index===1171?3:2);
 const make=(i,a,w,reasons,steps,proof)=>part(p[i],a,w,reasons,steps,'OFFICIAL_MATRIX_SUBPART_INDEPENDENT_PRODUCT_CHECK',proof);
 const mat=(i,label,value,wrong,reasons,steps)=>make(i,`${label}=${matrix(value)}`,wrong.map(v=>`${label}=${matrix(v)}`),reasons,steps,{value,wrong});
 if(c.index===1171){const X=scale(mul(inverse(c.A),c.B),-1);return[
  make(0,'a=0.5; b=1.',['a=1; b=1.','a=0.5; b=−1.','a=1.5; b=1.'],['Olvidar que a aparece dos veces.','Invertir el signo en la entrada inferior izquierda.','Sumar el término independiente al despejar.'],[
   ['Transponemos B: su parámetro pasa a la primera columna.','Bᵗ=[[1,0],[b,3]]'],
   ['Multiplicamos fila por columna antes de hacer la suma y resta.','ABᵗ=[[a+b,3],[2b,6]]'],
   ['Combinamos las entradas de las tres matrices.','A−B+ABᵗ=[[2a+b−1,4−b],[2b,5]]'],
   ['Igualamos con C y usamos las dos entradas que contienen b.','4−b=3; 2b=2 ⇒ b=1'],
   ['La entrada superior izquierda determina a.','2a+1−1=1 ⇒ a=0.5'],
   ['Verificamos todas las entradas, incluida la que no contiene parámetros.','A−B+ABᵗ=[[1,3],[2,5]]=C'],
  ],{value:[.5,1],wrong:[[1,1],[.5,-1],[1.5,1]]}),
  make(1,'No existe b real: (BBᵗ)₂₂=9≠0.',[
   'Existe b=0 y entonces BBᵗ=O.','Existe b=1 y entonces BBᵗ=O.','Existe b=−1 y entonces BBᵗ=O.',
  ],['Anular los términos que contienen b e ignorar la diagonal.','Confundir los parámetros del apartado anterior con una condición nueva.','Creer que el cambio de signo cancela un cuadrado.'],[
   ['Escribimos B con el parámetro sin fijarlo al valor anterior.','B=[[1,b],[0,3]]'],
   ['Transponemos y multiplicamos exactamente.','BBᵗ=[[1+b²,3b],[3b,9]]'],
   ['Para ser la matriz nula todas sus entradas deben anularse.','1+b²=0; 3b=0; 9=0'],
   ['La última igualdad es imposible y no depende del parámetro.','9≠0'],
   ['Además la primera entrada es estrictamente positiva para cualquier b real.','1+b²≥1 ⇒ BBᵗ≠O'],
  ],{impossibleEntry:9,wrongB:[0,1,-1]}),
  mat(2,'X',X,[scale(X,-1),scale(mul(c.B,inverse(c.A)),-1),scale(c.B,-1)],['Olvidar el signo al pasar B.','Usar la inversa a la derecha.','Omitir la multiplicación por la inversa.'],[
   ['Sustituimos los valores indicados en este apartado.',`A=${matrix(c.A)}; B=${matrix(c.B)}`],
   ['Restamos B en ambos miembros.','AX=−B'],...invSteps(c.A,'A'),
   ['Multiplicamos por A⁻¹ a la izquierda.',`X=−A⁻¹B=${matrix(X)}`],
   ['Comprobamos la ecuación original entrada a entrada.','AX+B=O'],
  ])];}
 if(c.index===1173){const X=mul(c.B,inverse(c.A));return[
  make(0,'a=0.',['a=1.','a=−1.','Cualquier a real.'],['Omitir el término independiente al igualar.','Cambiar el signo al igualar componentes.','Aplicar conmutatividad que no tienen las matrices.'],[
   ['Multiplicamos primero B por A.','BA=[[-1,1−a]]'],
   ['La transpuesta convierte la fila en una columna.','(BA)ᵗ=[[-1],[1−a]]'],
   ['Calculamos por separado el otro miembro.','ABᵗ=[[a−1],[1]]'],
   ['Igualamos las dos componentes.','−1=a−1; 1−a=1'],
   ['Ambas igualdades dan el mismo valor y se comprueban sustituyéndolo.','a=0 ⇒ (BA)ᵗ=ABᵗ=[[-1],[1]]'],
  ],{value:0,wrong:[1,-1,'all']}),
  mat(1,'X',X,[mul(c.B,c.A),scale(X,-1),c.B],['Multiplicar por A en vez de su inversa.','Cambiar el signo del segundo miembro.','Omitir la transformación de A.'],[
   ['Sustituimos a=2; X debe tener una fila y dos columnas.',`A=${matrix(c.A)}; B=${matrix(c.B)}`],...invSteps(c.A,'A'),
   ['En XA=B multiplicamos a la derecha, conservando el orden.','X=BA⁻¹'],
   ['Calculamos el producto de la fila por la inversa.',`X=${matrix(X)}`],
   ['Verificamos la fila resultante en la ecuación inicial.',`XA=${matrix(c.B)}=B`],
  ])];}
 if(c.index===1195){const R=scale(mul(c.D,c.D),2);return[
  mat(0,'A',c.A,[[[-4,-2,0],[-2,-3,1],[0,1,0]],[[-6,-2,0],[-2,3,1],[0,1,0]],[[-6,-2,0],[-2,-3,1],[0,1,-2]]],['Omitir el término +2 de la primera fila.','Cambiar el signo del elemento central.','Olvidar el signo de la segunda componente de B.'],[
   ['Solo quedan por determinar las tres entradas diagonales.','A=[[x,-2,0],[-2,y,1],[0,1,z]]'],
   ['Multiplicamos cada fila por B=(1,−1,1)ᵗ.','AB=[[x+2],[-1−y],[z−1]]'],
   ['Igualamos el resultado con la columna Cᵗ.','x+2=−4; −1−y=2; z−1=−1'],
   ['Resolvemos las tres ecuaciones independientes.','x=−6; y=−3; z=0'],
   ['Sustituimos sin cambiar los seis elementos ya dados.',`A=${matrix(c.A)}`],
   ['Verificamos las tres componentes del producto.','AB=[[-4],[2],[-1]]=Cᵗ'],
  ]),
  mat(1,'2D²',R,[mul(c.D,c.D),scale(c.D,2),scale(mul(c.D,c.D),4)],['Olvidar el factor 2.','Confundir D² con D.','Elevar también el factor 2 al cuadrado.'],[
   ['Primero calculamos el cuadrado matricial, no los cuadrados de cada entrada.',`D=${matrix(c.D)}; D²=D·D`],
   ['Calculamos las entradas de la primera fila.','(D²)₁₁=1−15=−14; (D²)₁₂=−5+25=20'],
   ['Calculamos las entradas de la segunda fila.','(D²)₂₁=3−15=−12; (D²)₂₂=−15+25=10'],
   ['Multiplicamos todas las entradas por dos.',`2D²=${matrix(R)}`],
   ['Comprobamos que el resultado dividido por dos es el producto D·D.',`D²=${matrix(mul(c.D,c.D))}`],
  ])];}
 if(c.index===1200){const U=add(mul(c.A,c.C),mul(c.B,T(c.D))),V=add(mul(c.B,c.B),mul(c.C,c.D)),K=add(c.A,I(2)),N=scale(T(c.B),3),X=mul(N,inverse(K));const a=(u,v)=>`A+BC: no definida; AC+BDᵗ=${matrix(u)}; B²+CD=${matrix(v)}; A+DC: no definida.`;return[
  make(0,a(U,V),[a(add(mul(c.A,c.C),mul(c.B,T(c.D)),-1),V),a(U,add(mul(c.B,c.B),mul(c.C,c.D),-1)),a(U,add(scale(c.B,2),mul(c.C,c.D)))],['Restar BDᵗ en lugar de sumarlo.','Restar CD en lugar de sumarlo.','Confundir B² con 2B.'],[
   ['Anotamos los tamaños antes de sumar o multiplicar.','A,B:2×2; C:2×1; D:1×2'],
   ['BC es columna y no se puede sumar a A. DC es 1×1, tampoco sumable a A.','A+BC: no definida; A+DC: no definida'],
   ['Las dos columnas de la segunda operación sí pueden sumarse.',`AC=${matrix(mul(c.A,c.C))}; BDᵗ=${matrix(mul(c.B,T(c.D)))}`],
   ['Sumamos sus entradas.',`AC+BDᵗ=${matrix(U)}`],
   ['En la tercera operación ambos términos son de orden dos.',`B²=${matrix(mul(c.B,c.B))}; CD=${matrix(mul(c.C,c.D))}`],
   ['Sumamos y comprobamos cada entrada con los productos originales.',`B²+CD=${matrix(V)}`],
  ],{U,V}),
  mat(1,'X',X,[mul(inverse(K),N),mul(scale(c.B,3),inverse(K)),mul(N,K)],['Multiplicar la inversa por el lado contrario.','Olvidar transponer B.','Usar A+I en vez de su inversa.'],[
   ['Agrupamos la matriz que multiplica a X por la derecha.',`K=A+I₂=${matrix(K)}`],...invSteps(K,'K'),
   ['Calculamos el segundo miembro con la transposición indicada.',`N=3Bᵗ=${matrix(N)}`],
   ['Multiplicamos por la inversa a la derecha.',`X=NK⁻¹=${matrix(X)}`],
   ['Sustituimos para verificar las cuatro entradas.',`X(A+I₂)=${matrix(N)}=3Bᵗ`],
  ])];}
 if(c.index===1207){const K=mul(mul(c.A,c.A),c.A),X=mul(inverse(K),scale(c.B,4));return[
  make(0,'A^{2014}=[[1,2014a],[0,1]].',['A^{2014}=[[1,a^{2014}],[0,1]].','A^{2014}=[[2014,2014a],[0,2014]].','A^{2014}=[[1,2013a],[0,1]].'],['Elevar las entradas en vez de multiplicar matrices.','Multiplicar toda la matriz por el exponente.','Usar una multiplicación menos.'],[
   ['Calculamos las primeras potencias para identificar y demostrar la pauta.','A²=[[1,2a],[0,1]]; A³=[[1,3a],[0,1]]'],
   ['Enunciamos la fórmula para un entero positivo n.','Aⁿ=[[1,na],[0,1]]'],
   ['El caso n=1 coincide con la matriz dada.','A¹=[[1,a],[0,1]]'],
   ['La multiplicación por A conserva la diagonal y suma otro a arriba a la derecha.','[[1,na],[0,1]]·[[1,a],[0,1]]=[[1,(n+1)a],[0,1]]'],
   ['La inducción demuestra la fórmula para cualquier n positivo. Sustituimos el exponente pedido.','A^{2014}=[[1,2014a],[0,1]]'],
  ],{exponent:2014,coefficient:2014}),
  mat(1,'X',X,[mul(inverse(c.A),scale(c.B,4)),scale(X,-1),mul(scale(c.B,4),inverse(K))],['Invertir A en lugar de A³.','Pasar 4B con signo incorrecto.','Multiplicar la inversa por el lado equivocado.'],[
   ['Aplicamos la fórmula anterior con a=2 y exponente tres.',`K=A³=${matrix(K)}`],
   ['Aislamos el término con X.','KX=4B'],...invSteps(K,'K'),
   ['Calculamos la matriz del segundo miembro.',`4B=${matrix(scale(c.B,4))}`],
   ['Multiplicamos por K⁻¹ a la izquierda.',`X=K⁻¹(4B)=${matrix(X)}`],
   ['Verificamos la ecuación original.','A³X−4B=O'],
  ])];}
 if(c.index===1226){const K=add(scale(c.A,2),c.B),N=add(scale(c.A,3),c.B,-1),X=mul(inverse(K),N);return[
  mat(0,'X',X,[mul(N,inverse(K)),mul(inverse(K),add(scale(c.A,3),c.B)),scale(X,-1)],['Cambiar el lado de la inversa.','Sumar B en el segundo miembro.','Invertir el signo de todo el segundo miembro.'],[
   ['Agrupamos la matriz conocida, operando las fracciones con denominador cinco.',`K=2A+B=${matrix(K)}`],
   ['Calculamos por separado el segundo miembro.',`N=3A−B=${matrix(N)}`],...invSteps(K,'K'),
   ['La ecuación KX=N se despeja multiplicando a la izquierda.',`X=K⁻¹N=${matrix(X)}`],
   ['Sustituimos y comprobamos todas las entradas.','(2A+B)X=3A−B'],
  ]),
  make(1,'CD+A: D de 3×2; CᵗDC: D de 2×2; DCᵗ: D de m×3; CDCᵗ: D de 3×3, con m≥1.',[
   'CD+A: D de 2×3; CᵗDC: D de 2×2; DCᵗ: D de m×3; CDCᵗ: D de 3×3, con m≥1.',
   'CD+A: D de 3×2; CᵗDC: D de 3×3; DCᵗ: D de m×3; CDCᵗ: D de 3×3, con m≥1.',
   'CD+A: D de 3×2; CᵗDC: D de 2×2; DCᵗ: D de 3×m; CDCᵗ: D de 3×3, con m≥1.',
  ],['Intercambiar filas y columnas de D en CD.','No comprobar ambos productos del triple producto.','Imponer filas en vez de columnas a D.'],[
   ['La matriz C tiene dos filas y tres columnas. Cada operación es un caso independiente.','C:2×3; Cᵗ:3×2; A:2×2'],
   ['CD debe ser 2×2 para poder sumarlo con A.','(2×3)(3×2) ⇒ D:3×2'],
   ['En CᵗDC deben encajar las dos multiplicaciones.','(3×2)(2×2)(2×3) ⇒ D:2×2'],
   ['En DCᵗ solo se fijan las tres columnas de D; sus filas quedan libres.','(m×3)(3×2) ⇒ D:m×3, m≥1'],
   ['En CDCᵗ las dimensiones obligan a que D sea de orden tres.','(2×3)(3×3)(3×2) ⇒ D:3×3'],
  ],{dimensions:[[3,2],[2,2],['m',3],[3,3]]})];}
 if(c.index===1254){const N=add(mul(c.A,c.A),scale(mul(c.B,T(c.C)),2)),X=mul(inverse(c.A),N);return[
  make(0,'P:2×3; Q:3×2.',['P:3×2; Q:3×2.','P:2×3; Q:2×3.','P:2×2; Q:3×3.'],['Intercambiar filas y columnas de P.','Intercambiar filas y columnas de Q.','Exigir matrices cuadradas a los factores en lugar de al resultado.'],[
   ['Anotamos las dimensiones conocidas.','A:2×2; B,C:2×3; Bᵗ:3×2'],
   ['AP obliga a P a tener dos filas; PBᵗ obliga a tres columnas.','(2×2)(2×3)(3×2) ⇒ P:2×3'],
   ['El resultado del primer producto es efectivamente cuadrado.','APBᵗ:2×2'],
   ['AC es 2×3; Q debe tener dos columnas para multiplicarlo.','Q:r×2; QAC:r×3'],
   ['Para que QAC sea cuadrada hacen falta tres filas.','r=3 ⇒ Q:3×2; QAC:3×3'],
  ],{P:[2,3],Q:[3,2]}),
  mat(1,'X',X,[mul(inverse(c.A),add(mul(c.A,c.A),scale(mul(c.B,T(c.C)),-2))),mul(N,inverse(c.A)),mul(inverse(c.A),add(mul(c.A,c.A),mul(c.B,T(c.C))))],['Pasar el producto restado sin cambiar su signo.','Multiplicar por la inversa a la derecha.','Olvidar el factor 2.'],[
   ['Transponemos C y calculamos el producto rectangular.',`BCᵗ=${matrix(mul(c.B,T(c.C)))}`],
   ['Calculamos A² por producto de matrices.',`A²=${matrix(mul(c.A,c.A))}`],
   ['Sumamos 2BCᵗ a ambos miembros.',`AX=A²+2BCᵗ=${matrix(N)}`],...invSteps(c.A,'A'),
   ['Multiplicamos a la izquierda por la inversa.',`X=A⁻¹(A²+2BCᵗ)=${matrix(X)}`],
   ['Comprobamos en la ecuación inicial.','AX−2BCᵗ=A²'],
  ])];}
 if(c.index===1262){const K=mul(c.A,c.A),R=add(mul(c.B,c.B),I(2));return[
  mat(0,'X',R,[mul(c.B,c.B),scale(R,-1),add(scale(c.B,2),I(2))],['Olvidar la identidad del segundo miembro.','Usar A² en lugar de A⁴.','Confundir B² con 2B.'],[
   ['Multiplicamos A por sí misma manteniendo las fracciones exactas.',`A²=${matrix(K)}=−I₂`],
   ['Volvemos a elevar al cuadrado para obtener la cuarta potencia.','A⁴=(−I₂)²=I₂'],
   ['Calculamos el cuadrado de B.',`B²=${matrix(mul(c.B,c.B))}`],
   ['La ecuación queda IX=B²+I.',`X=B²+I₂=${matrix(R)}`],
   ['Sustituimos A⁴=I y verificamos todas las entradas.','A⁴X=B²+I₂'],
  ]),
  make(1,'C no es invertible: det(C)=0.',['C es invertible: det(C)=1.','C es invertible: det(C)=−1.','C es invertible: det(C)=2.'],['Omitir productos del determinante.','Cambiar un signo en el desarrollo.','Sumar productos de Sarrus sin restar los inversos.'],[
   ['Observamos una relación entre las columnas que puede comprobarse exactamente.',`C=${matrix(c.C)}`],
   ['Las tres entradas de la suma de columnas se anulan.','col₁+col₂+col₃=[[0],[0],[0]]'],
   ['Existe por tanto una combinación lineal no trivial que da cero.','C·[[1],[1],[1]]=[[0],[0],[0]]'],
   ['Una matriz invertible no puede enviar un vector no nulo al vector cero.','C no es invertible'],
   ['Confirmamos por desarrollo del determinante.','det(C)=1·(−1)−1·(−1)=0'],
  ],{determinant:0,nullVector:[[1],[1],[1]],wrongDeterminants:[1,-1,2]})];}
 if(c.index===1288){const K=mul(c.B,c.B),N=mul(K,c.C),X=mul(inverse(c.A),N);return[
  mat(0,'X',X,[mul(inverse(c.A),mul(c.B,c.C)),scale(X,-1),mul(c.A,N)],['Usar B en vez de B².','Cambiar el signo del segundo miembro.','Multiplicar por A en lugar de su inversa.'],[
   ['Denominamos A y B a las dos matrices dadas para ordenar el cálculo.',`A=${matrix(c.A)}; B=${matrix(c.B)}`],
   ['Calculamos el cuadrado del segundo factor antes de multiplicar la columna.',`B²=${matrix(K)}=I₂`],
   ['Por tanto, el segundo miembro conserva la columna original.',`B²C=${matrix(N)}`],...invSteps(c.A,'A'),
   ['Multiplicamos por la inversa a la izquierda.',`X=A⁻¹C=${matrix(X)}`],
   ['Verificamos por sustitución que AX coincide con B²C.',`AX=${matrix(N)}`],
  ]),
  make(1,'B:3×2; C:3×3; D:2×n, con n≥1.',[
   'B:2×3; C:3×3; D:2×n, con n≥1.','B:3×2; C:2×2; D:2×n, con n≥1.','B:3×2; C:3×3; D:n×2, con n≥1.',
  ],['Transponer las dimensiones al sumar.','Confundir AAᵗ con AᵗA.','Fijar las columnas en vez de las filas de D.'],[
   ['En este apartado A es una matriz de tres filas y dos columnas, distinta de la del apartado anterior.','A:3×2'],
   ['Una suma o resta exige dimensiones iguales.','2A−3B ⇒ B:3×2'],
   ['Calculamos las dimensiones del producto con la transpuesta.','AAᵗ:(3×2)(2×3) ⇒ 3×3'],
   ['Para C², C ha de ser cuadrada y de orden tres para restarla de AAᵗ.','C:3×3'],
   ['AD exige que D tenga dos filas; su número de columnas puede ser cualquier entero positivo.','D:2×n; AD:3×n, n≥1'],
  ],{B:[3,2],C:[3,3],D:[2,'n']})];}
 if(c.index===1308){const U=add(c.A,c.B),V=mul(T(c.C),T(c.B)),K=add(c.A,c.B,-1),X=mul(inverse(K),c.C),answer=(u,v)=>`CA: no definida; A+B=${matrix(u)}; CᵗBᵗ=${matrix(v)}.`;return[
  make(0,answer(U,V),[answer(add(c.A,c.B,-1),V),answer(U,mul([[3,7,-2]],T(c.B))),answer(U,scale(V,-1))],['Restar B en lugar de sumarla.','Perder el signo negativo de la segunda componente de C.','Cambiar el signo del producto final.'],[
   ['Identificamos los tamaños conocidos y de sus transpuestas.','A,B:3×3; C:3×1; Cᵗ:1×3; Bᵗ:3×3'],
   ['En CA las dimensiones interiores no coinciden.','(3×1)(3×3): no definida'],
   ['A y B sí se suman entrada a entrada.',`A+B=${matrix(U)}`],
   ['El producto restante es una fila con tres componentes.','CᵗBᵗ:(1×3)(3×3) ⇒ 1×3'],
   ['Calculamos cada componente con la transposición correcta.',`CᵗBᵗ=${matrix(V)}`],
   ['Comprobamos independientemente usando la transpuesta del producto BC.',`(BC)ᵗ=${matrix(T(mul(c.B,c.C)))}=CᵗBᵗ`],
  ],{U,V}),
  mat(1,'X',X,[mul(inverse(add(c.A,c.B)),c.C),scale(X,-1),mul(K,c.C)],['Sumar las matrices al pasar BX al otro miembro.','Cambiar el signo de C.','Multiplicar por A−B en lugar de su inversa.'],[
   ['Restamos BX y factorizamos X por la derecha.','(A−B)X=C'],
   ['Calculamos el coeficiente matricial.',`K=A−B=${matrix(K)}`],
   ['Si X=(x,y,z)ᵗ, las filas de K dan tres ecuaciones sencillas.','y=3; 2z=−7; x−z=−2'],
   ['Resolvemos las dos primeras directamente.','y=3; z=−frac{7}{2}'],
   ['Sustituimos z en la tercera ecuación.','x=−2−frac{7}{2}=−frac{11}{2}'],
   ['Reunimos las componentes y comprobamos la ecuación original.',`X=${matrix(X)}; AX=BX+C`],
  ])];}
 throw Error('Unknown officially inspected matrix case');
}
export function buildExtendedMatrixBatch(id='batch-0318',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Ecuaciones matriciales','Dimensiones','Potencias'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='COMPLETE_SOURCE_MATRIX_QUESTION_ALL_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildExtendedMatrixBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0318-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0318.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
