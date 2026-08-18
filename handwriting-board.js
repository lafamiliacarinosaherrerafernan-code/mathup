(function initializeHandwritingBoard() {
  "use strict";

  const Ink = window.MargaritaHandwritingInk;
  if (!Ink) throw new Error("MargaritaHandwritingInk debe cargarse antes de handwriting-board.js");
  const drafts = new Map();
  const instances = new WeakMap();
  const exerciseContexts = new Map();
  const validationHandlers = new Map();
  const INITIAL_PAPER_HEIGHT = 1050;
  const PAPER_GROWTH = 720;
  const MAX_PIXEL_RATIO = 1.5;
  let strokeSequence = 0;
  let selectionSequence = 0;

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
      selection: null,
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
      selection: draft.selection ? {
        ...draft.selection,
        regions: draft.selection.regions.map((region) => ({ ...region })),
        selectedStrokeIds: [...draft.selection.selectedStrokeIds]
      } : null,
      logicalHeight: draft.logicalHeight
    };
  }

  function restoreDrawing(draft, snapshot) {
    draft.strokes = snapshot.strokes;
    draft.selection = snapshot.selection || null;
    draft.logicalHeight = snapshot.logicalHeight || INITIAL_PAPER_HEIGHT;
  }

  function render({ exerciseKey, label = "Resolver a mano", context = {}, statementHtml = "", onValidated = null } = {}) {
    const rawKey = String(exerciseKey || "ejercicio-sin-identificador");
    const key = escapeAttribute(rawKey);
    exerciseContexts.set(rawKey, Object.freeze({ ...context, exerciseKey: rawKey, statementHtml }));
    if (typeof onValidated === "function") validationHandlers.set(rawKey, onValidated);
    else validationHandlers.delete(rawKey);
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
                <div class="handwriting-clear-confirmation" hidden role="group" aria-label="Confirmar borrado de la pizarra">
                  <span>¿Borrar todos los trazos y la respuesta marcada?</span>
                  <button class="danger handwriting-confirm-clear" type="button" onclick="MargaritaHandwriting.confirmClear(this)">Borrar todo</button>
                  <button class="ghost handwriting-cancel-clear" type="button" onclick="MargaritaHandwriting.cancelClear(this)">Cancelar</button>
                </div>
              </section>
              <div class="handwriting-scroll-area" tabindex="0" aria-label="Hoja de resolución con desplazamiento vertical">
                <div class="handwriting-canvas-wrap">
                  <canvas class="handwriting-canvas" aria-label="Zona de escritura manual" tabindex="0"></canvas>
                  <p class="handwriting-empty-hint">Escribe aquí tu procedimiento. La hoja crecerá cuando llegues al final.</p>
                </div>
              </div>
              <section class="handwriting-recognition-confirmation" hidden aria-live="polite">
                <strong>He reconocido:</strong>
                <div class="handwriting-recognized-expression"></div>
                <p class="handwriting-recognition-message"></p>
                <div class="handwriting-recognition-actions">
                  <button class="primary handwriting-confirm-recognition" type="button" onclick="MargaritaHandwriting.confirmRecognition(this)">Confirmar</button>
                  <button class="ghost" type="button" onclick="MargaritaHandwriting.retryRecognition(this)">Volver a escribir</button>
                </div>
              </section>
              <div class="handwriting-external-feedback-slot" aria-live="polite"></div>
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

  function moveOriginalContextToPanel(host, contextTarget) {
    const originalAside = host.closest(".app-grid")?.querySelector(":scope > aside.screen-panel");
    if (!originalAside) return false;

    const placeholder = document.createComment("handwriting-context-return-point");
    originalAside.parentNode.insertBefore(placeholder, originalAside);
    host.__handwritingContext = { originalAside, placeholder };
    originalAside.classList.add("handwriting-context-card");
    contextTarget.replaceChildren(originalAside);
    return true;
  }

  function restoreOriginalContext(host) {
    const context = host.__handwritingContext;
    if (!context) return;
    const { originalAside, placeholder } = context;
    originalAside.classList.remove("handwriting-context-card");
    if (placeholder?.parentNode) {
      placeholder.parentNode.insertBefore(originalAside, placeholder);
      placeholder.remove();
    }
    host.__handwritingContext = null;
  }

  function populateExerciseView(host) {
    const panel = host.querySelector(".handwriting-panel");
    const statementTarget = panel.querySelector(".handwriting-statement-content");
    const contextTarget = panel.querySelector(".handwriting-context");
    const exerciseContext = exerciseContexts.get(host.dataset.handwritingKey);
    if (exerciseContext?.statementHtml) {
      const source = document.createElement("div");
      source.innerHTML = exerciseContext.statementHtml;
      statementTarget.replaceChildren(...Array.from(source.childNodes));
    } else {
      const questionBox = host.closest(".question-box, .exam-question-card, .first-bach-exam-question, .coach-question-card");
      const explicitStatement = questionBox?.querySelector("[data-handwriting-statement]");
      const statementParts = explicitStatement ? [explicitStatement] : [
        questionBox?.querySelector(":scope > .question-meta"),
        questionBox?.querySelector(":scope > .official-source"),
        questionBox?.querySelector(":scope > .question-text, :scope > .first-bach-exam-statement, :scope > h2")
      ].filter(Boolean);
      statementTarget.replaceChildren(...statementParts.map(cloneWithCanvasContent));
    }

    if (!moveOriginalContextToPanel(host, contextTarget)) {
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
    restoreOriginalContext(host);
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
    requestAnimationFrame(() => {
      resizeCanvas(instance);
      const pendingClassification = panel.querySelector(".handwriting-external-feedback-slot .phase2c-classification:not([hidden])");
      pendingClassification?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
    });
  }

  function canvasPoint(instance, event) {
    const rect = instance.canvas.getBoundingClientRect();
    const scale = Ink.displayScale(rect.width);
    // offsetX/offsetY are reported in the canvas' own CSS coordinate space.
    // They remain aligned with a Surface Pen when Windows display scaling or
    // the visual viewport makes clientY differ from the painted canvas.
    const hasLocalCoordinates = Number.isFinite(Number(event.offsetX))
      && Number.isFinite(Number(event.offsetY))
      && event.target === instance.canvas;
    const logical = hasLocalCoordinates
      ? { x: Number(event.offsetX) / scale, y: Number(event.offsetY) / scale }
      : Ink.screenToLogical(event, rect);
    return {
      x: Math.max(0, Math.min(Ink.LOGICAL_WIDTH, logical.x)),
      y: Math.max(0, Math.min(instance.draft.logicalHeight, logical.y)),
      timestamp: Ink.monotonicNow(),
      pressure: event.pointerType === "mouse" ? 0.5 : Math.max(0.15, event.pressure || 0.5),
      pointerType: Ink.normalizePointerType(event.pointerType)
    };
  }

  function strokePoint(point) {
    return {
      x: point.x,
      y: point.y,
      timestamp: point.timestamp,
      pressure: point.pressure
    };
  }

  function drawStroke(context, stroke) {
    if (stroke.points.length < 1) return;
    context.save();
    context.strokeStyle = stroke.color;
    context.lineWidth = stroke.width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    const first = stroke.points[0];
    context.moveTo(first.x, first.y);
    stroke.points.slice(1).forEach((point) => context.lineTo(point.x, point.y));
    if (stroke.points.length === 1) context.lineTo(first.x + 0.01, first.y + 0.01);
    context.stroke();
    context.restore();
  }

  function drawSelection(context, selection) {
    const region = selection?.regions?.[0];
    if (!region) return;
    context.save();
    context.strokeStyle = "#155fbd";
    context.fillStyle = "rgba(21, 95, 189, 0.08)";
    context.lineWidth = 3;
    context.setLineDash([10, 7]);
    const x = region.left;
    const y = region.top;
    const w = region.right - region.left;
    const h = region.bottom - region.top;
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
    const displayWidth = canvas.width / ratio;
    const scale = Ink.displayScale(displayWidth);
    context.setTransform(ratio * scale, 0, 0, ratio * scale, 0, 0);
    context.clearRect(0, 0, Ink.LOGICAL_WIDTH, draft.logicalHeight);
    draft.strokes.forEach((stroke) => drawStroke(context, stroke));
    const previewSelection = instance.previewRegion
      ? { regions: [Ink.normalizeRegion(instance.previewRegion)] }
      : draft.selection;
    drawSelection(context, previewSelection);
    instance.host.classList.toggle("has-handwriting", draft.strokes.length > 0 || Boolean(draft.selection));
    updateButtons(instance);
  }

  function resizeCanvas(instance) {
    const wrap = instance.host.querySelector(".handwriting-canvas-wrap");
    const rect = wrap.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const width = Math.max(320, Math.round(rect.width));
    const scale = Ink.displayScale(width);
    const height = Math.round(instance.draft.logicalHeight * scale);
    wrap.style.height = `${height}px`;
    wrap.style.backgroundSize = `${24 * scale}px ${24 * scale}px`;
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

  function distanceToPoint(point, other) {
    return Math.hypot(point.x - other.x, point.y - other.y);
  }

  function eraseAt(instance, point) {
    const rect = instance.canvas.getBoundingClientRect();
    const logicalRadius = 18 / Ink.displayScale(rect.width);
    const previousLength = instance.draft.strokes.length;
    instance.draft.strokes = instance.draft.strokes.filter((stroke) =>
      !stroke.points.some((strokePoint) => distanceToPoint(point, strokePoint) < logicalRadius)
    );
    if (instance.draft.strokes.length !== previousLength) {
      instance.actionChanged = true;
      redraw(instance);
    }
  }

  function onPointerDown(instance, event) {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    // The panel can finish adapting to the viewport after its first paint
    // (notably when a browser side panel opens or a pen changes the visual
    // viewport).  Refresh the backing store immediately before capturing the
    // first point so CSS pixels and canvas pixels cannot drift apart.
    resizeCanvas(instance);
    instance.canvas.setPointerCapture?.(event.pointerId);
    instance.pointerId = event.pointerId;
    instance.beforeAction = cloneDrawing(instance.draft);
    instance.actionChanged = false;
    const capturedPoint = canvasPoint(instance, event);
    const point = strokePoint(capturedPoint);
    growPaperIfNeeded(instance, point);
    if (instance.tool === "eraser") {
      eraseAt(instance, point);
      return;
    }
    if (instance.tool === "final") {
      instance.startPoint = point;
      instance.previewRegion = { left: point.x, top: point.y, right: point.x, bottom: point.y };
      redraw(instance);
      return;
    }
    instance.currentStroke = {
      strokeId: `stroke-${++strokeSequence}`,
      order: strokeSequence,
      pointerType: capturedPoint.pointerType,
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
    const point = strokePoint(canvasPoint(instance, event));
    growPaperIfNeeded(instance, point);
    if (instance.tool === "eraser") {
      eraseAt(instance, point);
      return;
    }
    if (instance.tool === "final" && instance.startPoint) {
      instance.previewRegion = {
        left: instance.startPoint.x,
        top: instance.startPoint.y,
        right: point.x,
        bottom: point.y
      };
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
      const region = Ink.normalizeRegion(instance.previewRegion);
      if (region && region.right - region.left > 20 && region.bottom - region.top > 16) {
        instance.draft.selection = Ink.createSelection(region, instance.draft.strokes, {
          selectionId: `selection-${++selectionSequence}`,
          createdAt: Ink.monotonicNow()
        });
        instance.actionChanged = true;
        instance.status.textContent = "Respuesta final marcada. Puedes volver a dibujar el rectángulo para cambiarla.";
        void requestRecognition(instance).catch((error) => {
          const context = exerciseContexts.get(instance.host.dataset.handwritingKey) || {};
          const panel = recognitionPanel(instance);
          const message = panel?.querySelector(".handwriting-recognition-message");
          const expressionTarget = panel?.querySelector(".handwriting-recognized-expression");
          const confirm = panel?.querySelector(".handwriting-confirm-recognition");
          if (panel) panel.hidden = false;
          if (message) message.textContent = "La interfaz no pudo completar el reconocimiento. Clasifica esta muestra como error técnico sin repetirla.";
          if (expressionTarget) expressionTarget.hidden = true;
          if (confirm) confirm.hidden = true;
          instance.status.textContent = message?.textContent || "Fallo técnico de la interfaz.";
          window.dispatchEvent(new CustomEvent("margarita:handwriting-recognized", {
            detail: Object.freeze({ context, status: "technical-error", recognizedExpression: "", confidence: null, latencyMs: null, requestCount: Number(error?.requestCount) || 0, validationType: context.expectedAnswerType || "auto", isEquivalent: null, reason: error?.message || "pilot-ui-exception", alternatives: [], rawSemanticResult: null })
          }));
        });
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
      pendingRecognition: null,
      recognitionRequestToken: null,
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
      instance.resizeObserver.observe(host.querySelector(".handwriting-canvas-wrap"));
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
    if (!instance.draft.strokes.length && !instance.draft.selection) {
      instance.status.textContent = "La pizarra ya está vacía.";
      return;
    }
    const confirmation = host.querySelector(".handwriting-clear-confirmation");
    if (!confirmation) return;
    confirmation.hidden = false;
    element.setAttribute("aria-expanded", "true");
    confirmation.querySelector(".handwriting-confirm-clear")?.focus();
    instance.status.textContent = "Confirma si quieres borrar toda la pizarra o cancela para conservarla.";
  }

  function hideClearConfirmation(host) {
    const confirmation = host?.querySelector(".handwriting-clear-confirmation");
    if (confirmation) confirmation.hidden = true;
    const trigger = host?.querySelector(".handwriting-clear");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }

  function confirmClear(element) {
    const host = hostFrom(element);
    if (!host) return;
    const instance = ensureInstance(host);
    hideClearConfirmation(host);
    instance.draft.undoStack.push(cloneDrawing(instance.draft));
    instance.draft.redoStack = [];
    instance.draft.strokes = [];
    instance.draft.selection = null;
    instance.status.textContent = "Pizarra borrada. Puedes deshacer esta acción.";
    redraw(instance);
  }

  function cancelClear(element) {
    const host = hostFrom(element);
    if (!host) return;
    const instance = ensureInstance(host);
    hideClearConfirmation(host);
    instance.status.textContent = "Borrado cancelado. Tu resolución se mantiene intacta.";
    host.querySelector(".handwriting-clear")?.focus();
  }

  function contextFor(elementOrKey) {
    const key = typeof elementOrKey === "string"
      ? elementOrKey
      : hostFrom(elementOrKey)?.dataset.handwritingKey;
    return key ? exerciseContexts.get(key) || null : null;
  }

  function exportSelectedInk(elementOrKey, options = {}) {
    const key = typeof elementOrKey === "string"
      ? elementOrKey
      : hostFrom(elementOrKey)?.dataset.handwritingKey;
    if (!key) return null;
    const draft = drafts.get(key);
    if (!draft?.selection) return null;
    const context = exerciseContexts.get(key) || {};
    return Ink.normalizeSelectedInk(draft.strokes, draft.selection, {
      expectedAnswerType: options.expectedAnswerType || context.expectedAnswerType
    });
  }

  function recognitionPanel(instance) {
    return instance.host.querySelector(".handwriting-recognition-confirmation");
  }

  function hideRecognition(instance) {
    const panel = recognitionPanel(instance);
    if (panel) panel.hidden = true;
    instance.pendingRecognition = null;
  }

  function renderRecognizedExpression(target, expression) {
    const renderer = window.MargaritaMathRenderer;
    if (renderer?.text) target.innerHTML = renderer.text(expression);
    else target.textContent = expression;
  }

  async function requestRecognition(instance) {
    const context = exerciseContexts.get(instance.host.dataset.handwritingKey) || {};
    const recognizer = window.MargaritaHandwritingRecognition;
    const panel = recognitionPanel(instance);
    const expressionTarget = panel?.querySelector(".handwriting-recognized-expression");
    const message = panel?.querySelector(".handwriting-recognition-message");
    const confirm = panel?.querySelector(".handwriting-confirm-recognition");
    if (!recognizer) {
      if (panel) panel.hidden = false;
      if (expressionTarget) expressionTarget.hidden = true;
      if (confirm) confirm.hidden = true;
      if (message) message.textContent = "El componente de reconocimiento no está disponible. No se ha enviado ninguna petición.";
      instance.status.textContent = message?.textContent || "Reconocimiento no disponible.";
      return;
    }
    if (!/^\d+eso(?:-|$)/i.test(String(context.courseId || ""))) {
      instance.status.textContent = "La prueba real de reconocimiento está limitada actualmente a ESO.";
      return;
    }
    const ink = exportSelectedInk(instance.host, { expectedAnswerType: context.expectedAnswerType || "expression" });
    if (!ink?.strokes?.length) {
      instance.status.textContent = "La zona marcada no contiene trazos reconocibles. No se ha enviado ninguna petición.";
      if (context.mode === "myscript-pilot") {
        window.dispatchEvent(new CustomEvent("margarita:handwriting-recognized", {
          detail: Object.freeze({ context, status: "technical-error", recognizedExpression: "", confidence: null, latencyMs: null, requestCount: 0, validationType: context.expectedAnswerType || "auto", isEquivalent: null, reason: "empty-selected-ink", alternatives: [], rawSemanticResult: null })
        }));
      }
      return;
    }
    const evaluationGate = window.MargaritaMyScriptEvaluation?.beforeRecognition?.(context);
    if (evaluationGate && evaluationGate.allowed === false) {
      instance.status.textContent = evaluationGate.message || "Se ha alcanzado el límite de peticiones autorizado.";
      if (panel) panel.hidden = false;
      if (expressionTarget) expressionTarget.hidden = true;
      if (confirm) confirm.hidden = true;
      if (message) message.textContent = instance.status.textContent;
      if (/clasifica primero/i.test(instance.status.textContent)) {
        window.MargaritaMyScriptEvaluation?.goToPending?.();
      }
      return;
    }
    const requestToken = Symbol("recognition-request");
    instance.recognitionRequestToken = requestToken;
    instance.status.textContent = "Intentando reconocer la respuesta marcada…";
    if (panel) panel.hidden = false;
    if (expressionTarget) expressionTarget.hidden = true;
    if (confirm) confirm.hidden = true;
    if (message) message.textContent = "Reconociendo la respuesta marcada…";
    const diagnosis = recognizer.diagnose({
      ink,
      provider: "myscript-iink",
      expectedExpression: context.correctAnswer,
      validationType: context.expectedAnswerType || "auto",
      tolerance: context.answerTolerance,
      equationMode: context.equationMode,
      context
    });
    const guardedDiagnosis = context.mode === "myscript-pilot"
      ? diagnosis.catch((error) => ({
          status: "technical-error",
          recognizedExpression: "",
          confidence: null,
          reason: error?.message || "pilot-recognition-failed",
          requestCount: Number(error?.requestCount) || 1,
          validationType: context.expectedAnswerType || "auto"
        }))
      : diagnosis;
    const result = context.mode === "myscript-pilot"
      ? await Promise.race([
          guardedDiagnosis,
          new Promise((resolve) => window.setTimeout(() => resolve({
            status: "technical-error",
            recognizedExpression: "",
            confidence: null,
            reason: "pilot-recognition-timeout",
            requestCount: 1,
            validationType: context.expectedAnswerType || "auto"
          }), 15000))
        ])
      : await guardedDiagnosis;
    if (instance.recognitionRequestToken !== requestToken) return;
    instance.pendingRecognition = result;
    window.dispatchEvent(new CustomEvent("margarita:handwriting-recognized", {
      detail: Object.freeze({
        context,
        status: result.status,
        recognizedExpression: result.recognizedExpression || result.expression || "",
        confidence: result.confidence ?? null,
        latencyMs: Number.isFinite(Number(result.latencyMs)) ? Number(result.latencyMs) : null,
        requestCount: Number(result.requestCount) || 0,
        validationType: result.validationType || context.expectedAnswerType || "auto",
        isEquivalent: typeof result.isEquivalent === "boolean" ? result.isEquivalent : null,
        reason: result.reason || "",
        alternatives: Array.isArray(result.alternatives) ? result.alternatives : [],
        rawSemanticResult: result.rawSemanticResult || null
      })
    }));
    const hasExpression = Boolean(result.recognizedExpression);
    panel.hidden = false;
    expressionTarget.hidden = !hasExpression;
    if (hasExpression) {
      const pilotRenderedExpression = context.mode === "myscript-pilot"
        ? window.MargaritaMyScriptEvaluation?.renderDisplayExpression?.(result.recognizedExpression)
        : "";
      if (pilotRenderedExpression) expressionTarget.innerHTML = pilotRenderedExpression;
      else renderRecognizedExpression(expressionTarget, result.recognizedExpression);
    }
    confirm.hidden = !hasExpression;
    if (result.status === "unavailable") message.textContent = "El reconocimiento matemático no está disponible todavía. La pizarra sigue funcionando y no se ha consumido ningún intento.";
    else if (result.status === "technical-error") message.textContent = "No se ha podido contactar con el reconocimiento. Puedes seguir escribiendo y volver a intentarlo.";
    else if (result.status === "ambiguous") message.textContent = hasExpression ? "La confianza no es suficiente. Comprueba la expresión antes de confirmarla." : "No he podido reconocer la respuesta con suficiente seguridad.";
    else message.textContent = "Comprueba que coincide exactamente con lo que has escrito antes de confirmar.";
    instance.status.textContent = message.textContent;
  }

  function confirmRecognition(element) {
    const host = hostFrom(element);
    if (!host) return;
    const instance = ensureInstance(host);
    const result = instance.pendingRecognition;
    if (!result?.recognizedExpression) return;
    handwritingValidated(host, {
      recognizedExpression: result.recognizedExpression,
      normalizedExpression: result.normalizedExpression || result.recognizedExpression,
      isEquivalent: result.isEquivalent,
      confidence: Number.isFinite(result.confidence) ? result.confidence : 0,
      validationType: result.validationType,
      status: result.status === "ambiguous" ? "recognized" : result.status
    });
    recognitionPanel(instance).hidden = true;
    instance.status.textContent = "Expresión reconocida confirmada para el diagnóstico. No se han modificado puntos ni progreso.";
  }

  function retryRecognition(element) {
    const host = hostFrom(element);
    if (!host) return;
    const instance = ensureInstance(host);
    hideRecognition(instance);
    instance.draft.selection = null;
    instance.tool = "pen";
    instance.host.querySelectorAll(".handwriting-tool").forEach((button) => {
      const active = button.dataset.tool === "pen";
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    instance.status.textContent = "Puedes corregir la escritura y volver a marcar la respuesta.";
    redraw(instance);
  }

  function handwritingValidated(elementOrKey, payload) {
    const context = contextFor(elementOrKey);
    if (!context) return false;
    const normalizedExpression = String(payload?.normalizedExpression || payload?.normalizedAnswer || "").trim();
    const recognizedExpression = String(payload?.recognizedExpression || normalizedExpression).trim();
    const confidence = Number(payload?.confidence);
    const legacyValid = typeof payload?.isCorrect === "boolean";
    const status = String(payload?.status || (legacyValid ? (payload.isCorrect ? "equivalent" : "not-equivalent") : "")).trim();
    if (!status || !Number.isFinite(confidence)) return false;
    if (["equivalent", "not-equivalent", "recognized"].includes(status) && !normalizedExpression) return false;
    const detail = Object.freeze({
      context,
      answerMethod: "handwriting",
      recognizedExpression,
      normalizedExpression,
      isEquivalent: typeof payload?.isEquivalent === "boolean" ? payload.isEquivalent : legacyValid ? payload.isCorrect : null,
      isCorrect: typeof payload?.isEquivalent === "boolean" ? payload.isEquivalent : legacyValid ? payload.isCorrect : null,
      confidence,
      validationType: String(payload?.validationType || context.expectedAnswerType || ""),
      status
    });
    window.dispatchEvent(new CustomEvent("margarita:handwriting-validated", { detail }));
    const handler = validationHandlers.get(context.exerciseKey);
    if (handler) handler(detail);
    return true;
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
    confirmClear,
    cancelClear,
    exportSelectedInk,
    contextFor,
    handwritingValidated,
    requestRecognition,
    confirmRecognition,
    retryRecognition,
    __audit: { drafts, exerciseContexts, validationHandlers, INITIAL_PAPER_HEIGHT, PAPER_GROWTH }
  });
})();
