// =========================Mobile picker==================
// DOM Elementlarini olish
const btn1 = document.getElementById('btn_picker_old');
const btn2 = document.getElementById('btn_picker_new');
const dayColumn = document.getElementById('day-column');
const monthColumn = document.getElementById('month-column');
const yearColumn = document.getElementById('year-column');
const reset_selects = document.getElementById('reset-selects-picer');
const search_selects = document.getElementById('search-selects-picer');
let activeButton = null;

console.log(dayColumn);

// Bugungi sana ma'lumotlari
const today = new Date();
const todayDay = String(today.getDate()).padStart(2, '0');
const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
const todayYear = today.getFullYear();

// Tanlangan sana
let selectedDay = todayDay;
let selectedMonth = todayMonth;
let selectedYear = todayYear;


// 3 oy orqadagi sana
const pastDate = new Date();
pastDate.setMonth(today.getMonth() - 3);
const pastDay = String(pastDate.getDate()).padStart(2, '0');
const pastMonth = String(pastDate.getMonth() + 1).padStart(2, '0');
const pastYear = pastDate.getFullYear();


// Tugmalarni o'zgartirish funksiyasi
function updateButtonDates() {
    btn1.textContent = `${pastYear}-${pastMonth}-${pastDay}`; // 3 oy orqadagi sana
    btn2.textContent = `${todayYear}-${todayMonth}-${todayDay}`; // Bugungi sana

    // Dastlabki ma'lumotlarni serverga yuborish
    const initialData = {
        old: btn1.textContent.trim(),
        new: btn2.textContent.trim(),
    };
    sendDataToServer(initialData);
}


// Tanlangan sanani yangilash funksiyasi
function updateSelectedDate() {
    return `${selectedYear}-${selectedMonth}-${selectedDay}`;
}

// Silliq skroll funksiyasi
function smoothScrollTo(column, targetValue) {
    const targetItem = Array.from(column.children).find(child => child.getAttribute('data-day') === targetValue);
    if (targetItem) {
        const pickerHeight = column.clientHeight; // Konteyner balandligi
        const itemHeight = targetItem.offsetHeight; // Har bir element balandligi
        const offsetTop = targetItem.offsetTop; // Tanlangan element joylashuvi
        const scrollPosition = offsetTop - pickerHeight / 2 + itemHeight / 2; // Markazga tushirish hisoblash

        // Scrollni amalga oshirish
        column.scrollTop = scrollPosition;
    }
}

// Ustunlarga click hodisasi qo'shish
function addClickListener(column, type) {
    column.addEventListener('click', (event) => {
        if (event.target.classList.contains('itemPicker')) {
            const value = event.target.getAttribute('data-day');
            if (type === 'day') selectedDay = value;
            if (type === 'month') selectedMonth = value;
            if (type === 'year') selectedYear = value;

            if (activeButton) {
                activeButton.textContent = updateSelectedDate();
            }

            Array.from(column.children).forEach(item => item.classList.remove('active'));
            event.target.classList.add('active');
        }
    });
}

// Faol tugmani o'rnatish
function setActiveButton(button) {
    btn1.classList.remove('active');
    btn2.classList.remove('active');

    button.classList.add('active');
    activeButton = button;
}

