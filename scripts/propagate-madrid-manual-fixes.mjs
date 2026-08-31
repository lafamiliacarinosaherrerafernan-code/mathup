import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const authoredPath = path.join(root, 'data', 'madrid-pau-authored.js');
const bankPath = path.join(root, 'data', 'madrid-pau-bank.js');
const outDir = path.join(root, 'artifacts', 'madrid-systematic-propagation');
fs.mkdirSync(outDir, { recursive: true });

function load(file, key) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  return context.window[key];
}

const data = load(authoredPath, 'MADRID_PAU_AUTHORED');
const bank = load(bankPath, 'MADRID_PAU_BANK');
const changed = [];
const touch = (courseId, exerciseId, category, detail) => changed.push({ courseId, exerciseId, category, detail });

function record(courseId, exerciseId) {
  const value = data[courseId]?.[exerciseId];
  if (!value) throw new Error(`No existe ${courseId}/${exerciseId}`);
  return value;
}

function setSolution(courseId, exerciseId, label, solution, category) {
  const item = record(courseId, exerciseId).answers?.[label];
  if (!item) throw new Error(`No existe ${courseId}/${exerciseId}/${label}`);
  if (item.solution === solution) return;
  item.solution = solution;
  touch(courseId, exerciseId, category, label);
}

function setPart(courseId, exerciseId, label, plain, html = plain) {
  const part = record(courseId, exerciseId).exercise.parts.find((item) => item.label === label);
  if (!part) throw new Error(`No existe apartado ${courseId}/${exerciseId}/${label}`);
  const paragraph = part.paragraphs[0];
  if (paragraph.plain === plain && paragraph.html === html) return;
  paragraph.plain = plain;
  paragraph.html = html;
  touch(courseId, exerciseId, 'CANONICAL_MATH_STRUCTURE', label);
}

function setStatement(courseId, exerciseId, plain, html = plain) {
  const node = record(courseId, exerciseId).exercise.statement[0];
  if (node.plain === plain && node.html === html) return;
  node.plain = plain;
  node.html = html;
  touch(courseId, exerciseId, 'CANONICAL_MATH_STRUCTURE', 'statement');
}

function insertBeforeResult(solution, heading, detail) {
  if (solution.includes(heading)) return solution;
  const marker = '\n\nResultado final:';
  return solution.includes(marker) ? solution.replace(marker, `\n\n${heading}\n${detail}${marker}`) : `${solution}\n\n${heading}\n${detail}`;
}

