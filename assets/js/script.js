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
  
  <div class="col s12 m6 l4">
  <div class="card recipe" data-id="${id}">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${data.picture}"
    </div>
    <div class="card-content">
      <div class="recipe-details">
        <div class="recipe-title">${data.title}</div>    
      </div>
        
      </div>
    </div>
    <div class="card-reveal">
    <span class="card-title grey-text text-darken-4">${data.title}<i class="material-icons right">close</i></span>

      
      <div class="recipe-ingredients">${data.ingredients}</div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    <p
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
