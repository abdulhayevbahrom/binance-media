const originalOrderTypes = [
    { id: "orderType1", options: ["Пополнения", "Опционы", "Основной аккаунт", "Фьючерсы USDⓈ-M", "Фьючерсы COIN-M", "Пул-аккаунт", "P2P-аккаунт", "Изолированная маржа"], label: "Из", defaultValue: "Основной аккаунт" },
    { id: "orderType2", options: ["Опционы", "Кросс-маржа", "Фьючерсы USDⓈ-M", "Фьючерсы COIN-M", "P2P-аккаунт", "Пул-аккаунт", "Пополнения", "Изолированная маржа", "Торговые боты", "Копи-трейдинг", "Tokocrypto", "Binance TR", "Binance TH", "TraderWagon"], label: "В", defaultValue: "Кросс-маржа" },
    { id: "orderType3", options: ["Последние 7 дней", "Последние 30 дней", "Последние 90 дней", "Настроить"], label: "Время", defaultValue: "Последние 30 дней" },
    {
        id: "orderType4",
        label: "Криптовалюта",
        defaultValue: "Все",
        options: [
            { label: "ADD", image: "https://bin.bnbstatic.com/images/20191211/bcd0cdc0-79a0-4972-8b75-5d56bf5d41f2.png" },
            { label: "ADX", image: "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20240724/6a2360f1-8ef9-49a4-b428-3db586e50143.png" },
            { label: "ADXOLD", image: "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20200821/19ef68ac-be44-4318-a682-5ac4c270e288.png" },
            { label: "AE", image: "https://bin.bnbstatic.com/images/20191211/8cde9282-b8d0-458f-bd77-a3f17f7a8775.png" },
            { label: "AED", image: "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20231011/90f9a2b8-1bc9-4f07-b83a-591d0bd1a3ea.png" },
            { label: "AERGO", image: "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20220329/9584603d-318b-4dea-833f-fccead1b324e.png" },
            { label: "AEUR", image: "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20230906/3d050043-18d0-4a21-8007-e12e67a75320.png" }
        ]
    }
];

let orderTypes = JSON.parse(JSON.stringify(originalOrderTypes)); // Deep copy of original
let isSwapped = false; // Track swap state

function createSelect(id, options, labels, defaultValue) {
    const select = document.getElementById(id);
    const isSearchVisible = id === "orderType4";

    select.innerHTML = `
                        <div class="order-select__label">
                            <p>${labels}</p>
                            <div class="order-select_valueBox">
                                <span class="order-select_value">${defaultValue || 'Все'}</span>
                            </div>
                            <div class="order-select_icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <path d="M16.5 8.49v2.25L12 15.51l-4.5-4.77V8.49h9z" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="order-select__list-wrapper">
                            ${isSearchVisible ? `
                                <div class="search-boxInp">
                                    <div class="search-boxonNav">
                                        <div class="bn-textField-prefix">
                                            <svg fill="textDisabled" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="bn-svg-inInp"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 6a5 5 0 110 10 5 5 0 010-10zm0-3a8 8 0 017.021 11.838l3.07 3.07-1.59 1.591-1.591 1.591-3.07-3.07A8 8 0 1111 3z" fill="currentColor"></path></svg>
                                        </div>
                                        <input aria-label="Поиск" placeholder="Поиск" oninput="filterOptions('${id}', this.value)" class="bn-textField-input" spellcheck="false" autocomplete="" value="">
                                    </div>
                                </div>
                            ` : ''}
                            <div class="order-select__list">
                                ${options.map(opt => {
        if (opt.image) {
            return `
                                            <div class="order-select__option" data-value="${opt.label}">
                                                <img src="${opt.image}" alt="No" class="option-image" />
                                                <span>${opt.label}</span>
                                            </div>
                                        `;
        } else {
            return `
                                            <span class="order-select__option" data-value="${opt}">${opt}</span>
                                        `;
        }
    }).join('')}
                            </div>
                        </div>
                    `;

    const label = select.querySelector(".order-select_value");
    const listWrapper = select.querySelector(".order-select__list-wrapper");
    const optionsList = select.querySelectorAll(".order-select__option");
    const icon = select.querySelector(".order-select_icon");

    label.addEventListener("click", () => {
        document.querySelectorAll(".order-select__list-wrapper").forEach(el => el.classList.remove("open"));
        listWrapper.classList.toggle("open");
        icon.classList.toggle("rotate", listWrapper.classList.contains("open"));
    });

    label.addEventListener("mouseenter", () => {
        listWrapper.classList.add("open");
        icon.classList.add("rotate");
    });

    listWrapper.addEventListener("mouseleave", () => {
        listWrapper.classList.remove("open");
        icon.classList.remove("rotate");
    });

    optionsList.forEach(option => {
        option.addEventListener("click", () => {
            label.firstChild.textContent = option.textContent;
            listWrapper.classList.remove("open");
            icon.classList.remove("rotate");
            updateDefaultValue(id, option.textContent);
            sendSelectedValuesToServer(); // Trigger server request on selection
        });
    });
}

