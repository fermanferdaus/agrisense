<?php
include 'koneksi.php';

// Ambil data dari POST
$ph = $_POST['ph_tanah'];
$status = $_POST['status_nutrisi'];

// Update tabel tb_data
$sql_data = "INSERT tb_data SET ph_tanah='$ph', status_nutrisi='$status'";
$koneksi->query($sql_data);

// Tutup koneksi
$koneksi->close();
?>
