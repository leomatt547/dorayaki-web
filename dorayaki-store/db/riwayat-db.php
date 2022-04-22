<?php
// set header for indentation
session_start();
header('Content-Type: application/json');

$username = $_SESSION["username"];
$isAdmin = $_SESSION["isAdmin"];

$page = 0;
if (isset($_GET["page"]))
  $page = $_GET["page"];

$limit = 10;

if (isset($_GET["limit"]))
  $limit = $_GET["limit"];

$offset = $page * $limit;

$db = new PDO("sqlite:dorayaki.sq3");
//echo("SELECT * FROM `items` ORDER BY `jumlahterjual`,`harga`,`nama`  LIKE '$search' LIMIT $offset, $limit");
if($isAdmin){
  $sql = $db->prepare("SELECT * FROM `riwayat` ORDER BY `waktu` DESC LIMIT $offset, $limit");
}else{
  $sql = $db->prepare("SELECT * FROM `riwayat` WHERE username LIKE '$username' ORDER BY `waktu` DESC LIMIT $offset, $limit");
}
$sql->execute();
echo(json_encode($sql->fetchAll(PDO::FETCH_ASSOC), JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));

unset($db);

?>