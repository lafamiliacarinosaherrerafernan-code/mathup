import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const git = 'C:\\Users\\aherr\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\native\\git\\cmd\\git.exe';
const options = { cwd: process.cwd(), encoding: 'utf8' };
writeFileSync('artifacts/andalucia-human-blockers/git-status.txt', execFileSync(git, ['status', '--short'], options));
writeFileSync('artifacts/andalucia-human-blockers/git-diff-stat.txt', execFileSync(git, ['diff', '--stat'], options));
