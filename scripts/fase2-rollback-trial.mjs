import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactRoot = path.join(root, "artifacts", "fase2");
const sandbox = path.join(artifactRoot, "rollback-trial-sandbox");
const output = path.join(artifactRoot, "rollback-trial-result.json");
const protectedTargets = [
  "index.html", "app.js", "math-renderer.js", "math-answer-validator.js", "supabase-client.js",
  "data", "supabase", ".agents/skills"
];

const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");

function filesUnder(target) {
  if (!fs.existsSync(target)) return [];
  if (fs.statSync(target).isFile()) return [target];
  return fs.readdirSync(target, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => filesUnder(path.join(target, entry.name)));
}

function protectedSnapshot() {
  return protectedTargets.flatMap((relativeTarget) => filesUnder(path.join(root, relativeTarget)).map((file) => ({
    file: path.relative(root, file).replaceAll("\\", "/"),
    sha256: sha256(fs.readFileSync(file))
  })));
}

function assertSafeSandbox() {
  const resolvedRoot = `${path.resolve(artifactRoot)}${path.sep}`;
  const resolvedSandbox = path.resolve(sandbox);
  if (!resolvedSandbox.startsWith(resolvedRoot) || path.basename(resolvedSandbox) !== "rollback-trial-sandbox") {
    throw new Error(`Destino de ensayo inseguro: ${resolvedSandbox}`);
  }
}

export function runRollbackTrial() {
  assertSafeSandbox();
  if (fs.existsSync(sandbox)) throw new Error(`El sandbox de rollback ya existe: ${sandbox}`);
  const before = protectedSnapshot();
  fs.mkdirSync(path.join(sandbox, "nested"), { recursive: true });
  fs.writeFileSync(path.join(sandbox, "nested", "generated-artifact.json"), "{\"trial\":true}\n", "utf8");
  fs.writeFileSync(path.join(sandbox, "rollback-manifest.json"), `${JSON.stringify({ safeRemovalRoot: "artifacts/fase2/rollback-trial-sandbox", productionFilesModified: [] }, null, 2)}\n`, "utf8");
  const created = filesUnder(sandbox).map((file) => path.relative(root, file).replaceAll("\\", "/"));
  fs.rmSync(sandbox, { recursive: true, force: false });
  const after = protectedSnapshot();
  const result = {
    trialVersion: "mathup.fase2.rollback-trial.v1",
    safeTargetVerified: true,
    trialArtifactsCreated: created,
    trialRootRemoved: !fs.existsSync(sandbox),
    protectedFilesChecked: before.length,
    protectedFilesUnchanged: JSON.stringify(before) === JSON.stringify(after),
    externalWrites: [],
    supabaseWrites: false,
    passed: !fs.existsSync(sandbox) && JSON.stringify(before) === JSON.stringify(after)
  };
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  if (!result.passed) throw new Error("El ensayo de rollback no preservó íntegramente los destinos protegidos.");
  return result;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(runRollbackTrial(), null, 2));
}
