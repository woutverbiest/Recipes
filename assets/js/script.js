"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  ui();

  registerServiceWorker();
}

function ui() {
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });

  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("service worker registered", reg))
      .catch((err) => console.log("service worker registration failed", err));
  }
}
