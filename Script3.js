
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("calculator-form");
    const types = document.querySelectorAll('input[name="service-type"]');
    const optionsBlock = document.getElementById("options-block");
    const propertyBlock = document.getElementById("property-block");
    const serviceOption = document.getElementById("service-option");
    const extraProperty = document.getElementById("extra-property");
    const quantity = document.getElementById("quantity");
    const result = document.getElementById("calculator-result");

    if (
        !form || !types.length || !optionsBlock ||
        !propertyBlock || !serviceOption ||
        !extraProperty || !quantity || !result
    ) {
        return;
    }

    function updateCalculator() {
        const selectedType = document.querySelector(
            'input[name="service-type"]:checked'
        ).value;

        optionsBlock.hidden = selectedType !== "package";
        propertyBlock.hidden = selectedType !== "extra";

        let price = 0;

        if (selectedType === "basic") {
            price = 1500;
        }

        if (selectedType === "package") {
            price = Number(serviceOption.value);
        }

        if (selectedType === "extra") {
            price = 3000;

            if (extraProperty.checked) {
                price += 2000;
            }
        }

        const count = Number(quantity.value);

        if (!Number.isInteger(count) || count < 1) {
            result.textContent = "Введите количество не меньше 1.";
            return;
        }

        const total = price * count;

        result.textContent =
            "Стоимость услуги: " +
            total.toLocaleString("ru-RU") +
            " руб.";
    }

    types.forEach(function (type) {
        type.addEventListener("change", updateCalculator);
    });

    serviceOption.addEventListener("change", updateCalculator);
    extraProperty.addEventListener("change", updateCalculator);
    quantity.addEventListener("input", updateCalculator);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        updateCalculator();
    });

    updateCalculator();
});
