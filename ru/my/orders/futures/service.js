// Modal va tugmalarni olish
const modal = document.querySelector('.order-filters_modal');
const toggleButton = document.querySelector('.order-filters-mobile > button');
const closeModalButton = document.querySelector('.close-modal');

// Modalni ochish va yopish funksiyasi
toggleButton.addEventListener('click', () => {
    modal.classList.toggle('active');
});

// "Close" tugmachasini bosganda modalni yopish
closeModalButton.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Modal tashqarisiga bosganda modalni yopish
document.addEventListener('click', (event) => {
    if (!modal.contains(event.target) && !toggleButton.contains(event.target)) {
        modal.classList.remove('active');
    }
});

// ===================================
// Select all the buttons
function setActive(button) {
    // Remove the 'selected' and 'active' classes from all buttons
    const buttons = document.querySelectorAll('.order-select__label');
    buttons.forEach(btn => {
        btn.classList.remove('selected');
        btn.classList.remove('active');
    });

    // Add the 'selected' and 'active' classes to the clicked button
    button.classList.add('selected', 'active');
}