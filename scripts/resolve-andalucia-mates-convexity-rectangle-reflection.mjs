import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {graphs} from './resolve-andalucia-mates-source-areas.mjs';
export const observations=[
[873,'a23cb9ae7edcd859afee53690780388850c71ff86362f0faf67c5c9e78634241',1,'A.1','ff36ecb8dbb5678530f5cffaada33337fe7fe12bdea42ef87f9a72664950984d',0],
[874,'e9cdab8c67f3149fd8325f98321a2a7c369958dad473274c0c62f60db905ca7a',1,'A.2','80cd319ea8e48cdd06de8ba51478a1f45f3773d4c42733986ca2749ac2f59752',0],
[876,'a54a5b52abe3cf59c81e26bac758d93baa6dfdde0be1df1a3691c9a3436173cb',2,'B.2','6d7f1090c5237c82542a620eadef05716305c5b9af87b1ce98a1612eab4a267d',0],
[877,'56a7eeb2e214c74b9aeb92347d4b6f860225bb0221675c04e5335a48a645bb74',1,'A.3','857de32b5c2cfde0e0d596e2652eace7f7cdbee0e8405955a8016247265cae30',0],
[882,'2200f6e11bca8b324a64d95f8b6b31c9e91afe914d1b929d65031e64575e2395',1,'NONE.3','f5545537a2e686b33d120f692c16c051778b5d7fd1a73c3c35d2a5c49044f29a',0],
[886,'ced80d333d63057cef2e93eda07f0354ab91ecd5f58c11e8d6b7f388e08f5342',2,'B.2','9288f68771abf1fc8cf6b03cdb7d208a66a3d2917fae7acf92cfda8bdcb14d38',0],
[889,'ef4c082dc9a17eb27b09d51b09e1e41f1e7192efb6fd3b64b1b852471e928740',1,'NONE.4','9a983a6976a1f6eff443ed2769253b872451a8e46c7d74e25ad7f9cfb54e0f2f',0]];
export const statements={
873:'Sea la función f:ℝ→ℝ definida por f(x)=(x²+1)eˣ.\na) Calcula los intervalos de crecimiento y de decrecimiento de f.\nb) Determina los intervalos de concavidad y de convexidad de f y los puntos de inflexión de su gráfica (abscisas donde se obtienen y valores que alcanzan).',
874:'De entre todos los rectángulos con lados paralelos a los ejes de coordenadas, determina las dimensiones de aquel de área máxima que puede inscribirse en la región limitada por las gráficas de las funciones f, g:ℝ→ℝ, definidas por f(x)=4−frac{x²}{3} y g(x)=frac{x²}{6}−2.',
876:'Considera la función f dada por f(x)=5−x y la función g definida como g(x)=frac{4}{x} para x≠0.\na) Esboza el recinto limitado por las gráficas de f y g indicando sus puntos de corte.\nb) Calcula el área de dicho recinto.',
877:'Considera las siguientes matrices A=matrix{−1,2;0,1} y B=matrix{−3,0;2,−1}.\na) Calcula A⁻¹.\nb) Resuelve la ecuación matricial AXAᵀ−B=2I, donde I es la matriz identidad de orden 2 y Aᵀ es la matriz traspuesta de A.',
882:'Considera A=matrix{1,1,1;1,a,b;c,1,4}, B=matrix{1;1;1} y C=matrix{3;2;1}. Determina a, b y c, sabiendo que AB=C y la matriz A tiene rango 2.',
886:'Sea f la función definida por f(x)=x ln(x+1) para x>−1 (ln denota el logaritmo neperiano). Determina la primitiva de f cuya gráfica pasa por el punto (1,0).',
889:'Considera el punto P(1,0,−1) y la recta r: system{x−y+2z=5;x−z=1}.\na) Determina el punto simétrico de P respecto de la recta r.\nb) Calcula el punto de la recta r que dista √6 unidades de P.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_CONVEXITY_RECTANGLE_REFLECTION_LAYOUT']]:[];
export const cases=[{index:873,slot:2,literals:['(x2 + 1)ex','inflexión']},{index:874,slot:2,literals:['rectángulos','área máxima']},{index:876,slot:3,literals:['5−x','recinto']},{index:877,slot:1,literals:['AXAt','−3 0']},{index:882,slot:1,literals:['AB = C','rango 2']},{index:886,slot:3,literals:['x ln(x + 1)','(1, 0)']},{index:889,slot:4,literals:['P (1, 0, −1)','x − y + 2z = 5']}];
export const proof=c=>({873:{stationary:-1,secondRoots:[-3,-1],inflections:[[-3,10/Math.E**3],[-1,2/Math.E]]},874:{halfWidth:2,width:4,height:4,area:16,bottom:-4/3,top:8/3},876:{intersections:[[1,4],[4,1]],area:7.5-4*Math.log(4)},877:{A:[[-1,2],[0,1]],B:[[-3,0],[2,-1]],inverse:[[-1,2],[0,1]],X:[[-1,2],[0,1]]},882:{a:8/13,b:5/13,c:-4,rank:2,minor:5},886:{F1:0,constant:-.25},889:{Q:[1,-4,0],direction:[1,3,1],foot:[2,-1,1],reflection:[3,-2,3],distanceSquared:6}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s,visual=false)=>{const p=part(ps[i],a,d,e,s,'INDEPENDENT_DERIVATIVE_QUADRATURE_MATRIX_AND_PROJECTION_CHECKS',proof(c));if(visual)p.visual=structuredClone(graphs[c.index]);return p;};switch(c.index){
case 873:return[mk(0,'f es estrictamente creciente en ℝ; no tiene intervalos de decrecimiento.',[
'f crece en (−1,+∞) y decrece en (−∞,−1).',
'f crece en (−∞,−1) y decrece en (−1,+∞).',
'f crece en (−∞,−3) y (−1,+∞), y decrece en (−3,−1).'],['Confundir una raíz doble de la derivada con cambio de signo.','Invertir el signo de la derivada a ambos lados de su raíz.','Utilizar el signo de la segunda derivada para estudiar crecimiento.'],[
['Aplicamos la regla del producto, derivando tanto el polinomio como la exponencial.','f′(x)=2xeˣ+(x²+1)eˣ'],
['Extraemos el factor positivo y factorizamos el polinomio.','f′(x)=eˣ(x²+2x+1)=eˣ(x+1)²'],
['La exponencial es positiva para cualquier número real y el cuadrado solo se anula en menos uno.','f′(−1)=0; f′(x)>0 si x≠−1'],
['La tabla de signos no cambia al pasar por el punto estacionario.','(−∞,−1): +; x=−1: 0; (−1,+∞): +'],
['La función crece a ambos lados y es continua en el punto de unión. No es constante en ningún intervalo.','f es estrictamente creciente en ℝ; no decrece en ningún intervalo'],
['Comprobamos que una derivada nula aislada no constituye un extremo: los valores siguen aumentando al atravesarla.','f(−2)=frac{5}{e²}<f(−1)=frac{2}{e}<f(0)=1; no hay máximo ni mínimo en x=−1'],
]),mk(1,'Convexa (∪) en (−∞,−3) y (−1,+∞); cóncava (∩) en (−3,−1). Inflexiones: (−3,10/e³) y (−1,2/e).',[
'Convexa (∪) en (−3,−1); cóncava (∩) en (−∞,−3) y (−1,+∞). Inflexiones: (−3,10/e³) y (−1,2/e).',
'Convexa (∪) en (−∞,−3) y (−1,+∞); cóncava (∩) en (−3,−1). Inflexiones: (−3,9/e³) y (−1,1/e).',
'Convexa (∪) en (−∞,−1) y (−1,+∞); sin intervalos cóncavos (∩). No hay inflexiones.'],['Intercambiar la concavidad asociada al signo de la segunda derivada.','Omitir el uno en el polinomio al evaluar las ordenadas.','Volver a estudiar f′ en lugar de f″.'],[
['Derivamos la expresión factorizada de la primera derivada.','f″(x)=eˣ(x+1)²+2eˣ(x+1)'],
['Factorizamos para localizar los posibles cambios de concavidad.','f″(x)=eˣ(x+1)(x+3); raíces x=−3 y x=−1'],
['Construimos la tabla de signos; la exponencial no altera ninguno.','x<−3: +; −3<x<−1: −; x>−1: +'],
['Especificamos la orientación gráfica para evitar ambigüedad terminológica.','f″>0: convexa hacia arriba (∪); f″<0: cóncava hacia abajo (∩)'],
['En ambas raíces hay cambio de signo. Evaluamos la función original, no sus derivadas.','f(−3)=(9+1)e⁻³=frac{10}{e³}; f(−1)=(1+1)e⁻¹=frac{2}{e}'],
['La continuidad de f y los cambios de signo confirman las dos inflexiones con sus coordenadas completas.','I₁=(−3,frac{10}{e³}); I₂=(−1,frac{2}{e})'],
])];
case 874:return[mk(0,'Base=4 u y altura=4 u; área máxima=16 u².',[
'Base=2 u y altura=4 u; área máxima=8 u².',
'Base=4 u y altura=6 u; área máxima=24 u².',
'Base=2√6 u y altura=3 u; área máxima=6√6 u².'],['Confundir la semibase con la base completa.','Usar la separación de las parábolas en el origen para los vértices laterales.','Usar un coeficiente cúbico incorrecto al derivar el área.'],[
['Los puntos de corte delimitan la región. La separación vertical es no negativa entre ellos.','4−frac{x²}{3}=frac{x²}{6}−2 ⇒ x=±2√3; f(x)−g(x)=6−frac{x²}{2}'],
['Justificamos la simetría, no la suponemos: si r es el mayor valor absoluto de las abscisas laterales, la base no supera 2r y la altura no supera f(r)−g(r). Un rectángulo centrado alcanza ambas cotas.','0≤r≤2√3; base≤2r; altura≤6−frac{r²}{2}; A≤2r(6−frac{r²}{2})'],
['Tomamos la semibase t del rectángulo centrado y expresamos su área con una sola variable.','A(t)=12t−t³, 0≤t≤2√3'],
['Derivamos y estudiamos el signo para localizar el máximo.','A′(t)=12−3t²; A′>0 en (0,2), A′<0 en (2,2√3) ⇒ t=2'],
['Recuperamos las dimensiones completas y las alturas de los lados horizontales.','base=2t=4; f(2)=frac{8}{3}; g(2)=−frac{4}{3}; altura=4'],
['Comprobamos extremos y pertenencia de los cuatro vértices a las parábolas. La figura muestra el rectángulo óptimo dentro del recinto.','A(0)=A(2√3)=0; A(2)=16; vértices (±2,frac{8}{3}), (±2,−frac{4}{3})'],
],true)];
case 876:return[mk(0,'Cortes (1,4) y (4,1); recinto 1≤x≤4, 4/x≤y≤5−x.',[
'Cortes (1,4) y (4,1); recinto 1≤x≤4, 5−x≤y≤4/x.',
'Cortes (−1,6) y (4,1); recinto −1≤x≤4, 4/x≤y≤5−x.',
'Cortes (1,4) y (5,0); recinto 1≤x≤5, 4/x≤y≤5−x.'],['Invertir curva superior e inferior.','Cambiar el signo de una raíz al factorizar la ecuación de corte.','Usar el corte de la recta con el eje como intersección con la hipérbola.'],[
['Igualamos las funciones respetando que x no puede ser cero.','5−x=frac{4}{x} ⇒ x²−5x+4=0'],
['Factorizamos y obtenemos las dos abscisas de intersección.','(x−1)(x−4)=0 ⇒ x=1 o x=4'],
['Sustituimos en cualquiera de las dos funciones para obtener las ordenadas.','f(1)=g(1)=4; f(4)=g(4)=1'],
['En el intervalo entre los cortes identificamos la curva superior por el signo de la diferencia.','f(x)−g(x)=−frac{(x−1)(x−4)}{x}≥0 si 1≤x≤4'],
['El esbozo adjunto muestra la recta, la rama positiva de la hipérbola y el recinto cerrado entre ambas. La rama negativa no tiene intersecciones con la recta.','Recinto: 1≤x≤4, frac{4}{x}≤y≤5−x'],
['Comprobamos un corte y un punto interior para confirmar el orden vertical.','x=4: 1=1; x=2: g(2)=2<f(2)=3'],
],true),mk(1,'Área=frac{15}{2}−4ln(4) u².',[
'Área=frac{15}{2}+4ln(4) u².',
'Área=frac{15}{2}−4ln(3) u².',
'Área=15−8ln(4) u².'],['Sumar la integral de la curva inferior en vez de restarla.','Sustituir la diferencia de logaritmos por el logaritmo de la diferencia.','Duplicar el área suponiendo una simetría inexistente.'],[
['El área se obtiene integrando curva superior menos inferior entre las dos intersecciones.','S=∫₁⁴(5−x−frac{4}{x})dx'],
['Integramos término a término; todo el intervalo está en x>0.','H(x)=5x−frac{x²}{2}−4ln x'],
['Evaluamos el extremo superior.','H(4)=20−8−4ln4=12−4ln4'],
['Evaluamos el extremo inferior y efectuamos la resta completa.','H(1)=5−frac{1}{2}−4ln1=frac{9}{2}; S=frac{15}{2}−4ln4'],
['Comprobamos derivando la primitiva empleada.','H′(x)=5−x−frac{4}{x}=f(x)−g(x)'],
['El valor es positivo y coincide con una cuadratura independiente del recinto sombreado.','S≈1,954823 u²'],
],true)];
case 877:return[mk(0,'A⁻¹=matrix{−1,2;0,1}.',[
'A⁻¹=matrix{1,−2;0,−1}.',
'A⁻¹=matrix{−1,−2;0,1}.',
'A⁻¹=matrix{−1,0;2,1}.'],['Olvidar dividir la adjunta por el determinante negativo.','Conservar un signo incorrecto fuera de la diagonal.','Confundir la inversa con la traspuesta.'],[
['Calculamos el determinante para asegurar que la inversa existe.','det A=(−1)·1−2·0=−1≠0'],
['Usamos la fórmula de la inversa de una matriz de orden dos.','matrix{a,b;c,d}⁻¹=frac{1}{ad−bc}matrix{d,−b;−c,a}'],
['Sustituimos sin perder el signo del factor exterior.','A⁻¹=−matrix{1,−2;0,−1}'],
['Multiplicamos todas las entradas por menos uno.','A⁻¹=matrix{−1,2;0,1}=A'],
['Comprobamos el producto, incluidas las entradas no diagonales.','AA⁻¹=matrix{1,−2+2;0,1}=I'],
['Como la inversa coincide con A, la comprobación en el otro orden también da la identidad.','A⁻¹A=A²=I'],
]),mk(1,'X=matrix{−1,2;0,1}.',[
'X=matrix{−1,0;2,1}.',
'X=matrix{1,−2;0,−1}.',
'X=matrix{−5,12;−2,5}.'],['Omitir los factores inversos al despejar X.','Introducir un signo menos al trasladar B.','Usar A a la derecha en vez de la inversa de su traspuesta.'],[
['Trasladamos B y obtenemos la matriz del segundo miembro.','AXAᵀ=B+2I=matrix{−1,0;2,1}'],
['Despejamos multiplicando por la izquierda y por la derecha en el orden correcto.','X=A⁻¹(B+2I)(Aᵀ)⁻¹'],
['La inversa de la traspuesta es la traspuesta de la inversa; usamos el apartado anterior.','A⁻¹=A; (Aᵀ)⁻¹=Aᵀ'],
['Calculamos primero el producto de la izquierda.','A(B+2I)=matrix{5,2;2,1}'],
['Multiplicamos a continuación por la traspuesta.','X=matrix{5,2;2,1}matrix{−1,0;2,1}=matrix{−1,2;0,1}'],
['Sustituimos en la ecuación original, usando A²=I.','AXAᵀ−B=Aᵀ−B=matrix{2,0;0,2}=2I'],
])];
case 882:return[mk(0,'a=frac{8}{13}, b=frac{5}{13}, c=−4.',[
'a=frac{5}{13}, b=frac{8}{13}, c=−4.',
'a=frac{8}{13}, b=frac{5}{13}, c=4.',
'a=frac{3}{8}, b=frac{5}{8}, c=−4.'],['Intercambiar los parámetros de la segunda fila.','Cambiar el signo al despejar la tercera fila del producto.','Omitir el término que contiene b al desarrollar el determinante.'],[
['El producto por la columna de unos suma las entradas de cada fila.','AB=matrix{3;1+a+b;c+5}=matrix{3;2;1}'],
['Igualamos las dos filas que aportan restricciones.','a+b=1; c=−4'],
['Para que el rango no sea tres imponemos determinante nulo y lo desarrollamos por la primera fila.','det A=(4a−b)−(4+4b)+(1+4a)=8a−5b−3'],
['Sustituimos b=1−a en esa condición.','8a−5(1−a)−3=0 ⇒ 13a−8=0 ⇒ a=frac{8}{13}'],
['Recuperamos b y comprobamos que el rango es exactamente dos mediante un menor no nulo.','b=frac{5}{13}; det matrix{1,1;−4,1}=5≠0 ⇒ rango A=2'],
['Verificamos de forma independiente tanto el producto como el determinante.','1+frac{8}{13}+frac{5}{13}=2; −4+1+4=1; frac{64}{13}−frac{25}{13}−3=0'],
])];
case 886:return[mk(0,'F(x)=frac{x²−1}{2}ln(x+1)−frac{(x−1)²}{4}, x>−1.',[
'F(x)=frac{x²−1}{2}ln(x+1)−frac{x²}{4}+frac{x}{2}, x>−1.',
'F(x)=frac{x²}{2}ln(x+1)−frac{ln2}{2}, x>−1.',
'F(x)=frac{x²+1}{2}ln(x+1)−frac{x²}{4}+frac{x}{2}−frac{1}{4}−ln2, x>−1.'],['Olvidar fijar la constante con el punto dado.','Omitir la integral restante en la integración por partes.','Cambiar el signo del término logarítmico obtenido mediante división.'],[
['Usamos integración por partes, eligiendo el logaritmo como función a derivar.','u=ln(x+1), dv=x dx; du=frac{dx}{x+1}, v=frac{x²}{2}'],
['Aplicamos la fórmula y dividimos el cociente racional que queda.','∫x ln(x+1)dx=frac{x²}{2}ln(x+1)−frac{1}{2}∫frac{x²}{x+1}dx; frac{x²}{x+1}=x−1+frac{1}{x+1}'],
['Integramos cada término y agrupamos los logaritmos.','F(x)=frac{x²−1}{2}ln(x+1)−frac{x²}{4}+frac{x}{2}+K'],
['La gráfica pasa por (1,0); sustituimos para hallar la constante.','F(1)=frac{1}{4}+K=0 ⇒ K=−frac{1}{4}'],
['Escribimos el resultado y verificamos por derivación sin aproximaciones.','F(x)=frac{x²−1}{2}ln(x+1)−frac{(x−1)²}{4}; F′(x)=x ln(x+1)+frac{x²−1}{2(x+1)}−frac{x−1}{2}=x ln(x+1)'],
['Comprobamos la condición inicial y el dominio del logaritmo.','F(1)=0; x>−1 ⇒ x+1>0'],
])];
case 889:return[mk(0,'El punto simétrico es P′=(3,−2,3).',[
'El punto simétrico es P′=(2,−1,1).',
'El punto simétrico es P′=(−1,2,−5).',
'El punto simétrico es P′=(1,−8,1).'],['Dar el pie perpendicular en vez del simétrico.','Reflejar en el sentido opuesto desde P.','Reflejar respecto de un punto cualquiera de la recta, no del pie perpendicular.'],[
['Tomamos z=t y resolvemos las dos ecuaciones de la recta.','r: R(t)=(t+1,3t−4,t)=Q+t·u; Q=(1,−4,0), u=(1,3,1)'],
['El pie H está en la recta y el vector PH es perpendicular a su dirección.','(P−Q−tu)·u=0 ⇒ t=frac{(P−Q)·u}{u·u}'],
['Calculamos los dos productos escalares con sus signos.','P−Q=(0,4,−1); (P−Q)·u=11; u·u=11 ⇒ t=1'],
['Sustituimos el parámetro para obtener el pie.','H=R(1)=(2,−1,1)'],
['El pie es el punto medio del segmento que une el punto con su simétrico.','P′=2H−P=(3,−2,3)'],
['Verificamos punto medio y perpendicularidad, condiciones que caracterizan la simetría axial.','frac{P+P′}{2}=H∈r; (P′−P)·u=(2,−2,4)·(1,3,1)=0'],
]),mk(1,'El único punto es R=(2,−1,1).',[
'El único punto es R=(1,−4,0).',
'El único punto es R=(3,2,2).',
'Los puntos son R₁=(1,−4,0) y R₂=(3,2,2).'],['Tomar el origen de la parametrización sin imponer la distancia.','Desplazar una unidad el parámetro del pie perpendicular.','Suponer dos puntos simétricos en la recta sin comprobar que la distancia pedida es la mínima.'],[
['Usamos todos los puntos de la recta mediante el mismo parámetro.','R(t)=(t+1,3t−4,t); P=(1,0,−1)'],
['Escribimos la distancia al cuadrado y la igualamos al cuadrado de √6.','t²+(3t−4)²+(t+1)²=6'],
['Desarrollamos conservando los términos lineales.','11t²−22t+17=6 ⇒ 11t²−22t+11=0'],
['Factorizamos; la raíz es doble y por tanto no hay dos puntos distintos.','11(t−1)²=0 ⇒ t=1'],
['Sustituimos y comprobamos tanto las ecuaciones de la recta como la distancia.','R=(2,−1,1); 2−(−1)+2·1=5; 2−1=1; d(P,R)=√(1+1+4)=√6'],
['La forma de cuadrado completo demuestra que es el punto más cercano y que la solución es única.','d(P,R(t))²=11(t−1)²+6≥6, igualdad solo en t=1'],
])];default:throw Error('Unknown convexity-rectangle-reflection case');}}
export function buildConvexityRectangleReflectionBatch(id='batch-0447',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=({1:'Matrices y rangos',2:'Estudio de funciones y optimización',3:'Primitivas y áreas',4:'Geometría del espacio'})[c.slot];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.secondaryTopics=[874,876].includes(c.index)?['Representación gráfica']:[];x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_CONVEXITY_RECTANGLE_REFLECTION'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildConvexityRectangleReflectionBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0447-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0447.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
