// Page-inspected official Math II sources; original literals remain immutable.
import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {renderRationalBranchPlot} from './resolve-andalucia-calculus-rational-plots.mjs';
export const observations=[
 [424,'915e3de08a67887ee286773fac80c8a3a54dc62f3ddee5b1bd715b9b25069857',2,'6','eae1d6ab7e6dcfd8c8b1a064d8ffe3a3c8d4516caa7a9c86da0421cdb3b119d3',0],
 [425,'56a7eeb2e214c74b9aeb92347d4b6f860225bb0221675c04e5335a48a645bb74',1,'A.2','857de32b5c2cfde0e0d596e2652eace7f7cdbee0e8405955a8016247265cae30',0],
 [428,'3bd9605e8f19071b210561d6f59ee83139cc5e20f4ffa7e29a17fa4f08d1752a',2,'B.2','92c47b64c5346e21cd247dda624a1dd25234a6a1cd77bc43ceb85afda9fb606d',0],
];
export const statements={
 424:'Considera la matriz A=[[a,b,c],[d,e,f],[1,2,3]], con determinante igual a 2.\na) Calcula razonadamente det(frac{1}{3}A^(−1)A^t). (0.5 puntos)\nb) Calcula razonadamente los determinantes det([[6c,2b,2a],[3f,e,d],[9,2,1]]) y det([[2a−2b,c,b],[2d−2e,f,e],[−2,3,2]]). (2 puntos)',
 425:'[2.5 puntos] Dada la función f definida por f(x)=frac{3}{x²−5x+4} para x≠1 y x≠4. Calcula el área del recinto limitado por la gráfica de f, el eje de abscisas, y las rectas x=2, x=3.',
 428:'Sea f:[0;frac{π}{6}]→ℝ una función continua y sea F la primitiva de f que cumple F(0)=frac{π}{3} y F(frac{π}{6})=π. Calcula:\na) [1 punto] ∫_{0}^{π/6}(3f(x)−cos(x)) dx\nb) [1,5 puntos] ∫_{0}^{π/6}sen(F(x))·f(x) dx',
};
export const cases=[
 {index:424,literals:['determinante igual a 2','Calcula razonadamente los determinantes'],topic:'Determinantes',slot:1},
 {index:425,literals:['x2 − 5x + 4','x = 2, x = 3'],topic:'Integrales definidas y áreas',slot:3},
 {index:428,literals:['una función continua','primitiva de f','Calcula:'],topic:'Integrales definidas y áreas',slot:3},
];
export function replacements(r){return statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_MATH_II_DETERMINANTS_INTEGRALS_PAGE_LAYOUT']]:[];}
export const det3=a=>a[0][0]*(a[1][1]*a[2][2]-a[1][2]*a[2][1])-a[0][1]*(a[1][0]*a[2][2]-a[1][2]*a[2][0])+a[0][2]*(a[1][0]*a[2][1]-a[1][1]*a[2][0]);
export function transformedMatrices(A){const [[a,b,c],[d,e,f]]=A;return[[[6*c,2*b,2*a],[3*f,e,d],[9,2,1]],[[2*a-2*b,c,b],[2*d-2*e,f,e],[-2,3,2]]];}
export function simpson(f,a,b,n=4000){assert.equal(n%2,0);let sum=f(a)+f(b);for(let i=1;i<n;i++)sum+=(i%2?4:2)*f(a+(b-a)*i/n);return sum*(b-a)/(3*n);}
export const rationalFunction=x=>3/(x*x-5*x+4);
export const primitive=x=>Math.log(Math.abs((x-4)/(x-1)));
export const areaGraph={schemaVersion:'mathup.calculus-graph.v1',plotVersion:'mates-rational-area-v1',xRange:[1.7,3.3],yRange:[-2,.5],step:[.5,.5],pieces:[{range:[1.7,3.3],numerator:[3],denominator:[4,-5,1],label:'f(x)=3/((x−1)(x−4)); sombreado entre x=2 y x=3'}],asymptotes:[],points:[{xy:[2,-1.5],label:'(2;−1,5)',dx:12,dy:23},{xy:[3,-1.5],label:'(3;−1,5)',dx:-12,dy:23}],area:[2,3]};
export function renderMatesAreaGraph(g){assert.deepEqual(g,areaGraph);return renderRationalBranchPlot(g);}
export function proof(c){
 if(c.index===424){const A=[[1,0,0],[0,2/3,0],[1,2,3]],B=transformedMatrices(A);assert.equal(det3(A),2);return{order:3,scalar:1/3,detA:2,productDeterminant:1/27,firstMultiplier:-6,secondMultiplier:-2,determinants:B.map(det3),wrongProducts:[1/3,2/27,1/9],wrongDeterminants:[[12,-4],[-12,4],[-6,-2]]};}
 if(c.index===425){const integral=simpson(rationalFunction,2,3),area=2*Math.log(2);assert.ok(Math.abs(integral+area)<1e-10);return{domainExcluded:[1,4],signOnArea:-1,partialFractions:[-1,1],integral,area,wrongAreas:[-area,Math.log(2),6*Math.log(2)]};}
 assert.equal(c.index,428);const h=Math.PI/6,checks=[0,1].map(k=>{const F=x=>Math.PI/3+4*x+k*Math.sin(12*x),f=x=>4+12*k*Math.cos(12*x);return{oscillatory:k===1,first:simpson(x=>3*f(x)-Math.cos(x),0,h),second:simpson(x=>Math.sin(F(x))*f(x),0,h)};});for(const v of checks){assert.ok(Math.abs(v.first-(2*Math.PI-.5))<1e-9);assert.ok(Math.abs(v.second-1.5)<1e-9);}return{endpointF:[Math.PI/3,Math.PI],integralF:2*Math.PI/3,first:2*Math.PI-.5,second:1.5,independentChecks:checks,wrongFirst:[3*Math.PI-.5,2*Math.PI+.5,2*Math.PI-Math.sqrt(3)/2],wrongSecond:[.5,-1.5,2]};
}
export function solve(c,source){const ps=c.index===425?[{id:'whole',prompt:source}]:officialParts(statements[c.index]),ev=proof(c);const mk=(i,a,d,errors,steps)=>part(ps[i],a,d,errors,steps,'DETERMINANT_IDENTITIES_OR_FUNDAMENTAL_THEOREM_WITH_INDEPENDENT_QUADRATURE',ev);
 if(c.index===424)return[
 mk(0,'Determinante = frac{1}{27}.',['Determinante = frac{1}{3}.','Determinante = frac{2}{27}.','Determinante = frac{1}{9}.'],['Extraer el escalar una sola vez en lugar de tres.','Olvidar que el determinante de la inversa es el recíproco.','Aplicar al escalar el exponente de una matriz de orden dos.'],[
 ['El determinante dado no es cero, por lo que A es invertible. Su orden es tres.','det(A)=2≠0; A es 3×3'],
 ['En una matriz n×n, multiplicar toda la matriz por un escalar multiplica su determinante por la potencia n del escalar.','det(kM)=k^n det(M)'],
 ['Aplicamos esa propiedad y la multiplicatividad del determinante.','det(frac{1}{3}A^(−1)A^t)=(frac{1}{3})³det(A^(−1))det(A^t)'],
 ['La inversa tiene determinante recíproco y la traspuesta conserva el determinante.','det(A^(−1))=frac{1}{2}; det(A^t)=2'],
 ['Sustituimos y simplificamos, manteniendo los tres factores del escalar.','frac{1}{27}·frac{1}{2}·2=frac{1}{27}'],
 ['Comprobamos por una segunda identidad: el producto sin escalar tiene determinante uno.','det(A^(−1)A^t)=frac{det(A^t)}{det(A)}=1'],
 ]),mk(1,'Primer determinante: −12; segundo determinante: −4.',['Primer determinante: 12; segundo determinante: −4.','Primer determinante: −12; segundo determinante: 4.','Primer determinante: −6; segundo determinante: −2.'],['Omitir el signo del intercambio de columnas del primer determinante.','Omitir el signo del intercambio de columnas del segundo.','Olvidar un factor dos en ambos cálculos.'],[
 ['Denotamos por C₁, C₂ y C₃ las columnas originales. Las propiedades de columnas permiten calcular sin conocer cada entrada.','A=(C₁,C₂,C₃); det(A)=2'],
 ['En el primer determinante extraemos el factor dos de la primera fila.','D₁=2 det([[3c,b,a],[3f,e,d],[9,2,1]])'],
 ['Su primera columna es tres veces C₃; las otras dos son C₂ y C₁. Extraemos también ese tres.','D₁=6 det(C₃,C₂,C₁)'],
 ['Intercambiar C₁ y C₃ cambia el signo una sola vez.','det(C₃,C₂,C₁)=−det(A)=−2 ⇒ D₁=−12'],
 ['En el segundo determinante, la primera columna es dos veces la diferencia C₁−C₂.','D₂=det(2(C₁−C₂),C₃,C₂)'],
 ['Usamos linealidad en una columna, sin confundirla con linealidad simultánea en toda la matriz.','D₂=2det(C₁,C₃,C₂)−2det(C₂,C₃,C₂)'],
 ['El segundo término es cero por columnas repetidas. El primero intercambia C₂ y C₃.','D₂=2(−det(A))−0=−4'],
 ['Comprobamos independientemente mediante expansión de determinantes sobre matrices de prueba con la tercera fila oficial y determinante dos.','A₀=[[1,0,0],[0,frac{2}{3},0],[1,2,3]] ⇒ det(A₀)=2; D₁=−12; D₂=−4'],
 ])];
 if(c.index===425){const p=mk(0,'Área = 2ln(2) unidades cuadradas.',['Área = −2ln(2) unidades cuadradas.','Área = ln(2) unidades cuadradas.','Área = 6ln(2) unidades cuadradas.'],['Confundir la integral con el área cuando la función es negativa.','Omitir una de las dos contribuciones logarítmicas de Barrow.','Multiplicar otra vez por tres tras realizar la descomposición.'],[
 ['Factorizamos el denominador y comprobamos que el intervalo del área no contiene polos.','x²−5x+4=(x−1)(x−4); [2;3]⊂(1;4)'],
 ['Entre dos y tres el primer factor es positivo y el segundo negativo; la función queda bajo el eje.','f(x)<0 si 2≤x≤3; Área=−∫_{2}^{3}f(x) dx'],
 ['La gráfica adjunta muestra la función, el eje y la región encerrada por las dos rectas verticales.','Límites: x=2, x=3; f(2)=f(3)=−frac{3}{2}'],
 ['Descomponemos en fracciones simples; multiplicamos por el denominador para comparar coeficientes.','frac{3}{(x−1)(x−4)}=frac{A}{x−1}+frac{B}{x−4} ⇒ 3=A(x−4)+B(x−1)'],
 ['Sustituimos las raíces para determinar los coeficientes, sin dividir por cero en la función original.','x=1 ⇒ 3=−3A ⇒ A=−1; x=4 ⇒ 3=3B ⇒ B=1'],
 ['Integramos cada cociente y conservamos el valor absoluto en los logaritmos.','H(x)=−ln|x−1|+ln|x−4|'],
 ['Aplicamos Barrow, distinguiendo los valores superior e inferior.','H(3)=−ln(2); H(2)=ln(2); ∫_{2}^{3}f(x) dx=−2ln(2)'],
 ['Cambiamos el signo para obtener la magnitud geométrica positiva y añadimos unidades.','Área=2ln(2)≈1,386294 unidades cuadradas'],
 ['Comprobamos derivando la primitiva y mediante cuadratura numérica independiente de la función original.','H′(x)=−frac{1}{x−1}+frac{1}{x−4}=frac{3}{(x−1)(x−4)}; Área>0'],
 ]);p.visual=structuredClone(areaGraph);return[p];}
 return[
 mk(0,'Integral = 2π−frac{1}{2}.',['Integral = 3π−frac{1}{2}.','Integral = 2π+frac{1}{2}.','Integral = 2π−frac{√3}{2}.'],['Omitir F(0) al evaluar la integral de f.','Cambiar el signo del término coseno.','Confundir seno y coseno en π/6.'],[
 ['Como F es una primitiva, F′=f. La continuidad permite aplicar el teorema fundamental.','∫_{0}^{π/6}f(x) dx=F(frac{π}{6})−F(0)'],
 ['Sustituimos los dos valores oficiales antes de multiplicar por tres.','F(frac{π}{6})−F(0)=π−frac{π}{3}=frac{2π}{3}'],
 ['La integral es lineal; una primitiva de cos(x) es sen(x).','I=3∫_{0}^{π/6}f(x) dx−[sen(x)]_{0}^{π/6}'],
 ['Evaluamos el seno en ambos extremos y reunimos términos.','I=3·frac{2π}{3}−(frac{1}{2}−0)=2π−frac{1}{2}'],
 ['Comprobamos con la función admisible F(x)=π/3+4x, cuya derivada es constante.','∫_{0}^{π/6}(12−cos(x)) dx=2π−frac{1}{2}'],
 ]),mk(1,'Integral = frac{3}{2}.',['Integral = frac{1}{2}.','Integral = −frac{3}{2}.','Integral = 2.'],['Omitir el valor inferior de la primitiva compuesta.','Invertir el signo de la primitiva del seno.','Usar cero como valor inferior de F en vez de π/3.'],[
 ['Reconocemos la regla de la cadena: la derivada interior F′ es precisamente f.','F′(x)=f(x)'],
 ['Construimos una primitiva compuesta y verificamos directamente su derivada.','H(x)=−cos(F(x)); H′(x)=sen(F(x))·f(x)'],
 ['Aplicamos Barrow a H; no es necesario que F sea monótona.','J=−cos(F(frac{π}{6}))+cos(F(0))'],
 ['Sustituimos los valores de F y los valores trigonométricos exactos.','J=−cos(π)+cos(frac{π}{3})=1+frac{1}{2}=frac{3}{2}'],
 ['Comprobamos por cuadratura con dos primitivas que cumplen los datos, una de ellas no monótona; ambas dan el mismo resultado.','F₁(x)=frac{π}{3}+4x; F₂(x)=frac{π}{3}+4x+sen(12x); J=1,5'],
 ])];
}
export function buildMatesBatch(id='batch-0373',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=c.index===424?['Matrices']:c.index===425?['Primitivas y métodos de integración']:['Regla de la cadena'];x.block=c.slot===1?'Álgebra':'Integrales';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===1?'MATRIX_DETERMINANT_IDENTITIES':'FUNDAMENTAL_THEOREM_AND_RATIONAL_AREA'};if(c.index===425)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_MATH_II_DEVELOPMENT';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildMatesBatch(),a='artifacts/pau-andalucia-resolution/audit/correction-0373-original-records.json';if(!fs.existsSync(a))fs.writeFileSync(a,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0373.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({exerciseId:r.exerciseId,answers:r.parts.map(p=>p.answer)}))));}
