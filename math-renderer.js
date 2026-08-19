(function initializeMargaritaMathRenderer(globalScope) {
  "use strict";

  const SKIPPED_HTML_TAGS = new Set(["SCRIPT", "STYLE", "CODE", "PRE", "MATH", "SVG"]);
  const MATH_CLASS_PATTERN = /^(?:math-|matrix-|integral-|barrow-|cofactor-|gauss-|cramer-)/;

  function displayText(value) {
    const text = String(value ?? "");
    return typeof globalScope.normalizeDisplayText === "function"
      ? globalScope.normalizeDisplayText(text)
      : text;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // `cases` se localiza después de escapar el HTML. MyScript puede devolver
  // comparadores ya codificados (`&lt;`) y, al escaparlos de nuevo, llegan como
  // `&amp;lt;`. Antes de volver a componer cada celda matemática hay que
  // recuperar únicamente esas entidades conocidas, nunca insertar HTML libre.
  function decodeMathEntities(value) {
    let decoded = String(value ?? "");
    for (let pass = 0; pass < 6; pass += 1) {
      const next = decoded
        .replace(/&amp;/gi, "&")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, '"')
        .replace(/&#0?39;/gi, "'");
      if (next === decoded) break;
      decoded = next;
    }
    return decoded;
  }

  function normalizeLimitTargets(value) {
    return String(value)
      .replace(/(→\s*)([A-Za-zα-ωΑ-Ω][A-Za-z0-9α-ωΑ-Ω]*)\s*([+-])(?=\s*(?:\)|\}|\s|$))/g, (_, arrow, target, side) => `${arrow}${target}${side === "+" ? "⁺" : "⁻"}`)
      .replace(/([+−-]?)\s*(?:inf(?:inity)?|infinito)\b/gi, (_, sign) => `${sign === "-" ? "−" : sign}∞`);
  }

  function normalize(value, options = {}) {
    let text = displayText(value)
      .replace(/\\(?:left|right)\b\s*/g, "")
      .replace(/\\[,;:!]\s*/g, " ")
      .replace(/\\mathbb\{([RNZQC])\}/g, (_, set) => ({ R: "ℝ", N: "ℕ", Z: "ℤ", Q: "ℚ", C: "ℂ" })[set])
      .replace(/\\emptyset\b|\\varnothing\b/g, "∅")
      .replace(/\\(?:subseteq)\b/g, "⊆")
      .replace(/\\(?:supseteq)\b/g, "⊇")
      .replace(/\\(?:subset)\b/g, "⊂")
      .replace(/\\(?:supset)\b/g, "⊃")
      .replace(/\\notin\b/g, "∉")
      .replace(/\\in\b/g, "∈")
      .replace(/\\(?:parallel)\b/g, "∥")
      .replace(/\\(?:perp)\b/g, "⟂")
      .replace(/\\(?:equiv)\b/g, "≡")
      .replace(/\\(?:approx|simeq)\b/g, "≈")
      .replace(/\\(?:propto)\b/g, "∝")
      .replace(/\\(?:pm)\b/g, "±")
      .replace(/\\(?:mp)\b/g, "∓")
      // En la notación didáctica de Margarita Salas la multiplicación
      // ordinaria se escribe con punto centrado, como en el cuaderno.
      .replace(/\\(?:times)\b/g, "·")
      .replace(/\\(?:cdot)\b/g, "·")
      .replace(/\\(?:div)\b/g, "÷")
      .replace(/\\(?:forall)\b/g, "∀")
      .replace(/\\(?:exists)\b/g, "∃")
      .replace(/\\(?:therefore)\b/g, "∴")
      // `lim` es contenido matemático; la barra pertenece exclusivamente al
      // comando LaTeX y nunca debe quedar visible en el enunciado.
      .replace(/\\lim\b/g, "lim")
      // Las funciones elementales deben mostrarse como notación de cuaderno,
      // no como órdenes LaTeX. Se normalizan antes de adaptar sin -> sen para
      // evitar resultados visibles como `\\sen`, `\\ln` o `\\cos`.
      // MyScript también puede unir la función y su variable (por ejemplo,
      // "\\senx"). Separamos primero esas variantes compactas.
      .replace(/\\(?:sin|sen)\s*([A-Za-z])\b/gi, "sen $1")
      .replace(/\\cos\s*([A-Za-z])\b/gi, "cos $1")
      .replace(/\\(?:tan|tg)\s*([A-Za-z])\b/gi, "tg $1")
      .replace(/\\ln\s*([A-Za-z])\b/gi, "ln $1")
      .replace(/\\log\s*([A-Za-z])\b/gi, "log $1")
      .replace(/\\(?:sin|sen)\b/gi, "sen")
      .replace(/\\cos\b/gi, "cos")
      .replace(/\\tan\b/gi, "tg")
      .replace(/\\ln\b/gi, "ln")
      .replace(/\\log\b/gi, "log")
      // MyScript y algunos bancos compactan fracciones sencillas omitiendo
      // una o las dos parejas de llaves: `\\frac1x`, `\\frac1{x}` o
      // `\\frac{1}x`. Las convertimos a una forma única para que después se
      // compongan siempre como fracciones verticales.
      .replace(/\\(?:dfrac|tfrac|frac)\s*\{([^{}]+)\}\s*([A-Za-z0-9])/g, "\\frac{$1}{$2}")
      .replace(/\\(?:dfrac|tfrac|frac)\s*([A-Za-z0-9])\s*\{([^{}]+)\}/g, "\\frac{$1}{$2}")
      .replace(/\\(?:dfrac|tfrac|frac)\s*([A-Za-z0-9])\s*([A-Za-z0-9])/g, "\\frac{$1}{$2}")
      .replace(/\\(?:Longleftrightarrow|iff)\b/g, " ⇔ ")
      .replace(/\\(?:Leftrightarrow|leftrightarrow)\b/g, " ↔ ")
      .replace(/\\(?:Rightarrow|implies)\b/g, " ⇒ ")
      .replace(/\\(?:rightarrow|to)\b/g, " → ")
      // El comparador puede llegar pegado al valor (por ejemplo `\\ge0`).
      // No usamos `\b` porque entre la `e` y el `0` no existe límite de palabra.
      .replace(/\\(?:geqslant|geq|ge)(?=\s|[-+]?\d|[A-Za-z]|\\|\{|\(|$)/g, " ≥ ")
      .replace(/\\(?:leqslant|leq|le)(?=\s|[-+]?\d|[A-Za-z]|\\|\{|\(|$)/g, " ≤ ")
      .replace(/\\(?:neq|ne)\b/g, " ≠ ")
      .replace(/\\(?:cup|union)\b/g, " ∪ ")
      .replace(/\\(?:cap|intersection)\b/g, " ∩ ")
      .replace(/\\infty\b/g, "∞")
      .replace(/\s*<\s*=\s*>\s*/g, " ⇔ ")
      .replace(/\s*<\s*-\s*>\s*/g, " ↔ ")
      .replace(/\s*=\s*>\s*/g, " ⇒ ")
      .replace(/\s*-\s*>\s*/g, " → ")
      .replace(/\s*<\s*>\s*/g, " ≠ ")
      .replace(/\s*~\s*=\s*/g, " ≈ ")
      .replace(/\s*>\s*=\s*/g, " ≥ ")
      .replace(/\s*<\s*=\s*/g, " ≤ ")
      .replace(/\s*!\s*=\s*/g, " ≠ ")
      .replace(/\s*=\s*=\s*/g, " = ")
      .replace(/([A-Za-z0-9)\]}])\s*\*\*\s*(-?\d+|\([^()]+\)|[A-Za-z][A-Za-z0-9]*)/g, "$1^$2")
      .replace(/([A-Za-z0-9)\]}])\s*\*\s*(?=[A-Za-z0-9(])/g, "$1 · ")
      .replace(/\bunion\b/gi, "∪")
      .replace(/\bintersecci[oó]n\b/gi, "∩")
      .replace(/\+\s*\/\s*-/g, "±")
      .replace(/(\d(?:[.,]\d+)?)\s*[xX]\s*(?=\d)/g, "$1 · ")
      .replace(/\b(base|ancho|largo)\s+x\s+(altura|alto|ancho|largo)\b/gi, "$1 · $2")
      .replace(/(\d)\s+grados\b/gi, "$1°")
      .replace(/\b(Calcula(?:r)?)(?:\s+la)?\s+integral\s+de\s+/gi, "$1 ∫ ")
      .replace(/\bintegral\s+de\s+([^\s]+)\s+a\s+([^\s]+)\s+de\s+/gi, "∫_$1^$2 ")
      .replace(/([)\]])'''(?=\s*(?:=|,|\.|$))/g, "$1‴")
      .replace(/([)\]])''(?=\s*(?:=|,|\.|$))/g, "$1″")
      .replace(/([)\]])'(?=\s*(?:=|,|\.|$))/g, "$1′")
      .replace(/\b([A-Za-z])'''(?=\s*(?:=|\(|\)|,|\.|$))/g, "$1‴")
      .replace(/\b([A-Za-z])''(?=\s*(?:=|\(|\)|,|\.|$))/g, "$1″")
      .replace(/\b([A-Za-z])'(?=\s*(?:=|\(|\)|,|\.|$))/g, "$1′")
      .replace(/\bx\s*(?:->|→)\s*/gi, "x → ");

    text = normalizeLimitTargets(text);
    if (!options.preserveTrigNotation) {
      text = text.replace(/\bsin(?=\s*(?:\^|\(|[A-Za-zα-ωΑ-Ω]))/gi, "sen")
        .replace(/\btan(?=\s*(?:\^|\(|[A-Za-zα-ωΑ-Ω]))/gi, "tg");
    }
    return text;
  }

  function readBalanced(text, start, open = "{", close = "}") {
    let depth = 1;
    let end = start;
    while (end < text.length && depth > 0) {
      if (text[end] === open) depth += 1;
      if (text[end] === close) depth -= 1;
      end += 1;
    }
    return depth === 0 ? end : -1;
  }

  function replaceBalancedCommand(value, pattern, render) {
    const text = String(value);
    let result = "";
    let cursor = 0;
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      result += text.slice(cursor, match.index);
      const contentStart = pattern.lastIndex;
      const contentEnd = readBalanced(text, contentStart, "(", ")");
      if (contentEnd < 0) {
        result += text.slice(match.index);
        return result;
      }
      result += render(text.slice(contentStart, contentEnd - 1), match);
      cursor = contentEnd;
      pattern.lastIndex = cursor;
    }
    return result + text.slice(cursor);
  }

  function replaceBalancedRoots(value) {
    let text = String(value);
    text = replaceBalancedCommand(text, /(?:sqrt|sqr|raiz|√)\(/gi, (content) => `<span class="math-root"><span class="radicand">${replaceBalancedRoots(content)}</span></span>`);
    text = replaceBalancedCommand(text, /(?:cuberoot|raiz3|∛)\(/gi, (content) => `<span class="math-root math-indexed-root"><sup>3</sup><span class="radicand">${replaceBalancedRoots(content)}</span></span>`);
    return text;
  }

  function replaceIndexedRoots(value) {
    return String(value)
      .replace(/(?:sqrt|raiz)\[([^\]]+)\]\(([^()]*)\)/gi, '<span class="math-root math-indexed-root"><sup>$1</sup><span class="radicand">$2</span></span>')
      .replace(/(?:root|raiz)\{([^{}]+)\}\{([^{}]+)\}/gi, '<span class="math-root math-indexed-root"><sup>$1</sup><span class="radicand">$2</span></span>');
  }

  function replaceLatexRoots(value) {
    const text = String(value);
    const pattern = /\\sqrt(?:\[([^\]]+)\])?\{/g;
    let result = "";
    let cursor = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      result += text.slice(cursor, match.index);
      const radicandStart = pattern.lastIndex;
      const radicandEnd = readBalanced(text, radicandStart);
      if (radicandEnd < 0) {
        result += text.slice(match.index);
        return result;
      }
      const radicand = text.slice(radicandStart, radicandEnd - 1);
      const renderedRadicand = replaceLatexRoots(radicand);
      result += match[1]
        ? `<span class="math-root math-indexed-root"><sup>${match[1]}</sup><span class="radicand">${renderedRadicand}</span></span>`
        : `<span class="math-root"><span class="radicand">${renderedRadicand}</span></span>`;
      cursor = radicandEnd;
      pattern.lastIndex = cursor;
    }
    return result + text.slice(cursor);
  }

  function replaceBalancedFractions(value) {
    const text = String(value);
    // MyScript puede devolver \\dfrac o \\tfrac. Las tres variantes deben
    // mostrarse como una fracción vertical, nunca como código LaTeX visible.
    const pattern = /\\?(?:dfrac|tfrac|frac)\{/g;
    let result = "";
    let cursor = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      result += text.slice(cursor, match.index);
      const numeratorStart = pattern.lastIndex;
      const numeratorEnd = readBalanced(text, numeratorStart);
      if (numeratorEnd < 0 || text[numeratorEnd] !== "{") {
        result += text.slice(match.index, pattern.lastIndex);
        cursor = pattern.lastIndex;
        continue;
      }
      const denominatorStart = numeratorEnd + 1;
      const denominatorEnd = readBalanced(text, denominatorStart);
      if (denominatorEnd < 0) {
        result += text.slice(match.index, numeratorEnd + 1);
        cursor = numeratorEnd + 1;
        pattern.lastIndex = cursor;
        continue;
      }
      const numerator = text.slice(numeratorStart, numeratorEnd - 1);
      const denominator = text.slice(denominatorStart, denominatorEnd - 1);
      result += `<span class="math-fraction"><span>${replaceBalancedFractions(numerator)}</span><span>${replaceBalancedFractions(denominator)}</span></span>`;
      cursor = denominatorEnd;
      pattern.lastIndex = cursor;
    }
    return result + text.slice(cursor);
  }

  function replaceBalancedDelimiters(value) {
    const text = String(value);
    const pattern = /\b(paren|bracket)\{/g;
    let result = "";
    let cursor = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      result += text.slice(cursor, match.index);
      const contentStart = pattern.lastIndex;
      const contentEnd = readBalanced(text, contentStart);
      if (contentEnd < 0) {
        result += text.slice(match.index);
        return result;
      }
      const [left, right] = match[1] === "bracket" ? ["[", "]"] : ["(", ")"];
      result += `<span class="math-delimited"><span class="math-delimiter">${left}</span><span class="math-delimited-content">${replaceBalancedDelimiters(text.slice(contentStart, contentEnd - 1))}</span><span class="math-delimiter">${right}</span></span>`;
      cursor = contentEnd;
      pattern.lastIndex = cursor;
    }
    return result + text.slice(cursor);
  }

  function normalizeCoordinateFractions(value) {
    return String(value).replace(/\b([APQ])([′']?)\(\s*([^()]+)\s*\)/g, (full, point, prime, content) => {
      const coordinates = content.split(/\s*,\s*/);
      if (coordinates.length < 2 || coordinates.some((coordinate) => !/^[+−-]?\d+(?:\/\d+)?$/.test(coordinate))) return full;
      return `${point}${prime}(${coordinates.map((coordinate) => {
        const fraction = coordinate.match(/^([+−-]?\d+)\/(\d+)$/);
        return fraction ? `frac{${fraction[1]}}{${fraction[2]}}` : coordinate;
      }).join(", ")})`;
    });
  }

  function splitMatrixRows(content) {
    return String(content)
      .replace(/^\s*\[|\]\s*$/g, "")
      .split(/\]\s*,\s*\[/)
      .map((row) => row.replace(/^\[|\]$/g, "").split(",").map((cell) => cell.trim()))
      .filter((row) => row.length && row.some(Boolean));
  }

  function splitTopLevel(value) {
    const parts = [];
    let start = 0;
    let depth = 0;
    const text = String(value);
    for (let index = 0; index < text.length; index += 1) {
      const character = text[index];
      if (character === "(" || character === "[" || character === "{") depth += 1;
      if (character === ")" || character === "]" || character === "}") depth -= 1;
      if (character === "," && depth === 0) {
        parts.push(text.slice(start, index).trim());
        start = index + 1;
      }
    }
    parts.push(text.slice(start).trim());
    return parts;
  }

  function tupleMatrixContent(candidate) {
    const inner = String(candidate).slice(1, -1).trim();
    const rowTokens = splitTopLevel(inner);
    if (rowTokens.length < 2 || rowTokens.some((row) => !/^\([\s\S]*\)$/.test(row))) return null;
    const rows = rowTokens.map((row) => splitTopLevel(row.slice(1, -1)));
    const columnCount = rows[0]?.length || 0;
    if (columnCount < 2 || rows.some((row) => row.length !== columnCount || row.some((cell) => !cell))) return null;
    return rows.map((row) => `[${row.join(",")}]`).join(",");
  }

  // Los bancos oficiales importados pueden conservar una matriz como una
  // tupla anidada: A=((1,2),(3,4)). Es una representacion interna valida,
  // pero nunca debe llegar asi a la interfaz. La convertimos al formato de
  // matriz que ya entiende este renderizador, sin alterar el dato original.
  function normalizeTupleMatrices(value) {
    const text = String(value);
    let output = "";
    let cursor = 0;
    while (cursor < text.length) {
      const start = text.indexOf("((", cursor);
      if (start < 0) return output + text.slice(cursor);
      output += text.slice(cursor, start);
      let depth = 0;
      let end = -1;
      for (let index = start; index < text.length; index += 1) {
        if (text[index] === "(") depth += 1;
        if (text[index] === ")") depth -= 1;
        if (depth === 0) {
          end = index + 1;
          break;
        }
      }
      if (end < 0) return output + text.slice(start);
      const candidate = text.slice(start, end);
      const matrixContent = tupleMatrixContent(candidate);
      output += matrixContent === null ? candidate : `[${matrixContent}]`;
      cursor = end;
    }
    return output;
  }

  function renderMatrix(content, determinant = false, options = {}) {
    const rows = splitMatrixRows(content);
    if (!rows.length) return `[[${escapeHtml(content)}]]`;
    return `<span class="math-matrix ${determinant ? "math-determinant" : ""}" role="img" aria-label="${determinant ? "determinante" : "matriz"}"><span class="matrix-bracket">${determinant ? "|" : "("}</span><span class="matrix-grid" style="--matrix-columns:${Math.max(1, rows[0]?.length || 1)}">${rows.map((row) => `<span class="matrix-row">${row.map((cell) => `<span>${fragment(cell, { ...options, allowMatrices: false })}</span>`).join("")}</span>`).join("")}</span><span class="matrix-bracket">${determinant ? "|" : ")"}</span></span>`;
  }

  function renderLatexMatrix(content, environment, options = {}) {
    const rows = String(content)
      .split(/\\\\/)
      .map((row) => row.split(/&amp;|&/).map((cell) => cell.trim()))
      .filter((row) => row.length && row.some(Boolean));
    if (!rows.length) return `\\begin{${environment}}${content}\\end{${environment}}`;
    const determinant = environment === "vmatrix";
    const brackets = environment === "bmatrix" ? ["[", "]"] : determinant ? ["|", "|"] : ["(", ")"];
    return `<span class="math-matrix ${determinant ? "math-determinant" : ""}" role="img" aria-label="${determinant ? "determinante" : "matriz"}"><span class="matrix-bracket">${brackets[0]}</span><span class="matrix-grid" style="--matrix-columns:${Math.max(1, rows[0]?.length || 1)}">${rows.map((row) => `<span class="matrix-row">${row.map((cell) => `<span>${fragment(cell, { ...options, allowMatrices: false })}</span>`).join("")}</span>`).join("")}</span><span class="matrix-bracket">${brackets[1]}</span></span>`;
  }

  function replaceMatrices(value, options) {
    if (options.allowMatrices === false) return value;
    return String(value)
      .replace(/\\begin\{(pmatrix|bmatrix|vmatrix)\}([\s\S]*?)\\end\{\1\}/g, (_, environment, content) => renderLatexMatrix(content, environment, options))
      .replace(/\bdet\s*\(\s*\[\[([\s\S]*?)\]\]\s*\)/gi, (_, content) => renderMatrix(content, true, options))
      .replace(/\bdet\s*\[\[([\s\S]*?)\]\]/gi, (_, content) => renderMatrix(content, true, options))
      .replace(/\|\s*\[\[([\s\S]*?)\]\]\s*\|/g, (_, content) => renderMatrix(content, true, options))
      .replace(/\[\[([\s\S]*?)\]\]/g, (_, content) => renderMatrix(content, false, options));
  }

  function normalizePiecewiseText(value) {
    return decodeMathEntities(value)
      .replace(/\\(?:text|operatorname|mathrm|textrm|mathbf|mathit)\s*\{\s*([^{}]*)\s*\}/gi, "$1")
      .replace(/\\(?:,|;|:|!)/g, " ")
      .replace(/\\(?:quad|qquad)\b/gi, " ")
      // MyScript puede compactar `si x` como `six x`. Eliminamos la x
      // repetida mientras el comparador conserva todavía su forma LaTeX.
      .replace(/(si|if)([A-Za-z])\s+\2(?=\s*(?:<|>|\u2264|\u2265|\\?(?:lt|gt|le|ge)(?:q|qslant)?\s*;?|&(?:lt|gt|le|ge);))/gi, "$1 $2")
      .replace(/\\(?:leqslant|leq|le)\s*;?/gi, "\u2264")
      .replace(/\\(?:geqslant|geq|ge)\s*;?/gi, "\u2265")
      .replace(/\\lt\s*;?/gi, "<")
      .replace(/\\gt\s*;?/gi, ">")
      .replace(/\b(?:leqslant|leq|le)\s*;/gi, "\u2264")
      .replace(/\b(?:geqslant|geq|ge)\s*;/gi, "\u2265")
      .replace(/\blt\s*;/gi, "<")
      .replace(/\bgt\s*;/gi, ">")
      .replace(/\s+/g, " ")
      .trim();
  }

  function parsePiecewiseBranch(line) {
    const alignedParts = String(line)
      .split(/\s*&amp;(?!lt;|gt;|le;|ge;|amp;|quot;|#)\s*/i)
      .map((part) => normalizePiecewiseText(part).replace(/^,+|,+$/g, "").trim())
      .filter(Boolean);

    if (alignedParts.length >= 2) {
      const expression = alignedParts[0];
      const condition = alignedParts.slice(1).join(" ")
        .replace(/^,?\s*(?:si|if)\s*/i, "")
        .trim();
      return expression && condition ? [expression, condition] : null;
    }

    // MyScript compacta a veces `si x` como `six`: `x+1six lt;0`.
    // Exigir un comparador impide confundirlo con una palabra ordinaria.
    const compact = normalizePiecewiseText(line)
      .replace(/^,+|,+$/g, "")
      .trim()
      .match(/^(.*?)(?:,\s*)?(?:si|if)\s*([A-Za-z][A-Za-z0-9_{}^'′″\\-]*\s*(?:≤|≥|<|>)\s*.+)$/i);

    return compact && compact[1].trim()
      ? [compact[1].trim(), compact[2].trim()]
      : null;
  }

  function parsePiecewiseBranches(content) {
    const rows = String(content)
      .split(/\\\\|\\cr\b|\r?\n/gi)
      .map((line) => line.replace(/^,+|,+$/g, "").trim())
      .filter(Boolean);
    const rowBranches = rows.map(parsePiecewiseBranch);
    if (rowBranches.length >= 2 && rowBranches.every(Boolean)) return rowBranches;

    // MyScript puede devolver los dos renglones seguidos, sin `\\\\`:
    // `x+1six &amp;amp;lt;0x^2six \\ge 0`. Separamos únicamente parejas
    // inequívocas formadas por expresión + "si" + condición.
    const compact = normalizePiecewiseText(content)
      .replace(/&amp;(?!lt;|gt;|le;|ge;|amp;|quot;|#)/gi, " ")
      .replace(/\\\\|\\cr\b/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
    const branches = [];
    const pairPattern = /(.+?)(?:,\s*)?(?:si|if)\s*([A-Za-z][A-Za-z0-9_{}^'′″\\-]*\s*(?:≤|≥|<|>)\s*[+−-]?(?:\d+(?:[.,]\d+)?|[A-Za-z][A-Za-z0-9_{}^'′″\\-]*))/gi;
    let match;
    while ((match = pairPattern.exec(compact)) !== null) {
      const expression = match[1]
        .replace(/^(?:\\\\|\\cr\b|[,;\s])+|(?:\\\\|\\cr\b|[,;\s])+$/gi, "")
        .trim();
      const condition = match[2].trim();
      if (expression && condition) branches.push([expression, condition]);
    }
    return branches;
  }

  function replaceLatexCases(value, options = {}) {
    return String(value).replace(/\\+begin\s*\{\s*cases\s*\}([\s\S]*?)\\+end\s*\{\s*cases\s*\}/gi, (_, content) => {
      const rows = String(content)
        .split(/\\\\|\r?\n/)
        .map((line) => line.replace(/^,+|,+$/g, "").trim())
        .filter(Boolean);
      const branches = rows.map((line) => {
        const alignedParts = line
        // El `&amp;` de alineación no debe confundirse con una entidad que
        // MyScript ya hubiera incluido, por ejemplo `&amp;lt;`.
        .split(/\s*&amp;(?!lt;|gt;|le;|ge;|amp;|quot;|#)\s*/i)
        .map((part) => part.trim());
        if (alignedParts.length >= 2) return alignedParts;

        // MyScript puede omitir el separador de columnas y devolver, por
        // ejemplo, `x+1six lt;0`. Solo lo separamos cuando hay un `si/if`
        // seguido de una condicion matematica inequÃ­voca.
        const decodedLine = decodeMathEntities(line)
          .replace(/&?(lt|gt|le|ge);/gi, "$1;")
          .trim();
        const compactMatch = decodedLine.match(
          /^(.*?)(?:\\text\s*\{\s*(?:si|if)\s*\}|\\operatorname\s*\{\s*(?:si|if)\s*\}|(?:si|if))\s*([A-Za-z]\s*(?:(?:\\?(?:lt|gt|le|ge)(?:q|qslant)?;?)|[<>â‰¤â‰¥])\s*.+)$/i
        );
        const normalizedCompactMatch = compactMatch || decodedLine.match(
          /^(.*?)(?:\\text\s*\{\s*(?:si|if)\s*\}|\\operatorname\s*\{\s*(?:si|if)\s*\}|(?:si|if))\s*([A-Za-z]\s*(?:(?:\\?(?:lt|gt|le|ge)(?:q|qslant)?;?)|[<>\u2264\u2265])\s*.+)$/i
        );
        return normalizedCompactMatch
          ? [normalizedCompactMatch[1].trim(), normalizedCompactMatch[2].trim()]
          : alignedParts;
      });
      // Esta segunda lectura es la fuente de verdad para las funciones a
      // trozos. Acepta tanto LaTeX alineado como la forma compacta real que
      // devuelve MyScript (`x+1six lt;0`).
      const parsedBranches = parsePiecewiseBranches(content);

      // En LaTeX, `&` separa la expresión de su condición dentro de
      // `cases`. Tras escapar el HTML ese separador es `&amp;`. No debemos
      // eliminar cualquier `&`, porque también inicia entidades legítimas
      // como `&lt;` y `&gt;`; hacerlo convertía x<0 en el texto visible
      // `xlt;0`. Si hay dos columnas, componemos una función a trozos.
      if (parsedBranches.length >= 2 && parsedBranches.every(Boolean)) {
        const branchMarkup = parsedBranches.map(([expression, ...conditionParts]) => {
          const decodedExpression = normalizePiecewiseText(expression);
          const condition = normalizePiecewiseText(conditionParts.join(" "))
            .replace(/^,\s*/, "")
            .replace(/^\\text\s*\{\s*(?:si|if)\s*\}\s*/i, "")
            .replace(/^(?:si|if)\s*/i, "")
            .replace(/(?:\\le(?:q|qslant)?;?|le;)/gi, "\u2264")
            .replace(/(?:\\ge(?:q|qslant)?;?|ge;)/gi, "\u2265")
            .replace(/(?:\\lt;?|lt;)/gi, "<")
            .replace(/(?:\\gt;?|gt;)/gi, ">")
            .replace(/(?:\\le(?:q|qslant)?;?|le;)/gi, "â‰¤")
            .replace(/(?:\\ge(?:q|qslant)?;?|ge;)/gi, "â‰¥")
            .trim();
          // Las dos columnas vuelven a pasar por el mismo renderizador que el
          // resto de la aplicación. Así objetivo y reconocimiento comparten
          // superíndices, cursivas, comparadores, peso y proporciones.
          const renderedExpression = fragment(decodedExpression, { ...options, allowMatrices: false });
          const renderedCondition = fragment(condition, { ...options, allowMatrices: false });
          return `<span><span>${renderedExpression}</span><small>si ${renderedCondition}</small></span>`;
        }).join("");
        return `<span class="math-piecewise" role="img" aria-label="función definida a trozos"><span class="math-system-brace">{</span><span class="math-piecewise-lines">${branchMarkup}</span></span>`;
      }

      // Un entorno cases sin columna de condiciones se conserva como sistema.
      return renderSystem(rows, options);
    });
  }

  function replaceInlineFractions(value) {
    const protectedText = [];
    let text = String(value).replace(/(?:\bhttps?:\/\/[^\s<]+|\bwww\.[^\s<]+|\b(?:[A-Za-z]:\\[^\s<]+|(?:[\w.-]+\/)+[\w.-]+\.[A-Za-z0-9]{2,8}))/gi, (match) => {
      const index = protectedText.push(match) - 1;
      return `@@PLAIN${index}@@`;
    });
    const atom = String.raw`(?:\([^()]+\)|√[^\s=+−*·,;]+|(?:sen|cos|tg|ln|log)\([^()]+\)|[+−-]?(?:\d+(?:[.,]\d+)?(?:[A-Za-zα-ωΑ-Ωπ]+)?|[A-Za-zα-ωΑ-Ωπ]+)(?:<sup>[^<]+<\/sup>)?)`;
    const pattern = new RegExp(`(${atom})\\s*\\/\\s*(${atom})`, "g");
    for (let pass = 0; pass < 3; pass += 1) {
      const updated = text.replace(pattern, '<span class="math-fraction"><span>$1</span><span>$2</span></span>');
      if (updated === text) break;
      text = updated;
    }
    return text.replace(/@@PLAIN(\d+)@@/g, (_, index) => protectedText[Number(index)] || "");
  }

  function replaceLimits(value) {
    const render = (_, condition) => `<span class="math-limit"><span>lim</span><sub>${condition.trim()}</sub></span>`;
    return String(value)
      .replace(/\blim\s*_\{\s*([^{}]+)\s*\}/gi, render)
      .replace(/\blim\s*\(\s*([^()]*?→[^()]*)\s*\)/gi, render)
      .replace(/\blim\s+([A-Za-zα-ωΑ-Ω][A-Za-z0-9α-ωΑ-Ω]*\s*→\s*(?:[+−-]?∞|[^\s<]+))(?:\s+de)?/gi, render);
  }

  function replaceVectors(value) {
    return String(value)
      .replace(/(?:\\?vec|vector|overrightarrow)\{([^{}]+)\}/gi, '<span class="math-vector"><span>$1</span></span>')
      .replace(/\b([A-Za-z]{1,3})⃗/g, '<span class="math-vector"><span>$1</span></span>');
  }

  function fragment(value, options = {}) {
    const normalized = normalizeTupleMatrices(normalizeCoordinateFractions(normalize(value, options)));
    let output = escapeHtml(normalized);
    output = replaceLatexCases(output, options);
    // La cabecera de una función a trozos debe conservar tipografía matemática
    // aunque el contenedor exterior (por ejemplo, un enunciado) use negrita.
    // Solo se aplica cuando f(x)= precede inmediatamente al bloque `cases`.
    output = output.replace(
      /\b([A-Za-z])\s*\(\s*([A-Za-z])\s*\)\s*=\s*(?=<span class="math-piecewise")/g,
      '<span class="math-piecewise-prefix"><i>$1</i><span class="math-function-paren">(</span><i>$2</i><span class="math-function-paren">)</span> =</span> '
    );
    output = replaceMatrices(output, options);
    // MyScript envuelve a veces una respuesta de varias partes en entornos de
    // alineación LaTeX. Son metadatos de maquetación: no deben mostrarse al
    // alumno ni confundirse con el contenido matemático reconocido. Las
    // matrices ya se han compuesto antes, por lo que sus separadores internos
    // no se ven afectados aquí.
    output = output
      .replace(/\\begin\{(?:aligned|alignedat|gathered|split)\}/g, '<span class="math-aligned">')
      .replace(/\\end\{(?:aligned|alignedat|gathered|split)\}/g, "</span>")
      .replace(/\\\\\s*(?=<\/span>|$)/g, "")
      .replace(/\\\\/g, '<span class="math-aligned-break"></span>')
      .replace(/(^|>)\s*&amp;\s*/g, "$1")
      .replace(/\s*&amp;\s*/g, " ");
    // Espaciado LaTeX: son órdenes de presentación, nunca texto visible.
    output = output
      .replace(/\\qquad\b/g, '<span class="math-space math-space-wide" aria-hidden="true"></span>')
      .replace(/\\quad\b/g, '<span class="math-space" aria-hidden="true"></span>')
      .replace(/\\[;,!]\s*/g, " ");
    output = replaceLatexRoots(output);
    output = replaceBalancedFractions(replaceBalancedDelimiters(output));
    output = replaceIndexedRoots(output);
    output = replaceBalancedRoots(output);
    output = replaceLimits(output);
    output = replaceVectors(output);
    output = output
      .replace(/√([A-Za-z0-9]+(?:\^[0-9]+)?)/g, '<span class="math-root"><span class="radicand">$1</span></span>')
      .replace(/∫_\{([^}]+)\}\^\{([^}]+)\}\s*/g, '<span class="math-integral"><span class="integral-sign">∫</span><span class="integral-bounds"><sup>$2</sup><sub>$1</sub></span></span> ')
      .replace(/∫_([^\s^]+)\^([^\s]+)\s*/g, '<span class="math-integral"><span class="integral-sign">∫</span><span class="integral-bounds"><sup>$2</sup><sub>$1</sub></span></span> ')
      .replace(/∫([₀₁₂₃₄₅₆₇₈₉₋]+)\^([^\s]+)/g, '<span class="math-integral"><span class="integral-sign">∫</span><span class="integral-bounds"><sup>$2</sup><sub>$1</sub></span></span>')
      .replace(/\bd([²³⁴⁵⁶⁷⁸⁹⁰]?)y\s*\/\s*d([A-Za-z])([²³⁴⁵⁶⁷⁸⁹⁰]?)/g, (_, numeratorOrder, variable, denominatorOrder) => `<span class="math-fraction math-leibniz"><span>d${numeratorOrder}y</span><span>d${variable}${denominatorOrder}</span></span>`)
      .replace(/([)\]])_\{([^}]+)\}\^\{([^}]+)\}/g, '$1<span class="math-evaluation"><sup>$3</sup><sub>$2</sub></span>')
      .replace(/([)\]])([₀₁₂₃₄₅₆₇₈₉₋]+)\^([A-Za-zα-ωΑ-Ωπ∞0-9+\-]+)/g, '$1<span class="math-evaluation"><sup>$3</sup><sub>$2</sub></span>')
      .replace(/\b(sen|cos|tg|ln|log)\^\{?([^{}()\s]+)\}?\(([^)]+)\)/gi, '$1<sup>$2</sup>($3)')
      .replace(/([A-Za-z0-9α-ωΑ-Ωπ|)\]}])\^\{([^{}]+)\}/g, '$1<sup>$2</sup>')
      .replace(/([A-Za-z0-9α-ωΑ-Ωπ|)\]}])\^\(([^()]+)\)/g, '$1<sup>$2</sup>')
      .replace(/([A-Za-z0-9α-ωΑ-Ωπ|)\]}])\^(-?\d+)/g, '$1<sup>$2</sup>')
      .replace(/([A-Za-z0-9α-ωΑ-Ωπ|)\]}])\^([A-Za-zα-ωΑ-Ωπ][A-Za-z0-9α-ωΑ-Ωπ²³]*)/g, '$1<sup>$2</sup>')
      .replace(/([A-Za-z)\]}])_\{([^{}]+)\}/g, '$1<sub>$2</sub>')
      .replace(/([A-Za-z])_([A-Za-z0-9]+)/g, '$1<sub>$2</sub>')
      .replace(/\\overline\{([^}]+)\}/g, '<span class="math-overline">$1</span>')
      .replace(/\bpi\b/g, "π")
      .replace(/\balpha\b/gi, "α")
      .replace(/\bbeta\b/gi, "β")
      .replace(/\bsigma\b/gi, "σ")
      .replace(/\bmu\b/gi, "μ")
      .replace(/\bDelta\b/g, "Δ")
      .replace(/\bR\b/g, "ℝ");
    return replaceInlineFractions(output);
  }

  function systemEquationLine(value) {
    const line = String(value ?? "").trim().replace(/^[{}]\s*|\s*[{}.;]$/g, "");
    return line.length > 2 && line.length < 220 && /(?:=|≤|≥|<|>)/.test(line) && !/^\d+[.)]\s/.test(line);
  }

  function renderSystem(equations, options = {}) {
    const lines = equations.map((equation) => String(equation).trim().replace(/^[{}]\s*|\s*[{}.;]$/g, "")).filter(Boolean);
    const rowClass = `math-system-rows-${Math.min(5, Math.max(2, lines.length))}`;
    return `<span class="math-system ${rowClass}" role="img" aria-label="sistema de ecuaciones"><span class="math-system-brace">{</span><span class="math-system-lines">${lines.map((equation) => `<span>${fragment(equation, options)}</span>`).join("")}</span></span>`;
  }

  function formatPiecewise(line, options) {
    const match = line.match(/^(.*?=)\s*\{\s*(.+?)\s*\}\s*([.,]?)$/i);
    if (!match) return null;
    const branches = match[2].split(/\s*;\s*/).map((branch) => {
      const parts = branch.split(/\s+si\s+/i);
      return parts.length >= 2 ? [parts.shift(), parts.join(" si ")] : null;
    }).filter(Boolean);
    if (branches.length < 2) return null;
    const prefix = fragment(match[1], options).replace(
      /^\s*([A-Za-z])\s*\(\s*([A-Za-z])\s*\)\s*=\s*$/,
      '<span class="math-piecewise-prefix"><i>$1</i><span class="math-function-paren">(</span><i>$2</i><span class="math-function-paren">)</span> =</span>'
    );
    return `${prefix} <span class="math-piecewise" role="img" aria-label="función definida a trozos"><span class="math-system-brace">{</span><span class="math-piecewise-lines">${branches.map(([expression, condition]) => `<span><span>${fragment(expression, options)}</span><small>si ${fragment(condition, options)}</small></span>`).join("")}</span></span>${match[3]}`;
  }

  function text(value, options = {}) {
    const normalizedText = normalize(value, options);
    // MyScript suele devolver las matrices con saltos de línea reales entre
    // \begin{pmatrix} y \end{pmatrix}. No se deben separar antes de componerlas.
    if (/\\begin\{(?:pmatrix|bmatrix|vmatrix|cases|aligned|alignedat|gathered|split)\}[\s\S]*?\\end\{(?:pmatrix|bmatrix|vmatrix|cases|aligned|alignedat|gathered|split)\}/.test(normalizedText)) {
      return fragment(normalizedText, options);
    }
    const lines = normalizedText.split(/\\n|\r?\n/);
    const rendered = [];
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const explicitSystem = line.match(/^\s*(?:system|sistema)\{([\s\S]+)\}\s*$/i);
      if (explicitSystem) {
        rendered.push(renderSystem(explicitSystem[1].split(/\s*;\s*/), options));
        continue;
      }
      const piecewise = formatPiecewise(line, options);
      if (piecewise) {
        rendered.push(piecewise);
        continue;
      }
      if (/\bsistema\b/i.test(line)) {
        const following = [];
        let cursor = index + 1;
        while (cursor < lines.length && systemEquationLine(lines[cursor])) {
          following.push(lines[cursor]);
          cursor += 1;
        }
        if (following.length >= 2) {
          rendered.push(`${fragment(line, options)} ${renderSystem(following, options)}`);
          index = cursor - 1;
          continue;
        }
        const separator = line.indexOf(":");
        if (separator >= 0) {
          const equations = line.slice(separator + 1).replace(/[.]$/, "").split(/\s*(?:;|,(?=\s*[^,;]*(?:=|≤|≥|<|>)))\s*/).filter(systemEquationLine);
          if (equations.length >= 2) {
            rendered.push(`${fragment(line.slice(0, separator + 1), options)} ${renderSystem(equations, options)}`);
            continue;
          }
        }
      }
      rendered.push(fragment(line, options));
    }
    return rendered.join("<br>");
  }

  function looksMathematical(value) {
    return /(?:\\(?:sqrt|dfrac|tfrac|frac|mathbb|vec|overrightarrow)|\b(?:frac|sqrt|raiz|root|cuberoot|vector|vec|lim|sen|sin|cos|tg|tan|log|det)\b|\[\[|→|∞|∫|∀|∈|ℝ|∪|∩|[A-Za-z0-9)\]}][\^_]|\([^()]+\)\s*\/\s*\([^()]+\)|\b\w+\s*\/\s*\w+\b)/i.test(String(value));
  }

  function shouldSkipTextNode(node) {
    let element = node.parentElement;
    while (element) {
      if (SKIPPED_HTML_TAGS.has(element.tagName)) return true;
      if (element.hasAttribute?.("data-math-rendered")) return true;
      if ([...element.classList].some((className) => MATH_CLASS_PATTERN.test(className))) return true;
      element = element.parentElement;
    }
    return false;
  }

  function html(value, options = {}) {
    const source = String(value ?? "");
    if (!source || typeof document === "undefined" || !document.createElement || typeof NodeFilter === "undefined") return source;
    const template = document.createElement("template");
    template.innerHTML = source;
    const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (shouldSkipTextNode(node) || !looksMathematical(node.nodeValue)) return;
      const holder = document.createElement("span");
      holder.setAttribute("data-math-rendered", "true");
      holder.innerHTML = text(node.nodeValue, options);
      node.replaceWith(...holder.childNodes);
    });
    return template.innerHTML;
  }

  globalScope.MargaritaMathRenderer = Object.freeze({
    normalize,
    fragment,
    text,
    html,
    matrix: renderMatrix,
    system: renderSystem,
    looksMathematical
  });
})(typeof window !== "undefined" ? window : globalThis);
