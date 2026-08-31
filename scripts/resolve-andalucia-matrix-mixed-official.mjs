import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {I,T,mul,add,scale,det,inverse,matrix,inverseSteps} from './resolve-andalucia-matrix-order-three.mjs';
export const cases=[
 {index:1335,A:[[1,-1],[2,3]],B:[[0,1],[2,1]],literals:['La suma de tres números naturales','inversa de la suma']},
 {index:1408,A:[[1,0],[1,1]],B:[[5,4],[3,2]],C:[[8,7],[6,5]],Q:[[50,40,35],[0,60,55]],P:[[40,38,42],[34,37,40]],literals:['Tempranillo, Garnacha y Macabeo','significado económico','b1)','b2)']},
 {index:1475,A:[[1,0,1],[0,1,0],[1,0,1]],B:[[1,0,2],[1,1,-1],[2,1,0]],C:[[1],[-3],[1]],literals:['deduzca la expresión','Razone si existe la inversa','Razone si la ecuación matricial']},
 {index:1485,A:[[1,-1,2],[0,2,-3],[2,1,1]],literals:['con m un parámetro real','Para m = 2']},
 {index:1524,A:[[2,1,0],[0,1,2],[2,2,2]],literals:['Resuelva el sistema de ecuaciones matriciales','Halle el rango']},
 {index:1565,A:[[2,1,3],[1,3,2],[3,2,1]],B:[[2960],[2990],[2870]],M:[[1,1],[0,-1]],V:[[4],[1]],literals:['paneles fotovoltaicos','tres modelos de placas','Resuelva la ecuación matricial']},
];
const invSteps=(A,n)=>A.length===3?inverseSteps(A,n):[
 ['Calculamos el determinante antes de invertir.',`det(${n})=${A[0][0]}·(${A[1][1]})−(${A[0][1]})·(${A[1][0]})=${det(A)}≠0`],
 ['Intercambiamos la diagonal y cambiamos el signo de las otras entradas.',`adj(${n})=${matrix([[A[1][1],-A[0][1]],[-A[1][0],A[0][0]]])}`],
 ['Dividimos por el determinante y comprobamos ambos productos.',`${n}⁻¹=${matrix(inverse(A))}; ${n}${n}⁻¹=${n}⁻¹${n}=I₂`],
];
export function solve(c,text){
 const p=officialParts(text);assert.equal(p.length,c.index===1475?3:2);
 const make=(k,a,w,reasons,s,z)=>part(p[k],a,w,reasons,s,'OFFICIAL_MATRIX_AND_SYSTEM_INDEPENDENT_SUBSTITUTION',z);
 const mat=(k,label,value,wrong,reasons,s)=>make(k,`${label}=${matrix(value)}`,wrong.map(x=>`${label}=${matrix(x)}`),reasons,s,{value,wrong});
 const {A,B,C}=c;
 if(c.index===1335){const S=add(A,B),J=inverse(S),sum=add(inverse(A),inverse(B));return[
  make(0,'11, 32 y 70.',['14, 27 y 72.','12, 29 y 72.','12, 28 y 73.'],['Alterar simultáneamente cociente y resto.','Restar el resto en la primera división.','Repartir la suma sin respetar ambas divisiones.'],[
   ['Llamamos x al menor, y al intermedio y z al mayor. Traducimos división con resto, no división exacta.','x+y+z=113; z=6x+4; z=2y+6'],
   ['Igualamos las dos expresiones del mayor y despejamos el intermedio.','6x+4=2y+6 ⇒ y=3x−1'],
   ['Sustituimos y y z en la suma.','x+(3x−1)+(6x+4)=113 ⇒ 10x+3=113'],
   ['Calculamos los tres valores.','x=11; y=32; z=70'],
   ['Comprobamos suma, orden y restos menores que los divisores.','11+32+70=113; 70=6·11+4=2·32+6; 4<11; 6<32'],
  ],{value:[11,32,70],wrong:[[14,27,72],[12,29,72],[12,28,73]]}),
  make(1,`No coinciden: (A+B)⁻¹=${matrix(J)}; A⁻¹+B⁻¹=${matrix(sum)}.`,[
   `Sí coinciden: ambas son ${matrix(J)}.`,`Sí coinciden: ambas son ${matrix(sum)}.`,`No coinciden: (A+B)⁻¹=${matrix(S)}; A⁻¹+B⁻¹=${matrix(sum)}.`
  ],['Distribuir incorrectamente la inversa sobre una suma.','Sustituir la inversa de una suma por la suma de inversas.','Olvidar invertir la suma A+B.'],[
   ['La inversa no es una operación distributiva. Calculamos cada lado por separado.',`S=A+B=${matrix(S)}`],...invSteps(S,'S'),...invSteps(A,'A'),...invSteps(B,'B'),
   ['Sumamos las dos inversas entrada a entrada.',`A⁻¹+B⁻¹=${matrix(sum)}`],
   ['Las entradas distintas prueban que no coinciden; verificamos además la inversa de S.',`(A+B)(A+B)⁻¹=I₂; (A+B)⁻¹≠A⁻¹+B⁻¹`],
  ],{inverseSum:J,sumInverses:sum})];}
 if(c.index===1408){const R=mul(c.Q,T(c.P)),X=mul(inverse(A),add(C,B,-1)),w=[mul(add(C,B,-1),inverse(A)),mul(inverse(A),add(C,B)),scale(X,-1)],ans=(r,total)=>`QPᵗ=${matrix(r)}; total=${total} €.`;return[
  make(0,ans(R,94100),[ans(R,9410),ans(T(R),94100),ans(R,185800)],['Perder un factor diez en miles de kg por céntimos/kg.','Invertir las filas y columnas del producto.','Sumar también ingresos cruzados que no corresponden a las fincas.'],[
   ['Q tiene dos filas de producción; P contiene los precios de cada finca en el mismo orden de uvas.','Q:2×3; Pᵗ:3×2 ⇒ QPᵗ:2×2'],
   ['Cada elemento combina producción de la finca de la fila con precios de la finca de la columna.','rᵢⱼ=Σₖqᵢₖpⱼₖ'],
   ['Calculamos las cuatro sumas de productos.','r₁₁=50·40+40·38+35·42=4990; r₁₂=50·34+40·37+35·40=4580; r₂₁=60·38+55·42=4590; r₂₂=60·37+55·40=4420'],
   ['Una unidad del producto equivale a mil céntimos, es decir, diez euros.','1000 kg·1 céntimo/kg=1000 céntimos=10 €'],
   ['Los ingresos reales están en la diagonal: cada finca vende a sus propios precios.','finca 1:49900 €; finca 2:44200 €'],
   ['Sumamos solo la diagonal y contrastamos con la venta de cada tipo de uva.','total=10·(4990+4420)=94100 €'],
  ],{value:R,total:94100,wrong:[[R,9410],[T(R),94100],[R,185800]]}),
  make(1,`X=M⁻¹(V−N); X=${matrix(X)}.`,w.map((x,i)=>`${i===0?'X=(V−N)M⁻¹':i===1?'X=M⁻¹(V+N)':'X=M⁻¹(N−V)'}; X=${matrix(x)}.`),['Multiplicar la inversa por el lado incorrecto.','Pasar N sumando.','Invertir el signo de la diferencia.'],[
   ['Resolvemos b1) sin conmutar factores: restamos N.','MX=V−N'],
   ['M es invertible; multiplicamos a la izquierda y obtenemos el despeje general.','M⁻¹MX=M⁻¹(V−N) ⇒ X=M⁻¹(V−N)'],
   ['Para b2) calculamos la diferencia oficial.',`V−N=${matrix(add(C,B,-1))}`],...invSteps(A,'M'),
   ['Aplicamos el despeje al caso numérico.',`X=M⁻¹(V−N)=${matrix(X)}`],
   ['Comprobamos la ecuación de partida entrada a entrada.',`MX+N=${matrix(add(mul(A,X),B))}=V`],
  ],{value:X,wrong:w})];}
 if(c.index===1475)return[
  make(0,'A²=[[2,0,2],[0,1,0],[2,0,2]]; A³=[[4,0,4],[0,1,0],[4,0,4]]; A⁴=[[8,0,8],[0,1,0],[8,0,8]]; Aⁿ=[[2^{n−1},0,2^{n−1}],[0,1,0],[2^{n−1},0,2^{n−1}]] para n≥1.',[
   'A²=[[2,0,2],[0,2,0],[2,0,2]]; A³=4A; A⁴=8A; Aⁿ=2^{n−1}A para n≥1.',
   'A²=[[1,0,1],[0,1,0],[1,0,1]]; A³=A; A⁴=A; Aⁿ=A para n≥1.',
   'A²=[[2,0,2],[0,1,0],[2,0,2]]; A³=[[3,0,3],[0,1,0],[3,0,3]]; A⁴=[[4,0,4],[0,1,0],[4,0,4]]; Aⁿ=[[n,0,n],[0,1,0],[n,0,n]] para n≥1.',
  ],['Duplicar indebidamente la entrada central.','Elevar entradas una a una en vez de multiplicar matrices.','Confundir crecimiento exponencial con lineal.'],[
   ['Multiplicamos filas por columnas; la segunda coordenada queda independiente.',`A²=${matrix(mul(A,A))}`],
   ['Repetimos el producto para el cubo y la cuarta potencia.',`A³=${matrix(mul(mul(A,A),A))}; A⁴=${matrix(mul(mul(A,A),mul(A,A)))}`],
   ['Las cuatro esquinas se duplican en cada producto, pero la entrada central permanece en uno.','Aⁿ=[[2^{n−1},0,2^{n−1}],[0,1,0],[2^{n−1},0,2^{n−1}]]'],
   ['La fórmula se comprueba en n=1 y se demuestra al multiplicar por A.','2^{n−1}+2^{n−1}=2ⁿ; 1·1=1'],
   ['La inducción cubre todos los enteros n≥1; si se incluye cero, se trata aparte.','A⁰=I₃'],
  ],{base:A}),
  make(1,'B sí es invertible: det(B)=−1.',['B no es invertible: det(B)=0.','B sí es invertible: det(B)=1.','B sí es invertible: det(B)=3.'],['Confundir suma parcial de filas con dependencia.','Cambiar el signo de un cofactor.','Omitir el término del tercer elemento.'],[
   ['La existencia de inversa equivale a determinante distinto de cero.','B⁻¹ existe ⇔ det(B)≠0'],
   ['Desarrollamos por la primera fila.','det(B)=1·(1·0−(−1)·1)+2·(1·1−1·2)'],
   ['Evaluamos cada menor sin cambiar sus signos.','det(B)=1+2·(−1)=−1'],
   ['El determinante no es cero, así que existe la inversa.','det(B)=−1≠0'],
   ['Como comprobación independiente, la inversa calculada produce la identidad.',`B⁻¹=${matrix(inverse(B))}; BB⁻¹=B⁻¹B=I₃`],
  ],{determinant:det(B)}),
  mat(2,'X',mul(inverse(B),C),[scale(mul(inverse(B),C),-1),mul(T(inverse(B)),C),mul(B,C)],['Cambiar el signo del segundo miembro.','Transponer indebidamente la inversa.','Usar B en vez de B⁻¹.'],[
   ['El apartado anterior garantiza una solución única.','det(B)=−1≠0 ⇒ X=B⁻¹C'],...inverseSteps(B,'B'),
   ['Multiplicamos por el vector dado.',`X=${matrix(mul(inverse(B),C))}`],
   ['Verificamos las tres ecuaciones directamente.',`BX=${matrix(mul(B,mul(inverse(B),C)))}=C`],
  ])];
 if(c.index===1485){const X=add(A,inverse(A));return[
  make(0,'A⁻¹ existe si m≠−1 y m≠5/2.',['A⁻¹ existe si m≠1 y m≠−5/2.','A⁻¹ existe si m≠−1 y m≠5.','A⁻¹ existe para todo m real.'],['Cambiar los signos de las raíces.','Perder el factor dos del segundo factor.','Ignorar los ceros del determinante.'],[
   ['Desarrollamos por la primera fila.','det(A)=1·(2+3)+1·(3m)+m·(−2m)'],
   ['Reunimos términos del polinomio.','det(A)=−2m²+3m+5'],
   ['Factorizamos y hallamos sus ceros.','det(A)=(m+1)(5−2m)=0 ⇒ m=−1 o m=5/2'],
   ['Solo esos dos valores impiden la inversa.','m∈ℝ excepto −1 y 5/2'],
   ['Sustituimos las dos raíces y un valor admisible para comprobar la condición.','det(A)|m=−1=0; det(A)|m=5/2=0; det(A)|m=2=3'],
  ],{excluded:[-1,2.5]}),
  mat(1,'X',X,[add(A,inverse(A),-1),add(inverse(A),mul(A,A)),T(X)],['Pasar I₃ con signo negativo.','Olvidar multiplicar A² por A⁻¹.','Transponer el resultado sin motivo.'],[
   ['Para m=2 el determinante es 3 y podemos invertir A.','XA−A²=I₃ ⇒ XA=I₃+A²'],
   ['Multiplicamos por A⁻¹ a la derecha.','X=(I₃+A²)A⁻¹=A⁻¹+A'],...inverseSteps(A,'A'),
   ['Sumamos A y su inversa entrada a entrada.',`X=${matrix(X)}`],
   ['Comprobamos la ecuación sin redondear.',`XA−A²=${matrix(add(mul(X,A),mul(A,A),-1))}=I₃`],
  ])];}
 if(c.index===1524){const K=add(A,I(3),2),X=mul(inverse(K),A),Y=add(X,I(3),-1),ans=(x,y)=>`X=${matrix(x)}; Y=${matrix(y)}.`,w=[[X,add(X,I(3))],[scale(X,-1),Y],[Y,X]];return[
  make(0,ans(X,Y),w.map(z=>ans(...z)),['Despejar Y con el signo equivocado.','Cambiar solo el signo de X.','Intercambiar las dos incógnitas.'],[
   ['La segunda ecuación permite eliminar Y.','X−Y=I₃ ⇒ Y=X−I₃'],
   ['Sustituimos en la primera y agrupamos por la derecha.','(A+I₃)X+X−I₃=A−I₃ ⇒ (A+2I₃)X=A'],
   ['No invertimos A, que es singular; invertimos K=A+2I₃.',`K=${matrix(K)}; det(K)=36`],...inverseSteps(K,'K'),
   ['Calculamos X y recuperamos Y con la segunda ecuación.',ans(X,Y)],
   ['Comprobamos ambas ecuaciones, no solo la utilizada para despejar.',`(A+I₃)X+Y=A−I₃; X−Y=I₃`],
  ],{X,Y,wrong:w}),
  make(1,'rango(A+I₃)=3, invertible; rango(A−I₃)=2, no invertible.',[
   'rango(A+I₃)=3, invertible; rango(A−I₃)=3, invertible.',
   'rango(A+I₃)=2, no invertible; rango(A−I₃)=2, no invertible.',
   'rango(A+I₃)=3, invertible; rango(A−I₃)=1, no invertible.',
  ],['Suponer que sumar o restar la identidad siempre produce inversa.','Omitir el determinante no nulo de A+I₃.','No comprobar menores de orden dos.'],[
   ['Calculamos cada matriz modificando solo la diagonal.',`A+I₃=${matrix(add(A,I(3)))}; A−I₃=${matrix(add(A,I(3),-1))}`],
   ['El determinante no nulo de la primera fija su rango máximo.','det(A+I₃)=10≠0 ⇒ rango(A+I₃)=3'],
   ['La segunda tiene determinante cero, por lo que su rango es menor que tres.','det(A−I₃)=0'],
   ['Un menor no nulo de orden dos demuestra rango al menos dos.','det([[1,0],[0,2]])=2≠0 ⇒ rango(A−I₃)=2'],
   ['Solo la primera es invertible; el rango debe igualar el orden de la matriz.','A+I₃ invertible; A−I₃ singular'],
  ],{ranks:[3,2]})];}
 if(c.index===1565){const X=mul(inverse(A),B),Y=scale(mul(mul(c.M,c.M),c.V),.5);return[
  mat(0,'(potencia A, potencia B, potencia C) en W',X,[add(X,[[10],[-10],[0]]),[[500],[450],[520]],scale(X,2)],['Redistribuir potencias sin conservar las tres pruebas.','Intercambiar los dos primeros modelos.','Duplicar todas las potencias.'],[
   ['Llamamos x, y, z a la potencia de una placa de cada modelo y usamos las tres pruebas.','2x+y+3z=2960; x+3y+2z=2990; 3x+2y+z=2870'],
   ['Escribimos el sistema en forma matricial.',`${matrix(A)}·[[x],[y],[z]]=${matrix(B)}`],
   ['El determinante no nulo garantiza que se pueden determinar las tres potencias de forma única.','det(A)=−18≠0'],...inverseSteps(A,'A'),
   ['Multiplicamos la inversa por el segundo miembro y expresamos las unidades.',`[[x],[y],[z]]=${matrix(X)} W`],
   ['Verificamos cada ensayo con los valores obtenidos.','2·450+500+3·520=2960; 450+3·500+2·520=2990; 3·450+2·500+520=2870'],
  ]),
  mat(1,'X',Y,[mul(c.V,[[1]]),scale(mul(c.M,c.V),.5),scale(Y,-1)],['Olvidar dividir el segundo miembro entre dos.','Elevar solo una vez la matriz.','Cambiar el signo de todo el resultado.'],[
   ['Calculamos la potencia matricial mediante producto, no elevando cada entrada.','M=[[1,1],[0,−1]]'],
   ['El producto de las dos filas por las dos columnas da la identidad.',`M²=${matrix(mul(c.M,c.M))}=I₂`],
   ['Sustituimos en la ecuación original.','2X=I₂·[[4],[1]]=[[4],[1]]'],
   ['Dividimos cada entrada entre dos.',`X=${matrix(Y)}`],
   ['Comprobamos por sustitución sin alterar el orden de los factores.',`2X=${matrix(scale(Y,2))}=M²·[[4],[1]]`],
  ])];}
 throw Error('Unknown mixed matrix source');
}
export function buildMixedMatrixBatch(id='batch-0320',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Sistemas','Inversas','Ecuaciones matriciales'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='COMPLETE_SOURCE_MATRIX_QUESTION_ALL_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildMixedMatrixBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0320-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0320.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
