document.addEventListener("DOMContentLoaded", function () {
  const walletSelect = document.getElementById("filter-wallet");
  const walletList = document.getElementById("wallet-list");
  const walletIcon = document.getElementById("wallet-icon");

  // Modal ochish / yopish funksiyasi
  walletSelect.addEventListener("click", function (event) {
    event.stopPropagation(); // Modal ochilganda tashqi bosishda yopilmasin

    const isOpen = walletList.classList.toggle("active");

    // SVG iconni burish
    // walletIcon.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
  });

  // Tashqariga bosilganda modalni yopish
  document.addEventListener("click", function (event) {
    if (!walletSelect.contains(event.target)) {
      walletList.classList.remove("active");
      walletIcon.style.transform = "rotate(0deg)"; // Iconni pastga qaytarish
    }
  });
});

window.addEventListener("DOMContentLoaded", (event) => {
  // Default value: 'all'
  const selectedOption = document.getElementById("selected-option-wallet");
  selectedOption.innerText = "USDT"; // Default value to be shown
  selectedOption.style.color = "var(--color-textPrimary)";
  selectedOption.style.fontWeight = "400";
});

function getDefaultDates() {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formatDate = (date) => date.toISOString().split("T")[0];

  return [formatDate(sevenDaysAgo), formatDate(today)];
}

function updateDateDisplay(selectedDates, dateStr, instance) {
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
    console.log(startDate, endDate);
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

//  =================================================
// Function to toggle all checkboxes based on "All" checkbox
function toggleAllCheckboxes() {
  const allChecked = document.getElementById("allCheckbox").checked;
  const checkboxes = document.querySelectorAll(".individual-checkbox");

  checkboxes.forEach((checkbox) => {
    checkbox.checked = allChecked;
  });
}

// Listen for changes in the individual checkboxes
document.querySelectorAll(".individual-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const allCheckbox = document.getElementById("allCheckbox");
    const allCheckboxes = document.querySelectorAll(".individual-checkbox");
    const allChecked = Array.from(allCheckboxes).every((cb) => cb.checked);

    allCheckbox.checked = allChecked;
  });
});
//  =================================================
const filterSelect = document.querySelector("#filter-select-stat");
const filterSelectLabel = filterSelect.querySelector(
  ".order-select__label-div"
);
const filterSelectLabelSpan = document.querySelector(
  ".order-select__spanvalue"
);
const filterOptions = filterSelect.querySelector(".order-select__list-wrapper");
const filterOptionList = filterOptions.querySelectorAll(
  ".order-select__option"
);

function updateSelectedFilterOption(value) {
  filterOptionList.forEach((opt) => {
    opt.classList.remove("selected", "highlight");
    if (opt.getAttribute("data-value") === value) {
      opt.classList.add("selected", "highlight");
      filterSelectLabelSpan.textContent = opt.textContent;
    }
  });
}

updateSelectedFilterOption("all");

filterSelectLabel.addEventListener("click", function () {
  filterOptions.classList.toggle("open");
  filterSelectLabel.classList.toggle("open");
});

filterOptionList.forEach((option) => {
  option.addEventListener("click", function () {
    const value = option.getAttribute("data-value");
    updateSelectedFilterOption(value);
    filterOptions.classList.remove("open");
    filterSelectLabel.classList.remove("open");
  });
});

document.addEventListener("click", function (e) {
  if (!filterSelect.contains(e.target)) {
    filterOptions.classList.remove("open");
  }
});

// =========================================
let serverEmail = "azimjon995m@gmail.com";
let isClosed = true;

function maskEmail(email) {
  let parts = email.split("@");
  let name = parts[0];
  let domain = parts[1];

  if (!name || !domain) return email;
  return name.substring(0, 3) + "***@" + domain;
}

function toggleEye() {
  isClosed = !isClosed;
  updateEyeState();
}

function updateEyeState() {
  let emailSpan = document.querySelector(".order-select__spanvalue");

  if (serverEmail) {
    emailSpan.innerHTML = isClosed ? maskEmail(serverEmail) : serverEmail;

    emailSpan.style.color = "var(--color-textPrimary)";
    emailSpan.style.fontWeight = "400";
  } else {
    emailSpan.innerHTML = "Электронная почта";
    emailSpan.style.color = "";
    emailSpan.style.fontWeight = "";
  }

  let eyeOpen = document.querySelector(".eye-open");
  let eyeClosed = document.querySelector(".eye-closed");

  if (eyeOpen && eyeClosed) {
    eyeOpen.classList.toggle("eye-active", !isClosed);
    eyeClosed.classList.toggle("eye-active", isClosed);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateEyeState();
});

