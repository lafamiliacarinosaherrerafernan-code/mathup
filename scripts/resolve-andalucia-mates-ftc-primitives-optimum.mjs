import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[298,'c8b05a337bf20174030e53cf793cfb12a4b4816f83b323c6b9e660adb65e0761',1,'4','8dbd8a6c8b8ce76785f2886cffea3f96cb7b4642689c4753580b40fe07949e36',0],
[301,'74ab2c123d3df105640328a5953d165030deecf0873f4dfd65271d375ae8be25',1,'A.1','9b94a9876aeec6910cce6359c7d592214c2918fd7d08d6a62ee8a4714a1e3bb9',0],
[306,'a098cf97f26b5a80c2114b078958a9549efd8f87843d30465bf6b65e0deb3e8c',1,'A.4','ba4e27f303b1228693255f8c08971c8363c7d22a84d9980751707ff6b2ae826f',0],
[308,'faa99db49ea6996077e64bcc83a8f7c0a39af31d3043cb323b178e5d73a511b7',1,'A.1','abb17cb23bb00cb826a426730cc34d5439be0d55e064b72ecf34856028b7e1d4',0]];
export const statements={
298:'Considera la función F:[0,+∞)→ℝ definida por F(x)=∫_0^x(2t+√t)dt. Halla la ecuación de la recta tangente a la gráfica de F en el punto de abscisa x=1.',
301:'Calcula a, b, c y d sabiendo que la gráfica de la función f:ℝ→ℝ definida por f(x)=ax³+bx²+cx+d tiene un punto de inflexión en (0;4) y su recta normal en el punto (1;8) es paralela al eje de ordenadas.',
306:'Considera la función f:[0,+∞)→ℝ definida por f(x)=cos(√x). Calcula, si es posible, una primitiva de f cuya gráfica pase por el punto (0;5). Sugerencia: haz el cambio t=√x.',
308:'[2,5 puntos] Entre todos los triángulos rectángulos de 5 metros de hipotenusa, determina los catetos del de área máxima.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_FTC_PRIMITIVES_OPTIMUM_SOURCE_LAYOUT']]:[];
export const cases=[{index:298,literals:['(2t + t) dt','x = 1'],slot:3},{index:301,literals:['(0, 4)','(1, 8)'],slot:2},{index:306,literals:['cos(','(0, 5)'],slot:3},{index:308,literals:['5 metros de hipotenusa'],slot:2}];
export const proof=c=>({298:{point:[1,5/3],slope:3,intercept:-4/3},301:{a:-2,b:0,c:6,d:4},306:{constant:3,valueAtZero:5,derivativeAtZeroRight:1},308:{legs:[5/Math.sqrt(2),5/Math.sqrt(2)],area:25/4,hypotenuse:5}}[c.index]);
export function solve(c){const mk=(a,d,e,s)=>[part({id:'whole',prompt:statements[c.index]},a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_DERIVATIVE_AND_CONSTRAINT_CHECK',proof(c))];switch(c.index){
case 298:return mk('Tangente: y=3x−frac{4}{3}.',['Tangente: y=3x+frac{5}{3}.','Tangente: y=frac{5}{2}x−frac{5}{6}.','Tangente: y=3x−frac{1}{3}.'],['Confundir la ordenada del punto con el término independiente.','Derivar el integrando en lugar de aplicar el teorema fundamental.','Integrar la raíz como si su primitiva fuese x elevado a tres medios sin factor.'],[
['El integrando es continuo en el dominio no negativo. Aplicamos el teorema fundamental del cálculo.','F′(x)=2x+√x'],
['La pendiente tangente se obtiene evaluando esa derivada en uno.','m=F′(1)=2+1=3'],
['Necesitamos también la ordenada: integramos entre cero y uno, usando la regla de las potencias.','F(1)=∫_0^1(2t+t^{1/2})dt=1+frac{2}{3}=frac{5}{3}'],
['Escribimos la ecuación de la tangente en forma punto-pendiente.','y−frac{5}{3}=3(x−1)'],
['Simplificamos la ecuación y comprobamos su paso por el punto.','y=3x−frac{4}{3}; x=1 ⇒ y=frac{5}{3}'],
['La expresión explícita de F proporciona una comprobación independiente de la pendiente y del valor.','F(x)=x²+frac{2}{3}x^{3/2}; F(0)=0; F′(1)=3'],
]);
case 301:return mk('a=−2; b=0; c=6; d=4.',['a=2; b=0; c=−6; d=4.','a=−2; b=0; c=6; d=0.','a=−4; b=0; c=12; d=4.'],['Cambiar el signo al resolver las ecuaciones de a y c.','Confundir el punto de inflexión con el origen.','Imponer f(1)=12 en lugar de ocho al trasladar el término constante.'],[
['El punto de inflexión pertenece a la gráfica, lo que fija el término independiente.','f(0)=4 ⇒ d=4'],
['La segunda derivada debe anularse en la abscisa cero. Después comprobaremos que cambia de signo.','f″(x)=6ax+2b; f″(0)=0 ⇒ b=0'],
['Una normal vertical implica tangente horizontal. Además, el punto dado pertenece a la gráfica.','f′(1)=0 ⇒ 3a+c=0; f(1)=8 ⇒ a+c+4=8'],
['Resolvemos el sistema de los dos coeficientes restantes.','c=−3a; a−3a=4 ⇒ a=−2; c=6'],
['Comprobamos ambos puntos y la dirección tangente.','f(x)=−2x³+6x+4; f(0)=4; f(1)=8; f′(1)=−6+6=0'],
['Verificamos el cambio real de concavidad y la recta normal vertical.','f″(x)=−12x cambia de signo en 0; normal en (1;8): x=1'],
]);
case 306:return mk('F(x)=2√x sen(√x)+2cos(√x)+3, para x≥0.',['F(x)=2√x sen(√x)+2cos(√x)+5, para x≥0.','F(x)=2√x sen(√x)−2cos(√x)+7, para x≥0.','F(x)=√x sen(√x)+cos(√x)+4, para x≥0.'],['Usar cinco como constante sin evaluar el término coseno en cero.','Cambiar el signo del coseno en la integración por partes.','Perder el factor dos del diferencial al hacer el cambio.'],[
['La función es continua para x no negativo y admite primitivas. Aplicamos el cambio sugerido.','t=√x; x=t²; dx=2t dt'],
['La integral se transforma en un producto que integramos por partes.','∫cos(√x)dx=2∫t cos(t)dt'],
['Tomamos u igual a t y dv igual a coseno por dt.','u=t; du=dt; v=sen(t)\n2∫t cos(t)dt=2t sen(t)+2cos(t)+C'],
['Volvemos a x y usamos la ordenada inicial para fijar la constante.','F(x)=2√x sen(√x)+2cos(√x)+C; F(0)=2+C=5 ⇒ C=3'],
['Para x positivo, la derivación cancela los términos que contienen seno dividido por raíz.','F′(x)=frac{sen(√x)}{√x}+cos(√x)−frac{sen(√x)}{√x}=cos(√x)'],
['En el extremo cero no evaluamos las fracciones indeterminadas de la fórmula anterior: usamos el límite por la derecha.','lim_{x→0^+}frac{F(x)−5}{x}=1=cos(0); F(0)=5'],
]);
case 308:return mk('Ambos catetos miden frac{5√2}{2} m; área máxima frac{25}{4} m².',['Ambos catetos miden frac{5}{2} m; área máxima frac{25}{8} m².','Catetos: 3 m y 4 m; área máxima 6 m².','Ambos catetos miden 5 m; área máxima frac{25}{2} m².'],['Dividir la hipotenusa entre dos sin aplicar Pitágoras.','Elegir un triángulo conocido de hipotenusa cinco sin maximizar el área.','Confundir la longitud de la hipotenusa con la de cada cateto.'],[
['Sean x e y los catetos positivos. Pitágoras fija la restricción y el área es la mitad de su producto.','x²+y²=25; A=frac{xy}{2}'],
['Podemos reducir a una variable, con dominio abierto entre cero y cinco.','y=√(25−x²); A(x)=frac{x√(25−x²)}{2}; 0<x<5'],
['Derivamos usando producto y cadena y anulamos el numerador.','A′(x)=frac{25−2x²}{2√(25−x²)}; A′=0 ⇒ x=frac{5}{√2}'],
['El denominador es positivo: la derivada pasa de positiva a negativa, por lo que el punto es el máximo global.','x<frac{5}{√2}: A′>0; x>frac{5}{√2}: A′<0'],
['Recuperamos el otro cateto y calculamos el área en unidades correctas.','y=frac{5}{√2}; x=y=frac{5√2}{2} m; A=frac{25}{4} m²'],
['La desigualdad del cuadrado no negativo confirma el máximo sin usar derivadas.','(x−y)²≥0 ⇒ 2xy≤x²+y²=25 ⇒ A≤frac{25}{4}; igualdad si x=y'],
]);default:throw Error('Unknown official case');}}
export function buildFtcPrimitivesOptimumBatch(id='batch-0407',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===3?(c.index===306?'Integrales indefinidas':'Integrales definidas y áreas'):'Aplicaciones de derivadas';x.secondaryTopics=[];x.block='Análisis';x.examSlot=c.slot;x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.index===298?'FUNDAMENTAL_THEOREM_AND_RATIONAL_AREA':c.slot===3?'EXPLICIT_PRIMITIVES_WITH_INDEPENDENT_DERIVATION':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildFtcPrimitivesOptimumBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0407-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0407.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
