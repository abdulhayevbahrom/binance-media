const mobileSelectedButton = document.querySelector(".sidebar-selected");

function toggleSidebar() {
  mobileSelectedButton.classList.toggle("sidebar-selected--open");
  document.querySelector(".sidebar").classList.toggle("screen");

  if (document.body.style.overflow === "hidden") {
    document.body.style.overflow = "";
  } else {
    document.body.style.overflow = "hidden";
  }
}

const accordionButtons = document.querySelectorAll(
  ".sidebar__menu-item--accordion"
);

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("sidebar__menu-item--open");
  });
});
