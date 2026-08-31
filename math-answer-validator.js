(function initializeMathAnswerValidator(global) {
  "use strict";

  const STATUS = Object.freeze({
    EQUIVALENT: "equivalent",
    NOT_EQUIVALENT: "not-equivalent",
    AMBIGUOUS: "ambiguous",
    UNSUPPORTED: "unsupported",
    ERROR: "error"
  });

  function gcd(a, b) {
    let left = a < 0n ? -a : a;
    let right = b < 0n ? -b : b;
    while (right) [left, right] = [right, left % right];
    return left || 1n;
  }

  class Rational {
    constructor(numerator, denominator = 1n) {
      if (denominator === 0n) throw new Error("División por cero");
      let n = BigInt(numerator);
      let d = BigInt(denominator);
      if (d < 0n) { n = -n; d = -d; }
      const divisor = gcd(n, d);
      this.n = n / divisor;
      this.d = d / divisor;
    }
    add(other) { return new Rational(this.n * other.d + other.n * this.d, this.d * other.d); }
    sub(other) { return new Rational(this.n * other.d - other.n * this.d, this.d * other.d); }
    mul(other) { return new Rational(this.n * other.n, this.d * other.d); }
    div(other) { return new Rational(this.n * other.d, this.d * other.n); }
    neg() { return new Rational(-this.n, this.d); }
    pow(exponent) {
      const value = Number(exponent);
      if (!Number.isInteger(value)) throw new Error("Exponente no entero");
      if (value < 0) return new Rational(this.d ** BigInt(-value), this.n ** BigInt(-value));
      return new Rational(this.n ** BigInt(value), this.d ** BigInt(value));
    }
    equals(other) { return this.n === other.n && this.d === other.d; }
    isZero() { return this.n === 0n; }
    toNumber() { return Number(this.n) / Number(this.d); }
    toString() { return this.d === 1n ? String(this.n) : `${this.n}/${this.d}`; }
  }

  function balancedArgument(text, start) {
    if (text[start] !== "{") return null;
    let depth = 1;
    for (let index = start + 1; index < text.length; index += 1) {
      if (text[index] === "{") depth += 1;
      else if (text[index] === "}") depth -= 1;
      if (!depth) return { value: text.slice(start + 1, index), end: index + 1 };
    }
    return null;
  }

  function expandLatexCommands(source) {
    let text = String(source ?? "");
    for (let pass = 0; pass < 12; pass += 1) {
      const fractionAt = text.indexOf("\\frac");
      const sqrtAt = text.indexOf("\\sqrt");
      const commandAt = [fractionAt, sqrtAt].filter((value) => value >= 0).sort((a, b) => a - b)[0];
      if (commandAt === undefined) break;
      if (commandAt === fractionAt) {
        const numerator = balancedArgument(text, fractionAt + 5);
        const denominator = numerator && balancedArgument(text, numerator.end);
        if (!numerator || !denominator) break;
        text = `${text.slice(0, fractionAt)}((${numerator.value})/(${denominator.value}))${text.slice(denominator.end)}`;
      } else {
        const radicand = balancedArgument(text, sqrtAt + 5);
        if (!radicand) break;
        text = `${text.slice(0, sqrtAt)}sqrt(${radicand.value})${text.slice(radicand.end)}`;
      }
    }
    return text;
  }

  function normalizeExpression(value) {
    return expandLatexCommands(value)
      .replace(/\$|\\left|\\right/g, "")
      .replace(/\\(?:cdot|times)/g, "*")
      .replace(/\\sqrt\s*/g, "sqrt")
      .replace(/[−–—]/g, "-")
      .replace(/[×·]/g, "*")
      .replace(/[÷:]/g, "/")
      .replace(/√\s*\(([^()]*)\)/g, "sqrt($1)")
      .replace(/√\s*([0-9A-Za-z]+)/g, "sqrt($1)")
      .replace(/\^?²/g, "^2")
      .replace(/\^?³/g, "^3")
      .replace(/,(?=\d)/g, ".")
      .replace(/\s+/g, "")
      .trim();
  }

  function topLevelRelationIndex(value) {
    const text = String(value ?? "");
    let braceDepth = 0;
    let parenthesisDepth = 0;
    for (let index = 0; index < text.length; index += 1) {
      const character = text[index];
      if (character === "{") braceDepth += 1;
      else if (character === "}") braceDepth = Math.max(0, braceDepth - 1);
      else if (character === "(") parenthesisDepth += 1;
      else if (character === ")") parenthesisDepth = Math.max(0, parenthesisDepth - 1);
      if (braceDepth || parenthesisDepth) continue;
      if (character === "=" || character === "≈") return index;
      if (text.startsWith("\\approx", index) || text.startsWith("\\simeq", index)) return index;
    }
    return -1;
  }

  function constantIntegerExpression(value) {
    const compact = String(value ?? "").replace(/\s+/g, "");
    if (!/^[+-]?\d+(?:[+-]\d+)+$/.test(compact)) return null;
    const terms = compact.match(/[+-]?\d+/g);
    if (!terms) return null;
    return terms.reduce((sum, term) => sum + Number(term), 0);
  }

  function expandRecognitionCommands(source) {
    let text = String(source ?? "");
    for (let pass = 0; pass < 16; pass += 1) {
      const fractionAt = text.indexOf("\\frac");
      const sqrtAt = text.indexOf("\\sqrt");
      const commandAt = [fractionAt, sqrtAt].filter((value) => value >= 0).sort((a, b) => a - b)[0];
      if (commandAt === undefined) break;
      if (commandAt === fractionAt) {
        const numerator = balancedArgument(text, fractionAt + 5);
        const denominator = numerator && balancedArgument(text, numerator.end);
        if (!numerator || !denominator) break;
        text = `${text.slice(0, fractionAt)}fraction[${normalizeRecognitionExpression(numerator.value)},${normalizeRecognitionExpression(denominator.value)}]${text.slice(denominator.end)}`;
      } else {
        const radicand = balancedArgument(text, sqrtAt + 5);
        if (!radicand) break;
        text = `${text.slice(0, sqrtAt)}sqrt[${normalizeRecognitionExpression(radicand.value)}]${text.slice(radicand.end)}`;
      }
    }
    return text;
  }

  function normalizeStructuredEnvironment(text, environment, content) {
    const rows = String(content)
      .split(/\\\\/)
      .map((row) => row.trim())
      .filter(Boolean);
    if (/matrix$/i.test(environment)) {
      const cells = rows.map((row) => row.split("&").map((cell) => normalizeRecognitionExpression(cell)));
      return `${environment.toLowerCase()}[${cells.map((row) => row.join(",")).join(";")}]`;
    }
    if (environment.toLowerCase() === "cases") {
      const normalizedRows = rows.map((row) => {
        const columns = row.split("&");
        if (columns.length === 1) {
          const pedagogicalCondition = row.match(/^(.*?)(?:\\?text\s*\{\s*si\s*\}|si)\s*([A-Za-z].*)$/i);
          if (pedagogicalCondition) columns.splice(0, 1, pedagogicalCondition[1], pedagogicalCondition[2]);
        }
        return columns.map((cell) => normalizeRecognitionExpression(cell.replace(/^,+/, ""))).join("|");
      });
      return `cases[${normalizedRows.join(";")}]`;
    }
    return text;
  }

  function normalizeRecognitionExpression(value) {
    let text = String(value ?? "").trim();
    if (!text) return "";
    text = text
      .replace(/−|–|—/g, "-")
      .replace(/×|·/g, "*")
      .replace(/√/g, "\\sqrt")
      .replace(/∫/g, "\\int")
      .replace(/∞/g, "\\infty")
      .replace(/→/g, "\\to")
      .replace(/∈/g, "\\in")
      .replace(/∩/g, "\\cap")
      .replace(/∼/g, "\\sim")
      .replace(/\\(?:left|right|displaystyle)\b/g, "")
      .replace(/\\(?:begin|end)\s*\{(?:aligned|alignedat|gathered|split)\}/g, "")
      .replace(/\\(?:quad|qquad|,|;|!)/g, "")
      .replace(/\\(?:dfrac|tfrac)\b/g, "\\frac")
      .replace(/\\(?:rightarrow|longrightarrow)\b/g, "\\to")
      .replace(/\\(?:leq|leqslant)(?![A-Za-z])/g, "\\le")
      .replace(/\\(?:geq|geqslant)(?![A-Za-z])/g, "\\ge")
      .replace(/\\operatorname\s*\{\s*(sen|sin)\s*\}/gi, "\\sin")
      .replace(/\\operatorname\s*\{\s*(tg|tan)\s*\}/gi, "\\tan")
      .replace(/\\operatorname\s*\{\s*([^{}]+)\s*\}/gi, "\\$1")
      .replace(/\\(?:sen)\b/gi, "\\sin")
      .replace(/\\(?:tg)\b/gi, "\\tan")
      .replace(/\\overrightarrow\s*\{\s*([^{}]+)\s*\}/g, "vec($1)")
      .replace(/\\vec\s*\{?\s*([A-Za-z])\s*\}?/g, "vec($1)");

    text = text.replace(/P\s*(?:\\left)?\s*\(\s*\\(?:dfrac|frac)\s*\{([^{}]+)\}\s*\{([^{}]+)\}\s*(?:\\right)?\s*\)/g, "P($1/$2)");

    for (let pass = 0; pass < 4; pass += 1) {
      const previous = text;
      text = text.replace(/\\begin\{(pmatrix|bmatrix|vmatrix|cases)\}([\s\S]*?)\\end\{\1\}/g,
        (match, environment, content) => normalizeStructuredEnvironment(match, environment, content));
      if (text === previous) break;
    }

    text = text.replace(/\\frac\s*([A-Za-z0-9])\s*([A-Za-z0-9])/g, "fraction[$1,$2]");
    text = expandRecognitionCommands(text);
    text = text.replace(/\\int\s*((?:[_^]\s*(?:\{[^{}]*\}|[A-Za-z0-9])\s*){0,2})/g, (_, rawBounds) => {
      const lower = rawBounds.match(/_\s*(?:\{([^{}]*)\}|([A-Za-z0-9]))/)?.slice(1).find((value) => value !== undefined) ?? "";
      const upper = rawBounds.match(/\^\s*(?:\{([^{}]*)\}|([A-Za-z0-9]))/)?.slice(1).find((value) => value !== undefined) ?? "";
      return `integral[${normalizeRecognitionExpression(lower)},${normalizeRecognitionExpression(upper)}]`;
    });
    text = text.replace(/\\lim\s*_\s*\{([^{}]*)\}/g, (_, condition) => `limit[${normalizeRecognitionExpression(condition)}]`);
    text = text.replace(/\^\s*\{\s*([0-9+\-\s]+)\s*\}/g, (match, exponent) => {
      const reduced = constantIntegerExpression(exponent);
      return reduced === null ? match : `^${reduced}`;
    });
    text = text
      .replace(/P\s*\(\s*([^()]+?)\s*(?:\\mid|\|)\s*([^()]+?)\s*\)/g, "P($1/$2)")
      .replace(/\\mid\b/g, "/")
      .replace(/\\to(?![A-Za-z])/g, "->")
      .replace(/\\infty(?![A-Za-z])/g, "infinity")
      .replace(/\\in(?![A-Za-z])/g, "in")
      .replace(/\\cap(?![A-Za-z])/g, "cap")
      .replace(/\\sim(?![A-Za-z])/g, "~")
      .replace(/\\(sin|cos|tan|log|ln)(?![A-Za-z])/gi, (_, name) => name.toLowerCase())
      .replace(/\\(alpha|beta|theta|lambda|mu|sigma|pi|rho|eta)(?![A-Za-z])/gi, (_, name) => name.toLowerCase())
      .replace(/\\(?:cdot|times)\b/g, "*")
      .replace(/\\(le|ge|ne)(?![A-Za-z])/g, (_, name) => ({ le: "<=", ge: ">=", ne: "!=" }[name]))
      .replace(/\^\s*\{([^{}]+)\}/g, "^($1)")
      .replace(/_\s*\{([^{}]+)\}/g, "_($1)")
      .replace(/[{}]/g, (character) => character === "{" ? "(" : ")")
      .replace(/\s+/g, "")
      .replace(/sqrt\(([^()]+)\)/g, "sqrt[$1]")
      .replace(/\^\(([^()]+)\)/g, "^$1")
      .replace(/_\(([^()]+)\)/g, "_$1")
      .replace(/\(([^()]+)\)\/\(([^()]+)\)/g, "fraction[$1,$2]")
      .replace(/\(([^()]+)\)\/(-?[A-Za-z0-9.]+)/g, "fraction[$1,$2]")
      .replace(/\b([A-Za-z0-9.]+)\/([A-Za-z0-9.]+)\b/g, "fraction[$1,$2]")
      .replace(/(-[A-Za-z0-9.]+)\/([A-Za-z0-9.]+)/g, "fraction[$1,$2]")
      .replace(/fraction\[\(([^()]*)\),/g, "fraction[$1,")
      .replace(/,\(([^()]*)\)\]/g, ",$1]")
      .replace(/-fraction\[([^,]+),/g, "fraction[-$1,")
      .replace(/\\\\_?$/g, "")
      .replace(/\\+$/g, "")
      .replace(/,+(?=[;\]])/g, "")
      .replace(/;+/g, ";")
      .trim();
    return text;
  }

  function compareRecognition({ recognizedExpression, expectedExpression } = {}) {
    const rawRecognized = String(recognizedExpression ?? "").trim();
    const rawExpected = String(expectedExpression ?? "").trim();
    if (!rawRecognized || !rawExpected) return { status: STATUS.AMBIGUOUS, isEquivalent: null, reason: "empty-expression" };
    if (/\?/.test(rawRecognized)) return { status: STATUS.AMBIGUOUS, isEquivalent: null, reason: "provider-uncertainty-marker" };

    let candidate = rawRecognized;
    if (topLevelRelationIndex(rawExpected) < 0) {
      const relationIndex = topLevelRelationIndex(candidate);
      if (relationIndex >= 0) candidate = candidate.slice(0, relationIndex);
    }
    const elementary = validate({ recognizedExpression: candidate, expectedExpression: rawExpected, validationType: "auto", confidence: 1 });
    if (elementary.status === STATUS.EQUIVALENT) return { ...elementary, validationType: "recognition-elementary" };
    const recognized = normalizeRecognitionExpression(candidate);
    const expected = normalizeRecognitionExpression(rawExpected);
    if (!recognized || !expected) return { status: STATUS.AMBIGUOUS, isEquivalent: null, normalizedExpression: recognized, reason: "empty-normalized-expression" };
    if (recognized === expected) return { status: STATUS.EQUIVALENT, isEquivalent: true, normalizedExpression: recognized, expectedNormalizedExpression: expected, validationType: "recognition-structure" };
    if (recognized.toLowerCase() === expected.toLowerCase()) {
      return { status: STATUS.AMBIGUOUS, isEquivalent: null, normalizedExpression: recognized, expectedNormalizedExpression: expected, validationType: "recognition-structure", reason: "identifier-case-only" };
    }
    return { status: STATUS.NOT_EQUIVALENT, isEquivalent: false, normalizedExpression: recognized, expectedNormalizedExpression: expected, validationType: "recognition-structure" };
  }

  function tokenize(source) {
    const text = normalizeExpression(source);
    const tokens = [];
    let index = 0;
    while (index < text.length) {
      const rest = text.slice(index);
      const number = rest.match(/^\d+(?:\.\d+)?/);
      const identifier = rest.match(/^[A-Za-z]+/);
      if (number) { tokens.push({ type: "number", value: number[0] }); index += number[0].length; continue; }
      if (identifier) { tokens.push({ type: "identifier", value: identifier[0].toLowerCase() }); index += identifier[0].length; continue; }
      if ("+-*/^()=".includes(text[index])) { tokens.push({ type: text[index], value: text[index] }); index += 1; continue; }
      throw new Error(`Símbolo no admitido: ${text[index]}`);
    }
    return tokens;
  }

  function decimalRational(value) {
    const [whole, decimals = ""] = value.split(".");
    return new Rational(BigInt(`${whole}${decimals}`), 10n ** BigInt(decimals.length));
  }

  function parse(source) {
    const tokens = tokenize(source);
    let cursor = 0;
    const peek = () => tokens[cursor];
    const take = (type) => {
      if (peek()?.type !== type) throw new Error(`Se esperaba ${type}`);
      return tokens[cursor++];
    };
    const startsPrimary = (token) => token && ["number", "identifier", "("].includes(token.type);
    function primary() {
      const token = peek();
      if (!token) throw new Error("Expresión incompleta");
      if (token.type === "number") { cursor += 1; return { type: "number", value: decimalRational(token.value) }; }
      if (token.type === "identifier") {
        cursor += 1;
        if (token.value === "sqrt") {
          take("("); const argument = addition(); take(")");
          return { type: "sqrt", argument };
        }
        return { type: "variable", name: token.value };
      }
      if (token.type === "(") { cursor += 1; const value = addition(); take(")"); return value; }
      throw new Error("Expresión no reconocida");
    }
    function unary() {
      if (peek()?.type === "+") { cursor += 1; return unary(); }
      if (peek()?.type === "-") { cursor += 1; return { type: "neg", value: unary() }; }
      return power();
    }
    function power() {
      let left = primary();
      if (peek()?.type === "^") { cursor += 1; left = { type: "pow", left, right: unary() }; }
      return left;
    }
    function multiplication() {
      let left = unary();
      while (peek()?.type === "*" || peek()?.type === "/" || startsPrimary(peek())) {
        const operation = peek()?.type === "/" ? "/" : "*";
        if (peek()?.type === "*" || peek()?.type === "/") cursor += 1;
        left = { type: operation, left, right: unary() };
      }
      return left;
    }
    function addition() {
      let left = multiplication();
      while (peek()?.type === "+" || peek()?.type === "-") {
        const operation = tokens[cursor++].type;
        left = { type: operation, left, right: multiplication() };
      }
      return left;
    }
    const left = addition();
    let tree = left;
    if (peek()?.type === "=") { cursor += 1; tree = { type: "equation", left, right: addition() }; }
    if (cursor !== tokens.length) throw new Error("Quedan símbolos sin interpretar");
    return tree;
  }

  function constantValue(node) {
    if (node.type === "number") return node.value;
    if (node.type === "neg") return constantValue(node.value).neg();
    if (["+", "-", "*", "/"].includes(node.type)) {
      const left = constantValue(node.left); const right = constantValue(node.right);
      return node.type === "+" ? left.add(right) : node.type === "-" ? left.sub(right) : node.type === "*" ? left.mul(right) : left.div(right);
    }
    if (node.type === "pow") return constantValue(node.left).pow(constantValue(node.right).toNumber());
    if (node.type === "sqrt") {
      const value = constantValue(node.argument);
      const numerator = BigInt(Math.round(Math.sqrt(Number(value.n))));
      const denominator = BigInt(Math.round(Math.sqrt(Number(value.d))));
      if (numerator * numerator !== value.n || denominator * denominator !== value.d) throw new Error("Raíz irracional no disponible en esta fase");
      return new Rational(numerator, denominator);
    }
    throw new Error("La expresión no es numérica");
  }

  const monoOne = "";
  function monomial(entries) {
    return [...entries].filter(([, exponent]) => exponent).sort(([a], [b]) => a.localeCompare(b)).map(([name, exponent]) => `${name}^${exponent}`).join("*");
  }
  function multiplyMonomials(left, right) {
    const powers = new Map();
    for (const item of [left, right]) for (const factor of item ? item.split("*") : []) {
      const [name, rawExponent] = factor.split("^");
      powers.set(name, (powers.get(name) || 0) + Number(rawExponent));
    }
    return monomial(powers);
  }
  function addTerm(poly, key, coefficient) {
    const next = (poly.get(key) || new Rational(0n)).add(coefficient);
    if (next.isZero()) poly.delete(key); else poly.set(key, next);
  }
  function polynomial(node) {
    if (node.type === "number") return new Map([[monoOne, node.value]]);
    if (node.type === "variable") return new Map([[`${node.name}^1`, new Rational(1n)]]);
    if (node.type === "neg") {
      const output = new Map(); for (const [key, value] of polynomial(node.value)) output.set(key, value.neg()); return output;
    }
    if (node.type === "+" || node.type === "-") {
      const output = new Map(polynomial(node.left));
      for (const [key, value] of polynomial(node.right)) addTerm(output, key, node.type === "+" ? value : value.neg());
      return output;
    }
    if (node.type === "*") {
      const output = new Map();
      for (const [leftKey, leftValue] of polynomial(node.left)) for (const [rightKey, rightValue] of polynomial(node.right)) addTerm(output, multiplyMonomials(leftKey, rightKey), leftValue.mul(rightValue));
      return output;
    }
    if (node.type === "/") {
      const divisor = constantValue(node.right);
      const output = new Map(); for (const [key, value] of polynomial(node.left)) output.set(key, value.div(divisor)); return output;
    }
    if (node.type === "pow") {
      const exponent = constantValue(node.right).toNumber();
      if (!Number.isInteger(exponent) || exponent < 0 || exponent > 12) throw new Error("Potencia algebraica no admitida");
      let output = new Map([[monoOne, new Rational(1n)]]);
      for (let index = 0; index < exponent; index += 1) output = polynomial({ type: "*", left: polyNode(output), right: node.left });
      return output;
    }
    if (node.type === "sqrt") return new Map([[monoOne, constantValue(node)]]);
    throw new Error("Estructura algebraica no disponible");
  }
  function polyNode(poly) { return { type: "poly", value: poly }; }
  const originalPolynomial = polynomial;
  polynomial = function polynomialWithInternal(node) {
    if (node.type === "poly") return node.value;
    return originalPolynomial(node);
  };

  function polynomialKey(poly) {
    return [...poly.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => `${key || "1"}:${value}`).join("|") || "0";
  }

  function equationDifference(node) {
    if (node.type !== "equation") throw new Error("Se esperaba una ecuación");
    return polynomial({ type: "-", left: node.left, right: node.right });
  }

  function proportional(left, right) {
    const keys = new Set([...left.keys(), ...right.keys()]);
    let ratio = null;
    for (const key of keys) {
      const a = left.get(key) || new Rational(0n);
      const b = right.get(key) || new Rational(0n);
      if (a.isZero() !== b.isZero()) return false;
      if (!a.isZero()) {
        const current = a.div(b);
        if (ratio && !current.equals(ratio)) return false;
        ratio = current;
      }
    }
    return Boolean(ratio);
  }

  function validate({ recognizedExpression, expectedExpression, validationType = "auto", tolerance, equationMode = "structure", confidence = 1 } = {}) {
    const recognized = normalizeExpression(recognizedExpression);
    const expected = normalizeExpression(expectedExpression);
    if (!recognized || !expected) return { status: STATUS.AMBIGUOUS, isEquivalent: null, normalizedExpression: recognized };
    if (!Number.isFinite(Number(confidence)) || Number(confidence) < 0.75) return { status: STATUS.AMBIGUOUS, isEquivalent: null, normalizedExpression: recognized };
    try {
      const recognizedTree = parse(recognized);
      const expectedTree = parse(expected);
      const type = validationType === "auto" ? (recognizedTree.type === "equation" || expectedTree.type === "equation" ? "equation" : "expression") : validationType;
      let equivalent;
      if (["integer", "decimal", "fraction", "number", "scalar", "root", "power"].includes(type)) {
        const left = constantValue(recognizedTree); const right = constantValue(expectedTree);
        equivalent = tolerance === undefined ? left.equals(right) : Math.abs(left.toNumber() - right.toNumber()) <= Number(tolerance);
      } else if (type === "expression") {
        equivalent = polynomialKey(polynomial(recognizedTree)) === polynomialKey(polynomial(expectedTree));
      } else if (type === "equation") {
        if (recognizedTree.type !== "equation" || expectedTree.type !== "equation") equivalent = false;
        else if (equationMode === "solution-set") equivalent = proportional(equationDifference(recognizedTree), equationDifference(expectedTree));
        else equivalent = polynomialKey(polynomial(recognizedTree.left)) === polynomialKey(polynomial(expectedTree.left))
          && polynomialKey(polynomial(recognizedTree.right)) === polynomialKey(polynomial(expectedTree.right));
      } else return { status: STATUS.UNSUPPORTED, isEquivalent: null, normalizedExpression: recognized, validationType: type };
      return { status: equivalent ? STATUS.EQUIVALENT : STATUS.NOT_EQUIVALENT, isEquivalent: equivalent, normalizedExpression: recognized, validationType: type };
    } catch (error) {
      return { status: STATUS.UNSUPPORTED, isEquivalent: null, normalizedExpression: recognized, validationType, reason: error.message };
    }
  }

  global.MargaritaMathAnswerValidator = Object.freeze({ STATUS, Rational, normalizeExpression, normalizeRecognitionExpression, compareRecognition, parse, validate });
})(typeof window !== "undefined" ? window : globalThis);
