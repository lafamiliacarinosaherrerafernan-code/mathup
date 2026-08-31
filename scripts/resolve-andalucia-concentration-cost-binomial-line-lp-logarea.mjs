import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';

export const observations=[
 [1111,'0667329f779d37d2aceff1fd9932ed73388d1935a22029eae06d151f030424cc',1,'4','6797eb8f9ee259ceb063957faf3202daa6f943bfed422f46c5a3fa31e44685a7',0],
 [1113,'5bd7838829b9f653746319907f86642017d12e66ed097db0126fb544a2d0f632',1,'2','2465ae19f10b4663ce79103cef9589bdebb66f4f00522babd51dfbc8655abf10',0],
 [1114,'aff1623cbfcc5746a42ee3e24d9106759726a132f9d1a462260f9a4de6617f89',2,'6','571c1433e1b13716b1d9d09b78472b1053da9c1d2e3e7f024128a27e41d88163',0],
 [1115,'e6356a504a4c1346274193aeafd23fff6f5df37695b3de420a0604e5b166eae0',2,'4','5109b369604cc9b2c937bc619b2e4a25c6f7e1dc59d285d60641ad3109770061',0],
 [1119,'c42a605501a277fe7194b964ad92ad66047be9a62dc254fa2219d756d3d71317',1,'1','8d8d1c689d9b6563cbe5c4b7e6f2a443956f0876d98ed83615377a6f6ed60b8b',0],
 [1120,'67593e6ffe6b4e602cf2a0d3b68d10dd2038435a99caf87bc3c83a2f80b2785a',1,'4','f3c5e33af617d4111c571e52b0f6ca6cf99502267957af7671eba231310c514c',0],
];

export const statements={
 1111:'El nivel de concentración de un alumno universitario durante un examen viene dado por f(t)=cases{−t²+2t+10, 0≤t≤2,5; t²+at+b, 2,5<t≤5}, donde t es el tiempo en horas y a,b son números reales.\na) ¿Con qué nivel de concentración comienza el examen? Determina a y b para que f sea continua y derivable en t=2,5.\nb) Para a=−8 y b=22,5, esboza la gráfica de f, estudiando previamente la monotonía y calculando cuándo se alcanzan los niveles máximo y mínimo.',
 1113:'La función de costes de una empresa es f(x)=40−6x+x², para x≥0, donde x representa la cantidad producida de un artículo.\na) ¿Disminuye el coste alguna vez? Determina la cantidad producida cuando el coste es mínimo y dicho coste.\nb) ¿Cuál sería el coste si no se produjese nada? Si el coste fuese 80, ¿cuántas unidades se producirían?\nc) Representa gráficamente la función.',
 1114:'Un tratamiento experimental mejora al 60% de los pacientes a los que se suministra. Cinco pacientes se someten al tratamiento.\na) Indica la distribución de X, número de pacientes de los 5 que mejoran. ¿Cuál es la probabilidad de que mejoren cuatro?\nb) Calcula la probabilidad de que al menos dos mejoren.\nc) ¿Cuántos pacientes se espera que mejoren?\nd) ¿Cuántos pacientes deberían someterse al tratamiento para que el número esperado de mejorías sea mayor o igual que 12?',
 1115:'Sea r la recta que pasa por A(1,0,−1) y B(2,−1,3).\na) Calcula la distancia del origen a r.\nb) Halla la ecuación de la recta que corta perpendicularmente a r y pasa por el origen.',
 1119:'Una empresa produce baterías A y B. Debe producir al menos 10 en total; el número de B no puede superar en más de 10 al de A. Los costes son 150 euros por A y 100 euros por B, con un máximo semanal de 6000 euros. Los beneficios son 130 euros por A y 140 euros por B. ¿Cuántas de cada tipo debe producir para maximizar el beneficio? ¿Cuál es ese beneficio?',
 1120:'Considera f:(−1,+∞)→R, f(x)=ln(x+1). Calcula el área limitada por su gráfica, el eje de abscisas y la recta x=e−1.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_CONCENTRATION_COST_BINOMIAL_LINE_LP_LOGAREA_LAYOUT']]:[];
export const cases=[
 {index:1111,slot:3,literals:['nivel de concentración','continua y derivable','esboce la gráfica']},
 {index:1113,slot:3,literals:['40 − 6x + x2','coste es mínimo','coste fuese 80']},
 {index:1114,slot:4,literals:['60%','Cinco pacientes','al menos dos']},
 {index:1115,slot:4,literals:['A(1, 0, −1)','B(2, −1, 3)','distancia del origen']},
 {index:1119,slot:2,literals:['al menos 10','máximo de 6000','130 euros']},
 {index:1120,slot:3,literals:['ln(x + 1)','x = e − 1','área del recinto']},
];

