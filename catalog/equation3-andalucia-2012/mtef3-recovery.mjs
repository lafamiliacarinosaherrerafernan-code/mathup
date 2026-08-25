import crypto from "node:crypto";

const END = 0;
const LINE = 1;
const CHAR = 2;
const TMPL = 3;
const PILE = 4;
const MATRIX = 5;
const EMBELL = 6;
const RULER = 7;
const FONT = 8;
const SIZE = 9;

const SELECTORS = new Map([
  [0, "angle"], [1, "parentheses"], [2, "braces"], [3, "brackets"],
  [4, "absolute"], [5, "double-absolute"], [6, "floor"], [7, "ceiling"],
  [8, "interval"], [9, "interval"], [10, "interval"], [11, "interval"], [12, "interval"],
  [13, "radical"], [14, "fraction"], [15, "script"], [16, "underbar"], [17, "overbar"],
  [18, "arrow"], [19, "arrow"], [20, "arrow"], [21, "integral"], [22, "integral"],
  [23, "integral"], [24, "integral"], [25, "integral"], [26, "integral"],
  [27, "overbrace"], [28, "underbrace"], [29, "sum"], [30, "sum"],
  [31, "product"], [32, "product"], [33, "coproduct"], [34, "coproduct"],
  [35, "union"], [36, "union"], [37, "intersection"], [38, "intersection"],
  [39, "limit"], [40, "long-division"], [41, "fraction"], [42, "integral-operator"],
  [43, "sum-operator"], [44, "prescript"], [45, "dirac"], [46, "vector"],
  [47, "vector"], [48, "box"]
]);

export function sha256(value) {
  return crypto.createHash("sha256").update(Buffer.isBuffer(value) ? value : Buffer.from(String(value))).digest("hex");
}

class Reader {
  constructor(buffer) { this.buffer = buffer; this.offset = 0; this.bitByte = null; this.bitShift = -1; }
  get remaining() { return this.buffer.length - this.offset; }
  u8() {
    if (this.offset >= this.buffer.length) throw new Error(`Unexpected EOF at ${this.offset}`);
    if (this.bitByte !== null) throw new Error("Unaligned byte read");
    return this.buffer[this.offset++];
  }
  i8() { const value = this.u8(); return value >= 128 ? value - 256 : value; }
  u16() { return this.u8() | (this.u8() << 8); }
  twoBits() {
    if (this.bitByte === null) {
      if (this.offset >= this.buffer.length) throw new Error(`Unexpected EOF at ${this.offset}`);
      this.bitByte = this.buffer[this.offset++]; this.bitShift = 6;
    }
    const value = (this.bitByte >> this.bitShift) & 3;
    this.bitShift -= 2;
    if (this.bitShift < 0) { this.bitByte = null; this.bitShift = -1; }
    return value;
  }
  align() { this.bitByte = null; this.bitShift = -1; }
  bytes(count) { if (this.bitByte !== null) throw new Error("Unaligned read"); const value = this.buffer.subarray(this.offset, this.offset + count); this.offset += count; return value; }
}

function parseNudge(reader) {
  const x = reader.i8(); const y = reader.i8();
  return x === -128 && y === -128 ? { x: reader.u16(), y: reader.u16(), large: true } : { x: x - 128, y: y - 128, large: false };
}

function parseRuler(reader) {
  const count = Math.max(0, reader.i8()); const stops = [];
  for (let index = 0; index < count; index += 1) stops.push({ type: reader.i8(), position: reader.u16() });
  return { type: "ruler", stops };
}

function parseList(reader) {
  const records = [];
  while (reader.remaining > 0) {
    const start = reader.offset; const tag = reader.u8(); const recordType = tag & 15; const options = tag >> 4;
    if (recordType === END) return { records, terminated: true, endOffset: reader.offset };
    const record = parseRecord(reader, recordType, options);
    record.recordType = recordType; record.options = options; record.byteRange = [start, reader.offset];
    records.push(record);
  }
  return { records, terminated: false, endOffset: reader.offset };
}

