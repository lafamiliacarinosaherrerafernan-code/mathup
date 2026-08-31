// Whole official questions: hotel costs and a parameter-dependent Gram matrix.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:82,A:[[65,85,104],[78,83,106]],D:[[3,15,2],[2,12,5],[1,16,7]],literals:['individual a 65 euros','doble a 85 euros','triple a 104','individual a 78','doble a 83','triple a 106','quince dobles y dos triples','doce dobles y cinco triples','dieciséis dobles y siete triples']},
 {index:406,Aat1:[[1,0,-2],[1,1,0]],C:[[1,-2],[1,0]],literals:['B = A·At','parámetro real','Bt · X + 9 C = O']},
];
export function solve(c,text){const p=officialParts(text);assert.equal(p.length,3);const make=(i,a,w,why,steps,e)=>part(p[i],a,w,why,steps,'INDEPENDENT_MATRIX_PRODUCTS_DETERMINANT_AND_EQUATION_SUBSTITUTION',e);
 if(c.index===82){const ordering='Columnas: individual, doble, triple; filas: agencias 1 y 2 en A e institutos 1, 2 y 3 en D. ';
 return[
 make(0,ordering+'A=[[65,85,104],[78,83,106]]; D=[[3,15,2],[2,12,5],[1,16,7]].',[
  ordering+'A=[[65,104,85],[78,106,83]]; D=[[3,15,2],[2,12,5],[1,16,7]].',
  ordering+'A=[[65,85,104],[78,83,106]]; D=[[3,30,6],[2,24,15],[1,32,21]].',
  ordering+'A=[[65,85,104],[78,83,106]]; D=[[3,2,1],[15,12,16],[2,5,7]].'
 ],['Intercambiar precios de habitación doble y triple manteniendo las etiquetas.','Contar personas en vez de habitaciones.','Transponer la demanda sin cambiar las etiquetas de filas y columnas.'],[
  ['Fijamos y declaramos el orden de las columnas: individual, doble, triple. Cada fila de A corresponde a una agencia, en el orden dado.','A: agencias × tipos de habitación'],
  ['Colocamos los tres precios de la primera agencia en su fila.','Fila 1: 65, 85, 104 euros por habitación y noche'],
  ['La segunda fila mantiene exactamente el mismo orden de tipos.','A=[[65,85,104],[78,83,106]]'],
  ['Las filas de D corresponden a los institutos primero, segundo y tercero. Las entradas son habitaciones, no huéspedes.','D=[[3,15,2],[2,12,5],[1,16,7]]'],
  ['Comprobamos las nueve cantidades con el enunciado y los órdenes de ambas matrices.','A:2×3; D:3×3'],
  ['Esta es una representación válida con los ejes declarados; otras convenciones solo serían válidas cambiando coherentemente etiquetas y productos.','D·Aᵗ: institutos × agencias'],
 ],{A:c.A,D:c.D,ordering:['individual','doble','triple']}),
 make(1,'DAᵗ=[[1678,1691],[1670,1682],[2153,2148]] euros/noche; agencias preferidas: 1, 1, 2.',[
  'DAᵗ=[[1925,1990],[1803,1843],[2324,2355]] euros/noche; agencias preferidas: 1, 1, 1.',
  'DAᵗ=[[1678,1691],[1670,1682],[2153,2148]] euros/noche; agencias preferidas: 2, 2, 1.',
  'DAᵗ=[[195,234],[130,156],[65,78]] euros/noche; agencias preferidas: 1, 1, 1.'
 ],['Intercambiar precios de dobles y triples.','Elegir en cada fila el mayor coste en lugar del menor.','Contabilizar solo las habitaciones individuales.'],[
  ['Usamos la convención del apartado a). Cada coste es el producto de la fila de demanda por la fila de precios de una agencia.','K=DAᵗ; (3×3)(3×2)→3×2'],
  ['Calculamos los dos presupuestos del primer instituto.','3·65+15·85+2·104=1678; 3·78+15·83+2·106=1691'],
  ['Calculamos los presupuestos del segundo instituto.','2·65+12·85+5·104=1670; 2·78+12·83+5·106=1682'],
  ['Calculamos los presupuestos del tercer instituto.','1·65+16·85+7·104=2153; 1·78+16·83+7·106=2148'],
  ['Reunimos los seis resultados en la matriz de costes por noche.','K=[[1678,1691],[1670,1682],[2153,2148]]'],
  ['Comparamos dentro de cada fila: interesa la agencia 1 a los institutos 1 y 2, y la agencia 2 al instituto 3.','Ahorros: 1691−1678=13; 1682−1670=12; 2153−2148=5 euros/noche'],
  ['Comprobación independiente: ponderamos las diferencias de precio por las demandas.','Precio agencia 2−agencia 1: [13,-2,2]; D·[[13],[-2],[2]]=[[13],[12],[-5]]'],
 ],{costs:[[1678,1691],[1670,1682],[2153,2148]],preferred:[1,1,2],wrongCosts:[[[1925,1990],[1803,1843],[2324,2355]],[[195,234],[130,156],[65,78]]]}),
 make(2,'D sí tiene inversa: det(D)=−83. A no tiene inversa: es 2×3.',[
  'D no tiene inversa: det(D)=0. A no tiene inversa: es 2×3.',
  'D sí tiene inversa: det(D)=−83. A sí tiene inversa: tiene dos filas independientes.',
  'D sí tiene inversa: det(D)=187. A no tiene inversa: es 2×3.'
 ],['Suponer dependencia de las filas sin calcular el determinante.','Confundir rango máximo con existencia de inversa bilateral de una matriz rectangular.','Sumar el cofactor central en vez de restarlo.'],[
  ['Una matriz tiene inversa bilateral si es cuadrada y su determinante no es cero. D es 3×3.','D=[[3,15,2],[2,12,5],[1,16,7]]'],
  ['Desarrollamos el determinante por la primera fila con signos alternos.','det(D)=3M₁₁−15M₁₂+2M₁₃'],
  ['Cada menor se obtiene eliminando su fila y columna.','M₁₁=12·7−5·16; M₁₂=2·7−5·1; M₁₃=2·16−12·1'],
  ['Calculamos los tres menores y después los productos.','12·7−5·16=4; 2·7−5·1=9; 2·16−12·1=20'],
  ['El resultado es distinto de cero, así que D es invertible.','det(D)=12−135+40=−83≠0'],
  ['A es rectangular y no admite una inversa bilateral. No procede calcularle un determinante.','A:2×3; no existe A⁻¹'],
 ],{detD:-83,orderA:[2,3]})];}
 assert.equal(c.index,406);return[
 make(0,'B es invertible para todo a∈ℝ: det(B)=4a²+5>0.',[
  'B es invertible solo si a≠0: det(B)=4a².',
  'B es invertible solo si a≠±frac{√(5)}{2}: det(B)=4a²−5.',
  'B no es invertible para ningún a∈ℝ porque A no es cuadrada.'
 ],['Omitir el término constante del determinante.','Cambiar el signo del término constante.','Confundir las dimensiones de A con las de AAᵗ.'],[
  ['A tiene dos filas y tres columnas; su transpuesta tiene tres filas y dos columnas. Por tanto B es cuadrada.','A=[[1,0,-2],[a,1,0]]; B=AAᵗ:2×2'],
  ['Calculamos las entradas mediante productos escalares de las filas de A.','B=[[1²+0²+(−2)²,1·a+0·1+(−2)·0],[a·1+1·0+0·(−2),a²+1²+0²]]'],
  ['Simplificamos sin asignar ningún valor particular al parámetro.','B=[[5,a],[a,a²+1]]'],
  ['Usamos la fórmula del determinante de orden dos.','det(B)=5(a²+1)−a·a=4a²+5'],
  ['Todo cuadrado real es no negativo; el determinante es al menos 5.','a²≥0 ⇒ 4a²+5≥5>0'],
  ['La condición es válida para todo real, incluido a=0; no hay valores excluidos.','B invertible para a∈ℝ'],
 ],{determinantCoefficients:[5,0,4],minimum:5}),
 make(1,'B⁻¹=[[frac{2}{9},-frac{1}{9}],[-frac{1}{9},frac{5}{9}]]',[
  'B⁻¹=[[2,-1],[-1,5]]',
  'B⁻¹=[[frac{2}{9},frac{1}{9}],[frac{1}{9},frac{5}{9}]]',
  'B⁻¹=[[frac{5}{9},-frac{1}{9}],[-frac{1}{9},frac{2}{9}]]'
 ],['Omitir la división por el determinante.','No cambiar los signos de las entradas no diagonales.','No intercambiar las entradas diagonales al formar la adjunta.'],[
  ['Sustituimos a=1 en la matriz ya calculada.','B=[[5,1],[1,2]]'],
  ['Comprobamos su determinante.','det(B)=5·2−1·1=9'],
  ['En orden dos intercambiamos la diagonal, cambiamos los signos no diagonales y dividimos por el determinante.','B⁻¹=frac{1}{9}[[2,-1],[-1,5]]'],
  ['Escribimos las cuatro entradas de la inversa.','B⁻¹=[[frac{2}{9},-frac{1}{9}],[-frac{1}{9},frac{5}{9}]]'],
  ['Verificamos multiplicando B por el numerador antes de dividir.','[[5,1],[1,2]]·[[2,-1],[-1,5]]=[[9,0],[0,9]]'],
  ['La división por 9 da la identidad y verifica todas las entradas.','BB⁻¹=I₂'],
 ],{inverse:[[2/9,-1/9],[-1/9,5/9]],wrong:[[[2,-1],[-1,5]],[[2/9,1/9],[1/9,5/9]],[[5/9,-1/9],[-1/9,2/9]]]}),
 make(2,'X=[[-1,4],[-4,-2]]',[
  'X=[[1,-4],[4,2]]',
  'X=[[-4,11],[-2,1]]',
  'X=[[-frac{1}{9},frac{4}{9}],[-frac{4}{9},-frac{2}{9}]]'
 ],['Olvidar el signo negativo al trasladar 9C.','Multiplicar por la inversa a la derecha.','Omitir el factor 9 que multiplica a C.'],[
  ['Para a=1, B es simétrica y por ello Bᵗ=B.','Bᵗ=[[5,1],[1,2]]'],
  ['Trasladamos 9C al otro miembro.','BX=−9C'],
  ['Multiplicamos a la izquierda por B⁻¹; se cancela el denominador 9 de la inversa.','X=−9B⁻¹C=−[[2,-1],[-1,5]]·[[1,-2],[1,0]]'],
  ['Calculamos el producto fila-columna y aplicamos el signo negativo.','[[2,-1],[-1,5]]C=[[1,-4],[4,2]]; X=[[-1,4],[-4,-2]]'],
  ['Comprobamos primero el producto BᵗX.','BᵗX=[[-9,18],[-9,0]]'],
  ['Añadimos 9C y obtenemos exactamente la matriz nula pedida.','BᵗX+9C=[[-9,18],[-9,0]]+[[9,-18],[9,0]]=[[0,0],[0,0]]'],
 ],{X:[[-1,4],[-4,-2]],wrong:[[[1,-4],[4,2]],[[-4,11],[-2,1]],[[-1/9,4/9],[-4/9,-2/9]]]})];
}
export function buildHotelGramBatch(id='batch-0311',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Operaciones matriciales','Inversas y determinantes','Modelización matricial'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='COMPLETE_MATRIX_MODEL_AND_ORIGINAL_EQUATION_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildHotelGramBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0311-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0311.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:2,parts:6}));}
