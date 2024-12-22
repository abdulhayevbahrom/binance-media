

function openMenu() {
    const menuBox = document.querySelector('.header-container');
    menuBox.classList.add('active');
    updateIcon(true);
}

function closeMenu() {
    const menuBox = document.querySelector('.header-container');
    menuBox.classList.remove('active');
    updateIcon(false);
}

function toggleMenu(event) {
    event.preventDefault();
    const body = document.querySelector('body');

    const menuBox = document.querySelector('.header-container');
    if (menuBox.classList.contains('active')) {
        closeMenu();
        body.style.overflow = "auto"
    } else {
        openMenu();
        body.style.overflow = "hidden"
    }
}

function updateIcon(isOpen) {
    const icon = document.querySelector('.hamburger-menu i');
    if (isOpen) {
        icon.classList.remove('fa-bars'); // 'Bars' ikonkasini olib tashlaydi
        icon.classList.add('fa-times'); // 'X' ikonkasini qo'shadi
    } else {
        icon.classList.remove('fa-times'); // 'X' ikonkasini olib tashlaydi
        icon.classList.add('fa-bars'); // 'Bars' ikonkasini qayta qo'shadi
    }
}




// =======================
// Modal ochuvchi tugmalar va modal yopuvchi elementlarni olish
const buttons = document.querySelectorAll('.header-item');
// const buttons = Array.from(document.querySelectorAll('.header-item > a'));

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal'); // Modal ID ni oladi
        const modal = document.getElementById(modalId);

        if (modal) {
            // Agar modal ochiq bo'lsa, yopamiz
            if (modal.style.display === 'block') {
                modal.style.display = 'none'; // Modalni yopish 
                modal.style.position = "none"; // Positionni o'chirish
            } else {
                // Modalni ochamiz
                modal.style.position = "none"; // Positionni o'chirish
                modal.style.display = 'block';
            }
        }
    });
});




// Modalni tashqi joyga bosganda yopish
window.addEventListener('click', event => {
    if (event.target.classList.contains('header-drop')) {
        event.target.style.display = 'none';
    }
});







// =========================================
// Toggle the 'active' class on button click for mobile
const btn_Close = document.querySelector('.logo-link-long');
const drop = document.querySelector('.staddrop-long');

document.getElementById('btn-lang').addEventListener('click', function (event) {
    drop.style.display = (drop.style.display === 'block') ? 'none' : 'block';
    event.stopPropagation();
});

// btn_Close bosilganda menyuni yopish
btn_Close.addEventListener('click', function () {
    drop.style.display = 'none';
});


// =========================================

document.querySelector("#btn-night-mobile").addEventListener("click", () => {
    document.body.classList.toggle("white");
    document.querySelector(".header-container").classList.toggle("white");
    document.querySelector(".header-night").classList.toggle("hidden");
    document.querySelector(".header-day").classList.toggle("hidden");
    document.querySelector(".btn-web.gray").classList.toggle("day");
    document.querySelectorAll(".header-icon").forEach(element => {
        element.classList.toggle("day");
    });
    document.querySelectorAll(".icon-drop").forEach(el => {
        el.classList.toggle("day");
    });
    document.querySelectorAll(".header-item").forEach(element => {
        element.classList.toggle("day");
    });
    document.querySelectorAll(".header-drop").forEach(element => {
        element.classList.toggle("day");
    });
    document.querySelector(".search-block").classList.toggle("day");
    document.querySelectorAll(".staddrop").forEach(element => {
        element.classList.toggle("day");
    });
    document.querySelectorAll(".staddrop-state").forEach(element => {
        element.classList.toggle("day");
    });
    document.querySelectorAll(".staddrop-item").forEach(element => {
        element.classList.toggle("day");
    });
    document.querySelector(".footer-switch").classList.toggle("active");
    //Ниже пишем Условия для маин:
});




//=======================================
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#btn-night-mobile .header-icon');

    // Local Storage-dan holatni o'qish
    const activeButtonId = localStorage.getItem('activeButtonId');
    if (activeButtonId) {
        document.getElementById(activeButtonId)?.classList.add('active');
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Hamma tugmalarni faol holatdan chiqarish
            buttons.forEach(btn => btn.classList.remove('active'));

            // Bosilgan tugmani faol holatga o‘tkazish
            button.classList.add('active');

            // Local Storage-da saqlash
            localStorage.setItem('activeButtonId', button.id);
        });
    });
});


//======================================
function toggleDropdownUser() {
    const body = document.body; // To'g'ridan-to'g'ri body tanlang
    const staddrop = document.querySelector(".staddrop-user");

    if (staddrop.classList.contains("show")) {
        staddrop.classList.remove("show");
        body.style.overflow = "auto"; // Dropdown yopilganda, scrollni tiklang
    } else {
        staddrop.classList.add("show");
        body.style.overflow = "hidden"; // Dropdown ochilganda, scrollni o'chiring
    }
}


//==================================
function toggleInput() {
    const input = document.getElementById('disable');
    if (input.style.display === 'none') {
        input.style.display = 'inline-block'; // Inputni ochadi
    } else {
        input.style.display = 'none'; // Inputni yopadi
    }
}