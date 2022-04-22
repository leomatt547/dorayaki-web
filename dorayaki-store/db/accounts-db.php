<?php
// set header for indentation
header('Content-Type: application/json');
require_once '../../vendor/autoload.php';
use Firebase\JWT\JWT;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable("../../.");
$dotenv->load();

function createToken($username, $nama, $isAdmin)
{
  $expiry = time() + (15 * 60);
  $payload = [
    'username' => $username,
    'nama' => $nama,
    'isAdmin' => $isAdmin
  ];
  $access_token = JWT::encode($payload, $_ENV['ACCESS_TOKEN_SECRET']);
  return json_encode([
    'accessToken' => $access_token,
    'expiry' => date(DATE_ISO8601, $expiry)
  ]);
}

function login($username, $password)
{
  try {
    $db = new PDO('sqlite:../../db/dorayaki.sq3');
    $sql = $db->prepare("SELECT username, nama, isAdmin FROM `accounts` WHERE `username`=:username AND `password`=:password LIMIT 1");
    $sql->execute(["username" => $username, "password" => $password]);
    $sql = $sql->fetchAll(PDO::FETCH_ASSOC);
    if (!empty($sql)) {
      $sql = reset($sql);
      $token = createToken($sql['username'], $sql['nama'], $sql['isAdmin']);
      setcookie("WBD_SESSION", $token, time() + (3600 * 60),'/');
      echo (json_encode(array('ok' => true,'message' => $token), JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));
    } else {
      echo json_encode(array('ok' => false,'message' => null), JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES);
    }
    unset($db);
  } catch (PDOException $e) {
    http_response_code(500);
    echo "Connection error" . $e->getMessage();
  }
}

function register($username, $password, $nama)
{
  try {
    $db = new PDO('sqlite:../../db/dorayaki.sq3');
    $sql = $db->prepare("INSERT INTO `accounts` (username, password, nama, isAdmin) VALUES (:username, :password, :nama, 'false')");
    $sql->execute(["username" => $username, "password" => $password, "nama" => $nama]);
    echo (json_encode(array('ok' => true, 'message' => ''), JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));
    unset($db);
  } catch (PDOException $e) {
    http_response_code(500);
    echo 'Connection Error ' . $e->getMessage();
  }
}

function checkIfUsernameExist($username) {
  try {
    $db = new PDO('sqlite:../../db/dorayaki.sq3');
    $sql = $db->prepare("SELECT `username` FROM `accounts` WHERE `username`=:username LIMIT 1");
    $sql->execute(["username" => $username]);
    $sql = $sql->fetchAll(PDO::FETCH_ASSOC);
    if (empty($sql)) {
      echo (json_encode(array('ok' => true, 'message' => 'username does not exist'), JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));
    } else {
      echo (json_encode(array('ok' => false, 'message' => 'username already exist'), JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));
    }
    unset($db);
  } catch (PDOException $e) {
    http_response_code(500);
    echo 'Connection Error ' . $e->getMessage();
  }
}