// main.js
import { recipes } from "./recipes.mjs";

function buildRatingHTML(rating) {
  const max = 5;
  let stars = "";

  for (let i = 1; i <= max; i++) {
    const filled = i <= rating;
    const cls = filled ? "icon-star" : "icon-star-empty";
    const symbol = filled ? "★" : "☆";
    stars += `<span aria-hidden="true" class="${cls}">${symbol}</span>`;
  }

  return `
    <span
      class="rating"
      role="img"
      aria-label="Rating: ${rating} out of ${max} stars"
    >
      ${stars}
    </span>
  `;
}

function renderRecipes(recipeList) {
  const container = document.querySelector("#recipes");
  container.innerHTML = "";

  recipeList.forEach((recipe) => {
    const article = document.createElement("article");
    article.classList.add("recipe");

    article.innerHTML = `
      <div class="recipe-image">
        <img src="images/${recipe.image}" alt="${recipe.name}">
      </div>

      <div class="recipe-content">
        <header class="recipe-header">
          <h2>${recipe.name}</h2>
          <p class="recipe-meta">
            <span class="recipe-tags">${recipe.tags.join(", ")}</span>
            <span class="recipe-time">
              Prep: ${recipe.prepTime} &bull; Cook: ${recipe.cookTime}
            </span>
            <span class="recipe-servings">
              Serves: ${recipe.servings}
            </span>
          </p>
          ${buildRatingHTML(recipe.rating)}
        </header>

        <p class="recipe-description">
          ${recipe.description}
        </p>
      </div>
    `;

    container.appendChild(article);
  });
}

function setupSearch() {
  const form = document.querySelector("#search-form");
  const input = document.querySelector("#search");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const term = input.value.trim().toLowerCase();

    if (!term) {
      renderRecipes(recipes);
      return;
    }

    const filtered = recipes.filter((recipe) => {
      const nameMatch = recipe.name.toLowerCase().includes(term);
      const tagMatch = recipe.tags
        .join(" ")
        .toLowerCase()
        .includes(term);
      return nameMatch || tagMatch;
    });

    renderRecipes(filtered);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderRecipes(recipes);
  setupSearch();
});


// recipes.mjs
export const recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    image: "spaghetti.jpg",          // this file should exist in images/
    tags: ["pasta", "dinner"],
    prepTime: "15 min",
    cookTime: "30 min",
    servings: 4,
    rating: 4,
    description:
      "A classic Italian pasta dish with a rich, savory meat sauce."
  },
  {
    id: 2,
    name: "Chocolate Chip Cookies",
    image: "cookies.jpg",
    tags: ["dessert", "baking"],
    prepTime: "20 min",
    cookTime: "12 min",
    servings: 24,
    rating: 5,
    description:
      "Soft, chewy cookies loaded with melty chocolate chips."
  }
  // …more recipes
];
