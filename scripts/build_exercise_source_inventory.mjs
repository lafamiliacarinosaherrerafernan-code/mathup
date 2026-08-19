import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const documentsRoot = path.join(projectRoot, "documentos");
const outputRoot = path.join(documentsRoot, "Inventario variedad retos");
const extractedRoot = path.join(outputRoot, "texto extraido");
const tempRoot = path.join(outputRoot, "_temporales-conversion");
const ocrRoot = path.join(outputRoot, "OCR");
const antiword = "C:\\Program Files\\Git\\clangarm64\\bin\\antiword.exe";
const pdftotext = "C:\\Program Files\\Git\\clangarm64\\bin\\pdftotext.exe";
const unzip = "C:\\Program Files\\Git\\usr\\bin\\unzip.exe";

function reviewedOcrSidecarFor(file) {
  const base = path.basename(file).toLowerCase();
  if (base === "ejercicios de derivadas2.pdf") return "1bach-mates-derivadas2.txt";
  if (base.includes("simulacro resuelto n") && base.includes("enteros.pdf")) return "1eso-enteros-simulacro.txt";
  if (base === "potencias_raices.pdf") return "1eso-potencias-raices.txt";
  if (base.includes("simulacro tema 6 inecuaciones resuelto.pdf")) return "4eso-b-inecuaciones-simulacro.txt";
  return null;
}

const courseDefinitions = [
  {
    id: "1eso",
    label: "1.º ESO",
    roots: ["1º ESO/Temas mios", "1º ESO/Ejercicios", "1º ESO/Fuentes de ejercicios", "1º ESO/Exámenes tipo"],
    themes: [
      "Números naturales", "Números enteros", "Potencias y raíces cuadradas", "Fracciones",
      "Expresiones algebraicas", "Proporcionalidad", "Medida, ángulos, rectas y circunferencias",
      "Semejanza, Pitágoras y áreas", "Cuerpos geométricos", "Funciones"
    ]
  },
  {
    id: "2eso",
    label: "2.º ESO",
    roots: ["2º ESO/Temas mios", "2º ESO/Exámenes tipo"],
    themes: [
      "Números enteros", "Potencias y raíces cuadradas", "Fracciones", "Proporcionalidad",
      "Expresiones algebraicas", "Sistemas de ecuaciones", "Figuras planas", "Cuerpos geométricos", "Funciones"
    ]
  },
  {
    id: "3eso",
    label: "3.º ESO",
    roots: ["3º ESO/Temas mios", "3º ESO/Fuentes de ejercicios", "3º ESO/Exámenes tipo"],
    themes: [
      "Números reales", "Potencias y raíces", "Expresiones algebraicas", "Ecuaciones y sistemas de ecuaciones",
      "Proporcionalidad", "Sucesiones", "Cuerpos geométricos", "Funciones", "Estadística", "Probabilidad"
    ]
  },
  {
    id: "4eso-a",
    label: "4.º ESO A",
    roots: ["4 ESO A/Temas mios", "4 ESO A/Exámenes tipo", "4º ESO/Fuentes compartidas"],
    themes: [
      "Números reales", "Radicales", "Proporcionalidad", "Expresiones algebraicas", "Ecuaciones e inecuaciones",
      "Sistemas de ecuaciones e inecuaciones", "Semejanza y trigonometría", "Áreas y cuerpos geométricos", "Funciones"
    ]
  },
  {
    id: "4eso-b",
    label: "4.º ESO B",
    roots: ["4º ESO B/Temas mios", "4º ESO B/Exámenes tipo", "4º ESO/Fuentes compartidas"],
    themes: [
      "Números reales", "Radicales y logaritmos", "Expresiones algebraicas", "Ecuaciones y sistemas de ecuaciones",
      "Inecuaciones y sistemas de inecuaciones", "Proporcionalidad", "Semejanza", "Trigonometría",
      "Geometría analítica", "Funciones", "Límite de funciones", "Derivadas", "Límite de sucesiones", "Combinatoria"
    ]
  },
  {
    id: "1bach-mates",
    label: "1.º Bachillerato Matemáticas I",
    roots: ["1ª BACHILLERATO MATES I", "1º Bachillerato Mates I/Fuentes de ejercicios"],
    themes: [
      "Números reales", "Números complejos", "Ecuaciones, sistemas e inecuaciones", "Trigonometría",
      "Geometría analítica", "Cónicas", "Funciones", "Límite de sucesiones y funciones", "Derivadas",
      "Aplicación de derivadas", "Probabilidad"
    ]
  },
  {
    id: "1bach-ccss",
    label: "1.º Bachillerato CCSS I",
    roots: ["1º BACHILLERATO CCSSI"],
    themes: [
      "Estadística unidimensional y bidimensional", "Probabilidad", "Distribución binomial", "Distribución normal",
      "Números reales", "Números complejos", "Ecuaciones y sistemas", "Inecuaciones y sistemas", "Funciones", "Combinatoria"
    ]
  }
];

function fold(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function safeName(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 100) || "fuente";
}

function walkFiles(root) {
  if (!fs.existsSync(root)) return [];
  const result = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) result.push(...walkFiles(full));
    else result.push(full);
  }
  return result;
}

function isExerciseSource(file, definition, rootRelative) {
  const ext = path.extname(file).toLowerCase();
  if (![".doc", ".docx", ".pdf"].includes(ext)) return false;
  const name = fold(path.basename(file));
  if (/teoria|infografia|libro|separado por tema/.test(name)) return false;
  if (/ejerc|problema/.test(name)) return true;
  const normalizedRoot = fold(rootRelative);
  if (normalizedRoot.includes("/ejercicios")
    || normalizedRoot.includes("fuentes de ejercicios")
    || normalizedRoot.includes("fuentes compartidas")
    || normalizedRoot.includes("examenes tipo")) return true;
  return false;
}

