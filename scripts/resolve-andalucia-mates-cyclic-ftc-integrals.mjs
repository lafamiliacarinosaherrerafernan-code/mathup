import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[722,'57a94794707b1b7875c44400a89e0e02d964c61659e3e0531c40ff634f78104c',2,'A.6','a2aafefcd79a18e6a9db916b5660e53000b6a30cb614dbcdead7daab4c7de199',0],
[723,'ffc7b024ef2abe93472bbafd9a890f0f2da04f1e105a1fa378ee1e074ea7fd79',1,'A.4','83592f16d89a715aca0964b4e905457c46cb0d80be2de3eec17111acac906385',0],
[729,'0fa1c3912eac6e5af10e80bbdfd579032d29e008b33880c6bd4e8f86334d9db6',2,'NONE.4','4fbd959601a729b2eb43ec7293141ce3f19d6387342102372bc07487dcf863a9',0],
[730,'82a981b064c7c77fadf9faecac5c219a4144a7a58a86a02d0c2efc78dc52f59a',2,'B.4','fbb1b2a5051fa36a1a5142001ac7488a06da714a21871f7a1994abc5d0d42125',0],
[732,'15c3470cfea7d61b997f1f400cd8e1ecd8baee17b80f43cf5388e1693d2b5a77',1,'NONE.2','8c86d3f25d65a6d0304843d3110d44408f44add14ab648ffe1f8020766d26ff2',0],
[735,'cdf985a777846063debf9f6f76772c9487c15dc9c20aaff11fa992410f8a7acd',1,'A.2','dde2d03a8d0839ec206c771198beaa846f025b48a53d99b6877bb75fc2ea0ba9',0],
[736,'8f26bd61ad72286c9619dd2a285b762aa5a353de3a134f51beb40e7bde69c151',1,'NONE.2','f1cf95af3a1da124fc1272d1f0c598e2591ef96e9d9baf0ce8a480e20f8da94a',0],
[739,'a098cf97f26b5a80c2114b078958a9549efd8f87843d30465bf6b65e0deb3e8c',1,'B.3','ba4e27f303b1228693255f8c08971c8363c7d22a84d9980751707ff6b2ae826f',0]];
export const statements={
722:'Considera las matrices A=matrix{0,0,m;m,0,0;0,m,0} y B=matrix{1,0,0;0,0,1;0,1,0}.\na) Determina para qué valores de m existe la inversa de la matriz A.\nb) Para todo m≠−1, resuelve, si es posible, la ecuación AX+X=B.',
723:'Los puntos A(1,1,1), B(2,2,2) y C(1,3,3) son vértices consecutivos del paralelogramo ABCD.\na) Calcula el área del paralelogramo.\nb) Halla la ecuación general del plano que contiene a dicho paralelogramo.\nc) Calcula las coordenadas del vértice D.',
729:'Considera el punto P(1,0,−1) y la recta r dada por system{x+y=0;z−1=0}.\na) Halla la distancia de P a r.\nb) Determina la ecuación general del plano que pasa por P y contiene a r.',
730:'Considera la matriz A=matrix{0,−1;1,0}.\na) Calcula A⁴ y A³¹.\nb) Halla razonadamente el determinante de la matriz 4A²⁵(Aᵗ)⁴.',
732:'Sea f la función definida por f(x)=frac{ln(x)}{2x} para x>0 (ln denota la función logaritmo neperiano) y sea F la primitiva de f tal que F(1)=2.\na) Calcula F′(e).\nb) Halla la ecuación de la recta tangente a la gráfica de F en el punto de abscisa x=e.',
735:'Calcula el valor de a>0 para el que se verifica ∫_0^a frac{x}{2+x²} dx=1.',
736:'Calcula ∫_{−1}^1 ln(4−x) dx (ln denota el logaritmo neperiano).',
739:'Sabiendo que F:ℝ→ℝ definida por F(x)=e^{x²} es una primitiva de f.\na) Comprueba que f es creciente.\nb) Calcula el área del recinto limitado por la gráfica de la función f, el eje de abscisas y la recta x=1.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_CYCLIC_FTC_INTEGRAL_LAYOUT']]:[];
export const cases=[{index:722,slot:1,literals:['AX + X = B','inversa de la matriz A']},{index:723,slot:4,literals:['A(1, 1, 1)','B(2, 2, 2)','C(1, 3, 3)','vértices consecutivos']},{index:729,slot:4,literals:['P (1, 0, −1)','x+y = 0','z−1 = 0']},{index:730,slot:1,literals:['Calcula A4 y A31','4A25(At)4']},{index:732,slot:3,literals:['F (1) = 2','ln (x)','2x']},{index:735,slot:3,literals:['a > 0','2+x','dx = 1']},{index:736,slot:3,literals:['ln(4 − x)dx','−1']},{index:739,slot:3,literals:['F (x) = ex2','primitiva de f','x = 1']}];
export const proof=c=>({722:{determinantPower:3,excludedInB:-1},723:{A:[1,1,1],B:[2,2,2],C:[1,3,3],D:[0,2,2],area:2*Math.sqrt(2),normal:[0,-2,2]},729:{P:[1,0,-1],Q:[0,0,1],direction:[1,-1,0],H:[.5,-.5,1],distance:3/Math.sqrt(2),plane:[2,2,1,-1]},730:{A:[[0,-1],[1,0]],period:4,power31:[[0,1],[-1,0]],determinant:16},732:{slope:1/(2*Math.E),constant:2,height:9/4},735:{positiveUpperLimit:Math.sqrt(2*(Math.E**2-1)),integral:1},736:{lower:-1,upper:1,integral:5*Math.log(5)-3*Math.log(3)-2},739:{root:0,region:[0,1],area:Math.E-1}}[c.index]);
export const areaGraph={schemaVersion:'mathup.calculus-graph.v1',plotVersion:'mates-ftc-positive-area-v1',index:739,xRange:[-.15,1.1],yRange:[-1,8],region:[0,1]};
export function renderFtcPositiveArea(g){assert.deepEqual(g,areaGraph);const X=x=>65+630*(x+.15)/1.25,Y=y=>330-290*(y+1)/9,pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,f=x=>2*x*Math.exp(x*x),trace=(a,b)=>Array.from({length:501},(_,i)=>{const x=a+(b-a)*i/500;return pt(x,f(x));}).join(' ');return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 435" role="img" aria-label="Recinto entre f(x)=2x exp(x²), el eje horizontal y x=1. Área sombreada desde cero hasta uno."><rect width="760" height="435" fill="white"/><polygon points="${pt(0,0)} ${trace(0,1)} ${pt(1,0)}" fill="#cbe8f1"/><path d="M${pt(-.15,0)} L${pt(1.1,0)} M${pt(0,-1)} L${pt(0,8)}" stroke="#555" fill="none"/><polyline points="${trace(-.15,1.1)}" fill="none" stroke="#075597" stroke-width="3"/><path d="M${pt(1,0)} L${pt(1,f(1))}" stroke="#a52d3c" stroke-width="2"/><circle cx="${X(0)}" cy="${Y(0)}" r="4" fill="#075597"/><text x="${X(0)-14}" y="${Y(0)+22}" font-size="16">0</text><text x="${X(1)}" y="${Y(0)+22}" text-anchor="middle" font-size="16">1</text><text x="700" y="${Y(0)+22}" font-size="16">x</text><text x="${X(0)+10}" y="38" font-size="16">y</text><text x="65" y="383" font-size="19">f(x)=2x·exp(x²); f(x)≥0 en [0;1]</text><text x="65" y="413" font-size="19">Recinto: 0≤x≤1; 0≤y≤f(x)</text></svg>`;}
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'INDEPENDENT_MATRIX_VECTOR_DERIVATIVE_AND_QUADRATURE_CHECK',proof(c));let out;switch(c.index){
case 722:return[mk(0,'A es invertible si y solo si m≠0.',['A es invertible si y solo si m≠−1.','A es invertible si y solo si m>0.','A es invertible para todo m∈ℝ.'],['Usar la condición de A+I en lugar de la de A.','Confundir determinante no nulo con determinante positivo.','Ignorar el caso de la matriz nula.'],[
['La matriz es cuadrada: el criterio de invertibilidad es determinante distinto de cero.','A invertible ⇔ det A≠0'],
['Expandimos por la primera fila; solo contribuye la tercera entrada.','det A=m·(−1)^{1+3}·det(matrix{m,0;0,m})'],
['El menor es diagonal y el signo del cofactor es positivo.','det A=m·m²=m³'],
['La única raíz real del determinante es cero.','m³=0 ⇔ m=0'],
['Excluimos ese valor sin imponer positividad a m.','m≠0 ⇒ det A≠0 ⇒ A invertible'],
['Comprobamos el caso singular y una identidad que confirma la inversa en los demás casos.','m=0 ⇒ A=0; A³=m³I ⇒ A⁻¹=frac{1}{m³}A² si m≠0'],
]),mk(1,'X=frac{1}{1+m³} matrix{1,−m,m²;−m,m²,1;m²,1,−m}, para m≠−1.',['X=frac{1}{1+m²} matrix{1,−m,m²;−m,m²,1;m²,1,−m}, para m≠−1.','X=frac{1}{1+m³} matrix{1,m,m²;m,m²,1;m²,1,m}, para m≠−1.','X=frac{1}{1+m³} matrix{1,m²,−m;m²,−m,1;−m,1,m²}, para m≠−1.'],['Cambiar el cubo del determinante por un cuadrado.','Usar I+A+A² en vez de I−A+A².','Multiplicar B por la inversa a la derecha en vez de a la izquierda.'],[
['Agrupamos la incógnita por la derecha y distinguimos A de la matriz que debe invertirse.','AX+X=(A+I)X=B'],
['Calculamos las potencias de A, que permuta cíclicamente tres coordenadas.','A²=matrix{0,m²,0;0,0,m²;m²,0,0}; A³=m³I'],
['Aplicamos la identidad polinómica. No requiere A invertible, por lo que incluye m=0.','(I+A)(I−A+A²)=I+A³=(1+m³)I'],
['El factor escalar no se anula bajo la condición oficial. Multiplicamos por la inversa a la izquierda.','m≠−1 ⇒ X=frac{1}{1+m³}(I−A+A²)B'],
['B intercambia las columnas segunda y tercera. Efectuamos ese producto.','X=frac{1}{1+m³} matrix{1,−m,m²;−m,m²,1;m²,1,−m}'],
['Verificamos sin conmutar factores; la identidad anterior da exactamente B al sustituir.','AX+X=(I+A)X=frac{1}{1+m³}(1+m³)B=B; m=0 ⇒ X=B'],
])];
case 723:return[mk(0,'Área=2√2 u².',['Área=√2 u².','Área=3 u².','Área=4√2 u².'],['Dividir por dos como si se pidiera el área del triángulo.','Multiplicar las longitudes sin el seno del ángulo entre lados.','Duplicar el área del paralelogramo.'],[
['Los vértices son consecutivos; tomamos dos lados contiguos y no dos diagonales.','AB=B−A=(1,1,1); BC=C−B=(−1,1,1)'],
['El módulo del producto vectorial da el área del paralelogramo.','Área=‖AB×BC‖'],
['Calculamos las componentes respetando el signo de la componente central.','AB×BC=(1−1,−(1+1),1+1)=(0,−2,2)'],
['Evaluamos la norma, sin el factor un medio que correspondería a un triángulo.','Área=√(0²+(−2)²+2²)=√8=2√2 u²'],
['Como comprobación independiente, usamos la identidad del producto vectorial con productos escalares.','‖AB‖²=3; ‖BC‖²=3; AB·BC=1'],
['La diferencia entre producto de normas al cuadrado y producto escalar al cuadrado reproduce el resultado.','Área²=3·3−1²=8 ⇒ Área=2√2 u²'],
]),mk(1,'Plano: y−z=0.',['Plano: x−y=0.','Plano: y+z−2=0.','Plano: y−z−1=0.'],['Usar una normal que no es perpendicular a ambos lados.','Cambiar la diferencia de coordenadas por una suma.','No ajustar el término independiente al punto A.'],[
['El plano contiene los dos vectores de los lados del paralelogramo.','AB=(1,1,1); BC=(−1,1,1)'],
['Su producto vectorial no nulo proporciona una normal al plano.','n=(0,−2,2)'],
['Escribimos la ecuación punto-normal usando A.','n·((x,y,z)−(1,1,1))=0'],
['Desarrollamos y simplificamos dividiendo por un escalar no nulo.','−2(y−1)+2(z−1)=0 ⇒ y−z=0'],
['Los tres vértices dados pertenecen al plano calculado.','A:1−1=0; B:2−2=0; C:3−3=0'],
['La normal es perpendicular a ambos lados; no hemos confundido el plano con una recta.','(0,1,−1)·AB=0; (0,1,−1)·BC=0'],
]),mk(2,'D=(0,2,2).',['D=(2,4,4).','D=(2,0,0).','D=(1,2,2).'],['Tomar A como vértice común de los dos lados, ignorando el orden consecutivo.','Tomar C como vértice común de los dos lados.','Olvidar restar la primera coordenada de B.'],[
['En el orden A, B, C, D las diagonales son AC y BD. Sus puntos medios coinciden.','frac{A+C}{2}=frac{B+D}{2}'],
['Despejamos D sin cambiar qué vértices son opuestos.','D=A+C−B'],
['Sustituimos coordenada a coordenada.','D=(1+1−2,1+3−2,1+3−2)'],
['Obtenemos el cuarto vértice.','D=(0,2,2)'],
['Comprobamos lados opuestos iguales y paralelos.','AD=(−1,1,1)=BC; DC=(1,1,1)=AB'],
['También se verifica el punto medio común y la pertenencia al plano.','(A+C)/2=(1,2,2)=(B+D)/2; D:2−2=0'],
])];
case 729:return[mk(0,'d(P,r)=frac{3}{√2}.',['d(P,r)=√5.','d(P,r)=√2.','d(P,r)=frac{1}{√2}.'],['Medir hasta el punto base de la recta en vez del pie perpendicular.','Usar el módulo del vector director como distancia.','Omitir la diferencia en la coordenada z.'],[
['Resolvemos las dos ecuaciones de la recta para parametrizarla.','r(t)=(t,−t,1); Q=(0,0,1); d=(1,−1,0)'],
['El pie perpendicular H=Q+td satisface que P−H es perpendicular a d.','(P−Q−td)·d=0 ⇒ t=frac{(P−Q)·d}{d·d}'],
['Sustituimos los datos oficiales para obtener el parámetro de proyección.','P−Q=(1,0,−2); t=frac{1}{2}'],
['Calculamos el pie y la diferencia con P.','H=(frac{1}{2},−frac{1}{2},1); P−H=(frac{1}{2},frac{1}{2},−2)'],
['La norma de esa diferencia es la distancia mínima.','d(P,r)=√(frac{1}{4}+frac{1}{4}+4)=√frac{9}{2}=frac{3}{√2}'],
['Comprobamos con el producto vectorial, un cálculo independiente del pie.','(P−Q)×d=(−2,−2,−1); d(P,r)=frac{√9}{√2}=frac{3}{√2}'],
]),mk(1,'Plano: 2x+2y+z−1=0.',['Plano: x+y+z−1=0.','Plano: 2x+2y−z+1=0.','Plano: 2x−2y+z−1=0.'],['No conservar el factor dos de la normal calculada.','Cambiar el signo del término en z.','Cambiar el signo de la segunda componente de la normal.'],[
['Un punto de la recta y su dirección, junto con P, determinan el plano.','Q=(0,0,1); d=(1,−1,0); QP=(1,0,−2)'],
['Buscamos una normal perpendicular a ambos vectores contenidos.','n=d×QP=(2,2,1)'],
['La normal no es nula, así que P no pertenece a r y el plano es único.','‖n‖²=4+4+1=9≠0'],
['Usamos Q para escribir la ecuación punto-normal.','2(x−0)+2(y−0)+(z−1)=0'],
['Desarrollamos y comprobamos la pertenencia de P.','2x+2y+z−1=0; P:2·1+2·0−1−1=0'],
['Sustituimos un punto genérico de r: la igualdad se cumple para todo t.','r(t):2t+2(−t)+1−1=0'],
])];
case 730:return[mk(0,'A⁴=matrix{1,0;0,1}; A³¹=matrix{0,1;−1,0}.',['A⁴=matrix{1,0;0,1}; A³¹=matrix{0,−1;1,0}.','A⁴=matrix{−1,0;0,−1}; A³¹=matrix{0,1;−1,0}.','A⁴=matrix{1,0;0,1}; A³¹=matrix{−1,0;0,−1}.'],['Usar resto uno en vez de tres al dividir 31 entre cuatro.','Confundir A⁴ con A².','Usar resto dos en vez de tres para el exponente 31.'],[
['Calculamos el cuadrado por multiplicación matricial, no elevando entradas por separado.','A²=matrix{−1,0;0,−1}=−I'],
['De ese resultado obtenemos el cuarto exponente.','A⁴=(A²)²=(−I)²=I'],
['La sucesión de potencias se repite cada cuatro factores.','A^{4k+r}=(A⁴)^kA^r=A^r'],
['Dividimos el exponente 31 entre cuatro conservando el resto.','31=4·7+3 ⇒ A³¹=A³'],
['Multiplicamos A² por A para el resto tres.','A³=−IA=−A=matrix{0,1;−1,0}'],
['Comprobamos cerrando un ciclo: la potencia obtenida multiplicada por A da I.','A³¹A=(−A)A=−A²=I=A³²'],
]),mk(1,'det(4A²⁵(Aᵗ)⁴)=16.',['det(4A²⁵(Aᵗ)⁴)=4.','det(4A²⁵(Aᵗ)⁴)=−16.','det(4A²⁵(Aᵗ)⁴)=256.'],['Extraer el escalar sin elevarlo al orden dos de la matriz.','Asignar un signo negativo al determinante de A.','Elevar el escalar al exponente cuatro en lugar del orden dos.'],[
['Calculamos el determinante de la matriz oficial.','det A=0·0−(−1)·1=1'],
['La trasposición no cambia el determinante y una potencia eleva su valor al mismo exponente.','det(Aᵗ)=det A=1; det(A²⁵)=1²⁵=1'],
['El factor escalar multiplica todas las filas: al haber dos filas, contribuye con su cuadrado.','det(4M)=4²det M para M de orden 2'],
['Aplicamos la multiplicatividad sin necesidad de conmutar los factores.','det(4A²⁵(Aᵗ)⁴)=4²(det A)²⁵(det Aᵗ)⁴'],
['Sustituimos los valores.','4²·1²⁵·1⁴=16'],
['Comprobamos directamente mediante el ciclo de potencias: A²⁵=A y (Aᵗ)⁴=I.','4A²⁵(Aᵗ)⁴=4A=matrix{0,−4;4,0}; det(4A)=16'],
])];
case 732:return[mk(0,'F′(e)=frac{1}{2e}.',['F′(e)=0.','F′(e)=frac{1}{e}.','F′(e)=frac{1}{2}.'],['Calcular f′(e) cuando se pide la derivada de su primitiva.','Omitir el factor dos del denominador.','Omitir x al evaluar el denominador.'],[
['Que F sea una primitiva significa que su derivada es f, no la derivada de f.','F′(x)=f(x)=frac{ln(x)}{2x}, x>0'],
['El punto e pertenece al dominio de definición.','e>0'],
['Sustituimos e directamente en la expresión de f.','F′(e)=frac{ln(e)}{2e}'],
['Usamos que el logaritmo neperiano de e es uno.','ln(e)=1 ⇒ F′(e)=frac{1}{2e}'],
['Una primitiva general sirve de comprobación independiente por derivación.','F(x)=frac{(ln x)²}{4}+C ⇒ F′(x)=frac{2ln x}{4x}=frac{ln x}{2x}'],
['La constante determinada por el dato inicial no cambia la derivada.','F(1)=C=2; F′(e)=frac{1}{2e}'],
]),mk(1,'Tangente: y−frac{9}{4}=frac{1}{2e}(x−e).',['Tangente: y−frac{5}{2}=frac{1}{2e}(x−e).','Tangente: y−frac{9}{4}=frac{1}{e}(x−e).','Tangente: y−frac{1}{4}=frac{1}{2e}(x−e).'],['Omitir un factor dos en la primitiva al calcular la altura.','Duplicar la pendiente de la tangente.','Olvidar la constante impuesta por F(1)=2.'],[
['La tangente necesita el valor de F y su derivada en e. Primero integramos f.','F(x)=∫frac{ln x}{2x}dx'],
['Con u=ln x y du=dx/x, integramos una potencia de u.','F(x)=frac{1}{2}∫u du=frac{u²}{4}+C=frac{(ln x)²}{4}+C'],
['La condición oficial fija la constante en el dominio positivo, que es un intervalo.','F(1)=0+C=2 ⇒ C=2'],
['Calculamos punto de tangencia y pendiente.','F(e)=frac{1}{4}+2=frac{9}{4}; F′(e)=frac{1}{2e}'],
['Usamos la ecuación punto-pendiente.','y−F(e)=F′(e)(x−e) ⇒ y−frac{9}{4}=frac{1}{2e}(x−e)'],
['Al sustituir x=e se recupera la altura; al derivar la recta se recupera la pendiente.','L(e)=frac{9}{4}=F(e); L′=frac{1}{2e}=F′(e)'],
])];
case 735:return[mk(0,'a=√(2(e²−1)).',['a=√(2(e−1)).','a=√(e²−2).','a=2(e²−1).'],['Olvidar el factor un medio de la primitiva.','Omitir el logaritmo del extremo inferior.','No tomar raíz cuadrada al despejar a.'],[
['Reconocemos la derivada del denominador en el numerador, salvo un factor dos.','u=2+x²; du=2x dx'],
['Integramos y aplicamos Barrow en los límites oficiales.','∫_0^a frac{x}{2+x²}dx=frac{1}{2}[ln(2+x²)]_0^a'],
['El extremo inferior no vale cero: aporta ln 2. Combinamos logaritmos.','frac{1}{2}(ln(2+a²)−ln2)=frac{1}{2}lnfrac{2+a²}{2}=1'],
['Multiplicamos por dos y aplicamos la exponencial.','lnfrac{2+a²}{2}=2 ⇒ 2+a²=2e²'],
['Resolvemos el cuadrado y elegimos solo el valor positivo exigido.','a²=2(e²−1); a>0 ⇒ a=√(2(e²−1))'],
['La sustitución da uno exactamente. La derivada respecto del límite positivo garantiza unicidad.','frac{1}{2}lnfrac{2+2(e²−1)}{2}=1; I′(a)=frac{a}{2+a²}>0 para a>0'],
])];
case 736:return[mk(0,'∫_{−1}^1 ln(4−x) dx=5ln5−3ln3−2.',['∫_{−1}^1 ln(4−x) dx=3ln3−5ln5+2.','∫_{−1}^1 ln(4−x) dx=5ln5−3ln3+2.','∫_{−1}^1 ln(4−x) dx=5ln5−3ln3.'],['Invertir los extremos sin compensar el signo del diferencial.','Cambiar el signo del término lineal de la primitiva.','Omitir el término lineal al integrar el logaritmo.'],[
['En el intervalo oficial el argumento del logaritmo es positivo. Hacemos un cambio de variable con su signo.','u=4−x; du=−dx; x=−1⇒u=5; x=1⇒u=3'],
['El signo negativo invierte los límites y elimina la posible ambigüedad de orientación.','∫_{−1}^1ln(4−x)dx=−∫_5^3lnu du=∫_3^5lnu du'],
['Integramos por partes: logaritmo por un lado y diferencial simple por el otro.','v=u; d(lnu)=frac{du}{u}; ∫lnu du=u lnu−∫1du=u lnu−u'],
['Aplicamos Barrow a la primitiva en los dos extremos.','[u lnu−u]_3^5=(5ln5−5)−(3ln3−3)'],
['Agrupamos constantes y expresamos el resultado sin constante de integración.','I=5ln5−3ln3−2'],
['Comprobamos derivando la primitiva y acotando el resultado positivo entre los valores extremos del integrando por la longitud del intervalo.','(u lnu−u)′=lnu; 2ln3<I<2ln5'],
])];
case 739:out=[mk(0,'f(x)=2xe^{x²} y f′(x)=(2+4x²)e^{x²}>0: creciente en ℝ.',['f(x)=xe^{x²} y f′(x)=(1+2x²)e^{x²}>0: creciente en ℝ.','f(x)=2xe^{x²} y f′(x)=(2−4x²)e^{x²}: creciente solo si |x|<frac{1}{√2}.','f(x)=2xe^{x²} y f′(x)=2xe^{x²}: decreciente para x<0 y creciente para x>0.'],['Omitir el factor dos de la regla de la cadena al recuperar f.','Cambiar el signo de la contribución de la cadena en f′.','Usar F′ en lugar de f′ para estudiar la monotonía de f.'],[
['Una primitiva deriva a la función buscada. Aplicamos la regla de la cadena.','f(x)=F′(x)=(e^{x²})′=2xe^{x²}'],
['Para estudiar la monotonía de f debemos derivar otra vez, ahora con la regla del producto.','f′(x)=2e^{x²}+2x·(2xe^{x²})'],
['Sacamos factor común positivo.','f′(x)=(2+4x²)e^{x²}'],
['Los dos factores son estrictamente positivos para cualquier real.','2+4x²≥2>0; e^{x²}>0'],
['El signo de la derivada es positivo en todo el dominio, sin intervalos decrecientes.','f′(x)>0 para todo x∈ℝ ⇒ f estrictamente creciente en ℝ'],
['Contrastamos con la segunda derivada de la primitiva: debe coincidir con f′.','F″(x)=(2xe^{x²})′=(2+4x²)e^{x²}=f′(x)'],
]),mk(1,'Área=e−1 u².',['Área=e u².','Área=e²−1 u².','Área=2e u².'],['Olvidar restar el valor F(0)=1.','Sustituir e^{x²} por e^{2x} en el extremo.','Usar la altura f(1) en lugar de integrar la curva.'],[
['Buscamos el corte con el eje horizontal; la exponencial nunca se anula.','f(x)=2xe^{x²}=0 ⇔ x=0'],
['La recta x=1 cierra el recinto. En el intervalo de cero a uno la función es no negativa.','0≤x≤1 ⇒ f(x)≥0; recinto:0≤y≤2xe^{x²}'],
['La gráfica adjunta muestra el corte, la frontera vertical y la región sombreada; no hay que sumar áreas con signo cambiado.','Área=∫_0^1 2xe^{x²}dx'],
['La primitiva viene dada en el enunciado. Aplicamos Barrow.','Área=F(1)−F(0)=e^{1²}−e^{0²}'],
['Evaluamos ambos extremos, incluido el valor uno de la exponencial en cero.','Área=e−1 u²'],
['Comprobamos con el cambio u=x², du=2x dx; conserva los extremos cero y uno.','∫_0^1e^u du=[e^u]_0^1=e−1>0'],
])];out[1].visual=structuredClone(areaGraph);return out;
default:throw Error('Unknown cyclic/FTC/integral case');}}
export function buildCyclicFtcIntegralsBatch(id='batch-0437',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Matrices':c.slot===4?'Propiedades métricas':'Integrales definidas y áreas';x.secondaryTopics=c.index===732||c.index===739?['Aplicaciones de derivadas']:c.slot===4?['Planos y rectas en el espacio']:[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'CYCLIC_MATRICES_FTC_AND_INTEGRALS_WITH_SOURCE_BOUND_LIMITS'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildCyclicFtcIntegralsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0437-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0437.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
