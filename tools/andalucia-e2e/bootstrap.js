(function () {
  "use strict";

  const url = new URL(window.location.href);
  const isLocal = ["127.0.0.1", "localhost"].includes(url.hostname);
  if (!isLocal || url.searchParams.get("andalucia-e2e") !== "1") return;

  const showLocalLogin = () => {
    if (typeof window.renderLegacyLogin === "function") window.renderLegacyLogin();
  };
  window.addEventListener("load", () => window.setTimeout(showLocalLogin, 750));
  window.setTimeout(showLocalLogin, 1500);
})();
