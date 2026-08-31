// Preserve original verified mathematics; explicit primitive evaluation and
// the previously defined total T avoid unsupported evaluation bars/overflow.
import fs from 'node:fs';
import {cases as areaCases,buildSourceAreasBatch} from './resolve-andalucia-mates-source-areas.mjs';
import {cases as matrixCases,buildMatrixEquationsBatch} from './resolve-andalucia-mates-matrix-equations.mjs';
const a=buildSourceAreasBatch('batch-0389',areaCases.filter(c=>[61,66,134].includes(c.index)));
const b=buildMatrixEquationsBatch('batch-0389',matrixCases.filter(c=>c.index===149));
const batch={...a.batch,records:[...a.batch.records,...b.batch.records]};
const path='artifacts/pau-andalucia-resolution/audit/correction-0389-original-records.json';
if(!fs.existsSync(path))fs.writeFileSync(path,JSON.stringify([...a.originals,...b.originals],null,2)+'\n');
fs.writeFileSync('tmp/batch-0389.json',JSON.stringify(batch,null,2)+'\n');
console.log({records:batch.records.length,representationOnly:true});
