<?php
// set header for indentation
header('Content-Type: application/json');

$page = 0;
if (isset($_GET["page"]))
  $page = $_GET["page"];

$limit = 3;

if (isset($_GET["limit"]))
  $limit = $_GET["limit"];

$search = $_GET["search"];

$offset = $page * $limit;

$db = new PDO("sqlite:dorayaki.sq3");
//echo("SELECT * FROM `items` ORDER BY `jumlahterjual`,`harga`,`nama`  LIKE '$search' LIMIT $offset, $limit");
$sql = $db->prepare("SELECT * FROM `items` WHERE nama LIKE '%$search%' OR deskripsi LIKE '%$search%' ORDER BY `jumlahterjual`,`harga`,`nama` LIMIT $offset, $limit");

$sql->execute();
echo(json_encode($sql->fetchAll(PDO::FETCH_ASSOC), JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));

unset($db);

?>