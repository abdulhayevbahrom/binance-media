document.querySelectorAll("#exit-user").forEach((element) => {
  element.addEventListener("click", () => {
    window.location.href = "/ru/login";
    localStorage.clear();
  });
});

// Sidebar accordions
const accordionButtons = document.querySelectorAll(
  ".sidebar__menu-item--accordion"
);

accordionButtons?.forEach((button) => {
  button?.addEventListener("click", () => {
    button.classList.toggle("sidebar__menu-item--open");
  });
});

function maskEmail(email) {
  let atIndex = email.indexOf("@");
  if (atIndex <= 4) {
    return email.slice(0, atIndex - 4) + "****" + email.slice(atIndex);
  }
  return email.slice(0, atIndex - 4) + "****" + email.slice(atIndex);
}

const headerEmail = document.querySelector(".staddrop-email");

const user = JSON.parse(localStorage.getItem("user"));

headerEmail.innerHTML = maskEmail(user.user_email);

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const mobileSelectedButton = document.querySelector(".sidebar-selected");

mobileSelectedButton?.addEventListener("click", () => {
  mobileSelectedButton?.classList.toggle("sidebar-selected--open");
  document.querySelector(".sidebar").classList.toggle("screen");

  if (document.body.style.overflow === "hidden") {
    document.body.style.overflow = "";
  } else {
    document.body.style.overflow = "hidden";
  }
});

// CONSTANTS
let balance;
let pnlData;

const initialHideState = localStorage.getItem("hide-balance") === "true";

try {
  const user = JSON.parse(localStorage.getItem("user"));

  (async () => {
    const response = await fetch(`${SERVER_URL}/accounts/account-balance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user.user_id }),
    });

    if (response.ok) {
      const data = await response.json();
      balance = data.balance;
      updateBalanceDisplay(initialHideState);
    } else {
      console.error("Ошибка:", response.statusText);
      return;
    }
  })();
} catch (error) {
  console.error(error);
}

try {
  const user = JSON.parse(localStorage.getItem("user"));

  (async () => {
    const response = await fetch(`${SERVER_URL}/accounts/daily-pnl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user?.user_id }),
    });

    if (response.ok) {
      const data = await response.json();
      pnlData = data;
      updateBalanceDisplay(initialHideState);
    } else {
      console.error("Ошибка:", response?.statusText);
      return;
    }
  })();
} catch (error) {
  console.error(error);
}

const selectedValue = localStorage.getItem("selected_currency");

let equivalentValue;

async function getEquivalentValue() {
  try {
    const response = await fetch(
      "https://api.binance.com/api/v3/ticker/24hr?symbol=USDCUSDT"
    );
    const data = await response.json();
    equivalentValue = Number(data.prevClosePrice);
    updateBalanceDisplay(initialHideState);
  } catch (error) {
    console.error("Error fetching ticker info:", error);
  }
}

getEquivalentValue();

const convertBalance = (currency) => {
  if (!currency || currency === "usdt") {
    return {
      balance: balance,
      equivalent: (balance * equivalentValue).toFixed(4),
    };
  } else if (currency === "btc") {
    return {
      balance: parseFloat((balance / 65000).toFixed(4)),
      equivalent: parseFloat(
        65000 * ((balance / 65000) * equivalentValue)
      ).toFixed(4),
    };
  } else if (currency === "eth") {
    return {
      balance: parseFloat((balance / 3400).toFixed(4)),
      equivalent: parseFloat(
        3400 * ((balance / 3400) * equivalentValue).toFixed(4)
      ),
    };
  } else if (currency === "bnb") {
    return {
      balance: parseFloat((balance / 600).toFixed(4)),
      equivalent: parseFloat(
        600 * ((balance / 600) * equivalentValue).toFixed(4)
      ),
    };
  }
};

// Function to update balance display based on hide state
const updateBalanceDisplay = (isHidden) => {
  const selectedValue = localStorage.getItem("selected_currency");
  const balanceEquivalents = document.querySelectorAll(".balance-equivalent");
  const balanceEquivalentsNotEqually = document.querySelectorAll(
    ".balance-equivalent--not-equally"
  );
  const balanceValues = document.querySelectorAll(".balance-value");
  const balancePnl = document.querySelectorAll(".balance-pnl");
  const balance = convertBalance(selectedValue).balance.toFixed(4);

  balanceValues.forEach((item) => {
    let [integerPart, decimalPart] = balance.toString().split(".");

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    let formattedBalance = decimalPart
      ? `${integerPart},${decimalPart}`
      : integerPart;

    item.textContent = isHidden ? "******" : formattedBalance;
  });

  balanceEquivalents.forEach((item) => {
    item.textContent = isHidden
      ? "******"
      : `≈ $${convertBalance(selectedValue).equivalent}`;
  });

  balanceEquivalentsNotEqually.forEach((item) => {
    item.textContent = isHidden
      ? "******"
      : `$${convertBalance(selectedValue).equivalent}`;
  });

  balancePnl.forEach((item) => {
    item.classList.add(pnlData?.pnl < 0 ? "negative" : "positive");

    item.textContent = isHidden
      ? "******"
      : `${pnlData?.pnl < 0 ? "-" : "+"} $${Math.abs(pnlData?.pnl)}(${Math.abs(
        pnlData?.percentage
      )}%)`;
  });
};

// Set initial state based on localStorage

// Handle button click to toggle balance display
const hideBalanceButton = document.querySelector(".hide-balance-button");

