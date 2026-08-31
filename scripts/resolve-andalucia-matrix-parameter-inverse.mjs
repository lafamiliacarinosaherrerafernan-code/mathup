// Official 3x3 parameter questions, including explicitly nested a1/a2 tasks.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {I,T,mul,add,scale,inverse,matrix,inverseSteps} from './resolve-andalucia-matrix-order-three.mjs';
export const cases=[
 {index:97,A2:[[2,1,-1],[2,-1,-1],[3,0,-4]],A0:[[2,1,-1],[0,-1,-1],[3,0,0]],B:[[1,-1],[2,0],[1,-2]],literals:['Para a = 2','Para a = 0','X ·A−1 − B ·Bt = I3']},
 {index:211,A1:[[1,-1,0],[0,1,-2],[1,1,4]],literals:['a1) (0.5 puntos)','a2) (1 punto)','Despeje y simplifique','invertible.']},
];
export function solve(c,text){const p=officialParts(text);assert.equal(p.length,c.index===97?3:2);const make=(i,a,w,why,steps,e)=>part(p[i],a,w,why,steps,'FORMAL_DETERMINANT_AND_INDEPENDENT_MATRIX_INVERSE_RESIDUAL',e);
 if(c.index===97){const inv=inverse(c.A2),B2=mul(c.B,T(c.B)),R=add(I(3),B2),X=mul(R,c.A0),wrong=[mul(c.A0,R),mul(B2,c.A0),mul(add(I(3),B2,-1),c.A0)];return[
  make(0,'A tiene inversa si a≠1 y a≠−3.',[
   'A tiene inversa si a≠−1 y a≠3.','A tiene inversa si a≠0 y a≠−2.','A tiene inversa solo si a=1 o a=−3.'
  ],['Cambiar el signo del coeficiente lineal.','Olvidar el término independiente del determinante.','Invertir la condición de determinante no nulo.'],[
   ['Desarrollamos por la primera fila de la matriz, respetando sus signos.','det(A)=2(2a)−(−2a²+3)−3'],
   ['Reducimos los términos de igual grado.','det(A)=2a²+4a−6'],
   ['Extraemos el factor común y factorizamos el trinomio.','det(A)=2(a²+2a−3)=2(a−1)(a+3)'],
   ['Localizamos los dos valores singulares.','det(A)=0 ⇔ a=1 o a=−3'],
   ['Todos los demás valores reales dan una matriz invertible.','a≠1 y a≠−3'],
  ],{determinantCoefficients:[-6,4,2],excluded:[1,-3],wrongExcluded:[[-1,3],[0,-2]]}),
  make(1,`A⁻¹=${matrix(inv)}`,[T(inv),scale(inv,-1),scale(inv,10)].map(x=>`A⁻¹=${matrix(x)}`),['Olvidar transponer los cofactores.','Perder el signo del determinante.','Usar la adjunta sin dividir por el determinante 10.'],[
   ['Sustituimos a=2 antes de calcular menores.',`A=${matrix(c.A2)}`],...inverseSteps(c.A2),
  ],{inverse:inv,wrong:[T(inv),scale(inv,-1),scale(inv,10)]}),
  make(2,`X=${matrix(X)}`,wrong.map(x=>`X=${matrix(x)}`),['Multiplicar por A a la izquierda, cambiando el orden.','Omitir la identidad al pasar términos.','Cambiar el signo de BBᵗ.'],[
   ['Para a=0 el determinante es −6, por lo que A⁻¹ existe.',`A=${matrix(c.A0)}`],
   ['El producto BBᵗ es 3×3; lo calculamos por filas.',`BBᵗ=${matrix(B2)}`],
   ['Aislamos el producto que contiene X.','XA⁻¹=I₃+BBᵗ'],
   ['Cancelamos A⁻¹ multiplicando ambos miembros por A a la derecha.','X=(I₃+BBᵗ)A'],
   ['Añadimos la identidad solo a las entradas diagonales.',`I₃+BBᵗ=${matrix(R)}`],
   ['Efectuamos el producto respetando el orden indicado.',`X=${matrix(X)}`],
   ['Comprobamos de forma independiente la ecuación original.','XA⁻¹−BBᵗ=I₃'],
  ],{X,wrong,B2,R})];}
 const inv=inverse(c.A1);return[
  make(0,`a₁: m≠−frac{1}{3}. a₂: para m=1, A⁻¹=${matrix(inv)}`,[
   `a₁: m≠0. a₂: para m=1, A⁻¹=${matrix(inv)}`,
   `a₁: m≠−frac{1}{3}. a₂: para m=1, A⁻¹=${matrix(T(inv))}`,
   `a₁: m≠−frac{1}{3}. a₂: para m=1, A⁻¹=${matrix(scale(inv,-1))}`,
  ],['Omitir el término independiente 2 del determinante.','No transponer los cofactores en el segundo subapartado.','Cambiar el signo de la inversa.'],[
   ['El apartado a contiene dos tareas oficiales. En a₁ calculamos el determinante para el parámetro m.','A=[[1,-1,0],[0,m,-2],[1,m,4]]'],
   ['Desarrollamos por la primera fila sin perder el cofactor de la segunda columna.','det(A)=(4m+2m)+2=6m+2'],
   ['La condición de inversibilidad se obtiene evitando la única raíz.','6m+2≠0 ⇔ m≠−frac{1}{3}'],
   ['En a₂ sustituimos el valor pedido; el determinante vale ocho.',`m=1; A=${matrix(c.A1)}`],
   ...inverseSteps(c.A1),
   ['Quedan respondidas ambas tareas, sin omitir a₁ ni a₂.','a₁: m≠−frac{1}{3}; a₂: inversa calculada y comprobada para m=1'],
  ],{determinantCoefficients:[2,6],excluded:[-1/3],inverse:inv,wrongInverses:[T(inv),scale(inv,-1)],nestedTasks:['a1','a2']}),
  make(1,'X=B−I.',['X=B+I.','X=B.','X=I−B.'],['Cambiar el signo de B al pasar términos.','Omitir el sumando B de la ecuación.','Cambiar el signo de toda la diferencia.'],[
   ['Escribimos la ecuación oficial completa y aislamos XB.','XB−B²+B=O ⇒ XB=B²−B'],
   ['B es invertible según el enunciado; multiplicamos a la derecha por B⁻¹.','X=(B²−B)B⁻¹'],
   ['Distribuimos el producto, conservando el orden.','X=B²B⁻¹−BB⁻¹'],
   ['Simplificamos usando la inversa bilateral y la identidad del mismo orden.','X=B−I'],
   ['La sustitución simbólica da la matriz nula exactamente.','(B−I)B−B²+B=B²−B−B²+B=O'],
  ],{formula:'B-I',wrongFormulas:['B+I','B','I-B'],invertibleB:true})];
}
export function buildParameterInverseBatch(id='batch-0313',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Inversas con parámetros','Ecuaciones matriciales'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='COMPLETE_PARAMETER_INVERSE_AND_NESTED_SOURCE_TASKS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildParameterInverseBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0313-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0313.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:2,parts:5,nestedTasks:2}));}