export const proof=c=>({
 1111:{initial:10,a:-8,b:45/2,maximum:[1,11],minimum:[4,13/2]},
 1113:{minimum:[3,31],f0:40,x80:10},
 1114:{p4:0.2592,pAtLeast2:0.91296,mean:3,minN:20},
 1115:{distance:Math.sqrt(6)/2,foot:[7/6,-1/6,-1/3],direction:[7,-1,-2]},
 1119:{vertices:[[0,10],[20,30],[40,0],[10,0]],optimum:[20,30,6800]},
 1120:{area:1},
}[c.index]);
const graphs={
 1111:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'concentration-piecewise-v1',xRange:[0,5],yRange:[5,12],pieces:[{expression:'−t²+2t+10',domain:[0,2.5]},{expression:'t²−8t+22.5',domain:[2.5,5]}],points:[[0,10,'inicio'],[1,11,'máximo'],[2.5,8.75,'unión'],[4,6.5,'mínimo']]},
 1113:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'cost-quadratic-v1',xRange:[0,12],yRange:[25,90],pieces:[{expression:'x²−6x+40',domain:[0,12]}],points:[[0,40,'(0;40)'],[3,31,'mínimo'],[10,80,'(10;80)']]},
};
const P=(ps,k,a,w,reasons,steps,method,proof,visual)=>{const x=part(ps[k],a,w,reasons,steps,method,proof);if(visual)x.visual=visual;return x;};

