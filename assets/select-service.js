const selectLabel = document.getElementById("order-select__value");
const options = document.querySelectorAll(".order-select__option");
const selectOpen = document.querySelector(".order-select__label");
const listWrapper = document.querySelector(".order-select__list-wrapper-box");

selectLabel.textContent = "ВСЕ";

options.forEach(option => {
    option.addEventListener("click", () => {
        const selectedValue = option.getAttribute("data-value");
        selectLabel?.textContent = option?.textContent.trim();
        options.forEach(opt => opt.classList.remove("selected"));
        option.classList.add("selected");
        console.log(`Tanlangan qiymat: ${selectedValue}`);
    });
});

// Event listener qo'shing
const IsSelectOpen = () => {
    listWrapper.classList.toggle("active");
};














