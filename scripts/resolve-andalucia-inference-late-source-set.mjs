// Newly resolved official statements. No previous answers are used as inputs.
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch,buildParts,compute} from './resolve-andalucia-inference-2012.mjs';
export const cases=[
 {index:1294,kind:'mean',sigma:.18,n:9,center:11.72/9,sample:[1.3,1.2,1.4,1.27,1.25,1.32,1.37,1.38,1.23],confidence:.95,nextConfidence:.95,error:.08,unit:'euros/litro',population:'media poblacional del precio del litro de gasolina',literals:['9 estaciones','1.3, 1.2, 1.4, 1.27, 1.25, 1.32, 1.37, 1.38, 1.23','0.18 euros','95%','no superior a 0.08']},
 {index:1343,kind:'proportion',n:100,successes:25,center:.25,confidence:.95,nextConfidence:.925,error:.03,strict:true,planningProportion:.2,unit:'proporción',population:'proporción de universitarios que desayunan en la cafetería',literals:['100 estudiantes','25 desayunan','95 %','es de 0.2','inferior a 0.03','92.5 %']},
 {index:1362,kind:'proportion',n:540,successes:378,center:.7,confidence:.97,nextConfidence:.97,error:.03,unit:'proporción',population:'proporción de mayores de cuarenta y cinco años con presbicia',literals:['540 personas','378 tienen presbicia','97%','a lo sumo en un 3%']},
 {index:1366,kind:'mean',sigma:15,n:100,center:800,confidence:.92,nextConfidence:.92,error:2,strict:true,unit:'MPa',population:'resistencia media poblacional a la ruptura de las herramientas',literals:['15MPa','100 herramientas','800MPa','92%','menor que 2MPa']},
 {index:1374,kind:'mean',sigma:5,n:100,center:48,confidence:.95,nextConfidence:.95,error:.5,strict:true,unit:'cl',population:'contenido medio poblacional de las botellas',literals:['100 botellas','48 cl','típica 5 cl','95%','inferior a 0.5 cl']},
 {index:1494,kind:'proportion',n:500,successes:175,center:.35,confidence:.94,nextConfidence:.94,error:.02,unit:'proporción',population:'proporción poblacional de hembras de la piscifactoría',literals:['500 peces','175 hembras','94%','error máximo de 0.02']},
];
export function buildLateParts(c,text){
 const parts=buildParts(c,text);
 if(c.planningProportion!==undefined){
  const planning={...c,center:c.planningProportion};
  parts[1]=buildParts(planning,text)[1];
  parts[1].solutionSteps[0].explanation='El apartado b) proporciona una proporción muestral distinta para planificar la nueva muestra. Usamos ese valor explícito, no la frecuencia del apartado a).';
  parts[1].verification.numericalEvidence.planningProportion=c.planningProportion;
 }
 return parts;
}
export function buildLateSourceBatch(id='batch-0271',selected=cases){return buildBatch(selected,id,buildLateParts,(c,r)=>({values:compute(c),planningValues:compute({...c,center:c.planningProportion??c.center}),parts:r.parts.map(p=>p.verification)}));}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildLateSourceBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0271-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0271.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({index:r.correctionEvidence.parameters.index,answers:r.parts.map(p=>p.answer)})),null,2));}