function parseRecord(reader, recordType, options) {
  if (recordType === CHAR) {
    const nudge = options & 8 ? parseNudge(reader) : undefined;
    const typeface = reader.i8() + 128; const codepoint = reader.u16();
    // MTEF 3 CHAR flags: bit 0 marks function/style behavior and bit 1
    // announces the following embellishment list.  Treating bit 0 as the
    // list flag consumes the next record and corrupts the stream boundary.
    const embellishments = options & 2 ? parseList(reader).records : [];
    return { type: "char", typeface, codepoint, nudge, embellishments, functionStyle: Boolean(options & 1) };
  }
  if (recordType === TMPL) {
    const nudge = options & 8 ? parseNudge(reader) : undefined;
    const selectorCode = reader.i8(); const variation = reader.u8(); const templateOptions = reader.u8();
    return { type: "template", selectorCode, selector: SELECTORS.get(selectorCode) ?? `unknown-${selectorCode}`, variation, templateOptions, nudge, children: parseList(reader).records };
  }
  if (recordType === LINE) {
    const nudge = options & 8 ? parseNudge(reader) : undefined;
    const lineSpacing = options & 4 ? reader.u16() : undefined;
    const ruler = options & 2 ? parseRuler(reader) : undefined;
    return { type: "line", nudge, lineSpacing, ruler, children: options & 1 ? [] : parseList(reader).records };
  }
  if (recordType === PILE) {
    const nudge = options & 8 ? parseNudge(reader) : undefined;
    const horizontalAlignment = reader.i8(); const verticalAlignment = reader.i8();
    const ruler = options & 2 ? parseRuler(reader) : undefined;
    return { type: "pile", nudge, horizontalAlignment, verticalAlignment, ruler, children: parseList(reader).records };
  }
  if (recordType === MATRIX) {
    const nudge = options & 8 ? parseNudge(reader) : undefined;
    const verticalAlignment = reader.i8(); const horizontalJustification = reader.i8(); const verticalJustification = reader.i8();
    const rows = Math.max(0, reader.i8()); const columns = Math.max(0, reader.i8());
    const rowPartitions = []; const columnPartitions = [];
    for (let index = 0; index < rows + 1; index += 1) rowPartitions.push(reader.twoBits());
    reader.align();
    for (let index = 0; index < columns + 1; index += 1) columnPartitions.push(reader.twoBits());
    reader.align();
    return { type: "matrix", nudge, verticalAlignment, horizontalJustification, verticalJustification, rows, columns, rowPartitions, columnPartitions, children: parseList(reader).records };
  }
  if (recordType === EMBELL) return { type: "embellishment", code: reader.u8() };
  if (recordType === RULER) return parseRuler(reader);
  if (recordType === FONT) {
    const typeface = reader.i8() + 128; const style = reader.i8(); const bytes = [];
    while (reader.remaining > 0) { const value = reader.u8(); if (!value) break; bytes.push(value); }
    return { type: "font", typeface, style, name: Buffer.from(bytes).toString("latin1") };
  }
  if (recordType === SIZE) {
    const selector = reader.i8();
    if (selector === 101) return { type: "size", selector, pointSize: -reader.u16() };
    if (selector === 100) return { type: "size", selector, largeSize: reader.u8(), deltaSize: reader.u16() };
    return { type: "size", selector, largeSize: selector, deltaSize: reader.u8() - 128 };
  }
  if ([10, 11, 12, 13, 14].includes(recordType)) return { type: "size-marker", marker: recordType };
  throw new Error(`Unsupported MTEF v3 record type ${recordType} at ${reader.offset}`);
}

export function parseMtef3(buffer) {
  if (!Buffer.isBuffer(buffer)) buffer = Buffer.from(buffer);
  if (buffer.length < 6 || buffer[0] !== 3) throw new Error("Not an MTEF v3 stream");
  const header = { version: buffer[0], platform: buffer[1], product: buffer[2], productVersion: buffer[3], productSubversion: buffer[4] };
  const reader = new Reader(buffer.subarray(5));
  const parsed = parseList(reader);
  if (!parsed.terminated) throw new Error("MTEF stream lacks top-level END record");
  const trailing = reader.buffer.subarray(reader.offset);
  if (trailing.some((value) => value !== 0)) throw new Error(`Non-zero trailing MTEF bytes: ${trailing.toString("hex")}`);
  return { schemaVersion: "mathup.mtef3-record-tree.v1", header, records: parsed.records, bytesConsumed: 5 + reader.offset, trailingZeroBytes: trailing.length };
}

function charNode(record) {
  const value = String.fromCodePoint(record.codepoint);
  // MathType's typeface 24 / U+EB02 is its explicit spacing glyph.  It is
  // layout metadata, not a mathematical symbol.
  if (record.typeface === 24 && record.codepoint === 0xeb02) return { type: "space", value: " " };
  if (/^[0-9]$/u.test(value)) return { type: "number", value };
  if (/^[A-Za-z]$/u.test(value) || /\p{L}/u.test(value)) return { type: "identifier", value };
  return { type: "operator", value };
}

function linesOf(records) { return records.filter((item) => item.type === "line").map((item) => sequenceOf(item.children)); }
function nonEmpty(node) { return node && !(node.type === "sequence" && node.children.length === 0); }
function childAt(slots, index) { return slots[index] ?? { type: "sequence", children: [] }; }

