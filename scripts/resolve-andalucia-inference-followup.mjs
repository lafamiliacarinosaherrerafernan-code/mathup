import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
// Parameters individually read from the official statements, never from old answers.
export const cases=[
 {index:59,kind:'proportion',n:100,successes:45,center:45/100,confidence:.92,nextConfidence:.92,error:.05,strict:true,unit:'proporción',population:'proporción de adultos que rechazan la central nuclear',literals:['100 individuos','45 de ellos','92 %','inferior al 5 %']},
 {index:87,kind:'proportion',n:120,successes:96,center:96/120,confidence:.95,nextConfidence:.97,error:.05,unit:'proporción',population:'proporción de clientes que volverían a solicitar los servicios',literals:['120 clientes','96 respondieron','95%','97%','máximo del 5%']},
 {index:132,kind:'proportion',n:50,successes:11,center:11/50,confidence:.92,nextConfidence:.92,error:.03,strict:true,unit:'proporción',population:'proporción de hospitalizados por causas relacionadas con el tabaco',literals:['50 expedientes','22 %','92 %','inferior al 3 %']},
 {index:172,kind:'mean',sigma:.36,n:10,center:2.868,sample:[2.71,3.84,3.26,2.28,2.86,3.08,3.07,2.46,2.54,2.58],confidence:.935,nextConfidence:.935,error:.05,strict:true,unit:'minutos',population:'media de los tiempos del atleta',literals:['2.71 3.84 3.26 2.28 2.86 3.08 3.07 2.46 2.54 2.58','0.36 minutos','93.5%','inferior a 0.05']},
 {index:199,kind:'mean',sigma:.04,n:60,center:1.73,confidence:.97,nextConfidence:.97,amplitude:.08,error:.04,strict:true,unit:'metros',population:'media poblacional de las estaturas',literals:['0.04 m','60 personas','1.73 m','97%','amplitud','0.08 m']},
 {index:201,kind:'proportion',n:60,successes:16,center:16/60,confidence:.90,nextConfidence:.90,error:.1,strict:true,unit:'proporción',population:'proporción de empleados que usan lentillas',literals:['60 empleados','16 usan','90 %','inferior a 0.1']},
 {index:204,kind:'proportion',n:50,successes:12,center:12/50,confidence:.95,nextConfidence:.95,amplitude:.2,error:.1,unit:'proporción',population:'proporción de imprentas que usan celulosa reciclada',literals:['50 imprentas','12 que usan','95 %','amplitud del intervalo','máximo de 0.2']},
 {index:221,kind:'proportion',n:100,successes:36,center:36/100,confidence:.92,nextConfidence:.92,error:.025,unit:'proporción',population:'proporción de jóvenes suscritos a la plataforma',literals:['100 jóvenes','36 afirman','92%','0.025']},
 {index:252,kind:'proportion',n:400,successes:160,center:160/400,confidence:.90,nextConfidence:.90,error:.1,unit:'proporción',population:'proporción de habitantes que navegan semanalmente',literals:['400 habitantes','160 afirman','90%','error de 0.1']},
];
export function run(){
 const result=buildBatch(cases,'batch-0239');
 const archive='artifacts/pau-andalucia-resolution/audit/correction-0239-original-records.json';
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(result.originals,null,2)+'\n');
 fs.writeFileSync('tmp/batch-0239.json',JSON.stringify(result.batch,null,2)+'\n');
 console.log(JSON.stringify({exercises:result.batch.records.length,checks:result.batch.executedChecks},null,2));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)run();
