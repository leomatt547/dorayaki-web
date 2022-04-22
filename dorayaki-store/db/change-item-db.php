<?php
// set header for indentation
header('Content-Type: application/json');
function returnmsg($array)
{
  echo (json_encode($array, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));
}

function fetchvarian($dorayaki)
{
  try {
    $db = new PDO("sqlite:../../db/dorayaki.sq3");
    $sql = $db->prepare("SELECT * FROM `items` WHERE id=:dorayaki LIMIT 1");
    $sql->execute(["dorayaki" => $dorayaki]);
    if (!empty($sql)) {
      returnmsg(array('ok' => true, 'message' => $sql->fetchAll(PDO::FETCH_ASSOC)));
    } else {
      returnmsg(array('ok' => false, 'message' => 'Could not find the requested item'));
    }
    unset($db);
  } catch (PDOException $e) {
    http_response_code(500);
    returnmsg(array('ok' => false, 'message' => $e->getMessage()));
  }
}

function ubahvarian($id, $nama, $deskripsi, $harga, $stok, $gambar)
{
  try {
    $db = new PDO("sqlite:../../db/dorayaki.sq3");
    $query = "UPDATE `items` SET nama=\"" . $nama . "\" , deskripsi=\"" . $deskripsi . "\", harga=" . $harga . ", stok=" . $stok;
    if (isset($gambar)) {
      $query .= ", gambar=\"" . $gambar . "\"";
    }
    $query .= " WHERE id=" . (int)$id . ";";
    $sql = $db->prepare($query);
    $sql->execute();
    returnmsg(array('ok' => true, 'message' => ''));
  } catch (PDOException $e) {
    http_response_code(500);
    returnmsg(array('ok' => false, 'message' => $e->getMessage()));
  }
}
