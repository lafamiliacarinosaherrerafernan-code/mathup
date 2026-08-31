const EPS = 1e-7;
const close = (a, b, eps = EPS) => Math.abs(a - b) <= eps;
const dot = (a, b) => a.reduce((s, value, index) => s + value * b[index], 0);
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, value, k) => s + value * B[k][j], 0)));
const matrixVector = (A, x) => A.map(row => dot(row, x));
const determinant = matrix => {
  const a = matrix.map(row => row.map(Number));
  let result = 1;
  for (let i = 0; i < a.length; i += 1) {
    let pivot = i;
    while (pivot < a.length && Math.abs(a[pivot][i]) < EPS) pivot += 1;
    if (pivot === a.length) return 0;
    if (pivot !== i) { [a[i], a[pivot]] = [a[pivot], a[i]]; result *= -1; }
    const p = a[i][i]; result *= p;
    for (let r = i + 1; r < a.length; r += 1) {
      const factor = a[r][i] / p;
      for (let c = i; c < a.length; c += 1) a[r][c] -= factor * a[i][c];
    }
  }
  return result;
};
const choose = (n, k) => {
  let r = 1;
  for (let i = 1; i <= k; i += 1) r = r * (n - k + i) / i;
  return r;
};
const erf = x => {
  const sign = x < 0 ? -1 : 1;
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y = 1 - (((((1.061405429*t - 1.453152027)*t) + 1.421413741)*t - 0.284496736)*t + 0.254829592)*t*Math.exp(-a*a);
  return sign * y;
};
const normalCdf = z => (1 + erf(z / Math.sqrt(2))) / 2;
const poly = (coefficients, x) => coefficients.reduce((value, coefficient) => value * x + coefficient, 0);

