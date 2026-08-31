import assert from 'node:assert/strict';
export const growthHyperbolaObservations=[
 [433,'eb859ec01d70086dca9d66db3bfc243537cc50589e2d9484faef7d8974134320',1,'3','c9f0cedb7b5e4b8c718cdea02adc535d566968197faef3166093a3f16b9612c8',0],
 [511,'010da3d1a9c2777988000c108cedcb180ec7bbae4ce1e291cc01a287870ab775',1,'4','27df2e1a7204f634a43efb7f96276f24dde4e35cad687a5a7d634e05f16c10fc',0],
];
export function growthHyperbolaReplacements(r){const i=r.queueIndex;if(!growthHyperbolaObservations.some(o=>o[0]===i))return[];const out=[],at=r.sourceLiteral.search(/a\) \(/);assert.ok(at>0);
 const prefix=i===433?'Trinidad, una persona ahorradora, deposita 5000 € en un fondo de inversión y el capital que obtiene cuando transcurren t años viene dado por la siguiente función: f(t)={5000·(1+0,05t) si 0≤t≤1; 5000·1,05^t si t>1}.':'Se considera la función f(x)=frac{x−3}{x+2}.';
 out.push([r.sourceLiteral.slice(0,at),prefix+'\n\n','PDF_VISIBLE_COMPLETE_FUNCTION_AND_DOMAIN']);
 const prompts=i===433?[
 '¿Cuánto tiempo debe mantener invertido el dinero si el capital final que se obtiene es de 5931,10 €?',
 'Calcule los intereses que obtiene Trinidad entre el año 2 y el año 4, si se conoce que los intereses que genera esta inversión entre el año t₁ y el año t₂ vienen dados por I=f(t₂)−f(t₁).',
 'Estudie la continuidad y derivabilidad de la función f.',
 'Estudie la monotonía de la función f y esboce su gráfica.',
 ]:[
 'Determine el dominio de la función f y estudie su monotonía y curvatura.',
 'Calcule las ecuaciones de las asíntotas de f si existen. Calcule los puntos de corte de la gráfica de f con los ejes de coordenadas.',
 'Represente la gráfica de la función f.',
 ];
 assert.equal(r.parts.length,prompts.length);prompts.forEach((p,k)=>out.push([r.parts[k].prompt,p,'PDF_VISIBLE_COMPLETE_SUBPART']));return out;
}
