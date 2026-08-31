import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {I,T,mul,add,scale,det,inverse,matrix,inverseSteps} from './resolve-andalucia-matrix-order-three.mjs';
export const cases=[
 {index:1355,A:[[1,2],[1,3]],B:[[2,1],[0,-1]],literals:['matrices invertibles','halle X e Y']},
 {index:1395,A:[[1,-1,2],[0,1,-1],[1,0,2]],B:[[1,2,1],[1,-2,0]],C:[[2,1]],D:[[1,-1,2]],literals:['sin calcular','sus elementos']},
 {index:1396,A:[[1,2],[-1,2]],B:[[1,2,2],[-1,-1,2]],C:[[8,-4],[12,8],[-8,4]],literals:['Resuelva la ecuación matricial','Calcule A2']},
 {index:1411,A:[[1,0,1],[0,1,1]],B:[[0,1],[1,0],[1,1]],literals:['Halle la matriz X','Justifique cuáles']},
 {index:1423,A:[[25,20,15],[23,25,17]],B:[[2,1,3],[5,1,1]],literals:['respectivos precios','Cati desea comprar 2 unidades','Manuel desea comprar 5 unidades']},
 {index:1454,A:[[1,1,2],[-2,0,1],[0,-1,-1]],B:[[-2,1],[3,1],[0,2]],C:[[1,2],[-1,-1],[-2,3]],literals:['Determine la matriz','dimensiones de dos matrices']},
 {index:1529,A:[[1,1,3],[1,2,-1],[1,-1,-1]],B:[[2],[3],[0]],literals:['Se consideran las matrices','ecuación matricial A·X = B']},
 {index:1596,A:[[3,4],[6,8]],B:[[2,2],[3,3]],C:[[1,2]],literals:['matriz A no tenga inversa','exprese A8 en función de la matriz A']},
];
const invSteps=(A,n)=>A.length===3?inverseSteps(A,n):[
 ['El determinante decide si podemos usar la inversa.',`det(${n})=${A[0][0]}·(${A[1][1]})−(${A[0][1]})·(${A[1][0]})=${det(A)}≠0`],
 ['Intercambiamos la diagonal y cambiamos los signos de las otras dos entradas.',`adj(${n})=${matrix([[A[1][1],-A[0][1]],[-A[1][0],A[0][0]]])}`],
 ['Dividimos por el determinante y comprobamos los dos productos.',`${n}⁻¹=${matrix(inverse(A))}; ${n}${n}⁻¹=${n}⁻¹${n}=I₂`],
];
export function solve(c,text){
 const p=officialParts(text);assert.equal(p.length,[1395,1596].includes(c.index)?3:2);
 const make=(k,a,w,why,s,z)=>part(p[k],a,w,why,s,'OFFICIAL_MATRIX_ALGEBRA_INDEPENDENT_SUBSTITUTION',z);
 const mat=(k,label,v,w,why,s)=>make(k,`${label}=${matrix(v)}`,w.map(x=>`${label}=${matrix(x)}`),why,s,{value:v,wrong:w});
 const {A,B,C,D}=c;
 if(c.index===1355){const X=mul(inverse(A),B),Y=mul(inverse(B),A),ans=(x,y)=>`X=${matrix(x)}; Y=${matrix(y)}.`;return[
  make(0,'Y⁻¹=X.',['Y⁻¹=Xᵗ.','Y⁻¹=−X.','Y⁻¹=X⁻¹.'],['Introducir una transpuesta no indicada.','Cambiar el signo al invertir.','Confundir X con su inversa.'],[
   ['Usamos AX=B y BY=A, sin suponer conmutatividad.','AXY=BY=A'],
   ['Multiplicamos por A⁻¹ a la izquierda para cancelar A.','XY=I'],
   ['Como Y es invertible, multiplicamos a la derecha por Y⁻¹.','XYY⁻¹=Y⁻¹'],
   ['Simplificamos la identidad del lado izquierdo.','X=Y⁻¹'],
   ['También se comprueba despejando las dos matrices y conservando el orden.','X=A⁻¹B; Y=B⁻¹A; Y⁻¹=A⁻¹B=X'],
  ],{identity:'inverse(Y)=X',X,Y}),
  make(1,ans(X,Y),[ans(mul(B,inverse(A)),Y),ans(X,mul(A,inverse(B))),ans(scale(X,-1),Y)],['Multiplicar A⁻¹ por el lado contrario.','Multiplicar B⁻¹ por el lado contrario.','Cambiar el signo del primer segundo miembro.'],[
   ['Las dos ecuaciones se despejan con inversas por la izquierda.','X=A⁻¹B; Y=B⁻¹A'],...invSteps(A,'A'),...invSteps(B,'B'),
   ['Calculamos cada producto fila por columna.',ans(X,Y)],
   ['Comprobamos las dos ecuaciones originales y la identidad del apartado anterior.','AX=B; BY=A; XY=YX=I₂'],
  ],{X,Y,wrong:[[mul(B,inverse(A)),Y],[X,mul(A,inverse(B))],[scale(X,-1),Y]]})];}
 if(c.index===1395){const N=add(scale(mul(T(C),D),3),scale(B,2),-1),X=mul(N,A),V=mul(A,add(T(B),scale(mul(T(D),C),2),-1));return[
  make(0,'ABᵗ:3×2; CᵗD:2×3; BᵗD:no definido; DBᵗ:1×2.',[
   'ABᵗ:2×3; CᵗD:2×3; BᵗD:no definido; DBᵗ:1×2.',
   'ABᵗ:3×2; CᵗD:3×2; BᵗD:no definido; DBᵗ:1×2.',
   'ABᵗ:3×2; CᵗD:2×3; BᵗD:3×3; DBᵗ:1×2.',
  ],['Intercambiar las dimensiones del resultado.','Invertir el orden de los vectores.','Multiplicar pese a que no coinciden las dimensiones interiores.'],[
   ['Anotamos los tamaños de las matrices y sus transpuestas.','A:3×3; B:2×3; C:1×2; D:1×3; Bᵗ:3×2; Cᵗ:2×1'],
   ['En el primer producto coinciden las tres dimensiones interiores.','ABᵗ:(3×3)(3×2) ⇒ 3×2'],
   ['Una columna por una fila da el segundo producto.','CᵗD:(2×1)(1×3) ⇒ 2×3'],
   ['En el tercero, dos columnas del primer factor no coinciden con una fila del segundo.','BᵗD:(3×2)(1×3): no definido'],
   ['El último producto sí es posible.','DBᵗ:(1×3)(3×2) ⇒ 1×2'],
  ],{dimensions:[[3,2],[2,3],null,[1,2]]}),
  make(1,'X=(3CᵗD−2B)A.',['X=(3CᵗD+2B)A.','X=(3CᵗD−2B)A⁻¹.','X=(3CᵗD−B)A.'],['Pasar 2B sin cambiar el signo.','Volver a multiplicar por A⁻¹ en vez de cancelar la inversa.','Perder el factor dos.'],[
   ['Partimos de la ecuación dada y restamos 2B en ambos lados.','XA⁻¹=3CᵗD−2B'],
   ['Para cancelar A⁻¹ multiplicamos por A a la derecha.','XA⁻¹A=(3CᵗD−2B)A'],
   ['El producto de la inversa y A es la identidad.','XI=(3CᵗD−2B)A'],
   ['Obtenemos X sin calcular sus elementos, como pide el enunciado.','X=(3CᵗD−2B)A'],
   ['Sustituimos simbólicamente para comprobar que se recupera el segundo miembro.','XA⁻¹+2B=(3CᵗD−2B)AA⁻¹+2B=3CᵗD'],
  ],{value:X,wrong:[mul(add(scale(mul(T(C),D),3),scale(B,2)),A),mul(N,inverse(A)),mul(add(scale(mul(T(C),D),3),B,-1),A)]}),
  mat(2,'A(Bᵗ−2DᵗC)',V,[mul(A,add(T(B),scale(mul(T(D),C),2))),mul(A,add(T(B),mul(T(D),C),-1)),add(mul(A,T(B)),scale(mul(T(D),C),2),-1)],['Sumar en lugar de restar.','Omitir el factor dos.','Distribuir A solo sobre el primer término.'],[
   ['Transponemos B y D respetando sus dimensiones.',`Bᵗ=${matrix(T(B))}; Dᵗ=${matrix(T(D))}`],
   ['Calculamos el producto de la columna Dᵗ por la fila C.',`DᵗC=${matrix(mul(T(D),C))}`],
   ['Multiplicamos por dos y restamos dentro del paréntesis.',`Bᵗ−2DᵗC=${matrix(add(T(B),scale(mul(T(D),C),2),-1))}`],
   ['Multiplicamos A por la matriz resultante, fila por columna.',`A(Bᵗ−2DᵗC)=${matrix(V)}`],
   ['Comprobamos de manera independiente por distributividad.','ABᵗ−2ADᵗC=A(Bᵗ−2DᵗC)'],
  ])];}
 if(c.index===1396){const K=mul(A,A),N=add(T(C),scale(B,4),-1),X=mul(inverse(A),N);return[
  mat(0,'A²',K,[scale(A,2),A.map(r=>r.map(x=>x*x)),mul(A,T(A))],['Confundir cuadrado con doble.','Elevar cada entrada al cuadrado.','Usar la transpuesta como segundo factor.'],[
   ['Un cuadrado matricial significa multiplicar A por A.',`A=${matrix(A)}; A²=A·A`],
   ['Calculamos la primera fila del producto.','(A²)₁₁=1−2=−1; (A²)₁₂=2+4=6'],
   ['Calculamos la segunda fila.','(A²)₂₁=−1−2=−3; (A²)₂₂=−2+4=2'],
   ['Reunimos las cuatro entradas.',`A²=${matrix(K)}`],
   ['Verificamos también con la identidad de Cayley: tr(A)=3 y det(A)=4.','A²=3A−4I₂'],
  ]),
  mat(1,'X',X,[mul(inverse(A),add(T(C),scale(B,4))),mul(A,N),mul(inverse(A),add(T(C),B,-1))],['Sumar 4B al despejar.','Usar A en vez de A⁻¹.','Olvidar el factor cuatro.'],[
   ['Transponemos C para obtener una matriz 2×3.',`Cᵗ=${matrix(T(C))}`],
   ['Restamos cuatro veces B.',`AX=Cᵗ−4B=${matrix(N)}`],...invSteps(A,'A'),
   ['Multiplicamos por la inversa a la izquierda.',`X=A⁻¹(Cᵗ−4B)=${matrix(X)}`],
   ['Comprobamos las seis entradas en la ecuación original.','AX+4B=Cᵗ'],
  ])];}
 if(c.index===1411){const X=[[3,-1],[-1,3]],V=mul(A,B),ans=v=>`A²:no definida; A−B:no definida; AB=${matrix(v)}; ABᵗ:no definida.`;return[
  make(0,ans(V),[ans(scale(V,-1)),ans(scale(V,2)),ans([[2,1],[1,2]])],['Invertir el signo del producto.','Duplicar el producto al interpretar A².','Intercambiar diagonal y términos exteriores.'],[
   ['Anotamos los tamaños; A no es cuadrada y B tiene la forma transpuesta.','A:2×3; B:3×2; Bᵗ:2×3'],
   ['El cuadrado no se puede efectuar, pues 3 y 2 no coinciden.','A²:(2×3)(2×3): no definida'],
   ['Tampoco podemos restar matrices de tamaños distintos ni multiplicar A por Bᵗ.','A−B: no definida; ABᵗ: no definida'],
   ['AB sí tiene tamaño 2×2 y se calcula fila por columna.','(AB)₁₁=0+0+1=1; (AB)₁₂=1+0+1=2'],
   ['Calculamos la otra fila y reunimos el resultado.','(AB)₂₁=0+1+1=2; (AB)₂₂=0+0+1=1'],
   ['El resultado de la única operación posible es:',`AB=${matrix(V)}`],
  ],{value:V,wrong:[scale(V,-1),scale(V,2),[[2,1],[1,2]]] }),
  mat(1,'X',X,[scale(X,-1),[[3,1],[1,3]],[[3,0],[0,3]]],['Cambiar el signo de todo el segundo miembro.','Sumar Aᵗ al pasarla al otro lado.','Omitir Aᵗ.'],[
   ['Restamos Aᵗ; no usamos una inversa de B porque B no es cuadrada.',`BX=3B−Aᵗ=${matrix(add(scale(B,3),T(A),-1))}`],
   ['Escribimos X con cuatro incógnitas.','X=[[x,y],[z,w]]'],
   ['Multiplicamos explícitamente la matriz rectangular por X.','BX=[[z,w],[x,y],[x+z,y+w]]'],
   ['Las primeras dos filas fijan las cuatro incógnitas.','z=−1; w=3; x=3; y=−1'],
   ['La última fila es una condición que también debe comprobarse.','x+z=2; y+w=2'],
   ['Reunimos X y verificamos la ecuación completa.',`X=${matrix(X)}; Aᵗ+BX=3B`],
  ])];}
 if(c.index===1423){const V=mul(A,T(B)),W=T(V),ans=v=>`PQᵗ=${matrix(v)}; QPᵗ=${matrix(T(v))}. Filas de PQᵗ: C₁,C₂; columnas: Cati,Manuel. QPᵗ intercambia esos papeles.`;return[
  make(0,ans(V),[ans(T(V)),ans([[95,160],[122,157]]),ans([[115,160],[122,162]])],['Transponer el resultado e intercambiar compradores y comercios.','Olvidar un artículo de 20 en la primera compra.','Confundir el precio de un artículo en el segundo comercio.'],[
   ['Cada fila de P contiene precios y cada fila de Q contiene cantidades de una persona.','P:2×3; Q:2×3; PQᵗ:2×2'],
   ['Calculamos la compra de Cati en ambos comercios.','C₁:25·2+20·1+15·3=115; C₂:23·2+25·1+17·3=122'],
   ['Calculamos la compra de Manuel.','C₁:25·5+20·1+15·1=160; C₂:23·5+25·1+17·1=157'],
   ['Las filas indican comercios y las columnas personas.',`PQᵗ=${matrix(V)}`],
   ['Al invertir el producto transpuesto se intercambian filas y columnas.',`QPᵗ=(PQᵗ)ᵗ=${matrix(W)}`],
   ['Comprobamos interpretando cada entrada como suma de precio por cantidad.','(PQᵗ)ᵢⱼ=Σₖ PᵢₖQⱼₖ'],
  ],{value:V,wrong:[T(V),[[95,160],[122,157]],[[115,160],[122,162]]]}),
  make(1,'Cati: C₁, coste 115; Manuel: C₂, coste 157.',[
   'Cati: C₂, coste 122; Manuel: C₁, coste 160.','Cati: C₁, coste 115; Manuel: C₁, coste 160.','Cati: C₂, coste 122; Manuel: C₂, coste 157.',
  ],['Elegir el mayor coste en ambos casos.','Suponer que un comercio es siempre más barato.','Suponer que el segundo comercio conviene a ambos.'],[
   ['Comparamos por persona, es decir, por columnas de PQᵗ.',`PQᵗ=${matrix(V)}`],
   ['Para Cati el primer comercio tiene menor coste.','115<122 ⇒ C₁'],
   ['Calculamos cuánto ahorra Cati con esa elección.','122−115=7'],
   ['Para Manuel conviene el segundo comercio.','157<160 ⇒ C₂'],
   ['El ahorro de Manuel confirma que no conviene la misma tienda a los dos.','160−157=3'],
  ],{shops:[1,2],costs:[115,157],wrongShops:[[2,1],[1,1],[2,2]]})];}
 if(c.index===1454){const N=add(mul(mul(A,A),C),B,-1),X=mul(inverse(A),N);return[
  mat(0,'X',X,[mul(inverse(A),add(mul(mul(A,A),C),B)),mul(inverse(A),add(mul(A,C),B,-1)),mul(A,N)],['Sumar B al despejar.','Confundir A² con A.','Multiplicar por A en vez de la inversa.'],[
   ['Calculamos primero A² y su producto por C.',`A²=${matrix(mul(A,A))}; A²C=${matrix(mul(mul(A,A),C))}`],
   ['Restamos B en ambos miembros.',`AX=A²C−B=${matrix(N)}`],...invSteps(A,'A'),
   ['La inversa debe multiplicar por la izquierda.',`X=A⁻¹(A²C−B)=${matrix(X)}`],
   ['Comprobamos las seis entradas en el planteamiento.','AX+B=A²C'],
  ]),
  make(1,'P:2×3; Q:2×3.',['P:3×2; Q:2×3.','P:2×3; Q:3×2.','P:3×3; Q:2×2.'],['Olvidar que P aparece transpuesta.','Invertir las dimensiones de Q.','Exigir que P y Q sean cuadradas.'],[
   ['Anotamos los tamaños de las matrices dadas.','A:3×3; B,C:3×2'],
   ['APᵗ debe poder sumarse con C; por tanto debe ser 3×2.','Pᵗ:3×2 ⇒ P:2×3'],
   ['El otro miembro ha de tener también tamaño 3×2.','C(QB):(3×2)(2×2)'],
   ['Para QB de tamaño 2×2 con B de 3×2 necesitamos Q de 2×3.','Q:2×3 ⇒ QB:(2×3)(3×2)=2×2'],
   ['Con esos tamaños todos los productos y la suma están definidos.','APᵗ+C:3×2; C(QB):3×2'],
  ],{P:[2,3],Q:[2,3]})];}
 if(c.index===1529){const J=inverse(A),X=mul(J,B);return[
  mat(0,'A⁻¹',J,[T(J),scale(J,-1),scale(J,det(A))],['No transponer los cofactores.','Cambiar el signo del determinante.','No dividir por el determinante.'],[
   ['Desarrollamos el determinante por la primera fila para justificar la inversibilidad.','det(A)=1·(−3)−1·0+3·(−3)=−12≠0'],...inverseSteps(A,'A'),
  ]),
  mat(1,'X',X,[mul(A,B),scale(X,-1),mul(T(J),B)],['Usar A en lugar de la inversa.','Cambiar el signo de B.','Usar la inversa transpuesta.'],[
   ['El determinante no nulo garantiza una única solución.','AX=B; det(A)=−12≠0'],
   ['Multiplicamos por A⁻¹ a la izquierda.','X=A⁻¹B'],
   ['Calculamos el producto de la inversa anterior por la columna B.',`X=${matrix(J)}·${matrix(B)}=${matrix(X)}`],
   ['Verificamos las tres ecuaciones originales.','x+y+3z=2; x+2y−z=3; x−y−z=0'],
   ['Al sustituir la columna obtenida se recupera B.',`AX=${matrix(B)}`],
  ])];}
 if(c.index===1596){const K=add(A,B,-1),X=mul(C,inverse(K));return[
  make(0,'a=3.',['a=−3.','a=4.','a=0.'],['Cambiar el signo del producto cruzado.','Confundir el parámetro con la entrada superior derecha.','Anular solo un término del determinante.'],[
   ['Una matriz cuadrada no tiene inversa exactamente cuando se anula su determinante.','det(A)=a·8−4·6'],
   ['Efectuamos el producto cruzado.','det(A)=8a−24'],
   ['Imponemos la condición pedida.','8a−24=0'],
   ['Despejamos el parámetro.','8a=24 ⇒ a=3'],
   ['Comprobamos que, en ese valor, la segunda fila es el doble de la primera.','[[3,4],[6,8]] ⇒ F₂=2F₁'],
  ],{value:3,wrong:[-3,4,0]}),
  mat(1,'X',X,[mul(C,K),scale(X,-1),mul(C,inverse(add(A,B)))],['Multiplicar por A−B en vez de su inversa.','Cambiar el signo de C.','Sumar A y B al factorizar.'],[
   ['Factorizamos X por la izquierda; A puede ser singular, pero A−B no lo es.','X(A−B)=C'],
   ['Sustituimos a=3 y calculamos el coeficiente.',`K=A−B=${matrix(K)}`],...invSteps(K,'K'),
   ['Multiplicamos por K⁻¹ a la derecha.',`X=CK⁻¹=${matrix(X)}`],
   ['Comprobamos el resultado sin invertir A.','XA−XB=C'],
  ]),
  make(2,'A²=11A; A⁸=11⁷A.',['A²=11A; A⁸=11⁸A.','A²=11A; A⁸=8·11A.','A²=11A; A⁸=11⁶A.'],['Usar ocho factores de 11 en vez de siete.','Confundir potencia con múltiplo.','Perder un factor de 11.'],[
   ['Calculamos el cuadrado para comprobar la identidad propuesta.',`A²=${matrix(mul(A,A))}=[[33,44],[66,88]]`],
   ['Cada entrada es once veces la correspondiente de A.','A²=11A'],
   ['Multiplicar una vez más por A añade un factor de 11.','A³=11A²=11²A'],
   ['Si Aⁿ=11^{n−1}A, al multiplicar por A resulta A^{n+1}=11ⁿA.','A^{n+1}=11^{n−1}A²=11ⁿA'],
   ['La inducción justifica la fórmula; ponemos n=8.','A⁸=11⁷A'],
  ],{coefficient:11**7,wrong:[11**8,88,11**6]})];}
 throw Error('Unknown source matrix question');
}
export function buildClosingMatrixBatch(id='batch-0319',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Inversas','Ecuaciones matriciales','Dimensiones'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='COMPLETE_SOURCE_MATRIX_QUESTION_ALL_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildClosingMatrixBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0319-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0319.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