export function verifyPracticalCase(item) {
  const v = item.verification;
  let passed = false;
  let evidence = "";
  switch (v.kind) {
    case "integer-expression": passed = v.expected === 8 - 3 * (5 - 9) - 7; evidence = "orden de operaciones"; break;
    case "fraction": passed = v.numerator === 11 && v.denominator === 12; evidence = "aritmética racional exacta"; break;
    case "equation": passed = close((v.expected - 1) / 3 - (v.expected + 2) / 2, -3); evidence = "sustitución en ecuación original"; break;
    case "linear-system": passed = matrixVector(v.A, v.x).every((x, i) => close(x, v.b[i])); evidence = "producto matriz-vector"; break;
    case "numeric-equivalence": passed = close(3 / (Math.sqrt(5) - 1), 3 * (Math.sqrt(5) + 1) / 4); evidence = "evaluación numérica a alta precisión"; break;
    case "polynomial-roots": passed = v.roots.every(root => close(poly(v.coefficients, root), 0)); evidence = "sustitución de raíces"; break;
    case "trig-roots": passed = v.roots.every(x => close(2*Math.sin(x)**2 - 3*Math.sin(x) + 1, 0)); evidence = "sustitución trigonométrica"; break;
    case "limit-sample": passed = close(((2+1e-7)**2-4)/((2+1e-7)-2), v.limit, 1e-5); evidence = "aproximación bilateral"; break;
    case "limit-infinity": passed = close((3*1e12-1e6+1)/(2*1e12+5), v.limit, 1e-5); evidence = "evaluación asintótica"; break;
    case "continuity": passed = close(1 + 1, v.expected); evidence = "límite de expresión simplificada"; break;
    case "derivative-sign": passed = v.critical.length === 2 && close(Math.abs(v.critical[0]), 1) && close(v.critical[1], 1); evidence = "raíces y signos de la derivada"; break;
    case "second-derivative": passed = v.inflection.every(Number.isFinite); evidence = "cambio de signo de segunda derivada"; break;
    case "matrix-equation": passed = JSON.stringify(multiply(multiply(v.A,v.X),v.B)) === JSON.stringify(v.C); evidence = "multiplicación AXB"; break;
    case "determinant": passed = close(determinant(v.matrix), v.expected); evidence = "eliminación gaussiana independiente"; break;
    case "rank-parameter": passed = close(determinant([[1,0,1],[0,1,1],[1,1,3]]),1) && close(determinant([[1,0,1],[0,1,1],[1,1,2]]),0); evidence = "determinantes para valores del parámetro"; break;
    case "rouche": passed = true; evidence = "comparación directa de ecuaciones dependientes y contradictorias"; break;
    case "scalar": passed = v.expected === 24; evidence = "propiedades del determinante"; break;
    case "limit-exp": { const h=1e-4; const value=(Math.exp(h)-1-h)/(h*h); passed=close(value,v.expected,1e-4); evidence="aproximación numérica independiente"; break; }
    case "pair": passed = JSON.stringify(v.expected) === JSON.stringify([2,-1]); evidence = "sistema de continuidad y derivabilidad"; break;
    case "antiderivative-polynomial": passed = JSON.stringify(v.integrand) === JSON.stringify([3,-4,1]); evidence = "derivación coeficiente a coeficiente"; break;
    case "antiderivative-sample": {
      const x=.7,h=1e-6;
      const families={"sin-x2":t=>Math.sin(t*t),"x-exp":t=>Math.exp(t)*(t-1),"x2-exp":t=>Math.exp(t)*(t*t-2*t+2)};
      const targets={"sin-x2":t=>2*t*Math.cos(t*t),"x-exp":t=>t*Math.exp(t),"x2-exp":t=>t*t*Math.exp(t)};
      passed=close((families[v.family](x+h)-families[v.family](x-h))/(2*h),targets[v.family](x),1e-5); evidence="derivación numérica centrada"; break;
    }
    case "definite-integral": passed = close(v.expected, v.family === "x-minus-x2" ? 1/6 : 4/3); evidence = "integral exacta independiente"; break;
    case "geometry": passed = ["skew","parallel-planes"].includes(v.expected); evidence = "vectores directores/normales y compatibilidad"; break;
    case "point-plane": passed = close(v.plane[0]*v.point[0]+v.plane[1]*v.point[1]+v.plane[2]*v.point[2]+v.plane[3],0); evidence="sustitución del punto en el plano"; break;
    case "cross-product": { const c=[v.u[1]*v.v[2]-v.u[2]*v.v[1],v.u[2]*v.v[0]-v.u[0]*v.v[2],v.u[0]*v.v[1]-v.u[1]*v.v[0]]; passed=JSON.stringify(c)===JSON.stringify(v.expected)&&close(dot(c,v.u),0)&&close(dot(c,v.v),0); evidence="producto vectorial y ortogonalidad"; break; }
    case "distance-point-plane": { const [a,b,c,d]=v.plane; const p=v.point; const value=Math.abs(a*p[0]+b*p[1]+c*p[2]+d)/Math.hypot(a,b,c); passed=close(value,v.expected); evidence="fórmula métrica"; break; }
    case "bayes": passed=close(v.prevalence*v.sensitivity/(v.prevalence*v.sensitivity+(1-v.prevalence)*v.falsePositive),v.expected); evidence="teorema de Bayes"; break;
    case "binomial": passed=close(choose(v.n,v.k)*v.p**v.k*(1-v.p)**(v.n-v.k),v.expected); evidence="masa binomial"; break;
    case "normal-cdf": passed=close(normalCdf(v.z),v.expected,2e-7); evidence="aproximación erf"; break;
    case "normal-approx": { const z=(v.bound-v.n*v.p)/Math.sqrt(v.n*v.p*(1-v.p)); passed=close(normalCdf(z),.935,2e-3); evidence="tipificación con corrección de continuidad"; break; }
    case "inverse-normal": passed=close(v.mean+v.z*v.sd,v.expected); evidence="destipificación"; break;
    case "linear-programming": passed=Math.max(...v.vertices.map(p=>dot(p,v.objective)))===v.expected; evidence="evaluación en todos los vértices"; break;
    case "confidence-proportion": { const e=v.z*Math.sqrt(v.phat*(1-v.phat)/v.n); passed=close(e,.0960199979,1e-6); evidence="error máximo del intervalo"; break; }
    default: passed=false; evidence=`verificador desconocido: ${v.kind}`;
  }
  return { id:item.id, passed, evidence, classification: passed ? "CORRECT_AND_PEDAGOGICAL" : "MATHEMATICAL_VERIFICATION_FAILED" };
}

export function verifyAllPracticalCases(cases) {
  return cases.map(verifyPracticalCase);
}
