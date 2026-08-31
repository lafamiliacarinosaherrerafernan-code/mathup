import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {part,officialParts} from './resolve-andalucia-inference-multipart.mjs';import {nativeSourceEvidence} from './resolve-andalucia-doc-derivatives-2012.mjs';import {renderRationalBranchPlot} from './resolve-andalucia-calculus-rational-plots.mjs';
export const cases=[{index:31,literals:['porcentaje de células','t^{2}','0≤t≤5','100t−250','t+5','t>5','valer 50']},{index:41,literals:['f(x)=1−\\frac{2}{x+2}','monotonía y curvatura','asíntotas','gráficamente']}];
export const graphSpec={schemaVersion:'mathup.calculus-graph.v1',plotVersion:'native-2012-rational-graph-v1',index:41,xRange:[-7,5],yRange:[-6,7],step:[1,2],pieces:[
 {range:[-7,-2.08],numerator:[0,1],denominator:[2,1],label:'x<−2: f(x)=1−2/(x+2); rama superior'},
 {range:[-1.92,5],numerator:[0,1],denominator:[2,1],label:'x>−2: f(x)=1−2/(x+2); rama inferior'}],asymptotes:[{axis:'x',value:-2},{axis:'y',value:1}],points:[{xy:[0,0],label:'(0;0)',dx:12,dy:-13},{xy:[-3,3],label:'(−3;3)',dx:-12,dy:-13},{xy:[-1,-1],label:'(−1;−1)',dx:12,dy:24}]};
