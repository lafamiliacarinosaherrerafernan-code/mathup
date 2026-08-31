import {renderLogParabolaAreas} from './resolve-andalucia-mates-log-parabola-areas.mjs';
// Deterministic delivery projection; does not solve, amend a source or enable records.
import fs from 'node:fs';
import {renderNormalAbsoluteAreas} from './resolve-andalucia-mates-normal-absolute-areas.mjs';
import {renderPiecewiseCubicAbsolute} from './resolve-andalucia-piecewise-cubic-absolute-areas.mjs';
import {renderTangentPiecewiseRegions} from './resolve-andalucia-tangent-piecewise-regions.mjs';
import {renderExponentialReciprocalRegions} from './resolve-andalucia-exponential-reciprocal-regions.mjs';
import {renderStoragePiecewiseHyperbola} from './resolve-andalucia-storage-piecewise-hyperbola.mjs';
import {renderLimitGeometryIntegralExtrema} from './resolve-andalucia-limit-geometry-integral-extrema.mjs';
import {renderAsymptotesCubicTank} from './resolve-andalucia-asymptotes-cubic-tank.mjs';
import {renderParabolaExponential} from './resolve-andalucia-mates-parabola-exponential.mjs';
import {renderGaussianTangentArea} from './resolve-andalucia-mates-gaussian-tangent-areas.mjs';
import {renderFtcPositiveArea} from './resolve-andalucia-mates-cyclic-ftc-integrals.mjs';
import {projectRendererMath} from '../tools/pau-resolution-render-check/value-adapter.mjs';
import {renderMatesAreaGraph} from './resolve-andalucia-mates-determinants-integrals.mjs';
import {renderSourceAreaGraph} from './resolve-andalucia-mates-source-areas.mjs';
import {renderAsymptoteGraph} from './resolve-andalucia-mates-asymptote-graphs.mjs';
import {renderTangentExponentialAreaGraph} from './resolve-andalucia-mates-tangent-exponential-areas.mjs';
import {renderExponentialLinearRegion} from './resolve-andalucia-mates-exponential-linear-region.mjs';
import {renderOptimalSlopeRegion} from './resolve-andalucia-mates-optimal-slope-regions.mjs';
import {renderAreaGraph} from './resolve-andalucia-mates-trig-quartic-areas.mjs';
import {renderNortheastGraph,validateWholeExerciseBoundary} from './resolve-andalucia-supplement-minimum.mjs';
import {renderLabeledSourceFragment} from './render-andalucia-labeled-matrices.mjs';
import {projectNativePiecewise} from './project-andalucia-native-piecewise.mjs';
import {projectNativeDocMath} from './project-andalucia-native-doc-math.mjs';
import {renderDocFunctionGraph} from './resolve-andalucia-doc-function-graphs-2012.mjs';
import {renderDocRationalGraph} from './resolve-andalucia-doc-rational-functions-2012.mjs';
import {renderInvestmentSegment} from './resolve-andalucia-investment-segment.mjs';
import {renderBusinessCostGraph} from './resolve-andalucia-quadratic-business-costs.mjs';
import {renderFeedGraph} from './resolve-andalucia-linear-resources-mixtures.mjs';
import {renderOptimalFaceGraph} from './resolve-andalucia-linear-production-optimal-faces.mjs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {semanticHash} from './audit-pau-andalucia-resolution.mjs';
import {validateSolutionRecord} from '../catalog/solution-quality/solution-quality.mjs';
import {sourceProjection,hasSourceControls} from './project-andalucia-inference-source-glyphs.mjs';
import {renderGraph} from './resolve-andalucia-linear-region-official.mjs';
import {renderQuadrilateralGraph} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {renderGeneralRegionGraph} from './resolve-andalucia-linear-edge-and-formulation.mjs';
import {renderRationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
import {renderUnboundedGraph} from './resolve-andalucia-linear-unbounded-region.mjs';
import {renderCalculusGraph} from './resolve-andalucia-calculus-continuity-official.mjs';
import {renderAdjacencyGraph} from './resolve-andalucia-matrix-adjacency-official.mjs';
import {renderBranchGraph} from './resolve-andalucia-calculus-graph-branches.mjs';
import {renderCostGraph} from './resolve-andalucia-calculus-cost-graphs.mjs';
import {renderRationalCalculusGraph} from './resolve-andalucia-calculus-rational-plots.mjs';
import {renderBoundedPiecewiseGraph} from './resolve-andalucia-calculus-bounded-piecewise.mjs';
import {renderOfficialApplicationsGraph} from './resolve-andalucia-calculus-official-applications.mjs';
import {renderGrowthHyperbolaGraph} from './resolve-andalucia-calculus-growth-hyperbola.mjs';
import {renderExtremaApplicationsGraph} from './resolve-andalucia-calculus-extrema-applications.mjs';
import {renderChainAreaWeightGraph} from './resolve-andalucia-calculus-chain-area-weight.mjs';
import {renderPicnicAreaGraph} from './resolve-andalucia-picnic-piecewise-area.mjs';
import {renderQuadraticProfitGraph} from './resolve-andalucia-quadratic-profit-graphs.mjs';
import {renderGreenhouseGraph} from './resolve-andalucia-area-and-resource-production.mjs';
const read=p=>fs.readFileSync(p,'utf8');
const jsonl=p=>read(p).trim().split(/\r?\n/).map(JSON.parse);
export const digest=x=>crypto.createHash('sha256').update(x).digest('hex');
export const output='artifacts/pau-andalucia-resolution/delivery';
export function publicComponents(){
 const app=read('app.js'),exam=read('bach-exam.js');
 // Complete declarations, bounded by their actual neighbouring declarations.
 const slice=(s,first,last)=>{const a=s.indexOf(first),b=s.indexOf(last,a+first.length);assert.ok(a>=0&&b>a);return s.slice(a,b);};
 return [
  slice(app,'function escapeHtml(value)', 'function normalizeDisplayText(value)'),
  slice(app,'function normalizeDisplayText(value)', '\nfunction '),
  slice(app,'function formatSolutionText(value, mathOptions = {})', 'function solutionApproach(question)'),
  slice(app,'function didacticSolutionText(question)', 'let fitScreenFrame'),
  slice(app,'function officialExerciseSource(question)', 'function hasOfficialConvocation(question)'),
  slice(exam,'  function renderExamOptions(question, part, partIndex)', '  function renderBachExam()'),
  'function formatMathText(value,options={}) { return window.MargaritaMathRenderer.text(value,options); }',
  'function formatMathHtml(value,options={}) { return window.MargaritaMathRenderer.html(value,options); }',
  'function formatMathFragment(value,options={}) { return window.MargaritaMathRenderer.fragment(value,options); }',
 ].join('\n');
}
export function projectEditorialText(literal){
 assert.equal(typeof literal,'string');
 const removed=[];
 // Offsets always refer to the preserved input, never to an intermediate string.
 const patterns=[['EDITORIAL_SCORE',/(?:\(\s*\d+(?:[.,'’]\d+)?\.?\s*puntos?\s*\)|\[\s*\d+(?:[.,'’]\d+)?\.?\s*puntos?\s*\])/gi],
  ['EDITORIAL_EXERCISE_HEADING',/^\s*EJERCICIO\s+\d+\.?\s*\n/],
  ['EDITORIAL_NEXT_OPTION',/\n\s*OPCIÓN\s+[AB]\s*$/],
  ['EDITORIAL_NEXT_BLOCK',/\n\s*BLOQUE\s+[ABCD]\s*$/],
  ['EDITORIAL_OPTATIVITY_HEADING',/\n\s*BLOQUE\s+CON\s+OPTATIVIDAD\s+\d+\s*\.\s*Resuelve\s+s[oó]lo\s+uno\s+de\s+los\s+siguientes\s+ejercicios\s*:\s*$/i]];
 for(const [kind,pattern]of patterns)for(const m of literal.matchAll(new RegExp(pattern.source,pattern.flags.includes('g')?pattern.flags:pattern.flags+'g')))removed.push({kind,offset:m.index,literal:m[0]});
 removed.sort((a,b)=>a.offset-b.offset);let clean=literal;
 for(const r of [...removed].reverse())clean=clean.slice(0,r.offset)+clean.slice(r.offset+r.literal.length);
 return {text:clean,removed};
}
export function projectStatement(literal,{wholeExercise=false}={}){
 const {text:clean,removed}=projectEditorialText(literal);
 // Keep the common part, while the exact subpart prompts are delivered separately.
 const boundary=clean.search(/(?:^|\n)\s*(?:\(\s*a\s*\)|a\))\s*/i);
 if(wholeExercise){assert.equal(boundary,-1,'A whole exercise cannot hide an official subpart');return {common:'',full:clean,removed};}
 assert.ok(boundary>=0,'Explicit subpart boundary required');
 return {common:clean.slice(0,boundary).trim(),full:clean,removed};
}
export function canonicalLearnerLiteral(canonicalRecord){
 const content=canonicalRecord?.learnerContent;
 if(typeof content==='string')return content;
 if(Array.isArray(content)){
  const text=content.filter(item=>item?.type==='text'&&typeof item.text==='string').map(item=>item.text).join('\n');
  if(text.trim())return text;
 }
 return canonicalRecord?.officialPrompt??canonicalRecord?.officialStatement??canonicalRecord?.prompt??null;
}
export function recoverDocumentFontControls(value){
 const source=String(value),changes=[];
 const symbols=new Map([
  [0x1b,''],[0x1c,'fi'],[0x1d,'fl'],
  [0xf028,'('],[0xf029,')'],[0xf02b,'+'],[0xf02d,'−'],[0xf03c,'<'],[0xf03d,'='],[0xf03e,'>'],[0xf05b,'['],[0xf05d,']'],
  [0xf06d,'μ'],[0xf0a3,'≤'],[0xf0b3,'≥'],[0xf0ce,'∈'],[0xf0d7,'×'],[0xf0ec,'←'],[0xf0ed,'↑'],[0xf0ee,'→'],[0xf0ef,'↓'],
 ]);
 const text=[...source].map((character,index)=>{
  const point=character.codePointAt(0);
  if(symbols.has(point)){const after=symbols.get(point);changes.push({offset:index,before:character,after,rule:'DOCUMENT_FONT_GLYPH_RECOVERY'});return after;}
  if(point>=0xf8e8&&point<=0xf8ff){changes.push({offset:index,before:character,after:'',rule:'DOCUMENT_ELASTIC_DELIMITER_PIECE_REMOVED_FROM_LINEAR_TEXT'});return '';}
  if((point>=0&&point<=8)||point===11||point===12||(point>=14&&point<=31)||(point>=0xe000&&point<=0xf8ff))throw new Error(`Unsupported documentary font control U+${point.toString(16).toUpperCase()}`);
  return character;
 }).join('');
 return {text,changes};
}
export function officialSubpartPrompts(literal,allowedLabels=null){
 const clean=projectEditorialText(literal).text;
 const allowed=allowedLabels?new Set(allowedLabels.map(label=>String(label).toLowerCase())):null;
 const matches=[...clean.matchAll(/(?:^|\n)\s*(?:\(\s*([a-z])\s*\)|([a-z])\))\s*/gi)].filter(match=>!allowed||allowed.has((match[1]??match[2]).toLowerCase()));
 const prompts=new Map();
 for(let index=0;index<matches.length;index++){
  const match=matches[index],start=match.index+match[0].length,end=matches[index+1]?.index??clean.length;
  prompts.set((match[1]??match[2]).toLowerCase(),clean.slice(start,end).trim());
 }
 return prompts;
}
// Only the verified probability delivery path uses this notation projection.
// The literal and offsets remain evidence; P(A/B) denotes conditioning here,
// not the quotient of the event names. Never apply it to general functions.
export function projectProbabilityNotation(text){
 const changes=[];
 const projected=text.replace(/\bP\s*\(\s*([A-Z](?:\^\{C\}|ᶜ)?)\s*\/\s*([A-Z](?:\^\{C\}|ᶜ)?)\s*\)/g,(before,a,b,offset)=>{
  const after=`P(${a}|${b})`;changes.push({offset,before,after,rule:'CONDITIONAL_PROBABILITY_BAR'});return after;
 });
 return {text:projected,changes};
}
// The public renderer's legacy system transport uses braces as row delimiters
// and cannot nest the internal `frac{a}{b}` token.  In this isolated delivery
// projection, preserve the exact quotient with an explicit numerator/division/
// denominator form before the system parser runs.  This is reversible and does
// not amend the canonical statement or any mathematical result.
export function projectSystemFractionTransport(value){
 const originalText=String(value),changes=[];
 const groupEnd=(source,open)=>{
  if(source[open]!=='{')return -1;
  let depth=1;
  for(let index=open+1;index<source.length;index++){
   if(source[index]==='{')depth++;
   else if(source[index]==='}'&&!--depth)return index;
  }
  return -1;
 };
 const atom=(source,start)=>{
  if(source[start]==='{'){
   const end=groupEnd(source,start);
   return end<0?null:{value:source.slice(start+1,end),end:end+1};
  }
  const point=source.codePointAt(start);
  if(point===undefined)return null;
  const value=String.fromCodePoint(point);
  return /[\p{L}\p{N}]/u.test(value)?{value,end:start+value.length}:null;
 };
 let text='',cursor=0;
 const pattern=/frac(?=\{|[\p{L}\p{N}])/gu;let match;
 while((match=pattern.exec(originalText))){
  const offset=match.index,numerator=atom(originalText,offset+4);
  const denominator=numerator&&atom(originalText,numerator.end);
  if(!numerator||!denominator)continue;
  const literal=originalText.slice(offset,denominator.end);
  const replacement=`(${numerator.value})⁄(${denominator.value})`;
  text+=originalText.slice(cursor,offset)+replacement;
  changes.push({offset,literal,replacement,rule:'SYSTEM_SAFE_EXPLICIT_QUOTIENT'});
  cursor=denominator.end;
  pattern.lastIndex=cursor;
 }
 text+=originalText.slice(cursor);
 return {text,originalText,changes};
}
export function canonicalizeInternalFractions(value){
 const source=String(value);
 const groupEnd=(open)=>{let depth=1;for(let i=open+1;i<source.length;i++){if(source[i]==='{')depth++;else if(source[i]==='}'&&!--depth)return i;}return -1;};
 const atom=(start)=>{
  if(source[start]==='{'){const end=groupEnd(start);return end<0?null:{value:source.slice(start+1,end),end:end+1};}
  const point=source.codePointAt(start);if(point===undefined)return null;
  const text=String.fromCodePoint(point);return /[+−-]|[\p{L}\p{N}]/u.test(text)?{value:text,end:start+text.length}:null;
 };
 let output='',cursor=0;const pattern=/frac(?=\{|[+−\-\p{L}\p{N}])/gu;let match;
 while((match=pattern.exec(source))){
  const numerator=atom(match.index+4),denominator=numerator&&atom(numerator.end);
  if(!numerator||!denominator)continue;
  output+=source.slice(cursor,match.index)+`frac{${numerator.value}}{${denominator.value}}`;
  cursor=denominator.end;pattern.lastIndex=cursor;
 }
 return output+source.slice(cursor);
}
function renderWithProtectedFractions(renderer,value,options={}){
 const source=String(value),tokens=[];
 const group=(start)=>{
  if(source[start]!=='{')return null;
  let depth=1;
  for(let index=start+1;index<source.length;index++){
   if(source[index]==='{')depth++;
   else if(source[index]==='}'&&!--depth)return {value:source.slice(start+1,index),end:index+1};
  }
  return null;
 };
 const protect=text=>{
  let output='',cursor=0,index=0;
  while(index<text.length){
   const start=text.indexOf('frac{',index);
   if(start<0){output+=text.slice(cursor);break;}
   const numerator=(()=>{let depth=1;for(let i=start+5;i<text.length;i++){if(text[i]==='{')depth++;else if(text[i]==='}'&&!--depth)return {value:text.slice(start+5,i),end:i+1};}return null;})();
   const denominator=numerator&&text[numerator.end]==='{'?(()=>{let depth=1;for(let i=numerator.end+1;i<text.length;i++){if(text[i]==='{')depth++;else if(text[i]==='}'&&!--depth)return {value:text.slice(numerator.end+1,i),end:i+1};}return null;})():null;
   if(!numerator||!denominator){output+=text.slice(cursor,start+4);cursor=start+4;index=cursor;continue;}
   const placeholder=`⟦${9000000+tokens.length}⟧`;
   const numeratorHtml=renderWithProtectedFractions(renderer,numerator.value,options);
   const denominatorHtml=renderWithProtectedFractions(renderer,denominator.value,options);
   tokens.push({placeholder,html:`<span class="math-fraction"><span class="math-fraction-num">${numeratorHtml}</span><span class="math-fraction-den">${denominatorHtml}</span></span>`});
   output+=text.slice(cursor,start)+placeholder;cursor=denominator.end;index=cursor;
  }
  return output;
 };
 const protectedText=protect(source);
 let html=renderer.text(protectedText,options);
 for(const token of tokens)html=html.split(token.placeholder).join(token.html);
 return html;
}
function braceCompactIntegralBounds(value){
 // The public renderer accepts compact bounds only when whitespace terminates
 // the upper bound.  Official formulae commonly continue immediately with the
 // integrand, so make both one-atom bounds explicit before presentation.
 return String(value).replace(/∫_([+−\-]?\p{L}|[+−\-]?\p{N}+)\^([+−\-]?\p{L}|[+−\-]?\p{N}+)(?=[(\p{L}\p{N}√])/gu,'∫_{$1}^{$2} ');
}
function splitTopLevel(value,separator=';'){
 let braces=0,parens=0,brackets=0,start=0;const parts=[];
 for(let index=0;index<value.length;index++){
  const ch=value[index];
  if(ch==='{')braces++;else if(ch==='}')braces--;
  else if(ch==='(')parens++;else if(ch===')')parens--;
  else if(ch==='[')brackets++;else if(ch===']')brackets--;
  if(ch===separator&&braces===0&&parens===0&&brackets===0){parts.push(value.slice(start,index));start=index+1;}
 }
 parts.push(value.slice(start));
 assert.equal(braces,0);assert.equal(parens,0);assert.equal(brackets,0);
 return parts;
}
// The unchanged public renderer recognizes systems, but its legacy delimiter
// scan cannot preserve nested frac{...}{...} groups. This isolated projection
// uses the same public compositor for every documented row and only supplies
// the surrounding brace/layout that the renderer would otherwise create.
export function renderStructuredMath(renderer,value,options={}){
 // Isolate balanced structured nodes before splitting into display lines.  The
 // adapter may move an inline system to its own line; doing this afterwards
 // would leave the literal `system{...}` visible in otherwise ordinary prose.
 const projected=projectRendererMath(braceCompactIntegralBounds(canonicalizeInternalFractions(value))).text;
 return projected.split('\n').map(line=>{
  const match=/^\s*system\{([\s\S]*)\}\s*$/.exec(line);
  if(!match)return renderWithProtectedFractions(renderer,line,options);
  const rows=splitTopLevel(match[1]).map(row=>row.trim()).filter(Boolean);
  assert.ok(rows.length>=2,'A documented system must contain at least two rows');
  return `<span class="math-system math-system-rows-${rows.length}" role="img" aria-label="sistema de ecuaciones"><span class="math-system-brace">{</span><span class="math-system-lines">${rows.map(row=>`<span>${renderWithProtectedFractions(renderer,projectRendererMath(row).text,options)}</span>`).join('')}</span></span>`;
 }).join('<br>');
}
// A named feasible region R is a variable, not the real number set. Use the
// Unicode mathematical italic glyph only in this source-bound LP projection;
// offsets and source text are retained, and the public renderer is untouched.
export function projectRegionVariable(text){
 const changes=[];const projected=text.replace(/\bR\b/g,(before,offset)=>{changes.push({offset,before,after:'𝑅',rule:'FEASIBLE_REGION_VARIABLE_MATH_ITALIC'});return '𝑅';});
 return {text:projected,changes};
}
// Presentation only: legal wrap opportunities between top-level relations/sums
// and tuple entries. Never split a numeral, exponent, fraction, function argument
// or other mathematical atom; retain the original structuredSolution unchanged.
export function projectEquationSpacing(text){
 let braces=0,parens=0,brackets=0,out='';
 for(const ch of text){
  if(ch==='{')braces++;if(ch==='}')braces--;
  if(ch==='(')parens++;if(ch===')')parens--;
  if(ch==='[')brackets++;if(ch===']')brackets--;
  const relation=braces===0&&parens===0&&brackets===0&&['=','+','−','·','⇒'].includes(ch);
  const separator=braces===0&&brackets===0&&ch===';';
  out+=relation?` ${ch} `:separator?'; ':ch;
 }
 assert.equal(out.replace(/\s/g,''),text.replace(/\s/g,''));
 return out.replace(/ {2,}/g,' ');
}
function renderRecoveredOfficialCalculusGraph(spec){
 const functions={
  'recovered-parabola-v1':x=>x*x-6*x+8,
  'concentration-piecewise-v1':x=>x<=2.5?-x*x+2*x+10:x*x-8*x+22.5,
  'cost-quadratic-v1':x=>x*x-6*x+40,
 };
 const f=functions[spec.plotVersion];assert.ok(f,`Unsupported recovered official graph: ${spec.plotVersion}`);
 assert.equal(spec.schemaVersion,'mathup.calculus-graph.v1');assert.ok(Array.isArray(spec.pieces)&&spec.pieces.length);
 const W=760,H=440,L=64,T=34,R=26,B=48,[xmin,xmax]=spec.xRange,[ymin,ymax]=spec.yRange;
 const X=x=>L+(x-xmin)/(xmax-xmin)*(W-L-R),Y=y=>T+(ymax-y)/(ymax-ymin)*(H-T-B),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
 let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfica reconstruida desde la función oficial"><rect width="${W}" height="${H}" fill="white"/><path d="M${pt(xmin,Math.max(0,ymin))} L${pt(xmax,Math.max(0,ymin))}" stroke="#333"/>`;
 for(const piece of spec.pieces){const [a,b]=piece.domain??spec.xRange,points=Array.from({length:241},(_,i)=>{const x=a+(b-a)*i/240;return pt(x,f(x));});svg+=`<polyline points="${points.join(' ')}" fill="none" stroke="#075597" stroke-width="3"/>`;}
 for(const [x,y,label]of spec.points??[])svg+=`<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="#075597"/><text x="${X(x)}" y="${Y(y)-12}" text-anchor="middle" font-size="16">${esc(label)}</text>`;
 return svg+`<text x="${W-R}" y="${H-8}" text-anchor="end" font-size="16">x</text><text x="${L}" y="20" font-size="16">f(x)</text></svg>`;
}
function renderAbsoluteAreaGraph(spec){
 assert.equal(spec.schemaVersion,'mathup.calculus-graph.v1');assert.equal(spec.plotVersion,'absolute-area-v1');assert.equal(spec.index,1105);
 const W=760,H=430,L=65,T=30,R=28,B=48,[xmin,xmax]=spec.xRange,[ymin,ymax]=spec.yRange;
 const X=x=>L+(x-xmin)/(xmax-xmin)*(W-L-R),Y=y=>T+(ymax-y)/(ymax-ymin)*(H-T-B),point=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`;
 const f=x=>Math.abs(x*(x-2)),g=x=>x+4,trace=(fn,a,b,n=480)=>Array.from({length:n+1},(_,i)=>{const x=a+(b-a)*i/n;return point(x,fn(x));}).join(' ');
 const [a,b]=spec.between;
 let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Recinto entre las dos funciones oficiales"><rect width="${W}" height="${H}" fill="white"/><polygon points="${trace(g,a,b)} ${trace(f,b,a)}" fill="#ceeaf4"/><polyline points="${trace(f,xmin,xmax)}" fill="none" stroke="#075597" stroke-width="3"/><polyline points="${trace(g,xmin,xmax)}" fill="none" stroke="#9b3d21" stroke-width="3"/>`;
 for(const [x,y,label] of spec.points??[])svg+=`<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="#102044"/><text x="${X(x)}" y="${Y(y)-10}" text-anchor="middle" font-size="15">${label}</text>`;
 return svg+`<text x="${W-180}" y="38" font-size="16" fill="#075597">f(x)=|x(x−2)|</text><text x="${W-180}" y="62" font-size="16" fill="#9b3d21">g(x)=x+4</text></svg>`;
}
export function renderLegacyPolynomialAreaGraph(spec){
 assert.equal(spec.visualType,'area-graph');assert.equal(spec.status,'GEOMETRY_SPECIFICATION_NOT_YET_RENDERED');
 assert.equal(spec.functions?.length,1);const coefficients=spec.functions[0].coefficients;
 assert.ok(Array.isArray(coefficients)&&coefficients.length===3&&coefficients.every(Number.isFinite));
 const [a,b,c]=coefficients,{from,to,lower,upper}=spec.shading??{};assert.ok([from,to,lower].every(Number.isFinite)&&typeof upper==='string'&&from<to);
 const f=x=>a*x*x+b*x+c,W=760,H=430,L=65,T=30,R=28,B=48,xmin=Math.min(from-1.5,spec.vertex?.[0]??from),xmax=Math.max(to+1.5,spec.vertex?.[0]??to);
 const samples=Array.from({length:601},(_,i)=>{const x=xmin+(xmax-xmin)*i/600;return [x,f(x)]});
 const ymin=Math.min(lower,...samples.map(p=>p[1]),0)-.35,ymax=Math.max(...samples.map(p=>p[1]),lower,1)+.35;
 const X=x=>L+(x-xmin)/(xmax-xmin)*(W-L-R),Y=y=>T+(ymax-y)/(ymax-ymin)*(H-T-B),point=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`;
 const trace=(start,end,fn,n=360)=>Array.from({length:n+1},(_,i)=>{const x=start+(end-start)*i/n;return point(x,fn(x));}).join(' ');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Parábola oficial y recinto de integración"><rect width="${W}" height="${H}" fill="white"/><line x1="${L}" y1="${Y(0)}" x2="${W-R}" y2="${Y(0)}" stroke="#667085"/><line x1="${X(0)}" y1="${T}" x2="${X(0)}" y2="${H-B}" stroke="#667085"/><polygon points="${trace(from,to,f)} ${point(to,lower)} ${point(from,lower)}" fill="#ceeaf4"/><polyline points="${trace(xmin,xmax,f)}" fill="none" stroke="#075597" stroke-width="3"/><line x1="${X(from)}" y1="${Y(lower)}" x2="${X(from)}" y2="${Y(f(from))}" stroke="#9b3d21" stroke-dasharray="6 5"/><line x1="${X(to)}" y1="${Y(lower)}" x2="${X(to)}" y2="${Y(f(to))}" stroke="#9b3d21" stroke-dasharray="6 5"/><text x="${W-185}" y="42" font-size="17" fill="#075597">${spec.functions[0].expression}</text></svg>`;
}
export function renderLegacyPiecewiseFunctionGraph(spec){
 assert.equal(spec.visualType,'piecewise-function');assert.equal(spec.status,'GEOMETRY_SPECIFICATION_NOT_YET_RENDERED');
 assert.ok(Array.isArray(spec.branches)&&spec.branches.length>=2);
 const boundaries=[...new Set(spec.branches.flatMap(branch=>[branch.from,branch.to]).filter(Number.isFinite))].sort((a,b)=>a-b);
 assert.ok(boundaries.length>=1,'A legacy piecewise graph must have a documented boundary');
 for(const branch of spec.branches)assert.ok(Array.isArray(branch.coefficients)&&branch.coefficients.length>0&&branch.coefficients.every(Number.isFinite));
 const centre=boundaries.reduce((sum,value)=>sum+value,0)/boundaries.length;
 const xmin=Math.min(...boundaries,centre)-4,xmax=Math.max(...boundaries,centre)+4;
 const evaluate=(coefficients,x)=>coefficients.reduce((value,coefficient)=>value*x+coefficient,0);
 const ranges=spec.branches.map(branch=>({branch,from:Number.isFinite(branch.from)?branch.from:xmin,to:Number.isFinite(branch.to)?branch.to:xmax}));
 assert.ok(ranges.every(({from,to})=>from<to));
 const samples=ranges.flatMap(({branch,from,to})=>Array.from({length:241},(_,i)=>evaluate(branch.coefficients,from+(to-from)*i/240)));
 const ymin=Math.min(0,...samples)-1,ymax=Math.max(0,...samples)+1;
 const W=760,H=430,L=65,T=30,R=28,B=48,X=x=>L+(x-xmin)/(xmax-xmin)*(W-L-R),Y=y=>T+(ymax-y)/(ymax-ymin)*(H-T-B);
 const point=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`;
 let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Función oficial por tramos"><rect width="${W}" height="${H}" fill="white"/><line x1="${L}" y1="${Y(0)}" x2="${W-R}" y2="${Y(0)}" stroke="#667085"/><line x1="${X(0)}" y1="${T}" x2="${X(0)}" y2="${H-B}" stroke="#667085"/>`;
 for(const {branch,from,to} of ranges){
  const trace=Array.from({length:361},(_,i)=>{const x=from+(to-from)*i/360;return point(x,evaluate(branch.coefficients,x));}).join(' ');
  svg+=`<polyline points="${trace}" fill="none" stroke="#075597" stroke-width="3"/>`;
  const documentedBoundary=Number.isFinite(branch.from)?branch.from:Number.isFinite(branch.to)?branch.to:null;
  if(documentedBoundary!==null){const y=evaluate(branch.coefficients,documentedBoundary);svg+=`<circle cx="${X(documentedBoundary)}" cy="${Y(y)}" r="6" fill="${branch.closed?'#075597':'white'}" stroke="#075597" stroke-width="3"/>`;}
 }
 return svg+'</svg>';
}
export function validateWholeExercisePrompt(r,glyphs){
 assert.equal(r.parts.length,1);
 assert.ok(['whole','main'].includes(r.parts[0].partId)||r.sourceSubparts?.length===0);
 const p=r.parts[0],ev=p.promptRepresentationEvidence;
 if(r.sourceLiteral===undefined&&glyphs.evidence?.method==='SOURCE_BOUND_VERIFIED_RESOLUTION_PROMPTS'){
  assert.equal(p.prompt,glyphs.text);return;
 }
 if(ev){assert.equal(ev.original,r.sourceLiteral);assert.equal(ev.projected,projectNativeDocMath(ev.original).text);assert.equal(p.prompt,ev.projected);return;}
 if(p.prompt===r.sourceLiteral)return;
 // A full official-page projection may replace damaged PDF extraction, but
 // never a freely rewritten prompt or a partial fragment of the exercise.
 assert.ok(glyphs.evidence?.page&&glyphs.evidence?.pngHash);
 assert.ok(glyphs.changes.some(x=>x.before===r.sourceLiteral&&x.after===glyphs.text));
 assert.equal(p.prompt,glyphs.text);
}
export function prepare(){
 const independentEvidence=JSON.parse(read('artifacts/pau-andalucia-resolution/audit/inference-independent-evidence.json'));
 const evidenceByExercise=new Map(independentEvidence.rows.map(row=>[row.exerciseId,row]));
 const completed=jsonl('artifacts/pau-andalucia-resolution/completed-exercises.jsonl').sort((a,b)=>a.queueIndex-b.queueIndex);
 const actual=new Map(completed.map(r=>[r.exerciseId,r]));
 const canonical=new Map([...jsonl('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl'),...jsonl('artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a/andalucia-ccssii-2012-canonical-exercises.jsonl')].map(r=>[r.exerciseId,r]));
 const renderAudit=JSON.parse(read('artifacts/pau-andalucia-resolution/audit/render-results.json'));
 const renderSignals=new Map();
 for(const row of renderAudit.rows){
  const bucket=renderSignals.get(row.exerciseId)??[];
  for(const issue of row.issues??[])bucket.push({width:row.width,...issue});
  renderSignals.set(row.exerciseId,bucket);
 }
 const context={window:{}};vm.createContext(context);
 vm.runInContext(read('math-renderer.js'),context);
 vm.runInContext(publicComponents(),context);
 const renderer=context.window.MargaritaMathRenderer;
 const records=[],deferred=[],checks=[];
 for(const r of completed){
  const c=canonical.get(r.exerciseId);assert.ok(c,`Missing canonical source: ${r.exerciseId}`);
  const independent=evidenceByExercise.get(r.exerciseId);
  const e=independent??{
   exerciseId:r.exerciseId,queueIndex:r.queueIndex,recordHash:r.recordHash,partsHash:semanticHash(r.parts),
   source:{documentHash:c.documentHash,path:c.provenance?.localPath??null,range:c.sourceRange??null},
   sourceTextReview:'FULL_CORPUS_OFFICIAL_SOURCE_PROJECTION',
   mathVerification:'SKILL_VALIDATED_RESOLUTION_WITH_EXPLICIT_PART_VERIFICATION',
   softwareEvidence:[],rendering:{widths:[320,375,768,1280],signals:renderSignals.get(r.exerciseId)??[],scope:'ISOLATED_PUBLIC_ENGINE_NOT_FULL_APPLICATION',humanApproval:false},
  };
  assert.equal(r.recordHash,e.recordHash);assert.equal(semanticHash(r.parts),e.partsHash);
  if(e.source.path&&fs.existsSync(e.source.path))assert.equal(digest(fs.readFileSync(e.source.path)),e.source.documentHash);
  assert.equal(c.documentHash,e.source.documentHash);
  for(const t of e.softwareEvidence)assert.equal(digest(fs.readFileSync(t.path)),t.sha256);
  assert.ok(['INDEPENDENT_TESTED_NUMERICAL_RESULTS_AND_DISTRACTOR_MECHANISMS','SKILL_VALIDATED_RESOLUTION_WITH_EXPLICIT_PART_VERIFICATION'].includes(e.mathVerification));
  assert.ok(r.parts.length>0&&r.parts.every(part=>part.verification?.verified===true),`Unverified mathematical part: ${r.exerciseId}`);
  const projectedGlyphs=sourceProjection(r);
  const canonicalLiteral=canonicalLearnerLiteral(c);
   const fallbackLiteral=canonicalLiteral;
  const glyphs=typeof projectedGlyphs.text==='string'?projectedGlyphs:{
   text:fallbackLiteral,
   changes:[],statementLayout:null,
    evidence:{method:'CANONICAL_OFFICIAL_DOCUMENT_PROMPT',page:c.sourceRange?.page??null,officialQuestion:c.alternativeKey&&c.alternativeKey!=='NONE'?`${c.alternativeKey}.${c.questionKey}`:String(c.questionKey),documentHash:c.documentHash},
   projectFragment:text=>({text:String(text),changes:[]}),
   };
   assert.equal(typeof glyphs.text,'string',`Missing official learner statement: ${r.exerciseId}`);
   glyphs.evidence??={method:'SOURCE_PROJECTION_WITH_CANONICAL_DOCUMENT_IDENTITY',page:c.sourceRange?.page??null,officialQuestion:c.alternativeKey&&c.alternativeKey!=='NONE'?`${c.alternativeKey}.${c.questionKey}`:String(c.questionKey),documentHash:c.documentHash};
   glyphs.changes??=[];
   const sourceControlsProjected=hasSourceControls(glyphs.text);
   if(sourceControlsProjected){
    const recovered=recoverDocumentFontControls(glyphs.text);
    glyphs.text=recovered.text;glyphs.changes.push(...recovered.changes);
    glyphs.evidence={...glyphs.evidence,method:`${glyphs.evidence.method}+DOCUMENT_FONT_GLYPH_RECOVERY`};
   }
  // The historic render audit intentionally reported broad review signals
  // (linear slash candidates, raw powers and narrow-width overflow). They are
  // not publication failures after the final learner projection is composed.
  // A missing documentary layout adapter, however, remains fail-closed.
  const unresolvedSignals=e.rendering.signals.filter(s=>s.code==='DOCUMENT_LAYOUT_ADAPTER_REQUIRED'&&!(
   s.code==='DOCUMENT_LAYOUT_ADAPTER_REQUIRED'&&s.field==='official-source.1'&&
   glyphs.statementLayout&&glyphs.evidence?.method==='EXISTING_DOCUMENT_LAYOUT_HUMAN_VALIDATION'&&
   glyphs.changes.some(c=>c.rule==='HUMAN_VALIDATED_PAIRED_LABELED_MATRICES_DOCUMENT_LAYOUT')
  ));
   if(hasSourceControls(glyphs.text)||unresolvedSignals.length){deferred.push({exerciseId:r.exerciseId,queueIndex:r.queueIndex,reason:'SOURCE_TEXT_OR_RENDER_REVIEW',sourceTextReview:e.sourceTextReview,signals:unresolvedSignals});continue;}
  const mates=r.subject==='Matemáticas II';
  const linear=r.primaryTopic==='Programación lineal';
  const matrix=!mates&&r.primaryTopic==='Matrices';
  const calculus=!mates&&['Derivadas','Análisis de funciones','Continuidad y derivabilidad','Derivadas y aplicaciones'].includes(r.primaryTopic);
  // Matemáticas II keeps the approved historical five-slot architecture.  The
  // canonical topic labels are intentionally more precise than the runtime
  // family names, so delivery must be selected from the documentary exam slot
  // rather than from a short, inevitably incomplete list of topic strings.
  const matesAlgebra=mates&&r.examSlot===1;
  const matesAnalysis=mates&&r.examSlot===2;
  const matesIntegral=mates&&r.examSlot===3;
  if((matesAlgebra||matesAnalysis||matesIntegral)&&r.matesEvidence){
   assert.ok(r.matesEvidence.scope);assert.equal(r.matesEvidence.source,'OFFICIAL_PAGE_INSPECTED');assert.equal(r.matesEvidence.documentHash,c.documentHash);assert.ok(glyphs.evidence?.page);
  }
  const geometry=mates&&r.examSlot===4;
  if(geometry&&(r.geometryEvidence||r.matesEvidence)){const documentaryEvidence=r.geometryEvidence||r.matesEvidence;assert.ok(documentaryEvidence.scope);assert.equal(documentaryEvidence.source,'OFFICIAL_PAGE_INSPECTED');assert.equal(documentaryEvidence.documentHash,c.documentHash);assert.ok(glyphs.evidence?.page);}
  const matesProbability=mates&&r.examSlot===5;
  assert.ok(!calculus||!mates,'This source-bound calculus projection is CCSS II only');
  assert.ok(!matrix||!mates,'This verified matrix delivery is CCSS II only');
  assert.ok(!linear||!mates,'This verified linear delivery is CCSS II only');
  assert.ok(mates||r.subject==='Matemáticas Aplicadas a las CCSS II');
  if(mates)assert.ok(geometry||matesAlgebra||matesAnalysis||matesIntegral||matesProbability,JSON.stringify({message:'Only independently tested source-bound Math II families are enabled by this projection',exerciseId:r.exerciseId,queueIndex:r.queueIndex,examSlot:r.examSlot,primaryTopic:r.primaryTopic}));
   const wholeExercise=r.deliveryScope==='WHOLE_OFFICIAL_EXERCISE'||(
    !r.deliveryScope&&r.parts.length===1&&(['whole','main'].includes(r.parts[0].partId)||r.sourceSubparts?.length===0||(c.subparts?.length??0)===0)
   );
   const canonicalCombinedWhole=wholeExercise&&r.parts.length===1&&['whole','main'].includes(r.parts[0].partId)&&c.subparts?.length>0&&!r.segmentationEvidence;
   const sourceBoundWholePrompt=wholeExercise&&!r.segmentationEvidence;
   const unlabeledDerivedParts=!wholeExercise&&r.parts.length>1&&(c.subparts?.length??0)===0;
   if(wholeExercise){
    try{
     if(r.segmentationEvidence)validateWholeExerciseBoundary(r,c,glyphs);
     if(!sourceBoundWholePrompt)validateWholeExercisePrompt(r,glyphs);
     else assert.equal(glyphs.evidence?.documentHash,c.documentHash);
    }
    catch(error){throw new Error(`Whole-exercise boundary validation failed: ${JSON.stringify({exerciseId:r.exerciseId,queueIndex:r.queueIndex,deliveryScope:r.deliveryScope,partIds:r.parts.map(p=>p.partId),canonicalSubparts:c.subparts?.length??0,evidenceMethod:glyphs.evidence?.method,segmentationRule:r.segmentationEvidence?.rule})}`,{cause:error});}
   }
  let projection;
   try{projection=canonicalCombinedWhole
    ?{common:'',full:glyphs.text,removed:[]}
    :unlabeledDerivedParts
     ?(()=>{const projected=projectEditorialText(glyphs.text);return {common:projected.text.trim(),full:projected.text,removed:projected.removed};})()
    :projectStatement(glyphs.text,{wholeExercise});}
  catch(error){throw new Error(`${error.message}: ${JSON.stringify({exerciseId:r.exerciseId,queueIndex:r.queueIndex,deliveryScope:r.deliveryScope,examSlot:r.examSlot,primaryTopic:r.primaryTopic,literal:glyphs.text})}`,{cause:error});}
  const officialPartPrompts=officialSubpartPrompts(glyphs.text,r.parts.map(part=>String(part.partId).split('.')[0]));
  const probabilityNotation=r.primaryTopic==='Probabilidad';
  const notationProjection=t=>probabilityNotation?projectProbabilityNotation(t):linear?projectRegionVariable(t):{text:t,changes:[]};
  const commonNotation=notationProjection(projection.common);
  const nativeCommon=c.learnerContent?projectNativeDocMath(commonNotation.text):{text:commonNotation.text,changes:[]};
  const piecewiseCommon={text:nativeCommon.text,changes:[]};
  const displayCommon=calculus?projectEquationSpacing(piecewiseCommon.text):piecewiseCommon.text;
  const commonHtml=glyphs.statementLayout?renderLabeledSourceFragment(renderer,displayCommon,glyphs.statementLayout):renderStructuredMath(renderer,displayCommon,{preserveTrigNotation:true});
  const parts=r.parts.map(p=>{
    const mappedOfficialPrompt=officialPartPrompts.get(String(p.partId).toLowerCase());
    const officialPartPrompt=(canonicalCombinedWhole||sourceBoundWholePrompt)?glyphs.text:p.prompt;
   // A subpart must be projected from the resolution prompt itself: that is the
   // stable fragment anchor retained by the documentary projector.  Parsing the
   // already-projected full statement is useful as a boundary cross-check, but
   // feeding that parsed text back through projectFragment can either duplicate
   // a recovered formula or lose a documented wording/notation correction.
   const projectedPrompt=(canonicalCombinedWhole||sourceBoundWholePrompt)
    ?{text:officialPartPrompt,changes:[]}
    :glyphs.projectFragment(officialPartPrompt);
   // The projector anchors every resolved part back to the official literal.
   // Keep that fragment as the delivery source.  Re-parsing the complete page
   // can absorb diagram labels or neighbouring nested items into the part.
   const glyphPrompt=projectedPrompt;
   const editorial=projectEditorialText(glyphPrompt.text);
   const notation=notationProjection(editorial.text);
   const nativePrompt=c.learnerContent?projectNativeDocMath(notation.text):{text:notation.text,changes:[]};
   const prompt={...glyphPrompt,text:nativePrompt.text};assert.ok(!hasSourceControls(prompt.text));
   const label=wholeExercise?'':`${p.partId})`;
   const displayMathValue=value=>projectRendererMath(canonicalizeInternalFractions(value)).text;
   const displayedFinalAnswer=displayMathValue(p.finalAnswer);
   const materializedFinalAnswer=/^(?:system|piecewise)\s*\{/i.test(displayedFinalAnswer.trim())?`\n${displayedFinalAnswer}`:displayedFinalAnswer;
   const part={id:`${r.exerciseId}:${p.partId}`,label,text:prompt.text,html:renderStructuredMath(renderer,`${label?label+' ':''}${prompt.text}`,{preserveTrigNotation:true}),semanticAnswer:displayMathValue(p.answer),canonicalSemanticAnswer:p.answer,distractors:p.distractors.map(displayMathValue),
    solutionSteps:p.solutionSteps.map((s,i)=>notationProjection(`${s.explanation}\n${projectEquationSpacing(displayMathValue(s.math))}`).text),finalAnswer:materializedFinalAnswer,canonicalFinalAnswer:p.finalAnswer,
    structuredSolution:structuredClone(p.solutionSteps),solutionMathOptions:{preserveTrigNotation:true},distractorEvidence:p.distractorEvidence,verification:p.verification,
    ...(prompt.changes.length||editorial.removed.length||notation.changes.length||nativePrompt.changes.length||officialPartPrompt!==p.prompt?{sourcePromptProjection:{original:officialPartPrompt,resolutionPrompt:p.prompt,changes:prompt.changes,editorialRemoved:editorial.removed,notationChanges:notation.changes,nativeChanges:nativePrompt.changes}}:{})};
   if(r.statementLayout?.partId===p.partId)part.html=renderLabeledSourceFragment(renderer,`${label?label+' ':''}${prompt.text}`,r.statementLayout);
   if(p.visual?.plotVersion==='mates-log-parabola-areas-v1'){
    assert.ok(matesIntegral);const svg=renderLogParabolaAreas(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Funciones oficiales y áreas comprobadas; coordenadas normalizadas identificadas cuando procede',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='mates-parabola-exponential-v1'){
    assert.ok(matesIntegral);const svg=renderParabolaExponential(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Parábola oficial y recinto limitado por las curvas del ejercicio',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='storage-piecewise-hyperbola-v1'){
    assert.ok(matesIntegral||calculus||linear);const svg=renderStoragePiecewiseHyperbola(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Región factible o gráficas oficiales por tramos, con vértices, extremos y fronteras verificadas.',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='limit-geometry-integral-extrema-v1'){
    assert.ok(matesIntegral||calculus);const svg=renderLimitGeometryIntegralExtrema(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Recinto oficial entre la función logarítmica, la recta tangente y la frontera vertical.',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='asymptotes-cubic-tank-v1'){
    assert.ok(matesIntegral||calculus);const svg=renderAsymptotesCubicTank(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Gráfica oficial reconstruida con extremos, ceros y dominio físico verificados.',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='exponential-reciprocal-regions-v1'){
    assert.ok(matesIntegral);const svg=renderExponentialReciprocalRegions(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Recintos oficiales de exponenciales, tangentes y función recíproca, con fronteras verificadas.',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='tangent-piecewise-regions-v1'){
    assert.ok(matesIntegral||calculus);const svg=renderTangentPiecewiseRegions(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Gráfica derivada de las fórmulas oficiales, con ramas y recinto distinguidos.',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='piecewise-cubic-absolute-areas-v1'){
    assert.ok(matesIntegral||calculus);const svg=renderPiecewiseCubicAbsolute(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Funciones oficiales por tramos y recintos calculados; extremos abiertos y cerrados diferenciados',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='mates-normal-absolute-areas-v1'){
    assert.ok(matesIntegral);const svg=renderNormalAbsoluteAreas(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Parábolas oficiales y recintos delimitados por las intersecciones calculadas',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='mates-ftc-positive-area-v1'){
    assert.ok(matesIntegral);const svg=renderFtcPositiveArea(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Recinto oficial de f(x)=2x exp(x²), entre el eje horizontal y x=1',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='mates-gaussian-tangent-areas-v1'){
    assert.ok(matesIntegral);const svg=renderGaussianTangentArea(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Funciones oficiales y recinto delimitado por los límites de integración comprobados',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='mates-optimal-slope-regions-v1'){
    assert.ok(matesIntegral||matesAnalysis);const svg=renderOptimalSlopeRegion(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Esquema o recinto matemático derivado de los datos oficiales y de la resolución comprobada',sha256:digest(svg)};
   }else if(['mates-tangent-exponential-areas-v1','mates-exponential-linear-region-v1'].includes(p.visual?.plotVersion)){
    assert.ok(matesIntegral);const svg=p.visual.plotVersion==='mates-tangent-exponential-areas-v1'?renderTangentExponentialAreaGraph(p.visual):renderExponentialLinearRegion(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Funciones oficiales, tangencias y recinto delimitado por los límites de integración del enunciado',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='mates-asymptote-graphs-v1'){
    assert.equal(r.subject,'Matemáticas II');const svg=renderAsymptoteGraph(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Esbozo de las funciones oficiales: ramas separadas, extremos y recinto cuando procede',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='mates-source-areas-v1'){
    assert.ok(matesIntegral||matesAnalysis);const svg=renderSourceAreaGraph(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Funciones oficiales, puntos y recinto de integración verificados a partir del enunciado',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='mates-trig-quartic-areas-v1'){
    assert.ok(matesIntegral);const svg=renderAreaGraph(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Gráficas de las funciones oficiales con ejes, puntos e intervalo de área identificados',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='mates-rational-area-v1'){
    assert.ok(matesIntegral);const svg=renderMatesAreaGraph(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Región entre la función racional oficial y el eje de abscisas, delimitada por x=2 y x=3',sha256:digest(svg)};
   }else if(p.visual?.visualType==='area-graph'&&!p.visual.schemaVersion){
     const svg=renderLegacyPolynomialAreaGraph(p.visual);
     part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Parábola oficial y recinto de área delimitado por las abscisas del enunciado',sha256:digest(svg)};
   }else if(p.visual?.visualType==='piecewise-function'&&!p.visual.schemaVersion){
     const svg=renderLegacyPiecewiseFunctionGraph(p.visual);
     part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Función oficial por tramos, con el extremo abierto y el extremo cerrado diferenciados',sha256:digest(svg)};
   }else if(p.visual&&matrix){
    assert.equal(p.visual.schemaVersion,'mathup.adjacency-graph.v1');
    const svg=renderAdjacencyGraph(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Grafos C y D derivados de las matrices de adyacencia oficiales, con todos los vértices y aristas identificados',sha256:digest(svg)};
   }else if(p.visual&&calculus){
     assert.equal(p.visual.schemaVersion,'mathup.calculus-graph.v1',JSON.stringify({exerciseId:r.exerciseId,queueIndex:r.queueIndex,partId:p.partId,primaryTopic:r.primaryTopic,visual:p.visual}));
    assert.ok([undefined,'piecewise-endpoints-v1','cost-and-bounded-region-v1','rational-branches-v1','bounded-piecewise-v1','official-applications-v1','growth-hyperbola-v1','extrema-applications-v1','chain-area-weight-v1','greenhouse-area-v1','2020-b-parabola-band-v1','quadratic-profit-v1','quadratic-business-costs-v1','native-2012-function-graphs-v1','native-2012-rational-graph-v1','recovered-parabola-v1','concentration-piecewise-v1','cost-quadratic-v1'].includes(p.visual.plotVersion),'Unknown calculus graph must fail closed');
    const svg=['recovered-parabola-v1','concentration-piecewise-v1','cost-quadratic-v1'].includes(p.visual.plotVersion)?renderRecoveredOfficialCalculusGraph(p.visual):p.visual.plotVersion==='native-2012-function-graphs-v1'?renderDocFunctionGraph(p.visual):p.visual.plotVersion==='native-2012-rational-graph-v1'?renderDocRationalGraph(p.visual):p.visual.plotVersion==='quadratic-business-costs-v1'?renderBusinessCostGraph(p.visual):p.visual.plotVersion==='quadratic-profit-v1'?renderQuadraticProfitGraph(p.visual):p.visual.plotVersion==='2020-b-parabola-band-v1'?renderPicnicAreaGraph(p.visual):p.visual.plotVersion==='chain-area-weight-v1'?renderChainAreaWeightGraph(p.visual):p.visual.plotVersion==='greenhouse-area-v1'?renderGreenhouseGraph(p.visual):p.visual.plotVersion==='extrema-applications-v1'?renderExtremaApplicationsGraph(p.visual):p.visual.plotVersion==='growth-hyperbola-v1'?renderGrowthHyperbolaGraph(p.visual):p.visual.plotVersion==='official-applications-v1'?renderOfficialApplicationsGraph(p.visual):p.visual.plotVersion==='bounded-piecewise-v1'?renderBoundedPiecewiseGraph(p.visual):p.visual.plotVersion==='rational-branches-v1'?renderRationalCalculusGraph(p.visual):p.visual.plotVersion==='piecewise-endpoints-v1'?renderBranchGraph(p.visual):p.visual.plotVersion==='cost-and-bounded-region-v1'?renderCostGraph(p.visual):renderCalculusGraph(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Gráfica derivada de la función oficial, con dominio, puntos y tramos identificados',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='absolute-area-v1'){
    assert.ok(matesIntegral);const svg=renderAbsoluteAreaGraph(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Recinto oficial entre la función de valor absoluto y la recta, con los puntos de corte verificados',sha256:digest(svg)};
   }else if(p.visual?.plotVersion==='linear-northeast-unbounded-v1'){
    assert.ok(linear);assert.equal(p.visual.schemaVersion,'mathup.linear-programming-visual.v1');
    const svg=renderNortheastGraph(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Región factible no acotada hacia arriba y a la derecha; fronteras, vértices y mínimo identificados',sha256:digest(svg)};
   }else if(p.visual){
    assert.ok(linear,JSON.stringify({exerciseId:r.exerciseId,queueIndex:r.queueIndex,primaryTopic:r.primaryTopic,plotVersion:p.visual.plotVersion,schemaVersion:p.visual.schemaVersion}));assert.equal(p.visual.schemaVersion,p.visual.plotVersion==='linear-investment-segment-v1'?'mathup.calculus-graph.v1':'mathup.linear-programming-visual.v1');
    assert.ok([undefined,'integer-quadrilateral-v1','linear-polygon-general-v1','linear-rational-polygon-v1','linear-unbounded-region-v1','linear-investment-segment-v1','linear-feed-unbounded-v1','linear-production-optimal-face-v1'].includes(p.visual.plotVersion),'Unsupported graph geometry must not reuse another graph');
    const svg=p.visual.plotVersion==='linear-investment-segment-v1'?renderInvestmentSegment(p.visual):p.visual.plotVersion==='linear-feed-unbounded-v1'?renderFeedGraph(p.visual):p.visual.plotVersion==='linear-production-optimal-face-v1'?renderOptimalFaceGraph(p.visual):p.visual.plotVersion==='linear-unbounded-region-v1'?renderUnboundedGraph(p.visual):p.visual.plotVersion==='linear-rational-polygon-v1'?renderRationalGraph(p.visual):p.visual.plotVersion==='linear-polygon-general-v1'?renderGeneralRegionGraph(p.visual):p.visual.plotVersion==='integer-quadrilateral-v1'?renderQuadrilateralGraph(p.visual):renderGraph(p.visual);
    part.solutionMathOptions.solutionGraph={src:'data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),alt:'Región factible con sus vértices identificados y coordenadas',sha256:digest(svg)};
   }
   // Validate the output projection, not internal transport syntax. Independent
   // mathematical equality has already been proved over the original answers.
   if(linear)part.solutionNotationProjection=p.solutionSteps.map((s,i)=>({stepIndex:i,...projectRegionVariable(`${s.explanation}\n${s.math}`)}));
   const renderMathValue=value=>renderStructuredMath(renderer,displayMathValue(value));
   const rendered={exerciseId:part.id,coursePolicy:mates?'matematicas_ii':'ccss_ii',statement:glyphs.statementLayout||r.statementLayout?commonHtml+'\n'+part.html:renderer.text(displayCommon+'\n'+prompt.text,{preserveTrigNotation:true}),
    answer:renderMathValue(p.answer),finalAnswer:renderMathValue(p.finalAnswer),distractors:p.distractors.map(renderMathValue),
    steps:p.solutionSteps.map(s=>({explanation:renderer.text(notationProjection(s.explanation,{preserveTrigNotation:true}).text,{preserveTrigNotation:true}),math:renderStructuredMath(renderer,notationProjection(projectRendererMath(s.math).text,{preserveTrigNotation:true}).text,{preserveTrigNotation:true})})),verification:{verified:p.verification.verified,method:p.verification.method,detail:p.verification.detail},methods:p.methods,
    multipleChoice:true,attemptSeed:'inference-delivery-check'};
   const policy=validateSolutionRecord(rendered);assert.ok(policy.valid,JSON.stringify({id:part.id,errors:policy.errors,statement:rendered.statement,steps:rendered.steps}));
   checks.push({partId:part.id,recordHash:r.recordHash,sourcePartsHash:e.partsHash,projectionHash:semanticHash(rendered),policy,scope:'RENDERED_PROJECTION_POLICY_NOT_REPLACEMENT_FOR_MATH_OR_BROWSER_CHECK'});
   return part;
  });
  const probability=r.primaryTopic==='Probabilidad';
  const secondaryTopics=[];
  if(probability||mates||linear||matrix||calculus)secondaryTopics.push(...r.secondaryTopics);
  if(r.parts.some(p=>/TAILED_PROPORTION_TEST|HYPOTHESIS/.test(p.verification.method)))secondaryTopics.push('Contrastes de hipótesis');
  if(r.parts.some(p=>/NORMAL_SAMPLE_MEAN|NORMAL_SYMMETRY/.test(p.verification.method)))secondaryTopics.push('Distribución de la media muestral');
  if(!calculus&&!linear&&!matrix&&!probability&&r.parts.some(p=>/PROPORTIONAL|STRATIFIED|STRATA|ENUMERATION/.test(p.verification.method)))secondaryTopics.push('Muestreo y afijación proporcional');
  if(!mates&&!calculus&&r.parts.some(p=>/^\[/.test(p.answer)||p.solutionSteps.some(s=>/\bIC\b|amplitud/.test(s.math))))secondaryTopics.push('Intervalos de confianza');
  if(!mates&&!calculus&&r.parts.some(p=>/^n =/.test(p.answer)&&!/PROPORTIONAL/.test(p.verification.method)))secondaryTopics.push('Tamaño muestral');
  // A verified official page may contradict an historical option assignment.
  // Keep both; never infer an option from topic or from the answer.
  const pageQuestion=/^([AB])\.(\d+)$/.exec(glyphs.evidence?.officialQuestion??'');
  if(r.integrationEvidence){
   assert.deepEqual(Object.keys(r.integrationEvidence).sort(),['advancedIntegrationMethods','scope']);
   assert.equal(r.integrationEvidence.advancedIntegrationMethods,false);
   assert.ok([
    'IMMEDIATE_EXPONENTIAL_AND_POLYNOMIAL_SIGNED_INTEGRAL_EXPLICITLY_REQUESTED_BY_OFFICIAL_EXAM',
    'IMMEDIATE_LOGARITHMIC_AND_POLYNOMIAL_AREA_EXPLICITLY_REQUESTED_BY_OFFICIAL_EXAM',
    'IMMEDIATE_EXPONENTIAL_AND_NEGATIVE_POWER_INTEGRALS_EXPLICITLY_REQUESTED_BY_OFFICIAL_EXAM',
   ].includes(r.integrationEvidence.scope),'Unsupported official integration scope');
  }
  const documentedIdentity=pageQuestion?{questionKey:pageQuestion[2],alternativeKey:pageQuestion[1]}:{questionKey:c.questionKey,alternativeKey:c.alternativeKey??null};
  records.push({exerciseId:r.exerciseId,queueIndex:r.queueIndex,subject:mates?'2_bach_mates_ii':'2_bach_ccss_ii',community:'Andalucía',year:r.year,sitting:c.sitting??null,
   ...documentedIdentity,...(pageQuestion?{documentIdentityEvidence:{historical:{questionKey:c.questionKey,alternativeKey:c.alternativeKey??null},officialQuestion:glyphs.evidence.officialQuestion,documentHash:c.documentHash,page:glyphs.evidence.page}}:{}),variant:c.variant??null,documentHash:c.documentHash,
   sourceAuthority:'OFFICIAL_DOCUMENT_RECONCILED',officialPromptLiteral:glyphs.text,learnerStatement:displayCommon,scoreEvidence:r.scoreEvidence??c.scoreEvidence??[],
   learnerStatementHtml:commonHtml,
   ...(glyphs.statementLayout?{statementLayout:glyphs.statementLayout}:{}),
	sourceProjection:{originalHash:digest(glyphs.text),...projection,commonNotationChanges:commonNotation.changes,...(glyphs.evidence?{glyphEvidence:glyphs.evidence,glyphChanges:glyphs.changes}:{})},block:linear||matrix?'Álgebra':'Probabilidad y Estadística',blockId:linear||matrix?'algebra':mates?'probabilidad-estadistica':probability?'probabilidad':'estadistica',primaryTopic:matrix?'Matrices':linear?'Programación lineal':probability?'Probabilidad':mates?'Distribución normal':'Muestreo e inferencia estadística',topicIndexes:matrix?[0]:linear?[3]:mates?[probability?12:13]:probability?[8]:[10],secondaryTopics,examSlot:matrix?1:linear?2:mates?5:4,examFamilyLabel:matrix?'Ejercicio 1 · Matrices':linear?'Ejercicio 2 · Sistemas y programación lineal':mates?'Ejercicio 5 · Probabilidad y estadística':'Ejercicio 4 · Probabilidad o estadística',...(!linear&&!matrix&&!probability&&secondaryTopics.some(t=>t!=='Muestreo y afijación proporcional')?{referenceTable:'normal'}:{}),
    ...(calculus?{block:'Análisis',blockId:'analisis',primaryTopic:'Derivadas y aplicaciones',topicIndexes:[5,...(secondaryTopics.includes('Continuidad')?[4]:[]),...(secondaryTopics.includes('Integrales inmediatas')?[6]:[]),...(secondaryTopics.includes('Integrales definidas y áreas')?[7]:[])],examSlot:3,examFamilyLabel:'Ejercicio 3 · Análisis',referenceTable:undefined,
     ...(secondaryTopics.some(t=>['Integrales inmediatas','Integrales definidas y áreas'].includes(t))?{methodEligibilityEvidence:{scope:secondaryTopics.includes('Integrales definidas y áreas')?'IMMEDIATE_POLYNOMIAL_AREA_EXPLICITLY_REQUESTED_BY_OFFICIAL_EXAM':'IMMEDIATE_POLYNOMIAL_PRIMITIVE_EXPLICITLY_REQUESTED_BY_OFFICIAL_EXAM',documentHash:c.documentHash,page:glyphs.evidence.page,officialQuestion:glyphs.evidence.officialQuestion,advancedIntegrationMethods:false}}:{})}:{}),
   ...(r.integrationEvidence?{methodEligibilityEvidence:{...r.integrationEvidence,documentHash:c.documentHash,page:glyphs.evidence.page,officialQuestion:glyphs.evidence.officialQuestion}}:{}),
   ...(matesAlgebra||matesAnalysis||matesIntegral?{
    block:matesAlgebra?'Álgebra':'Análisis',blockId:matesAlgebra?'algebra':'analisis',primaryTopic:r.primaryTopic,
    topicIndexes:[...new Set([r.primaryTopic,...r.secondaryTopics].flatMap(t=>({'Matrices':[0],'Determinantes':[1],'Matrices y determinantes':[0,1],'Sistemas con determinantes':[2],'Límites y asíntotas':[6],'Continuidad y derivabilidad':[7,8],'Derivadas':[8],'Aplicaciones de derivadas':[9],'Primitivas y métodos de integración':[10],'Integrales indefinidas':[10],'Integrales definidas y áreas':[11]})[t]??[]))].sort((a,b)=>a-b),
    examSlot:matesAlgebra?1:matesAnalysis?2:3,examFamilyLabel:matesAlgebra?'Ejercicio 1 · Álgebra':matesAnalysis?'Ejercicio 2 · Límites, continuidad y derivadas':'Ejercicio 3 · Integrales',referenceTable:undefined,
    methodEligibilityEvidence:{...r.matesEvidence,page:glyphs.evidence.page,officialQuestion:glyphs.evidence.officialQuestion}
   }:{}),
   ...(geometry?{block:'Geometría',blockId:'geometria',primaryTopic:r.primaryTopic,topicIndexes:[r.primaryTopic,...r.secondaryTopics].map(t=>({'Vectores':3,'Planos y rectas':4,'Problemas métricos':5})[t]).filter(Number.isInteger).sort(),examSlot:4,examFamilyLabel:'Ejercicio 4 · Geometría',referenceTable:undefined,methodEligibilityEvidence:{...r.geometryEvidence,page:glyphs.evidence.page,officialQuestion:glyphs.evidence.officialQuestion}}:{}),
   deliveryEligibility:['topic-challenge','block-challenge','exam'],publicationState:'AWAITING_FINAL_COMPONENT_CHECK',parts,
   resolutionEvidence:{recordHash:r.recordHash,partsHash:e.partsHash,sourceHash:c.documentHash,mathematical:e.mathVerification}});
 }
 return {schemaVersion:'mathup.inference-delivery-projection.v1',engineHash:digest(read('math-renderer.js')),componentsHash:digest(publicComponents()),inputHash:digest(read('artifacts/pau-andalucia-resolution/completed-exercises.jsonl')),records,deferred,checks};
}
export function candidateRuntime(records){
 const source=baselineRuntime(read('data/andalucia-pau-runtime.js'));
 assert.ok(source.includes('  function runtimeCourseId(subject)'));
 const byIdentity=new Map();
 for(const record of records){
  const previous=byIdentity.get(record.exerciseId);
  if(previous){
   assert.deepEqual(record,previous,`Canonical delivery identity collision is not a byte-semantic alias: ${record.exerciseId}`);
   continue;
  }
  byIdentity.set(record.exerciseId,record);
 }
 const uniqueRecords=[...byIdentity.values()];
 const delivered=uniqueRecords.map(r=>({...r,publicationState:'LOCAL_ENABLED_AFTER_INDEPENDENT_AND_COMPONENT_CHECKS',parts:r.parts.map(p=>['analisis','geometria'].includes(r.blockId)?{...p,semanticAnswer:projectEquationSpacing(p.semanticAnswer),distractors:p.distractors.map(projectEquationSpacing),finalAnswer:projectEquationSpacing(p.finalAnswer)}:p)}));
 return source.replace('const PUBLISHABLE_TOTAL = 28;',`const PUBLISHABLE_TOTAL = ${28+uniqueRecords.length};`)
  .replace('  function runtimeCourseId(subject)',`  // BEGIN VERIFIED INFERENCE DELIVERY\n  exercises.push(...${JSON.stringify(delivered)});\n  // END VERIFIED INFERENCE DELIVERY\n  function runtimeCourseId(subject)`)
  .replace('text: item.officialPromptLiteral,','text: item.learnerStatement ?? item.officialPromptLiteral,\n          ...(item.learnerStatementHtml ? { statementHtml: item.learnerStatementHtml } : {}),\n          ...(item.referenceTable ? { referenceTable: item.referenceTable } : {}),');
}
export function baselineRuntime(source){
 return source.replace(/  \/\/ BEGIN VERIFIED INFERENCE DELIVERY\r?\n[\s\S]*?  \/\/ END VERIFIED INFERENCE DELIVERY\r?\n/,'')
  .replace(/const PUBLISHABLE_TOTAL = \d+;/,'const PUBLISHABLE_TOTAL = 28;')
  .replace('text: item.learnerStatement ?? item.officialPromptLiteral,\n          ...(item.learnerStatementHtml ? { statementHtml: item.learnerStatementHtml } : {}),\n          ...(item.referenceTable ? { referenceTable: item.referenceTable } : {}),','text: item.officialPromptLiteral,')
  .replace('text: item.learnerStatement ?? item.officialPromptLiteral,\n          ...(item.referenceTable ? { referenceTable: item.referenceTable } : {}),','text: item.officialPromptLiteral,');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const result=prepare();fs.mkdirSync(output,{recursive:true});
 fs.writeFileSync(`${output}/prepared.json`,JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({prepared:result.records.length,deferred:result.deferred.length,parts:result.checks.length,policyFailed:result.checks.filter(r=>!r.policy.valid).length}));
}
