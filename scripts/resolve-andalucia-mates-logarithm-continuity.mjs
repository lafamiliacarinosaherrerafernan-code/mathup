// Two fully page-inspected Math II exercises. Original source records are never overwritten.
import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
 [472,'484da7ba05f38869d6934dae372158991418ca8556e3a834a80895bfca1b117e',1,'A.1','063b7e1d1509447966497fa8bbf83a6380534f2290e0f232e7e8eff78cd38511',0],
 [475,'62a1d9074de55299d71cdeb9a0ce1c0bd8d749e8b1baa30fb379ef400b4e7387',1,'A.1','58fdaef012a090e12a1a2da4e7de42085ca9f01e5f0d520755952e76c287fdf4',0],
];
export const statements={
 472:'Sea la función f:(0;+∞)→ℝ definida por f(x)=frac{ln(x)}{x}, donde ln denota logaritmo neperiano.\na) [1 punto] Estudia y determina las asíntotas de la gráfica de f.\nb) [1,5 puntos] Halla los extremos relativos (abscisas donde se obtienen y valores que se alcanzan) y los intervalos de crecimiento y de decrecimiento de f.',
 475:'Se sabe que la función f:ℝ→ℝ dada por\nf(x)={3x+2 si x<0; x²+2a cos(x) si 0≤x<π; ax²+b si x≥π}\nes continua.\na) [1,5 puntos] Determina a y b.\nb) [1 punto] Estudia la derivabilidad de f.',
};
export const cases=[{index:472,literals:['ln(x)','neperiano','extremos relativos'],topic:'Derivadas'},{index:475,literals:['3x + 2','2 a cos(x)','es continua','derivabilidad'],topic:'Derivadas'}];
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_LOGARITHM_PIECEWISE_SOURCE_LAYOUT']]:[];
export const logFunction=x=>Math.log(x)/x,logDerivative=x=>(1-Math.log(x))/(x*x);
export const branches=(x,a=1,b=-2)=>x<0?3*x+2:x<Math.PI?x*x+2*a*Math.cos(x):a*x*x+b;
export function continuityResiduals(a,b){return[2*a-2,a*Math.PI**2+b-(Math.PI**2-2*a)];}
export function proof(c){if(c.index===472){assert.equal(logDerivative(Math.E),0);return{verticalAsymptote:0,horizontalAsymptote:0,maximum:[Math.E,1/Math.E],derivativeSamples:[.1,1,2,3,10].map(x=>[x,logDerivative(x)]),nearZero:[.01,.001].map(logFunction),largeX:[1e3,1e6].map(logFunction),wrongExtrema:[[1,0],[Math.E,Math.E],[Math.E,-1/Math.E]]};}
 assert.equal(c.index,475);assert.deepEqual(continuityResiduals(1,-2),[0,0]);return{a:1,b:-2,joinZero:[3,0],joinPi:[2*Math.PI,2*Math.PI],wrongParameters:[[1,2],[-1,2],[2,-4]],wrongDerivativeSets:['R','R except pi','R except zero and pi']};}
