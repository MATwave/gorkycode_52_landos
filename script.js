document.getElementById('surveyForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Собираем данные формы
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

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

        // Отображаем рекомендацию
        document.getElementById('recommendation').innerHTML =
            <h2>Your Recommendation:</h2>
            <p>${result.recommendation}</p>
        ;
    } catch (error) {
        console.error(error);
        document.getElementById('recommendation').textContent = 'Error fetching recommendation.';
    }
});