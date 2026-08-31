import test from 'node:test';
import assert from 'node:assert/strict';
import {auditResolution,rational,sameRational,semanticHash,historicalSlot} from '../scripts/audit-pau-andalucia-resolution.mjs';
const result=auditResolution(),s=result.summary;
test('la cola se concilia íntegra, sin identidades perdidas ni duplicadas',()=>{
 assert.equal(s.totals.queue,1638);assert.equal(s.totals.processed,1638);assert.equal(s.totals.pending,0);
 assert.equal(s.totals.generated+s.totals.documentaryBlocked,1638);
 assert.equal(new Set(result.ledger.map(x=>x.exerciseId)).size,1638);
});
test('ningún bloqueo deriva de no tener respuesta, solución u opciones históricas',()=>{
 assert.equal(s.checks.issueCounts.INVALID_ABSENCE_BLOCKER||0,0);
 assert.ok(result.ledger.filter(x=>x.state==='DOCUMENTARY_REVIEW_REQUIRED').every(x=>x.blockerEvidence&&x.blockerCodes.length));
});
test('identidad, hash de enunciado y procedencia permanecen trazables',()=>{
 for(const c of ['PROMPT_HASH_MISMATCH','QUEUE_INDEX_MISMATCH','PROVENANCE_MISMATCH','NOT_IN_QUEUE','DUPLICATE_IDENTITY'])assert.equal(s.checks.issueCounts[c]||0,0,c);
});
test('el replay determinista de los lotes reconstruye exactamente el estado final',()=>assert.equal(s.checks.replayMatches,true));
test('el informe no certifica por inferencia matemática, pedagogía ni publicación',()=>{
 assert.equal(s.totals.enabledByThisPhase,0);
 assert.ok(result.ledger.every(x=>x.publicationAuthorized===false));
 assert.ok(result.ledger.filter(x=>x.state==='GENERATED_AWAITING_QUALITY_GATES').every(x=>x.mathematicalCertification==='NOT_ESTABLISHED_BY_THIS_AUDIT'&&x.renderCertification==='NOT_ESTABLISHED_BY_THIS_AUDIT'));
});
test('comparación exacta de opciones racionales sin ejecutar contenido',()=>{
 assert.equal(sameRational('1/2','0,5'),true);assert.equal(sameRational('50%','0.5'),true);
 assert.equal(sameRational('−1/2','-0,5'),true);assert.equal(sameRational('1/3','0.333'),false);
 assert.equal(sameRational('x+x','2x'),null);assert.equal(rational('1/0'),null);assert.equal(rational('process.exit()'),null);
});
test('cobertura por año y materia suma el censo completo',()=>{
 assert.equal(s.coverage.reduce((n,x)=>n+x.total,0),1638);
 assert.deepEqual([...new Set(s.coverage.map(x=>x.year))].sort((a,b)=>a-b),Array.from({length:17},(_,i)=>2010+i));
});
test('auditoría reproducible sin depender de fecha ni orden de claves',()=>{
 assert.equal(auditResolution().summary.auditSemanticHash,s.auditSemanticHash);
 assert.equal(semanticHash({b:1,a:2}),semanticHash({a:2,b:1}));
});
test('se conserva la arquitectura histórica distinta de Matemáticas II y CCSS II',()=>{
 assert.equal(historicalSlot('Matemáticas II','Álgebra'),1);
 assert.equal(historicalSlot('Matemáticas II','Integrales'),3);
 assert.equal(historicalSlot('Matemáticas II','Probabilidad/estadística'),5);
 assert.equal(historicalSlot('Matemáticas Aplicadas a las CCSS II','Matrices'),1);
 assert.equal(historicalSlot('Matemáticas Aplicadas a las CCSS II','Análisis'),3);
 assert.equal(historicalSlot('Matemáticas Aplicadas a las CCSS II','Probabilidad o estadística'),4);
 assert.equal(historicalSlot('Matemáticas II','Análisis'),null);
 assert.equal(s.checks.issueCounts.HISTORICAL_SLOT_MISMATCH||0,0);
});
