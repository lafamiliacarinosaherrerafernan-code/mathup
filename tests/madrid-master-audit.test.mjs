import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const loadWindow = (relative, property) => {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });
  return context.window[property];
};
const bank = loadWindow('data/madrid-pau-bank.js', 'MADRID_PAU_BANK');
const authored = loadWindow('data/madrid-pau-authored.js', 'MADRID_PAU_AUTHORED');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const reconciliation = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/madrid-master-audit/source-reconciliation-summary.json'), 'utf8'));
const quantitative = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/madrid-master-audit/master-report.json'), 'utf8'));
const multipart = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/madrid-master-audit/multipart-e2e.json'), 'utf8'));
const responsive = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/madrid-master-audit/responsive-audit.json'), 'utf8'));

test('Madrid conserva el censo oficial habilitado y todos sus apartados', () => {
  const matesEnabled = bank['2bach-mates'].filter((row) => !authored.exclusions?.['2bach-mates']?.[row.id]);
  const ccssEnabled = bank['2bach-ccss'].filter((row) => !authored.exclusions?.['2bach-ccss']?.[row.id]);
  assert.equal(matesEnabled.length, 825);
  assert.equal(ccssEnabled.length, 903);
  assert.equal(reconciliation.courses['2bach-mates'].canonicalSubparts, 1925);
  assert.equal(reconciliation.courses['2bach-ccss'].canonicalSubparts, 1853);
  assert.equal(reconciliation.gates.sourceMismatches, 0);
});

test('los retos temáticos de Madrid no se contaminan con el banco auxiliar', () => {
  assert.match(app, /currentBachPauCommunity\(\) === "clm"/);
  assert.match(app, /\^madrid-\(\?:mates\|ccss\)-\\d\+\\\.\\d\+\\\.\\d\+\$/);
  assert.equal(quantitative.scopeReports.every((row) => row.enabledButUnreachable === 0), true);
  assert.equal(quantitative.scopeReports.every((row) => row.emptyTopics.length === 0), true);
});

test('el navegador real recorre todos los multipartados de Madrid sin fallos', () => {
  const mates = multipart.byCourse['2bach-mates'];
  const ccss = multipart.byCourse['2bach-ccss'];
  assert.deepEqual([mates.TOTAL_MULTIPART_EXERCISES, mates.TOTAL_NAVIGATED_SUBPARTS, mates.FAIL_EXERCISES], [706, 1806, 0]);
  assert.deepEqual([ccss.TOTAL_MULTIPART_EXERCISES, ccss.TOTAL_NAVIGATED_SUBPARTS, ccss.FAIL_EXERCISES], [787, 1737, 0]);
});

test('los casos difíciles pasan en los cuatro anchos responsive', () => {
  assert.equal(responsive.selectedCases, 19);
  assert.equal(responsive.checks, 76);
  assert.equal(responsive.pass, true);
  assert.deepEqual(responsive.failures, []);
  assert.equal(responsive.cases.every((row) => row.pass && row.widthsChecked.length === 4), true);
});
