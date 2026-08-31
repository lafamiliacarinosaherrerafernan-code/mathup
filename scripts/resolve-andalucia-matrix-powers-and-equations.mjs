// Complete official questions; matrices and exponents checked on the PDF page.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:129,A:[[2,4],[1,-1]],B:[[-3,0],[0,1]],literals:['Calcule A2 + B3','(A + B)⋅ X = A − B']},
 {index:217,A:[[0,-1],[1,0]],B:[[1,1],[1,1]],C:[[2,1],[3,2]],literals:['Resuelva la ecuación','Calcule A4 y A80']},
 {index:253,A:[[0,1],[1,0]],B:[[1,2],[3,1]],literals:['Calcule A2 y A2013','5Bt − A2']},
 {index:336,A:[[1,2],[0,-1]],B:[[3,-1],[0,2]],literals:['Calcule la matriz A2017','¿Se verifica la expresión']},
];
const mat=M=>JSON.stringify(M);
const pair=(name1,M,name2,N)=>`${name1}=${mat(M)}; ${name2}=${mat(N)}`;
const I=[[1,0],[0,1]],minusI=[[-1,0],[0,-1]];
export function solve(c,text){const p=officialParts(text);assert.equal(p.length,2);const make=(i,a,w,why,steps,proof)=>part(p[i],a,w,why,steps,'EXACT_MATRIX_PRODUCTS_PERIODIC_POWERS_AND_ORIGINAL_SUBSTITUTION',proof);
 if(c.index===129)return[
  make(0,'A²+B³=[[-19,4],[1,6]]',['A²+B³=[[-23,16],[1,2]]','A²+B³=[[17,4],[1,6]]','A²+B³=[[35,4],[1,6]]'],['Elevar cada entrada de A al cuadrado en vez de multiplicar matrices.','Utilizar B² en lugar de B³.','Perder el signo de la potencia impar de −3.'],[
   ['Una potencia de una matriz se calcula mediante productos fila por columna, no elevando cada entrada.','A²=A·A'],
   ['Calculamos la primera fila del cuadrado de A.','(A²)₁₁=2·2+4·1=8; (A²)₁₂=2·4+4·(−1)=4'],
   ['Calculamos la segunda fila del mismo producto.','(A²)₂₁=1·2+(−1)·1=1; (A²)₂₂=1·4+(−1)·(−1)=5'],
   ['B es diagonal. Sus potencias conservan los ceros y elevan las dos entradas diagonales.','B²=[[9,0],[0,1]]; B³=[[-27,0],[0,1]]'],
   ['Sumamos las entradas correspondientes de ambas matrices de orden dos.','A²+B³=[[8−27,4],[1,5+1]]=[[-19,4],[1,6]]'],
   ['Comprobación independiente del cubo: B²B vuelve a dar diagonal −27, 1.','[[9,0],[0,1]]·[[-3,0],[0,1]]=[[-27,0],[0,1]]'],
  ],{result:[[-19,4],[1,6]],wrong:[[[-23,16],[1,2]],[[17,4],[1,6]],[[35,4],[1,6]]]}),
  make(1,'X=[[1,-2],[frac{3}{2},frac{1}{2}]]',['X=[[1,6],[-frac{1}{2},frac{1}{2}]]','X=[[1,frac{3}{2}],[-2,frac{1}{2}]]','X=[[1,0],[0,1]]'],['Multiplicar por la inversa a la derecha en vez de a la izquierda.','Transponer la solución obtenida.','Sustituir la diferencia A−B por A+B.'],[
   ['Agrupamos el coeficiente de X y el segundo miembro, respetando signos.','A+B=[[-1,4],[1,0]]; A−B=[[5,4],[1,-2]]'],
   ['El determinante no se anula; existe una única matriz solución.','det(A+B)=−4≠0'],
   ['Aplicamos la fórmula de la inversa de orden dos.','(A+B)⁻¹=[[0,1],[frac{1}{4},frac{1}{4}]]'],
   ['La inversa actúa por la izquierda porque X está a la derecha del coeficiente.','X=(A+B)⁻¹(A−B)'],
   ['Calculamos las cuatro entradas del producto.','X=[[1,-2],[frac{5+1}{4},frac{4−2}{4}]]=[[1,-2],[frac{3}{2},frac{1}{2}]]'],
   ['Verificación por sustitución en el primer miembro original.','[[-1,4],[1,0]]·[[1,-2],[frac{3}{2},frac{1}{2}]]=[[5,4],[1,-2]]=A−B'],
  ],{X:[[1,-2],[1.5,.5]],wrong:[[[1,6],[-.5,.5]],[[1,1.5],[-2,.5]],I]})];
 if(c.index===217)return[
  make(0,'X=[[2,1],[-1,0]]',['X=[[0,1],[-1,2]]','X=[[3,2],[-2,-1]]','X=[[4,3],[-3,-2]]'],['Multiplicar C por la inversa a la derecha.','Omitir el sumando BX.','Restar los coeficientes A−B en vez de sumarlos.'],[
   ['Ambos sumandos tienen X a la derecha, por lo que factorizamos sin invertir el orden.','AX+BX=(A+B)X=C'],
   ['Sumamos las entradas de A y B.','A+B=[[1,0],[2,1]]'],
   ['El determinante es uno y permite despejar X de forma única.','det(A+B)=1; (A+B)⁻¹=[[1,0],[-2,1]]'],
   ['Multiplicamos la inversa por C a la izquierda.','X=[[1,0],[-2,1]]·[[2,1],[3,2]]'],
   ['La primera fila queda igual; la segunda es la segunda fila de C menos el doble de la primera.','X=[[2,1],[3−4,2−2]]=[[2,1],[-1,0]]'],
   ['Verificamos separadamente los dos productos originales.','AX=[[1,0],[2,1]]; BX=[[1,1],[1,1]]'],
   ['Su suma coincide entrada a entrada con C.','AX+BX=[[2,1],[3,2]]=C'],
  ],{X:[[2,1],[-1,0]],wrong:[[[0,1],[-1,2]],[[3,2],[-2,-1]],[[4,3],[-3,-2]]]}),
  make(1,pair('A⁴',I,'A⁸⁰',I),[pair('A⁴',minusI,'A⁸⁰',minusI),pair('A⁴',c.A,'A⁸⁰',c.A),pair('A⁴',[[0,1],[1,0]],'A⁸⁰',[[0,1],[1,0]])],['Confundir las potencias pares con −I sin considerar múltiplos de cuatro.','Tratar las potencias como si A fuese idempotente.','Elevar entradas individualmente en vez de multiplicar matrices.'],[
   ['Calculamos A² mediante producto de matrices.','A²=[[0,-1],[1,0]]·[[0,-1],[1,0]]=[[-1,0],[0,-1]]=−I₂'],
   ['Agrupamos A⁴ como el cuadrado de A².','A⁴=(−I₂)²=I₂'],
   ['El exponente 80 es múltiplo de cuatro.','80=4·20'],
   ['Por asociatividad podemos agrupar los factores en veinte bloques de cuatro.','A⁸⁰=(A⁴)²⁰=I₂²⁰=I₂'],
   ['Como comprobación, el ciclo de potencias es A, −I, −A, I y vuelve a comenzar.','A³=−A; A⁵=A'],
  ],{powers:{4:I,80:I}})];
 if(c.index===253)return[
  make(0,pair('A²',I,'A²⁰¹³',c.A),[pair('A²',I,'A²⁰¹³',I),pair('A²',c.A,'A²⁰¹³',I),pair('A²',c.A,'A²⁰¹³',c.A)],['Ignorar que 2013 es impar.','Intercambiar los resultados de una potencia par y otra impar.','Elevar cada entrada, conservando erróneamente A también para el cuadrado.'],[
   ['El producto de A por sí misma intercambia dos veces las coordenadas.','A²=[[0,1],[1,0]]·[[0,1],[1,0]]=[[1,0],[0,1]]=I₂'],
   ['Descomponemos el exponente en pares más un factor.','2013=2·1006+1'],
   ['Agrupamos los factores por asociatividad.','A²⁰¹³=(A²)¹⁰⁰⁶A=I₂¹⁰⁰⁶A=A'],
   ['Las potencias pares son I y las impares A; este patrón prueba el resultado para todo exponente entero positivo.','A²ᵏ=I₂; A²ᵏ⁺¹=A'],
   ['Comprobamos los dos primeros pasos del ciclo sin usar potencias entrada a entrada.','A³=A²A=A; A⁴=A²A²=I₂'],
  ],{powers:{2:I,2013:c.A}}),
  make(1,'X=[[10,3],[3,15]]',['X=[[10,4],[4,15]]','X=[[15,3],[3,10]]','X=[[10,-5],[-5,15]]'],['Olvidar trasladar I₂ al segundo miembro.','Utilizar B sin transponer.','Aplicar el factor 5 también a la resta de 2I₂.'],[
   ['Del apartado anterior A²=I₂ y A⁻¹=A. Trasladamos la identidad que suma al primer miembro.','AX=5Bᵗ−A²−I₂=5Bᵗ−2I₂'],
   ['Transponemos B intercambiando filas y columnas.','Bᵗ=[[1,3],[2,1]]'],
   ['Multiplicamos por cinco y restamos dos en cada posición diagonal.','5Bᵗ−2I₂=[[3,15],[10,3]]'],
   ['La inversa A multiplica a la izquierda e intercambia las dos filas.','X=A(5Bᵗ−2I₂)=[[10,3],[3,15]]'],
   ['Sustituimos y añadimos la identidad en el primer miembro.','AX+I₂=[[3,15],[10,3]]+I₂=[[4,15],[10,4]]'],
   ['El segundo miembro original produce la misma matriz.','5Bᵗ−A²=[[5,15],[10,5]]−I₂=[[4,15],[10,4]]'],
   ['Como A es invertible, la comprobación confirma la única solución.','det(A)=−1≠0'],
  ],{X:[[10,3],[3,15]],wrong:[[[10,4],[4,15]],[[15,3],[3,10]],[[10,-5],[-5,15]]]})];
 assert.equal(c.index,336);return[
  make(0,'A²⁰¹⁷=[[1,2],[0,-1]]',['A²⁰¹⁷=[[1,0],[0,1]]','A²⁰¹⁷=[[-1,-2],[0,1]]','A²⁰¹⁷=[[-1,0],[0,-1]]'],['Tratar una potencia impar como par.','Añadir un signo negativo al ciclo de potencias.','Confundir A² con −I y omitir el factor final A.'],[
   ['Calculamos primero A² para detectar un patrón demostrado.','A²=[[1,2],[0,-1]]·[[1,2],[0,-1]]'],
   ['Las entradas diagonales son uno y la superior derecha se anula.','(A²)₁₁=1; (A²)₁₂=2−2=0; (A²)₂₁=0; (A²)₂₂=1'],
   ['Por tanto A²=I₂. El exponente 2017 es impar.','2017=2·1008+1'],
   ['Agrupamos en pares y mantenemos el factor A sobrante.','A²⁰¹⁷=(A²)¹⁰⁰⁸A=A'],
   ['Comprobamos el ciclo de dos pasos, que se repite sin crecimiento de las entradas.','A³=A; A⁴=I₂'],
  ],{powers:{2017:c.A}}),
  make(1,'No: (B+A)(B−A)=[[8,-9],[0,3]]; B²−A²=[[8,-5],[0,3]].',[
   'Sí: (B+A)(B−A)=[[8,-5],[0,3]]; B²−A²=[[8,-5],[0,3]].',
   'No: (B+A)(B−A)=[[8,-1],[0,3]]; B²−A²=[[8,-5],[0,3]].',
   'No: (B+A)(B−A)=[[8,-9],[0,3]]; B²−A²=[[10,-5],[0,5]].'
  ],['Aplicar la diferencia de cuadrados sin comprobar conmutatividad.','Invertir el signo del conmutador AB−BA.','Sumar A² en vez de restarla en el segundo miembro.'],[
   ['La identidad de números reales no se traslada automáticamente a matrices porque el producto no siempre conmuta.','(B+A)(B−A)=B²−BA+AB−A²'],
   ['Calculamos la suma y diferencia que aparecen en el primer miembro.','B+A=[[4,1],[0,1]]; B−A=[[2,-3],[0,3]]'],
   ['Multiplicamos en el orden solicitado.','(B+A)(B−A)=[[8,4·(−3)+1·3],[0,3]]=[[8,-9],[0,3]]'],
   ['Calculamos el segundo miembro independientemente.','B²=[[9,-5],[0,4]]; A²=I₂; B²−A²=[[8,-5],[0,3]]'],
   ['Las entradas superiores derechas difieren, de modo que la igualdad es falsa.','−9≠−5'],
   ['La discrepancia se explica exactamente por el conmutador.','AB=[[3,3],[0,-2]]; BA=[[3,7],[0,-2]]; AB−BA=[[0,-4],[0,0]]'],
   ['Al sumar este término al segundo miembro se recupera el primero: no se ha perdido ningún producto.','[[8,-5],[0,3]]+[[0,-4],[0,0]]=[[8,-9],[0,3]]'],
  ],{left:[[8,-9],[0,3]],right:[[8,-5],[0,3]]})];
}
export function buildMatrixPowersBatch(id='batch-0309',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Potencias de matrices','Ecuaciones matriciales'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='SOURCE_SPECIFIC_MATRIX_OPERATIONS_AND_INDEPENDENT_SUBSTITUTION';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildMatrixPowersBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0309-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0309.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:4,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0)}));}
