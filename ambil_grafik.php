<?php
include 'koneksi.php';

$tanggal = isset($_GET['tanggal']) ? $_GET['tanggal'] : date('Y-m-d');

$query = "SELECT tanggal, ph_tanah FROM tb_data WHERE DATE (tanggal) = '$tanggal' ORDER BY tanggal ASC";
$result = mysqli_query($koneksi, $query);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        'label' => date('H:i', strtotime($row['tanggal'])),
        'value' => floatval($row['ph_tanah'])
    ];
}

header('Content-Type: application/json');
echo json_encode($data);
mysqli_close($koneksi);
?>
