import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PRACTICAL_VALIDATION_CASES, PRACTICAL_GROUP_COUNTS } from "../catalog/solution-quality/practical-validation-cases.mjs";
import { runPracticalValidation } from "../catalog/solution-quality/practical-validation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "artifacts", "solution-skill-practical-validation");
fs.mkdirSync(outDir, { recursive: true });

const result = runPracticalValidation(PRACTICAL_VALIDATION_CASES);
const report = { ...result.summary, groupCounts: PRACTICAL_GROUP_COUNTS, generatedBy: "scripts/validate-solution-skill-practical.mjs" };
fs.writeFileSync(path.join(outDir, "results.json"), `${JSON.stringify({ report, independent: result.independent, contract: result.contract, visibleIssues: result.visibleIssues }, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, "render-cases.json"), `${JSON.stringify(PRACTICAL_VALIDATION_CASES, null, 2)}\n`);

if (report.independentPassed !== report.caseCount || report.contractPassed !== report.caseCount || report.visibleIssueCount || report.coverageMissing.length) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(report, null, 2));

