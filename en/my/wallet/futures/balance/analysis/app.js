// MAIN API
const API = SERVER_URL;

// TODAY'S DATE
let today_start = moment().startOf("day");
let today_end = moment().endOf("day");
// let currentPage = 1;

// NO DATA

function noData(margin_top) {
  return `
    <div style="margin-top: ${margin_top || 0}px;" class="no_data_box">
      <img width="50%" src="./analysis/assets/download.png" alt="No Data" />
      <p style="color: #848e9c; font-size: 16px; text-align: center; margin-top: 10px;">Нет данных</p>
    </div>`;
}

function goBack() {
  window.history.back();
}

// LOADING ELEMENT
const loadingElement = document.getElementById("loading");
// FUCNTIONS FOR LOADING ELEMENT HIDE AND SHOW
const showLoading = () => loadingElement.classList.remove("hidden");
const hideLoading = () => loadingElement.classList.add("hidden");

let user_info = JSON.parse(localStorage.getItem("user")) || {};
let user_id = user_info?.user_id || 0;

// USDUⓈ-M INFO --------------------------
let usd_coin_container = document.querySelector(".usd_coin_container");
let pnl_endpoint = "/accounts/pnl-by-number-last-days";
let [today, seven, month, all] = usd_coin_container.children;

// -----------------------------------------------------------

// PNL FOR TODAY
const pnl_today = async () => {
  // let data = await getData(pnl_endpoint, today_end, today_start);

  showLoading();

  let body = {
    user: { user_id },
    start_date: moment(today_start).format("YYYY-MM-DD"),
    end_date: moment(today_end).format("YYYY-MM-DD"),
  };

  let res = await axios.post(API + pnl_endpoint, body);

  hideLoading();
  let data = res?.data;

  let [title, qiymatlar] = today.children;
  let [percent, usd] = qiymatlar.children;

  percent.innerHTML = `${data?.percentage > 0 ? "+" : ""}${
    data?.percentage || 0
  } %`;
  usd.innerHTML = `${data?.pnl > 0 ? "+" : ""}${data?.pnl || 0} USD`;

  percent.style.color =
    data?.percentage < 0
      ? "#f64460"
      : data?.percentage > 0
      ? "#2ebd85"
      : "#fff";
  usd.style.color =
    data?.pnl < 0 ? "#f64460" : data?.pnl > 0 ? "#2ebd85" : "#fff";
};

// PNL FOR 7 DAY
const pnl_seven = async () => {
  let lastSevenDay = moment().subtract(7, "days").startOf("day");
  // let data = await getData(pnl_endpoint, lastSevenDay, today_start);

  showLoading();

  let body = {
    user: { user_id },
    start_date: moment(lastSevenDay).format("YYYY-MM-DD"),
    end_date: moment(today_start).format("YYYY-MM-DD"),
  };

  let res = await axios.post(API + pnl_endpoint, body);

  hideLoading();
  let data = res?.data;

  let [title, qiymatlar] = seven.children;
  let [percent, usd] = qiymatlar.children;

  percent.innerHTML = `${data?.percentage > 0 ? "+" : ""}${
    data?.percentage || 0
  } %`;
  usd.innerHTML = `${data?.pnl > 0 ? "+" : ""}${data?.pnl || 0} USD`;

  percent.style.color =
    data?.percentage < 0
      ? "#f64460"
      : data?.percentage > 0
      ? "#2ebd85"
      : "#fff";
  usd.style.color =
    data?.pnl < 0 ? "#f64460" : data?.pnl > 0 ? "#2ebd85" : "#fff";
};

// PNL FOR 30 DAY
const pnl_month = async () => {
  let lastSevenDay = moment().subtract(30, "days").startOf("day");
  // let data = await getData(pnl_endpoint, lastSevenDay, today_start);

  showLoading();

  let body = {
    user: { user_id },
    start_date: moment(lastSevenDay).format("YYYY-MM-DD"),
    end_date: moment(today_start).format("YYYY-MM-DD"),
  };

  let res = await axios.post(API + pnl_endpoint, body);

  hideLoading();
  let data = res?.data;

  let [title, qiymatlar] = month.children;
  let [percent, usd] = qiymatlar.children;

  percent.innerHTML = `${data?.percentage > 0 ? "+" : ""}${
    data?.percentage || 0
  } %`;
  usd.innerHTML = `${data?.pnl > 0 ? "+" : ""}${data?.pnl || 0} USD`;

  percent.style.color =
    data?.percentage < 0
      ? "#de5468"
      : data?.percentage > 0
      ? "#2ebd85"
      : "#fff";
  usd.style.color =
    data?.pnl < 0 ? "#de5468" : data?.pnl > 0 ? "#2ebd85" : "#fff";
};

// PNL FOR ALL DATE
const pnl_all = async () => {
  let year_start = moment().startOf("year");

  // let data = await getData(pnl_endpoint, year_start, today_start);

  showLoading();

  let body = {
    user: { user_id },
    start_date: moment(year_start).format("YYYY-MM-DD"),
    end_date: moment(today_start).format("YYYY-MM-DD"),
  };

  let res = await axios.post(API + pnl_endpoint, body);
  hideLoading();

  let data = res?.data;

  let [title, qiymatlar] = all.children;
  let [percent, usd] = qiymatlar.children;
  percent.innerHTML = `${data?.percentage > 0 ? "+" : ""}${
    data?.percentage || 0
  } %`;
  usd.innerHTML = `${data?.pnl > 0 ? "+" : ""}${data?.pnl || 0} USD`;

  percent.style.color =
    data?.percentage < 0
      ? "#de5468"
      : data?.percentage > 0
      ? "#2ebd85"
      : "#fff";
  usd.style.color =
    data?.pnl < 0 ? "#de5468" : data?.pnl > 0 ? "#2ebd85" : "#fff";
};

// ---------------------------------------------------------------
// ANALIS FROFIT AND LOSS
let profitAndLoss_endpoint = "/accounts/profit-and-loss-analysis";

let lastSevenDay = moment().subtract(7, "days").startOf("day");
const profitAndLoss = async (
  start_date = lastSevenDay,
  end_date = today_start
) => {
  // let data = await getData(profitAndLoss_endpoint, start_date, end_date);

  showLoading();

  let body = {
    user: { user_id },
    start_date: moment(start_date).format("YYYY-MM-DD"),
    end_date: moment(end_date).format("YYYY-MM-DD"),
  };

  let res = await axios.post(API + profitAndLoss_endpoint, body);
  hideLoading();
  let data = res?.data;

  // SHOWING ANALIS PROFIT AND LOSS DATA
  let analysis_item_left = document.querySelector(".analysis-item");
  let analysis_item_right = document.querySelector(".analysis_item_right");

  let [item1, item2, item3, item4, item5, item6] = analysis_item_left.children;
  let [item7, item8, item9, item10, item11] = analysis_item_right.children;

  let = [label, profit] = item1.children;
  let = [label, total_loss] = item2.children;
  let = [label, pnl] = item3.children;
  let = [label, total_amount] = item4.children;
  let = [label, profitability_ratio] = item5.children;
  let = [label, profit_days] = item6.children;
  let = [label, loss_days] = item7.children;
  let = [label, breakeven_days] = item8.children;
  let = [label, average_profit] = item9.children;
  let = [label, average_loss] = item10.children;
  let = [label, profit_loss_ratio] = item11.children;

  profit.innerHTML = (data?.profit || 0) + " USD";
  total_loss.innerHTML = (data?.loss || 0) + " USD";
  pnl.innerHTML = (data?.pnl || 0) + " USD";
  total_amount.innerHTML = (data?.total_amount || 0) + " USD";
  profitability_ratio.innerHTML = (data?.profitability_ratio || 0) + " %";
  profit_days.innerHTML = (data?.profit_days || 0) + " Дней";
  loss_days.innerHTML = (data?.loss_days || 0) + " Дней";
  breakeven_days.innerHTML = (data?.breakeven_days || 0) + " Дней";
  average_profit.innerHTML = (data?.average_profit || 0) + " USD";
  average_loss.innerHTML = (data?.average_loss || 0) + " USD";
  profit_loss_ratio.innerHTML = data?.profit_loss_ratio || 0;
};

