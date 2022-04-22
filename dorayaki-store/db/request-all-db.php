<?php
// set header for indentation
session_start();
header('Content-Type: application/json');

$db = new PDO("sqlite:dorayaki.sq3");
$username = $_SESSION["username"];
$isAdmin = $_SESSION["isAdmin"];
echo($isAdmin);
if($isAdmin){
  $sql = $db->prepare("SELECT COUNT(*) as reqtotal FROM (SELECT * FROM `request`)");
}

$sql->execute();
$result = $sql->fetchAll(PDO::FETCH_ASSOC);

$c_name = "reqtotal";
$c_value = json_encode($result);
setcookie($c_name, $c_value, time() + 3600 * 3600, '/');

echo(json_encode($result[0], JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));
unset($db);

?>