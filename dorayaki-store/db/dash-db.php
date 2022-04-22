<?php
// set header for indentation
header('Content-Type: application/json');

$page = 0;
if (isset($_GET["page"]))
  $page = $_GET["page"];

$limit = 3;

if (isset($_GET["limit"]))
  $limit = $_GET["limit"];

$offset = $page * $limit;

$db = new PDO("sqlite:dorayaki.sq3");
$sql = $db->prepare("SELECT * FROM `items` ORDER BY `jumlahterjual`DESC ,`harga`,`nama` LIMIT $offset, $limit");

$sql->execute();
echo(json_encode($sql->fetchAll(PDO::FETCH_ASSOC), JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));

unset($db);

?>