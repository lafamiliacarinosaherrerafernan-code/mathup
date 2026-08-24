import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import { SEMANTIC_ARTIFACTS } from "./fase2-import-catalog.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");

function parseArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    if (!argv[index].startsWith("--")) continue;
    values[argv[index].slice(2)] = argv[index + 1] && !argv[index + 1].startsWith("--") ? argv[++index] : true;
  }
  return values;
}

export function verifyReproducibility({ left, right, output, excludedArtifacts = [] }) {
  const excluded = new Set(excludedArtifacts);
  const artifactNames = SEMANTIC_ARTIFACTS.filter((name) => !excluded.has(name));
  const comparisons = artifactNames.map((name) => {
    const leftFile = path.resolve(left, name);
    const rightFile = path.resolve(right, name);
    const leftExists = fs.existsSync(leftFile);
    const rightExists = fs.existsSync(rightFile);
    const leftSha256 = leftExists ? sha256(leftFile) : null;
    const rightSha256 = rightExists ? sha256(rightFile) : null;
    return { artifact: name, leftExists, rightExists, leftSha256, rightSha256, equal: leftExists && rightExists && leftSha256 === rightSha256 };
  });
  const result = {
    verificationVersion: "mathup.fase2.reproducibility.v1",
    left: path.relative(root, left).replaceAll("\\", "/"),
    right: path.relative(root, right).replaceAll("\\", "/"),
    comparedArtifacts: comparisons.length,
    equalArtifacts: comparisons.filter((item) => item.equal).length,
    excludedArtifacts: [...excluded].sort(),
    reproducible: comparisons.every((item) => item.equal),
    comparisons
  };
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  if (!result.reproducible) throw new Error(`La doble ejecución no es reproducible: ${comparisons.filter((item) => !item.equal).map((item) => item.artifact).join(", ")}`);
  return result;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2));
  const left = path.resolve(root, args.left || "artifacts/fase2/runs/run-a");
  const right = path.resolve(root, args.right || "artifacts/fase2/runs/run-b");
  const output = path.resolve(root, args.output || "artifacts/fase2/reproducibility-result.json");
  const excludedArtifacts = String(args.exclude || "").split(",").map((item) => item.trim()).filter(Boolean);
  console.log(JSON.stringify(verifyReproducibility({ left, right, output, excludedArtifacts }), null, 2));
}
