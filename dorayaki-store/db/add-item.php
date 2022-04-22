<?php

function addvarian($nama, $deskripsi, $harga, $stok, $gambar)
{
  try {
    $db = new PDO("sqlite:../../db/dorayaki.sq3");
    $sql = $db->prepare("INSERT INTO items(nama, deskripsi, harga, stok, gambar) VALUES ('" . $nama . "', '" . $deskripsi . "', " . $harga . ", " . $stok . ", '" . $gambar . "')");
    $sql->execute();
    echo (json_encode(array('ok' => true, 'message' => ""), JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));
  } catch (Exception $e) {
    echo $e;
  }
}
?>