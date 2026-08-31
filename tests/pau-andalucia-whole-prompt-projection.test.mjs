import test from 'node:test';
import assert from 'node:assert/strict';
import {validateWholeExercisePrompt} from '../scripts/prepare-andalucia-inference-delivery.mjs';
const record=prompt=>({sourceLiteral:'historical extraction',parts:[{partId:'whole',prompt}]});
const evidence={text:'full official projection',evidence:{page:1,pngHash:'verified-page-hash'},changes:[{before:'historical extraction',after:'full official projection'}]};
test('whole prompt accepts the preserved literal or a complete source-bound page projection',()=>{
 validateWholeExercisePrompt(record('historical extraction'),{});
 validateWholeExercisePrompt(record('full official projection'),evidence);
});
test('whole prompt rejects partial, invented, or unsupported projections',()=>{
 assert.throws(()=>validateWholeExercisePrompt(record('partial'),evidence));
 assert.throws(()=>validateWholeExercisePrompt(record(evidence.text),{...evidence,changes:[]}));
 assert.throws(()=>validateWholeExercisePrompt(record(evidence.text),{...evidence,evidence:{}}));
});
test('whole prompt does not bypass the separate native DOC projection validation',()=>{
 const r=record(evidence.text);r.parts[0].promptRepresentationEvidence={original:r.sourceLiteral,projected:evidence.text};
 assert.throws(()=>validateWholeExercisePrompt(r,evidence));
});
