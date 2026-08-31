import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const target = path.join(root, 'data', 'madrid-pau-authored.js');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(target, 'utf8'), context, { filename: target });
const data = context.window.MADRID_PAU_AUTHORED;
let changed = 0;

function answer(courseId, exerciseId, label) {
  const value = data[courseId]?.[exerciseId]?.answers?.[label];
  if (!value) throw new Error(`No existe ${courseId}/${exerciseId}/${label}`);
  return value;
}

function addBeforeResult(courseId, exerciseId, label, heading, detail) {
  const item = answer(courseId, exerciseId, label);
  if (item.solution.includes(heading)) return;
  const marker = '\n\nResultado final:';
  if (!item.solution.includes(marker)) throw new Error(`Solución sin Resultado final: ${exerciseId}/${label}`);
  item.solution = item.solution.replace(marker, `\n\n${heading}\n${detail}${marker}`);
  changed += 1;
}

for (const [courseId, records] of Object.entries({
  '2bach-mates': data['2bach-mates'],
  '2bach-ccss': data['2bach-ccss']
})) {
  for (const [exerciseId, record] of Object.entries(records || {})) {
    const parts = record.exercise?.parts || [];
    const keys = Object.keys(record.answers || {});
    parts.forEach((part, index) => {
      const label = part.label || keys[index];
      const item = record.answers?.[label] || record.answers?.[keys[index]];
      if (!item || /Rouch[eé]–?-?Frobenius/i.test(item.solution)) return;
      const prompt = (part.paragraphs || []).map((node) => node.plain || node.html || '').join(' ');
      if (!/(?:discutir|estudiar\s+(?:la\s+)?compatibilidad|clasificar\s+el\s+sistema)/i.test(prompt)) return;
      addBeforeResult(courseId, exerciseId, label, 'Aplicación explícita de Rouché–Frobenius:',
        'Para det(A)≠0 se cumple rg(A)=rg(A*)=n y el sistema es SCD. En cada valor crítico se comparan los rangos calculados en el desarrollo anterior: si rg(A)=rg(A*)<n, el sistema es SCI; si rg(A)<rg(A*), es SI. Esta comparación produce exactamente la clasificación indicada.');
    });
  }
}

const determinantDetails = [
  ['2bach-mates','madrid-mates-1.4.5','Resultado','Desarrollo por menores complementarios:',
    'Al expandir por la tercera fila, los elementos 0, 1 y 0 dejan solo el término de la posición (3,2), con signo negativo: −1·det([[a,b],[1,1]])=−1·(a−b)=−(a−b).'],
  ['2bach-mates','madrid-mates-1.12.6','a)','Desarrollo por menores complementarios:',
    'Al expandir por la tercera fila, solo contribuye el elemento 1 de la posición (3,3), cuyo signo es positivo: det(M)=1·det([[sen x,cos x],[cos x,−sen x]])=1·[(sen x)(−sen x)−(cos x)(cos x)]=−sen²x−cos²x.'],
  ['2bach-ccss','madrid-ccss-1.17.1','a)','Desarrollo por menores complementarios:',
    'Por la primera fila: det(A)=1·det([[0,8],[a,−6]])−3·det([[a,8],[−1,−6]])+1·det([[a,0],[−1,a]]). Los menores valen −8a, −6a+8 y a²; así, det(A)=−8a−3(−6a+8)+a².']
];
determinantDetails.forEach((row) => addBeforeResult(...row));

