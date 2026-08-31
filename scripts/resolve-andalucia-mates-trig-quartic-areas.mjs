// Source-page checked exercises: every plot is derived from the official formula.
import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {renderRationalBranchPlot} from './resolve-andalucia-calculus-rational-plots.mjs';
import {simpson} from './resolve-andalucia-mates-determinants-integrals.mjs';
export const observations=[
 [450,'85f493d821b1af6654edb4d55c3218802ea3170138b86a4a1f7224d212d397f9',2,'B.2','9ca3a3f15095d8f6027630e9f1a6f9e01af09998b2a842149e9027ce3c29abaf',0],
 [461,'c8b05a337bf20174030e53cf793cfb12a4b4816f83b323c6b9e660adb65e0761',1,'3','8dbd8a6c8b8ce76785f2886cffea3f96cb7b4642689c4753580b40fe07949e36',0],
];
export const statements={
 450:'Considera las funciones f,g:[−π;π]→ℝ definidas por f(x)=cos(x) y g(x)=sen(x).\na) [1 punto] Esboza sus gráficas en unos mismos ejes coordenados y calcula sus puntos de corte.\nb) [1,5 puntos] Calcula el área del recinto delimitado por las gráficas de f y de g en el intervalo [−frac{3π}{4};frac{π}{4}].',
 461:'Considera la función f:ℝ→ℝ definida por f(x)=4x³−x⁴.\na) Determina los intervalos de crecimiento y de decrecimiento de f. (1 punto)\nb) Esboza la gráfica de f y calcula el área del recinto limitado por dicha gráfica y el eje de abscisas. (1.5 puntos)',
};
export const cases=[{index:450,literals:['cos(x)','sen(x)','mismos ejes'],topic:'Integrales definidas y áreas'},{index:461,literals:['crecimiento','eje de abscisas'],topic:'Integrales definidas y áreas'}];
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_TRIG_QUARTIC_AREA_SOURCE_LAYOUT']]:[];
export const quartic=x=>4*x**3-x**4,quarticDerivative=x=>12*x*x-4*x**3,quarticPrimitive=x=>x**4-x**5/5;
export const graphs={
 450:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'mates-trig-quartic-areas-v1',index:450,functions:['cos(x)','sen(x)'],domain:[-Math.PI,Math.PI],area:[-3*Math.PI/4,Math.PI/4],intersections:[[-3*Math.PI/4,-Math.SQRT1_2],[Math.PI/4,Math.SQRT1_2]]},
 461:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'mates-trig-quartic-areas-v1',index:461,xRange:[-1,4.5],yRange:[-50,35],step:[1,10],pieces:[{range:[-1,4.5],numerator:[0,0,0,4,-1],label:'f(x)=4x³−x⁴; sombreado del recinto entre 0 y 4'}],asymptotes:[],points:[{xy:[0,0],label:'(0;0)',dx:-12,dy:-14},{xy:[2,16],label:'(2;16)',dx:-12,dy:-14},{xy:[3,27],label:'Máximo (3;27)',dx:12,dy:-14},{xy:[4,0],label:'(4;0)',dx:12,dy:-14}],area:[0,4]},
};
export function renderAreaGraph(g){assert.deepEqual(g,graphs[g.index]);if(g.index===461)return renderRationalBranchPlot(g);
 const W=760,H=410,L=60,R=35,T=40,B=80,[xmin,xmax]=g.domain,ymin=-1.35,ymax=1.35;
 const X=x=>L+(x-xmin)/(xmax-xmin)*(W-L-R),Y=y=>T+(ymax-y)/(ymax-ymin)*(H-T-B),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`;
 const pts=(f,a,b)=>Array.from({length:501},(_,i)=>{const x=a+(b-a)*i/500;return pt(x,f(x));}).join(' ');
 let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Coseno y seno en menos pi a pi, con recinto sombreado entre sus dos intersecciones"><rect width="760" height="410" fill="white"/>`;
 for(const [x,label] of [[-Math.PI,'−π'],[-3*Math.PI/4,'−3π/4'],[-Math.PI/2,'−π/2'],[0,'0'],[Math.PI/4,'π/4'],[Math.PI/2,'π/2'],[Math.PI,'π']])s+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)}" stroke="#e2e7ed"/><text x="${X(x)}" y="${H-B+23}" text-anchor="middle" font-size="16">${label}</text>`;
 for(const y of [-1,0,1])s+=`<path d="M${pt(xmin,y)} L${pt(xmax,y)}" stroke="#e2e7ed"/><text x="${L-12}" y="${Y(y)+5}" text-anchor="end" font-size="16">${y}</text>`;
 s+=`<polygon points="${pts(Math.cos,...g.area)} ${pts(Math.sin,g.area[1],g.area[0])}" fill="#c4e4ef"/><path d="M${pt(xmin,0)} L${pt(xmax,0)} M${pt(0,ymin)} L${pt(0,ymax)}" stroke="#333"/>`;
 for(const [f,color] of [[Math.cos,'#075597'],[Math.sin,'#a52d3c']])s+=`<polyline points="${pts(f,...g.domain)}" fill="none" stroke="${color}" stroke-width="3"/>`;
 for(const p of g.intersections)s+=`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="5" fill="#333"/>`;
 return s+'<text x="60" y="375" fill="#075597" font-size="18">f(x)=cos(x)</text><text x="300" y="375" fill="#a52d3c" font-size="18">g(x)=sen(x)</text><text x="590" y="375" font-size="18">Área = 2√2</text></svg>';
}
export function proof(c){if(c.index===450){const a=-3*Math.PI/4,b=Math.PI/4,area=simpson(x=>Math.cos(x)-Math.sin(x),a,b);assert.ok(Math.abs(area-2*Math.SQRT2)<1e-10);return{intersections:graphs[450].intersections,area,exactArea:2*Math.SQRT2,wrongAreas:[Math.SQRT2,4*Math.SQRT2,-2*Math.SQRT2],upperCurve:'cos',interval:[a,b]};}
 assert.equal(c.index,461);const area=simpson(quartic,0,4);assert.ok(Math.abs(area-256/5)<1e-9);return{derivativeRoots:[0,3],maximum:[3,27],roots:[0,4],inflections:[[0,0],[2,16]],area,exactArea:256/5,wrongAreas:[-256/5,256,64/5],monotonicity:'increasing to 3; decreasing after 3'};}
