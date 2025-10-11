document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu");
  const nav = document.querySelector("nav");

  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
});

// ===== MENU TOGGLE =====
const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");

function toggleMenu() {
  menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

// ===== HANDLE RESIZE =====
function handleResize() {
  if (window.innerWidth > 1000) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
}

handleResize();  // run on load
window.addEventListener("resize", handleResize);

// ===== IMAGE VIEWER =====
const gallery = document.querySelector(".gallery");
const modal = document.querySelector(".viewer");

gallery.addEventListener("click", (event) => {
  const clickedImage = event.target.closest("img");
  if (clickedImage) {
    const src = clickedImage.getAttribute("src");
    const alt = clickedImage.getAttribute("alt");

    // change filename from "-sm" to "-full"
    const fullImage = src.split('-')[0] + "-full.jpeg";

    modal.innerHTML = `
      <img src="${fullImage}" alt="${alt}">
      <button class="close-viewer">X</button>
    `;
    modal.showModal();

    // close button
    const closeButton = modal.querySelector(".close-viewer");
    closeButton.addEventListener("click", () => {
      modal.close();
    });
  }
});

// close modal when clicking outside the image
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});
