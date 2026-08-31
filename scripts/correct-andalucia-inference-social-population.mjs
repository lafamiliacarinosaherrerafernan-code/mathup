// Preserve the previous record and regenerate only its erroneous population description.
// Numeric sample, interval and sample-size calculations are unchanged.
import fs from 'node:fs';import assert from 'node:assert/strict';
import {cases,buildIntervalMarginBatch} from './resolve-andalucia-inference-interval-margin-set.mjs';
const result=buildIntervalMarginBatch('batch-0454',cases.filter(c=>c.index===947));
assert.equal(result.batch.records.length,1);
const path='artifacts/pau-andalucia-resolution/audit/correction-0454-original-records.json';
if(!fs.existsSync(path))fs.writeFileSync(path,JSON.stringify(result.originals,null,2)+'\n');
fs.writeFileSync('tmp/batch-0454.json',JSON.stringify(result.batch,null,2)+'\n');
console.log(JSON.stringify({records:1,parts:result.batch.records[0].parts.length,change:'OFFICIAL_POPULATION_CONTEXT_RESTORED',publication:'NOT_ENABLED'}));
