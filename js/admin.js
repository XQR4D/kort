        // Загрузка списка пользователей
function loadUsers() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    fetch(`${API_URL}/admin/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: currentUser.username }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Доступ запрещен");
            }
            return response.json();
        })
        .then((users) => {
            const userTable = document.getElementById("userTable");
            userTable.innerHTML = ""; // Очистить таблицу

            users.forEach((user) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.balance}</td>
                    <td class="actions">
                        <button onclick="deleteUser(${user.id})" class="delete">Удалить</button>
                        <button onclick="updateBalance(${user.id})">Изменить баланс</button>
                        <button onclick="viewLogs(${user.id})">Просмотреть логи</button>
                    </td>
                `;

                userTable.appendChild(row);
            });
        })
        .catch((error) => alert(error.message));
}

        // Удаление пользователя
        function deleteUser(userId) {
            if (!confirm("Вы уверены, что хотите удалить пользователя?")) return;

            fetch(`${API_URL}/admin/users/${userId}`, {
                method: "DELETE",
            })
                .then((response) => response.text())
                .then((message) => {
                    alert(message);
                    loadUsers();
                })
                .catch((error) => console.error("Ошибка удаления пользователя:", error));
        }

        // Изменение баланса пользователя
        function updateBalance(userId) {
            const newBalance = prompt("Введите новый баланс:");
            if (newBalance === null) return; // Отмена действия

            fetch(`${API_URL}/admin/users/${userId}/balance`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ balance: parseFloat(newBalance) }),
            })
                .then((response) => response.text())
                .then((message) => {
                    alert(message);
                    loadUsers();
                })
                .catch((error) => console.error("Ошибка обновления баланса:", error));
        }

        // Просмотр логов пользователя
        function viewLogs(userId) {
            fetch(`${API_URL}/admin/logs/${userId}`)
                .then((response) => response.json())
                .then((logs) => {
                    let logMessages = logs.map(
                        (log) => `[${log.created_at}] ${log.event}`
                    );
                    alert("Логи пользователя:\n\n" + logMessages.join("\n"));
                })
                .catch((error) => console.error("Ошибка загрузки логов:", error));
        }

        // Загрузка данных при открытии страницы
        loadUsers();