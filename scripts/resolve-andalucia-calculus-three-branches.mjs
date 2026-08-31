import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
const F=(a,b)=>`frac{${a}}{${b}}`;
export const cases=[{index:107,literals:['extremos','relativos y absolutos','área del recinto']},{index:120,literals:['continuidad y derivabilidad','intervalos de crecimiento']},{index:227,literals:['continua y derivable','asíntotas']}];
export const functions={107:(x,a,b)=>x<=-2?-2*x+2*a:x<=2?-2*x*x-4*a:-8*x+b,120:x=>x<=2?-x+2:x<4?-x*x+6*x-8:(x-3)/x,227:(x,a,b)=>x<0?2+a/(x-1):a+b*Math.exp(x)};
export function solve(c,text){const ps=officialParts(text),mk=(k,a,w,reasons,steps,proof)=>part(ps[k],a,w,reasons,steps,'OFFICIAL_BRANCH_DOMAIN_JOIN_AND_INDEPENDENT_DIFFERENTIATION_INTEGRATION',proof);
 if(c.index===107)return[
 mk(0,'a=−2; b=16. No derivable en x=−2; sí en x=2.', ['a=2; b=0. No derivable en x=−2; sí en x=2.','a=−2; b=16. Derivable en x=−2 y x=2.','a=−2; b=16. No derivable en x=−2 ni en x=2.'],['Cambiar el signo al resolver la primera condición.','Suponer que continuidad implica derivabilidad.','No comparar las pendientes iguales de la segunda unión.'],[
 ['El dominio es el intervalo cerrado oficial. Solo hay que empalmar en −2 y 2.','D=[−4;3]; f₁=−2x+2a; f₂=−2x²−4a; f₃=−8x+b'],
 ['La continuidad en −2 exige igualdad de los dos valores laterales.','4+2a=−8−4a ⇒ 6a=−12 ⇒ a=−2'],
 ['En dos el valor de la parábola con ese parámetro es cero.','−8−4a=−16+b ⇒ 0=−16+b ⇒ b=16'],
 ['Derivamos las tres ramas.','f₁′=−2; f₂′=−4x; f₃′=−8'],
 ['En −2 hay una esquina: las pendientes laterales no coinciden.','f′(−2⁻)=−2; f′(−2⁺)=8 ⇒ no derivable'],
 ['En dos hay continuidad y pendientes iguales. Los extremos solo admiten derivadas laterales.','f′(2⁻)=−8=f′(2⁺); derivable en (−4;3) salvo −2'],
 ],{parameters:[-2,16],joins:[-2,2],values:[0,0],slopes:[[-2,8],[-8,-8]],wrongParameters:[2,0]}),
 mk(1,'Decrece en (−4;−2) y (0;3), crece en (−2;0). Mínimo relativo (−2;0), máximo relativo y absoluto (0;8), mínimo absoluto (3;−8).',[
 'Crece en (−4;−2) y (0;3), decrece en (−2;0). Máximo relativo (−2;0), mínimo relativo y absoluto (0;8), máximo absoluto (3;−8).',
 'Decrece en (−4;−2) y (0;3), crece en (−2;0). Mínimo relativo y absoluto (−2;0), máximo relativo y absoluto (0;8).',
 'Decrece en (−4;−2) y (0;3), crece en (−2;0). Mínimo relativo (−2;0), máximo relativo y absoluto (0;4), mínimo absoluto (3;−8).'],['Invertir los signos de la primera derivada.','No comparar el extremo derecho del dominio.','Confundir el valor en −4 con el valor del vértice.'],[
 ['Fijamos a=−2,b=16; el estudio se restringe al dominio [−4;3].','f₁=−2x−4; f₂=8−2x²; f₃=−8x+16'],
 ['La recta izquierda decrece; la parábola crece antes de cero y decrece después.','f₁′=−2; f₂′=−4x: positivo si x<0 y negativo si x>0'],
 ['La tercera rama sigue decreciendo y se une suavemente en dos.','f₃′=−8; f(2)=0; no hay extremo en 2'],
 ['El cambio de decreciente a creciente en −2 produce un mínimo relativo, aunque no exista derivada.','f(−2)=0; mínimo relativo (−2;0)'],
 ['El cambio de creciente a decreciente en cero produce un máximo relativo.','f(0)=8; máximo relativo (0;8)'],
 ['Comparamos todos los candidatos y extremos para los absolutos.','f(−4)=4; f(−2)=0; f(0)=8; f(2)=0; f(3)=−8'],
 ['El mayor es 8 y el menor es −8. Los extremos del dominio se han incluido en la comparación absoluta.','Máximo absoluto (0;8); mínimo absoluto (3;−8)'],
 ],{parameters:[-2,16],firstSamples:[[-3,-2],[-1,4],[1,-4],[2.5,-8]],candidateValues:[[-4,4],[-2,0],[0,8],[2,0],[3,-8]],relativeMinimum:[-2,0],maximum:[0,8],minimum:[3,-8]}),
 mk(2,`Área=${F(64,3)} u².`,[`Área=${F(32,3)} u².`,`Área=${F(128,3)} u².`,'Área=32 u².'],['Integrar solo la mitad del recinto simétrico.','Sumar el término cúbico en vez de restarlo.','Usar el rectángulo de base cuatro y altura ocho.'],[
 ['Entre −2 y 2 solo interviene la rama parabólica. El ejercicio oficial solicita explícitamente esta área.','f(x)=8−2x²; −2≤x≤2'],
 ['Localizamos los ceros y comprobamos que la función no es negativa en el intervalo.','8−2x²=0 ⇒ x=±2; f(0)=8>0'],
 ['El área es la integral definida, sin cambios de signo interiores.','A=∫_{−2}^{2}(8−2x²) dx'],
 ['Integramos el polinomio y comprobamos la primitiva derivándola.',`H(x)=8x−${F(2,3)}x³; H′(x)=8−2x²`],
 ['Aplicamos la regla de Barrow en ambos extremos.',`H(2)=${F(32,3)}; H(−2)=−${F(32,3)}`],
 ['Restamos y contrastamos con la simetría del recinto.',`A=${F(32,3)}−(−${F(32,3)})=${F(64,3)}=2∫_{0}^{2}(8−2x²) dx`],
 ],{interval:[-2,2],primitiveCoefficients:[0,8,0,-2/3],area:64/3,wrongAreas:[32/3,128/3,32]})];
 if(c.index===120)return[
 mk(0,`Continua salvo en x=4, con salto de 0 a ${F(1,4)}; no derivable en x=2 ni x=4.`,[
 'Continua y derivable en todo ℝ.',`Continua salvo en x=4, con salto de 0 a ${F(1,4)}; derivable en x=2.`,
 `Discontinua en x=2 y x=4; no derivable en ninguno de ellos.`],['No comparar ni los valores ni las derivadas en las uniones.','No comparar las pendientes −1 y 2 en la primera unión.','Confundir una esquina continua con una discontinuidad.'],[
 ['El denominador x solo se usa para x≥4 y nunca se anula allí.','D=ℝ; uniones x=2 y x=4'],
 ['En dos las dos fórmulas dan cero.','lim f(2⁻)=f(2)=0; lim f(2⁺)=−4+12−8=0'],
 ['En cuatro los límites son finitos pero diferentes.',`lim f(4⁻)=−16+24−8=0; f(4)=lim f(4⁺)=${F(1,4)}`],
 ['Derivamos las ramas en sus intervalos abiertos.',`f₁′=−1; f₂′=−2x+6; f₃′=${F(3,'x²')}`],
 ['En dos las pendientes laterales no coinciden.','f′(2⁻)=−1; f′(2⁺)=2 ⇒ no derivable'],
 ['En cuatro no puede ser derivable porque ya falla la continuidad.','Continua en ℝ∖{4}; derivable en ℝ∖{2;4}'],
 ],{domainExclusions:[],joinLimits:[[2,0,0],[4,0,.25]],cornerSlopes:[-1,2]}),
 mk(1,'Decrece en (−∞;2) y (3;4); crece en (2;3) y (4;+∞).',[
 'Crece en (−∞;2) y (3;4); decrece en (2;3) y (4;+∞).',
 'Decrece en (−∞;2) y (3;4); crece en (2;3); decrece en (4;+∞).',
 'Decrece en (−∞;2); crece en (2;4) y (4;+∞).'],['Invertir el signo de todas las derivadas.','Derivar 1−3/x con el signo incorrecto.','Omitir la raíz x=3 de la derivada parabólica.'],[
 ['Separamos por los cambios de fórmula y por los ceros de la derivada.','f₁′=−1; f₂′=6−2x; f₃′=3/x²'],
 ['La recta es decreciente hasta dos.','f₁′<0 para x<2'],
 ['La parábola alcanza derivada cero en tres, dentro de su tramo.','6−2x=0 ⇒ x=3'],
 ['Su derivada es positiva antes de tres y negativa después.','f′(2,5)=1>0; f′(3,5)=−1<0'],
 ['La rama racional es creciente para x>4. No unimos intervalos a través del salto.','3/x²>0; f′(5)=3/25'],
 ['Concluimos el cuadro de signos en los cuatro intervalos abiertos.','Signos: − en (−∞;2); + en (2;3); − en (3;4); + en (4;+∞)'],
 ],{firstSamples:[[1,-1],[2.5,1],[3.5,-1],[5,3/25]],critical:3}),
 mk(2,F(2,3),[F(1,3),F(4,3),F(-2,3)],['Omitir uno de los términos en la evaluación.','Duplicar el recinto sin que lo pida la integral.','Invertir los extremos de integración.'],[
 ['La integral solicitada va de dos a tres; allí rige la parábola.','I=∫_{2}^{3}(−x²+6x−8) dx'],
 ['Integramos término a término usando potencias.',`H(x)=−${F('x³',3)}+3x²−8x`],
 ['Comprobamos la primitiva de forma independiente.','H′(x)=−x²+6x−8=f(x)'],
 ['Evaluamos ambos extremos sin redondeos.',`H(3)=−6; H(2)=−${F(20,3)}`],
 ['Aplicamos Barrow y verificamos el signo con f≥0 en [2;3].',`I=−6+${F(20,3)}=${F(2,3)}>0`],
 ],{interval:[2,3],primitiveCoefficients:[0,-8,3,-1/3],integral:2/3,wrongValues:[1/3,4/3,-2/3]})];
 if(c.index===227)return[
 mk(0,'a=2; b=−2.',['a=2; b=2.','a=1; b=−1.','a=−2; b=2.'],['Perder el signo negativo de la derivada racional.','Omitir a en el valor derecho a+b.','Cambiar el signo del término constante de continuidad.'],[
 ['Cada fórmula es derivable en su tramo y el dominio total es ℝ. Solo estudiamos cero.',`f₁=2+${F('a','x−1')}; f₂=a+be^{x}`],
 ['La continuidad exige igualdad de valores laterales.','2−a=a+b ⇒ 2a+b=2'],
 ['Calculamos las derivadas de ambas fórmulas.',`f₁′=−${F('a','(x−1)²')}; f₂′=be^{x}`],
 ['En cero deben coincidir las pendientes.','−a=b'],
 ['Resolvemos las dos condiciones conjuntamente.','2a−a=2 ⇒ a=2; b=−2'],
 ['Verificamos valores y pendientes en la unión.','f(0)=0; límites=0; derivadas laterales=−2'],
 ],{parameters:[2,-2],join:0,value:0,slopes:[-2,-2],wrongParameters:[[2,2],[1,-1],[-2,2]]}),
 mk(1,'Estrictamente decreciente en todo ℝ; no tiene extremos relativos.', ['Estrictamente creciente en todo ℝ; no tiene extremos relativos.','Decrece en (−∞;0) y crece en (0;+∞); mínimo (0;0).','Crece en (−∞;0) y decrece en (0;+∞); máximo (0;0).'],['Invertir el signo de ambas derivadas.','Omitir el factor b=−2 de la exponencial.','Perder el signo negativo al derivar el cociente.'],[
 ['Usamos a=2,b=−2 y mantenemos la continuidad y derivabilidad demostradas.','f₁=2+2/(x−1); f₂=2−2e^{x}'],
 ['En el primer tramo el denominador al cuadrado es positivo.',`f₁′=−${F(2,'(x−1)²')}<0`],
 ['La exponencial es positiva, multiplicada por −2 da derivada negativa.','f₂′=−2e^{x}<0'],
 ['En cero las dos pendientes son −2 y no cambia el sentido de variación.','f(0)=0; f′(0)=−2'],
 ['Por tanto la función decrece globalmente y no tiene cambios de signo de derivada ni saltos.','Monotonía: decreciente en ℝ; extremos relativos: ninguno'],
 ],{parameters:[2,-2],firstSamples:[[-1,-.5],[0,-2],[1,-2*Math.E]],noRelativeExtrema:true}),
 mk(2,'Asíntota horizontal y=2 cuando x→−∞; ninguna vertical ni oblicua.', ['Asíntota horizontal y=2 cuando x→+∞; ninguna vertical ni oblicua.','Asíntota horizontal y=2 cuando x→−∞ y vertical x=1; ninguna oblicua.','Asíntota horizontal y=0 cuando x→−∞; ninguna vertical ni oblicua.'],['Usar la rama racional en el infinito equivocado.','Aplicar un denominador fuera del tramo donde está definido.','Omitir el término constante 2.'],[
 ['La rama racional se utiliza solo cuando x<0; su polo formal x=1 no pertenece a ese tramo.','f(1)=2−2e, finito; no hay asíntota vertical'],
 ['En cero la función es continua y finita. No hay otro punto singular.','f(0)=0'],
 ['En menos infinito la fracción tiende a cero.','lim f(−∞)=2 ⇒ asíntota horizontal y=2'],
 ['En más infinito rige la exponencial y la función tiende a menos infinito.','lim (2−2e^{x})=−∞; no hay horizontal a la derecha'],
 ['Tampoco existe una pendiente oblicua finita: el crecimiento exponencial domina a x.','lim f(x)/x=−∞ cuando x→+∞; a la izquierda f(x)/x→0'],
 ['Reunimos las conclusiones sin extrapolar una rama fuera de su intervalo.','Única asíntota: y=2 a la izquierda; sin verticales ni oblicuas'],
 ],{parameters:[2,-2],horizontalLeft:2,at1:2-2*Math.E,noVertical:true,noOblique:true})];
 throw Error('Unreviewed branches case');
}
export function buildBranchesBatch(id='batch-0325',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){const i=x.correctionEvidence.parameters.index;x.primaryTopic='Derivadas';x.secondaryTopics=['Continuidad','Derivabilidad','Monotonía',...([107,120].includes(i)?['Integrales definidas y áreas']:['Asíntotas'])];x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='COMPLETE_OFFICIAL_SUBPARTS_SOURCE_EXPLICIT_POLYNOMIAL_INTEGRALS_AND_DOMAIN_CHECKS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildBranchesBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0325-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0325.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
