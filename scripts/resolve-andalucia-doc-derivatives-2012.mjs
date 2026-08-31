// Official DOC/MTEF already human-validated; no re-transcription of formulae.
import fs from 'node:fs';import crypto from 'node:crypto';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
const F=(a,b)=>`frac{${a}}{${b}}`;
export const cases=[
 {index:10,literals:['f´(x)=3x^{2}−8x+5','monotonía y la curvatura','punto (1, 1)']},
 {index:37,literals:['Calcule las derivadas','f(x)=e^{3x}⋅ln(2x−5)','g(x)=\\frac{3^{2x}}{x^{2}−1}','h(x)=(3x^{2}+5x−1)^{6}+x^{2}−lnx']},
 {index:44,literals:['f´(x)=x+2','g´(x)=2','polinómica de primer grado']},
 {index:45,literals:['f(x)=2x^{2}+ax+b','punto (1, 3)','x=−2','g(x)=3x^{2}−2x+1','x=1']},
];
export const functions={
 f:{source:'f(x)=e^{3x}·ln(2x−5)',domain:'x>5/2',definitions:'u=e^{3x}; v=ln(2x−5)',inner:`u′=3e^{3x}; v′=${F(2,'2x−5')}`,rule:'(uv)′=u′v+uv′',
  expansion:`f′(x)=3e^{3x}·ln(2x−5) + ${F('2e^{3x}','2x−5')}`,
  answer:`f′(x)=e^{3x}·(3ln(2x−5) + ${F(2,'2x−5')})`,
  wrong:[`f′(x)=e^{3x}·(ln(2x−5) + ${F(2,'2x−5')})`,`f′(x)=e^{3x}·(3ln(2x−5) − ${F(2,'2x−5')})`,`f′(x)=e^{3x}·(3ln(2x−5) + ${F(1,'2x−5')})`],
  reasons:['Omitir el factor tres de la derivada de la exponencial.','Restar, en lugar de sumar, los términos de la derivada del producto.','Omitir la derivada dos del argumento del logaritmo.'],
  value:x=>Math.exp(3*x)*Math.log(2*x-5),derivative:x=>Math.exp(3*x)*(3*Math.log(2*x-5)+2/(2*x-5)),
  alternatives:[x=>Math.exp(3*x)*(Math.log(2*x-5)+2/(2*x-5)),x=>Math.exp(3*x)*(3*Math.log(2*x-5)-2/(2*x-5)),x=>Math.exp(3*x)*(3*Math.log(2*x-5)+1/(2*x-5))],points:[2.7,3.2,3.6]},
 g:{source:`g(x)=${F('3^{2x}','x²−1')}`,domain:'x≠−1; x≠1',definitions:'u=3^{2x}; v=x²−1',inner:'u′=2ln(3)·3^{2x}; v′=2x',rule:`(${F('u','v')})′=${F('u′v−uv′','v²')}`,
  expansion:`g′(x)=${F('2ln(3)·3^{2x}(x²−1)−2x·3^{2x}','(x²−1)²')}`,
  answer:`g′(x)=${F('2·3^{2x}','(x²−1)²')}·((x²−1)ln(3)−x)`,
  wrong:[`g′(x)=${F('2·3^{2x}','(x²−1)²')}·(x²−1−x)`,`g′(x)=${F('2·3^{2x}','(x²−1)²')}·((x²−1)ln(3)+x)`,`g′(x)=${F('2·3^{2x}','x²−1')}·((x²−1)ln(3)−x)`],
  reasons:['Omitir ln(3) al derivar una exponencial de base tres.','Sumar el término uv′ en la regla del cociente.','Olvidar elevar al cuadrado el denominador.'],
  value:x=>3**(2*x)/(x*x-1),derivative:x=>2*3**(2*x)*((x*x-1)*Math.log(3)-x)/(x*x-1)**2,
  alternatives:[x=>2*3**(2*x)*(x*x-1-x)/(x*x-1)**2,x=>2*3**(2*x)*((x*x-1)*Math.log(3)+x)/(x*x-1)**2,x=>2*3**(2*x)*((x*x-1)*Math.log(3)-x)/(x*x-1)],points:[-.7,.3,.6,1.4]},
 h:{source:'h(x)=(3x²+5x−1)⁶+x²−ln(x)',domain:'x>0',definitions:'u=3x²+5x−1',inner:`u′=6x+5; (x²)′=2x; (ln x)′=${F(1,'x')}`,rule:'(u⁶)′=6u⁵u′; derivamos la suma término a término',
  expansion:`h′(x)=6(3x²+5x−1)⁵(6x+5) + 2x − ${F(1,'x')}`,
  answer:`h′(x)=6(3x²+5x−1)⁵(6x+5) + 2x − ${F(1,'x')}`,
  wrong:[`h′(x)=6(3x²+5x−1)⁵ + 2x − ${F(1,'x')}`,`h′(x)=6(3x²+5x−1)⁵(6x+5) + 2x + ${F(1,'x')}`,`h′(x)=6(3x²+5x−1)⁶(6x+5) + 2x − ${F(1,'x')}`],
  reasons:['Omitir la derivada del polinomio interior.','Perder el signo negativo del logaritmo.','No disminuir en una unidad el exponente al derivar la potencia.'],
  value:x=>(3*x*x+5*x-1)**6+x*x-Math.log(x),derivative:x=>6*(3*x*x+5*x-1)**5*(6*x+5)+2*x-1/x,
  alternatives:[x=>6*(3*x*x+5*x-1)**5+2*x-1/x,x=>6*(3*x*x+5*x-1)**5*(6*x+5)+2*x+1/x,x=>6*(3*x*x+5*x-1)**6*(6*x+5)+2*x-1/x],points:[.1,.3,.7,1.2]},
};
export function solve(c,text){const p=officialParts(text),mk=(i,a,w,e,s,v)=>part(p[i],a,w,e,s,'DOC_MTEF_BOUND_DERIVATIVE_SIGN_AND_SUBSTITUTION',v);
 if(c.index===37)return p.map((prompt,i)=>{const key=['f','g','h'][i],s=functions[key];const projected={...prompt,prompt:prompt.prompt.replace(/\\frac(?=\{)/g,'frac')};const result=part(projected,s.answer,s.wrong,s.reasons,[
  ['Identificamos la función oficial y las restricciones de dominio.',s.source+'; '+s.domain],
  ['Separamos las funciones interiores sin cambiar su agrupación.',s.definitions],
  ['Derivamos las funciones interiores. En exponenciales y logaritmos conservamos el factor de la cadena.',s.inner],
  ['Aplicamos la regla indicada a las funciones definidas.',s.rule],
  ['Sustituimos en la regla antes de simplificar.',s.expansion],
  ['Simplificamos únicamente mediante factorización o suma de términos, manteniendo el dominio.',s.answer],
  ['Comprobamos independientemente con cocientes incrementales centrados en puntos interiores del dominio. La derivada no amplía el dominio de la función.',s.domain],
 ],'DERIVATIVE_RULE_AND_INDEPENDENT_CENTRAL_DIFFERENCES',{key,domain:s.domain,samples:s.points.map(x=>({x,derivative:s.derivative(x)}))});if(projected.prompt!==prompt.prompt)result.promptRepresentationEvidence={original:prompt.prompt,projected:projected.prompt,rule:'NATIVE_LATEX_FRAC_TO_RENDERER_FRACTION_TOKEN',mathematicalChange:false};return result;});
 if(c.index===10)return[
  mk(0,'Crece en (−∞;1) y (5/3;+∞); decrece en (1;5/3). Máximo relativo en x=1 y mínimo relativo en x=5/3. Curvatura hacia abajo para x<4/3 y hacia arriba para x>4/3; inflexión en x=4/3.',[
   'Decrece en (−∞;1) y (5/3;+∞); crece en (1;5/3). Mínimo relativo en x=1 y máximo relativo en x=5/3. Curvatura hacia abajo para x<4/3 y hacia arriba para x>4/3; inflexión en x=4/3.',
   'Crece en (−∞;1) y (5/3;+∞); decrece en (1;5/3). Máximo relativo en x=1 y mínimo relativo en x=5/3. Curvatura hacia arriba para x<4/3 y hacia abajo para x>4/3; inflexión en x=4/3.',
   'Crece en (−∞;1) y (5/3;+∞); decrece en (1;5/3). Máximo relativo en x=1 y mínimo relativo en x=5/3. Curvatura hacia abajo para x<5/3 y hacia arriba para x>5/3; inflexión en x=5/3.'
  ],['Invertir el criterio de signo de la primera derivada.','Invertir el criterio de signo de la segunda derivada.','Confundir un cero de f′ con el cero de f″.'],[
   ['No confundimos la derivada dada con la función original. Su signo determina el crecimiento.',"f′(x)=3x²−8x+5"],
   ['Factorizamos el polinomio para localizar los puntos críticos.',"f′(x)=(x−1)(3x−5); f′(x)=0 ⇒ x=1 o x=5/3"],
   ['A la izquierda de uno ambos factores son negativos; entre las raíces tienen signos opuestos; a la derecha ambos son positivos.',"x<1: (+); 1<x<5/3: (−); x>5/3: (+)"],
   ['Aplicamos el criterio de monotonía y el cambio de signo en cada punto crítico.','Crece: (−∞;1) y (5/3;+∞); decrece: (1;5/3); máximo en 1; mínimo en 5/3'],
   ['Derivamos una segunda vez y hallamos su único cero.',"f″(x)=6x−8; f″(x)=0 ⇒ x=4/3"],
   ['El signo de la segunda derivada determina la curvatura; el cambio de signo demuestra la inflexión.',"x<4/3: f″<0, hacia abajo; x>4/3: f″>0, hacia arriba"],
   ['La constante de integración no modifica ni los signos ni estas abscisas. No inventamos las ordenadas de los extremos.','Máximo: x=1; mínimo: x=5/3; inflexión: x=4/3'],
   ['Comprobamos los signos con puntos interiores de los intervalos.',"f′(0)=5; f′(4/3)=−1/3; f′(2)=1; f″(1)=−2; f″(2)=4"],
  ],{critical:[1,5/3],inflection:4/3,derivativeSigns:[1,-1,1],curvatureSigns:[-1,1]}),
  mk(1,'y=1',['y=x','y=3x−2','y=0'],['Confundir la ordenada uno con la pendiente.','Usar solo el término cuadrático de la derivada.','Olvidar que la recta debe pasar por (1,1).'],[
   ['El punto de tangencia está dado por el enunciado.','(x₀;y₀)=(1;1)'],
   ['La pendiente de la tangente es la derivada en la abscisa, no el valor de la función.',"m=f′(1)"],
   ['Sustituimos en el polinomio derivada.',"m=3·1²−8·1+5=0"],
   ['Aplicamos la ecuación punto-pendiente.','y−y₀=m(x−x₀) ⇒ y−1=0(x−1)'],
   ['La tangente es horizontal porque estamos en un punto crítico.','y=1'],
   ['Comprobamos paso por el punto y pendiente.','En x=1, y=1; pendiente=0'],
  ],{point:[1,1],slope:0,intercept:1})];
 if(c.index===44)return[
  mk(0,'f decrece en (−∞;−2) y crece en (−2;+∞); g crece en todo ℝ.',[
   'f crece en (−∞;−2) y decrece en (−2;+∞); g crece en todo ℝ.',
   'f decrece en (−∞;−2) y crece en (−2;+∞); g es constante en ℝ.',
   'f decrece en (−∞;2) y crece en (2;+∞); g crece en todo ℝ.'
  ],['Invertir la relación entre signo de derivada y crecimiento.','Confundir derivada constante positiva con función constante.','Resolver x+2=0 con el signo incorrecto.'],[
   ['El estudio se hace con las derivadas dadas, no con el signo de f y g.',"f′(x)=x+2; g′(x)=2"],
   ['Localizamos el cero de la primera derivada.',"x+2=0 ⇒ x=−2"],
   ['Determinamos el signo a ambos lados.',"x<−2 ⇒ f′<0; x>−2 ⇒ f′>0"],
   ['Traducimos los signos al comportamiento de f.','f decrece en (−∞;−2); f crece en (−2;+∞)'],
   ['La derivada de g es positiva en todos los puntos.',"g′(x)=2>0 ⇒ g estrictamente creciente en ℝ"],
   ['Comprobamos los intervalos con dos abscisas; las constantes aditivas no alteran el resultado.',"f′(−3)=−1; f′(−1)=1; g′(−3)=g′(−1)=2"],
  ],{fCritical:-2,fSigns:[-1,1],gSlope:2}),
  mk(1,'Solo f: f′(−2)=0; g′ no se anula.',[
   'Solo f: f′(2)=0; g′ no se anula.','Solo g: g′(0)=0; f′ no se anula.','Ambas: f′(−2)=0 y g′(2)=0.'
  ],['Cambiar el signo al despejar.','Confundir el valor de la función con el de su derivada.','Interpretar la derivada constante dos como una raíz.'],[
   ['Buscamos ceros de cada derivada, no de las funciones.','Condición: derivada=0'],
   ['Resolvemos para f.',"f′(x)=x+2=0 ⇒ x=−2"],
   ['Comprobamos el valor encontrado.',"f′(−2)=−2+2=0"],
   ['Para g la ecuación es incompatible.',"g′(x)=2; 2=0 no tiene solución"],
   ['Solo f tiene un punto estacionario. La ordenada depende de una constante que no se proporciona.','Abscisa estacionaria de f: −2; ninguna para g'],
   ['El signo de f′ pasa de negativo a positivo, de modo que ese punto es un mínimo relativo.','f: decrece antes de −2 y crece después'],
  ],{fRoots:[-2],gRoots:[]}),
  mk(2,'Solo g: g(x)=2x+C es de primer grado; f es de segundo grado.',[
   'Solo f: f(x)=x+2 es de primer grado; g es constante.','Ambas son de primer grado porque sus derivadas son polinomios.','Ninguna es de primer grado porque las funciones no están dadas explícitamente.'
  ],['Confundir f con la expresión de f′.','No distinguir los grados de las derivadas.','Ignorar que las derivadas determinan el grado salvo constante aditiva.'],[
   ['La derivada de un polinomio de primer grado es una constante distinta de cero.',"(mx+C)′=m; m≠0"],
   ['Aplicamos esta propiedad a g.',"g′(x)=2 ⇒ g(x)=2x+C"],
   ['La pendiente dos es no nula, así que el grado de g es exactamente uno.','Grado de g: 1'],
   ['Una primitiva inmediata de x+2 describe f sin fijar una constante desconocida.',`f(x)=${F('x²',2)}+2x+D`],
   ['El término cuadrático no puede desaparecer al variar D.','Grado de f: 2'],
   ['Derivamos ambas expresiones para comprobar la clasificación.',"g′(x)=2; f′(x)=x+2"],
  ],{gDegree:1,fDegree:2,constantsNotAssigned:true})];
 assert.equal(c.index,45);return[
  mk(0,'a=8; b=−7',['a=−8; b=9','a=8; b=−5','a=4; b=−3'],['Cambiar el signo al imponer f′(−2)=0.','Omitir el término 2x² al usar f(1)=3.','Derivar 2x² como 2x en vez de 4x.'],[
   ['La función debe pasar por el punto dado. Sustituimos sus coordenadas.','f(1)=3 ⇒ 2+a+b=3 ⇒ a+b=1'],
   ['Al ser un polinomio, un extremo interior exige derivada cero.',"f′(x)=4x+a"],
   ['Imponemos la condición en la abscisa indicada.',"f′(−2)=−8+a=0 ⇒ a=8"],
   ['Usamos el paso por el punto para determinar b.','8+b=1 ⇒ b=−7'],
   ['La segunda derivada confirma que el punto crítico es realmente un extremo, no solo un punto estacionario.',"f″(x)=4>0 ⇒ mínimo en x=−2"],
   ['Comprobamos independientemente con la forma de cuadrado completo.','f(x)=2x²+8x−7=2(x+2)²−15'],
   ['El cuadrado es no negativo y se anula en −2; además la función pasa por el punto.','f(−2)=−15; f(1)=2+8−7=3'],
  ],{a:8,b:-7,point:[1,3],minimum:[-2,-15],secondDerivative:4}),
  mk(1,'y=4x−2',['y=4x+2','y=2x','y=6x−4'],['Usar la ordenada dos como término independiente sin aplicar punto-pendiente.','Usar g(1) como pendiente.','Olvidar la derivada del término −2x.'],[
   ['Calculamos la ordenada del punto de tangencia.','g(1)=3−2+1=2'],
   ['Derivamos el polinomio término a término.',"g′(x)=6x−2"],
   ['La pendiente es la derivada en x=1.',"m=g′(1)=6−2=4"],
   ['Aplicamos la fórmula punto-pendiente.','y−2=4(x−1)'],
   ['Despejamos y y conservamos los signos.','y=4x−4+2=4x−2'],
   ['Comprobamos que la recta pasa por (1,2) y que el contacto tiene diferencia cuadrática.','g(x)−(4x−2)=3(x−1)²; en x=1 la diferencia y su derivada son cero'],
  ],{point:[1,2],slope:4,intercept:-2,contactPolynomial:[3,-6,3]})];
}
export function nativeSourceEvidence(exerciseId){const read=p=>fs.readFileSync(p,'utf8').trim().split(/\r?\n/).map(JSON.parse),sha=b=>crypto.createHash('sha256').update(b).digest('hex');const r=read('artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a/andalucia-ccssii-2012-canonical-exercises.jsonl').find(r=>r.exerciseId===exerciseId);assert.ok(r);assert.equal(sha(fs.readFileSync(r.provenance.localPath)),r.documentHash);return r.learnerContent.filter(b=>b.type==='math-equation3').map(b=>{assert.equal(b.validationStatus,'EQUATION3_HUMAN_VALIDATED');for(const [path,hash]of [['pngPath','pngSha256'],['mtefPath','mtefSha256'],['nativePath','nativeSha256']])assert.equal(sha(fs.readFileSync(b.sourceAuthority[path])),b.sourceAuthority[hash]);return{objectId:b.objectId,validationStatus:b.validationStatus,mathAstSha256:b.mathAstSha256,mathmlSha256:b.derived.mathmlSha256,latexSha256:b.derived.latexSha256,sourceAuthority:b.sourceAuthority};});}
export function buildDocDerivativeBatch(id='batch-0340',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({nativeSourceEvidence:nativeSourceEvidence(x.exerciseId),parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Derivadas';x.secondaryTopics=['Regla de la cadena','Monotonía','Tangentes'].filter(t=>x.correctionEvidence.parameters.index===37?t==='Regla de la cadena':t!=='Regla de la cadena');x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='DOC_BOUND_DERIVATIVE_FULL_OFFICIAL_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDocDerivativeBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0340-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0340.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
