import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "docs", "FASE-0-INVENTARIO-CATALOGO-MATHUP.json");
const output = path.join(root, "artifacts", "fase2", "order-variant-inventory.json");

const inventory = JSON.parse(fs.readFileSync(source, "utf8"));
inventory.records = [...inventory.records].reverse();
inventory.scriptManifest = [...inventory.scriptManifest].reverse();
inventory.exactDuplicateGroups = [...inventory.exactDuplicateGroups].reverse();
inventory.possibleEquivalentGroups = [...inventory.possibleEquivalentGroups].reverse();
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(inventory)}\n`, "utf8");
console.log(JSON.stringify({ output: path.relative(root, output).replaceAll("\\", "/"), records: inventory.records.length, transformation: "reverse-array-order-only" }, null, 2));
