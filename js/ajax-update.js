function updateElement(url, elementId, formatData) {
    var element = document.getElementById(elementId);
    element.classList.remove('loaded');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            element.innerHTML = formatData ? formatData(data) : data;
        })
        .finally(() => {
            element.classList.add('loaded');
        });
}

function formatPhTanah(data) {
    return data.ph_tanah;
}

function formatStatusNutrisi(data) {
    return data.status_nutrisi == 1 ? 'Aktif' : 'Nonaktif';
}

function updateAll() {
    updateElement('ambil_data.php', 'ph', formatPhTanah);
    updateElement('ambil_data.php', 'status', formatStatusNutrisi);
}

setInterval(updateAll, 2000);

updateAll();
