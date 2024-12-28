const mobileSelectedButton1 = document.querySelector(".sidebar-selected");

function toggleSidebar() {
  mobileSelectedButton1.classList.toggle("sidebar-selected--open");
  document.querySelector(".sidebar").classList.toggle("screen");

  if (document.body.style.overflow === "hidden") {
    document.body.style.overflow = "";
  } else {
    document.body.style.overflow = "hidden";
  }
}

const accordionButtons1 = document.querySelectorAll(
  ".sidebar__menu-item--accordion"
);

accordionButtons1.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("sidebar__menu-item--open");
  });
});
