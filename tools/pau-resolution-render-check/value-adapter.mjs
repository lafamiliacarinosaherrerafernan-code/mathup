// Isolated projection, not a change to an official statement or public renderer.
// Only a comma/semicolon followed by explicit native spacing, outside delimiters,
// may separate complete relation clauses. Tokens (including punctuation) are kept.
export function nativeRelationRanges(ast){
 const nodes=ast?.body?.type==='sequence'?ast.body.children:null;
 if(!Array.isArray(nodes))return null;
 const ends=[],stack=[];let start=0;
 const relation=x=>x.type==='operator'&&['=','<','>','≤','≥','≠'].includes(x.value);
 const pairs={')':'(',']':'[','}':'{'};
 for(let i=0;i<nodes.length;i++){
  const n=nodes[i];
  // Spanish conjunction between two fully specified matrix assignments is an
  // editorial break, not a multiplication by an inferred variable y.
  // Keep every native node, including the conjunction and all its spacing.
  if(n.type==='identifier'&&n.value==='y'&&!stack.length&&nodes[i-1]?.type==='space'&&nodes[i+1]?.type==='space'){
   const left=nodes.slice(start,i).filter(x=>x.type!=='space');
   const right=nodes.slice(i+1).filter(x=>x.type!=='space');
   const matrix=x=>x?.type==='delimited'&&x.body?.type==='matrix';
   if(left.some(relation)&&matrix(left.at(-1))&&right[0]?.type==='identifier'&&right[1]?.value==='='&&matrix(right[2])){ends.push([start,i]);start=i;}
  }
  if(n.type!=='operator')continue;
  if(['(','[','{'].includes(n.value))stack.push(n.value);
  if(pairs[n.value]&&stack.pop()!==pairs[n.value])return null;
  if([',',';'].includes(n.value)&&!stack.length&&nodes[i+1]?.type==='space'){
   let end=i+1;while(nodes[end]?.type==='space')end++;
   if(!nodes.slice(start,i).some(relation))return null;
   ends.push([start,end]);start=end;i=end-1;
  }
 }
 if(stack.length||!ends.length||!nodes.slice(start).some(relation))return null;
 ends.push([start,nodes.length]);return ends;
}
export function separateEditorialScores(text){
 const evidence=[];
 const learnerText=String(text).replace(/\(\s*\d+(?:[,.]\d+)?\s*puntos?\s*\)/gi,(literal,offset)=>{evidence.push({literal,start:offset,end:offset+literal.length});return '';});
 return {learnerText,scoreEvidence:evidence,originalText:String(text)};
}
export function isNumericMatrix(value){
 return Array.isArray(value)&&value.length>0&&value.every(r=>Array.isArray(r)&&r.length===value[0].length&&r.length>0&&r.every(v=>typeof v==='number'&&Number.isFinite(v)));
}
// Reversible transport adapter: explicit branches already carry their conditions.
// Never infer a branch separator from commas or repair unbalanced expressions.
export function projectRendererPiecewise(value){
 const originalText=String(value),changes=[];
 let text='',cursor=0;const pattern=/\bpiecewise\{/g;let match;
 while((match=pattern.exec(originalText))){
  const offset=match.index,open=pattern.lastIndex-1;let depth=1,end=open+1;
  for(;end<originalText.length&&depth;end++){if(originalText[end]==='{')depth++;else if(originalText[end]==='}')depth--;}
  if(depth)throw Error('PIECEWISE_STRUCTURE_REVIEW_REQUIRED');
  const body=originalText.slice(open+1,end-1),branches=body.split(';');
  if(branches.length<2||branches.some(b=>!/^.+\s+si\s+.+$/.test(b.trim())))throw Error('PIECEWISE_BRANCH_REVIEW_REQUIRED');
  const literal=originalText.slice(offset,end),replacement=`{${body}}`;
  changes.push({start:offset,end,literal,replacement,rule:'EXPLICIT_PIECEWISE_TRANSPORT'});
  text+=originalText.slice(cursor,offset)+replacement;cursor=end;pattern.lastIndex=end;
 }
 text+=originalText.slice(cursor);
 if(/\bpiecewise\s*\{/i.test(text))throw Error('PIECEWISE_STRUCTURE_REVIEW_REQUIRED');
 return {text,originalText,changes};
}
export function projectRendererMath(value){
 const piecewise=projectRendererPiecewise(value),changes=[];
 // The existing renderer recognizes an explicit system only on its own line.
 // Move the documented label to the preceding line; equations remain literal.
 const named=piecewise.text.replace(/^([ \t]*[A-Za-z][₀-₉]?[ \t]*:)[ \t]+(?=system\{)/gm,(literal,label,offset)=>{
  const replacement=label+'\n';changes.push({start:offset,end:offset+literal.length,literal,replacement,rule:'NAMED_SYSTEM_LINE_BOUNDARY'});return replacement;
 });
 // Explicit, balanced transport nodes may follow prose too. Isolate the node
 // without changing any equation, punctuation or explanatory text.
 const inlineChanges=[];let text='',cursor=0;const pattern=/\bsystem\{/g;let m;
 while((m=pattern.exec(named))){
  let depth=1,end=pattern.lastIndex;
  for(;end<named.length&&depth;end++){if(named[end]==='{')depth++;else if(named[end]==='}')depth--;}
  if(depth)throw Error('SYSTEM_STRUCTURE_REVIEW_REQUIRED');
  const literal=named.slice(m.index,end);
  const prefix=named.slice(named.lastIndexOf('\n',m.index-1)+1,m.index);
  const nextLine=named.indexOf('\n',end),suffix=named.slice(end,nextLine<0?named.length:nextLine);
  const replacement=(prefix.trim()?'\n':'')+literal+(suffix.trim()?'\n':'');
  text+=named.slice(cursor,m.index);
  if(replacement!==literal)inlineChanges.push({start:m.index,end,projectedStart:text.length,literal,replacement,rule:'EXPLICIT_SYSTEM_LINE_BOUNDARY'});
  text+=replacement;cursor=end;pattern.lastIndex=end;
 }
 text+=named.slice(cursor);
 return {text,originalText:String(value),stages:[piecewise,{originalText:piecewise.text,text:named,changes},{originalText:named,text,changes:inlineChanges}]};
}
export function renderCandidateValue(renderer,value){
 if(typeof value==='string'||typeof value==='number')return renderer.text(projectRendererMath(value).text);
 if(isNumericMatrix(value))return renderer.matrix(JSON.stringify(value));
 if(value&&typeof value==='object'&&!Array.isArray(value)){
  const entries=Object.entries(value);
  if(entries.length&&entries.every(([,v])=>isNumericMatrix(v)))return entries.map(([label,matrix])=>`<div class="named-matrix">${renderer.text(label)}: ${renderer.matrix(JSON.stringify(matrix))}</div>`).join('');
 }
 throw new Error('STRUCTURED_VALUE_ADAPTER_REQUIRED');
}
