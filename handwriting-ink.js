(function initializeHandwritingInk(global) {
  "use strict";

  const FORMAT_VERSION = "1.0";
  const LOGICAL_WIDTH = 1000;
  const NORMALIZED_CONTENT_EXTENT = 960;
  const NORMALIZED_PADDING = 20;
  const BASE_SELECTION_MARGIN = 6;
  const STROKE_MARGIN_FACTOR = 1.75;
  const EXPECTED_ANSWER_TYPES = new Set([
    "scalar", "fraction", "expression", "equation", "equations", "interval", "set",
    "coordinates", "vector", "matrix", "system", "probability", "function", "derivative",
    "integral", "distribution", "units"
  ]);

  function finite(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function monotonicNow() {
    return global.performance?.now?.() ?? Date.now();
  }

  function normalizePointerType(value) {
    return ["pen", "mouse", "touch"].includes(value) ? value : "unknown";
  }

  function displayScale(displayWidth) {
    return Math.max(1, finite(displayWidth, LOGICAL_WIDTH)) / LOGICAL_WIDTH;
  }

  function screenToLogical(point, bounds) {
    const scale = displayScale(bounds?.width);
    return {
      x: (finite(point?.clientX) - finite(bounds?.left)) / scale,
      y: (finite(point?.clientY) - finite(bounds?.top)) / scale
    };
  }

  function logicalToScreen(point, bounds) {
    const scale = displayScale(bounds?.width);
    return {
      x: finite(bounds?.left) + finite(point?.x) * scale,
      y: finite(bounds?.top) + finite(point?.y) * scale
    };
  }

  function normalizeRegion(region) {
    if (!region) return null;
    const left = Math.min(finite(region.left, region.x1), finite(region.right, region.x2));
    const right = Math.max(finite(region.left, region.x1), finite(region.right, region.x2));
    const top = Math.min(finite(region.top, region.y1), finite(region.bottom, region.y2));
    const bottom = Math.max(finite(region.top, region.y1), finite(region.bottom, region.y2));
    if (right <= left || bottom <= top) return null;
    return { left, top, right, bottom };
  }

  function expandedRegion(region, margin) {
    const value = Math.max(0, finite(margin));
    return {
      left: region.left - value,
      top: region.top - value,
      right: region.right + value,
      bottom: region.bottom + value
    };
  }

  function pointInRegion(point, region) {
    return point.x >= region.left && point.x <= region.right
      && point.y >= region.top && point.y <= region.bottom;
  }

  function segmentIntersectsRegion(start, end, region) {
    if (pointInRegion(start, region) || pointInRegion(end, region)) return true;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    let tMin = 0;
    let tMax = 1;
    const clips = [
      [-dx, start.x - region.left],
      [dx, region.right - start.x],
      [-dy, start.y - region.top],
      [dy, region.bottom - start.y]
    ];
    for (const [p, q] of clips) {
      if (p === 0) {
        if (q < 0) return false;
        continue;
      }
      const ratio = q / p;
      if (p < 0) tMin = Math.max(tMin, ratio);
      else tMax = Math.min(tMax, ratio);
      if (tMin > tMax) return false;
    }
    return true;
  }

  function strokeIntersectsRegion(stroke, rawRegion) {
    const region = normalizeRegion(rawRegion);
    const points = Array.isArray(stroke?.points) ? stroke.points : [];
    if (!region || !points.length) return false;
    const margin = Math.max(BASE_SELECTION_MARGIN, finite(stroke.width, 1) * STROKE_MARGIN_FACTOR);
    const target = expandedRegion(region, margin);
    if (points.some((point) => pointInRegion(point, target))) return true;
    for (let index = 1; index < points.length; index += 1) {
      if (segmentIntersectsRegion(points[index - 1], points[index], target)) return true;
    }
    return false;
  }

  function regionsFromSelection(selection) {
    if (Array.isArray(selection?.regions)) return selection.regions.map(normalizeRegion).filter(Boolean);
    const legacy = normalizeRegion(selection);
    return legacy ? [legacy] : [];
  }

  function extractSelectedStrokes(strokes, selection) {
    const regions = regionsFromSelection(selection);
    if (!regions.length) return [];
    return (Array.isArray(strokes) ? strokes : [])
      .filter((stroke) => regions.some((region) => strokeIntersectsRegion(stroke, region)))
      .map((stroke) => ({
        ...stroke,
        points: stroke.points.map((point) => ({ ...point }))
      }));
  }

  function createSelection(regions, strokes, options = {}) {
    const normalizedRegions = (Array.isArray(regions) ? regions : [regions])
      .map(normalizeRegion)
      .filter(Boolean);
    const base = {
      selectionId: String(options.selectionId || `selection-${Math.round(monotonicNow() * 1000)}`),
      regions: normalizedRegions,
      selectedStrokeIds: [],
      createdAt: finite(options.createdAt, monotonicNow())
    };
    base.selectedStrokeIds = extractSelectedStrokes(strokes, base)
      .map((stroke) => stroke.strokeId)
      .filter(Boolean);
    return base;
  }

  function normalizeSelectedInk(strokes, selection, options = {}) {
    const selected = extractSelectedStrokes(strokes, selection);
    const expectedAnswerType = EXPECTED_ANSWER_TYPES.has(options.expectedAnswerType)
      ? options.expectedAnswerType
      : undefined;
    if (!selected.length) {
      return {
        version: FORMAT_VERSION,
        width: 0,
        height: 0,
        strokes: [],
        ...(expectedAnswerType ? { expectedAnswerType } : {})
      };
    }

    const points = selected.flatMap((stroke) => stroke.points);
    const minX = Math.min(...points.map((point) => point.x));
    const minY = Math.min(...points.map((point) => point.y));
    const maxX = Math.max(...points.map((point) => point.x));
    const maxY = Math.max(...points.map((point) => point.y));
    const rawWidth = Math.max(1, maxX - minX);
    const rawHeight = Math.max(1, maxY - minY);
    const scale = NORMALIZED_CONTENT_EXTENT / Math.max(rawWidth, rawHeight);
    const firstTimestamp = Math.min(...points.map((point) => finite(point.timestamp)));
    const normalizedStrokes = selected.map((stroke, order) => ({
      strokeId: String(stroke.strokeId || `legacy-stroke-${order + 1}`),
      order: finite(stroke.order, order),
      pointerType: normalizePointerType(stroke.pointerType),
      color: String(stroke.color || "#13213a"),
      width: finite(stroke.width, 1) * scale,
      points: stroke.points.map((point) => ({
        x: (point.x - minX) * scale + NORMALIZED_PADDING,
        y: (point.y - minY) * scale + NORMALIZED_PADDING,
        timestamp: Math.max(0, finite(point.timestamp) - firstTimestamp),
        pressure: Math.max(0, Math.min(1, finite(point.pressure, 0.5)))
      }))
    }));
    return {
      version: FORMAT_VERSION,
      width: rawWidth * scale + NORMALIZED_PADDING * 2,
      height: rawHeight * scale + NORMALIZED_PADDING * 2,
      strokes: normalizedStrokes,
      ...(expectedAnswerType ? { expectedAnswerType } : {})
    };
  }

  global.MargaritaHandwritingInk = Object.freeze({
    FORMAT_VERSION,
    LOGICAL_WIDTH,
    EXPECTED_ANSWER_TYPES: Object.freeze([...EXPECTED_ANSWER_TYPES]),
    monotonicNow,
    normalizePointerType,
    displayScale,
    screenToLogical,
    logicalToScreen,
    normalizeRegion,
    segmentIntersectsRegion,
    strokeIntersectsRegion,
    extractSelectedStrokes,
    createSelection,
    normalizeSelectedInk
  });
})(typeof window !== "undefined" ? window : globalThis);
