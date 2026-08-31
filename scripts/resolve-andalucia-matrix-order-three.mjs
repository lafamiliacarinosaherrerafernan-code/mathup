// Whole official questions. Source matrices read directly on the official PDF.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:96,A:[[2,0,0],[1,1,1],[0,3,5]],parameter:'m',literals:['con m un parámetro real','X · A = A · At']},
 {index:144,A:[[1,-2,0],[-2,2,-1],[0,1,1]],literals:['Razone si la matriz A es simétrica','2X ·A − A2 − 3I3 = O']},
 {index:309,A:[[2,-3,-5],[-1,4,5],[1,-3,-4]],A3:[[2,-3,-4],[-1,3,4],[1,-3,-3]],literals:['𝐴2022','para 𝑎 = 3']},
 {index:365,A:[[2,1,0],[4,2,0],[2,2,5]],B:[[5],[20],[-3]],literals:['(10 I3 − A) · X = B','B = 5 20 −3 t']},
];
export const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
export const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));
export const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
export const add=(A,B,k=1)=>A.map((r,i)=>r.map((x,j)=>x+k*B[i][j]));
export const scale=(A,k)=>A.map(r=>r.map(x=>x*k));
export const det=A=>A.length===1?A[0][0]:A[0].reduce((v,x,j)=>v+(-1)**j*x*det(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
export const cof=A=>A.map((r,i)=>r.map((_,j)=>(-1)**(i+j)*det(A.filter((_,k)=>k!==i).map(r=>r.filter((_,k)=>k!==j)))));
export const inverse=A=>scale(T(cof(A)),1/det(A));
export function scalar(x){if(Math.abs(x-Math.round(x))<1e-10)return String(Math.round(x));for(let d=2;d<=10000;d++){const n=Math.round(x*d);if(Math.abs(n/d-x)<1e-10)return`${n<0?'-':''}frac{${Math.abs(n)}}{${d}}`;}throw Error('Exact rational display required');}
export const matrix=A=>'['+A.map(r=>'['+r.map(scalar).join(',')+']').join(',')+']';
export function inverseSteps(A,name='A'){
 const C=cof(A),d=det(A),M=A.slice(1).map(r=>r.slice(1));
 return [
  ['Una matriz cuadrada tiene inversa si su determinante no es cero.',`det(${name})=${scalar(d)}≠0`],
  ['Calculamos los menores suprimiendo una fila y una columna, y alternamos los signos de los cofactores.',`C₁₁=det(${matrix(M)})=${scalar(C[0][0])}`],
  ['Repetimos la operación para las nueve posiciones: esta es la matriz de cofactores.',`C=${matrix(C)}`],
  ['Transponemos los cofactores para obtener la adjunta; omitir esta transposición daría otra matriz.',`adj(${name})=Cᵗ=${matrix(T(C))}`],
  ['Dividimos toda la adjunta por el determinante.',`${name}⁻¹=frac{1}{${scalar(d)}}adj(${name})=${matrix(inverse(A))}`],
  ['Comprobamos por productos fila-columna que la matriz obtenida es la inversa bilateral.',`${name}·${name}⁻¹=${name}⁻¹·${name}=I₃`],
 ];
}
export function solve(c,text){
 const p=officialParts(text);assert.equal(p.length,c.index===96?2:3);
 const make=(i,a,w,reasons,steps,proof)=>part(p[i],a,w,reasons,steps,'SOURCE_BOUND_MATRIX_ALGEBRA_AND_INDEPENDENT_GAUSS_JORDAN_RESIDUAL',proof);
 if(c.index===96){const A=c.A,inv=inverse(A),R=mul(A,T(A)),X=mul(R,inv),wrong=[T(A),T(X),mul(A,inv)];return[
  make(0,'A tiene inversa si m≠−1 y m≠4.',[
   'A tiene inversa si m≠1 y m≠−4.','A tiene inversa si m≠0 y m≠3.','A tiene inversa solo si m=−1 o m=4.'
  ],['Cambiar el signo del término lineal del determinante.','Omitir el término independiente 4.','Invertir la condición de no anulación.'],[
   ['Para decidir la inversibilidad desarrollamos el determinante por la primera fila.','det(A)=2(5−3)+m(3−m)'],
   ['Efectuamos los productos de los dos menores no nulos.','det(A)=4+3m−m²'],
   ['Buscamos los ceros, sin confundirlos con los valores invertibles.','4+3m−m²=−(m−4)(m+1)'],
   ['El producto se anula en dos valores y solo en ellos.','det(A)=0 ⇔ m=4 o m=−1'],
   ['Fuera de esos valores el determinante es distinto de cero.','m∈ℝ; m≠−1; m≠4'],
  ],{determinantCoefficients:[4,3,-1],excluded:[-1,4],wrongExcluded:[[1,-4],[0,3]],wrongOnlyRoots:true}),
  make(1,`X=${matrix(X)}`,wrong.map(x=>`X=${matrix(x)}`),['Cancelar A como si conmutase con Aᵗ.','Transponer indebidamente el resultado.','Sustituir AAᵗ por A al formar el segundo miembro.'],[
   ['Sustituimos m por cero en la matriz oficial antes de efectuar ningún producto.',`A=${matrix(A)}`],
   ...inverseSteps(A),
   ['Calculamos el segundo miembro de la ecuación sin cambiar el orden.',`AAᵗ=${matrix(R)}`],
   ['A multiplica a X por la derecha; multiplicamos ambos miembros por A⁻¹ a la derecha.','XA=AAᵗ ⇒ X=AAᵗA⁻¹'],
   ['Multiplicamos fila por columna manteniendo fracciones exactas.',`X=${matrix(X)}`],
   ['La sustitución independiente recupera exactamente el segundo miembro.',`XA=${matrix(R)}=AAᵗ`],
  ],{X,wrong,rhs:R})];}
 if(c.index===144){const A=c.A,inv=inverse(A),X=scale(add(A,inv,3),.5),wrong=[add(A,inv,3),scale(add(A,inv,-3),.5),scale(add(A,I(3),3),.5)];return[
  make(0,'No es simétrica: a₂₃=−1 y a₃₂=1.',[
   'Sí es simétrica: basta con que a₁₂=a₂₁.','Sí es simétrica: toda matriz cuadrada lo es.','No es simétrica: a₂₃=1 y a₃₂=−1.'
  ],['Comprobar solo un par de entradas simétricas.','Confundir ser cuadrada con ser simétrica.','Intercambiar el orden de los índices al leer la fuente.'],[
   ['Ser simétrica significa coincidir con la transpuesta en todas las posiciones.','A=Aᵗ ⇔ aᵢⱼ=aⱼᵢ para todo i,j'],
   ['El primer par coincide, pero esto no basta.','a₁₂=a₂₁=−2'],
   ['El par que contiene las filas segunda y tercera no coincide.','a₂₃=−1; a₃₂=1'],
   ['Mostramos la transpuesta para comprobar dónde se intercambian los signos.',`Aᵗ=${matrix(T(A))}`],
   ['Un único par distinto ya refuta la igualdad.','−1≠1 ⇒ A≠Aᵗ'],
  ],{symmetric:false,a23:-1,a32:1}),
  make(1,`A⁻¹=${matrix(inv)}`,[scale(inv,-1),T(inv),A].map(x=>`A⁻¹=${matrix(x)}`),['Perder el signo negativo del determinante.','No transponer los cofactores al obtener la adjunta.','Suponer sin comprobar que A es su propia inversa.'],inverseSteps(A),{inverse:inv,wrong:[scale(inv,-1),T(inv),A]}),
  make(2,`X=${matrix(X)}`,wrong.map(x=>`X=${matrix(x)}`),['Omitir la división entre dos.','Trasladar 3I con signo negativo.','Sustituir A⁻¹ por I al simplificar.'],[
   ['Pasamos los términos conocidos al segundo miembro.','2XA=A²+3I₃'],
   ['La matriz ya se ha demostrado invertible; multiplicamos a la derecha.','2X=(A²+3I₃)A⁻¹'],
   ['La identidad algebraica conserva el orden y simplifica los productos.','2X=A+3A⁻¹'],
   ['Sustituimos la inversa y sumamos entrada a entrada.',`A+3A⁻¹=${matrix(scale(X,2))}`],
   ['Dividimos cada entrada entre dos.',`X=${matrix(X)}`],
   ['Comprobamos la ecuación original, incluidos los dos signos negativos.','2XA−A²−3I₃=[[0,0,0],[0,0,0],[0,0,0]]'],
  ],{X,wrong})];}
 if(c.index===309){const A=c.A,Z=scale(A,0),id=I(3),A3=c.A3,inv=inverse(A3);return[
  make(0,'A tiene inversa si a≠0 y a≠4.',[
   'A tiene inversa si a≠0 y a≠−4.','A tiene inversa para todo a≠0.','A tiene inversa solo si a=0 o a=4.'
  ],['Cambiar el signo del término lineal del determinante.','Perder el segundo factor del determinante.','Confundir las raíces con los valores invertibles.'],[
   ['Desarrollamos por la primera fila de la matriz oficial, con sus signos.','det(A)=2(−a²+3a+3)+3(a−a−1)+(−a−1)(3−a)'],
   ['Expandimos por separado el último producto.','(−a−1)(3−a)=a²−2a−3'],
   ['Agrupamos coeficientes de igual grado.','det(A)=−2a²+6a+6−3+a²−2a−3'],
   ['Factorizamos el polinomio obtenido.','det(A)=−a²+4a=a(4−a)'],
   ['Solo el determinante no nulo permite invertir la matriz.','a(4−a)≠0 ⇔ a≠0 y a≠4'],
  ],{determinantCoefficients:[0,4,-1],excluded:[0,4]}),
  make(1,`A²=A³=A²⁰²²=${matrix(A)}`,[`A²=A³=A²⁰²²=${matrix(Z)}`,`A²=A³=A²⁰²²=${matrix(id)}`,`A²=A³=A²⁰²²=${matrix(A.map(r=>r.map(x=>x*x)))}`],['Confundir determinante nulo con matriz nilpotente.','Confundir idempotencia con ser la identidad.','Elevar entradas en vez de multiplicar matrices.'],[
   ['Sustituimos a=4; aunque A es singular, sus potencias están definidas.',`A=${matrix(A)}`],
   ['Calculamos las tres entradas de la primera fila del cuadrado.','(A²)₁₁=4+3−5=2; (A²)₁₂=−6−12+15=−3; (A²)₁₃=−10−15+20=−5'],
   ['Las otras filas también se obtienen por productos fila-columna.',`A²=${matrix(mul(A,A))}`],
   ['El cuadrado coincide con A: es una matriz idempotente.','A²=A'],
   ['Multiplicamos una vez más y luego usamos inducción.','A³=A²A=A²=A; Aⁿ=A ⇒ Aⁿ⁺¹=AA=A'],
   ['Por tanto todas las potencias de exponente entero positivo coinciden, incluida la pedida.',`A²=A³=A²⁰²²=${matrix(A)}`],
  ],{A2:A,A3:A,A2022:A,wrong:[Z,id,A.map(r=>r.map(x=>x*x))]}),
  make(2,`X=${matrix(inv)}`,[T(inv),scale(inv,3),scale(inv,-1)].map(x=>`X=${matrix(x)}`),['No transponer los cofactores.','Olvidar dividir la adjunta por el determinante 3.','Introducir un signo negativo inexistente.'],[
   ['Sustituimos a=3 en el ejercicio original.',`A=${matrix(A3)}`],
   ['XA=I₃ significa que X es la inversa de A; det(A)=3 permite resolver.','X=A⁻¹'],
   ...inverseSteps(A3),
   ['El producto de comprobación es precisamente el primer miembro pedido.','XA=I₃'],
  ],{X:inv,wrong:[T(inv),scale(inv,3),scale(inv,-1)]})];}
 assert.equal(c.index,365);const C=add(scale(I(3),10),c.A,-1),X=mul(inverse(C),c.B),wrong=[mul(inverse(add(scale(I(3),10),c.A)),c.B),scale(X,.1),mul(inverse(C),scale(c.B,-1))];return[
  make(0,'X ha de ser de orden 3×1.',['X ha de ser de orden 1×3.','X ha de ser de orden 3×3.','X ha de ser de orden 1×1.'],['Intercambiar filas y columnas.','Copiar el orden del coeficiente en lugar del segundo miembro.','Confundir matriz columna con escalar.'],[
   ['El coeficiente tiene orden tres como A e I₃.','10I₃−A:3×3'],
   ['Para multiplicarlo por X, X debe tener tres filas.','(3×3)·(3×n) tiene orden 3×n'],
   ['El producto ha de tener exactamente las dimensiones de B.','B:3×1'],
   ['Igualando el número de columnas obtenemos n=1.','3×n=3×1 ⇒ n=1'],
   ['Así se obtiene una incógnita columna de tres entradas.','X=[[x],[y],[z]]'],
  ],{shape:[3,1],wrongShapes:[[1,3],[3,3],[1,1]]}),
  make(1,'Sí, para toda B de orden 3×1: det(10I₃−A)=300≠0.',[
   'No, porque det(A)=0 y entonces no puede resolverse.','Sí, para toda B de orden 3×1: det(10I₃−A)=0.','Solo si B es nula: det(10I₃−A)=300≠0.'
  ],['Analizar A en vez de la matriz que multiplica a X.','Confundir la condición de inversibilidad.','Añadir una restricción inexistente al segundo miembro.'],[
   ['Restamos A de diez veces la identidad, sin multiplicar todas sus entradas por diez.',`C=10I₃−A=${matrix(C)}`],
   ['Desarrollamos por la tercera columna, que contiene dos ceros.','det(C)=5·det([[8,-1],[-4,8]])'],
   ['El menor de orden dos exige restar ambos productos.','det(C)=5(64−4)=300'],
   ['La matriz del sistema es invertible, independientemente del segundo miembro.','det(C)≠0 ⇒ existe C⁻¹'],
   ['Para cada vector B hay una única solución.','X=C⁻¹B'],
  ],{coefficient:C,determinant:300,allB:true}),
  make(2,`X=${matrix(X)}`,wrong.map(x=>`X=${matrix(x)}`),['Cambiar 10I−A por 10I+A.','Dividir por diez otra vez al final.','Cambiar el signo del segundo miembro.'],[
   ['Escribimos las tres ecuaciones de la matriz coeficiente.','8x−y=5; −4x+8y=20; −2x−2y+5z=−3'],
   ['Despejamos y en la primera e introducimos su expresión en la segunda.','y=8x−5; −4x+8(8x−5)=20'],
   ['Resolvemos x y recuperamos y.','60x=60 ⇒ x=1; y=8−5=3'],
   ['Sustituimos estos valores en la tercera ecuación.','−2−6+5z=−3 ⇒ 5z=5 ⇒ z=1'],
   ['Presentamos el vector solución en forma de columna.',`X=${matrix(X)}`],
   ['Comprobamos las tres filas del producto en la ecuación original.','(10I₃−A)X=[[8−3],[-4+24],[-2−6+5]]=[[5],[20],[-3]]=B'],
  ],{X,wrong})];
}
export function buildOrderThreeBatch(id='batch-0312',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Determinantes e inversas','Ecuaciones matriciales','Potencias de matrices'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='COMPLETE_ORDER_THREE_MATRIX_AND_ORIGINAL_EQUATION_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildOrderThreeBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0312-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0312.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:4,parts:11}));}
