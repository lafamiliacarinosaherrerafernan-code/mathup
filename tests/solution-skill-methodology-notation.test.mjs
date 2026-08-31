import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const skill = fs.readFileSync('.agents/skills/solucion-de-ejercicios/SKILL.md', 'utf8');
const policy = JSON.parse(fs.readFileSync('.agents/skills/solucion-de-ejercicios/references/policy-matrix.json', 'utf8'));
const appSource = fs.readFileSync('app.js', 'utf8');

test('la política condiciona asíntotas y cocientes en los cursos que los trabajan', () => {
  for (const course of ['matematicas_i', 'matematicas_ii', 'ccss_ii']) {
    assert.equal(policy.courses[course].asymptotes, 'LATERAL_AND_INFINITY_LIMITS_REQUIRED');
    assert.equal(policy.courses[course].quotientDerivative, 'DIRECT_RULE_PREFERRED');
  }
  assert.match(skill, /Vertical `x=a`:[\s\S]*l[ií]mites laterales/);
  assert.match(skill, /Oblicua `y=mx\+n`:[\s\S]*m=lim[\s\S]*n=lim/);
});

test('normal exige tipificación dentro del suceso y lectura explícita de tabla', () => {
  for (const course of ['matematicas_ii', 'ccss_ii']) {
    assert.equal(policy.courses[course].normal, 'INLINE_STANDARDIZATION_WITH_TABLE_READING');
  }
  assert.match(skill, /Cola derecha:[\s\S]*P\(X≥a\)=P\(Z≥frac/);
  assert.match(skill, /No escribir un valor aislado `z=/);
  assert.match(skill, /no usar `Φ`, `Φ⁻¹`, `invNorm`/i);
});

test('Matemáticas II fija la secuencia operativa completa de integración por partes', () => {
  const section = skill.match(/## Integración por partes en Matemáticas II([\s\S]*?)## Integrales racionales mediante fracciones simples/)?.[1] || '';
  assert.match(section, /`∫u\\,dv=u·v−∫v\\,du`/);
  assert.match(section, /Identificar expresamente[\s\S]*`u` y `dv`/);
  assert.match(section, /Calcular y mostrar `du`[\s\S]*obtener `v`/);
  assert.match(section, /Sustituir `u`, `v`, `du` y `dv`/);
  assert.match(section, /Desarrollar por completo la integral resultante/);
  assert.match(section, /comprobarlo por derivación/);
  assert.doesNotMatch(section, /madrid-mates-|exerciseId/i);
});

test('Matemáticas II formaliza la aproximación binomial-normal con continuidad y tabla sin Φ', () => {
  const section = skill.match(/## Aproximación binomial por normal en Matemáticas II([\s\S]*?)## Áreas mediante integrales definidas/)?.[1] || '';
  assert.match(section, /identificar `n`, `p` y `q=1−p`/i);
  assert.match(section, /`μ=np` y `σ=√\(npq\)`/);
  assert.match(section, /corrección de continuidad[\s\S]*variable discreta a una continua/i);
  assert.match(section, /«al menos `k`»[\s\S]*`k−0,5`/);
  assert.match(section, /«como máximo `k`»[\s\S]*`k\+0,5`/);
  assert.match(section, /tipificar dentro de esa misma probabilidad/);
  assert.match(section, /`P\(Z≤z\)`[\s\S]*tabla[\s\S]*No usar `Φ`, `Φ⁻¹`, `invNorm`/i);
  assert.doesNotMatch(section, /madrid-mates-|exerciseId/i);
});

test('áreas conservan la integral completa y el caso de control de Ordinaria 2017', () => {
  assert.equal(policy.courses.matematicas_ii.areaGraph, 'CUTS_LABELS_SHADE_AND_FULL_INTEGRAL_REQUIRED');
  assert.equal(policy.courses.ccss_ii.areaGraph, 'CUTS_LABELS_SHADE_AND_FULL_INTEGRAL_REQUIRED');
  assert.match(skill, /Ordinaria 2017/);
  assert.match(skill, /`y=x²` y `y=−x²\+4x`/);
  assert.match(skill, /una sola gráfica/);
});

test('integrales definidas y Barrow exigen composición nativa y geometría real', () => {
  for (const course of ['matematicas_ii', 'ccss_ii']) {
    assert.equal(policy.courses[course].definiteIntegralRendering, 'NATIVE_DISPLAYSTYLE_GEOMETRY_REQUIRED');
  }
  assert.match(skill, /motor matemático en estilo de presentación/);
  assert.match(skill, /No construir el operador y sus límites mediante columnas HTML/);
  assert.match(skill, /geometría real del DOM/);
  assert.doesNotMatch(appSource, /<span class="display-integral">|<span class="barrow-evaluation">/);
});

test('áreas incluyen el control de Extraordinaria 2020 con las dos intersecciones', () => {
  assert.match(skill, /Extraordinaria 2020/);
  assert.match(skill, /`f\(x\)=\|x\|` y `g\(x\)=x²−2`/);
  assert.match(skill, /`\(-2,2\)` y `\(2,2\)`/);
});

test('la publicación bloquea notación interna y CDF opaca', () => {
  for (const barrier of ['VISIBLE_INTERNAL_MATH_TOKENS', 'OPAQUE_NORMAL_CDF', 'INCOMPLETE_AREA_GRAPH', 'MANUAL_INTEGRAL_LIMIT_LAYOUT', 'BARROW_LIMIT_GEOMETRY_ERROR']) {
    assert.ok(policy.publicationBarriers.includes(barrier));
  }
});
