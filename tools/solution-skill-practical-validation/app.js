const renderer = window.MargaritaMathRenderer;
if (!renderer) throw new Error("MargaritaMathRenderer no está disponible");

const selectedIds = [
  "eso-fractions", "eso-gauss-3", "eso-rationalize", "mi-trig", "mi-limit-00",
  "mii-axb", "mii-det-4", "mii-lhopital", "mii-integral-parts", "mii-area-between",
  "geo-cross", "prob-bayes", "prob-linear-programming",
];

const response = await fetch("../../artifacts/solution-skill-practical-validation/render-cases.json", { cache: "no-store" });
const allCases = await response.json();
const cases = selectedIds.map((id) => allCases.find((item) => item.id === id)).filter(Boolean);
const cards = document.querySelector("#cards");

function mathText(value) {
  const span = document.createElement("span");
  span.innerHTML = renderer.text(String(value));
  return span;
}

for (const item of cases) {
  const article = document.createElement("article");
  article.className = "student-card";
  article.dataset.caseId = item.id;
  const title = document.createElement("h2");
  title.textContent = `${item.course} · ${item.topic}`;
  const statement = document.createElement("p");
  statement.className = "statement";
  statement.append(mathText(item.statement));
  const answer = document.createElement("div");
  answer.className = "answer";
  answer.append("Respuesta: ", mathText(item.answer));
  const solutionTitle = document.createElement("h3");
  solutionTitle.textContent = "Resolución";
  const steps = document.createElement("div");
  steps.className = "steps";
  for (const entry of item.solution.steps) {
    const block = document.createElement("section");
    block.className = "step";
    const heading = document.createElement("h3");
    heading.textContent = entry.title;
    const explanation = document.createElement("p");
    explanation.textContent = entry.explanation;
    const expression = document.createElement("p");
    expression.append(mathText(entry.expression));
    block.append(heading, explanation, expression);
    steps.append(block);
  }
  article.append(title, statement, answer, solutionTitle, steps);
  if (item.id === "eso-fractions") {
    const choices = document.createElement("div");
    choices.className = "choices";
    for (const [index, value] of ["11/12", "1/12", "7/12", "13/12"].entries()) {
      const button = document.createElement("button");
      button.className = "choice";
      button.type = "button";
      button.append(`${"ABCD"[index]}. `, mathText(value));
      choices.append(button);
    }
    article.append(choices);
  }
  cards.append(article);
}

document.querySelector("#product").append("Producto: ", mathText("e^x · sen(2x)"));
document.querySelector("#quotient").append("Cociente: ", mathText("frac{e^x}{sen(2x)}"));

const renderedRoot = document.querySelector("main");
const bodyText = renderedRoot.innerText;
const html = renderedRoot.innerHTML;
const rawPatterns = [/\bundefined\b/i, /\\\(|\\\)/, /\\(?:frac|int|sqrt)\b/, /\\[A-Za-z]+/];
const issues = rawPatterns.flatMap((regex) => regex.test(bodyText) || regex.test(html) ? [String(regex)] : []);
const choiceText = [...document.querySelectorAll(".choice")].map((node) => node.innerText.trim());
window.__PRACTICAL_RENDER_AUDIT__ = {
  ready: true,
  cards: cases.length,
  issues,
  choiceText,
  fractions: document.querySelectorAll(".math-fraction").length,
  matrices: document.querySelectorAll(".math-matrix").length,
  determinants: document.querySelectorAll(".math-determinant").length,
  integrals: document.querySelectorAll(".math-integral, .math-integral-expression").length,
  superscripts: document.querySelectorAll("sup").length,
  productHasMiddleDot: document.querySelector("#product").innerText.includes("·"),
  quotientHasVerticalFraction: Boolean(document.querySelector("#quotient .math-fraction")),
};
