const orderTypes = [
  {
    id: "orderType1",
    options: [
      "Deposit",
      "Auto deduction",
      "Auto funding",
      "Arrears repayment",
      "Auto convert",
      "Partners Transfer",
    ],
    label: "Type",
    defaultValue: "Deposit",
  },


  {
    id: "orderType2",
    options: [
      "Past 7 days",
      "Past 30 days",
      "Past 90 days",
      "Customized",
    ],
    label: "Time",
    defaultValue: "Past 30 days",
  },
  {
    id: "orderType3",
    label: "Coin",
    defaultValue: "All",
    options: [
      {
        label: "ADD",
        image:
          "https://bin.bnbstatic.com/images/20191211/bcd0cdc0-79a0-4972-8b75-5d56bf5d41f2.png",
      },
      {
        label: "ADX",
        image:
          "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20240724/6a2360f1-8ef9-49a4-b428-3db586e50143.png",
      },
      {
        label: "ADXOLD",
        image:
          "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20200821/19ef68ac-be44-4318-a682-5ac4c270e288.png",
      },
      {
        label: "AE",
        image:
          "https://bin.bnbstatic.com/images/20191211/8cde9282-b8d0-458f-bd77-a3f17f7a8775.png",
      },
      {
        label: "AED",
        image:
          "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20231011/90f9a2b8-1bc9-4f07-b83a-591d0bd1a3ea.png",
      },
      {
        label: "AERGO",
        image:
          "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20220329/9584603d-318b-4dea-833f-fccead1b324e.png",
      },
      {
        label: "AEUR",
        image:
          "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20230906/3d050043-18d0-4a21-8007-e12e67a75320.png",
      },
    ],
  },
  {
    id: "orderType4",
    options: ["All", "Completed", "Pending", "Stocks"],
    label: "Status",
    defaultValue: "All",
  },
];

// Helper function to get all current selected valueslet
coinData = {
  1: [],
  2: [],
  3: [],
  4: [],
};
function getAllSelectedValues() {
  const selectedValues = {};
  orderTypes.forEach(({ id }) => {
    const valueElement = document.querySelector(`#${id} .order-select_value`);
    selectedValues[id] = valueElement ? valueElement.textContent : "";
  });
  // Add coin selections
  Object.keys(coinData).forEach((id) => {
    selectedValues[`coinSelection${id}`] = coinData[id];
  });
  // Add date range from calendar
  selectedValues["dateRange"] = `${startDate} - ${endDate}`;
  return selectedValues;
}

