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


