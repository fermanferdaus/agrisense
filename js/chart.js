document.addEventListener('DOMContentLoaded', () => {
    // ======== Grafik pH Tanah =========
    const ctx = document.getElementById('phChart').getContext('2d');
    let phChart;
    let syncInterval = null;

    function loadPhChart() {
        fetch(`ambil_grafik.php?tanggal=${getSelectedDate()}`)
            .then(response => response.json())
            .then(data => {
                const labels = data.map(item => item.label);
                const values = data.map(item => item.value);
                const minValue = Math.min(...values);
                const maxValue = Math.max(...values);
                const padding = 0.5;

                phChart.data.labels = labels;
                phChart.data.datasets[0].data = values;
                phChart.options.scales.y.min = minValue - padding;
                phChart.options.scales.y.max = maxValue + padding;
                phChart.update();
            })
            .catch(error => console.error('Gagal memuat grafik:', error));
    }

    // ======== Tabel pH Tanah dengan Pagination =========
    let tableData = [];
    let currentPage = 1;
    let rowsPerPage = 10;

    function renderTable() {
        const tbody = document.getElementById('table-body');
        tbody.innerHTML = '';

        const start = (currentPage - 1) * rowsPerPage;
        const end = Math.min(start + rowsPerPage, tableData.length);
        const pageData = tableData.slice(start, end);

        pageData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.tanggal}</td>
                <td>${row.waktu}</td>
                <td>${row.ph_tanah}</td>
                <td>${row.pompa_basa}</td>
                <td>${row.pompa_asam}</td>
            `;
            tbody.appendChild(tr);
        });

        document.getElementById('prevBtn').disabled = currentPage === 1;
        document.getElementById('nextBtn').disabled = end >= tableData.length;

        const pageInfo = document.getElementById('pageInfo');
        const totalPages = Math.ceil(tableData.length / rowsPerPage);
        pageInfo.innerText = `Menampilkan ${start + 1}–${end} dari ${tableData.length} data | Halaman ${currentPage} dari ${totalPages}`;
    }

    function loadTableData() {
        fetch(`ambil_tabel.php?tanggal=${getSelectedDate()}`)
            .then(response => response.json())
            .then(data => {
                tableData = data;
                currentPage = 1;
                renderTable();
            })
            .catch(error => console.error('Gagal memuat data tabel:', error));
    }

    function getSelectedDate() {
        const tanggalInput = document.getElementById('tanggal');
        return tanggalInput?.value || new Date().toISOString().split('T')[0];
    }

    function updateAll() {
        loadPhChart();
        loadTableData();
    }

    // Event bindings
    document.getElementById('rowsPerPage').addEventListener('change', function () {
        rowsPerPage = parseInt(this.value);
        currentPage = 1;
        renderTable();
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if ((currentPage * rowsPerPage) < tableData.length) {
            currentPage++;
            renderTable();
        }
    });

    document.getElementById('syncButton').addEventListener('click', () => {
        updateAll(); // pertama kali sync
        if (syncInterval) clearInterval(syncInterval);
        syncInterval = setInterval(updateAll, 5000);
    });

    document.getElementById('tanggal').addEventListener('change', () => {
        updateAll();
    });

    // Set tanggal default hari ini saat halaman dimuat
    document.getElementById('tanggal').value = new Date().toISOString().split('T')[0];

    // Inisialisasi chart kosong saat pertama kali
    phChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'pH Tanah',
                data: [],
                borderColor: '#388e3c',
                backgroundColor: 'rgba(56,142,60,0.1)',
                fill: true,
                tension: 0.3,
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: true,
                    title: { display: true, text: 'Waktu' }
                },
                y: {
                    display: true,
                    title: { display: true, text: 'pH' },
                    min: 4,
                    max: 9
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
});
