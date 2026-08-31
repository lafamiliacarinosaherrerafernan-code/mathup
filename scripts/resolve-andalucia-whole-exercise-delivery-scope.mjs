import fs from 'node:fs';
import {buildWorkshopsAdvertisingBatch} from './resolve-andalucia-linear-workshops-advertising.mjs';
import {buildClientsLogisticsBatch} from './resolve-andalucia-linear-clients-logistics.mjs';
const id='batch-0348',a=buildWorkshopsAdvertisingBatch(id),b=buildClientsLogisticsBatch(id);
const batch={...a.batch,records:[...a.batch.records,...b.batch.records],executedChecks:[...a.batch.executedChecks,...b.batch.executedChecks]};
const archive='artifacts/pau-andalucia-resolution/audit/correction-0348-original-records.json';
if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify([...a.originals,...b.originals],null,2)+'\n');
fs.writeFileSync('tmp/batch-0348.json',JSON.stringify(batch,null,2)+'\n');
console.log(JSON.stringify({records:batch.records.length,whole:batch.records.filter(x=>x.deliveryScope==='WHOLE_OFFICIAL_EXERCISE').length}));
