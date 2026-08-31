import fs from 'node:fs';
import {cases,buildChainAreaWeightBatch} from './resolve-andalucia-calculus-chain-area-weight.mjs';
const result=buildChainAreaWeightBatch('batch-0347',cases.filter(c=>c.index===84));
const archive='artifacts/pau-andalucia-resolution/audit/correction-0347-original-records.json';
if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(result.originals,null,2)+'\n');
fs.writeFileSync('tmp/batch-0347.json',JSON.stringify(result.batch,null,2)+'\n');
console.log(JSON.stringify({records:result.batch.records.length,reason:'EQUIVALENT_PRODUCT_OF_FRACTIONS_ON_ORIGINAL_DOMAIN'}));
