import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[738,'1ae1a1173683cbcf7a9e46bb22d7f4a8de35f57e67ec4beb8bc11283c1ceb2c5',2,'NONE.1','af71568db1c71eecc336ecf79cfaa22af0c65866a466425aee25f16be9f1b326',0],
[740,'67593e6ffe6b4e602cf2a0d3b68d10dd2038435a99caf87bc3c83a2f80b2785a',1,'B.3','8e557df5742037c799a66370bcfd5a77990749179d4b33ae82640f4bddb7711a',0],
[741,'709f067c52eb7587dd9e7ca886e32e0417213d679ef7c084f3359d93290bb491',1,'NONE.4','13b01977c52e633ddc053c415adf023e44a73a3370f712b8ae88fa74da4662b2',0],
[743,'497e6d1a54cf3d5393bc8727864e641ec08a5aca088f46eb0e0ed8d8075d7b6d',1,'A.3','36dcacf425d176a590661bb04d8f2725fda026ccb96b6f5ef57d5d716718ebc7',0],
[746,'faa99db49ea6996077e64bcc83a8f7c0a39af31d3043cb323b178e5d73a511b7',1,'NONE.3','abb17cb23bb00cb826a426730cc34d5439be0d55e064b72ecf34856028b7e1d4',0]];
export const statements={
738:'Sea f:ℝ→ℝ la función derivable definida por f(x)=cases{a−x,si x≤1;frac{b}{x}+ln(x),si x>1}, donde ln denota la función logaritmo neperiano.\na) Calcula a y b.\nb) Para a=3 y b=2, halla los extremos absolutos de f en el intervalo [0,e] (abscisas donde se obtienen y valores que se alcanzan).',
740:'Sea f:[0,+∞)→ℝ la función definida por f(x)=arctan(√x). Halla la primitiva de f cuya gráfica pasa por el punto (0,1). Sugerencia: utiliza el cambio x=t².',
741:'Calcula la distancia entre las rectas r y s dadas por r:x=y=z y s:x−1=y−2=z−3.',
743:'Calcula ∫_6^12 frac{1}{9−x²} dx.',
746:'Considera el sistema de ecuaciones system{3x−2y+z=5;2x−3y+z=−4}.\na) Añade una ecuación de la forma x+y+λz=9 de manera que el sistema resultante sea compatible indeterminado.\nb) ¿Existe algún valor de λ para el cual el sistema resultante sea incompatible?'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_GLUING_ARCTANGENT_PARALLEL_LAYOUT']]:[];
export const cases=[
{index:738,slot:2,literals:['Calcula a y b.','a = 3 y b = 2','extremos absolutos']},
{index:740,slot:3,literals:['arc tg','(0, 1)','cambio x = t2']},
{index:741,slot:4,literals:['x = y = z','x − 1 = y − 2 = z − 3']},
{index:743,slot:3,literals:['12 1','9 − x2 dx']},
{index:746,slot:1,literals:['3x − 2y + z = 5','2x − 3y + z = −4','x + y + λz = 9']}];
export const proof=c=>({738:{a:3,b:2,critical:2,minimum:1+Math.log(2),maximum:3,upper:Math.E},740:{constant:1,domain:[0,'+infinity']},741:{direction:[1,1,1],point:[1,2,3],distance:Math.sqrt(2)},743:{lower:6,upper:12,integral:Math.log(5/9)/6},746:{indeterminate:0,incompatible:[],determinantCoefficient:-5,uniqueSolution:[23/5,22/5,0]}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,r,s)=>part(ps[i],a,d,r,s,'INDEPENDENT_DIFFERENTIATION_QUADRATURE_PROJECTION_AND_RANK_CHECK',proof(c));switch(c.index){
case 738:return[mk(0,'a=3; b=2.',['a=2; b=1.','a=1; b=0.','a=0; b=−1.'],['Igualar la derivada derecha a cero en vez de a −1.','Omitir el término derivado del cociente.','Cambiar el signo del término derivado del cociente.'],[
['Ser derivable implica ser continua en el punto donde cambia la definición.','f(1)=a−1; lim_{x→1⁺}f(x)=b+ln(1)=b ⇒ a−1=b'],
['Fuera de la unión cada rama es derivable. Derivamos el cociente b/x y el logaritmo por separado.','f′(x)=−1 si x<1; f′(x)=−frac{b}{x²}+frac{1}{x} si x>1'],
['La derivabilidad en x=1 exige igualdad entre derivadas laterales.','f′(1⁻)=−1; f′(1⁺)=1−b ⇒ −1=1−b'],
['Despejamos b y después usamos la continuidad para obtener a.','b=2; a−1=2 ⇒ a=3'],
['Comprobamos ambos límites de la función con los parámetros encontrados.','f(1)=3−1=2; lim_{x→1⁺}(frac{2}{x}+ln x)=2'],
['Las derivadas también coinciden. Las dos condiciones se verifican simultáneamente.','f′(1⁻)=−1; f′(1⁺)=−2+1=−1'],
]),mk(1,'Máximo absoluto: (0,3); mínimo absoluto: (2,1+ln 2).',['Máximo absoluto: (0,3); mínimo absoluto: (e,1+frac{2}{e}).','Máximo absoluto: (0,3); mínimo absoluto: (1,2).','Máximo absoluto: (0,3); mínimo absoluto: (2,ln 2).'],['Omitir el punto crítico interior y comparar solo extremos.','Confundir el cambio de fórmula con un mínimo.','Omitir la contribución 2/x al evaluar el mínimo.'],[
['La función es continua en el intervalo cerrado; los extremos absolutos existen. Comprobamos extremos, unión y puntos críticos.','f(x)=3−x para x≤1; f(x)=frac{2}{x}+ln x para x>1; x∈[0,e]'],
['Derivamos en cada tramo y buscamos ceros admisibles.','f′(x)=−1 para x<1; f′(x)=frac{x−2}{x²} para x>1 ⇒ x=2'],
['El denominador es positivo. La tabla de signos incluye el punto de unión, donde la derivada vale −1.','(0,1):−; x=1:−1; (1,2):−; x=2:0; (2,e):+'],
['Evaluamos los candidatos sin olvidar la parte racional.','f(0)=3; f(1)=2; f(2)=1+ln 2; f(e)=1+frac{2}{e}'],
['La función decrece hasta 2 y luego crece. Comparamos los dos extremos del intervalo para el máximo.','f(2)<f(e)<f(0), pues e>1 ⇒ 1+frac{2}{e}<3'],
['Concluimos coordenadas y valores; el cambio de signo de la derivada confirma el mínimo.','Máximo:(0,3); mínimo:(2,1+ln 2), con f(2)≈1,69315'],
])];
case 740:return[mk(0,'F(x)=(x+1)arctan(√x)−√x+1.',['F(x)=x arctan(√x)−√x+1.','F(x)=(x+1)arctan(√x)+√x+1.','F(x)=(x+1)arctan(√x)−√x.'],['Omitir la primitiva del término 1/(1+t²) tras dividir.','Cambiar el signo del término que procede de la integración por partes.','Olvidar ajustar la constante al punto (0,1).'],[
['Buscamos una primitiva y fijaremos después la constante. El cambio sugerido usa t≥0.','x=t²; t=√x; dx=2t dt ⇒ ∫arctan(√x)dx=∫2t arctan(t)dt'],
['Integramos por partes, mostrando la elección de los factores.','u=arctan t; dv=2t dt; du=frac{1}{1+t²}dt; v=t²'],
['Aplicamos ∫u dv=uv−∫v du y descomponemos el cociente.','∫2t arctan(t)dt=t²arctan t−∫frac{t²}{1+t²}dt; frac{t²}{1+t²}=1−frac{1}{1+t²}'],
['Integramos ambos términos y deshacemos el cambio.','(t²+1)arctan t−t+C ⇒ F(x)=(x+1)arctan(√x)−√x+C'],
['El punto dado pertenece a la gráfica de F. Evaluamos en cero, donde arctan(0)=0.','F(0)=C=1'],
['Derivamos para x>0: los términos con raíz se cancelan. En cero la derivada lateral vale f(0)=0 por continuidad del integrando.','F′(x)=arctan(√x)+frac{x+1}{2√x(1+x)}−frac{1}{2√x}=arctan(√x)'],
])];
case 741:return[mk(0,'Distancia=√2.',['Distancia=√14.','Distancia=√6.','Distancia=0.'],['Medir entre los puntos base sin proyectar perpendicularmente.','Omitir la división por la norma del vector director.','Confundir paralelismo con coincidencia de rectas.'],[
['Escribimos puntos genéricos y comprobamos que las direcciones son iguales.','r(t)=(t,t,t); s(u)=(1+u,2+u,3+u); d=(1,1,1)'],
['El punto Q de s no está en r: las rectas son paralelas distintas.','P=(0,0,0)∈r; Q=(1,2,3)∈s; 1≠2≠3'],
['La distancia entre paralelas es la altura del paralelogramo formado por PQ y d.','distancia=frac{‖PQ×d‖}{‖d‖}'],
['Calculamos el producto vectorial componente a componente.','PQ×d=(2−3,3−1,1−2)=(−1,2,−1)'],
['Dividimos la norma obtenida entre la norma de la dirección.','distancia=frac{√(1+4+1)}{√(1+1+1)}=frac{√6}{√3}=√2'],
['Comprobamos con la proyección: H=(2,2,2) pertenece a r y QH es perpendicular a ambas rectas.','Q−H=(−1,0,1); (Q−H)·d=0; ‖Q−H‖=√2'],
])];
case 743:return[mk(0,'Integral=frac{1}{6}ln(frac{5}{9}).',['Integral=frac{1}{6}ln(frac{9}{5}).','Integral=frac{1}{3}ln(frac{5}{9}).','Integral=frac{1}{6}ln(frac{5}{3}).'],['Invertir el orden de evaluación de los extremos.','Perder el factor dos al descomponer en fracciones simples.','No restar el valor de la primitiva en el extremo inferior.'],[
['El denominador se anula en ±3, fuera del intervalo; podemos aplicar Barrow sin integral impropia.','x∈[6,12] ⇒ 9−x²<0'],
['Factorizamos y buscamos las constantes de las fracciones simples.','frac{1}{(3−x)(3+x)}=frac{A}{3−x}+frac{B}{3+x}; 1=3(A+B)+(A−B)x'],
['Igualamos coeficientes: A=B y 6A=1. Integramos conservando el signo de 3−x.','A=B=frac{1}{6}; H(x)=frac{1}{6}(−ln|3−x|+ln|3+x|)'],
['Evaluamos los dos extremos usando valores absolutos.','H(12)=frac{1}{6}ln(frac{15}{9}); H(6)=frac{1}{6}ln(frac{9}{3})'],
['Restamos y reunimos los logaritmos en un cociente.','I=H(12)−H(6)=frac{1}{6}ln(frac{15·3}{9·9})=frac{1}{6}ln(frac{5}{9})'],
['Comprobamos derivando y revisamos el signo negativo, coherente con el integrando.','H′(x)=frac{1}{6}(frac{1}{3−x}+frac{1}{3+x})=frac{1}{9−x²}; ln(frac{5}{9})<0'],
])];
case 746:return[mk(0,'λ=0; la ecuación añadida es x+y=9.',['λ=1; la ecuación añadida es x+y+z=9.','λ=−1; la ecuación añadida es x+y−z=9.','λ=5; la ecuación añadida es x+y+5z=9.'],['No eliminar z al restar las dos ecuaciones originales.','Cambiar el signo de una contribución de z que en realidad se cancela.','Confundir el menor de orden dos con el valor singular del parámetro.'],[
['Restamos las dos ecuaciones originales, incluidos sus términos independientes.','(3x−2y+z)−(2x−3y+z)=5−(−4) ⇒ x+y=9'],
['Comparamos la ecuación añadida con esa consecuencia del sistema original.','(x+y+λz)−(x+y)=9−9 ⇒ λz=0'],
['Las primeras dos filas son independientes y el determinante del sistema ampliado depende de λ.','det(matrix{3,−2;2,−3})=−5≠0; det(matrix{3,−2,1;2,−3,1;1,1,λ})=−5λ'],
['Para λ=0 la tercera fila, incluido el término independiente, es la diferencia de las primeras. Aplicamos Rouché–Frobenius.','λ=0 ⇒ rango(A)=rango(A|b)=2<3 ⇒ compatible indeterminado'],
['Damos la familia de soluciones para comprobar que queda exactamente un parámetro libre.','z=t; y=9−x; 3x−2(9−x)+t=5 ⇒ x=frac{23−t}{5}; y=frac{22+t}{5}'],
['Si λ≠0 el determinante es no nulo y hay solución única, no indeterminación.','λ≠0 ⇒ rango(A)=rango(A|b)=3; por tanto solo sirve λ=0'],
]),mk(1,'No existe ningún λ real que haga incompatible el sistema.',['Solo λ=0 hace incompatible el sistema.','Solo λ=1 hace incompatible el sistema.','Todos los λ≠0 hacen incompatible el sistema.'],['Confundir determinante nulo con incompatibilidad.','Asignar incompatibilidad a un valor regular del determinante.','Confundir solución única con ausencia de solución.'],[
['La incompatibilidad exige rangos diferentes para la matriz de coeficientes y la ampliada.','Sistema incompatible ⇔ rango(A)<rango(A|b)'],
['La reducción obtenida conserva los términos independientes.','x+y=9; 3x−2y+z=5; λz=0'],
['Si λ≠0 obtenemos z=0 y resolvemos las dos ecuaciones restantes.','z=0; y=9−x; 3x−2(9−x)=5 ⇒ x=frac{23}{5}; y=frac{22}{5}'],
['Si λ=0 la última ecuación se convierte en una identidad, no en una contradicción.','0=0; rango(A)=rango(A|b)=2 ⇒ infinitas soluciones'],
['Existe incluso una misma solución que sirve para todos los valores del parámetro.','(x,y,z)=(frac{23}{5},frac{22}{5},0)'],
['La sustituimos en las tres ecuaciones: ninguna condición puede producir incompatibilidad.','frac{69−44}{5}=5; frac{46−66}{5}=−4; frac{23+22}{5}+λ·0=9'],
])];
default:throw Error('Unknown source-bound gluing/arctangent/parallel case');}}
export function buildGluingArctangentParallelBatch(id='batch-0438',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Sistemas de ecuaciones':c.slot===2?'Aplicaciones de derivadas':c.slot===4?'Propiedades métricas':'Primitivas e integrales';x.secondaryTopics=c.index===738?['Continuidad y derivabilidad']:c.slot===4?['Planos y rectas en el espacio']:[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_GLUING_ARCTANGENT_PARALLEL_AND_RANK'};if(c.index===740)x.matesEvidence.historicalQuestionKeyNotice='Historical B.3 retained as source identity; the inspected PDF page labels the exercise in block A. No inferred session or identity rewrite.';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildGluingArctangentParallelBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0438-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0438.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
