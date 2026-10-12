document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("calculator-form");
    const product = document.getElementById("product");
    const quantity = document.getElementById("quantity");
    const result = document.getElementById("calculator-result");

    if (!form || !product || !quantity || !result) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const price = Number(product.value);
        const count = Number(quantity.value);

        if (!Number.isInteger(count) || count < 1) {
            result.textContent = "Введите количество не меньше 1.";
            return;
        }

        result.textContent =
            "Стоимость заказа: " +
            (price * count).toLocaleString("ru-RU") +
            " руб.";
    });
});