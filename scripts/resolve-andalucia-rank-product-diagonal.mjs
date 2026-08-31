import fs from'node:fs';import{pathToFileURL}from'node:url';import{buildBatch}from'./resolve-andalucia-inference-2012.mjs';import{officialParts,part}from'./resolve-andalucia-inference-multipart.mjs';
export const observations=[
 [1027,'8989ece1dc4d1fafd724f1b38fa92b3d562a6ca1c4bd9a7b6ffd8a1b75f129f0',2,'5','47add2d5a3f7d695fb26cd49c5a8c963a734bf2527dda0514cdf460da5f24f3a',0],
 [1032,'62a1d9074de55299d71cdeb9a0ce1c0bd8d749e8b1baa30fb379ef400b4e7387',2,'B.3','be9006d94f1e72d993bb2c379ea1dfb08ecc89ffc651ec8d398eff5317e6e167',0],
 [1033,'1e4f531b5628e8a28245106f3c6fabe999a180d01408f83dbb02d7a79a9c179e',1,'1','7b89c1ae266556929588efee3bb779a0c44ae58ea1c69a89403f163678b8594c',0],
];
export const statements={1027:'Considera el sistema: cases{2x+3y+mz=3;x+my−z=−1;3x+y−3z=−m}.\na) Discute el sistema según los valores de m.\nb) Para m=−2 encuentra, si es posible, y₀ para que la solución del sistema sea x=λ, y=y₀, z=λ−frac{3}{7}.',1032:'Considera las matrices A=matrix{1,2;2,1;0,1}, B=matrix{3,1,1;2,−1,1} y C=matrix{1,1,0;−1,2,1;1,−1,1}. Determina, si existe, la matriz X que verifica que ABX−2C=CX.',1033:'De entre todos los rectángulos de diagonal 10 cm (cada una), calcula las dimensiones del que tiene mayor área.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_RANK_PRODUCT_DIAGONAL_LAYOUT']]:[];
export const cases=[{index:1027,slot:1,literals:['2x + 3y + mz = 3','3x + y − 3z = −m','Para m = −2']},{index:1032,slot:1,literals:['ABX − 2C = CX','Determina, si existe']},{index:1033,slot:2,literals:['diagonal 10 cm','mayor área']}];
export const proof=c=>({1027:{determinantCoefficients:[-3,-5,2],singular:[-2,1/3],incompatible:1/3,indeterminate:-2,ranksAtMinusTwo:[2,2],ranksAtThird:[2,3],y0:5/7,freeSolution:{x:'lambda',y:5/7,zOffset:-3/7}},1032:{A:[[1,2],[2,1],[0,1]],B:[[3,1,1],[2,-1,1]],C:[[1,1,0],[-1,2,1],[1,-1,1]],AB:[[7,-1,3],[8,1,3],[2,-1,1]],M:[[6,-2,3],[9,-1,2],[1,0,0]],detM:-1,inverseM:[[0,0,1],[-2,3,-15],[-1,2,-12]],X:[[2,-2,2],[-40,38,-24],[-30,30,-20]]},1033:{side:5*Math.sqrt(2),sideSquared:50,area:50,diagonal:10}}[c.index]);
export function solve(c){const ps=c.index===1027?officialParts(statements[c.index]):[{id:'whole',prompt:statements[c.index]}],mk=(i,a,d,r,s)=>part(ps[i],a,d,r,s,'ROUCHE_FROBENIUS_MATRIX_RESIDUAL_AND_INDEPENDENT_AREA_BOUND',proof(c));switch(c.index){
case 1027:return[mk(0,'SCD si m≠−2,frac{1}{3}; SCI si m=−2; SI si m=frac{1}{3}.',['SCD si m≠−2,frac{1}{3}; SI si m=−2; SCI si m=frac{1}{3}.','SCD si m≠−2,frac{1}{3}; SCI en ambos valores excepcionales.','SCD si m≠−2,frac{1}{3}; SI en ambos valores excepcionales.'],['Intercambiar las compatibilidades en los valores singulares.','Dar infinitas soluciones siempre que el determinante sea cero.','Dar incompatibilidad siempre que el determinante sea cero.'],[
 ['Formamos la matriz de coeficientes y calculamos su determinante.','M=matrix{2,3,m;1,m,−1;3,1,−3}; det M=2(1−3m)+m(1−3m)=−(3m−1)(m+2)'],
 ['Aplicamos Rouché–Frobenius: con determinante no nulo ambos rangos valen el número de incógnitas.','m≠−2,frac{1}{3} ⇒ rg M=rg(M|b)=3 ⇒ SCD'],
 ['Para los casos singulares, eliminamos x conservando la segunda ecuación.','E₁−2E₂: (3−2m)y+(m+2)z=5; E₃−3E₂: (1−3m)y=3−m'],
 ['Con m=−2 las dos ecuaciones reducidas coinciden y no hay contradicción. Un menor de orden dos no se anula.','7y=5 en ambas; det matrix{2,3;1,−2}=−7≠0; rg M=rg(M|b)=2<3 ⇒ SCI'],
 ['Con m=1/3 aparece una contradicción en la ecuación reducida, mientras el rango de coeficientes sigue siendo dos.','0=frac{8}{3}; det matrix{2,3;1,frac{1}{3}}=−frac{7}{3}≠0; rg M=2<rg(M|b)=3 ⇒ SI'],
 ['La separación de casos es exhaustiva porque el determinante tiene solo esas dos raíces.','Compatibilidad ⇔ igualdad de rangos; unicidad ⇔ rango común 3'],
 ]),mk(1,'y₀=frac{5}{7}, con λ∈ℝ.',['y₀=−frac{5}{7}, con λ∈ℝ.','y₀=frac{3}{7}, con λ∈ℝ.','y₀=frac{5}{3}, con λ∈ℝ.'],['Cambiar el signo de la reducción.','Confundir la coordenada y con la diferencia x−z.','Omitir una contribución al coeficiente de y.'],[
 ['En el caso m=−2, la reducción de a) fija y pero deja una incógnita libre.','7y=5 ⇒ y=y₀=frac{5}{7}'],
 ['Usamos la segunda ecuación para relacionar x y z.','x−2y−z=−1 ⇒ x−z=−1+frac{10}{7}=frac{3}{7}'],
 ['Elegimos x=λ, como indica el enunciado; z queda determinado.','(x,y,z)=(λ,frac{5}{7},λ−frac{3}{7}), λ∈ℝ'],
 ['Sustituimos la familia completa en la primera ecuación.','2λ+frac{15}{7}−2(λ−frac{3}{7})=frac{21}{7}=3'],
 ['Comprobamos la segunda ecuación para cualquier λ.','λ−frac{10}{7}−(λ−frac{3}{7})=−1'],
 ['Comprobamos también la tercera, cuyo término independiente es −m=2.','3λ+frac{5}{7}−3(λ−frac{3}{7})=frac{14}{7}=2'],
 ])];
case 1032:return[mk(0,'X=matrix{2,−2,2;−40,38,−24;−30,30,−20}.',['X=matrix{1,−1,1;−20,19,−12;−15,15,−10}.','X=matrix{2,−40,−30;−2,38,30;2,−24,−20}.','X=matrix{−2,2,−2;40,−38,24;30,−30,20}.'],['Perder el factor dos del término independiente.','Trasponer el resultado por intercambiar filas y columnas.','Pasar el término 2C al otro miembro con signo incorrecto.'],[
 ['A es 3×2 y B es 2×3; por tanto AB y C son 3×3. Agrupamos X por la derecha.','ABX−CX=2C ⇒ (AB−C)X=2C'],
 ['Multiplicamos A por B antes de restar C.','AB=matrix{7,−1,3;8,1,3;2,−1,1}; M=AB−C=matrix{6,−2,3;9,−1,2;1,0,0}'],
 ['El determinante no se anula. La ecuación tiene una única solución, obtenida multiplicando por la inversa por la izquierda.','det M=det matrix{−2,3;−1,2}=−1; X=M⁻¹(2C)'],
 ['Mostramos la eliminación por filas de X para desarrollar el cálculo sin ocultar una inversión. Sean R₁,R₂,R₃ esas filas.','R₁=(2,−2,2); −2R₂+3R₃=(−10,14,−12); −R₂+2R₃=(−20,22,−16)'],
 ['Restamos la primera ecuación reducida del doble de la segunda y recuperamos R₂.','R₃=(−30,30,−20); R₂=2R₃+(20,−22,16)=(−40,38,−24)'],
 ['Verificamos por multiplicación con M; equivale exactamente a la ecuación original.','MX=matrix{2,2,0;−2,4,2;2,−2,2}=2C ⇒ ABX−2C=CX'],
 ])];
case 1033:return[mk(0,'Cuadrado de lados 5√2 cm y 5√2 cm; área máxima 50 cm².',['Rectángulo de lados 6 cm y 8 cm; área máxima 48 cm².','Cuadrado de lados 5 cm y 5 cm; área máxima 25 cm².','Rectángulo de lados 5 cm y 5√3 cm; área máxima 25√3 cm².'],['Elegir un rectángulo de diagonal correcta, pero que no maximiza el área.','Usar la mitad de la diagonal como lado, incumpliendo Pitágoras.','Elegir otra razón de lados que cumple la diagonal, sin optimizar.'],[
 ['Llamamos x e y a los lados positivos. Aplicamos Pitágoras a la diagonal.','x²+y²=100; y=√{100−x²}; 0<x<10'],
 ['Expresamos el área con una variable.','S(x)=x√{100−x²}'],
 ['Derivamos usando producto y regla de la cadena.','S′(x)=√{100−x²}−frac{x²}{√{100−x²}}=frac{100−2x²}{√{100−x²}}'],
 ['El denominador es positivo en el dominio. La derivada cambia de positiva a negativa en el único punto crítico.','x²=50 ⇒ x=5√2; S′>0 antes y S′<0 después'],
 ['Recuperamos el otro lado, el área y comprobamos la diagonal.','y=5√2; S=50 cm²; √{50+50}=10 cm'],
 ['Una comprobación independiente demuestra el máximo global sin derivadas.','(x−y)²≥0 ⇒ 2xy≤x²+y²=100 ⇒ xy≤50; igualdad solo si x=y'],
 ])];default:throw Error('Unknown rank/product/diagonal source');}}
export function buildRankProductDiagonalBatch(id='batch-0464',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.index===1027?'Sistemas con determinantes':c.slot===1?'Matrices':'Aplicaciones de derivadas';x.secondaryTopics=[];x.block=c.slot===1?'Álgebra':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.index===1027?'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS':c.slot===1?'MATRIX_DETERMINANT_IDENTITIES':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildRankProductDiagonalBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0464-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0464.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
