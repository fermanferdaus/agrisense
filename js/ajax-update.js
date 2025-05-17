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

function formatPompaBasa(data) {
    return data.pompa_basa == 1 ? 'Aktif' : 'Nonaktif';
}

function formatPompaAsam(data) {
    return data.pompa_asam == 1 ? 'Aktif' : 'Nonaktif';
}

function updateAll() {
    updateElement('ambil_data.php', 'ph', formatPhTanah);
    updateElement('ambil_data.php', 'status-basa', formatPompaBasa);
    updateElement('ambil_data.php', 'status-asam', formatPompaAsam);
}

setInterval(updateAll, 5000);

updateAll();
