// Individually inspected institutional PDFs; source literals remain immutable.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {I,T,mul,add,scale,det,inverse,matrix,inverseSteps} from './resolve-andalucia-matrix-order-three.mjs';
export const cases=[
 {index:480,A:[[1,1,0],[0,1,2],[0,1,1]],B:[[2,-1],[1,-1]],C:[[2,-1],[1,-1],[2,0]],literals:['Dadas las matrices','admitan inversa','halle una matriz']},
 {index:604,A:[[1,-2,3]],B:[[2],[-1],[1]],C:[[2,0,-1],[1,1,-1],[1,3,2]],literals:['programación lineal','igual a 19','ecuación matricial']},
 {index:628,A:[[1,2,0],[0,-1,2],[-2,0,1]],literals:['Dada la matriz','resuelva la ecuación']},
 {index:766,Q:[[500,300,200],[600,100,300]],P:[[.5,.4,.6],[.4,.5,.7]],orders:[[5000,6000],[6000,5000]],literals:['Una conservera fabrica latas de pisto','dos proveedores','¿Cuánto debe cobrar']},
 {index:768,Q:[[40,10,5],[80,15,8],[100,25,10]],P:[[75],[300],[250]],literals:['3 vendedores','75€ por hora','15%','18%','invertible']},
 {index:822,A:[[5,-7,6],[7,0,4],[0,3,-1]],B:[[1,2,-9],[-2,0,11],[0,4,-7]],C:[[1],[2],[-1]],literals:['Se consideran las matrices','Halle las dimensiones','sistema matricial']},
 {index:962,A:[[1,0,-1],[-1,2,3],[1,2,1]],S:[[120,50,150],[10,-1,-2],[2,-2,1]],v:[[6460],[0],[6]],literals:['festival gastronómico gaditano','calcule el rango']},
];
export function solve(c,text){
 const pp=[628,766].includes(c.index)?[{id:'whole',prompt:text}]:officialParts(text);
 const make=(k,a,w,why,s,e)=>part(pp[k],a,w,why,s,'SOURCE_READ_MATRIX_OPERATIONS_AND_INDEPENDENT_RESIDUALS',e);
 const mat=(k,label,X,w,why,s,e={})=>make(k,`${label}=${matrix(X)}`,w.map(x=>`${label}=${matrix(x)}`),why,s,{...e,value:X,wrong:w});
 const {A,B,C}=c;
 if(c.index===480){const X=mul(mul(inverse(A),C),inverse(B)),w=[mul(mul(inverse(A),C),B),mul(mul(A,C),inverse(B)),scale(X,-1)];return[
  make(0,'Ambas admiten inversa si a≠0 y a≠2.',['Ambas admiten inversa si a≠−2 y a≠0.','Ambas admiten inversa si a≠2.','Ambas admiten inversa para todo a.'],['Cambiar el signo del término independiente en el determinante de B.','Comprobar B pero olvidar la raíz cero de A.','Ignorar los ceros de ambos determinantes.'],[
   ['Una matriz cuadrada es invertible si su determinante no se anula. Calculamos los dos por separado.','det(A)≠0 y det(B)≠0'],
   ['Desarrollamos A por la primera columna, que tiene dos ceros.','det(A)=a·det([[a,2],[1,1]])=a(a−2)'],
   ['Aplicamos la fórmula del determinante de orden dos a B.','det(B)=2·(−1)−(−1)·a=a−2'],
   ['Identificamos los valores que anulan cada determinante.','A singular: a=0 o a=2; B singular: a=2'],
   ['Exigimos simultáneamente las dos condiciones.','a∈ℝ excepto 0 y 2'],
   ['Contrastamos las exclusiones y un valor permitido directamente.','a=0: det(A)=0; a=2: ambos cero; a=1: ambos −1'],
  ],{excluded:[0,2]}),
  mat(1,'X',X,w,['Usar B en vez de su inversa a la derecha.','Usar A en vez de su inversa a la izquierda.','Cambiar el signo de todo el segundo miembro.'],[
   ['Para a=1 ambas inversas existen; X debe ser de dimensión 3×2.','A:3×3; B:2×2; C:3×2'],
   ['Multiplicamos a la izquierda por la inversa de A y a la derecha por la de B.','AXB=C ⇒ X=A⁻¹CB⁻¹'],...inverseSteps(A,'A'),
   ['Invertimos B mediante su determinante y adjunta.','det(B)=−1; adj(B)=[[-1,1],[-1,2]]; B⁻¹=[[1,-1],[1,-2]]'],
   ['Primero multiplicamos A inversa por C.',`A⁻¹C=${matrix(mul(inverse(A),C))}`],
   ['Completamos el producto por la derecha.',`X=${matrix(X)}`],
   ['Comprobamos todos los elementos de la ecuación original.',`AXB=${matrix(mul(mul(A,X),B))}=C`],
  ],{A,B,C})];}
 if(c.index===604){const X=scale(add(C,mul(B,A),-1),.5),w=[scale(add(C,mul(B,A)),.5),add(C,mul(B,A),-1),scale(add(mul(B,A),C,-1),.5)];return[
  make(0,'k=5; máximo 19 en C(1,4); mínimo 6 en A(2,−1).',[
   'k=18; máximo 32 en C(1,4); mínimo 19 en A(2,−1).',
   'k=9; máximo 23 en C(1,4); mínimo 10 en A(2,−1).',
   'k=5; máximo 19 en A(2,−1); mínimo 6 en C(1,4).',
  ],['Imponer el valor 19 al mínimo en vez de al máximo.','Imponer 19 en el vértice D sin comparar todos.','Intercambiar los puntos de máximo y mínimo.'],[
   ['Una función lineal sobre una región poligonal acotada alcanza sus extremos en vértices. La constante k desplaza todos los valores igual.','f(x,y)=2x+3y+k'],
   ['Evaluamos la parte sin k en cada vértice.','A:2·2+3·(−1)=1; B:2·(−1)+3·2=4'],
   ['Completamos la comparación de los cuatro vértices.','C:2·1+3·4=14; D:2·5+3·0=10'],
   ['El mayor valor es 14+k y debe ser 19.','14+k=19 ⇒ k=5'],
   ['El mínimo está en A y el máximo en C; damos sus valores completos.','f(A)=6; f(B)=9; f(C)=19; f(D)=15'],
   ['Los cuatro valores son distintos, de modo que no hay un lado de óptimos.','mínimo único: A; máximo único: C'],
  ],{vertices:[[2,-1],[-1,2],[1,4],[5,0]],baseValues:[1,4,14,10],k:5}),
  mat(1,'X',X,w,['Pasar BA sumando en vez de restando.','Olvidar dividir entre dos.','Invertir el orden de la diferencia.'],[
   ['B es columna y A es fila; su producto tiene el mismo tamaño que C.','B:3×1; A:1×3 ⇒ BA:3×3'],
   ['Multiplicamos cada elemento de B por toda la fila A.',`BA=${matrix(mul(B,A))}`],
   ['Restamos ese producto a ambos lados.','BA+2X=C ⇒ 2X=C−BA'],
   ['Realizamos la resta entrada por entrada.',`C−BA=${matrix(add(C,mul(B,A),-1))}`],
   ['Dividimos cada entrada por dos, conservando las fracciones.',`X=${matrix(X)}`],
   ['Sustituimos para verificar las nueve igualdades.',`BA+2X=${matrix(add(mul(B,A),scale(X,2)))}=C`],
  ],{A,B,C})];}
 if(c.index===628){const A2=mul(A,A),X=add(inverse(A),A2,-1),w=[add(A,A2,-1),add(inverse(A),A2),add(I(3),mul(A2,A),-1)];return[
  mat(0,'X',X,w,['Sustituir A inversa por A.','Pasar A cuarta con signo positivo.','Multiplicar solo una vez por A inversa.'],[
   ['Despejamos el producto A²X sin alterar el orden de los factores.','A²X+A⁴=A ⇒ A²X=A−A⁴'],
   ['La matriz A es invertible; por ello también lo es A².','det(A)=−9≠0; det(A²)=81'],
   ['Multiplicamos por A elevada a menos dos a la izquierda.','X=A⁻²(A−A⁴)=A⁻¹−A²'],
   ['Calculamos A² mediante filas por columnas.',`A²=${matrix(A2)}`],...inverseSteps(A,'A'),
   ['Restamos el cuadrado de A a la inversa.',`X=${matrix(X)}`],
   ['Verificamos directamente la ecuación, sin redondear las fracciones.',`A²X+A⁴=${matrix(add(mul(A2,X),mul(A2,A2)))}=A`],
  ],{A,A2})];}
 if(c.index===766){const raw=scale(mul(c.Q,T(c.P)),.001),unit=raw.map((r,i)=>r.map((x,j)=>x+[.11,.09][i]+[.02,.03][j]+.05)),total=unit.reduce((s,r,i)=>s+r.reduce((t,x,j)=>t+x*c.orders[i][j],0),0);return[
  make(0,'Debe cobrar 14860 € por el pedido.',['Debe cobrar 13760 € por el pedido.','Debe cobrar 14310 € por el pedido.','Debe cobrar 12660 € por el pedido.'],['Omitir el beneficio de cinco céntimos en las 22000 latas.','Omitir los costes de transporte de ambos proveedores.','Omitir los costes de producción de las dos recetas.'],[
   ['Las filas de Q son recetas y las de P son proveedores. Convertimos los gramos a kilogramos antes de aplicar precios.','Q=[[500,300,200],[600,100,300]]; P=[[0.5,0.4,0.6],[0.4,0.5,0.7]]'],
   ['Cada coste de ingredientes es el producto de cantidades por precios de un proveedor.','R=frac{1}{1000}QPᵗ'],
   ['Calculamos las cuatro combinaciones receta-proveedor.','R₁₁=(500·0.5+300·0.4+200·0.6)/1000=0.49; R₁₂=0.49; R₂₁=0.52; R₂₂=0.50'],
   ['Añadimos producción por receta, transporte por proveedor y beneficio por cada lata.','cᵢⱼ=Rᵢⱼ+producciónᵢ+transporteⱼ+0.05'],
   ['El precio unitario queda organizado con las mismas filas y columnas.','C=[[0.67,0.68],[0.68,0.67]] euros/lata'],
   ['Restamos de 11000 las compras al primer proveedor para obtener las del segundo.','N=[[5000,6000],[6000,5000]] latas'],
   ['Sumamos precio por cantidad para los dos proveedores de la primera receta.','receta 1: 5000·0.67+6000·0.68=7430 €'],
   ['Repetimos con los pedidos de la segunda receta, manteniendo el orden de los proveedores.','receta 2: 6000·0.68+5000·0.67=7430 €'],
   ['El pedido completo reúne ambas recetas; sumamos sus importes.','total=7430+7430=14860 €'],
   ['Contrastamos separando ingredientes, fabricación, transporte y beneficio.','11010+2200+550+1100=14860 €'],
  ],{Q:c.Q,P:c.P,orders:c.orders,raw,unit,total,wrong:[13760,14310,12660]})];}
 if(c.index===768){const gross=mul(c.Q,c.P).map(r=>r[0]),net=gross.map(x=>x*(x<10000?.85:.82));return[
  make(0,'Zona A: 6162,50 €; zona B: 10250 €; zona C: 14350 €.',[
   'Zona A: 6162,50 €; zona B: 10625 €; zona C: 14875 €.',
   'Zona A: 5945 €; zona B: 10250 €; zona C: 14350 €.',
   'Zona A: 7250 €; zona B: 12500 €; zona C: 17500 €.',
  ],['Retener el 15% a todos sin comprobar el umbral.','Retener el 18% también al vendedor por debajo de 10000 €.','Dar el importe bruto sin aplicar la retención.'],[
   ['Organizamos una fila por vendedor y columnas horas, demostraciones y viajes. En B el doble de 40 horas es 80.','Q=[[40,10,5],[80,15,8],[100,25,10]]'],
   ['El vector de tarifas tiene el mismo orden de actividades.','p=[[75],[300],[250]]; bruto=Qp'],
   ['Calculamos los importes antes de impuestos.','A:40·75+10·300+5·250=7250; B:80·75+15·300+8·250=12500; C:100·75+25·300+10·250=17500'],
   ['Comparamos cada bruto con el umbral; no lo hacemos con el importe neto.','7250<10000 ⇒ 15%; 12500≥10000 y 17500≥10000 ⇒ 18%'],
   ['Restamos la retención multiplicando por el porcentaje que se conserva.','A:7250·0.85=6162.50; B:12500·0.82=10250; C:17500·0.82=14350'],
   ['Comprobamos que cada neto más su retención recupera el bruto.','6162.50+1087.50=7250; 10250+2250=12500; 14350+3150=17500'],
  ],{Q:c.Q,P:c.P,gross,net,wrong:[gross.map(x=>x*.85),gross.map(x=>x*.82),gross]}),
  make(1,'A es invertible si a≠4/5.',['A es invertible si a≠−4/5.','A es invertible si a≠1.','A es invertible para todo a.'],['Cambiar el signo de la raíz del determinante.','Considerar solo el elemento a−1.','Omitir el valor que anula el determinante.'],[
   ['Usamos la condición de determinante no nulo para la matriz oficial.','A=[[-2,2,1],[3,a−1,2],[4,0,3]]'],
   ['Desarrollamos por la primera fila y mantenemos los signos de los cofactores.','det(A)=−2·3(a−1)−2·(9−8)+(0−4(a−1))'],
   ['Reducimos términos semejantes.','det(A)=−6a+6−2−4a+4=8−10a'],
   ['Resolvemos la única raíz que impide la inversa.','8−10a=0 ⇒ a=frac{4}{5}'],
   ['Excluimos ese valor, sin imponer restricciones a otras entradas.','A⁻¹ existe ⇔ a≠frac{4}{5}'],
   ['Verificamos la raíz y un valor permitido.','a=0.8: det(A)=0; a=1: det(A)=−2≠0'],
  ],{excluded:.8})];}
 if(c.index===822){const X=scale(add(scale(A,4),scale(B,3),-1),1/17),Y=scale(add(scale(A,3),scale(B,2)),1/17),ans=(x,y)=>`X=${matrix(x)}; Y=${matrix(y)}.`,w=[[Y,X],[scale(X,17),scale(Y,17)],[scale(add(scale(A,4),scale(B,3)),1/17),Y]];return[
  make(0,'CᵗAC: 1×1; ACCᵗB: 3×3.',['CᵗAC: 3×3; ACCᵗB: 1×1.','CᵗAC: 1×3; ACCᵗB: 3×1.','CᵗAC: 1×1; ACCᵗB no está definido.'],['Intercambiar el producto exterior y el escalar.','Detener el análisis antes del último factor.','Confundir transpuesta con vector columna.'],[
   ['Anotamos las dimensiones de cada factor.','A y B:3×3; C:3×1; Cᵗ:1×3'],
   ['Componemos los dos primeros factores del primer producto.','CᵗA:(1×3)(3×3) ⇒ 1×3'],
   ['Multiplicamos por C y obtenemos una matriz de un solo elemento.','(CᵗA)C:(1×3)(3×1) ⇒ 1×1'],
   ['En el segundo producto calculamos primero AC.','AC:(3×3)(3×1) ⇒ 3×1'],
   ['Completamos por C transpuesta y B.','ACCᵗ:3×3; ACCᵗB:3×3'],
   ['Todos los pares de dimensiones interiores coinciden; los dos productos existen.','CᵗAC escalar; ACCᵗB de orden 3'],
  ],{A,B,C}),
  make(1,`A⁻¹=${matrix(inverse(A))}; B no tiene inversa.`,[
   `A⁻¹=${matrix(T(inverse(A)))}; B no tiene inversa.`,
   `A⁻¹=${matrix(scale(inverse(A),17))}; B no tiene inversa.`,
   `A no tiene inversa; B⁻¹=${matrix(I(3))}.`,
  ],['No transponer la matriz de cofactores.','Omitir la división por el determinante 17.','Intercambiar la singularidad de las matrices y suponer una inversa identidad.'],[
   ['Comprobamos los determinantes antes de invertir.','det(A)=17; det(B)=0'],...inverseSteps(A,'A'),
   ['En B, la tercera fila es la suma de dos veces la primera y la segunda.','2·(1,2,−9)+(−2,0,11)=(0,4,−7)'],
   ['Esa dependencia impide la inversa de B; comprobamos la inversa de A mediante producto.','AA⁻¹=A⁻¹A=I₃; B singular'],
  ],{A,B,inverseA:inverse(A),wrongInverseA:[T(inverse(A)),scale(inverse(A),17)]}),
  make(2,ans(X,Y),w.map(z=>ans(...z)),['Intercambiar las matrices X e Y.','Olvidar dividir entre 17 tras eliminar.','Cambiar el signo del término 3B al eliminar Y.'],[
   ['El sistema se resuelve con combinaciones lineales de matrices, entrada por entrada.','2X+3Y=A; −3X+4Y=B'],
   ['Multiplicamos la primera ecuación por cuatro y la segunda por menos tres.','8X+12Y=4A; 9X−12Y=−3B'],
   ['Sumamos para eliminar Y y obtener X.','17X=4A−3B ⇒ X=frac{1}{17}(4A−3B)'],
   ['Para Y multiplicamos las ecuaciones originales por tres y dos.','6X+9Y=3A; −6X+8Y=2B ⇒ 17Y=3A+2B'],
   ['Realizamos las operaciones de las nueve entradas.',ans(X,Y)],
   ['Verificamos simultáneamente las dos ecuaciones originales.',`2X+3Y=${matrix(add(scale(X,2),scale(Y,3)))}; −3X+4Y=${matrix(add(scale(X,-3),scale(Y,4)))}`],
  ],{A,B,X,Y,wrong:w})];}
 if(c.index===962){const prices=[8,20,30],wrong=[[20,8,30],[8,20,24],[8,30,20]],A2=mul(A,A);return[
  make(0,'Repostería: 8 €; cocina gourmet: 20 €; cata de vinos: 30 €.',wrong.map(v=>`Repostería: ${v[0]} €; cocina gourmet: ${v[1]} €; cata de vinos: ${v[2]} €.`),['Intercambiar los precios de repostería y cocina.','Restar seis euros al precio de vinos sin mantener las demás condiciones.','Intercambiar los precios de cocina y vinos.'],[
   ['Definimos x, y, z como precios de repostería, cocina y vinos, respectivamente.','120x+50y+150z=6460'],
   ['Traducimos las dos relaciones de precios sin confundir número de entradas con euros.','10x=y+2z; 2x+z=2y+6'],
   ['Despejamos y en la primera relación y lo sustituimos en la segunda.','y=10x−2z; 2x+z=20x−4z+6 ⇒ 5z=18x+6'],
   ['Sustituimos y en la recaudación.','120x+50(10x−2z)+150z=6460 ⇒ 620x+50z=6460'],
   ['Utilizamos 50z=180x+60 para obtener x.','800x+60=6460 ⇒ x=8'],
   ['Recuperamos los otros precios en las relaciones originales.','z=(18·8+6)/5=30; y=10·8−2·30=20'],
   ['Comprobamos recaudación y las dos condiciones.','120·8+50·20+150·30=6460; 10·8=20+2·30; 2·8+30=2·20+6'],
  ],{S:c.S,v:c.v,prices,wrong}),
  make(1,'rango(A)=2; rango(A²)=1.',['rango(A)=2; rango(A²)=2.','rango(A)=3; rango(A²)=3.','rango(A)=1; rango(A²)=1.'],['Suponer que elevar al cuadrado siempre conserva el rango.','Ignorar la dependencia lineal de A.','No comprobar un menor no nulo de orden dos de A.'],[
   ['La tercera fila de A es dos veces la primera más la segunda, así que el rango es menor que tres.','2·(1,0,−1)+(−1,2,3)=(1,2,1)'],
   ['El menor de las dos primeras filas y columnas no se anula.','det([[1,0],[-1,2]])=2≠0 ⇒ rango(A)=2'],
   ['Calculamos el cuadrado con el producto matricial, no elemento a elemento.',`A²=${matrix(A2)}`],
   ['Todas las filas del cuadrado son múltiplos de la primera.','F₂=−5F₁; F₃=−3F₁'],
   ['La primera fila es no nula; el rango del cuadrado es exactamente uno.','F₁=(0,−2,−2)≠0 ⇒ rango(A²)=1'],
   ['La comparación confirma que el rango puede bajar al multiplicar.','1=rango(A²)≤rango(A)=2'],
  ],{A,A2,ranks:[2,1]})];}
 throw Error('Unknown remaining official matrix exercise');
}
export function buildRemainingMatrixBatch(id='batch-0361',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){if(x.parts.length===1&&x.parts[0].partId==='whole'){assert.equal(x.sourceSubparts.length,0);x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';}x.primaryTopic='Matrices';x.secondaryTopics=['Determinantes','Inversas','Sistemas','Aplicaciones'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='COMPLETE_OFFICIAL_MATRIX_SUBPARTS_AND_RESIDUAL_CHECKS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildRemainingMatrixBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0361-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0361.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