function filterOptions(id, value) {
    const list = document.querySelector(`#${id} .order-select__list`);
    list.querySelectorAll(".order-select__option").forEach(option => {
        option.style.display = option.textContent.toLowerCase().includes(value.toLowerCase()) ? "block" : "none";
    });
}

function updateDefaultValue(id, newValue) {
    const label = document.querySelector(`#${id} .order-select_value`);
    label.textContent = newValue;
}

// Function to toggle between swapped and original state
function toggleSwapOptions() {
    if (!isSwapped) {
        const orderType1 = orderTypes.find(type => type.id === "orderType1");
        const orderType2 = orderTypes.find(type => type.id === "orderType2");

        const tempOptions = orderType1.options;
        const tempDefault = orderType1.defaultValue;

        orderType1.options = orderType2.options;
        orderType1.defaultValue = orderType2.defaultValue;
        orderType2.options = tempOptions;
        orderType2.defaultValue = tempDefault;

        isSwapped = true;
    } else {
        orderTypes = JSON.parse(JSON.stringify(originalOrderTypes));
        isSwapped = false;
    }

    createSelect("orderType1", orderTypes[0].options, orderTypes[0].label, orderTypes[0].defaultValue);
    createSelect("orderType2", orderTypes[1].options, orderTypes[1].label, orderTypes[1].defaultValue);
    sendSelectedValuesToServer(); // Trigger server request after swap
}

// Initial creation of selects
orderTypes.forEach(({ id, options, label, defaultValue }) => createSelect(id, options, label, defaultValue));

// Add event listener for swap button
document.getElementById("swapButton").addEventListener("click", toggleSwapOptions);

