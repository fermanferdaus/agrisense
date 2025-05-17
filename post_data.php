<?php
include 'koneksi.php';

// Ambil data dari POST
$ph = $_POST['ph_tanah'];
$basa = $_POST['pompa_basa'];
$asam =$_POST['pompa_asam'];

// Update tabel tb_data
$sql_data = "INSERT tb_data SET ph_tanah='$ph', pompa_basa='$basa', pompa_asam='$asam'";
$koneksi->query($sql_data);

// Tutup koneksi
$koneksi->close();
?>