export function renderDocRationalGraph(spec){assert.deepEqual(spec,graphSpec,'Only verified native rational plot');return renderRationalBranchPlot(spec);}
export function solve(c,text){const pp=officialParts(text),mk=(i,a,w,why,s,e,graph=false)=>{const r=part(pp[i],a,w,why,s,'NATIVE_RATIONAL_DERIVATIVES_BRANCH_DOMAIN_AND_SUBSTITUTION',e);if(graph)r.visual=structuredClone(graphSpec);return r;};
 if(c.index===31)return[
  mk(0,'P es continua en todo su dominio [0;+∞). En t=5 ambos límites y P(5) valen 25%.',[
   'P es discontinua en t=5: el límite izquierdo vale 25% y el derecho 50%.','P es discontinua en t=5: el límite izquierdo vale 25% y el derecho 100%.','P es discontinua en t=−5, que pertenece al dominio del modelo.'
  ],['Dividir 250 entre 5 en vez de entre 10 en el límite derecho.','Sustituir el límite temporal infinito en la unión.','Extender el dominio racional a tiempos negativos no incluidos.'],[
   ['El tiempo se mide desde cero; las ramas cubren todos los tiempos no negativos.','Dominio: [0;+∞); P₁(t)=t² para 0≤t≤5; P₂(t)=frac{100t−250}{t+5} para t>5'],
   ['La primera rama es continua por ser polinómica. El denominador de la segunda no se anula en su tramo.','t>5 ⇒ t+5>10>0'],
   ['Solo hace falta comprobar la unión interior en cinco.','P(5)=5²=25; límite izquierdo=25'],
   ['Evaluamos el límite derecho con la fórmula racional.','frac{100·5−250}{5+5}=frac{250}{10}=25'],
   ['Los dos límites coinciden con el valor de la función.','Límite izquierdo=P(5)=límite derecho=25'],
   ['En cero la continuidad se entiende por la derecha, dentro del dominio físico.','P(0)=0; límite en 0⁺=0; P continua en [0;+∞)'],
  ],{join:5,left:25,right:25,value:25,domain:[0,null],wrong:['RIGHT50','RIGHT100','NEGATIVE_TIME']}),
  mk(1,'P no es derivable en t=5: derivada izquierda 10 y derivada derecha 7,5.',[
   'P es derivable en t=5: ambas derivadas valen 10.','P es derivable en t=5: ambas derivadas valen 7,5.','P no es derivable en t=5: derivada izquierda 10 y derivada derecha −7,5.'
  ],['Confundir continuidad con igualdad de pendientes y repetir la derivada izquierda.','Aplicar la rama racional también al lado izquierdo.','Invertir el orden de la regla del cociente.'],[
   ['La función es continua en cinco, pero esto no garantiza derivabilidad.','P(5)=25'],
   ['Derivamos la rama cuadrática y tomamos el límite izquierdo de su derivada.','P₁′(t)=2t; P′(5⁻)=10'],
   ['Aplicamos la regla del cociente a la rama derecha.','P₂′(t)=frac{100(t+5)−(100t−250)}{(t+5)²}'],
   ['Simplificamos el numerador antes de evaluar.','100t+500−100t+250=750; P₂′(t)=frac{750}{(t+5)²}'],
   ['Calculamos la pendiente derecha y la comparamos con la izquierda.','P′(5⁺)=frac{750}{100}=7,5≠10'],
   ['Confirmamos con el cociente incremental derecho usando P₂(t)=100−750/(t+5).','frac{P(5+h)−25}{h}=frac{75}{10+h}→7,5; por la izquierda: 10+h→10'],
  ],{leftDerivative:10,rightDerivative:7.5,derivativeNumerator:750,wrong:[[10,10],[7.5,7.5],[10,-7.5]]}),
  mk(2,'El porcentaje crece para todo t≥0; pasa de 0% a 25% en cinco meses y se aproxima a 100% sin alcanzarlo.',[
   'El porcentaje crece hasta t=5 y después decrece hacia 0%.','El porcentaje crece para todo t≥0 y supera 100% en un tiempo finito.','El porcentaje crece hasta alcanzar 25% en t=5 y permanece constante después.'
  ],['Cambiar el signo de la derivada racional.','Ignorar el límite y la cota de cien por ciento.','Confundir el cambio de pendiente con detención del crecimiento.'],[
   ['En el interior del primer tramo la derivada es positiva.','P₁′(t)=2t>0 para 0<t<5'],
   ['En el segundo tramo el numerador y el denominador de la derivada son positivos.','P₂′(t)=frac{750}{(t+5)²}>0 para t>5'],
   ['La unión es continua, por lo que el crecimiento no se interrumpe con un salto descendente.','P(0)=0; P(5)=25'],
   ['Descomponemos la segunda rama para estudiar el comportamiento a largo plazo.','P₂(t)=100−frac{750}{t+5}'],
   ['La fracción positiva tiende a cero sin anularse en tiempo finito.','25<P(t)<100 para t>5; límite cuando t→+∞=100'],
   ['El tejido afectado aumenta durante toda la observación. Después de cinco meses el crecimiento continúa, cada vez más lentamente.','P₂″(t)=−frac{1500}{(t+5)³}<0; no se alcanza 100% en tiempo finito'],
  ],{start:0,joinValue:25,limit:100,unattained:true,wrong:['DECREASING_AFTER_5','EXCEEDS100','CONSTANT_AFTER_5']}),
  mk(3,'Sí: alcanza el 50% a los 10 meses.', ['Sí: alcanza el 50% a los √50 meses.','Sí: alcanza el 50% a los 5 meses.','No: nunca alcanza el 50%.'],['Resolver t²=50 sin comprobar que la raíz queda fuera del primer tramo.','Confundir la unión de las ramas con el instante del porcentaje solicitado.','Confundir el valor asintótico 100% con el valor pedido 50%.'],[
   ['En los primeros cinco meses los valores van de cero a veinticinco.','0≤t≤5 ⇒ 0≤t²≤25'],
   ['La raíz que saldría de t²=50 no pertenece al tramo cuadrático y se descarta.','√50>5'],
   ['Buscamos el porcentaje solicitado en la rama válida para t>5.','frac{100t−250}{t+5}=50'],
   ['Multiplicamos por el denominador positivo y despejamos.','100t−250=50t+250 ⇒ 50t=500 ⇒ t=10'],
   ['Comprobamos tanto el dominio como la sustitución en la fórmula.','10>5; P(10)=frac{1000−250}{15}=50'],
   ['El crecimiento estricto demuestra que no hay otro instante con el mismo porcentaje.','Única solución física: 10 meses'],
  ],{time:10,percentage:50,wrong:[Math.sqrt(50),5,null]}),
 ];
 if(c.index===41)return[
  mk(0,'Crece en (−∞;−2) y (−2;+∞); curvatura hacia arriba a la izquierda y hacia abajo a la derecha; sin extremos ni inflexiones.',[
   'Decrece en (−∞;−2) y (−2;+∞); curvatura hacia arriba a la izquierda y hacia abajo a la derecha; sin extremos ni inflexiones.',
   'Crece en (−∞;−2) y (−2;+∞); curvatura hacia abajo a la izquierda y hacia arriba a la derecha; sin extremos ni inflexiones.',
   'Crece en (−∞;−2) y (−2;+∞); curvatura hacia arriba a la izquierda y hacia abajo a la derecha; inflexión en x=−2.'
  ],['Olvidar el segundo signo negativo al derivar el inverso.','Invertir el signo de la segunda derivada.','Declarar inflexión en un punto que no pertenece al dominio.'],[
   ['Excluimos el cero del denominador antes de estudiar derivadas.','Dominio: ℝ∖{−2}; f(x)=1−2(x+2)⁻¹'],
   ['Aplicamos la regla de la potencia compuesta a la primera derivada.','f′(x)=2(x+2)⁻²=frac{2}{(x+2)²}>0'],
   ['La función crece en cada intervalo de su dominio, no a través del polo.','Creciente en (−∞;−2) y (−2;+∞); sin extremos relativos'],
   ['Derivamos de nuevo y estudiamos el signo del cubo.','f″(x)=−frac{4}{(x+2)³}'],
   ['A la izquierda el denominador es negativo; a la derecha, positivo.','x<−2 ⇒ f″>0: curvatura hacia arriba; x>−2 ⇒ f″<0: hacia abajo'],
   ['El cambio de curvatura ocurre entre ramas desconectadas. No existe punto de la gráfica en menos dos.','No hay puntos de inflexión; f″ nunca se anula en el dominio'],
  ],{excluded:-2,firstNumerator:2,secondNumerator:-4,extrema:[],inflexions:[],wrong:['FIRST_SIGN','SECOND_SIGN','POLE_AS_INFLEXION']}),
  mk(1,'Asíntota vertical x=−2 y horizontal y=1; no hay asíntota oblicua.',[
   'Asíntota vertical x=2 y horizontal y=1; no hay asíntota oblicua.','Asíntota vertical x=−2 y horizontal y=−1; no hay asíntota oblicua.','Asíntota vertical x=−2 y horizontal y=0; no hay asíntota oblicua.'
  ],['Cambiar el signo al anular x+2.','Cambiar el signo del término constante.','Omitir la constante uno al calcular el límite.'],[
   ['El denominador se anula en menos dos y el numerador del término fraccionario no se anula.','x+2=0 ⇒ x=−2; numerador=2≠0'],
   ['Aproximamos desde la izquierda: la fracción es negativa y de módulo creciente.','Límite de f en −2⁻=+∞'],
   ['Desde la derecha el cociente es positivo y se resta.','Límite de f en −2⁺=−∞'],
   ['El límite infinito acredita la asíntota vertical.','Asíntota vertical: x=−2'],
   ['En ambos infinitos el término inverso tiende a cero y permanece la constante.','Límite de f cuando x→±∞=1 ⇒ asíntota horizontal y=1'],
   ['Una pendiente oblicua no nula es incompatible con este límite finito.','Límite f(x)/x=0; no hay asíntota oblicua'],
  ],{vertical:-2,horizontal:1,leftSign:1,rightSign:-1,wrong:[[2,1],[-2,-1],[-2,0]]}),
  mk(2,'Dos ramas crecientes: izquierda sobre y=1, derecha bajo y=1; asíntotas x=−2 e y=1; corte (0;0).',[
   'Dos ramas decrecientes: izquierda sobre y=1, derecha bajo y=1; asíntotas x=−2 e y=1; corte (0;0).',
   'Dos ramas crecientes: izquierda bajo y=1, derecha sobre y=1; asíntotas x=−2 e y=1; corte (0;0).',
   'Dos ramas crecientes: izquierda sobre y=1, derecha bajo y=1; asíntotas x=2 e y=1; corte (0;0).'
  ],['Dibujar orientación opuesta al signo positivo de la derivada.','Invertir la posición de las ramas respecto a la horizontal.','Situar el polo en el signo contrario.'],[
   ['Usamos las asíntotas y la variación demostradas, manteniendo separadas las dos ramas.','x=−2; y=1; f′>0 en ambos intervalos'],
   ['Calculamos el corte horizontal despejando la ecuación, con denominador no nulo.','1−frac{2}{x+2}=0 ⇒ x+2=2 ⇒ x=0'],
   ['El corte vertical es el mismo punto.','f(0)=1−frac{2}{2}=0'],
   ['Comparamos con la asíntota horizontal según el signo del denominador.','x<−2 ⇒ f(x)>1; x>−2 ⇒ f(x)<1'],
   ['Dos puntos adicionales fijan la posición y la curvatura del esbozo.','f(−3)=3; f(−1)=−1'],
   ['La gráfica adjunta muestra ambas ramas sin unirlas a través del polo y con aproximación a la horizontal.','Rama izquierda: 1⁺→+∞; rama derecha: −∞→1⁻'],
  ],{intercepts:[[0,0]],points:[[-3,3],[-1,-1]],pole:-2,horizontal:1,wrong:['DECREASING','SWAPPED_BRANCH_SIDES','POLE_SIGN']},true),
 ];throw Error('Unknown native rational exercise');}
export function buildDocRationalFunctionsBatch(id='batch-0359',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({nativeSourceEvidence:nativeSourceEvidence(x.exerciseId),parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Derivadas';x.secondaryTopics=['Continuidad','Derivabilidad','Asíntotas','Representación gráfica'];x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='FULL_NATIVE_RATIONAL_FUNCTIONS_WITH_DOMAIN_AND_CURVATURE';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDocRationalFunctionsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0359-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0359.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
