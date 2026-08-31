import { toLatex, toMathMl } from './mtef3-recovery.mjs';

const LITERAL_OPEN = new Set(['(', '[', '{']);
const LITERAL_CLOSE = new Map([[')', '('], [']', '['], ['}', '{']]);

function clone(value) {
  return structuredClone(value);
}

function matchingLiteralGroup(children, closingIndex) {
  const close = children[closingIndex];
  const expectedOpen = LITERAL_CLOSE.get(close?.value);
  if (!expectedOpen) return null;
  let depth = 0;
  for (let index = closingIndex; index >= 0; index -= 1) {
    const node = children[index];
    if (node?.type !== 'operator') continue;
    if (node.value === close.value) depth += 1;
    else if (node.value === expectedOpen) {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return null;
}

function correctSequence(node, rules) {
  const corrected = node.children.map((child) => correctNode(child, rules));
  for (let index = 0; index < corrected.length; index += 1) {
    const candidate = corrected[index];
    if (candidate?.type !== 'power' || candidate.base?.type !== 'operator' || !LITERAL_CLOSE.has(candidate.base.value)) continue;
    const virtualChildren = [...corrected.slice(0, index), candidate.base];
    const openingIndex = matchingLiteralGroup(virtualChildren, virtualChildren.length - 1);
    if (openingIndex === null) continue;
    const bodyChildren = corrected.slice(openingIndex + 1, index);
    const body = bodyChildren.length === 1 ? bodyChildren[0] : { type: 'sequence', children: bodyChildren };
    const group = {
      type: 'group',
      delimiter: 'parentheses',
      body,
      sourceEvidence: { kind: 'MTEF_LITERAL_DELIMITED_GROUP', open: '(', close: ')' },
    };
    corrected.splice(openingIndex, index - openingIndex + 1, { ...candidate, base: group });
    index = openingIndex;
    rules.add('SCRIPT_BASE_LITERAL_GROUP');
  }
  return { ...node, children: corrected };
}

function correctNode(node, rules) {
  if (!node || typeof node !== 'object') return node;
  if (node.type === 'sequence') return correctSequence(node, rules);
  const result = clone(node);
  for (const [key, value] of Object.entries(result)) {
    if (Array.isArray(value)) result[key] = value.map((item) => Array.isArray(item) ? item.map((nested) => correctNode(nested, rules)) : correctNode(item, rules));
    else if (value && typeof value === 'object' && !['mtefTemplate', 'mtefPile', 'mtefMatrix', 'sourceEvidence'].includes(key)) result[key] = correctNode(value, rules);
  }
  if (result.type === 'operator' && (LITERAL_OPEN.has(result.value) || LITERAL_CLOSE.has(result.value))) {
    result.stretchy = false;
    rules.add('ORDINARY_LITERAL_DELIMITER_NON_STRETCHY');
  }
  if (result.type === 'delimited' && result.mtefTemplate?.variation === 1) {
    result.delimiterSides = { left: true, right: false };
    rules.add('MTEF_UNILATERAL_LEFT_DELIMITER');
  } else if (result.type === 'delimited' && result.mtefTemplate?.variation === 2) {
    result.delimiterSides = { left: false, right: true };
    rules.add('MTEF_UNILATERAL_RIGHT_DELIMITER');
  }
  return result;
}

export function applyPostHumanCorrection(mathAst) {
  const rules = new Set();
  const correctedAst = correctNode(mathAst, rules);
  return {
    mathAst: correctedAst,
    latex: toLatex(correctedAst),
    mathml: toMathMl(correctedAst),
    rulesApplied: [...rules].sort(),
  };
}

export function semanticAst(ast) {
  if (Array.isArray(ast)) return ast.map(semanticAst);
  if (!ast || typeof ast !== 'object') return ast;
  return Object.fromEntries(Object.entries(ast)
    .filter(([key]) => !['stretchy', 'delimiterSides', 'sourceEvidence'].includes(key))
    .map(([key, value]) => [key, semanticAst(value)]));
}
