document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.xCustomDropdownContainer').forEach(xComplexDropdownElement => {
        const xHeaderSection = xComplexDropdownElement.querySelector('.xDropdownHeaderSection');
        const xOptionsContainer = xComplexDropdownElement.querySelector('.xDropdownOptionsList');
        const xArrowToggleElement = xComplexDropdownElement.querySelector('.xToggleArrowIcon');
        const xCurrentValueDisplay = xComplexDropdownElement.querySelector('.xSelectedValueDisplay');
        const xSearchInputField = xComplexDropdownElement.querySelector('.xSearchFieldInput');
        const xOptionItemsCollection = xComplexDropdownElement.querySelectorAll('.xSingleOptionItem');
        const xIsAnimatedVariant = xComplexDropdownElement.classList.contains('xVariantTwo');

        // Set initial value from HTML
        const setInitialValue = () => {
            const initialText = xCurrentValueDisplay.textContent;
            xCurrentValueDisplay.dataset.selected = initialText;
        };

        setInitialValue();

        // Mobile click functionality (max-width: 768px)
        if (window.matchMedia("(max-width: 768px)").matches) {
            xHeaderSection.addEventListener('click', (xEventObject) => {
                xEventObject.stopPropagation();
                if (xIsAnimatedVariant) {
                    xOptionsContainer.classList.toggle('xActiveState');
                } else {
                    xOptionsContainer.classList.toggle('xActiveState');
                    xOptionsContainer.style.display = xOptionsContainer.classList.contains('xActiveState') ? 'block' : 'none';
                }
                xArrowToggleElement.classList.toggle('xActiveState');
            });
        }

        xOptionItemsCollection.forEach(xSingleOptionElement => {
            xSingleOptionElement.addEventListener('click', () => {
                const selectedText = xSingleOptionElement.dataset.label;
                // Update display with truncated text if needed
                if (window.matchMedia("(min-width: 768px)").matches) {
                    xCurrentValueDisplay.textContent = selectedText.length > 5
                        ? selectedText.substring(0, 4) + '...'
                        : selectedText;
                }
                xCurrentValueDisplay.dataset.selected = selectedText; // Store full value

                // Immediately update and send all values
                const defaults = getAllSelectedValues();
                sendToServer(defaults);

                if (window.matchMedia("(max-width: 768px)").matches) {
                    xOptionsContainer.classList.remove('xActiveState');
                    if (!xIsAnimatedVariant) xOptionsContainer.style.display = 'none';
                    xArrowToggleElement.classList.remove('xActiveState');
                }
            });
        });

        if (xSearchInputField) {
            xSearchInputField.addEventListener('input', (xInputEvent) => {
                const xSearchTerm = xInputEvent.target.value.toLowerCase();
                xOptionItemsCollection.forEach(xOptionElement => {
                    xOptionElement.style.display = xOptionElement.dataset.label.toLowerCase().includes(xSearchTerm) ? '' : 'none';
                });
            });
        }

        // Close on outside click in mobile
        document.addEventListener('click', (xGlobalClickEvent) => {
            if (!xComplexDropdownElement.contains(xGlobalClickEvent.target) && window.matchMedia("(max-width: 768px)").matches) {
                xOptionsContainer.classList.remove('xActiveState');
                if (!xIsAnimatedVariant) xOptionsContainer.style.display = 'none';
                xArrowToggleElement.classList.remove('xActiveState');
            }
        });

        // Add getSelectedValue method
        xComplexDropdownElement.getSelectedValue = () => {
            return xCurrentValueDisplay.dataset.selected || xCurrentValueDisplay.textContent;
        };
    });

    // Function to get all selected values
    const getAllSelectedValues = () => {
        const selectedValues = {};
        document.querySelectorAll('.xCustomDropdownContainer').forEach((dropdown) => {
            const id = dropdown.id; // Use the actual ID from HTML
            selectedValues[id] = dropdown.getSelectedValue();
        });
        return selectedValues;
    };


    const modal = document.getElementById("customModalSetting");
    const closeModal = document.querySelector(".close-modal");
    const sendToServer = async (data) => {
        // getTableData(data)

        // Open modal when "Настроить" button is clicked
        if (data.selectV2 === "Настроить") {
            modal.style.display = "block";


            // Close modal when "X" is clicked
            closeModal.addEventListener("click", () => {
                modal.style.display = "none";
            });

            // Close modal when clicking outside of it
            window.addEventListener("click", (event) => {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
        }
    };


    // Send initial values
    const defaults = getAllSelectedValues();
    sendToServer(defaults);
});


