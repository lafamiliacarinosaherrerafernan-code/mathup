import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[633,'85795e32721a21a3eb278bd06b1c23d508ff32ce7a58a770197d2b13552be49e',2,'NONE.4','c46acdd16417df570a57b51479bbc5e8b6137aab88b56bf9f845296cc0ba8bfb',0],
[635,'b47a8d292833a7006d37cfe870ba36821b3bcd14b4d9c4214c46cd89145eaa56',2,'NONE.3','a60792407d2fe70030aefedc94d60190444ed92185b71949febdf0b52d1c714c',0],
[637,'d178e5a4f53fdde351fb047b350393b1a2fcdf04f1f23a23ebd71625431061fd',1,'NONE.4','f01ef525d26fef4092e62bb0c9a2e3fb6c7e59a5f6e4ea9c7fa8a7c79715ace2',0],
[638,'8cd46d9e803e35632ac299c603e2a3d3553404b6f62e87872d9fb2cf86471f3b',2,'NONE.4','8ad999bce2a361ab9dc0e56bbc51520b2bcac9364a37a4b5b89c3fa12d828522',0],
[642,'54d3d099a9d525046a68be3b9854c72445eb0b8d72ffb70d5a31ddd2ef6c04dc',2,'NONE.1','b54b6d7752dce3fadb4ea01ccd7726766bc433d7f69756a32d51eddfedeade2d',0],
[646,'c1053dad9ef9e6ce58aeea7d171758b8b6aec6014f2dfbec91a9ace85f5136e5',1,'NONE.1','6f22d7f78d93b7f7ca43f5688aab469f81cc4624751e3f496f5c9923caadb017',0],
[655,'2c5278437c9b39d12317034e63fd1a4e30b153d3926def7914bceb3390e42da6',1,'NONE.1','5b1b015693870ef1ceddbf3f32eeb578da6947858448ccfee9f60a931ca3a5cf',0]];
export const statements={
633:'Sean los puntos A(1,1,1), B(−1,2,0), C(2,1,2) y D(t,−2,2).\na) Determina el valor de t para que A, B, C y D estén en el mismo plano.\nb) Halla la ecuación de un plano perpendicular al segmento determinado por A y B, que contenga al punto C.',
635:'Considera el sistema de ecuaciones\nsystem{x+y+kz=1;2x+ky=1;y+2z=k}.\na) Clasifica el sistema según los valores del parámetro k.\nb) Resuélvelo para k=1.\nc) Resuélvelo para k=−1.',
637:'Determina el punto de la recta r≡frac{x−1}{3}=frac{y}{2}=z+1 que equidista de los planos π₁≡x−y+3z+2=0 y π₂≡system{x=−4+λ−3μ;y=1+λ;z=μ}.',
638:'Sea r la recta dada por frac{x+2}{2}=y+1=frac{z−1}{−3} y sea s la recta dada por system{x−y−3=0;3y−z+6=0}.\na) Estudia la posición relativa de r y s.\nb) Halla la ecuación general del plano que contiene a r y es paralelo a s.',
642:'Sea f la función definida por f(x)=frac{2x²}{(x+1)(x−2)} para x≠−1 y x≠2.\na) Estudia y calcula las asíntotas de la gráfica de f.\nb) Determina los intervalos de crecimiento y de decrecimiento de f.\nc) Calcula, si existe, algún punto de la gráfica de f donde ésta corta a la asíntota horizontal.',
646:'Se desea construir un depósito cilíndrico cerrado de área total igual a 54 m². Determina el radio de la base y la altura del cilindro para que éste tenga volumen máximo.',
655:'Una ventana tiene forma de rectángulo y está coronada por un semicírculo. Sabiendo que el perímetro de la ventana mide 8 metros, halla las dimensiones de la ventana que permitan la mayor entrada de luz.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_BISECTOR_CYLINDER_WINDOW_LAYOUT']]:[];
export const cases=[{index:633,slot:4,literals:['D(t, −2, 2)','contenga al punto C']},{index:635,slot:1,literals:['x + y + kz = 1','k = −1']},{index:637,slot:4,literals:['equidista','−4 + λ − 3µ']},{index:638,slot:4,literals:['3y − z + 6 = 0','paralelo a s']},{index:642,slot:2,literals:['(x + 1)(x − 2)','horizontal']},{index:646,slot:2,literals:['cerrado','54 m2']},{index:655,slot:2,literals:['semicírculo','8 metros']}];
export const proof=c=>({
633:{AB:[-2,1,-1],AC:[1,0,1],normal:[1,1,-1],coplanarParameter:5,plane:[2,-1,1,-5]},
635:{determinant:[-4,4],singular:1,solutionAtMinusOne:[.5,0,-.5],directionAtOne:[1,-2,1],pointAtOne:[0,1,0]},
637:{rPoint:[1,0,-1],rDirection:[3,2,1],normal:[1,-1,3],planeConstants:[2,5],parameter:-3/8,point:[-1/8,-3/4,-11/8]},
638:{P:[-2,-1,1],d:[2,1,-3],Q:[3,0,6],e:[1,1,3],cross:[6,-9,1],triple:26,plane:[6,-9,1,2]},
642:{vertical:[-1,2],horizontal:2,derivativeZeros:[-4,0],intersection:[-2,2]},
646:{area:54,radius:3/Math.sqrt(Math.PI),height:6/Math.sqrt(Math.PI),volume:54/Math.sqrt(Math.PI)},
655:{perimeter:8,radius:8/(4+Math.PI),rectangleHeight:8/(4+Math.PI),width:16/(4+Math.PI),totalHeight:16/(4+Math.PI)}
}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'INDEPENDENT_RANK_GEOMETRY_AND_OPTIMIZATION',proof(c));switch(c.index){
case 633:return[mk(0,'t=5.',['t=−5.','t=3.','t=1.'],['Cambiar el signo del término independiente del producto mixto.','Omitir la contribución de la tercera coordenada.','Confundir coplanaridad con igualdad de abscisas.'],[
['Construimos vectores con un mismo origen, sin mezclar puntos con vectores.','AB=(−2,1,−1); AC=(1,0,1); AD=(t−1,−3,1)'],
['Obtenemos la normal al plano de los tres primeros puntos mediante producto vectorial.','AB×AC=(1·1−(−1)·0,(−1)·1−(−2)·1,(−2)·0−1·1)=(1,1,−1)'],
['La normal no es nula, de modo que A, B y C determinan un plano único.','AB×AC≠(0,0,0)'],
['El cuarto punto pertenece a ese plano si su desplazamiento es ortogonal a la normal.','(AB×AC)·AD=(t−1)−3−1=t−5=0'],
['Resolvemos la condición lineal.','t=5'],
['Comprobamos en la ecuación del plano, que contiene también los otros tres puntos.','x+y−z−1=0; D(5,−2,2): 5−2−2−1=0'],
]),mk(1,'2x−y+z−5=0.',['2x−y+z+5=0.','2x+y+z−7=0.','2x−y−z−1=0.'],['Cambiar el signo del término independiente.','Cambiar una componente de la normal.','Cambiar otra componente de la normal manteniendo solo el punto de paso.'],[
['Un plano perpendicular al segmento tiene una normal paralela al vector del segmento.','AB=(−2,1,−1)'],
['Elegimos la normal opuesta para simplificar el primer coeficiente.','n=(2,−1,1)=−AB'],
['El punto por el que debe pasar es C, no el punto medio del segmento.','C=(2,1,2)'],
['Aplicamos la ecuación de plano con punto y normal.','2(x−2)−(y−1)+(z−2)=0'],
['Desarrollamos y agrupamos los términos independientes.','2x−y+z−5=0'],
['Verificamos el punto y que la dirección del segmento es perpendicular al plano.','2·2−1+2−5=0; n×AB=(0,0,0)'],
])];
case 635:return[mk(0,'k=1: compatible indeterminado; k≠1: compatible determinado; nunca incompatible.',['k=1: incompatible; k≠1: compatible determinado.','k=−1: compatible indeterminado; k≠−1: compatible determinado.','k=1 y k=−1: compatible indeterminado; demás valores: compatible determinado.'],['Confundir singularidad de la matriz con incompatibilidad.','Cambiar el signo al resolver el determinante nulo.','Añadir un valor singular al factorizar incorrectamente.'],[
['Formamos las matrices de coeficientes y términos independientes.','A=matrix{1,1,k;2,k,0;0,1,2}; b=matrix{1;1;k}'],
['Expandimos el determinante por la primera fila.','det A=2k−4+2k=4(k−1)'],
['Si el determinante no es cero, ambos rangos son iguales al número de incógnitas.','k≠1 ⇒ rg A=rg(A|b)=3 ⇒ compatible determinado'],
['Para k=1 comprobamos una dependencia de filas incluyendo los términos independientes.','F₃=2F₁−F₂; 1=2·1−1'],
['Un menor no nulo demuestra que los dos rangos no son inferiores a dos.','det[[1,1],[2,1]]=−1≠0; rg A=rg(A|b)=2<3'],
['Aplicamos Rouché–Frobenius: queda una variable libre; no existe valor incompatible.','k=1 ⇒ compatible indeterminado'],
]),mk(1,'(x,y,z)=(t,1−2t,t), t∈ℝ.',['(x,y,z)=(t,1+2t,t), t∈ℝ.','(x,y,z)=(t,1−2t,−t), t∈ℝ.','(x,y,z)=(1,−1,1), única solución.'],['Cambiar el signo al despejar y.','Cambiar el signo al recuperar z.','Confundir una solución particular con el conjunto completo.'],[
['Fijamos k=1 en todas las ecuaciones.','x+y+z=1; 2x+y=1; y+2z=1'],
['La segunda ecuación permite expresar y a partir de x.','y=1−2x'],
['Sustituimos esa expresión en la primera.','x+1−2x+z=1 ⇒ z=x'],
['Comprobamos que la tercera no añade una condición.','1−2x+2x=1'],
['Tomamos x como parámetro libre y describimos todas las soluciones.','x=t ⇒ (x,y,z)=(t,1−2t,t), t∈ℝ'],
['La sustitución verifica las tres igualdades para cualquier t, no solo un punto.','t+1−2t+t=1; 2t+1−2t=1; 1−2t+2t=1'],
]),mk(2,'(x,y,z)=(frac{1}{2},0,−frac{1}{2}).',['(x,y,z)=(frac{1}{2},0,frac{1}{2}).','(x,y,z)=(−frac{1}{2},0,frac{1}{2}).','(x,y,z)=(0,1,−1).'],['Cambiar el signo de z.','Cambiar simultáneamente los signos de x y z.','Satisfacer únicamente la tercera ecuación.'],[
['Sustituimos el parámetro por menos uno.','x+y−z=1; 2x−y=1; y+2z=−1'],
['Despejamos y en la segunda ecuación.','y=2x−1'],
['La tercera permite despejar z usando la expresión anterior.','2x−1+2z=−1 ⇒ z=−x'],
['La primera determina x.','x+2x−1+x=1 ⇒ 4x=2 ⇒ x=frac{1}{2}'],
['Recuperamos las otras incógnitas.','y=0; z=−frac{1}{2}'],
['Comprobamos las tres ecuaciones y la unicidad.','frac{1}{2}+0+frac{1}{2}=1; 1−0=1; 0−1=−1; det A=−8≠0'],
])];
case 637:return[mk(0,'P=(−frac{1}{8},−frac{3}{4},−frac{11}{8}).',['P=(frac{17}{8},frac{3}{4},−frac{5}{8}).','P=(−frac{5}{4},−frac{3}{2},−frac{7}{4}).','P=(1,0,−1).'],['Invertir el signo del parámetro del plano bisector.','Tomar la intersección con uno de los planos como punto equidistante.','Confundir la intersección con el primer plano con el punto medio entre planos.'],[
['Leemos los denominadores de la forma continua y parametrizamos la recta.','P(t)=(1+3t,2t,t−1)'],
['La segunda ecuación paramétrica de plano tiene dos direcciones independientes.','u=(1,1,0); v=(−3,0,1); u×v=(1,−1,3)'],
['Usamos su punto (−4,1,0) y esa normal para obtener la forma general.','π₂: (x+4)−(y−1)+3z=0 ⇒ x−y+3z+5=0'],
['Ambos planos tienen normal de módulo raíz de once; calculamos las distancias.','d(P(t),π₁)=frac{|4t|}{√11}; d(P(t),π₂)=frac{|4t+3|}{√11}'],
['Igualamos cuadrados, válidamente porque las distancias son no negativas.','16t²=(4t+3)² ⇒ 24t+9=0 ⇒ t=−frac{3}{8}'],
['Sustituimos y comprobamos que las dos distancias son iguales.','P=(−frac{1}{8},−frac{3}{4},−frac{11}{8}); d(P,π₁)=d(P,π₂)=frac{3}{2√11}'],
])];
case 638:return[mk(0,'r y s se cruzan: no son paralelas ni se cortan.',['r y s se cortan en un único punto.','r y s son paralelas distintas.','r y s son coincidentes.'],['Comprobar solo dos coordenadas al buscar intersección.','Confundir un plano paralelo con rectas paralelas.','Confundir direcciones y puntos de paso.'],[
['Obtenemos puntos y vectores directores de las dos rectas.','r: P=(−2,−1,1), d=(2,1,−3); s: Q=(3,0,6), e=(1,1,3)'],
['El producto vectorial permite descartar direcciones paralelas.','d×e=(1·3−(−3)·1,(−3)·1−2·3,2·1−1·1)=(6,−9,1)≠0'],
['Construimos el vector que une los puntos elegidos.','PQ=(5,1,5)'],
['El producto mixto comprueba si las dos rectas son coplanarias.','PQ·(d×e)=30−9+5=26≠0'],
['Si las rectas no son coplanarias, no pueden tener un punto común.','r y s se cruzan'],
['Como comprobación alternativa, las dos primeras coordenadas fuerzan parámetros incompatibles con la tercera.','−2+2t=3+u; −1+t=u ⇒ t=4, u=3; 1−3t=−11≠15=6+3u'],
]),mk(1,'6x−9y+z+2=0.',['6x−9y+z−2=0.','6x+9y+z+20=0.','6x−9y−z+4=0.'],['Cambiar el signo del término independiente.','Cambiar el signo de la componente central del producto vectorial.','Cambiar el signo de la tercera componente de la normal.'],[
['El plano debe contener la dirección de r y una dirección paralela a s.','d=(2,1,−3); e=(1,1,3)'],
['La normal perpendicular a ambas se obtiene mediante producto vectorial.','N=d×e=(6,−9,1)'],
['Tomamos P, que pertenece a r, como punto del plano.','6(x+2)−9(y+1)+(z−1)=0'],
['Desarrollamos y simplificamos.','6x−9y+z+2=0'],
['Comprobamos contención de r y paralelismo de la dirección de s.','N·d=12−9−3=0; N·e=6−9+3=0; 6(−2)−9(−1)+1+2=0'],
['El punto Q de s no pertenece al plano, así que el paralelismo es estricto.','6·3−9·0+6+2=26≠0'],
])];
case 642:return[mk(0,'Verticales x=−1 y x=2; horizontal y=2 en ambos infinitos; ninguna oblicua.',['Verticales x=−1 y x=2; horizontal y=1 en ambos infinitos; ninguna oblicua.','Vertical x=2; horizontal y=2 en ambos infinitos; ninguna oblicua.','Verticales x=−1 y x=2; ninguna horizontal; oblicua y=2x.'],['Olvidar el coeficiente principal del numerador.','Cancelar un factor que no aparece en el numerador.','Comparar grados como si el numerador tuviera grado tres.'],[
['El denominador se anula en dos puntos y el numerador no se anula en ninguno.','D(x)=(x+1)(x−2); 2(−1)²=2; 2·2²=8'],
['Estudiamos el signo al aproximarnos a menos uno.','lim_{x→−1⁻} f(x)=+∞; lim_{x→−1⁺} f(x)=−∞'],
['Estudiamos también los límites laterales en dos.','lim_{x→2⁻} f(x)=−∞; lim_{x→2⁺} f(x)=+∞'],
['Dividimos por x² para calcular los límites en el infinito.','f(x)=frac{2}{1−frac{1}{x}−frac{2}{x²}} ⇒ lim_{x→±∞}f(x)=2'],
['La pendiente asintótica es cero; no corresponde a una recta oblicua.','lim_{x→±∞} frac{f(x)}{x}=0'],
['Reunimos las asíntotas con su tipo y dominio de aproximación.','x=−1, x=2: verticales; y=2: horizontal en ±∞'],
]),mk(1,'Crece en (−4,−1) y (−1,0); decrece en (−∞,−4), (0,2) y (2,+∞).',['Decrece en (−4,−1) y (−1,0); crece en (−∞,−4), (0,2) y (2,+∞).','Crece en (−4,0); decrece en (−∞,−4) y (0,+∞).','Crece en (0,2) y (2,+∞); decrece en (−∞,−1) y (−1,0).'],['Invertir el signo global de la derivada.','No separar los puntos que no pertenecen al dominio.','Perder el factor x+4 y su punto crítico.'],[
['Usamos la regla del cociente con D=x²−x−2.','f′(x)=frac{4xD−2x²(2x−1)}{D²}'],
['Simplificamos y factorizamos el numerador.','4x³−4x²−8x−4x³+2x²=−2x(x+4)'],
['El denominador cuadrado es positivo donde está definida la función.','signo f′=signo(−2x(x+4)); ceros: x=−4,0'],
['Partimos el eje también en las dos discontinuidades; comprobamos signos en cada intervalo.','(−∞,−4): −; (−4,−1): +; (−1,0): +; (0,2): −; (2,+∞): −'],
['Aplicamos el criterio de monotonía separadamente en cada intervalo del dominio.','Crece en (−4,−1) y (−1,0); decrece en (−∞,−4), (0,2) y (2,+∞)'],
['Los cambios de signo concuerdan con un mínimo en menos cuatro y máximo en cero, sin incluir las discontinuidades.','f(−4)=frac{16}{9}; f(0)=0; x=−1,2 excluidos'],
]),mk(2,'La gráfica corta a la asíntota horizontal en (−2,2).',['La gráfica corta a la asíntota horizontal en (2,2).','La gráfica corta a la asíntota horizontal en (0,2).','La gráfica no corta a su asíntota horizontal.'],['Cambiar el signo de la solución y aceptar un punto fuera del dominio.','Confundir raíz de la función con cruce de la horizontal.','Suponer erróneamente que una asíntota nunca puede ser cortada.'],[
['La asíntota horizontal obtenida es y=2.','f(x)=2'],
['Planteamos la ecuación manteniendo las exclusiones del dominio.','frac{2x²}{x²−x−2}=2; x≠−1,2'],
['Multiplicamos por el denominador, que no es cero en las soluciones admisibles.','2x²=2x²−2x−4'],
['Cancelamos los términos de segundo grado y resolvemos.','2x+4=0 ⇒ x=−2'],
['Comprobamos dominio y ordenada.','−2∉{−1,2}; f(−2)=frac{8}{4}=2'],
['La ecuación reducida es lineal; por ello el punto encontrado es el único.','P=(−2,2)'],
])];
case 646:return[mk(0,'Radio r=frac{3}{√π} m; altura h=frac{6}{√π} m.',['Radio r=frac{3}{√(2π)} m; altura h=frac{6}{√(2π)} m.','Radio r=frac{3√2}{√π} m; altura h=frac{3√2}{√π} m.','Radio r=frac{3}{√π} m; altura h=frac{3}{√π} m.'],['Duplicar el coeficiente del área total.','Tratar el depósito como abierto y omitir una base.','Confundir la altura óptima con el radio en vez del diámetro.'],[
['Un cilindro cerrado tiene dos bases y superficie lateral; imponemos el área disponible.','r>0, h>0; 2πr²+2πrh=54'],
['Despejamos la altura y acotamos el radio para que el depósito no sea degenerado.','h=frac{27}{πr}−r; 0<r<√(frac{27}{π})'],
['Expresamos el volumen con una sola variable y derivamos.','V(r)=πr²h=27r−πr³; V′(r)=27−3πr²'],
['El único punto crítico positivo determina el radio candidato.','V′=0 ⇒ r²=frac{9}{π} ⇒ r=frac{3}{√π}'],
['La derivada cambia de positiva a negativa; en los extremos el volumen tiende a cero.','V″(r)=−6πr<0; V máximo=frac{54}{√π}'],
['Recuperamos la altura y comprobamos el área con las dos bases.','h=frac{6}{√π}; 2π·frac{9}{π}+2π·frac{18}{π}=18+36=54 m²'],
])];
case 655:return[mk(0,'Anchura frac{16}{4+π} m; altura del rectángulo frac{8}{4+π} m; radio frac{8}{4+π} m; altura total frac{16}{4+π} m.',['Anchura frac{16}{2+π} m; altura del rectángulo frac{8}{2+π} m; radio frac{8}{2+π} m; altura total frac{16}{2+π} m.','Anchura frac{16}{4+2π} m; altura del rectángulo frac{8}{4+2π} m; radio frac{8}{4+2π} m; altura total frac{16}{4+2π} m.','Anchura frac{16}{8+π} m; altura del rectángulo frac{8}{8+π} m; radio frac{8}{8+π} m; altura total frac{16}{8+π} m.'],['Omitir el lado inferior del rectángulo en el perímetro.','Contar una circunferencia completa en lugar de la semicircunferencia.','Duplicar los tramos rectos al contar el contorno.'],[
['Definimos r como radio del semicírculo y h como altura del rectángulo: el ancho es 2r.','r>0, h>0; perímetro=2h+2r+πr=8'],
['El diámetro compartido no es un lado adicional del contorno; despejamos h.','h=4−frac{2+π}{2}r; 0<r<frac{8}{2+π}'],
['Maximizar la entrada de luz equivale a maximizar la suma de las dos áreas.','A=2rh+frac{πr²}{2}=8r−frac{4+π}{2}r²'],
['Derivamos e imponemos la condición de punto crítico.','A′=8−(4+π)r=0 ⇒ r=frac{8}{4+π}'],
['La segunda derivada es negativa en todo el dominio; el máximo es global y la altura es positiva.','A″=−(4+π)<0; h=4−frac{4(2+π)}{4+π}=frac{8}{4+π}'],
['Damos ambas alturas para no confundir la del rectángulo con la total y comprobamos el contorno.','ancho=2r=frac{16}{4+π}; altura total=h+r=frac{16}{4+π}; (4+π)r=8'],
])];
default:throw Error('Unknown bisector/cylinder/window case');}}
export function buildBisectorCylinderWindowBatch(id='batch-0432',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Sistemas con determinantes':c.slot===4?'Propiedades métricas':'Aplicaciones de la derivada';x.secondaryTopics=[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===1?'ROUCHE_FROBENIUS_RANKS':c.slot===4?'EXPLICIT_VECTOR_PLANE_METHOD':'DERIVATIVE_SIGN_AND_GLOBAL_OPTIMUM'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildBisectorCylinderWindowBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0432-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0432.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