function themeIndexFor(file, definition) {
  const name = fold(file);
  const baseName = fold(path.basename(file));
  if (definition.id === "1eso") {
    if (/unidad 1(?:\\|\/)|unid 1\b/.test(name)) return 0;
    if (/divisibilidad|unidad 2(?:\\|\/)|unid 2\b/.test(name)) return 0;
    if (/entero|unidad 3(?:\\|\/)|unid 3\b/.test(name)) return 1;
    if (/fraccion|unidad 4(?:\\|\/)|unid 4\b/.test(name)) return 3;
    if (/decimal|unidad 5(?:\\|\/)|unid 5\b/.test(name)) return 0;
    if (/ecuacion|unidad 6(?:\\|\/)|unid 6\b/.test(name)) return 4;
    if (/proporcional|unidad 7(?:\\|\/)|unid 7\b/.test(name)) return 5;
    if (/rectas?.*angul|poligono|unidad 8 y 9/.test(name)) return 6;
    if (/circunferencia|areas?.*perimetro|unidad 10 y 11/.test(name)) return 7;
  }
  if (definition.id === "2eso") {
    if (/unidad 1 y 2/.test(name)) return 0;
    if (/unidad 3 y 4/.test(name)) return 2;
    if (/expresiones algebraicas|unidad 5/.test(name)) return 4;
    if (/ecuaciones|unidad 6/.test(name)) return 5;
    if (/sistemas|unidad 7/.test(name)) return 5;
    if (/funciones|unidad 8/.test(name)) return 8;
    if (/pitagoras|unidad 9/.test(name)) return 6;
    if (/semejanza|unidad 10/.test(name)) return 6;
    if (/cuerpos geometricos|unidad 11/.test(name)) return 7;
  }
  if (definition.id === "3eso") {
    if (/tema 1 y 2/.test(name)) return 0;
    if (/tema 3(?:\\|\/)|und 3\b/.test(name)) return 2;
    if (/ecuaciones|tema 4/.test(name)) return 3;
    if (/sistemas|tema 5/.test(name)) return 3;
    if (/sucesiones|tema 6/.test(name)) return 5;
    if (/relaciones geometricas|tema 7/.test(name)) return 6;
    if (/areas y volumenes|tema 8 y 9/.test(name)) return 6;
    if (/funciones y graficas|funciones elementales|tema 10|tema 11/.test(name)) return 7;
  }
  if (definition.id === "4eso-a") {
    if (/unidad 1-2/.test(name)) return 0;
    if (/unidad 3-4/.test(name)) return 3;
    if (/unidad 5-6/.test(name)) return 4;
    if (/unidad 7-8/.test(name)) return 6;
    if (/unidad 9-10/.test(name)) return 7;
  }
  if (definition.id === "4eso-b") {
    if (/unidad 1(?:\\|\/)|unid 1\b/.test(name)) return 0;
    if (/unidad 2(?:\\|\/)|unid 2\b/.test(name)) return 1;
    if (/polinomios|unidad 3/.test(name)) return 2;
    // Las expresiones «inecuaciones y sistemas de inecuaciones» y
    // «límite de funciones» contienen palabras de temas más generales.
    // Deben resolverse antes para que no acaben en sistemas o funciones.
    if (/inecuaciones|unidad 6/.test(name)) return 4;
    if (/limite de funciones/.test(name)) return 10;
    if (/ecuaciones|unidad 4/.test(name)) return 3;
    if (/sistemas|unidad 5/.test(name)) return 3;
    if (/trigonometria|unidad 7 y 8/.test(name)) return 7;
    if (/geometria analitica|unidad 9/.test(name)) return 8;
    if (/funciones|unidad 10/.test(name)) return 9;
  }
  if (definition.id === "3eso" && /^3[._-]?(?:5|6)[._-]?3.*problemas/.test(name)) return 3;
  if (definition.id === "4eso-a" && /proporcional/.test(name)) return 2;
  if (definition.id === "4eso-b" && /proporcional/.test(name)) return 5;
  if (definition.id === "1bach-mates" && /probabilidad/.test(name)) return 10;
  if (definition.id === "1bach-mates" && /limite|llimite|llïmite/.test(name)) return 7;
  if (definition.id === "1bach-mates" && /aplicacion/.test(name)) return 9;
  if (definition.id === "1bach-mates" && /derivada/.test(name)) return 8;
  if (definition.id === "4eso-b" && /combinatoria|formas?.*contar|numeros?.*contar/.test(name)) return 13;
  if (definition.id === "1eso") {
    if (/natural/.test(name)) return 0;
    if (/entero/.test(name)) return 1;
    if (/potencia|raiz|raices/.test(name)) return 2;
    if (/fraccion/.test(name)) return 3;
    if (/algebra/.test(name)) return 4;
    if (/proporcional/.test(name)) return 5;
    if (/medida|angulo|recta/.test(name)) return 6;
    if (/perimetro|area|pitagora|semejanza/.test(name)) return 7;
    if (/cuerpo|geometric/.test(name)) return 8;
    if (/funcion/.test(name)) return 9;
  }
  // Los documentos de los temas se nombran habitualmente como
  // «1-Nº Reales Ejercicios.doc», «9-Funciones Ejercicios.doc», etc.
  // El prefijo debe buscarse en el nombre del archivo, no en la ruta
  // absoluta (que siempre empieza por la letra de la unidad de Windows).
  const match = baseName.match(/^\s*(\d{1,2})\s*[-_.]/);
  if (match) {
    const index = Number(match[1]) - 1;
    if (index >= 0 && index < definition.themes.length) return index;
  }
  return -1;
}

function subtopicFor(file, definition, theme) {
  if (definition.id !== "1eso" || theme !== "Semejanza, Pitágoras y áreas") return null;
  const name = fold(`${path.basename(path.dirname(file))} ${path.basename(file, path.extname(file))}`);
  if (/problemas?.*aplicacion.*pitagora/.test(name)) return "Problemas de aplicación de Pitágoras";
  if (/pitagora/.test(name)) return "Teorema de Pitágoras";
  if (/perimetro|area/.test(name)) return "Áreas y perímetros";
  if (/semejanza|tales/.test(name)) return "Tales y semejanza";
  return "Mixto";
}

function decodeXml(xml) {
  const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
  return xml
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&(amp|lt|gt|quot|apos);/g, (_, n) => entities[n]);
}

function extractDocx(file) {
  const xml = execFileSync(unzip, ["-p", file, "word/document.xml"], { maxBuffer: 100 * 1024 * 1024 }).toString("utf8");
  const text = decodeXml(xml
    .replace(/<w:tab\b[^>]*\/>/g, "\t")
    .replace(/<w:br\b[^>]*\/>/g, "\n")
    .replace(/<\/w:p>/g, "\n")
    .replace(/<\/w:tr>/g, "\n")
    .replace(/<\/w:tc>/g, "\t")
    .replace(/<[^>]+>/g, ""));
  const visualCount = (xml.match(/<a:blip\b/g) || []).length + (xml.match(/<o:OLEObject\b/g) || []).length;
  return { text, visualCount, pageCount: null };
}

function extractDoc(file) {
  const buffer = execFileSync(antiword, [file], { maxBuffer: 100 * 1024 * 1024 });
  const directText = new TextDecoder("windows-1252").decode(buffer);
  const visualCount = (directText.match(/\[pic\]/gi) || []).length;
  let text = directText;
  let pageCount = null;
  try {
    fs.mkdirSync(tempRoot, { recursive: true });
    const tempPdf = path.join(tempRoot, `${crypto.createHash("sha1").update(file).digest("hex")}.pdf`);
    const renderedPdf = execFileSync(antiword, ["-a", "a4", file], { maxBuffer: 200 * 1024 * 1024 });
    fs.writeFileSync(tempPdf, renderedPdf);
    const renderedText = execFileSync(pdftotext, ["-layout", "-enc", "UTF-8", tempPdf, "-"], { maxBuffer: 200 * 1024 * 1024 }).toString("utf8");
    if (cleanText(renderedText).length >= cleanText(directText).length * 0.55) text = renderedText;
    pageCount = Math.max(1, renderedText.split("\f").length - 1);
    fs.rmSync(tempPdf, { force: true });
  } catch {
    text = directText;
  }
  return { text, visualCount, pageCount };
}