const btnOpenModal = document.querySelector(
    "#btn-ExportButton-onExportTransactionRecords"
);
const btnOpenModalSecond = document.querySelector(
    "#btn-ModalPcDrawerMobile-setOpen-false"
);
const mainModal = document.getElementById("mainModal");
const secondModal = document.getElementById("secondModal");

btnOpenModal.addEventListener("click", function (event) {
    event.stopPropagation();
    mainModal.classList.toggle("active");
    document.body.style.overflow = "hidden";
});

btnOpenModalSecond.addEventListener("click", function (event) {
    mainModal.classList.remove("active");

});


const originalOrderTypes = [
    {
        id: "orderType1", options: [
            "Пополнения",
            "Опционы",
            "Основной аккаунт",
            "Фьючерсы USDⓈ-M",
            "Фьючерсы COIN-M",
            "Пул-аккаунт",
            "P2P-аккаунт",
            "Изолированная маржа"
        ], label: "Из", defaultValue: "Основной аккаунт"
    },
    {
        id: "orderType2", options: [
            "Опционы",
            "Кросс-маржа",
            "Фьючерсы USDⓈ-M",
            "Фьючерсы COIN-M",
            "P2P-аккаунт",
            "Пул-аккаунт",
            "Пополнения",
            "Изолированная маржа",
            "Торговые боты",
            "Копи-трейдинг",
            "Tokocrypto",
            "Binance TR",
            "Binance TH",
            "TraderWagon"
        ], label: "В", defaultValue: "Кросс-маржа"
    },
    { id: "orderType3", options: ["Последние 7 дней", "Последние 30 дней", "Последние 90 дней", "Настроить"], label: "Время", defaultValue: "Последние 30 дней" },
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
                        <div id="clossModalIn" class="html_py-s"><div class="typography-headline4">Время</div><svg onclick="clossModalIn()" class="bn-svg text-t-primary text-xl" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.697 4.575L4.575 6.697 9.88 12l-5.304 5.303 2.122 2.122L12 14.12l5.303 5.304 2.122-2.122L14.12 12l5.304-5.303-2.122-2.122L12 9.88 6.697 4.575z" fill="currentColor"></path></svg></div>

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

    // Function to handle option selection
    function handleOptionClick(option) {
        label.firstChild.textContent = option.textContent;
        listWrapper.classList.remove("open");
        icon.classList.remove("rotate");
        updateDefaultValue(id, option.textContent);
        fetchDataAndUpdate();
    }

    // Detect if it's mobile or desktop
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        // Mobile: click to open/close
        label.addEventListener("click", () => {
            document.querySelectorAll(".order-select__list-wrapper").forEach(el => el.classList.remove("open"));
            listWrapper.classList.toggle("open");
            icon.classList.toggle("rotate", listWrapper.classList.contains("open"));
        });

        // function clossModalInnto() {
        //     document.querySelectorAll(".order-select__list-wrapper").forEach(el => el.classList.remove("open"));
        //     icon.classList.remove("rotate");
        // }


    } else {
        // Desktop: hover to open
        label.addEventListener("mouseenter", () => {
            listWrapper.classList.add("open");
            icon.classList.add("rotate");
        });

        listWrapper.addEventListener("mouseleave", () => {
            listWrapper.classList.remove("open");
            icon.classList.remove("rotate");
        });
    }

    // Option click (common for both)
    optionsList.forEach(option => {
        option.addEventListener("click", () => handleOptionClick(option));
    });


    // const label = select.querySelector(".order-select_value");
    // const listWrapper = select.querySelector(".order-select__list-wrapper");
    // const optionsList = select.querySelectorAll(".order-select__option");
    // const icon = select.querySelector(".order-select_icon");

    // label.addEventListener("click", () => {
    //     document.querySelectorAll(".order-select__list-wrapper").forEach(el => el.classList.remove("open"));
    //     listWrapper.classList.toggle("open");
    //     icon.classList.toggle("rotate", listWrapper.classList.contains("open"));
    // });

    // label.addEventListener("mouseenter", () => {
    //     listWrapper.classList.add("open");
    //     icon.classList.add("rotate");
    // });

    // listWrapper.addEventListener("mouseleave", () => {
    //     listWrapper.classList.remove("open");
    //     icon.classList.remove("rotate");
    // });

    // optionsList.forEach(option => {
    //     option.addEventListener("click", () => {
    //         label.firstChild.textContent = option.textContent;
    //         listWrapper.classList.remove("open");
    //         icon.classList.remove("rotate");
    //         updateDefaultValue(id, option.textContent);
    //         fetchDataAndUpdate(); // Trigger server request on selection
    //     });
    // });
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
    fetchDataAndUpdate(); // Trigger server request after swap
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
function clossModalIn() {
    document.querySelectorAll(".order-select__list-wrapper").forEach(el => el.classList.remove("open"));
    document.querySelectorAll(".order-select_icon").forEach(icon => icon.classList.remove("rotate"));
}

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
            fetchDataAndUpdate(); // Trigger server request after applying custom dates
        } else {
            alert("Пожалуйста, выберите обе даты.");
        }
    });

    // Send initial values to server on page load
    fetchDataAndUpdate();
});