function templateNode(record) {
  const slots = linesOf(record.children);
  const meta = { mtefTemplate: { selectorCode: record.selectorCode, selector: record.selector, variation: record.variation, templateOptions: record.templateOptions } };
  if (record.selector === "fraction") return { type: "fraction", numerator: childAt(slots, 0), denominator: childAt(slots, 1), ...meta };
  if (record.selector === "radical") return record.variation === 1 ? { type: "radical", radicand: childAt(slots, 0), index: childAt(slots, 1), ...meta } : { type: "radical", radicand: childAt(slots, 0), ...meta };
  if (record.selector === "script") {
    // MTEF v3 stores an empty subscript slot followed by the superscript for
    // variation 0; variation 1 is the inverse.  Retaining the empty slot is
    // essential while parsing, but it is not part of the semantic AST.
    if (record.variation === 0) return { type: "power", basePending: true, exponent: childAt(slots, 1), ...meta };
    if (record.variation === 1) return { type: "subscript", basePending: true, index: childAt(slots, 0), ...meta };
    return { type: "subsup", basePending: true, index: childAt(slots, 0), upper: childAt(slots, 1), ...meta };
  }
  if (record.selector === "prescript") return { type: "prescript", children: slots, ...meta };
  if (["parentheses", "braces", "brackets", "angle", "floor", "ceiling", "interval"].includes(record.selector)) return { type: "delimited", delimiter: record.selector, body: childAt(slots, 0), ...meta };
  if (record.selector === "absolute" || record.selector === "double-absolute") return { type: "absolute", body: childAt(slots, 0), double: record.selector === "double-absolute", ...meta };
  if (record.selector === "vector") return { type: "vector", body: childAt(slots, 0), direction: record.selectorCode === 46 ? "under" : "over", variation: record.variation, ...meta };
  if (record.selector === "integral" || record.selector === "integral-operator") return { type: "integral", body: childAt(slots, 0), lower: slots.length > 1 ? childAt(slots, 1) : undefined, upper: slots.length > 2 ? childAt(slots, 2) : undefined, multiplicity: Math.max(1, Math.min(3, record.selectorCode - 20)), ...meta };
  if (["sum", "product", "coproduct", "union", "intersection", "sum-operator"].includes(record.selector)) return { type: record.selector, body: childAt(slots, 0), lower: slots.length > 1 ? childAt(slots, 1) : undefined, upper: slots.length > 2 ? childAt(slots, 2) : undefined, ...meta };
  if (record.selector === "limit") return { type: "limit", body: childAt(slots, 0), lower: childAt(slots, 1), upper: slots.length > 2 ? childAt(slots, 2) : undefined, ...meta };
  if (["overbar", "underbar", "overbrace", "underbrace", "box", "arrow", "dirac", "long-division"].includes(record.selector)) return { type: record.selector, body: childAt(slots, 0), children: slots.slice(1), ...meta };
  return { type: "mtef-template", selector: record.selector, children: slots, ...meta };
}

function sequenceOf(records) {
  const children = [];
  for (const record of records) {
    let node = null;
    if (record.type === "char") node = charNode(record);
    else if (record.type === "template") node = templateNode(record);
    else if (record.type === "line") node = sequenceOf(record.children);
    else if (record.type === "pile") node = { type: "aligned", children: linesOf(record.children), mtefPile: { horizontalAlignment: record.horizontalAlignment, verticalAlignment: record.verticalAlignment } };
    else if (record.type === "matrix") {
      const cells = linesOf(record.children); const rows = [];
      for (let row = 0; row < record.rows; row += 1) rows.push(cells.slice(row * record.columns, (row + 1) * record.columns));
      node = { type: "matrix", rows, mtefMatrix: { rows: record.rows, columns: record.columns, rowPartitions: record.rowPartitions, columnPartitions: record.columnPartitions } };
    }
    if (!node || !nonEmpty(node)) continue;
    if (node.basePending) {
      const base = children.pop() ?? { type: "sequence", children: [] };
      delete node.basePending;
      if (node.type === "power" || node.type === "subscript") node.base = base;
      else if (node.type === "subsup") node.base = base;
    }
    children.push(node);
  }
  return children.length === 1 ? children[0] : { type: "sequence", children };
}

export function toMathAst(parsed) {
  return { schemaVersion: "mathup.equation3-math-ast.v1", type: "equation-expression", body: sequenceOf(parsed.records), sourceFormat: "MTEF_V3" };
}

