import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {part} from './resolve-andalucia-inference-multipart.mjs';
import {renderPolynomialGraph} from './resolve-andalucia-calculus-graph-branches.mjs';

// The official source fixes the total investment. Its feasible set is a
// closed segment, not the area of a polygon or an integer-only search.
export const cases=[{index:1602,literals:['100000 €','2% y del 2.5%','mínima de 10000 €','supere el triple'],total:100000,minimumB:10000,maximumRatio:3,rates:[.02,.025]}];
export const graph={schemaVersion:'mathup.calculus-graph.v1',plotVersion:'linear-investment-segment-v1',index:1602,xRange:[0,100],yRange:[0,100],step:[20,20],axisLabels:['A, miles de euros','B, miles de euros'],pieces:[{range:[25,90],coefficients:[100,-1],leftClosed:true,rightClosed:true,label:'Región factible: segmento cerrado; A+B=100 (miles de euros)',color:'#075597'}],points:[{xy:[25,75],label:'(25;75), máximo',dx:12,dy:-13},{xy:[90,10],label:'(90;10)',dx:-12,dy:-13}]};
export function renderInvestmentSegment(s){assert.deepEqual(s,graph);return renderPolynomialGraph(s);}
export function calculate(c){const lowerA=c.total/(1+c.maximumRatio),upperA=c.total-c.minimumB;return {lowerA,upperA,optimum:[lowerA,c.total-lowerA],profit:c.rates[0]*lowerA+c.rates[1]*(c.total-lowerA),slope:c.rates[0]-c.rates[1]};}
export function solve(c,text){const v=calculate(c);assert.equal(v.profit,2375);
 const p=part({id:'whole',prompt:text},'Invertir 25 000 € en A y 75 000 € en B; beneficio máximo 2 375 €.',[
  'Invertir 90 000 € en A y 10 000 € en B; beneficio máximo 2 050 €.',
  'Invertir 50 000 € en A y 50 000 € en B; beneficio máximo 2 250 €.',
  'Invertir 0 € en A y 100 000 € en B; beneficio máximo 2 500 €.',
 ],['Elegir la inversión mínima en B aunque tiene mayor rentabilidad.','Repartir por igual sin optimizar la rentabilidad.','Invertir todo en B olvidando su límite relativo de riesgo.'],[
  ['Definimos las inversiones en euros. Se reparte el capital completo entre los dos productos.','x=inversión en A; y=inversión en B; x+y=100000'],
  ['Traducimos las restricciones de inversión y riesgo, sin añadir integridad.','x,y≥0; y≥10000; y≤3x'],
  ['Sustituimos el capital restante en B para reducir las restricciones a una variable.','y=100000−x'],
  ['La inversión mínima en B impone una cota superior a A.','100000−x≥10000 ⇒ x≤90000'],
  ['El límite de riesgo impone una cota inferior a A.','100000−x≤3x ⇒ x≥25000'],
  ['La región factible es el segmento cerrado entre ambos extremos, no una región con área. La gráfica expresa las cantidades en miles de euros.','25000≤x≤90000; extremos (25000;75000) y (90000;10000)'],
  ['Convertimos los porcentajes a tasas y formulamos el beneficio.','R=0,02x+0,025y'],
  ['Al sustituir y, el beneficio decrece estrictamente con x. Por tanto, el máximo único está en su menor valor permitido.','R(x)=2500−0,005x; R′(x)=−0,005<0'],
  ['Calculamos la distribución y el beneficio óptimos.','x=25000; y=75000; R=500+1875=2375 €'],
  ['Una cota independiente verifica el máximo para todos los puntos del segmento.','2375−R=0,005(x−25000)≥0'],
  ['Comprobamos capital, mínimo y riesgo. La igualdad de la cota solo se alcanza en la distribución indicada.','25000+75000=100000; 75000≥10000; 75000=3·25000'],
 ],'CONTINUOUS_SEGMENT_MONOTONICITY_AND_INDEPENDENT_GLOBAL_BOUND',{...v,wrongPoints:[[90000,10000],[50000,50000],[0,100000]],rates:c.rates,total:c.total});
 p.visual=structuredClone(graph);return[p];
}
export function buildInvestmentSegmentBatch(id='batch-0349',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){assert.equal(x.sourceSubparts.length,0);x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.primaryTopic='Programación lineal';x.block='Sistemas/programación lineal';x.examSlot=2;x.secondaryTopics=['Optimización','Región factible'];x.qualityGates.pedagogical='OFFICIAL_FIXED_CAPITAL_CONTINUOUS_CLOSED_SEGMENT_AND_GLOBAL_PROFIT_BOUND';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildInvestmentSegmentBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0349-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0349.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:1}));}
