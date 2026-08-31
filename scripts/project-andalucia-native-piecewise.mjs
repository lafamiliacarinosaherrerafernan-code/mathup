// Transport-only projection of the already human-validated DOC Equation.3 syntax.
// Preserve every branch expression and condition verbatim; never infer a branch.
import assert from 'node:assert/strict';
export function projectNativePiecewise(literal){
 const changes=[];
 let text=literal.replace(/\\left\\\{\\begin\{matrix\}([\s\S]*?)\\end\{matrix\}\\right\./g,(before,body,offset)=>{
  const rawRows=body.split(/\\\\/).map(row=>row.split('&').map(x=>x.trim()));
  // A fully empty three-cell row is a native vertical spacer, not a branch.
  // Partially empty or differently shaped rows remain an error.
  const rows=rawRows.filter(r=>!(r.length===3&&r.every(x=>x==='')));
  assert.ok(rows.length>=2&&rows.every(r=>r.length===3&&r[1]==='si'&&r[0]&&r[2]),'Only demonstrated expression/si/condition rows may be projected');
  const after='{'+rows.map(([expression,,condition])=>expression+' si '+condition).join('; ')+'}';
  changes.push({offset,before,after,rule:'HUMAN_VALIDATED_NATIVE_PIECEWISE_ROWS_TO_RENDERER_BRANCHES'});return after;
 });
 text=text.replace(/\\frac(?=\{)/g,(before,offset)=>{changes.push({offset,before,after:'frac',rule:'NATIVE_LATEX_FRAC_TO_RENDERER_FRACTION_TOKEN'});return 'frac';});
 return {text,changes};
}
