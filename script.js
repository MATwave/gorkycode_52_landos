document.getElementById('surveyForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Собираем данные формы
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
        // Преобразуем значения в правильный формат
        if (key === "cooperation") {
            data[key] = value === "true";
        } else if (!isNaN(value)) {
            data[key] = parseFloat(value) || value;
        } else {
            data[key] = value;
        }
    });

    // Устанавливаем параметры для необязательных полей
    data["chronic_diseases"] = []; // Если пользователь добавит опцию
    data["health_group"] = null; // Если применимо
    data["skill_focus"] = []; // Массив навыков для улучшения

    try {
        // Отправляем данные на ваш сервис
        const response = await fetch('http://217.114.43.57:8000/recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to get recommendation');
        }

        const result = await response.json();

        // Отображаем результат
        document.getElementById('recommendation').innerHTML =
            <h2>Recommendation:</h2>
            <p>Cohort: ${result.cohort}</p>
            <p>Facilities: ${result.recommended_facilities.join(', ')}</p>
        ;
    } catch (error) {
        console.error(error);
        document.getElementById('recommendation').textContent = 'Error fetching recommendation.';
    }
});