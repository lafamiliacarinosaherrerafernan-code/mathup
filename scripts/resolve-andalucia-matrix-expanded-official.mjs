// Eight whole official questions, each read on its official PDF page.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {I,T,mul,add,scale,det,inverse,matrix,scalar,inverseSteps} from './resolve-andalucia-matrix-order-three.mjs';
export const cases=[
 {index:430,A:[[1,1,-2],[-2,0,1],[0,2,1]],B:[[-1,3,2]],C:[[-2,1,4]],literals:['siendo 𝑎 un número real','dimensión de la matriz 𝐷']},
 {index:440,A:[[0,1,-1],[2,-1,0]],B:[[2,0],[-2,1],[0,1]],C:[[1,2],[2,-3]],literals:['A · B · X − C · X = Ct']},
 {index:460,A:[[3,1],[5,2]],B:[[2,1],[3,2]],M:[[2,5],[1,-5],[2,-1]],v:[[6],[-12],[-6]],literals:['Determine la matriz X','Calcule la matriz Y']},
 {index:474,A:[[1,1],[1,-1],[1,1]],literals:['dimensión m x n','Calcule, si es posible']},
 {index:486,A:[[1,-7],[2,-1]],B:[[1,0],[-5,2]],literals:['X + Y = A','3X + Y = B','Halle la matriz Z']},
 {index:503,A:[[2,1,0],[1,0,2],[0,2,1]],B:[[0,1,-1]],literals:['Para a = 1','A · X = Bt']},
 {index:521,A:[[1,2],[-1,-3]],B:[[2,-1,3],[4,0,1]],C:[[-1,1,0],[2,3,-2]],literals:['Resuelva la ecuación matricial','dimensiones deben tener las matrices P y Q']},
 {index:524,B:[[-5,0],[4,6]],C:[[-1,-8,-1],[-9,3,6]],literals:['A ⋅ B = 2C t','a31 = 2, a12 = −3, a22 = 1']},
];
function invSteps(A,name='K'){
 if(A.length===3)return inverseSteps(A,name);
 const d=det(A),adj=[[A[1][1],-A[0][1]],[-A[1][0],A[0][0]]];
 return [
  ['En una matriz de orden dos calculamos el producto de la diagonal principal menos el de la secundaria.',`det(${name})=${scalar(A[0][0])}·(${scalar(A[1][1])})−(${scalar(A[0][1])})·(${scalar(A[1][0])})=${scalar(d)}`],
  ['El determinante es distinto de cero: existe inversa.',`det(${name})≠0`],
  ['Intercambiamos las entradas diagonales y cambiamos el signo de las otras dos.',`adj(${name})=${matrix(adj)}`],
  ['Dividimos la adjunta completa por el determinante.',`${name}⁻¹=${matrix(inverse(A))}`],
  ['Verificamos mediante los productos fila-columna en ambos órdenes.',`${name}${name}⁻¹=${name}⁻¹${name}=I₂`],
 ];
}
const reasons=['Cambiar el signo al trasladar términos.','Multiplicar en el lado incorrecto o transponer el resultado.','Omitir un término o un factor de la ecuación.'];
export function solve(c,text){
 // This official B.1 follows the exam's editorial item e). It is not a subpart.
 const exerciseText=c.index===440?text.slice(text.indexOf('Se consideran las matrices')):text;
 if(c.index===440)assert.ok(text.includes('Se consideran las matrices'));
 const p=officialParts(exerciseText),expected=[430,474,503].includes(c.index)?3:2;assert.equal(p.length,expected);
 const make=(i,a,w,steps,proof,why=reasons)=>part(p[i],a,w,why,steps,'EXACT_SOURCE_MATRIX_EQUATIONS_WITH_INDEPENDENT_ROW_REDUCTION',proof);
 if(c.index===430){const A=c.A,inv=inverse(A),X=add(c.C,mul(c.B,inv)),wrong=[add(c.C,mul(c.B,inv),-1),add(c.C,c.B),mul(c.B,inv)];return[
  make(0,'A tiene inversa si a≠5.',['A tiene inversa si a≠−5.','A tiene inversa si a≠0.','A tiene inversa solo si a=5.'],[
   ['Desarrollamos por la primera fila de la matriz oficial.','det(A)=a(a−1)−2−a(a−3)−4(a−3)'],
   ['Distribuimos los productos sin omitir el signo del tercer cofactor.','det(A)=a²−a−2−a²+3a−4a+12'],
   ['Se cancelan los términos cuadráticos.','det(A)=10−2a'],
   ['La única raíz es el valor que debemos excluir.','10−2a=0 ⇔ a=5'],
   ['Por tanto, la matriz es invertible para cualquier otro número real.','a∈ℝ; a≠5'],
  ],{polynomial:[10,-2],root:5},['Cambiar el signo de la raíz.','Suponer que solo el parámetro cero hace singular una matriz.','Confundir singularidad con inversibilidad.']),
  make(1,`X=${matrix(X)}`,wrong.map(x=>`X=${matrix(x)}`),[
   ['Sustituimos a por uno; X y C son matrices fila de tres entradas.',`A=${matrix(A)}`],
   ...invSteps(A,'A'),
   ['Aislamos el producto que contiene X.','XA−B=CA ⇒ XA=B+CA'],
   ['Multiplicamos a la derecha por A⁻¹.','X=BA⁻¹+C'],
   ['Calculamos primero el producto de la fila B por la inversa.',`BA⁻¹=${matrix(mul(c.B,inv))}`],
   ['Sumamos la fila C entrada a entrada.',`X=${matrix(X)}`],
   ['La sustitución recupera CA sin ninguna aproximación.',`XA−B=CA=${matrix(mul(c.C,A))}`],
  ],{X,wrong,rhs:mul(c.C,A)}),
  make(2,'D debe ser una matriz 1×3.',['D debe ser una matriz 3×1.','D debe ser una matriz 3×3.','D debe ser una matriz 1×1.'],[
   ['Identificamos los tamaños de las matrices oficiales.','B:1×3; A:3×3; Cᵗ:3×1'],
   ['El primer sumando fija el tamaño del resultado.','BA:1×3'],
   ['Para poder multiplicar D por Cᵗ, D tiene tres columnas.','D:r×3 ⇒ DCᵗ:r×1'],
   ['El producto posterior por B mantiene r filas y produce tres columnas.','DCᵗB:r×3'],
   ['La suma exige que ambos sumandos tengan igual número de filas.','r=1 ⇒ D:1×3'],
  ],{dimension:[1,3],wrongDimensions:[[3,1],[3,3],[1,1]]},['Intercambiar filas y columnas.','Exigir que toda matriz de la expresión sea cuadrada.','Confundir DCᵗ, que es un escalar, con D.'])];}
 if(c.index===440){const E=add(mul(c.A,c.B),c.C,-1),inv=inverse(E),X=mul(inv,T(c.C)),wrong=[mul(T(c.C),inv),inv,scale(X,-1)];return[
  make(0,`Sí: det(AB−C)=2; (AB−C)⁻¹=${matrix(inv)}`,[scale(inv,-1),T(inv),E].map(x=>`Sí: det(AB−C)=2; (AB−C)⁻¹=${matrix(x)}`),[
   ['Multiplicamos la matriz 2×3 por la matriz 3×2.',`AB=${matrix(mul(c.A,c.B))}`],
   ['Restamos C entrada a entrada y llamamos K al resultado.',`K=AB−C=${matrix(E)}`],...invSteps(E),
  ],{inverse:inv,wrong:[scale(inv,-1),T(inv),E],E}),
  make(1,`X=${matrix(X)}`,wrong.map(x=>`X=${matrix(x)}`),[
   ['X está a la derecha en ambos términos: factorizamos por ese lado.','ABX−CX=(AB−C)X'],
   ['Utilizamos la matriz invertible K ya calculada.',`K=${matrix(E)}`],
   ['Multiplicamos ahora por K⁻¹ a la izquierda, sin conmutar las matrices.','X=K⁻¹Cᵗ'],
   ['Transponemos C antes de multiplicar.',`Cᵗ=${matrix(T(c.C))}`],
   ['Efectuamos el producto fila por columna.',`X=${matrix(X)}`],
   ['La verificación en la ecuación original recupera la transpuesta.',`ABX−CX=${matrix(T(c.C))}=Cᵗ`],
  ],{X,wrong,E})];}
 if(c.index===460){const R=add(scale(c.A,3),T(c.A)),X=mul(inverse(c.B),R),Y=[[-2],[2]],wrongX=[mul(R,inverse(c.B)),mul(inverse(c.B),scale(c.A,4)),scale(X,-1)],wrongY=[[[2],[-2]],[[-2],[-2]],[[2],[2]]];return[
  make(0,`X=${matrix(X)}`,wrongX.map(x=>`X=${matrix(x)}`),[
   ['La transpuesta intercambia las entradas no diagonales.',`Aᵗ=${matrix(T(c.A))}`],
   ['Formamos el segundo miembro completo.',`3A+Aᵗ=${matrix(R)}`],...invSteps(c.B,'B'),
   ['B multiplica por la izquierda, y su inversa debe multiplicar por la izquierda.','X=B⁻¹(3A+Aᵗ)'],
   ['Calculamos el producto y lo sustituimos en BX.',`X=${matrix(X)}`],
   ['La comprobación reproduce exactamente el segundo miembro.',`BX=${matrix(R)}`],
  ],{X,wrong:wrongX,rhs:R}),
  make(1,`Y=${matrix(Y)}`,wrongY.map(x=>`Y=${matrix(x)}`),[
   ['El producto de una matriz 3×2 da una columna 3×1; Y es una columna 2×1.','Y=[[y₁],[y₂]]'],
   ['Las tres filas dan tres ecuaciones que deben cumplirse simultáneamente.','2y₁+5y₂=6; y₁−5y₂=−12; 2y₁−y₂=−6'],
   ['Sumamos las dos primeras ecuaciones para eliminar y₂.','3y₁=−6 ⇒ y₁=−2'],
   ['Sustituimos en la primera ecuación.','−4+5y₂=6 ⇒ y₂=2'],
   ['No omitimos la tercera fila: también debe verificarse.','2(−2)−2=−6'],
   ['El sistema es compatible determinado y el resultado se expresa como columna.',`Y=${matrix(Y)}`],
  ],{Y,wrong:wrongY})];}
 if(c.index===474){const G=mul(T(c.A),c.A),inv=inverse(G),R=mul(c.A,G),wrongR=[scale(c.A,3),scale(c.A,4),scale(R,-1)];return[
  make(0,'X tiene dimensión n×n.',['X tiene dimensión m×m.','X tiene dimensión m×n.','X tiene dimensión n×m.'],[
   ['La transpuesta intercambia filas y columnas.','A:m×n ⇒ Aᵗ:n×m'],
   ['Las dimensiones interiores m coinciden.','AᵗA:n×n'],
   ['Para multiplicar por X, X necesita n filas.','X:n×p'],
   ['El producto debe ser la identidad Iₙ.','(AᵗA)X:n×p; Iₙ:n×n'],
   ['La igualdad exige p=n. Esta es una condición de dimensión, no una prueba de existencia para todo A.','X:n×n'],
  ],{dimension:'n×n',wrongDimensions:['m×m','m×n','n×m']},['Usar el número de filas de A en vez del de columnas.','Copiar el tamaño de A.','Usar el tamaño de la transpuesta.']),
  make(1,`X=${matrix(inv)}`,[T(c.A).slice(0,2).map(r=>r.slice(0,2)),scale(inv,-1),scale(G,1/8)].map(x=>`X=${matrix(x)}`),[
   ['Multiplicamos las columnas de A entre sí para formar AᵗA.',`K=AᵗA=${matrix(G)}`],...invSteps(G),
   ['La ecuación KX=I₂ identifica precisamente la inversa de K.',`X=${matrix(inv)}`],
  ],{inverse:inv,G,wrong:[T(c.A).slice(0,2).map(r=>r.slice(0,2)),scale(inv,-1),scale(G,1/8)]}),
  make(2,`Sí es posible; A(AᵗA)=${matrix(R)}`,wrongR.map(x=>`Sí es posible; A(AᵗA)=${matrix(x)}`),[
   ['Primero se calcula el producto entre paréntesis.',`AᵗA=${matrix(G)}`],
   ['Comprobamos las dimensiones antes de multiplicar.','A:3×2; AᵗA:2×2 ⇒ resultado:3×2'],
   ['En la primera fila se obtiene la suma de ambas filas de K.','(1,1)K=(4,4)'],
   ['En la segunda fila se toma su diferencia; la tercera coincide con la primera.','(1,−1)K=(2,−2)'],
   ['Ordenamos las tres filas del resultado.',`A(AᵗA)=${matrix(R)}`],
  ],{R,wrong:wrongR})];}
 if(c.index===486){const X=scale(add(c.B,c.A,-1),.5),Y=add(c.A,X,-1),Z=mul(inverse(c.B),add(scale(I(2),2),T(c.B),-1)),wrongXY=[[scale(X,-1),add(c.A,X)],[scale(X,2),add(c.A,scale(X,2),-1)],[Y,X]],wrongZ=[mul(add(scale(I(2),2),T(c.B),-1),inverse(c.B)),mul(inverse(c.B),add(scale(I(2),2),T(c.B))),scale(Z,-1)];return[
  make(0,`X=${matrix(X)}; Y=${matrix(Y)}`,wrongXY.map(([x,y])=>`X=${matrix(x)}; Y=${matrix(y)}`),[
   ['Restamos la primera ecuación de la segunda para eliminar Y.','(3X+Y)−(X+Y)=B−A'],
   ['Agrupamos las matrices incógnita.','2X=B−A'],
   ['Restamos entrada a entrada y dividimos todas las entradas por dos.',`X=${matrix(X)}`],
   ['Sustituimos en X+Y=A para obtener la segunda incógnita.',`Y=A−X=${matrix(Y)}`],
   ['Comprobamos las dos ecuaciones, no solamente su diferencia.',`X+Y=${matrix(c.A)}`],
   ['El segundo miembro también coincide.',`3X+Y=${matrix(c.B)}`],
  ],{X,Y,wrong:wrongXY}),
  make(1,`Z=${matrix(Z)}`,wrongZ.map(x=>`Z=${matrix(x)}`),[
   ['Aislamos BZ restando la transpuesta de B.','BZ=2I₂−Bᵗ'],
   ['Formamos el segundo miembro.',`2I₂−Bᵗ=${matrix(add(scale(I(2),2),T(c.B),-1))}`],...invSteps(c.B,'B'),
   ['Multiplicamos por B⁻¹ a la izquierda.','Z=B⁻¹(2I₂−Bᵗ)'],
   ['Calculamos el producto y verificamos BZ+Bᵗ=2I₂.',`Z=${matrix(Z)}`],
  ],{Z,wrong:wrongZ})];}
 if(c.index===503){const inv=inverse(c.A),X=mul(inv,T(c.B)),wrong=[mul(c.A,T(c.B)),scale(X,-1),T(c.B)];return[
  make(0,'A tiene inversa si a≠−8.',['A tiene inversa si a≠8.','A tiene inversa si a≠0.','A tiene inversa solo si a=−8.'],[
   ['Desarrollamos el determinante por la primera fila.','det(A)=2(0·a−2·2)−(1·a−2·0)'],
   ['Efectuamos cada menor con su signo.','det(A)=−8−a'],
   ['Buscamos cuándo se anula.','−8−a=0 ⇔ a=−8'],
   ['Una matriz cuadrada tiene inversa exactamente cuando su determinante no es cero.','det(A)≠0 ⇔ a≠−8'],
   ['La condición es válida para cualquier otro valor real del parámetro.','a∈ℝ; a≠−8'],
  ],{polynomial:[-8,-1],root:-8},['Cambiar el signo de la raíz.','Omitir el término independiente.','Invertir la condición de inversibilidad.']),
  make(1,`A⁻¹=${matrix(inv)}`,[scale(inv,-9),scale(inv,-1),c.A].map(x=>`A⁻¹=${matrix(x)}`),invSteps(c.A,'A'),{inverse:inv,wrong:[scale(inv,-9),scale(inv,-1),c.A]},['No dividir la adjunta por el determinante.','Perder el signo negativo del determinante.','Confundir la matriz con su inversa.']),
  make(2,`X=${matrix(X)}`,wrong.map(x=>`X=${matrix(x)}`),[
   ['A es invertible para a=1 porque su determinante vale −9.','det(A)=−9≠0'],
   ['La matriz B del enunciado es una fila; al transponerla se obtiene una columna.',`Bᵗ=${matrix(T(c.B))}`],
   ['Multiplicamos por la inversa a la izquierda.','AX=Bᵗ ⇒ X=A⁻¹Bᵗ'],
   ['Calculamos cada entrada mediante un producto fila-columna.',`X=${matrix(X)}`],
   ['Comprobamos las tres ecuaciones simultáneamente.',`AX=${matrix(T(c.B))}=Bᵗ`],
  ],{X,wrong})];}
 if(c.index===521){const K=mul(c.A,c.A),R=add(scale(c.B,2),c.C,-1),X=mul(inverse(K),R),wrong=[mul(inverse(K),add(scale(c.B,2),c.C)),mul(inverse(c.A),R),scale(X,-1)];return[
  make(0,`X=${matrix(X)}`,wrong.map(x=>`X=${matrix(x)}`),[
   ['Calculamos el cuadrado como producto matricial, no elevando cada entrada.',`K=A²=${matrix(K)}`],
   ['Pasamos C restando y formamos el segundo miembro.',`2B−C=${matrix(R)}`],...invSteps(K),
   ['La incógnita tiene dos filas y tres columnas. Multiplicamos por K⁻¹ a la izquierda.','X=(A²)⁻¹(2B−C)'],
   ['Efectuamos los seis productos fila-columna.',`X=${matrix(X)}`],
   ['La comprobación en la ecuación original devuelve exactamente 2B.',`A²X+C=${matrix(scale(c.B,2))}`],
  ],{X,wrong,K,R}),
  make(1,'P:3×2; Q:3×3.',['P:2×3; Q:3×3.','P:3×2; Q:2×2.','P:3×3; Q:3×2.'],[
   ['B y C tienen dos filas y tres columnas.','B+C:2×3'],
   ['P necesita tres filas para que el primer producto exista. Para que sea cuadrado debe acabar con dos columnas.','P:3×2 ⇒ (B+C)P:2×2'],
   ['En el otro producto B tiene tres columnas y Cᵗ tiene tres filas.','B:2×3; Cᵗ:3×2'],
   ['Q debe enlazar ambos tamaños interiores.','Q:3×3'],
   ['Verificamos el tamaño final del producto triple.','(2×3)(3×3)(3×2) ⇒ 2×2'],
  ],{P:[3,2],Q:[3,3],wrongDimensions:[[[2,3],[3,3]],[[3,2],[2,2]],[[3,3],[3,2]]]},['Transponer las dimensiones de P.','Elegir el tamaño del resultado para Q.','No comprobar las dos dimensiones interiores.'])];}
 const A=mul(scale(T(c.C),2),inverse(c.B)),wrong=[scale(A,-1),scale(A,.5),A.map(r=>[r[1],r[0]])];return[
  make(0,'A debe tener dimensión 3×2.',['A debe tener dimensión 2×3.','A debe tener dimensión 2×2.','A debe tener dimensión 3×3.'],[
   ['La matriz B es cuadrada de orden dos y C tiene dos filas y tres columnas.','B:2×2; C:2×3'],
   ['La transpuesta de C fija el tamaño del segundo miembro.','2Cᵗ:3×2'],
   ['A necesita dos columnas para que AB esté definido.','A:r×2 ⇒ AB:r×2'],
   ['La igualdad de tamaños exige tres filas.','r=3'],
   ['Con ese tamaño ambos miembros son matrices 3×2.','A:3×2'],
  ],{dimension:[3,2],wrongDimensions:[[2,3],[2,2],[3,3]]},['Olvidar transponer C.','Copiar el orden de B.','Suponer que A debe ser cuadrada.']),
  make(1,`A=${matrix(A)}`,wrong.map(x=>`A=${matrix(x)}`),[
   ['Introducimos las tres entradas conocidas en una matriz con el tamaño demostrado.','A=[[x,-3],[y,1],[2,z]]'],
   ['El producto fila-columna da estas tres filas.','AB=[[-5x−12,-18],[-5y+4,6],[-10+4z,6z]]'],
   ['Transponemos C y multiplicamos todas sus entradas por dos.',`2Cᵗ=${matrix(scale(T(c.C),2))}`],
   ['Igualamos entradas que contienen las incógnitas.','−5x−12=−2; −5y+4=−16; 6z=12'],
   ['Resolvemos las tres ecuaciones escalares.','x=−2; y=4; z=2'],
   ['También verificamos la entrada restante de la tercera fila.','−10+4·2=−2'],
   ['Reconstruimos la matriz y comprobamos las seis entradas de AB.',`A=${matrix(A)}`],
  ],{A,wrong,knownEntries:{a31:2,a12:-3,a22:1}})];
}
export function buildExpandedMatrixBatch(id='batch-0314',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Ecuaciones matriciales','Dimensiones','Determinantes'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='COMPLETE_SOURCE_MATRIX_QUESTION_ALL_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildExpandedMatrixBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0314-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0314.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
