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

// Bugungi sanadan boshlab startDate 1 oy oldin, endDate bugungi sana
let selectedEndDate = new Date(); // EndDate bugungi sana
let selectedStartDate = new Date(selectedEndDate); // StartDate endDate asosida
selectedStartDate.setMonth(selectedStartDate.getMonth() - 1); // 1 oy orqaga
let selectedStartYear = selectedStartDate.getFullYear();
let selectedEndYear = selectedEndDate.getFullYear();
let selectedStartMonth = selectedStartDate.getMonth();
let selectedEndMonth = selectedEndDate.getMonth();
const modal = document.getElementById("customModalSetting");

// Dastlabki sanalarni inputlarga qo‘yish va tanlangan sanalarni belgilash
document.getElementById("startDate").value = formatDate(selectedStartDate);
document.getElementById("endDate").value = formatDate(selectedEndDate);
let selectedDates = {
  start: {
    year: selectedStartYear,
    month: selectedStartMonth,
    day: selectedStartDate.getDate(),
  },
  end: {
    year: selectedEndYear,
    month: selectedEndMonth,
    day: selectedEndDate.getDate(),
  },
};

function sendData() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  modal.style.display = "none";
  console.log(startDate, endDate);
  if (startDate && endDate) {
    return { startDate, endDate };
  }
  return {};
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

let firstAfterTodayAdded = false;

function renderCalendar(type) {
  let year = type === "start" ? selectedStartYear : selectedEndYear;
  let month = type === "start" ? selectedStartMonth : selectedEndMonth;
  let yearElement = document.getElementById(`${type}Year`);
  let monthElement = document.getElementById(`${type}Month`);
  let dayGrid = document.getElementById(`${type}DayGrid`);

  yearElement.textContent = year;
  monthElement.textContent = months[month];
  dayGrid.innerHTML = "";
  firstAfterTodayAdded = false;

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

    if (year === todayYear && month === todayMonth && day === todayDate) {
      dayBtn.classList.add("todayIs");
    }

    if (
      year < todayYear ||
      (year === todayYear && month < todayMonth) ||
      (year === todayYear && month === todayMonth && day < todayDate)
    ) {
      dayBtn.classList.add("past-day");
    }

    if (
      !firstAfterTodayAdded &&
      (year > todayYear ||
        (year === todayYear && month > todayMonth) ||
        (year === todayYear && month === todayMonth && day > todayDate))
    ) {
      dayBtn.classList.add("first-after-today");
      firstAfterTodayAdded = true;
    }

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

function selectDate(type, year, month, day) {
  const selectedDate = new Date(year, month, day);
  const formattedDate = formatDate(selectedDate);

  if (type === "start") {
    selectedStartDate = selectedDate;
    selectedStartYear = year;
    selectedStartMonth = month;
    selectedDates.start = { year, month, day };
    document.getElementById("startDate").value = formattedDate;
    closeModal("start");
  } else if (type === "end") {
    selectedEndDate = selectedDate;
    selectedEndYear = year;
    selectedEndMonth = month;
    selectedDates.end = { year, month, day };
    // EndDate o‘zgarganda StartDate ni 1 oy orqaga yangilash
    selectedStartDate = new Date(selectedEndDate);
    selectedStartDate.setMonth(selectedStartDate.getMonth() - 1);
    selectedStartYear = selectedStartDate.getFullYear();
    selectedStartMonth = selectedStartDate.getMonth();
    selectedDates.start = {
      year: selectedStartYear,
      month: selectedStartMonth,
      day: selectedStartDate.getDate(),
    };
    document.getElementById("startDate").value = formatDate(selectedStartDate);
    document.getElementById("endDate").value = formattedDate;
    closeModal("end");
  }

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

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Oy 1 dan boshlanadi
  const day = String(date.getDate()).padStart(2, "0");
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

