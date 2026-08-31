import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[343,'57a94794707b1b7875c44400a89e0e02d964c61659e3e0531c40ff634f78104c',1,'2','1c4a5527c1b4f8a39a9b0ee74dc5f93f12753034bf5ea585df2ea163aa7288ca',0],
[346,'274813eec3b9f750ba00990349dadeb4d837e92c96633e2e02da4e99b2951b34',2,'B.1','d3e12e7c38cb0c974e0e83505ae5bc22c30a88c7c030fde7168eff3af4f5a5fd',0],
[347,'4b92916bd8a715dafc1c05c471afbd863005f48352c1414bda393158ede42d5c',2,'B.3','13a51a46acce31226c67d1ac4c63d40bdb495533619b844b93a5119faa0d058f',0],
[350,'faa99db49ea6996077e64bcc83a8f7c0a39af31d3043cb323b178e5d73a511b7',2,'B.1','929d6fc9be6b43a51274779a86f16f3c5028991693a82baa5ff9f41eb8321ee7',0]];
export const statements={
343:'Sea la función f:[−2,2]→ℝ, definida por f(x)=x³−2x+5.\na) [1,5 puntos] Determina las abscisas de los puntos, si existen, en los que la pendiente de la recta tangente coincide con la pendiente de la recta que pasa por los puntos (−2,f(−2)) y (2,f(2)).\nb) [1 punto] Determina la ecuación de la recta tangente y la ecuación de la recta normal a la gráfica de f en el punto de inflexión.',
346:'Sea f la función definida por f(x)=frac{k}{(x−a)(2x−1)} para x≠a y x≠frac{1}{2}.\na) [1 punto] Halla a y k sabiendo que la gráfica de f pasa por el punto (0,2) y que la recta x=2 es una asíntota de dicha gráfica.\nb) [1,5 puntos] Para k=4 y a=2, halla los extremos relativos de f (abscisas donde se obtienen y valores que se alcanzan) y sus intervalos de crecimiento y de decrecimiento.',
347:'Dada la matriz A=[[3,−2],[5,1]], sea B la matriz que verifica que AB=[[−2,1],[7,3]].\na) [1 punto] Comprueba que las matrices A y B poseen inversas.\nb) [1,5 puntos] Resuelve la ecuación matricial A⁻¹X−B=BA.',
350:'Sea f:(0,+∞)→ℝ la función definida por f(x)=ln(x²+3x), donde ln denota el logaritmo neperiano.\na) [1,5 puntos] Determina, si existen, los puntos de la gráfica de f en los que la recta tangente a la gráfica es paralela a la recta de ecuación x−2y+1=0.\nb) [1 punto] Halla la ecuación de la recta tangente y de la recta normal a la gráfica de f en el punto de abscisa x=3.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_SECANT_RATIONAL_MATRIX_SOURCE_LAYOUT']]:[];
export const cases=[{index:343,slot:2,literals:['x3 − 2x + 5','(−2, f (−2))']},{index:346,slot:2,literals:['(x − a)(2x − 1)','k = 4 y a = 2']},{index:347,slot:1,literals:['3 −2','A−1X − B = BA']},{index:350,slot:2,literals:['ln(x2 + 3x)','x − 2y + 1 = 0']}];
export const proof=c=>({343:{secant:2,abscissas:[-2/Math.sqrt(3),2/Math.sqrt(3)],inflection:[0,5],tangent:[-2,5],normal:[.5,5]},346:{a:2,k:4,critical:1.25,value:-32/9,excluded:[.5,2]},347:{A:[[3,-2],[5,1]],AB:[[-2,1],[7,3]],detA:13,detAB:-13,detB:-1,B:[[12/13,7/13],[31/13,4/13]],X:[[-3,6],[43,-8]]},350:{point:[3,Math.log(18)],tangentSlope:.5,normalSlope:-2,rejectedRoot:-2}}[c.index]);
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_DERIVATIVES_AND_MATRIX_SUBSTITUTION',proof(c));switch(c.index){
case 343:return[mk(0,'x=−frac{2}{√3} y x=frac{2}{√3}.',['x=−frac{1}{√3} y x=frac{1}{√3}.','x=−√2 y x=√2.','Únicamente x=frac{2}{√3}.'],['Restar la pendiente a la constante en lugar de sumarla al despejar.','Dividir incorrectamente entre tres al resolver la cuadrática.','Descartar la raíz negativa aunque pertenece al dominio.'],[
['Calculamos las ordenadas de los extremos oficiales del intervalo.','f(−2)=−8+4+5=1; f(2)=8−4+5=9'],
['La pendiente de la secante es el incremento de ordenadas dividido entre el de abscisas.','m=frac{f(2)−f(−2)}{2−(−2)}=frac{8}{4}=2'],
['La derivada determina la pendiente de cualquier tangente interior.','f′(x)=3x²−2'],
['Igualamos la pendiente tangente a la secante y despejamos el cuadrado.','3x²−2=2 ⇒ x²=frac{4}{3}'],
['Hay dos raíces reales y ambas pertenecen al interior del intervalo dado.','x=±frac{2}{√3}; −2<−frac{2}{√3}<frac{2}{√3}<2'],
['Sustituimos cada raíz en la derivada: las dos tangentes tienen la pendiente exigida.','3(frac{4}{3})−2=2'],
]),mk(1,'Tangente: y=−2x+5; normal: y=frac{x}{2}+5.',['Tangente: y=frac{x}{2}+5; normal: y=−2x+5.','Tangente: y=−2x; normal: y=frac{x}{2}.','Tangente: y=−2x+5; normal: y=2x+5.'],['Intercambiar las pendientes tangente y normal.','Omitir la ordenada del punto de inflexión.','Cambiar solo el signo sin tomar la pendiente recíproca.'],[
['Derivamos de nuevo y localizamos los candidatos a inflexión.','f″(x)=6x; f″(x)=0 ⇔ x=0'],
['La segunda derivada cambia de signo al cruzar cero; por tanto sí hay inflexión.','x<0 ⇒ f″<0; x>0 ⇒ f″>0'],
['Hallamos el punto completo y la pendiente de su tangente.','P=(0;f(0))=(0;5); m=f′(0)=−2'],
['Aplicamos la ecuación punto-pendiente de la tangente.','y−5=−2(x−0) ⇒ y=−2x+5'],
['La normal pasa por el mismo punto y su pendiente es menos la inversa.','mₙ=−frac{1}{−2}=frac{1}{2}; y=frac{x}{2}+5'],
['Ambas rectas pasan por P y son perpendiculares entre sí.','yₜ(0)=yₙ(0)=5; (−2)(frac{1}{2})=−1'],
])];
case 346:return[mk(0,'a=2; k=4.',['a=2; k=−4.','a=2; k=2.','a=frac{1}{2}; k=1.'],['Cambiar el signo del denominador en cero.','Olvidar multiplicar por a al usar f(0)=2.','Confundir la asíntota fija con la asíntota x=2.'],[
['La función pasa por (0,2), así que está definida allí; a no puede ser cero.','f(0)=frac{k}{(−a)(−1)}=frac{k}{a}=2'],
['El numerador constante no es cero porque la ordenada es dos.','k=2a≠0'],
['Una asíntota vertical de esta función racional debe anular su denominador.','(x−a)(2x−1)=0 ⇒ x=a o x=frac{1}{2}'],
['Como la asíntota indicada es x=2, distinta de la fija, el parámetro queda determinado.','a=2'],
['Sustituimos a en la condición del punto para obtener el numerador.','k=2·2=4'],
['Comprobamos el punto y que no hay cancelación que elimine la asíntota.','f(0)=frac{4}{(−2)(−1)}=2; k≠0; 2·2−1=3≠0'],
]),mk(1,'Máximo relativo (frac{5}{4};−frac{32}{9}); sin mínimo. Crece en (−∞;frac{1}{2}) y (frac{1}{2};frac{5}{4}); decrece en (frac{5}{4};2) y (2;+∞).',['Mínimo relativo (frac{5}{4};−frac{32}{9}); sin máximo. Decrece en (−∞;frac{1}{2}) y (frac{1}{2};frac{5}{4}); crece en (frac{5}{4};2) y (2;+∞).','Máximo relativo (frac{5}{4};frac{32}{9}); sin mínimo. Crece en (−∞;frac{1}{2}) y (frac{1}{2};frac{5}{4}); decrece en (frac{5}{4};2) y (2;+∞).','Máximo relativo (frac{5}{4};−frac{32}{9}); sin mínimo. Crece en (−∞;frac{5}{4}); decrece en (frac{5}{4};+∞).'],['Perder el signo negativo al derivar el recíproco.','Perder el signo del denominador al evaluar la función.','Unir intervalos a través de las asíntotas donde f no está definida.'],[
['Escribimos la función concreta y excluimos los ceros del denominador.','f(x)=frac{4}{2x²−5x+2}; x≠frac{1}{2}, x≠2'],
['Derivamos el cociente de una constante por un polinomio.','f′(x)=−frac{4(4x−5)}{(2x²−5x+2)²}'],
['El denominador de la derivada es positivo en el dominio. El único cero del numerador es interior.','4x−5=0 ⇒ x=frac{5}{4}'],
['Estudiamos el signo separando también las dos discontinuidades.','f′>0 en (−∞;frac{1}{2}) y (frac{1}{2};frac{5}{4})\nf′<0 en (frac{5}{4};2) y (2;+∞)'],
['El cambio de creciente a decreciente da un máximo relativo. Evaluamos su ordenada.','f(frac{5}{4})=frac{4}{(−3/4)(3/2)}=−frac{32}{9}'],
['No hay más ceros de la derivada y las asíntotas no pertenecen al dominio; no son extremos.','Único extremo relativo: máximo en (frac{5}{4};−frac{32}{9})'],
])];
case 347:return[mk(0,'Ambas son invertibles: det(A)=13 y det(B)=−1.',['Ambas son invertibles: det(A)=−7 y det(B)=frac{13}{7}.','Ambas son invertibles: det(A)=13 y det(B)=−13.','Solo A es invertible: det(A)=13 y det(B)=0.'],['Sumar el producto de la diagonal secundaria en det(A).','Confundir det(AB) con det(B).','Confundir una matriz no simétrica con una matriz singular.'],[
['A es cuadrada de orden dos; calculamos su determinante por los productos diagonales.','det(A)=3·1−(−2)·5=13'],
['Al ser distinto de cero, A es invertible. Calculamos además el determinante del producto conocido.','det(AB)=(−2)·3−1·7=−13'],
['La propiedad multiplicativa permite hallar det(B) sin resolver todos sus elementos.','det(AB)=det(A)det(B)'],
['Despejamos y comprobamos que B también es invertible.','det(B)=frac{−13}{13}=−1≠0'],
['Como comprobación independiente, multiplicamos A⁻¹ por AB para recuperar B.','A⁻¹=frac{1}{13}[[1,2],[−5,3]]\nB=frac{1}{13}[[12,7],[31,4]]'],
['El determinante de esa B coincide con el obtenido por la propiedad.','det(B)=frac{12·4−7·31}{13²}=frac{−169}{169}=−1'],
]),mk(1,'X=[[−3,6],[43,−8]].',['X=[[1,4],[29,−14]].','X=[[−22,−2],[4,11]].','X=[[−1,5],[36,−11]].'],['Restar B en vez de sumarla al despejar A⁻¹X.','Cambiar el orden del producto matricial.','Omitir el término B al despejar.'],[
['Pasamos B al segundo miembro conservando el orden de los productos.','A⁻¹X=B+BA'],
['Multiplicamos por A a la izquierda; a la derecha no se cancelaría A⁻¹.','X=AB+ABA'],
['Llamamos M al producto AB que proporciona el enunciado y factorizamos a la derecha.','M=[[−2,1],[7,3]]; X=M(I+A)'],
['Sumamos la identidad de orden dos a A.','I+A=[[4,−2],[5,2]]'],
['Calculamos cada entrada mediante fila por columna.','X=[[−8+5,4+2],[28+15,−14+6]]\nX=[[−3,6],[43,−8]]'],
['Sustituimos X y B en la ecuación original: ambos miembros dan la misma matriz.','A⁻¹X−B=frac{1}{13}[[71,−17],[113,−58]]=BA'],
])];
case 350:return[mk(0,'Único punto: (3;ln18).',['Puntos: (3;ln18) y (−2;ln2).','Único punto: (3;ln9).','Único punto: (1;ln4).'],['Aceptar también una raíz exterior al dominio oficial.','Omitir 3x al evaluar la función.','Igualar incorrectamente la derivada a la pendiente.'],[
['Despejamos y en la recta dada para identificar su pendiente.','x−2y+1=0 ⇒ y=frac{x}{2}+frac{1}{2}; m=frac{1}{2}'],
['La derivada del logaritmo es la derivada del argumento dividida por el argumento.','f′(x)=frac{2x+3}{x²+3x}'],
['Igualamos las pendientes y multiplicamos por el denominador, positivo para x>0.','frac{2x+3}{x²+3x}=frac{1}{2} ⇒ x²−x−6=0'],
['Factorizamos y descartamos la raíz negativa por el dominio del enunciado.','(x−3)(x+2)=0 ⇒ x=3; x=−2 no admisible'],
['Evaluamos la función original para obtener la ordenada del único punto válido.','f(3)=ln(9+9)=ln18'],
['Sustituimos la abscisa en la derivada y verificamos el paralelismo.','f′(3)=frac{9}{18}=frac{1}{2}; P=(3;ln18)'],
]),mk(1,'Tangente: y=frac{x−3}{2}+ln18; normal: y=−2(x−3)+ln18.',['Tangente: y=frac{x−3}{2}+ln18; normal: y=2(x−3)+ln18.','Tangente: y=frac{x}{2}+ln18; normal: y=−2x+ln18.','Tangente: y=−2(x−3)+ln18; normal: y=frac{x−3}{2}+ln18.'],['Omitir el signo negativo de la pendiente normal.','Olvidar desplazar la abscisa del punto de contacto.','Intercambiar las rectas tangente y normal.'],[
['El punto de contacto tiene la abscisa fijada y la ordenada de la función.','P=(3;ln18)'],
['Calculamos la pendiente tangente a partir de la derivada.','mₜ=f′(3)=frac{2·3+3}{3²+3·3}=frac{1}{2}'],
['Escribimos la tangente en forma punto-pendiente.','y−ln18=frac{1}{2}(x−3)'],
['La pendiente normal es menos la inversa de la pendiente tangente.','mₙ=−frac{1}{1/2}=−2'],
['La normal utiliza el mismo punto de contacto.','y−ln18=−2(x−3)'],
['La sustitución x=3 devuelve ln18 en ambas; el producto de pendientes confirma perpendicularidad.','yₜ(3)=yₙ(3)=ln18; frac{1}{2}·(−2)=−1'],
])];default:throw Error('Unknown official case');}}
export function buildSecantRationalMatrixBatch(id='batch-0416',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Matrices y determinantes':'Aplicaciones de derivadas';x.secondaryTopics=c.index===346?['Límites y continuidad']:[];x.block=c.slot===1?'Álgebra':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===1?'MATRIX_DETERMINANT_IDENTITIES':'RATIONAL_ASYMPTOTES_AND_NORMAL'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildSecantRationalMatrixBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0416-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0416.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
