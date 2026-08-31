import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';import {renderPolynomialGraph} from './resolve-andalucia-calculus-graph-branches.mjs';
export const cases=[
 {index:80,literals:['120 bocadillos, 70 refrescos y 110','40 bolsas de cada tipo','410 euros'],constraints:[[2,1,120],[1,1,70],[1,2,110],[-1,0,0],[0,-1,0]],objective:[6,5,0],labels:['2x+y≤120','x+y≤70','x+2y≤110','x≥0','y≥0'],domain:{x:[0,70],y:[0,65]}},
 {index:543,literals:['curvatura de f en su dominio','asíntotas de f','1−x']},
 {index:1457,literals:['punto (2, 3)','m = −2','x = 2 y x = 4']},
];
export const areaGraph={schemaVersion:'mathup.calculus-graph.v1',plotVersion:'2020-b-parabola-band-v1',index:1457,xRange:[0,6],yRange:[-6,6],step:[1,2],pieces:[{range:[0,6],coefficients:[-5,6,-1],label:'g(x)=−x²+6x−5',color:'#075597'}],points:[{xy:[1,0],label:'(1;0)',dx:-10,dy:22},{xy:[5,0],label:'(5;0)',dx:12,dy:22},{xy:[3,4],label:'V(3;4)',dx:10,dy:-12},{xy:[2,3],label:'(2;3)',dx:-15,dy:-14},{xy:[4,3],label:'(4;3)',dx:15,dy:-14}],between:{range:[2,4],lower:[0],upper:[-5,6,-1]}};
export function renderPicnicAreaGraph(s){assert.deepEqual(s,areaGraph);return renderPolynomialGraph(s);}
export const piecewise=x=>x<=0?x*x+x+1:1/(1-x),piecewiseDerivative=x=>x<=0?2*x+1:1/(1-x)**2,piecewiseSecond=x=>x<=0?2:2/(1-x)**3;
export function solve(c,text){if(c.index===80){const p=part({id:'whole',prompt:text},'50 bolsas del primer tipo y 20 del segundo; máximo 400 €. No pueden vender 40 de cada tipo ni alcanzar 410 €.',[
 '30 bolsas del primer tipo y 40 del segundo; máximo 380 €. No pueden vender 40 de cada tipo ni alcanzar 410 €.',
 '50 bolsas del primer tipo y 20 del segundo; máximo 400 €. Sí pueden vender 40 de cada tipo, pero no alcanzar 410 €.',
 '50 bolsas del primer tipo y 20 del segundo; máximo 400 €. No pueden vender 40 de cada tipo, pero sí alcanzar 410 €.'
 ],['No comparar el vértice óptimo con el que agota fruta y refrescos.','Comprobar solo bocadillos y omitir refrescos y fruta.','Confundir una combinación algebraica con una combinación factible.'],[
 ['Definimos las cantidades de bolsas; ambas deben ser enteras y no negativas.','x=bolsas del primer tipo; y=bolsas del segundo tipo'],
 ['Contabilizamos por separado los tres recursos, según el contenido de cada bolsa.','Bocadillos: 2x+y≤120; refrescos: x+y≤70; fruta: x+2y≤110'],
 ['Como todas las bolsas se venden, el dinero recaudado es la suma de sus precios.','Maximizar Z=6x+5y; x,y≥0'],
 ['Dibujamos las tres rectas y sombreamos su intersección con el primer cuadrante.','y≤120−2x; y≤70−x; y≤55−x/2'],
 ['En los ejes, los límites más restrictivos son sesenta y cincuenta y cinco.','O=(0;0), A=(60;0), D=(0;55)'],
 ['Intersecamos la frontera de bocadillos con la de refrescos.','2x+y=120; x+y=70 ⇒ x=50, y=20; B=(50;20)'],
 ['Intersecamos refrescos con fruta y descartamos el cruce de bocadillos y fruta porque exige más de setenta refrescos.','C=(30;40); cruce descartado=(130/3;100/3), suma=230/3>70'],
 ['Evaluamos la recaudación en los cinco vértices del polígono sombreado.','Z(O)=0; Z(A)=360; Z(B)=400; Z(C)=380; Z(D)=275'],
 ['Una combinación no negativa de restricciones prueba el máximo para cualquier punto factible.','Z=(2x+y)+4(x+y)≤120+4·70=400'],
 ['La igualdad exige agotar bocadillos y refrescos; el óptimo es único y entero.','x=50; y=20; fruta consumida=50+2·20=90≤110'],
 ['Para cuarenta bolsas de cada tipo, el recurso que falla son los refrescos.','Bocadillos=120; fruta=120>110; refrescos=80>70'],
 ['También falla la fruta. Una sola restricción incumplida basta para descartar la propuesta.','(40;40) no pertenece a la región factible'],
 ['La cota global de cuatrocientos impide recaudar cuatrocientos diez con cualquier combinación admisible.','410>400 ⇒ imposible'],
 ],'EXHAUSTIVE_INTEGER_ENUMERATION_AND_DUAL_GLOBAL_UPPER_BOUND',{...derive(c),constraints:c.constraints,objective:c.objective,optimum:[50,20],maximum:400,dual:[1,4,0],proposal:[40,40],proposalResources:[120,80,120],target:410});p.visual=rationalGraph(c);return[p];}
 const p=officialParts(text),mk=(k,a,w,e,s,v)=>part(p[k],a,w,e,s,'OFFICIAL_PDF_BOUND_DERIVATIVES_LIMITS_AND_INDEPENDENT_POLYNOMIAL_CHECK',v);
 if(c.index===543)return[
 mk(0,'Es continua y derivable en x=0; f(0)=1 y f′(0)=1.',[
 'Es continua pero no derivable en x=0; f(0)=1 y derivadas laterales 1 y −1.','No es continua ni derivable en x=0; los límites laterales son 1 y −1.','Es continua y derivable en x=0; f(0)=1 y f′(0)=0.'
 ],['Perder el signo de la derivada interior del denominador.','Cambiar el signo del límite del cociente.','Confundir continuidad con pendiente nula.'],[
 ['Seleccionamos el tramo que incluye cero para calcular el valor de la función.','f(0)=0²+0+1=1'],
 ['Calculamos el límite por la izquierda en el polinomio.','Límite izquierdo en 0: x²+x+1 → 1'],
 ['El denominador del tramo derecho no se anula en cero.','Límite derecho en 0: frac{1}{1−x} → 1'],
 ['Ambos límites coinciden con el valor: queda demostrada la continuidad.','Límite en 0=f(0)=1'],
 ['Derivamos cada tramo, conservando el signo de la cadena en el cociente.','Izquierda: f′=2x+1; derecha: f′=frac{1}{(1−x)²}'],
 ['Las derivadas laterales coinciden, de modo que la función es derivable.','f′(0−)=1; f′(0+)=1 ⇒ f′(0)=1'],
 ['Comprobamos con la definición de derivada y simplificamos antes de tomar el límite.','h<0: frac{f(h)−f(0)}{h}=1+h; h>0: frac{f(h)−f(0)}{h}=frac{1}{1−h}; ambos →1'],
 ],{value:1,leftDerivative:1,rightDerivative:1}),
 mk(1,'Decrece en (−∞;−1/2); crece en (−1/2;1) y (1;+∞). Curvatura hacia arriba en (−∞;1) y hacia abajo en (1;+∞). Mínimo en (−1/2;3/4); sin inflexión.',[
 'Crece en (−∞;−1/2); decrece en (−1/2;1) y (1;+∞). Curvatura hacia arriba en (−∞;1) y hacia abajo en (1;+∞). Máximo en (−1/2;3/4); sin inflexión.',
 'Decrece en (−∞;−1/2); crece en (−1/2;1) y (1;+∞). Curvatura hacia abajo en (−∞;1) y hacia arriba en (1;+∞). Mínimo en (−1/2;3/4); sin inflexión.',
 'Decrece en (−∞;−1/2); crece en (−1/2;1) y (1;+∞). Curvatura hacia arriba en (−∞;1) y hacia abajo en (1;+∞). Mínimo en (−1/2;3/4); inflexión en x=1.'
 ],['Invertir el criterio de monotonía.','Invertir el criterio de curvatura.','Llamar inflexión a un punto que no pertenece al dominio.'],[
 ['El polinomio está definido para x≤0; el otro tramo excluye x=1.','Dominio: ℝ excepto 1'],
 ['La derivada del tramo izquierdo tiene un único cero.','f′(x)=2x+1=0 ⇒ x=−1/2'],
 ['A ambos lados de ese cero cambia de negativa a positiva; la derivada derecha es siempre positiva en su dominio.','x<−1/2: f′<0; −1/2<x≤0: f′>0; x>0, x≠1: f′>0'],
 ['Unimos intervalos a través de cero porque la función es continua y creciente allí, pero nunca a través de la asíntota.','Decrece (−∞;−1/2); crece (−1/2;1) y (1;+∞)'],
 ['Calculamos el valor del mínimo relativo.','f(−1/2)=1/4−1/2+1=3/4'],
 ['La segunda derivada determina la curvatura sin confundirla con el crecimiento.','x<0: f″=2; x>0: f″=frac{2}{(1−x)³}; en 0, f″=2'],
 ['La segunda derivada es positiva antes de uno y negativa después de uno.','Curvatura hacia arriba: (−∞;1); hacia abajo: (1;+∞)'],
 ['El cambio de curvatura en uno no es un punto de inflexión porque f(1) no existe. En cero no cambia el signo.','No hay puntos de inflexión'],
 ],{domainExcluded:[1],critical:-.5,minimum:[-.5,.75],monotoneSigns:[-1,1,1,1],curvatureSigns:[1,1,-1]}),
 mk(2,'Asíntota vertical x=1; horizontal y=0 cuando x→+∞; ninguna oblicua.',[
 'Asíntota vertical x=−1; horizontal y=0 cuando x→+∞; ninguna oblicua.','Asíntota vertical x=1; horizontal y=1 cuando x→+∞; ninguna oblicua.','Asíntota vertical x=1; horizontal y=0 cuando x→+∞; oblicua y=x+1 cuando x→−∞.'
 ],['Anular 1−x con el signo incorrecto.','Confundir el límite en cero con el límite en infinito.','Omitir el término cuadrático al estudiar la pendiente asintótica.'],[
 ['La única posible asíntota vertical está donde se anula el denominador del tramo derecho.','1−x=0 ⇒ x=1'],
 ['Calculamos los límites laterales según el signo del denominador.','x→1−: f→+∞; x→1+: f→−∞'],
 ['Al crecer x hacia infinito se utiliza exclusivamente el tramo racional.','x→+∞: frac{1}{1−x}→0 ⇒ y=0'],
 ['Hacia menos infinito se utiliza exclusivamente el polinomio.','x→−∞: x²+x+1→+∞; no hay horizontal'],
 ['Una asíntota oblicua necesita pendiente finita no nula. El cociente por x del polinomio no tiene límite finito.','x→−∞: frac{f(x)}{x}=x+1+frac{1}{x}→−∞'],
 ['Hacia más infinito la pendiente límite es cero y ya se obtuvo la horizontal. El punto cero es regular.','No hay oblicuas; vertical x=1; horizontal y=0 en +∞'],
 ],{vertical:[1],verticalSigns:[1,-1],horizontal:0,horizontalEnd:'positive',oblique:[]})];
 assert.equal(c.index,1457);const a=mk(0,'a=−1; b=2',['a=1; b=−2','a=−2; b=4','a=−1; b=0'],['Invertir el signo de la pendiente dada.','Derivar ax² como ax en vez de 2ax.','Omitir el término bx al usar el paso por el punto.'],[
 ['El punto (2,3) pertenece a la gráfica.','4a+2b+3=3 ⇒ 2a+b=0'],
 ['Derivamos antes de imponer la pendiente en ese punto.','f′(x)=2ax+b'],
 ['La pendiente de la tangente vale menos dos.','f′(2)=4a+b=−2'],
 ['Restamos las dos ecuaciones para eliminar b.','(4a+b)−(2a+b)=−2−0 ⇒ 2a=−2 ⇒ a=−1'],
 ['Sustituimos en la primera ecuación.','−2+b=0 ⇒ b=2'],
 ['Comprobamos independientemente las dos condiciones en la función resultante.','f(x)=−x²+2x+3; f(2)=3; f′(2)=−4+2=−2'],
 ],{a:-1,b:2,point:[2,3],slope:-2});
 const b=mk(1,'Parábola hacia abajo, vértice (3;4), raíces 1 y 5; región entre x=2 y x=4 por encima del eje; área frac{22}{3}.',[
 'Parábola hacia abajo, vértice (3;4), raíces 1 y 5; región entre x=2 y x=4 por encima del eje; área frac{32}{3}.','Parábola hacia abajo, vértice (3;4), raíces 1 y 5; región entre x=2 y x=4 por encima del eje; área 8.','Parábola hacia abajo, vértice (3;4), raíces 1 y 5; región entre x=2 y x=4 por encima del eje; área −frac{22}{3}.'
 ],['Integrar entre las raíces en vez de entre las rectas dadas.','Usar el rectángulo de altura máxima como si fuera toda la región.','Invertir el orden de los extremos o restar curva superior a inferior.'],[
 ['Completamos el cuadrado para representar correctamente la parábola.','g(x)=4−(x−3)²; vértice (3;4), abre hacia abajo'],
 ['Hallamos los cortes y los valores en las rectas de cierre.','g=0 ⇒ x=1,5; g(2)=g(4)=3'],
 ['La gráfica adjunta sombrea solo el intervalo impuesto, no todo el arco entre las raíces.','2≤x≤4; 0≤y≤g(x)'],
 ['La función es positiva en ese intervalo: el área es su integral, sin cambio de signo.','A=∫_{2}^{4}(−x²+6x−5) dx'],
 ['Calculamos una primitiva término a término.','H(x)=−frac{x³}{3}+3x²−5x'],
 ['Aplicamos Barrow y mantenemos fracciones exactas.','H(4)=frac{20}{3}; H(2)=−frac{2}{3}; A=frac{22}{3}'],
 ['La simetría alrededor de tres permite comprobar el valor por una segunda integral.','A=2·∫_{0}^{1}(4−u²) du=2·(4−frac{1}{3})=frac{22}{3}'],
 ],{roots:[1,5],vertex:[3,4],limits:[2,4],area:22/3,wrongAreas:[32/3,8,-22/3]});b.visual=structuredClone(areaGraph);return[a,b];
}
export function buildPicnicPiecewiseBatch(id='batch-0341',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){const lp=x.correctionEvidence.parameters.index===80;x.primaryTopic=lp?'Programación lineal':'Derivadas';x.secondaryTopics=lp?['Región factible','Optimización']:['Continuidad','Curvatura','Asíntotas','Integrales definidas y áreas'];x.block=lp?'Sistemas y programación lineal':'Análisis';x.examSlot=lp?2:3;if(lp)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='COMPLETE_OFFICIAL_2020_B_QUESTION_SCOPE';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildPicnicPiecewiseBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0341-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0341.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
