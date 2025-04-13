document
  .getElementById("btn-MFilterWrap-onOpenFilter")
  .addEventListener("click", function () {
    let filterBox = document.querySelector(".transfer-filters");
    filterBox.style.display = "block"; // Avval elementni ko‘rinadigan qilamiz
    // Skrollni butunlay o‘chirish
    setTimeout(() => {
      document.body.style.overflow = "hidden";
      filterBox.classList.add("show"); // Animatsiyani ishga tushiramiz
    }, 10);
  });
document
  .getElementById("btn-MDrawer-onClose")
  .addEventListener("click", function () {
    let filterBox = document.querySelector(".transfer-filters");
    filterBox.style.display = "none"; // Avval elementni ko‘rinadigan qilamiz

    setTimeout(() => {
      document.body.style.overflow = "";
      filterBox.classList.add("show"); // Animatsiyani ishga tushiramiz
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
  .getElementById("customButton")
  .addEventListener("click", toggleCalendar);

//=================Calendar===========================
const calendarPreview = document.querySelector(".calendar__preview"); // class orqali olish
function getDefaultDates() {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formatDate = (date) => date.toISOString().split("T")[0];

  return [formatDate(sevenDaysAgo), formatDate(today)];
}

// Обновляем отображение дат и устанавливаем startDate и endDate
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

    // (startDate, endDate); value
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
  onValueUpdate: updateDateDisplay,
  onReady: function (selectedDates, dateStr, instance) {
    instance.jumpToDate(new Date());
    updateDateDisplay(selectedDates, dateStr, instance);
  },
});

document.querySelector(".flatpickr-prev-month").innerHTML = "";
document.querySelector(".flatpickr-next-month").innerHTML = "";

//============================================

document.querySelectorAll(".flex-button").forEach((button) => {
  button.addEventListener("click", function () {
    // Barcha tugmalardan 'active' klassini olib tashlash
    document
      .querySelectorAll(".flex-button")
      .forEach((btn) => btn.classList.remove("active"));

    // Bosilgan tugmaga 'active' klassini qo‘shish
    this.classList.add("active");
  });
});

// ------------Coin---------------------------

let coinData = {
  1: [],
  2: [],
  3: [],
  4: [],
};
let availableCoins = {
  1: ["Спот", "Кросс-маржа", "Пополнения", "Фьючерсы USDⓈ-M ", "Фьючерсы COIN-M", "Изолированная маржа", "Earn", "P2P-аккаунт", "Пул", "Опционы"],
  2: [],
  // 3: [
  //   { name: "10000BTC", image: "../../../../../assets/img/coin5.png", description: "10000*Bitcoin" },
  //   { name: "11000ETH", image: "../../../../../assets/img/coin6.png", description: "11000*Ethereum" },
  //   { name: "12000BTC", image: "../../../../../assets/img/coin7.png", description: "12000*Bitcoin" },
  //   { name: "13000ETH", image: "../../../../../assets/img/coin8.png", description: "13000*Ethereum" }
  // ]
};

function toggleModal(id) {
  let modal = document.getElementById(`modal-${id}`);
  let container = document.querySelectorAll(`container-${id}`);
  let bg = document.getElementById("bg");

  // Check if the modal is already open
  if (modal.classList.contains("active")) {
    // If modal is open, close it
    modal.classList.remove("active");
    bg.classList.remove("active"); // Close the background overlay
  } else {
    // If modal is closed, open it
    modal.classList.add("active");
    bg.classList.add("active"); // Open the background overlay
    renderCoinList(id); // Re-render the coin list whenever the modal opens
  }
}

function closeModals() {
  let modals = document.querySelectorAll(".modal.active");
  let bg = document.getElementById("bg");
  modals.forEach((modal) => modal.classList.remove("active"));
  bg.classList.remove("active"); // Close the background overlay
}

function renderCoinList(id) {
  let isAllSelected = coinData[id].length === availableCoins[id].length;

  let listHtml = `
  ${availableCoins[id].length ? `
          <li onclick="toggleSelectAll(${id})">
            <div class="bn-checkbox-icon ${isAllSelected ? "active" : ""}">
              <svg fill="BasicBg" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" class="bn-svgch">
                <path d="M19.357 4.687L9.301 14.743l-4.656-4.657-3.03 3.031L9.3 20.804 22.388 7.717l-3.03-3.03z"
                  fill="currentColor"></path>
              </svg>
            </div>
            Все
          </li>
          `: ""}
          `;

  availableCoins[id].forEach((coin) => {
    let isChecked = coinData[id].includes(coin);
    let activeClass = isChecked ? "active" : "";
    listHtml += `
          <li onclick="updateSelection(${id}, '${coin}')">
            <div class="bn-checkbox-icon ${activeClass}">
              <svg fill="BasicBg" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" class="bn-svgch">
                <path d="M19.357 4.687L9.301 14.743l-4.656-4.657-3.03 3.031L9.3 20.804 22.388 7.717l-3.03-3.03z"
                  fill="currentColor"></path>
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
}

function updateSelectedText(id) {
  let selectedText = document.getElementById(`selected-text-${id}`);
  selectedText.innerHTML = "";

  if (coinData[id].length === 0) {
    selectedText.innerText = "Выберите...";
    selectedText.classList.add("text-t-disabled_emp");
    selectedText.classList.remove("text-t-activeAll");
    return;
  }

  if (coinData[id].length === availableCoins[id].length) {
    selectedText.innerText = "Все";
    selectedText.classList.remove("text-t-disabled_emp");
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

  selectedText.classList.remove("text-t-disabled_emp");
  selectedText.classList.add("text-t-active");
}

function filterCoins(id, input) {
  let filter = input.value.toLowerCase();
  let coinList = document.getElementById(`coin-list-${id}`);
  let listItems = coinList.querySelectorAll("li");

  listItems.forEach((li) => {
    let coinText = li.textContent || li.innerText; // Get text content
    li.style.display = coinText.toLowerCase().includes(filter) ? "" : "none";
  });
}

//--------------------------------------------

// Tranzaktsiyalarni array ko'rinishida saqlaymiz
const transactions = [
  {
    time: "2025-03-10 12:51:33",
    duration: "2024-12-10 - 2025-03-09",
    status: "Готово",
    downloadLink:
      "https://d11ggcthlh2gdm.cloudfront.net/share/72796e84-a88b-46e1-a058-936c818044e6%40primary/wallet-ledger-download/92f00680-fd84-11ef-a9a4-0695fa030f45/98bb9fc6-fd84-11ef-bd14-7934718a13d0.zip?Expires=1742197942&Key-Pair-Id=K2V3MHPA1KP9UY",
  },
];

function loadTransactions() {
  const tableBody = document.getElementById("transactionTableBody");
  tableBody.innerHTML = ""; // Jadvalni tozalaymiz

  if (transactions.length === 0) {
    tableBody.innerHTML = `
      <tr class="bn-web-table-placeholder">
        <td colspan="3" class="bn-web-table-cell table-cells">
          <div class="nodata-inTabel">
            <svg class="bn-svg" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.5" d="M84 28H64V8l20 20z" fill="#AEB4BC"></path>
              <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd"
                d="M24 8h40v20h20v60H24V8zm10 30h40v4H34v-4zm40 8H34v4h40v-4zm-40 8h40v4H34v-4z"
                fill="#AEB4BC">
              </path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M22.137 64.105c7.828 5.781 18.916 5.127 26.005-1.963 7.81-7.81 7.81-20.474 0-28.284-7.81-7.81-20.474-7.81-28.284 0-7.09 7.09-7.744 18.177-1.964 26.005l-14.3 14.3 4.243 4.243 14.3-14.3zM43.9 57.9c-5.467 5.468-14.331 5.468-19.799 0-5.467-5.467-5.467-14.331 0-19.799 5.468-5.467 14.332-5.467 19.8 0 5.467 5.468 5.467 14.332 0 19.8z"
                fill="#AEB4BC"></path>
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
                <a href="${tran.downloadLink}" class="typography-Btn_link3 text-t-TextLink hover:text-primaryHover text-[12px] font-medium leading-[18px] underline"
                  target="_blank"
                  download="Binance-Transaction Records Report.zip">Загрузить</a>
              </div>
            </td>
          `;
      tableBody.appendChild(row);
    });
  }
}

// Sahifa yuklanganda tranzaktsiyalarni yuklaymiz
window.onload = loadTransactions;
// //////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  let modal = document.getElementById("export-modal");
  modal.addEventListener("mouseleave", function () {
    modal.classList.remove("active");
  });

  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }
  // ===========================================
});


document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".section-tex-box button");

  if (buttons.length > 0) {
    // Dastlab birinchi tugmani 'active' qilamiz
    buttons[0].classList.add("active");
  }

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Barcha tugmalardan 'active' klassini olib tashlash
      buttons.forEach((btn) => btn.classList.remove("active"));

      // Bosilgan tugmaga 'active' klassini qo'shish
      this.classList.add("active");
    });
  });
});
