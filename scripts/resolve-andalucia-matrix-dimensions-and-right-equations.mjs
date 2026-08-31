// Four whole official questions inspected on their PDF pages. No source edits.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:103,A:[[1,2],[0,-3]],B:[[1,-1],[0,2],[1,-1]],C:[[1,4,0],[2,-3,1]],literals:['C ⋅ B ⋅ X − 2A ⋅ X = At','sin efectuarlas']},
 {index:177,A:[[1,0],[1,-1]],B:[[1,0,-1],[2,1,0]],literals:['A2018','A2019','2A']},
 {index:327,A:[[3,0],[1,2]],B:[[-2,3]],C:[[-1],[-1]],literals:['A⋅ X + Bt = 4C','en dichos']},
 {index:337,A:[[-1,0],[1,2]],B:[[2,1],[0,-1]],literals:['(A + B)2 = A2 + B2 + 2 A ⋅ B','X ⋅ A = 2Bt + I2']},
];
export function solve(c,text){const p=officialParts(text);assert.equal(p.length,2);const make=(i,a,w,why,steps,e)=>part(p[i],a,w,why,steps,'MATRIX_DIMENSIONS_EXACT_PRODUCTS_AND_ORIGINAL_EQUATION_RESIDUAL',e);
 if(c.index===103)return[
  make(0,'X=[[frac{3}{2},-frac{3}{2}],[frac{5}{6},-frac{1}{2}]]',['X=[[frac{1}{2},frac{1}{2}],[-frac{1}{2},frac{1}{2}]]','X=[[frac{1}{2},frac{1}{2}],[frac{1}{2},frac{1}{6}]]','X=[[frac{3}{2},frac{5}{6}],[-frac{3}{2},-frac{1}{2}]]'],['Multiplicar Aᵗ por la inversa a la derecha.','Confundir la inversa del coeficiente con la solución.','Transponer la matriz solución.'],[
   ['B es de orden 3×2 y C de orden 2×3, por lo que CB es de orden 2×2 como A. Factorizamos X a la derecha.','(CB−2A)X=Aᵗ'],
   ['Calculamos CB mediante productos fila por columna.','CB=[[1,−1+8],[2+1,−2−6−1]]=[[1,7],[3,-9]]'],
   ['Restamos el doble de A para obtener el coeficiente.','CB−2A=[[-1,3],[3,-3]]'],
   ['Su determinante no es cero y la solución es única.','det(CB−2A)=3−9=−6; (CB−2A)⁻¹=[[frac{1}{2},frac{1}{2}],[frac{1}{2},frac{1}{6}]]'],
   ['Transponemos A e introducimos la inversa por la izquierda.','Aᵗ=[[1,0],[2,-3]]; X=(CB−2A)⁻¹Aᵗ'],
   ['Multiplicamos las cuatro entradas; el orden de los factores no puede intercambiarse.','X=[[frac{1}{2}+1,-frac{3}{2}],[frac{1}{2}+frac{1}{3},-frac{1}{2}]]=[[frac{3}{2},-frac{3}{2}],[frac{5}{6},-frac{1}{2}]]'],
   ['Verificamos la ecuación original reagrupando su primer miembro.','CBX−2AX=(CB−2A)X=[[1,0],[2,-3]]=Aᵗ'],
  ],{X:[[1.5,-1.5],[5/6,-.5]],wrong:[[[.5,.5],[-.5,.5]],[[.5,.5],[.5,1/6]],[[1.5,5/6],[-1.5,-.5]]]}),
  make(1,'Se pueden: AC+C (2×3) y CB−A (2×2). No: BC+2A ni BᵗC.',[
   'Se pueden: BC+2A (3×3) y CB−A (2×2). No: AC+C ni BᵗC.',
   'Se pueden: AC+C (2×3), BᵗC (2×3) y CB−A (2×2). No: BC+2A.',
   'Se pueden: BC+2A (3×3), AC+C (2×3) y CB−A (2×2). No: BᵗC.'
  ],['Confundir compatibilidad para multiplicar con compatibilidad para sumar.','Tratar Bᵗ como si conservara las dimensiones de B.','Permitir sumar una matriz 3×3 a otra 2×2.'],[
   ['Solo comprobamos dimensiones, como pide el apartado; no necesitamos efectuar los productos.','A:2×2; B:3×2; C:2×3; Bᵗ:2×3'],
   ['Para multiplicar deben coincidir las dimensiones interiores. Para sumar, ambos órdenes deben ser iguales.','(m×n)(n×p)→m×p'],
   ['BC existe y es 3×3, pero 2A es 2×2: su suma no está definida.','BC+2A: no'],
   ['AC tiene orden 2×3 y puede sumarse a C, del mismo orden.','AC+C: sí, 2×3'],
   ['En BᵗC las dimensiones interiores son 3 y 2, distintas.','(2×3)(2×3): no'],
   ['CB tiene orden 2×2 como A y la resta está definida.','CB−A: sí, 2×2'],
  ],{valid:[false,true,false,true]})];
 if(c.index===177)return[
  make(0,'A²⁰¹⁸+A²⁰¹⁹=[[2,0],[1,0]]',['A²⁰¹⁸+A²⁰¹⁹=[[2,0],[2,-2]]','A²⁰¹⁸+A²⁰¹⁹=[[2,0],[0,2]]','A²⁰¹⁸+A²⁰¹⁹=[[0,0],[-1,2]]'],['Sustituir ambas potencias por A.','Sustituir también la potencia impar por I.','Restar A en vez de sumarla.'],[
   ['Multiplicamos A por sí misma, respetando filas y columnas.','A²=[[1,0],[1−1,1]]=[[1,0],[0,1]]=I₂'],
   ['2018 es par y 2019 es impar.','2018=2·1009; 2019=2·1009+1'],
   ['Agrupamos potencias usando la identidad comprobada.','A²⁰¹⁸=(A²)¹⁰⁰⁹=I₂; A²⁰¹⁹=(A²)¹⁰⁰⁹A=A'],
   ['Sumamos las matrices resultantes.','I₂+A=[[2,0],[1,0]]'],
   ['El ciclo alterna I y A; A³=A y A⁴=I confirman el patrón.','A²ⁿ=I₂; A²ⁿ⁺¹=A'],
  ],{sum:[[2,0],[1,0]],wrong:[[[2,0],[2,-2]],[[2,0],[0,2]],[[0,0],[-1,2]]]}),
  make(1,'X=[[-2,2],[-7,7]]',['X=[[0,-2],[0,5]]','X=[[-2,-7],[2,7]]','X=[[-3,2],[-7,6]]'],['Multiplicar por A⁻¹ a la izquierda.','Transponer la solución.','Omitir el factor 2 que multiplica a A.'],[
   ['B es 2×3 y Bᵗ es 3×2, así que BBᵗ tiene el orden 2×2 necesario.','BBᵗ=[[1+1,2],[2,4+1]]=[[2,2],[2,5]]'],
   ['Trasladamos este producto al segundo miembro.','XA=2A−BBᵗ=[[2,0],[2,-2]]−[[2,2],[2,5]]=[[0,-2],[0,-7]]'],
   ['Como A²=I₂, la inversa de A es A. Al estar A a la derecha, multiplicamos a la derecha.','X=(2A−BBᵗ)A'],
   ['Calculamos el producto en el orden demostrado.','X=[[0,-2],[0,-7]]·[[1,0],[1,-1]]=[[-2,2],[-7,7]]'],
   ['Comprobamos XA y después añadimos BBᵗ.','XA=[[0,-2],[0,-7]]'],
   ['La suma reproduce exactamente el segundo miembro de la ecuación original.','XA+BBᵗ=[[2,0],[2,-2]]=2A'],
  ],{X:[[-2,2],[-7,7]],wrong:[[[0,-2],[0,5]],[[-2,-7],[2,7]],[[-3,2],[-7,6]]]})];
 if(c.index===327)return[
  make(0,'AB no existe; BA=[[-3,6]]; BC=[[-1]]; CᵗBᵗ=[[-1]].',[
   'AB no existe; BA=[[-6,6]]; BC=[[-1]]; CᵗBᵗ=[[-1]].',
   'AB no existe; BA=[[-3,6]]; BC=[[1]]; CᵗBᵗ=[[1]].',
   'AB no existe; BA=[[-3,6]]; BC=[[-1]]; CᵗBᵗ=[[2,-3],[2,-3]].'
  ],['Omitir el término 3·1 al calcular BA.','Invertir el signo del producto escalar.','Calcular el producto exterior CB en vez de CᵗBᵗ.'],[
   ['Identificamos los órdenes antes de operar.','A:2×2; B:1×2; C:2×1; Cᵗ:1×2; Bᵗ:2×1'],
   ['AB no existe: las dimensiones interiores son 2 y 1.','(2×2)(1×2): no definido'],
   ['BA existe y es una fila con dos entradas.','BA=[[-2·3+3·1,−2·0+3·2]]=[[-3,6]]'],
   ['BC es una matriz 1×1 obtenida por producto fila-columna.','BC=[[(-2)·(−1)+3·(−1)]]=[[-1]]'],
   ['CᵗBᵗ también es 1×1.','CᵗBᵗ=[[(-1)·(−2)+(−1)·3]]=[[-1]]'],
   ['La igualdad de los dos últimos resultados se comprueba con la transposición de un producto.','(BC)ᵗ=CᵗBᵗ'],
  ],{BA:[[-3,6]],BC:[[-1]],CtBt:[[-1]],ABDefined:false}),
  make(1,'X=[[-frac{2}{3}],[-frac{19}{6}]]',['X=[[-2],[frac{1}{2}]]','X=[[-frac{4}{3}],[-frac{4}{3}]]','X=[[-2],[-frac{5}{2}]]'],['Sumar Bᵗ en vez de restarlo al despejar.','Omitir Bᵗ de la ecuación.','Cambiar −2 por +2 en B antes de transponer.'],[
   ['X debe ser una columna de orden 2×1 para que ambos miembros tengan el mismo orden.','X=[[x],[y]]'],
   ['Trasladamos Bᵗ sin alterar su signo original.','AX=4C−Bᵗ=[[-4],[-4]]−[[-2],[3]]=[[-2],[-7]]'],
   ['El producto matricial da dos ecuaciones escalares.','3x=−2; x+2y=−7'],
   ['Resolvemos primero la primera fila.','x=−frac{2}{3}'],
   ['Sustituimos ese valor en la segunda fila.','2y=−7+frac{2}{3}=−frac{19}{3}; y=−frac{19}{6}'],
   ['Sustituimos en la ecuación original, incluyendo Bᵗ.','AX+Bᵗ=[[-2],[-7]]+[[-2],[3]]=[[-4],[-4]]=4C'],
  ],{X:[[-2/3],[-19/6]],wrong:[[[-2],[.5]],[[-4/3],[-4/3]],[[-2],[-2.5]]]})];
 assert.equal(c.index,337);return[
  make(0,'No: (A+B)²=[[2,2],[2,2]]; A²+B²+2AB=[[1,-1],[5,3]].',[
   'Sí: (A+B)²=[[1,-1],[5,3]]; A²+B²+2AB=[[1,-1],[5,3]].',
   'No: (A+B)²=[[1,1],[1,1]]; A²+B²+2AB=[[1,-1],[5,3]].',
   'No: (A+B)²=[[2,2],[2,2]]; A²+B²+2AB=[[5,1],[1,5]].'
  ],['Aplicar el cuadrado de una suma como si AB=BA.','Elevar cada entrada de A+B en lugar de multiplicar.','Omitir el término 2AB del segundo miembro.'],[
   ['Desarrollamos por distributividad manteniendo el orden.','(A+B)²=A²+AB+BA+B²'],
   ['La suma y su cuadrado se calculan directamente.','A+B=[[1,1],[1,1]]; (A+B)²=[[2,2],[2,2]]'],
   ['Calculamos los cuadrados por separado.','A²=[[1,0],[1,4]]; B²=[[4,1],[0,1]]'],
   ['Calculamos AB y el segundo miembro.','AB=[[-2,-1],[2,-1]]; A²+B²+2AB=[[1,-1],[5,3]]'],
   ['Las matrices obtenidas son distintas; basta comparar la primera entrada.','2≠1'],
   ['La causa es que AB no coincide con BA. La diferencia entre ambos miembros es BA−AB.','BA=[[-1,2],[-1,-2]]; BA−AB=[[1,3],[-3,-1]]'],
  ],{lhs:[[2,2],[2,2]],rhs:[[1,-1],[5,3]]}),
  make(1,'X=[[-5,0],[-frac{5}{2},-frac{1}{2}]]',['X=[[-5,0],[frac{7}{2},-frac{1}{2}]]','X=[[-4,1],[-frac{1}{2},-frac{1}{2}]]','X=[[-4,0],[-3,-1]]'],['Multiplicar por la inversa a la izquierda.','Omitir la transposición de B.','Omitir I₂ en el segundo miembro.'],[
   ['Transponemos B y calculamos el segundo miembro completo.','Bᵗ=[[2,0],[1,-1]]; 2Bᵗ+I₂=[[5,0],[2,-1]]'],
   ['El determinante de A es −2, por lo que es invertible.','det(A)=−2; A⁻¹=[[-1,0],[frac{1}{2},frac{1}{2}]]'],
   ['A multiplica a X por la derecha: se despeja multiplicando a la derecha.','X=(2Bᵗ+I₂)A⁻¹'],
   ['Calculamos la primera fila y después la segunda.','X=[[-5,0],[-2−frac{1}{2},-frac{1}{2}]]=[[-5,0],[-frac{5}{2},-frac{1}{2}]]'],
   ['Comprobamos mediante sustitución, sin cambiar el orden XA.','XA=[[5,0],[frac{5}{2}−frac{1}{2},-1]]=[[5,0],[2,-1]]'],
   ['Coincide con el segundo miembro y la inversibilidad garantiza unicidad.','XA=2Bᵗ+I₂'],
  ],{X:[[-5,0],[-2.5,-.5]],wrong:[[[-5,0],[3.5,-.5]],[[-4,1],[-.5,-.5]],[[-4,0],[-3,-1]]]})];
}
export function buildMatrixDimensionsBatch(id='batch-0310',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Dimensiones y operaciones matriciales','Ecuaciones matriciales'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='COMPLETE_MATRIX_DIMENSIONS_AND_SOURCE_EQUATION_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildMatrixDimensionsBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0310-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0310.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:4,parts:8}));}
