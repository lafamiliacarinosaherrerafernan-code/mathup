import fs from 'node:fs';import{pathToFileURL}from'node:url';import{buildBatch}from'./resolve-andalucia-inference-2012.mjs';import{officialParts,part}from'./resolve-andalucia-inference-multipart.mjs';
export const observations=[
 [1012,'85795e32721a21a3eb278bd06b1c23d508ff32ce7a58a770197d2b13552be49e',1,'A.1','4f7379c3f9b5050938705ad152a53115e5c80d36adcf3d07a7be351a26aa7591',0],
 [1014,'2bdbfb6be1200bf23a70ed00a0521ffec7928ef3bcd07fb34daab4b4f27e33fc',1,'A.3','4aef775a06e455b4fc2e65885199959acf9590fe2126772fed7765a4c675e888',0],
 [1015,'f5ec52502964f33fd640c31536ed9055e35529b51abb1d02247402916bcbc6a6',1,'4','5e8b8036a722fe1a61f4e4d42b08bde71187b9c29c0feb4c93c16366ae0194fc',0],
];
export const statements={
 1012:'La hipotenusa de un triángulo rectángulo mide 90 cm. Si se hace girar alrededor de uno de sus catetos, el triángulo engendra un cono. ¿Qué medidas han de tener los catetos del triángulo para que el volumen del cono engendrado sea máximo? (Recuerda que el volumen del cono es: V=frac{1}{3}πr²h).',
 1014:'Considera A=matrix{−2,−2,0;−2,1,0;0,0,−2} y X=matrix{x;y;z}.\na) Determina los valores de λ para los que la matriz A+λI no tiene inversa (I es la matriz identidad).\nb) Resuelve AX=−3X. Determina, si existe, alguna solución con x=1.',
 1015:'Considera los puntos A(t,2,−1), B(0,1,1), C(−1,0,2) y D(2,3,−t−1).\na) Calcula el valor o valores de t para que el volumen del tetraedro de vértices A, B, C, D sea 5 unidades cúbicas.\nb) Para t=0, calcula la distancia del punto A a la recta determinada por los puntos B y C.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_CONE_EIGENSPACE_TETRAHEDRON_LAYOUT']]:[];