export function solve(c){const ps=officialParts(statements[c.index]),ev=proof(c),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'ANALYTIC_LIMITS_AND_ONE_SIDED_DIFFERENCE_QUOTIENT_CHECKS',ev);
 if(c.index===472)return[
 mk(0,'Asíntotas: vertical x=0; horizontal y=0. Sin oblicuas.',['Asíntotas: vertical x=1; horizontal y=0. Sin oblicuas.','Asíntotas: vertical x=0; horizontal y=1. Sin oblicuas.','Sin asíntota vertical; horizontal y=0. Sin oblicuas.'],['Confundir el cero del logaritmo con un punto excluido del dominio.','Confundir el límite de ln(x) con el del cociente.','Omitir el extremo abierto x=0 del dominio.'],[
 ['El dominio oficial exige x>0. Dentro de él el cociente es continuo; solo examinamos el extremo cero y el infinito positivo.','D=(0;+∞)'],
 ['Cuando x se aproxima a cero por la derecha, el numerador tiende a menos infinito y el denominador es positivo y tiende a cero.','lim_{x→0⁺}frac{ln(x)}{x}=−∞'],
 ['Este límite demuestra la asíntota vertical; x=1 pertenece al dominio y no puede ser una asíntota vertical.','x=0; f(1)=0'],
 ['En infinito aparece una indeterminación infinito entre infinito. Aplicamos la regla de L’Hôpital a funciones derivables con denominador de derivada no nula.','lim_{x→+∞}frac{ln(x)}{x}=lim_{x→+∞}frac{1/x}{1}=0'],
 ['El límite finito demuestra la asíntota horizontal. No hay una oblicua de pendiente no nula: el cociente f(x)/x tiende a cero.','y=0; lim_{x→+∞}frac{ln(x)}{x²}=0'],
 ['Comprobamos los signos y el comportamiento numérico solo como control de los límites ya demostrados.','f(0,001)≈−6907,755; f(10⁶)≈0,000013816'],
 ]),mk(1,'Crece en (0;e), decrece en (e;+∞); máximo en (e;frac{1}{e}). Sin mínimos.',['Crece en (0;1), decrece en (1;+∞); máximo en (1;0). Sin mínimos.','Decrece en (0;e), crece en (e;+∞); mínimo en (e;frac{1}{e}). Sin máximos.','Crece en (0;e), decrece en (e;+∞); máximo en (e;e). Sin mínimos.'],['Imponer ln(x)=0 en lugar de 1−ln(x)=0.','Invertir el signo de la derivada.','Evaluar incorrectamente ln(e)/e.'],[
 ['Aplicamos la regla del cociente mostrando ambos términos del numerador.','f′(x)=frac{(1/x)x−ln(x)}{x²}=frac{1−ln(x)}{x²}'],
 ['El denominador es estrictamente positivo en el dominio. Los ceros de la derivada vienen del numerador.','1−ln(x)=0 ⇔ ln(x)=1 ⇔ x=e'],
 ['El logaritmo es creciente, por lo que el numerador es positivo antes de e y negativo después.','0<x<e ⇒ f′(x)>0; x>e ⇒ f′(x)<0'],
 ['La función crece y luego decrece. El cambio de signo positivo a negativo prueba un máximo, no un mínimo.','Crecimiento: (0;e); decrecimiento: (e;+∞)'],
 ['Evaluamos la función original en la abscisa crítica para dar también la ordenada solicitada.','f(e)=frac{ln(e)}{e}=frac{1}{e}'],
 ['No existen otros puntos críticos ni extremos interiores. Los extremos abiertos del dominio no son mínimos alcanzados.','Máximo relativo y absoluto: (e;frac{1}{e}); sin mínimos'],
 ['La derivada calculada se contrasta con cocientes incrementales a ambos lados del máximo; la derivada segunda confirma su naturaleza.','f″(x)=frac{2ln(x)−3}{x³}; f″(e)=−frac{1}{e³}<0'],
 ])];
 return[
 mk(0,'a=1; b=−2.',['a=1; b=2.','a=−1; b=2.','a=2; b=−4.'],['Cambiar el signo de cos(π).','Cambiar el signo de cos(0).','Olvidar el factor dos en el valor de la rama central en cero.'],[
 ['Cada rama es continua en su intervalo; la continuidad global impone igualdad de valores en 0 y π.','Uniones: x=0 y x=π'],
 ['En cero calculamos el límite izquierdo y el valor de la rama central, que incluye cero.','lim_{x→0⁻}(3x+2)=2; f(0)=2a cos(0)=2a'],
 ['La igualdad de ambos fija el primer parámetro de forma única.','2a=2 ⇒ a=1'],
 ['En π la rama central aporta el límite izquierdo, mientras el valor pertenece a la última rama.','lim_{x→π⁻}(x²+2a cos(x))=π²−2a; f(π)=aπ²+b'],
 ['Igualamos y sustituimos a=1 sin cambiar la potencia cuadrada de la última rama.','π²−2=π²+b ⇒ b=−2'],
 ['Comprobamos ambas uniones directamente con los parámetros obtenidos.','x=0: 2=2; x=π: π²−2=π²−2'],
 ]),mk(1,'Derivable en ℝ excepto x=0; f′(π)=2π.',['Derivable en todo ℝ; f′(π)=2π.','Derivable en ℝ excepto x=π; f′(0)=0.','No derivable en x=0 ni en x=π.'],['Considerar que continuidad implica derivabilidad.','Intercambiar la unión con esquina y la unión suave.','Suponer que toda unión entre fórmulas distintas impide derivar.'],[
 ['Usamos los parámetros demostrados en a). Las tres fórmulas son derivables en los interiores de sus tramos.','a=1; b=−2'],
 ['Derivamos cada rama conservando el factor de la regla de la cadena del coseno.','f′(x)=3 si x<0; f′(x)=2x−2sen(x) si 0<x<π; f′(x)=2x si x>π'],
 ['La continuidad en cero está probada, pero debemos comparar las dos derivadas laterales.','f′₋(0)=3; f′₊(0)=0−2sen(0)=0'],
 ['Al ser diferentes, existe una esquina y no hay derivada en cero. Esto no afecta a la continuidad.','3≠0 ⇒ f′(0) no existe'],
 ['En π calculamos ambas derivadas laterales de la función continua.','f′₋(π)=2π−2sen(π)=2π; f′₊(π)=2π'],
 ['Coinciden, por lo que la derivada sí existe en π. No hay otros puntos problemáticos.','Dominio de f′: ℝ∖{0}; f′(π)=2π'],
 ['Verificamos con cocientes incrementales de la función original, sin confundirlos con límites de la propia función.','frac{f(h)−f(0)}{h}→3 si h→0⁻ y →0 si h→0⁺'],
 ['En la segunda unión los dos cocientes tienden al mismo valor, lo que confirma la derivabilidad.','frac{f(π+h)−f(π)}{h}→2π por ambos lados'],
 ])];
}
export function buildLogContinuityBatch(id='batch-0378',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){x.primaryTopic='Derivadas';x.secondaryTopics=['Límites y continuidad'];x.block='Análisis';x.examSlot=2;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'LOGARITHMIC_ASYMPTOTES_AND_PIECEWISE_DIFFERENTIABILITY'};x.qualityGates.pedagogical='FULL_LIMITS_MONOTONICITY_AND_ONE_SIDED_DERIVATIVES';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildLogContinuityBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0378-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0378.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