// PROFIT AND LOSS FOR 7 DAYS
const profit_loss_weekly_btn = document.getElementById(
  "profit_loss_weekly_btn"
);

profit_loss_weekly_btn.onclick = async () => {
  let lastSevenDay = moment().subtract(7, "days").startOf("day");
  await profitAndLoss(lastSevenDay, today_start);

  await showData(lastSevenDay, today_start);
  await showData_total_pnl_by_days(lastSevenDay, today_start);
  await showData_usdt_btc_eth(lastSevenDay, today_start);

  let currentPage = sessionStorage.getItem("currentPage");
  sessionStorage.setItem(
    "start_date",
    moment(lastSevenDay).format("YYYY-MM-DD")
  );
  sessionStorage.setItem("end_date", moment(today_start).format("YYYY-MM-DD"));
  await showData_details(currentPage);

  await showData_active_values(lastSevenDay, today_start);
  await showData_analis_tiker(lastSevenDay, today_start);
  await showData_transaction(lastSevenDay, today_start);
  await showData_daily_comission(lastSevenDay, today_start);
  await showCheckBoxTransaktion(lastSevenDay, today_start);
  await showLastCircleDiagrams(lastSevenDay, today_start);

  await getModalData(lastSevenDay, today_start);
};

// PROFIT AND LOSS FOR, 1 MONTH || LAST 30 DAYS
const profit_loss_monthly_btn = document.getElementById(
  "profit_loss_monthly_btn"
);

profit_loss_monthly_btn.onclick = async () => {
  let start_month = moment().subtract(1, "month").startOf("day");
  await profitAndLoss(start_month, today_start);

  await showData(start_month, today_start);
  await showData_total_pnl_by_days(start_month, today_start);
  await showData_usdt_btc_eth(start_month, today_start);

  // let currentPage = sessionStorage.getItem("currentPage");
  sessionStorage.setItem(
    "start_date",
    moment(start_month).format("YYYY-MM-DD")
  );
  sessionStorage.setItem("end_date", moment(today_start).format("YYYY-MM-DD"));
  await showData_details(1);

  await showData_active_values(start_month, today_start);
  await showData_analis_tiker(start_month, today_start);
  await showData_transaction(start_month, today_start);
  await showData_daily_comission(start_month, today_start);
  await showCheckBoxTransaktion(start_month, today_start);
  await showLastCircleDiagrams(start_month, today_start);
  await getModalData(start_month, today_start);
};

// PROFIT AND LOSS FOR 3 MONTH
const profit_loss_threeMonth_btn = document.getElementById(
  "profit_loss_threeMonth_btn"
);
profit_loss_threeMonth_btn.onclick = async () => {
  let lastThreeMonth = moment().subtract(3, "month").startOf("day");
  await profitAndLoss(lastThreeMonth, today_start);

  await showData(lastThreeMonth, today_start);
  await showData_total_pnl_by_days(lastThreeMonth, today_start);
  await showData_usdt_btc_eth(lastThreeMonth, today_start);

  // let currentPage = sessionStorage.getItem("currentPage");
  sessionStorage.setItem(
    "start_date",
    moment(lastThreeMonth).format("YYYY-MM-DD")
  );
  sessionStorage.setItem("end_date", moment(today_start).format("YYYY-MM-DD"));
  await showData_details(1);

  await showData_active_values(lastThreeMonth, today_start);
  await showData_analis_tiker(lastThreeMonth, today_start);
  await showData_transaction(lastThreeMonth, today_start);
  await showData_daily_comission(lastThreeMonth, today_start);
  await showCheckBoxTransaktion(lastThreeMonth, today_start);
  await showLastCircleDiagrams(lastThreeMonth, today_start);

  await getModalData(lastThreeMonth, today_start);
};

// PROFIT AND LOSS FOR 1 YEAR
const profit_loss_yearly_btn = document.getElementById(
  "profit_loss_yearly_btn"
);
profit_loss_yearly_btn.onclick = async () => {
  let lastyear = moment().subtract(1, "year").startOf("day");
  // ----------------
  await profitAndLoss(lastyear, today_start);

  await showData(lastyear, today_start);
  await showData_total_pnl_by_days(lastyear, today_start);
  await showData_usdt_btc_eth(lastyear, today_start);

  // let currentPage = sessionStorage.getItem("currentPage");
  sessionStorage.setItem("start_date", moment(lastyear).format("YYYY-MM-DD"));
  sessionStorage.setItem("end_date", moment(today_start).format("YYYY-MM-DD"));
  await showData_details(1);

  await showData_active_values(lastyear, today_start);
  await showData_analis_tiker(lastyear, today_start);
  await showData_transaction(lastyear, today_start);
  await showData_daily_comission(lastyear, today_start);
  await showCheckBoxTransaktion(lastyear, today_start);
  await showLastCircleDiagrams(lastyear, today_start);
  await getModalData(lastyear, today_start);
};

let dateRange = document.getElementById("dateRange");

// Sayt yuklanganda hech qanday hodisa ishlamasligi uchun `onchange` funksiyasini dastlab `null`ga o'rnatamiz
dateRange.onchange = null;