// Sistemas oficiales: la fuente literal se conserva en `plain`, mientras el
// HTML canónico recibe una estructura system{...} que el renderer convierte
// en una llave real con una ecuación por fila.
for (const courseId of ['2bach-mates', '2bach-ccss']) {
  for (const [exerciseId, item] of Object.entries(data[courseId] || {})) {
    for (const node of item.exercise?.statement || []) {
      const plain = String(node.plain || '');
      if (!/\bsistema\b/i.test(plain) || /system\s*\{/i.test(String(node.html || ''))) continue;
      const match = plain.match(/^(.*?\bsistema(?:\s+de\s+ecuaciones)?\s+)([\s\S]+?)(\.(?:\s+[A-ZÁÉÍÓÚ]|$)[\s\S]*)$/i);
      if (!match) continue;
      const candidates = match[2].split(/;\s*|,\s*(?=[^,.]{0,90}=)/).map((value) => value.trim());
      if (candidates.length < 2 || candidates.filter((value) => value.includes('=')).length < 2) continue;
      node.html = `${match[1]}system{${candidates.join(';')}}${match[3]}`;
      touch(courseId, exerciseId, 'SYSTEM_RENDER', 'statement system{}');
    }
  }
}

// Casos de control manual: estructura documental y soluciones completas.
setStatement('2bach-mates', 'madrid-mates-1.1.1',
  'Se considera el sistema −x+λy+2z=λ, 2x+λy−z=2, λx−y+2z=λ.',
  'Se considera el sistema system{−x+λy+2z=λ;2x+λy−z=2;λx−y+2z=λ}.');
setStatement('2bach-mates', 'madrid-mates-1.2.3',
  'Se considera el sistema x+y+2z=3, 2x−y+kz=9, x−y−6z=5. Para k=−8, sean F1,F2,F3 las filas y C1,C2,C3,C4 las columnas de su matriz ampliada.',
  'Se considera el sistema system{x+y+2z=3;2x−y+kz=9;x−y−6z=5}. Para k=−8, sean F₁,F₂,F₃ las filas y C₁,C₂,C₃,C₄ las columnas de su matriz ampliada.');
setStatement('2bach-mates', 'madrid-mates-3.1.1',
  'Sea f(x)=sen x/x+2 si x≠0, y f(0)=k.',
  'Sea f(x)=piecewise{frac{sen x}{x}+2|x≠0;k|x=0}.');
setPart('2bach-mates', 'madrid-mates-3.3.7', 'b)',
  'Calcular lim_{x→0} frac{2(f(x))²−f(x+1)}{eˣ−1}.');
setPart('2bach-mates', 'madrid-mates-3.2.2', 'a)',
  'Hallar ∫_{−10}^{−1} frac{eˣ}{sqrt{1−eˣ}} dx.');
setPart('2bach-mates', 'madrid-mates-3.2.2', 'b)',
  'Calcular mediante un cambio de variable la integral indefinida ∫frac{1}{1−eˣ} dx.');
setStatement('2bach-ccss', 'madrid-ccss-1.2.1',
  'Se consideran las matrices A=[[3,1],[8,3]] y B=[[3,−1],[−8,3]].');

// Caso manual 12: el bloque recuperado pertenecía a la opción contigua del
// mismo PDF. Restauramos el ejercicio Modelo-Opción A-2001 contrastado con el
// checkpoint y con la captura de la fuente, conservando sus tres apartados.
data['2bach-ccss']['madrid-ccss-1.2.1'] = {
  exercise: {
    source: 'Modelo-Opción A-2001',
    statement: [{ plain: 'Sean A=[[2,1],[3,2]], B=[[2,−1],[−3,2]] e I la matriz identidad de orden 2.', html: 'Sean A=[[2,1],[3,2]], B=[[2,−1],[−3,2]] e I la matriz identidad de orden 2.' }],
    parts: [
      { label: 'a)', paragraphs: [{ plain: 'Comprobar que B es la inversa de A.', html: 'Comprobar que B es la inversa de A.' }] },
      { label: 'b)', paragraphs: [{ plain: 'Calcular la matriz (A−2I)².', html: 'Calcular la matriz (A−2I)².' }] },
      { label: 'c)', paragraphs: [{ plain: 'Calcular la matriz X que cumple AX=B.', html: 'Calcular la matriz X que cumple AX=B.' }] }
    ]
  },
  answers: {
    'a)': { options: ['Sí; AB=BA=I', 'No; AB=2I', 'Sí; AB=I pero BA≠I', 'No; det(A)=0'], correct: 0, solution: `Planteamiento:\nPara comprobar que B es la inversa de A verificamos los productos en ambos órdenes.\n\nDesarrollo paso a paso:\nAB=[[2,1],[3,2]]·[[2,−1],[−3,2]]=[[4−3,−2+2],[6−6,−3+4]]=[[1,0],[0,1]]=I. Del mismo modo, BA=I.\n\nResultado final:\nB=A⁻¹.\n\nComprobación:\ndet(A)=4−3=1 y la fórmula de la inversa produce B.` },
    'b)': { options: ['3I=[[3,0],[0,3]]', '[[0,3],[3,0]]', 'I=[[1,0],[0,1]]', '[[3,1],[3,3]]'], correct: 0, solution: `Planteamiento:\nRestamos 2I a A y elevamos al cuadrado.\n\nDesarrollo paso a paso:\nA−2I=[[0,1],[3,0]]. Entonces (A−2I)²=[[0,1],[3,0]]·[[0,1],[3,0]]=[[3,0],[0,3]]=3I.\n\nResultado final:\n(A−2I)²=3I.\n\nComprobación:\nLos elementos no diagonales se anulan y los diagonales valen 3.` },
    'c)': { options: ['X=[[7,−4],[−12,7]]', 'X=B=[[2,−1],[−3,2]]', 'X=A=[[2,1],[3,2]]', 'X=[[1,0],[0,1]]'], correct: 0, solution: `Planteamiento:\nMultiplicamos AX=B por A⁻¹ a la izquierda.\n\nDesarrollo paso a paso:\nX=A⁻¹B=B². Al multiplicar [[2,−1],[−3,2]] por sí misma resulta [[7,−4],[−12,7]].\n\nResultado final:\nX=[[7,−4],[−12,7]].\n\nComprobación:\nA·X=[[2,−1],[−3,2]]=B.` }
  }
};
touch('2bach-ccss', 'madrid-ccss-1.2.1', 'SEMANTIC_RECOVERY', 'restored Modelo-Opción A-2001 with three parts');

// Un fragmento sintácticamente válido pero semánticamente mezclado sobrevivió
// a la recuperación conservadora inicial. Se restaura desde el checkpoint
// local verificado (misma fuente documental Madrid) antes de propagar reglas.
const repaired3271 = record('2bach-ccss', 'madrid-ccss-3.27.1');
repaired3271.answers = {
  'a)': {
    options: ['No es continua en x=1; su única asíntota es y=−1', 'Es continua en x=1; tiene asíntotas x=3 e y=−1', 'No es continua en x=1; tiene asíntotas x=−3 y x=3', 'Es continua y no tiene asíntotas'],
    correct: 0,
    solution: `Planteamiento:\nComparamos los límites laterales en el punto de cambio y estudiamos cada rama solo en el intervalo donde está definida.\n\nDesarrollo paso a paso:\nPor la izquierda, lim_{x→1⁻}f(x)=0. Por la derecha y en el propio punto, f(1)=frac{1}{4}. Como 0≠frac{1}{4}, hay una discontinuidad de salto. Cuando x→−∞, la primera rama tiende a −1; cuando x→+∞, la segunda también tiende a −1. Los ceros 3 y −3 de los denominadores quedan fuera del dominio de sus respectivas ramas y no generan asíntotas verticales.\n\nResultado final:\nf no es continua en x=1 y su única asíntota es y=−1.\n\nComprobación:\nLos límites laterales confirman el salto y los términos dominantes confirman la asíntota horizontal.`
  },
  'b)': {
    options: ['6 unidades cuadradas', '4 unidades cuadradas', '2 unidades cuadradas', '8 unidades cuadradas'],
    correct: 0,
    solution: `Planteamiento:\nEn [1,3] usamos la segunda rama de f y localizamos los cambios de signo de g.\n\nDesarrollo paso a paso:\ng(x)=3x(x+3)frac{2−x}{x+3}=3x(2−x)=6x−3x². Se anula en x=2, es positiva en [1,2] y negativa en [2,3]. Una primitiva es H(x)=3x²−x³.\nA=∫_{1}^{2}g(x)dx−∫_{2}^{3}g(x)dx=[H(x)]_{1}^{2}−[H(x)]_{2}^{3}=(4−2)−(0−4)=6.\n\nRepresentación y contraste con la fuente oficial:\nLa imagen oficial permite comprobar la gráfica, el cero x=2 y las dos regiones integradas.\n[[official-solution-image src="assets/madrid-pau/ccss/solutions/madrid-ccss-3.27.1.jpg"]]\n\nResultado final:\nEl área es 6 unidades cuadradas.\n\nComprobación:\nSe integra el valor absoluto separando exactamente en x=2.`
  },
  'c)': {
    options: ['Corta en (0,0) y (3/2,0); decrece hasta x=3/4 y crece después', 'Corta en (0,0) y (3/4,0); crece hasta x=3/2 y decrece después', 'Solo corta en (0,0) y es siempre creciente', 'Corta en (3/2,0) y es siempre decreciente'],
    correct: 0,
    solution: `Planteamiento:\nFactorizamos y estudiamos el signo de f′, teniendo en cuenta que a>0.\n\nDesarrollo paso a paso:\nf(x)=frac{x(2x−3)}{a}; sus ceros son x=0 y x=frac{3}{2}. La derivada es f′(x)=frac{4x−3}{a}. Como a>0, f′(x)<0 si x<frac{3}{4} y f′(x)>0 si x>frac{3}{4}. En la recta real: (−∞,frac{3}{4}) tiene signo − y (frac{3}{4},∞) signo +.\n\nResultado final:\nCorta en (0,0) y (frac{3}{2},0); decrece en (−∞,frac{3}{4}) y crece en (frac{3}{4},∞).\n\nComprobación:\nEl signo de f′ cambia de negativo a positivo en x=frac{3}{4}.`
  },
  'd)': {
    options: ['a=9/10', 'a=10/9', 'a=9/5', 'a=5/9'],
    correct: 0,
    solution: `Planteamiento:\nAplicamos el teorema fundamental del cálculo a F(3)−F(0).\n\nDesarrollo paso a paso:\n5=F(3)−F(0)=∫_{0}^{3}frac{2x²−3x}{a}dx=frac{1}{a}[frac{2x³}{3}−frac{3x²}{2}]_{0}^{3}=frac{9}{2a}. De 5=frac{9}{2a} resulta 10a=9.\n\nResultado final:\na=frac{9}{10}.\n\nComprobación:\nCon a=frac{9}{10}, la integral vale frac{(9/2)}{(9/10)}=5.`
  }
};
touch('2bach-ccss', 'madrid-ccss-3.27.1', 'SEMANTIC_RECOVERY', 'restored four answers from verified checkpoint');

setSolution('2bach-mates', 'madrid-mates-1.1.1', 'a)', `Planteamiento:
Escribimos la matriz de coeficientes A y la ampliada A*: A=[[-1,λ,2],[2,λ,−1],[λ,−1,2]] y A*=[[-1,λ,2,λ],[2,λ,−1,2],[λ,−1,2,λ]]. Aplicamos el teorema de Rouché–Frobenius.

Desarrollo paso a paso:
Calculamos det(A) por Sarrus:
det(A)=−2λ²−λ²−2λ−(2λ²−2λ+λ)=−3λ²−6λ−3=−3(λ+1)².
Igualamos det(A)=0 y obtenemos el único valor crítico λ=−1.
Si λ≠−1, det(A)≠0, luego rg(A)=rg(A*)=3=n y el sistema es SCD.
Para λ=−1, A=[[-1,−1,2],[2,−1,−1],[−1,−1,2]] y A*=[[-1,−1,2,−1],[2,−1,−1,2],[−1,−1,2,−1]]. Las filas primera y tercera coinciden y el menor det([[-1,−1],[2,−1]])=3≠0. Por tanto, rg(A)=rg(A*)=2<3 y el sistema es SCI.

Resultado final:
SCD si λ≠−1; SCI si λ=−1.

Comprobación:
Para λ=−1, la familia (1+t,t,t) verifica las tres ecuaciones.`, 'METHODOLOGY_ROUCHE_FROBENIUS');

setSolution('2bach-mates', 'madrid-mates-1.1.1', 'b)', `Planteamiento:
Sustituimos λ=−1 y escribimos el sistema completo:
system{−x−y+2z=−1;2x−y−z=2;−x−y+2z=−1}.

Desarrollo paso a paso:
Por Rouché–Frobenius ya sabemos que rg(A)=rg(A*)=2<3, por tanto es SCI. La tercera ecuación repite la primera. Tomamos z=t. De −x−y+2t=−1 resulta x+y−2t=1. Sustituyendo x=1−y+2t en 2x−y−t=2 se obtiene −3y+3t=0, luego y=t y x=1+t.

Resultado final:
(x,y,z)=(1+t,t,t), t∈ℝ.

Comprobación:
La sustitución produce −1, 2 y −1 para todo t.`, 'METHODOLOGY_SCI');

setSolution('2bach-mates', 'madrid-mates-1.1.1', 'c)', `Planteamiento:
Para λ=2 el sistema es SCD porque det(A)=−27≠0. Lo resolvemos por la regla de Cramer.

Desarrollo paso a paso:
A=[[-1,2,2],[2,2,−1],[2,−1,2]], b=[[2],[2],[2]] y Δ=det(A)=−27.
Δx=det([[2,2,2],[2,2,−1],[2,−1,2]])=−18, por lo que x=Δx/Δ=2/3.
Δy=det([[-1,2,2],[2,2,−1],[2,2,2]])=−18, por lo que y=Δy/Δ=2/3.
Δz=det([[-1,2,2],[2,2,2],[2,−1,2]])=−18, por lo que z=Δz/Δ=2/3.

Resultado final:
(x,y,z)=(frac{2}{3},frac{2}{3},frac{2}{3}).

Comprobación:
La sustitución en las tres ecuaciones da 2.`, 'METHODOLOGY_CRAMER');
record('2bach-mates', 'madrid-mates-1.1.1').answers['c)'].options = [
  '(x,y,z)=(frac{2}{3},frac{2}{3},frac{2}{3})',
  '(x,y,z)=(1,1,1)',
  '(x,y,z)=(frac{2}{3},−frac{2}{3},frac{2}{3})',
  '(x,y,z)=(frac{1}{3},frac{2}{3},1)'
];
touch('2bach-mates', 'madrid-mates-1.1.1', 'FRACTION_RENDER', 'c) options');

setSolution('2bach-mates', 'madrid-mates-1.2.3', 'a)', `Planteamiento:
Escribimos A=[[1,1,2],[2,−1,k],[1,−1,−6]] y A*=[[1,1,2,3],[2,−1,k,9],[1,−1,−6,5]]. Aplicamos Rouché–Frobenius.

Desarrollo paso a paso:
Por Sarrus, det(A)=2(k+8). Si k≠−8, det(A)≠0 y rg(A)=rg(A*)=3: el sistema es SCD.
Para k=−8, det(A)=0. El menor det([[1,1],[2,−1]])=−3≠0, luego rg(A)≥2. Además F₁−2F₂+3F₃=0 también en la columna ampliada, de modo que rg(A)=rg(A*)=2<3: es SCI.
Tomamos z=t. De la diferencia entre la segunda y la tercera ecuación resulta x−2z=4, así que x=4+2t. La tercera da y=x−6z−5=−1−4t.

Resultado final:
SCD si k≠−8. Si k=−8, SCI con (x,y,z)=(4+2t,−1−4t,t), t∈ℝ.

Comprobación:
La familia produce 3, 9 y 5 en las tres ecuaciones.`, 'METHODOLOGY_ROUCHE_FROBENIUS');

setSolution('2bach-mates', 'madrid-mates-3.2.6', 'c)', `Planteamiento:
El eje vertical es x=0. Las curvas se cortan en x=2 y, en el intervalo [0,2], f es el techo y g el suelo.

Desarrollo paso a paso:
Los puntos de corte cumplen f(x)=g(x): frac{(x−2)²}{2}=0, luego el corte es (2,3). El eje y aporta los puntos (0,3) y (0,1).
[[area-graph-tangent-parabolas]]
f(x)−g(x)=x²−2x+3−(frac{x²}{2}+1)=frac{x²}{2}−2x+2=frac{(x−2)²}{2}.
Por tanto,
A=∫_{0}^{2}frac{(x−2)²}{2}dx=[frac{(x−2)³}{6}]_{0}^{2}=0−frac{(−2)³}{6}=frac{4}{3}.

Resultado final:
El área es frac{4}{3} unidades cuadradas.

Comprobación:
La diferencia es no negativa en [0,2] y solo se anula en x=2.`, 'AREA_GRAPH_AND_BARROW');

setSolution('2bach-mates', 'madrid-mates-3.1.1', 'a)', `Planteamiento:
La continuidad en x=0 exige lim_{x→0}f(x)=f(0)=k.

Desarrollo paso a paso:
lim_{x→0}frac{sen x}{x}=1. Entonces lim_{x→0}(frac{sen x}{x}+2)=1+2=3. Por tanto, k=3.

Resultado final:
f es continua en x=0 exactamente para k=3.

Comprobación:
Con k=3 coinciden el valor y los dos límites laterales.`, 'LIMIT_RENDER_AND_METHOD');
setSolution('2bach-mates', 'madrid-mates-3.1.1', 'b)', `Planteamiento:
La definición es f'(x₀)=lim_{h→0}frac{f(x₀+h)−f(x₀)}{h}. La derivabilidad exige antes continuidad, por lo que usamos k=3.

Desarrollo paso a paso:
f'(0)=lim_{h→0}frac{f(h)−f(0)}{h}=lim_{h→0}frac{frac{sen h}{h}+2−3}{h}=lim_{h→0}frac{sen h−h}{h²}.
Al sustituir aparece 0/0. Aplicamos L'Hôpital:
lim_{h→0}frac{cos h−1}{2h}.
Vuelve a aparecer 0/0 y aplicamos L'Hôpital de nuevo:
lim_{h→0}frac{−sen h}{2}=0.

Resultado final:
Para k=3, f'(0)=0.

Comprobación:
El cociente incremental tiene el mismo límite por ambos lados.`, 'METHODOLOGY_DERIVATIVE_DEFINITION');
setSolution('2bach-mates', 'madrid-mates-3.1.1', 'c)', `Planteamiento:
Comprobamos por definición las asíntotas verticales, horizontales y oblicuas.

Desarrollo paso a paso:
Vertical: x=a es asíntota si algún límite lateral lim_{x→a}f(x) es infinito. En x=0, lim_{x→0}f(x)=3, finito; no hay asíntota vertical.
Horizontal: y=L es asíntota si lim_{x→±∞}f(x)=L. Como sen x está acotado, lim_{x→±∞}frac{sen x}{x}=0 y lim_{x→±∞}f(x)=2. Luego y=2 es horizontal.
Oblicua: y=mx+n exige m=lim_{x→±∞}frac{f(x)}{x}≠0 y n=lim_{x→±∞}(f(x)−mx). Aquí m=0, por lo que no existe asíntota oblicua.

Resultado final:
La única asíntota es y=2.

Comprobación:
f(x)−2=frac{sen x}{x}→0 cuando x→±∞.`, 'METHODOLOGY_ASYMPTOTES');

setSolution('2bach-mates', 'madrid-mates-3.3.7', 'b)', `Planteamiento:
Calculamos lim_{x→0}frac{2(f(x))²−f(x+1)}{eˣ−1}.

Desarrollo paso a paso:
Al sustituir x=0 obtenemos frac{2·1²−2}{1−1}=frac{0}{0}. Aplicamos la regla de L'Hôpital derivando numerador y denominador en el mismo cociente:
lim_{x→0}frac{4f(x)f'(x)−f'(x+1)}{eˣ}.
Sustituimos ahora x=0:
frac{4f(0)f'(0)−f'(1)}{e⁰}=frac{4·1·3−4}{1}=8.

Resultado final:
El límite vale 8.

Comprobación:
Los datos f(0)=1, f'(0)=3 y f'(1)=4 determinan el cociente de derivadas.`, 'METHODOLOGY_LHOPITAL');

setSolution('2bach-mates', 'madrid-mates-3.1.3', 'a)', `Planteamiento:
El corte positivo satisface x₀²=a, por tanto x₀=√a. Representamos las curvas y distinguimos techo y suelo.

Desarrollo paso a paso:
[[area-graph-horizontal-parabola-equal]]
En [0,√a], la recta y=a es el techo y y=x² el suelo:
A₁=∫_{0}^{√a}(a−x²)dx=[ax−frac{x³}{3}]_{0}^{√a}=frac{2}{3}a^{3/2}.
En [√a,1], la parábola es el techo y la recta el suelo:
A₂=∫_{√a}^{1}(x²−a)dx=[frac{x³}{3}−ax]_{√a}^{1}=frac{1}{3}−a+frac{2}{3}a^{3/2}.
Igualamos A₁=A₂. Se cancelan los términos frac{2}{3}a^{3/2} y queda a=frac{1}{3}.

Resultado final:
a=frac{1}{3}.

Comprobación:
a∈(0,1) y x₀=frac{1}{sqrt{3}}.`, 'AREA_GRAPH_AND_BARROW');

setSolution('2bach-mates', 'madrid-mates-3.2.2', 'a)', `Planteamiento:
Usamos un cambio de variable completo porque la derivada de 1−eˣ aparece en el numerador.

Desarrollo paso a paso:
Sea u=1−eˣ. Entonces du=−eˣdx, de modo que eˣdx=−du.
∫_{−10}^{−1}frac{eˣ}{sqrt{1−eˣ}}dx=−∫u^{−1/2}du=−2sqrt{u}.
Volvemos a x y aplicamos Barrow:
[−2sqrt{1−eˣ}]_{−10}^{−1}=−2sqrt{1−e^{−1}}+2sqrt{1−e^{−10}}.

Resultado final:
2(sqrt{1−e^{−10}}−sqrt{1−e^{−1}}).

Comprobación:
El integrando y el resultado son positivos.`, 'METHODOLOGY_SUBSTITUTION');
setSolution('2bach-mates', 'madrid-mates-3.2.2', 'b)', `Planteamiento:
Hacemos el cambio t=eˣ. Entonces dt=eˣdx y dx=frac{dt}{t}.

Desarrollo paso a paso:
∫frac{1}{1−eˣ}dx=∫frac{1}{t(1−t)}dt.
Descomponemos en fracciones simples:
frac{1}{t(1−t)}=frac{A}{t}+frac{B}{1−t}.
Multiplicando por t(1−t): 1=A(1−t)+Bt. Para t=0, A=1; para t=1, B=1.
Sustituimos en la integral:
∫(frac{1}{t}+frac{1}{1−t})dt=ln|t|−ln|1−t|+C.
Como t=eˣ y ln(eˣ)=x, obtenemos x−ln|1−eˣ|+C.

Resultado final:
∫frac{1}{1−eˣ}dx=x−ln|1−eˣ|+C.

Comprobación:
Al derivar x−ln|1−eˣ| resulta frac{1}{1−eˣ}.`, 'METHODOLOGY_PARTIAL_FRACTIONS');

const geometry = record('2bach-mates', 'madrid-mates-2.1.2');
geometry.answers['a)'].options = ['frac{x²}{4}−frac{y²}{12}=1', 'frac{x²}{4}+frac{y²}{12}=1', 'frac{y²}{4}−frac{x²}{12}=1', '(x−4)²+y²=4'];
geometry.answers['b)'].options = ['Hipérbola con focos (−4,0) y (4,0)', 'Elipse con focos (−4,0) y (4,0)', 'Hipérbola con focos (−2,0) y (2,0)', 'Parábola con foco (4,0)'];
touch('2bach-mates', 'madrid-mates-2.1.2', 'FRACTION_RENDER', 'options');
setSolution('2bach-mates', 'madrid-mates-2.1.2', 'a)', `Planteamiento:
Sea P(x,y). Tomamos A=(4,0), un punto R=(1,0) de la recta y un vector director v=(0,1).

Desarrollo paso a paso:
overrightarrow{PA}=(4−x,−y) y |overrightarrow{PA}|=sqrt{(x−4)²+y²}.
La distancia vectorial de P a la recta es d(P,r)=frac{|overrightarrow{PR}×v|}{|v|}. Como overrightarrow{PR}=(1−x,−y), resulta d(P,r)=frac{|(1−x)·1−(−y)·0|}{1}=|x−1|.
La condición es sqrt{(x−4)²+y²}=2|x−1|. Elevamos al cuadrado y ordenamos:
(x−4)²+y²=4(x−1)² ⇒ 3x²−y²−12=0 ⇒ frac{x²}{4}−frac{y²}{12}=1.

Resultado final:
frac{x²}{4}−frac{y²}{12}=1.

Comprobación:
Ambas distancias eran no negativas, por lo que elevar al cuadrado no introduce soluciones extrañas.`, 'METHODOLOGY_POINT_LINE_DISTANCE');
setSolution('2bach-mates', 'madrid-mates-2.1.2', 'b)', `Planteamiento:
Comparamos frac{x²}{4}−frac{y²}{12}=1 con frac{x²}{a²}−frac{y²}{b²}=1.

Desarrollo paso a paso:
a²=4 y b²=12. Es una hipérbola horizontal. Para sus focos, c²=a²+b²=4+12=16, luego c=4.

Resultado final:
Los focos son (−4,0) y (4,0).

Comprobación:
La excentricidad e=frac{c}{a}=frac{4}{2}=2>1.`, 'FRACTION_RENDER');

setSolution('2bach-mates', 'madrid-mates-4.8.7', 'b)', `Planteamiento:
Si Y es el número de fallos de Antonio, Y~B(60;0,75). La aproximamos por una normal.

Desarrollo paso a paso:
La media es μ=np=60·0,75=45. La desviación típica es σ=sqrt{npq}=sqrt{60·0,75·0,25}≈3,354.
«Al menos dos terceras partes de 60» significa Y≥40. Como pasamos de una variable discreta a una normal continua, aplicamos la corrección de continuidad: el límite entre 39 y 40 es 39,5; por eso Y≥40 se aproxima mediante Y_N>39,5.
Tipificamos dentro de la probabilidad:
P(Y≥40)≈P(Y_N>39,5)=P(Z>frac{39,5−45}{3,354})=P(Z>−1,64)=0,9495.

Resultado final:
La probabilidad es aproximadamente 0,9495.

Comprobación:
El umbral 40 está por debajo de la media 45, así que la probabilidad debe ser alta.`, 'METHODOLOGY_NORMAL_CONTINUITY');

// En el resto de ejercicios de áreas, la evidencia gráfica procede de la
// solución oficial facilitada por la usuaria. Se inserta solo en el apartado
// que pide el área y nunca sustituye el desarrollo textual de +MathUp.
for (const courseId of ['2bach-mates', '2bach-ccss']) {
  const bankById = new Map((bank[courseId] || []).map((item) => [item.id, item]));
  for (const [exerciseId, item] of Object.entries(data[courseId] || {})) {
    const sourceImage = bankById.get(exerciseId)?.solutionAsset;
    if (!sourceImage) continue;
    const statementPrompt = (item.exercise?.statement || []).map((node) => node.plain || node.html || '').join(' ');
    const keys = Object.keys(item.answers || {});
    for (const [index, part] of (item.exercise?.parts || []).entries()) {
      const prompt = (part.paragraphs || []).map((node) => node.plain || node.html || '').join(' ');
      if (!/área/i.test(prompt) || !/(?:área|recinto).*(?:limitad|encerrad)|(?:limitad|encerrad).*área/is.test(`${statementPrompt} ${prompt}`)) continue;
      const label = part.label || keys[index];
      const answer = item.answers?.[label] || item.answers?.[keys[index]];
      if (!answer?.solution || /\[\[(?:area-graph-|official-solution-image)/i.test(answer.solution)) continue;
      answer.solution = insertBeforeResult(answer.solution, 'Representación y contraste con la fuente oficial:',
        `La representación oficial permite comprobar las curvas, los puntos de corte y la región encerrada usada en las integrales.\n[[official-solution-image src="${sourceImage}"]]`);
      touch(courseId, exerciseId, 'AREA_GRAPH_SOURCE_EVIDENCE', label);
    }
  }
}

// En toda la familia de aproximación normal materializamos las fórmulas de
// media y desviación y eliminamos Φ: la tipificación permanece dentro de P.
for (const courseId of ['2bach-mates', '2bach-ccss']) {
  for (const [exerciseId, item] of Object.entries(data[courseId] || {})) {
    const statementText = (item.exercise?.statement || []).map((node) => node.plain || node.html || '').join(' ');
    const parts = item.exercise?.parts || [];
    for (const [label, answer] of Object.entries(item.answers || {})) {
      if (!answer.solution) continue;
      const part = parts.find((candidate) => candidate.label === label);
      const partText = (part?.paragraphs || []).map((node) => node.plain || node.html || '').join(' ');
      const approximationContext = `${statementText} ${partText} ${answer.solution}`;
      if (!/aproxim(?:ar|ando|ación).*normal|normal.*aproxim/is.test(approximationContext)) continue;
      const original = answer.solution;
      answer.solution = answer.solution
        .replace(/=\s*(?:Φ|\\Phi)\(([^)]+)\)\s*=\s*/g, '=P(Z≤$1)=')
        .replace(/(?:Φ|\\Phi)\(([^)]+)\)/g, 'P(Z≤$1)');
      if (!/(?:μ\s*=\s*n\s*[·*]?\s*p|media\s+μ\s*=)/i.test(answer.solution)) {
        answer.solution = insertBeforeResult(answer.solution, 'Parámetros y tipificación de la aproximación normal:',
          'Para una binomial X~B(n,p), la normal aproximante tiene μ=np y σ=sqrt{np(1−p)}. Cuando el suceso es discreto se aplica, si corresponde, la corrección de continuidad antes de escribir la probabilidad tipificada P(Z⋚frac{x−μ}{σ}); el cálculo se mantiene dentro de la probabilidad, sin usar Φ.');
      }
      if (answer.solution !== original) touch(courseId, exerciseId, 'METHODOLOGY_NORMAL', 'solution');
    }
  }
}

// Los restos de HTML interno no son contenido matemático y se eliminan del
// corpus de soluciones, además de la salvaguarda común del runtime.
for (const courseId of ['2bach-mates', '2bach-ccss']) {
  for (const [exerciseId, item] of Object.entries(data[courseId] || {})) {
    for (const answer of Object.values(item.answers || {})) {
      const cleaned = String(answer.solution || '').replace(/<\/?[A-Za-z][^>]*>/g, '');
      if (cleaned !== answer.solution) {
        answer.solution = cleaned;
        touch(courseId, exerciseId, 'INTERNAL_TOKEN_VISIBLE', 'solution tags removed');
      }
    }
  }
}

// Desarrollo explícito por menores para todos los candidatos detectados en la
// auditoría de la familia. Cada línea deja visible elemento × menor y el valor.
const determinantDetails = {
  'madrid-mates-1.10.3': 'Por multilinealidad, det(B)=10[det(C₃,C₁,C₁)−det(C₃,C₂,C₁)]=10[0−(−4)]=40; cada sumando muestra la columna elegida y su menor multilineal.',
  'madrid-mates-1.13.5': 'Tras hacer ceros, desarrollamos por la cuarta columna: D=0·M₁₄−0·M₂₄+0·M₃₄+1·det([[x−1,0,0],[0,y−1,0],[0,0,z−1]])=(x−1)(y−1)(z−1).',
  'madrid-mates-1.14.5': 'Por la primera fila: det(A)=1·det([[1,2],[−1,−1]])−λ·det([[1,2],[0,−1]])+0·det([[1,1],[0,−1]])=1·1−λ·(−1)+0=1+λ.',
  'madrid-mates-1.14.8': 'Por la segunda columna: det(A)=−(λ+1)·det([[3,4],[λ,1]])+0·M₂₂−0·M₃₂=−(λ+1)(3−4λ)=(λ+1)(4λ−3).',
  'madrid-mates-1.15.5': 'Por la primera fila: det(A)=−1·det([[2,a],[a,−1]])−(−1)·det([[-3,a],[0,−1]])+a·det([[-3,2],[0,a]])=(2+a²)+3−3a²=5−2a².',
  'madrid-mates-1.16.6': 'En A−tI desarrollamos por la segunda fila: det(A−tI)=0·M₂₁−0·M₂₂+2·(−1)^{2+3}det([[1−t,2],[3,−1]])=−2[(t−1)−6]=14−2t.',
  'madrid-mates-1.19.1': 'Por la primera columna: det(A−mI)=(−m)·det([[3−m,0],[−1,3−m]])−0·M₂₁+0·M₃₁=−m(3−m)².',
  'madrid-mates-1.19.7': 'Por la primera fila: det(A)=14·det([[7,5],[4,5α]])−0·M₁₂+10·det([[0,7],[3,4]])=14(35α−20)+10(−21)=490(α−1).',
  'madrid-mates-1.20.6': 'Por la primera fila: det(B)=0·M₁₁−0·M₁₂+4·det([[1,m],[m,2]])=4(2−m²).',
  'madrid-mates-1.23.9': 'Por la tercera fila: det(A)=0·M₃₁−0·M₃₂+a·det([[a,a²],[a²,a]])=a(a²−a⁴)=a³(1−a²).',
  'madrid-mates-1.26.4': 'Por la tercera columna: det(A−λI)=0·M₁₃−0·M₂₃+(2−λ)·det([[4−λ,1],[2,3−λ]])=(2−λ)[(4−λ)(3−λ)−2].',
  'madrid-ccss-1.19.5': 'Por la primera fila: det(A)=1·det([[0,1],[1,m]])−1·det([[2,1],[3,m]])+2·det([[2,0],[3,1]])=−1−(2m−3)+4=6−2m.',
  'madrid-ccss-1.23.1': 'Por la primera fila: det(A)=2·det([[a,2],[1,1]])−1·det([[1,2],[0,1]])+1·det([[1,a],[0,1]])=2(a−2)−1+1=2(a−2).'
};
for (const [exerciseId, detail] of Object.entries(determinantDetails)) {
  const courseId = exerciseId.includes('-ccss-') ? '2bach-ccss' : '2bach-mates';
  for (const [label, answer] of Object.entries(record(courseId, exerciseId).answers || {})) {
    if (!/desarroll(?:a|amos|ando).*fila|desarroll(?:a|amos|ando).*columna/i.test(answer.solution || '')) continue;
    const updated = insertBeforeResult(answer.solution, 'Desarrollo por elementos y menores complementarios:', detail);
    if (updated !== answer.solution) {
      answer.solution = updated;
      touch(courseId, exerciseId, 'METHODOLOGY_DETERMINANT', label);
    }
  }
}

// Clasificación por tarea principal: los ejercicios que piden discutir o
// resolver explícitamente un sistema priorizan el tema 2, sin perder los temas
// secundarios previamente registrados.
for (const courseId of ['2bach-mates', '2bach-ccss']) {
  const records = data[courseId] || {};
  for (const item of bank[courseId] || []) {
    const authoredRecord = records[item.id];
    if (!authoredRecord || !item.topicIndexes?.includes(2)) continue;
    const prompt = JSON.stringify(authoredRecord.exercise || {});
    if (!/\bsistema\b/i.test(prompt) || !/(?:discutir|compatibilidad|resolver)/i.test(prompt)) continue;
    if (item.topicIndexes[0] === 2) continue;
    item.topicIndexes = [2, ...item.topicIndexes.filter((value) => value !== 2)];
    touch(courseId, item.id, 'PRIMARY_TOPIC_ERROR', 'primaryTopic=2');
  }
}

const authoredHeader = '// Autoría matemática revisada del banco PAU de Madrid.\n// Solo se publican registros con enunciado estructurado, cuatro opciones\n// distintas por apartado y solución didáctica completa.\n';
fs.writeFileSync(authoredPath, `${authoredHeader}window.MADRID_PAU_AUTHORED = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
const bankHeader = '// Generado desde los PDF oficiales de Madrid aportados por la usuaria.\n// Los enunciados y las soluciones visuales conservan la notación original.\n';
fs.writeFileSync(bankPath, `${bankHeader}window.MADRID_PAU_BANK = ${JSON.stringify(bank)};\n`, 'utf8');

const summary = {
  generatedAt: new Date().toISOString(),
  changes: changed.length,
  exercises: new Set(changed.map((item) => `${item.courseId}/${item.exerciseId}`)).size,
  byCategory: Object.groupBy(changed, (item) => item.category)
};
fs.writeFileSync(path.join(outDir, 'propagation-changes.json'), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify({ changes: summary.changes, exercises: summary.exercises, categories: Object.fromEntries(Object.entries(summary.byCategory).map(([key, values]) => [key, values.length])) }, null, 2));
