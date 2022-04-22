<?php
header('Content-Type: application/json');

$id = $_POST['dorayaki'];
$change = $_POST['items'];

$db = new PDO("sqlite:dorayaki.sq3");
$sql = $db->prepare("UPDATE `items` SET jumlahterjual=jumlahterjual+$change WHERE id=$id");

$sql->execute();
$result = $sql->fetchAll(PDO::FETCH_ASSOC);
echo(json_encode($result, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));

unset($db);

?>