<?php
// set header for indentation
session_start();
header('Content-Type: application/json');

$db = new PDO("sqlite:dorayaki.sq3");
$username = $_SESSION["username"];
$isAdmin = $_SESSION["isAdmin"];
if($isAdmin){
  $sql = $db->prepare("SELECT COUNT(*) as rtotal FROM (SELECT * FROM `riwayat`)");
}else{
  $sql = $db->prepare("SELECT COUNT(*) as rtotal FROM (SELECT * FROM `riwayat` WHERE username LIKE '$username' ORDER BY `id`)");
}

$sql->execute();
$result = $sql->fetchAll(PDO::FETCH_ASSOC);

$c_name = "rtotal";
$c_value = json_encode($result);
setcookie($c_name, $c_value, time() + 3600 * 3600, '/');

echo(json_encode($result[0], JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));
unset($db);

?>