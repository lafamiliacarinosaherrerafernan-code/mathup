// Six complete official statements individually compared with their PDF pages.
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildConfidenceBatch} from './resolve-andalucia-inference-confidence-and-tests.mjs';
export const cases=[
 {index:232,task:'test',whole:true,kind:'mean',populationVariance:25,sigma:5,n:36,center:748,nullValue:750,tail:'both',levels:[.05],unit:'ml',literals:['750 ml','36 botellas','748 ml','varianza 25','bilateral','0.05'],contextConclusions:['Se rechaza que el contenido medio sea 750 ml. Los datos no respaldan el funcionamiento correcto de la envasadora al nivel del 5%.']},
 {index:913,task:'test',whole:true,kind:'mean',sigma:6,n:64,center:172,nullValue:170,tail:'right',levels:[.01],unit:'cm',literals:['media 170 cm','desviación típica 6 cm','64 estudiantes','172 cm','1%'],contextConclusions:['Al nivel del 1% hay evidencia de que la talla media de los universitarios ha aumentado por encima de 170 cm.']},
 {index:1025,task:'test',whole:true,kind:'mean',sigma:6,n:100,center:108,nullValue:110,tail:'left',levels:[.05],unit:'g',literals:['no inferior a 110 g','100 pájaros','108 g','típica igual a 6 g','5%'],contextConclusions:['Los datos respaldan la afirmación de los biólogos: el peso medio ha descendido por debajo de 110 g. El contraste no demuestra por sí solo cuál es la causa del descenso.']},
 {index:1093,task:'test',whole:true,kind:'mean',sigma:2,n:100,center:38,nullValue:40,tail:'left',levels:[.05],unit:'mensajes/día',literals:['no es inferior a 40','100 jóvenes','38 mensajes','típica 2','5%'],contextConclusions:['Se rechaza la afirmación del artículo de que la media no es inferior a 40: los datos aportan evidencia de una media menor.']},
 {index:1193,task:'test',kind:'mean',populationVariance:2.25,sigma:1.5,n:10,center:12.58,sample:[12.5,11.8,13.1,14.3,11.7,12.6,12.7,12.1,13.5,11.5],nullValue:11.7,tail:'right',levels:[.05,.03],unit:'cm',literals:['varianza 2.25 cm2','11.7 cm','12.5 11.8 13.1 14.3 11.7 12.6 12.7 12.1 13.5 11.5','5%','3%'],contextConclusions:['Al 5% se rechaza la sospecha de que la media no supera 11,7 cm: existe evidencia de un diámetro medio superior.','Al 3% no se rechaza esa sospecha; es compatible con la muestra. Esto no confirma que sea verdadera ni asigna una probabilidad a H₀. El valor p está entre 0,03 y 0,05.']},
 {index:1232,task:'test',whole:true,kind:'proportion',n:500,successes:340,center:.68,nullValue:.7,tail:'both',levels:[.01],literals:['70%','500 familias','340','0.01'],contextConclusions:['La afirmación sociológica del 70% no se rechaza al 1%: resulta compatible con la muestra. No se puede concluir que sea cierta con certeza a partir de no rechazarla.']},
];
export const sourceImages={232:'ccdc7b0ca5166b86bdccc3b01a064cf6c362bba1f06cae43cb34e74cd32273b9',913:'abbbcbf69e38b7ec0d42cd4042559d875733d5bd6b1e0d8daec6b606e23b1cfc',1025:'7114682cabd2ab655a1c04d57248598900afb3281918bef9573d6f0aa0d9f04c',1093:'ff74a2326dc2904737239c5752b36fc5b8b8a5df9a177c565360c5f88050456d',1193:'1b79ebf25178d936b2f57f388b5e09a1a518560d34666cca1e70c6a850044438',1232:'4935921716872e604909a6b1457be0178fe51c8d23ce56598fc741afd9e58608'};
export const buildOfficialHypothesisBatch=(id='batch-0251',selected=cases)=>buildConfidenceBatch(id,selected);
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const id=process.argv[2]??'batch-0251',r=buildOfficialHypothesisBatch(id),archive=`artifacts/pau-andalucia-resolution/audit/correction-${id.slice(6)}-original-records.json`;
 if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');
 fs.writeFileSync(`tmp/${id}.json`,JSON.stringify(r.batch,null,2)+'\n');
 console.log(JSON.stringify(r.batch.records.map(x=>({index:x.correctionEvidence.parameters.index,answers:x.parts.map(p=>p.answer)})),null,2));
}
