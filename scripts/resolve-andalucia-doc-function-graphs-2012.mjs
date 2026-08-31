// Three native-source exercises; parameters of independent subparts stay separate.
import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {part,officialParts} from './resolve-andalucia-inference-multipart.mjs';
import {nativeSourceEvidence} from './resolve-andalucia-doc-derivatives-2012.mjs';
import {projectNativePiecewise} from './project-andalucia-native-piecewise.mjs';
import {renderPolynomialGraph} from './resolve-andalucia-calculus-graph-branches.mjs';
export const cases=[
 {index:0,literals:['ax^{2}−2x','x≤2','\\frac{x}{2}−b','x>2','mínimo en x = 1','a = 1.5 y b = 0.5']},
 {index:3,literals:['f(x)=\\frac{ax}{x+b}','x=−2','y=3','g(x)=x^{3}−3x^{2}+2','extremos relativos']},
 {index:28,literals:['at−t^{2}','0≤t≤6','6<t≤10','millones de euros','primeros 6 años']},
];
const base={schemaVersion:'mathup.calculus-graph.v1',plotVersion:'native-2012-function-graphs-v1'};
export const graphSpecs={
 0:{...base,index:0,xRange:[-2,6],yRange:[-2,11],step:[1,2],pieces:[
  {range:[-2,2],coefficients:[0,-2,1.5],rightClosed:true,label:'x≤2: (3/2)x²−2x; continúa hacia la izquierda',color:'#075597'},
  {range:[2,6],coefficients:[-.5,.5],leftOpen:true,label:'x>2: x/2−1/2; continúa hacia la derecha',color:'#075597'}],
  points:[{xy:[2/3,-2/3],label:'V(2/3;−2/3)',dx:-10,dy:24},{xy:[2,2],label:'(2;2) cerrado',dx:12,dy:-12},{xy:[2,.5],label:'(2;1/2) abierto',open:true,dx:12,dy:23}]},
 3:{...base,index:3,xRange:[-1.5,3.5],yRange:[-10,10],step:[1,2],pieces:[
  {range:[-1.5,3.5],coefficients:[2,0,-3,1],label:'g(x)=x³−3x²+2; continúa fuera de la ventana',color:'#075597'}],
  points:[{xy:[0,2],label:'Máx. (0;2)',dx:-12,dy:-12},{xy:[2,-2],label:'Mín. (2;−2)',dx:12,dy:24},{xy:[1,0],label:'(1;0)',dx:12,dy:-12}]},
 28:{...base,index:28,xRange:[0,10],yRange:[0,22],step:[1,4],axisLabels:['t (años)','B (millones de euros)'],pieces:[
  {range:[0,6],coefficients:[0,8,-1],leftClosed:true,rightClosed:true,label:'0≤t≤6: 8t−t²',color:'#075597'},
  {range:[6,10],coefficients:[0,2],rightClosed:true,label:'6<t≤10: 2t; la unión (6;12) pertenece al primer tramo',color:'#075597'}],
  points:[{xy:[4,16],label:'(4;16)',dx:-12,dy:-13},{xy:[6,12],label:'(6;12)',dx:12,dy:23},{xy:[10,20],label:'(10;20)',dx:-12,dy:-13}]},
};
export function renderDocFunctionGraph(spec){assert.deepEqual(spec,graphSpecs[spec.index],'Only independently verified native graph');return renderPolynomialGraph(spec);}
export function solve(c,text){const pp=officialParts(text),mk=(i,a,w,why,s,e,graph=false)=>{const p=projectNativePiecewise(pp[i].prompt),r=part({...pp[i],prompt:p.text},a,w,why,s,'NATIVE_SOURCE_DIFFERENTIATION_LIMITS_AND_POLYNOMIAL_IDENTITIES',e);if(p.changes.length)r.promptRepresentationEvidence={original:pp[i].prompt,projected:p.text,changes:p.changes,mathematicalChange:false};if(graph)r.visual=structuredClone(graphSpecs[c.index]);return r;};
 if(c.index===0)return[
  mk(0,'a=1; b=1.', ['a=1; b=−1.','a=2; b=−3.','a=−1; b=9.'],['Cambiar el signo al despejar b en la condición de continuidad.','Cumplir continuidad pero colocar el mínimo en otra abscisa.','Confundir un máximo con un mínimo y no cumplir la condición de derivada.'],[
   ['Los dos tramos son polinomios; solo hay que imponer continuidad en su unión x=2.','4a−4=1−b ⇒ 4a+b=5'],
   ['El punto x=1 está en el interior del tramo cuadrático. Un mínimo allí exige derivada nula.','f′(x)=2ax−2; f′(1)=2a−2=0'],
   ['Despejamos a y comprobamos que el extremo es un mínimo.','a=1; f″(x)=2a=2>0'],
   ['Sustituimos en la condición de continuidad para hallar el otro parámetro.','4·1+b=5 ⇒ b=1'],
   ['Verificamos la continuidad con las fórmulas resultantes.','f(2)=2²−2·2=0; límite derecho=frac{2}{2}−1=0'],
   ['El cuadrado completo da además el valor mínimo y confirma el signo. La rama derecha es positiva para x>2.','f izquierda=(x−1)²−1≥−1; f(1)=−1; f derecha=frac{x}{2}−1>0'],
  ],{parameters:[1,1],continuityEquation:[4,1,5],minimum:[1,-1],wrong:[[1,-1],[2,-3],[-1,9]]}),
  mk(1,'Parábola con V(2/3;−2/3), (2;2) cerrado; semirrecta y=x/2−1/2 con (2;1/2) abierto.',[
   'Parábola con V(2/3;−2/3), (2;2) abierto; semirrecta y=x/2−1/2 con (2;1/2) cerrado.',
   'Parábola con V(1;−1), (2;0) cerrado; semirrecta y=x/2−1 con (2;0) abierto.',
   'Parábola con V(2/3;−2/3), (2;2) cerrado; semirrecta y=x/2+1 con (2;2) abierto.'
  ],['Intercambiar la pertenencia de x=2 a los tramos.','Reutilizar los parámetros del apartado anterior en vez de los que fija este apartado.','Modificar b para unir artificialmente los tramos.'],[
   ['Ahora se fijan nuevos parámetros, distintos de los obtenidos en a).','f izquierda=frac{3}{2}x²−2x para x≤2; f derecha=frac{x}{2}−frac{1}{2} para x>2'],
   ['La primera rama es una parábola abierta hacia arriba. Completamos el cuadrado.','frac{3}{2}x²−2x=frac{3}{2}(x−frac{2}{3})²−frac{2}{3}; V=(frac{2}{3};−frac{2}{3})'],
   ['Determinamos los cortes y la variación para construir la rama de la gráfica.','x(frac{3}{2}x−2)=0 ⇒ x=0 o x=frac{4}{3}; f′=3x−2'],
   ['El extremo de esa rama está incluido por la desigualdad del documento.','f(2)=6−4=2; punto (2;2) cerrado'],
   ['La rama derecha tiene pendiente positiva y no incluye x=2.','Pendiente=frac{1}{2}; límite derecho=1−frac{1}{2}=frac{1}{2}; punto (2;frac{1}{2}) abierto'],
   ['Dibujamos cada rama separadamente y no añadimos una línea vertical en el salto.','Límite izquierdo=2≠frac{1}{2}=límite derecho; salto de −frac{3}{2}'],
  ],{parameters:[1.5,.5],vertex:[2/3,-2/3],roots:[0,4/3],closed:[2,2],open:[2,.5],wrong:['SWAPPED_OWNERSHIP','PREVIOUS_PARAMETERS','FORCED_CONTINUITY']},true),
 ];
 if(c.index===3)return[
  mk(0,'a=3; b=2.', ['a=3; b=−2.','a=2; b=3.','a=−3; b=2.'],['Tomar la abscisa de la asíntota como b, olvidando que x=−b.','Intercambiar las condiciones horizontal y vertical.','Cambiar el signo del cociente de coeficientes dominantes.'],[
   ['Una asíntota vertical requiere un cero del denominador que no se cancele con el numerador.','x+b=0 ⇒ x=−b'],
   ['La asíntota vertical dada es x=−2.','−b=−2 ⇒ b=2'],
   ['Calculamos el límite en el infinito dividiendo numerador y denominador por x.','f(x)=frac{a}{1+frac{b}{x}} ⇒ límite=a'],
   ['Igualamos la altura de la asíntota horizontal a la dada.','a=3'],
   ['Comprobamos que el numerador no se anula en el polo y, por tanto, no hay cancelación.','Numerador en −2: 3·(−2)=−6≠0'],
   ['La descomposición confirma ambas asíntotas y sus comportamientos laterales.','f(x)=3−frac{6}{x+2}; límite en −2 por la izquierda=+∞; por la derecha=−∞; límite en ±∞=3'],
  ],{parameters:[3,2],pole:-2,horizontal:3,numeratorAtPole:-6,wrong:[[3,-2],[2,3],[-3,2]]}),
  mk(1,'Dominio ℝ; crece en (−∞;0) y (2;+∞); decrece en (0;2); máximo (0;2), mínimo (2;−2).',[
   'Dominio ℝ; decrece en (−∞;0) y (2;+∞); crece en (0;2); mínimo (0;2), máximo (2;−2).',
   'Dominio ℝ; crece en (−∞;0) y (1;+∞); decrece en (0;1); máximo (0;2), mínimo (1;0).',
   'Dominio ℝ excepto 0 y 2; crece en (−∞;0) y (2;+∞); decrece en (0;2); no tiene extremos.'
  ],['Invertir el signo de la derivada en los tres intervalos.','Derivar −3x² como −3x en lugar de −6x.','Excluir los ceros de la derivada del dominio de un polinomio.'],[
   ['Un polinomio está definido para todo número real.','Dominio de g=ℝ; g(x)=x³−3x²+2'],
   ['Derivamos cada término y factorizamos.','g′(x)=3x²−6x=3x(x−2)'],
   ['Los únicos puntos críticos separan tres intervalos. Comprobamos un valor de cada uno.','g′(−1)=9>0; g′(1)=−3<0; g′(3)=9>0'],
   ['Traducimos el signo de la derivada a la variación de la función.','Crece en (−∞;0) y (2;+∞); decrece en (0;2)'],
   ['En cero pasa de creciente a decreciente; en dos ocurre lo contrario.','Máximo relativo (0;g(0))=(0;2); mínimo relativo (2;g(2))=(2;−2)'],
   ['La segunda derivada proporciona una comprobación independiente y sitúa la inflexión.','g″(x)=6x−6; g″(0)=−6<0; g″(2)=6>0; inflexión (1;0)'],
   ['Añadimos los cortes para el esbozo: la curva es continua, sin extremos abiertos ni asíntotas.','g(x)=(x−1)(x²−2x−2); ceros: 1, 1−√3, 1+√3; corte OY (0;2)'],
   ['La gráfica adjunta mantiene los extremos y la variación; sus ramas continúan fuera de la ventana.','g(x)→−∞ cuando x→−∞; g(x)→+∞ cuando x→+∞'],
  ],{coefficients:[2,0,-3,1],critical:[0,2],max:[0,2],min:[2,-2],inflexion:[1,0],roots:[1,1-Math.sqrt(3),1+Math.sqrt(3)],wrong:['REVERSED_SIGNS','MISSING_DERIVATIVE_FACTOR','EXCLUDED_CRITICAL_POINTS']},true),
 ];
 if(c.index===28)return[
  mk(0,'a=8.', ['a=4.','a=6.','a=−4.'],['Cambiar el signo del límite derecho y resolver 6a−36=−12.','Igualar la parábola a cero en la unión.','Cambiar −36 por +36 y resolver 6a+36=12.'],[
   ['El dominio del modelo es de cero a diez años. Cada fórmula es continua en su tramo.','B izquierda=at−t²; B derecha=2t; unión t=6'],
   ['El valor en seis pertenece al primer tramo, que incluye ese instante.','B(6)=6a−36'],
   ['Calculamos el límite derecho mediante la fórmula del segundo tramo.','Límite derecho en 6=2·6=12'],
   ['La continuidad exige igualdad de ambos valores; no exige igualdad de pendientes.','6a−36=12 ⇒ 6a=48'],
   ['Dividimos por seis y verificamos sustituyendo.','a=8; 6·8−36=12'],
   ['Los extremos del intervalo no introducen otra condición: las fórmulas son polinómicas.','B es continua en [0;10] para a=8'],
  ],{parameter:8,left:12,right:12,wrong:[4,6,-4]}),
  mk(1,'Crece de 0 a 4 y de 6 a 10; decrece de 4 a 6. Pasa por (0;0), (4;16), (6;12) y (10;20).',[
   'Crece de 0 a 4 y de 6 a 10; decrece de 4 a 6. Pasa por (0;0), (4;16), (6;12) y (10;−20).',
   'Crece de 0 a 6 y decrece de 6 a 10. Pasa por (0;0), (4;16), (6;12) y (10;20).',
   'Decrece de 0 a 4 y de 6 a 10; crece de 4 a 6. Pasa por (0;0), (4;16), (6;12) y (10;20).'
  ],['Evaluar en diez con la fórmula cuadrática fuera de su tramo.','Tomar la unión como máximo y asignar a la recta pendiente negativa.','Invertir el signo de ambas derivadas.'],[
   ['Para a=8 el primer tramo es una parábola hacia abajo y el segundo una recta.','B₁(t)=8t−t²; B₂(t)=2t'],
   ['Derivamos la parábola y localizamos su único punto crítico interior.','B₁′(t)=8−2t=0 ⇒ t=4'],
   ['La derivada cambia de positiva a negativa en cuatro.','B₁′>0 en (0;4); B₁′<0 en (4;6)'],
   ['La segunda rama crece porque su pendiente es positiva.','B₂′(t)=2>0 en (6;10)'],
   ['Calculamos los puntos que fijan el esbozo y comprobamos la unión.','B(0)=0; B(4)=16; B(6)=12; B(10)=20'],
   ['Dibujamos la parábola solo hasta seis y la recta después. Se unen sin salto, pero con una esquina.','B₁′(6)=−4≠2=B₂′(6); dominio [0;10]'],
  ],{first:[0,8,-1],second:[0,2],turning:[4,6],points:[[0,0],[4,16],[6,12],[10,20]],slopesAtJoin:[-4,2],wrong:['WRONG_ENDPOINT','WRONG_TURNING_POINT','REVERSED_SIGNS']},true),
  mk(2,'En el año 4: beneficio máximo de 16 millones de euros durante los primeros 6 años.',[
   'En el año 10: beneficio máximo de 20 millones de euros durante los primeros 6 años.',
   'En el año 6: beneficio máximo de 12 millones de euros durante los primeros 6 años.',
   'En el año 4: beneficio máximo de 8 millones de euros durante los primeros 6 años.'
  ],['Buscar el máximo en los diez años, fuera del intervalo solicitado.','Comparar solo los extremos y omitir el punto crítico.','Evaluar incorrectamente la fórmula en el instante del máximo.'],[
   ['El apartado restringe expresamente la búsqueda a los primeros seis años.','0≤t≤6; B(t)=8t−t²'],
   ['En el interior, los candidatos a máximo satisfacen derivada cero.','B′(t)=8−2t=0 ⇒ t=4'],
   ['La segunda derivada negativa demuestra que el punto crítico es máximo.','B″(t)=−2<0'],
   ['Para el máximo absoluto del intervalo cerrado comparamos también sus extremos.','B(0)=0; B(4)=32−16=16; B(6)=48−36=12'],
   ['El cuadrado completo confirma independientemente que ningún otro instante del intervalo supera dieciséis.','B(t)=16−(t−4)²≤16; igualdad únicamente para t=4'],
   ['Interpretamos las unidades del modelo. El valor del año diez no responde a este apartado.','Máximo en los primeros seis años: 16 millones de euros, en t=4 años'],
  ],{interval:[0,6],maximum:[4,16],endpointValues:[0,12],wrong:[[10,20],[6,12],[4,8]]}),
 ];throw Error('Unknown official DOC graph');
}
export function buildDocFunctionGraphsBatch(id='batch-0357',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({nativeSourceEvidence:nativeSourceEvidence(x.exerciseId),parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Derivadas';x.secondaryTopics=['Continuidad','Representación gráfica','Extremos'];x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='COMPLETE_NATIVE_FUNCTION_SUBPARTS_WITH_CHECKED_GRAPHS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDocFunctionGraphsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0357-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0357.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
