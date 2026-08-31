import fs from "node:fs";
import vm from "node:vm";

const context = vm.createContext({ console });
vm.runInContext(fs.readFileSync("math-answer-validator.js", "utf8"), context, { filename: "math-answer-validator.js" });
const validator = context.MargaritaMathAnswerValidator;
const report = JSON.parse(fs.readFileSync("informe_prueba_anonimo.json", "utf8"));

const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const compare = (recognizedExpression, expectedExpression) => validator.compareRecognition({ recognizedExpression, expectedExpression });

const equivalences = [
  ["\\dfrac{1}{2}=0.5", "1/2"],
  ["2^{3}=8", "2^3"],
  ["\\sqrt{5}\\simeq 2.236", "sqrt(5)"],
  ["\\lim _{x\\rightarrow \\infty }f\\left( x\\right)", "\\lim_{x\\to\\infty}f(x)"],
  ["\\lim _{x\\rightarrow 1}\\dfrac{x^{2}-1}{x-1}", "\\lim_{x\\to1}\\frac{x^2-1}{x-1}"],
  ["\\log _{2}\\left( x-1\\right) =3,2^{x+1}=8", "\\log_2(x-1)=3,\\quad 2^{x+1}=8"],
  ["P\\left( \\dfrac{A}{B}\\right) =\\dfrac{P\\left( A\\cap B\\right) }{P\\left( B\\right) }", "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}"],
  ["\\int ^{b}_{a}f\\left( x\\right) dx", "\\int_a^b f(x)\\,dx"],
  ["\\int f\\left( x\\right) dx", "\\int f(x)\\,dx"],
  ["\\dfrac{-3}{4}=-0.75", "-3/4"],
  ["\\dfrac{\\left( a+b\\right) }{\\left( a-b\\right) }", "(a+b)/(a-b)"],
  ["x\\leq 5", "x<=5"],
  ["3A=\\begin{pmatrix}3&6\\\\9&12\\end{pmatrix}", "3A=\\begin{pmatrix}3&6\\\\9&12\\end{pmatrix}"],
  ["f(x)=\\begin{cases}x+1six <0\\\\x^2six\\geq0\\end{cases}", "f(x)=\\begin{cases}x+1&x<0\\\\x^2&x\\ge0\\end{cases}"]
];
for (const [recognized, expected] of equivalences) {
  check(compare(recognized, expected).isEquivalent === true, `Debía ser equivalente: ${expected} / ${recognized}`);
}

const realErrors = [
  ["B=\\begin{pmatrix}10-2\\\\345\\end{pmatrix}", "B=\\begin{pmatrix}1&0&-2\\\\3&4&5\\end{pmatrix}"],
  ["\\lim _{x\\rightarrow i}f(x)", "\\lim_{x\\to2^-}f(x)"],
  ["\\lim _{x\\rightarrow \\infty }\\dfrac{\\sqrt{x^{1+1}}}{x}", "\\lim_{x\\to\\infty}\\frac{\\sqrt{x^2+1}}{x}"],
  ["xnx+\\cos x+t_{yx}", "\\operatorname{sen}x+\\cos x+\\operatorname{tg}x"],
  ["\\overrightarrow{M}=(1,2)", "\\vec u=(1,2)"],
  ["1,l,0,0", "1,l,0,O"]
];
for (const [recognized, expected] of realErrors) {
  check(compare(recognized, expected).isEquivalent === false, `No debía ser equivalente: ${expected} / ${recognized}`);
}
check(compare("\\lim _{x\\rightarrow 2^{?+?}}f(x)", "\\lim_{x\\to2^+}f(x)").status === validator.STATUS.AMBIGUOUS, "Los marcadores ? deben conservar la ambigüedad.");
check(compare("y\\sim N(\\mu,\\sigma)", "Y\\sim N(\\mu,\\sigma)").status === validator.STATUS.AMBIGUOUS, "Un cambio solo de mayúsculas/minúsculas debe quedar ambiguo.");

for (const record of report.records) {
  const result = compare(record.recognizedExpression, record.expectedExpression);
  check(Boolean(result.status), `Registro sin diagnóstico: ${record.sampleId}`);
}

const presentationContext = { window: {}, console, Object, String, Set, RegExp, Array, NodeFilter: undefined };
presentationContext.window.window = presentationContext.window;
presentationContext.window.globalThis = presentationContext.window;
presentationContext.window.addEventListener = () => {};
presentationContext.window.localStorage = { getItem: () => null, setItem: () => {} };
vm.createContext(presentationContext.window);
vm.runInContext(fs.readFileSync("math-renderer.js", "utf8"), presentationContext.window, { filename: "math-renderer.js" });
vm.runInContext(fs.readFileSync("myscript-evaluation.js", "utf8"), presentationContext.window, { filename: "myscript-evaluation.js" });
const renderDisplay = presentationContext.window.MargaritaMyScriptEvaluation.renderDisplayExpression;
for (const record of report.records) {
  for (const [kind, expression] of [["objetivo", record.expectedExpression], ["reconocida", record.recognizedExpression]]) {
    const rendered = renderDisplay(expression);
    check(!/\\(?:log|int|frac|sqrt|begin|end|lim|operatorname|vec|left|right)\b/.test(rendered), `${record.sampleId}: LaTeX visible en expresión ${kind}`);
    check(!/[_^]\s*\{/.test(rendered), `${record.sampleId}: subíndice/superíndice crudo en expresión ${kind}`);
  }
}

if (failures.length) {
  throw new Error(failures.join("\n"));
} else {
  console.log(JSON.stringify({
    ok: true,
    reportRecordsChecked: report.records.length,
    equivalenceRegressions: equivalences.length,
    realErrorRegressions: realErrors.length,
    ambiguousRegressions: 2,
    presentationExpressionsChecked: report.records.length * 2,
    myscriptRequestsConsumed: 0
  }, null, 2));
}
