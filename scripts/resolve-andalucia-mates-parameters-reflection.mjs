import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[241,'c1053dad9ef9e6ce58aeea7d171758b8b6aec6014f2dfbec91a9ace85f5136e5',2,'B.3','e5f32094bf11f28fa052bdcb95e5ac3ca93f5be474c7362f7e8f44e25f3638ef',0],
[242,'ebc02a7f8b0e620b0f8134f8e32b5215847b3dc50890fe40538337ed88a54a6d',2,'B.1','0a706a90039be7753d769055acc2182d6b2abd45c2842f85a5e4e06b736697dc',0],
[245,'e6356a504a4c1346274193aeafd23fff6f5df37695b3de420a0604e5b166eae0',1,'A.1','b94bd7b2cb29c9b6d7a6223b64fb752adec51be5c43d561e399ccb905fe171ae',0],
[246,'12862714b2e47a390cc175a51fc4582d522f804e03290abc96be4761fec7e5ae',2,'B.4','ca7fc61b187cf0846b0f4c8b6516b4e8d64ee4f1195eb21129d4df3030931d62',0],
[248,'c8b05a337bf20174030e53cf793cfb12a4b4816f83b323c6b9e660adb65e0761',2,'8','bab157fb56c16683a5f829e392cfd8b433ff05dc0ae2a2ad1c831a2d742346d1',0],
[250,'915e3de08a67887ee286773fac80c8a3a54dc62f3ddee5b1bd715b9b25069857',2,'5','eae1d6ab7e6dcfd8c8b1a064d8ffe3a3c8d4516caa7a9c86da0421cdb3b119d3',0],
];
export const statements={
241:'Dada la matriz A=[[λ+1,0],[1,−1]].\na) [1,25 puntos] Determina los valores de λ para los que la matriz A²+3A no tiene inversa.\nb) [1,25 puntos] Para λ=0, halla la matriz X que verifica la ecuación AX+A=2I, siendo I la matriz identidad de orden 2.',
242:'En una empresa los ingresos (en euros) dependen de la edad. Si la edad, x, es de 18 a 50 años, los ingresos vienen dados por la fórmula −x²+70x, mientras que para edades iguales o superiores a 50 años los ingresos están determinados por la expresión frac{400x}{x−30}. Calcula cuál es el máximo de los ingresos y a qué edad se alcanza.',
245:'Sabiendo que lim_{x→0}frac{cos(3x)−e^x+ax}{x sen(x)} es finito, calcula a y el valor del límite.',
246:'Considera los puntos A(1;3;−1) y B(3;−1;−1).\na) [1,75 puntos] Determina la ecuación del plano respecto del cual B es el simétrico de A.\nb) [0,75 puntos] Siendo C(5;1;5), calcula el área del triángulo de vértices A, B y C.',
248:'La recta r: frac{x+3}{2}=frac{y+4}{2}=frac{z−3}{3} y la recta s, que pasa por los puntos P(1;0;2) y Q(a;1;0), se cortan en un punto. Calcula el valor de a y el punto de corte.',
250:'Considera el sistema de ecuaciones\nsystem{x+y+2z=0;3x−y−2z=0;−x+2y+mz=0}\na) Calcula m para que el sistema tenga infinitas soluciones y hállalas. [1,5 puntos]\nb) Para m=2, ¿existe alguna solución tal que z=1? En caso afirmativo, calcúlala. En caso negativo, justifica la respuesta. [1 punto]',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_PARAMETERS_REFLECTION_SOURCE_LAYOUT']]:[];
export const cases=[{index:241,literals:['λ + 1','AX + A = 2I'],topic:'Matrices',slot:1},{index:242,literals:['−x2 + 70x','400x'],topic:'Aplicaciones de derivadas',slot:2,whole:true},{index:245,literals:['cos(3x) − ex + ax','es ﬁnito'],topic:'Límites y asíntotas',slot:2,whole:true},{index:246,literals:['A(1, 3, −1)','C(5, 1, 5)'],topic:'Problemas métricos',slot:4},{index:248,literals:['P (1, 0, 2)','Q(a, 1, 0)'],topic:'Planos y rectas',slot:4,whole:true},{index:250,literals:['−x + 2y + mz = 0','z = 1'],topic:'Sistemas con determinantes',slot:1}];
export const proof=c=>({241:{singular:[-1,-4],X:[[1,0],[2,-3]]},242:{age:35,income:1225,at18:936,at50:1000,limit:400},245:{a:1,limit:-5},246:{midpoint:[2,1,-1],normal:[1,-2,0],plane:[1,-2,0,0],cross:[-24,-12,12],area:6*Math.sqrt(6)},248:{a:2,t:1,lambda:-2,point:[-1,-2,6]},250:{m:4,nullVector:[0,-2,1],rank:2,m2Unique:[0,0,0]}}[c.index]);
export function solve(c){const ps=c.whole?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_ALGEBRA_GEOMETRY_OR_CALCULUS_CHECK',proof(c));switch(c.index){
case 241:return[mk(0,'λ=−1 o λ=−4.',['λ=−1 o λ=2.','λ=1 o λ=4.','λ=−1 únicamente.'],['Restar tres a A en lugar de sumarlo.','Cambiar los signos al resolver los factores del determinante.','Estudiar solo A y omitir el factor A+3I.'],[
['Una matriz cuadrada carece de inversa exactamente cuando su determinante es cero. Factorizamos sin conmutar factores diferentes.','A²+3A=A(A+3I)'],
['Las matrices A y A+3I son triangulares inferiores: sus determinantes son los productos diagonales.','det(A)=−(λ+1); det(A+3I)=2(λ+4)'],
['La multiplicatividad permite evitar una expansión innecesaria de todas las entradas.','det(A²+3A)=−2(λ+1)(λ+4)'],
['Anulamos los factores; el factor constante no puede anularse.','λ+1=0 o λ+4=0 ⇒ λ=−1 o λ=−4'],
['Comprobamos mediante multiplicación matricial directa la expresión del producto.','A²+3A=[[(λ+1)(λ+4),0],[λ+3,−2]]'],
['En ambos valores la primera fila es nula. En los demás el determinante no se anula y existe inversa.','λ=−1: [[0,0],[2,−2]]\nλ=−4: [[0,0],[−1,−2]]'],
]),mk(1,'X=[[1,0],[2,−3]].',['X=[[1,0],[1,−3]].','X=[[3,0],[2,−1]].','X=[[1,0],[−2,−3]].'],['Omitir el factor dos en una entrada de 2A.','Cambiar el signo de la identidad al despejar X.','Cambiar el signo de la entrada inferior izquierda de la inversa.'],[
['Sustituimos λ=0 antes de resolver la ecuación matricial.','A=[[1,0],[1,−1]]; det(A)=−1≠0'],
['Aislamos el producto AX, manteniendo el orden de multiplicación.','AX=2I−A'],
['Calculamos A al cuadrado; la identidad obtenida proporciona la inversa.','A²=[[1,0],[0,1]]=I ⇒ A^{−1}=A'],
['Multiplicamos por la inversa a la izquierda.','X=A^{−1}(2I−A)=2A−A²=2A−I'],
['Evaluamos las entradas y obtenemos la matriz pedida.','X=[[2,0],[2,−2]]−[[1,0],[0,1]]=[[1,0],[2,−3]]'],
['Verificamos sustituyendo en la ecuación oficial; la inversa garantiza unicidad.','AX=[[1,0],[−1,3]]\nAX+A=[[2,0],[0,2]]=2I'],
])];
case 242:return[mk(0,'Máximo: 1225 € a los 35 años.',['Máximo: 1000 € a los 50 años.','Máximo: 936 € a los 18 años.','Máximo: 2450 € a los 35 años.'],['Comparar solo la unión de los tramos e ignorar el vértice interior.','Usar únicamente el extremo inferior del dominio.','Omitir el término negativo −x² al evaluar los ingresos.'],[
['La edad recorre x≥18. Analizamos el tramo polinómico hasta 50 y el racional desde 50. En la unión ambas fórmulas coinciden.','−50²+70·50=1000; frac{400·50}{50−30}=1000'],
['En el tramo inicial derivamos y buscamos candidatos interiores.','I′(x)=70−2x; I′(x)=0 ⇒ x=35'],
['La derivada cambia de positiva a negativa: el candidato es un máximo y no un mínimo.','18≤x<35: I′>0; 35<x<50: I′<0'],
['Evaluamos el vértice y los extremos relevantes del tramo.','I(35)=−1225+2450=1225\nI(18)=936; I(50)=1000'],
['En el tramo racional la derivada es estrictamente negativa, por lo que su máximo se alcanza en 50.','I′(x)=frac{400(x−30)−400x}{(x−30)²}=frac{−12000}{(x−30)²}<0'],
['Comparamos todos los candidatos y el límite al crecer la edad. El cuadrado completo confirma la cota del primer tramo.','−x²+70x=1225−(x−35)²≤1225\nlim_{x→+∞}frac{400x}{x−30}=400; máximo global: 1225 € a los 35 años'],
])];
case 245:return[mk(0,'a=1; límite=−5.',['a=−1; límite=−5.','a=1; límite=−4.','a=1; límite=−10.'],['Cambiar el signo al cancelar el término lineal de la exponencial.','Cambiar el signo de la contribución cuadrática de la exponencial.','Olvidar que la segunda derivada del denominador vale dos.'],[
['La sustitución directa produce cero entre cero para cualquier a. Denotamos por N y D el numerador y denominador.','N(0)=cos(0)−e^0=0; D(0)=0·sen(0)=0'],
['La finitud exige anular el término lineal del numerador, porque el denominador es de orden dos.','lim_{x→0}frac{N(x)}{x}=a−1; lim_{x→0}frac{D(x)}{x²}=1 ⇒ a=1'],
['Con a=1 aplicamos L’Hôpital a la indeterminación cero entre cero; ambas derivadas siguen anulándose en cero.','N′(x)=−3sen(3x)−e^x+1\nD′(x)=sen(x)+x cos(x); N′(0)=D′(0)=0'],
['Aplicamos por segunda vez la regla en un entorno perforado de cero.','N″(x)=−9cos(3x)−e^x\nD″(x)=2cos(x)−x sen(x)'],
['Ahora el denominador tiene límite no nulo; evaluamos el cociente.','L=frac{−9−1}{2}=−5'],
['Comprobación independiente mediante desarrollos locales: el término lineal desaparece y el cuadrático confirma el resultado.','cos(3x)=1−frac{9x²}{2}+o(x²)\ne^x=1+x+frac{x²}{2}+o(x²)\nN(x)=−5x²+o(x²); D(x)=x²+o(x²)'],
])];
case 246:return[mk(0,'Plano: x−2y=0.',['Plano: x−2y−2=0.','Plano: x+2y−4=0.','Plano: 2x+y−5=0.'],['Usar A como punto del plano en lugar del punto medio.','Cambiar un signo de la normal al restar los puntos.','Elegir una normal perpendicular a AB en lugar de paralela.'],[
['El plano de simetría es el mediador del segmento AB: pasa por su punto medio y es perpendicular al segmento.','M=frac{A+B}{2}=(2;1;−1)'],
['Restamos B menos A para obtener una normal del plano.','AB=(2;−4;0)=2(1;−2;0)'],
['Elegimos la normal simplificada y escribimos la ecuación punto-normal.','n=(1;−2;0); (x−2)−2(y−1)=0'],
['Simplificamos las constantes sin cambiar la normal.','x−2y=0'],
['Comprobamos que el punto medio está en el plano y que el segmento es perpendicular.','2−2·1=0; AB=2n'],
['Las distancias orientadas de A y B son opuestas e iguales en magnitud. Esta comprobación confirma la reflexión.','n·A=−5; n·B=5; distancia de cada punto=frac{5}{√(5)}=√(5)'],
]),mk(1,'Área=6√(6) u².',['Área=12√(6) u².','Área=3√(6) u².','Área=6√(5) u².'],['Dar el área del paralelogramo en lugar del triángulo.','Dividir por dos una segunda vez.','Omitir la tercera componente al calcular la norma del producto vectorial.'],[
['Construimos dos lados que parten del mismo vértice.','AB=(2;−4;0); AC=(4;−2;6)'],
['El área triangular es la mitad de la norma del producto vectorial.','S=frac{1}{2}|AB×AC|'],
['Desarrollamos las componentes con sus signos.','AB×AC=((−4)·6−0;0−2·6;2(−2)−(−4)4)=(-24;−12;12)'],
['Calculamos la norma sumando los tres cuadrados.','|AB×AC|=√(576+144+144)=√(864)=12√(6)'],
['Aplicamos el factor de área del triángulo.','S=frac{12√(6)}{2}=6√(6) u²'],
['Comprobación independiente por el determinante de Gram de los lados.','|AB|²=20; |AC|²=56; AB·AC=16\n20·56−16²=864 ⇒ S=frac{√(864)}{2}'],
])];
case 248:return[mk(0,'a=2; corte (−1;−2;6).',['a=0; corte (−1;−2;6).','a=2; corte (1;2;0).','a=2; corte (−3;−4;3).'],['Cambiar el signo al despejar a en la primera coordenada.','Dar Q como intersección sin comprobar su pertenencia a r.','Dar el punto base de r sin exigir pertenencia a s.'],[
['Usamos un parámetro t para las tres razones iguales de r.','r(t)=(−3+2t;−4+2t;3+3t)'],
['La otra recta parte de P y tiene vector director Q−P. Usamos un parámetro diferente.','Q−P=(a−1;1;−2)\ns(λ)=(1+(a−1)λ;λ;2−2λ)'],
['Igualamos las coordenadas segunda y tercera, que no dependen de a.','λ=−4+2t\n3+3t=2−2λ'],
['Sustituimos y resolvemos las dos ecuaciones lineales.','3+3t=2−2(−4+2t)=10−4t\n7t=7 ⇒ t=1; λ=−2'],
['Igualamos la primera coordenada para recuperar el parámetro oficial a.','−3+2=1−2(a−1) ⇒ −1=3−2a ⇒ a=2'],
['Sustituimos ambos parámetros en las rectas completas: se obtiene el mismo punto.','r(1)=(−1;−2;6)\ns(−2)=(1−2;−2;2+4)=(−1;−2;6)'],
])];
case 250:return[mk(0,'m=4; (x;y;z)=(0;−2t;t), t∈ℝ.',['m=−4; (x;y;z)=(0;−2t;t), t∈ℝ.','m=4; (x;y;z)=(0;2t;t), t∈ℝ.','m=2; (x;y;z)=(0;−2t;t), t∈ℝ.'],['Cambiar el signo de la condición del parámetro.','Cambiar el signo al despejar y de la primera ecuación.','Confundir el parámetro del segundo apartado con el caso singular.'],[
['El sistema es homogéneo, luego siempre tiene la solución nula y los rangos de A y de su ampliada son iguales.','A=[[1,1,2],[3,−1,−2],[−1,2,m]]'],
['Calculamos el determinante para localizar los posibles casos con infinitas soluciones.','det(A)=(−m+4)−(3m−2)+2(6−1)=16−4m'],
['Si m no es cuatro el rango es tres y la única solución es la nula. Para m=4 comprobamos un menor de orden dos.','m=4: det(A)=0; 1·(−1)−3·1=−4≠0 ⇒ rg(A)=2'],
['Aplicamos Rouché–Frobenius: en el caso singular el rango común es menor que las tres incógnitas.','rg(A)=rg(A*)=2<3: compatible indeterminado, un parámetro libre'],
['Sumamos las dos primeras ecuaciones y despejamos en la primera.','4x=0 ⇒ x=0; y+2z=0 ⇒ y=−2z; z=t'],
['Comprobamos las tres ecuaciones para cualquier t y cerramos la solución completa.','(x;y;z)=(0;−2t;t)\n0−2t+2t=0; 0+2t−2t=0; 0−4t+4t=0'],
]),mk(1,'No: la única solución es (0;0;0), que tiene z=0.',['Sí: (0;−2;1) es solución.','Sí: (1;−3;1) es solución.','No: el sistema para m=2 es incompatible.'],['Usar las soluciones del caso m=4 sin comprobar la tercera ecuación.','Imponer z=1 y comprobar solo la primera ecuación.','Confundir determinante no nulo con incompatibilidad.'],[
['Sustituimos m=2 en el determinante, no en la solución paramétrica del caso singular.','det(A)=16−4·2=8≠0'],
['El rango de coeficientes es tres, igual al de la ampliada: hay solución única.','rg(A)=rg(A*)=3'],
['Al ser homogéneo conocemos una solución; por unicidad es la única.','(x;y;z)=(0;0;0)'],
['La condición adicional exige una coordenada distinta de la que tiene esa solución.','z=0≠1: no existe la solución solicitada'],
['También podemos comprobar directamente qué ocurriría al imponer z=1. Las dos primeras ecuaciones fuerzan x e y.','4x=0 ⇒ x=0; x+y+2=0 ⇒ y=−2'],
['La tercera ecuación contradice esos valores y confirma la inexistencia con z=1, no la incompatibilidad del sistema original.','−x+2y+2z=0−4+2=−2≠0'],
])];default:throw Error('Unknown source case');}}
export function buildParametersReflectionBatch(id='batch-0397',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=[];x.block=c.slot===4?'Geometría':c.slot===1?'Álgebra':'Análisis';x.examSlot=c.slot;x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.index===242?'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE':c.index===245?'PARAMETER_LIMIT_WITH_INDEPENDENT_SERIES_CHECK':c.index===250?'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS':'MATRIX_DETERMINANT_IDENTITIES'};if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildParametersReflectionBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0397-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0397.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
