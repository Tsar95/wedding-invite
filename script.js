document.getElementById("rsvp-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  const plusOneChecked = document.getElementById("plus-one-checkbox").checked;
  const guestsCount = plusOneChecked ? 2 : 1;

  let message = `Новая заявка на свадьбу:\nКоличество гостей: ${guestsCount}\n\n`;

  message += `Гость 1:\n`;
  message += `Имя: ${data.get('name')}\n`;
  message += `Фамилия: ${data.get('surname')}\n`;
  message += `Телефон: ${data.get('phone')}\n`;
  message += `Пожелания по напиткам: ${data.get('drinks') || 'Нет'}\n\n`;

  if (plusOneChecked) {
    message += `Гость 2:\n`;
    message += `Имя: ${data.get('plus_one_name') || 'Не указано'}\n`;
    message += `Фамилия: ${data.get('plus_one_surname') || 'Не указано'}\n`;
    message += `Пожелания по напиткам: ${data.get('plus_one_drinks') || 'Нет'}\n\n`;
  }

  const botToken = '7648969221:AAEK_zQwoXtyleuN-V8DuABHiWjS_nrLGT0'; // вставь свой токен
  const chatId = '-4608590602'; // вставь свой chat_id

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  }).then(response => {
    if (response.ok) {
      document.getElementById("response").innerText = "Спасибо! Мы получили вашу анкету.";
      form.reset();
      document.getElementById("plus-one-fields").style.display = "none";
      document.getElementById("guest-count").innerText = '1';
    } else {
      document.getElementById("response").innerText = "Ошибка отправки. Попробуйте позже.";
    }
  });
});

document.getElementById("plus-one-checkbox").addEventListener("change", function() {
  const plusOneFields = document.getElementById("plus-one-fields");
  const guestCount = document.getElementById("guest-count");

  if (this.checked) {
    plusOneFields.style.display = "block";
    plusOneFields.querySelectorAll("input").forEach(input => input.required = true);
    guestCount.innerText = '2';
  } else {
    plusOneFields.style.display = "none";
    plusOneFields.querySelectorAll("input").forEach(input => input.required = false);
    guestCount.innerText = '1';
  }
});
