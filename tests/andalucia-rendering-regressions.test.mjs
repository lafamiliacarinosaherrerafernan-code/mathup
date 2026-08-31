import assert from 'node:assert/strict';
import test from 'node:test';
import '../math-renderer.js';

const render = (value) => globalThis.MargaritaMathRenderer.fragment(value);

test('las cotas con raíces en una evaluación no exponen HTML interno', () => {
  const html = render('[ax−frac{x³}{3}]_{0}^{√a}');
  assert.match(html, /class="math-native-evaluation"/);
  assert.doesNotMatch(html, /&lt;span|<mtext>[^<]*<span|class=&quot;/);
});

test('compone las variantes históricas de límites con subíndice entre paréntesis', () => {
  const html = render('lim_(x → 0−) f(x)=0; lim_(x → 0+) f(x)=+∞');
  assert.equal((html.match(/class="math-limit"/g) || []).length, 2);
  assert.doesNotMatch(html, /lim_/);
  assert.match(html, /<sub>x → 0⁻<\/sub>/);
  assert.match(html, /<sub>x → 0⁺<\/sub>/);
});

test('compone exponentes y subíndices parentizados sin dejar sintaxis interna', () => {
  const html = render('X∈ℝ^(2×3); z_(1−α/2); π_d; f\'_1(x)');
  assert.match(html, /ℝ<sup>2×3<\/sup>/);
  assert.match(html, /z<sub>1<span class="math-fraction"><span>−α<\/span><span>2<\/span><\/span><\/sub>/);
  assert.match(html, /π<sub>d<\/sub>/);
  assert.match(html, /f′<sub>1<\/sub>/);
  assert.doesNotMatch(html, /[\^_]\(/);
});

test('repara tildes separadas y Unicode descompuesto antes de renderizar', () => {
  const html = render('funci´on, ecuacio´n, gra\u0301fica, ´area, regio´n, tria´ngulo');
  assert.match(html, /función, ecuación, gráfica, área, región, triángulo/);
  assert.doesNotMatch(html, /[´`\u0300-\u036f]/);
});

test('compone evaluaciones e integrales con cotas históricas en Unicode', () => {
  const html = render('A=∫_0² f(x)dx=[F(x)]_0²; det(A)|_(m=1)=−1');
  assert.match(html, /class="math-integral math-native-operator/);
  assert.match(html, /data-math-native="integral"/);
  assert.match(html, /<msubsup><mrow><mo largeop="true" movablelimits="false">∫<\/mo><mspace width="0\.12em"\/><\/mrow>[\s\S]*<mtext>0<\/mtext>[\s\S]*<mtext>2<\/mtext>[\s\S]*<\/msubsup>/);
  assert.match(html, /class="math-native-evaluation"/);
  assert.match(html, /data-math-native="evaluation"/);
  assert.match(html, /<mtext>m=1<\/mtext>/);
  assert.doesNotMatch(html, /∫_|\]_|\|_/);
});

test('las cotas definidas pertenecen a operadores MathML nativos', () => {
  const html = render('A=∫_{0}^{2}(x−x²+2)dx=[−frac{x³}{3}+x²+2x]_{0}^{2}');
  assert.match(html, /<msubsup><mrow><mo largeop="true" movablelimits="false">∫<\/mo><mspace width="0\.12em"\/><\/mrow>/);
  assert.match(html, /<msubsup><mo fence="true" stretchy="false">]<\/mo>/);
  assert.doesNotMatch(html, /math-bounded-integral|math-barrow-evaluation|position:absolute|<sup>2<\/sup><sub>0<\/sub>/);
});

test('los subíndices simples terminan antes de signos de operación', () => {
  const html = render('2H_x−H_y−4=0; v_2+v_3=0');
  assert.match(html, /H<sub>x<\/sub>−H<sub>y<\/sub>−4/);
  assert.match(html, /v<sub>2<\/sub>\+v<sub>3<\/sub>/);
});

test('compone cadenas sucesivas de potencias matriciales', () => {
  const html = render('A^{4k+r}=(A⁴)^k A^r=A^r');
  assert.match(html, /A<sup>4k\+r<\/sup>/);
  assert.match(html, /\(A⁴\)<sup>k<\/sup>/);
  assert.equal((html.match(/A<sup>r<\/sup>/g) || []).length, 2);
  assert.doesNotMatch(html, /\^/);
});

test('compone la potencia aplicada a una matriz completa', () => {
  const html = render('[[1,1],[0,−1]]^{2}·[[4],[1]]');
  assert.equal((html.match(/class="math-matrix /g) || []).length, 2);
  assert.match(html, /<\/span><sup>2<\/sup>·/);
  assert.doesNotMatch(html, /\^\{2\}/);
});

test('la variante histórica cases se compone como función a trozos y no queda visible', () => {
  const html = render('f(x)=cases{a−x,si x≤1;b/x+ln(x),si x>1}');
  assert.match(html, /math-piecewise/);
  assert.match(html, /math-piecewise-prefix/);
  assert.doesNotMatch(html, /cases\{/i);
  assert.match(html, /si/);
});

test('cases histórico sin la palabra si conserva tres ramas y sus condiciones', () => {
  const html = render('f′(x)=cases{−(1+x)e^(x−1) x<0;(1+x)e^(x−1) 0<x<1;(1−x)e^(1−x) x>1}');
  assert.match(html, /math-piecewise/);
  assert.equal((html.match(/<small>si /g) || []).length, 3);
  assert.doesNotMatch(html, /cases\{/i);
  const textHtml = globalThis.MargaritaMathRenderer.text('Derivamos.<br>f′(x)=cases{−(1+x)e^(x−1) x<0;(1+x)e^(x−1) 0<x<1;(1−x)e^(1−x) x>1}');
  assert.match(textHtml, /math-piecewise/);
  assert.doesNotMatch(textHtml, /cases\{/i);
});

test('cases histórico con ampersand de alineación no expone el token interno', () => {
  const html = globalThis.MargaritaMathRenderer.text('f′(x)=cases{−(1+x)e^{x−1}&x<0;(1+x)e^{x−1}&0<x<1;(1−x)e^{1−x}&x>1}');
  assert.match(html, /math-piecewise/);
  assert.equal((html.match(/<small>si /g) || []).length, 3);
  assert.doesNotMatch(html, /cases\{|&amp;/i);
});

test('cases histórico con coma entre expresión y condición conserva sus ramas', () => {
  const html = globalThis.MargaritaMathRenderer.text('f(x)=cases{x+2e^(−x),x≤0;a√{b−x},0<x<1}');
  assert.match(html, /math-piecewise/);
  assert.equal((html.match(/<small>si /g) || []).length, 2);
  assert.doesNotMatch(html, /cases\{/i);
});

test('cases con condiciones y cotas decimales separadas por coma no se confunde con un sistema', () => {
  const html = globalThis.MargaritaMathRenderer.text('f(t)=cases{−t²+2t+10, 0≤t≤2,5;t²+at+b, 2,5<t≤5}');
  assert.match(html, /math-piecewise/);
  assert.equal((html.match(/<small>si /g) || []).length, 2);
  assert.doesNotMatch(html, /math-system-rows/);
  assert.doesNotMatch(html, /cases\{/i);
});

test('normaliza estilos, integrales, fracciones y raíces LaTeX residuales', () => {
  const html = globalThis.MargaritaMathRenderer.text('\\(\\displaystyle\\int \\frac{x+1}{x-1}\\,dx+\\sqrt{x}\\)');
  assert.match(html, /∫/);
  assert.match(html, /math-fraction/);
  assert.match(html, /math-root/);
  assert.doesNotMatch(html, /\\\\(?:displaystyle|int|frac|sqrt)|\\\(|\\\)/);
});

test('compone raíces históricas con tilde y con llaves tras el radical Unicode', () => {
  const html = render('t=raíz(x); u=√{eˣ}; v=raíz3(x+1)');
  assert.equal((html.match(/class="math-root/g) || []).length, 3);
  assert.doesNotMatch(html, /raíz\(|√\{|raíz3\(/);
});

test('renderiza aproximación aunque el comando esté pegado a una cifra', () => {
  const html = globalThis.MargaritaMathRenderer.text('P(X>54)\\approx0{,}0131');
  assert.match(html, /P\(X&gt;54\).*≈0,0131/);
  assert.doesNotMatch(html, /\\approx|\{,\}/);
});

test('elimina llaves técnicas de decimales y comandos visibles en cualquier campo matemático', () => {
  const html = globalThis.MargaritaMathRenderer.text('P(\\text{ninguno})=0{,}15 \\approx 0{,}2; P(A\\mid B)=0{,}4');
  assert.match(html, /P\(ninguno\)=0,15 ≈ 0,2/);
  assert.match(html, /P\(A\| B\)=0,4/);
  assert.doesNotMatch(html, /\{,\}|\\(?:text|approx|mid)\b/);
});

test('cases histórico formado por ecuaciones se compone como sistema con una llave', () => {
  const html = globalThis.MargaritaMathRenderer.text('s≡cases{x=4+t;y=4+t;z=mt}');
  assert.match(html, /math-system/);
  assert.equal((html.match(/math-system-brace/g) || []).length, 1);
  assert.doesNotMatch(html, /cases\{/i);
});
