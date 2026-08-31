import fs from "node:fs";
import path from "node:path";
import { stableStringify } from "../catalog/v2/canonical-entities.mjs";
import { materializeSessionExercise } from "../catalog/v2/materialize-session-exercise.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const RUN = path.join(ROOT, "artifacts/fase2b/runs/run-a");
const jsonl = (name) => fs.readFileSync(path.join(RUN, name), "utf8").trim().split(/\r?\n/u).filter(Boolean).map(JSON.parse);
const templates = jsonl("delivery-templates.jsonl");
const answers = jsonl("answer-records.jsonl");
const distractors = jsonl("distractor-sets.jsonl");
const exercises = jsonl("exercise-v2.jsonl");
const template = templates.find((row) => row.interactionKind === "multiple-choice");
if (!template) throw new Error("No existe una plantilla multiple-choice preservada para auditar el barajado.");
const answer = answers.find((row) => row.answerId === template.answerRef);
const set = distractors.find((row) => row.distractorSetId === template.distractorSetRef);
const exercise = exercises.find((row) => row.identity.exerciseId === template.exerciseId);
const counts = { A: 0, B: 0, C: 0, D: 0 };
const samples = [];
for (let index = 0; index < 400; index += 1) {
  const session = materializeSessionExercise(template, answer, set, { attemptId: `distribution-${index}`, exerciseRevisionId: exercise.identity.revisionId });
  counts[session.correctPosition] += 1;
  if (index < 8) samples.push({ attemptId: session.attemptId, correctPosition: session.correctPosition, seedHash: session.seedHash });
}
const result = {
  schemaVersion: "mathup.fase2b-shuffle-audit.v1", algorithmVersion: "mathup.shuffle.sha256-sort.v1", sampleSize: 400,
  distribution: counts, tolerance: { minimum: 60, maximum: 140 }, allPositionsReached: Object.values(counts).every((value) => value > 0),
  withinTolerance: Object.values(counts).every((value) => value > 60 && value < 140), samples
};
fs.writeFileSync(path.join(ROOT, "artifacts/fase2b/shuffle-distribution.json"), `${stableStringify(result, 2)}\n`);
console.log(stableStringify(result, 2));
if (!result.allPositionsReached || !result.withinTolerance) process.exitCode = 1;
