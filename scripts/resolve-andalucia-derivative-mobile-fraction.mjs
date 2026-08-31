// Same derivative and distractors, factored within their existing domain.
// Preserve the previously rendered record before consuming the new batch.
import fs from 'node:fs';
import {cases,buildChainAreaWeightBatch} from './resolve-andalucia-calculus-chain-area-weight.mjs';
const result=buildChainAreaWeightBatch('batch-0342',cases.filter(c=>c.index===84));
const archive='artifacts/pau-andalucia-resolution/audit/correction-0342-original-records.json';
if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(result.originals,null,2)+'\n');
fs.writeFileSync('tmp/batch-0342.json',JSON.stringify(result.batch,null,2)+'\n');
console.log(JSON.stringify({records:result.batch.records.length,reason:'ALGEBRAIC_FACTOR_CANCELLATION_WITH_UNCHANGED_DOMAIN'}));
