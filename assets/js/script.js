"use strict";

const recipes = document.querySelector(".recipes");

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

const renderRecipe = (data, id) => {
  const html = `
  <div class="card-panel recipe white row">
    <div class="recipe-details" data-id="${id}">
      <div class="recipe-title">${data.title}</div>
        <div class="recipe-ingredients">${data.ingredients}</div>
      </div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  </div>
  `;

  recipes.innerHTML += html;
};
