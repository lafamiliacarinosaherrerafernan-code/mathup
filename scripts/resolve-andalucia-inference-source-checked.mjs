import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch,evidenceCases} from './resolve-andalucia-inference-2012.mjs';
// Each parameter below is backed by the listed literal in the immutable source.
// Non-mathematical extraction defects remain explicit presentation review items.
export const cases=[
 {index:330,kind:'mean',sigma:7,n:300,center:168,confidence:.97,nextConfidence:.94,error:1.2,strict:true,unit:'cm',population:'estatura media poblacional de las mujeres',literals:['típica 7 cm','300 mujeres','media de 168 cm','97 %','94 %','inferior a 1.2 cm']},
 {index:349,kind:'mean',sigma:9,n:16,center:40,sample:[30,42,38,45,52,60,21,26,33,44,28,49,32,51,49,40],confidence:.95,nextConfidence:.98,error:2,strict:true,unit:'horas',population:'tiempo medio de estudio',literals:['varianza 81','16 alumnos','30 42 38 45 52 60 21 26 33 44 28 49 32 51 49 40','95 %','98 %','inferior a 2 horas']},
 {index:419,kind:'proportion',n:300,successes:210,center:.7,confidence:.97,nextConfidence:.97,error:.06,strict:true,knownPlanningProportion:true,unit:'proporción',population:'proporción de alumnos que lleva gafas',literals:['300 alumnos','210 llevan gafas','97 %','70 %','inferior a 0.06']},
 {index:463,kind:'proportion',n:500,successes:410,center:.82,confidence:.95,nextConfidence:.97,error:.04,strict:true,unit:'proporción',population:'proporción de jóvenes que usa la red social',literals:['500 jóvenes','410 afirman','95%','97%','inferior a 0.04']},
 {index:473,kind:'proportion',n:1500,successes:1425,center:.95,confidence:.97,nextConfidence:.97,error:.01,strict:true,unit:'proporción',population:'proporción de tornillos que cumple las especificaciones',literals:['1500 tornillos','1425 cumplen','97%','inferior al 1%']},
 {index:601,kind:'proportion',n:400,successes:320,center:.8,confidence:.92,nextConfidence:.92,error:.02,strict:true,includeError:true,unit:'unidades de proporción',population:'proporción de perros vacunados en Andalucía',literals:['400 perros','320 resultan','92%','calcule el error máximo','menor que 0.02']},
 {index:647,kind:'mean',sigma:2,n:9,center:4.322222222222222,sample:[8.5,3.7,4.3,3.6,5.6,4.8,1,1.4,6],confidence:.95,nextConfidence:.97,error:1,unit:'meses',population:'tiempo medio de espera hospitalaria',literals:['2 meses','9 pacientes','8.5  3.7  4.3  3.6  5.6','4.8  1.0','1.4  6.0','95 %','97 %','no exceda\n   de un mes']},
 {index:673,kind:'proportion',n:300,successes:12,center:.04,confidence:.97,nextConfidence:.95,error:.02,unit:'proporción',population:'proporción de viajeros en tren que lleva mascota',literals:['300 viajeros','12 de ellos','97%','95%','a lo sumo en un 2%']},
];
export function run(){
 const result=buildBatch([...evidenceCases,...cases],'batch-0240');
 const archive='artifacts/pau-andalucia-resolution/audit/correction-0240-original-records.json';
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(result.originals,null,2)+'\n');
 fs.writeFileSync('tmp/batch-0240.json',JSON.stringify(result.batch,null,2)+'\n');
 console.log(JSON.stringify({exercises:result.batch.records.length,newIndependentChecks:cases.length,checks:result.batch.executedChecks},null,2));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)run();
