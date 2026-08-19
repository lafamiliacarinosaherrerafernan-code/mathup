import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(root, "math-renderer.js"), "utf8");
const context = { window: {}, console, Object, String, Set, RegExp, Array, NodeFilter: undefined };
context.globalThis = context;
vm.createContext(context);
vm.runInContext(source, context, { filename: "math-renderer.js" });

const renderer = context.window.MargaritaMathRenderer;
const results = [];
const failures = [];

function check(name, input, predicate, method = "text", options = {}) {
  const output = renderer[method](input, options);
  const passed = typeof predicate === "function" ? predicate(output) : predicate.test(output);
  results.push({ name, input, passed, output });
  if (!passed) failures.push({ name, input, output });
}

const hasFraction = (output) => /class="math-fraction"/.test(output) && !/>[^<]*\/[^<]*</.test(output);
const hasPower = (output) => /<sup>/.test(output) && !/\^/.test(output.replace(/<[^>]+>/g, ""));
const hasSubscript = (output) => /<sub>/.test(output) && !/_/.test(output.replace(/<[^>]+>/g, ""));
const hasLimit = (output) => /class="math-limit"/.test(output) && /<sub>[^<]*x\s*→/.test(output);

check("01 fracción numérica", "1/2", hasFraction);
check("02 fracción algebraica", "(x+1)/(x-1)", hasFraction);
check("03 potencia Unicode", "x²", (output) => /x²/.test(output));
check("04 potencia compuesta", "x^(n+1)", hasPower);
check("05 subíndice Unicode", "x₁", (output) => /x₁/.test(output));
check("06 logaritmo base 2", "log_2(x)", hasSubscript);
check("07 raíz", "sqrt((x+1)/(x-1))", (output) => /math-root/.test(output) && /math-fraction/.test(output));
check("08 límite normal", "lim(x→a) f(x)", hasLimit);
check("09 límite lateral izquierdo", "lim x→a- f(x)", (output) => hasLimit(output) && /a⁻/.test(output));
check("10 límite lateral derecho", "lim_{x→a+} f(x)", (output) => hasLimit(output) && /a⁺/.test(output));
check("11 límite en +∞", "lim x→+inf f(x)", (output) => hasLimit(output) && /\+∞/.test(output));
check("12 límite en −∞", "lim(x→-infinity) f(x)", (output) => hasLimit(output) && /−∞/.test(output));
check("13 derivada", "f'''(x)", (output) => /f‴\(x\)/.test(output));
check("14 derivada de Leibniz", "d²y/dx²", (output) => /math-leibniz/.test(output) && /d²y/.test(output) && /dx²/.test(output));
check("15 integral indefinida", "∫ f(x) dx", (output) => /∫ f\(x\) dx/.test(output));
check("16 integral definida", "∫_a^b f(x) dx", (output) => /math-integral/.test(output) && /<sup>b<\/sup><sub>a<\/sub>/.test(output));
check("17 sistema", "Sistema:\nx+y=3\nx-y=1", (output) => /math-system/.test(output) && /math-system-brace/.test(output));
check("18 matriz numérica", "[[1,2],[3,4]]", (output) => /math-matrix/.test(output) && /matrix-row/.test(output));
check("19 matriz con fracciones", "[[1/2,x^2],[a_n,sqrt(x)]]", (output) => /math-matrix/.test(output) && /math-fraction/.test(output) && /<sup>2<\/sup>/.test(output) && /<sub>n<\/sub>/.test(output));
check("20 determinante", "det([[1,2],[3,4]])", (output) => /math-determinant/.test(output));
check("21 vector", "vector{AB}=vec{u}+v⃗", (output) => (output.match(/math-vector/g) || []).length === 3);
check("22 cuantificador universal", "\\forall x", (output) => /∀ x/.test(output));
check("23 números reales", "x\\in\\mathbb{R}", (output) => /x∈ℝ/.test(output.replace(/\s/g, "")));
check("24 intervalos", "[1,+infinito)", (output) => /\[1,\+∞\)/.test(output));
check("25 unión", "A \\cup B", (output) => /A\s*∪\s*B/.test(output));
check("26 intersección", "A \\cap B", (output) => /A\s*∩\s*B/.test(output));
check("27 seno al cuadrado", "sin^2(x)", (output) => /sen<sup>2<\/sup>\(x\)/.test(output));
check("28 tangente", "tan(x)", (output) => /tg\(x\)/.test(output) && !/tan/.test(output));
check("29 probabilidad condicionada", "P(A|B)=1/2", (output) => /P\(A\|B\)/.test(output) && /math-fraction/.test(output));
check("30 dominio", "D = {\\forall x \\in \\mathbb{R} | x \\ge 1} = [1,+infinito)", (output) => /∀/.test(output) && /∈/.test(output) && /ℝ/.test(output) && /≥/.test(output) && /\+∞/.test(output));
check("31 raíz cúbica", "sqrt[3](x+1)", (output) => /math-indexed-root/.test(output) && /<sup>3<\/sup>/.test(output));
check("32 HTML ordinario no se interpreta como fracción", "Archivo docs/tema1.pdf", (output) => !/math-fraction/.test(output));
check("33 URL no se interpreta como fracción", "https://ejemplo.test/a/b", (output) => !/math-fraction/.test(output));
check("34 trigonometría oficial preservada", "sin^2(x)+tan(x)", (output) => /sin<sup>2<\/sup>/.test(output) && /tan\(x\)/.test(output), "text", { preserveTrigNotation: true });
check("35 resta algebraica no se convierte en lateral", "a- b", (output) => /a−?\s*-?\s*b/.test(output) && !/a⁻/.test(output));
check(
  "36 función a trozos compacta real de MyScript",
  String.raw`f(x)=\begin{cases}x+1six lt;0\\x^2six ge;0\end{cases}`,
  (output) => /math-piecewise/.test(output)
    && (output.match(/<small>si /g) || []).length === 2
    && !/(?:six|\\begin|\\end)/i.test(output)
    && /<small>si x\s*&lt;\s*0<\/small>/.test(output)
    && /<small>si x\s*≥\s*0<\/small>/.test(output)
);
check(
  "37 función a trozos alineada",
  String.raw`f(x)=\begin{cases}x+1 & \text{si } x<0\\x^2 & \text{si } x\ge 0\end{cases}`,
  (output) => /math-piecewise/.test(output)
    && (output.match(/<small>si /g) || []).length === 2
    && !/(?:\\text|\\begin|\\end)/i.test(output)
);

