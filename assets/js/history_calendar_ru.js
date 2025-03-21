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
let selectedStartDate = new Date();
let selectedEndDate = new Date();
let selectedStartYear = selectedStartDate.getFullYear();
let selectedEndYear = selectedEndDate.getFullYear();
let selectedStartMonth = selectedStartDate.getMonth();
let selectedEndMonth = selectedEndDate.getMonth();

function sendData() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  // Konsolga start va end sanalarini chiqarish
  console.log(`Start Date: ${startDate}`);
  console.log(`End Date: ${endDate}`);
}

function openModal(type) {
  if (type === "start") {
    document.getElementById("startModal").style.display = "block";
    renderCalendar("start");
  } else if (type === "end") {
    document.getElementById("endModal").style.display = "block";
    renderCalendar("end");
  }
}

function closeModal(type) {
  if (type === "start") {
    document.getElementById("startModal").style.display = "none";
  } else if (type === "end") {
    document.getElementById("endModal").style.display = "none";
  }
}

let selectedDates = {}; // Tanlangan sanalarni saqlash uchun obyekt
let firstAfterTodayAdded = false; // Bugundan keyingi birinchi sanani topish uchun flag

function renderCalendar(type) {
  let year = type === "start" ? selectedStartYear : selectedEndYear;
  let month = type === "start" ? selectedStartMonth : selectedEndMonth;
  let yearElement = document.getElementById(`${type}Year`);
  let monthElement = document.getElementById(`${type}Month`);
  let dayGrid = document.getElementById(`${type}DayGrid`);

  yearElement.textContent = year;
  monthElement.textContent = months[month];
  dayGrid.innerHTML = "";
  firstAfterTodayAdded = false; // Har safar qayta render bo‘lganda reset qilish

  let today = new Date();
  let todayYear = today.getFullYear();
  let todayMonth = today.getMonth();
  let todayDate = today.getDate();

  let firstDay = new Date(year, month, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;

  let lastDate = new Date(year, month + 1, 0).getDate();
  let totalDays = firstDay + lastDate;

  let prevMonthDays = [];
  if (firstDay > 0) {
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevMonthLastDate = new Date(year, prevMonth + 1, 0).getDate();
    for (
      let i = prevMonthLastDate - firstDay + 1;
      i <= prevMonthLastDate;
      i++
    ) {
      prevMonthDays.push(i);
    }
  }

  prevMonthDays.reverse().forEach((day) => {
    let dayBtn = document.createElement("div");
    dayBtn.classList.add("daysInto", "prev-month", "past-day");
    dayBtn.textContent = day;
    dayGrid.appendChild(dayBtn);
  });

  for (let day = 1; day <= lastDate; day++) {
    let dayBtn = document.createElement("div");
    dayBtn.classList.add("daysInto");
    dayBtn.textContent = day;

    // Bugungi sanaga class berish
    if (year === todayYear && month === todayMonth && day === todayDate) {
      dayBtn.classList.add("todayIs");
    }

    // Bugundan oldingi sanalarga class berish
    if (
      year < todayYear ||
      (year === todayYear && month < todayMonth) ||
      (year === todayYear && month === todayMonth && day < todayDate)
    ) {
      dayBtn.classList.add("past-day");
    }

    // Bugundan keyingi BIRINCHI sanaga class berish
    if (
      !firstAfterTodayAdded &&
      (year > todayYear ||
        (year === todayYear && month > todayMonth) ||
        (year === todayYear && month === todayMonth && day > todayDate))
    ) {
      dayBtn.classList.add("first-after-today");
      firstAfterTodayAdded = true;
    }

    // Tanlangan sanaga class berish
    if (
      selectedDates[type] &&
      selectedDates[type].year === year &&
      selectedDates[type].month === month &&
      selectedDates[type].day === day
    ) {
      dayBtn.classList.add("selected");
    }

    dayBtn.onclick = () => selectDate(type, year, month, day);
    dayGrid.appendChild(dayBtn);
  }

  let remainingDays = 7 - (totalDays % 7);
  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      let dayBtn = document.createElement("div");
      dayBtn.classList.add("daysInto", "next-month");
      dayBtn.textContent = i;
      dayGrid.appendChild(dayBtn);
    }
  }
}

// **Sanani tanlash funksiyasi**
function selectDate(type, year, month, day) {
  selectedDates[type] = { year, month, day };
  renderCalendar(type);
}

function changeYear(direction, type) {
  if (type === "start") {
    selectedStartYear += direction;
  } else if (type === "end") {
    selectedEndYear += direction;
  }
  renderCalendar(type);
}

function changeMonth(direction, type) {
  if (type === "start") {
    selectedStartMonth += direction;
    if (selectedStartMonth < 0) {
      selectedStartMonth = 11;
      selectedStartYear--;
    } else if (selectedStartMonth > 11) {
      selectedStartMonth = 0;
      selectedStartYear++;
    }
  } else if (type === "end") {
    selectedEndMonth += direction;
    if (selectedEndMonth < 0) {
      selectedEndMonth = 11;
      selectedEndYear--;
    } else if (selectedEndMonth > 11) {
      selectedEndMonth = 0;
      selectedEndYear++;
    }
  }
  renderCalendar(type);
}

function selectDate(type, year, month, day) {
  const selectedDate = new Date(year, month - 1, day);
  if (type === "start") {
    document.getElementById("startDate").value = selectedDate
      .toISOString()
      .split("T")[0];
    closeModal("start");
  } else if (type === "end") {
    document.getElementById("endDate").value = selectedDate
      .toISOString()
      .split("T")[0];
    closeModal("end");
  }
}
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Oy 1 dan boshlanadi, shuning uchun +1 qilamiz
  const day = String(date.getDate()).padStart(2, "0"); // Kunni 2 raqamli qilish uchun padStart qo'llaymiz
  return `${year}-${month}-${day}`;
}

window.onclick = function (event) {
  const startModal = document.getElementById("startModal");
  const endModal = document.getElementById("endModal");

  if (event.target === startModal) {
    closeModal("start");
  } else if (event.target === endModal) {
    closeModal("end");
  }
};
document
  .getElementById("startDate")
  .addEventListener("click", () => openModal("start"));
document
  .getElementById("endDate")
  .addEventListener("click", () => openModal("end"));
