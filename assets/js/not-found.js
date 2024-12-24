document.addEventListener("DOMContentLoaded", function () {
  async function checkPageExists(url) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (response.status === 404) {
        window.location.replace("/ru");
      }
    } catch (error) {
      window.location.replace("/ru");
    }
  }

  const currentPath = window.location.pathname;

  checkPageExists(currentPath);
});
