import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
 [1078,'96fdec633441fe992d97edda8660bad8bbd44a7d78978f8a56264112791c65e3',1,'B.2','a9e800f1fbf7efb05e50304d1899b84aba287d70bb91143fcb9172e4c887f0a6',0],
 [1079,'c42a605501a277fe7194b964ad92ad66047be9a62dc254fa2219d756d3d71317',1,'NONE.3','8d8d1c689d9b6563cbe5c4b7e6f2a443956f0876d98ed83615377a6f6ed60b8b',0],
 [1082,'4e10e40d60aebdab7570fa77b9ce953d7bf6c9a4c8869a5d3f9b7ca3c907c154',2,'B.2','7b63ff77e48077fdd402a3c0a068567a36c4e0530f63f512a879cdae0c90ab73',0],
];
export const statements={
 1078:'Considera la función f(x)=frac{ax³+x−1}{x²+bx−3}, para x²+bx−3≠0.\na) Calcula a y b para que y=x−2 sea una asíntota oblicua de la gráfica de f.\nb) Estudia y halla las asíntotas verticales de la gráfica de f cuando a=0 y b=2.',
 1079:'Se considera la función f(x)=x³−4x²+4x.\na) Estudia su monotonía y calcula sus extremos.\nb) Representa gráficamente la función.\nc) Calcula una primitiva de f.\nd) Calcula el área del recinto acotado limitado por la gráfica de f y el eje de abscisas.',
 1082:'Un depósito lleno de agua se vacía por un sumidero situado en su parte baja. El volumen de agua, en m³, que queda t minutos después de empezar a vaciarse es V(t)=8−t+frac{t²}{32}.\na) ¿Cuál es la capacidad del depósito?\nb) ¿Cuánto tiempo tarda en vaciarse?\nc) Representa gráficamente la función V.\nd) Calcula V′(8) e interpreta su significado.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_ASYMPTOTES_CUBIC_TANK_LAYOUT']]:[];
export const cases=[{index:1078,slot:2,literals:['ax3 + x − 1','y = x − 2','a = 0 y b = 2']},{index:1079,slot:3,literals:['f (x) = x3 − 4x2 + 4x','monotonía','área del recinto']},{index:1082,slot:3,literals:['V (t) = 8 − t + t 2','t = 8']}];
export const proof=c=>({1078:{a:1,b:2,vertical:-3,hole:1},1079:{critical:[2/3,2],maximum:32/27,minimum:0,inflection:[4/3,16/27],area:4/3},1082:{capacity:8,empty:16,derivativeAt8:-.5}}[c.index]);
export const graphs={1079:{plotVersion:'asymptotes-cubic-tank-v1',index:1079},1082:{plotVersion:'asymptotes-cubic-tank-v1',index:1082}};
const polyline=(f,a,b,X,Y,n=400)=>Array.from({length:n+1},(_,i)=>{const x=a+(b-a)*i/n;return`${X(x).toFixed(2)},${Y(f(x)).toFixed(2)}`}).join(' ');
export function renderAsymptotesCubicTank(g){assert.deepEqual(g,graphs[g.index]);const tank=g.index===1082,xmin=tank?0:-1,xmax=tank?18:3.5,ymin=tank?-.5:-4,ymax=tank?9:3,X=x=>70+620*(x-xmin)/(xmax-xmin),Y=y=>300-240*(y-ymin)/(ymax-ymin),f=tank?(t=>8-t+t*t/32):(x=>x*x*x-4*x*x+4*x);let s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 380" role="img"><rect width="760" height="380" fill="white"/>';
 for(let i=0;i<=6;i++){const x=xmin+(xmax-xmin)*i/6,y=ymin+(ymax-ymin)*i/6;s+=`<path d="M${X(x)},40V300 M70,${Y(y)}H690" stroke="#e6eaf0"/><text x="${X(x)}" y="325" text-anchor="middle" font-size="13">${Number(x.toFixed(2))}</text><text x="62" y="${Y(y)+4}" text-anchor="end" font-size="13">${Number(y.toFixed(2))}</text>`;}
 s+=`<path d="M70,${Y(0)}H690 M${X(0)},40V300" stroke="#24364b"/><polyline points="${polyline(f,xmin,xmax,X,Y)}" fill="none" stroke="#17659b" stroke-width="3"/>`;
 if(tank)s+=`<circle cx="${X(0)}" cy="${Y(8)}" r="4"/><circle cx="${X(16)}" cy="${Y(0)}" r="4"/><text x="85" y="355" font-size="16">V(t)=(t−16)²/32, 0≤t≤16; vértice (16,0).</text>`;else s+=`<circle cx="${X(0)}" cy="${Y(0)}" r="4"/><circle cx="${X(2)}" cy="${Y(0)}" r="4"/><circle cx="${X(2/3)}" cy="${Y(32/27)}" r="4"/><text x="85" y="355" font-size="16">Ceros: 0 y 2 (doble); máximo local (2/3,32/27), mínimo local (2,0).</text>`;return s+'</svg>';}