//  =================================================

// Toggle the visibility of the list when the 'custom-select' is clicked
document
  .getElementById("filter-select")
  .addEventListener("click", function (event) {
    const listWrapper = document.querySelector(".custom-select__list-wrapper");
    listWrapper.classList.toggle("open");
    event.stopPropagation(); // Prevent the event from propagating to the document
  });

// Close the modal if clicking outside the 'custom-select' or modal
document.addEventListener("click", function (event) {
  const listWrapper = document.querySelector(".custom-select__list-wrapper");
  const customSelect = document.getElementById("filter-select");

  // Close modal if the click is outside of the 'custom-select' or modal
  if (
    !customSelect.contains(event.target) &&
    !listWrapper.contains(event.target)
  ) {
    listWrapper.classList.remove("open");
  }
});

// Update the selected option in the label when an option is clicked
const options = document.querySelectorAll(".custom-select__option");
const selectedOptionSpan = document.getElementById("selected-option"); // The span where the selected option will appear

selectedOptionSpan.textContent = "Все"; // Default selected option

options.forEach((option) => {
  option.addEventListener("click", function () {
    // Update the selected option span with the selected value
    selectedOptionSpan.textContent = this.innerText;

    selectedOptionSpan.style.color = "var(--color-textPrimary)";
    selectedOptionSpan.style.fontWeight = "400";
    // Close the modal after selecting an option
    document
      .querySelector(".custom-select__list-wrapper")
      .classList.remove("open");
  });
});

// Function to update the selected filter option based on its value
function updateSelectedFilterOption(value) {
  // You can add additional logic here if you need to update any other parts based on the selected value
  console.log("Selected value:", value);
}

// ##############   bolim 1 tugadi   #################

// ======================Til va USD======================
const langSelect = document.querySelector("#typography-Subtitl_long");
const langSelectUsd = document.querySelector("#typography-Subtitl_usd");
const tooltips = document.querySelector(".bn-bubble-box");
const tooltipsUsd = document.querySelector(".bn-bubble-usd");
const selectedLang = document.getElementById("selected-lang");
const selectedUsd = document.getElementById("selected-usd");
let isOpenLang = false;
let isOpenUsd = false;

// Til uchun tooltip funksiyalari
function closeLangTooltip() {
  tooltips.style.display = "none";
  isOpenLang = false;
}

function openLangTooltip() {
  tooltips.style.display = "block";
  isOpenLang = true;
}

// Valyuta uchun tooltip funksiyalari
function closeUsdTooltip() {
  tooltipsUsd.style.display = "none";
  isOpenUsd = false;
}

function openUsdTooltip() {
  tooltipsUsd.style.display = "block";
  isOpenUsd = true;
}

// Desktop uchun hover event (til)
if (window.innerWidth > 700) {
  langSelect.addEventListener("mouseenter", openLangTooltip);
  langSelect.addEventListener("mouseleave", closeLangTooltip);
} else {
  langSelect.addEventListener("click", (event) => {
    event.stopPropagation();
    isOpenLang ? closeLangTooltip() : openLangTooltip();
  });

  document.addEventListener("click", (event) => {
    if (
      !tooltips.contains(event.target) &&
      !langSelect.contains(event.target)
    ) {
      closeLangTooltip();
    }
  });
}

// Desktop uchun hover event (usd)
if (window.innerWidth > 700) {
  langSelectUsd.addEventListener("mouseenter", openUsdTooltip);
  langSelectUsd.addEventListener("mouseleave", closeUsdTooltip);
} else {
  langSelectUsd.addEventListener("click", (event) => {
    event.stopPropagation();
    isOpenUsd ? closeUsdTooltip() : openUsdTooltip();
  });

  document.addEventListener("click", (event) => {
    if (
      !tooltipsUsd.contains(event.target) &&
      !langSelectUsd.contains(event.target)
    ) {
      closeUsdTooltip();
    }
  });
}

// Til tanlash
document.querySelectorAll(".footer-select-options.lang").forEach((option) => {
  option.addEventListener("click", (e) => {
    selectedLang.textContent = e.target.textContent;
    closeLangTooltip();
  });
});

