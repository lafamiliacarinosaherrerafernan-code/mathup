import fs from'node:fs';import{pathToFileURL}from'node:url';import{buildBatch}from'./resolve-andalucia-inference-2012.mjs';import{part}from'./resolve-andalucia-inference-multipart.mjs';
export const observations=[
 [1040,'a23cb9ae7edcd859afee53690780388850c71ff86362f0faf67c5c9e78634241',1,'B.4','ff36ecb8dbb5678530f5cffaada33337fe7fe12bdea42ef87f9a72664950984d',0],
 [1041,'4ed7fc44fe8d81fed98763864234427004d1dfa317b5d6657c1c2da31a4c902b',1,'B.4','6129cdf78de71be60df77d0b4278637ca24c2741502314360cefc1568addf5ab',0],
 [1045,'c5a19b8d41952be5e070bc6d9a83948f6dc8e1eb323dd5b6a57f0e88559b9db3',1,'B.4','7315d29ccb4d903de78516eb658ab7adad47219eaf9b3d62fadcf7631b7d328b',0],
];
export const statements={1040:'Calcula ∫frac{e^{3x}−1}{e^x−3}dx. (Sugerencia: efectúa el cambio de variable t=e^x).',1041:'Halla ∫_{0}^{π/2}e^x cos(x)dx.',1045:'Halla la función f:ℝ→ℝ tal que f″(x)=x cos(x) y cuya gráfica pasa por los puntos (0,frac{π}{2}) y (π,2π).'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_INTEGRAL_SUBSTITUTION_PARTS_CONDITIONS_LAYOUT']]:[];
export const cases=[{index:1040,literals:['e3x − 1','ex − 3','t = ex']},{index:1041,literals:['ex cos(x) dx','Halla']},{index:1045,literals:['x cos(x)','(π, 2π)']}];
export const primitive1040=x=>.5*Math.exp(2*x)+3*Math.exp(x)+x/3+26/3*Math.log(Math.abs(Math.exp(x)-3));
export const primitive1041=x=>.5*Math.exp(x)*(Math.sin(x)+Math.cos(x));
export const function1045=x=>-x*Math.cos(x)+2*Math.sin(x)+x/2+Math.PI/2;
export const proof=c=>({1040:{quotient:[1,3],partialFractions:[1/3,26/3],excluded:Math.log(3),constant:'independent per connected component'},1041:{bounds:[0,Math.PI/2],integral:(Math.exp(Math.PI/2)-1)/2},1045:{constants:[.5,Math.PI/2],points:[[0,Math.PI/2],[Math.PI,2*Math.PI]]}}[c.index]);
export function solve(c){const mk=(a,d,r,s)=>part({id:'whole',prompt:statements[c.index]},a,d,r,s,'INDEPENDENT_DIFFERENTIATION_QUADRATURE_AND_BOUNDARY_RESIDUALS',proof(c));switch(c.index){
case 1040:return[mk('frac{1}{2}e^{2x}+3e^x+frac{x}{3}+frac{26}{3}ln|e^x−3|+C.',['frac{1}{2}e^{2x}+3e^x−frac{x}{3}+frac{26}{3}ln|e^x−3|+C.','frac{1}{2}e^{2x}+3e^x+frac{x}{3}+frac{28}{3}ln|e^x−3|+C.','frac{1}{2}e^{2x}+3e^x+frac{x}{3}−frac{26}{3}ln|e^x−3|+C.'],['Cambiar el signo del coeficiente de 1/t en fracciones simples.','Sustituir el numerador t³−1 por t³+1 al evaluar el resto.','Perder el signo del coeficiente del polo t−3.'],[
 ['Aplicamos el cambio sugerido y transformamos también el diferencial; el denominador original exige x≠ln 3.','t=e^x>0; dt=t dx; dx=frac{dt}{t}; I=∫frac{t³−1}{t(t−3)}dt'],
 ['Dividimos los polinomios y después descomponemos el resto.','frac{t³−1}{t(t−3)}=t+3+frac{9t−1}{t(t−3)}'],
 ['Igualamos numeradores para obtener los coeficientes sin adivinarlos.','9t−1=A(t−3)+Bt ⇒ −3A=−1, A+B=9 ⇒ A=frac{1}{3}, B=frac{26}{3}'],
 ['Integramos cada sumando; t es positivo, pero t−3 puede tener ambos signos.','I=frac{t²}{2}+3t+frac{1}{3}ln t+frac{26}{3}ln|t−3|+C'],
 ['Deshacemos el cambio. La constante puede ser distinta en cada componente del dominio.','I=frac{e^{2x}}{2}+3e^x+frac{x}{3}+frac{26}{3}ln|e^x−3|+C; x∈(−∞,ln3) o (ln3,∞)'],
 ['Derivamos y reunimos términos para recuperar exactamente el integrando oficial.','I′=e^{2x}+3e^x+frac{1}{3}+frac{26e^x}{3(e^x−3)}=frac{e^{3x}−1}{e^x−3}'],
 ])];
case 1041:return[mk('frac{e^{π/2}−1}{2}.',['frac{e^{π/2}+1}{2}.','e^{π/2}−1.','frac{e^π−1}{2}.'],['Sumar el extremo inferior en vez de restarlo.','Olvidar dividir entre dos al cerrar la integración por partes.','Usar π como extremo superior en lugar de π/2.'],[
 ['Llamamos I a una primitiva y aplicamos integración por partes.','I=∫e^x cos x dx; u=cos x, dv=e^x dx ⇒ I=e^x cos x+∫e^x sin x dx'],
 ['Aplicamos por partes una segunda vez al término restante.','J=∫e^x sin x dx=e^x sin x−∫e^x cos x dx=e^x sin x−I'],
 ['Sustituimos J y despejamos I; aparece dos veces la misma integral.','2I=e^x(cos x+sin x) ⇒ H(x)=frac{e^x}{2}(cos x+sin x)'],
 ['Comprobamos por derivación antes de evaluar los límites.','H′(x)=frac{e^x}{2}(cos x+sin x−sin x+cos x)=e^x cos x'],
 ['Evaluamos la primitiva en ambos extremos oficiales.','H(frac{π}{2})=frac{e^{π/2}}{2}; H(0)=frac{1}{2}'],
 ['Aplicamos la regla de Barrow y comprobamos que es positivo, como el integrando en el intervalo.','∫_{0}^{π/2}e^x cos x dx=frac{e^{π/2}−1}{2}>0'],
 ])];
case 1045:return[mk('f(x)=−x cos x+2sin x+frac{x}{2}+frac{π}{2}.',['f(x)=−x cos x+sin x+frac{x}{2}+frac{π}{2}.','f(x)=−x cos x+2sin x+x+frac{π}{2}.','f(x)=−x cos x+2sin x+frac{x}{2}−frac{π}{2}.'],['Perder una de las dos primitivas que aportan sin x.','Determinar mal la constante de la primera integración.','Cambiar el signo de la ordenada en x=0.'],[
 ['Integramos f″ por partes para obtener f′, incluyendo la primera constante.','∫x cos x dx=x sin x−∫sin x dx=x sin x+cos x; f′=x sin x+cos x+C₁'],
 ['Integramos de nuevo; el término x sin x también requiere partes.','∫x sin x dx=−x cos x+sin x; f=−x cos x+2sin x+C₁x+C₂'],
 ['El punto de abscisa cero fija C₂ de forma directa.','f(0)=C₂=frac{π}{2}'],
 ['Imponemos el segundo punto y despejamos C₁ sin confundir cos π=−1.','f(π)=π+C₁π+frac{π}{2}=2π ⇒ C₁=frac{1}{2}'],
 ['Escribimos la función y verificamos sus dos derivadas.','f=−x cos x+2sin x+frac{x}{2}+frac{π}{2}; f′=x sin x+cos x+frac{1}{2}; f″=x cos x'],
 ['Comprobamos ambos puntos; las dos condiciones determinan de manera única las dos constantes.','f(0)=frac{π}{2}; f(π)=π+frac{π}{2}+frac{π}{2}=2π'],
 ])];default:throw Error('Unknown integral source');}}
export function buildIntegralSubstitutionPartsConditionsBatch(id='batch-0466',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const definite=x.correctionEvidence.parameters.index===1041;x.primaryTopic=definite?'Integrales definidas y áreas':'Integrales indefinidas';x.secondaryTopics=[];x.block='Análisis';x.examSlot=3;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:definite?'DEFINITE_INTEGRAL_WITH_INDEPENDENT_QUADRATURE':'EXPLICIT_PRIMITIVES_WITH_INDEPENDENT_DERIVATION'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildIntegralSubstitutionPartsConditionsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0466-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0466.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