// Daterangepicker sozlamalarini yuklaymiz
$(function () {
  $("#dateRange").daterangepicker(
    {
      opens: "right",
      autoApply: true,
      locale: {
        format: "YYYY-MM-DD",
        applyLabel: "Apply",
        cancelLabel: "Cancel",
        fromLabel: "From",
        toLabel: "To",
        customRangeLabel: "Custom Range",
        daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        monthNames: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      startDate: moment().subtract(1, "days"),
      endDate: moment(),
    },
    function (start, end) {
      // Sanalar tanlanganda `onchange` funksiyasini qo'shamiz
      dateRange.onchange = async (e) => {
        let value = e?.target?.value.split(" ");

        let start_date = value[0];
        let end_date = value[value.length - 1];

        await profitAndLoss(start_date, end_date);

        await showData(start_date, end_date);
        await showData_total_pnl_by_days(start_date, end_date);
        await showData_usdt_btc_eth(start_date, end_date);

        // let currentPage = sessionStorage.getItem("currentPage");
        sessionStorage.setItem(
          "start_date",
          moment(lastyear).format("YYYY-MM-DD")
        );
        sessionStorage.setItem(
          "end_date",
          moment(today_start).format("YYYY-MM-DD")
        );
        await showData_details(1);

        await showData_active_values(start_date, end_date);
        await showData_analis_tiker(start_date, end_date);
        await showData_transaction(start_date, end_date);
        await showData_daily_comission(start_date, end_date);
        await showCheckBoxTransaktion(start_date, end_date);
        await showLastCircleDiagrams(start_date, end_date);

        await getModalData(start_date, end_date);
      };
    }
  );
});

// DOWNLOAD SHARE DATA
document.getElementById("downloadBtn").addEventListener("click", () => {
  var modalMain = document.getElementById("modalMain");
  html2canvas(modalMain)
    .then(function (canvas) {
      var link = document.createElement("a");
      link.download = "мой_PnL_по_фьючерсным.png"; // Имя файла PNG
      link.href = canvas.toDataURL("image/png"); // Экспорт в формате PNG
      link.click(); // Скачивание изображения
    })
    .catch((error) => console.error("Ошибка при создании изображения:", error));
});

let modal_endpoint = "/accounts/to-share-pnl";

async function getModalData(start_date, end_date) {
  let pnl_percentage = document.querySelector(".pnl-percentage");
  let pnl_perOne = document.querySelector(".pnl-perOne");
  let pnl_perTwo = document.querySelector(".pnl-perTwo");
  let modalImg = document.getElementById("modal_Img");
  let referral_code = document.querySelector(".referral-code");
  let modal_period_dates = document.querySelector(".share-modal__period");
  let [from, to] = modal_period_dates.children;

  showLoading();

  let body = {
    user: { user_id },
    start_date: moment(start_date).format("YYYY-MM-DD"),
    end_date: moment(end_date).format("YYYY-MM-DD"),
  };

  let res = await axios.post(API + modal_endpoint, body);
  hideLoading();
  let data = res?.data;

  from.innerHTML = moment(start_date).format("YYYY-MM-DD");
  to.innerHTML = moment(end_date).format("YYYY-MM-DD");

  pnl_percentage.innerHTML = data?.total_pnl_percent + "%";
  pnl_perOne.innerHTML = data?.total_pnl;
  pnl_perTwo.innerHTML = data?.profitability_ratio + "%";
  modalImg.src = data?.ref_qr_data;
  referral_code.innerHTML = data?.ref_code;

  pnl_percentage.style.color =
    data?.total_pnl_percent < 0 ? "#d00a32" : "#14b783";
  pnl_perTwo.style.color = data?.total_pnl_percent < 0 ? "#d00a32" : "#14b783";
  pnl_perOne.style.color = data?.total_pnl_percent < 0 ? "#d00a32" : "#14b783";
}

// OPEN SHARE MODAL
document.getElementById("openModal").addEventListener("click", async () => {
  const modal = document.querySelector(".share_modal_wrapper");
  modal.style.display = "block"; // Показать модальное окно
});

// HIDE SHARE MODAL
document.querySelector(".share_modal_close").addEventListener("click", () => {
  const modal = document.querySelector(".share_modal_wrapper");
  setTimeout(() => {
    modal.style.display = "none"; // Скрыть модальное окно
  }, 300);
});

const profitabilityRatioCheckbox = document.querySelector("#post");
const sharePnlCheckbox = document.querySelector("#freei");

profitabilityRatioCheckbox.addEventListener("click", () => {
  profitabilityRatioCheckbox.classList.toggle("active");
  document.querySelector("#profitability-ratio-box").classList.toggle("active");
});

sharePnlCheckbox.addEventListener("click", () => {
  sharePnlCheckbox.classList.toggle("active");
  document.querySelector("#share-pnl-box").classList.toggle("active");
});

// CALLING   USDUⓈ-M FUNCTION AND DEFAULT ANALIS PROFIT AND LOSS FUNCTIONS
(async function () {
  let lastSevenDay = moment().subtract(7, "days").startOf("day");
  await getModalData(lastSevenDay, today_start);
  await pnl_today();
  await pnl_seven();
  await pnl_month();
  await pnl_all();
  await profitAndLoss();
})();

(async function () {
  let lastSevenDay = moment().subtract(7, "days").startOf("day");
  await showData(lastSevenDay, today_start);
  await showData_total_pnl_by_days(lastSevenDay, today_start);
  await showData_usdt_btc_eth(lastSevenDay, today_start);
  await showData_details(currentPage, lastSevenDay, today_start);
  await showData_active_values(lastSevenDay, today_start);
  await showData_analis_tiker(lastSevenDay, today_start);
  await showData_transaction(lastSevenDay, today_start);
  await showData_daily_comission(lastSevenDay, today_start);
  await showCheckBoxTransaktion(lastSevenDay, today_start);
  await showLastCircleDiagrams(lastSevenDay, today_start);
})();

//#################4454####################
// PNL FOR DAYS LINE CHART AND CALENDAR ------------------------------------
let pnlChartInstance;
async function showData(start_date, end_date) {
  let pnl_for_day_enpoint = "/accounts/daily-and-cumulative-pnl";
  // let data = await getData(pnl_for_day_enpoint, start_date, end_date);
  showLoading();

  let body = {
    user: { user_id },
    start_date: moment(start_date).format("YYYY-MM-DD"),
    end_date: moment(end_date).format("YYYY-MM-DD"),
  };

  let res = await axios.post(API + pnl_for_day_enpoint, body);

  hideLoading();
  let data = res?.data;

  if (data) {
    let values = Object.values(data?.daily_pnl);
    let keys = Object.keys(data?.daily_pnl).map((value) =>
      moment(value).format("MM-DD")
    );

    const ctx = document.getElementById("pnlChart").getContext("2d");

    // Agar eski diagramma mavjud bo'lsa, uni yo'q qilamiz
    if (pnlChartInstance) {
      pnlChartInstance.destroy();
    }

    // Yangi diagramma yaratamiz
    pnlChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: keys, // Metkalar (x o'qi uchun)
        datasets: [
          {
            label: "PNL по дням",
            data: values, // Ma'lumotlar
            backgroundColor: function (context) {
              const value = context.dataset.data[context.dataIndex];
              return value < 0 ? "#e74c3c" : "#11CB80"; // Qizil (salbiy), yashil (ijobiy)
            },
            borderWidth: 0,
            // hoverBackgroundColor: "#3498db", // Fon rangi kursor bilan
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: "#444",
            },
            ticks: {
              color: "#999",
            },
          },
          x: {
            grid: {
              color: "#191a1f",
            },
            ticks: {
              color: "#999",
            },
            barPercentage: 0.7, // Ustun kengligi
            categoryPercentage: 0.5, // Kategoriya bo'shlig'i
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#333",
            titleColor: "#fff",
            bodyColor: "#fff",
            callbacks: {
              label: function (context) {
                return `PNL по дням: ${context.raw} USD`;
              },
            },
          },
        },
      },
    });

    // FOR CALENDAR
    const serverData = data?.daily_pnl;
    let cumulative_pnl = data?.cumulative_pnl;
    let cumulative_pnl_percentage = data?.cumulative_pnl_percentage;
    let daily_transfers = data?.daily_transfers;
    let daily_volume = data?.daily_volume;

    // Oy selectorini topish
    const daysContainer = document.getElementById("days-container");
    const monthSelector = document.getElementById("month-selector");

    // Extract unique months from server data
    const uniqueMonths = Array.from(
      new Set(Object.keys(serverData).map((date) => date.slice(0, 7)))
    );

    // Clear existing options in the selector to avoid duplicates
    monthSelector.innerHTML = "";

    // Add each unique month as a select option
    uniqueMonths.forEach((month) => {
      const option = document.createElement("option");
      option.value = month;
      option.text = month;
      monthSelector.appendChild(option);
    });

    // Display the calendar for the first unique month as the default
    if (uniqueMonths.length > 0) {
      const [initialYear, initialMonth] = uniqueMonths[0].split("-");
      createCalendar(parseInt(initialMonth) - 1, parseInt(initialYear));
    }

    // Initialize currentYear and currentMonth for tracking
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    // Update the calendar when a new month is selected
    monthSelector.addEventListener("change", (e) => {
      const [year, month] = e.target.value.split("-");

      // Check if the selected month is different from the current one
      const currentMonthValue = `${currentYear}-${String(
        currentMonth + 1
      ).padStart(2, "0")}`; // Format current month as "YYYY-MM"

      if (e.target.value !== currentMonthValue) {
        createCalendar(parseInt(month) - 1, parseInt(year));
      }
    });

    function createCalendar(month, year) {
      // Clear existing days in the calendar
      daysContainer.innerHTML = "";

      // Number of days in the current month
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Get the day of the week for the first day (0 = Sunday, 1 = Monday, ...)
      const firstDayIndex = new Date(year, month, 1).getDay();

      // Get today's date for comparison
      const today = new Date();
      const todayDateString = `${today.getFullYear()}-${
        today.getMonth() + 1 < 10 ? "0" : ""
      }${today.getMonth() + 1}-${
        today.getDate() < 10 ? "0" : ""
      }${today.getDate()}`;

      // Create empty days before the first day
      for (let i = 0; i < firstDayIndex; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("day", "no-data");
        daysContainer.appendChild(emptyDay);
      }

      // Create each day of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.innerText = day;

        const currentDate = `${year}-${month + 1 < 10 ? "0" : ""}${month + 1}-${
          day < 10 ? "0" : ""
        }${day}`;

        // Check if today's or a past date
        const isPastOrToday = new Date(currentDate) <= today;

        // Check if there's data for the day
        if (serverData[currentDate] !== undefined) {
          const pnl = serverData[currentDate];
          const datas = {
            dayli_pnl: serverData[currentDate] || 0,
            summ_pnl: cumulative_pnl || 0,
            summ_pnl_proc: cumulative_pnl_percentage || 0,
            summ_translations: daily_transfers[currentDate] || 0,
            trading_volume: daily_volume[currentDate] || 0,
          };

          // Apply positive, negative, or neutral class based on the PNL value
          if (pnl > 0) {
            dayDiv.classList.add("positive");
          } else if (pnl < 0) {
            dayDiv.classList.add("negative");
          } else if (isPastOrToday) {
            dayDiv.classList.add("neutral");
          }

          // Add the PNL value
          const pnlSpan = document.createElement("span");
          pnlSpan.classList.add(
            "day-value",
            pnl > 0 ? "positive" : pnl < 0 ? "negative" : "neutral"
          );
          pnlSpan.innerText = (pnl > 0 ? "+" : "") + pnl.toFixed(2);
          dayDiv.appendChild(pnlSpan);

          // Show modal on mouseover
          dayDiv.addEventListener("mouseover", () => {
            const modal = document.createElement("div");
            modal.classList.add("modalDay");
            modal.style.position = "absolute";
            modal.style.zIndex = "1";
            modal.style.backgroundColor = "#fffffff0";
            modal.style.border = "1px solid #888";
            modal.style.borderRadius = "10px";
            modal.style.fontFamily = "Binance PLEX";
            modal.style.padding = "10px";
            modal.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
            modal.style.color = "#222";

            modal.innerHTML = `
              <p style="margin-bottom:7px;">${currentDate}</p>
              <p>Дневной PNL: <span style="color: ${
                datas?.dayli_pnl > 0
                  ? "#2ebd85"
                  : datas?.dayli_pnl < 0
                  ? "#e1545e"
                  : "#222"
              };">${
              (datas?.dayli_pnl > 0 ? "+" : "") + datas?.dayli_pnl
            } USD</span></p>
              <p>Суммарный PNL: <span style="color: ${
                datas?.summ_pnl > 0
                  ? "#2ebd85"
                  : datas?.summ_pnl < 0
                  ? "#e1545e"
                  : "#222"
              };">${
              (datas?.summ_pnl > 0 ? "+" : "") + datas?.summ_pnl
            } USD</span></p>
              <p>Суммарный PNL %: <span style="color: ${
                datas?.summ_pnl_proc > 0
                  ? "#2ebd85"
                  : datas?.summ_pnl_proc < 0
                  ? "#e1545e"
                  : "#222"
              };">${
              (datas?.summ_pnl_proc > 0 ? "+" : "") + datas?.summ_pnl_proc
            } %</span></p>
              <p>Суммарные переводы, нетто: <span style="color: ${
                datas?.summ_translations > 0
                  ? "#2ebd85"
                  : datas?.summ_translations < 0
                  ? "#e1545e"
                  : "#222"
              };">${datas?.summ_translations}</span></p>
              <p>Объем торгов: <span>${datas?.trading_volume}</span></p>
            `;

            const rect = dayDiv.getBoundingClientRect();
            modal.style.top = `${rect.bottom + window.scrollY + 10}px`;
            modal.style.left = `${rect.left}px`;
            document.body.appendChild(modal);

            dayDiv.addEventListener("mouseout", () => modal.remove());
          });
        } else if (isPastOrToday) {
          // Apply neutral class and default value for past or today's dates only
          dayDiv.classList.add("neutral");
          const pnlSpan = document.createElement("span");
          pnlSpan.classList.add("day-value", "neutral");
          pnlSpan.innerText = "0.00";
          dayDiv.appendChild(pnlSpan);
        }

        daysContainer.appendChild(dayDiv);
      }
    }
  }
}