// Function to calculate start and end dates based on the selected time range
function calculateDates(timeRange) {
    const today = new Date();
    let startDate, endDate;
    // Get startDate and endDate from sendData
    const { startDate: start, endDate: end } = sendData();

    endDate = today.toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    if (start && end) {
        startDate = start;
        endDate = end;
    } else {
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
    }


    return {
        startDate: typeof startDate === 'string' ? startDate : startDate.toISOString().split('T')[0],
        endDate
    };
}



// Global o'zgaruvchilar
let currentPage = 1;
let total_pages = 1;

// Pagination tugmalari
const prevButton = document.getElementById("btnArrowPaginationOnPrevPage");
const nextButton = document.getElementById("btnArrowPaginationOnNextPage");

// Tugmalar mavjudligini tekshiramiz
if (!prevButton || !nextButton) {
    console.error("Pagination buttons not found!");
}

// Tugmalar holatini yangilash funksiyasi
// function updateButtons() {
//     if (current_page === 1) {
//         prevButton.style.color = "#333";
//         prevButton.style.cursor = "no-drop";
//     } else {
//         prevButton.style.color = "#aeb4bc";
//         prevButton.style.cursor = "pointer";

//     }

//     if (current_page < total_pages) {
//         prevButton.style.cursor = "no-drop";
//         nextButton.style.color = "#333";
//     } else {
//         prevButton.style.color = "#aeb4bc";
//         prevButton.style.cursor = "pointer";
//     }
// }

// Oldingi sahifaga o'tish
function handlePrev() {
    if (currentPage > 1) {
        currentPage--;
        fetchDataAndUpdate();
        document.getElementById("loading").style.height = "60px";
    }
}

// Keyingi sahifaga o'tish
function handleNext() {
    currentPage++;
    fetchDataAndUpdate();
    document.getElementById("loading").style.height = "60px";
}

// Tugmalarga event listenerlar
prevButton?.addEventListener("click", handlePrev);
nextButton?.addEventListener("click", handleNext);

// Ma'lumotlarni olish va jadvalni yangilash
async function fetchDataAndUpdate() {
    // Dropdowndan tanlangan qiymatlarni olish
    const getValue = (selector) => document.querySelector(`${selector} .order-select_value`)?.textContent.trim() || "";
    // const from = getValue("#orderType1");
    // const to = getValue("#orderType2");
    const time = getValue("#orderType3");
    // const cryptocurrency = getValue("#orderType4");

    const { startDate, endDate } = calculateDates(time);
    const page_size = 10;

    const payload = {
        start_date: startDate,
        end_date: endDate,
        language: "ru",
        pagination: {
            page_number: currentPage,
            page_size,
        },
    };

    // Yuklanish indikatorini ko'rsatish
    const loadingEl = document.getElementById("loading");
    loadingEl.style.display = "flex";

    try {
        const response = await fetch(`${SERVER_URL}/order/transaction-history/transfer`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Serverdan noto‘g‘ri javob keldi!");

        const result = await response.json();

        loadTableData(result);

        // Sahifalar sonini yangilash (agar serverdan kelsa)
        if (result.total_pages) total_pages = result.total_pages;

        // updateButtons();
    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
    } finally {
        loadingEl.style.display = "none";
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



