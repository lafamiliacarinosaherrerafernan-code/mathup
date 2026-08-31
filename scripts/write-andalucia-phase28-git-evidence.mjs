import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'artifacts', 'andalucia-source-app-visual-parity');
const git = 'C:\\Users\\aherr\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\native\\git\\cmd\\git.exe';
mkdirSync(out, { recursive: true });
const options = { cwd: root, encoding: 'utf8' };
writeFileSync(path.join(out, 'git-status-short.txt'), execFileSync(git, ['status', '--short'], options));
writeFileSync(path.join(out, 'git-diff-stat.txt'), execFileSync(git, ['diff', '--stat'], options));
