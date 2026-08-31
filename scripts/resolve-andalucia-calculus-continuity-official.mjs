import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derivativeSpecs} from './resolve-andalucia-calculus-derivatives-official.mjs';
const F=(a,b)=>`frac{${a}}{${b}}`;
export const cases=[
 {index:124,literals:['Obtenga el valor de a','monotonía y extremos relativos']},
 {index:188,literals:['continua en todo su dominio','monotonía y curvatura']},
 {index:1354,literals:['tipo de','discontinuidad','asíntotas']},
 {index:1477,literals:['crecimiento y decrecimiento','máximo de la función']},
 {index:1482,literals:['todos los puntos de su dominio','área de la región limitada']},
 {index:1502,literals:['índice de audiencia','Calcule la derivada']},
];
export const functions={
 124:(x,a)=>x<0?(2*x+1)/(1-2*x):x*x-x-a,
 188:(x,a)=>x<0?1/(x-1):x*x+a,
 1354:x=>x<=1?x**3+2*x*x-3:1+1/(x-2),
 1477:x=>x<=2?x*x/3:4/(x+1),
 1482:x=>x<3?(x-2)**2:4-x,
 1502:t=>-t*t/100+4*t/5+20,
};
// Explicit mathematical graphs derived from the official functions. Segment
// boundaries and endpoint ownership are data, never a guessed continuous line.
export const graphSpecs={
 1477:{schemaVersion:'mathup.calculus-graph.v1',index:1477,xRange:[0,10],yRange:[0,1.7],step:[2,.5],pieces:[{range:[0,2],expression:'x²/3'},{range:[2,10],expression:'4/(x+1)'}],points:[[0,0,'(0;0)'],[2,4/3,'Máximo (2;4/3)']],asymptote:0},
 1482:{schemaVersion:'mathup.calculus-graph.v1',index:1482,xRange:[0,5],yRange:[-1.5,4.7],step:[1,1],pieces:[{range:[0,3],expression:'(x−2)²'},{range:[3,5],expression:'4−x'}],points:[[2,0,'(2;0)'],[3,1,'(3;1)'],[4,0,'(4;0)']],area:[2,4]},
 1502:{schemaVersion:'mathup.calculus-graph.v1',index:1502,xRange:[0,60],yRange:[0,42],step:[10,10],pieces:[{range:[0,60],expression:'−t²/100+4t/5+20'}],points:[[0,20,'(0;20)'],[40,36,'Máximo (40;36)'],[60,32,'(60;32)']],axisLabels:['t (min)','Audiencia (puntos)']},
};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function renderCalculusGraph(spec){
 assert.deepEqual(spec,graphSpecs[spec.index],'Only the independently checked function graph is accepted');
 const W=760,H=440,L=64,T=34,R=26,B=48,xmin=spec.xRange[0],xmax=spec.xRange[1],ymin=spec.yRange[0],ymax=spec.yRange[1],f=functions[spec.index];
 const X=x=>L+(x-xmin)/(xmax-xmin)*(W-L-R),Y=y=>T+(ymax-y)/(ymax-ymin)*(H-T-B),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`;
 let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfica de la función oficial, ejes y puntos relevantes"><rect width="760" height="440" fill="white"/>`;
 for(let x=xmin;x<=xmax+1e-9;x+=spec.step[0])s+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)}" stroke="#e1e5eb"/><text x="${X(x)}" y="${Y(0)+21}" text-anchor="middle" font-size="15">${x}</text>`;
 for(let y=Math.ceil(ymin/spec.step[1])*spec.step[1];y<=ymax;y+=spec.step[1])s+=`<path d="M${pt(xmin,y)} L${pt(xmax,y)}" stroke="#e1e5eb"/><text x="${L-8}" y="${Y(y)+5}" text-anchor="end" font-size="15">${Number(y.toFixed(4))}</text>`;
 s+=`<path d="M${pt(xmin,0)} L${pt(xmax,0)} M${pt(0,ymin)} L${pt(0,ymax)}" stroke="#333" stroke-width="1.5"/>`;
 if(spec.area){const [a,b]=spec.area,pts=Array.from({length:241},(_,i)=>{const x=a+(b-a)*i/240;return pt(x,f(x));});s+=`<polygon points="${pt(a,0)} ${pts.join(' ')} ${pt(b,0)}" fill="#bbdfef" stroke="none"/>`;for(const x of[a,b])s+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)}" stroke="#72899b" stroke-dasharray="4 4"/>`;}
 for(const piece of spec.pieces){const [a,b]=piece.range,pts=Array.from({length:241},(_,i)=>{const x=a+(b-a)*i/240;return pt(x,f(x));});s+=`<polyline points="${pts.join(' ')}" fill="none" stroke="#075597" stroke-width="3"/>`;}
 for(const [x,y,label]of spec.points){const anchor=x===xmax?'end':x===xmin?'start':'middle';s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="#075597"/><text x="${X(x)}" y="${Y(y)-13}" text-anchor="${anchor}" font-size="16">${esc(label)}</text>`;}
 s+=`<text x="${W-R}" y="${H-7}" text-anchor="end" font-size="16">${esc(spec.axisLabels?.[0]??'x')}</text><text x="${L}" y="20" font-size="16">${esc(spec.axisLabels?.[1]??'f(x)')}</text>`;
 if(spec.area)s+='<text x="455" y="72" font-size="16">Área entre x=2 y x=4: 5/6 u²</text>';
 return s+'</svg>';
}
export function solve(c,text){const p=officialParts(text),mk=(k,a,w,reasons,s,proof,graph)=>{const x=part(p[k],a,w,reasons,s,'OFFICIAL_PIECEWISE_LIMITS_DERIVATIVES_AND_INDEPENDENT_SUBSTITUTION',proof);if(graph)x.visual=structuredClone(graphSpecs[graph]);return x;};
 if(c.index===124)return[
 mk(0,'a=−1; continua pero no derivable en x=0.', ['a=1; continua pero no derivable en x=0.','a=−1; continua y derivable en x=0.','a=0; continua pero no derivable en x=0.'],['Perder el signo de −a.','No comparar derivadas laterales.','Confundir el valor del parámetro con el punto de unión.'],[
 ['El denominador del primer tramo no se anula para x<0; solo debemos comprobar la unión en cero.',`f₁(x)=${F('2x+1','1−2x')}; f₂(x)=x²−x−a`],
 ['Calculamos ambos límites y el valor en cero.','lim f(0⁻)=1; lim f(0⁺)=−a; f(0)=−a'],
 ['La continuidad exige los tres valores iguales.','1=−a ⇒ a=−1'],
 ['Derivamos cada tramo, respetando la regla del cociente.',`f₁′(x)=${F('2(1−2x)+2(2x+1)','(1−2x)²')}=${F(4,'(1−2x)²')}; f₂′(x)=2x−1`],
 ['Las derivadas laterales son distintas, aunque la función ya sea continua.',"f′(0⁻)=4; f′(0⁺)=−1; 4≠−1"],
 ['Comprobamos el parámetro y concluimos.', 'f(0)=1=lim f(0⁻)=lim f(0⁺); no existe f′(0)'],
 ],{a:-1,limits:[1,1],derivatives:[4,-1]}),
 mk(1,`Crece en (−∞;0) y (${F(1,2)};+∞); decrece en (0;${F(1,2)}); mínimo (${F(1,2)};−${F(9,4)}), sin máximo relativo.`,[
 `Decrece en (−∞;0) y (0;${F(1,2)}); crece en (${F(1,2)};+∞); mínimo (${F(1,2)};−${F(9,4)}), sin máximo relativo.`,
 `Crece en (−∞;0) y (${F(1,2)};+∞); decrece en (0;${F(1,2)}); máximo (${F(1,2)};−${F(9,4)}), sin mínimo relativo.`,
 `Crece en (−∞;0) y (${F(1,2)};+∞); decrece en (0;${F(1,2)}); mínimo (${F(1,2)};−2), sin máximo relativo.`],['Cambiar el signo de la derivada racional.','Intercambiar máximo y mínimo.','Usar f(0) como ordenada del extremo.'],[
 ['Ahora se fija a=2. No conservamos el parámetro del apartado anterior.','f₂(x)=x²−x−2; f(0)=−2'],
 ['La derivada racional es estrictamente positiva en su tramo.',`f₁′(x)=${F(4,'(1−2x)²')}>0 si x<0`],
 ['En el segundo tramo la derivada se anula en un medio y cambia de negativa a positiva.',`2x−1=0 ⇒ x=${F(1,2)}; f₂′<0 antes y >0 después`],
 ['Calculamos la ordenada del mínimo.',`f(${F(1,2)})=${F(1,4)}−${F(1,2)}−2=−${F(9,4)}`],
 ['La unión en cero es un salto. No se puede aplicar allí f′=0 ni unir intervalos a través del salto.','lim f(0⁻)=1; f(0)=−2; para x>0 pequeño, f(x)<−2'],
 ['Cero no es extremo: tiene valores mayores a su izquierda y menores a su derecha. El único extremo es el mínimo calculado.',`f′(−1)=${F(4,9)}>0; f′(${F(1,4)})=−${F(1,2)}; f′(1)=1`],
 ],{a:2,critical:.5,minimum:[.5,-2.25],signSamples:[[-1,4/9],[.25,-.5],[1,1]],zeroIsExtremum:false})];
 if(c.index===188)return[
 mk(0,'a=−1; continua en ℝ y derivable salvo en x=0.', ['a=1; continua en ℝ y derivable salvo en x=0.','a=−1; continua y derivable en todo ℝ.','a=0; continua en ℝ y derivable salvo en x=0.'],['Perder el signo del denominador en cero.','No comparar las derivadas laterales.','Tomar el punto de unión como parámetro.'],[
 ['En x<0 el denominador x−1 nunca se anula; en x≥0 hay un polinomio. El dominio es ℝ.',`f₁(x)=${F(1,'x−1')}; f₂(x)=x²+a`],
 ['Calculamos límites y valor en el único punto de unión.','lim f(0⁻)=−1; lim f(0⁺)=a; f(0)=a'],
 ['Imponemos continuidad.','a=−1'],
 ['Derivamos los dos tramos.',`f₁′(x)=−${F(1,'(x−1)²')}; f₂′(x)=2x`],
 ['Las derivadas laterales no coinciden en cero.',"f′(0⁻)=−1; f′(0⁺)=0 ⇒ no derivable en 0"],
 ['En los demás puntos las fórmulas racional y polinómica son derivables.','Continua en ℝ; derivable en ℝ∖{0}'],
 ],{a:-1,derivatives:[-1,0]}),
 mk(1,'Con a=−2: decrece en (−∞;0), crece en (0;+∞); curvatura hacia abajo en (−∞;0) y hacia arriba en (0;+∞); no tiene inflexión.',[
 'Con a=−2: decrece en (−∞;0), crece en (0;+∞); curvatura hacia abajo en (−∞;0) y hacia arriba en (0;+∞); inflexión en (0;−2).',
 'Con a=−2: crece en (−∞;0), decrece en (0;+∞); curvatura hacia abajo en (−∞;0) y hacia arriba en (0;+∞); no tiene inflexión.',
 'Con a=−2: decrece en (−∞;0), crece en (0;+∞); curvatura hacia arriba en (−∞;0) y hacia abajo en (0;+∞); no tiene inflexión.'],['Declarar inflexión en una discontinuidad.','Invertir el signo de f′.','Invertir el signo de f″.'],[
 ['El apartado fija a=−2. Hay un salto en cero.', 'lim f(0⁻)=−1; f(0)=lim f(0⁺)=−2'],
 ['La primera derivada determina la monotonía.',`x<0:f′=−${F(1,'(x−1)²')}<0; x>0:f′=2x>0`],
 ['Por tanto, decrece a la izquierda y crece a la derecha.','decrece:(−∞;0); crece:(0;+∞)'],
 ['La segunda derivada determina la curvatura.',`x<0:f″=${F(2,'(x−1)³')}<0; x>0:f″=2>0`],
 ['La curvatura cambia al atravesar cero, pero la función no es continua allí. No es un punto de inflexión.','−1≠−2 ⇒ no hay inflexión en cero'],
 ['En el interior de cada tramo la curvatura tiene signo estricto, de modo que tampoco hay otros puntos de inflexión.',`f″(−1)=−${F(1,4)}; f″(1)=2`],
 ],{a:-2,firstSamples:[[-1,-.25],[1,2]],secondSamples:[[-1,-.25],[1,2]],inflections:[]})];
 if(c.index===1354)return[
 mk(0,'Dominio ℝ∖{2}; continua en todo su dominio; discontinuidad infinita en x=2.',[
 'Dominio ℝ∖{2}; discontinuidad de salto en x=1 e infinita en x=2.','Dominio ℝ∖{2}; continua en todo su dominio; discontinuidad evitable en x=2.','Dominio ℝ; continua en todos los puntos.'],['No evaluar ambos tramos en la unión.','Ignorar que los límites divergen.','Omitir el cero del denominador.'],[
 ['El polinomio del primer tramo no restringe el dominio; el segundo excluye dos.',`f₁=x³+2x²−3; f₂=1+${F(1,'x−2')}; D=ℝ∖{2}`],
 ['Comprobamos el punto de unión uno.','f(1)=1+2−3=0; lim f(1⁺)=1−1=0'],
 ['La función es continua en uno y en el interior de cada tramo del dominio.','lim f(1⁻)=f(1)=lim f(1⁺)=0'],
 ['En dos el numerador de la fracción es uno y el denominador tiende a cero.','lim f(2⁻)=−∞; lim f(2⁺)=+∞'],
 ['Se trata de una discontinuidad infinita, no evitable, en el punto excluido.','Continua en ℝ∖{2}; en x=2 hay una asíntota vertical'],
 ],{domainExclusions:[2],at1:[0,0,0],at2:['-Infinity','Infinity']}),
 mk(1,'Derivable en ℝ∖{1,2}; no derivable en x=1 y no definida en x=2.',[
 'Derivable en ℝ∖{2}; también derivable en x=1.','Derivable en ℝ∖{1}; también definida y derivable en x=2.','No derivable en ningún punto de (1;2).'],['Confundir continuidad con derivabilidad.','Ignorar la exclusión del dominio.','Confundir un intervalo con su asíntota frontera.'],[
 ['Derivamos por separado en el interior de los tramos.',`f₁′=3x²+4x; f₂′=−${F(1,'(x−2)²')}`],
 ['La continuidad en uno ya se ha demostrado, pero faltan las derivadas laterales.',"f′(1⁻)=3+4=7"],
 ['La derivada derecha tiene otro valor.',"f′(1⁺)=−1"],
 ['Como no coinciden, hay una esquina y no existe derivada en uno.','7≠−1'],
 ['Dos ni siquiera pertenece al dominio; en el resto las fórmulas son derivables.',`f′(x)=3x²+4x si x<1; −${F(1,'(x−2)²')} si x>1, x≠2`],
 ],{at1:[7,-1],excluded:[1,2]}),
 mk(2,'Asíntota vertical x=2; horizontal y=1 hacia +∞; no hay oblicua.',[
 'Asíntota vertical x=−2; horizontal y=1 hacia +∞; no hay oblicua.','Asíntota vertical x=2; horizontal y=0 hacia +∞; no hay oblicua.','Asíntota vertical x=2; horizontal y=1 hacia ambos infinitos; no hay oblicua.'],['Cambiar el signo del cero del denominador.','Omitir la constante uno.','Usar el tramo derecho en el infinito negativo.'],[
 ['La discontinuidad infinita del tramo racional da la asíntota vertical.','x=2'],
 ['Hacia +∞ se aplica el tramo racional.',`lim (1+${F(1,'x−2')})=1`],
 ['Por ello hay asíntota horizontal y=1 únicamente a la derecha.','f(x)−1→0 cuando x→+∞'],
 ['Hacia −∞ se aplica el polinomio cúbico, no la expresión racional.','f(x)=x³+2x²−3→−∞'],
 ['El cociente f(x)/x diverge a la izquierda; no hay pendiente finita de una oblicua. A la derecha ya hay horizontal.',`f(x)/x=x²+2x−${F(3,'x')}→+∞ cuando x→−∞`],
 ],{vertical:[2],horizontal:{right:1,left:null},oblique:[]})];
 if(c.index===1477)return[
 mk(0,`Continua en [0;+∞); derivable en (0;2)∪(2;+∞), no derivable en x=2.`,[
 'Continua y derivable en todo (0;+∞).','Discontinua y no derivable en x=2.','Continua en [0;+∞); no derivable en ningún punto de (2;+∞).'],['Igualar continuidad y derivabilidad.','Comparar mal los valores laterales.','Confundir el punto de unión con todo el tramo.'],[
 ['El dominio comienza en cero. Se comprueba continuidad relativa al dominio en ese extremo.',`D=[0;+∞); f(0)=0=lim f(0⁺)`],
 ['Los tramos se unen en dos. Evaluamos valores laterales.',`f(2)=${F(4,3)}; lim f(2⁺)=${F(4,3)}`],
 ['Por tanto, la función es continua en todo su dominio.','lim f(2⁻)=f(2)=lim f(2⁺)'],
 ['Derivamos los tramos abiertos.',`f₁′=${F('2x',3)}; f₂′=−${F(4,'(x+1)²')}`],
 ['Las derivadas laterales en dos difieren.',`f′(2⁻)=${F(4,3)}; f′(2⁺)=−${F(4,9)}`],
 ['No es derivable en dos. En cero solo existe derivada derecha; no se exige derivada bilateral fuera del dominio.','f′(0⁺)=0; derivable en (0;2)∪(2;+∞)'],
 ],{domain:[0,'Infinity'],at2:{values:[4/3,4/3],derivatives:[4/3,-4/9]},rightDerivative0:0}),
 mk(1,`Crece en (0;2); decrece en (2;+∞); máximo absoluto (2;${F(4,3)}).`,[
 `Decrece en (0;2); crece en (2;+∞); mínimo absoluto (2;${F(4,3)}).`,'Crece en (0;2); decrece en (2;+∞); máximo absoluto (2;4).',`Crece en (0;3); decrece en (3;+∞); máximo absoluto (3;${F(4,3)}).`],['Invertir signos y tipo de extremo.','Omitir el denominador tres.','Cambiar el punto de unión.'],[
 ['La derivada en el tramo parabólico es positiva para x>0.',`f₁′=${F('2x',3)}>0 en (0;2)`],
 ['En el tramo racional la derivada es estrictamente negativa.',`f₂′=−${F(4,'(x+1)²')}<0 en (2;+∞)`],
 ['La función continua aumenta hasta dos y disminuye después: el máximo es absoluto.',`f(2)=${F(4,3)}`],
 ['Para representar, situamos el origen, el máximo y puntos de ambos tramos.',`(0;0), (1;${F(1,3)}), (2;${F(4,3)}), (3;1), (7;${F(1,2)})`],
 ['El primer tramo es convexo; el segundo se aproxima al eje horizontal desde arriba.',`f₁″=${F(2,3)}>0; f₂″=${F(8,'(x+1)³')}>0; lim f(+∞)=0`],
 ['La gráfica adjunta conserva la esquina en dos y el dominio no negativo.',`máximo=(2;${F(4,3)}); mínimo absoluto=(0;0)`],
 ],{maximum:[2,4/3],signs:[1,-1],samplePoints:[[0,0],[1,1/3],[2,4/3],[3,1],[7,.5]]},1477)];
 if(c.index===1482)return[
 mk(0,'Continua en ℝ; derivable en ℝ∖{3}; no derivable en x=3.',[
 'Continua y derivable en todo ℝ.','Discontinua y no derivable en x=3.','Continua en ℝ; no derivable en x=2 ni en x=3.'],['No comparar las pendientes laterales.','Confundir esquina con salto.','Considerar que una derivada nula impide derivabilidad.'],[
 ['Ambos tramos son polinomios y el dominio es toda la recta.', 'f₁=(x−2)² si x<3; f₂=4−x si x≥3'],
 ['Comprobamos los tres valores en la unión.','lim f(3⁻)=(3−2)²=1; f(3)=lim f(3⁺)=4−3=1'],
 ['Coinciden, por lo que hay continuidad en tres y en todo el dominio.','1=1'],
 ['Calculamos las derivadas de cada tramo.',"f₁′=2x−4; f₂′=−1"],
 ['Las pendientes laterales en tres no coinciden.',"f′(3⁻)=2; f′(3⁺)=−1 ⇒ no derivable en 3"],
 ['En dos la derivada sí existe y vale cero; en el resto también existe.',"f′(2)=0; derivable en ℝ∖{3}"],
 ],{at3:{values:[1,1],derivatives:[2,-1]},domainExclusions:[]}),
 mk(1,'Parábola y=(x−2)² para x<3, con vértice (2;0), unida en (3;1) a la recta y=4−x para x≥3.',[
 'Parábola y=−(x−2)² para x<3, con vértice (2;0), unida a la recta y=4−x para x≥3.','Parábola y=(x−2)² para x<3, con vértice (2;0), seguida por la recta y=x−4 para x≥3.','Parábola y=(x+2)² para x<3, con vértice (−2;0), seguida por la recta y=4−x para x≥3.'],['Cambiar la apertura de la parábola.','Cambiar el signo de la recta.','Cambiar la traslación del vértice.'],[
 ['Completamos el cuadrado para reconocer la parábola.', 'x²−4x+4=(x−2)²'],
 ['Su vértice está en dos y solo se usa hasta x<3.','vértice:(2;0); punto de unión:(3;1)'],
 ['El segundo tramo es una recta de pendiente −1.', 'y=4−x; pasa por (3;1) y (4;0)'],
 ['La función disminuye hasta dos, aumenta hasta tres y vuelve a disminuir.',"f′=2x−4 en x<3; f′=−1 en x>3"],
 ['Representamos ambos tramos sin prolongar uno sobre el dominio del otro.', 'En x=3 el punto (3;1) pertenece al tramo lineal; los límites coinciden'],
 ['La gráfica adjunta muestra los cortes y la esquina sin añadir discontinuidad.', 'cortes OX:(2;0),(4;0); corte OY:(0;4)'],
 ],{vertex:[2,0],join:[3,1],lineSlope:-1,roots:[2,4]},1482),
 mk(2,`${F(5,6)} u²`,[`${F(1,6)} u²`,`${F(4,3)} u²`,'1 u²'],['Restar dos áreas positivas.','Prolongar la parábola hasta cuatro.','Olvidar el factor un medio del triángulo.'],[
 ['La región pedida está entre x=2 y x=4. La función cambia de expresión en tres.', 'f=(x−2)² en [2;3]; f=4−x en [3;4]'],
 ['Ambos tramos son no negativos en esos intervalos: el área es la suma de dos integrales.', 'A=∫_{2}^{3}(x−2)² dx+∫_{3}^{4}(4−x) dx'],
 ['Calculamos la primera con una primitiva inmediata.',`[${F('(x−2)³',3)}]_{2}^{3}=${F(1,3)}`],
 ['Calculamos la segunda por Barrow.',`[4x−${F('x²',2)}]_{3}^{4}=8−${F(15,2)}=${F(1,2)}`],
 ['Sumamos magnitudes positivas y damos unidades cuadradas.',`A=${F(1,3)}+${F(1,2)}=${F(5,6)} u²`],
 ['Comprobamos la segunda región como triángulo de base y altura uno. La gráfica adjunta sombrea exactamente la región.',`A₂=${F('1·1',2)}=${F(1,2)}; A>0`],
 ],{intervals:[[2,3],[3,4]],areas:[1/3,.5],area:5/6},1482)];
 if(c.index===1502)return[
 mk(0,`a=−${F(1,100)}; b=${F(4,5)}; c=20; f(t)=−${F('t²',100)}+${F('4t',5)}+20, 0≤t≤60.`,[
 `a=${F(1,100)}; b=−${F(4,5)}; c=20; f(t)=${F('t²',100)}−${F('4t',5)}+20, 0≤t≤60.`,
 `a=−${F(1,100)}; b=${F(4,5)}; c=36; f(t)=−${F('t²',100)}+${F('4t',5)}+36, 0≤t≤60.`,
 `a=−${F(1,50)}; b=${F(8,5)}; c=20; f(t)=−${F('t²',50)}+${F('8t',5)}+20, 0≤t≤60.`],['Cambiar el signo y convertir máximo en mínimo.','Usar el máximo como valor inicial.','Duplicar los coeficientes sin respetar la altura del máximo.'],[
 ['El tiempo t se mide en minutos. El valor inicial determina c.','f(0)=c=20; 0≤t≤60'],
 ['El máximo interior a los cuarenta minutos exige derivada nula.','f′(t)=2at+b; 80a+b=0'],
 ['La altura del máximo proporciona la otra ecuación.','f(40)=1600a+40b+20=36'],
 ['Sustituimos b=−80a y resolvemos.',`−1600a=16 ⇒ a=−${F(1,100)}; b=${F(4,5)}`],
 ['El signo de la derivada confirma el máximo.',`f′(t)=−${F('t',50)}+${F(4,5)}>0 si t<40 y <0 si t>40`],
 ['Representamos la parábola en el dominio temporal, con los extremos y el vértice.','(0;20), (40;36), (60;32); audiencia máxima:36 puntos a los40 minutos'],
 ['Comprobamos las tres condiciones en la función obtenida.','f(0)=20; f(40)=36; f′(40)=0; a<0'],
 ],{coefficients:[20,.8,-.01],vertex:[40,36],endpoints:[[0,20],[60,32]]},1502),
 mk(1,`g′(x)=${F('4x','x⁴−1')}; h′(x)=(2+(2x−1)²)e^{x²−x}.`,[
 `g′(x)=${F('−4x','x⁴−1')}; h′(x)=(2+(2x−1)²)e^{x²−x}.`,
 `g′(x)=${F('4x','x⁴−1')}; h′(x)=(2−(2x−1)²)e^{x²−x}.`,
 `g′(x)=${F('2x','x⁴−1')}; h′(x)=(2+(2x−1)²)e^{x²−x}.`],['Cambiar la resta de los logaritmos.','Restar en la regla del producto.','Perder el factor dos de la simplificación.'],[
 ['El argumento del logaritmo es positivo exactamente cuando |x|>1. En ese dominio podemos separar los logaritmos.',`g=ln(x²−1)−ln(x²+1); D_g=(−∞;−1)∪(1;+∞)`],
 ['Derivamos cada logaritmo con la cadena.',`g′=${F('2x','x²−1')}−${F('2x','x²+1')}`],
 ['Reducimos a común denominador.',`g′=${F('2x((x²+1)−(x²−1))','(x²−1)(x²+1)')}=${F('4x','x⁴−1')}`],
 ['Para h aplicamos producto y cadena, sin omitir la derivada del exponente.', 'h=(2x−1)e^{x²−x}; (2x−1)′=2; (x²−x)′=2x−1'],
 ['Sumamos las dos contribuciones y factorizamos.', 'h′=2e^{x²−x}+(2x−1)²e^{x²−x}=(2+(2x−1)²)e^{x²−x}'],
 ['El resultado conserva los dominios. Se verifica independientemente mediante cocientes incrementales en varios puntos.',`D_g=(−∞;−1)∪(1;+∞); D_h=ℝ`],
 ],{functions:['log-rational-quadratics','linear-times-quadratic-exponential']})];
 throw Error('Unsupported official continuity case');
}
export function buildContinuityBatch(id='batch-0323',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){const i=x.correctionEvidence.parameters.index;x.primaryTopic='Derivadas';x.secondaryTopics=i===1502?['Optimización','Regla del producto y cociente']:['Continuidad','Derivabilidad'];if([124,188,1477,1482].includes(i))x.secondaryTopics.push('Monotonía');if(i===1482)x.secondaryTopics.push('Integrales definidas y áreas');x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='ALL_OFFICIAL_SUBPARTS_WITH_REQUIRED_FUNCTION_GRAPHS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildContinuityBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0323-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0323.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
