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
            ? selectedText.substring(0, 5) + '...'
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
    getTableData(data)

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



function filterOptions(id, value) {
  const list = document.querySelector(`#${id} .order-select__list`);
  list.querySelectorAll(".order-select__option").forEach((option) => {
    option.style.display = option.textContent
      .toLowerCase()
      .includes(value.toLowerCase())
      ? "block"
      : "none";
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("customModalSetting");
  const applyButton = document.getElementById("applyDateRange");

  // Apply date range and close modal
  applyButton?.addEventListener("click", () => {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (startDate && endDate) {
      document.querySelector("#orderType2 .order-select_value").textContent = `${startDate} - ${endDate}`;
      modal.style.display = "none";
      // Assuming getTableData and getAllSelectedValues are defined elsewhere
      getTableData(getAllSelectedValues());
    } else {
      alert("Пожалуйста, выберите обе даты.");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("customModalSetting");
  const closeModal = document.querySelector(".close-modal");
  const applyButton = document.getElementById("applyDateRange");

  document
    .querySelector("#customButton")
    .addEventListener("click", (event) => {
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
      document.querySelector(
        "#orderType2 .order-select_value"
      ).textContent = `${startDate} - ${endDate}`;
      modal.style.display = "none";
      getTableData(getAllSelectedValues());
    } else {
      alert("Пожалуйста, выберите обе даты.");
    }
  });
});

document
  .getElementById("btn-MFilterWrap-onOpenFilter")
  .addEventListener("click", function () {
    let filterBox = document.querySelector(".order-filters");
    filterBox.style.display = "block";
    setTimeout(() => {
      document.body.style.overflow = "hidden";
      filterBox.classList.add("show");
    }, 10);
  });

document
  .getElementById("btn-MDrawer-onClose")
  .addEventListener("click", function () {
    let filterBox = document.querySelector(".order-filters");
    filterBox.style.display = "none";
    setTimeout(() => {
      document.body.style.overflow = "";
      filterBox.classList.add("show");
    }, 10);
  });
function handleCloseDrawer() {
  let filterBox = document.querySelector(".order-filters");
  filterBox.style.display = "none";

  setTimeout(() => {
    document.body.style.overflow = "";
    filterBox.classList.add("show");
  }, 10);
}


function toggleCalendar() {
  const calendars = document.querySelectorAll(".calendar");
  if (calendars.length > 0) {
    calendars.forEach((calendar) => calendar.classList.toggle("active"));
  } else {
    console.error("Element '.calendar' topilmadi!");
  }
}

document
  .getElementById("customButtonCalc")
  .addEventListener("click", toggleCalendar);
document
  .getElementById("customButton")
  .addEventListener("click", toggleCalendar);

const calendarPreview = document.querySelector(".calendar__preview");
function getDefaultDates() {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const formatDate = (date) => date.toISOString().split("T")[0];
  return [formatDate(sevenDaysAgo), formatDate(today)];
}

function updateDateDisplay(selectedDates, dateStr, instance) {
  calendarPreview.classList.toggle("active");
  if (selectedDates.length === 2) {
    const formattedDates = selectedDates.map((date) =>
      instance.formatDate(date, "Y-m-d")
    );
    startDate = formattedDates[0];
    endDate = formattedDates[1];
    setTimeout(() => {
      instance.input.value =
        formattedDates[0] +
        " " +
        '<span class="range-icon"></span>' +
        " " +
        formattedDates[1] +
        " " +
        '<span class="calendar-icon"></span>';
      instance.input.innerHTML = instance.input.value;
    }, 0);
  }
}

let [startDate, endDate] = getDefaultDates();

flatpickr("#dateRangePicker", {
  mode: "range",
  dateFormat: "Y-m-d",
  defaultDate: [startDate, endDate],
  locale: {
    firstDayOfWeek: 7,
    rangeSeparator: ' <span class="range-icon"></span> ',
    weekdays: {
      shorthand: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      longhand: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
  },
  showMonths: 2,
  shorthandCurrentMonth: true,
  onValueUpdate: function (selectedDates, dateStr, instance) {
    updateDateDisplay(selectedDates, dateStr, instance);
    getTableData(getAllSelectedValues());
  },
  onReady: function (selectedDates, dateStr, instance) {
    instance.jumpToDate(new Date());
    updateDateDisplay(selectedDates, dateStr, instance);
    getTableData(getAllSelectedValues());
  },
});

document.querySelector(".flatpickr-prev-month").innerHTML = "";
document.querySelector(".flatpickr-next-month").innerHTML = "";

document.querySelectorAll(".flex-button").forEach((button) => {
  button.addEventListener("click", function () {
    document
      .querySelectorAll(".flex-button")
      .forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
  });
});


let x9p4m_availableCoins = {
  1: ["Спот", "Кросс-маржа", "Пополнения", "Фьючерсы USDⓈ-M ", "Фьючерсы COIN-M", "Изолированная маржа", "Earn", "P2P-аккаунт", "Пул", "Опционы"],
  2: [],
  // 3: [
  //   { name: "10000BTC", image: "../../../../../assets/img/coin5.png", description: "10000*Bitcoin" },
  //   { name: "11000ETH", image: "../../../../../assets/img/coin6.png", description: "11000*Ethereum" },
  //   { name: "12000BTC", image: "../../../../../assets/img/coin7.png", description: "12000*Bitcoin" },
  //   { name: "13000ETH", image: "../../../../../assets/img/coin8.png", description: "13000*Ethereum" }
  // ]
}
// Initialize coin data with all coins as default
let k7v2n_coinData = { 1: [], 2: [], 3: [] };

// Function to initialize default selections
function initializeCoinData(id) {
  if (x9p4m_availableCoins[id] && k7v2n_coinData[id].length === 0) {
    k7v2n_coinData[id] = [...x9p4m_availableCoins[id]]; // Copy all coins as default
  }
}

function q5t8r_renderCoinList(id) {
  // Initialize default selections
  initializeCoinData(id);

  const coins = x9p4m_availableCoins[id] || [];
  const isAllSelected = k7v2n_coinData[id].length === coins.length;

  let listHtml = `
        ${x9p4m_availableCoins[id].length ? `
            <li onclick="j3m9k_toggleSelectAll(${id})">
                <div class="v1r9t_checkIcon ${isAllSelected ? "active" : ""}">
                    <svg fill="BasicBg" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" class="x3m6w_svgCheck">
                        <path d="M19.357 4.687L9.301 14.743l-4.656-4.657-3.03 3.031L9.3 20.804 22.388 7.717l-3.03-3.03z" fill="currentColor"></path>
                    </svg>
                </div>
                Все
            </li>` : ""}
    `;

  listHtml += coins.map((coin) => {
    const coinName = typeof coin === "string" ? coin : coin.name;
    const isChecked = k7v2n_coinData[id].includes(coin);

    return `
            <li onclick="p8n2z_updateSelection(${id}, '${coinName}')">
                <div class="v1r9t_checkIcon ${isChecked ? "active" : ""}">
                    <svg fill="BasicBg" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" class="x3m6w_svgCheck">
                        <path d="M19.357 4.687L9.301 14.743l-4.656-4.657-3.03 3.031L9.3 20.804 22.388 7.717l-3.03-3.03z" fill="currentColor"></path>
                    </svg>
                </div>
                ${coinName}
                ${typeof coin === "object" ? `
                    <img src="${coin.image}" alt="${coin.name}" />
                    <span>${coin.description}</span>
                    <p>${coin.description}</p>
                ` : ""}
            </li>
        `;
  }).join("");

  document.getElementById(`c4v8p_coinList-${id}`).innerHTML = listHtml;
}

// Example: Call q5t8r_renderCoinList(1) to render with default selections

// // Initialize coin data with a complex name
// let k7v2n_coinData = { 1: [], 2: [], 3: [] };

// function q5t8r_renderCoinList(id) {
//   const coins = x9p4m_availableCoins[id] || [];
//   const isAllSelected = k7v2n_coinData[id].length === coins.length;

//   let listHtml = `
//         ${x9p4m_availableCoins[id].length ? `
//             <li onclick="j3m9k_toggleSelectAll(${id})">
//                 <div class="v1r9t_checkIcon ${isAllSelected ? "active" : ""}">
//                     <svg fill="BasicBg" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" class="x3m6w_svgCheck">
//                         <path d="M19.357 4.687L9.301 14.743l-4.656-4.657-3.03 3.031L9.3 20.804 22.388 7.717l-3.03-3.03z" fill="currentColor"></path>
//                     </svg>
//                 </div>
//                 Все
//             </li>` : ""}
//     `;

//   listHtml += coins.map((coin) => {
//     const coinName = typeof coin === "string" ? coin : coin.name;
//     const isChecked = k7v2n_coinData[id].includes(coin);

//     return `
//             <li onclick="p8n2z_updateSelection(${id}, '${coin}')">
//                 <div class="v1r9t_checkIcon ${isChecked ? "active" : ""}">
//                     <svg fill="BasicBg" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" class="x3m6w_svgCheck">
//                         <path d="M19.357 4.687L9.301 14.743l-4.656-4.657-3.03 3.031L9.3 20.804 22.388 7.717l-3.03-3.03z" fill="currentColor"></path>
//                     </svg>
//                 </div>
//                 ${coinName}
//                 ${typeof coin === "object" ? `
//                     <img src="${coin.image}" alt="${coin.name}" />
//                     <span>${coin.description}</span>
//                     <p>${coin.description}</p>
//                 ` : ""}
//             </li>
//         `;
//   }).join("");

//   document.getElementById(`c4v8p_coinList-${id}`).innerHTML = listHtml;
// }

function h4k6w_toggleModal(id) {
  const ClossModalInT = document.getElementById('toggleOut');

  const modalD = document.getElementById(`f2r5m_modal-${id}`);
  const bg = document.getElementById("u8k2p_bgOverlay");
  const container = document.getElementById(`w1n4j_container-${id}`);

  if (modalD.classList.contains("active")) {
    modalD.classList.remove("active");
    bg.classList.remove("active");
    container.classList.remove("active");
  } else {
    modalD.classList.add("active");
    bg.classList.add("active");
    container.classList.add("active");
    q5t8r_renderCoinList(id);
  }

  ClossModalInT?.addEventListener('click', () => {
    container.classList.remove("active");

    modalD.classList.remove("active");

  })
}

function j3m9k_toggleSelectAll(id) {
  if (k7v2n_coinData[id].length === x9p4m_availableCoins[id].length) {
    k7v2n_coinData[id] = [];
  } else {
    k7v2n_coinData[id] = [...x9p4m_availableCoins[id]];
  }
  q5t8r_renderCoinList(id);
  r6t9v_updateSelectedText(id);
}

function p8n2z_updateSelection(id, coin) {
  const coinIndex = k7v2n_coinData[id].indexOf(coin);
  if (coinIndex === -1) {
    k7v2n_coinData[id].push(coin);
  } else {
    k7v2n_coinData[id].splice(coinIndex, 1);
  }
  q5t8r_renderCoinList(id);
  r6t9v_updateSelectedText(id);
}



function r6t9v_updateSelectedText(id) {
  const selectedText = document.getElementById(`y6t3k_selectedText-${id}`);
  selectedText.innerHTML = ""; // Clear previous content

  if (k7v2n_coinData[id].length === 0) {
    selectedText.innerText = "Выберите...";
  } else if (k7v2n_coinData[id].length === x9p4m_availableCoins[id].length) {

    selectedText.innerText = "Все";

  } else {
    // Wrap each selected coin in a span with a specific class
    const styledCoins = k7v2n_coinData[id].map(coin => {
      const span = document.createElement("span");
      span.classList.add("g4m9x_selectedCoin"); // Complex class name for styling
      span.innerText = coin;
      return span.outerHTML;
    }).join("  "); // Join with comma and space
    selectedText.innerHTML = styledCoins;
  }
}

function l9q7z_filterCoins(id, input) {
  const filter = input.value.toLowerCase();
  const coinList = document.getElementById(`c4v8p_coinList-${id}`);
  const listItems = coinList.querySelectorAll("li:not(:first-child)");
  listItems.forEach((li) => {
    const coinText = li.textContent.toLowerCase();
    li.style.display = coinText.includes(filter) ? "" : "none";
  });
}

// Add click event listeners
document.querySelectorAll(".p4j6w_selectBox").forEach((box) => {
  box?.addEventListener("click", () => {
    const id = box.id.split("-")[1];
    h4k6w_toggleModal(id);
  });
});

// Close modals when clicking outside
document.getElementById("u8k2p_bgOverlay")?.addEventListener("click", () => {
  document.querySelectorAll(".h6g9d_modal.active")?.forEach((modal) => {
    modal.classList.remove("active");
  });
  document.querySelectorAll(".p4j6w_selectBox.active").forEach((box) => {
    box.classList.remove("active");
  });
  document.getElementById("u8k2p_bgOverlay").classList.remove("active");
});





// ==============================================

function filterCoins(id, input) {
  let filter = input.value.toLowerCase();
  let coinList = document.getElementById(`coin-list-${id}`);
  let listItems = coinList.querySelectorAll("li");
  listItems.forEach((li) => {
    let coinText = li.textContent || li.innerText;
    li.style.display = coinText.toLowerCase().includes(filter) ? "" : "none";
  });
}

async function fetchTransactions() {
  try {
    const api = `${SERVER_URL}/order/transaction-history/export-transaction-records?user_id=1`;
    const response = await fetch(api);
    const data = await response.json();


    loadTransactions(data);
  } catch (error) {
    console.error('Xatolik yuz berdi:', error);
  } finally {
    document.getElementById('loader').style.display = 'none';
  }
}

function loadTransactions(transactions = []) {
  const tableBody = document.getElementById("transactionTableBody");
  const tabLenght = document.getElementById("tabLenght");
  tableBody.innerHTML = ""; // Oldingi ma'lumotlarni tozalash
  tabLenght.innerText = transactions.length + "/15"; // Oldingi ma'lumotlarni tozalash

  if (transactions.length === 0) {
    tableBody.innerHTML = `
      <tr class="bn-web-table-placeholder">
        <td colspan="3" class="bn-web-table-cell table-cells">
          <div class="nodata-inTabel">
            <svg class="bn-svg" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.5" d="M84 28H64V8l20 20z" fill="#AEB4BC"></path>
              <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M24 8h40v20h20v60H24V8zm10 30h40v4H34v-4zm40 8H34v4h40v-4zm-40 8h40v4H34v-4z" fill="#AEB4BC"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M22.137 64.105c7.828 5.781 18.916 5.127 26.005-1.963 7.81-7.81 7.81-20.474 0-28.284-7.81-7.81-20.474-7.81-28.284 0-7.09 7.09-7.744 18.177-1.964 26.005l-14.3 14.3 4.243 4.243 14.3-14.3zM43.9 57.9c-5.467 5.468-14.331 5.468-19.799 0-5.467-5.467-5.467-14.331 0-19.799 5.468-5.467 14.332-5.467 19.8 0 5.467 5.468 5.467 14.332 0 19.8z" fill="#AEB4BC"></path>
            </svg>
            <div class="bodymt-4xs">No records</div>
          </div>
        </td>
      </tr>
    `;
    return;
  }
  // <td data-label="Время экспорта">${tran.time}</td>
  //     <td data-label="Дата (UTC+0)">${tran.duration}</td>
  //     <td data-label="Статус" class="bn-web-table-cell">
  //       <div class="bn-flexs-el">
  //         <div class="text-font-medium">${tran.status}</div>
  //         <a href="${tran.downloadLink}" class="typography-Btn_link3 text-t-TextLink hover:text-primaryHover text-[12px] font-medium leading-[18px] underline" target="_blank" download="Binance-Transaction Records Report.zip">Загрузить</a>
  //       </div>
  //     </td>

  transactions.forEach((tran) => {
    const row = document.createElement("tr");
    row.classList.add("modal-tab-row");

    // dispatch_time ni Date ob'ektiga aylantirish
    const dispatchTime = new Date(tran.dispatch_time);
    const currentTime = new Date();
    const timeDiff = (currentTime - dispatchTime) / (1000 * 60 * 60); // Soatlar soni
    const isExpired = timeDiff > 24; // 24 soatdan oshsa

    // Status holatini aniqlash
    const statusContent = isExpired
      ? `<div class="text-font-expired">Истек</div>`
      : `
        <div class="bn-flexs-el">
          <div class="text-font-medium">Готова</div>
          <a href="#" class="typography-Btn_link3 text-t-TextLink hover:text-primaryHover text-[12px] font-medium leading-[18px] underline" onclick="downloadTransaction(${tran.etr_id})">Загрузить</a>
        </div>
      `;

    row.innerHTML = `
      <td data-label="Время экспорта">${tran.dispatch_time}</td>
      <td data-label="Дата (UTC+0)">${tran.discharge_period}</td>
      <td data-label="Статус" class="bn-web-table-cell">${statusContent}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Yuklab olish funksiyasi
async function downloadTransaction(etr_id) {
  try {
    const API = `${SERVER_URL}/order/transaction-history/document-export-transaction-records?etr_id=${etr_id}`;
    const response = await fetch(API, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    // Faylni blob sifatida olish
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Binance-Transaction Records Report.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url); // Resurslarni tozalash
  } catch (err) {
    console.error("Error downloading transaction:", err);
  }
}

window.onload = fetchTransactions;

document.addEventListener("DOMContentLoaded", function () {
  let tabs = document.querySelectorAll(".bn-tab__default");
  let contentBoxes = document.querySelectorAll(".content-box");

  const tooltipButton = document.querySelector(".bn-tooltips-ele");
  const modal = document.getElementById("export-modal");

  tooltipButton.addEventListener("mouseover", function () {
    modal.classList.add("active");
  });

  tooltipButton.addEventListener("mouseleave", function (event) {
    if (!modal.contains(event.relatedTarget)) {
      modal.classList.remove("active");
    }
  });

  modal.addEventListener("mouseleave", function () {
    modal.classList.remove("active");
  });

  const btnOpenModal = document.querySelector(
    "#btn-ExportButton-onExportTransactionRecords"
  );
  const btnOpenModalSecond = document.querySelector(
    "#btn-ExportButton-ExportF-handleClick"
  );
  const mainModal = document.getElementById("mainModal");
  const secondModal = document.getElementById("secondModal");
  const setOpen_false = document.getElementById(
    "btn-ModalPcDrawerMobile-setOpenFa"
  );
  const setOpen_falseSecond = document.getElementById(
    "modalDrawerMobile-setOpen-false"
  );

  btnOpenModal.addEventListener("click", function (event) {
    event.stopPropagation();
    mainModal.classList.toggle("active");
    document.body.style.overflow = "hidden";
  });

  // document.addEventListener("click", function (event) {
  //   if (
  //     !btnOpenModal.contains(event.target) &&
  //     !mainModal.contains(event.target)
  //   ) {
  //     mainModal.classList.remove("active");
  //     document.body.style.overflow = "";
  //   }
  // });

  setOpen_false.addEventListener("click", function () {
    mainModal.style.display = "none";
  });

  btnOpenModalSecond.addEventListener("click", function (event) {
    event.stopPropagation();
    secondModal.classList.toggle("active");
    document.body.style.overflow = "hidden";
  });

  document.addEventListener("click", function (event) {
    if (
      !btnOpenModalSecond.contains(event.target) &&
      !secondModal.contains(event.target)
    ) {
      secondModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  setOpen_falseSecond.addEventListener("click", function () {
    secondModal.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".section-tex-box button");
  if (buttons.length > 0) {
    buttons[0].classList.add("active");
  }
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });
});

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

async function getTableData(selectedValues = {}, isPaginationChange = false) {
  const today = new Date();
  const formatDate = (date) => date.toISOString().split("T")[0];

  // Get startDate and endDate from sendData
  const { startDate, endDate } = sendData();
  let start_date, end_date;

  // If startDate and endDate exist from calendar, use them directly
  if (startDate && endDate) {
    start_date = startDate;
    end_date = endDate;
  } else {
    // Otherwise use the switch case logic
    switch (selectedValues.selectV2) {
      case "Последние 7 дней":
        end_date = formatDate(today);
        start_date = formatDate(new Date(today.setDate(today.getDate() - 7)));
        break;
      case "Последние 90 дней":
        end_date = formatDate(today);
        start_date = formatDate(new Date(today.setDate(today.getDate() - 90)));
        break;
      case "Настроить":
        if (selectedValues.dateRange) {
          [start_date, end_date] = selectedValues.dateRange.split(" - ");
        }
        break;
      default: // Последние 30 дней
        end_date = formatDate(today);
        start_date = formatDate(new Date(today.setDate(today.getDate() - 30)));
    }
  }

  let tx_type;

  if (selectedValues.selectV4 === "Вывод") {
    tx_type = "out";
  } else if (selectedValues.selectV4 === "Все") {
    tx_type = "all";
  } else {
    tx_type = "in";
  }
  const page_size = 10;

  const API = `${SERVER_URL}/order/transaction-history/crypto`;
  const requestBody = {
    start_date,
    end_date,
    tx_type,
    language: "ru",
    pagination: {
      page_number: current_page,
      page_size,
    },
  };

  if (!isPaginationChange) {
    document.getElementById("loading").style.display = "flex";
  }

  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    total_pages = Math.ceil(data.total_count / page_size) || 1;

    loadTableData(data, selectedValues.selectV4);
    loadTransactions();

    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return null;
  } finally {
    if (!isPaginationChange) {
      document.getElementById("loading").style.display = "none";
    }
  }
}

// Modified sendData function to properly return values
function sendData() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  modal.style.display = "none";

  // Return object only if both dates exist
  if (startDate && endDate) {
    return { startDate, endDate };
  }
  return {}; // Return empty object if dates are not available
}

function openToolModal(transaction) {
  const date = new Date(transaction.time);
  // Formatni moslashtiramiz: YYYY-MM-DD HH:MM
  const formattedTime = date.toISOString().slice(0, 16).replace('T', ' ');
  document.getElementById("modalTime").innerText = formattedTime;
  document.getElementById("modalTransfer").innerText = transaction.currency;
  document.getElementById("modalWallet").innerText = transaction.amount;

  const truncatedRecipient = `${transaction.address.slice(
    0,
    6
  )}...${transaction.address.slice(-6)}`;
  const truncatedTxid = `${transaction.tx_id.slice(
    0,
    6
  )}...${transaction.tx_id.slice(-6)}`;

  document.getElementById("modalRecipient").innerHTML = `
  ${truncatedRecipient}
  <div class="iconsvgCopy">
    <span onclick="openTronscan('${transaction.address}', event)">...</span>
    <span onclick="copyToClipboard('Recipient: ${transaction.address}', event)">...</span>
  </div>
  `;

  document.getElementById("modalTxID").innerHTML = `
  ${truncatedTxid}
  <div class="iconsvgCopy">
    <span onclick="openTronscan('${transaction.tx_id}', event)">...</span>
    <span onclick="copyToClipboard('TxID: ${transaction.tx_id}', event)">...</span>
  </div>
  `;

  document.getElementById("transactionModal").style.display = "block";
}

function openModalWiw(transaction) {
  // transaction.time ni Date objektiga aylantiramiz
  const date = new Date(transaction.time);
  // Formatni moslashtiramiz: YYYY-MM-DD HH:MM
  const formattedTime = date.toISOString().slice(0, 16).replace('T', ' ');
  document.getElementById("spotWallettMod").innerText = transaction.wallet;
  document.getElementById("usdtMod").innerText = transaction.cryptocurrency;
  document.getElementById("modalWallet").innerText = transaction.wallet;
  document.getElementById("timeMod1").innerText = formattedTime;
  document.getElementById("timeMod2").innerText = formattedTime;
  document.getElementById("timeMod3").innerText = formattedTime;
  document.getElementById("timeMod4").innerText = formattedTime;
  document.getElementById("withdrawAmountMod").innerText = transaction.amount;
  document.getElementById("statusMod").innerText = transaction.status;
  document.getElementById("networkFeeMod").innerText = transaction.networkFee || "1";
  document.getElementById("networkMod").innerText = transaction.network;


  const truncatedRecipient = `${transaction.address.slice(
    0,
    6
  )}...${transaction.address.slice(-6)}`;
  const truncatedTxid = `${transaction.tx_id.slice(
    0,
    6
  )}...${transaction.tx_id.slice(-6)}`;
  document.getElementById("addressMod").innerHTML = `
  ${truncatedRecipient}
    <div style="margin-left:8px" class="iconsvgCopy">
      <span class="icon" onclick="openTronscan('${transaction.tx_url}', event)">
              <svg class="bn-svg-icon-small-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.379 8.5l-1.94 1.94a6.45 6.45 0 109.122 9.12l1.939-1.939-2.121-2.121-1.94 1.94a3.45 3.45 0 01-4.878-4.88L8.5 10.622 6.379 8.5zM12.56 6.56a3.45 3.45 0 014.88 4.88l-1.94 1.939 2.121 2.121 1.94-1.94a6.45 6.45 0 10-9.122-9.12L8.5 6.378 10.621 8.5l1.94-1.94z" fill="currentColor"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.81 16.31l-2.12-2.12 6.5-6.5 2.12 2.12-6.5 6.5z" fill="currentColor"></path>
              </svg>
      </span>
      <span class="icon" onclick="copyToClipboard('Recipient: ${transaction.address}', event)">
              <svg class="bn-svg-icon-small-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3h11v13h-3V6H9V3zM4 8v13h11V8.02L4 8z" fill="currentColor"></path>
              </svg>
      </span>
  </div>

  
  `;
  document.getElementById("tx_idMod").innerHTML = `
  ${truncatedTxid}
    <div  style="margin-left:8px" class="iconsvgCopy">
    <span class="icon" onclick="openTronscan('${transaction.wallet_url}', event)">
              <svg class="bn-svg-icon-small-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.379 8.5l-1.94 1.94a6.45 6.45 0 109.122 9.12l1.939-1.939-2.121-2.121-1.94 1.94a3.45 3.45 0 01-4.878-4.88L8.5 10.622 6.379 8.5zM12.56 6.56a3.45 3.45 0 014.88 4.88l-1.94 1.939 2.121 2.121 1.94-1.94a6.45 6.45 0 10-9.122-9.12L8.5 6.378 10.621 8.5l1.94-1.94z" fill="currentColor"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.81 16.31l-2.12-2.12 6.5-6.5 2.12 2.12-6.5 6.5z" fill="currentColor"></path>
              </svg>
            </span>
            <span class="icon" onclick="copyToClipboard('TxID: ${transaction.tx_id}', event)">
              <svg class="bn-svg-icon-small-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3h11v13h-3V6H9V3zM4 8v13h11V8.02L4 8z" fill="currentColor"></path>
              </svg>
            </span>
  </div>
  `;;

  document.querySelector(".bnModalWrapWiwBg").style.display = "block"
}

function closeModalWiw() {
  document.querySelector(".bnModalWrapWiwBg").style.display = "none";
}


function myModalOpen(transaction) {
  const date = new Date(transaction.time);
  // Formatni moslashtiramiz: YYYY-MM-DD HH:MM
  const formattedTime = date.toISOString().slice(0, 16).replace('T', ' ');
  document.getElementById("modalTime").innerText = formattedTime;
  document.getElementById("modalTransfer").innerText = transaction.cryptocurrency;
  document.getElementById("modalWallet").innerText = transaction.amount;
  document.getElementById("modalAmount").innerText = transaction.network;
  // Olishuvchini va TXIDni kesib modalga qo'yish
  const truncatedRecipient = `${transaction.address.slice(
    0,
    6
  )}...${transaction.address.slice(-6)}`;
  const truncatedTxid = `${transaction.tx_id.slice(
    0,
    6
  )}...${transaction.tx_id.slice(-6)}`;

  // document.getElementById("modalRecipient").innerHTML = `${truncatedRecipient} <span class="transaction-copy-icon" onclick="copyToClipboard('${transaction.address}', event)">📋</span>`;
  document.getElementById(
    "modalRecipient"
  ).innerHTML = `${truncatedRecipient} <div class="iconsvgCopy">
    <span onclick="openTronscan('${transaction.tx_url}', event)">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.379 8.5l-1.94 1.94a6.45 6.45 0 109.122 9.12l1.939-1.939-2.121-2.121-1.94 1.94a3.45 3.45 0 01-4.878-4.88L8.5 10.622 6.379 8.5zM12.56 6.56a3.45 3.45 0 014.88 4.88l-1.94 1.939 2.121 2.121 1.94-1.94a6.45 6.45 0 10-9.122-9.12L8.5 6.378 10.621 8.5l1.94-1.94z" fill="currentColor"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.81 16.31l-2.12-2.12 6.5-6.5 2.12 2.12-6.5 6.5z" fill="currentColor"></path>
      </svg>
    </span>
    <span onclick="copyToClipboard('Recipient: ${transaction.address}', event)">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3h11v13h-3V6H9V3zM4 8v13h11V8.02L4 8z" fill="currentColor"></path>
      </svg>
    </span>
  </div>
  `;
  document.getElementById(
    "modalTxID"
  ).innerHTML = `${truncatedTxid} <div class="iconsvgCopy">
    <span onclick="openTronscan('${transaction.tx_url}', event)">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.379 8.5l-1.94 1.94a6.45 6.45 0 109.122 9.12l1.939-1.939-2.121-2.121-1.94 1.94a3.45 3.45 0 01-4.878-4.88L8.5 10.622 6.379 8.5zM12.56 6.56a3.45 3.45 0 014.88 4.88l-1.94 1.939 2.121 2.121 1.94-1.94a6.45 6.45 0 10-9.122-9.12L8.5 6.378 10.621 8.5l1.94-1.94z" fill="currentColor"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.81 16.31l-2.12-2.12 6.5-6.5 2.12 2.12-6.5 6.5z" fill="currentColor"></path>
      </svg>
    </span>
    <span onclick="copyToClipboard('TxID: ${transaction.tx_id}', event)">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3h11v13h-3V6H9V3zM4 8v13h11V8.02L4 8z" fill="currentColor"></path>
      </svg>
    </span>
  </div>
  `;
  document.getElementById("transactionModal").style.display = "block";
}

function closeModalLe() {
  document.getElementById("transactionModal").style.display = "none";
}

// Clipboardga nusxalash va modalni to‘xtatish
function copyToClipboard(text, event) {
  event.stopPropagation(); // Modal ochilmasligi uchun
  navigator.clipboard.writeText(text);

  navigator.clipboard
    .writeText(text)
    .then(() => {
      const iconSpan = event.target.closest("span");
      if (!iconSpan) return;

      const originalIcon = iconSpan.innerHTML;
      iconSpan.innerHTML = `
  <svg class="bn-svg-icon-small-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
  </svg>
  `;

      setTimeout(() => {
        iconSpan.innerHTML = originalIcon;
      }, 2000);
    })
    .catch((err) => console.error("Nusxalashda xatolik:", err));
}

function loadTableData(data, wiw) {
  const tableBody = document.getElementById("tableBody");
  const tableNoData = document.getElementById("transactionNoData");

  tableBody.innerHTML = "";
  tableNoData.innerHTML = "";

  if (data.length === 0) {
    tableNoData.innerHTML = `
        <div class="flex_flex-col">
          <svg class="bn-svg text-[72px]" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" d="M84 28H64V8l20 20z" fill="#AEB4BC"></path>
            <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd"
              d="M24 8h40v20h20v60H24V8zm10 30h40v4H34v-4zm40 8H34v4h40v-4zm-40 8h40v4H34v-4z" fill="#AEB4BC"></path>
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M22.137 64.105c7.828 5.781 18.916 5.127 26.005-1.963 7.81-7.81 7.81-20.474 0-28.284-7.81-7.81-20.474-7.81-28.284 0-7.09 7.09-7.744 18.177-1.964 26.005l-14.3 14.3 4.243 4.243 14.3-14.3zM43.9 57.9c-5.467 5.468-14.331 5.468-19.799 0-5.467-5.467-5.467-14.331 0-19.799 5.468-5.467 14.332-5.467 19.8 0 5.467 5.468 5.467 14.332 0 19.8z"
              fill="#AEB4BC"></path>
          </svg>
          <div class="body3 mt-4xs pc:mt-2xs text-t-third">Нет записей.</div>
        </div>
    `;
  } else {
    data.forEach((transaction) => {
      const row = document.createElement("tr");
      row.classList.add("table-items");
      const truncatedRecipient = `${transaction.address.slice(
        0,
        6
      )}...${transaction.address.slice(-4)}`;
      const truncatedTxid = `${transaction.tx_id.slice(
        0,
        6
      )}...${transaction.tx_id.slice(-4)}`;

      // transaction.time ni Date objektiga aylantiramiz
      const date = new Date(transaction.time);
      // Formatni moslashtiramiz: YYYY-MM-DD HH:MM
      const formattedTime = date.toISOString().slice(0, 16).replace('T', ' ');

      // Check screen size using matchMedia
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      if (isMobile) {
        row.innerHTML = `
          <td>${transaction.cryptocurrency}</td>
          <td data-label="Время">${formattedTime}</td>
          <td data-label="Перевод">${transaction.tx_type}</td>
          <td data-label="Сумма">${transaction.amount}</td>
          <td data-label="Адресат">
            <p class="tooltip">
              ${truncatedRecipient} 
              <span class="tooltiptext">${transaction.address}</span>
            </p>
            <div>
              <span class="icon" onclick="openTronscan('${transaction.tx_url}', event)">
                <svg class="bn-svg-icon-small-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.379 8.5l-1.94 1.94a6.45 6.45 0 109.122 9.12l1.939-1.939-2.121-2.121-1.94 1.94a3.45 3.45 0 01-4.878-4.88L8.5 10.622 6.379 8.5zM12.56 6.56a3.45 3.45 0 014.88 4.88l-1.94 1.939 2.121 2.121 1.94-1.94a6.45 6.45 0 10-9.122-9.12L8.5 6.378 10.621 8.5l1.94-1.94z" fill="currentColor"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.81 16.31l-2.12-2.12 6.5-6.5 2.12 2.12-6.5 6.5z" fill="currentColor"></path>
                </svg>
              </span>
              <span class="icon" onclick="copyToClipboard('Recipient: ${transaction.address}', event)">
                <svg class="bn-svg-icon-small-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3h11v13h-3V6H9V3zM4 8v13h11V8.02L4 8z" fill="currentColor"></path>
                </svg>
              </span>
            </div>
          </td>
          <td data-label="TxID">
            <p class="tooltip">${truncatedTxid}
              <span class="tooltiptext">${transaction.tx_id}</span>
            </p>
            <div>
              <span class="icon" onclick="openTronscan('${transaction.wallet_url}', event)">
                <svg class="bn-svg-icon-small-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.379 8.5l-1.94 1.94a6.45 6.45 0 109.122 9.12l1.939-1.939-2.121-2.121-1.94 1.94a3.45 3.45 0 01-4.878-4.88L8.5 10.622 6.379 8.5zM12.56 6.56a3.45 3.45 0 014.88 4.88l-1.94 1.939 2.121 2.121 1.94-1.94a6.45 6.45 0 10-9.122-9.12L8.5 6.378 10.621 8.5l1.94-1.94z" fill="currentColor"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.81 16.31l-2.12-2.12 6.5-6.5 2.12 2.12-6.5 6.5z" fill="currentColor"></path>
                </svg>
              </span>
              <span class="icon" onclick="copyToClipboard('TxID: ${transaction.tx_id}', event)">
                <svg class="bn-svg-icon-small-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3h11v13h-3V6H9V3zM4 8v13h11V8.02L4 8z" fill="currentColor"></path>
                </svg>
              </span>
            </div>
          </td>
          <td data-label="Кошелек для ввода">${transaction.wallet}</td>
          <td class="colorSuccess" data-label="Статус">${transaction.status}</td>
       `;
      } else {
        row.innerHTML = `
          <td data-label="Время">${formattedTime}</td>
          <td data-label="Перевод">${transaction.tx_type}</td>
          <td data-label="Кошелек для ввода">${transaction.wallet}</td>
          <td data-label="Криптовалюта">${transaction.cryptocurrency}</td>
          <td data-label="Сумма">${transaction.amount}</td>
          <td data-label="Адресат">
            <p class="tooltip">
              ${truncatedRecipient} 
              <span class="tooltiptext">${transaction.address}</span>
            </p>
            <div>
              <span class="icon" onclick="openTronscan('${transaction.tx_url}', event)">
                <svg class="bn-svg-icon-small-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.379 8.5l-1.94 1.94a6.45 6.45 0 109.122 9.12l1.939-1.939-2.121-2.121-1.94 1.94a3.45 3.45 0 01-4.878-4.88L8.5 10.622 6.379 8.5zM12.56 6.56a3.45 3.45 0 014.88 4.88l-1.94 1.939 2.121 2.121 1.94-1.94a6.45 6.45 0 10-9.122-9.12L8.5 6.378 10.621 8.5l1.94-1.94z" fill="currentColor"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.81 16.31l-2.12-2.12 6.5-6.5 2.12 2.12-6.5 6.5z" fill="currentColor"></path>
                </svg>
              </span>
              <span class="icon" onclick="copyToClipboard('Recipient: ${transaction.address}', event)">
                <svg class="bn-svg-icon-small-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3h11v13h-3V6H9V3zM4 8v13h11V8.02L4 8z" fill="currentColor"></path>
                </svg>
              </span>
            </div>
          </td>
          <td data-label="TxID">
            <p class="tooltip">${truncatedTxid}
              <span class="tooltiptext">${transaction.tx_id}</span>
            </p>
            <div>
              <span class="icon" onclick="openTronscan('${transaction.wallet_url}', event)">
                <svg class="bn-svg-icon-small-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.379 8.5l-1.94 1.94a6.45 6.45 0 109.122 9.12l1.939-1.939-2.121-2.121-1.94 1.94a3.45 3.45 0 01-4.878-4.88L8.5 10.622 6.379 8.5zM12.56 6.56a3.45 3.45 0 014.88 4.88l-1.94 1.939 2.121 2.121 1.94-1.94a6.45 6.45 0 10-9.122-9.12L8.5 6.378 10.621 8.5l1.94-1.94z" fill="currentColor"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.81 16.31l-2.12-2.12 6.5-6.5 2.12 2.12-6.5 6.5z" fill="currentColor"></path>
                </svg>
              </span>
              <span class="icon" onclick="copyToClipboard('TxID: ${transaction.tx_id}', event)">
                <svg class="bn-svg-icon-small-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3h11v13h-3V6H9V3zM4 8v13h11V8.02L4 8z" fill="currentColor"></path>
                </svg>
              </span>
            </div>
          </td>
          <td class="colorSuccess" data-label="Статус">${transaction.status}</td>
       `;
      }

      if (wiw === "Вывод") {
        row.addEventListener("click", () => openModalWiw(transaction));
      } else {
        row.addEventListener("click", () => myModalOpen(transaction));
      }

      tableBody.appendChild(row);
    });
  }
}

function openTronscan(transactionId, event) {
  event.stopPropagation(); // Modal ochilmasligini oldini oladi
  const url = `${transactionId}`;
  window.open(url, "_blank"); // Yangi oynada ochish
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
window.onload = fetchTransactions;
// Function to calculate dates based on time range
function calculateDates(timeRange) {
  const now = new Date();
  const endDate = new Date(now);
  let startDate;

  switch (timeRange) {
    case "Последние 24 часа":
      startDate = new Date(now.setHours(now.getHours() - 24));
      break;
    case "2 недели":
      startDate = new Date(now.setDate(now.getDate() - 14));
      break;
    case "1 месяц":
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case "3 месяца":
      startDate = new Date(now.setMonth(now.getMonth() - 3));
      break;
    case "6 месяцев":
      startDate = new Date(now.setMonth(now.getMonth() - 6));
      break;
    default:
      startDate = new Date(); // Default to current date if custom or unknown
  }

  return {
    startDate: startDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
    endDate: endDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
  };
}

// Function to handle export button click and send data to server
async function handleExport() {
  let API =
    SERVER_URL + "/orader/transaction-history/export-deposit-history-excel";

  try {
    // Collect all form data
    const data = collectFormData();

    // Calculate dates based on time range
    const { startDate, endDate } = calculateDates(data.timeRange);

    // Example API call using fetch
    const response = await fetch(API, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start_date: startDate,
        end_date: endDate,
        language: "ru",
      }),
      // wallet: data.wallet,
      // subaccount: data.subaccount,
      // coin: data.coin,
      // ...(data.customDateRange && { customDateRange: data.customDateRange })
    });
    if (response.ok) {
      // Faylni yuklab olish
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "report.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      console.log("Excel fayli muvaffaqiyatli yuklandi.");
    } else {
      console.error("Xatolik yuz berdi:", response.statusText);
    }

    const result = await response.json();
    console.log("Export successful:", result);

    // Update UI if needed
    updateTransactionTable(result);
  } catch (error) {
    console.error("Error during export:", error);
    // Handle error (show message to user, etc.)
  }
}
// Function to update transaction table
function updateTransactionTable(data) {
  const tableBody = document.getElementById("transactionTableBody");
  const row = document.createElement("tr");
  row.innerHTML = `
        <td class="bn-web-table-cell">${new Date().toLocaleString()}</td>
        <td class="bn-web-table-cell">${data.date || "N/A"}</td>
        <td class="bn-web-table-cell">${data.status || "Processing"}</td>
    `;
  tableBody.prepend(row);
}

// ==========================================================
// Экспортировать историю ввода средств

let selectedCoin = null;
let startDates = null;
let endDates = null;
let fileFormat = "excel";

const fileTypeButtons = document.querySelectorAll(".section-tex-box button");

fileTypeButtons[0].onclick = function () {
  fileFormat = "excel";
  handleExport();
};

fileTypeButtons[1].onclick = function () {
  fileFormat = "pdf";
  handleExport();
};

function setDateRange(range) {
  const now = new Date();
  startDates = now.toISOString().split("T")[0]; // Сегодняшняя дата как startDate

  switch (range) {
    case "24h":
      endDate = new Date(now - 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      break;
    case "2w":
      endDate = new Date(now - 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      break;
    case "1m":
      endDate = new Date(now - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      break;
    case "3m":
      endDate = new Date(now - 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      break;
    case "6m":
      endDate = new Date(now - 180 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      break;
  }
}

async function exportTransactionHistory() {
  if (!startDate || !endDate) {
    alert("Пожалуйста, выберите временной диапазон");
    return;
  }

  let user_info = JSON.parse(localStorage.getItem("user")) || {};
  let user_id = user_info?.user_id || 0;
  const payload = {
    user: {
      user_id: user_id,
    },
    start_date: startDate,
    end_date: endDate,
  };
  let API =
    SERVER_URL + "/orader/transaction-history/export-withdrawal-history-excel";
  let API2 =
    SERVER_URL + "/orader/transaction-history/export-withdrawal-history-pdf";
  try {
    const response = await fetch(fileFormat === "excel" ? API : API2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transaction_history_${fileFormat === "excel" ? "xlsx" : "pdf"
      }`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url); // Освобождаем память
  } catch (error) {
    console.error("Ошибка при экспорте:", error);
    alert("Произошла ошибка при экспорте файла. Пожалуйста, попробуйте снова.");
  }
}
