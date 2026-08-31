import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {part,officialParts} from './resolve-andalucia-inference-multipart.mjs';import {nativeSourceEvidence} from './resolve-andalucia-doc-derivatives-2012.mjs';
export const cases=[
 {index:33,literals:['−1 & −6','2 & 4','a & 0 & 1','3 & −1 & b','B⋅C^{t}=A','A⋅X−A^{2}=I_{2}']},
 {index:40,literals:['1 & −1','2 & −1','A⋅X+A^{t}=I_{2}','producto A⋅B','producto 3⋅B⋅A']},
 {index:42,literals:['2 huevos, 5 terrones','100 g','1 huevo, 3 terrones','80 g','20 grandes y 30 pequeños','30 grandes y 20 pequeños','8 docenas','200 terrones','5 kg']},
];
export function solve(c,text){const pp=officialParts(text),mk=(i,a,w,why,s,e)=>part(pp[i],a,w,why,s,'SOURCE_MATRIX_MULTIPLICATION_RESIDUALS_AND_DIMENSION_CHECKS',e);
 if(c.index===33)return[
  mk(0,'a=3; b=−1.', ['a=3; b=1.','a=−3; b=−1.','a=1; b=−1.'],['Perder el signo de b en la entrada superior derecha.','Cambiar el signo de a al despejar.','Omitir el término 2 de la entrada superior izquierda.'],[
   ['Para formar BCᵗ transponemos C: sus filas pasan a ser columnas.','Cᵗ=[[a,3],[0,-1],[1,b]]'],
   ['Calculamos la primera fila del producto mediante productos escalares.','(BCᵗ)₁₁=−a+2; (BCᵗ)₁₂=−3−1+2b=2b−4'],
   ['Calculamos la segunda fila, conservando los signos.','(BCᵗ)₂₁=a−1; (BCᵗ)₂₂=3−b'],
   ['La igualdad de matrices exige igualdad de sus cuatro entradas.','2−a=−1; 2b−4=−6; a−1=2; 3−b=4'],
   ['Despejamos los dos parámetros y comprobamos que las otras entradas dan los mismos valores.','a=3; b=−1; 3−1=2; 3−(−1)=4'],
   ['Sustituimos y reconstruimos el producto completo como comprobación.','BCᵗ=[[-1,-6],[2,4]]=A'],
  ],{A:[[-1,-6],[2,4]],B:[[-1,1,2],[1,0,-1]],parameters:[3,-1],wrong:[[3,1],[-3,-1],[1,-1]]}),
  mk(1,'X=[[-frac{1}{2},-frac{21}{4}],[frac{7}{4},frac{31}{8}]]',[
   'X=[[-frac{3}{2},-frac{27}{4}],[frac{9}{4},frac{33}{8}]]','X=[[-10,-18],[6,5]]','X=[[0,-6],[2,5]]'
  ],['Restar A⁻¹ en vez de sumarlo al despejar.','Confundir AX con X y no multiplicar por la inversa.','Sustituir A⁻¹ por la identidad.'],[
   ['Trasladamos el cuadrado al segundo miembro y usamos que I₂ es la identidad.','AX=A²+I₂'],
   ['Calculamos el determinante para justificar que A es invertible.','det A=(−1)·4−(−6)·2=8≠0'],
   ['Aplicamos la fórmula de la inversa de una matriz de orden dos.','A⁻¹=frac{1}{8}[[4,6],[-2,-1]]=[[frac{1}{2},frac{3}{4}],[-frac{1}{4},-frac{1}{8}]]'],
   ['Multiplicamos a la izquierda y simplificamos por asociatividad, sin intercambiar factores arbitrariamente.','X=A⁻¹(A²+I₂)=A+A⁻¹'],
   ['Sumamos entrada a entrada con denominadores comunes.','X=[[-frac{1}{2},-frac{21}{4}],[frac{7}{4},frac{31}{8}]]'],
   ['Calculamos por separado A² y AX para comprobar la ecuación inicial.','A²=[[-11,-18],[6,4]]; AX=[[-10,-18],[6,5]]'],
   ['La diferencia recupera exactamente la identidad; no es solo una aproximación numérica.','AX−A²=[[1,0],[0,1]]=I₂'],
  ],{A:[[-1,-6],[2,4]],X:[[-.5,-5.25],[1.75,3.875]],wrong:[[[-1.5,-6.75],[2.25,4.125]],[[-10,-18],[6,5]],[[0,-6],[2,5]]]}),
 ];
 if(c.index===40)return[
  mk(0,'X=[[1,4],[1,6]]', ['X=[[-2,1],[-2,0]]','X=[[4,-2],[-5,3]]','X=[[0,-2],[1,2]]'],['Restar A en lugar de Aᵗ.','Multiplicar por A⁻¹ a la derecha y cambiar el orden.','Dejar I₂−Aᵗ sin multiplicar por la inversa.'],[
   ['La ecuación obliga a que X tenga dos filas y dos columnas. Despejamos AX.','AX=I₂−Aᵗ'],
   ['Transponemos A y hacemos la resta de matrices.','Aᵗ=[[1,2],[-1,-1]]; I₂−Aᵗ=[[0,-2],[1,2]]'],
   ['El determinante no es cero, por lo que podemos despejar X de forma única.','det A=1·(−1)−(−1)·2=1'],
   ['Calculamos la inversa y la colocamos a la izquierda.','A⁻¹=[[-1,1],[-2,1]]; X=A⁻¹(I₂−Aᵗ)'],
   ['Calculamos el producto fila por columna.','X=[[0+1,2+2],[0+1,4+2]]=[[1,4],[1,6]]'],
   ['Verificamos mediante la ecuación original, no repitiendo el despeje.','AX=[[0,-2],[1,2]]; AX+Aᵗ=[[1,0],[0,1]]=I₂'],
  ],{A:[[1,-1],[2,-1]],X:[[1,4],[1,6]],wrong:[[[-2,1],[-2,0]],[[4,-2],[-5,3]],[[0,-2],[1,2]]]}),
  mk(1,'B debe tener 2 filas y cualquier número n≥1 de columnas: orden 2×n.',[
   'B debe tener 2 columnas y cualquier número n≥1 de filas: orden n×2.',
   'B debe tener exactamente 2 filas y 2 columnas: orden 2×2.',
   'B puede ser cualquier matriz cuadrada de orden n×n, con n≥1.'
  ],['Intercambiar filas y columnas en la condición del producto.','Exigir que B sea cuadrada cuando no es necesario.','Suponer que basta con ser cuadrada, sin igualar dimensiones interiores.'],[
   ['Recordamos la regla dimensional del producto.','(m×n)·(n×p) produce una matriz m×p'],
   ['La matriz A tiene dos filas y dos columnas.','Orden de A: 2×2'],
   ['En AB las columnas de A deben coincidir con las filas de B.','Número de filas de B=2'],
   ['Las columnas de B no intervienen en esa condición y pueden ser cualquier número positivo.','B: 2×n, con n≥1; AB: 2×n'],
   ['Un ejemplo no cuadrado demuestra que exigir orden dos sería demasiado restrictivo.','(2×2)·(2×3) está definido'],
   ['Un contraejemplo separa filas de columnas.','(2×2)·(3×2) no está definido porque 2≠3'],
  ],{kind:'AB',validDimensions:[[2,1],[2,2],[2,3],[2,5]],invalidDimensions:[[1,2],[3,2],[3,3]],wrong:['COLUMNS_TWO','ONLY_TWO_SQUARE','ANY_SQUARE']}),
  mk(2,'B debe tener 2 columnas y cualquier número m≥1 de filas: orden m×2.',[
   'B debe tener 2 filas y cualquier número m≥1 de columnas: orden 2×m.',
   'B debe tener exactamente 2 filas y 2 columnas: orden 2×2.',
   'B debe tener exactamente 3 filas y 2 columnas: orden 3×2.'
  ],['Usar la condición de AB en vez de la de BA.','Exigir innecesariamente que B sea cuadrada.','Interpretar el escalar 3 como número de filas.'],[
   ['El número tres es un escalar: multiplica entradas y no cambia dimensiones.','Orden de 3B=orden de B'],
   ['En el producto BA las columnas de B deben coincidir con las filas de A.','Número de filas de A=2'],
   ['Por tanto B necesita exactamente dos columnas, no necesariamente dos filas.','B: m×2, con m≥1'],
   ['La regla dimensional determina también el tamaño del resultado.','(m×2)·(2×2) produce orden m×2'],
   ['Comprobamos que una matriz de una fila funciona y no tiene que ser cuadrada.','(1×2)·(2×2) está definido; multiplicar por 3 lo conserva'],
   ['Una matriz con tres columnas no serviría aunque tuviese dos filas.','(2×3)·(2×2) no está definido porque 3≠2'],
  ],{kind:'BA',validDimensions:[[1,2],[2,2],[3,2],[5,2]],invalidDimensions:[[2,1],[2,3],[3,3]],wrong:['ROWS_TWO','ONLY_TWO_SQUARE','SCALAR_AS_ROWS']}),
 ];
 if(c.index===42)return[
  mk(0,'M=[[2,1],[5,3],[100,80]]; filas: huevos, azúcar, harina (g); columnas: grande, pequeño.',[
   'M=[[1,2],[3,5],[80,100]]; filas: huevos, azúcar, harina (g); columnas: grande, pequeño.',
   'M=[[2,1],[3,5],[100,80]]; filas: huevos, azúcar, harina (g); columnas: grande, pequeño.',
   'M=[[2,1],[5,3],[frac{1}{10},frac{2}{25}]]; filas: huevos, azúcar, harina (g); columnas: grande, pequeño.'
  ],['Intercambiar las columnas sin cambiar sus etiquetas.','Intercambiar solo las cantidades de azúcar.','Pasar la harina a kilogramos pero mantener la etiqueta gramos.'],[
   ['Fijamos el orden de filas y columnas para que cada entrada tenga significado.','Filas: huevos, terrones de azúcar, harina en gramos; columnas: grande, pequeño'],
   ['La primera fila contiene las cantidades de huevos por pastel.','[2,1]'],
   ['La segunda fila recoge los terrones por unidad.','[5,3]'],
   ['La tercera fila conserva los gramos indicados en el documento.','[100,80]'],
   ['Agrupamos las tres filas manteniendo el orden de columnas.','M=[[2,1],[5,3],[100,80]]'],
   ['Comprobamos que la primera columna reproduce el pastel grande y la segunda el pequeño.','Grande: (2,5,100); pequeño: (1,3,80); orden 3×2'],
  ],{M:[[2,1],[5,3],[100,80]],wrong:[[[1,2],[3,5],[80,100]],[[2,1],[3,5],[100,80]],[[2,1],[5,3],[.1,.08]]]}),
  mk(1,'A=[[20],[30]]; B=[[30],[20]].',[
   'A=[[30],[20]]; B=[[20],[30]].','A=[[20,30]]; B=[[30,20]].','A=[[20],[30]]; B=[[20],[30]].'
  ],['Intercambiar los dos repartos solicitados.','Usar matrices fila en vez de columnas, incompatibles con M.','No invertir las cantidades en el segundo reparto.'],[
   ['Las columnas de M están ordenadas como grande y pequeño; cada vector de producción debe seguir ese orden.','Primera entrada: grandes; segunda: pequeños'],
   ['El primer reparto tiene veinte grandes y treinta pequeños.','A=[[20],[30]]'],
   ['El segundo reparto cambia esas cantidades.','B=[[30],[20]]'],
   ['Ambos son matrices columna de dos entradas.','Orden de A y B: 2×1'],
   ['El tamaño es compatible con la matriz de consumos.','(3×2)·(2×1) produce una columna 3×1'],
   ['Comprobamos las cantidades totales, sin confundir igualdad del total con igualdad del reparto.','20+30=30+20=50; A≠B'],
  ],{A:[[20],[30]],B:[[30],[20]],wrong:[{A:[[30],[20]],B:[[20],[30]]},{A:[[20,30]],B:[[30,20]]},{A:[[20],[30]],B:[[20],[30]]}]}),
  mk(2,'MA=[[70],[190],[4400]]; MB=[[80],[210],[4600]]. Primer reparto: sí; segundo: no, faltan 10 terrones.',[
   'MA=[[70],[190],[4400]]; MB=[[80],[210],[4600]]. Ambos repartos son posibles.',
   'MA=[[70],[190],[4400]]; MB=[[80],[210],[4600]]. Ninguno es posible: solo hay 8 huevos.',
   'MA=[[70],[190],[4400]]; MB=[[80],[210],[4600]]. Ninguno es posible: solo hay 5 g de harina.'
  ],['Ignorar la restricción de azúcar del segundo reparto.','Interpretar ocho docenas como ocho unidades.','No convertir los cinco kilogramos de harina a gramos.'],[
   ['Multiplicamos la matriz de consumos por el primer reparto.','MA=[[2·20+1·30],[5·20+3·30],[100·20+80·30]]=[[70],[190],[4400]]'],
   ['Repetimos el producto para el segundo reparto.','MB=[[2·30+1·20],[5·30+3·20],[100·30+80·20]]=[[80],[210],[4600]]'],
   ['Expresamos las existencias en las mismas unidades que las filas de M.','8 docenas=96 huevos; 200 terrones; 5 kg=5000 g'],
   ['Comprobamos todas las restricciones del primer reparto.','70≤96; 190≤200; 4400≤5000'],
   ['El segundo reparto cumple huevos y harina, pero supera el azúcar.','80≤96; 210>200; 4600≤5000'],
   ['Calculamos las holguras como comprobación independiente.','Primer reparto: (26,10,600); segundo: (16,−10,400)'],
   ['Concluimos para cada propuesta; una sola carencia impide la producción completa.','Primer reparto factible; segundo no factible por faltar 10 terrones de azúcar'],
  ],{M:[[2,1],[5,3],[100,80]],A:[[20],[30]],B:[[30],[20]],MA:[[70],[190],[4400]],MB:[[80],[210],[4600]],resources:[96,200,5000],slacks:[[26,10,600],[16,-10,400]],wrong:['IGNORE_SUGAR','DOZENS_AS_UNITS','KG_AS_GRAMS']}),
 ];throw Error('Unknown official matrix exercise');}
export function buildDocMatrixProductsBatch(id='batch-0358',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({nativeSourceEvidence:nativeSourceEvidence(x.exerciseId),parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Productos matriciales','Ecuaciones matriciales','Dimensiones'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='FULL_SOURCE_MATRIX_SUBPARTS_AND_INDEPENDENT_RESIDUALS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDocMatrixProductsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0358-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0358.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
