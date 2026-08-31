import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[272,'58876c8435308697c784c8326eba10d1b8b9696efc401c51bf3386c90eba4643',2,'B.1','74cfd787510cba453f88092444775160b2b914e48687db158edeee5df6115250',0],
[276,'8f26bd61ad72286c9619dd2a285b762aa5a353de3a134f51beb40e7bde69c151',1,'A.1','f1cf95af3a1da124fc1272d1f0c598e2591ef96e9d9baf0ce8a480e20f8da94a',0],
[277,'85a6693892f29847142a74b342f143d4d263e44abb0bbce055536058043080eb',1,'A.1','ca158e5a5d523e3b0504c26e32c8898e9ffa0e156bb3e21bfd369593ddff85b9',0],
[278,'58876c8435308697c784c8326eba10d1b8b9696efc401c51bf3386c90eba4643',2,'B.2','74cfd787510cba453f88092444775160b2b914e48687db158edeee5df6115250',0],
[282,'02883b57dfa540931e908920429c12d648ed1810c6ceee66780a26e6f4ebb6d1',1,'4','4eaa5678dce2a49fdb35853d6cb553eb2ec0ee477006e7f79a4bf8378b1d8096',0],
[283,'484da7ba05f38869d6934dae372158991418ca8556e3a834a80895bfca1b117e',2,'B.2','c54f399478269a48b7bdd21a4849ab0279a0827a99f50d90fa9d21cdc7a49fad',0],
];
export const statements={
272:'Considera la función f:[0,4]→ℝ definida por:\nf(x)=piecewise{x²+ax+b si 0≤x≤2;cx si 2<x≤4}\na) [1,75 puntos] Sabiendo que f es derivable en todo el dominio y que verifica f(0)=f(4), determina los valores de a, b y c.\nb) [0,75 puntos] Para a=−3, b=4 y c=1 halla los extremos absolutos de f (abscisas donde se obtienen y valores que se alcanzan).',
276:'Sea f la función definida por f(x)=frac{1}{2x}+ln(x) para x>0 (ln denota el logaritmo neperiano).\na) [1,75 puntos] Determina el punto de la gráfica de f en el que la pendiente de la recta tangente es máxima.\nb) [0,75 puntos] Halla la ecuación de la recta normal a la gráfica de f en el punto de abscisa x=1.',
277:'[2,5 puntos] Una ventana normanda consiste en un rectángulo coronado con un semicírculo. De entre todas las ventanas normandas de perímetro 10 m, halla las dimensiones del marco de la de área máxima.',
278:'Considera la función f:ℝ→ℝ dada por f(x)=x²+4.\na) [0,75 puntos] Halla la ecuación de la recta tangente a la gráfica de f en el punto de abscisa x=1.\nb) [1,75 puntos] Esboza el recinto limitado por la gráfica de f, el eje de ordenadas y la recta de ecuación y=2x+3. Calcula su área.',
282:'Considera las funciones f,g:ℝ→ℝ definidas por f(x)=x² y g(x)=a|x|, con a>0. Determina el valor de a para que el área total de los recintos limitados por las gráficas de ambas funciones sea de 9 unidades cuadradas.',
283:'[2,5 puntos] Considera la función f:ℝ→ℝ definida por f(x)=frac{3x(2m−x)}{m³}, con m>0. Calcula el área del recinto encerrado por la gráfica de f y el eje OX.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_OPTIMAL_SLOPE_REGIONS_SOURCE_LAYOUT']]:[];
export const cases=[{index:272,literals:['x2 + ax + b','f (0) = f (4)'],slot:2},{index:276,literals:['ln x','ma´xima'],slot:2},{index:277,literals:['ventana normanda','per´ımetro 10'],slot:2,whole:true},{index:278,literals:['x2 + 4','y = 2x + 3'],slot:3},{index:282,literals:['a|x|','9 unidades'],slot:3,whole:true},{index:283,literals:['3x(2m − x)','m > 0'],slot:3,whole:true}];
export const proof=c=>({272:{parameters:[-3,4,1],minimum:[1.5,1.75],maximum:[[0,4],[4,4]]},276:{maximumSlopePoint:[1,.5],normalSlope:-2,normalIntercept:2.5},277:{radius:10/(4+Math.PI),rectangularHeight:10/(4+Math.PI),width:20/(4+Math.PI),perimeter:10},278:{tangent:[2,3],region:[0,1],area:1/3},282:{a:3,area:9},283:{area:4,roots:'0,2m'}}[c.index]);
export const graphs={277:{plotVersion:'mates-optimal-slope-regions-v1',index:277},278:{plotVersion:'mates-optimal-slope-regions-v1',index:278}};
export function renderOptimalSlopeRegion(g){assert.deepEqual(g,graphs[g.index]);if(g.index===277)return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 400" role="img" aria-label="Ventana normanda: rectángulo de base dos radios y altura h coronado por un semicírculo de radio r"><rect width="520" height="400" fill="white"/><path d="M140 310 L140 190 A120 120 0 0 1 380 190 L380 310 Z" fill="#e2eff8" stroke="#155991" stroke-width="3"/><path d="M140 190 L380 190 M260 190 L380 190" stroke="#777" stroke-dasharray="5 5"/><circle cx="260" cy="190" r="3"/><text x="300" y="180" font-size="22">r</text><text x="395" y="255" font-size="22">h</text><text x="230" y="340" font-size="22">2r</text><text x="90" y="380" font-size="18">Perímetro exterior: 2h + 2r + πr</text></svg>';
const X=x=>70+500*x,Y=y=>340-55*y,pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,trace=(f,a,b)=>Array.from({length:301},(_,i)=>{const x=a+(b-a)*i/300;return pt(x,f(x));}).join(' '),f=x=>x*x+4,h=x=>2*x+3;
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 440" role="img" aria-label="Región entre parábola y tangente desde el eje vertical hasta el punto de tangencia"><rect width="760" height="440" fill="white"/><polygon points="${trace(f,0,1)} ${trace(h,1,0)}" fill="#c7e8ef"/><path d="M${pt(0,0)} L${pt(1.3,0)} M${pt(0,0)} L${pt(0,6)}" stroke="#333"/><polyline points="${trace(f,0,1.25)}" fill="none" stroke="#075597" stroke-width="3"/><polyline points="${trace(h,0,1.25)}" fill="none" stroke="#a52d3c" stroke-width="3"/><circle cx="${X(1)}" cy="${Y(5)}" r="4"/><text x="${X(1)+8}" y="${Y(5)-10}" font-size="18">(1;5)</text><text x="46" y="${Y(4)+5}" font-size="16">4</text><text x="46" y="${Y(3)+5}" font-size="16">3</text><text x="${X(1)}" y="365" font-size="16">1</text><text x="70" y="400" font-size="20" fill="#075597">f(x)=x²+4</text><text x="300" y="400" font-size="20" fill="#a52d3c">y=2x+3; 0≤x≤1</text></svg>`;}
export function solve(c){const ps=c.whole?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]);const mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'SOURCE_BOUND_CALCULUS_WITH_INDEPENDENT_DERIVATIVE_AND_AREA_CHECK',proof(c));let result;switch(c.index){
case 272:result=[mk(0,'a=−3; b=4; c=1.',['a=−3; b=2; c=1.','a=−2; b=0; c=2.','a=−3; b=−4; c=1.'],['Confundir f(4) con 2c al relacionarlo con b.','Imponer continuidad con b igual a cero sin usar la igualdad de extremos.','Cambiar el signo al calcular b a partir de f(0)=f(4).'],[
['Las dos expresiones son polinomios. La única unión interior que necesita condiciones adicionales está en x igual a dos.','Unión: x=2; f(0)=b; f(4)=4c'],
['La derivabilidad implica continuidad: igualamos el valor de la primera rama y el límite de la segunda.','4+2a+b=2c'],
['Igualamos ahora las derivadas laterales y usamos la condición de los extremos del dominio.','4+a=c; b=4c'],
['Sustituimos b en la ecuación de continuidad y obtenemos dos ecuaciones sencillas para a y c.','4+2a+2c=0 ⇒ a+c=−2; c=4+a'],
['Resolvemos y recuperamos el tercer parámetro.','2a+4=−2 ⇒ a=−3; c=1; b=4'],
['Comprobamos por separado valores laterales, derivadas y valores en cero y cuatro.','f(2)=4−6+4=2=2c; 4+a=1=c; f(0)=4=f(4)'],
]),mk(1,'Mínimo: frac{7}{4} en x=frac{3}{2}; máximo: 4 en x=0 y x=4.',['Mínimo: 2 en x=2; máximo: 4 en x=0 y x=4.','Mínimo: frac{7}{4} en x=frac{3}{2}; máximo: 2 en x=2.','Mínimo: frac{7}{4} en x=frac{3}{2}; máximo: 4 solo en x=4.'],['Examinar solo la unión y los extremos del dominio.','Confundir el valor en la unión con el máximo global.','Omitir el extremo izquierdo del intervalo cerrado.'],[
['Con los parámetros indicados, la función es continua en el intervalo compacto: alcanza ambos extremos absolutos.','f(x)=piecewise{x²−3x+4 si 0≤x≤2;x si 2<x≤4}'],
['Derivamos en cada tramo y buscamos candidatos interiores.','f′(x)=2x−3 si 0<x<2; f′(x)=1 si 2<x<4'],
['El único punto estacionario es interior al primer tramo. La segunda rama es creciente.','2x−3=0 ⇒ x=frac{3}{2}'],
['Evaluamos el punto estacionario, la unión y los dos extremos del dominio.','f(0)=4; f(frac{3}{2})=frac{7}{4}; f(2)=2; f(4)=4'],
['Comparamos los valores: el menor es siete cuartos y el mayor se repite en los dos extremos.','Mínimo: (frac{3}{2};frac{7}{4}); máximos: (0;4) y (4;4)'],
['La forma de cuadrado confirma el mínimo y la rama lineal no supera cuatro.','x²−3x+4=(x−frac{3}{2})²+frac{7}{4}; 2<x≤4 ⇒ 2<f(x)≤4'],
])];break;
case 276:result=[mk(0,'Punto: (1;frac{1}{2}); pendiente máxima: frac{1}{2}.',['Punto: (frac{1}{2};1−ln(2)); pendiente máxima: 0.','Punto: (2;frac{1}{4}+ln(2)); pendiente máxima: frac{3}{8}.','Punto: (1;1); pendiente máxima: 1.'],['Optimizar la función en lugar de su derivada.','Perder un factor al resolver la anulación de la segunda derivada.','Leer la función como uno sobre x más logaritmo.'],[
['Buscamos el máximo de la pendiente, que es la primera derivada, no el máximo de la función.','m(x)=f′(x)=−frac{1}{2x²}+frac{1}{x}; x>0'],
['Derivamos la pendiente para estudiar su monotonía.','m′(x)=f″(x)=frac{1−x}{x³}'],
['El denominador es positivo: la pendiente aumenta hasta uno y disminuye después.','0<x<1: m′>0; x>1: m′<0'],
['Por ello la pendiente alcanza su máximo absoluto en x igual a uno.','m(1)=−frac{1}{2}+1=frac{1}{2}'],
['La ordenada del punto pedido se obtiene en la función original.','f(1)=frac{1}{2}+ln(1)=frac{1}{2}; P=(1;frac{1}{2})'],
['Una identidad verifica el máximo sin depender únicamente de la tabla de signos.','frac{1}{2}−m(x)=frac{(x−1)²}{2x²}≥0'],
]),mk(1,'Normal: y=−2x+frac{5}{2}.',['Normal: y=frac{x}{2}.','Normal: y=2x−frac{3}{2}.','Normal: y=−2x+frac{1}{2}.'],['Dar la tangente en lugar de la normal.','Olvidar el signo negativo de la pendiente perpendicular.','Usar la ordenada del punto como término independiente.'],[
['Localizamos el punto de la gráfica con abscisa uno.','P=(1;frac{1}{2})'],
['Evaluamos la derivada: la tangente tiene pendiente un medio.','f′(1)=−frac{1}{2}+1=frac{1}{2}'],
['La normal tiene pendiente recíproca y opuesta.','m_N=−frac{1}{1/2}=−2'],
['Escribimos la ecuación punto-pendiente antes de simplificar.','y−frac{1}{2}=−2(x−1)'],
['Despejamos y comprobamos que el punto pertenece a la recta.','y=−2x+frac{5}{2}; x=1 ⇒ y=frac{1}{2}'],
['Verificamos la perpendicularidad de las dos direcciones.','m_T·m_N=frac{1}{2}·(−2)=−1'],
])];break;
case 277:result=[mk(0,'Radio y altura rectangular: frac{10}{4+π} m; ancho: frac{20}{4+π} m.',['Radio y altura rectangular: frac{10}{4+2π} m; ancho: frac{20}{4+2π} m.','Radio y altura rectangular: frac{10}{2+π} m; ancho: frac{20}{2+π} m.','Radio: frac{10}{4+π} m; altura rectangular: frac{20}{4+π} m; ancho: frac{20}{4+π} m.'],['Contar una circunferencia completa en el perímetro en lugar del arco semicircular.','Omitir la base horizontal del perímetro.','Confundir la altura total con la altura del rectángulo.'],[
['Tomamos r como radio del semicírculo y h como altura del rectángulo. La base mide dos radios.','Ancho=2r; altura total=h+r; r>0; h>0'],
['El perímetro exterior incluye base, dos laterales y arco, pero no el diámetro interior entre las dos figuras.','2r+2h+πr=10 ⇒ h=5−frac{2+π}{2}r'],
['Sumamos el área rectangular y la semicircular y sustituimos h.','A=2rh+frac{πr²}{2}=10r−frac{4+π}{2}r²'],
['La función es una parábola estrictamente cóncava. Su único punto estacionario proporciona el máximo.','A′=10−(4+π)r=0 ⇒ r=frac{10}{4+π}; A″=−(4+π)<0'],
['Recuperamos la altura rectangular y el ancho: el óptimo es admisible porque ambas longitudes son positivas.','h=frac{10}{4+π}; ancho=frac{20}{4+π}; altura total=frac{20}{4+π}'],
['Comprobamos el perímetro original y el máximo de la parábola mediante completar el cuadrado.','2h+(2+π)r=10\nA=frac{50}{4+π}−frac{4+π}{2}(r−frac{10}{4+π})²'],
])];break;
case 278:result=[mk(0,'Tangente: y=2x+3.',['Tangente: y=2x+5.','Tangente: y=−2x+7.','Tangente: y=x+4.'],['Tomar la ordenada del punto como término independiente.','Cambiar el signo de la derivada.','Perder el factor dos al derivar x cuadrado.'],[
['El punto de tangencia tiene la abscisa dada y la ordenada de la parábola.','P=(1;1²+4)=(1;5)'],
['Derivamos la función para obtener la pendiente tangente.','f′(x)=2x'],
['Evaluamos la pendiente en la abscisa oficial.','m=f′(1)=2'],
['Aplicamos la ecuación punto-pendiente sin confundir la ordenada con el término independiente.','y−5=2(x−1)'],
['Simplificamos y comprobamos el paso por el punto.','y=2x+3; x=1 ⇒ y=5'],
['La diferencia entre función y recta tiene una raíz doble en uno, comprobación adicional de tangencia.','f(x)−(2x+3)=(x−1)²'],
]),mk(1,'Área=frac{1}{3} u².',['Área=−frac{1}{3} u².','Área=frac{2}{3} u².','Área=frac{13}{3} u².'],['Integrar la recta menos la parábola sin valor absoluto.','Duplicar el recinto a pesar de que el eje vertical solo cierra el lado izquierdo.','Integrar hasta el eje horizontal sin descontar la recta.'],[
['Determinamos el corte de las dos curvas; el otro borde del recinto es el eje de ordenadas.','x²+4=2x+3 ⇒ (x−1)²=0 ⇒ x=1; eje: x=0'],
['La parábola queda por encima de la recta en todo el intervalo considerado.','f(x)−(2x+3)=(x−1)²≥0'],
['El esbozo representa la región entre ambas gráficas desde cero hasta uno.','0≤x≤1; 2x+3≤y≤x²+4'],
['El área es la integral de la diferencia positiva, no la suma de las alturas.','A=∫_0^1(x²−2x+1)dx'],
['Aplicamos Barrow y expresamos el resultado en unidades de superficie.','H(x)=frac{x³}{3}−x²+x; A=H(1)−H(0)=frac{1}{3} u²'],
['La sustitución t igual a uno menos x da la misma integral y confirma el signo.','t=1−x ⇒ A=∫_0^1 t²dt=frac{1}{3}'],
])];break;
case 282:result=[mk(0,'a=3.',['a=(54)^{1/3}.','a=√(27).','a=(frac{27}{2})^{1/3}.'],['Contar solo uno de los dos recintos simétricos.','Resolver como cuadrática la ecuación cúbica del área.','Multiplicar dos veces por dos al sumar los recintos.'],[
['Ambas funciones son pares y los recintos son simétricos respecto del eje vertical.','f(−x)=f(x); g(−x)=g(x)'],
['En el semieje positivo resolvemos los cortes; por simetría aparece también la raíz negativa.','x²=ax ⇒ x=0 o x=a; cortes totales: −a,0,a'],
['Entre cero y a, la recta queda por encima de la parábola.','ax−x²=x(a−x)≥0 si 0≤x≤a'],
['Integramos un recinto y duplicamos para obtener el área total.','A=2∫_0^a(ax−x²)dx=2(frac{a³}{2}−frac{a³}{3})=frac{a³}{3}'],
['Imponemos las nueve unidades cuadradas y elegimos la raíz positiva exigida.','frac{a³}{3}=9 ⇒ a³=27 ⇒ a=3'],
['La sustitución comprueba que cada recinto mide cuatro unidades y media. La monotonía del área para a positivo garantiza unicidad.','∫_0^3(3x−x²)dx=frac{9}{2}; A=9; A′(a)=a²>0'],
])];break;
case 283:result=[mk(0,'Área=4 u², independiente de m.',['Área=4m u².','Área=8 u².','Área=2 u².'],['Perder una potencia de m al integrar y simplificar.','Duplicar un recinto ya integrado completamente.','Contar solo la mitad del recinto simétrico respecto de x=m.'],[
['El denominador es positivo porque m es positivo. Los cortes con el eje se obtienen del numerador.','3x(2m−x)=0 ⇒ x=0 o x=2m'],
['Entre ambas raíces la función es no negativa y fuera del intervalo no hay otro recinto cerrado con el eje.','0≤x≤2m ⇒ x≥0 y 2m−x≥0'],
['Planteamos el área conservando el factor constante del denominador.','A=frac{3}{m³}∫_0^{2m}(2mx−x²)dx'],
['Integramos el polinomio y evaluamos en los dos extremos.','H(x)=mx²−frac{x³}{3}; A=frac{3}{m³}(H(2m)−H(0))'],
['Simplificamos las potencias: el parámetro se cancela exactamente.','A=frac{3}{m³}(4m³−frac{8m³}{3})=4 u²'],
['Verificamos mediante el cambio x igual a mt, que lleva cualquier m positivo al mismo intervalo.','x=mt; dx=m dt ⇒ A=∫_0^2 3t(2−t)dt=4'],
])];break;
default:throw Error('Unknown official case');}if(c.index===277)result[0].visual=graphs[277];if(c.index===278)result[1].visual=graphs[278];return result;}
export function buildOptimalSlopeRegionsBatch(id='batch-0402',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===3?'Integrales definidas y áreas':'Aplicaciones de derivadas';x.secondaryTopics=[];x.block='Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===3?'SOURCE_BOUND_AREAS_WITH_INDEPENDENT_QUADRATURE_AND_GRAPH':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildOptimalSlopeRegionsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0402-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0402.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
