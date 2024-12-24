const changeLang = (lang = null) => {
  let location = window.location.href;

  if (location.endsWith("/")) {
    location = location.slice(0, -1);
  }

  if (lang) {
    if (location.includes("/ru")) {
      window.location.href = location.replace("/ru", `/${lang}`);
    } else if (location.includes("/en")) {
      window.location.href = location.replace("/en", `/${lang}`);
    } else {
      console.error("URL не содержит языкового сегмента ('/ru' или '/en').");
    }
  } else {
    if (location.includes("/ru")) {
      window.location.href = location.replace("/ru", "/en");
    } else if (location.includes("/en")) {
      window.location.href = location.replace("/en", "/ru");
    } else {
      console.error("URL не содержит языкового сегмента ('/ru' или '/en').");
    }
  }
};
