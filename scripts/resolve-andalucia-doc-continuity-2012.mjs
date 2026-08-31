import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {projectNativePiecewise} from './project-andalucia-native-piecewise.mjs';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {part,officialParts} from './resolve-andalucia-inference-multipart.mjs';import {nativeSourceEvidence} from './resolve-andalucia-doc-derivatives-2012.mjs';
export const cases=[
 {index:17,literals:['f(t)=\\frac{11t+20}{t+2}','superficie afectada inicialmente','crece o decrece','algún límite']},
 {index:23,literals:['ax^{2}+3x','x^{2}−bx−4','derivable en x = 2','g(x)=\\frac{x+2}{x−1}','x = 0']},
 {index:27,literals:['−x^{2}+ax−7','4x−b','x≥1','derivable en']},
];
export function solve(c,text){const p=c.index===27?[{id:'whole',prompt:text}]:officialParts(text),mk=(i,a,w,why,s,e)=>{const projection=projectNativePiecewise(p[i].prompt),r=part({...p[i],prompt:projection.text},a,w,why,s,'NATIVE_DOC_CONTINUITY_DERIVATIVES_AND_ALGEBRAIC_IDENTITIES',e);if(projection.changes.length)r.promptRepresentationEvidence={original:p[i].prompt,projected:projection.text,changes:projection.changes,mathematicalChange:false};return r;};
 if(c.index===17)return[
 mk(0,'Superficie inicial: 10 km².',['Superficie inicial: 20 km².','Superficie inicial: 11 km².','Superficie inicial: 0 km².'],['Olvidar el denominador al evaluar en cero.','Confundir el valor inicial con el límite a largo plazo.','Confundir tiempo inicial cero con superficie cero.'],[
 ['El tiempo se mide desde que comienza la observación.','t≥0; instante inicial t=0'],
 ['Identificamos la función oficial y comprobamos que está definida inicialmente.','f(t)=frac{11t+20}{t+2}; 0+2≠0'],
 ['Sustituimos cero en el numerador.','11·0+20=20'],
 ['Sustituimos cero en el denominador y dividimos.','f(0)=frac{20}{2}=10'],
 ['La unidad de la función es superficie, no longitud.','Superficie inicial: 10 km²'],
 ['La descomposición algebraica proporciona una comprobación independiente.','f(t)=11−frac{2}{t+2}; f(0)=11−1=10'],
 ],{initial:10,wrong:[20,11,0]}),
 mk(1,'La mancha crece estrictamente para todo t≥0.',[
 'La mancha decrece estrictamente para todo t≥0.','La mancha permanece constante para todo t≥0.','La mancha crece hasta t=2 y después decrece.'
 ],['Invertir el orden del numerador en la regla del cociente.','Suponer que tender a un límite implica ser constante.','Tomar el término del denominador como punto crítico.'],[
 ['Para estudiar crecimiento necesitamos el signo de la derivada.','f(t)=frac{11t+20}{t+2}; t≥0'],
 ['Aplicamos la regla del cociente respetando el orden de los términos.','f′(t)=frac{11(t+2)−(11t+20)}{(t+2)²}'],
 ['Simplificamos el numerador completo.','11t+22−11t−20=2'],
 ['En todo el dominio físico el denominador es positivo.','f′(t)=frac{2}{(t+2)²}>0'],
 ['La derivada positiva demuestra crecimiento estricto, sin cambios de monotonía.','Creciente en [0,+∞)'],
 ['Lo verificamos sin derivar comparando dos tiempos t₂>t₁≥0.','f(t₂)−f(t₁)=frac{2(t₂−t₁)}{(t₁+2)(t₂+2)}>0'],
 ],{derivativeNumerator:2,monotonicity:'STRICTLY_INCREASING',wrong:['DECREASING','CONSTANT','TURN_AT_2']}),
 mk(2,'Límite de la superficie: 11 km²; no se alcanza en tiempo finito.',[
 'Límite de la superficie: 10 km²; no se alcanza en tiempo finito.','La superficie no tiene límite finito y tiende a +∞.','Límite de la superficie: 11 km²; se alcanza en t=2.'
 ],['Tomar el valor inicial como límite.','Considerar solo el numerador e ignorar el cociente.','Confundir acercamiento asintótico con llegada al límite.'],[
 ['Estudiamos tiempos arbitrariamente grandes dentro del dominio físico.','t→+∞'],
 ['Dividimos numerador y denominador por t; no usamos L’Hôpital.','f(t)=frac{11+frac{20}{t}}{1+frac{2}{t}}'],
 ['Los términos inversamente proporcionales al tiempo tienden a cero.','frac{20}{t}→0; frac{2}{t}→0'],
 ['El cociente tiende al cociente de los términos restantes.','Límite=frac{11}{1}=11 km²'],
 ['La diferencia con once es positiva para todo tiempo finito.','11−f(t)=frac{2}{t+2}>0'],
 ['Por tanto crece acercándose a once, pero nunca alcanza esa superficie en un tiempo finito.','10≤f(t)<11 para t≥0'],
 ],{limit:11,unattained:true,wrong:[{limit:10},{limit:'INFINITE'},{limit:11,attainedAt:2}]})];
 if(c.index===23)return[
 mk(0,'a=2; b=−7',['a=2; b=7','a=−2; b=1','a=1; b=−5'],['Perder el signo al despejar b.','Invertir el signo del parámetro cuadrático.','Cumplir continuidad pero no igualdad de derivadas.'],[
 ['Cada tramo es polinómico; solo hay que comprobar la unión en x=2. La derivabilidad exige primero continuidad.','f izquierda=ax²+3x; f derecha=x²−bx−4'],
 ['Igualamos los valores laterales y el valor del tramo que incluye la unión.','4a+6=4−2b−4=−2b'],
 ['Simplificamos la condición de continuidad.','2a+b=−3'],
 ['Derivamos cada expresión dentro de su tramo.','f′ izquierda=2ax+3; f′ derecha=2x−b'],
 ['Igualamos las derivadas laterales en la unión.','4a+3=4−b ⇒ 4a+b=1'],
 ['Restamos las dos ecuaciones para eliminar b.','(4a+b)−(2a+b)=1−(−3) ⇒ 2a=4 ⇒ a=2'],
 ['Sustituimos en continuidad para determinar el segundo parámetro.','4+b=−3 ⇒ b=−7'],
 ['Comprobamos tanto valores como pendientes, no solo una de las condiciones.','Valores: 14=14; pendientes: 11=11'],
 ],{a:2,b:-7,join:2,value:14,slope:11,wrong:[[2,7],[-2,1],[1,-5]]}),
 mk(1,'y=−3x−2',['y=3x−2','y=−2x−2','y=−3x+2'],['Invertir el signo en la regla del cociente.','Usar la ordenada del punto como pendiente.','Cambiar el signo de la ordenada inicial.'],[
 ['La función está definida en cero porque el denominador no se anula.','g(0)=frac{2}{−1}=−2'],
 ['Aplicamos la regla del cociente.','g′(x)=frac{(x−1)−(x+2)}{(x−1)²}'],
 ['Simplificamos el numerador.','g′(x)=frac{−3}{(x−1)²}'],
 ['La pendiente de la tangente es la derivada en la abscisa dada.','m=g′(0)=−3'],
 ['Aplicamos punto-pendiente y despejamos.','y−(−2)=−3(x−0) ⇒ y=−3x−2'],
 ['El contacto se verifica también mediante una diferencia con factor cuadrático.','g(x)−(−3x−2)=frac{3x²}{x−1}'],
 ['La diferencia y su derivada se anulan en cero, confirmando punto y pendiente.','g(0)=−2; g′(0)=−3'],
 ],{point:[0,-2],slope:-3,intercept:-2,wrong:[[3,-2],[-2,-2],[-3,2]]})];
 assert.equal(c.index,27);return[mk(0,'a=6; b=6',['a=4; b=8','a=6; b=−6','a=6; b=4'],['No derivar el término −x² antes de igualar pendientes.','Cambiar el signo de b al imponer continuidad.','Omitir un término constante en la unión.'],[
 ['Los dos tramos son polinomios y solo pueden fallar al unirse en x=1.','f izquierda=−x²+ax−7; f derecha=4x−b'],
 ['Derivabilidad implica continuidad en la unión.','−1+a−7=4−b ⇒ a+b=12'],
 ['Calculamos las derivadas de los tramos.','f′ izquierda=−2x+a; f′ derecha=4'],
 ['Igualamos las pendientes laterales en uno.','−2+a=4 ⇒ a=6'],
 ['Sustituimos en la condición de continuidad.','6+b=12 ⇒ b=6'],
 ['Comprobamos los valores de los dos tramos en la unión.','−1+6−7=−2; 4−6=−2'],
 ['Comprobamos las derivadas y concluimos en todo el dominio, no solo en la unión.','−2+6=4; pendientes iguales; derivable en R'],
 ],{a:6,b:6,join:1,value:-2,slope:4,wrong:[[4,8],[6,-6],[6,4]]})];
}
export function buildDocContinuityBatch(id='batch-0355',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({nativeSourceEvidence:nativeSourceEvidence(x.exerciseId),parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){if(!x.sourceSubparts.length)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.primaryTopic='Derivadas';x.block='Análisis';x.examSlot=3;x.secondaryTopics=['Continuidad','Límites','Tangentes'];x.qualityGates.pedagogical='DOC_BOUND_CONTINUITY_AND_DERIVATIVE_CHECKS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDocContinuityBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0355-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0355.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
