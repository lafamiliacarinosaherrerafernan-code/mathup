(function () {
  const rect = (node) => {
    const value = node.getBoundingClientRect();
    return {
      left: value.left,
      right: value.right,
      top: value.top,
      bottom: value.bottom,
      width: value.width,
      height: value.height,
    };
  };

  const intersectionArea = (a, b) => (
    Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left))
    * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
  );

  window.runMathNativeBoundsGeometryRegression = function runMathNativeBoundsGeometryRegression(root = document) {
    const integral = root.querySelector('.math-integral[data-math-native="integral"] msubsup');
    const barrow = root.querySelector('.math-native-evaluation[data-math-native="evaluation"] msubsup');
    if (!integral || !barrow) throw new Error('No se encontraron los operadores MathML nativos.');

    const integralOperator = rect(integral.querySelector('mo'));
    const integralRows = integral.querySelectorAll(':scope > mrow');
    const integralLower = rect(integralRows[1]);
    const integralUpper = rect(integralRows[2]);
    const barrowOperator = rect(barrow.querySelector('mo'));
    const barrowRows = barrow.querySelectorAll(':scope > mrow');
    const barrowLower = rect(barrowRows[0]);
    const barrowUpper = rect(barrowRows[1]);
    const integralCenter = (integralOperator.left + integralOperator.right) / 2;
    const tolerance = 1;
    const significantArea = 1;

    const checks = {
      integralUpperRight: integralUpper.left > integralCenter,
      integralLowerRight: integralLower.left > integralCenter,
      barrowUpperRight: barrowUpper.left >= barrowOperator.right - tolerance,
      barrowLowerRight: barrowLower.left >= barrowOperator.right - tolerance,
      integralUpperNoOverlap: intersectionArea(integralOperator, integralUpper) < significantArea,
      integralLowerNoOverlap: intersectionArea(integralOperator, integralLower) < significantArea,
      barrowUpperNoOverlap: intersectionArea(barrowOperator, barrowUpper) < significantArea,
      barrowLowerNoOverlap: intersectionArea(barrowOperator, barrowLower) < significantArea,
    };

    return {
      viewport: window.innerWidth,
      pass: Object.values(checks).every(Boolean),
      checks,
      rects: { integralOperator, integralLower, integralUpper, barrowOperator, barrowLower, barrowUpper },
    };
  };
}());