export function solve(c){const text=statements[c.index],ps=[1119,1120].includes(c.index)?[{id:'whole',prompt:text}]:officialParts(text),p=proof(c);
 if(c.index===1111)return[
  P(ps,0,'Comienza con 10 unidades; para continuidad y derivabilidad, a=−8 y b=45/2.',['Comienza con 8,75; a=−3, b=10.','Comienza con 10; a=−8, b=20.','Comienza con 12; a=−5, b=15.'],['Confundir el valor de unión con el inicial.','Imponer solo continuidad.','Evaluar el tramo incorrecto en t=0.'],[['Evaluamos el tramo inicial.','f(0)=10'],['Calculamos el límite izquierdo en 2,5.','−(5/2)²+2(5/2)+10=35/4'],['Imponemos continuidad.','25/4+(5/2)a+b=35/4 ⇒ (5/2)a+b=5/2'],['Derivamos cada tramo.','f₁′(t)=−2t+2; f₂′(t)=2t+a'],['Imponemos derivabilidad en 2,5.','−3=5+a ⇒ a=−8'],['Sustituimos en continuidad.','−20+b=5/2 ⇒ b=45/2'],['Verificamos ambos valores y derivadas laterales.','f₁(2,5)=f₂(2,5)=35/4; f₁′(2,5)=f₂′(2,5)=−3']],'PIECEWISE_CONTINUITY_DIFFERENTIABILITY',p),
  P(ps,1,'Máximo global en t=1: 11; mínimo global en t=4: 13/2.',['Máximo en t=2,5: 35/4; mínimo en t=5: 15/2.','Máximo en t=4: 13/2; mínimo en t=1: 11.','Máximo en t=0: 10; mínimo en t=2,5: 35/4.'],['Mirar solo los extremos de los intervalos.','Intercambiar crecimiento y decrecimiento.','Omitir los puntos críticos interiores.'],[['Con a=−8,b=45/2 escribimos los tramos.','f₁=−t²+2t+10; f₂=t²−8t+45/2'],['Estudiamos f₁′.','f₁′=−2t+2: crece en [0,1] y decrece en [1,2,5]'],['Estudiamos f₂′.','f₂′=2t−8: decrece en (2,5,4] y crece en [4,5]'],['Evaluamos candidatos.','f(0)=10; f(1)=11; f(2,5)=35/4; f(4)=13/2; f(5)=15/2'],['Comparamos.','11 es el máximo y 13/2 el mínimo'],['Comprobamos continuidad y dibujamos ambas parábolas unidas.','Los tramos coinciden en (2,5;35/4)']],'PIECEWISE_MONOTONICITY_GLOBAL_EXTREMA',p,graphs[1111]),
 ];
 if(c.index===1113)return[
  P(ps,0,'Sí. Disminuye para 0≤x<3; el mínimo se alcanza en x=3 y vale 31.',['Disminuye para x>3; mínimo 40 en x=0.','Disminuye siempre; mínimo 0 en x=10.','No disminuye; mínimo 31 en x=6.'],['Invertir el signo de la derivada.','Confundir coste con unidades.','Olvidar el dominio x≥0.'],[['Derivamos.','f′(x)=2x−6'],['Localizamos el punto crítico.','2x−6=0 ⇒ x=3'],['Estudiamos el signo en el dominio.','f′<0 en [0,3) y f′>0 en (3,∞)'],['Concluimos que hay mínimo.','x=3'],['Calculamos su valor.','f(3)=40−18+9=31'],['Verificamos con f′′.','f′′=2>0']],'QUADRATIC_COST_MONOTONICITY',p),
  P(ps,1,'f(0)=40; si el coste es 80, se producen 10 unidades.',['f(0)=0; se producen 8 unidades.','f(0)=40; se producen 4 unidades.','f(0)=46; se producen 10 o −4 unidades físicas.'],['Omitir el término independiente.','Resolver mal la cuadrática.','Aceptar la raíz negativa fuera del dominio.'],[['Evaluamos sin producción.','f(0)=40'],['Igualamos el coste a 80.','x²−6x+40=80'],['Ordenamos.','x²−6x−40=0'],['Factorizamos.','(x−10)(x+4)=0'],['Aplicamos x≥0.','x=10; se descarta x=−4'],['Comprobamos.','f(10)=40−60+100=80']],'QUADRATIC_DOMAIN_EQUATION',p),
  P(ps,2,'Parábola f(x)=(x−3)²+31 para x≥0, con vértice (3,31) y corte (0,40).',['Recta decreciente que pasa por (0,40).','Parábola cóncava con máximo (3,31).','Parábola con vértice (−3,31).'],['Perder el término x².','Cambiar la concavidad.','Cambiar el signo al completar cuadrados.'],[['Completamos el cuadrado.','x²−6x+40=(x−3)²+31'],['Identificamos vértice y eje.','V=(3,31); eje x=3'],['La concavidad es positiva.','Coeficiente de x²=1>0'],['Marcamos el extremo del dominio.','f(0)=40'],['No hay cortes con el eje x.','Δ=36−160<0'],['Trazamos solo para x≥0.','Desciende hasta V y luego crece']],'QUADRATIC_GRAPH_FROM_VERTEX',p,graphs[1113]),
 ];
 if(c.index===1114)return[
  P(ps,0,'X~Binomial(5,0,6) y P(X=4)=0,2592.',['X~Normal(5,0,6) y P(X=4)=0,3456.','X~Binomial(4,0,6) y P(X=4)=0,1296.','X~Binomial(5,0,4) y P(X=4)=0,0768.'],['Usar una distribución continua.','Tomar cuatro ensayos.','Intercambiar éxito y fracaso.'],[['Cada paciente constituye un ensayo de Bernoulli independiente.','n=5; p=0,6'],['Identificamos la distribución.','X~B(5,0,6)'],['Aplicamos la probabilidad puntual.','P(X=4)=C(5,4)0,6⁴0,4'],['Calculamos.','5·0,1296·0,4=0,2592'],['Verificamos que está entre 0 y 1.','0<0,2592<1']],'BINOMIAL_POINT_PROBABILITY',p),
  P(ps,1,'P(X≥2)=0,91296.',['0,08704.','0,92224.','0,66304.'],['Calcular el complementario y no restarlo de 1.','Omitir P(X=1).','Calcular P(X≤2).'],[['Usamos el suceso complementario.','P(X≥2)=1−P(X=0)−P(X=1)'],['Calculamos P(X=0).','0,4⁵=0,01024'],['Calculamos P(X=1).','5·0,6·0,4⁴=0,0768'],['Restamos.','1−0,01024−0,0768=0,91296'],['Comprobamos con la suma binomial.','P(2)+P(3)+P(4)+P(5)=0,91296']],'BINOMIAL_COMPLEMENT',p),
  P(ps,2,'Se espera que mejoren 3 pacientes.',['2 pacientes.','5 pacientes.','3,6 pacientes.'],['Usar n(1−p).','Confundir esperanza con total.','Multiplicar por n dos veces.'],[['La esperanza binomial es np.','E(X)=np'],['Sustituimos.','E(X)=5·0,6'],['Calculamos.','E(X)=3'],['Interpretamos.','El número medio esperado de mejorías es 3']],'BINOMIAL_EXPECTATION',p),
  P(ps,3,'Deben someterse al menos 20 pacientes.',['12 pacientes.','19 pacientes.','21 pacientes.'],['Confundir esperanza con n.','Redondear hacia abajo.','Imponer una desigualdad estricta.'],[['Para n pacientes la esperanza es 0,6n.','E(X)=0,6n'],['Imponemos la condición.','0,6n≥12'],['Despejamos.','n≥20'],['Como n es entero, el mínimo es 20.','n_min=20'],['Comprobamos.','0,6·20=12; 0,6·19=11,4<12']],'BINOMIAL_EXPECTATION_MINIMUM_N',p),
 ];
 if(c.index===1115)return[
  P(ps,0,'La distancia es √6/2.',['√6.','3√2.','√3/2.'],['Omitir dividir por la norma del director.','Usar la norma del director como distancia.','Calcular mal el producto vectorial.'],[['Calculamos un director.','v=B−A=(1,−1,4)'],['Usamos d(O,r)=|AO×v|/|v|.','AO=(1,0,−1)'],['Calculamos el producto vectorial.','AO×v=(−1,−5,−1)'],['Calculamos normas.','|AO×v|=3√3; |v|=3√2'],['Dividimos y racionalizamos.','d=√(3/2)=√6/2'],['Verificamos mediante el pie H.','H=(7/6,−1/6,−1/3); |H|=√6/2']],'POINT_LINE_DISTANCE_CROSS_PRODUCT',p),
  P(ps,1,'La recta es (x,y,z)=λ(7,−1,−2), λ∈R.',['(x,y,z)=(1,0,−1)+λ(7,−1,−2).','(x,y,z)=λ(1,−1,4).','(x,y,z)=λ(7,1,−2).'],['Hacerla pasar por A, no por el origen.','Usar la dirección de r.','Cambiar un signo y perder la intersección.'],[['Buscamos el pie H=A+tv con OH perpendicular a v.','(A+tv)·v=0'],['Calculamos A·v.','A·v=−3; |v|²=18'],['Despejamos el parámetro.','t=1/6'],['Hallamos el pie.','H=(7/6,−1/6,−1/3)'],['La recta pedida pasa por O y H.','s: X=λ(7,−1,−2)'],['Verificamos perpendicularidad.','(7,−1,−2)·(1,−1,4)=0'],['Verificamos el corte.','λ=1/6 produce H∈r']],'COMMON_PERPENDICULAR_THROUGH_POINT',p),
 ];
 if(c.index===1119)return[P(ps,0,'Debe producir 20 baterías A y 30 baterías B; el beneficio máximo es 6800 euros.',['30 A y 20 B; beneficio 6700 euros.','40 A y 0 B; beneficio 5200 euros.','0 A y 60 B; beneficio 8400 euros.'],['Intercambiar tipos y beneficios.','Elegir un vértice no óptimo.','Ignorar la restricción B≤A+10.'],[['Definimos variables y función objetivo.','x=A; y=B; maximizar Z=130x+140y'],['Traducimos restricciones.','x+y≥10; y≤x+10; 3x+2y≤120; x,y≥0'],['Calculamos los vértices factibles.','(0,10),(10,0),(40,0),(20,30)'],['Evaluamos Z.','1400,1300,5200,6800'],['Elegimos el mayor valor.','Z_max=6800 en (20,30)'],['Comprobamos las restricciones.','50≥10; 30=20+10; 3·20+2·30=120']],'LINEAR_PROGRAMMING_VERTEX_CHECK',p)];
 if(c.index===1120)return[P(ps,0,'El área es 1 unidad cuadrada.',['e−1 unidades cuadradas.','e unidades cuadradas.','1/e unidades cuadradas.'],['Confundir longitud de la base con área.','Omitir evaluar el extremo inferior.','Integrar ln(x+1) como 1/(x+1).'],[['La gráfica corta el eje en x=0.','ln(x+1)=0 ⇒ x=0'],['En [0,e−1], f≥0.','x+1∈[1,e]'],['Planteamos el área.','A=∫_0^{e−1}ln(x+1)dx'],['Sustituimos u=x+1.','A=∫_1^e ln u du'],['Integramos por partes.','∫ln u du=u ln u−u'],['Evaluamos.','A=[u ln u−u]_1^e=0−(−1)=1'],['Comprobamos positividad.','A=1>0']],'LOGARITHMIC_EXACT_AREA',p)];
 throw Error('Unknown concentration-cost-binomial-line-lp-logarea source');
}

export function buildConcentrationCostBinomialLineLpLogareaBatch(id='batch-0480',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const i=x.correctionEvidence.parameters.index;x.primaryTopic=i===1111||i===1113?'Análisis de funciones':i===1114?'Distribuciones de probabilidad':i===1115?'Geometría métrica en el espacio':i===1119?'Programación lineal':'Integrales';x.secondaryTopics=i===1111?['Continuidad','Derivabilidad','Extremos']:i===1113?['Optimización','Parábolas']:i===1114?['Binomial','Esperanza']:i===1115?['Rectas','Distancias']:i===1119?['Región factible','Optimización']:['Logaritmos','Área'];x.block=i===1114?'Probabilidad':i===1115?'Geometría':i===1119?'Álgebra':'Análisis';x.examSlot=x.correctionEvidence.parameters.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'EXACT_OFFICIAL_FORMULAS_WITH_INDEPENDENT_VERIFICATION'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildConcentrationCostBinomialLineLpLogareaBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0480-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0480.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
