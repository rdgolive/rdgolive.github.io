window.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('order-form');
  var quantityInput = document.getElementById('quantity');
  var productSelect = document.getElementById('product');
  var errorBox = document.getElementById('error');
  var resultBox = document.getElementById('result');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var value = quantityInput.value.trim();
    var match = value.match(/^\d+$/);

    errorBox.textContent = '';
    resultBox.textContent = '';

    if (match === null) {
      errorBox.textContent = 'Ошибка: введите целое положительное число.';
      return;
    }

    var quantity = parseInt(value, 10);
    var price = parseInt(productSelect.value, 10);

    if (quantity <= 0) {
      errorBox.textContent = 'Ошибка: количество должно быть больше нуля.';
      return;
    }

    resultBox.textContent = 'Стоимость заказа: ' + (price * quantity) + ' ₽';
  });
});
