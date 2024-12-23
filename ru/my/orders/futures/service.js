// Modal va tugmalarni olish
const modal = document.querySelector('.order-filters_modal');
const toggleButtons = [
    document.querySelector('.order-filters-mobile > button'),
    document.querySelector('.order-filters-mobile_fu > button'),
    document.querySelector('.order-filters-mobile-tr > button')
];
const closeModalButton = document.querySelector('.close-modal');

// Modalni ochish funksiyasi
toggleButtons.forEach((button) => {
    if (button) {
        button.addEventListener('click', () => {
            modal.style.display = 'block';
            modal.classList.add('active');
            modal.classList.remove('closing');
        });
    }
});

// Modalni yopish funksiyasi
function closeModal() {
    modal.classList.remove('active');
    modal.classList.add('closing');

    // Animatsiya tugagandan so'ng modalni yashirish
    modal.addEventListener('animationend', () => {
        modal.classList.remove('closing');
        modal.style.display = 'none';
    }, { once: true });
}

// "Close" tugmachasini bosganda modalni yopish
if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
}

// Modal tashqarisiga bosganda modalni yopish
document.addEventListener('click', (event) => {
    const isClickInsideModal = modal.contains(event.target);
    const isClickOnToggleButton = toggleButtons.some(button => button && button.contains(event.target));

    if (!isClickInsideModal && !isClickOnToggleButton) {
        closeModal();
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


