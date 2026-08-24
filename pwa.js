(function initializeMathUpInstall() {
  let installPrompt = null;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    document.getElementById("public-install-button")?.removeAttribute("hidden");
  });

  window.addEventListener("appinstalled", () => {
    installPrompt = null;
    document.getElementById("public-install-button")?.setAttribute("hidden", "");
  });

  window.MATHUP_INSTALL = {
    async prompt() {
      if (!installPrompt) return false;
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") installPrompt = null;
      return choice.outcome === "accepted";
    }
  };

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js").catch(() => {}));
  }
})();
