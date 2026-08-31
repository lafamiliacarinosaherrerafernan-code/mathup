// Source-bound layout projection. Labels have explicit grid cells; no spacing
// characters, absolute coordinates, new numbers or mathematical inference.
import assert from 'node:assert/strict';
const escape=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderLabeledMatrixPair(spec){
 assert.equal(spec.schemaVersion,'mathup.labeled-matrix-pair.v1');assert.equal(spec.matrices.length,2);
 return '<div class="source-labeled-matrix-pair" style="display:flex;flex-wrap:wrap;gap:1.3em;align-items:center;justify-content:center;max-width:100%">'+spec.matrices.map(m=>{
  const rows=m.values.length,cols=m.columnHeaders.length;
  assert.ok(rows>0&&cols>0);assert.equal(m.rowHeaders.length,rows);assert.ok(m.values.every(r=>r.length===cols&&r.every(x=>typeof x==='number'&&Number.isFinite(x))));
  let cells=m.columnHeaders.map((label,j)=>`<span data-column="${j}" style="grid-row:1;grid-column:${j+3};text-align:center">${escape(label)}</span>`).join('');
  const fence=(side,col)=>`<span aria-hidden="true" style="grid-row:2 / span ${rows};grid-column:${col};display:flex;align-items:center;line-height:1;font-size:${rows*1.4}em">${side}</span>`;
  cells+=fence('(',2)+fence(')',cols+3);
  for(let i=0;i<rows;i++){
   cells+=`<span data-row="${i}" style="grid-row:${i+2};grid-column:1;align-self:center;font-size:.75em">${escape(m.rowHeaders[i])}</span>`;
   for(let j=0;j<cols;j++)cells+=`<span data-cell="${i}:${j}" style="grid-row:${i+2};grid-column:${j+3};text-align:center;align-self:center">${escape(m.values[i][j])}</span>`;
  }
  return `<section data-matrix="${escape(m.label)}" aria-label="Matriz ${escape(m.label)}; filas ${escape(m.rowHeaders.join(', '))}; columnas ${escape(m.columnHeaders.join(', '))}; ${escape(m.unit)}" style="display:flex;gap:.25em;align-items:center;font-family:Cambria,serif;font-size:1.05em;max-width:100%"><span>${escape(m.label)} =</span><div style="display:grid;grid-template-columns:auto auto repeat(${cols},minmax(1.3em,max-content)) auto;column-gap:.18em;row-gap:.1em">${cells}</div></section>`;
 }).join('')+'</div>';
}
export function renderLabeledSourceFragment(renderer,text,{anchor,...spec}){
 assert.ok(typeof anchor==='string'&&anchor.length>0);const at=text.indexOf(anchor);assert.ok(at>=0,'Missing exact source-bound labeled matrix anchor');assert.equal(text.indexOf(anchor,at+anchor.length),-1,'Ambiguous repeated matrix anchor');
 return renderer.text(text.slice(0,at),{preserveTrigNotation:true})+renderLabeledMatrixPair(spec)+renderer.text(text.slice(at+anchor.length),{preserveTrigNotation:true});
}
