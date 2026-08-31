import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[57,'67593e6ffe6b4e602cf2a0d3b68d10dd2038435a99caf87bc3c83a2f80b2785a',2,'B.5','77fed55538731ac512c81fd844981adbee06a18a3bd4144a19eb5987d9bb9e5a',0],
[64,'230940d6cbc11bf5fecc13ec9f908a84e47b6f5f6c7a1c8c573c8cacae38078e',2,'B.3','2c07e01a9b9dee03b45b4c6a0fb672b5060a9bf3ed028d070dced44e7af40057',0],
[88,'e9cdab8c67f3149fd8325f98321a2a7c369958dad473274c0c62f60db905ca7a',2,'B.6','01921cf4ad8e23b00b6047cbb038b7946bc3113e75268c5958b345c9eb0b8655',0],
[89,'274813eec3b9f750ba00990349dadeb4d837e92c96633e2e02da4e99b2951b34',1,'A.3','9a02aa971546b3f8dac71c2ff75fd1b93c67c34696932eebe1b7de2929bae99d',0],
[91,'9a4a3ac92abc26f1ca18a7fc0bcf40c3075f1d1ab90ae5d116c8e4c81bdf4104',2,'B.5','5d8c989d1b5dc51d9f4bd35e37f416bf2d6d77c6993951fdde46b4a886e531be',0],
[100,'2c5278437c9b39d12317034e63fd1a4e30b153d3926def7914bceb3390e42da6',2,'3.2','9b6c060e7d692b411e5035cd76b8688e238ac21d1a3a1a5f8909d2e47e2fc0b0',0],
[149,'67593e6ffe6b4e602cf2a0d3b68d10dd2038435a99caf87bc3c83a2f80b2785a',2,'B.6','77fed55538731ac512c81fd844981adbee06a18a3bd4144a19eb5987d9bb9e5a',0],
];
export const statements={
57:'Dadas las matrices A=[[2,−1,−2],[−2,3,1],[6,1,3]] y B=[[−1,0,−1],[−3,−1,5]], calcula, si es posible, la matriz X que verifica la ecuación 3X−B^T=AX, siendo B^T la matriz traspuesta de B.',
64:'Sea la matriz A=[[3,0,λ],[−5,λ,−5],[λ,0,3]].\na) [1 punto] Determina los valores de λ para los que la matriz A−2I tiene inversa, siendo I la matriz identidad de orden 3.\nb) [1,5 puntos] Para λ=−2, resuelve la ecuación matricial AX=2X+I.',
88:'Considera la matriz A=[[m,√(m),√(m)],[√(m),m,1],[√(m),1,m]], donde m≥0.\na) ¿Para qué valores de m tiene inversa la matriz A? (1 punto)\nb) Para m=4 resuelve, si es posible, la ecuación matricial AX=12I, donde I es la matriz identidad de orden 3. (1,5 puntos)',
89:'Sean A=[[−2,1,−3],[−1,m,m−2],[m,0,2]], B=[[1],[1],[0]] y X=[[x],[y],[z]].\na) [1,25 puntos] Determina el rango de A según los valores del parámetro m.\nb) [0,75 puntos] Discute el sistema AX=B según los valores del parámetro m.\nc) [0,5 puntos] Resuelve el sistema AX=B para m=1.',
91:'Considera la matriz A=[[0,3,4],[1,−4,−5],[−1,3,4]].\na) Comprueba que A²=−A^{−1}. (1,25 puntos)\nb) Dadas las matrices B=[[1,−1],[3,0],[−4,5]] y C=[[2,0],[−3,2],[1,−1]], calcula la matriz X que verifica A⁴X+B=AC. (1,25 puntos)',
100:'Considera la matriz A=[[α,β,1],[2,α,β],[3,4,α]] que cumple det(A)=−2.\na) [1,5 puntos] Calcula det([[−3,−4,−α],[α−2,β−α,1−β],[8,4α,4β]]).\nb) [1 punto] Calcula det(A^{−1}(A^T)²A).',
149:'Una plataforma de streaming se especializa en series de tres géneros: animación, ciencia ficción y comedia. Se sabe que el 30 % de las series de animación más el 50 % de las de ciencia ficción coincide con el 20 % de total de series. El 25 % de las series de animación más el 50 % de las de ciencia ficción más el 60 % de las de comedia representan la mitad del total de series. Hay 100 series menos de animación que de ciencia ficción. Halla el número de series de cada género.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_MATRIX_EQUATIONS_SOURCE_LAYOUT']]:[];
export const cases=[{index:57,literals:['3X','traspuesta'],topic:'Matrices',whole:true},{index:64,literals:['A − 2I','AX = 2X + I'],topic:'Matrices'},{index:88,literals:['donde m ≥ 0','A X = 12 I'],topic:'Matrices'},{index:89,literals:['rango de A','m = 1'],topic:'Sistemas con determinantes'},{index:91,literals:['Comprueba','A4X + B = AC'],topic:'Matrices'},{index:100,literals:['cumple','|A| = −2'],topic:'Determinantes'},{index:149,literals:['30 %','100 series menos'],topic:'Sistemas con determinantes',whole:true}];
export const matrices={57:{A:[[2,-1,-2],[-2,3,1],[6,1,3]],B:[[-1,0,-1],[-3,-1,5]],X:[[2,0],[-11,-5],[4,1]]},91:{A:[[0,3,4],[1,-4,-5],[-1,3,4]],B:[[1,-1],[3,0],[-4,5]],C:[[2,0],[-3,2],[1,-1]],A2:[[-1,0,1],[1,4,4],[-1,-3,-3]],X:[[3,-6],[6,-21],[-3,15]]}};
export const parameterMatrix=(i,t)=>i===64?[[3,0,t],[-5,t,-5],[t,0,3]]:i===88?[[t,Math.sqrt(t),Math.sqrt(t)],[Math.sqrt(t),t,1],[Math.sqrt(t),1,t]]:[[-2,1,-3],[-1,t,t-2],[t,0,2]];
export const proof=c=>c.index===57?{X:matrices[57].X,coefficientDeterminant:1}:c.index===64?{excluded:[-1,1,2],X:[[-1/3,0,-2/3],[5/4,-1/4,5/4],[-2/3,0,-1/3]]}:c.index===88?{excluded:[0,1],X:[[5,-2,-2],[-2,4,0],[-2,0,4]]}:c.index===89?{rank2:[.5,1],incompatible:.5,infinite:1,familyPoint:[0,1,0],familyDirection:[-2,-1,1]}:c.index===91?{A2:matrices[91].A2,A3:[[-1,0,0],[0,-1,0],[0,0,-1]],X:matrices[91].X}:c.index===100?{rowMultiplier:-4,sourceDeterminant:-2,results:[8,4]}:{counts:[300,400,750],total:1450,coefficientMatrix:[[1,3,-2],[-5,0,2],[-1,1,0]],rhs:[0,0,100]};
export function solve(c,source){const ps=c.whole?[{id:'whole',prompt:source}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'MATRIX_PRODUCTS_RANK_AND_ORIGINAL_EQUATIONS_CHECK',proof(c));switch(c.index){
case 57:return[mk(0,'X=[[2,0],[−11,−5],[4,1]].',['X=[[−2,0],[11,5],[−4,−1]].','X=[[2,0],[−11,−5],[4,−1]].','X=[[6,0],[−33,−15],[12,3]].'],['Cambiar el signo al trasladar B traspuesta.','Cambiar el signo de una entrada durante la sustitución.','Introducir un factor tres extra al despejar.'],[
['B tiene dos filas y tres columnas, por lo que X y B traspuesta deben tener tres filas y dos columnas.','B^T=[[−1,−3],[0,−1],[−1,5]]'],
['Agrupamos los términos que contienen X y factorizamos por la izquierda.','3X−AX=B^T ⇒ (3I−A)X=B^T'],
['Calculamos la matriz de coeficientes y su determinante para comprobar que existe solución única.','M=3I−A=[[1,1,2],[2,0,−1],[−6,−1,0]]; det(M)=−1+6−4=1'],
['Resolvemos por columnas. Para la primera, la segunda y tercera ecuaciones dan r=2p y q=1−6p.','p+q+2r=−1 ⇒ −p+1=−1 ⇒ (p;q;r)=(2;−11;4)'],
['Para la segunda columna obtenemos r=2p+1 y q=−5−6p, y sustituimos en la primera ecuación.','p+q+2r=−3 ⇒ −p−3=−3 ⇒ (p;q;r)=(0;−5;1)'],
['Reunimos las columnas y verificamos el producto con la matriz original de coeficientes.','X=[[2,0],[−11,−5],[4,1]]; MX=[[−1,−3],[0,−1],[−1,5]]=B^T'],
])];
case 64:return[mk(0,'A−2I tiene inversa si λ∉{−1;1;2}.',['A−2I tiene inversa si λ∉{−3;3;0}.','A−2I tiene inversa si λ∉{−1;1}.','A−2I tiene inversa si λ∉{−1;1;−2}.'],['Calcular el determinante de A en lugar del de A−2I.','Omitir el factor λ−2 al desarrollar por la segunda columna.','Cambiar el signo al anular λ−2.'],[
['Restamos dos únicamente a las entradas de la diagonal principal.','M=A−2I=[[1,0,λ],[−5,λ−2,−5],[λ,0,1]]'],
['Elegimos la segunda columna porque contiene dos ceros.','det(M)=(λ−2)det([[1,λ],[λ,1]])'],
['Desarrollamos el menor y factorizamos la diferencia de cuadrados.','det(M)=(λ−2)(1−λ²)=(λ−2)(1−λ)(1+λ)'],
['La matriz es invertible si y solo si todos los factores son distintos de cero.','λ≠2; λ≠1; λ≠−1'],
['Comprobamos las excepciones en la matriz: en λ=2 la segunda columna es nula y en λ=±1 las filas primera y tercera son dependientes.','det(M)=0 para λ∈{−1;1;2}'],
['Fuera de esos valores el producto de factores no es cero y el rango es tres.','λ∉{−1;1;2} ⇒ rg(M)=3 ⇒ existe M^{−1}'],
]),mk(1,'X=frac{1}{12}[[-4,0,-8],[15,-3,15],[-8,0,-4]].',['X=frac{−1}{12}[[-4,0,-8],[15,-3,15],[-8,0,-4]].','X=frac{1}{12}[[-4,15,-8],[0,-3,0],[-8,15,-4]].','X=frac{1}{6}[[-4,0,-8],[15,-3,15],[-8,0,-4]].'],['Invertir el signo de toda la inversa.','Confundir la inversa con su traspuesta.','Dividir los cofactores por la mitad del determinante.'],[
['Sustituimos el parámetro y pasamos 2X al primer miembro.','λ=−2; (A−2I)X=I'],
['La matriz de coeficientes es invertible porque su determinante vale doce.','M=[[1,0,−2],[−5,−4,−5],[−2,0,1]]; det(M)=(−4)(1−4)=12'],
['Calculamos la matriz de cofactores con sus signos alternados.','C=[[-4,15,-8],[0,-3,0],[-8,15,-4]]'],
['Trasponemos los cofactores y dividimos por el determinante.','X=M^{−1}=frac{1}{12}C^T=frac{1}{12}[[-4,0,-8],[15,-3,15],[-8,0,-4]]'],
['Verificamos la inversa multiplicando antes de dividir.','MC^T=[[12,0,0],[0,12,0],[0,0,12]]=12I'],
['Así queda comprobada también la ecuación original, no solo la fórmula de la inversa.','MX=I ⇒ AX−2X=I ⇒ AX=2X+I'],
])];
case 88:return[mk(0,'A tiene inversa para m>0 con m≠1.',['A tiene inversa para m≥0 con m≠1.','A tiene inversa solo para m>1.','A tiene inversa para m>0 con m≠2.'],['Olvidar que m=0 también anula el determinante.','Excluir sin motivo los parámetros entre cero y uno.','Anular incorrectamente el factor cuadrático.'],[
['Respetamos primero la condición del enunciado para que las raíces sean reales.','m≥0; (√(m))²=m'],
['Desarrollamos el determinante por la primera fila.','det(A)=m(m²−1)−√(m)(m√(m)−√(m))+√(m)(√(m)−m√(m))'],
['Usamos el cuadrado de la raíz y agrupamos los términos.','det(A)=m(m²−1)−m(m−1)−m(m−1)'],
['Factorizamos hasta localizar todos los ceros.','det(A)=m(m²−2m+1)=m(m−1)²'],
['La invertibilidad equivale a excluir ambos ceros dentro del dominio permitido.','m>0 y m≠1'],
['Comprobamos las excepciones directamente: para cero hay una fila nula y para uno las tres filas coinciden.','m=0: rg(A)=2; m=1: rg(A)=1; m∈(0;1): det(A)>0'],
]),mk(1,'X=[[5,−2,−2],[−2,4,0],[−2,0,4]].',['X=[[5,2,2],[2,4,0],[2,0,4]].','X=frac{1}{12}[[5,−2,−2],[−2,4,0],[−2,0,4]].','X=[[5,−2,−2],[−2,0,4],[−2,4,0]].'],['Perder los signos negativos de los cofactores.','Resolver AX=I en lugar de AX=12I.','Intercambiar dos columnas de la solución.'],[
['Sustituimos m=4, incluyendo las raíces cuadradas.','A=[[4,2,2],[2,4,1],[2,1,4]]'],
['El determinante es distinto de cero y permite multiplicar por la inversa por la izquierda.','det(A)=4(4−1)²=36; X=12A^{−1}'],
['Calculamos los cofactores; la matriz es simétrica.','C=[[15,−6,−6],[−6,12,0],[−6,0,12]]; C^T=C'],
['Dividimos por el determinante y aplicamos el factor doce.','X=frac{12}{36}C^T=frac{1}{3}C'],
['Escribimos todas las entradas de la matriz solución.','X=[[5,−2,−2],[−2,4,0],[−2,0,4]]'],
['Comprobamos por producto directo las tres columnas de la ecuación.','AX=[[12,0,0],[0,12,0],[0,0,12]]=12I'],
])];
case 89:return[mk(0,'rg(A)=3 si m≠frac{1}{2},1; rg(A)=2 si m=frac{1}{2} o m=1.',['rg(A)=3 si m≠frac{1}{2},1; rg(A)=1 si m=frac{1}{2} o m=1.','rg(A)=3 si m≠−frac{1}{2},1; rg(A)=2 si m=−frac{1}{2} o m=1.','rg(A)=3 si m≠1; rg(A)=2 si m=1.'],['Deducir rango uno sin comprobar un menor de orden dos.','Cambiar el signo de una raíz del determinante.','Perder una raíz del factor 2m−1.'],[
['Desarrollamos por la primera fila manteniendo los signos de los cofactores.','det(A)=−4m−(−2−m(m−2))+3m²'],
['Reducimos y factorizamos el polinomio de segundo grado.','det(A)=4m²−6m+2=2(2m−1)(m−1)'],
['Cuando el determinante no se anula hay tres filas independientes.','m∉{frac{1}{2};1} ⇒ rg(A)=3'],
['Para los dos valores excepcionales buscamos un menor que no se anule.','D=det([[-2,−3],[m,2]])=3m−4'],
['Evaluamos el menor en ambos parámetros para demostrar que el rango no baja de dos.','D(frac{1}{2})=−frac{5}{2}≠0; D(1)=−1≠0'],
['Combinamos el determinante nulo de orden tres con el menor no nulo de orden dos.','m=frac{1}{2} o m=1 ⇒ rg(A)=2'],
]),mk(1,'m≠frac{1}{2},1: solución única; m=1: infinitas; m=frac{1}{2}: ninguna.',['m≠frac{1}{2},1: solución única; m=1: ninguna; m=frac{1}{2}: infinitas.','m≠frac{1}{2},1: solución única; m=1 o m=frac{1}{2}: ninguna.','m≠frac{1}{2},1: solución única; m=1 o m=frac{1}{2}: infinitas.'],['Intercambiar las compatibilidades excepcionales.','Suponer que un determinante nulo siempre impide resolver.','Suponer que un determinante nulo siempre proporciona infinitas soluciones.'],[
['Aplicamos Rouché–Frobenius: debemos comparar la matriz de coeficientes con la ampliada.','m≠frac{1}{2},1 ⇒ rg(A)=rg(A|B)=3'],
['Para m=1 escribimos el sistema; la tercera ecuación permite despejar x=−2z.','system{−2x+y−3z=1;−x+y−z=1;x+2z=0}'],
['Las dos primeras ecuaciones dan la misma condición; queda un parámetro libre.','y+z=1 ⇒ rg(A)=rg(A|B)=2<3'],
['Para m=1/2, la tercera y la primera ecuación permiten despejar x e y en función de z.','frac{1}{2}x+2z=0 ⇒ x=−4z; −2x+y−3z=1 ⇒ y=1−5z'],
['Sustituimos en la segunda ecuación y aparece una contradicción independiente de z.','−x+frac{1}{2}y−frac{3}{2}z=4z+frac{1}{2}(1−5z)−frac{3}{2}z=frac{1}{2}≠1'],
['Concluimos la clasificación completa sin confundir los dos casos singulares.','m=1: compatible indeterminado; m=frac{1}{2}: rg(A)=2<rg(A|B)=3, incompatible'],
]),mk(2,'(x;y;z)=(−2t;1−t;t), t∈ℝ.',['(x;y;z)=(2t;1−t;t), t∈ℝ.','(x;y;z)=(−2t;1+t;t), t∈ℝ.','(x;y;z)=(−2t;−1−t;t), t∈ℝ.'],['Cambiar el signo al despejar x.','Cambiar el signo al despejar y.','Cambiar el término independiente de la primera ecuación.'],[
['Sustituimos m=1 en la ecuación matricial.','system{−2x+y−3z=1;−x+y−z=1;x+2z=0}'],
['Despejamos x de la tercera ecuación.','x=−2z'],
['Introducimos ese valor en la segunda y obtenemos y.','2z+y−z=1 ⇒ y=1−z'],
['Elegimos z como parámetro libre para describir todas las soluciones.','z=t ⇒ (x;y;z)=(−2t;1−t;t), t∈ℝ'],
['Verificamos las dos primeras ecuaciones por sustitución.','−2(−2t)+(1−t)−3t=1; −(−2t)+(1−t)−t=1'],
['La tercera también se cumple para cualquier t; el rango dos confirma que no falta ninguna solución.','−2t+2t=0; rg(A)=2<3'],
])];
case 91:return[mk(0,'A²=[[-1,0,1],[1,4,4],[-1,-3,-3]]=−A^{−1}.',['A²=[[1,0,-1],[-1,-4,-4],[1,3,3]]=−A^{−1}.','A²=[[-1,1,-1],[0,4,-3],[1,4,-3]]=−A^{−1}.','A²=[[-1,0,1],[1,4,-4],[-1,-3,-3]]=−A^{−1}.'],['Negar el producto A por A al confundirlo con la inversa.','Trasponer el producto calculado.','Cambiar el signo de una entrada durante el producto.'],[
['Calculamos el producto A por A usando filas del primer factor y columnas del segundo.','A²=[[-1,0,1],[1,4,4],[-1,-3,-3]]'],
['Por ejemplo, verificamos las entradas de la primera fila.','0·0+3·1+4(−1)=−1; 0·3+3(−4)+4·3=0; 0·4+3(−5)+4·4=1'],
['Multiplicamos el resultado por A para buscar una relación con la identidad.','A³=A²A=[[-1,0,0],[0,-1,0],[0,0,-1]]=−I'],
['Cambiando el signo obtenemos un producto igual a la identidad por ambos lados.','(−A²)A=I; A(−A²)=I'],
['Esto demuestra la existencia de la inversa y permite identificarla sin suponerla previamente.','A^{−1}=−A²'],
['Reordenamos la igualdad para obtener exactamente la relación solicitada.','A²=−A^{−1}'],
]),mk(1,'X=[[3,−6],[6,−21],[−3,15]].',['X=[[-7,6],[0,17],[1,-13]].','X=[[-3,6],[-6,21],[3,-15]].','X=[[-1,-6],[12,-25],[-5,17]].'],['Cambiar el signo del término que contiene B.','Perder el signo negativo de A cuarta.','Cambiar el signo del término C al despejar.'],[
['Usamos la relación anterior para simplificar la potencia de orden cuatro.','A³=−I ⇒ A⁴=−A'],
['Sustituimos en la ecuación y aislamos el producto AX.','−AX+B=AC ⇒ AX=B−AC'],
['Multiplicamos por la inversa por la izquierda y respetamos el orden de los factores.','X=A^{−1}B−C=−A²B−C'],
['Realizamos el producto de dimensiones tres por tres y tres por dos.','A²B=[[-5,6],[-3,19],[2,-14]]'],
['Negamos el producto y restamos C entrada a entrada.','X=[[5,-6],[3,-19],[-2,14]]−[[2,0],[-3,2],[1,-1]]=[[3,-6],[6,-21],[-3,15]]'],
['Verificamos en la ecuación original, multiplicando nuevamente por A.','A⁴X+B=AC=[[-5,2],[9,-3],[-7,2]]'],
])];
case 100:return[mk(0,'Determinante=8.',['Determinante=−8.','Determinante=−2.','Determinante=4.'],['Olvidar el signo de la primera fila negada.','Ignorar el factor cuatro y el cambio de signo en las filas.','Aplicar un factor dos en lugar de cuatro a la tercera fila.'],[
['Nombramos las filas de A para reconocer la transformación sin calcular α ni β.','A=(R₁;R₂;R₃); det(A)=−2'],
['Expresamos cada fila de la matriz pedida mediante las originales.','M=(−R₃;R₁−R₂;4R₂)'],
['Sacamos los factores escalares de la primera y tercera fila.','det(M)=−4det(R₃;R₁−R₂;R₂)'],
['Aplicamos la linealidad en la segunda fila; el determinante con filas repetidas vale cero.','det(R₃;R₁−R₂;R₂)=det(R₃;R₁;R₂)−det(R₃;R₂;R₂)=det(R₃;R₁;R₂)'],
['Una permutación cíclica de tres filas equivale a dos intercambios y no altera el signo.','det(R₃;R₁;R₂)=det(A)=−2'],
['Sustituimos el dato y comprobamos el signo final.','det(M)=−4(−2)=8'],
]),mk(1,'Determinante=4.',['Determinante=−8.','Determinante=−2.','Determinante=frac{1}{4}.'],['Olvidar el factor del determinante de la inversa.','No elevar al cuadrado el determinante de la traspuesta.','Invertir el factor al cuadrado en lugar de mantenerlo.'],[
['El dato det(A) distinto de cero garantiza que la expresión con A inversa tiene sentido.','det(A)=−2≠0'],
['Aplicamos la multiplicatividad del determinante respetando todos los factores.','det(A^{−1}(A^T)²A)=det(A^{−1})det((A^T)²)det(A)'],
['Usamos las propiedades de inversa, potencia y trasposición.','det(A^{−1})=frac{1}{det(A)}; det((A^T)²)=(det(A))²'],
['Sustituimos el valor del determinante en cada factor.','D=(−frac{1}{2})·(−2)²·(−2)'],
['Los factores correspondientes a A y su inversa se cancelan y queda el cuadrado.','D=4'],
['Comprobamos también mediante semejanza, pues la matriz es semejante a la potencia de la traspuesta.','det(A^{−1}(A^T)²A)=det((A^T)²)=4'],
])];
case 149:return[mk(0,'Animación: 300; ciencia ficción: 400; comedia: 750.',['Animación: 300; ciencia ficción: 200; comedia: 750.','Animación: 100; ciencia ficción: 200; comedia: 250.','Animación: 300; ciencia ficción: 400; comedia: 150.'],['Invertir la diferencia de cien entre los dos primeros géneros.','Olvidar multiplicar cien por tres al distribuir el paréntesis.','Invertir la proporción entre comedia y animación.'],[
['Definimos las incógnitas y expresamos el total como su suma.','x=animación; y=ciencia ficción; z=comedia; T=x+y+z'],
['Traducimos los dos repartos porcentuales y multiplicamos sus ecuaciones por veinte para evitar decimales, manteniendo el total T definido anteriormente.','system{6x+10y=4T;5x+10y+12z=10T;y−x=100}'],
['Eliminamos decimales. El determinante de los coeficientes es dos, lo que demuestra la unicidad de la solución.','system{x+3y−2z=0;−5x+2z=0;y−x=100}\ndet([[1,3,−2],[−5,0,2],[−1,1,0]])=2'],
['Las dos últimas ecuaciones permiten despejar y y z en función de x.','y=x+100; z=frac{5}{2}x'],
['Sustituimos en la primera ecuación y recuperamos las otras cantidades.','x+3(x+100)−5x=0 ⇒ x=300; y=400; z=750'],
['Comprobamos las tres condiciones originales y que las cantidades son enteras no negativas.','T=1450; 90+200=0,20·1450=290; 75+200+450=0,50·1450=725; 400−300=100'],
])];default:throw Error('Unknown source');}}
export function buildMatrixEquationsBatch(id='batch-0386',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=[];x.block='Álgebra';x.examSlot=1;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.topic==='Sistemas con determinantes'?'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS':'MATRIX_DETERMINANT_IDENTITIES'};if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildMatrixEquationsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0386-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0386.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
