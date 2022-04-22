<?php
// set header for indentation
header('Content-Type: application/json');

function addvarian($nama, $deskripsi, $harga, $stok, $gambar){
  $db = new PDO("sqlite:../../db/dorayaki.sq3");
  $sql = $db->prepare("INSERT INTO items(nama, deskripsi, harga, stok, gambar) VALUES ('".$nama."', '".$deskripsi."', ".$harga.", ".$stok.", '".$gambar."')");
  $sql->execute();
  return ("sukses");
}

$id = $_GET['dorayaki'];
$db = new PDO("sqlite:dorayaki.sq3");


$sql = $db->prepare("SELECT * FROM `items` WHERE `id`=$id");
$sql->execute();
$result = $sql->fetchAll(PDO::FETCH_ASSOC);
echo(json_encode($result[0], JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));

unset($db);

?>