function createSelect(id, options, labels, defaultValue) {
  const select = document.getElementById(id);
  const isSearchVisible = id === "orderType3";

  select.innerHTML = `
    <div class="order-select__label">
      <p>${labels}</p>
      <div class="order-select_valueBox">
        <span class="order-select_value">${defaultValue || "Все"}</span>
      </div>
      <div class="order-select_icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path d="M16.5 8.49v2.25L12 15.51l-4.5-4.77V8.49h9z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
    <div class="order-select__list-wrapper">
      ${isSearchVisible
      ? `
        <div class="search-boxInp">
          <div class="search-boxonNav">
            <div class="bn-textField-prefix">
              <svg fill="textDisabled" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="bn-svg-inInp"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 6a5 5 0 110 10 5 5 0 010-10zm0-3a8 8 0 017.021 11.838l3.07 3.07-1.59 1.591-1.591 1.591-3.07-3.07A8 8 0 1111 3z" fill="currentColor"></path></svg>
            </div>
            <input aria-label="Поиск" placeholder="Поиск" oninput="filterOptions('${id}', this.value)" class="bn-textField-input" spellcheck="false" autocomplete="" value="">
          </div>
        </div>
      `
      : ""
    }
      <div class="order-select__list">
        ${options
      .map((opt) => {
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
      })
      .join("")}
      </div>
    </div>
  `;

  const label = select.querySelector(".order-select_value");
  const listWrapper = select.querySelector(".order-select__list-wrapper");
  const optionsList = select.querySelectorAll(".order-select__option");
  const icon = select.querySelector(".order-select_icon");

  label.addEventListener("click", () => {
    document
      .querySelectorAll(".order-select__list-wrapper")
      .forEach((el) => el.classList.remove("open"));
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

  optionsList.forEach((option) => {
    option.addEventListener("click", () => {
      label.firstChild.textContent = option.textContent;
      listWrapper.classList.remove("open");
      icon.classList.remove("rotate");
      updateDefaultValue(id, option.textContent);
      // Trigger getTableData immediately for orderType1 or orderType2
      if (id === "orderType1" || id === "orderType2") {
        getTableData(getAllSelectedValues());
      }
    });
  });
}

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

function updateDefaultValue(id, newValue) {
  const label = document.querySelector(`#${id} .order-select_value`);
  label.textContent = newValue;
  getTableData(getAllSelectedValues());
}

orderTypes.forEach(({ id, options, label, defaultValue }) =>
  createSelect(id, options, label, defaultValue)
);

document.addEventListener("click", (event) => {
  if (!event.target.closest(".order-select")) {
    document
      .querySelectorAll(".order-select__list-wrapper")
      .forEach((el) => el.classList.remove("open"));
    document
      .querySelectorAll(".order-select_icon")
      .forEach((icon) => icon.classList.remove("rotate"));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("customModalSetting");
  const closeModal = document.querySelector(".close-modal");
  const applyButton = document.getElementById("applyDateRange");

  document
    .querySelector("#orderType2 .order-select__list")
    .addEventListener("click", (event) => {
      if (event.target.textContent === "Customized") {
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

let availableCoins = {
  1: ["1000CAT", "2000CHEEMS", "3000CHEEMS"],
  2: [
    "4000DOGE",
    "5000SHIBA",
    "6000DOGE",
    "7000SHIBA",
    "8000DOGE",
    "9000SHIBA",
  ],
  3: ["10000BTC", "11000ETH", "12000BTC", "13000ETH"],
  4: ["20000BTC", "21000ETH", "22000BTC", "23000ETH"],
};

function toggleModal(id) {
  let modal = document.getElementById(`modal-${id}`);
  let bg = document.getElementById("bg");

  if (modal.classList.contains("active")) {
    modal.classList.remove("active");
    bg.classList.remove("active");
  } else {
    modal.classList.add("active");
    bg.classList.add("active");
    renderCoinList(id);
  }
}

function closeModals() {
  let modals = document.querySelectorAll(".modal.active");
  let bg = document.getElementById("bg");
  modals.forEach((modal) => modal.classList.remove("active"));
  bg.classList.remove("active");
}

function renderCoinList(id) {
  let isAllSelected = coinData[id].length === availableCoins[id].length;
  let listHtml = `
    <li onclick="toggleSelectAll(${id})">
      <div class="bn-checkbox-icon ${isAllSelected ? "active" : ""}">
        <svg fill="BasicBg" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" class="bn-svgch">
          <path d="M19.357 4.687L9.301 14.743l-4.656-4.657-3.03 3.031L9.3 20.804 22.388 7.717l-3.03-3.03z" fill="currentColor"></path>
        </svg>
      </div>
      Все
    </li>
  `;
  availableCoins[id].forEach((coin) => {
    let isChecked = coinData[id].includes(coin);
    let activeClass = isChecked ? "active" : "";
    listHtml += `
      <li onclick="updateSelection(${id}, '${coin}')">
        <div class="bn-checkbox-icon ${activeClass}">
          <svg fill="BasicBg" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" class="bn-svgch">
            <path d="M19.357 4.687L9.301 14.743l-4.656-4.657-3.03 3.031L9.3 20.804 22.388 7.717l-3.03-3.03z" fill="currentColor"></path>
          </svg>
        </div>
        ${coin}
      </li>
    `;
  });
  document.getElementById(`coin-list-${id}`).innerHTML = listHtml;
}

function toggleSelectAll(id) {
  if (coinData[id].length === availableCoins[id].length) {
    coinData[id] = [];
  } else {
    coinData[id] = [...availableCoins[id]];
  }
  updateSelectedText(id);
  renderCoinList(id);
  getTableData(getAllSelectedValues());
}

function updateSelection(id, coin) {
  let coinIndex = coinData[id].indexOf(coin);
  if (coinIndex === -1) {
    coinData[id].push(coin);
  } else {
    coinData[id].splice(coinIndex, 1);
  }
  updateSelectedText(id);
  renderCoinList(id);
  getTableData(getAllSelectedValues());
}

function updateSelectedText(id) {
  let selectedText = document.getElementById(`selected-text-${id}`);
  selectedText.innerHTML = "";
  if (coinData[id].length === 0) {
    selectedText.innerText = "Выберите...";
    selectedText.classList.add("text-t-disabled-emp");
    selectedText.classList.remove("text-t-activeAll");
    return;
  }
  if (coinData[id].length === availableCoins[id].length) {
    selectedText.innerText = "Все";
    selectedText.classList.remove("text-t-disabled-emp");
    selectedText.classList.add("text-t-activeAll");
    return;
  }
  let displayCoins = coinData[id].slice(0, 3);
  displayCoins.forEach((coin) => {
    let coinSpan = document.createElement("span");
    coinSpan.classList.add("subaccount-text-tex-res");
    coinSpan.innerText = coin;
    selectedText.appendChild(coinSpan);
  });
  if (coinData[id].length > 3) {
    let moreSpan = document.createElement("span");
    moreSpan.classList.add("more-text");
    moreSpan.innerText = ` +${coinData[id].length - 3}`;
    selectedText.appendChild(moreSpan);
  }
  selectedText.classList.remove("text-t-disabled-emp");
  selectedText.classList.add("text-t-active");
}

function filterCoins(id, input) {
  let filter = input.value.toLowerCase();
  let coinList = document.getElementById(`coin-list-${id}`);
  let listItems = coinList.querySelectorAll("li");
  listItems.forEach((li) => {
    let coinText = li.textContent || li.innerText;
    li.style.display = coinText.toLowerCase().includes(filter) ? "" : "none";
  });
}

function loadTransactions() {
  const tableBody = document.getElementById("transactionTableBody");
  tableBody.innerHTML = "";
  if (transactions.length === 0) {
    transactions;
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
  } else {
    transactions.forEach((tran) => {
      const row = document.createElement("tr");
      row.classList.add("modal-tab-row");
      row.innerHTML = `
        <td data-label="Время экспорта">${tran.time}</td>
        <td data-label="Дата (UTC+0)">${tran.duration}</td>
        <td data-label="Статус" class="bn-web-table-cell">
          <div class="bn-flexs-el">
            <div class="text-font-medium">${tran.status}</div>
            <a href="${tran.downloadLink}" class="typography-Btn_link3 text-t-TextLink hover:text-primaryHover text-[12px] font-medium leading-[18px] underline" target="_blank" download="Binance-Transaction Records Report.zip">Загрузить</a>
          </div>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
}

window.onload = function () {
  loadTransactions();
  getTableData(getAllSelectedValues()); // Initial load
};

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
    "btn-ModalPcDrawerMobile-setOpen-false"
  );
  const setOpen_falseSecond = document.getElementById(
    "modalDrawerMobile-setOpen-false"
  );

  btnOpenModal.addEventListener("click", function (event) {
    event.stopPropagation();
    mainModal.classList.toggle("active");
    document.body.style.overflow = "hidden";
  });

  document.addEventListener("click", function (event) {
    if (
      !btnOpenModal.contains(event.target) &&
      !mainModal.contains(event.target)
    ) {
      mainModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

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

  let start_date, end_date;
  switch (selectedValues.orderType2) {
    case "Последние 7 дней":
      end_date = formatDate(today);
      start_date = formatDate(new Date(today.setDate(today.getDate() - 7)));
      break;
    case "Последние 90 дней":
      end_date = formatDate(today);
      start_date = formatDate(new Date(today.setDate(today.getDate() - 90)));
      break;
    case "Customized":
      [start_date, end_date] = selectedValues.dateRange.split(" - ");
      break;
    default: // Последние 30 дней
      end_date = formatDate(today);
      start_date = formatDate(new Date(today.setDate(today.getDate() - 30)));
  }

  const tx_type = selectedValues.orderType1 === "Вывод" ? "out" : "in";
  const page_size = 10;

  const API = `${SERVER_URL}/order/transaction-history/crypto`;
  const requestBody = {
    start_date,
    end_date,
    tx_type,
    language: "en",
    pagination: {
      page_number: current_page,
      page_size,
    },
  };

  // Faqat pagination o'zgarmagan holatda loading ko'rsatamiz
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

    loadTableData(data);
    loadTransactions();

    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return null;
  } finally {
    // Faqat pagination o'zgarmagan holatda loadingni yashiramiz
    if (!isPaginationChange) {
      document.getElementById("loading").style.display = "none";
    }
  }
}


// Sahifa yuklanganda ma'lumotlarni yuklaymiz
document.addEventListener("DOMContentLoaded", () => {
  getTableData();
});


function openToolModal(transaction) {
  document.getElementById("modalTime").innerText = transaction.time;
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
    <span onclick=" openTronscan('${transaction.address}', event)">...</span>
    <span onclick="copyToClipboard('Recipient: ${transaction.address}', event)">...</span>
  </div>
  `;

  document.getElementById("modalTxID").innerHTML = `
  ${truncatedTxid}
  <div class="iconsvgCopy">
    <span onclick=" openTronscan('${transaction.tx_id}', event)">...</span>
    <span onclick="copyToClipboard('TxID: ${transaction.tx_id}', event)">...</span>
  </div>
  `;

  document.getElementById("transactionModal").style.display = "block";
}

function openModal(transaction) {
  document.getElementById("modalTime").innerText = transaction.time;
  document.getElementById("modalTransfer").innerText = transaction.currency;
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
    <span onclick=" openTronscan('${transaction.address}', event)">
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
    <span onclick=" openTronscan('${transaction.tx_id}', event)">
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

function closeModal() {
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

function loadTableData(data) {
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

      row.innerHTML = `
        <td data-label="Время">${transaction.time}</td>
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

      row.addEventListener("click", () => openModal(transaction));

      tableBody.appendChild(row);
    });
  }
}

function openTronscan(transactionId, event) {
  event.stopPropagation(); // Modal ochilmasligini oldini oladi
  const url = `${transactionId}`;
  window.open(url, "_blank"); // Yangi oynada ochish
}

const transactions = [
  {
    time: "2025-03-10 12:51:33",
    duration: "2024-12-10 - 2025-03-09",
    status: "Готово",
    downloadLink:
      "https://d11ggcthlh2gdm.cloudfront.net/share/72796e84-a88b-46e1-a058-936c818044e6%40primary/wallet-ledger-download/92f00680-fd84-11ef-a9a4-0695fa030f45/98bb9fc6-fd84-11ef-bd14-7934718a13d0.zip?Expires=1742197942&Key-Pair-Id=K2V3MHPA1KP9UY",
  },
];

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
  if (formData.timeRange === "Customized") {
    const dateRangePicker = document.getElementById("dateRangePicker");
    formData.customDateRange = dateRangePicker.textContent.trim();
  }

  return formData;
}

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
        language: "en",
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
  // if (!selectedCoin) {
  //   alert("Пожалуйста, выберите монету");
  //   return;
  // }

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