export function solve(c){const ps=officialParts(statements[c.index]),ev=proof(c),mk=(i,a,d,e,s,visual=false)=>{const p=part(ps[i],a,d,e,s,'DERIVATIVE_SIGN_ANALYSIS_AND_INDEPENDENT_NUMERICAL_QUADRATURE',ev);if(visual)p.visual=structuredClone(graphs[c.index]);return p;};
 if(c.index===450)return[
 mk(0,'Cortes: (−frac{3π}{4};−frac{√2}{2}) y (frac{π}{4};frac{√2}{2}).',[
 'Cortes: (−frac{π}{4};−frac{√2}{2}) y (frac{3π}{4};frac{√2}{2}).','Cortes: (−frac{3π}{4};frac{√2}{2}) y (frac{π}{4};−frac{√2}{2}).','Cortes: (−frac{π}{2};0) y (frac{π}{2};0).'],['Resolver tangente menos uno en lugar de uno.','Cambiar las ordenadas de signo.','Confundir ceros del coseno con intersecciones.'],[
 ['Para las intersecciones igualamos las dos funciones, respetando el intervalo oficial.','cos(x)=sen(x); −π≤x≤π'],
 ['Un cero del coseno no es solución porque entonces el seno vale uno o menos uno. Podemos dividir por el coseno en las soluciones.','cos(x)≠0 ⇒ tan(x)=1'],
 ['Escribimos todas las soluciones y seleccionamos las que pertenecen al dominio.','x=frac{π}{4}+kπ; k entero ⇒ x=−frac{3π}{4}, frac{π}{4}'],
 ['Sustituimos en cualquiera de las funciones para obtener las ordenadas.','cos(−frac{3π}{4})=−frac{√2}{2}; cos(frac{π}{4})=frac{√2}{2}'],
 ['Para el esbozo marcamos los valores en extremos, cero y puntos notables de ambas curvas.','x=−π,−frac{π}{2},0,frac{π}{2},π; cos(x)=−1,0,1,0,−1; sen(x)=0,−1,0,1,0'],
 ['La gráfica adjunta dibuja ambas curvas sobre los mismos ejes. Comprobamos directamente que seno y coseno coinciden en los dos puntos hallados.','sen(−frac{3π}{4})=−frac{√2}{2}; sen(frac{π}{4})=frac{√2}{2}'],
 ],true),mk(1,'Área = 2√2 u².',['Área = √2 u².','Área = 4√2 u².','Área = −2√2 u².'],['Olvidar uno de los extremos al aplicar Barrow.','Duplicar dos veces el área.','Invertir curva superior e inferior.'],[
 ['Los límites son las dos intersecciones anteriores. En el interior comprobamos cuál curva queda encima.','x=0: cos(0)=1>sen(0)=0'],
 ['La diferencia no se anula entre las dos intersecciones, así que mantiene signo positivo en todo el interior.','cos(x)−sen(x)=√2 cos(x+frac{π}{4})≥0'],
 ['Integramos curva superior menos inferior. La región está sombreada en la gráfica.','A=∫_{−3π/4}^{π/4}(cos(x)−sen(x)) dx'],
 ['Una primitiva es seno más coseno. La comprobamos por derivación antes de evaluar.','H(x)=sen(x)+cos(x); H′(x)=cos(x)−sen(x)'],
 ['En el extremo superior ambos sumandos son positivos; en el inferior ambos son negativos.','H(frac{π}{4})=√2; H(−frac{3π}{4})=−√2'],
 ['Aplicamos Barrow restando el valor inferior completo.','A=√2−(−√2)=2√2 u²'],
 ['El resultado es positivo y coincide con una cuadratura independiente sobre las funciones originales.','A≈2,828427 u²'],
 ],true)];
 return[
 mk(0,'Crece en (−∞;3) y decrece en (3;+∞).',['Crece en (−∞;0), decrece en (0;3) y crece en (3;+∞).','Decrece en (−∞;3) y crece en (3;+∞).','Crece en (−∞;4) y decrece en (4;+∞).'],['Asignar cambio de signo a la raíz doble de la derivada.','Invertir el signo del factor 3−x.','Confundir el cero de la función con el extremo.'],[
 ['La función es un polinomio y se deriva en toda la recta real.','f′(x)=12x²−4x³=4x²(3−x)'],
 ['Localizamos todos los puntos donde la derivada se anula, sin declararlos automáticamente extremos.','4x²(3−x)=0 ⇒ x=0 o x=3'],
 ['El factor cuadrado es positivo salvo en cero; el signo depende de 3−x.','x<0: f′>0; 0<x<3: f′>0; x>3: f′<0'],
 ['En cero la derivada se anula sin cambio de signo. La función sigue siendo estrictamente creciente a ambos lados.','Crecimiento: (−∞;3); decrecimiento: (3;+∞)'],
 ['En tres sí cambia de positivo a negativo, lo que determina un máximo.','f(3)=4·27−81=27'],
 ['Comprobamos el signo con valores en los tres intervalos.','f′(−1)=16>0; f′(1)=8>0; f′(4)=−64<0'],
 ]),mk(1,'Recinto entre x=0 y x=4; área = frac{256}{5} u².',[
 'Recinto entre x=0 y x=4; área = −frac{256}{5} u².','Recinto entre x=0 y x=4; área = 256 u².','Recinto entre x=0 y x=4; área = frac{64}{5} u².'],['Restar el extremo superior del inferior.','Omitir la integral del término de cuarto grado.','Perder un factor cuatro al evaluar.'],[
 ['Factorizamos para hallar los cortes con el eje horizontal.','f(x)=x³(4−x); f(x)=0 ⇒ x=0 o x=4'],
 ['El signo de los factores demuestra que la función está por encima del eje entre esos cortes.','f<0 en (−∞;0); f>0 en (0;4); f<0 en (4;+∞)'],
 ['Completamos el esbozo con la monotonía anterior, el máximo y el comportamiento en los extremos.','Máximo (3;27); lim_{x→±∞}f(x)=−∞'],
 ['La derivada segunda permite dibujar la curvatura y el cruce horizontal en el origen.','f″(x)=24x−12x²=12x(2−x); inflexiones (0;0) y (2;16)'],
 ['La gráfica adjunta muestra el único recinto acotado con el eje. Como f es positiva en él, no cambiamos el signo de la integral.','A=∫_{0}^{4}(4x³−x⁴) dx'],
 ['Integramos cada potencia y comprobamos la primitiva derivándola.','H(x)=x⁴−frac{x⁵}{5}; H′(x)=4x³−x⁴'],
 ['Aplicamos Barrow con los dos extremos del recinto.','A=H(4)−H(0)=256−frac{1024}{5}=frac{256}{5} u²'],
 ['La cuadratura numérica independiente coincide con el resultado exacto positivo.','A=51,2 u²'],
 ],true)];
}
export function buildTrigQuarticBatch(id='batch-0379',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){x.primaryTopic='Integrales definidas y áreas';x.secondaryTopics=['Derivadas'];x.block='Análisis';x.examSlot=3;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'TRIGONOMETRIC_AND_QUARTIC_AREA_WITH_DERIVED_PLOT'};x.qualityGates.pedagogical='FULL_SIGN_ANALYSIS_INTEGRALS_AND_DERIVED_GRAPH';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildTrigQuarticBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0379-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0379.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
