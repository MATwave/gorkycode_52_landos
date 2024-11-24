document.getElementById('surveyForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Собираем данные формы
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
        if (key === "cooperation") {
            data[key] = value === "true";
        } else if (!isNaN(value)) {
            data[key] = parseFloat(value) || value;
        } else {
            data[key] = value;
        }
    });

    data["chronic_diseases"] = [];
    data["health_group"] = null;
    data["skill_focus"] = [];

    try {
        const response = await fetch('https://your-vps-domain.com/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Ошибка получения рекомендации');
        }

        const result = await response.json();

        // Обновляем блок рекомендаций
        const recommendationContent = document.getElementById('recommendationContent');
        recommendationContent.innerHTML =
            '<p>Когорта: <strong>${result.cohort}</strong></p><br><p>Рекомендуемые площадки: <strong>${result.recommended_facilities.join(', ')}</strong></p>'
        ;
    } catch (error) {
        console.error(error);
        document.getElementById('recommendationContent').textContent = 'Произошла ошибка. Попробуйте позже.';
    }
});