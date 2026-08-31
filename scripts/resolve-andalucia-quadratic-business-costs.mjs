import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {renderPolynomialGraph} from './resolve-andalucia-calculus-graph-branches.mjs';
export const cases=[
 {index:108,literals:['0.5x2 − 4x + 6','intervalo [0,10]'],coefficients:[6,-4,.5],domain:[0,10]},
 {index:482,literals:['−2t 2 + 51t','t 2 − 3t + 96','0 ≤ t ≤ 18'],coefficients:[-96,54,-3],domain:[0,18]},
 {index:1113,literals:['40 − 6x + x2','coste fuese 80'],coefficients:[40,-6,1],domain:[0,Infinity]},
 {index:1142,literals:['−2x2 + 36x + 138','138 mil euros'],coefficients:[138,36,-2],domain:[0,Infinity]},
 {index:1264,literals:['x2 − 6x + 10','abscisa x = 4'],coefficients:[10,-6,1],domain:[0,Infinity]},
 {index:1547,literals:['−0.001x2 + 0.4x + 3.5','x ≥ 10','100000 euros'],coefficients:[3.5,.4,-.001],domain:[10,Infinity]},
 {index:1615,literals:['2x2 − 36x + 200','siete mil kilogramos','200000 €'],coefficients:[200,-36,2],domain:[0,Infinity]},
 {index:1203,literals:['9000 + 0.08 x + 2000000','1000 ≤ x ≤ 6000'],rational:{constant:9000,linear:.08,reciprocal:2000000},domain:[1000,6000]},
];
export const value=(c,x)=>c.rational?c.rational.constant+c.rational.linear*x+c.rational.reciprocal/x:c.coefficients.reduce((s,a,k)=>s+a*x**k,0);
const spec=(index,xRange,yRange,step,coefficients,axisLabels,points,extra=[])=>({schemaVersion:'mathup.calculus-graph.v1',plotVersion:'quadratic-business-costs-v1',index,xRange,yRange,step,axisLabels,pieces:[{range:index===482?[0,18]:[0,xRange[1]],coefficients,leftClosed:true,rightClosed:index===482,label:index===482?'B(t)=−3t²+54t−96; 0≤t≤18':'Función original, dominio x≥0; continúa a la derecha',color:'#075597'},...extra],points:points.map(([xy,label,dx=12,dy=-12])=>({xy,label,dx,dy}))});
export const graphs={
 482:spec(482,[0,18],[-110,170],[3,40],[-96,54,-3],['t, años','B, miles de euros'],[[[0,-96],'(0;−96)',12,18],[[2,0],'(2;0)',10,20],[[9,147],'V(9;147)'],[[16,0],'(16;0)',-12,20],[[18,-96],'(18;−96)',-12,18]]),
 1113:spec(1113,[0,11],[0,100],[2,20],[40,-6,1],['x, cantidad','f(x), coste'],[[[0,40],'(0;40)'],[[3,31],'V(3;31)',12,22],[[6,40],'(6;40)'],[[10,80],'(10;80)',-12,-12]]),
 1142:spec(1142,[0,24],[-170,340],[4,100],[138,36,-2],['x, miles de euros','f, miles de euros'],[[[0,138],'(0;138)'],[[9,300],'V(9;300)'],[[18,138],'(18;138)',-12,-12],[[9+5*Math.sqrt(6),0],'x=9+5√6',-12,22]]),
 1264:spec(1264,[0,8],[-8,28],[1,5],[10,-6,1],['x, miles de kg','f, miles de euros'],[[[0,10],'(0;10)'],[[3,1],'V(3;1)',-12,24],[[4,2],'T(4;2)',12,-16]], [{range:[0,8],coefficients:[-6,2],leftClosed:true,rightClosed:false,label:'Tangente y=2x−6; continúa a la derecha',color:'#b3402b'}]),
 1615:spec(1615,[0,21],[0,350],[3,50],[200,-36,2],['x, miles de kg','f, miles de euros'],[[[0,200],'(0;200)'],[[9,38],'V(9;38)',12,24],[[18,200],'(18;200)',-12,-12]]),
};
export function renderBusinessCostGraph(s){assert.deepEqual(s,graphs[s.index]);return renderPolynomialGraph(s);}
export function solve(c,text){const ps=c.index===1203?[{id:'whole',prompt:text}]:officialParts(text);const mk=(k,a,w,reasons,steps,proof,visual=false)=>{const p=part(ps[k],a,w,reasons,steps,'INDEPENDENT_FACTORIZATION_DERIVATIVE_AND_GLOBAL_SQUARE_BOUND',proof);if(visual)p.visual=structuredClone(graphs[c.index]);return p;};
 if(c.index===108){assert.equal(ps.length,3);return[
  mk(0,'Pérdidas para 2<x<6: inversión entre 2 000 y 6 000 €, sin incluir extremos.',[
   'Pérdidas para 0≤x<2 o 6<x≤10: inversión fuera de 2 000–6 000 €.','Pérdidas para 2≤x≤6: inversión de 2 000 a 6 000 €, incluidos extremos.','Pérdidas para 0<x<8: inversión entre 0 y 8 000 €, sin incluir extremos.'
  ],['Invertir el signo de una parábola convexa.','Confundir pérdida con beneficio nulo.','Usar las raíces de B(x)=6 en lugar de B(x)=0.'],[
   ['Una pérdida significa beneficio estrictamente negativo dentro del dominio oficial.','B(x)=0,5x²−4x+6; 0≤x≤10'],
   ['Calculamos los puntos de equilibrio multiplicando la ecuación por dos.','B(x)=0 ⇔ x²−8x+12=0'],
   ['Factorizamos para estudiar el signo.','B(x)=0,5(x−2)(x−6)'],
   ['Entre ambas raíces los factores tienen signos opuestos; fuera tienen el mismo signo.','2<x<6 ⇒ B(x)<0'],
   ['En las raíces el beneficio es cero y no hay pérdida; comprobamos un punto interior.','B(2)=B(6)=0; B(4)=−2'],
   ['La inversión está expresada en miles de euros.','2000 €<inversión<6000 €'],
  ],{roots:[2,6],negativeInterval:[2,6],open:true}),
  mk(1,'Invertir 10 000 € (x=10); beneficio máximo 16 000 €.',[
   'Invertir 4 000 € (x=4); beneficio máximo −2 000 €.','Invertir 0 € (x=0); beneficio máximo 6 000 €.','Invertir 6 000 € (x=6); beneficio máximo 0 €.'
  ],['Confundir el mínimo interior con un máximo.','No comparar ambos extremos del intervalo.','Confundir un punto de equilibrio con el máximo.'],[
   ['Derivamos y localizamos el único punto crítico interior.','B′(x)=x−4=0 ⇒ x=4'],
   ['El signo de la derivada demuestra que es un mínimo.','B′<0 en (0;4); B′>0 en (4;10)'],
   ['Como el intervalo es cerrado, comparamos el crítico y sus dos extremos.','B(0)=6; B(4)=−2; B(10)=16'],
   ['El valor mayor se alcanza en el extremo derecho, no en el punto crítico.','Máximo único: x=10'],
   ['Verificamos mediante una cota válida en todo el dominio.','16−B(x)=0,5(10−x)(x+2)≥0'],
   ['Convertimos tanto inversión como beneficio desde miles de euros.','Inversión=10000 €; beneficio=16000 €'],
  ],{maximumAt:10,maximum:16,critical:4,wrongPoints:[4,0,6]}),
  mk(2,'Sin inversión se obtienen 6 000 €; el mismo beneficio se obtiene invirtiendo 8 000 €.',[
   'Sin inversión se obtienen 6 €; el mismo beneficio se obtiene invirtiendo 8 €.','Sin inversión se obtienen 6 000 €; el mismo beneficio se obtiene invirtiendo 4 000 €.','Sin inversión se obtienen 6 000 €; no existe otra inversión con ese beneficio.'
  ],['Olvidar que las dos variables se expresan en miles.','Confundir eje de simetría con la segunda solución.','Perder la raíz no nula al resolver la ecuación.'],[
   ['Sin inversión corresponde a x=0.','B(0)=6 miles de euros'],
   ['Igualamos el beneficio al obtenido sin publicidad.','0,5x²−4x+6=6'],
   ['Restamos seis y extraemos factor común.','0,5x(x−8)=0'],
   ['Conservamos las dos soluciones y verificamos el dominio.','x=0 o x=8; ambos en [0;10]'],
   ['La inversión distinta de cero es ocho mil euros.','B(8)=32−32+6=6'],
   ['Interpretamos el resultado sin confundir inversión con beneficio.','Inversión adicional=8000 €; beneficio=6000 €'],
  ],{sameValue:6,roots:[0,8]})];}
 if(c.index===482){assert.equal(ps.length,3);return[
  mk(0,'Los ingresos coinciden con los gastos a los 2 y a los 16 años.',[
   'Los ingresos coinciden con los gastos a los 0 y a los 18 años.','Los ingresos coinciden con los gastos únicamente a los 9 años.','Los ingresos coinciden con los gastos a los −2 y a los −16 años.'
  ],['Usar los extremos temporales como puntos de equilibrio.','Confundir el máximo del beneficio con beneficio cero.','Cambiar los signos al factorizar la ecuación.'],[
   ['La igualdad entre ingresos y gastos equivale a que su diferencia sea cero.','I(t)=G(t) ⇔ I(t)−G(t)=0'],
   ['Restamos con cuidado todos los términos de los gastos.','−2t²+51t−(t²−3t+96)=0'],
   ['Reducimos términos y dividimos por menos tres.','−3t²+54t−96=0 ⇔ t²−18t+32=0'],
   ['Factorizamos y obtenemos ambos instantes.','(t−2)(t−16)=0 ⇒ t=2 o t=16'],
   ['Ambos pertenecen al periodo observado. Verificamos el primero.','I(2)=94; G(2)=94'],
   ['Verificamos el segundo independientemente en las funciones originales.','I(16)=304; G(16)=304'],
  ],{roots:[2,16],originalValues:[94,304]}),
  mk(1,'B(t)=−3t²+54t−96; parábola cóncava, ceros 2 y 16, vértice (9;147), 0≤t≤18.',[
   'B(t)=−t²+48t+96; parábola cóncava, eje t=24, vértice (24;672), 0≤t≤18.',
   'B(t)=3t²−54t+96; parábola convexa, ceros 2 y 16, vértice (9;−147), 0≤t≤18.',
   'B(t)=−3t²+48t−96; parábola cóncava, eje t=8, vértice (8;96), 0≤t≤18.'
  ],['Sumar ingresos y gastos en vez de restarlos.','Restar ingresos de gastos e invertir el beneficio.','No cambiar el signo del término lineal de los gastos.'],[
   ['El beneficio es el ingreso menos el gasto, no su suma.','B(t)=I(t)−G(t)'],
   ['Reducimos los términos de la diferencia.','B(t)=−3t²+54t−96'],
   ['Los ceros ya comprobados son los cortes con el eje del tiempo.','B(t)=−3(t−2)(t−16)'],
   ['La derivada se anula en el eje de simetría y la segunda derivada es negativa.','B′(t)=−6t+54; t=9; B″(t)=−6'],
   ['Calculamos el vértice y los extremos del intervalo.','B(9)=147; B(0)=B(18)=−96'],
   ['La forma de cuadrado completo confirma los puntos y la concavidad.','B(t)=147−3(t−9)²'],
   ['Dibujamos solo el periodo oficial: la curva crece hasta nueve y decrece después.','Dominio [0;18]; vértice (9;147)'],
  ],{coefficients:[-96,54,-3],vertex:[9,147],roots:[2,16],endpoints:[-96,-96],wrongCoefficients:[[96,48,-1],[96,-54,3],[-96,48,-3]]},true),
  mk(2,'Beneficio máximo a los 9 años: 147 000 €.',[
   'Beneficio máximo a los 18 años: −96 000 €.','Beneficio máximo a los 9 años: 147 €.','Beneficio máximo a los 8 años: 144 000 €.'
  ],['Elegir el final del periodo sin estudiar la monotonía.','Omitir la conversión de miles de euros.','Resolver incorrectamente el punto crítico y evaluar un año cercano.'],[
   ['Anulamos la derivada del beneficio.','−6t+54=0 ⇒ t=9'],
   ['El punto está dentro del intervalo observado.','0<9<18'],
   ['Antes de nueve la derivada es positiva y después negativa.','B′(t)>0 si t<9; B′(t)<0 si t>9'],
   ['Calculamos el beneficio en ese instante.','B(9)=−243+486−96=147'],
   ['La identidad de cuadrado completo prueba el máximo global único.','147−B(t)=3(t−9)²≥0'],
   ['El beneficio se expresa en miles de euros.','147·1000=147000 €'],
  ],{maximumAt:9,maximum:147,euros:147000})];}
 if(c.index===1113){assert.equal(ps.length,3);return[
  mk(0,'El coste disminuye de x=0 a x=3; mínimo 31 al producir 3 unidades.',[
   'El coste disminuye para x>3; mínimo 31 al producir 3 unidades.','El coste disminuye de x=0 a x=6; mínimo 40 al producir 6 unidades.','El coste nunca disminuye; mínimo 40 al producir 0 unidades.'
  ],['Invertir el signo de la derivada alrededor del mínimo.','Olvidar el factor dos al derivar el término cuadrático.','Ignorar que la derivada inicial es negativa.'],[
   ['El dominio económico exige cantidades no negativas.','f(x)=x²−6x+40; x≥0'],
   ['Derivamos y calculamos el único punto crítico.','f′(x)=2x−6=0 ⇒ x=3'],
   ['Determinamos dónde disminuye y dónde aumenta.','f′<0 en (0;3); f′>0 en (3;+∞)'],
   ['Evaluamos el coste en el mínimo.','f(3)=9−18+40=31'],
   ['Completamos el cuadrado para verificar el mínimo global.','f(x)=31+(x−3)²≥31'],
   ['La igualdad solo se cumple produciendo tres unidades.','x=3; coste mínimo=31'],
  ],{minimumAt:3,minimum:31,derivative:[-6,2]}),
  mk(1,'Sin producción el coste es 40; para un coste de 80 se producen 10 unidades.',[
   'Sin producción el coste es 0; para un coste de 80 se producen 10 unidades.','Sin producción el coste es 40; para un coste de 80 se producen −4 unidades.','Sin producción el coste es 40; para un coste de 80 se producen 4 unidades.'
  ],['Omitir el coste fijo del modelo.','Aceptar la raíz negativa fuera del dominio.','Cambiar el signo de la raíz descartada sin comprobarla.'],[
   ['Evaluamos el coste fijo sin producción.','f(0)=40'],
   ['Imponemos el coste solicitado.','x²−6x+40=80'],
   ['Llevamos todo al primer miembro y factorizamos.','x²−6x−40=(x−10)(x+4)=0'],
   ['Las raíces algebraicas son diez y menos cuatro.','x=10 o x=−4'],
   ['El dominio excluye cantidades negativas.','x≥0 ⇒ x=10'],
   ['Sustituimos en el coste original para verificar la solución admisible.','f(10)=100−60+40=80'],
  ],{costAtZero:40,target:80,roots:[10,-4],accepted:[10]}),
  mk(2,'Parábola convexa con vértice (3;31), corte OY (0;40), sin cortes OX; dominio x≥0.',[
   'Parábola cóncava con vértice (3;31), corte OY (0;40), sin cortes OX; dominio x≥0.',
   'Parábola convexa con vértice (−3;31), corte OY (0;40), sin cortes OX; dominio x≥0.',
   'Parábola convexa con vértice (3;−31), corte OY (0;40), dos cortes OX; dominio x≥0.'
  ],['Invertir la concavidad del término cuadrático.','Cambiar el signo de la abscisa del vértice.','Cambiar la ordenada mínima y fabricar ceros.'],[
   ['Usamos la forma de cuadrado completo para dibujar la parábola.','f(x)=(x−3)²+31'],
   ['Su mínimo fija el vértice y el eje de simetría.','V=(3;31); eje x=3'],
   ['El coeficiente cuadrático positivo determina apertura hacia arriba.','f″(x)=2>0'],
   ['Calculamos el corte con OY y un punto simétrico.','f(0)=40; f(6)=40'],
   ['El coste es siempre al menos treinta y uno: no corta OX.','f(x)≥31>0'],
   ['Representamos el tramo de dominio económico; disminuye hasta tres y aumenta después.','x≥0; f(10)=80'],
  ],{vertex:[3,31],yIntercept:40,noRealRoots:true,secondDerivative:2},true)];}
 if(c.index===1142){assert.equal(ps.length,3);return[
  mk(0,'Inversión óptima 9 000 €; beneficio máximo 300 000 €.',[
   'Inversión óptima 18 000 €; beneficio máximo 138 000 €.','Inversión óptima 9 €; beneficio máximo 300 €.','Inversión óptima 0 €; beneficio máximo 138 000 €.'
  ],['Omitir el factor dos de la derivada cuadrática.','No convertir las unidades expresadas en miles.','Elegir el extremo inicial sin comparar con el máximo interior.'],[
   ['La inversión y el beneficio están expresados en miles de euros.','f(x)=−2x²+36x+138; x≥0'],
   ['Anulamos la derivada para hallar el punto crítico.','f′(x)=−4x+36=0 ⇒ x=9'],
   ['La derivada cambia de positiva a negativa y la segunda es negativa.','f″(x)=−4<0'],
   ['Evaluamos el beneficio en el punto crítico.','f(9)=−162+324+138=300'],
   ['La forma de cuadrado completo demuestra el máximo global único.','f(x)=300−2(x−9)²≤300'],
   ['Convertimos ambas magnitudes.','x=9 ⇒ inversión 9000 €; beneficio 300000 €'],
  ],{maximumAt:9,maximum:300,euros:[9000,300000]}),
  mk(1,'f′(7)=8>0: el beneficio está aumentando al invertir 7 000 €.',[
   'f′(7)=−8<0: el beneficio está disminuyendo al invertir 7 000 €.','f′(7)=22>0: el beneficio está aumentando al invertir 7 000 €.','f′(7)=8>0: el beneficio ya alcanza su máximo al invertir 7 000 €.'
  ],['Cambiar el signo al restar treinta y seis menos veintiocho.','Omitir el factor dos al derivar −2x².','Confundir pendiente positiva con derivada nula en un máximo.'],[
   ['Derivamos término a término; el constante desaparece.','f′(x)=−4x+36'],
   ['Sustituimos el valor de inversión expresado en miles.','f′(7)=−28+36=8'],
   ['El signo positivo indica crecimiento local del beneficio.','f′(7)>0'],
   ['El máximo no está aquí, sino donde la derivada se anula.','f′(9)=0'],
   ['La variación exacta para un incremento h confirma el signo local.','f(7+h)−f(7)=8h−2h²'],
   ['Para aumentos positivos pequeños el beneficio aumenta; no afirmamos que la relación sea lineal para todo incremento.','0<h<4 ⇒ 8h−2h²>0'],
  ],{derivativeAt:7,slope:8,incrementCoefficients:[0,8,-2]}),
  mk(2,'Parábola cóncava, vértice (9;300); f=138 para x=0 y x=18: inversiones de 0 y 18 000 €.',[
   'Parábola convexa, vértice (9;300); f=138 para x=0 y x=18: inversiones de 0 y 18 000 €.',
   'Parábola cóncava, vértice (9;300); f=138 únicamente para x=9: inversión de 9 000 €.',
   'Parábola cóncava, vértice (9;300); f=138 para x=0 y x=−18: inversiones de 0 y −18 000 €.'
  ],['Invertir la apertura de la parábola.','Confundir la inversión de máximo beneficio con el nivel pedido.','Cambiar el signo de la segunda raíz y admitir inversión negativa.'],[
   ['El vértice y la apertura se leen de la forma canónica.','f(x)=300−2(x−9)²'],
   ['La gráfica parte de la ordenada inicial y conserva el dominio no negativo.','f(0)=138; V=(9;300); x≥0'],
   ['Para completar la gráfica calculamos el único corte con OX admisible.','f(x)=0 ⇒ (x−9)²=150'],
   ['La raíz negativa queda fuera del dominio.','x=9+5√6≈21,247'],
   ['Para el beneficio solicitado igualamos a 138, no a cero.','−2x²+36x+138=138'],
   ['Factorizamos y conservamos ambas inversiones no negativas.','−2x(x−18)=0 ⇒ x=0 o x=18'],
   ['Verificamos el segundo valor y expresamos euros.','f(18)=−648+648+138=138; inversión=18000 €'],
  ],{vertex:[9,300],target:138,roots:[0,18],positiveZero:9+5*Math.sqrt(6)},true)];}
 if(c.index===1264){assert.equal(ps.length,2);return[
  mk(0,'Producir 3 000 kg semanales; coste mínimo 1 000 €.',[
   'Producir 6 000 kg semanales; coste mínimo 10 000 €.','Producir 3 kg semanales; coste mínimo 1 €.','Producir 0 kg semanales; coste mínimo 10 000 €.'
  ],['Omitir el factor dos al derivar el término cuadrático.','Olvidar que producción y coste se expresan en miles.','Confundir coste fijo con mínimo del coste.'],[
   ['La cantidad producida es no negativa y se mide en miles de kilogramos.','f(x)=x²−6x+10; x≥0'],
   ['Derivamos y anulamos la pendiente.','f′(x)=2x−6=0 ⇒ x=3'],
   ['El signo cambia de negativo a positivo.','f″(x)=2>0'],
   ['Calculamos el valor mínimo.','f(3)=9−18+10=1'],
   ['Completamos el cuadrado para certificar el mínimo global.','f(x)=1+(x−3)²≥1'],
   ['Convertimos las dos magnitudes a sus unidades solicitadas.','Producción=3000 kg; coste=1000 €'],
  ],{minimumAt:3,minimum:1,units:[3000,1000]}),
  mk(1,'Tangente y=2x−6 en (4;2); parábola convexa con vértice (3;1), por encima de la tangente.',[
   'Tangente y=2x+6 en (4;2); parábola convexa con vértice (3;1), por encima de la tangente.',
   'Tangente y=−2x+10 en (4;2); parábola convexa con vértice (3;1), por encima de la tangente.',
   'Tangente y=2x−8 en (4;2); parábola convexa con vértice (3;1), por encima de la tangente.'
  ],['Cambiar el signo del término independiente.','Cambiar la pendiente aunque la recta pase por el punto.','Olvidar sumar la ordenada del punto en la fórmula punto-pendiente.'],[
   ['Necesitamos el punto de contacto y la pendiente de la función en él.','f(4)=16−24+10=2'],
   ['Evaluamos la derivada en la abscisa indicada.','f′(4)=2·4−6=2'],
   ['Aplicamos la ecuación punto-pendiente.','y−2=2(x−4)'],
   ['Despejamos y para obtener la recta.','y=2x−6'],
   ['La parábola tiene vértice y corte con OY conocidos; no corta OX porque su mínimo es positivo.','f(x)=(x−3)²+1; V=(3;1); f(0)=10'],
   ['Dibujamos la tangente usando su corte con OX y el contacto, y la curva sobre ella.','Recta: (3;0), (4;2)'],
   ['La diferencia demuestra contacto doble y ausencia de otros cruces.','f(x)−(2x−6)=(x−4)²≥0'],
   ['En x=4 coinciden tanto valores como pendientes.','f(4)=2; recta(4)=2; ambas pendientes=2'],
  ],{contact:[4,2],slope:2,line:[-6,2],difference:[16,-8,1],wrongLines:[[6,2],[10,-2],[-8,2]]},true)];}
 if(c.index===1547){assert.equal(ps.length,3);return[
  mk(0,'Rentabilidad de 33 500 € al invertir 100 000 €.',[
   'Rentabilidad de 33,5 € al invertir 100 000 €.','Rentabilidad de 43 500 € al invertir 100 000 €.','Rentabilidad de 53 500 € al invertir 100 000 €.'
  ],['No convertir la rentabilidad expresada en miles.','Omitir el término cuadrático negativo.','Cambiar el signo del término cuadrático.'],[
   ['La inversión se mide en miles de euros: convertimos antes de sustituir.','100000 € ⇒ x=100'],
   ['Calculamos la potencia y su contribución negativa.','100²=10000; −0,001·10000=−10'],
   ['Calculamos la contribución lineal y conservamos el término fijo.','0,4·100=40; término fijo=3,5'],
   ['Sumamos las contribuciones con sus signos.','R(100)=−10+40+3,5=33,5'],
   ['Comprobamos el mismo valor con la forma de cuadrado completo.','43,5−0,001(100−200)²=33,5'],
   ['Convertimos la rentabilidad desde miles a euros.','33,5·1000=33500 €'],
  ],{at:100,value:33.5,euros:33500,wrong:[.0335,43.5,53.5]}),
  mk(1,'Invertir 200 000 € (x=200) para maximizar la rentabilidad.',[
   'Invertir 400 000 € (x=400) para maximizar la rentabilidad.','Invertir 10 000 € (x=10) para maximizar la rentabilidad.','Invertir 200 € (x=0,2) para maximizar la rentabilidad.'
  ],['Omitir el factor dos al derivar el término cuadrático.','Elegir la inversión mínima sin analizar la función.','Confundir x en miles de euros con euros.'],[
   ['Derivamos la rentabilidad en el dominio oficial.','R′(x)=−0,002x+0,4; x≥10'],
   ['Anulamos la derivada.','0,002x=0,4 ⇒ x=200'],
   ['El punto crítico pertenece al dominio.','200≥10'],
   ['El signo de la derivada confirma crecimiento y posterior decrecimiento.','R′>0 si x<200; R′<0 si x>200'],
   ['La forma de cuadrado completo prueba que es el máximo único, incluso con dominio sin cota superior.','R(x)=43,5−0,001(x−200)²'],
   ['Convertimos la inversión.','200·1000=200000 €'],
  ],{maximumAt:200,euros:200000,secondDerivative:-.002}),
  mk(2,'Rentabilidad máxima de 43 500 €.',[
   'Rentabilidad máxima de 43,5 €.','Rentabilidad máxima de 83 500 €.','Rentabilidad máxima de 40 000 €.'
  ],['No convertir miles de euros.','Omitir la aportación cuadrática negativa.','Omitir el término fijo de la rentabilidad.'],[
   ['Evaluamos en la inversión óptima, no en la inicialmente propuesta.','x=200'],
   ['Calculamos la potencia y el término cuadrático.','200²=40000; −0,001·40000=−40'],
   ['Calculamos la contribución lineal.','0,4·200=80'],
   ['Sumamos manteniendo el término fijo.','R(200)=−40+80+3,5=43,5'],
   ['La diferencia respecto a cualquier otra inversión es no negativa.','43,5−R(x)=0,001(x−200)²≥0'],
   ['Expresamos el máximo en euros.','43,5·1000=43500 €'],
  ],{maximum:43.5,euros:43500})];}
 if(c.index===1615){assert.equal(ps.length,3);return[
  mk(0,'Fabricar 9 000 kg; coste mínimo 38 000 €.',[
   'Fabricar 18 000 kg; coste mínimo 200 000 €.','Fabricar 9 kg; coste mínimo 38 €.','Fabricar 0 kg; coste mínimo 200 000 €.'
  ],['Omitir el factor dos al derivar 2x².','No convertir miles de kilogramos ni miles de euros.','Elegir el coste fijo como si fuese el mínimo.'],[
   ['Las dos variables se expresan en miles de sus unidades.','f(x)=2x²−36x+200; x≥0'],
   ['Derivamos y calculamos el punto crítico.','f′(x)=4x−36=0 ⇒ x=9'],
   ['La derivada cambia de negativa a positiva; la segunda derivada también confirma el mínimo.','f″(x)=4>0'],
   ['Evaluamos el coste en el punto crítico.','f(9)=162−324+200=38'],
   ['Completamos el cuadrado para certificar el mínimo global único.','f(x)=38+2(x−9)²≥38'],
   ['Convertimos producción y coste.','Producción=9000 kg; coste=38000 €'],
  ],{minimumAt:9,minimum:38,units:[9000,38000]}),
  mk(1,'f′(7)=−8<0: el coste disminuye al aumentar ligeramente la producción desde 7 000 kg.',[
   'f′(7)=8>0: el coste aumenta al aumentar ligeramente la producción desde 7 000 kg.',
   'f′(7)=−22<0: el coste disminuye al aumentar ligeramente la producción desde 7 000 kg.',
   'f′(7)=−8<0: el coste ya alcanza el mínimo al producir 7 000 kg.'
  ],['Cambiar el signo de veintiocho menos treinta y seis.','Omitir el factor dos al derivar el cuadrado.','Confundir pendiente negativa con pendiente nula en un mínimo.'],[
   ['Derivamos la función y evaluamos en siete, que representa siete mil kilogramos.','f′(x)=4x−36'],
   ['Calculamos el signo solicitado.','f′(7)=28−36=−8'],
   ['Una pendiente negativa significa que el coste disminuye localmente al aumentar la producción.','f′(7)<0'],
   ['No significa que el coste sea negativo ni que ya se haya alcanzado el mínimo.','f(7)=98−252+200=46>0'],
   ['La variación exacta confirma el descenso para pequeños incrementos positivos.','f(7+h)−f(7)=−8h+2h²'],
   ['El mínimo se alcanza más adelante, en nueve mil kilogramos.','0<h<4 ⇒ −8h+2h²<0; f′(9)=0'],
  ],{at:7,slope:-8,value:46,incrementCoefficients:[0,-8,2]}),
  mk(2,'Parábola convexa, vértice (9;38); coste 200 000 € para 0 kg o 18 000 kg.',[
   'Parábola cóncava, vértice (9;38); coste 200 000 € para 0 kg o 18 000 kg.',
   'Parábola convexa, vértice (9;38); coste 200 000 € únicamente para 9 000 kg.',
   'Parábola convexa, vértice (9;38); coste 200 000 € para 0 kg o −18 000 kg.'
  ],['Invertir la apertura del término cuadrático positivo.','Confundir el mínimo con el nivel de coste solicitado.','Cambiar el signo de una raíz y aceptar producción negativa.'],[
   ['La forma canónica determina el vértice y la apertura.','f(x)=38+2(x−9)²'],
   ['Calculamos el corte con OY; no hay cortes OX porque el mínimo es positivo.','f(0)=200; f(x)≥38>0'],
   ['Dibujamos la curva decreciente hasta nueve y creciente después, para producción no negativa.','V=(9;38); dominio x≥0'],
   ['El coste pedido equivale a doscientas unidades de la función.','200000 € ⇒ f(x)=200'],
   ['Restamos el nivel y factorizamos.','2x²−36x=2x(x−18)=0'],
   ['Ambas raíces son no negativas.','x=0 o x=18'],
   ['Comprobamos el segundo coste y convertimos la producción.','f(18)=648−648+200=200; producción=18000 kg'],
  ],{vertex:[9,38],target:200,roots:[0,18],noRealZeros:true},true)];}
 assert.equal(c.index,1203);return[mk(0,'Producir 5 000 bombillas al día; coste mínimo 9 800 €.',[
  'Producir 1 000 bombillas al día; coste mínimo 11 080 €.','Producir 6 000 bombillas al día; coste mínimo 9 813,33 € aproximadamente.','Producir 5 000 bombillas al día; coste mínimo 9 400 €.'
 ],['Elegir la producción mínima sin estudiar la función de costes.','Elegir la producción máxima sin comparar el crítico interior.','Omitir el término recíproco al evaluar el coste.'],[
  ['Conservamos el cociente que aparece en el PDF oficial y el intervalo productivo.','C(x)=9000+0,08x+frac{2000000}{x}'],
  ['Derivamos la potencia x⁻¹, respetando su signo.','C′(x)=0,08−frac{2000000}{x²}'],
  ['Buscamos los puntos críticos; x es positivo.','C′=0 ⇒ x²=25000000 ⇒ x=5000'],
  ['El punto pertenece al intervalo. La derivada cambia de negativa a positiva.','1000≤5000≤6000'],
  ['Evaluamos el crítico sin redondear.','C(5000)=9000+400+400=9800'],
  ['Comparamos también los extremos del intervalo.','C(1000)=11080; C(6000)=9813,333…'],
  ['Una identidad independiente certifica el mínimo global para x positivo.','C(x)−9800=frac{0,08(x−5000)²}{x}≥0'],
  ['La igualdad solo ocurre en cinco mil y esa cantidad es entera.','5000 bombillas; coste mínimo=9800 €'],
 ],{minimumAt:5000,minimum:9800,endpoints:[11080,9000+480+2000000/6000],derivativeRootSquared:25000000})];
}
export function buildQuadraticBusinessCostsBatch(id='batch-0351',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){if(x.parts[0].partId==='whole'){assert.equal(x.sourceSubparts.length,0);x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';}x.primaryTopic='Derivadas';x.block='Análisis';x.examSlot=3;x.secondaryTopics=['Optimización','Monotonía',...(x.correctionEvidence.parameters.index===1264?['Tangentes']:[])];x.qualityGates.pedagogical='OFFICIAL_ECONOMIC_DOMAIN_UNITS_GLOBAL_BOUNDS_AND_COMPLETE_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildQuadraticBusinessCostsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0351-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0351.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0)}));}
