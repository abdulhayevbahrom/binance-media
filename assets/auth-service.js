document.addEventListener("DOMContentLoaded", function () {
    // LocalStorage'dan user_id ni olish
    const userId = localStorage.getItem("user_id");

    // Elementlarni olish
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const headerAuthentication = document.querySelector(".header-authentication");
    const boxMobileNavMenu = document.querySelector(".box_mobile-nav-menu");
    const faIcon = document.querySelector(".fa");

    // Agar user_id mavjud bo'lsa, tegishli elementlarni boshqarish
    if (userId) {
        if (hamburgerMenu) hamburgerMenu.classList.add("hidden");
        if (headerAuthentication) headerAuthentication.classList.add("hidden");
        if (boxMobileNavMenu) boxMobileNavMenu.classList.remove("hidden");
        if (faIcon) faIcon.classList.remove("hidden");
    } else {
        // Agar user_id yo'q bo'lsa, default holat
        if (hamburgerMenu) hamburgerMenu.classList.remove("hidden");
        if (headerAuthentication) headerAuthentication.classList.remove("hidden");
        if (boxMobileNavMenu) boxMobileNavMenu.classList.add("hidden");
        if (faIcon) faIcon.classList.add("hidden");
    }
});
