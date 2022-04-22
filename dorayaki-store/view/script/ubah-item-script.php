<?php
require('../../db/change-item-db.php');

$errors = [];
$data = [];
$get_requested = false;
$post_requested = false;
$image_name = null;
$deskripsi = null;

// Handling fetch existing data to the form
if ($_POST['request'] == 'getitem') {
    $get_requested = true;
    $id = $_POST['dorayaki'];
    if (empty($_POST['dorayaki'])) {
        $errors['dorayaki'] = 'dorayaki to fetch data not available';
    } else {
        fetchvarian($id);
    }
}

// Handling posting new data to the database
if ($_POST['request'] == 'ubahitem') {
    $id = $_POST['dorayaki'];
    $post_requested = true;
    if (empty($_POST['name'])) {
        $errors['name'] = 'Nama varian Dorayaki harus diisi.';
    }

    if (empty($_POST['desc'])) {
        $errors['desc'] = 'Deskripsi varian Dorayaki harus diisi.';
    }

    if (!empty($_POST['harga'])) {
        if (((int)$_POST['harga'] < 0) && ((int)$_POST['harga'] > 9999999999)) {
            $errors['harga'] = 'Masukkan harga di rentang 0 - 9999999999';
        }
    } else {
        $_POST['harga'] = 0;
    }

    if (!empty($_POST['stock'])) {
        if (((int)$_POST['stock'] < 0) && ((int)$_POST['stock'] > 9999999999)) {
            $errors['stock'] = 'Masukkan stock di rentang 0 - 9999999999';
        }
    } else {
            $_POST['stock'] = 0;
    }

    if (!empty($_FILES['image'])) {
        $target_file = "images/" . basename($_FILES["image"]["name"]);
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        if ($_FILES['image']['size'] > 5000000) {
            $errors['image'] = 'Ukuran gambar lebih besar dari 5MB!.';
        } else if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
            $errors['image'] = "Maaf, hanya format JPG, JPEG, PNG yang diizinkan.";
        } else {
            $dir = "../html/images/";
            $image_name = $dir . $_FILES["image"]["name"];
            move_uploaded_file($_FILES["image"]["tmp_name"], $image_name);
        }
    }
    if (empty($errors)) {
        ubahvarian($id, $_POST['name'], $_POST['desc'], $_POST['harga'], $_POST['stock'], $image_name);
    }
}

//Check whether the request is valid (get or post)
if ($get_requested || $post_requested) {
    if (!empty($errors)) {
        returnmsg(array('ok' => false, 'message' => $errors));
    }
} else {
    returnmsg(array('ok' => false, 'message' => 'Invalid request'));
}
