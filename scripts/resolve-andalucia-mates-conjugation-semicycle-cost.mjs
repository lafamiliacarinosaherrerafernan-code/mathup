import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {graphs} from './resolve-andalucia-mates-source-areas.mjs';
export const observations=[
[891,'85a6693892f29847142a74b342f143d4d263e44abb0bbce055536058043080eb',1,'A.3','ca158e5a5d523e3b0504c26e32c8898e9ffa0e156bb3e21bfd369593ddff85b9',0],
[895,'3c73d7569c1433d92a94cc59d448ac36b1ef461888db782ababda36489d9f359',1,'A.3','1417b2e78c78910487a29d5dd444c01fc8d4ff8bb7c80f22d0b18f661ca86a62',0],
[898,'91c7db7efdbb93cf3f8763fcfd275431e641c6293dd58cfffa42a740afe5d4cd',1,'NONE.2','c4d14c6711d24850dd065c3ce6a483dddf5fc8e42d54286b4cd3bd4df1aaf46f',0],
[902,'757725a20faff347660e0d616729eb9219db76a4d18297e2896526290649ec77',1,'A.1','199532170f0043d3147cdf5f9012583e9a100546d087a5b0b1621e237423788e',0],
[904,'a1309415c80437b1f75d719c9d420d9f4bf895a58b248aad5ba544cdec0b746d',2,'NONE.3.1','dd3a570eebba030d125b13a9aa61ccbb4262985a5effaf5dc4d527819871f9e2',0],
[905,'9a4a3ac92abc26f1ca18a7fc0bcf40c3075f1d1ab90ae5d116c8e4c81bdf4104',1,'A.2','6d096cc13c8881cd748926d1f179d72efb74a76aafba42ee4ac22588989bfe99',0],
[907,'3c73d7569c1433d92a94cc59d448ac36b1ef461888db782ababda36489d9f359',2,'B.6','b719c51aadb997b270d189c8519c0638586dbbd5577bbece9e339014d4f9c9d9',0],
[909,'ebc02a7f8b0e620b0f8134f8e32b5215847b3dc50890fe40538337ed88a54a6d',1,'A.1','7a644f4004e934ff88fb1ae315ed51b650dc1ab90a9f6cd78bd4913a477fe9a4',0]];
export const statements={
891:'Considera las matrices A=matrix{1,0,0;0,λ,1;0,−1,λ} y B=matrix{0,0,1;1,0,0;0,1,0}.\na) ¿Hay algún valor de λ para el que A no tiene inversa?\nb) Para λ=1, resuelve la ecuación matricial A⁻¹XA=B.',
895:'Calcula a con 0<a<1, tal que ∫_a^1 frac{ln(x)}{x}dx+2=0 (ln denota la función logaritmo neperiano).',
898:'Calcula a>0 sabiendo que el área de la región determinada por la gráfica de la función f(x)=xe³ˣ, el eje de abscisas y la recta x=a vale frac{1}{9}.',
902:'Un rectángulo está inscrito en un semicírculo de √5 cm de radio, de forma que uno de sus lados está contenido en el diámetro del semicírculo y el lado opuesto tiene sus vértices sobre la semicircunferencia. Calcula las dimensiones del rectángulo sabiendo que es el de mayor perímetro posible.',
904:'Considera el plano π≡4x+5y−20z+20=0.\na) Halla el área del triángulo cuyos vértices están determinados por la intersección de π con los ejes coordenados.\nb) Halla los planos paralelos a π que distan 2 unidades del punto P(2,2,1).',
905:'Halla a>0 y b>0 sabiendo que la gráfica de la función f:ℝ→ℝ dada por f(x)=frac{bx²}{1+ax⁴} tiene en el punto (1,2) un punto crítico.',
907:'El dueño de un bar ha comprado refrescos, cerveza y vino por un importe de 500 euros sin incluir impuestos. El gasto en vino es 60 euros menos que los gastos en refrescos y cerveza conjuntamente, sin incluir impuestos. Teniendo en cuenta que los impuestos de los refrescos, la cerveza y el vino son el 6 %, el 12 % y el 30 %, respectivamente, entonces el importe total de la factura incluyendo impuestos ha ascendido a 592,4 euros. Calcula el importe, incluyendo impuestos, invertido en cada una de las bebidas.',
909:'Queremos hacer junto a la carretera un cercado rectangular para unos caballos en una zona llana. Cada metro del lado del cercado que está junto a la carretera nos cuesta 100 euros, mientras que para el resto del cercado nos cuesta 10 euros el metro. ¿Cuáles son las dimensiones del prado de área máxima que podemos cercar con 3000 euros?'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_CONJUGATION_SEMICYCLE_COST_LAYOUT']]:[];
export const cases=[{index:891,slot:1,literals:['A−1XA = B','λ = 1']},{index:895,slot:3,literals:['0 < a < 1','logaritmo neperiano']},{index:898,slot:3,literals:['xe3x','recta x = a']},{index:902,slot:2,literals:['semicircunferencia','mayor per']},{index:904,slot:4,literals:['4x + 5y − 20z + 20','P (2, 2, 1)']},{index:905,slot:2,literals:['a > 0 y b > 0','(1, 2)']},{index:907,slot:1,literals:['592,4','60 euros']},{index:909,slot:2,literals:['carretera','3000 euros']}];
export const proof=c=>({891:{A:[[1,0,0],[0,1,1],[0,-1,1]],B:[[0,0,1],[1,0,0],[0,1,0]],inverse:[[1,0,0],[0,.5,-.5],[0,.5,.5]],X:[[0,.5,.5],[1,.5,-.5],[-1,.5,-.5]]},895:{a:Math.exp(-2),integral:-2},898:{a:1/3,area:1/9},902:{radiusSquared:5,halfBase:2,base:4,height:1,perimeter:10},904:{vertices:[[-5,0,0],[0,-4,0],[0,0,1]],cross:[-4,-5,20],area:10.5,constants:[44,-40]},905:{a:1,b:4},907:{net:[120,160,220],gross:[127.2,179.2,286]},909:{base:150/11,height:75,area:11250/11,budget:3000}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s,visual=false)=>{const p=part(ps[i],a,d,e,s,'INDEPENDENT_MATRIX_DISTANCE_DERIVATIVE_QUADRATURE_AND_BUDGET_CHECKS',proof(c));if(visual)p.visual=structuredClone(graphs[c.index]);return p;};switch(c.index){
case 891:return[mk(0,'No hay ningún λ real: det A=λ²+1>0 y A siempre tiene inversa.',[
'A no tiene inversa para λ=1 o λ=−1.',
'A no tiene inversa únicamente para λ=0.',
'A no tiene inversa para ningún λ real: det A=0 siempre.'],['Cambiar el signo del producto de los elementos no diagonales.','Omitir el término positivo procedente de los elementos uno y menos uno.','Confundir ceros de la primera fila con una fila completamente nula.'],[
['La primera fila permite desarrollar el determinante con un solo menor de orden dos.','det A=det matrix{λ,1;−1,λ}'],
['Restamos el producto de la diagonal secundaria, conservando su signo negativo.','det A=λ·λ−1·(−1)=λ²+1'],
['Una matriz cuadrada es invertible exactamente cuando su determinante no se anula.','A sin inversa ⇔ λ²+1=0'],
['El parámetro se considera real: ningún cuadrado real puede ser menos uno.','λ²≥0 ⇒ λ²+1≥1>0'],
['Por tanto no existe ningún valor real que haga singular la matriz.','A es invertible para todo λ∈ℝ'],
['Comprobamos directamente una fórmula de inversa válida para cualquier parámetro real.','A⁻¹=matrix{1,0,0;0,frac{λ}{λ²+1},−frac{1}{λ²+1};0,frac{1}{λ²+1},frac{λ}{λ²+1}}; AA⁻¹=I'],
]),mk(1,'X=matrix{0,frac{1}{2},frac{1}{2};1,frac{1}{2},−frac{1}{2};−1,frac{1}{2},−frac{1}{2}}.',[
'X=matrix{0,−1,1;frac{1}{2},−frac{1}{2},−frac{1}{2};frac{1}{2},frac{1}{2},frac{1}{2}}.',
'X=matrix{0,0,1;1,0,0;0,1,0}.',
'X=matrix{0,−1,1;1,1,1;−1,1,1}.'],['Conjugar por A⁻¹ en vez de por A.','Cancelar matrices que no son contiguas y suponer X=B.','Multiplicar por A a la derecha en vez de por su inversa.'],[
['Sustituimos el parámetro y escribimos la inversa usando el menor de determinante dos.','A=matrix{1,0,0;0,1,1;0,−1,1}; A⁻¹=matrix{1,0,0;0,frac{1}{2},−frac{1}{2};0,frac{1}{2},frac{1}{2}}'],
['Multiplicamos a la izquierda por A. No cambiamos el orden de los factores.','A⁻¹XA=B ⇒ XA=AB'],
['Multiplicamos ahora a la derecha por A⁻¹ para aislar la incógnita.','X=ABA⁻¹'],
['Calculamos primero el producto de las matrices conocidas.','AB=matrix{0,0,1;1,1,0;−1,1,0}'],
['Multiplicamos fila por columna por la inversa y obtenemos todas las entradas.','X=matrix{0,frac{1}{2},frac{1}{2};1,frac{1}{2},−frac{1}{2};−1,frac{1}{2},−frac{1}{2}}'],
['Verificamos la ecuación original, no solo el despeje. La invertibilidad de A garantiza unicidad.','A⁻¹XA=matrix{0,0,1;1,0,0;0,1,0}=B'],
])];
case 895:return[mk(0,'a=e⁻².', ['a=e².','a=e^(−√2).','a=e⁻⁴.'],['Elegir la raíz positiva del logaritmo ignorando 0<a<1.','Omitir el factor uno medio de la primitiva.','No extraer la raíz cuadrada al resolver la ecuación.'],[
['La integral es propia porque todo su intervalo está contenido en los números positivos. El cambio natural es el logaritmo.','u=ln x; du=frac{dx}{x}'],
['Integramos el producto del logaritmo y su derivada.','∫frac{ln x}{x}dx=frac{(ln x)²}{2}+C'],
['Evaluamos respetando que el extremo superior es uno y el inferior es a.','∫_a^1 frac{ln x}{x}dx=0−frac{(ln a)²}{2}'],
['Imponemos la ecuación pedida y despejamos el cuadrado.','−frac{(ln a)²}{2}+2=0 ⇒ (ln a)²=4'],
['La condición a menor que uno obliga a que su logaritmo sea negativo.','ln a=−2 ⇒ a=e⁻²'],
['Sustituimos y comprobamos el dominio; la otra raíz queda fuera del intervalo solicitado.','0<e⁻²≈0,135335<1; −frac{(−2)²}{2}+2=0'],
])];
case 898:return[mk(0,'a=frac{1}{3}.',['a=1.','a=frac{1}{9}.','a=frac{2}{3}.'],['Olvidar el factor tres de la exponencial al integrar.','Confundir el valor del área con el extremo del intervalo.','Duplicar el extremo al aplicar incorrectamente integración por partes.'],[
['La función se anula en el origen y es positiva para x>0. El recinto pedido se extiende desde cero hasta a.','S(a)=∫₀ᵃxe³ˣdx, a>0'],
['Integramos por partes eligiendo el factor polinómico como u.','u=x; dv=e³ˣdx; du=dx; v=frac{e³ˣ}{3}'],
['Completamos la integración sin omitir la segunda división por tres.','H(x)=frac{xe³ˣ}{3}−frac{e³ˣ}{9}=frac{(3x−1)e³ˣ}{9}'],
['Evaluamos ambos extremos e igualamos al área dada.','S(a)=frac{(3a−1)e³ᵃ+1}{9}=frac{1}{9}'],
['La exponencial nunca es cero, por lo que la ecuación se reduce a un factor lineal.','(3a−1)e³ᵃ=0 ⇒ a=frac{1}{3}'],
['Comprobamos la primitiva por derivación y el área mediante cuadratura. La figura muestra el recinto real.','H′(x)=xe³ˣ; S(frac{1}{3})=frac{1}{9}; S′(a)=ae³ᵃ>0 ⇒ solución única'],
],true)];
case 902:return[mk(0,'Base=4 cm y altura=1 cm; perímetro máximo=10 cm.',[
'Base=2 cm y altura=2 cm; perímetro máximo=8 cm.',
'Base=√10 cm y altura=frac{√10}{2} cm; perímetro máximo=3√10 cm.',
'Base=4√5 cm y altura=√5 cm; perímetro máximo=10√5 cm.'],['Confundir el papel de la semibase y de la altura en el perímetro.','Maximizar el área en lugar del perímetro.','Leer cinco como radio en lugar del radical √5 acreditado en el PDF.'],[
['Los dos vértices superiores tienen la misma altura y pertenecen a la semicircunferencia: sus abscisas son opuestas. Llamamos t a la semibase e y a la altura.','t²+y²=5; y=√(5−t²); 0≤t≤√5'],
['La base completa es dos veces t; el perímetro suma dos bases y dos alturas.','P(t)=4t+2√(5−t²)'],
['Derivamos en el interior del intervalo e igualamos a cero.','P′(t)=4−frac{2t}{√(5−t²)}=0 ⇒ 2√(5−t²)=t'],
['Ambos lados son no negativos; elevar al cuadrado no introduce soluciones negativas.','4(5−t²)=t² ⇒ t²=4 ⇒ t=2; y=1'],
['Recuperamos las dimensiones y justificamos que es un máximo, no un mínimo.','base=4; altura=1; P=10; P″(t)=−frac{10}{(5−t²)^(3/2)}<0'],
['Comprobamos pertenencia a la semicircunferencia y extremos degenerados. La figura conserva el radio oficial.','2²+1²=5; P(0)=2√5<10; P(√5)=4√5<10'],
],true)];
case 904:return[mk(0,'Área=frac{21}{2} u².',['Área=21 u².','Área=10 u².','Área=frac{√41}{2} u².'],['Olvidar dividir el módulo del producto vectorial entre dos.','Calcular solo la proyección del triángulo sobre el plano horizontal.','Omitir la componente veinte del producto vectorial.'],[
['Hallamos cada intersección anulando las otras dos coordenadas.','A=(−5,0,0); B=(0,−4,0); C=(0,0,1)'],
['Tomamos dos lados que parten del mismo vértice.','AB=(5,−4,0); AC=(5,0,1)'],
['El producto vectorial da un vector perpendicular cuyo módulo es el área del paralelogramo.','AB×AC=(−4,−5,20)'],
['Calculamos su módulo conservando las tres componentes.','|AB×AC|=√(16+25+400)=√441=21'],
['El triángulo ocupa la mitad del paralelogramo generado por esos lados.','S=frac{|AB×AC|}{2}=frac{21}{2}'],
['Verificamos mediante el determinante de Gram, una fórmula independiente del producto vectorial desarrollado.','|AB|²=41; |AC|²=26; AB·AC=25; S=frac{√(41·26−25²)}{2}=frac{21}{2}'],
]),mk(1,'4x+5y−20z+44=0 y 4x+5y−20z−40=0.',[
'4x+5y−20z+40=0 y 4x+5y−20z−44=0.',
'4x+5y−20z+4=0 y 4x+5y−20z=0.',
'4x+5y−20z+62=0 y 4x+5y−20z−22=0.'],['Invertir el signo del valor del plano al evaluar el punto.','Omitir el módulo del vector normal en la distancia.','Medir distancia respecto del plano inicial en lugar del punto indicado.'],[
['Todos los planos paralelos tienen un vector normal proporcional al original. Fijamos el mismo normal y variamos la constante.','π_d: 4x+5y−20z+d=0; n=(4,5,−20)'],
['Calculamos el módulo del normal.','|n|=√(4²+5²+20²)=21'],
['Aplicamos la fórmula de distancia del punto al plano.','d(P,π_d)=frac{|4·2+5·2−20·1+d|}{21}=frac{|d−2|}{21}'],
['Imponemos distancia dos y resolvemos las dos posibilidades del valor absoluto.','|d−2|=42 ⇒ d−2=42 o d−2=−42'],
['Obtenemos los dos planos, uno a cada lado del punto en la dirección normal.','d=44 o d=−40; π₁:4x+5y−20z+44=0; π₂:4x+5y−20z−40=0'],
['Sustituimos cada constante para comprobar la distancia exacta.','frac{|44−2|}{21}=2; frac{|−40−2|}{21}=2'],
])];
case 905:return[mk(0,'a=1 y b=4.',['a=1 y b=2.','a=2 y b=6.','a=frac{1}{2} y b=3.'],['Usar la ordenada como b sin dividir por el denominador.','Imponer solo el paso por el punto con un a incorrecto.','Derivar la potencia cuarta con un factor incorrecto y usar únicamente la condición de valor.'],[
['Pertenecer a la gráfica y ser punto crítico son dos condiciones independientes.','f(1)=2; f′(1)=0'],
['Sustituimos la primera coordenada en la función.','frac{b}{1+a}=2 ⇒ b=2(1+a)'],
['Derivamos mediante la regla del cociente. El denominador es positivo porque a>0.','f′(x)=frac{2bx(1+ax⁴)−bx²·4ax³}{(1+ax⁴)²}'],
['Simplificamos y evaluamos la condición crítica.','f′(x)=frac{2bx(1−ax⁴)}{(1+ax⁴)²}; f′(1)=frac{2b(1−a)}{(1+a)²}=0'],
['Como b es positivo, la única posibilidad es que se anule uno menos a. Recuperamos b.','a=1; b=2(1+1)=4'],
['Comprobamos en las dos condiciones originales y en las restricciones de positividad.','f(1)=frac{4}{2}=2; f′(1)=0; a>0, b>0'],
])];
case 907:return[mk(0,'Refrescos: 127,20 €; cerveza: 179,20 €; vino: 286,00 € (impuestos incluidos).',[
'Refrescos: 120,00 €; cerveza: 160,00 €; vino: 220,00 € (impuestos incluidos).',
'Refrescos: 7,20 €; cerveza: 19,20 €; vino: 66,00 € (impuestos incluidos).',
'Refrescos: 179,20 €; cerveza: 127,20 €; vino: 286,00 € (impuestos incluidos).'],['Dar bases imponibles cuando se preguntan importes finales.','Dar únicamente las cuotas de impuesto en vez de sumar cada cuota a su base.','Intercambiar los importes de refrescos y cerveza al presentar el resultado.'],[
['Definimos r, c y v como importes sin impuestos. Traducimos la compra y la diferencia del vino.','r+c+v=500; v=r+c−60'],
['Sustituimos la segunda ecuación en la primera para separar el vino del resto.','2(r+c)−60=500 ⇒ r+c=280; v=220'],
['La diferencia entre la factura y las bases es la suma de cuotas fiscales.','0,06r+0,12c+0,30v=592,4−500=92,4'],
['Sustituimos el vino y resolvemos el sistema de dos ecuaciones.','0,06r+0,12c=26,4 ⇒ r+2c=440; con r+c=280: c=160, r=120'],
['Calculamos los importes que solicita el ejercicio, incluyendo el impuesto propio de cada bebida.','refrescos=1,06·120=127,20; cerveza=1,12·160=179,20; vino=1,30·220=286,00'],
['Verificamos factura completa, suma de bases y diferencia original.','127,20+179,20+286=592,40; 120+160+220=500; 120+160−220=60'],
])];
case 909:return[mk(0,'Lado junto a la carretera: frac{150}{11} m; lado perpendicular: 75 m.',[
'Lado junto a la carretera: 15 m; lado perpendicular: 75 m.',
'Lado junto a la carretera: 75 m; lado perpendicular: frac{150}{11} m.',
'Lado junto a la carretera: frac{30}{11} m; lado perpendicular: 135 m.'],['No contabilizar el lado opuesto a la carretera en el coste de la base.','Intercambiar dimensiones aunque el precio depende de la orientación.','Usar una abscisa que cumple el presupuesto pero no anula la derivada del área.'],[
['Llamamos x al lado paralelo a la carretera e y al perpendicular. También hay que pagar el lado opuesto a la carretera.','coste=100x+10x+2·10y=110x+20y=3000'],
['Despejamos una dimensión y fijamos el intervalo que produce longitudes no negativas.','y=150−frac{11}{2}x; 0≤x≤frac{300}{11}'],
['Expresamos el área como función de una sola variable.','A(x)=xy=150x−frac{11}{2}x²'],
['Derivamos y localizamos el punto crítico interior.','A′(x)=150−11x=0 ⇒ x=frac{150}{11}'],
['Recuperamos la segunda dimensión y justificamos el máximo mediante concavidad y extremos.','y=75; A″(x)=−11<0; A(0)=A(frac{300}{11})=0'],
['Comprobamos presupuesto y área máxima sin intercambiar la orientación de los lados.','110·frac{150}{11}+20·75=3000; A_max=frac{11250}{11} m²≈1022,7273 m²'],
])];default:throw Error('Unknown conjugation-semicircle-cost case');}}
export function buildConjugationSemicycleCostBatch(id='batch-0448',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=({1:'Matrices y sistemas',2:'Estudio de funciones y optimización',3:'Primitivas y áreas',4:'Geometría del espacio'})[c.slot];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.secondaryTopics=[898,902].includes(c.index)?['Representación gráfica']:[];x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_CONJUGATION_SEMICYCLE_COST'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildConjugationSemicycleCostBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0448-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0448.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
