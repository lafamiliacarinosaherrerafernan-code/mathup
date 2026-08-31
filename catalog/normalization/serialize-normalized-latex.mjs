import { CONTRACTS, NORMALIZATION_RULE_VERSION, serializeLatex, serializeMathML, sha256, validateDerivedMathML, validateMathNode } from "./canonical-math-ast.mjs";

export function representationsForDocument(document) {
  const results = [];
  for (const block of document.blocks) {
    if (!block.math) continue;
    const errors = validateMathNode(block.math);
    if (errors.length) continue;
    const sourceTreeHash = sha256(block.math);
    const latex = serializeLatex(block.math);
    results.push({
      schemaVersion: CONTRACTS.representation,
      representationId: `mrep-${sha256({ documentId: document.documentId, blockId: block.blockId, format: "latex", sourceTreeHash })}`,
      documentId: document.documentId,
      blockId: block.blockId,
      format: "latex",
      value: latex,
      sourceTreeHash,
      generator: { name: "serialize-normalized-latex", version: NORMALIZATION_RULE_VERSION },
      validated: serializeLatex(block.math) === latex,
      derivedOnly: true
    });
    try {
      const mathml = serializeMathML(block.math);
      if (validateDerivedMathML(mathml)) {
        results.push({
          schemaVersion: CONTRACTS.representation,
          representationId: `mrep-${sha256({ documentId: document.documentId, blockId: block.blockId, format: "mathml", sourceTreeHash })}`,
          documentId: document.documentId,
          blockId: block.blockId,
          format: "mathml",
          value: mathml,
          sourceTreeHash,
          generator: { name: "serialize-derived-mathml", version: NORMALIZATION_RULE_VERSION },
          validated: true,
          derivedOnly: true
        });
      }
    } catch {
      // Unsupported or literal-only nodes deliberately produce no MathML.
    }
  }
  return results;
}