function extractPdf(file) {
  const buffer = execFileSync(pdftotext, ["-layout", "-enc", "UTF-8", file, "-"], { maxBuffer: 200 * 1024 * 1024 });
  const text = buffer.toString("utf8");
  return { text, visualCount: 0, pageCount: Math.max(1, text.split("\f").length - 1) };
}

function extractSource(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".doc") return extractDoc(file);
  if (ext === ".docx") return extractDocx(file);
  if (ext === ".pdf") return extractPdf(file);
  throw new Error(`Formato no soportado: ${ext}`);
}

function cleanText(value) {
  return String(value || "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u00a0\t]+/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .replace(/\n[ ]+/g, "\n")
    .replace(/[ ]+\n/g, "\n")
    .replace(/^\s*[|_\- ]{24,}\s*$/gm, "")
    .replace(/^\s*(?:\|\s*){12,}\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function candidateStart(line) {
  return /^(?:ejercicio|problema|actividad)\s*\d+/i.test(line)
    || /^\d{1,3}\s*(?:[.)ºª:-]|[a-z]\))\s*/i.test(line)
    || /^(?:calcula|resuelve|halla|determina|simplifica|representa|estudia|demuestra|factoriza|opera|efectua|efectúa|expresa|razona|indica|completa|ordena|reduce)\b/i.test(line);
}

function isNoiseBlock(value) {
  const plain = fold(value).replace(/[^a-z0-9]+/g, " ").trim();
  if (!plain || plain.length < 5) return true;
  if (/^(soluciones?|respuestas?|tema|unidad|actividades?|ejercicios?)\s*\d*$/.test(plain)) return true;
  if (/^(?:combinatoria|trigonometria|probabilidad|funciones?|derivadas?|inecuaciones?|numeros? (?:reales|enteros|naturales))$/.test(plain)) return true;
  if (/^(?:i e s|ies|colegio|instituto)\b/.test(plain) && /\b(?:unidad|curso|eso|bachillerato)\b/.test(plain)) return true;
  if (/^(?:nombre y apellidos|alumno|fecha|calificacion|instrucciones)\b/.test(plain)) return true;
  if (/^\d+\s+los ejercicios (?:deben|son)\b/.test(plain)) return true;
  if (/^(pagina|páginas?)\s*\d+$/.test(plain)) return true;
  if ((fold(value).match(/solucion/g) || []).length >= 2) return true;
  const letters = String(value).match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g) || [];
  const upper = String(value).match(/[A-ZÁÉÍÓÚÜÑ]/g) || [];
  const hasExerciseVerb = /calcula|resuelve|halla|determina|simplifica|representa|estudia|demuestra|factoriza|opera|efectua|expresa|razona|indica|completa|ordena|reduce/i.test(value);
  if (value.length < 100 && letters.length >= 5 && upper.length / letters.length > 0.72 && !hasExerciseVerb) return true;
  return false;
}

function isSectionHeading(value) {
  const line = cleanText(value);
  return /^(?:combinatoria|ejercicios?|actividades?|problemas?)\s+(?:de\s+)?[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+\s*:?\s*$/i.test(line)
    && !/[?¿=]/.test(line);
}

function splitCandidates(rawText) {
  const completeText = cleanText(rawText).replace(/\f/g, "\n\n");
  // Muchos cuadernillos reúnen primero los enunciados y, al final, una sección
  // numerada de soluciones. Si no se corta aquí, cada respuesta acaba contada
  // erróneamente como un ejercicio distinto. Los apartados a), b), c)... se
  // conservan unidos a su enunciado principal para que nunca queden huérfanos.
  const text = completeText.split(/\n\s*(?:soluciones?|respuestas?)\s*(?:\n|$)/i)[0];
  if (!text) return [];
  const lines = text.split("\n").map(line => line.trim()).filter(Boolean);
  const blocks = [];
  let current = [];
  for (const line of lines) {
    if (isSectionHeading(line)) {
      if (current.length) blocks.push(cleanText(current.join("\n")));
      current = [];
      continue;
    }
    if (candidateStart(line) && current.length) {
      blocks.push(cleanText(current.join("\n")));
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length) blocks.push(cleanText(current.join("\n")));
  let filtered = blocks.filter(block => !isNoiseBlock(block));
  if (filtered.length <= 1) {
    filtered = text.split(/\n{2,}/).map(cleanText).filter(block => !isNoiseBlock(block));
  }
  return filtered
    .map(block => cleanText(block.replace(/\s+Soluci[oó]n\s*:[\s\S]*$/i, "")))
    .filter(block => block.length >= 12 && !isNoiseBlock(block));
}

function splitCandidateApartments(candidateText, parentCandidate) {
  const text = cleanText(candidateText)
    .replace(/\s+(?=[a-h][.)]\s+)/gi, "\n");
  const lines = text.split("\n");
  const markers = [];
  lines.forEach((line, index) => {
    const match = line.match(/^\s*([a-h])[.)]\s+(.+)$/i);
    if (match) markers.push({ index, label: match[1].toLowerCase() });
  });

  // Solo separamos series reales de apartados. Un único "a)" puede ser una
  // referencia aislada y no aporta suficiente contexto para dividir.
  if (markers.length < 2) {
    return [{ text, parentCandidate, part: null }];
  }

  const prefix = cleanText(lines.slice(0, markers[0].index).join("\n"));
  if (prefix.length < 12) {
    return [{ text, parentCandidate, part: null }];
  }

  return markers.map((marker, markerIndex) => {
    const end = markerIndex + 1 < markers.length
      ? markers[markerIndex + 1].index
      : lines.length;
    const partBody = cleanText(lines.slice(marker.index, end).join("\n"));
    return {
      text: cleanText(`${prefix}\n${partBody}`),
      parentCandidate,
      part: marker.label
    };
  }).filter(item => item.text.length >= 12);
}

function expandOcrExerciseBoundaries(rawText) {
  return String(rawText || "")
    .replace(/(={3,}\s*P[ÁAÃ][^\n=]*={3,})\s*/giu, "$1\n")
    .replace(
      /\s+(?=(?:[1-9]|[1-9]\d)\s*(?:[-.)]|[ºª])\s+(?:[A-ZÁÉÍÓÚÜÑ¿Â]))/gu,
      "\n"
    );
}

function sourceContainsInterleavedSolutions(file) {
  const name = fold(path.basename(file));
  return /soluc|solucionario/.test(name) && /formas?.*contar|numeros?.*contar/.test(name);
}