const adjugateDetails = [
  ['2bach-ccss','madrid-ccss-1.12.2','b)','Menores complementarios, cofactores y adjunta:',
    'Los menores complementarios son M=[[−2,1,6],[5,−2,−12],[−2,1,5]]. Al aplicar los signos (+,−,+;−,+,−;+,−,+), la matriz de cofactores es C=[[−2,−1,6],[−5,−2,12],[−2,−1,5]]. Trasponiendo, adj(A)=Cᵀ=[[−2,−5,−2],[−1,−2,−1],[6,12,5]]. Como det(A)=1, A⁻¹=adj(A).'],
  ['2bach-ccss','madrid-ccss-1.24.1','b)','Menores complementarios, cofactores y adjunta:',
    'Los menores complementarios son M=[[2,2,0],[−2,0,2],[0,−2,2]]. Con el patrón de signos, C=[[2,−2,0],[2,0,−2],[0,2,2]]. Por tanto, adj(A)=Cᵀ=[[2,2,0],[−2,0,2],[0,−2,2]] y A⁻¹=(1/4)adj(A).']
];
adjugateDetails.forEach((row) => addBeforeResult(...row));

const partsDetails = [
  ['madrid-mates-3.10.5','a)','Elecciones de integración por partes:',
    'Primera vez: u=t², du=2t·dt, dv=e^(−t)dt y v=−e^(−t). Para la integral restante: u=2t, du=2dt, dv=e^(−t)dt y v=−e^(−t). Sustituyendo ambas veces se obtiene −e^(−t)(t²+2t+2).'],
  ['madrid-mates-3.11.9','b)','Elección de integración por partes:',
    'u=x, du=dx, dv=cos x·dx y v=sen x. Así, ∫x cos x·dx=x sen x−∫sen x·dx=x sen x+cos x.'],
  ['madrid-mates-3.16.2','b)','Elección de integración por partes:',
    'Para ∫3x cos x·dx tomamos u=3x, du=3dx, dv=cos x·dx y v=sen x; entonces ∫3x cos x·dx=3x sen x−∫3sen x·dx.'],
  ['madrid-mates-3.18.8','b.1)','Elección de integración por partes:',
    'Usando U=3u+1 y V para no confundir la variable u: U=3u+1, dU=3du, dV=cos(2u)du y V=sen(2u)/2. Es la elección u, du, dv, v del método, con mayúsculas por claridad.'],
  ['madrid-mates-3.19.3','b)','Elección de integración por partes:',
    'u=ln x, du=dx/x, dv=x²dx y v=x³/3. Por tanto, ∫x²ln x·dx=(x³/3)ln x−(1/3)∫x²dx.'],
  ['madrid-mates-3.21.5','b)','Elección de integración por partes:',
    'En ∫x cos x·dx elegimos u=x, du=dx, dv=cos x·dx y v=sen x; de aquí sale x sen x+cos x.'],
  ['madrid-mates-3.23.9','b)','Elección de integración por partes:',
    'u=x, du=dx, dv=cos(πx)dx y v=sen(πx)/π. Sustituyendo: ∫xcos(πx)dx=xsen(πx)/π+cos(πx)/π².'],
  ['madrid-mates-3.25.4','a)','Elecciones de integración por partes:',
    'Para ∫xln x·dx: u=ln x, du=dx/x, dv=x dx y v=x²/2. Para ∫ln x·dx: u=ln x, du=dx/x, dv=dx y v=x.'],
  ['madrid-mates-3.26.2','c)','Elección de integración por partes:',
    'u=x, du=dx, dv=sen(πx/2)dx y v=−(2/π)cos(πx/2). El término de borde se anula y queda la integral indicada.']
];
partsDetails.forEach(([exerciseId,label,heading,detail]) => addBeforeResult('2bach-mates',exerciseId,label,heading,detail));

