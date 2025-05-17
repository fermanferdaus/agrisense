<?php
include 'koneksi.php';

$tanggal = isset($_GET['tanggal']) ? $_GET['tanggal'] : date('Y-m-d');

$query = "SELECT tanggal, ph_tanah, status_nutrisi FROM tb_data WHERE DATE (tanggal) = '$tanggal' ORDER BY tanggal DESC";
$result = mysqli_query($koneksi, $query);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        'tanggal' => date('Y-m-d', strtotime($row['tanggal'])),
        'waktu' => date('H:i', strtotime($row['tanggal'])),
        'ph_tanah' => floatval($row['ph_tanah']),
        'status_nutrisi' => $row['status_nutrisi'] == 1 ? 'Aktif' : 'Nonaktif'
    ];
}

header('Content-Type: application/json');
echo json_encode($data);

mysqli_close($koneksi);
?>
