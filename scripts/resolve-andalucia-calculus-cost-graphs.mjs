import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {renderPolynomialGraph} from './resolve-andalucia-calculus-graph-branches.mjs';
const F=(a,b)=>`frac{${a}}{${b}}`;
export const cases=[{index:95,literals:['coste de producción','millones de kilogramos']},{index:157,literals:['beneficios de una empresa','beneficio máximo']},{index:357,literals:['continuidad y derivabilidad','su área.']}];
export const graphSpecs={
 95:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'cost-and-bounded-region-v1',index:95,xRange:[0,2.2],yRange:[0,21],step:[.5,5],pieces:[{range:[0,2],coefficients:[3,-8,8],label:'C(x)=8(x−1/2)²+1, dominio [0;2]',color:'#075597',leftClosed:true,rightClosed:true}],points:[{xy:[0,3],label:'(0;3)',dx:12,dy:-13},{xy:[.5,1],label:'Mínimo (1/2;1)',dx:10,dy:24},{xy:[2,19],label:'(2;19)',dx:-10,dy:-12}],axisLabels:['x (millones de kg)','Coste C(x)']},
 157:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'cost-and-bounded-region-v1',index:157,xRange:[0,27],yRange:[0,72],step:[5,10],pieces:[{range:[0,10],coefficients:[0,4],label:'0≤t<10: B(t)=4t',color:'#075597',leftClosed:true,rightOpen:true},{range:[10,25],coefficients:[-20,8,-.2],label:'10≤t≤25: B(t)=60−(t−20)²/5',color:'#075597',leftClosed:true,rightClosed:true}],points:[{xy:[0,0],label:'(0;0)',dx:10,dy:-12},{xy:[10,40],label:'Unión (10;40)',dx:-10,dy:-15},{xy:[20,60],label:'Máximo (20;60)',dx:-10,dy:-15},{xy:[25,55],label:'(25;55)',dx:-10,dy:25}],axisLabels:['t (años)','B(t), miles de euros']},
 357:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'cost-and-bounded-region-v1',index:357,xRange:[-1.5,3],yRange:[-5.5,6.5],step:[1,2],pieces:[{range:[-1.5,2],coefficients:[0,2,-1],label:'x<2: f(x)=−x²+2x',color:'#075597',rightOpen:true},{range:[2,3],coefficients:[0,-2,1],label:'x≥2: f(x)=x²−2x',color:'#075597',leftClosed:true},{range:[-1.5,3],coefficients:[0,2],label:'Recta y=2x; recinto entre x=−1 y x=1',color:'#c45114',dashed:true}],points:[{xy:[-1,-3],label:'(−1;−3)',dx:10,dy:23},{xy:[1,1],label:'(1;1)',dx:-10,dy:23},{xy:[2,0],label:'(2;0)',dx:10,dy:23}],between:{range:[-1,1],lower:[0,2,-1],upper:[0,2]}},
};
export function renderCostGraph(spec){assert.deepEqual(spec,graphSpecs[spec.index]);return renderPolynomialGraph(spec);}
export const functions={95:x=>2*(2*x-1)**2+1,157:t=>t<10?4*t:-t*t/5+8*t-20,357:x=>x<2?-x*x+2*x:x*x-2*x};
export function solve(c,text){const ps=officialParts(text),mk=(k,a,w,reason,steps,proof,graph=false)=>{const p=part(ps[k],a,w,reason,steps,'OFFICIAL_POLYNOMIAL_SIGN_CHART_DOMAIN_EXTREMA_AND_INDEPENDENT_QUADRATURE',proof);if(graph)p.visual=structuredClone(graphSpecs[c.index]);return p;};
 if(c.index===95)return[
 mk(0,'Decrece en (0;1/2) y crece en (1/2;2).',['Crece en (0;1/2) y decrece en (1/2;2).','Decrece en (0;1) y crece en (1;2).','Crece en todo (0;2).'],['Invertir el signo de la derivada.','No dividir entre dieciséis al despejar el punto crítico.','Suponer que toda parábola crece por abrirse hacia arriba.'],[
 ['El dominio productivo oficial se restringe a [0;2]; x se mide en millones de kilogramos.','C(x)=2(2x−1)²+1; 0≤x≤2'],
 ['Derivamos usando la regla de la cadena.','C′(x)=2·2(2x−1)·2=16x−8'],
 ['Hallamos el único punto crítico del intervalo.','16x−8=0 ⇒ x=1/2'],
 ['Comprobamos el signo a ambos lados, sin estudiar cantidades fuera del dominio.','C′(1/4)=−4<0; C′(1)=8>0'],
 ['Concluimos que disminuye antes de medio millón y aumenta después.','Decrece: (0;1/2); crece: (1/2;2)'],
 ],{critical:.5,firstSamples:[[.25,-4],[1,8]],domain:[0,2]}),
 mk(1,'Cantidad: 0,5 millones de kg (500.000 kg); coste mínimo C(1/2)=1.',[
 'Cantidad: 0,5 kg; coste mínimo C(1/2)=1.','Cantidad: 1 millón de kg; coste mínimo C(1)=3.','Cantidad: 0,5 millones de kg (500.000 kg); coste mínimo C(1/2)=0.'],['Olvidar la unidad millones de kilogramos.','Tomar x=1 en lugar del vértice x=1/2.','Omitir el sumando constante del coste.'],[
 ['El cambio de signo de la derivada ya muestra un mínimo en x=1/2.','C′: negativo → positivo'],
 ['Comprobamos que es absoluto: el término cuadrático nunca es negativo.','C(x)=8(x−1/2)²+1≥1'],
 ['La igualdad se alcanza exactamente en x=1/2, que pertenece al dominio.','C(1/2)=2·0²+1=1'],
 ['Contrastamos con los extremos del intervalo.','C(0)=3; C(2)=19; 1<3<19'],
 ['Convertimos únicamente la cantidad a kilogramos. El PDF no especifica una unidad monetaria para C y no se inventa.','x=0,5 millones de kg=500.000 kg; coste mínimo=1'],
 ],{minimum:[.5,1],endpoints:[[0,3],[2,19]],quantityKg:500000,noInventedCostCurrency:true}),
 mk(2,'Arco de parábola hacia arriba en [0;2], vértice (1/2;1), extremos (0;3) y (2;19).',[
 'Arco de parábola hacia abajo en [0;2], vértice (1/2;1), extremos (0;−1) y (2;−17).','Arco de parábola hacia arriba en [0;2], vértice (1;1), extremos (0;9) y (2;9).','Arco de parábola hacia arriba en [0;2], vértice (1/2;0), extremos (0;2) y (2;18).'],['Cambiar el signo del término cuadrático.','Desplazar el vértice a una abscisa errónea.','Eliminar la constante uno.'],[
 ['Reescribimos la función para identificar vértice y apertura.','C(x)=8(x−1/2)²+1'],
 ['El coeficiente ocho es positivo y la curvatura constante también.','C″(x)=16>0'],
 ['Marcamos el vértice y los extremos cerrados del dominio.','V=(1/2;1); (0;3); (2;19)'],
 ['Añadimos puntos intermedios que permiten comprobar la escala del dibujo.','C(1)=3; C(3/2)=9'],
 ['La gráfica adjunta recorre solo [0;2], baja hasta el vértice y sube después; no se extiende a producción negativa.','Eje horizontal: millones de kg; eje vertical: C(x)'],
 ],{vertex:[.5,1],endpoints:[[0,3],[2,19]],samplePoints:[[1,3],[1.5,9]],wrongVertices:[[.5,1],[1,1],[.5,0]]},true)];
 if(c.index===157)return[
 mk(0,'Continua en [0;25] y derivable en (0;25); en t=10 el valor es 40 y la pendiente 4.',[
 'Continua en [0;25], pero no derivable en t=10; el valor es 40.','Discontinua en t=10, con salto de 40 a 60; no derivable allí.','Continua en [0;25] y derivable en (0;25); en t=10 el valor es 60 y la pendiente 0.'],['Suponer que cualquier cambio de fórmula crea una esquina.','Usar el valor del máximo como límite del empalme.','Trasladar las propiedades del vértice a la unión.'],[
 ['Ambas ramas son polinomios; solo debemos estudiar la unión t=10 dentro del dominio.','B₁(t)=4t; B₂(t)=−t²/5+8t−20; D=[0;25]'],
 ['Calculamos el límite por la izquierda y el valor por la derecha.','B₁(10)=40; B₂(10)=−20+80−20=40'],
 ['El valor B(10) pertenece a la segunda rama y coincide con ambos límites.','B(10)=40 ⇒ continua en 10'],
 ['Derivamos por tramos y comparamos las pendientes.','B₁′=4; B₂′=−2t/5+8; B₂′(10)=4'],
 ['Las pendientes coinciden. En los extremos cero y veinticinco se considera continuidad y derivadas laterales, no derivada bilateral.','Continua en [0;25]; derivable en (0;25); B′(10)=4'],
 ],{domain:[0,25],join:10,value:40,slopes:[4,4]}),
 mk(1,'Crece en (0;20), decrece en (20;25); máximo en el año 20: 60.000 €.',[
 'Crece en (0;10), decrece en (10;25); máximo en el año 10: 40.000 €.','Crece en (0;20), decrece en (20;25); máximo en el año 20: 60 €.','Crece en (0;25); máximo en el año 25: 55.000 €.'],['Tomar la unión como máximo sin estudiar la derivada de la segunda rama.','Olvidar que B está expresada en miles de euros.','Ignorar que la derivada cambia de signo en veinte.'],[
 ['La recta inicial crece porque su derivada vale cuatro.','B′(t)=4>0 para 0<t<10'],
 ['La derivada de la parábola se anula en veinte.','−2t/5+8=0 ⇒ t=20'],
 ['El signo es positivo hasta veinte y negativo después. La unión en diez es continua y derivable.','B₂′(15)=2>0; B₂′(22,5)=−1<0'],
 ['Calculamos el beneficio del vértice.','B(20)=−80+160−20=60'],
 ['Comparamos extremos para confirmar el máximo absoluto.','B(0)=0; B(10)=40; B(20)=60; B(25)=55'],
 ['Interpretamos la escala monetaria: sesenta significa sesenta mil euros.','Mayor beneficio en el año 20: 60·1.000 €=60.000 €'],
 ],{critical:20,maximum:[20,60],firstSamples:[[5,4],[15,2],[22.5,-1]],candidateValues:[[0,0],[10,40],[20,60],[25,55]],maximumEuros:60000}),
 mk(2,'Recta de (0;0) a (10;40), unida suavemente a parábola hacia abajo con vértice (20;60) y final (25;55).',[
 'Recta de (0;0) a (10;40), unida a parábola hacia arriba con vértice (20;20) y final (25;25).','Recta de (0;0) a (10;40), seguida de parábola hacia abajo con vértice (10;60) y final (25;15).','Recta de (0;0) a (10;40), prolongada recta hasta (25;100), sin tramo parabólico.'],['Cambiar el signo de la curvatura del segundo tramo.','Desplazar el vértice y crear un salto que no existe.','Prolongar indebidamente la primera rama.'],[
 ['Marcamos los extremos de la recta inicial, sin extenderla más allá de diez.','B(0)=0; B(10)=40'],
 ['Completamos el cuadrado en la segunda rama.','B₂(t)=60−(t−20)²/5'],
 ['Esa forma muestra la apertura hacia abajo y el vértice.','V=(20;60); B₂″=−2/5<0'],
 ['Calculamos el extremo derecho del dominio.','B(25)=60−25/5=55'],
 ['La igualdad de pendiente cuatro en diez garantiza que no hay esquina en la unión.','B₁′(10)=B₂′(10)=4'],
 ['La gráfica adjunta usa años y miles de euros; conserva la recta, el máximo y el tramo final descendente.','Dominio [0;25]; puntos (0;0), (10;40), (20;60), (25;55)'],
 ],{points:[[0,0],[10,40],[20,60],[25,55]],joinSlopes:[4,4],secondDerivative:-.4},true)];
 if(c.index===357)return[
 mk(0,'Continua en ℝ; derivable salvo en x=2, con pendientes laterales −2 y 2.',[
 'Continua y derivable en todo ℝ, con pendiente 2 en x=2.','Discontinua en x=2, con salto de −2 a 2; no derivable allí.','Continua en ℝ; derivable salvo en x=0, con pendientes laterales −2 y 2.'],['Comparar solo valores y no las pendientes.','Confundir derivadas laterales con límites de la función.','Situar la unión en cero en lugar de dos.'],[
 ['Las dos ramas son polinomios y el dominio es real. Solo se empalman en dos.','f₁=−x²+2x para x<2; f₂=x²−2x para x≥2'],
 ['Evaluamos los dos valores laterales y el valor del punto.','f₁(2)=−4+4=0; f₂(2)=4−4=0; f(2)=0'],
 ['Como coinciden, la función es continua en dos y en todo su dominio.','lim f(2⁻)=f(2)=lim f(2⁺)=0'],
 ['Derivamos cada rama.','f₁′=−2x+2; f₂′=2x−2'],
 ['Las pendientes laterales no coinciden: la unión es una esquina.','f₁′(2)=−2; f₂′(2)=2 ⇒ no derivable en 2; derivable en ℝ∖{2}'],
 ],{join:2,joinValues:[0,0],joinSlopes:[-2,2]}),
 mk(1,`Recinto entre y=2x y y=−x²+2x, con −1≤x≤1; área=${F(2,3)} u².`,[
 `Recinto entre y=2x y y=−x²+2x, con −1≤x≤1; área=${F(1,3)} u².`,`Recinto entre y=2x y y=−x²+2x, con −1≤x≤1; área=−${F(2,3)} u².`,'Recinto entre y=2x y y=−x²+2x, con −1≤x≤1; área=2 u².'],['Integrar solo la mitad del intervalo simétrico.','Restar la curva superior de la inferior.','Reemplazar la distancia variable x² por una altura constante uno.'],[
 ['En todo el intervalo [−1;1] se utiliza la rama x<2. Las rectas verticales cierran el recinto.','f(x)=−x²+2x; superior y=2x; −1≤x≤1'],
 ['Restamos para comprobar cuál curva está arriba; se tocan en cero.','2x−f(x)=x²≥0; igualdad únicamente en x=0'],
 ['La figura adjunta sombrea entre las dos curvas, no entre f y el eje OX.','Bordes: x=−1, x=1, y=2x, y=−x²+2x'],
 ['El área solicitada es la integral de la diferencia no negativa.','A=∫_{−1}^{1}x² dx'],
 ['Integramos y verificamos la primitiva.',`H(x)=${F('x³',3)}; H′(x)=x²`],
 ['Aplicamos Barrow en ambos extremos y comprobamos por simetría.',`A=${F(1,3)}−(−${F(1,3)})=${F(2,3)}=2∫_{0}^{1}x² dx`],
 ],{interval:[-1,1],upper:[0,2],lower:[0,2,-1],difference:[0,0,1],area:2/3,wrongAreas:[1/3,-2/3,2]},true)];
 throw Error('Unreviewed cost graph case');
}
export function buildCostGraphsBatch(id='batch-0329',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Derivadas';x.secondaryTopics=['Continuidad','Monotonía','Gráficas',...(x.correctionEvidence.parameters.index===357?['Integrales definidas y áreas']:[])];x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='COMPLETE_OFFICIAL_SUBPARTS_WITH_FUNCTION_GRAPH_AND_DOMAIN_UNITS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildCostGraphsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0329-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0329.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
