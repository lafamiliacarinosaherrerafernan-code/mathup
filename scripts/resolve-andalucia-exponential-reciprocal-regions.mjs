import fs from'node:fs';import assert from'node:assert/strict';import{pathToFileURL}from'node:url';import{buildBatch}from'./resolve-andalucia-inference-2012.mjs';import{officialParts,part}from'./resolve-andalucia-inference-multipart.mjs';
export const observations=[
 [1023,'7552fbca6211612f8e7009b2d2036dec3d7e33ceecbbd68eef88f6efe99c2007',2,'B.2','af466404b9b74551c0c0b20184b77da18146575de025f11c178f4f7a71d6a4e8',0],
 [1029,'74ab2c123d3df105640328a5953d165030deecf0873f4dfd65271d375ae8be25',1,'A.3','9b94a9876aeec6910cce6359c7d592214c2918fd7d08d6a62ee8a4714a1e3bb9',0],
 [1034,'ffc7b024ef2abe93472bbafd9a890f0f2da04f1e105a1fa378ee1e074ea7fd79',2,'B.2','6d18b6d0eb46c1b0da9c189b9dbead5a748fb64072d598a86e8c10d2f36cc8d0',0],
];
export const statements={1023:'Considera la función f:ℝ→ℝ definida por f(x)=e^{−2x}.\na) Determina el punto de la gráfica de f en el que la recta tangente es y=−2ex.\nb) Esboza el recinto limitado por la gráfica de f, la recta y=−2ex y el eje de ordenadas.\nc) Calcula el área del recinto descrito en el apartado anterior.',1029:'Considera la función f:ℝ→ℝ definida por f(x)=e^x.\na) Calcula a para que la recta tangente a la gráfica de f en el punto (a,f(a)) pase por el origen de coordenadas.\nb) Calcula el área del recinto limitado por la gráfica de f, la recta tangente a la misma en el punto (1,f(1)) y el eje de ordenadas.',1034:'Considera el recinto del primer cuadrante limitado por el eje OX, la recta y=x, la curva y=frac{1}{x³} y la recta x=3.\na) Esboza el recinto.\nb) Calcula su área.\nc) Razona si el área del recinto sería mayor o menor al sustituir la curva y=frac{1}{x³} por la curva y=frac{1}{x}.'};
statements[1034]='Considera el recinto del primer cuadrante limitado por el eje OX, la recta y=x, la gráfica y=frac{1}{x³} y la recta x=3.\na) Haz un esbozo del recinto descrito.\nb) Calcula el área del recinto.\nc) Si consideras la gráfica y=frac{1}{x} en lugar de y=frac{1}{x³}, el área del recinto correspondiente ¿será mayor o será menor que la del recinto inicial? ¿por qué?';
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_EXPONENTIAL_RECIPROCAL_REGIONS_LAYOUT']]:[];
export const cases=[{index:1023,literals:['y = −2ex','eje de ordenadas']},{index:1029,literals:['pase por el origen','(1, f (1))']},{index:1034,literals:['primer cuadrante','x = 3','mayor o será menor']}];
export const proof=c=>({1023:{contact:[-.5,Math.E],slope:-2*Math.E,area:(Math.E-2)/4,bounds:[-.5,0]},1029:{a:1,slope:Math.E,area:(Math.E-2)/2,bounds:[0,1]},1034:{intersection:[1,1],areas:[.5,4/9],area:17/18,replacementArea:.5+Math.log(3),bounds:[0,1,3]}}[c.index]);
export const graphs=Object.fromEntries(cases.map(c=>[c.index,{plotVersion:'exponential-reciprocal-regions-v1',index:c.index}]));
export function renderExponentialReciprocalRegions(g){assert.deepEqual(g,graphs[g.index]);const i=g.index,[xmin,xmax,ymin,ymax]=i===1023?[-.8,.2,-1.2,5.2]:i===1029?[-.2,1.3,-.7,3.8]:[-.1,3.3,-.1,1.5],X=x=>70+650*(x-xmin)/(xmax-xmin),Y=y=>325-295*(y-ymin)/(ymax-ymin),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,trace=(f,a,b)=>Array.from({length:601},(_,j)=>{const x=a+(b-a)*j/600;return pt(x,f(x));}).join(' '),curve=(f,a,b,col)=>`<polyline points="${trace(f,a,b)}" stroke="${col}" stroke-width="3" fill="none"/>`,shade=(f,h,a,b)=>`<polygon points="${trace(f,a,b)} ${trace(h,b,a)}" fill="#cdeaf2"/>`,clip=`exp-recip-${i}`;let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 425" role="img" aria-label="Recinto calculado a partir de las fórmulas oficiales"><rect width="760" height="425" fill="white"/><defs><clipPath id="${clip}"><rect x="70" y="30" width="650" height="295"/></clipPath></defs>`;
for(let k=0;k<=5;k++){const x=xmin+(xmax-xmin)*k/5,y=ymin+(ymax-ymin)*k/5;s+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)} M${pt(xmin,y)} L${pt(xmax,y)}" stroke="#e2e7ed"/><text x="${X(x)}" y="348" text-anchor="middle" font-size="14">${Number(x.toFixed(2))}</text><text x="60" y="${Y(y)+4}" text-anchor="end" font-size="14">${Number(y.toFixed(2))}</text>`;}s+=`<g clip-path="url(#${clip})">`;
if(i===1023)s+=shade(x=>Math.exp(-2*x),x=>-2*Math.E*x,-.5,0)+curve(x=>Math.exp(-2*x),xmin,xmax,'#075597')+curve(x=>-2*Math.E*x,xmin,xmax,'#a52d3c');
if(i===1029)s+=shade(Math.exp,x=>Math.E*x,0,1)+curve(Math.exp,xmin,xmax,'#075597')+curve(x=>Math.E*x,xmin,xmax,'#a52d3c');
if(i===1034)s+=shade(x=>x,()=>0,0,1)+shade(x=>1/x**3,()=>0,1,3)+curve(x=>x,0,1.5,'#a52d3c')+curve(x=>1/x**3,.5,3.3,'#075597')+`<path d="M${pt(3,0)} L${pt(3,1/27)}" stroke="#16805c" stroke-width="3"/>`;
s+=`<path d="M${pt(xmin,0)} L${pt(xmax,0)} M${pt(0,ymin)} L${pt(0,ymax)}" stroke="#333"/></g>`;const labels=i===1023?['Azul: e⁻²ˣ; rojo: y=−2ex. Tangencia (−1/2;e).','Área sombreada entre x=−1/2 y x=0.']:i===1029?['Azul: eˣ; rojo: y=ex. Tangencia (1;e).','Área sombreada entre x=0 y x=1.']:['Rojo: y=x; azul: y=1/x³; frontera derecha: x=3.','Bajo y=x en [0;1] y bajo y=1/x³ en [1;3].'];return s+`<text x="40" y="380" font-size="17">${labels[0]}</text><text x="40" y="409" font-size="17">${labels[1]}</text></svg>`;}
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,r,s,v=false)=>{const p=part(ps[i],a,d,r,s,'TANGENCY_RESIDUAL_AND_INDEPENDENT_NUMERICAL_QUADRATURE',proof(c));if(v)p.visual=structuredClone(graphs[c.index]);return p;};switch(c.index){
case 1023:return[mk(0,'P=(−frac{1}{2},e).',['P=(0,1).','P=(frac{1}{2},frac{1}{e}).','P=(−1,e²).'],['Tomar el corte con el eje de ordenadas.','Cambiar el signo al resolver el exponente.','Olvidar el factor dos dentro del exponente.'],[
 ['Para la tangencia deben coincidir la pendiente y el punto de paso.','f′(a)=−2e; f(a)=−2ea'],
 ['Derivamos la exponencial aplicando la regla de la cadena.','f′(x)=−2e^{−2x}'],
 ['Igualamos pendientes y usamos que la exponencial es inyectiva.','−2e^{−2a}=−2e ⇒ −2a=1 ⇒ a=−frac{1}{2}'],
 ['Calculamos la ordenada con la función original.','f(−frac{1}{2})=e'],
 ['Comprobamos que el punto pertenece también a la recta dada.','−2e·(−frac{1}{2})=e'],
 ['La tangente obtenida por punto-pendiente coincide exactamente con la prescrita.','y−e=−2e(x+frac{1}{2}) ⇒ y=−2ex'],
 ]),mk(1,'Recinto entre x=−frac{1}{2} y x=0, bajo e^{−2x} y sobre y=−2ex.',['Recinto entre x=0 y x=frac{1}{2}, bajo e^{−2x} y sobre y=−2ex.','Recinto entre x=−frac{1}{2} y x=0, bajo y=−2ex y sobre e^{−2x}.','Recinto entre x=−1 y x=0, bajo e^{−2x} y sobre y=−2ex.'],['Cambiar el lado del eje de ordenadas.','Intercambiar la frontera superior y la inferior.','Usar una abscisa que no es la tangencia.'],[
 ['Marcamos el punto de contacto ya demostrado.','P=(−frac{1}{2},e)'],
 ['Situamos los dos cortes de las fronteras con el eje vertical.','f(0)=1; y(0)=0'],
 ['La curva es decreciente y estrictamente convexa.','f′(x)<0; f″(x)=4e^{−2x}>0'],
 ['La convexidad coloca la curva sobre su tangente, que la toca solo una vez.','e^{−2x}≥−2ex; igualdad solo en x=−frac{1}{2}'],
 ['Cerramos el recinto con el segmento del eje de ordenadas.','−frac{1}{2}≤x≤0; −2ex≤y≤e^{−2x}'],
 ['La gráfica adjunta dibuja las tres fronteras y sombrea únicamente esa zona.','En x=0 la altura del recinto es 1; en la tangencia es 0'],
 ],true),mk(2,'Área=frac{e−2}{4} u².',['Área=frac{e−1}{2} u².','Área=frac{e}{4} u².','Área=frac{e−2}{2} u².'],['Integrar solo la exponencial sin restar la recta.','Perder el término −1/2 de la evaluación.','Duplicar el recinto sin que exista simetría.'],[
 ['Usamos superior menos inferior entre la tangencia y el eje vertical.','A=∫_{−1/2}^{0}(e^{−2x}+2ex)dx'],
 ['Integramos la exponencial incluyendo su factor de cadena.','∫e^{−2x}dx=−frac{1}{2}e^{−2x}'],
 ['Integramos el término lineal y formamos una primitiva del integrando.','H(x)=−frac{1}{2}e^{−2x}+ex²'],
 ['Evaluamos ambos extremos sin perder sus signos.','H(0)=−frac{1}{2}; H(−frac{1}{2})=−frac{e}{4}'],
 ['Restamos y expresamos el área positiva.','A=−frac{1}{2}+frac{e}{4}=frac{e−2}{4} u²'],
 ['Contrastamos por áreas separadas: área bajo la exponencial menos triángulo bajo la recta.','A=frac{e−1}{2}−frac{(1/2)e}{2}=frac{e−2}{4}≈0,17957'],
 ])];
case 1029:return[mk(0,'a=1.',['a=0.','a=−1.','a=e.'],['Confundir pasar por el origen con tener abscisa de tangencia cero.','Cambiar el signo de a en la forma punto-pendiente.','Confundir la abscisa con la ordenada del contacto.'],[
 ['Calculamos la función y su derivada en una abscisa general a.','f(a)=e^a; f′(a)=e^a'],
 ['Escribimos la recta tangente por punto-pendiente.','y−e^a=e^a(x−a)'],
 ['Imponemos que el origen pertenece a esa recta.','−e^a=−ae^a'],
 ['La exponencial nunca es cero, de modo que podemos dividir por ella.','e^a>0 ⇒ 1=a'],
 ['Obtenemos el punto y la recta concreta.','P=(1,e); y−e=e(x−1) ⇒ y=ex'],
 ['Comprobamos paso por el origen y pendiente tangente.','y(0)=0; y(1)=e=f(1); pendiente=e=f′(1)'],
 ]),mk(1,'Área=frac{e−2}{2} u².',['Área=e−1 u².','Área=frac{e−1}{2} u².','Área=frac{e−2}{4} u².'],['Olvidar restar la región bajo la tangente.','Aplicar un factor mitad a toda la integral exponencial.','Dividir por dos adicionalmente el área correcta.'],[
 ['Las fronteras se encuentran en la tangencia x=1 y en el eje vertical x=0.','f(0)=1; y(0)=0; f(1)=e'],
 ['La convexidad sitúa e^x sobre su recta tangente.','f″(x)=e^x>0 ⇒ e^x≥ex'],
 ['Planteamos la integral definida de la altura del recinto.','A=∫_{0}^{1}(e^x−ex)dx'],
 ['Calculamos una primitiva y comprobamos su derivada.','H(x)=e^x−frac{e}{2}x²; H′(x)=e^x−ex'],
 ['Evaluamos y restamos el extremo inferior.','A=(e−frac{e}{2})−1=frac{e−2}{2} u²'],
 ['Una segunda comprobación resta el triángulo de base uno y altura e al área bajo la exponencial.','A=(e−1)−frac{e}{2}≈0,35914; véase la zona sombreada'],
 ],true)];
case 1034:return[mk(0,'Recinto sobre OX, bajo y=x en [0,1] y bajo y=frac{1}{x³} en [1,3].',['Recinto sobre OX, bajo y=frac{1}{x³} en (0,1] y bajo y=x en [1,3].','Recinto entre y=x e y=frac{1}{x³} en [1,3].','Recinto sobre OX y bajo y=x en [0,3].'],['Intercambiar las ramas e introducir un área impropia no acotada.','Omitir el eje OX como frontera.','Omitir la curva recíproca como frontera.'],[
 ['Buscamos la intersección en el primer cuadrante, donde x es positivo.','x=frac{1}{x³} ⇒ x⁴=1 ⇒ x=1; P=(1,1)'],
 ['La recta comienza en el origen y cierra por arriba la primera porción.','0≤x≤1; 0≤y≤x'],
 ['Tras la intersección la curva recíproca queda debajo de la recta.','1≤x≤3; 0≤y≤frac{1}{x³}'],
 ['La recta vertical x=3 cierra el extremo derecho.','En x=3: 0≤y≤frac{1}{27}'],
 ['La asíntota de la curva en cero no pertenece a la frontera superior de este recinto.','En [0,1] usamos y=x, no y=frac{1}{x³}'],
 ['La gráfica adjunta conserva ambas porciones y su unión en P.','Vértices de frontera: (0,0),(1,1),(3,frac{1}{27}),(3,0)'],
 ],true),mk(1,'Área=frac{17}{18} u².',['Área=frac{9}{2} u².','Área=frac{4}{9} u².','Área=frac{19}{18} u².'],['Integrar la recta hasta tres ignorando la curva.','Omitir el triángulo entre cero y uno.','Cambiar el signo del extremo superior en la integral recíproca.'],[
 ['Partimos en x=1, donde cambia la frontera superior.','A=∫_{0}^{1}x dx+∫_{1}^{3}x^{−3}dx'],
 ['La primera porción es un triángulo de base y altura uno.','A₁=frac{1}{2}'],
 ['Integramos la potencia negativa, sin confundirla con 1/x.','∫x^{−3}dx=−frac{1}{2x²}'],
 ['Evaluamos en tres y uno, en ese orden.','A₂=−frac{1}{18}−(−frac{1}{2})=frac{4}{9}'],
 ['Sumamos las dos porciones positivas.','A=frac{1}{2}+frac{4}{9}=frac{17}{18} u²'],
 ['Verificamos la primitiva por derivación y contrastamos el valor numérico de ambas áreas.','(−frac{1}{2x²})′=frac{1}{x³}; A≈0,94444'],
 ]),mk(2,'Sería mayor: nueva área=frac{1}{2}+ln(3)>frac{17}{18}.',['Sería menor: nueva área=frac{1}{2}+ln(3)<frac{17}{18}.','Sería igual: ambas curvas pasan por (1,1).','Sería mayor: nueva área=frac{1}{2}+frac{4}{9}.'],['Invertir el orden de las potencias recíprocas para x>1.','Confundir una intersección común con igualdad de áreas.','Mantener la integral de x⁻³ después de sustituirla por x⁻¹.'],[
 ['La nueva curva sigue cortando y=x en el mismo punto positivo.','x=frac{1}{x} ⇒ x=1'],
 ['La primera porción permanece sin cambios.','A₁=frac{1}{2}'],
 ['Comparamos las fronteras superiores entre uno y tres.','frac{1}{x}−frac{1}{x³}=frac{x²−1}{x³}>0 para x>1'],
 ['Una altura estrictamente mayor en ese intervalo da un área estrictamente mayor.','∫_{1}^{3}frac{1}{x}dx>∫_{1}^{3}frac{1}{x³}dx'],
 ['Calculamos la nueva integral con la primitiva logarítmica.','A nueva=frac{1}{2}+[ln x]₁³=frac{1}{2}+ln(3)'],
 ['Contrastamos los valores y conservamos la conclusión geométrica.','A nueva≈1,59861>0,94444≈frac{17}{18}'],
 ])];default:throw Error('Unknown exponential/reciprocal region');}}
export function buildExponentialReciprocalRegionsBatch(id='batch-0465',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){x.primaryTopic='Integrales definidas y áreas';x.secondaryTopics=['Derivadas'];x.block='Análisis';x.examSlot=3;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_AREAS_WITH_INDEPENDENT_QUADRATURE_AND_GRAPH'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_DERIVED_GRAPH';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildExponentialReciprocalRegionsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0465-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0465.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