// Valyuta tanlash
document.querySelectorAll(".footer-select-options.usd").forEach((option) => {
  option.addEventListener("click", (e) => {
    selectedUsd.textContent = e.target.textContent;
    closeUsdTooltip();
  });
});

// const langSelect = document.querySelector('#typography-Subtitl_long');
// const langSelect_usd = document.querySelector('#typography-Subtitl_usd');
// const tooltips = document.querySelector('.bn-bubble-box');
// const tooltips_usd = document.querySelector('.bn-bubble-usd');
// const selectedLang = document.getElementById('selected-lang');
// const selectedUsd = document.getElementById('selected-usd');
// let isOpen = false;

// function closeTooltip() {
//   tooltips.style.display = "none";
//   isOpen = false;
// }

// function openTooltip() {
//   tooltips.style.display = "block";
//   isOpen = true;
// }

// // Desktop uchun hover event
// if (window.innerWidth > 700) {
//   langSelect.addEventListener('mouseenter', openTooltip);
//   langSelect.addEventListener('mouseleave', closeTooltip);
// } else {
//   // Mobil uchun click event
//   langSelect.addEventListener('click', (event) => {
//     event.stopPropagation(); // Click bubble oldini oladi
//     if (isOpen) {
//       closeTooltip();
//     } else {
//       openTooltip();
//     }
//   });

//   // Tashqariga bosilganda yopish
//   document.addEventListener('click', (event) => {
//     if (!tooltips.contains(event.target) && !langSelect.contains(event.target)) {
//       closeTooltip();
//     }
//   });
// }

// // Til tanlash
// document.querySelectorAll('.footer-select-options').forEach(option => {
//   option.addEventListener('click', (e) => {
//     selectedLang.textContent = e.target.textContent;
//     closeTooltip();
//   });
// });

// //usd
// let isOpenUsd = false;

// function closeTooltip() {
//   tooltips_usd.style.display = "none";
//   isOpenUsd = false;
// }

// function openTooltip() {
//   tooltips_usd.style.display = "block";
//   isOpenUsd = true;
// }

// // Desktop uchun hover event
// if (window.innerWidth > 700) {
//   langSelect_usd.addEventListener('mouseenter', openTooltip);
//   langSelect_usd.addEventListener('mouseleave', closeTooltip);
// } else {
//   // Mobil uchun click event
//   langSelect_usd.addEventListener('click', (event) => {
//     event.stopPropagation(); // Click bubble oldini oladi
//     if (isOpenUsd) {
//       closeTooltip();
//     } else {
//       openTooltip();
//     }
//   });

//   // Tashqariga bosilganda yopish
//   document.addEventListener('click', (event) => {
//     if (!tooltips_usd.contains(event.target) && !langSelect_usd.contains(event.target)) {
//       closeTooltip();
//     }
//   });
// }

// // Til tanlash
// document.querySelectorAll('.footer-select-options').forEach(option => {
//   option.addEventListener('click', (e) => {
//     selectedUsd.textContent = e.target.textContent;
//     closeTooltip();
//   });
// });

const searchInput = document.getElementById("search-input");
const optionsList = document.getElementById("options-list");
const noResult = document.getElementById("no-result");
const footerOptions = document.querySelectorAll(".footer-select-options");

searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  let found = false;

  footerOptions.forEach((option) => {
    if (option.textContent.toLowerCase().includes(searchTerm)) {
      option.classList.remove("hidden");
      found = true;
    } else {
      option.classList.add("hidden");
    }
  });

  noResult.classList.toggle("hidden", found);
});
// ============================================

const doughnutChart = document.getElementById("futures-balance-chart");

const doughnutData = {
  labels: ["USDT"],
  datasets: [
    {
      data: [1],
      backgroundColor: "rgb(50, 141, 253)",
      borderColor: "rgb(50, 141, 253)",
      borderWidth: 5,
    },
  ],
};

const doughnutChartConfig = new Chart(doughnutChart, {
  type: "doughnut",
  data: doughnutData,
  options: {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: "78%",
  },
});

function changeBorderWidth(newWidth) {
  doughnutChartConfig.data.datasets?.forEach((dataset) => {
    dataset.borderWidth = newWidth;
  });
  doughnutChartConfig.update();
}

const doughnutChartContainer = document.querySelector(
  ".futures-balance-chart-container"
);

doughnutChartContainer.addEventListener("mouseover", () => {
  changeBorderWidth(3);
});

