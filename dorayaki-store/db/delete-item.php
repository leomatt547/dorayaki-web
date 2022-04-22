<?php

$id = $_POST["dorayaki"];
$db = new PDO("sqlite:dorayaki.sq3");
$sql = $db->prepare("DELETE FROM `items` WHERE id=$id");
$sql->execute();

$sql->fetchAll(PDO::FETCH_ASSOC);
echo "sukses";

?>
