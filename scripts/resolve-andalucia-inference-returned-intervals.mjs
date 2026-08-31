// Eight complete official a/b statements, individually checked against PDF pages.
// Answers are calculated, never copied from earlier unverified draft answers.
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch,buildParts} from './resolve-andalucia-inference-2012.mjs';
import {projectReturnedInference} from './andalucia-inference-returned-pdf-evidence.mjs';
export const cases=[
 {index:1064,kind:'proportion',n:200,successes:150,center:.75,confidence:.97,nextConfidence:.94,error:.03,unit:'proporción',population:'proporción de clientes dispuestos a pagar mediante el móvil',literals:['200','150','97 %','94 %','3 %']},
 {index:1341,kind:'proportion',n:320,successes:96,center:.3,confidence:.95,nextConfidence:.98,error:.1,strict:true,unit:'proporción',population:'proporción de personas jubiladas que realizan actividad física en el distrito',literals:['320','96','95 %','98 %','inferior a 0.1']},
 {index:1372,kind:'proportion',n:125,successes:20,center:.16,confidence:.97,nextConfidence:.94,error:.05,strict:true,unit:'proporción',population:'proporción de clientes que no han probado el nuevo helado',literals:['125','20','no lo habían probado','97 %','94 %','inferior al 5 %']},
 {index:1453,kind:'mean',sigma:6,n:64,center:35,confidence:.92,nextConfidence:.98,error:2,strict:true,unit:'puntos',population:'puntuación media de los participantes en el concurso',literals:['varianza 36','64 concursantes','35 puntos','92 %','98 %','inferior a 2 puntos']},
 {index:1542,kind:'mean',sigma:2000,n:9,center:12000,sample:[9500,10000,8500,10500,16500,10000,12000,14000,17000],confidence:.99,nextConfidence:.95,error:500,strict:true,unit:'horas',population:'vida útil media de los filtros de las máquinas de agua',literals:['2 000 horas','9 máquinas','9 500 10 000 8 500 10 500 16 500 10 000 12 000 14 000 17 000','99 %','95 %','inferior a 500']},
 {index:1544,kind:'mean',sigma:10000,n:9,center:971000/9,sample:[95000,99000,105000,106000,108000,111000,112000,115000,120000],confidence:.95,nextConfidence:.95,error:4000,unit:'euros',population:'capital medio de las hipotecas sobre fincas urbanas de Andalucía',literals:['desviación típica 10000','9 hipotecas','95000 99000 105000 106000 108000 111000 112000 115000 120000','95%','4000']},
 {index:1284,kind:'mean',sigma:11,n:10,center:991.5,sample:[980,1002,950,985,1100,1085,895,1000,912,1006],confidence:.97,nextConfidence:.94,error:5,unit:'g',population:'peso medio de las tortugas de la reserva',literals:['varianza 121g2','10 tortugas','980 1002 950 985 1100 1085 895 1000 912 1006','97%','94%','5g']},
 {index:1528,kind:'proportion',n:250,successes:90,center:.36,confidence:.97,nextConfidence:.99,error:.05,unit:'proporción',population:'proporción de accidentes debidos al uso del móvil mientras se conduce',literals:['250 accidentes','90 de ellos','97%','99%','máximo del 5%']},
];
export function solve(c,text){
 const parts=buildParts(c,projectReturnedInference(c.index,text));
 if(c.index===1453||c.index===1284)parts[0].solutionSteps.unshift({explanation:'El documento proporciona la varianza, no la desviación típica. Tomamos su raíz positiva antes de construir el intervalo.',math:`σ² = ${c.sigma*c.sigma}; σ = √(${c.sigma*c.sigma}) = ${c.sigma}`});
 return parts;
}
export function buildReturnedIntervalBatch(id='batch-0367',selected=cases){return buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildReturnedIntervalBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0367-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0367.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}
