document.querySelector("#btn-night").addEventListener("click", () => {
  document.body.classList.toggle("white");
  document.querySelector(".header-container").classList.toggle("white");
  document.querySelector(".header-night").classList.toggle("hidden");
  document.querySelector(".header-day").classList.toggle("hidden");
  document.querySelector(".btn-web.gray").classList.toggle("day");
  document.querySelectorAll(".header-icon").forEach(element => {
    element.classList.toggle("day");
  });
  document.querySelectorAll(".icon-drop").forEach(el => {
    el.classList.toggle("day");
  });
  document.querySelectorAll(".header-item").forEach(element => {
    element.classList.toggle("day");
  });
  document.querySelectorAll(".header-drop").forEach(element => {
    element.classList.toggle("day");
  });
  document.querySelector(".search-block").classList.toggle("day");
  document.querySelectorAll(".staddrop").forEach(element => {
    element.classList.toggle("day");
  });
  document.querySelectorAll(".staddrop-state").forEach(element => {
    element.classList.toggle("day");
  });
  document.querySelectorAll(".staddrop-item").forEach(element => {
    element.classList.toggle("day");
  });
  document.querySelector(".footer-switch").classList.toggle("active");
  //Ниже пишем Условия для маин:
});

// ПЕРЕКЛЮЧАТЕЛЬ ДНЯ_НОЧИ В ФУТЕРЕ
document.querySelector(".footer-switch")?.addEventListener("click", e => {
  document.querySelector(".footer-switch").classList.toggle("active");
  document.querySelector(".header-night").classList.toggle("hidden");
  document.querySelector(".header-day").classList.toggle("hidden");
  document.body.classList.toggle("white");
  document.querySelector(".header-container").classList.toggle("white");
  document.querySelector(".btn-web.gray").classList.toggle("day");
  document.querySelectorAll(".header-icon").forEach(element => {
    element.classList.toggle("day");
  });
  document.querySelectorAll(".icon-drop").forEach(el => {
    el.classList.toggle("day");
  });
  document.querySelectorAll(".header-item").forEach(element => {
    element.classList.toggle("day");
  });
  document.querySelectorAll(".header-drop").forEach(element => {
    element.classList.toggle("day");
  });
  document.querySelector(".search-block").classList.toggle("day");
  document.querySelectorAll(".staddrop").forEach(element => {
    element.classList.toggle("day");
  });
  document.querySelectorAll(".staddrop-state").forEach(element => {
    element.classList.toggle("day");
  });
  document.querySelectorAll(".staddrop-item").forEach(element => {
    element.classList.toggle("day");
  });
  //Ниже пишем Условия для маин:
});

// выпадающий список при наведение на навигацию
const navItem = document.querySelectorAll(".header-item");
const navHeader = document.querySelectorAll(".header-item a");

navItem.forEach(e => {
  e.addEventListener("mouseenter", () => {
    navHeader.forEach(e => {
      e.style.color = "#EAECEF";
    });
  });
});

// ввод в поиск
document.querySelector(".search-input")?.addEventListener("input", function () {
  if (this.value !== "") {
    document.querySelector(".initdata").classList.add("hidden");
    document.querySelector(".search-closed").classList.add("active");
    document.querySelector(".history").classList.add("hidden");
    document.querySelector(".result").classList.remove("hidden");
    document.querySelector(`[data-target=result-all]`).classList.add("open");
  } else {
    document.querySelector(".search-closed").classList.remove("active");
    document.querySelector(".initdata").classList.remove("hidden");
    document.querySelector(".history").classList.remove("hidden");
    document.querySelector(".result").classList.add("hidden");
    document.querySelector(`[data-target=result-all]`).classList.remove("open");
  }
});

// Очистить инпут у поиска
document.querySelector(".search-closed")?.addEventListener("click", () => {
  document.querySelector(".search-input").value = "";
  document.querySelector(".search-closed").classList.remove("active");
  document.querySelector(".initdata").classList.remove("hidden");
  document.querySelector(".result").classList.add("hidden");
  document.querySelector(".history").classList.remove("hidden");
  document.querySelectorAll(".results").forEach(e => {
    e.classList.remove("open");
  });
});