function contentReviewReasons(text) {
  const value = cleanText(text);
  const folded = fold(value);
  const reasons = [];
  const standaloneCue = /[?¿]/.test(value)
    || /\b(?:calcula|resuelve|halla|determina|simplifica|representa|estudia|demuestra|factoriza|opera|efectua|expresa|escribe|dibuja|contesta|averigua|lee|construye|razona|indica|completa|ordena|reduce|cuantos|cuantas|cual|que valor|se pide)\b/.test(folded);
  if (!standaloneCue) reasons.push("sin-consigna-autonoma");
  if (/^[a-z]\)\s+/i.test(value)) reasons.push("apartado-sin-enunciado-principal");
  if (/\b(?:por lo que|por tanto|luego|de igual forma|consideramos|obtenemos|la solucion es|el resultado es)\b/.test(folded)
      && !/[?¿]/.test(value)) reasons.push("parece-fragmento-de-solucion");
  if (/(?:\bpara que|\bsi|\by|\bo|[,;:]|\.{3})\s*$/i.test(value)) reasons.push("enunciado-posiblemente-truncado");
  if (/[�]/.test(value)) reasons.push("simbolos-matematicos-corruptos");
  return [...new Set(reasons)];
}

function contentReviewReasonsV2(text) {
  const value = cleanText(text);
  const folded = fold(value);
  const reasons = [];
  const standaloneCue = /[?]/.test(value)
    || /\b(?:calcul\w*|resuel\w*|hall\w*|determin\w*|simplific\w*|represent\w*|estudi\w*|demuestr\w*|factoriz\w*|oper\w*|efectu\w*|expres\w*|razon\w*|indic\w*|complet\w*|orden\w*|reduc\w*|desarroll\w*|realiz\w*|decid\w*|encuentr\w*|obten\w*|averigu\w*|escrib\w*|dibuj\w*|constru\w*|clasific\w*|contesta\w*|cuantos|cuantas|cual|que valor|que lugar ocupa|se pide|la probabilidad de)\b/.test(folded);
  const implicitCountingPrompt = /^\d{1,3}\s*[.)-]\s+(?:los|las|el numero|la cantidad)\b/i.test(folded)
    && /\b(?:numeros?|formas?|ordenaciones?|comites?|grupos?|palabras?|codigos?|posibilidades?)\b/.test(folded);
  if (!standaloneCue && !implicitCountingPrompt) reasons.push("sin-consigna-autonoma");
  if (/^[a-z][.)]\s+/i.test(value) && !standaloneCue) reasons.push("apartado-sin-enunciado-principal");
  if (/\b(?:por lo que|por tanto|luego|de igual forma|obtenemos|la solucion es|el resultado es)\b/.test(folded)
      && !/[?]/.test(value)) reasons.push("parece-fragmento-de-solucion");
  if (/(?:\bpara que|\bsi|\by|\bo|[,;:]|\.{3})\s*$/i.test(value)) reasons.push("enunciado-posiblemente-truncado");
  if (contentReviewReasons(text).includes("simbolos-matematicos-corruptos")) {
    reasons.push("simbolos-matematicos-corruptos");
  }
  return [...new Set(reasons)];
}

function stripEnumerator(value) {
  return cleanText(value)
    .replace(/^(?:ejercicio|problema|actividad)\s*\d+\s*[:.)-]?\s*/i, "")
    .replace(/^\d{1,3}\s*(?:[.)ºª:-]|[a-z]\))\s*/i, "")
    .replace(/^[a-z]\)\s*/i, "")
    .trim();
}

