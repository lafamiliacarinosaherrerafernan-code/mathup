import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {renderPolynomialGraph} from './resolve-andalucia-calculus-graph-branches.mjs';
const F=(a,b)=>`frac{${a}}{${b}}`;
export const cases=[{index:69,literals:['Se considera la función','con pendiente','área de dicha región']},{index:77,literals:['(x + 1)','(x − 1)','Calcule los extremos']}];
export const functions={69:x=>x<=-2?10+2.5*x:x<2?x*x+1:10-2.5*x,77:x=>{assert.ok(x>=-2&&x<=2);return x<0?(x+1)**2:(x-1)**2;}};
export const graphSpecs={
 69:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'bounded-piecewise-v1',index:69,xRange:[-5,5],yRange:[-3,7],step:[1,2],pieces:[{range:[-5,-2],coefficients:[10,2.5],label:'x≤−2: 10+5x/2',color:'#075597',rightClosed:true},{range:[-2,2],coefficients:[1,0,1],label:'−2<x<2: x²+1',color:'#075597',leftOpen:true,rightOpen:true},{range:[2,5],coefficients:[10,-2.5],label:'x≥2: 10−5x/2',color:'#075597',leftClosed:true}],points:[{xy:[-4,0],label:'(−4;0)',dx:10,dy:24},{xy:[-2,5],label:'(−2;5)',dx:-10,dy:-13},{xy:[0,1],label:'(0;1)',dx:10,dy:23},{xy:[2,5],label:'(2;5)',dx:10,dy:-13},{xy:[4,0],label:'(4;0)',dx:-10,dy:24}],area:[-4,4]},
 77:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'bounded-piecewise-v1',index:77,xRange:[-2.5,2.5],yRange:[-.4,1.6],step:[1,.5],pieces:[{range:[-2,0],coefficients:[1,2,1],label:'−2≤x<0: (x+1)²',color:'#075597',leftClosed:true,rightOpen:true},{range:[0,2],coefficients:[1,-2,1],label:'0≤x≤2: (x−1)²',color:'#075597',leftClosed:true,rightClosed:true}],points:[{xy:[-2,1],label:'(−2;1)',dx:10,dy:-13},{xy:[-1,0],label:'(−1;0)',dx:-10,dy:24},{xy:[0,1],label:'(0;1)',dx:10,dy:-13},{xy:[1,0],label:'(1;0)',dx:10,dy:24},{xy:[2,1],label:'(2;1)',dx:-10,dy:-13}],area:[-1,1]},
};
export function renderBoundedPiecewiseGraph(s){assert.deepEqual(s,graphSpecs[s.index]);return renderPolynomialGraph(s);}
export function solve(c,text){const ps=officialParts(text),mk=(k,a,w,reasons,steps,proof,graph=false)=>{const p=part(ps[k],a,w,reasons,steps,'OFFICIAL_BOUNDED_BRANCHES_EXACT_TANGENT_AND_INDEPENDENT_AREA',proof);if(graph)p.visual=structuredClone(graphSpecs[c.index]);return p;};
 if(c.index===69)return[
 mk(0,`Continua en x=−2; no derivable allí, pendientes ${F(5,2)} y −4.`,[
 `Continua y derivable en x=−2, con pendiente ${F(5,2)}.`,
 'Discontinua en x=−2, con límites 5 y −3; no derivable allí.',
 `Continua en x=−2; no derivable allí, pendientes −${F(5,2)} y 4.`],['Comprobar únicamente los valores, sin comparar pendientes.','Cambiar el signo de x² al evaluar el tramo central.','Tomar las pendientes del empalme derecho.'],[
 ['El punto pedido es menos dos. El tramo izquierdo incluye ese punto y el central aporta el límite derecho.',`f₁(x)=10+${F('5x',2)}; f₂(x)=x²+1`],
 ['Evaluamos la primera rama y su límite.','f(−2)=10−5=5; lim_{x→−2⁻}f(x)=5'],
 ['El límite desde el tramo central coincide con el valor.','lim_{x→−2⁺}f(x)=(−2)²+1=5 ⇒ continua en −2'],
 ['Derivamos las dos fórmulas en sus respectivos interiores.',`f₁′=${F(5,2)}; f₂′=2x`],
 ['Las derivadas laterales no coinciden: el empalme es una esquina.',`f′(−2⁻)=${F(5,2)}≠−4=f′(−2⁺) ⇒ no derivable`],
 ],{join:-2,values:[5,5],slopes:[2.5,-4]}),
 mk(1,`Tangente y=−x+${F(3,4)}, en (${F(-1,2)};${F(5,4)}).`,[
 `Tangente y=−x+${F(5,4)}, en (${F(-1,2)};${F(5,4)}).`,
 `Tangente y=x+${F(3,4)}, en (${F(1,2)};${F(5,4)}).`,
 `Tangente y=−x−${F(3,4)}, en (${F(-1,2)};${F(5,4)}).`],['Confundir ordenada del punto y ordenada en el origen.','Resolver f′=1 en vez de f′=−1.','Cambiar el signo de la ordenada en el origen.'],[
 ['La pendiente oficial solicitada es menos uno. En las ramas exteriores las pendientes son constantes y distintas.',`m=−1; f₁′=${F(5,2)}; f₃′=−${F(5,2)}`],
 ['Buscamos el punto únicamente en el tramo central, donde f′=2x.',`2x=−1 ⇒ x₀=−${F(1,2)}∈(−2;2)`],
 ['Calculamos la ordenada en la función, no en la derivada.',`y₀=x₀²+1=${F(1,4)}+1=${F(5,4)}`],
 ['Aplicamos la ecuación punto-pendiente.',`y−${F(5,4)}=−1(x+${F(1,2)})`],
 ['Despejamos y comprobamos el paso por el punto y la pendiente.',`y=−x+${F(3,4)}; y(−${F(1,2)})=${F(5,4)}; y′=−1=f′(x₀)`],
 ],{slope:-1,intercept:.75,point:[-.5,1.25],outerSlopes:[2.5,-2.5],wrongLines:[[-1,1.25],[1,.75],[-1,-.75]]}),
 mk(2,`Recinto sobre OX entre x=−4 y x=4; área=${F(58,3)} u².`,[
 `Recinto sobre OX entre x=−4 y x=4; área=${F(28,3)} u².`,
 `Recinto sobre OX entre x=−4 y x=4; área=${F(88,3)} u².`,
 `Recinto sobre OX entre x=−4 y x=4; área=${F(29,3)} u².`],['Omitir los dos triángulos laterales.','Usar rectángulos en lugar de los triángulos laterales.','Calcular solo la mitad simétrica de la región.'],[
 ['Hallamos los cortes con OX en las ramas exteriores; la parábola central es siempre positiva.',`10+${F('5x',2)}=0 ⇒ x=−4; 10−${F('5x',2)}=0 ⇒ x=4; x²+1>0`],
 ['La zona acotada está sobre el eje entre esos dos cortes; fuera de ellos f es negativa. La gráfica adjunta separa las tres partes.','Recinto: −4≤x≤4, 0≤y≤f(x); empalmes (−2;5) y (2;5)'],
 ['Las partes exteriores son triángulos de base dos y altura cinco.',`A izquierda=A derecha=${F('2·5',2)}=5`],
 ['La parte central se obtiene integrando el polinomio.',`A central=∫_{−2}^{2}(x²+1) dx; H(x)=${F('x³',3)}+x`],
 ['Evaluamos la primitiva, cuya derivada devuelve el integrando.',`H′=x²+1; H(2)−H(−2)=(${F(8,3)}+2)−(−${F(8,3)}−2)=${F(28,3)}`],
 ['Sumamos las tres áreas positivas y comprobamos la simetría.',`A=5+${F(28,3)}+5=${F(58,3)}≈19,33333 u²`],
 ],{roots:[-4,4],joins:[-2,2],partialAreas:[5,28/3,5],area:58/3,wrongAreas:[28/3,88/3,29/3]},true)];
 if(c.index===77)return[
 mk(0,'Continua en [−2;2]; no derivable en x=0, pendientes 2 y −2; derivable en los demás puntos interiores.',[
 'Continua y derivable en todo (−2;2), incluida x=0, con pendiente 2.','Discontinua en x=0, con salto de 2 a 1; no derivable allí.','Continua en [−2;2]; no derivable en x=−1 ni en x=1, pero sí en x=0.'],['Comparar solo valores de las ramas.','Leer (x+1)² como 2 elevado a x+1.','Confundir vértices suaves con el empalme no derivable.'],[
 ['El PDF muestra dos cuadrados, no una función exponencial. Sus tramos cubren exactamente [−2;2].','f₁(x)=(x+1)² para −2≤x<0; f₂(x)=(x−1)² para 0≤x≤2'],
 ['En cada tramo polinómico hay continuidad. Comparamos los límites y el valor en cero.','lim_{x→0⁻}f(x)=1; f(0)=lim_{x→0⁺}f(x)=1'],
 ['Por tanto, también hay continuidad en la unión y lateralmente en los extremos del dominio.','Continua en [−2;2]'],
 ['Derivamos cada polinomio y evaluamos sus límites en cero.','f₁′=2(x+1); f₂′=2(x−1); f′(0⁻)=2; f′(0⁺)=−2'],
 ['Las pendientes no coinciden, de modo que cero es una esquina; los extremos del dominio se tratan lateralmente.','Derivable en (−2;0)∪(0;2), no derivable en 0'],
 ],{domain:[-2,2],join:0,values:[1,1],slopes:[2,-2]}),
 mk(1,'Mínimos absolutos (−1;0) y (1;0); máximo absoluto 1 en x=−2, 0 y 2; máximo relativo interior (0;1).',[
 'Mínimos absolutos (−1;0) y (1;0); máximo absoluto 1 únicamente en x=0.','Máximos absolutos (−1;0) y (1;0); mínimo absoluto 1 en x=0.','Mínimo absoluto (0;1); máximos absolutos 4 en x=−2 y x=2.'],['Olvidar comparar los extremos cerrados del dominio.','Invertir los cambios de signo de las derivadas.','Usar una sola rama fuera de su intervalo.'],[
 ['Buscamos ceros de cada derivada dentro del tramo que le corresponde.','2(x+1)=0 ⇒ x=−1; 2(x−1)=0 ⇒ x=1'],
 ['Ambos son mínimos: la pendiente pasa de negativa a positiva.','f(−1)=0; f(1)=0; cuadrados no negativos'],
 ['En cero, aun sin derivada, la función crece antes y decrece después: es un máximo relativo interior.','f(0)=1; signos al cruzar 0: + → −'],
 ['Comparamos los dos extremos del dominio con todos los candidatos interiores.','f(−2)=1; f(−1)=0; f(0)=1; f(1)=0; f(2)=1'],
 ['En ambos tramos el cuadrado está entre cero y uno. Así quedan demostrados mínimo y máximo absolutos.','Mínimo 0 en ±1; máximo 1 en −2, 0 y 2; extremos del dominio incluidos'],
 ],{minima:[[-1,0],[1,0]],maxima:[[-2,1],[0,1],[2,1]],relativeInteriorMaximum:[0,1],range:[0,1]}),
 mk(2,`Recinto sobre OX entre x=−1 y x=1, formado por dos arcos parabólicos; área=${F(2,3)} u².`,[
 `Recinto sobre OX entre x=−1 y x=1, formado por dos arcos parabólicos; área=${F(1,3)} u².`,
 'Recinto sobre OX entre x=−1 y x=1, formado por dos arcos parabólicos; área=1 u².',
 `Recinto sobre OX entre x=−1 y x=1, formado por dos arcos parabólicos; área=${F(4,3)} u².`],['Integrar solo uno de los dos lados.','Reemplazar los arcos por lados rectos de un triángulo.','Duplicar dos veces la integral de una mitad.'],[
 ['Las rectas dadas son x=−1 y x=1, no los extremos del dominio. La función es no negativa entre ellas.','f(−1)=0; f(0)=1; f(1)=0'],
 ['La gráfica adjunta sombrea los dos arcos sobre OX, separando la integral en cero.','A=∫_{−1}^{0}(x+1)² dx+∫_{0}^{1}(x−1)² dx'],
 ['Calculamos primitivas por traslación; la derivada interior vale uno.',`H₁=${F('(x+1)³',3)}; H₂=${F('(x−1)³',3)}`],
 ['Evaluamos el arco izquierdo.',`A₁=H₁(0)−H₁(−1)=${F(1,3)}−0=${F(1,3)}`],
 ['Evaluamos el arco derecho, sin perder el signo del extremo inferior.',`A₂=H₂(1)−H₂(0)=0−(−${F(1,3)})=${F(1,3)}`],
 ['Sumamos las áreas; la simetría respecto al eje vertical confirma que ambas son iguales.',`A=${F(1,3)}+${F(1,3)}=${F(2,3)} u²`],
 ],{interval:[-1,1],split:0,partialAreas:[1/3,1/3],area:2/3,wrongAreas:[1/3,1,4/3]},true)];
 throw Error('Unreviewed bounded-piecewise case');
}
export function buildBoundedPiecewiseBatch(id='batch-0333',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Derivadas';x.secondaryTopics=['Continuidad','Monotonía','Gráficas','Integrales definidas y áreas'];x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='COMPLETE_OFFICIAL_SUBPARTS_WITH_BOUNDED_PIECEWISE_AREA';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildBoundedPiecewiseBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0333-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0333.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
