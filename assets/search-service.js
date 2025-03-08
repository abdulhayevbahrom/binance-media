
// ======================================
// История поиска: Очистить историю
const historyDeleteButton = document.querySelector("#history-delete");

function clearSearchHistory() {
    document.querySelector(".history").classList.add("hidden");
}

// Добавляем функцию к кнопке
if (historyDeleteButton) {
    historyDeleteButton.onclick = clearSearchHistory;
}

// ПОИСК: Открыть блок поиска
const search = document.querySelector("#search");
const searchBlock = document.querySelector(".search-block");

function toggleSearchBlock() {
    console.log("ok");
    searchBlock.classList.toggle("hidden");
    document.querySelector(".search-input").focus();
}

// Добавляем функцию к кнопке
if (search) {
    search.onclick = toggleSearchBlock;
}

// КЛИК ВНЕ ПОИСКА: Закрыть блок поиска
function closeSearchBlock(e) {
    const withinBoundaries = e
        .composedPath()
        .includes(document.querySelector(".search"));

    if (!withinBoundaries) {
        searchBlock.classList.add("hidden"); // Скрываем элемент, если клик вне его границ
    }
}

// Добавляем обработчик события к документу
document.onclick = closeSearchBlock;

// Закрыть блок поиска (по кнопке)
const searchCancelButton = document.querySelector(".search-cancel");

function closeSearchBlockByButton() {
    searchBlock.classList.add("hidden");
}

// Добавляем функцию к кнопке
if (searchCancelButton) {
    searchCancelButton.onclick = closeSearchBlockByButton;
}