function exactKey(value) {
  return fold(stripEnumerator(value))
    .replace(/[“”«»]/g, '"')
    .replace(/[’´`]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function structureKey(value) {
  return exactKey(value)
    .replace(/\b(?:cero|un|uno|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|trece|catorce|quince|dieciseis|diecisiete|dieciocho|diecinueve|veinte|treinta|cuarenta|cincuenta|sesenta|setenta|ochenta|noventa|cien|ciento|mil|millon|millones)\b/g, "#")
    .replace(/\b(?:distinto|distinta|distintos|distintas)\b/g, "diferente")
    .replace(/\b\d+(?:[.,]\d+)?\b/g, "#")
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, "^#")
    .replace(/\b(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b/g, "mes")
    .replace(/\b(?:cm|mm|km|m|kg|g|l|euros?|años?|horas?|minutos?)\b/g, "unidad")
    .replace(/\[pic\]/g, "[fig]")
    .replace(/\s+/g, " ")
    .trim();
}

function trigramSet(value) {
  const compact = String(value || "").replace(/\s+/g, " ").trim();
  const set = new Set();
  for (let index = 0; index <= compact.length - 3; index += 1) set.add(compact.slice(index, index + 3));
  return set;
}

function structuralSimilarity(left, right) {
  if (!left || !right || Math.min(left.length, right.length) < 36) return 0;
  const a = trigramSet(left);
  const b = trigramSet(right);
  let intersection = 0;
  for (const item of a) if (b.has(item)) intersection += 1;
  const union = a.size + b.size - intersection;
  return union ? intersection / union : 0;
}

function needsVisualReview(text) {
  const folded = fold(text);
  if (/\[pic\]/.test(folded)) return true;
  if (/\b(?:figura|grafica|gráfica|tabla|dibujo|imagen)\s+(?:adjunta|siguiente|anterior)\b/.test(folded)) return true;
  return false;
}

function complexityScore(text) {
  const folded = fold(text);
  let score = Math.min(8, Math.floor(folded.length / 110));
  score += (folded.match(/[()[\]{}]/g) || []).length * 0.15;
  score += (folded.match(/[=<>±√∫∑^]/g) || []).length * 0.25;
  for (const pattern of [
    /demuestra|justifica|razona|discute|parametro|sistema|inecuacion|logarit|radical|trigon|deriv|limite|probabilidad|optimiza|maxim|minim|compuesta|fraccion de fraccion/g,
    /varios pasos|operaciones combinadas|identidad notable|representa graficamente/g
  ]) score += (folded.match(pattern) || []).length * 1.5;
  return Number(score.toFixed(2));
}

function refineMatesTheme(text, originalTheme) {
  if (originalTheme !== "Derivadas") return originalTheme;
  const folded = fold(text);
  if (/tangente|normal|crec|decrec|maxim|minim|extremo|monot|optim|aplicacion|velocidad|aceleracion/.test(folded)) {
    return "Aplicación de derivadas";
  }
  return originalTheme;
}

function hashFile(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function appendActiveAppBanks(sources, candidates) {
  const bankFile = path.join(projectRoot, "data", "mates-i-supplied-banks.js");
  if (!fs.existsSync(bankFile)) return;
  const relativeSource = path.relative(projectRoot, bankFile).replace(/\\/g, "/");
  const sourceText = fs.readFileSync(bankFile, "utf8");
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(sourceText, context, { filename: bankFile, timeout: 10_000 });
  const definitions = [
    ["Límite de sucesiones y funciones", "MATES_I_LIMITS_BANK"],
    ["Derivadas", "MATES_I_DERIVATIVES_BANK"],
    ["Aplicación de derivadas", "MATES_I_DERIVATIVE_APPLICATIONS_BANK"]
  ];
  for (const [theme, property] of definitions) {
    const questions = Array.isArray(context.window[property]) ? context.window[property] : [];
    sources.push({
      courseId: "1bach-mates",
      course: "1.º Bachillerato Matemáticas I",
      theme,
      source: relativeSource,
      extension: ".js",
      size: fs.statSync(bankFile).size,
      sha256: hashFile(bankFile),
      extractionStatus: "active-app-bank",
      extractedCharacters: questions.reduce((sum, question) => sum + String(question.text || "").length, 0),
      candidateCount: questions.length,
      visualElements: 0,
      pageCount: null,
      error: null
    });
    questions.forEach((question, index) => {
      const text = cleanText(question.text || "");
      if (!text) return;
      candidates.push({
        id: `1bach-mates-${safeName(theme)}-app-${index + 1}`,
        courseId: "1bach-mates",
        course: "1.º Bachillerato Matemáticas I",
        theme,
        source: relativeSource,
        sourceCandidate: index + 1,
        text,
        exactKey: exactKey(text),
        structureKey: structureKey(text),
        complexityScore: complexityScore(text),
        needsVisualReview: false,
        sourceHasVisualElements: false,
        activeInApp: true
      });
    });
  }

  const combinatoricsBankFile = path.join(projectRoot, "data", "combinatorics-supplied-banks.js");
  if (!fs.existsSync(combinatoricsBankFile)) return;
  const combinatoricsText = fs.readFileSync(combinatoricsBankFile, "utf8");
  const combinatoricsContext = { window: {} };
  vm.createContext(combinatoricsContext);
  vm.runInContext(combinatoricsText, combinatoricsContext, {
    filename: combinatoricsBankFile,
    timeout: 10_000
  });
  const combinatoricsQuestions = Array.isArray(combinatoricsContext.window.COMBINATORICS_SOURCE_BANK)
    ? combinatoricsContext.window.COMBINATORICS_SOURCE_BANK
    : [];
  const relativeCombinatoricsSource = path.relative(projectRoot, combinatoricsBankFile).replace(/\\/g, "/");
  for (const [courseId, course, theme] of [
    ["4eso-b", "4.º ESO B", "Combinatoria"],
    ["1bach-ccss", "1.º Bachillerato CCSS I", "Combinatoria"],
    ["1bach-mates", "1.º Bachillerato Matemáticas I", "Probabilidad"]
  ]) {
    sources.push({
      courseId,
      course,
      theme,
      subtopic: courseId === "1bach-mates" ? "Combinatoria" : null,
      source: relativeCombinatoricsSource,
      extension: ".js",
      size: fs.statSync(combinatoricsBankFile).size,
      sha256: hashFile(combinatoricsBankFile),
      extractionStatus: "active-app-bank",
      extractedCharacters: combinatoricsQuestions.reduce((sum, question) => sum + String(question.text || "").length, 0),
      candidateCount: combinatoricsQuestions.length,
      visualElements: 0,
      pageCount: null,
      error: null
    });
    combinatoricsQuestions.forEach((question, index) => {
      const text = cleanText(question.text || "");
      if (!text) return;
      candidates.push({
        id: `${courseId}-${safeName(theme)}-supplied-${index + 1}`,
        courseId,
        course,
        theme,
        subtopic: courseId === "1bach-mates" ? "Combinatoria" : null,
        source: relativeCombinatoricsSource,
        sourceCandidate: index + 1,
        text,
        exactKey: exactKey(text),
        structureKey: structureKey(text),
        complexityScore: complexityScore(text),
        needsVisualReview: false,
        sourceHasVisualElements: false,
        activeInApp: true
      });
    });
  }
}

function appendSharedCourseSources(sources, candidates) {
  const sharedMappings = [
    {
      source: "documentos/1º ESO/Ejercicios/Repaso_enteros.pdf",
      fromCourseId: "1eso",
      fromTheme: "Números enteros",
      toCourseId: "2eso",
      toCourse: "2.º ESO",
      toTheme: "Números enteros",
      reason: "Operaciones combinadas de enteros válidas para la progresión de 2.º ESO"
    },
    {
      source: "documentos/4º ESO B/Temas mios/ejercicios-combinatoria.pdf",
      fromCourseId: "4eso-b",
      fromTheme: "Combinatoria",
      toCourseId: "1bach-ccss",
      toCourse: "1.º Bachillerato CCSS I",
      toTheme: "Combinatoria",
      reason: "Banco compartido de combinatoria válido para 4.º ESO y 1.º de Bachillerato"
    },
    {
      source: "documentos/4º ESO B/Temas mios/ejercicios-combinatoria.pdf",
      fromCourseId: "4eso-b",
      fromTheme: "Combinatoria",
      toCourseId: "1bach-mates",
      toCourse: "1.º Bachillerato Matemáticas I",
      toTheme: "Probabilidad",
      subtopic: "Combinatoria",
      reason: "Banco compartido de combinatoria para el tema de probabilidad de Matemáticas I"
    },
    {
      source: "documentos/4º ESO/Fuentes compartidas/formas-de-contar-combinatoria-solucionario-2022.pdf",
      fromCourseId: "4eso-b",
      fromTheme: "Combinatoria",
      toCourseId: "1bach-ccss",
      toCourse: "1.º Bachillerato CCSS I",
      toTheme: "Combinatoria",
      reason: "Enunciados compartidos de formas de contar; se excluyen las soluciones editoriales"
    },
    {
      source: "documentos/4º ESO/Fuentes compartidas/formas-de-contar-combinatoria-solucionario-2022.pdf",
      fromCourseId: "4eso-b",
      fromTheme: "Combinatoria",
      toCourseId: "1bach-mates",
      toCourse: "1.º Bachillerato Matemáticas I",
      toTheme: "Probabilidad",
      subtopic: "Combinatoria",
      reason: "Enunciados compartidos de combinatoria para Matemáticas I; se excluyen las soluciones editoriales"
    }
  ];
  for (const mapping of sharedMappings) {
    const originalSource = sources.find(source => source.courseId === mapping.fromCourseId
      && source.theme === mapping.fromTheme && source.source === mapping.source);
    if (!originalSource) continue;
    sources.push({
      ...originalSource,
      courseId: mapping.toCourseId,
      course: mapping.toCourse,
      theme: mapping.toTheme,
      subtopic: mapping.subtopic || originalSource.subtopic || null,
      sharedFromCourseId: mapping.fromCourseId,
      sharedReason: mapping.reason
    });
    const sourceCandidates = candidates.filter(candidate => candidate.courseId === mapping.fromCourseId
      && candidate.theme === mapping.fromTheme && candidate.source === mapping.source);
    for (const candidate of sourceCandidates) {
      candidates.push({
        ...candidate,
        id: `${mapping.toCourseId}-${safeName(mapping.toTheme)}-shared-${candidate.sourceCandidate}`,
        courseId: mapping.toCourseId,
        course: mapping.toCourse,
        theme: mapping.toTheme,
        subtopic: mapping.subtopic || candidate.subtopic || null,
        sharedFromCourseId: mapping.fromCourseId,
        sharedReason: mapping.reason
      });
    }
  }
}

function deduplicateCandidates(candidates) {
  const groupedByTheme = new Map();
  for (const candidate of candidates) {
    const key = `${candidate.courseId}::${candidate.theme}`;
    if (!groupedByTheme.has(key)) groupedByTheme.set(key, []);
    groupedByTheme.get(key).push(candidate);
  }
  const canonical = [];
  const duplicates = [];
  for (const themeCandidates of groupedByTheme.values()) {
    const sorted = [...themeCandidates].sort((a, b) => b.text.length - a.text.length || a.source.localeCompare(b.source));
    const exactSeen = new Map();
    const structureSeen = new Map();
    const exactUnique = [];
    for (const candidate of sorted) {
      const existing = exactSeen.get(candidate.exactKey);
      if (existing) {
        duplicates.push({ kind: "exact", keptId: existing.id, removed: candidate });
        continue;
      }
      exactSeen.set(candidate.exactKey, candidate);
      exactUnique.push(candidate);
    }
    for (const candidate of exactUnique) {
      const existing = structureSeen.get(candidate.structureKey);
      if (existing) {
        duplicates.push({ kind: "numeric-or-structural-variant", keptId: existing.id, removed: candidate });
        continue;
      }
      const nearExisting = [...structureSeen.values()].find(item => structuralSimilarity(item.structureKey, candidate.structureKey) >= 0.94);
      if (nearExisting) {
        duplicates.push({ kind: "near-structural-variant", keptId: nearExisting.id, removed: candidate });
        continue;
      }
      structureSeen.set(candidate.structureKey, candidate);
      canonical.push(candidate);
    }
  }
  const byTheme = new Map();
  for (const candidate of canonical) {
    const key = `${candidate.courseId}::${candidate.theme}`;
    if (!byTheme.has(key)) byTheme.set(key, []);
    byTheme.get(key).push(candidate);
  }
  for (const themeCandidates of byTheme.values()) {
    const scores = themeCandidates.map(candidate => candidate.complexityScore).sort((a, b) => a - b);
    const isEso = themeCandidates.some(candidate => candidate.courseId.includes("eso"));
    const splitRatio = isEso ? 0.5 : 0.58;
    const threshold = scores.length ? scores[Math.max(0, Math.floor(scores.length * splitRatio) - 1)] : 0;
    for (const candidate of themeCandidates) {
      candidate.suggestedLevel = candidate.complexityScore <= threshold ? "Aprendiz" : "Maestro";
    }
  }
  return { canonical, duplicates, byTheme };
}

fs.mkdirSync(extractedRoot, { recursive: true });
fs.mkdirSync(tempRoot, { recursive: true });

const sources = [];
const allCandidates = [];
for (const definition of courseDefinitions) {
  for (const rootRelative of definition.roots) {
    const absoluteRoot = path.join(documentsRoot, ...rootRelative.split("/"));
    for (const file of walkFiles(absoluteRoot)) {
      if (!isExerciseSource(file, definition, rootRelative)) continue;
      const themeIndex = themeIndexFor(file, definition);
      if (themeIndex < 0) continue;
      const theme = definition.themes[themeIndex];
      const subtopic = subtopicFor(file, definition, theme);
      const relativeSource = path.relative(projectRoot, file).replace(/\\/g, "/");
      const sourceRecord = {
        courseId: definition.id,
        course: definition.label,
        theme,
        subtopic,
        source: relativeSource,
        extension: path.extname(file).toLowerCase(),
        size: fs.statSync(file).size,
        sha256: hashFile(file),
        extractionStatus: "pending",
        extractedCharacters: 0,
        candidateCount: 0,
        visualElements: 0,
        pageCount: null,
        error: null
      };
      try {
        const extracted = extractSource(file);
        let cleaned = cleanText(extracted.text);
        let usedOcrSidecar = false;
        const ocrSidecarName = reviewedOcrSidecarFor(file);
        const ocrSidecarPath = ocrSidecarName ? path.join(ocrRoot, ocrSidecarName) : null;
        const extractedIsSparse = sourceRecord.extension === ".pdf"
          && (!cleaned.length || (extracted.pageCount && cleaned.length / extracted.pageCount < 120));
        if (extractedIsSparse && ocrSidecarPath && fs.existsSync(ocrSidecarPath)) {
          cleaned = cleanText(fs.readFileSync(ocrSidecarPath, "utf8"));
          usedOcrSidecar = cleaned.length > 0;
          if (usedOcrSidecar) {
            sourceRecord.ocrText = path.relative(projectRoot, ocrSidecarPath).replace(/\\/g, "/");
          }
        }
        const excludesEditorialSolutions = sourceContainsInterleavedSolutions(file);
        const groupedCandidateTexts = excludesEditorialSolutions
          ? []
          : splitCandidates(usedOcrSidecar ? expandOcrExerciseBoundaries(cleaned) : cleaned);
        const candidateTexts = groupedCandidateTexts.flatMap((text, index) =>
          splitCandidateApartments(text, index + 1)
        );
        const sparseScannedPdf = sourceRecord.extension === ".pdf"
          && (candidateTexts.length === 0 || (extracted.pageCount && cleaned.length / extracted.pageCount < 120));
        sourceRecord.extractionStatus = excludesEditorialSolutions
          ? "reference-only-solutions-excluded"
          : cleaned.length && !sparseScannedPdf ? (usedOcrSidecar ? "extracted-ocr" : "extracted") : "needs-ocr";
        sourceRecord.extractedCharacters = cleaned.length;
        sourceRecord.candidateCount = candidateTexts.length;
        sourceRecord.visualElements = extracted.visualCount || 0;
        sourceRecord.pageCount = extracted.pageCount;
        const targetDir = path.join(extractedRoot, definition.id, safeName(theme));
        fs.mkdirSync(targetDir, { recursive: true });
        const textFile = path.join(targetDir, `${safeName(path.basename(file, path.extname(file)))}.txt`);
        fs.writeFileSync(textFile, cleaned, "utf8");
        sourceRecord.extractedText = path.relative(projectRoot, textFile).replace(/\\/g, "/");
        candidateTexts.forEach((candidatePart, index) => {
          const text = candidatePart.text;
          const refinedTheme = definition.id === "1bach-mates" ? refineMatesTheme(text, theme) : theme;
          const reviewReasons = contentReviewReasonsV2(text);
          allCandidates.push({
            id: `${definition.id}-${safeName(refinedTheme)}-${crypto.createHash("sha1").update(`${relativeSource}\n${index}\n${text}`).digest("hex").slice(0, 12)}`,
            courseId: definition.id,
            course: definition.label,
            theme: refinedTheme,
            subtopic,
            source: relativeSource,
            sourceCandidate: index + 1,
            sourceParentCandidate: candidatePart.parentCandidate,
            sourcePart: candidatePart.part,
            text,
            exactKey: exactKey(text),
            structureKey: structureKey(text),
            complexityScore: complexityScore(text),
            // Que el documento contenga alguna imagen no implica que todos sus
            // ejercicios dependan de ella. Solo retenemos el candidato cuando su
            // propio enunciado alude a una figura/tabla o presenta otra anomalía.
            needsVisualReview: needsVisualReview(text) || reviewReasons.length > 0,
            reviewReasons,
            sourceHasVisualElements: (extracted.visualCount || 0) > 0
          });
        });
      } catch (error) {
        sourceRecord.extractionStatus = "error";
        sourceRecord.error = String(error?.message || error).slice(0, 1200);
      }
      sources.push(sourceRecord);
    }
  }
}

appendSharedCourseSources(sources, allCandidates);
appendActiveAppBanks(sources, allCandidates);

const usableCandidates = allCandidates.filter(candidate => !candidate.needsVisualReview && candidate.exactKey.length >= 12);
const pendingVisual = allCandidates.filter(candidate => candidate.needsVisualReview || candidate.exactKey.length < 12);
const verifiedResult = deduplicateCandidates(usableCandidates);
const potentialResult = deduplicateCandidates(allCandidates.filter(candidate => candidate.exactKey.length >= 12));
const { canonical, duplicates, byTheme: canonicalByTheme } = verifiedResult;
const { canonical: potentialCanonical, duplicates: potentialDuplicates, byTheme: potentialByTheme } = potentialResult;

const summaryRows = [];
for (const definition of courseDefinitions) {
  for (const theme of definition.themes) {
    const key = `${definition.id}::${theme}`;
    const sourceCount = sources.filter(source => source.courseId === definition.id && source.theme === theme).length;
    const extractedCount = allCandidates.filter(candidate => candidate.courseId === definition.id && candidate.theme === theme).length;
    const pendingCount = pendingVisual.filter(candidate => candidate.courseId === definition.id && candidate.theme === theme).length;
    const needsOcrSourceCount = sources.filter(source => source.courseId === definition.id && source.theme === theme && source.extractionStatus === "needs-ocr").length;
    const canonicalCandidates = canonicalByTheme.get(key) || [];
    const potentialCandidates = potentialByTheme.get(key) || [];
    const exactDuplicateCount = duplicates.filter(item => item.kind === "exact" && item.removed.courseId === definition.id && item.removed.theme === theme).length;
    const structureDuplicateCount = duplicates.filter(item => item.kind !== "exact" && item.removed.courseId === definition.id && item.removed.theme === theme).length;
    const apprentice = canonicalCandidates.filter(candidate => candidate.suggestedLevel === "Aprendiz").length;
    const master = canonicalCandidates.filter(candidate => candidate.suggestedLevel === "Maestro").length;
    const potentialApprentice = potentialCandidates.filter(candidate => candidate.suggestedLevel === "Aprendiz").length;
    const potentialMaster = potentialCandidates.filter(candidate => candidate.suggestedLevel === "Maestro").length;
    const isEso = definition.id.includes("eso");
    const target = isEso ? 30 : 32;
    summaryRows.push({
      courseId: definition.id,
      course: definition.label,
      theme,
      sourceCount,
      extractedCount,
      pendingVisualReview: pendingCount,
      needsOcrSources: needsOcrSourceCount,
      exactDuplicates: exactDuplicateCount,
      structuralVariants: structureDuplicateCount,
      canonicalStructures: canonicalCandidates.length,
      potentialStructures: potentialCandidates.length,
      apprentice: isEso ? apprentice : null,
      master: isEso ? master : null,
      potentialApprentice: isEso ? potentialApprentice : null,
      potentialMaster: isEso ? potentialMaster : null,
      targetPerLevelOrTheme: target,
      missingApprentice: isEso ? Math.max(0, target - apprentice) : null,
      missingMaster: isEso ? Math.max(0, target - master) : null,
      missingTheme: isEso ? null : Math.max(0, target - canonicalCandidates.length),
      potentialMissingApprentice: isEso ? Math.max(0, target - potentialApprentice) : null,
      potentialMissingMaster: isEso ? Math.max(0, target - potentialMaster) : null,
      potentialMissingTheme: isEso ? null : Math.max(0, target - potentialCandidates.length),
      status: isEso
        ? (apprentice >= target && master >= target ? "sufficient" : "insufficient")
        : (canonicalCandidates.length >= target ? "sufficient" : "insufficient"),
      materialStatus: isEso
        ? (apprentice >= target && master >= target
          ? "verified-sufficient"
          : (potentialApprentice >= target && potentialMaster >= target
            ? "sufficient-pending-review"
            : (pendingCount > 0 || needsOcrSourceCount > 0 ? "pending-review-before-conclusion" : "source-gap")))
        : (canonicalCandidates.length >= target
          ? "verified-sufficient"
          : (potentialCandidates.length >= target
            ? "sufficient-pending-review"
            : (pendingCount > 0 || needsOcrSourceCount > 0 ? "pending-review-before-conclusion" : "source-gap")))
    });
  }
}

canonical.sort((a, b) => a.course.localeCompare(b.course) || a.theme.localeCompare(b.theme) || a.complexityScore - b.complexityScore);
duplicates.sort((a, b) => a.removed.course.localeCompare(b.removed.course) || a.removed.theme.localeCompare(b.removed.theme));
pendingVisual.sort((a, b) => a.course.localeCompare(b.course) || a.theme.localeCompare(b.theme));
sources.sort((a, b) => a.course.localeCompare(b.course) || a.theme.localeCompare(b.theme) || a.source.localeCompare(b.source));
potentialCanonical.sort((a, b) => a.course.localeCompare(b.course) || a.theme.localeCompare(b.theme) || a.complexityScore - b.complexityScore);
potentialDuplicates.sort((a, b) => a.removed.course.localeCompare(b.removed.course) || a.removed.theme.localeCompare(b.removed.theme));

const subtopicRows = [];
const subtopicKeys = new Set(sources.filter(source => source.subtopic).map(source => `${source.courseId}::${source.theme}::${source.subtopic}`));
for (const key of subtopicKeys) {
  const [courseId, theme, subtopic] = key.split("::");
  const matchingSources = sources.filter(source => source.courseId === courseId && source.theme === theme && source.subtopic === subtopic);
  const matchingVerified = canonical.filter(candidate => candidate.courseId === courseId && candidate.theme === theme && candidate.subtopic === subtopic);
  const matchingPotential = potentialCanonical.filter(candidate => candidate.courseId === courseId && candidate.theme === theme && candidate.subtopic === subtopic);
  subtopicRows.push({
    courseId,
    course: matchingSources[0]?.course || matchingPotential[0]?.course,
    theme,
    subtopic,
    sourceCount: matchingSources.length,
    verifiedStructures: matchingVerified.length,
    potentialStructures: matchingPotential.length
  });
}
subtopicRows.sort((a, b) => a.course.localeCompare(b.course) || a.theme.localeCompare(b.theme) || a.subtopic.localeCompare(b.subtopic));

writeJson(path.join(outputRoot, "fuentes.json"), sources);
writeJson(path.join(outputRoot, "catalogo-canonico.json"), canonical);
writeJson(path.join(outputRoot, "catalogo-potencial-pendiente-revision.json"), potentialCanonical);
writeJson(path.join(outputRoot, "duplicados-y-variantes.json"), duplicates);
writeJson(path.join(outputRoot, "duplicados-potenciales.json"), potentialDuplicates);
writeJson(path.join(outputRoot, "pendientes-revision-visual.json"), pendingVisual);
writeJson(path.join(outputRoot, "resumen-por-tema.json"), summaryRows);
writeJson(path.join(outputRoot, "resumen-por-subtema.json"), subtopicRows);

const report = [];
report.push("# Conversión y deduplicación de fuentes de ejercicios");
report.push("");
report.push(`Generado: ${new Date().toISOString().slice(0, 10)}.`);
report.push("");
report.push("Este catálogo no modifica los documentos originales. Conserva la referencia de cada fuente y excluye del catálogo canónico los enunciados incompletos o con fórmulas/figuras que no pueden verificarse mediante extracción de texto.");
report.push("");
report.push("## Totales");
report.push("");
report.push(`- Fuentes localizadas: **${sources.length}**.`);
report.push(`- Candidatos separados: **${allCandidates.length}**.`);
report.push(`- Estructuras canónicas verificables: **${canonical.length}**.`);
report.push(`- Estructuras distintas potenciales, incluyendo las pendientes de revisión visual: **${potentialCanonical.length}**.`);
report.push(`- Repeticiones exactas detectadas en todas las fuentes: **${potentialDuplicates.filter(item => item.kind === "exact").length}**.`);
report.push(`- Variantes meramente numéricas o estructurales detectadas en todas las fuentes: **${potentialDuplicates.filter(item => item.kind !== "exact").length}**.`);
report.push(`- Duplicados retirados del catálogo ya verificable: **${duplicates.length}**.`);
report.push(`- Apartados pendientes de revisión visual: **${pendingVisual.length}**.`);
report.push("");
report.push("## Resultado por tema");
report.push("");
report.push("| Curso | Tema | Fuentes | Extraídos | Pendientes visuales/OCR | Listos verificados | Potenciales tras revisión | Aprendiz listo/potencial | Maestro listo/potencial | Déficit potencial | Estado del material |");
report.push("|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|");
for (const row of summaryRows) {
  const potentialMissing = row.courseId.includes("eso")
    ? `A:${row.potentialMissingApprentice} / M:${row.potentialMissingMaster}`
    : String(row.potentialMissingTheme);
  const materialLabel = row.materialStatus === "verified-sufficient"
    ? "Suficiente y verificado"
    : (row.materialStatus === "sufficient-pending-review"
      ? "Suficiente tras revisión visual"
      : (row.materialStatus === "pending-review-before-conclusion" ? "No concluyente: revisar fórmulas/escaneos" : "Faltan fuentes"));
  report.push(`| ${row.course} | ${row.theme} | ${row.sourceCount} | ${row.extractedCount} | ${row.pendingVisualReview}/${row.needsOcrSources} | ${row.canonicalStructures} | ${row.potentialStructures} | ${row.apprentice ?? "—"}/${row.potentialApprentice ?? "—"} | ${row.master ?? "—"}/${row.potentialMaster ?? "—"} | ${potentialMissing} | ${materialLabel} |`);
}
report.push("");
report.push("## Interpretación");
report.push("");
report.push("- En ESO el objetivo se comprueba por separado: 30 estructuras Aprendiz y 30 Maestro por tema.");
report.push("- En 1.º de Bachillerato se comprueban 32 estructuras distintas por tema.");
report.push("- La asignación Aprendiz/Maestro es una propuesta automática basada en complejidad y debe revisarse didácticamente antes de publicar.");
report.push("- Un apartado marcado como pendiente visual no se ha dado por convertido: contiene una fórmula, tabla o figura que la extracción de texto no reproduce con fidelidad.");
report.push("- La columna «Potenciales tras revisión» contabiliza estructuras distintas localizadas en las fuentes, aunque todavía no deban publicarse hasta comprobar visualmente su notación.");
report.push("- «Faltan fuentes» solo aparece cuando ni siquiera contando el material pendiente de revisión se alcanza el objetivo de variedad.");
report.push("- «No concluyente» significa que no debe pedirse todavía material nuevo: primero hay que transcribir o revisar las fórmulas, tablas, figuras o PDF escaneados ya entregados.");
report.push("- `duplicados-y-variantes.json` conserva la trazabilidad de todo lo retirado; nada se borra de las fuentes originales.");
report.push("");
fs.writeFileSync(path.join(outputRoot, "RESUMEN CONVERSION.md"), `${report.join("\n")}\n`, "utf8");

const result = {
  outputRoot,
  sources: sources.length,
  candidates: allCandidates.length,
  canonical: canonical.length,
  potentialCanonical: potentialCanonical.length,
  exactDuplicates: duplicates.filter(item => item.kind === "exact").length,
  structuralVariants: duplicates.filter(item => item.kind !== "exact").length,
  potentialExactDuplicates: potentialDuplicates.filter(item => item.kind === "exact").length,
  potentialStructuralVariants: potentialDuplicates.filter(item => item.kind !== "exact").length,
  pendingVisual: pendingVisual.length,
  sourceErrors: sources.filter(source => source.extractionStatus === "error").length,
  sourceNeedsOcr: sources.filter(source => source.extractionStatus === "needs-ocr").length,
  verifiedInsufficientThemes: summaryRows.filter(row => row.status === "insufficient").length,
  sourceGapThemes: summaryRows.filter(row => row.materialStatus === "source-gap").length,
  sufficientAfterReviewThemes: summaryRows.filter(row => row.materialStatus === "sufficient-pending-review").length,
  pendingReviewBeforeConclusionThemes: summaryRows.filter(row => row.materialStatus === "pending-review-before-conclusion").length,
  totalThemes: summaryRows.length
};

fs.writeFileSync(path.join(outputRoot, "resultado-ejecucion.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
fs.rmSync(tempRoot, { recursive: true, force: true });
export default result;
