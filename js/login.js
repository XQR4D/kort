// Упрощённые данные пользователей
const users = [
    { username: "admin", password: "admin" },
    { username: "anna", password: "anna" },
    { username: "kort", password: "oookort" },
    { username: "test", password: "test" },
    { username: "123", password: "123" },
    { username: "stop", password: "222" },
    { username: "333", password: "333" },
];

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Предотвращаем отправку формы

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Проверяем логин и пароль
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Сохраняем пользователя в localStorage
        localStorage.setItem("loggedUser", JSON.stringify(user));
        window.location.href = "account.html"; // Перенаправляем в личный кабинет
    } else {
        document.getElementById("error-message").textContent = "Неверное имя пользователя или пароль!";
    }
});

// Функция для логирования событий
function logEvent(event) {
    const logs = JSON.parse(localStorage.getItem("logs")) || [];
    logs.push({ event, time: new Date().toISOString() });
    localStorage.setItem("logs", JSON.stringify(logs));
}

// Функция для регистрации пользователя
function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Введите все данные!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        alert("Пользователь уже существует!");
        return;
    }

    users[username] = { password, balance: 0, transactions: [] };
    localStorage.setItem("users", JSON.stringify(users));
    logEvent(`Пользователь зарегистрирован: ${username}`);
    alert("Регистрация успешна!");
}

 // Обработчик формы сброса пароля
 const resetForm = document.getElementById('resetForm');
 resetForm.addEventListener('submit', function(event) {
     event.preventDefault();
     
     const email = document.getElementById('email').value;

     // Простая проверка почты
     if (!email) {
         alert("Введите ваш адрес электронной почты.");
         return;
     }

     // Событие отправки запроса на сброс.
     alert(`На адрес ${email} отправлены инструкции для сброса пароля.`);
     resetForm.reset(); // Сброс формы после отправки
 });