// TOTAL PNL BY DAYS => LINE CHART --------------------------------------
// let total_pnl_by_days = "/accounts/total-pnl-by-days";
let total_pnl_by_days = "/accounts/last-days-account-margin-balance";
let usdtChartInstance; // Global o'zgaruvchi diagrammani saqlash uchun
async function showData_total_pnl_by_days(start_date, end_date) {
  let days = moment(end_date).diff(moment(start_date), "days") + 1;

  showLoading();

  let body = { user_id, days };
  let res = await axios.post(API + total_pnl_by_days, body);
  hideLoading();
  let data = res?.data;

  if (data) {
    let values = Object.values(data);
    let keys = Object.keys(data).map((value) => moment(value).format("MM-DD"));

    const usdtCtx = document.getElementById("usdtChart").getContext("2d");
    // Agar eski diagramma mavjud bo'lsa, uni yo'q qilamiz
    if (usdtChartInstance) {
      usdtChartInstance.destroy();
    }

    let verticalLinePlugin = {
      id: "verticalLine",
      afterDraw: function (chart) {
        if (chart.tooltip._active && chart.tooltip._active.length) {
          let activePoint = chart.tooltip._active[0];
          let ctx = chart.ctx;
          let x = activePoint.element.x;
          let topY = chart?.scales?.y?.top;
          let bottomY = chart?.scales?.y?.bottom;

          // Draw the vertical line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.setLineDash([5, 5]);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#ffffff"; // White color for the vertical line
          ctx.stroke();
          ctx.restore();
        }
      },
    };
    Chart.register(verticalLinePlugin);
    // Yangi diagramma yaratamiz
    usdtChartInstance = new Chart(usdtCtx, {
      type: "line",
      data: {
        labels: keys, // Sanalar (X o'qi uchun)
        datasets: [
          {
            label: "",
            data: values, // Ma'lumotlar (USDT qiymatlari)
            borderColor: "#f3b60f", // PNL uchun sariq chiziq
            borderWidth: 2,
            backgroundColor: "transparent",
            pointBackgroundColor: "yellow",
            pointBorderColor: "yellow",
            fill: false,
            tension: 0,
            pointRadius: 7, // Nuqtalar olib tashlanadi
            pointHoverRadius: 7, // Faqat hover qilinganda ko'rsatiladi
            pointBackgroundColor: "transparent", // Hover qilinganda nuqtaning rangi
            pointBorderColor: "transparent", // Hover qilinganda nuqtaning rangi
            pointHoverBackgroundColor: "#f3b60f", // Hover qilinganda nuqtaning rangi
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 1,
            shadowColor: "#f3b60f", // Shadow color for Asset Value 1
            shadowBlur: 10, // Blur radius for the shadow
            shadowOffsetX: 0, // Horizontal offset for the shadow
            shadowOffsetY: 0, // Vertical offset for the shadow
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: "#444", // Y o'qi uchun grid rangi
            },
            ticks: {
              color: "#999", // Y o'qi metkalarining rangi
            },
          },
          x: {
            grid: {
              color: "#191a1f", // X o'qi uchun grid rangi
            },
            ticks: {
              color: "#999", // X o'qi metkalarining rangi
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              display: true, // Legenda ko'rsatilmaydi
              usePointStyle: true, // Doira shaklidagi rangli belgilar
              pointStyle: "line", // Chiziqli doira shakli
              padding: 30, // Har bir element orasidagi bo'shliq
              color: "#fff",
            },
            position: "bottom", //
          },

          tooltip: {
            enabled: true,
            backgroundColor: "#fff",
            titleColor: "#000",
            bodyColor: "#000",
            borderColor: "#ccc",
            borderWidth: 1,
            position: "average", // Tooltip pozitsiyasini eng yaqin nuqtaga joylashtiradi
            yAlign: "bottom", // Tooltipni tepa qismida ko'rsatadi
            callbacks: {
              label: function (context) {
                return `Совокупный PNL: ${context.raw} USD`;
              },
            },
          },
        },

        interaction: {
          mode: "index", // Interact with all datasets at once
          intersect: false, // Don't require exact intersection with a point
        },
      },
    });
  }
}

