import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8');
test('viewport gate catches an oversized grid even if its fields have no local overflow',()=>{
 const script=read('tools/andalucia-inference-delivery/frame.js');
 const condition=script.match(/for\(const b of layoutMeasurements\)if\((.*?)\)issues.push\(\{code:'VIEWPORT_CLIPPING'/)[1];
 const testBox=b=>vm.runInNewContext(condition,{b,viewportWidth:320});
 assert.equal(testBox({left:0,right:350,client:350,scroll:350}),true);
 assert.equal(testBox({left:-8,right:300,client:308,scroll:308}),true);
 assert.equal(testBox({left:0,right:320,client:320,scroll:320}),false);
 assert.match(script,/HORIZONTAL_OVERFLOW/);assert.match(script,/HIDDEN_MATH/);assert.match(script,/ANSWER_LEAK/);
});
test('iframe height is fixed before measurement and is not expanded after the evidence',()=>{
 const script=read('tools/andalucia-inference-delivery/check.js');assert.match(script,/frame.height=800/);
 assert.doesNotMatch(script,/frame.height\s*=\s*(?:r|e\.data\.result)\.height/);
});
test('only Andalusia exam cards opt into narrower grid and mobile padding',()=>{
 assert.match(read('bach-exam.js'),/question.community === 'andalucia' \? ' andalucia-exam-delivery' : ''/);
 assert.match(read('tools/andalucia-inference-delivery/frame.js'),/q.community === 'andalucia' \? ' andalucia-exam-delivery' : ''/);
 const css=read('mathup-brand.css').slice(0,1800);assert.match(css,/\.bach-exam-panel:has\(> \.andalucia-exam-delivery\)/);assert.match(css,/minmax\(0,\s*1fr\)/);
});