function group(node) { return `{${toLatex(node)}}`; }
export function toLatex(node) {
  if (!node) return "";
  if (node.type === "equation-expression") return toLatex(node.body);
  if (["number", "identifier", "operator", "space"].includes(node.type)) return String(node.value ?? "");
  if (node.type === "sequence") return node.children.map(toLatex).join("");
  if (node.type === "fraction") return `\\frac${group(node.numerator)}${group(node.denominator)}`;
  if (node.type === "radical") return node.index ? `\\sqrt[${toLatex(node.index)}]${group(node.radicand)}` : `\\sqrt${group(node.radicand)}`;
  if (node.type === "power") return `${toLatex(node.base)}^${group(node.exponent)}`;
  if (node.type === "group") return `(${toLatex(node.body)})`;
  if (node.type === "subscript") return `${toLatex(node.base)}_${group(node.index)}`;
  if (node.type === "subsup") return `${toLatex(node.base)}_${group(node.index)}^${group(node.upper)}`;
  if (node.type === "absolute") return `\\left${node.double ? "\\|" : "|"}${toLatex(node.body)}\\right${node.double ? "\\|" : "|"}`;
  if (node.type === "delimited") {
    const pair = { parentheses: ["(", ")"], braces: ["\\{", "\\}"], brackets: ["[", "]"], angle: ["\\langle", "\\rangle"], floor: ["\\lfloor", "\\rfloor"], ceiling: ["\\lceil", "\\rceil"], interval: ["(", ")"] }[node.delimiter];
    const sides = node.delimiterSides ?? { left: true, right: true };
    return `${sides.left ? `\\left${pair[0]}` : "\\left."}${toLatex(node.body)}${sides.right ? `\\right${pair[1]}` : "\\right."}`;
  }
  if (node.type === "matrix") return `\\begin{matrix}${node.rows.map((row) => row.map(toLatex).join(" & ")).join(" \\\\ ")}\\end{matrix}`;
  if (node.type === "aligned") return `\\begin{aligned}${node.children.map(toLatex).join(" \\\\ ")}\\end{aligned}`;
  if (node.type === "vector") return `\\vec${group(node.body)}`;
  if (node.type === "integral") return `${"\\int".repeat(node.multiplicity ?? 1)}${node.lower ? `_{${toLatex(node.lower)}}` : ""}${node.upper ? `^{${toLatex(node.upper)}}` : ""}${toLatex(node.body)}`;
  if (["sum", "product", "coproduct", "union", "intersection", "sum-operator"].includes(node.type)) { const op = { sum: "sum", product: "prod", coproduct: "coprod", union: "bigcup", intersection: "bigcap", "sum-operator": "sum" }[node.type]; return `\\${op}${node.lower ? `_{${toLatex(node.lower)}}` : ""}${node.upper ? `^{${toLatex(node.upper)}}` : ""}${toLatex(node.body)}`; }
  if (node.type === "limit") return `\\underset{${toLatex(node.lower)}}{${toLatex(node.body)}}`;
  if (node.type === "overbar") return `\\overline${group(node.body)}`;
  if (node.type === "underbar") return `\\underline${group(node.body)}`;
  if (node.type === "box") return `\\boxed${group(node.body)}`;
  if (node.body) return toLatex(node.body);
  if (node.children) return node.children.map(toLatex).join("");
  throw new Error(`Unsupported AST node ${node.type}`);
}