//Скролл по горисзонтали с зажатием левой кнопки
const slider = document.querySelector(".result-tabs");
let isDown = false;
let startX;
let scrollLeft;

slider?.addEventListener("mousedown", e => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider?.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider?.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider?.addEventListener("mousemove", e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1;
  slider.scrollLeft = scrollLeft - walk;
});

// Отображение категорий поиска от радио кнопок
const radioButton = document.querySelectorAll(".result-radio");
const infoSection = document.querySelectorAll(".results");
let radioValid;

radioButton.forEach(e => {
  e?.addEventListener("click", e => {
    const blockRender = e.currentTarget.dataset.path;

    infoSection.forEach(e => {
      if (
        !document
          .querySelector(`[data-target=${blockRender}]`)
          .classList.contains("open")
      ) {
        e.classList.remove("open");
        document.querySelector(`[data-target=${blockRender}]`);
        radioValid = setTimeout(() => {
          document
            .querySelector(`[data-target=${blockRender}]`)
            .classList.add("open");
        }, 0);
      }
    });
  });
});

// кнопки далее в поиске в категории все...
document.querySelector("#function-btn")?.addEventListener("click", () => {
  document.querySelector("#result-func").checked = true;
  document.querySelector(`[data-target=result-all]`).classList.remove("open");
  document.querySelector(`[data-target=result-func]`).classList.add("open");
});

document.querySelector("#ad-btn")?.addEventListener("click", () => {
  document.querySelector("#result-ad").checked = true;
  document.querySelector(`[data-target=result-all]`).classList.remove("open");
  document.querySelector(`[data-target=result-ad]`).classList.add("open");
});

document.querySelector("#square-btn")?.addEventListener("click", () => {
  document.querySelector("#result-square").checked = true;
  document.querySelector(`[data-target=result-all]`).classList.remove("open");
  document.querySelector(`[data-target=result-square]`).classList.add("open");
});

document.querySelector("#spot-btn")?.addEventListener("click", () => {
  document.querySelector("#result-spot").checked = true;
  document.querySelector(`[data-target=result-all]`).classList.remove("open");
  document.querySelector(`[data-target=result-spot]`).classList.add("open");
});

document.querySelector("#futures-btn")?.addEventListener("click", () => {
  document.querySelector("#result-futures").checked = true;
  document.querySelector(`[data-target=result-all]`).classList.remove("open");
  document.querySelector(`[data-target=result-futures]`).classList.add("open");
});

document.querySelector("#earn-btn")?.addEventListener("click", () => {
  document.querySelector("#result-earn").checked = true;
  document.querySelector(`[data-target=result-all]`).classList.remove("open");
  document.querySelector(`[data-target=result-earn]`).classList.add("open");
});

document.querySelector("#faq-btn")?.addEventListener("click", () => {
  document.querySelector("#result-faq").checked = true;
  document.querySelector(`[data-target=result-all]`).classList.remove("open");
  document.querySelector(`[data-target=result-faq]`).classList.add("open");
});

// Бэку надо это настроить (у меня временное решение), очистить историю поиска
document.querySelector("#history-delete")?.addEventListener("click", () => {
  document.querySelector(".history").classList.add("hidden");
});

// ПОИСК: Открыть блок поиска
const search = document.querySelector("#search");
const serchBlock = document.querySelector(".search-block");

document.querySelector("#search")?.addEventListener("click", () => {
  serchBlock.classList.toggle("hidden");
  document.querySelector(".search-input").focus();
});

//КЛИК ВНЕ ПОИСКА, ЗАКРЫТЬ БЛОК (Без фона)
document?.addEventListener("click", e => {
  const withinBoundaries = e
    .composedPath()
    .includes(document.querySelector(".search"));

  if (!withinBoundaries) {
    serchBlock.classList.add("hidden"); // скрываем элемент т к клик был за его пределами
  }
});

