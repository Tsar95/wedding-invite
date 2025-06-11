document.addEventListener('DOMContentLoaded', function() {
  // Анимация появления секций
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Обработка формы
  const rsvpForm = document.getElementById('rsvpForm');
  const plusOneCheckbox = document.getElementById('plusOne');
  const additionalFields = document.getElementById('additionalFields');
  const thankYouMessage = document.getElementById('thankYouMessage');

  // Показать/скрыть дополнительные поля для +1 гостя
  plusOneCheckbox.addEventListener('change', function() {
    if (this.checked) {
      additionalFields.classList.add('visible');
    } else {
      additionalFields.classList.remove('visible');
    }
  });

  // Отправка формы в Telegram
  rsvpForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(rsvpForm);
    const data = Object.fromEntries(formData.entries());
    
    // Формируем сообщение для Telegram
    let message = `🎉 Новое подтверждение на свадьбу!\n\n`;
    message += `👤 Гость: ${data.name} ${data.surname}\n`;
    message += `📞 Телефон: ${data.phone}\n`;
    message += `🍷 Напитки: ${data.drinks || 'не указано'}\n`;
    
    if (data.plusOne === 'on') {
      message += `\n➕ +1 гость:\n`;
      message += `👤 Имя: ${data.guestName || 'не указано'}\n`;
      message += `👤 Фамилия: ${data.guestSurname || 'не указано'}\n`;
      message += `🍷 Напитки: ${data.guestDrinks || 'не указано'}\n`;
    }
    
    try {
      // Замените на ваш токен бота и ID чата
      const botToken = '7648969221:AAFlDnf27NnohHwbY3WHUvNI_aMEz3p4g7Q';
      const chatId = '-4608590602';
      
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });
      
      if (response.ok) {
        rsvpForm.style.display = 'none';
        thankYouMessage.style.display = 'block';
        
        // Прокрутка к сообщению "Спасибо"
        thankYouMessage.scrollIntoView({ behavior: 'smooth' });
        
        // Очистка формы
        rsvpForm.reset();
        additionalFields.classList.remove('visible');
      } else {
        throw new Error('Ошибка отправки сообщения');
      }
    } catch (error) {
      alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
      console.error('Ошибка:', error);
    }
  });

  // Модальное окно с картой
  const mapBtn = document.getElementById('mapBtn');
  const mapModal = document.getElementById('mapModal');
  const closeBtn = document.querySelector('.close-btn');

  mapBtn.addEventListener('click', function() {
    mapModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', function() {
    mapModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Закрытие модального окна при клике вне его
  window.addEventListener('click', function(e) {
    if (e.target === mapModal) {
      mapModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});