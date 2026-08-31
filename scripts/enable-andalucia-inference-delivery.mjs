// Local-only bank enablement after independently bound mathematics and browser checks.
// No upload, deployment, student data, account access or canonical source modification.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {prepare,publicComponents,candidateRuntime,baselineRuntime,digest,output} from './prepare-andalucia-inference-delivery.mjs';
const read=p=>fs.readFileSync(p,'utf8');
const load=s=>{const window={};vm.runInNewContext(s,{window});return JSON.parse(JSON.stringify(window.ANDALUCIA_PAU_RUNTIME));};
export function verify(){
 const p=prepare(),candidate=candidateRuntime(p.records),proof=JSON.parse(read(`${output}/component-results.json`));
 assert.equal(proof.environment.projectionHash,digest(JSON.stringify(p)),'Stale projection');
 assert.equal(proof.environment.componentsHash,digest(publicComponents()),'Stale real application components');
 assert.equal(proof.environment.runtimeHash,digest(candidate),'Stale candidate runtime');
 assert.deepEqual(proof.environment.caseRuntimeHashes,Object.fromEntries(p.records.map(r=>[r.exerciseId,digest(candidateRuntime([r]))])),'Stale isolated case runtime');
 for(const [file,hash]of Object.entries(proof.environment.assets))assert.equal(digest(fs.readFileSync(file)),hash,`Stale asset ${file}`);
 const expected=new Set(p.records.flatMap(r=>[320,375,768,1280].map(w=>`${r.exerciseId}:${w}`)));
 for(const row of proof.rows){assert.ok(expected.delete(`${row.exerciseId}:${row.width}`));assert.deepEqual(row.issues,[]);assert.equal(row.parts,p.records.find(r=>r.exerciseId===row.exerciseId).parts.length);assert.equal(row.preAnswer.revealed,0);assert.equal(row.preAnswer.solutions,0);}
 assert.equal(expected.size,0);assert.equal(proof.rows.length,p.records.length*4);assert.equal(proof.summary.humanApprovals,0);
 const prior=baselineRuntime(read('data/andalucia-pau-runtime.js')),before=load(prior),after=load(candidate);
 assert.equal(before.exercises.length,28);assert.equal(after.exercises.length,28+p.records.length);
 assert.deepEqual(after.exercises.slice(0,28),before.exercises);
 assert.equal(new Set(after.exercises.map(r=>r.exerciseId)).size,28+p.records.length);
 assert.equal(baselineRuntime(candidate),prior,'Rollback must exactly restore the previous bank');
 return {p,candidate,prior,report:{schemaVersion:'mathup.andalucia-local-enablement.v1',initialQueue:1638,newlyEnabled:p.records.length,priorEnabled:28,totalEnabled:28+p.records.length,notYetEnabledFromQueue:1638-p.records.length,
  sourceQueueHash:digest(fs.readFileSync('artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl')),
  beforeRuntimeHash:digest(prior),afterRuntimeHash:digest(candidate),componentEvidenceHash:digest(read(`${output}/component-results.json`)),
  independentEvidenceHash:digest(read('artifacts/pau-andalucia-resolution/audit/inference-independent-evidence.json')),
  records:p.records.map(r=>({exerciseId:r.exerciseId,queueIndex:r.queueIndex,recordHash:r.resolutionEvidence.recordHash,partsHash:r.resolutionEvidence.partsHash,documentHash:r.documentHash,year:r.year,subject:r.subject,primaryTopic:r.primaryTopic,block:r.blockId,examSlot:r.examSlot,parts:r.parts.length,status:'LOCAL_ENABLED'})),
  deferred:p.deferred,checks:{original28Unchanged:true,duplicates:0,componentExecutions:proof.rows.length,componentFailures:0,sourceQueueUnmodified:true,rollbackExact:true,uploaded:false,humanApprovals:0},
  scope:'Local parallel Andalucía runtime layer only: the queue is fully classified, with resolved records enabled and genuine documentary blockers retained. No upload or remote deployment.'}};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const {p,candidate,prior,report}=verify();
 if(process.argv.includes('--apply')){
  fs.mkdirSync(output,{recursive:true});const backup=`${output}/runtime-before-inference.js`;
  if(fs.existsSync(backup))assert.equal(read(backup),prior);else fs.writeFileSync(backup,prior);
  fs.writeFileSync('data/andalucia-pau-runtime.js',candidate);
  assert.equal(digest(fs.readFileSync('data/andalucia-pau-runtime.js')),report.afterRuntimeHash);
  fs.writeFileSync(`${output}/prepared.json`,JSON.stringify(p,null,2)+'\n');
  fs.writeFileSync(`${output}/enabled-manifest.json`,JSON.stringify(report,null,2)+'\n');
 }
 console.log(JSON.stringify({applied:process.argv.includes('--apply'),...report.checks,newlyEnabled:report.newlyEnabled,totalEnabled:report.totalEnabled}));
}
