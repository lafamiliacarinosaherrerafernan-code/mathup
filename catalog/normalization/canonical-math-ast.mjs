import crypto from "node:crypto";

export const NORMALIZATION_RULE_VERSION = "mathup.normalization.rules.v1";
export const CONTRACTS = Object.freeze({
  document: "mathup.math-document.v1",
  decision: "mathup.normalization-decision.v1",
  representation: "mathup.math-representation.v1",
  visualFixture: "mathup.visual-fixture.v1"
});

export function stableStringify(value, space = 0) {
  const normalize = (item) => {
    if (Array.isArray(item)) return item.map(normalize);
    if (item && typeof item === "object") return Object.fromEntries(Object.keys(item).sort().map((key) => [key, normalize(item[key])]));
    return item;
  };
  return JSON.stringify(normalize(value), null, space);
}

export function sha256(value) {
  return crypto.createHash("sha256").update(typeof value === "string" ? value : stableStringify(value)).digest("hex");
}

export function unique(values) {
  return [...new Set((values || []).filter((value) => value !== null && value !== undefined && value !== ""))].sort();
}

export const FAMILY_RULES = Object.freeze([
  ["complex-fraction", /\\frac\s*\{[^{}]*\\frac|(?:\([^\n]{1,80}\/[^\n]{1,80}\))\s*\//iu],
  ["fraction", /\\(?:d?frac|tfrac)\b|[¼½¾⅓⅔⅛]|\b\d+\s*\/\s*\d+\b/u],
  ["power-root", /\\sqrt\b|√|[⁰¹²³⁴⁵⁶⁷⁸⁹]+|\^[{(]?[\w+-]/u],
  ["subscript", /_[{(]?[\w+-]|[₀₁₂₃₄₅₆₇₈₉]+/u],
  ["absolute-value", /\\(?:lvert|rvert|left\|)|\|[^|\n]{1,80}\|/u],
  ["equation", /(?<![<>!])=(?!=)|\b(?:ecuaci[oó]n|igualdad)\b/iu],
  ["system", /\\begin\{cases\}|\bsistema(?:s)?\b|\{\s*[^{}\n]*(?:=|≤|≥)[^{}\n]*(?:\n|;)/iu],
  ["matrix", /\\begin\{[pbvBV]?matrix\}|\bmatri(?:z|ces)\b|\[\s*\[[^\]]/iu],
  ["determinant", /\\det\b|\bdeterminante\b|\|\s*[a-z0-9,;\s-]+\s*\|/iu],
  ["limit", /\\lim\b|\bl[ií]mite(?:s)?\b/iu],
  ["derivative", /\\(?:dfrac\{d|partial|prime)|\bderivad[ao]s?\b|[fgy]\s*[′']/iu],
  ["defined-integral", /\\int\s*_[^{\s]|\\int\s*_\{|∫\s*[_\d-]+\s*\^|\bintegral definida\b/iu],
  ["indefinite-integral", /\\int\b|∫|\b(?:primitiva|integral indefinida)\b/iu],
  ["sum-product", /\\(?:sum|prod)\b|[∑∏]/u],
  ["log-exp", /\\(?:log|ln|exp)\b|\b(?:logaritm|exponencial)/iu],
  ["vector", /\\(?:vec|overrightarrow)\b|[\p{L}]⃗|\bvector(?:es)?\b/iu],
  ["coordinates", /\([-+]?\d+(?:[.,]\d+)?\s*,\s*[-+]?\d+(?:[.,]\d+)?(?:\s*,\s*[-+]?\d+(?:[.,]\d+)?)?\)/u],
  ["interval-set", /\\(?:mathbb|in|subset|cup|cap)\b|[∈⊂∪∩]|\[[^\]]+,[^\]]+\]/u],
  ["piecewise", /\\begin\{cases\}|\b(?:definida|funci[oó]n)\s+(?:a\s+)?trozos\b/iu],
  ["multiline", /\\\\|\\begin\{(?:aligned|array|cases|split)\}|\n/u],
  ["probability-combinatorics", /\\(?:binom|mathbb\{P\})|\b(?:probabilidad|combinatori|binomial|permutaci|variaci[oó]n)/iu],
  ["greek", /\\(?:alpha|beta|gamma|delta|theta|lambda|mu|sigma|omega|pi|rho|phi)\b|[α-ωΑ-Ω]/u],
  ["inequality", /\\(?:leq|geq|neq)|[≤≥≠]|\binecuaci/iu],
  ["implication-approximation", /\\(?:Rightarrow|implies|approx)\b|[⇒≈]/u],
  ["units", /\b(?:mm|cm|dm|km|m²|m³|cm²|cm³|kg|g|L|mL|s|min|h|€|grados?)\b/iu]
]);

export function familiesFor(text) {
  const value = String(text ?? "");
  return FAMILY_RULES.filter(([, regex]) => regex.test(value)).map(([name]) => name);
}

function balanced(value, open = "(", close = ")") {
  let depth = 0;
  for (const char of value) {
    if (char === open) depth += 1;
    if (char === close) depth -= 1;
    if (depth < 0) return false;
  }
  return depth === 0;
}

function stripOuterGroup(value) {
  const text = value.trim();
  if (text.startsWith("(") && text.endsWith(")") && balanced(text)) {
    let depth = 0;
    for (let i = 0; i < text.length - 1; i += 1) {
      if (text[i] === "(") depth += 1;
      if (text[i] === ")") depth -= 1;
      if (depth === 0) return text;
    }
    return text.slice(1, -1).trim();
  }
  return text;
}

function topLevelOperator(text, operators) {
  let round = 0;
  let square = 0;
  let curly = 0;
  for (let index = text.length - 1; index >= 0; index -= 1) {
    const char = text[index];
    if (char === ")") round += 1;
    else if (char === "(") round -= 1;
    else if (char === "]") square += 1;
    else if (char === "[") square -= 1;
    else if (char === "}") curly += 1;
    else if (char === "{") curly -= 1;
    else if (!round && !square && !curly && operators.includes(char)) {
      if ((char === "+" || char === "-") && index === 0) continue;
      return { index, operator: char };
    }
  }
  return null;
}

function splitTopLevelRelation(text) {
  const tokens = ["<=", ">=", "!=", "≤", "≥", "≠", "=", "<", ">", "∈"];
  let round = 0;
  let square = 0;
  let curly = 0;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === "(") round += 1;
    else if (char === ")") round -= 1;
    else if (char === "[") square += 1;
    else if (char === "]") square -= 1;
    else if (char === "{") curly += 1;
    else if (char === "}") curly -= 1;
    if (round || square || curly) continue;
    const token = tokens.find((candidate) => text.startsWith(candidate, index));
    if (token) return { index, operator: token };
  }
  return null;
}

function parseLatexBraced(text, command) {
  if (!text.startsWith(command)) return null;
  let offset = command.length;
  const parts = [];
  while (offset < text.length && text[offset] === "{") {
    let depth = 0;
    let end = -1;
    for (let index = offset; index < text.length; index += 1) {
      if (text[index] === "{") depth += 1;
      if (text[index] === "}") depth -= 1;
      if (depth === 0) { end = index; break; }
    }
    if (end < 0) return null;
    parts.push(text.slice(offset + 1, end));
    offset = end + 1;
  }
  return offset === text.length ? parts : null;
}

export function parseStrictMathExpression(input) {
  const original = String(input ?? "");
  const text = stripOuterGroup(original);
  if (!text || text.length > 500 || /[\r\n]/u.test(text)) return null;
  if (!["(", "[", "{"].every((open, index) => balanced(text, open, [")", "]", "}"][index]))) return null;

  const frac = parseLatexBraced(text, "\\frac");
  if (frac?.length === 2) {
    const numerator = parseStrictMathExpression(frac[0]);
    const denominator = parseStrictMathExpression(frac[1]);
    return numerator && denominator ? { type: "fraction", numerator, denominator } : null;
  }
  const root = parseLatexBraced(text, "\\sqrt");
  if (root?.length === 1) {
    const radicand = parseStrictMathExpression(root[0]);
    return radicand ? { type: "radical", radicand } : null;
  }
  if (text.startsWith("√")) {
    const radicand = parseStrictMathExpression(text.slice(1));
    return radicand ? { type: "radical", radicand } : null;
  }
  const vector = parseLatexBraced(text, "\\vec") || parseLatexBraced(text, "\\overrightarrow");
  if (vector?.length === 1) {
    const body = parseStrictMathExpression(vector[0]);
    return body ? { type: "vector", body } : null;
  }

  const relation = splitTopLevelRelation(text);
  if (relation) {
    const left = parseStrictMathExpression(text.slice(0, relation.index));
    const right = parseStrictMathExpression(text.slice(relation.index + relation.operator.length));
    if (!left || !right) return null;
    return { type: ["<", ">", "<=", ">=", "≤", "≥", "≠", "!="].includes(relation.operator) ? "inequality" : "equation", operator: relation.operator, left, right };
  }

  const interval = text.match(/^([[(])\s*([^,]+)\s*,\s*([^,]+)\s*([\])])$/u);
  if (interval) {
    const left = parseStrictMathExpression(interval[2]);
    const right = parseStrictMathExpression(interval[3]);
    return left && right ? { type: "interval", left, right, openLeft: interval[1] === "(", openRight: interval[4] === ")" } : null;
  }
  const coordinate = text.match(/^\(\s*([^,]+)\s*,\s*([^,]+)(?:\s*,\s*([^,]+))?\s*\)$/u);
  if (coordinate) {
    const children = coordinate.slice(1).filter(Boolean).map(parseStrictMathExpression);
    return children.every(Boolean) ? { type: "coordinate", children } : null;
  }

  for (const operators of [["+", "-"], ["·", "*", "×"], ["/"]]) {
    const found = topLevelOperator(text, operators);
    if (found) {
      const left = parseStrictMathExpression(text.slice(0, found.index));
      const right = parseStrictMathExpression(text.slice(found.index + 1));
      if (!left || !right) return null;
      if (found.operator === "/") return { type: "fraction", numerator: left, denominator: right };
      return { type: "binary", operator: found.operator, left, right };
    }
  }

  const power = topLevelOperator(text, ["^"]);
  if (power) {
    const base = parseStrictMathExpression(text.slice(0, power.index));
    const exponent = parseStrictMathExpression(text.slice(power.index + 1).replace(/^\{(.*)\}$/u, "$1"));
    return base && exponent ? { type: "power", base, exponent } : null;
  }
  const subscript = topLevelOperator(text, ["_"]);
  if (subscript) {
    const base = parseStrictMathExpression(text.slice(0, subscript.index));
    const index = parseStrictMathExpression(text.slice(subscript.index + 1).replace(/^\{(.*)\}$/u, "$1"));
    return base && index ? { type: "subscript", base, index } : null;
  }
  if (/^[-+]?\d+(?:[.,]\d+)?$/u.test(text)) return { type: "number", value: text };
  if (/^[A-Za-z]$/u.test(text)) return { type: "identifier", value: text };
  if (/^[α-ωΑ-Ωλπ]$/u.test(text)) return { type: "greek", value: text };
  if (/^(?:∞|\\infty)$/u.test(text)) return { type: "identifier", value: text };
  if (/^[A-Za-z]+\([^()]+\)$/u.test(text)) {
    const match = text.match(/^([A-Za-z]+)\(([^()]+)\)$/u);
    const body = parseStrictMathExpression(match[2]);
    return body ? { type: "function-call", name: match[1], children: [body] } : null;
  }
  return null;
}

export function validateMathNode(node, path = "math") {
  const errors = [];
  if (!node || typeof node !== "object" || Array.isArray(node)) return [`${path}: expected object`];
  if (!node.type || typeof node.type !== "string") errors.push(`${path}.type: required`);
  const visit = (value, name) => { if (value) errors.push(...validateMathNode(value, `${path}.${name}`)); };
  for (const key of ["base", "exponent", "index", "numerator", "denominator", "radicand", "left", "right", "body", "variable", "lower", "upper"]) visit(node[key], key);
  for (const [index, child] of (node.children || []).entries()) errors.push(...validateMathNode(child, `${path}.children[${index}]`));
  for (const [rowIndex, row] of (node.rows || []).entries()) for (const [cellIndex, cell] of row.entries()) errors.push(...validateMathNode(cell, `${path}.rows[${rowIndex}][${cellIndex}]`));
  for (const [index, branch] of (node.branches || []).entries()) {
    visit.call(null, branch.expression, `branches[${index}].expression`);
    visit.call(null, branch.condition, `branches[${index}].condition`);
  }
  const requiredPairs = {
    fraction: ["numerator", "denominator"], power: ["base", "exponent"], subscript: ["base", "index"], radical: ["radicand"],
    equation: ["left", "right", "operator"], inequality: ["left", "right", "operator"], interval: ["left", "right"], vector: ["body"]
  };
  for (const key of requiredPairs[node.type] || []) if (node[key] === undefined || node[key] === null) errors.push(`${path}.${key}: required for ${node.type}`);
  return errors;
}

function latexGroup(node) { return `{${serializeLatex(node)}}`; }
export function serializeLatex(node) {
  if (!node) return "";
  switch (node.type) {
    case "number": case "identifier": case "greek": case "operator": return String(node.value ?? node.operator ?? "");
    case "binary": return `${serializeLatex(node.left)} ${node.operator} ${serializeLatex(node.right)}`;
    case "equation": case "inequality": case "relation": return `${serializeLatex(node.left)} ${node.operator} ${serializeLatex(node.right)}`;
    case "fraction": return `\\frac${latexGroup(node.numerator)}${latexGroup(node.denominator)}`;
    case "power": return `${serializeLatex(node.base)}^${latexGroup(node.exponent)}`;
    case "subscript": return `${serializeLatex(node.base)}_${latexGroup(node.index)}`;
    case "radical": return node.index ? `\\sqrt[${serializeLatex(node.index)}]${latexGroup(node.radicand)}` : `\\sqrt${latexGroup(node.radicand)}`;
    case "absolute": return `\\left|${serializeLatex(node.body)}\\right|`;
    case "function-call": return `\\operatorname{${node.name}}\\left(${(node.children || []).map(serializeLatex).join(", ")}\\right)`;
    case "group": return `\\left(${(node.children || []).map(serializeLatex).join(" ")}\\right)`;
    case "system": return `\\begin{cases}${(node.children || []).map(serializeLatex).join(" \\\\ ")}\\end{cases}`;
    case "matrix": return `\\begin{pmatrix}${(node.rows || []).map((row) => row.map(serializeLatex).join(" & ")).join(" \\\\ ")}\\end{pmatrix}`;
    case "determinant": return `\\begin{vmatrix}${(node.rows || []).map((row) => row.map(serializeLatex).join(" & ")).join(" \\\\ ")}\\end{vmatrix}`;
    case "limit": return `\\lim_{${serializeLatex(node.variable)}\\to ${serializeLatex(node.lower)}} ${serializeLatex(node.body)}`;
    case "derivative": return `\\frac{d}{d${serializeLatex(node.variable)}}${latexGroup(node.body)}`;
    case "integral": return `\\int${node.lower ? `_{${serializeLatex(node.lower)}}` : ""}${node.upper ? `^{${serializeLatex(node.upper)}}` : ""} ${serializeLatex(node.body)}\\,d${serializeLatex(node.variable)}`;
    case "sum": case "product": return `\\${node.type === "sum" ? "sum" : "prod"}${node.lower ? `_{${serializeLatex(node.lower)}}` : ""}${node.upper ? `^{${serializeLatex(node.upper)}}` : ""} ${serializeLatex(node.body)}`;
    case "vector": return `\\vec${latexGroup(node.body)}`;
    case "coordinate": return `\\left(${(node.children || []).map(serializeLatex).join(", ")}\\right)`;
    case "interval": return `${node.openLeft ? "(" : "["}${serializeLatex(node.left)}, ${serializeLatex(node.right)}${node.openRight ? ")" : "]"}`;
    case "set": return `\\left\\{${(node.children || []).map(serializeLatex).join(", ")}\\right\\}`;
    case "piecewise": return `\\begin{cases}${(node.branches || []).map((branch) => `${serializeLatex(branch.expression)} & ${serializeLatex(branch.condition)}`).join(" \\\\ ")}\\end{cases}`;
    case "aligned": return `\\begin{aligned}${(node.children || []).map(serializeLatex).join(" \\\\ ")}\\end{aligned}`;
    case "probability": return `\\mathbb{P}\\left(${serializeLatex(node.body)}\\right)`;
    case "combinatorial": return `\\binom{${serializeLatex(node.upper)}}{${serializeLatex(node.lower)}}`;
    case "unit": return `${serializeLatex(node.body)}\\,\\mathrm{${node.value}}`;
    case "sequence": return (node.children || []).map(serializeLatex).join(" ");
    case "raw-verified": return String(node.literal ?? "");
    default: throw new Error(`Unsupported math node type: ${node.type}`);
  }
}

function escapeXml(value) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"); }
function row(children) { return `<mrow>${children}</mrow>`; }
export function serializeMathML(node) {
  const inner = (item) => {
    switch (item.type) {
      case "number": return `<mn>${escapeXml(item.value)}</mn>`;
      case "identifier": case "greek": return `<mi>${escapeXml(item.value)}</mi>`;
      case "operator": return `<mo>${escapeXml(item.value ?? item.operator)}</mo>`;
      case "binary": case "equation": case "inequality": case "relation": return row(`${inner(item.left)}<mo>${escapeXml(item.operator)}</mo>${inner(item.right)}`);
      case "fraction": return `<mfrac>${inner(item.numerator)}${inner(item.denominator)}</mfrac>`;
      case "power": return `<msup>${inner(item.base)}${inner(item.exponent)}</msup>`;
      case "subscript": return `<msub>${inner(item.base)}${inner(item.index)}</msub>`;
      case "radical": return item.index ? `<mroot>${inner(item.radicand)}${inner(item.index)}</mroot>` : `<msqrt>${inner(item.radicand)}</msqrt>`;
      case "absolute": return row(`<mo stretchy="true">|</mo>${inner(item.body)}<mo stretchy="true">|</mo>`);
      case "function-call": return row(`<mi>${escapeXml(item.name)}</mi><mo>(</mo>${(item.children || []).map(inner).join("<mo>,</mo>")}<mo>)</mo>`);
      case "group": return row(`<mo stretchy="true">(</mo>${(item.children || []).map(inner).join("")}<mo stretchy="true">)</mo>`);
      case "system": return row(`<mo stretchy="true">{</mo><mtable>${(item.children || []).map((child) => `<mtr><mtd>${inner(child)}</mtd></mtr>`).join("")}</mtable>`);
      case "matrix": case "determinant": {
        const left = item.type === "matrix" ? "(" : "|";
        const right = item.type === "matrix" ? ")" : "|";
        return row(`<mo stretchy="true">${left}</mo><mtable>${(item.rows || []).map((cells) => `<mtr>${cells.map((cell) => `<mtd>${inner(cell)}</mtd>`).join("")}</mtr>`).join("")}</mtable><mo stretchy="true">${right}</mo>`);
      }
      case "limit": return row(`<munder><mi>lim</mi>${row(`${inner(item.variable)}<mo>→</mo>${inner(item.lower)}`)}</munder>${inner(item.body)}`);
      case "derivative": return row(`<mfrac><mi>d</mi>${row(`<mi>d</mi>${inner(item.variable)}`)}</mfrac>${inner(item.body)}`);
      case "integral": return row(`${item.lower || item.upper ? `<msubsup><mo>∫</mo>${item.lower ? inner(item.lower) : "<mrow/>"}${item.upper ? inner(item.upper) : "<mrow/>"}</msubsup>` : "<mo>∫</mo>"}${inner(item.body)}<mi>d</mi>${inner(item.variable)}`);
      case "sum": case "product": return row(`<munderover><mo>${item.type === "sum" ? "∑" : "∏"}</mo>${item.lower ? inner(item.lower) : "<mrow/>"}${item.upper ? inner(item.upper) : "<mrow/>"}</munderover>${inner(item.body)}`);
      case "vector": return `<mover>${inner(item.body)}<mo>→</mo></mover>`;
      case "coordinate": return row(`<mo>(</mo>${(item.children || []).map(inner).join("<mo>,</mo>")}<mo>)</mo>`);
      case "interval": return row(`<mo>${item.openLeft ? "(" : "["}</mo>${inner(item.left)}<mo>,</mo>${inner(item.right)}<mo>${item.openRight ? ")" : "]"}</mo>`);
      case "set": return row(`<mo>{</mo>${(item.children || []).map(inner).join("<mo>,</mo>")}<mo>}</mo>`);
      case "piecewise": return row(`<mo stretchy="true">{</mo><mtable>${(item.branches || []).map((branch) => `<mtr><mtd>${inner(branch.expression)}</mtd><mtd>${inner(branch.condition)}</mtd></mtr>`).join("")}</mtable>`);
      case "aligned": return `<mtable>${(item.children || []).map((child) => `<mtr><mtd>${inner(child)}</mtd></mtr>`).join("")}</mtable>`;
      case "probability": return row(`<mi>ℙ</mi><mo>(</mo>${inner(item.body)}<mo>)</mo>`);
      case "combinatorial": return `<mfrac linethickness="0"><mi>${escapeXml(serializeLatex(item.upper))}</mi><mi>${escapeXml(serializeLatex(item.lower))}</mi></mfrac>`;
      case "unit": return row(`${inner(item.body)}<mtext>${escapeXml(item.value)}</mtext>`);
      case "sequence": return row((item.children || []).map(inner).join(""));
      case "raw-verified": throw new Error("Raw verified nodes are not eligible for derived MathML");
      default: throw new Error(`Unsupported MathML node type: ${item.type}`);
    }
  };
  return `<math xmlns="http://www.w3.org/1998/Math/MathML">${inner(node)}</math>`;
}

export function validateDerivedMathML(value) {
  const text = String(value ?? "");
  return /^<math xmlns="http:\/\/www\.w3\.org\/1998\/Math\/MathML">[\s\S]+<\/math>$/u.test(text)
    && !/<(?:script|img|iframe|object)\b/iu.test(text)
    && (text.match(/</gu) || []).length === (text.match(/>/gu) || []).length;
}