doughnutChartContainer.addEventListener("mouseout", () => {
  changeBorderWidth(1);
});

// const lineChart = document
//   .getElementById("futures-balance-line-chart")
//   .getContext("2d");

let chartPeriod = 7;

// const gradient = lineChart.createLinearGradient(0, 0, 0, 400);
// gradient.addColorStop(0, "#4a4429");
// gradient.addColorStop(1, "#322e22");

// Elementlarni tanlang
const filterButtons = document.querySelectorAll(
  ".futures-balance__head-option"
);
const moreButtonSpan = document.querySelector(
  ".futures-balance__head-more_value"
);
const updateOptionTexts = () => {
  filterButtons?.forEach((option) => {
    const period = option.dataset.period;
    switch (period) {
      case "7":
        option.textContent = "7 дн.";
        break;
      case "30":
        option.textContent = "1 мес";
        break;
      case "90":
        option.textContent = "3 мес";
        break;
      case "180":
        // option.textContent = "6 мес";
        option.textContent = "6М";

        break;
      default:
        break;
    }
    // }
  });
};

// ##############   bolim 2 tugadi   #################

document.addEventListener("DOMContentLoaded", function () {
  const titles = document.querySelectorAll(".footer-navlist-title");

  titles.forEach((title) => {
    title.addEventListener("click", function () {
      const itemList = this.nextElementSibling;
      const plusIcon = this.querySelector(".bn-svg");
      const minusIcon = this.querySelector(".bn-svg-min");

      // Barcha ochiq elementlarni yopish
      document.querySelectorAll(".footer-navlist-item-list").forEach((list) => {
        if (list !== itemList) {
          list.style.display = "none";
        }
      });

      // Barcha ikonlarni normal holatga qaytarish
      document
        .querySelectorAll(".bn-svg-min")
        .forEach((icon) => (icon.style.display = "none"));
      document
        .querySelectorAll(".bn-svg")
        .forEach((icon) => (icon.style.display = "block"));

      // Yangi ochilgan elementni ochish/yopish
      if (itemList.style.display === "block") {
        itemList.style.display = "none";
        plusIcon.style.display = "block";
        minusIcon.style.display = "none";
      } else {
        itemList.style.display = "block";
        plusIcon.style.display = "none";
        minusIcon.style.display = "block";
      }
    });
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const titles = document.querySelectorAll(".footer-navlist-title");
//   const svgMinus = document.querySelectorAll(".bn-svg-min");
//   const svgPluse = document.querySelectorAll(".bn-svg");

//   titles.forEach((title) => {
//     title.addEventListener("click", function () {
//       const itemList = this.nextElementSibling;

//       // Barcha ochiq elementlarni yopish
//       document.querySelectorAll(".footer-navlist-item-list").forEach((list) => {
//         if (list !== itemList) {
//           list.style.display = "none";
//         }
//       });

//       // Yangi ochilgan elementni ochish/yopish
//       if (itemList.style.display === "block") {
//         itemList.style.display = "none";
//       } else {
//         itemList.style.display = "block";
//       }
//     });
//   });

// });
// ===========================================================

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.querySelector(".css-4tsbqp");
const exportModal = document.querySelector(".css-1u2nk9f");
const passwordInput = document.getElementById("password");
const exportDataBtn = document.getElementById("exportDataBtn");

openModalBtn?.addEventListener("click", () => {
  exportModal.style.display = "block";
  document.body.style.overflow = "hidden";
});

closeModalBtn.addEventListener("click", () => {
  exportModal.style.display = "none";
  document.body.style.overflow = "auto";
});

window.addEventListener("click", (event) => {
  if (event.target === exportModal) {
    exportModal.style.display = "none";
  }
});

passwordInput.addEventListener("input", () => {
  exportDataBtn.disabled = passwordInput.value.length !== 8;
});

// const lpjkfwElement = document.querySelector(".css-lpjkfw");

document.addEventListener("DOMContentLoaded", function () {
  const lpjkfwElement = document.querySelector(".css-lpjkfw");

  lpjkfwElement.addEventListener("click", function () {
    // .css-lpjkfw elementiga bosilganida, border rangini o'zgartirish
    lpjkfwElement.style.border = "1px solid #f0b90b";
  });

  // Tashqarida bosilganida, border rangini transparent qilish
  document.addEventListener("click", function (event) {
    if (!lpjkfwElement.contains(event.target)) {
      lpjkfwElement.style.border = "transparent"; // Agar tashqarida bosilgan bo'lsa
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const lpjkfwElement = document.querySelector(".css-qks5zu");
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.getElementById("toggleIcon");
  const warningText = document.querySelector(".css-1qttfd4");

  // Border rangini yangilash uchun funksiyani yaratish
  function updateBorderColor(color) {
    lpjkfwElement.style.border = `1px solid ${color}`;
  }

  // .css-qks5zu elementiga bosilganda border rangini sariq qilish
  lpjkfwElement.addEventListener("click", function () {
    updateBorderColor("#f0b90b");
  });

  // Tashqariga bosilganda borderni yo'qotish
  document.addEventListener("click", function (event) {
    if (!lpjkfwElement.contains(event.target)) {
      updateBorderColor("transparent");
    }
  });

  // Parol kiritish qoidalarini tekshirish
  passwordInput.addEventListener("input", function () {
    if (passwordInput.value.length < 6) {
      warningText.style.display = "block"; // Kamida 6 ta belgi kiritilmasa, xabar chiqadi
      updateBorderColor("#f6465d"); // Border qizil bo‘ladi
    } else {
      warningText.style.display = "none"; // Xabar yo‘qoladi
      updateBorderColor("#f0b90b"); // Border sariq bo‘ladi
    }
  });

  // Export data form validation
  const fileTypeInput = document.querySelector(".bn-sdd-value.css-p092j");
  const cancelButton = document.querySelector(".css-gkes1c");

  cancelButton.addEventListener("click", () => {
    const fileType = fileTypeInput.textContent.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
  });

  const exportDataBtn = document.getElementById("exportDataBtn");

  function checkInputs() {
    if (cancelButton) {
      const fileType = fileTypeInput.textContent.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (fileType && email && password.length === 8) {
        exportDataBtn.removeAttribute("disabled");
      } else {
        exportDataBtn.setAttribute("disabled", "true");
      }
    }
  }

  // Disable export button if any condition is not met
  // 👁 **Ko'zcha tugmachasini bosganda parolni ko‘rsatish yoki yashirish**
  toggleIcon.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.classList.add("active"); // Ko'zchani "faol" qilish
    } else {
      passwordInput.type = "password";
      toggleIcon.classList.remove("active"); // Ko'zchani oddiy qilish
    }
  });
});

toggleIcon.addEventListener("click", function () {
  // Default holatda password tipi va iconni ko'rsatish
  if (passwordInputs.type === "password") {
    passwordInputs.type = "text"; // Agar hozirda password bo'lsa, uni text qilish
    toggleIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-1ieqbf6">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M2.94 5.06l16 16 2.12-2.12-2.446-2.447L23 12l-5.555-5.69a7.566 7.566 0 00-9.883-.87L5.06 2.94 2.939 5.06zm6.747 2.506a5 5 0 016.747 6.747L9.687 7.566z" fill="currentColor"></path>
          <path d="M1 12l2.29-2.346 10.198 10.198a7.574 7.574 0 01-6.933-2.162L1 12z" fill="currentColor"></path>
        </svg>
         `;
  } else {
    passwordInputs.type = "password"; // Agar hozirda text bo'lsa, uni password qilish
    toggleIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-1ieqbf6">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill="currentColor"></path>
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M6.555 6.31L1 12l5.555 5.69a7.572 7.572 0 0010.89 0L23 12l-5.555-5.69a7.572 7.572 0 00-10.89 0zM17 12a5 5 0 11-10 0 5 5 0 0110 0z" fill="currentColor"></path>
        </svg>
        `;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".css-zzrzec"); // Email input
  const button = document.querySelector(".css-20ob2b"); // Button

  input.addEventListener("input", function () {
    if (input.value.includes("gmail.com")) {
      button.disabled = false;
      button.classList.remove("css-20ob2b");
      button.classList.add("css-o7kx4s"); // Faol tugma klassi
    } else {
      button.disabled = true;
      button.classList.remove("css-o7kx4s");
      button.classList.add("css-20ob2b"); // Noaktiv tugma klassi
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdownTrigger = document.querySelector(".css-1jdp2m6"); // Click qilingan element
  const dropdownMenu = document.querySelector(".bn-sdd-dropdown"); // Modal ro‘yxat

  const css_13c2b5p = document.querySelector(".css-13c2b5p"); // Modal ro‘yxat

  dropdownTrigger.addEventListener("click", function (event) {
    event.stopPropagation(); // Boshqa elementlarga ta’sir qilmasligi uchun

    if (dropdownMenu.classList.contains("showing")) {
      dropdownMenu.classList.remove("showing"); // Yopish
      css_13c2b5p.style.transform = "rotate(177deg)";
    } else {
      dropdownMenu.classList.add("showing"); // Ochish
      css_13c2b5p.style.transform = "rotate(0deg)";
    }
  });

  // Modalni tashqariga bosganda yopish
  document.addEventListener("click", function (event) {
    if (
      !dropdownTrigger.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.remove("showing");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".css-2o4412"); // Email input
  const button = document.querySelector(".css-20ob2b"); // Button
  const button_bg = document.querySelector(".css-20ob2b-bg"); // Button

  input.addEventListener("input", function () {
    if (input.value >= 6) {
      button.disabled = false;
      button.classList.remove("css-20ob2b");
      button.classList.add("css-o7kx4s"); // Faol tugma klassi
      button_bg.style.backgroundColor = "#fcd535";
      button_bg.style.color = "#333";
    } else {
      button.disabled = true;
      button.classList.remove("css-o7kx4s");
      button.classList.add("css-20ob2b"); // Noaktiv tugma klassi
    }
  });
});

// Elementlarni olish
const modal = document.getElementById("modal-rc");
const overlay = document.getElementById("overlay");
const toggleButton = document.getElementById("toggleButton");

// Modalni ochish/yopish funksiyasi

// Modalni ochish/yopish funksiyasi
function toggleModal() {
  const isOpen = modal.classList.contains("show");
  if (isOpen) {
    modal.classList.remove("show");
    overlay.classList.remove("show");
    document.body.style.overflow = "auto"; // Sahifa skrolli tiklanadi
  } else {
    modal.classList.add("show");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden"; // Sahifa skrolli bloklanadi
  }
}

// Tugmaga bosilganda modal ochilsin/yopsin
toggleButton?.addEventListener("click", toggleModal);
overlay?.addEventListener("click", toggleModal);

// send to export
// ##############   bolim 3 tugadi   #################

// ======================== EXPORT PDF ===================
let emails = [];
let emailInput = document.querySelector(".css-zzrzec");
let addEmailButton = document.querySelector(".css-20ob2b");
let passwordForFile = document.querySelector(".css-2o4412");
let addedEmails = document.querySelector(".addedEmails");
let addedEmailsText = document.querySelector(".addedEmailsText");

addEmailButton.addEventListener("click", () => {
  let email = emailInput.value.trim();

  if (!email) return alert("Please enter a valid email.");
  if (emails.includes(email)) return alert("This email is already added.");
  if (emails.length >= 3) return alert("You can only add up to 3 emails.");

  emails.push(email);
  updateEmailList();
  if (emails.length) {
    addedEmailsText.style.display = "block";
  } else {
    addedEmailsText.style.display = "none";
  }
  emailInput.value = "";
});

function removeEmail(index) {
  emails.splice(index, 1);
  updateEmailList();
  if (emails.length) {
    addedEmailsText.style.display = "block";
  } else {
    addedEmailsText.style.display = "none";
  }
}

function updateEmailList() {
  addedEmails.innerHTML = "";

  emails.forEach((email, index) => {
    let li = document.createElement("li");
    li.classList.add("email-item");

    let span = document.createElement("span");
    span.textContent = email;

    let removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.innerHTML = `<i class="fa-solid fa-times"></i>`;
    removeBtn.addEventListener("click", () => removeEmail(index));

    li.appendChild(span);
    li.appendChild(removeBtn);
    addedEmails.appendChild(li);
  });

  emailInput.disabled = emails.length >= 3;
  addEmailButton.disabled = emails.length >= 3;
}

function showModal() {
  const modal = document.getElementById("exportModal11");
  modal.classList.add("show");
  modal.classList.remove("hide");

  setTimeout(() => {
    modal.classList.add("hide");
    modal.classList.remove("show");
  }, 3000); // 3 soniyadan keyin yo'qoladi
}

exportDataBtn.addEventListener("click", async () => {
  const dateInput1 = document.getElementById("dateInput");
  let current_date = dateInput1.value.replace(/\//g, "-");
  let data = {
    // fileType:"pdf",
    emails,
    file_password: passwordForFile.value,
    on_the_date: current_date,
  };
  let email = emailInput.value.trim();
  if (email.includes("gmail.com")) {
    emails.push(email);
  } else {
    alert("Please enter a valid email.");
  }

  try {
    let api = SERVER_URL + "/account-statement/export-pdf-to-email";
    let res = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let result = await res.json();
  } catch (err) {
    console.log(err);
  }
  exportModal.style.display = "none";
  document.body.style.overflow = "auto";
  showModal();
  emails = [];
  emailInput.value = "";
  passwordForFile.value = "";
});
//  ======================== EXPORT PDF ===================

// ========================= GET TOTAL EXPENSES Общая стоимость ===================

let user_info = JSON.parse(localStorage.getItem("user")) || {};
let user_id = user_info?.user_id || 0;

let margin_b = 0;
let equivalentValues = 0;
let one_btc_value = 0;

let api = SERVER_URL + "/accounts/margin-balance";

(async () => {
  try {
    let res = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    });

    // Status tekshiramizuser_id
    if (!res.ok) {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }

    let result = await res.json();
    margin_b = result.balance || 0;

    updateWindow();
  } catch (err) {
    console.error("Fetch error:", err);
  }
  // equavaletn
  let api2 =
    "https://api.binance.com/api/v3/ticker/24hr?symbols=[%22BTCUSDT%22]";
  try {
    (async () => {
      const response = await fetch(api2);
      const data = await response.json();

      equivalentValues = +data[0].lastPrice;
      one_btc_value = +data[0].lastPrice;
      updateWindow();
    })();
  } catch (error) {
    console.error("Error fetching ticker info:", error);
  }
  function formatNumber(value) {
    let [integerPart, decimalPart] = value.toFixed(4).toString().split(".");
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return decimalPart ? `${integerPart},${decimalPart}` : integerPart;
  }

  function updateWindow() {
    let totalMarginAll = document.querySelectorAll(".balance_margin_all");
    let unrealized_pnl_all = document.querySelectorAll(".unrealized_pnl_all");

    let one_btc = document.querySelector(".css-17rkg15");

    let re = +margin_b / +equivalentValues;
    let btcustd = formatNumber(re);
    let formattedBalance = formatNumber(margin_b);

    one_btc.innerHTML = `≈ ${formatNumber(one_btc_value)} USDT`;

    totalMarginAll.forEach((item) => {
      item.innerHTML = btcustd + " BTC" || 0;
    });

    unrealized_pnl_all.forEach((item) => {
      item.innerHTML = `≈ $${formattedBalance} USDT`;
    });
  }
})();

// ========================= GET TOTAL EXPENSES Общая стоимость ===================
// ##############   bolim 4 tugadi   #################
const months = [
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Iyun",
  "Iyul",
  "Avg",
  "Sen",
  "Okt",
  "Noy",
  "Dek",
];
let selectedDate = new Date();
let selectedYear = selectedDate.getFullYear();
let selectedMonth = selectedDate.getMonth();

const calendarBox = document.querySelector("css-15h3vxo");
const dateInput = document.getElementById("dateInput");
const calendarModal = document.getElementById("calendarModal");
const currentYear = document.getElementById("currentYear");
const currentMonth = document.getElementById("currentMonth");
const dayGrid = document.getElementById("dayGrid");

const obzor_date = document.querySelector(".obzor_date");

dateInput.value = `${selectedYear}/${String(selectedMonth + 1).padStart(
  2,
  "0"
)}/${String(selectedDate.getDate()).padStart(2, "0")}`;

obzor_date.innerHTML = `${selectedYear}-${String(selectedMonth + 1).padStart(
  2,
  "0"
)}-${String(selectedDate.getDate()).padStart(2, "0")}`;

dateInput.addEventListener("click", () => {
  calendarModal.classList.toggle("show");
  calendarBox.style.border = "1px solid #fcd535";
  renderCalendar();
});

function renderCalendar() {
  currentYear.textContent = selectedYear;
  currentMonth.textContent = months[selectedMonth];
  dayGrid.innerHTML = "";

  let firstDay = new Date(selectedYear, selectedMonth, 1).getDay();

  // Adjusting to start the week from Saturday (Sh)
  if (firstDay === 0) {
    firstDay = 6; // Set Sunday to last day (Saturday should be first day of the week)
  } else {
    firstDay--; // Shift days by 1 to start from Saturday
  }

  let lastDate = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  let totalDays = firstDay + lastDate;

  // Add empty divs for previous month's days if the current month starts from an earlier day
  let prevMonthDays = [];
  if (firstDay > 0) {
    let prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
    let prevMonthLastDate = new Date(selectedYear, prevMonth + 1, 0).getDate();
    for (
      let i = prevMonthLastDate - firstDay + 1;
      i <= prevMonthLastDate;
      i++
    ) {
      prevMonthDays.push(i);
    }
  }

  // Add previous month's days first
  prevMonthDays.reverse().forEach((day) => {
    let dayBtn = document.createElement("div");
    dayBtn.classList.add("days");
    dayBtn.textContent = day;
    dayBtn.classList.add("prev-month");
    dayGrid.appendChild(dayBtn);
  });

  // Add current month's days
  const today = new Date();
  for (let day = 1; day <= lastDate; day++) {
    let dayBtn = document.createElement("div");
    dayBtn.classList.add("days");
    dayBtn.textContent = day;

    // Check if the current day is today
    if (
      selectedYear === today.getFullYear() &&
      selectedMonth === today.getMonth() &&
      day === today.getDate()
    ) {
      dayBtn.classList.add("active");
    }
    // Bugundan oldingi sanalar disable
    let currentDate = new Date(selectedYear, selectedMonth, day);
    if (currentDate > today) {
      dayBtn.classList.add("disabled");
    } else {
      dayBtn.onclick = () => selectDate(selectedYear, selectedMonth + 1, day);
    }

    if (currentDate < today) {
      dayBtn.classList.add("oldDeys");
    } else {
      dayBtn.onclick = () => selectDate(selectedYear, selectedMonth + 1, day);
    }

    dayBtn.onclick = () => selectDate(selectedYear, selectedMonth + 1, day);
    dayGrid.appendChild(dayBtn);
  }

  // Add next month's days if current month ends before the week's end
  let remainingDays = 7 - (totalDays % 7);
  let nextMonthDays = [];
  if (remainingDays < 7) {
    let nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push(i);
    }
  }

  nextMonthDays.forEach((day) => {
    let dayBtn = document.createElement("div");
    dayBtn.classList.add("days");
    dayBtn.textContent = day;
    dayBtn.classList.add("next-month");
    dayGrid.appendChild(dayBtn);
  });
}

function changeMonth(direction) {
  selectedMonth += direction;
  if (selectedMonth < 0) {
    selectedMonth = 11;
    selectedYear--;
  } else if (selectedMonth > 11) {
    selectedMonth = 0;
    selectedYear++;
  }
  renderCalendar();
}

function changeYear(direction) {
  selectedYear += direction;
  renderCalendar();
}

function selectDate(year, month, day) {
  // Tanlangan sanani formatlash
  const formattedDate = `${year}/${String(month).padStart(2, "0")}/${String(
    day
  ).padStart(2, "0")}`;
  dateInput.value = formattedDate;

  // Calendardagi barcha kunlarni tekshirib, tanlangan sanani alohida ajratib ko'rsatish
  const allDays = document.querySelectorAll(".days");
  allDays.forEach((dayBtn) => {
    dayBtn.classList.remove("selected"); // Avvalgi tanlangan sanani olib tashlash
  });

  // Tanlangan sanani "selected" klassi bilan belgilash
  const selectedDayBtn = [...allDays].find(
    (dayBtn) =>
      dayBtn.textContent == day &&
      !dayBtn.classList.contains("prev-month") &&
      !dayBtn.classList.contains("next-month")
  );
  if (selectedDayBtn) {
    selectedDayBtn.classList.add("selected");
  }

  calendarModal.classList.remove("show");
}

// Prevent closing when clicking on buttons inside the modal
document.addEventListener("click", (event) => {
  if (
    !document.querySelector(".rc-picker").contains(event.target) &&
    !calendarModal.contains(event.target)
  ) {
    calendarModal.classList.remove("show");
  }
});

renderCalendar();
// ##############   bolim 5 tugadi   #################

let apiForEmail = SERVER_URL + "/account-statement/used-email";
try {
  (async () => {
    const response = await fetch(apiForEmail);
    const data = await response.json();
    serverEmail = data[0];
    updateEyeState();
  })();
} catch (error) {
  console.error("get email error", error);
}

// ##############   bolim 6 tugadi   #################