function xml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function mathMlBody(node) {
  if (!node) return "<mrow></mrow>";
  if (node.type === "equation-expression") return mathMlBody(node.body);
  if (node.type === "number") return `<mn>${xml(node.value)}</mn>`;
  if (node.type === "identifier") return `<mi>${xml(node.value)}</mi>`;
  if (node.type === "operator") return `<mo${node.stretchy === false ? ' stretchy="false"' : ''}>${xml(node.value)}</mo>`;
  if (node.type === "space") return '<mspace width="0.35em"></mspace>';
  if (node.type === "sequence") return `<mrow>${node.children.map(mathMlBody).join("")}</mrow>`;
  if (node.type === "fraction") return `<mfrac>${mathMlBody(node.numerator)}${mathMlBody(node.denominator)}</mfrac>`;
  if (node.type === "radical") return node.index
    ? `<mroot>${mathMlBody(node.radicand)}${mathMlBody(node.index)}</mroot>`
    : `<msqrt>${mathMlBody(node.radicand)}</msqrt>`;
  if (node.type === "power") return `<msup>${mathMlBody(node.base)}${mathMlBody(node.exponent)}</msup>`;
  if (node.type === "group") return `<mrow><mo stretchy="false">(</mo>${mathMlBody(node.body)}<mo stretchy="false">)</mo></mrow>`;
  if (node.type === "subscript") return `<msub>${mathMlBody(node.base)}${mathMlBody(node.index)}</msub>`;
  if (node.type === "subsup") return `<msubsup>${mathMlBody(node.base)}${mathMlBody(node.index)}${mathMlBody(node.upper)}</msubsup>`;
  if (node.type === "absolute") return `<mrow><mo stretchy="true">${node.double ? "‖" : "|"}</mo>${mathMlBody(node.body)}<mo stretchy="true">${node.double ? "‖" : "|"}</mo></mrow>`;
  if (node.type === "delimited") {
    const pair = {
      parentheses: ["(", ")"], braces: ["{", "}"], brackets: ["[", "]"],
      angle: ["⟨", "⟩"], floor: ["⌊", "⌋"], ceiling: ["⌈", "⌉"], interval: ["(", ")"]
    }[node.delimiter] ?? ["(", ")"];
    const sides = node.delimiterSides ?? { left: true, right: true };
    return `<mrow>${sides.left ? `<mo stretchy="true">${xml(pair[0])}</mo>` : ''}${mathMlBody(node.body)}${sides.right ? `<mo stretchy="true">${xml(pair[1])}</mo>` : ''}</mrow>`;
  }
  if (node.type === "matrix") {
    return `<mtable>${node.rows.map((row) => `<mtr>${row.map((cell) => `<mtd>${mathMlBody(cell)}</mtd>`).join("")}</mtr>`).join("")}</mtable>`;
  }
  if (node.type === "aligned") return `<mtable>${node.children.map((line) => `<mtr><mtd>${mathMlBody(line)}</mtd></mtr>`).join("")}</mtable>`;
  if (node.type === "vector") return `<mover accent="true">${mathMlBody(node.body)}<mo>→</mo></mover>`;
  if (node.type === "integral") {
    const operator = `<mo>${"∫".repeat(node.multiplicity ?? 1)}</mo>`;
    const decorated = node.lower && node.upper ? `<munderover>${operator}${mathMlBody(node.lower)}${mathMlBody(node.upper)}</munderover>`
      : node.lower ? `<munder>${operator}${mathMlBody(node.lower)}</munder>`
        : node.upper ? `<mover>${operator}${mathMlBody(node.upper)}</mover>` : operator;
    return `<mrow>${decorated}${mathMlBody(node.body)}</mrow>`;
  }
  if (["sum", "product", "coproduct", "union", "intersection", "sum-operator"].includes(node.type)) {
    const glyph = { sum: "∑", product: "∏", coproduct: "∐", union: "⋃", intersection: "⋂", "sum-operator": "∑" }[node.type];
    const operator = `<mo>${glyph}</mo>`;
    const decorated = node.lower && node.upper ? `<munderover>${operator}${mathMlBody(node.lower)}${mathMlBody(node.upper)}</munderover>`
      : node.lower ? `<munder>${operator}${mathMlBody(node.lower)}</munder>`
        : node.upper ? `<mover>${operator}${mathMlBody(node.upper)}</mover>` : operator;
    return `<mrow>${decorated}${mathMlBody(node.body)}</mrow>`;
  }
  if (node.type === "limit") return `<mrow><munder>${mathMlBody(node.body)}${mathMlBody(node.lower)}</munder>${node.upper ? mathMlBody(node.upper) : ""}</mrow>`;
  if (node.type === "overbar") return `<mover accent="true">${mathMlBody(node.body)}<mo>¯</mo></mover>`;
  if (node.type === "underbar") return `<munder accentunder="true">${mathMlBody(node.body)}<mo>_</mo></munder>`;
  if (node.type === "box") return `<menclose notation="box">${mathMlBody(node.body)}</menclose>`;
  if (node.body) return mathMlBody(node.body);
  if (node.children) return `<mrow>${node.children.map(mathMlBody).join("")}</mrow>`;
  throw new Error(`Unsupported AST node ${node.type}`);
}

export function toMathMl(node) {
  return `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">${mathMlBody(node)}</math>`;
}

export function inventoryConstructions(node, counts = new Map()) {
  if (!node || typeof node !== "object") return counts;
  if (node.type) counts.set(node.type, (counts.get(node.type) ?? 0) + 1);
  for (const [key, value] of Object.entries(node)) {
    if (["mtefTemplate", "mtefPile", "mtefMatrix"].includes(key)) continue;
    if (Array.isArray(value)) value.flat(2).forEach((item) => inventoryConstructions(item, counts));
    else if (value && typeof value === "object") inventoryConstructions(value, counts);
  }
  return counts;
}
