import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {cases,derivativeSpecs,compactDerivatives,buildDerivativeBatch,explicitDerivativeRule} from '../scripts/resolve-andalucia-calculus-derivatives-official.mjs';
test('quotient rule keeps the full fourth power in the denominator',()=>{
 assert.equal(explicitDerivativeRule('(eᵘ/v³)′=eᵘ(u′v−3v′)/v⁴'),'(frac{e^{u}}{v³})′=frac{e^{u}(u′v−3v′)}{v⁴}');
 for(const r of buildDerivativeBatch('presentation-regression').batch.records)for(const p of r.parts)for(const s of p.solutionSteps)assert.doesNotMatch(s.math,/eᵘ\(u′v−3v′\)\/v⁴/);
});
import {derivativeObservations,derivativeReplacements} from '../scripts/andalucia-calculus-derivatives-pdf-evidence.mjs';
const rows=()=>buildDerivativeBatch('derivative-test').batch.records;
const at=(r,i,k)=>r.find(x=>x.correctionEvidence.parameters.index===i).parts[k].verification.numericalEvidence;
const close=(a,b,t=2e-6)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(a),Math.abs(b)),`${a} != ${b}`);
const df=(f,x,h=1e-5)=>(-f(x+2*h)+8*f(x+h)-8*f(x-h)+f(x-2*h))/(12*h);
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
// Independent small expression evaluator: tests the ACTUAL displayed formula,
// including abbreviated definitions, not a duplicate predeclared derivative.
function evaluate(expression,env){
 const src=expression.replace(/[²³⁴⁵]/g,c=>'^'+({'²':2,'³':3,'⁴':4,'⁵':5}[c])).replace(/−/g,'-').replace(/·/g,'*').replace(/\s+/g,'');
 const tokens=src.match(/frac|ln|\d+(?:\.\d+)?|[xUVe]|[()+*\-^/{}]/g)||[];
 assert.equal(tokens.join(''),src,'Unsupported test expression');let n=0;
 function atom(){const t=tokens[n++];if(t==='-'||t==='+')return(t==='-'?-1:1)*power();if(t==='('||t==='{'){const v=sum();assert.equal(tokens[n++],t==='('?')':'}');return v;}if(t==='frac')return atom()/atom();if(t==='ln')return Math.log(atom());if(t==='e')return Math.E;if(Object.hasOwn(env,t))return env[t];assert.ok(/^\d/.test(t));return Number(t);}
 function power(){let v=atom();if(tokens[n]==='^'){n++;v**=power();}return v;}
 function product(){let v=power();while(n<tokens.length&&![')', '}', '+','-'].includes(tokens[n])){const op=tokens[n];if(op==='*'||op==='/'){n++;const w=power();v=op==='*'?v*w:v/w;}else v*=power();}return v;}
 function sum(){let v=product();while(tokens[n]==='+'||tokens[n]==='-'){const op=tokens[n++],w=product();v=op==='+'?v+w:v-w;}return v;}
 const v=sum();assert.equal(n,tokens.length);return v;
}
for(const [key,c]of Object.entries(compactDerivatives))test(`compact derivative ${key}: actual displayed expressions preserve all four choices`,()=>{
 const s=derivativeSpecs[key];for(const x of s.samples){const env={x};for(const def of c.definitions.split(';')){const[k,expr]=def.trim().split('=');env[k]=evaluate(expr,env);}close(evaluate(c.formula,env),s.d(x),1e-10);for(const[j,w]of(c.wrong||[]).entries())close(evaluate(w,env),s.w[j](x),1e-10);}
});
for(const [key,s]of Object.entries(derivativeSpecs))test(`official ${key}: independent differences and three false inequivalent derivative options`,()=>{
 for(const x of s.samples)close(df(s.f,x),s.d(x));
 for(const w of s.w)assert.ok(s.samples.some(x=>Math.abs(w(x)-s.d(x))>1e-6*Math.max(1,Math.abs(s.d(x)))));
 for(let a=0;a<3;a++)for(let b=a+1;b<3;b++)assert.ok(s.samples.some(x=>Math.abs(s.w[a](x)-s.w[b](x))>1e-6*Math.max(1,Math.abs(s.d(x)))));
 assert.equal(s.wrong.length,3);assert.equal(new Set([s.formula,...s.wrong]).size,4);
});
test('source formulas retain quotient grouping, decimal log, and h(2)=11/3',()=>{
 assert.equal(derivativeSpecs['1442h'].source,'h(x)=log(x²+x+1)');assert.ok(derivativeSpecs['1442h'].formula.includes('ln(10)'));
 assert.ok(derivativeSpecs['979g'].source.includes('frac{e^{3x²−5x}}{(6x²+2)³}'));
 const p=at(rows(),979,1),poly=x=>p.primitiveCoefficients.reduce((a,v,j)=>a+v*x**j,0);
 close(poly(2),11/3);for(const x of [-2,-.2,0,1,3])close(df(poly,x),4*x**3+x*x-4*x-1);
 for(const c of [5,11/3,7/3])assert.ok(Math.abs((poly(2)+5+c)-11/3)>1);
});
test('tangent points, derivatives, intercepts and all false lines',()=>{
 const r=rows(),specs=[[148,1,x=>1/x,[ [1,0],[-1,0],[1,2] ]],[1233,1,x=>(3*x+6)/(2*x+1),[[1,2],[-1,3],[-3,6]]],[1443,1,x=>3*x+2/x,[[3.5,0],[2.5,7],[3,1]]]];
 for(const [i,k,f,ws]of specs){const z=at(r,i,k),[x,y]=z.point;close(f(x),y);close(df(f,x),z.slope);close(z.slope*x+z.intercept,y);for(const [m,b]of ws)assert.equal(Math.abs(m-df(f,x))<1e-5&&Math.abs(m*x+b-f(x))<1e-5,false);}
});
test('rational asymptotes and axes are independently checked',()=>{
 const r=rows();for(const [i,k,f]of [[1233,2,x=>(3*x+6)/(2*x+1)],[1422,1,x=>(1+2*x)/(x-2)]]){const z=at(r,i,k);assert.ok(Math.abs(f(z.vertical-1e-7))>1e6&&Math.abs(f(z.vertical+1e-7))>1e6);close(f(1e9),z.horizontal);if(z.intercepts)for(const[x,y]of z.intercepts)close(f(x),y);}
});
test('piecewise 1417: separate parameter hypotheses, jump and matching derivatives',()=>{
 const r=rows(),a=at(r,1417,0).a;close(4-2*a,-1);for(const w of [1.5,2,-2.5])assert.notEqual(4-2*w,-1);
 const z=at(r,1417,1),f1=x=>1-2*x*x,f2=x=>x*x-4*x+3,f3=x=>-x*x+8*x-15;
 close(f1(1),z.at1.left);close(f2(1),z.at1.right);assert.notEqual(z.at1.left,z.at1.right);close(f2(3),f3(3));close(df(f2,3),2);close(df(f3,3),2);
});
test('piecewise 1443: unique a,b satisfy continuity AND differentiability',()=>{
 const {a,b,value,slope}=at(rows(),1443,0);const valid=([a,b])=>1+a===b+2&&3+2*a===b-2;assert.ok(valid([a,b]));close(1+a,value);close(3+2*a,slope);for(const w of [[6,5],[-4,-5],[-6,-5]])assert.equal(valid(w),false);
});
test('eight official documents/pages and 19 complete four-option parts with reversible prompt evidence',()=>{
 let n=0;for(const r of rows()){const i=r.correctionEvidence.parameters.index,o=derivativeObservations.find(o=>o[0]===i);assert.equal(sha(fs.readFileSync(r.officialSource.path)),o[1]);assert.equal(r.officialSource.range.page,o[2]);assert.equal(sha(fs.readFileSync(`tmp/pdfs/inference-source-glyphs/q${i}.png`)),o[4]);
 for(const p of r.parts){n++;assert.equal(p.answer,p.finalAnswer);assert.equal(new Set([p.answer,...p.distractors]).size,4);assert.ok(p.solutionSteps.length>=5);assert.ok(p.solutionSteps.every(s=>s.explanation&&s.math));}
 const changes=derivativeReplacements({...r,queueIndex:i});assert.ok(changes.length>=r.parts.length);assert.ok(changes.every(([old])=>old&&r.sourceLiteral.includes(old)));}assert.equal(n,19);
});
test('repeat and reverse-order calculations identical; source and production unchanged',()=>{
 const paths=['math-renderer.js','data/andalucia-pau-runtime.js','artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl'],before=paths.map(p=>sha(fs.readFileSync(p))),sort=r=>r.sort((a,b)=>a.exerciseId.localeCompare(b.exerciseId));assert.deepEqual(rows(),rows());assert.deepEqual(sort(rows()),sort(buildDerivativeBatch('derivative-test',[...cases].reverse()).batch.records));assert.deepEqual(paths.map(p=>sha(fs.readFileSync(p))),before);
});