// Skroll qilish va markazlash uchun detektor
function detectMiddlePosition(column, type) {
    column.addEventListener('scroll', () => {
        const middlePosition = 75; // Yarim balandlik (150px)
        const items = Array.from(column.children);
        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top - column.getBoundingClientRect().top;
            const itemHeight = item.offsetHeight;
            const itemMiddle = itemTop + itemHeight / 2;

            if (itemMiddle >= middlePosition && itemMiddle <= middlePosition + itemHeight) {
                const value = item.getAttribute('data-day');
                if (type === 'day') selectedDay = value;
                if (type === 'month') selectedMonth = value;
                if (type === 'year') selectedYear = value;

                if (activeButton) {
                    activeButton.textContent = updateSelectedDate();
                }

                items.forEach(item => item.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });
}

// Hodisalarni qo'shish
addClickListener(dayColumn, 'day');
addClickListener(monthColumn, 'month');
addClickListener(yearColumn, 'year');

btn1.addEventListener('click', () => setActiveButton(btn1));
btn2.addEventListener('click', () => setActiveButton(btn2));
// Sahifa yuklanganda btn1 tugmasini default bosilgan qilib o'rnatish
window.addEventListener('DOMContentLoaded', () => {
    updateButtonDates()
    setActiveButton(btn2, updateSelectedDate());
});

// Bugungi sanani markazga tushirish
// smoothScrollTo(dayColumn, todayDay);
// smoothScrollTo(monthColumn, todayMonth);
// smoothScrollTo(yearColumn, String(todayYear));
function smoothToDefault() {
    // Tanlangan sanani bugungi sana bilan tiklash
    selectedDay = todayDay;
    selectedMonth = todayMonth;
    selectedYear = todayYear;

    // Default qiymatlarni markazga skroll qilish
    smoothScrollTo(dayColumn, selectedDay);
    smoothScrollTo(monthColumn, selectedMonth);
    smoothScrollTo(yearColumn, String(selectedYear));
}
document.addEventListener("DOMContentLoaded", () => {
    smoothToDefault();
});

// "Bugungi oyni markazga tushirish" funksiyasi
const todayElementMonth = monthColumn.querySelector(`[data-day='${todayMonth}']`);
if (todayElementMonth) {
    smoothScrollTo(monthColumn, todayMonth);
}

// "Bugungi kunga skroll qilish" funksiyasi
const todayElementDay = dayColumn.querySelector(`[data-day='${todayDay}']`);
if (todayElementDay) {
    smoothScrollTo(dayColumn, todayDay);
}

// Har bir ustunni o'qish uchun detektor qo'shish
detectMiddlePosition(dayColumn, 'day');
detectMiddlePosition(monthColumn, 'month');
detectMiddlePosition(yearColumn, 'year');


// Modalni yopish
document.querySelector('.order-select__label').addEventListener('click', function () {
    const listWrapper = document.querySelector('.order-select__list-wrapper');
    listWrapper.classList.toggle('active');
    this.classList.toggle('active'); // SVG animatsiyasi uchun
});

// "Search" tugmasi bosilganda
search_selects.addEventListener('click', () => {
    const oldDate = btn1.textContent.trim(); // Eski sana
    const newDate = btn2.textContent.trim(); // Yangi sana

    const selectedData = {
        old: oldDate,
        new: newDate,
    };

    sendDataToServer(selectedData);
});

// Serverga ma'lumot yuborish funksiyasi
function sendDataToServer(value) {
    if (window.innerWidth <= 600) {
        // 4454
        sendRequestWithDates(value.old, value.new);
    }
}


// Reset qilish funksiyasi
function resetToDefault() {
    selectedDay = todayDay;
    selectedMonth = todayMonth;
    selectedYear = todayYear;

    // Default qiymatlarni markazga skroll qilish
    smoothScrollTo(dayColumn, selectedDay);
    smoothScrollTo(monthColumn, selectedMonth);
    smoothScrollTo(yearColumn, String(selectedYear));

    btn1.textContent = `${pastYear}-${pastMonth}-${pastDay}`; // 3 oy orqadagi sana
    btn2.textContent = `${todayYear}-${todayMonth}-${todayDay}`; // Bugungi sana
    const initialData = {
        old: btn1.textContent.trim(),
        new: btn2.textContent.trim(),
    };
    sendDataToServer(initialData);
    // Sahifa yuklanganda btn1 tugmasini default bosilgan qilib o'rnatish
    window.addEventListener('DOMContentLoaded', () => {
        updateButtonDates()
        setActiveButton(btn2, updateSelectedDate());
    });
}

// "Reset" tugmasi bosilganda
reset_selects.addEventListener('click', resetToDefault);
// =============================4454=======================