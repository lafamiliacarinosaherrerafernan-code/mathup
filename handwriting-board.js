(function initializeHandwritingBoard() {
  "use strict";

  const drafts = new Map();
  const instances = new WeakMap();
  const INITIAL_PAPER_HEIGHT = 1050;
  const PAPER_GROWTH = 720;
  const MAX_PIXEL_RATIO = 1.5;

  function escapeAttribute(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function emptyDraft() {
    return {
      strokes: [],
      finalRegion: null,
      logicalHeight: INITIAL_PAPER_HEIGHT,
      undoStack: [],
      redoStack: []
    };
  }

  function draftFor(key) {
    if (!drafts.has(key)) drafts.set(key, emptyDraft());
    return drafts.get(key);
  }

  function cloneDrawing(draft) {
    return {
      strokes: draft.strokes.map((stroke) => ({
        ...stroke,
        points: stroke.points.map((point) => ({ ...point }))
      })),
      finalRegion: draft.finalRegion ? { ...draft.finalRegion } : null,
      logicalHeight: draft.logicalHeight
    };
  }

  function restoreDrawing(draft, snapshot) {
    draft.strokes = snapshot.strokes;
    draft.finalRegion = snapshot.finalRegion;
    draft.logicalHeight = snapshot.logicalHeight || INITIAL_PAPER_HEIGHT;
  }

  function render({ exerciseKey, label = "Resolver a mano" } = {}) {
    const key = escapeAttribute(exerciseKey || "ejercicio-sin-identificador");
    const buttonLabel = escapeAttribute(label);
    return `
      <section class="handwriting-host" data-handwriting-key="${key}">
        <button class="secondary handwriting-launcher" type="button" aria-expanded="false" onclick="MargaritaHandwriting.toggle(this)">
          <span aria-hidden="true">✍</span>
          <span>${buttonLabel}</span>
        </button>
        <section class="handwriting-panel" hidden role="dialog" aria-modal="true" aria-label="Vista para resolver el ejercicio a mano">
          <div class="handwriting-workspace">
            <aside class="handwriting-context" aria-label="Información del alumno y del ejercicio"></aside>
            <main class="handwriting-work-area">
              <header class="handwriting-panel-head">
                <div>
                  <strong>Resolver a mano</strong>
                  <small>Tu ejercicio y todo lo que escribas se conservan al ampliar o restaurar.</small>
                </div>
                <button class="ghost handwriting-close" type="button" onclick="MargaritaHandwriting.close(this)">Volver al ejercicio</button>
              </header>
              <section class="handwriting-sticky-head">
                <div class="handwriting-statement" aria-label="Enunciado del ejercicio">
                  <span class="handwriting-statement-label">Enunciado</span>
                  <div class="handwriting-statement-content"></div>
                </div>
                <div class="handwriting-toolbar" role="toolbar" aria-label="Herramientas de la pizarra">
                  <button class="handwriting-tool is-active" type="button" data-tool="pen" aria-pressed="true" onclick="MargaritaHandwriting.selectTool(this, 'pen')" title="Escribir con bolígrafo">Bolígrafo</button>
                  <button class="handwriting-tool" type="button" data-tool="eraser" aria-pressed="false" onclick="MargaritaHandwriting.selectTool(this, 'eraser')" title="Borrar trazos">Borrador</button>
                  <button class="ghost handwriting-clear" type="button" onclick="MargaritaHandwriting.clear(this)" title="Borrar toda la resolución">Borrar todo</button>
                  <button class="handwriting-tool" type="button" data-tool="final" aria-pressed="false" onclick="MargaritaHandwriting.selectTool(this, 'final')" title="Rodear el resultado final">Marcar respuesta</button>
                  <label class="handwriting-thickness">Grosor
                    <select onchange="MargaritaHandwriting.setThickness(this)" aria-label="Grosor del trazo">
                      <option value="2">Fino</option>
                      <option value="4" selected>Medio</option>
                      <option value="7">Grueso</option>
                    </select>
                  </label>
                  <button class="ghost handwriting-undo" type="button" onclick="MargaritaHandwriting.undo(this)" disabled>Deshacer</button>
                  <button class="ghost handwriting-redo" type="button" onclick="MargaritaHandwriting.redo(this)" disabled>Rehacer</button>
                  <button class="ghost handwriting-expand" type="button" onclick="MargaritaHandwriting.toggleExpanded(this)" aria-pressed="false">Ampliar pizarra</button>
                </div>
              </section>
              <div class="handwriting-scroll-area" tabindex="0" aria-label="Hoja de resolución con desplazamiento vertical">
                <div class="handwriting-canvas-wrap">
                  <canvas class="handwriting-canvas" aria-label="Zona de escritura manual" tabindex="0"></canvas>
                  <p class="handwriting-empty-hint">Escribe aquí tu procedimiento. La hoja crecerá cuando llegues al final.</p>
                </div>
              </div>
              <p class="handwriting-status" role="status" aria-live="polite">Bolígrafo seleccionado.</p>
            </main>
          </div>
        </section>
      </section>
    `;
  }

  function hostFrom(element) {
    return element?.closest?.(".handwriting-host") || element?.closest?.(".handwriting-panel")?.__handwritingHost || null;
  }

  function moveHostToViewport(host) {
    if (host.__handwritingPlaceholder) return;
    const placeholder = document.createComment("handwriting-return-point");
    host.parentNode.insertBefore(placeholder, host);
    host.__handwritingPlaceholder = placeholder;
    document.body.appendChild(host);
  }

  function restoreHostPosition(host) {
    const placeholder = host.__handwritingPlaceholder;
    if (!placeholder?.parentNode) return;
    placeholder.parentNode.insertBefore(host, placeholder);
    placeholder.remove();
    host.__handwritingPlaceholder = null;
  }

  function removeDuplicateIds(root) {
    root?.querySelectorAll?.("[id]").forEach((element) => element.removeAttribute("id"));
  }

  function cloneWithCanvasContent(source) {
    const clone = source.cloneNode(true);
    removeDuplicateIds(clone);
    const originalCanvases = source.querySelectorAll?.("canvas") || [];
    const clonedCanvases = clone.querySelectorAll?.("canvas") || [];
    originalCanvases.forEach((canvas, index) => {
      const target = clonedCanvases[index];
      if (!target) return;
      target.width = canvas.width;
      target.height = canvas.height;
      target.getContext?.("2d")?.drawImage?.(canvas, 0, 0);
    });
    return clone;
  }

  function populateExerciseView(host) {
    const panel = host.querySelector(".handwriting-panel");
    const statementTarget = panel.querySelector(".handwriting-statement-content");
    const contextTarget = panel.querySelector(".handwriting-context");
    const questionBox = host.closest(".question-box");
    const statementParts = [
      questionBox?.querySelector(":scope > .question-meta"),
      questionBox?.querySelector(":scope > .official-source"),
      questionBox?.querySelector(":scope > .question-text")
    ].filter(Boolean);
    statementTarget.replaceChildren(...statementParts.map(cloneWithCanvasContent));

    const originalAside = host.closest(".app-grid")?.querySelector(":scope > aside.screen-panel");
    if (originalAside) {
      const asideCopy = cloneWithCanvasContent(originalAside);
      asideCopy.classList.add("handwriting-context-card");
      asideCopy.setAttribute("inert", "");
      contextTarget.replaceChildren(asideCopy);
    } else {
      contextTarget.innerHTML = `<div class="handwriting-context-card"><strong>Resolución del ejercicio</strong><p>La pantalla anterior permanece conservada detrás de esta vista.</p></div>`;
    }
  }

  function setOpenLayout(open) {
    document.body.classList.toggle("handwriting-mode-open", open);
    if (!open) window.dispatchEvent(new Event("resize"));
  }

  function toggle(button) {
    const host = hostFrom(button);
    if (!host) return;
    const panel = host.querySelector(".handwriting-panel");
    if (!panel) return;
    if (panel.hidden) open(button);
    else close(button);
  }

  function open(element) {
    const host = hostFrom(element);
    if (!host) return;
    const panel = host.querySelector(".handwriting-panel");
    const launcher = host.querySelector(".handwriting-launcher");
    populateExerciseView(host);
    panel.__handwritingHost = host;
    moveHostToViewport(host);
    panel.hidden = false;
    launcher?.setAttribute("aria-expanded", "true");
    setOpenLayout(true);
    const instance = ensureInstance(host);
    requestAnimationFrame(() => {
      resizeCanvas(instance);
      panel.querySelector(".handwriting-close")?.focus();
    });
  }

  function close(element) {
    const host = hostFrom(element);
    if (!host) return;
    const panel = host.querySelector(".handwriting-panel");
    const launcher = host.querySelector(".handwriting-launcher");
    panel.hidden = true;
    panel.classList.remove("is-expanded");
    launcher?.setAttribute("aria-expanded", "false");
    const expandButton = panel.querySelector(".handwriting-expand");
    if (expandButton) {
      expandButton.textContent = "Ampliar pizarra";
      expandButton.setAttribute("aria-pressed", "false");
    }
    setOpenLayout(false);
    restoreHostPosition(host);
    launcher?.focus();
  }

  function toggleExpanded(element) {
    const host = hostFrom(element);
    if (!host) return;
    const panel = host.querySelector(".handwriting-panel");
    const expanded = panel.classList.toggle("is-expanded");
    element.textContent = expanded ? "Restaurar vista" : "Ampliar pizarra";
    element.setAttribute("aria-pressed", String(expanded));
    const instance = ensureInstance(host);
    requestAnimationFrame(() => resizeCanvas(instance));
  }

  function canvasPoint(instance, event) {
    const rect = instance.canvas.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width))),
      y: Math.max(0, Math.min(instance.draft.logicalHeight, event.clientY - rect.top)),
      pressure: event.pointerType === "mouse" ? 0.5 : Math.max(0.15, event.pressure || 0.5)
    };
  }

  function drawStroke(context, stroke, width) {
    if (stroke.points.length < 1) return;
    context.save();
    context.strokeStyle = stroke.color;
    context.lineWidth = stroke.width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    const first = stroke.points[0];
    context.moveTo(first.x * width, first.y);
    stroke.points.slice(1).forEach((point) => context.lineTo(point.x * width, point.y));
    if (stroke.points.length === 1) context.lineTo(first.x * width + 0.01, first.y + 0.01);
    context.stroke();
    context.restore();
  }

  function drawFinalRegion(context, region, width) {
    if (!region) return;
    context.save();
    context.strokeStyle = "#155fbd";
    context.fillStyle = "rgba(21, 95, 189, 0.08)";
    context.lineWidth = 3;
    context.setLineDash([10, 7]);
    const x = Math.min(region.x1, region.x2) * width;
    const y = Math.min(region.y1, region.y2);
    const w = Math.abs(region.x2 - region.x1) * width;
    const h = Math.abs(region.y2 - region.y1);
    context.fillRect(x, y, w, h);
    context.strokeRect(x, y, w, h);
    context.setLineDash([]);
    context.fillStyle = "#0b3474";
    context.font = "700 14px system-ui, sans-serif";
    context.fillText("Respuesta final", x + 8, Math.max(18, y - 7));
    context.restore();
  }

  function redraw(instance) {
    const { canvas, context, draft } = instance;
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const width = canvas.width / ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, draft.logicalHeight);
    draft.strokes.forEach((stroke) => drawStroke(context, stroke, width));
    drawFinalRegion(context, instance.previewRegion || draft.finalRegion, width);
    instance.host.classList.toggle("has-handwriting", draft.strokes.length > 0 || Boolean(draft.finalRegion));
    updateButtons(instance);
  }

  function resizeCanvas(instance) {
    const wrap = instance.host.querySelector(".handwriting-canvas-wrap");
    wrap.style.height = `${instance.draft.logicalHeight}px`;
    const rect = wrap.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const width = Math.max(320, Math.round(rect.width));
    const height = Math.max(INITIAL_PAPER_HEIGHT, Math.round(instance.draft.logicalHeight));
    if (instance.canvas.width !== Math.round(width * ratio) || instance.canvas.height !== Math.round(height * ratio)) {
      instance.canvas.width = Math.round(width * ratio);
      instance.canvas.height = Math.round(height * ratio);
    }
    redraw(instance);
  }

  function growPaperIfNeeded(instance, point) {
    if (point.y < instance.draft.logicalHeight - 130) return;
    instance.draft.logicalHeight += PAPER_GROWTH;
    resizeCanvas(instance);
    instance.status.textContent = "Se ha añadido más espacio a la hoja.";
  }

  function updateButtons(instance) {
    instance.host.querySelector(".handwriting-undo").disabled = instance.draft.undoStack.length === 0;
    instance.host.querySelector(".handwriting-redo").disabled = instance.draft.redoStack.length === 0;
  }

  function commit(instance) {
    if (!instance.beforeAction) return;
    if (instance.actionChanged) {
      instance.draft.undoStack.push(instance.beforeAction);
      if (instance.draft.undoStack.length > 60) instance.draft.undoStack.shift();
      instance.draft.redoStack = [];
    }
    instance.beforeAction = null;
    instance.actionChanged = false;
    redraw(instance);
  }

  function distanceToPoint(point, other, width) {
    return Math.hypot((point.x - other.x) * width, point.y - other.y);
  }

  function eraseAt(instance, point) {
    const rect = instance.canvas.getBoundingClientRect();
    const previousLength = instance.draft.strokes.length;
    instance.draft.strokes = instance.draft.strokes.filter((stroke) =>
      !stroke.points.some((strokePoint) => distanceToPoint(point, strokePoint, rect.width) < 18)
    );
    if (instance.draft.strokes.length !== previousLength) {
      instance.actionChanged = true;
      redraw(instance);
    }
  }

  function onPointerDown(instance, event) {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    instance.canvas.setPointerCapture?.(event.pointerId);
    instance.pointerId = event.pointerId;
    instance.beforeAction = cloneDrawing(instance.draft);
    instance.actionChanged = false;
    const point = canvasPoint(instance, event);
    growPaperIfNeeded(instance, point);
    if (instance.tool === "eraser") {
      eraseAt(instance, point);
      return;
    }
    if (instance.tool === "final") {
      instance.startPoint = point;
      instance.previewRegion = { x1: point.x, y1: point.y, x2: point.x, y2: point.y };
      redraw(instance);
      return;
    }
    instance.currentStroke = {
      color: "#13213a",
      width: instance.thickness * (0.85 + point.pressure * 0.3),
      points: [point]
    };
    instance.draft.strokes.push(instance.currentStroke);
    instance.actionChanged = true;
    redraw(instance);
  }

  function onPointerMove(instance, event) {
    if (instance.pointerId !== event.pointerId) return;
    event.preventDefault();
    const point = canvasPoint(instance, event);
    growPaperIfNeeded(instance, point);
    if (instance.tool === "eraser") {
      eraseAt(instance, point);
      return;
    }
    if (instance.tool === "final" && instance.startPoint) {
      instance.previewRegion = { x1: instance.startPoint.x, y1: instance.startPoint.y, x2: point.x, y2: point.y };
      instance.actionChanged = true;
      redraw(instance);
      return;
    }
    if (instance.currentStroke) {
      instance.currentStroke.points.push(point);
      instance.actionChanged = true;
      redraw(instance);
    }
  }

  function finishPointer(instance, event) {
    if (instance.pointerId !== event.pointerId) return;
    event.preventDefault();
    if (instance.tool === "final" && instance.previewRegion) {
      const region = instance.previewRegion;
      if (Math.abs(region.x2 - region.x1) > 0.02 && Math.abs(region.y2 - region.y1) > 16) {
        instance.draft.finalRegion = { ...region };
        instance.actionChanged = true;
        instance.status.textContent = "Respuesta final marcada. Puedes volver a dibujar el rectángulo para cambiarla.";
      }
      instance.previewRegion = null;
      instance.startPoint = null;
    }
    instance.currentStroke = null;
    instance.pointerId = null;
    commit(instance);
  }

  function ensureInstance(host) {
    if (instances.has(host)) return instances.get(host);
    const key = host.dataset.handwritingKey || "ejercicio-sin-identificador";
    const canvas = host.querySelector(".handwriting-canvas");
    const instance = {
      host,
      canvas,
      context: canvas.getContext("2d"),
      draft: draftFor(key),
      tool: "pen",
      thickness: 4,
      pointerId: null,
      currentStroke: null,
      beforeAction: null,
      actionChanged: false,
      previewRegion: null,
      startPoint: null,
      status: host.querySelector(".handwriting-status")
    };
    canvas.addEventListener("pointerdown", (event) => onPointerDown(instance, event));
    canvas.addEventListener("pointermove", (event) => onPointerMove(instance, event));
    canvas.addEventListener("pointerup", (event) => finishPointer(instance, event));
    canvas.addEventListener("pointercancel", (event) => finishPointer(instance, event));
    canvas.addEventListener("contextmenu", (event) => event.preventDefault());
    if (window.ResizeObserver) {
      instance.resizeObserver = new window.ResizeObserver(() => {
        if (!host.querySelector(".handwriting-panel")?.hidden) resizeCanvas(instance);
      });
      instance.resizeObserver.observe(host.querySelector(".handwriting-scroll-area"));
    }
    instances.set(host, instance);
    return instance;
  }

  function selectTool(button, tool) {
    const host = hostFrom(button);
    if (!host) return;
    const instance = ensureInstance(host);
    instance.tool = tool;
    host.querySelectorAll(".handwriting-tool").forEach((toolButton) => {
      const active = toolButton.dataset.tool === tool;
      toolButton.classList.toggle("is-active", active);
      toolButton.setAttribute("aria-pressed", String(active));
    });
    const messages = {
      pen: "Bolígrafo seleccionado.",
      eraser: "Borrador seleccionado. Pasa sobre un trazo para eliminarlo.",
      final: "Marcar respuesta seleccionado. Dibuja un rectángulo alrededor de tu resultado final."
    };
    instance.status.textContent = messages[tool];
  }

  function setThickness(select) {
    const host = hostFrom(select);
    if (!host) return;
    const instance = ensureInstance(host);
    instance.thickness = Number(select.value) || 4;
    instance.status.textContent = `Grosor ${select.options[select.selectedIndex].text.toLowerCase()} seleccionado.`;
  }

  function undo(element) {
    const host = hostFrom(element);
    if (!host) return;
    const instance = ensureInstance(host);
    const previous = instance.draft.undoStack.pop();
    if (!previous) return;
    instance.draft.redoStack.push(cloneDrawing(instance.draft));
    restoreDrawing(instance.draft, previous);
    instance.status.textContent = "Última acción deshecha.";
    resizeCanvas(instance);
  }

  function redo(element) {
    const host = hostFrom(element);
    if (!host) return;
    const instance = ensureInstance(host);
    const next = instance.draft.redoStack.pop();
    if (!next) return;
    instance.draft.undoStack.push(cloneDrawing(instance.draft));
    restoreDrawing(instance.draft, next);
    instance.status.textContent = "Acción rehecha.";
    resizeCanvas(instance);
  }

  function clearBoard(element) {
    const host = hostFrom(element);
    if (!host) return;
    const instance = ensureInstance(host);
    if (!instance.draft.strokes.length && !instance.draft.finalRegion) {
      instance.status.textContent = "La pizarra ya está vacía.";
      return;
    }
    if (!window.confirm("¿Quieres borrar todos los trazos y la respuesta marcada?")) return;
    instance.draft.undoStack.push(cloneDrawing(instance.draft));
    instance.draft.redoStack = [];
    instance.draft.strokes = [];
    instance.draft.finalRegion = null;
    instance.status.textContent = "Pizarra borrada. Puedes deshacer esta acción.";
    redraw(instance);
  }

  window.MargaritaHandwriting = Object.freeze({
    render,
    toggle,
    open,
    close,
    toggleExpanded,
    selectTool,
    setThickness,
    undo,
    redo,
    clear: clearBoard,
    __audit: { drafts, INITIAL_PAPER_HEIGHT, PAPER_GROWTH }
  });
})();