// TOTAL PNL %, BTC %, BNB %  => LINE CHART --------------------------------------
let usdt_btc_eth_endpoint = "/accounts/percentage-pnl-btc-bnb-by-last-days";
let multiLineChartInstance; // Global o'zgaruvchi, diagramma holatini saqlash uchun

async function showData_usdt_btc_eth(start_date, end_date) {
  // let data = await getData(usdt_btc_eth_endpoint, start_date, end_date);

  showLoading();

  let body = {
    user: { user_id },
    start_date: moment(start_date).format("YYYY-MM-DD"),
    end_date: moment(end_date).format("YYYY-MM-DD"),
  };

  let res = await axios.post(API + usdt_btc_eth_endpoint, body);

  hideLoading();
  let data = res?.data;

  let pnl_percentage_changes = data?.pnl_percentage_changes || {};
  let btc_percentage_changes = data?.btc_percentage_changes || {};
  let bnb_percentage_changes = data?.bnb_percentage_changes || {};

  let labels = Object.keys(pnl_percentage_changes)?.map((value) =>
    moment(value).format("MM-DD")
  );

  let pnl_values = Object.values(pnl_percentage_changes);
  let btc_values = Object.values(btc_percentage_changes);
  let bnb_values = Object.values(bnb_percentage_changes);

  const multiLineCtx = document
    .getElementById("multiLineChart")
    .getContext("2d");

  // Eski grafikni yo'q qilish
  if (multiLineChartInstance) {
    multiLineChartInstance.destroy();
  }
  let verticalLinePlugin = {
    id: "verticalLine",
    beforeDatasetsDraw(chart) {
      if (chart.tooltip?._active?.length) {
        let ctx = chart.ctx;
        let activePoint = chart.tooltip._active[0];
        let x = activePoint.element.x;
        let topY = chart?.scales?.y?.top;
        let bottomY = chart?.scales?.y?.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]); // Chiziqni kesik ko'rinishida qilish
        ctx.strokeStyle = "#ffffff"; // Chiziq rangi
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  Chart.register(verticalLinePlugin);

  // Yangi grafik yaratish
  multiLineChartInstance = new Chart(multiLineCtx, {
    type: "line",
    data: {
      labels, // Sanalar (X o'qi uchun)
      datasets: [
        {
          label: "Совокупный PNL %",
          data: pnl_values, // PNL ma'lumotlari
          borderColor: "#f3b60f", // PNL uchun sariq chiziq
          backgroundColor: "transparent",
          fill: true,
          pointStyle: "rect",
          tension: 0,
          borderWidth: 2,
          pointRadius: 9,
          pointHoverRadius: 9,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
          pointHoverBackgroundColor: "#f3b60f",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 1,
          shadowColor: "#f3b60f", // Shadow color for Asset Value 1
          shadowBlur: 10, // Blur radius for the shadow
          shadowOffsetX: 4, // Horizontal offset for the shadow
          shadowOffsetY: 4, // Vertical offset for the shadow
        },
        {
          label: "Совокупная цена маркировки BTCUSDT PERP, %",
          data: btc_values,
          borderColor: "#005eda",
          backgroundColor: "transparent",
          fill: true,
          tension: 0,
          borderWidth: 2,
          pointRadius: 7,
          pointHoverRadius: 7,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
          pointHoverBackgroundColor: "#005eda",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 1,
          shadowColor: "#005eda", // Shadow color for Asset Value 1
          shadowBlur: 10, // Blur radius for the shadow
          shadowOffsetX: 4, // Horizontal offset for the shadow
          shadowOffsetY: 4, // Vertical offset for the shadow
        },
        {
          label: "Совокупная цена маркировки BNBUSDT PERP, %",
          data: bnb_values,
          borderColor: "#ff7700",
          backgroundColor: "transparent",
          fill: true,
          tension: 0,
          borderWidth: 2,
          pointRadius: 7,
          pointHoverRadius: 7,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
          pointHoverBackgroundColor: "#ff7700",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 1,
          shadowColor: "#ff7700", // Shadow color for Asset Value 1
          shadowBlur: 10, // Blur radius for the shadow
          shadowOffsetX: 4, // Horizontal offset for the shadow
          shadowOffsetY: 4, // Vertical offset for the shadow
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: "#444",
          },
          ticks: {
            color: "#999",
          },
        },
        x: {
          beginAtZero: false,
          grid: {
            color: "#191a1f",
          },
          ticks: {
            color: "#999",
          },
        },
      },
      plugins: {
        legend: {
          display: window.innerWidth > 550, // Media query asosida
          labels: {
            color: "#fff",
            usePointStyle: true,
            pointStyle: "line",
          },
          position: "bottom",
        },
        tooltip: {
          backgroundColor: "#fff",
          titleColor: "#444",
          bodyColor: "#444",
          callbacks: {
            label(context) {
              let label = context.dataset.label || "";
              let value = context.raw || 0;
              return `${label}: ${Math.floor(value)}%`;
            },
          },
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
    },
  });
  window.addEventListener("resize", () => {
    multiLineChartInstance.options.plugins.legend.display =
      window.innerWidth > 550;
    multiLineChartInstance.update();
  });
}

// --------------------------------------

// Линейный график для BTC
let active_values_endpoint = "/accounts/total-pnl-by-days";

let btcChart; // BTC chart uchun global o'zgaruvchi
let assetOverviewChart; // Circle diagram uchun global o'zgaruvchi

async function showData_active_values(start_date, end_date) {
  try {
    // let data = await getData(active_values_endpoint, start_date, end_date);
    showLoading();

    let body = {
      user: { user_id },
      start_date: moment(start_date).format("YYYY-MM-DD"),
      end_date: moment(end_date).format("YYYY-MM-DD"),
    };

    let res = await axios.post(API + active_values_endpoint, body);

    hideLoading();
    let data = res?.data;

    let keys = Object.keys(data || {})?.map((value) =>
      moment(value).format("MM-DD")
    );
    let values = Object.values(data || {});

    let value_for_circle_diagram = values
      ?.map((i) => +i)
      ?.reduce((a, b) => a + b, 0);

    if (keys?.length) {
      // Agar btcChart mavjud bo'lsa, uni yo'q qilamiz
      if (btcChart) {
        btcChart.destroy();
      }

      // LINE CHART FOR AVTIVES
      const btcCtx = document.getElementById("btcChart").getContext("2d");

      let verticalLinePlugin = {
        id: "verticalLine",
        afterDraw: function (chart) {
          if (chart.tooltip._active && chart.tooltip._active.length) {
            let activePoint = chart.tooltip._active[0];
            let ctx = chart.ctx;
            let x = activePoint.element.x;
            let topY = chart?.scales?.y?.top;
            let bottomY = chart?.scales?.y?.bottom;

            // Draw the vertical line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.setLineDash([5, 5]);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#ffffff"; // White color for the vertical line
            ctx.stroke();
            ctx.restore();
          }
        },
      };
      Chart.register(verticalLinePlugin);
      btcChart = new Chart(btcCtx, {
        type: "line",
        data: {
          labels: keys, // Sana (labels)
          datasets: [
            {
              label: "Значение BTC",
              data: values, // BTC qiymatlari
              borderColor: "#f3b60f", // PNL uchun sariq chiziq
              backgroundColor: "transparent", // Zamin rangi
              fill: true, // Grafika to'ldirish
              tension: 0,
              pointBorderColor: "transparent",
              pointHoverBackgroundColor: "#f3b60f",
              pointRadius: 7,
              pointHoverBorderColor: "#fff",
              borderWidth: 2, // Nuqtalar olib tashlanadi
              pointHoverRadius: 7, // Faqat hover qilinganda ko'rsatiladi
              pointHoverBorderWidth: 1,
              shadowColor: "#f3b60f", // Shadow color for Asset Value 1
              shadowBlur: 10, // Blur radius for the shadow
              shadowOffsetX: 0, // Horizontal offset for the shadow
              shadowOffsetY: 0, // Vertical offset for the shadow
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                color: "#444", // O'q grid rangini o'rnatish
              },
              ticks: {
                color: "#999", // O'q belgilari rangini o'rnatish
              },
            },
            x: {
              grid: {
                color: "#191a1f", // X o'qidagi grid rangini o'rnatish
              },
              ticks: {
                color: "#999", // X o'q belgilari rangini o'rnatish
              },
            },
          },
          plugins: {
            legend: {
              display: false, // Legendni ko'rsatmaslik
            },
            tooltip: {
              enabled: true,
              backgroundColor: "#fff",
              titleColor: "#000",
              bodyColor: "#000",
              borderColor: "#ccc",
              borderWidth: 1,
              position: "average", // Tooltip pozitsiyasini eng yaqin nuqtaga joylashtiradi
              yAlign: "bottom", // Tooltipni tepa qismida ko'rsatadi
              xPadding: 10, // Tooltipning gorizontal paddingi
              yPadding: 10, // Tooltipning vertikal paddingi
              caretPadding: 10, // Tooltip va nuqta orasidagi masofa
              caretSize: 6, // Tooltipning uchining kattaligi
              callbacks: {
                label: function (context) {
                  return `Стоимость: ${context.raw} USD`;
                },
              },
            },
          },
          interaction: {
            mode: "index", // Interact with all datasets at once
            intersect: false, // Don't require exact intersection with a point
          },
        },
      });

      // Agar assetOverviewChart mavjud bo'lsa, uni yo'q qilamiz
      if (assetOverviewChart) {
        assetOverviewChart.destroy();
      }

      // SHOW ACTIVES CIRCLE DIAGRAM

      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        // Diagramma ma'lumotlari
        if (value_for_circle_diagram > 0) {
          var data = google.visualization.arrayToDataTable([
            ["Asset", "Value"],
            ["USDT", value_for_circle_diagram],
            ["BTC", 0],
          ]);

          var options = {
            title: "",
            pieHole: 0.6, // Doughnut ko'rinishi uchun
            backgroundColor: "transparent", // Orqa fonni shaffof qilish
            pieSliceBorderColor: "none", // Qism chegarasini olib tashlash
            pieSliceText: "none", // Qismlar uchun qiymatni ko'rsatish
            legend: {
              position: "none",
            },
            slices: {
              0: { shadow: { color: "#328EFD", x: 15, y: 15 } }, // 0-indeksli qism uchun
              1: { shadow: { color: "#FCD535", x: 15, y: 15 } }, // 1-indeksli qism uchun
            },
            tooltip: {
              isHtml: false,
              trigger: "none", // Tooltipni umuman ko'rsatmaslik
            },
            width: 300,
            height: 280,
          };

          // Diagramma ob'ektini yaratish va chizish
          var chart = new google.visualization.PieChart(
            document.getElementById("assetOverviewChart")
          );
          chart.draw(data, options);
          document.getElementById("pieChart_labels_show_active").innerHTML = `
          <span>BTC 100% <br/>
          `;
          // <span style="color: #b3b3b3; font-size: 13px">${value_for_circle_diagram} USD</span></span>
        } else {
          document.getElementById("assetOverviewChart").innerHTML = noData(70);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// ###################################
// DETAILS

let currentPage = 1;
let totalPages = 1; // umumiy sahifalar soni

// Ma'lumot olish funksiyasi
async function showData_details(page) {
  let start_date = sessionStorage.getItem("start_date") || lastSevenDay;
  let end_date = sessionStorage.getItem("end_date") || today_start;

  try {
    let body = {
      user: { user_id },
      start_date: moment(start_date).format("YYYY-MM-DD"),
      end_date: moment(end_date).format("YYYY-MM-DD"),
      pagination: {
        page_number: page,
        page_size: 10,
      },
    };
    let res = await axios.post(API + "/accounts/history-profit-and-loss", body);

    let data = res?.data; // Ma'lumotlar ro'yxati

    // Jadvalni tozalash va yangi ma'lumotlar qo'shish
    let details_table_body = document.getElementById("details_table_body");
    details_table_body.innerHTML = "";

    data.forEach((item) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
    <td class="dayOf_details">${item.date}</td>
    <td data-label="Daily PNL (USD)">${item.dayli_pnl} USD</td>
    <td data-label="Cumulative PNL (USD)">${item.summ_pnl} USD</td>
    <td data-label="Cumulative PNL %">${item.summ_pnl_proc}</td>
    <td data-label="Net Transfer Amount (USD)">${item.summ_translations} USD</td>
    <td data-label="Trading Volume">${item.trading_volume}</td>
  `;
      details_table_body.appendChild(tr);
    });
    // Tugmalarni yangilash
    document.getElementById("prev-btn").disabled = currentPage <= 1;
    document.getElementById("next-btn").disabled = data.length < 10;
  } catch (error) {
    console.error("error>>>", error);
  }
}

// Oldingi sahifaga o'tish
document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    sessionStorage.setItem("currentPage", currentPage);
    showData_details(currentPage);
  }
});

// Keyingi sahifaga o'tish
document.getElementById("next-btn").addEventListener("click", () => {
  currentPage++;
  sessionStorage.setItem("currentPage", currentPage);
  showData_details(currentPage);
});

// Dastlabki ma'lumotlarni yuklash
showData_details(currentPage);

// ###################################
const dataElements = document.querySelectorAll(".eyeO-N");
const eyeIcon = document.querySelector(".toggle-eye");

// Сохраняем оригинальный текст в каждом элементе
dataElements.forEach((dataElement) => {
  dataElement.dataset.original = dataElement.innerText; // Сохраняем оригинальный текст
  dataElement.dataset.hidden = "false"; // Устанавливаем начальное состояние видимости
});

// Устанавливаем обработчик события для иконки
eyeIcon.addEventListener("click", () => {
  let isHidden = dataElements[0].dataset.hidden === "true";

  // Итерируемся по всем элементам и меняем их текст
  dataElements.forEach((dataElement) => {
    if (isHidden) {
      window.location.reload();
    } else {
      // Если данные видимы, скрываем их
      dataElement.innerText = "*".repeat(dataElement.dataset.original.length); // Заменяем текст на '*'
      dataElement.dataset.hidden = "true"; // Устанавливаем состояние видимости
    }
  });

  // Меняем иконку
  if (isHidden) {
    eyeIcon.classList.remove("fa-eye-slash"); // Убираем иконку закрытого глаза
    eyeIcon.classList.add("fa-eye"); // Добавляем иконку открытого глаза
  } else {
    eyeIcon.classList.remove("fa-eye"); // Убираем иконку открытого глаза
    eyeIcon.classList.add("fa-eye-slash"); // Добавляем иконку закрытого глаза
  }
});

// --------------------------
function openTab(evt, tabName) {
  // Hide all tab contents
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    tabcontent[i].classList.remove("active");
  }

  // Remove the active class from all buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the current tab and add active class
  document.getElementById(tabName).style.display = "block";
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

// -----------------------------
// Ikonalar ustida bosilganini kuzatish
document.getElementById("chartIcon").addEventListener("click", function () {
  document.getElementById("pnlChart").style.display = "block"; // Chart ko'rsatish
  document.getElementById("calendarTitle").style.display = "none"; // Chart ko'rsatish
  document.getElementById("calendarDiv").style.display = "none"; // Kalendarni yashirish
  this.classList.add("active"); // Faol ikonni belgilang
  document.getElementById("calendarIcon").classList.remove("active"); // Kalendar ikonini o'chirish
});

document.getElementById("calendarIcon").addEventListener("click", function () {
  document.getElementById("pnlChart").style.display = "none"; // Chartni yashirish
  document.getElementById("calendarTitle").style.display = "block"; // Chart ko'rsatish
  document.getElementById("calendarDiv").style.display = "block"; // Kalendarni ko'rsatish
  this.classList.add("active"); // Faol ikonni belgilang
  document.getElementById("chartIcon").classList.remove("active"); // Chart ikonini o'chirish
});
// -----------10-------------

let daily_comission_endpoint = "/accounts/daily-funding-fees";

let ctxChart; // Global o'zgaruvchi e'lon qilish (chartni keyinchalik tozalash uchun)

async function showData_daily_comission(start_date, end_date) {
  try {
    // let data = await getData(daily_comission_endpoint, start_date, end_date);
    showLoading();

    let body = {
      user: { user_id },
      start_date: moment(start_date).format("YYYY-MM-DD"),
      end_date: moment(end_date).format("YYYY-MM-DD"),
    };

    let res = await axios.post(API + daily_comission_endpoint, body);

    hideLoading();
    let data = res?.data;

    let keys = Object.keys(data || {})?.map((value) =>
      moment(value).format("MM-DD")
    );
    let values = Object.values(data || {});

    if (keys?.length) {
      // Agar chart mavjud bo'lsa, uni yo'q qilamiz
      if (ctxChart) {
        ctxChart?.destroy();
      }

      // Line Chart for Daily Funding Commission
      const ctxLine = document.getElementById("lineChart").getContext("2d");

      ctxChart = new Chart(ctxLine, {
        type: "bar",
        data: {
          labels: keys, // Метки для оси X
          datasets: [
            {
              label: "PNL по дням",
              data: values, // Данные для графика
              backgroundColor: function (context) {
                const value = context?.dataset?.data[context?.dataIndex];
                return value < 0 ? "#e74c3c" : "#11CB80"; // Красный для отрицательных, зеленый для положительных
              },
              borderWidth: 0,
              // hoverBackgroundColor: "#3498db", // Цвет фона при наведении
              bodyFont: {
                family: "Binance PLEX", // Y o'qi uchun shrift
              },
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false, // Y o'q nol bo'lmasligi kerak
              grid: {
                color: "#444", // Grid chiziqlari rangi
              },
              ticks: {
                color: "#999", // O'qdagi belgilarning rangi
                font: {
                  family: "Binance PLEX", // Y o'qi uchun shrift
                },
              },
            },
            x: {
              grid: {
                color: "#191a1f", // X o'q grid chiziqlari rangi
              },
              ticks: {
                color: "#999", // X o'qdagi belgilarning rangi
              },
              // Ustunlar orasidagi bo'shliqni to'g'irlash:
              barPercentage: 0.6, // Ustun kengligi
              categoryPercentage: 0.8, // Kategoriya bo'shlig'i
            },
          },
          plugins: {
            legend: {
              display: false, // Legendni ko'rsatmaslik
            },
            tooltip: {
              backgroundColor: "#333", // Tooltip zamin rangi
              titleColor: "#fff", // Tooltip sarlavha rangi
              bodyColor: "#fff", // Tooltip matn rangi
              callbacks: {
                label: function (context) {
                  return `Значение: ${context.raw} USD`; // Tooltip matnida ko'rsatiladigan qiymat
                },
              },
            },
          },
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

// Круговая диаграмма активов
// Pie Chart for Distribution of Received Commission

// const ctxPie = document.getElementById("pieChart").getContext("2d");
// SHOW ACTIVES CIRCLE DIAGRAM

// SHOW LAST DIAGRAMMS
let daily_comission = "/accounts/allocation-of-financing-fees";
async function showLastCircleDiagrams(start_date, end_date) {
  try {
    // let data = await getData(daily_comission, start_date, end_date);
    showLoading();

    let body = {
      user: { user_id },
      start_date: moment(start_date).format("YYYY-MM-DD"),
      end_date: moment(end_date).format("YYYY-MM-DD"),
    };

    let res = await axios.post(API + daily_comission, body);

    hideLoading();
    let data = res?.data;

    let received = data?.allocation_received?.btcusdt || 0;
    let paid = data?.allocation_paid?.btcusdt || 0;

    // Google Charts yuklanadi
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      // Diagramma chizish yoki "No Data" ko'rsatish
      if (received > 0) {
        var chartData = google.visualization.arrayToDataTable([
          ["Asset", "Value"],
          ["BTCUSDT", received],
          ["BTCUSDC", 0],
        ]);

        // Diagramma parametrlari
        var options = {
          title: "",
          pieHole: 0.6,
          backgroundColor: "transparent",
          pieSliceBorderColor: "none",
          pieSliceText: "none",
          legend: {
            position: "none",
          },
          slices: {
            0: { color: "#328EFD", shadow: { color: "yellow", x: 15, y: 15 } },
            1: { color: "#FCD535", shadow: { color: "yellow", x: 15, y: 15 } },
          },
          tooltip: {
            isHtml: false,
            trigger: "none",
          },
          width: 300, // Chartning kengligi
          height: 280,
        };

        // Diagramma ob'ektini yaratish va chizish
        var chart = new google.visualization.PieChart(
          document.getElementById("pieChart")
        );
        chart.draw(chartData, options);
        document.getElementById("pieChart_labels_one").innerHTML = `
          <span>BTCUSDT 100.00% <br/> <span style="color: #b3b3b3; font-size: 13px">${received} USD</span></span>
          `;

        // <span id="label_2">BTCUSDC: 0 %</span>
      } else {
        document.getElementById("pieChart").innerHTML = noData();
      }
    }

    // -------------------------------------------------------------
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawCharta);

    function drawCharta() {
      // Diagramma ma'lumotlari
      if (paid > 0) {
        var data = google.visualization.arrayToDataTable([
          ["Nomi", "Qiymati"],
          ["BTCUSDT", paid],
          ["BTCUSDC", 0],
        ]);

        // Diagramma parametrlarini sozlash
        var options = {
          title: "",
          pieHole: 0.6, // Doughnut ko'rinishi uchun
          backgroundColor: "transparent", // Orqa fonni shaffof qilish
          pieSliceBorderColor: "none", // Qism chegarasini olib tashlash
          pieSliceText: "none", // Qismlar uchun qiymatni ko'rsatish
          legend: {
            position: "none", // Legendani pastga qo'yish
          },
          slices: {
            0: { color: "#328EFD", shadow: { color: "yellow", x: 15, y: 15 } }, // 0-indeksli qism uchun rang
            1: {
              color: "#FCD535",
              shadow: { color: "yellow", x: 15, y: 15 },
            }, // 1-indeksli qism uchun rang
          },
          tooltip: {
            // Tooltipni o'chirish
            isHtml: false,
            trigger: "none", // Tooltipni umuman ko'rsatmaslik
          },
          width: 300, // Chartning kengligi
          height: 280, // Chartning balandligi
        };

        // Diagramma ob'ektini yaratish va chizish
        var chart = new google.visualization.PieChart(
          document.getElementById("pieChartTwo")
        );
        chart.draw(data, options);
        document.querySelector(".pieChart_labels_two").innerHTML = `
        <span>BTCUSDT 100.00% <br/> <span style="color: #b3b3b3; font-size: 13px">${paid} USD</span></span>
        `;

        // <span id="label_2">BTCUSDC: 0 %</span>
      } else {
        document.getElementById("pieChartTwo").innerHTML = noData();
      }
    }
  } catch (err) {
    console.log(err);
  }
}

// ---------------11-----------------

let analis_enpoint = "/accounts/ticker-analysis";
async function showData_analis_tiker(start_date, end_date) {
  try {
    // let data = await getData(analis_enpoint, start_date, end_date);

    showLoading();

    let body = {
      user: { user_id },
      start_date: moment(start_date).format("YYYY-MM-DD"),
      end_date: moment(end_date).format("YYYY-MM-DD"),
    };

    let res = await axios.post(API + analis_enpoint, body);

    hideLoading();
    let data = res?.data;

    const tbody = document.querySelector(".table tbody");
    tbody.innerHTML = "";

    let keys = Object.keys(data || {})?.map((value) =>
      moment(value).format("MM-DD")
    );

    if (keys.length) {
      let datalab = [
        {
          ticker: "BTCUSDT",
          // image: "/analysis/assets/bitcoin.png",
          image: "./assets/bitcoin.png",
          ...data,
        },
        {
          ticker: "ETHUSDT",
          // image: "/analysis/assets/ethereum.png",
          image: "./assets/ethereum.png",
          total_pnl: 0,
          profit: 0,
          loss: 0,
          total_purchases: 0,
          total_sales: 0,
          average_purchase_price: 0,
          average_selling_price: 0,
        },
      ];

      datalab.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
            <div style="display: flex;align-items:center; gap: 5px;">
                <img width="25" src="${item.image}" alt="">
                ${item.ticker}
            </div>
        </td>
        <td>${item.total_pnl}</td>
        <td>${item.profit}</td>
        <td>${item.loss}</td>
        <td>${item.total_purchases}</td>
        <td>${item.total_sales}</td>
        <td>${item.average_purchase_price}</td>
        <td>${item.average_selling_price}</td>
    `;
        tbody.appendChild(row);
      });
    }
  } catch (err) {
    console.log(err);
  }
}

// ------- transaktion ---------------
// TRANSAKTION 3 TASI
let transaction_endpoint = "/accounts/total-funding-fees";
async function showData_transaction(start_date, end_date) {
  try {
    // let data = await getData(transaction_endpoint, start_date, end_date);

    showLoading();

    let body = {
      user: { user_id },
      start_date: moment(start_date).format("YYYY-MM-DD"),
      end_date: moment(end_date).format("YYYY-MM-DD"),
    };

    let res = await axios.post(API + transaction_endpoint, body);

    hideLoading();
    let data = res?.data;

    const total_sum = document.getElementById("total_sum");
    const total_received = document.getElementById("total_received");
    const total_paid = document.getElementById("total_paid");

    total_sum.innerHTML = data?.total_sum || 0 + " USD";
    total_received.innerHTML = data?.total_received || 0 + " USD";
    total_paid.innerHTML = data?.total_paid || 0 + " USD";
  } catch (err) {
    console.log(err);
  }
}

all_sum_komiccy_for_transaction_checkbox.onclick = (e) =>
  (all_sum_komiccy_for_transaction.style.display = e.target.checked
    ? "block"
    : "none");

// SHOW CHECKBOX TRANSAKTION
let checkbox_transaktion_api = "/accounts/financing-and-transaction-fees";
async function showCheckBoxTransaktion(start_date, end_date) {
  try {
    // let data = await getData(checkbox_transaktion_api, start_date, end_date);

    showLoading();

    let body = {
      user: { user_id },
      start_date: moment(start_date).format("YYYY-MM-DD"),
      end_date: moment(end_date).format("YYYY-MM-DD"),
    };

    let res = await axios.post(API + checkbox_transaktion_api, body);

    hideLoading();
    let data = res?.data;

    checkbox_transaktion_text.innerHTML = (data || 0) + " USD";
  } catch (error) {
    console.log(error);
  }
}

// ----------12----------------------
// Fokusda bo'lgan tugmani aktiv qilish uchun
document
  .querySelectorAll(".usd_coin_filter_by_date_nav button")
  .forEach((button) => {
    button.addEventListener("focus", () => {
      // Barcha tugmalarning aktivligini olib tashlash
      document
        .querySelectorAll(".usd_coin_filter_by_date_nav button")
        .forEach((btn) => {
          btn.classList.remove("active");
        });

      // Fokuslangan tugmaga aktiv klassini qo'shish
      button.classList.add("active");
    });
  });

const tooltip = document.querySelector(".tooltip-nav");
const tooltipText = document.querySelector(".tooltip-text");
let timeout;

tooltip.addEventListener("mouseenter", () => {
  clearTimeout(timeout); // Tooltip ochilganda timeoutni to'xtatish
  tooltipText.style.visibility = "visible";
  tooltipText.style.opacity = "1";
});

tooltip.addEventListener("mouseleave", () => {
  timeout = setTimeout(() => {
    tooltipText.style.visibility = "hidden";
    tooltipText.style.opacity = "0";
  }, 0); // 1 soniyadan so'ng tooltip yopiladi
});

// <!---------Tooltip----------->
// Select tooltip elements
document.querySelectorAll(".tooltip-main").forEach((item) => {
  let tooltip;

  item.addEventListener("mouseenter", (event) => {
    const tooltipText = event.target.getAttribute("data-tooltip");

    // Create tooltip element
    tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    tooltip.innerText = tooltipText;

    // Append tooltip to the trigger element
    item.appendChild(tooltip);

    // Show tooltip
    setTimeout(() => {
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = "1";
    }, 0);
  });

  item.addEventListener("mouseleave", () => {
    if (tooltip) {
      // Hide tooltip
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
      if (tooltip) item.removeChild(tooltip);
    }
  });
});

// clear sessionstorage
window.addEventListener("beforeunload", () => {
  sessionStorage.clear();
});
