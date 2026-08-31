import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {formulaChainStatements} from './andalucia-official-formula-chain-pdf-evidence.mjs';
export const cases=[
 {index:415,task:'polynomial-plus-reciprocal',literals:['dos parámetros reales','punto (1, 3)','a = 1 y b = 2']},
 {index:434,task:'production-chains',literals:['dos cadenas de fabricación','triple de horas','minimice los costes'],constraints:[[15,10,360],[-6,-10,-216],[-3,1,0],[-1,0,0],[0,-1,0]],objective:[300,600,0],labels:['15x+10y≤360','6x+10y≥216','y≤3x','x≥0','y≥0'],domain:{x:[0,24],y:[0,30]}},
];
export function solve(c,originalText){const text=formulaChainStatements[c.index];
 if(c.task==='polynomial-plus-reciprocal'){const p=officialParts(text);return[
  part(p[0],'a = 1; b = 2.',['a = 2; b = 1.','a = 3; b = 0.','a = −3; b = 6.'],['Intercambiar los parámetros al resolver el sistema.','Imponer solo el paso por el punto.','Cambiar el signo de la derivada del término recíproco.'],[
   ['Respetamos la estructura oficial: b está dividido por x, pero ax² no lo está. El dominio excluye cero.','f(x)=ax^{2}+frac{b}{x}; x≠0'],
   ['Pasar por el punto indicado impone una ecuación sobre los valores de la función.','f(1)=3 ⇒ a+b=3'],
   ['Derivamos cada sumando. El término b/x es b·x elevado a menos uno.','f′(x)=2ax−frac{b}{x^{2}}'],
   ['Un extremo relativo interior y derivable debe tener derivada cero.','f′(1)=0 ⇒ 2a−b=0 ⇒ b=2a'],
   ['Sustituimos en la primera ecuación y resolvemos ambos parámetros.','a+2a=3 ⇒ a=1; b=2'],
   ['La condición de derivada nula es necesaria; comprobamos que sí se produce un extremo.','f″(x)=2a+frac{2b}{x^{3}}; f″(1)=6>0'],
   ['La segunda derivada positiva demuestra un mínimo local, y la sustitución comprueba la ordenada.','f(1)=1+2=3; f′(1)=2−2=0'],
  ],'PARAMETER_LINEAR_SYSTEM_AND_SECOND_DERIVATIVE',{parameters:[1,2],system:[[1,1,3],[2,-1,0]],wrongParameters:[[2,1],[3,0],[-3,6]],secondDerivativeAtOne:6}),
  part(p[1],'Mínimo relativo en (1; 3).',['Máximo relativo en (1; 3).','Punto de inflexión en (1; 3).','No es un extremo relativo en (1; 3).'],['Invertir el criterio de la segunda derivada.','Confundir derivada primera nula con inflexión.','Omitir el cambio de signo de la derivada.'],[
   ['Sustituimos los valores que fija este apartado, independientemente de la respuesta anterior.','f(x)=x^{2}+frac{2}{x}; x≠0'],
   ['Derivamos y comprobamos que el punto es estacionario.','f′(x)=2x−frac{2}{x^{2}}; f′(1)=0'],
   ['Derivamos una segunda vez manteniendo el signo del término recíproco.','f″(x)=2+frac{4}{x^{3}}'],
   ['Aplicamos el criterio en x=1, punto interior del dominio.','f″(1)=6>0 ⇒ mínimo relativo'],
   ['Verificación alternativa: factorizamos la primera derivada.','f′(x)=frac{2(x−1)(x^{2}+x+1)}{x^{2}}'],
   ['En torno a uno el factor cuadrático y el denominador son positivos; cambia de decreciente a creciente.','x<1 ⇒ f′<0; x>1 ⇒ f′>0'],
   ['La ordenada del mínimo corresponde al punto pedido.','f(1)=3'],
  ],'SECOND_DERIVATIVE_AND_FIRST_DERIVATIVE_SIGN',{firstAtOne:0,secondAtOne:6,valueAtOne:3}),
  part(p[2],'frac{x^{3}}{3}+2 ln|x|+C, x≠0.',['frac{x^{3}}{3}+ln|x|+C, x≠0.','frac{x^{3}}{3}−frac{2}{x^{2}}+C, x≠0.','frac{x^{2}}{2}+2 ln|x|+C, x≠0.'],['Omitir el factor dos de la integral logarítmica.','Derivar el término recíproco en lugar de integrarlo.','No incrementar correctamente la potencia al integrar.'],[
   ['Separamos la integral de la suma conservando el factor constante.','∫(x^{2}+frac{2}{x}) dx = ∫x^{2} dx + 2∫frac{1}{x} dx'],
   ['Para la potencia se aumenta el exponente en uno y se divide por el nuevo exponente.','∫x^{2} dx = frac{x^{3}}{3}'],
   ['El exponente menos uno es el caso logarítmico, no la regla de potencias con denominador cero.','∫frac{1}{x} dx = ln|x|'],
   ['Sumamos y añadimos la constante de integración.','F(x)=frac{x^{3}}{3}+2 ln|x|+C'],
   ['La fórmula vale en cada intervalo del dominio; las constantes pueden ser independientes a ambos lados de cero.','x∈(−∞;0) o x∈(0;+∞)'],
   ['Comprobamos por derivación que recuperamos exactamente el integrando oficial.','F′(x)=x^{2}+frac{2}{x}'],
  ],'ANTIDERIVATIVE_VERIFIED_BY_DIFFERENTIATION',{derivativeTerms:[[1,2],[2,-1]],wrongDerivativeTerms:[[[1,2],[1,-1]],[[1,2],[4,-3]],[[1,1],[2,-1]]]}),
 ];}
 const proof=derive(c),p=part({id:'whole',prompt:originalText??text},'16 horas en A y 12 horas en B; coste mínimo 12 000 €.',[
 '6 horas en A y 18 horas en B; coste mínimo 12 600 €.','8 horas en A y 24 horas en B; coste mínimo 16 800 €.','24 horas en A y 0 horas en B; coste mínimo 7 200 €.'
 ],['Elegir el vértice de proporción y tablets sin comparar el coste.','Confundir el máximo coste entre vértices con el mínimo.','Atender solo a los portátiles e incumplir el mínimo de tablets.'],[
 ['Definimos horas extraordinarias no negativas en cada cadena; no son cantidades de portátiles.','x=horas en A; y=horas en B; x,y≥0'],
 ['La producción de portátiles tiene una cota máxima, mientras que la de tablets tiene un mínimo.','15x+10y≤360; 6x+10y≥216'],
 ['La cadena B puede trabajar como máximo el triple que A.','y≤3x'],
 ['El coste es la suma de los dos costes horarios; buscamos su mínimo.','C=300x+600y'],
 ['Representamos la intersección de semiplanos. Ningún eje contiene puntos factibles: sin B faltan tablets y sin A falla y≤3x.','y=0 ⇒ x≥36 y x≤24; x=0 ⇒ y=0'],
 ['El cruce del mínimo de tablets con la proporción fija el primer vértice.','6x+10(3x)=216 ⇒ x=6; y=18'],
 ['El cruce del máximo de portátiles con la proporción fija el segundo.','15x+10(3x)=360 ⇒ x=8; y=24'],
 ['Restamos las dos ecuaciones de producción para hallar el tercer vértice.','15x+10y=360; 6x+10y=216 ⇒ 9x=144'],
 ['Sustituimos y obtenemos las horas de B.','x=16; 96+10y=216 ⇒ y=12'],
 ['Comparamos los costes de los tres vértices de la región triangular.','C(6;18)=12600; C(8;24)=16800; C(16;12)=12000'],
 ['Una cota independiente certifica el mínimo para cualquier punto factible, no solo los vértices.','C=frac{200}{3}(6x+10y)−frac{20}{3}(15x+10y)'],
 ['Aplicamos la cota inferior al primer término y la superior al término que se resta.','C≥frac{200}{3}·216−frac{20}{3}·360=12000'],
 ['El plan alcanza esa cota, cumple ambas producciones y respeta la proporción.','15·16+10·12=360; 6·16+10·12=216; 12≤3·16'],
 ],'LINEAR_VERTICES_AND_INDEPENDENT_DUAL_LOWER_BOUND',{...proof,constraints:c.constraints,objective:c.objective,optimum:[16,12],cost:12000,wrongPoints:[[6,18],[8,24],[24,0]],dual:[200/3,20/3]});p.visual=rationalGraph(c);return[p];
}
export function buildFormulaChainBatch(id='batch-0370',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){const linear=x.correctionEvidence.parameters.index===434;x.primaryTopic=linear?'Programación lineal':'Derivadas';x.secondaryTopics=linear?['Región factible','Optimización']:['Extremos relativos','Integrales'];x.block=linear?'Sistemas/programación lineal':'Análisis';x.examSlot=linear?2:3;x.qualityGates.pedagogical='OFFICIAL_PDF_FORMULA_SCOPE_AND_COMPLETE_VERIFIED_STEPS';if(linear)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildFormulaChainBatch(),a='artifacts/pau-andalucia-resolution/audit/correction-0370-original-records.json';if(!fs.existsSync(a))fs.writeFileSync(a,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0370.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)}))));}
