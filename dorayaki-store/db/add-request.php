<?php
$db = new PDO("sqlite:dorayaki.sq3");
$id_dorayaki = $_POST["id_dorayaki"];
$nama_varian = $_POST["nama_varian"];
$jumlah_request = $_POST["jumlah_request"];
$waktu = $_POST["waktu"];
$isAdmin = $_POST["isAdmin"];
$sql = $db->prepare("INSERT INTO request(id_dorayaki, nama_varian, jumlah_request, waktu_request, status) VALUES ('".$id_dorayaki."', '".$nama_varian."', '".$jumlah_request."', '".$waktu." , 'WAITING')");
$sql->execute();
echo ("ok");
?>