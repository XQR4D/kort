document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        const content = document.getElementById("content");
        
        loader.style.display = "none";
        content.classList.remove("hidden");
        content.classList.add("show");
    }, 200);
});

ymaps.ready(initMap);

function initMap() {
    const location1 = [52.622659, 39.570177];
    const location2 = [52.588861, 39.620258];
    const location3 = [52.598654, 39.569739];

    const map = new ymaps.Map("map", {
        center: location1,
        zoom: 12,
        controls: ['zoomControl', 'geolocationControl'],
    });

    const placemark1 = new ymaps.Placemark(location1, {
        hintContent: "Объект на Гагарина 97",
        balloonContent: "ЛКБ-Финанс",
    }, {
        preset: 'islands#blackDotIcon',
    });

    const placemark2 = new ymaps.Placemark(location2, {
        hintContent: "Объект на Зои Космодемьянской 2Б",
        balloonContent: "Главное здание",
    }, {
        preset: 'islands#blackDotIcon',
    });

    const placemark3 = new ymaps.Placemark(location3, {
        hintContent: "Объект на Проспекте Победы, 21",
        balloonContent: "Магазин одежды",
    }, {
        preset: 'islands#blackDotIcon',
    });

    map.geoObjects.add(placemark1);
    map.geoObjects.add(placemark2);
    map.geoObjects.add(placemark3);
}


let slideIndex = 0;
        let slides = document.querySelectorAll('.slides');

        function showSlide(index) {
            if (index >= slides.length) slideIndex = 0;
            if (index < 0) slideIndex = slides.length - 1;

            slides.forEach((slide, i) => {
                slide.style.display = i === slideIndex ? 'block' : 'none';
            });
        }

        document.querySelectorAll('.next').forEach((button, index) => {
            button.addEventListener('click', () => {
                slideIndex++;
                showSlide(slideIndex);
            });
        });

        document.querySelectorAll('.prev').forEach((button, index) => {
            button.addEventListener('click', () => {
                slideIndex--;
                showSlide(slideIndex);
            });
        });

        showSlide(slideIndex);

function updateOptions() {
    const paymentMethod = document.getElementById('payment-method').value;
    const secondarySelectContainer = document.getElementById('secondary-select-container');
    const addCardSection = document.getElementById('add-card-section');

    if (paymentMethod === 'none') {
      secondarySelectContainer.classList.add('hidden');
      addCardSection.classList.remove('visible');
    } else if (paymentMethod === 'card' || paymentMethod === 'paypal') {
      secondarySelectContainer.classList.add('hidden');
      if (paymentMethod === 'card'|| paymentMethod === 'paypal') {
        addCardSection.classList.add('visible');
      } else {
        addCardSection.classList.remove('visible');
      }
    } else {
      secondarySelectContainer.classList.remove('hidden');
      addCardSection.classList.remove('visible');

      if (paymentMethod === 'crypto') {
        const secondarySelect = document.getElementById('secondary-select');
        secondarySelect.innerHTML = `
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="litecoin">Litecoin</option>
          <option value="ripple">Ripple</option>
        `;
      } else {
        const secondarySelect = document.getElementById('secondary-select');
        secondarySelect.innerHTML = `
          <option value="sberbank">Сбер</option>
          <option value="tinkoff">Т-Банк</option>
          <option value="vtb">ВТБ</option>
          <option value="alfa">Альфа-Банк</option>
        `;
      }
    }
  }

  function requestNotificationPermission() {
    const statusElement = document.getElementById('notification-status');

    if (!('Notification' in window)) {
        statusElement.textContent = 'Ваш браузер не поддерживает уведомления.';
        hideStatusAfterDelay();
        return;
    }

    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            statusElement.textContent = 'Уведомления включены!';
            showTestNotification();
        } else if (permission === 'denied') {
            statusElement.textContent = 'Вы запретили отправку уведомлений.';
        } else {
            statusElement.textContent = 'Запрос на уведомления отклонён или закрыт.';
        }
        hideStatusAfterDelay();
    }).catch(error => {
        statusElement.textContent = 'Ошибка при запросе уведомлений: ' + error.message;
        hideStatusAfterDelay();
    });
}

function showTestNotification() {
    new Notification('Привет!', {
        body: 'Спасибо что разрешили уведомления на нашем сайте.',
        icon: 'favicon.svg'
    });
}

function hideStatusAfterDelay() {
    const statusElement = document.getElementById('notification-status');
    setTimeout(() => {
        statusElement.textContent = '';
    }, 2000);
}

window.addEventListener('load', () => {
    requestNotificationPermission();
});

function calculate() {
    const rent = parseFloat(document.getElementById('rent').value);
    const months = parseFloat(document.getElementById('months').value);
    const commission = parseFloat(document.getElementById('commission').value);

    if (isNaN(rent) || isNaN(months) || isNaN(commission)) {
      document.getElementById('result').textContent = 'Пожалуйста, заполните все поля корректно.';
      return;
    }

    const base = rent * months;
    const commissionAmount = (base * commission) / 100;
    const total = base + commissionAmount;

    document.getElementById('result').textContent = `Итого к оплате: ${total.toLocaleString('ru-RU')} ₽`;

    const tableHTML = generatePaymentTable(rent, months);
    document.getElementById('paymentTable').innerHTML = tableHTML;

    const newEntry = {
      rent, months, commission, total, date: new Date().toLocaleString()
    };

    let history = JSON.parse(localStorage.getItem('rentHistory')) || [];
    history.unshift(newEntry);
    if (history.length > 5) history = history.slice(0, 5);
    localStorage.setItem('rentHistory', JSON.stringify(history));

    renderHistory();
  }

  function generatePaymentTable(rent, months) {
    let rows = '';
    for (let i = 1; i <= months; i++) {
      rows += `<tr><td>${i}</td><td>${rent.toLocaleString('ru-RU')} ₽</td></tr>`;
    }
    return `
      <h3>График платежей</h3>
      <table>
        <thead>
          <tr><th>Месяц</th><th>Платёж</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function renderHistory() {
    const history = JSON.parse(localStorage.getItem('rentHistory')) || [];
    const container = document.getElementById('history');
    container.innerHTML = history.map(item => `
      <div class="history-item">
        <strong>${item.date}</strong><br/>
        Аренда: ${item.rent}₽ × ${item.months} мес.<br/>
        Комиссия: ${item.commission}%<br/>
        <strong>Итого: ${item.total.toLocaleString('ru-RU')} ₽</strong>
      </div>
    `).join('');
  }

  function clearHistory() {
    localStorage.removeItem('rentHistory');
    renderHistory();
    document.getElementById('paymentTable').innerHTML = '';
    document.getElementById('result').textContent = '';
  }

  renderHistory();
