import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const artifactRoot = path.join(root, 'artifacts', 'pau-andalucia-mass-processing');

function readJson(...segments) {
  return JSON.parse(fs.readFileSync(path.join(artifactRoot, ...segments), 'utf8'));
}

const main = readJson('summary.json');
const runA = readJson('repro-a', 'summary.json');
const runB = readJson('repro-b', 'summary.json');
const reversed = readJson('order-reversed', 'summary.json');
const hashes = [main, runA, runB, reversed].map((item) => item.semanticHash);

const checks = {
  canonicalCount: main.totals.canonical === 1666,
  processedCount: main.totals.processed === 1666,
  mathematicsIICount: main.totals.mathematicsII === 826,
  ccssIICount: main.totals.ccssII === 840,
  enabledCount: main.totals.enabled === 28,
  completeAccounting: main.totals.enabled + main.totals.resolutionPending + main.totals.sourceReviewRequired === 1666,
  missingHistoricalContentIsPendingWork: main.totals.resolutionPending === 1638 && main.blockerCounts.INDEPENDENT_MATHEMATICAL_VERIFICATION_NOT_COMPLETED === undefined,
  coverage2010To2026: main.totals.years2010To2026 === 1666,
  noUnverifiedHistoricalCoverage: main.totals.years2000To2009 === 0,
  reproducible: new Set(hashes.slice(0, 3)).size === 1,
  orderInvariant: new Set(hashes).size === 1,
  productionDisconnected: main.productionConnected === false,
  noUnverifiedContentGenerated: main.contentGeneratedForUnverifiedRecords === false
};

const failures = Object.entries(checks).filter(([, value]) => !value).map(([name]) => name);
const result = {
  schemaVersion: 'mathup.pau-andalucia-mass-processing-verification.v1',
  checks,
  failures,
  passed: failures.length === 0,
  semanticHashes: {
    main: hashes[0],
    runA: hashes[1],
    runB: hashes[2],
    orderReversed: hashes[3]
  },
  totals: main.totals
};

fs.writeFileSync(path.join(artifactRoot, 'verification-results.json'), `${JSON.stringify(result, null, 2)}\n`);
if (failures.length) {
  console.error(`Fallos: ${failures.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log(`Verificación correcta: ${Object.keys(checks).length}/${Object.keys(checks).length}`);
}