export function solve(c){const ps=officialParts(statements[c.index]);if(c.index===1078)return[
 part(ps[0],'a=1 y b=2.',['a=1 y b=−2.','a=−1 y b=2.','a=2 y b=1.'],['Cambiar el signo del término independiente del cociente.','Igualar solo la pendiente y no el término constante.','Intercambiar los parámetros al comparar la asíntota.'],[
 ['Dividimos el numerador entre el denominador conservando los parámetros.','frac{ax³+x−1}{x²+bx−3}=ax−ab+frac{(1+3a+ab²)x+(3ab−1)}{x²+bx−3}'],
 ['La asíntota oblicua es el cociente cuando el resto dividido por el denominador tiende a cero.','y=ax−ab'],
 ['Comparamos la pendiente con y=x−2.','a=1'],
 ['Comparamos el término independiente.','−ab=−2'],
 ['Sustituimos a=1.','b=2'],
 ['Verificamos que la diferencia con la recta tiende a cero.','f(x)−(x−2)=frac{9x+5}{x²+2x−3}→0'],
 ],'POLYNOMIAL_DIVISION_AND_ASYMPTOTIC_DIFFERENCE',proof(c)),
 part(ps[1],'La única asíntota vertical es x=−3; en x=1 hay una discontinuidad evitable.',['Las asíntotas verticales son x=−3 y x=1.','La única asíntota vertical es x=1.','No hay asíntotas verticales.'],['Confundir un factor cancelable con una asíntota.','Olvidar el factor x+3 del denominador.','Cancelar factores y olvidar estudiar los puntos excluidos del dominio.'],[
 ['Sustituimos los parámetros indicados.','f(x)=frac{x−1}{x²+2x−3}'],
 ['Factorizamos el denominador.','x²+2x−3=(x−1)(x+3)'],
 ['Simplificamos fuera de los puntos excluidos.','f(x)=frac{1}{x+3}, para x≠1,−3'],
 ['En x=−3 el denominador simplificado se anula y el numerador no.','lim_{x→−3}f(x)=±∞'],
 ['En x=1 el límite es finito.','lim_{x→1}f(x)=frac14'],
 ['Concluimos distinguiendo asíntota y hueco.','x=−3 es asíntota vertical; (1,1/4) es un punto ausente evitable'],
 ],'FACTORIZATION_ONE_SIDED_LIMITS_AND_REMOVABLE_DISCONTINUITY',proof(c))
 ];if(c.index===1079)return[
 part(ps[0],'Creciente en (−∞,2/3) y (2,∞); decreciente en (2/3,2). Máximo local (2/3,32/27) y mínimo local (2,0).',['Creciente en (−∞,2) y decreciente en (2,∞); máximo en (2,0).','Decreciente en (−∞,2/3) y (2,∞); creciente en (2/3,2).','Creciente en todo R y sin extremos.'],['Resolver incompletamente la ecuación f′=0.','Invertir el signo de la derivada en todos los intervalos.','Suponer monotonía por observar solo el término cúbico.'],[
 ['Derivamos y factorizamos.','f′(x)=3x²−8x+4=(3x−2)(x−2)'],
 ['Hallamos los puntos críticos.','f′(x)=0 ⇒ x=frac23 o x=2'],
 ['Estudiamos el signo del producto.','f′>0 en (−∞,2/3), f′<0 en (2/3,2), f′>0 en (2,∞)'],
 ['Evaluamos el máximo local.','f(frac23)=frac{32}{27}'],
 ['Evaluamos el mínimo local.','f(2)=0'],
 ['La variación de signos confirma la naturaleza de ambos extremos.','+→−: máximo; −→+: mínimo'],
 ],'DERIVATIVE_SIGN_TABLE_AND_CRITICAL_VALUES',proof(c)),
 part(ps[1],'La gráfica corta el eje x en x=0 y es tangente a él en x=2; tiene máximo local (2/3,32/27), mínimo local (2,0) e inflexión (4/3,16/27).',['Corta transversalmente el eje x en x=0 y x=2.','Es una parábola con vértice en (2,0).','No corta el eje x.'],['Ignorar que x=2 es una raíz doble.','Confundir una cúbica con su derivada cuadrática.','No factorizar la función para localizar sus ceros.'],[
 ['Factorizamos para obtener los cortes con el eje x.','f(x)=x(x−2)²'],
 ['Los ceros son x=0, simple, y x=2, doble.','(0,0) es cruce; (2,0) es tangencia'],
 ['Usamos la monotonía ya calculada para situar los extremos.','máximo (2/3,32/27); mínimo (2,0)'],
 ['Calculamos la segunda derivada.','f′′(x)=6x−8'],
 ['Localizamos la inflexión.','x=frac43; f(frac43)=frac{16}{27}'],
 ['Con estos datos y el comportamiento cúbico trazamos la curva sin perder ninguna característica.','x→−∞⇒f→−∞; x→∞⇒f→∞'],
 ],'FACTORIZATION_DERIVATIVES_AND_KEY_POINT_GRAPH',proof(c),graphs[1079]),
 part(ps[2],'F(x)=frac{x⁴}{4}−frac{4x³}{3}+2x²+C.',['F(x)=3x²−8x+4+C.','F(x)=frac{x⁴}{4}−4x³+2x²+C.','F(x)=frac{x⁴}{4}−frac{4x³}{3}+4x+C.'],['Dar la derivada en lugar de una primitiva.','Olvidar dividir entre 3 al integrar x².','Integrar 4x como 4x en vez de 2x².'],[
 ['Integramos término a término por linealidad.','∫(x³−4x²+4x)dx'],
 ['Aplicamos la regla de potencias.','∫x³dx=frac{x⁴}{4}'],
 ['Integramos el segundo término.','∫−4x²dx=−frac{4x³}{3}'],
 ['Integramos el término lineal.','∫4x dx=2x²'],
 ['Añadimos la constante de integración.','F(x)=frac{x⁴}{4}−frac{4x³}{3}+2x²+C'],
 ['Comprobamos derivando la expresión obtenida.','F′(x)=x³−4x²+4x=f(x)'],
 ],'TERM_BY_TERM_INTEGRATION_AND_DIFFERENTIATION_CHECK',proof(c)),
 part(ps[3],'A=4/3 unidades cuadradas.',['A=−4/3 unidades cuadradas.','A=8/3 unidades cuadradas.','A=32/27 unidades cuadradas.'],['Olvidar que un área es no negativa.','Duplicar el recinto sin justificación.','Confundir la altura del máximo con el área.'],[
 ['El único recinto acotado con el eje x queda entre los ceros 0 y 2.','f(x)=x(x−2)²≥0 en [0,2]'],
 ['Como la función no cambia de signo, el área es la integral directa.','A=∫_0^2 (x³−4x²+4x)dx'],
 ['Usamos la primitiva calculada.','A=[frac{x⁴}{4}−frac{4x³}{3}+2x²]_0^2'],
 ['Evaluamos el extremo superior.','4−frac{32}{3}+8=12−frac{32}{3}'],
 ['Simplificamos.','A=frac{4}{3}'],
 ['La cuadratura independiente da el mismo valor positivo.','A≈1,33333'],
 ],'DEFINITE_INTEGRAL_SIGN_CHECK_AND_BARROW',proof(c))
 ];if(c.index===1082)return[
 part(ps[0],'8 m³.',['16 m³.','4 m³.','32 m³.'],['Confundir el tiempo de vaciado con la capacidad.','Evaluar la función en un instante intermedio.','Tomar el denominador del término cuadrático como volumen.'],[['La capacidad es el volumen al comenzar el vaciado.','V(0)=8−0+0²/32=8'],['Conservamos la unidad del enunciado.','Capacidad=8 m³'],['La función también se escribe como un cuadrado, lo que confirma el valor inicial.','V(t)=frac{(t−16)²}{32}; V(0)=8'],['No usamos tiempos negativos ni posteriores al vaciado.','Dominio físico: 0≤t≤16'],['El valor es positivo y coincide con el depósito lleno.','V(0)>0']], 'DIRECT_INITIAL_VALUE_AND_DOMAIN_CHECK',proof(c)),
 part(ps[1],'16 minutos.',['8 minutos.','32 minutos.','El depósito no llega a vaciarse.'],['Confundir V(0)=8 con el tiempo.','Leer el denominador 32 como tiempo.','No reconocer la raíz doble de la función.'],[['El depósito se vacía cuando el volumen se anula.','8−t+frac{t²}{32}=0'],['Multiplicamos por 32.','t²−32t+256=0'],['Factorizamos el trinomio cuadrado perfecto.','(t−16)²=0'],['La única raíz es doble.','t=16'],['Es un tiempo admisible y no negativo.','16 minutos'],['Comprobamos en la función.','V(16)=8−16+256/32=0']], 'QUADRATIC_ROOT_AND_DIRECT_SUBSTITUTION',proof(c)),
 part(ps[2],'En el intervalo físico 0≤t≤16 es la rama decreciente de la parábola V(t)=(t−16)²/32, desde (0,8) hasta el vértice (16,0).',['Es una recta decreciente desde (0,8) hasta (8,0).','Es una parábola creciente desde (0,8).','Es toda la parábola para t∈R, incluyendo volúmenes posteriores al vaciado.'],['Eliminar el término cuadrático.','Invertir la monotonía.','Ignorar el dominio físico del problema.'],[['Completamos el cuadrado.','V(t)=frac{t²−32t+256}{32}=frac{(t−16)²}{32}'],['La parábola abre hacia arriba.','Coeficiente 1/32>0'],['Su vértice es el punto de vaciado.','(16,0)'],['En el dominio físico comienza en el volumen inicial.','V(0)=8'],['La derivada es negativa antes de 16.','V′(t)=−1+t/16<0 para 0≤t<16'],['Representamos solo el proceso real de vaciado.','0≤t≤16']], 'COMPLETING_SQUARE_DOMAIN_AND_MONOTONIC_GRAPH',proof(c),graphs[1082]),
 part(ps[3],'V′(8)=−0,5 m³/min: a los 8 minutos el volumen disminuye a razón de 0,5 m³ por minuto.',['V′(8)=0,5 m³/min: el volumen aumenta.','V′(8)=−1 m³/min.','V′(8)=4 m³/min.'],['Perder el signo negativo al interpretar la tasa.','Omitir la derivada del término cuadrático.','Confundir V(8) con V′(8).'],[['Derivamos la función de volumen.','V′(t)=−1+frac{2t}{32}=−1+frac{t}{16}'],['Evaluamos en t=8.','V′(8)=−1+frac{8}{16}=−frac12'],['La unidad es volumen dividido por tiempo.','m³/min'],['El signo negativo indica disminución.','El depósito pierde agua'],['El valor absoluto expresa la rapidez instantánea de vaciado.','|V′(8)|=0,5 m³/min'],['Comprobamos coherencia: antes de t=16 la gráfica es decreciente.','V′(8)<0']], 'DERIVATIVE_EVALUATION_AND_PHYSICAL_SIGN_INTERPRETATION',proof(c))
 ];throw Error('Unknown asymptote-cubic-tank source');}
export function buildAsymptotesCubicTankBatch(id='batch-0475',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.index===1078?'Límites y asíntotas':c.index===1079?'Análisis de funciones':'Aplicaciones de la derivada';x.secondaryTopics=c.index===1078?['Funciones racionales','Discontinuidades']:c.index===1079?['Representación gráfica','Integrales y áreas']:['Representación gráfica','Razón de cambio'];x.block='Análisis';x.examSlot=c.slot;x.graphRequired=Boolean(graphs[c.index]);x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'EXACT_FUNCTION_DATA_WITH_SYMBOLIC_AND_NUMERICAL_VERIFICATION'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_CALCULUS_METHOD_WITH_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildAsymptotesCubicTankBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0475-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0475.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
