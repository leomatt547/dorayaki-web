<?php

require('../../db/add-item.php');

function returnmsg($array)
{
  echo (json_encode($array, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));
}
$errors = [];

if (empty($_POST['nama'])) {
  $errors['nama'] = 'Nama varian Dorayaki harus diisi.';
}

if (empty($_POST['desc'])) {
  $errors['desc'] = 'Deskripsi varian Dorayaki harus diisi.';
}

if (!empty($_POST['harga'])) {
  if (($_POST['harga'] < 0) && ($_POST['harga'] > 9999999999)) {
    $errors['harga'] = 'Masukkan harga di rentang 0 - 9999999999';
  }
} else {
  $_POST['harga'] = 0;
}

if (!empty($_POST['stock'])) {
  if (($_POST['stock'] < 0) && ($_POST['stock'] > 9999999999)) {
    $errors['stock'] = 'Masukkan stock di rentang 0 - 9999999999';
  }
} else {
  $_POST['stock'] = 0;
}

if (!empty($_FILES['img'])) {
  $target_file = "images/" . basename($_FILES["img"]["name"]);
  $imgFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
  if($_FILES['img']['size'] > 5000000) {
      $errors['img'] = 'Ukuran gambar lebih besar dari 5MB!.';
  }else if($imgFileType != "jpg" && $imgFileType != "png" && $imgFileType != "jpeg") {
      $errors['img'] = "Maaf, hanya format JPG, JPEG, PNG yang diizinkan.";
  }else{
      $dir = "../html/images/";
      $img_name = $dir. $_FILES["img"]["name"];
      move_uploaded_file($_FILES["img"]["tmp_name"], $img_name);
  }
}else{
  $errors['img'] = 'Gambar harus diupload diisi';
}

if (!empty($errors)) {
  returnmsg(array('ok' => false, 'errors' => $errors));
} else {
  addvarian($_POST['nama'],$_POST['desc'], $_POST['harga'], $_POST['stock'], $img_name);
}