if (initialHideState) {
  hideBalanceButton.innerHTML = `<svg class="bn-svg text-base" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.94 5.06l16 16 2.12-2.12-2.446-2.447L23 12l-5.555-5.69a7.566 7.566 0 00-9.883-.87L5.06 2.94 2.939 5.06zm6.747 2.506a5 5 0 016.747 6.747L9.687 7.566z" fill="currentColor"></path><path d="M1 12l2.29-2.346 10.198 10.198a7.574 7.574 0 01-6.933-2.162L1 12z" fill="currentColor"></path></svg>`;
} else {
  hideBalanceButton.innerHTML = `<svg class="bn-svg text-base" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6.555 6.31L1 12l5.555 5.69a7.572 7.572 0 0010.89 0L23 12l-5.555-5.69a7.572 7.572 0 00-10.89 0zM17 12a5 5 0 11-10 0 5 5 0 0110 0z" fill="currentColor"></path></svg>`;
}

hideBalanceButton?.addEventListener("click", () => {
  const isHide = localStorage.getItem("hide-balance") === "true";

  if (isHide) {
    hideBalanceButton.innerHTML = `<svg class="bn-svg text-base" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6.555 6.31L1 12l5.555 5.69a7.572 7.572 0 0010.89 0L23 12l-5.555-5.69a7.572 7.572 0 00-10.89 0zM17 12a5 5 0 11-10 0 5 5 0 0110 0z" fill="currentColor"></path></svg>`;
    localStorage.setItem("hide-balance", "false");
    updateBalanceDisplay(false);
  } else {
    hideBalanceButton.innerHTML = `<svg class="bn-svg text-base" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.94 5.06l16 16 2.12-2.12-2.446-2.447L23 12l-5.555-5.69a7.566 7.566 0 00-9.883-.87L5.06 2.94 2.939 5.06zm6.747 2.506a5 5 0 016.747 6.747L9.687 7.566z" fill="currentColor"></path><path d="M1 12l2.29-2.346 10.198 10.198a7.574 7.574 0 01-6.933-2.162L1 12z" fill="currentColor"></path></svg>`;
    localStorage.setItem("hide-balance", "true");
    updateBalanceDisplay(true);
  }
});

// Tabs
const showTab = (elTabBtn) => {
  const elTab = elTabBtn.closest(".tab");
  if (elTabBtn.classList.contains("tab-btn-active")) {
    return;
  }
  const targetId = elTabBtn.dataset.targetId;
  const elTabPane = elTab.querySelector(`.tab-pane[data-id="${targetId}"]`);
  if (targetId === "1") {
    document.querySelector(".holdings__search").style.display = "none";
  } else {
    document.querySelector(".holdings__search").style.display = "flex";
  }
  if (elTabPane) {
    const elTabBtnActive = elTab.querySelector(".tab-btn-active");
    elTabBtnActive.classList.remove("tab-btn-active");
    const elTabPaneShow = elTab.querySelector(".tab-pane-show");
    elTabPaneShow.classList.remove("tab-pane-show");
    elTabBtn.classList.add("tab-btn-active");
    elTabPane.classList.add("tab-pane-show");
  }
};

document?.addEventListener("click", (e) => {
  if (e.target && !e.target.closest(".tab-btn")) {
    return;
  }
  const elTabBtn = e.target.closest(".tab-btn");
  showTab(elTabBtn);
});

// Table sort
const holdingsTable = document.querySelector(".holdings__table");

const svgDefault = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.166 8.99983L10.166 10.1008L7.99935 12.4349L5.83268 10.1008L5.83268 8.99983L10.166 8.99983Z" fill="#929AA5"></path>
                <path d="M5.83268 7L5.83268 5.89902L7.99935 3.56495L10.166 5.89902L10.166 7L5.83268 7Z" fill="#929AA5"></path>
            </svg>
        `;

const svgSortAscending = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.166 8.99983L10.166 10.1008L7.99935 12.4349L5.83268 10.1008L5.83268 8.99983L10.166 8.99983Z" fill="#FCD535"></path>
                <path d="M5.83268 7L5.83268 5.89902L7.99935 3.56495L10.166 5.89902L10.166 7L5.83268 7Z" fill="#929AA5"></path>
            </svg>
        `;

const svgSortDescending = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.166 8.99983L10.166 10.1008L7.99935 12.4349L5.83268 10.1008L5.83268 8.99983L10.166 8.99983Z" fill="#929AA5"></path>
                <path d="M5.83268 7L5.83268 5.89902L7.99935 3.56495L10.166 5.89902L10.166 7L5.83268 7Z" fill="#FCD535"></path>
            </svg>
        `;

const sortButtons = document.querySelectorAll(".holdings__sort-button");

function resetIcons() {
  sortButtons.forEach((button) => {
    button.innerHTML = svgDefault;
  });
}

resetIcons();

sortButtons.forEach((button) => {
  button?.addEventListener("click", () => {
    resetIcons();

    button.innerHTML =
      button.innerHTML === svgSortAscending
        ? svgSortDescending
        : svgSortAscending;
  });
});

document.querySelectorAll(".holdings__currency").forEach((info) => {
  info?.addEventListener("click", () => {
    let nextElement = info.nextElementSibling;
    while (
      nextElement &&
      !nextElement.classList.contains("holdings__currency")
    ) {
      if (nextElement.classList.contains("holdings__currency-subinfo")) {
        info.classList.toggle("active");
        nextElement.style.display =
          nextElement.style.display === "none" ? "flex" : "none";
      }
      nextElement = nextElement.nextElementSibling;
    }
  });
});

const underDollarCheckbox = document.querySelector("#underDollarCheckbox");

underDollarCheckbox?.addEventListener("click", () => {
  underDollarCheckbox?.classList.toggle("active");
});

new Swiper(".suggestions", {
  loop: true,
  slidesPerView: "auto",

  navigation: {
    nextEl: ".suggestions-next-button",
    prevEl: ".suggestions-prev-button",
  },
});
