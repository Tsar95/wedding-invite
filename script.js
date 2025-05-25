document.getElementById("rsvp-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);
  const message = `
Новая заявка на свадьбу:
Имя: ${data.get('name')}
Фамилия: ${data.get('surname')}
Телефон: ${data.get('phone')}
Пожелания по напиткам: ${data.get('drinks')}
Дополнительно: ${data.get('plus_one')}
  `;

  const botToken = '7648969221:AAEK_zQwoXtyleuN-V8DuABHiWjS_nrLGT0';
  const chatId = '7648969221';

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
    } else {
      document.getElementById("response").innerText = "Ошибка отправки. Попробуйте позже.";
    }
  });
});