check(
  "38 función a trozos compacta sin separador de filas",
  String.raw`f(x)=\begin{cases}x+1six &amp;amp;lt;0x^2six \ge 0\end{cases}`,
  (output) => /math-piecewise/.test(output)
    && (output.match(/<small>si /g) || []).length === 2
    && !/(?:six|\\begin|\\end)/i.test(output)
    && /<small>si x\s*&lt;\s*0<\/small>/.test(output)
    && /<small>si x\s*≥\s*0<\/small>/.test(output)
);

check(
  "39 piecewise with duplicated condition variable from MyScript",
  String.raw`f(x)=\begin{cases}x+1six lt;0\\x^2six x \ge 0\end{cases}`,
  (output) => /math-piecewise/.test(output)
    && (output.match(/<small>si /g) || []).length === 2
    && !/(?:six|\\begin|\\end)/i.test(output)
    && /<small>si x\s*&lt;\s*0<\/small>/.test(output)
    && /<small>si x\s*\u2265\s*0<\/small>/.test(output)
);

check(
  "40 matriz importada como tupla anidada",
  "A=((1,1),(0,1))",
  (output) => /A=/.test(output)
    && /class="math-matrix/.test(output)
    && (output.match(/class="matrix-row"/g) || []).length === 2
    && !/\(\(1,1\),\(0,1\)\)/.test(output.replace(/<[^>]+>/g, ""))
);

check(
  "41 coordenadas ordinarias no se convierten en matriz",
  "A=(1,2), B=(3,4)",
  (output) => !/class="math-matrix/.test(output)
);

const summary = { passed: failures.length === 0, total: results.length, failures, results };
console.log(JSON.stringify(summary, null, 2));
if (failures.length && typeof process !== "undefined") process.exitCode = 1;

export { summary };