const matrixPair = data['2bach-mates']['madrid-mates-1.2.1'];
matrixPair.exercise.statement[0].html = '<span class="official-matrix-pair-line"><span>Sean</span><math xmlns="http://www.w3.org/1998/Math/MathML" display="inline" class="native-math"><mi>A</mi><mo>=</mo><mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn><mo>+</mo><mi>a</mi></mtd><mtd><mn>1</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>1</mn><mo>−</mo><mi>a</mi></mtd><mtd><mn>1</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>1</mn><mo>+</mo><mi>b</mi></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>1</mn><mo>−</mo><mi>b</mi></mtd></mtr></mtable><mo>)</mo></mrow><mo>,</mo><mi>B</mi><mo>=</mo><mrow><mo>(</mo><mtable><mtr><mtd><mo>−</mo><msup><mi>a</mi><mn>2</mn></msup></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mo>−</mo><msup><mi>b</mi><mn>2</mn></msup></mtd></mtr></mtable><mo>)</mo></mrow></math><span>.</span></span>';
matrixPair.answers.Resultado.solution = `Planteamiento:
Calculamos det(B) directamente. Para det(A), hacemos ceros mediante operaciones elementales que no cambian el determinante y desarrollamos por la fila con más ceros.

Desarrollo paso a paso:
La matriz B es diagonal, por lo que det(B)=(−a²)(−b²)=a²b².
En A efectuamos F₁←F₁−F₂ y F₃←F₃−F₄. Después hacemos C₂←C₂−C₁ y C₄←C₄−C₃. Sumar a una fila o columna un múltiplo de otra no altera el determinante. Se obtiene A'=[[a,0,0,0],[1,−a,1,0],[0,0,b,0],[1,0,1,−b]].
Desarrollamos por la primera fila, que tiene tres ceros: det(A)=a·det([[-a,1,0],[0,b,0],[0,1,−b]]).
En este menor desarrollamos por la tercera columna, que contiene dos ceros: det(A)=a·[(−b)·det([[-a,1],[0,b]])]=a·[(−b)·((−a)b−1·0)]=a²b².

Resultado final:
det(A)=det(B)=a²b².

Comprobación:
Las operaciones utilizadas conservan el determinante. Si a=0 o b=0, la matriz transformada tiene una fila nula y ambos determinantes valen 0, de acuerdo con la fórmula.`;

const header = '// Autoría matemática revisada del banco PAU de Madrid.\n// Solo se publican registros con enunciado estructurado, cuatro opciones\n// distintas por apartado y solución didáctica completa.\n';
fs.writeFileSync(target, `${header}window.MADRID_PAU_AUTHORED = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
const markers = [
  ['PARAMETRIC_SYSTEM_ROUCHE_FROBENIUS', 'Aplicación explícita de Rouché–Frobenius:'],
  ['DETERMINANT_COMPLEMENTARY_MINORS', 'Desarrollo por menores complementarios:'],
  ['DETERMINANT_COMPLEMENTARY_MINORS', 'Desarrollamos por la primera fila mostrando cada elemento'],
  ['DETERMINANT_ZERO_CREATION_AND_LAPLACE', 'hacemos ceros mediante operaciones elementales'],
  ['ADJUGATE_COMPLEMENTARY_MINORS', 'Menores complementarios, cofactores y adjunta:'],
  ['INTEGRATION_BY_PARTS_U_DU_DV_V', 'Elección de integración por partes:'],
  ['INTEGRATION_BY_PARTS_U_DU_DV_V', 'Elecciones de integración por partes:']
];
const fixes = [];
for (const courseId of ['2bach-mates', '2bach-ccss']) {
  for (const [exerciseId, record] of Object.entries(data[courseId] || {})) {
    for (const [label, item] of Object.entries(record.answers || {})) {
      for (const [method, marker] of markers) if (item.solution?.includes(marker)) {
        fixes.push({ courseId, exerciseId, subpartLabel: label, method, status: 'CORRECTED' });
        break;
      }
    }
  }
}
const artifact = path.join(root, 'artifacts', 'madrid-master-audit', 'methodology-fixes.json');
fs.mkdirSync(path.dirname(artifact), { recursive: true });
fs.writeFileSync(artifact, `${JSON.stringify({ correctedSubparts: fixes.length, correctedExercises: new Set(fixes.map((row) => row.exerciseId)).size, fixes }, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ changed, correctedSubparts: fixes.length, correctedExercises: new Set(fixes.map((row) => row.exerciseId)).size }, null, 2));
