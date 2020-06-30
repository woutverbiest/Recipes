"use strict";

const recipes = document.querySelector(".recipes");

document.addEventListener("DOMContentLoaded", init);

function init() {
  ui();

  registerServiceWorker();
}

function ui() {
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "left" });

  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "right" });
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
  
  <div class="col s12 s12 l6">
  <div class="card-panel recipe white" data-id="${id}">
    <div class="recipe-details" >
      <div class="recipe-title">${data.title}</div>
        <div class="recipe-ingredients">${data.ingredients}</div>
      </div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  </div>
  </div>
  
  `;

  recipes.innerHTML += html;
};

const removeRecipe = (id) => {
  const recipe = document.querySelector(`.recipe[data-id=${id}]`);
  console.log(recipe);
  recipe.remove();
};