// Закрыть блок поиска
document.querySelector(".search-cancel").addEventListener("click", () => {
  document.querySelector(".search-block").classList.add("hidden");
});

// изменить название почты на ***
let str = document.querySelector(".staddrop-email");
str.textContent = str.textContent.replace(/(?!^).(?=.+@)/g, "*");

// ОТКРЫТЬ Алерт привязать аккаунт к твиттеру
document.querySelector("#link-twitter").addEventListener("click", () => {
  document.querySelector(".black").classList.add("active");
  document.querySelector("#al-twitter").classList.add("open");
  document.body.classList.add("noscroll");
});

// Алерт привязать аккаунт к твиттеру
document
  .getElementById("alert-twitter")?.addEventListener("change", function (e) {
    document.getElementById("btn-linktwitter").disabled = !e.target.checked;
  });

// закрыть алерт привязать твиттер
document.querySelector("#closed-linkTwitter")?.addEventListener("click", () => {
  document.querySelector(".black").classList.remove("active");
  document.querySelector("#al-twitter").classList.remove("open");
  document.body.classList.remove("noscroll");
});

// ОТКРЫТЬ АЛЕРК COOKIES
document.querySelector(".footer-cookies")?.addEventListener("click", () => {
  document.querySelector(".black").classList.add("active");
  document.querySelector("#al-cookies").classList.add("open");
  document.body.classList.add("noscroll");
});

// Переключение свитча у алерта куков
document.querySelector("#cookie-funk")?.addEventListener("click", () => {
  document.querySelector("#cookie-funk").classList.toggle("active");
});
document.querySelector("#cookie-target")?.addEventListener("click", () => {
  document.querySelector("#cookie-target").classList.toggle("active");
});
document.querySelector("#cookie-operating")?.addEventListener("click", () => {
  document.querySelector("#cookie-operating").classList.toggle("active");
});

// Отклонить все
document.querySelector("#cookies-reject")?.addEventListener("click", () => {
  document.querySelector("#cookie-funk").classList.remove("active");
  document.querySelector("#cookie-target").classList.remove("active");
  document.querySelector("#cookie-operating").classList.remove("active");
  document.querySelector(".black").classList.remove("active");
  document.querySelector("#al-cookies").classList.remove("open");
  document.body.classList.remove("noscroll");
});

// Открыть блок о кукис
document.querySelector("#accordion-btn1")?.addEventListener("click", () => {
  document.querySelector(".cookies-settings").classList.remove("open");
  document.querySelector(".cookies-info").classList.add("open");
});
document.querySelector("#accordion-btn2")?.addEventListener("click", () => {
  document.querySelector(".cookies-settings").classList.remove("open");
  document.querySelector(".cookies-info").classList.add("open");
});
document.querySelector("#accordion-btn3")?.addEventListener("click", () => {
  document.querySelector(".cookies-settings").classList.remove("open");
  document.querySelector(".cookies-info").classList.add("open");
});
document.querySelector("#accordion-btn4")?.addEventListener("click", () => {
  document.querySelector(".cookies-settings").classList.remove("open");
  document.querySelector(".cookies-info").classList.add("open");
});

//back
document.querySelector("#cookie-back")?.addEventListener("click", () => {
  document.querySelector(".cookies-settings").classList.add("open");
  document.querySelector(".cookies-info").classList.remove("open");
});

// Открыть фильтры кукис
document.querySelector("#cookies-filterbtn")?.addEventListener("click", () => {
  document.querySelector(".cookies-drop").classList.toggle("open");
});

//Очистить фильтры кукис
document.querySelector("#cookies-filterClear")?.addEventListener("click", () => {
  document.querySelector("#c-filter1").checked = false;
  document.querySelector("#c-filter2").checked = false;
  document.querySelector("#c-filter3").checked = false;
  document.querySelector("#c-filter4").checked = false;
});

// закрыть фильтры кукис
document
  .querySelector("#cookies-filtercancel")?.addEventListener("click", () => {
    document.querySelector(".cookies-drop").classList.remove("open");
  });
