import {
  materializeChoices,
  stableHash,
  validateSolutionRecord,
  visibleTextIssues,
} from "./solution-quality.mjs";
import { verifyAllPracticalCases } from "./practical-verifiers.mjs";

const POLICY_BY_COURSE = Object.freeze({
  "2ESO": "eso",
  "3ESO": "eso",
  "4ESO_B": "eso",
  "1BACH_MATH": "matematicas_i",
  "2BACH_MATH": "matematicas_ii",
  "2BACH_CCSS": "ccss_ii",
});

function policyFlags(item) {
  const flags = {};
  if (["eso-gauss-3", "mi-system"].includes(item.id)) {
    flags.methods = ["GAUSS"];
    flags.systemSize = 3;
  }
  if (item.id === "mi-monotonicity") {
    flags.requiresSignAnalysis = true;
    flags.signAnalysis = true;
  }
  if (item.id === "mii-lhopital") {
    flags.methods = ["LHOPITAL"];
    flags.indeterminateForm = "0_OVER_0";
  }
  if (item.id === "mii-rouche") {
    flags.methods = ["ROUCHE_FROBENIUS"];
    flags.isParametricSystem = true;
  }
  if (["mii-integral-parts", "mii-integral-parts-twice"].includes(item.id)) {
    flags.integrationTechnique = "BY_PARTS";
  }
  if (["geo-cross", "geo-combined"].includes(item.id)) {
    flags.vectorGeometry = true;
    flags.vectorDerivationExplicit = true;
  }
  return flags;
}

export function buildPracticalSolutionRecord(item, verification) {
  return {
    exerciseId: item.id,
    coursePolicy: POLICY_BY_COURSE[item.course],
    statement: item.statement,
    answer: item.answer,
    steps: item.solution.steps.map((entry) => ({
      explanation: entry.explanation,
      math: entry.expression || entry.explanation,
    })),
    finalAnswer: item.solution.finalResult,
    verification: `${verification.classification}: ${verification.evidence}`,
    ...policyFlags(item),
  };
}

export function runPracticalValidation(cases) {
  const independent = verifyAllPracticalCases(cases);
  const byId = new Map(independent.map((entry) => [entry.id, entry]));
  const records = cases.map((item) => buildPracticalSolutionRecord(item, byId.get(item.id)));
  const contract = records.map((record) => ({ exerciseId: record.exerciseId, ...validateSolutionRecord(record) }));
  const visibleIssues = cases.flatMap((item) => visibleTextIssues(item, `$.cases.${item.id}`));

  const choiceDistribution = [0, 0, 0, 0];
  for (let index = 0; index < 1000; index += 1) {
    const result = materializeChoices({
      correctAnswer: "11/12",
      distractors: ["1/12", "7/12", "13/12"],
      attemptSeed: `practical-${index}`,
      exerciseId: "eso-fractions",
    });
    choiceDistribution[result.correctIndex] += 1;
  }

  const requiredIds = new Set([
    "eso-integers", "eso-fractions", "eso-equation-fractions", "eso-gauss-3", "eso-rationalize", "eso-ruffini",
    "mi-trig", "mi-limit-00", "mi-limit-infinity", "mi-continuity", "mi-monotonicity", "mi-concavity", "mi-system",
    "mii-axb", "mii-det-properties", "mii-det-4", "mii-rank-param", "mii-rouche", "mii-cramer",
    "mii-lhopital", "mii-cont-diff", "mii-growth", "mii-concavity", "mii-integral-immediate",
    "mii-integral-substitution", "mii-integral-parts", "mii-integral-parts-twice", "mii-area-between", "mii-area-axis",
    "geo-lines", "geo-line-plane", "geo-planes", "geo-cross", "geo-distance", "geo-combined",
    "prob-bayes", "prob-binomial", "prob-normal", "prob-normal-approx", "prob-inverse-normal",
    "prob-linear-programming", "prob-inference",
  ]);
  const presentIds = new Set(cases.map((item) => item.id));
  const coverageMissing = [...requiredIds].filter((id) => !presentIds.has(id));

  const summary = {
    schema: "mathup.solution-skill-practical-validation.v1",
    caseCount: cases.length,
    independentPassed: independent.filter((entry) => entry.passed).length,
    contractPassed: contract.filter((entry) => entry.valid).length,
    visibleIssueCount: visibleIssues.length,
    coverageMissing,
    choiceDistribution: { A: choiceDistribution[0], B: choiceDistribution[1], C: choiceDistribution[2], D: choiceDistribution[3] },
    semanticHash: stableHash({ cases, independent, contract, visibleIssues, coverageMissing, choiceDistribution }),
  };
  return { summary, independent, contract, records, visibleIssues };
}

