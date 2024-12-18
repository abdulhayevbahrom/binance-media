// Accordions
const accordionItems = document.querySelectorAll(".accordion__item");

accordionItems.forEach(item => {
  const label = item.querySelector(".accordion__label");
  label.addEventListener("click", () => {
    accordionItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove("open");
      }
    });

    item.classList.toggle("open");
  });
});

const whereverTabs = document.querySelectorAll(".b-wherever__tabs li");
const whereverScreens = document.querySelectorAll(".b-wherever__screen");

whereverTabs.forEach(tab => {
  tab.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target-id");

    whereverTabs.forEach(t => t.classList.remove("active"));

    this.classList.add("active");

    whereverScreens.forEach(screen => {
      if (screen.getAttribute("data-id") === targetId) {
        screen.style.display = "flex";
      } else {
        screen.style.display = "none";
      }
    });
  });
});