export const cases=[{index:1012,slot:2,literals:['90 cm','volumen del cono']},{index:1014,slot:1,literals:['A + λI','AX = −3X','x = 1']},{index:1015,slot:4,literals:['A(t, 2, −1)','D(2, 3, −t − 1)','sea 5 unidades cúbicas']}];
export const proof=c=>({1012:{height:30*Math.sqrt(3),radius:30*Math.sqrt(6),heightSquared:2700,radiusSquared:5400,volume:54000*Math.PI*Math.sqrt(3)},1014:{A:[[-2,-2,0],[-2,1,0],[0,0,-2]],singular:[-2,2,3],determinantCoefficients:[1,-3,-4,12],eigenvector:[2,1,0],atXOne:[1,.5,0]},1015:{volumeRoots:[-5,6],tripleProductCoefficients:[-1,1,0],point:[0,2,-1],linePoint:[0,1,1],direction:[-1,-1,1],foot:[1,2,0],distanceSquared:2}}[c.index]);
export function solve(c){const text=statements[c.index],p=c.index===1012?[{id:'whole',prompt:text}]:officialParts(text),mk=(i,a,d,r,s)=>part(p[i],a,d,r,s,'INDEPENDENT_OPTIMIZATION_DETERMINANT_AND_VECTOR_CHECKS',proof(c));switch(c.index){
case 1012:return[mk(0,'Cateto eje: h=30√3 cm; otro cateto: r=30√6 cm.',['Cateto eje: h=30√6 cm; otro cateto: r=30√3 cm.','Cateto eje: h=45√2 cm; otro cateto: r=45√2 cm.','Cateto eje: h=45√3 cm; otro cateto: r=45 cm.'],['Intercambiar altura y radio, que no son simétricos en el volumen.','Suponer que el triángulo isósceles maximiza el volumen.','Elegir otro triángulo válido sin optimizar.'],[
 ['El cateto alrededor del que giramos es la altura h, y el otro es el radio r. Pitágoras da la restricción.','r²+h²=90²=8100; 0<h<90'],
 ['Eliminamos r² de la fórmula del volumen para trabajar con una variable.','V(h)=frac{π}{3}(8100−h²)h=frac{π}{3}(8100h−h³)'],
 ['Derivamos e igualamos a cero, manteniendo solo la altura positiva.','V′(h)=π(2700−h²)=0 ⇒ h=30√3'],
 ['La derivada es positiva antes de ese valor y negativa después. Los extremos degenerados tienen volumen cero.','V′>0 si 0<h<30√3; V′<0 si 30√3<h<90; V(0)=V(90)=0'],
 ['Recuperamos el otro cateto usando la restricción, sin intercambiar su papel.','r²=8100−2700=5400 ⇒ r=30√6'],
 ['Comprobamos la hipotenusa y el máximo absoluto obtenido.','(30√3)²+(30√6)²=8100; Vₘₐₓ=54000π√3 cm³'],
 ])];
case 1014:return[mk(0,'λ∈{−2,2,3}.',['λ∈{−3,−2,2}.','λ∈{−2,2}.','λ∈{2,3}.'],['Cambiar el signo del desplazamiento al usar autovalores de A.','Olvidar una raíz del bloque de orden dos.','Perder la raíz negativa del bloque de orden dos.'],[
 ['Una matriz cuadrada no es invertible exactamente cuando su determinante es cero.','A+λI=matrix{λ−2,−2,0;−2,λ+1,0;0,0,λ−2}'],
 ['Desarrollamos por la tercera fila y conservamos el menor de orden dos.','det(A+λI)=(λ−2)[(λ−2)(λ+1)−4]'],
 ['Expandimos el segundo factor con cuidado en el signo del producto secundario.','(λ−2)(λ+1)−4=λ²−λ−6'],
 ['Factorizamos el polinomio cuadrático.','λ²−λ−6=(λ−3)(λ+2)'],
 ['Un producto se anula cuando se anula alguno de sus factores.','det(A+λI)=(λ−2)(λ−3)(λ+2)=0 ⇒ λ=2,3,−2'],
 ['Los tres valores anulan el determinante, y para cualquier otro ninguno de los factores es cero.','λ∉{−2,2,3} ⇒ det(A+λI)≠0 ⇒ invertible'],
 ]),mk(1,'(x,y,z)=(2s,s,0), s∈ℝ; con x=1: (1,frac{1}{2},0).',['(x,y,z)=(s,2s,0), s∈ℝ; con x=1: (1,2,0).','(x,y,z)=(2s,s,s), s∈ℝ; con x=1: (1,frac{1}{2},frac{1}{2}).','La única solución es (0,0,0); no existe con x=1.'],['Invertir la relación x=2y.','Dejar libre z aunque su ecuación obliga a que sea cero.','Confundir sistema homogéneo singular con solución única.'],[
 ['Trasladamos el miembro derecho para formar un sistema homogéneo.','AX=−3X ⇒ (A+3I)X=0'],
 ['Calculamos la matriz y escribimos las ecuaciones, sin dividir por una incógnita.','A+3I=matrix{1,−2,0;−2,4,0;0,0,1}; x−2y=0, −2x+4y=0, z=0'],
 ['La segunda ecuación es −2 veces la primera; hay dos ecuaciones independientes.','rg(A+3I)=rg(A+3I|0)=2<3 ⇒ SCI'],
 ['Tomamos y=s y expresamos todas las soluciones.','X=(2s,s,0), s∈ℝ'],
 ['La condición adicional x=1 fija el parámetro de forma única.','2s=1 ⇒ s=frac{1}{2} ⇒ X=(1,frac{1}{2},0)'],
 ['Multiplicamos la matriz original por esta solución para comprobar ambos miembros.','A·(1,frac{1}{2},0)=(−3,−frac{3}{2},0)=−3(1,frac{1}{2},0)'],
 ])];
case 1015:return[mk(0,'t=−5 o t=6.',['t=−6 o t=5.','t=−2 o t=3.','t=6 únicamente.'],['Cambiar el signo del término lineal del determinante.','Olvidar el factor seis entre tetraedro y paralelepípedo.','Omitir una de las dos soluciones reales.'],[
 ['El volumen de un tetraedro es la sexta parte del valor absoluto del producto mixto de tres aristas concurrentes.','V=frac{|det(AB,AC,AD)|}{6}'],
 ['Restamos A a los otros vértices manteniendo el parámetro en todas las coordenadas.','AB=(−t,−1,2); AC=(−1−t,−2,3); AD=(2−t,1,−t)'],
 ['Calculamos un producto vectorial y después el escalar.','AB×AC=(1,t−2,t−1); (AB×AC)·AD=−t²+t'],
 ['La condición de volumen genera dos ecuaciones por el valor absoluto.','|−t²+t|=30 ⇒ t²−t=30 o t²−t=−30'],
 ['Resolvemos la primera y comprobamos que la segunda no tiene raíces reales.','t²−t−30=(t−6)(t+5)=0; t²−t+30=0 tiene Δ=1−120=−119<0'],
 ['Sustituimos ambos valores en el volumen original.','V(−5)=frac{|−25−5|}{6}=5; V(6)=frac{|−36+6|}{6}=5'],
 ]),mk(1,'d(A,BC)=√2.',['d(A,BC)=√5.','d(A,BC)=√6.','d(A,BC)=2.'],['Medir hasta B en vez de hasta la recta.','No dividir el producto vectorial entre el módulo del director.','Dar la distancia al cuadrado.'],[
 ['Ponemos t=0 y formamos un director de la recta BC.','A=(0,2,−1); B=(0,1,1); u=C−B=(−1,−1,1)'],
 ['El pie H=B+su satisface que A−H es perpendicular a u.','A−B=(0,1,−2); s=frac{(A−B)·u}{u·u}=frac{−3}{3}=−1'],
 ['Calculamos el pie y el vector perpendicular.','H=B−u=(1,2,0); A−H=(−1,0,−1)'],
 ['Su longitud es la distancia pedida.','d=√{(−1)²+0²+(−1)²}=√2'],
 ['Verificamos perpendicularidad y pertenencia de H a la recta.','(A−H)·u=1−1=0; H=B−1·(C−B)'],
 ['Comprobamos el resultado por una fórmula independiente de distancia.','(A−B)×u=(−1,2,1); d=frac{√6}{√3}=√2'],
 ])];default:throw Error('Unknown cone/eigenspace/tetrahedron source');}}
export function buildConeEigenspaceTetrahedronBatch(id='batch-0461',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Matrices':c.slot===4?'Problemas métricos':'Aplicaciones de derivadas';x.secondaryTopics=[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===1?'MATRIX_DETERMINANT_IDENTITIES':c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildConeEigenspaceTetrahedronBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0461-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0461.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