document.addEventListener("click", event => {
    if (!event.target.closest(".order-select")) {
        document.querySelectorAll(".order-select__list-wrapper").forEach(el => el.classList.remove("open"));
        document.querySelectorAll(".order-select_icon").forEach(icon => icon.classList.remove("rotate"));
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("customModalSetting");
    const closeModal = document.querySelector(".close-modal");
    const applyButton = document.getElementById("applyDateRange");

    document.querySelector("#orderType3 .order-select__list").addEventListener("click", (event) => {
        if (event.target.textContent === "Настроить") {
            modal.style.display = "block";
        }
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    applyButton?.addEventListener("click", () => {
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;

        if (startDate && endDate) {
            document.querySelector("#orderType3 .order-select_value").textContent = `${startDate} - ${endDate}`;
            modal.style.display = "none";
            sendSelectedValuesToServer(); // Trigger server request after applying custom dates
        } else {
            alert("Пожалуйста, выберите обе даты.");
        }
    });

    // Send initial values to server on page load
    sendSelectedValuesToServer();
});




// Function to calculate start and end dates based on the selected time range
function calculateDates(timeRange) {
    const today = new Date();
    let startDate, endDate;

    endDate = today.toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    switch (timeRange) {
        case "Последние 7 дней":
            startDate = new Date(today);
            startDate.setDate(today.getDate() - 7);
            break;
        case "Последние 30 дней":
            startDate = new Date(today);
            startDate.setDate(today.getDate() - 30);
            break;
        case "Последние 90 дней":
            startDate = new Date(today);
            startDate.setDate(today.getDate() - 90);
            break;
        case "Настроить":
            // For custom range, use modal values if available, otherwise default to 30 days
            const customStart = document.getElementById("startDate")?.value;
            const customEnd = document.getElementById("endDate")?.value;
            if (customStart && customEnd) {
                startDate = customStart;
                endDate = customEnd;
            } else {
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 30); // Default to 30 days
            }
            break;
        default:
            startDate = new Date(today);
            startDate.setDate(today.getDate() - 30); // Fallback to 30 days
    }

    return {
        startDate: typeof startDate === 'string' ? startDate : startDate.toISOString().split('T')[0],
        endDate
    };
}


// Pagination tugmalari
const prevButton = document.getElementById("btnArrowPaginationOnPrevPage");
const nextButton = document.getElementById("btnArrowPaginationOnNextPage");

// Tugmalar mavjudligini tekshiramiz
if (!prevButton || !nextButton) {
    console.error("Pagination buttons not found!");
}

// Global o'zgaruvchilar
let current_page = 1;
let total_pages = 1;
// Tugmalar holatini yangilash funksiyasi
function updateButtons() {
    if (current_page === 1) {
        prevButton.style.color = "#333";
        prevButton.style.cursor = "no-drop";
    } else {
        prevButton.style.color = "#aeb4bc";
        prevButton.style.cursor = "pointer";

    }

    if (current_page < total_pages) {
        prevButton.style.cursor = "no-drop";
        nextButton.style.color = "#333";
    } else {
        prevButton.style.color = "#aeb4bc";
        prevButton.style.cursor = "pointer";
    }
}

// Oldingi sahifaga o'tish// Oldingi sahifaga o'tish
function handlePrev() {
    if (current_page > 1) {
        current_page--;
        getTableData();
        document.getElementById("loading").style.height = "60px";
    }
    updateButtons();
}

// Keyingi sahifaga o'tish
function handleNext() {
    current_page++;
    getTableData();
    updateButtons();
    document.getElementById("loading").style.height = "60px";
}

// Tugmalarga event listener qo'shamiz
prevButton?.addEventListener("click", handlePrev);
nextButton?.addEventListener("click", handleNext);


// Function to collect selected values and send them to the server
async function sendSelectedValuesToServer(isPaginationChange = false) {
    // Collect selected values from each dropdown
    const from = document.querySelector("#orderType1 .order-select_value").textContent.trim();
    const to = document.querySelector("#orderType2 .order-select_value").textContent.trim();
    const time = document.querySelector("#orderType3 .order-select_value").textContent.trim();
    const cryptocurrency = document.querySelector("#orderType4 .order-select_value").textContent.trim();

    // Calculate start and end dates based on the selected time range
    const { startDate, endDate } = calculateDates(time);
    const page_size = 10;

    const payload = {
        start_date: startDate,
        end_date: endDate,
        language: "ru",
        pagination: {
            page_number: current_page,
            page_size,
        },
    };

    document.getElementById("loading").style.display = "flex";


    const API = `${SERVER_URL}/order/transaction-history/transfer`;
    try {
        // Send the data to the server using fetch
        const response = await fetch(API, { // Replace with your actual server endpoint
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        // Parse the server response
        const result = await response.json();
        loadTableData(result);
        console.log("Server response:", result);

    } catch (error) {
        console.error("Error sending data to server:", error);
    } finally {
        document.getElementById("loading").style.display = "none";
    }
}











// ==========================================================
// Экспортировать записи транзакций

// Function to collect all form data
function collectFormData() {
    const formData = {
        timeRange: "",
        wallet: "",
        subaccount: "",
        coin: "",
        customDateRange: "",
    };

    // Get selected time range
    const activeTimeRange = document.querySelector(".flex-button.active");
    if (activeTimeRange) {
        formData.timeRange = activeTimeRange.textContent.trim();
    }

    // Get wallet selection
    const walletText = document
        .getElementById("selected-text-1")
        .textContent.trim();
    formData.wallet =
        walletText !== "Пожалуйста, выберите аккаунт" ? walletText : "";

    // Get subaccount selection
    const subaccountText = document
        .getElementById("selected-text-2")
        .textContent.trim();
    formData.subaccount =
        subaccountText !== "Выбрать суб-аккаунты" ? subaccountText : "";

    // Get coin selection
    const coinText = document
        .getElementById("selected-text-3")
        .textContent.trim();
    formData.coin = coinText !== "Пожалуйста, выберите монету" ? coinText : "";

    // Get custom date range if selected
    if (formData.timeRange === "Настроить") {
        const dateRangePicker = document.getElementById("dateRangePicker");
        formData.customDateRange = dateRangePicker.textContent.trim();
    }

    return formData;
}