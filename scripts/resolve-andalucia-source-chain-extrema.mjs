import fs from'node:fs';import{pathToFileURL}from'node:url';import{buildBatch}from'./resolve-andalucia-inference-2012.mjs';import{officialParts,part}from'./resolve-andalucia-inference-multipart.mjs';
export const observations=[
[971,'4b8884e307df4f5ddaf079e0f10be3d3f74d4793874eb03b355d34f4856579cb',2,'B.2','62857799aa14844cb24da8e0af2de39b4a13cabe6bb6cf7fadb9cae5c1d944d2',0],
[973,'57a94794707b1b7875c44400a89e0e02d964c61659e3e0531c40ff634f78104c',1,'A.1','1c4a5527c1b4f8a39a9b0ee74dc5f93f12753034bf5ea585df2ea163aa7288ca',0],
[974,'c70ed065da193c82dd0a02fb4c05069415b0adf53d0f49bba1b0375a19823566',1,'A.2','5ef505f97e1ea14427f8b166c64e400b9e140ff10fa78a4fc8492ad3a1967501',0],
[976,'aebcbfddd4d5db5f5a10b4662e9e12b2ee362bbf574b751bccd6d78594766ad3',1,'A.2','3042a361409c21513de1e97d2b7de9b1736f6eec26c0b99e7f0d5d55b1e55a28',0]];
export const statements={971:'a) Calcule la derivada de las funciones f(x)=e^{5x}·(x²−5)³ y g(x)=frac{(x³+1)²}{ln(x²+2)}.\nb) Obtenga la ecuación de la recta tangente a la gráfica de la función h(x)=frac{x+10}{x+5}, en el punto de abscisa x=0.',973:'Considera la función f:ℝ→ℝ definida por f(x)=frac{1}{eˣ+e^{−x}}.\na) Estudia y halla los máximos y mínimos absolutos de f (abscisas donde se obtienen y valores que se alcanzan).\nb) Calcula lim_{x→+∞}(x²f(x)).',974:'a) Calcule la función derivada de f(x)=frac{e^{−2x}}{(−x²+2)²}.\nb) Se sabe que la expresión que representa el número medio de clientes N(t) que acude un día a una cadena de almacenes, en función del número de horas t que llevan abiertos, es N(t)=a·t²+b·t, 0≤t≤8, a,b∈ℝ. Sabiendo que el máximo de clientes que han acudido ese día ha sido de 160 y que se ha producido a las 4 horas de abrir, calcule a y b.',976:'Sea la función f(x)=cases{−x+4 si x<2;frac{4}{x} si 2≤x<4;x²−4x+1 si x≥4}.\na) Estudie la continuidad y la derivabilidad de f.\nb) Determine los extremos locales de f.\nc) Calcule la ecuación de la recta tangente a la gráfica de la función en el punto de abscisa x=3.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_CHAIN_EXTREMA_SOURCE_LAYOUT']]:[];
export const cases=[{index:971,slot:3,literals:['Calcule la derivada','x +10']},{index:973,slot:2,literals:['máximos y mínimos absolutos','x2f (x)'],subject:'mates'},{index:974,slot:3,literals:['160','4 horas']},{index:976,slot:3,literals:['extremos locales','x = 3']}];
export const derivatives={f971:x=>Math.exp(5*x)*(x*x-5)**2*(5*(x*x-5)+6*x),g971:x=>{const l=Math.log(x*x+2);return(6*x*x*(x**3+1)*l-2*x*(x**3+1)**2/(x*x+2))/(l*l);},f974:x=>2*Math.exp(-2*x)*(x*x+2*x-2)/(2-x*x)**3};
export const proof=c=>({971:{h0:2,slope:-1/5,domainF:'R',domainG:'R',chainFactors:[5,6,2]},973:{critical:0,maximum:.5,minimum:null,infimum:0,limit:0},974:{excluded:[-Math.sqrt(2),Math.sqrt(2)],coefficients:[-10,80],maximum:160,time:4},976:{joins:[2,4],values:[2,1],leftDerivatives:[-1,-.25],rightDerivatives:[-1,4],minimum:[4,1],tangent:[-4/9,8/3]}}[c.index]);
const f971='e^{5x}(x²−5)²[5(x²−5)+6x]',g971='frac{6x²(x³+1)ln(x²+2)−frac{2x(x³+1)²}{x²+2}}{[ln(x²+2)]²}';
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'INDEPENDENT_DIFFERENTIATION_LIMITS_AND_ORIGINAL_CONDITIONS',proof(c));switch(c.index){
case 971:return[mk(0,`f′(x)=${f971}; g′(x)=${g971}.`,[`f′(x)=e^{5x}(x²−5)²[(x²−5)+6x]; g′(x)=${g971}.`,`f′(x)=${f971}; g′(x)=frac{6x²(x³+1)ln(x²+2)+frac{2x(x³+1)²}{x²+2}}{[ln(x²+2)]²}.`,`f′(x)=${f971}; g′(x)=frac{6x²(x³+1)ln(x²+2)−2x(x³+1)²}{[ln(x²+2)]²}.`],['Omitir el factor cinco de la derivada de e elevado a 5x.','Sumar en lugar de restar el segundo término del cociente.','Omitir el denominador x²+2 al derivar el logaritmo.'],[
['Ambas funciones están definidas en todo ℝ; el argumento logarítmico es al menos dos y su logaritmo no se anula.','x²+2≥2 ⇒ ln(x²+2)>0'],
['Para f usamos producto y cadena, indicando los dos factores derivados.','(e^{5x})′=5e^{5x}; ((x²−5)³)′=3(x²−5)²·2x=6x(x²−5)²'],
['Sumamos las dos contribuciones y extraemos el factor común.','f′=5e^{5x}(x²−5)³+6xe^{5x}(x²−5)²='+f971],
['Para g identificamos numerador, denominador y sus derivadas completas.','u=(x³+1)²; u′=6x²(x³+1); v=ln(x²+2); v′=frac{2x}{x²+2}'],
['Aplicamos el cociente, conservando la resta y el cuadrado del denominador.','g′=frac{u′v−uv′}{v²}='+g971],
['Como control, la derivación numérica de las funciones originales coincide; en cero también podemos evaluar las fórmulas directamente.','f′(0)=−625; g′(0)=0'],
]),mk(1,'y=−frac{1}{5}x+2.',['y=frac{1}{5}x+2.','y=−frac{1}{5}x+10.','y=−frac{1}{25}x+2.'],['Cambiar el signo del cociente derivado.','Usar el numerador como ordenada y omitir el denominador.','Omitir el factor cinco del numerador derivado.'],[
['La tangente debe pasar por el punto de la curva con abscisa cero.','h(0)=frac{10}{5}=2 ⇒ P=(0,2)'],
['Derivamos el cociente restando los productos cruzados.','h′(x)=frac{(x+5)−(x+10)}{(x+5)²}=−frac{5}{(x+5)²}'],
['Evaluamos la pendiente en el punto dado.','m=h′(0)=−frac{5}{25}=−frac{1}{5}'],
['Usamos la ecuación punto-pendiente.','y−2=−frac{1}{5}(x−0)'],
['Despejamos y para obtener la forma explícita.','y=−frac{1}{5}x+2'],
['Comprobamos por separado el punto y la pendiente; ambas condiciones son necesarias.','y(0)=2=h(0); pendiente=−frac{1}{5}=h′(0)'],
])];
case 973:return[mk(0,'Máximo absoluto f(0)=frac{1}{2}; no existe mínimo absoluto (ínfimo 0).',['Mínimo absoluto f(0)=frac{1}{2}; no existe máximo absoluto.','Máximo absoluto f(0)=frac{1}{2}; mínimo absoluto 0 alcanzado en un punto real.','Máximo absoluto f(0)=1; no existe mínimo absoluto (ínfimo 0).'],['Invertir el signo de la derivada del recíproco.','Confundir el límite en infinito con un valor alcanzado.','Olvidar sumar las dos exponenciales en cero.'],[
['Las exponenciales son positivas y el denominador nunca se anula.','Dom f=ℝ; f(x)>0'],
['Derivamos el recíproco aplicando también la cadena a e elevado a −x.','f′(x)=frac{e^{−x}−eˣ}{(eˣ+e^{−x})²}'],
['El único punto crítico se obtiene igualando las exponenciales; el denominador siempre es positivo.','e^{−x}=eˣ ⇒ e^{2x}=1 ⇒ x=0'],
['El signo de la derivada demuestra crecimiento antes de cero y decrecimiento después.','x<0: f′>0; x>0: f′<0 ⇒ máximo absoluto f(0)=frac{1}{2}'],
['En ambos extremos infinitos la función tiende a cero, sin alcanzarlo para ningún número real.','lim_{x→+∞}f(x)=0; lim_{x→−∞}f(x)=0; f(x)≠0'],
['Concluimos que no hay mínimo absoluto; además eˣ+e^{−x}≥2 verifica independientemente la cota superior.','0<f(x)≤frac{1}{2}; ínfimo=0, no alcanzado'],
]),mk(1,'El límite es 0.',['El límite es +∞.','El límite es frac{1}{2}.','El límite es 1.'],['Suponer que el polinomio domina a la exponencial.','Sustituir el máximo de f en una expresión evaluada en infinito.','Tratar crecimientos exponencial y cuadrático como del mismo orden.'],[
['Escribimos el producto como un cociente con las funciones originales.','L=lim_{x→+∞}frac{x²}{eˣ+e^{−x}}'],
['Numerador y denominador tienden a infinito y son derivables; para x>0 el denominador derivado no se anula.','∞/∞; (eˣ+e^{−x})′=eˣ−e^{−x}>0'],
['Aplicamos la regla de L’Hôpital una primera vez.','L=lim_{x→+∞}frac{2x}{eˣ−e^{−x}}'],
['Persiste la forma infinito entre infinito y la segunda derivada del denominador es positiva.','L=lim_{x→+∞}frac{2}{eˣ+e^{−x}}=0'],
['Una comprobación independiente usa comparación con una sola exponencial.','0≤frac{x²}{eˣ+e^{−x}}≤frac{x²}{eˣ}→0'],
['Ambas vías coinciden: el crecimiento exponencial hace que el producto tienda a cero.','L=0'],
])];
case 974:return[mk(0,'f′(x)=frac{2e^{−2x}(x²+2x−2)}{(2−x²)³}, x≠±√2.',['f′(x)=−frac{2e^{−2x}(x²+2x−2)}{(2−x²)³}, x≠±√2.','f′(x)=frac{e^{−2x}(x²+2x−2)}{(2−x²)³}, x≠±√2.','f′(x)=frac{2e^{−2x}(x²−2x−2)}{(2−x²)³}, x≠±√2.'],['Cambiar globalmente el signo de la derivada.','Perder el factor común dos.','Cambiar el signo de la derivada del factor interior.'],[
['Escribimos la función como producto y excluimos los ceros del denominador.','f=e^{−2x}(2−x²)^{−2}; x≠±√2'],
['Derivamos la exponencial por la regla de la cadena.','(e^{−2x})′=−2e^{−2x}'],
['Derivamos la potencia negativa respetando los dos signos negativos.','((2−x²)^{−2})′=−2(2−x²)^{−3}(−2x)=4x(2−x²)^{−3}'],
['Aplicamos el producto, sin omitir ninguna contribución.','f′=−2e^{−2x}(2−x²)^{−2}+4xe^{−2x}(2−x²)^{−3}'],
['Ponemos denominador común y simplificamos el numerador.','f′=frac{e^{−2x}[−2(2−x²)+4x]}{(2−x²)³}=frac{2e^{−2x}(x²+2x−2)}{(2−x²)³}'],
['La comprobación por el cociente y por diferencias finitas da la misma expresión; verificamos un punto regular.','f′(0)=−frac{1}{2}'],
]),mk(1,'a=−10, b=80.',['a=−20, b=160.','a=10, b=−80.','a=−10, b=40.'],['Duplicar los coeficientes y con ello el máximo de clientes.','Cambiar la concavidad y producir un mínimo negativo.','Usar 2a+b=0 en lugar de 8a+b=0.'],[
['El máximo en t=4 es interior al intervalo de apertura, por lo que la derivada se anula.','N′(t)=2at+b; N′(4)=8a+b=0'],
['El valor máximo indicado proporciona una segunda ecuación.','N(4)=16a+4b=160'],
['Despejamos b en la primera condición y lo sustituimos.','b=−8a; 16a−32a=160'],
['Resolvemos el sistema y obtenemos ambos parámetros.','−16a=160 ⇒ a=−10; b=80'],
['La segunda derivada negativa y los extremos del intervalo confirman que es el máximo absoluto del día.','N″=−20<0; N(0)=N(8)=0; N(4)=160'],
['La forma de vértice comprueba de manera independiente la cota máxima y la hora en que se alcanza.','N(t)=160−10(t−4)²≤160, igualdad solo en t=4'],
])];
case 976:return[mk(0,'Continua en ℝ y derivable en ℝ∖{4}.',['Continua en ℝ y derivable en ℝ∖{2,4}.','Discontinua en x=4 y derivable en ℝ∖{4}.','Continua y derivable en todo ℝ.'],['Suponer que cualquier cambio de fórmula impide derivabilidad.','Confundir pendientes distintas con límites de la función distintos.','No comparar las derivadas laterales en cuatro.'],[
['El cociente solo se usa entre dos y cuatro; las fórmulas son regulares en el interior de cada tramo.','Dom f=ℝ; uniones x=2 y x=4'],
['Comprobamos los límites laterales en dos y el valor asignado.','lim_{x→2⁻}f=−2+4=2; lim_{x→2⁺}f=frac{4}{2}=2=f(2)'],
['Comprobamos los límites y el valor en cuatro.','lim_{x→4⁻}f=frac{4}{4}=1; lim_{x→4⁺}f=16−16+1=1=f(4)'],
['Derivamos las tres ramas interiores.','f′(x)=−1 si x<2; f′(x)=−frac{4}{x²} si 2<x<4; f′(x)=2x−4 si x>4'],
['Las pendientes coinciden en dos, pero no en cuatro.','f′₋(2)=−1=f′₊(2); f′₋(4)=−frac{1}{4}≠4=f′₊(4)'],
['Reunimos las conclusiones: una esquina no destruye la continuidad, aunque sí la derivabilidad.','f continua en ℝ; f derivable salvo en x=4'],
]),mk(1,'Único extremo local: mínimo en (4,1); no hay máximos locales.',['Único extremo local: mínimo en (2,2); no hay máximos locales.','Único extremo local: máximo en (4,1); no hay mínimos locales.','No hay extremos locales porque ninguna derivada válida se anula.'],['Usar el vértice de la rama cuadrática fuera del intervalo donde se aplica.','Invertir los signos de decrecimiento y crecimiento.','Olvidar que puede haber un extremo en una esquina.'],[
['En la primera rama la pendiente es negativa.','x<2 ⇒ f′=−1<0'],
['En la rama racional sigue siendo negativa, y la unión en dos no cambia la monotonía.','2<x<4 ⇒ f′=−frac{4}{x²}<0'],
['En la última rama la derivada es estrictamente positiva en su dominio interior.','x>4 ⇒ f′=2x−4>0'],
['Por continuidad y cambio de decreciente a creciente, cuatro es mínimo aunque no exista derivada allí.','f(4)=16−16+1=1 ⇒ mínimo local (4,1)'],
['No aparece ningún cambio de creciente a decreciente; tampoco hay otro punto crítico válido.','2x−4=0 ⇒ x=2, fuera de la rama x≥4'],
['La función decrece hasta cuatro y crece después; de hecho este mínimo es también absoluto.','f(x)≥1, con igualdad únicamente en x=4'],
]),mk(2,'y=−frac{4}{9}x+frac{8}{3}.',['y=frac{4}{9}x.','y=−frac{4}{9}x+frac{4}{3}.','y=−frac{4}{3}x+frac{16}{3}.'],['Cambiar el signo de la pendiente pero conservar el punto de contacto.','Usar la ordenada como término independiente sin la corrección punto-pendiente.','Derivar 4/x como −4/x, sin cuadrar el denominador.'],[
['Tres está en el interior de la rama racional; no usamos las otras fórmulas.','2<3<4 ⇒ f(x)=frac{4}{x} cerca de 3'],
['Calculamos el punto por el que debe pasar la tangente.','f(3)=frac{4}{3}; P=(3,frac{4}{3})'],
['La pendiente es el valor de la derivada de esa rama.','f′(x)=−frac{4}{x²}; m=f′(3)=−frac{4}{9}'],
['Aplicamos la forma punto-pendiente.','y−frac{4}{3}=−frac{4}{9}(x−3)'],
['Despejamos y, sumando correctamente los dos términos constantes.','y=−frac{4}{9}x+frac{4}{3}+frac{4}{3}=−frac{4}{9}x+frac{8}{3}'],
['Sustituimos la abscisa y comprobamos también la pendiente.','y(3)=−frac{4}{3}+frac{8}{3}=frac{4}{3}; m=−frac{4}{9}'],
])];default:throw Error('Unknown chain/extrema case');}}
export function buildSourceChainExtremaBatch(id='batch-0457',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.subject==='mates'?'Aplicaciones de derivadas':'Derivadas';x.secondaryTopics=c.subject==='mates'?['Límites y asíntotas']:['Continuidad'];x.block='Análisis';x.examSlot=c.slot;x[c.subject==='mates'?'matesEvidence':'calculusEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.subject==='mates'?'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE':'SOURCE_BOUND_CHAIN_RULE_AND_PIECEWISE_EXTREMA'};x.qualityGates.pedagogical='FULL_CHAIN_RULE_DOMAIN_AND_ORIGINAL_CONDITIONS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildSourceChainExtremaBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0457-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0457.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
