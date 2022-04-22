<?php
$db = new PDO("sqlite:dorayaki.sq3");
$id_dorayaki = $_POST["id_dorayaki"];
$nama_varian = $_POST["nama_varian"];
$username = $_POST["username"];
$waktu = $_POST["waktu"];
$isAdmin = $_POST["isAdmin"];
$sql = $db->prepare("INSERT INTO riwayat(id_dorayaki, nama_varian, username, waktu, isAdmin) VALUES ('".$id_dorayaki."', '".$nama_varian."', '".$username."', '".$waktu." , '".$isAdmin."')");
$sql->execute();
echo ("ok");
?>