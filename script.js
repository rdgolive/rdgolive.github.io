window.addEventListener('DOMContentLoaded', function () {
  var quantityInput = document.getElementById('quantity');
  var typeRadios = document.getElementsByName('serviceType');
  var optionsBlock = document.getElementById('options-block');
  var optionSelect = document.getElementById('serviceOption');
  var propertyBlock = document.getElementById('property-block');
  var propertyCheckbox = document.getElementById('serviceProperty');
  var errorBox = document.getElementById('error');
  var resultBox = document.getElementById('result');

  var prices = {
    types: { '1': 500, '2': 800, '3': 1000 }
  };

  function getSelectedType() {
    var selected = '1';
    for (var i = 0; i < typeRadios.length; i += 1) {
      if (typeRadios[i].checked) {
        selected = typeRadios[i].value;
      }
    }
    return selected;
  }

  function toggleFields(type) {
    if (type === '2') {
      optionsBlock.classList.remove('d-none');
      propertyBlock.classList.add('d-none');
    } else if (type === '3') {
      optionsBlock.classList.add('d-none');
      propertyBlock.classList.remove('d-none');
    } else {
      optionsBlock.classList.add('d-none');
      propertyBlock.classList.add('d-none');
    }
  }

  function updatePrice() {
    var type = getSelectedType();
    toggleFields(type);

    var value = quantityInput.value.trim();
    var match = value.match(/^\d+$/);

    errorBox.textContent = '';
    resultBox.textContent = '';

    if (match === null) {
      errorBox.textContent = 'Ошибка: введите целое положительное число.';
      return;
    }

    var quantity = parseInt(value, 10);
    if (quantity <= 0) {
      errorBox.textContent = 'Ошибка: количество должно быть больше нуля.';
      return;
    }

    var price = prices.types[type];
    if (type === '2') {
      price += parseInt(optionSelect.value, 10);
    }
    if (type === '3' && propertyCheckbox.checked) {
      price += parseInt(propertyCheckbox.value, 10);
    }

    resultBox.textContent = 'Стоимость заказа: ' + (price * quantity) + ' ₽';
  }

  quantityInput.addEventListener('input', updatePrice);
  optionSelect.addEventListener('change', updatePrice);
  propertyCheckbox.addEventListener('change', updatePrice);
  for (var i = 0; i < typeRadios.length; i += 1) {
    typeRadios[i].addEventListener('change', updatePrice);
  }

  updatePrice();
});
