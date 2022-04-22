<?php
require_once  '../../db/accounts-db.php';
require_once  'auth-verify.php';
session_start();

header('Content-Type: application/javascript');

switch ($_POST['request']) {
  case 'login':
    if (isset($_POST['username']) && isset($_POST['password'])) {
      $username = $_POST['username'];
      $password = $_POST['password'];
      // TODO: Create checker to prevent SQL injection (optional)
      login($username, $password);
    } else {
      http_response_code(400);
      returnmsg(array('ok' => false, 'message' => 'Login invalid form input'));
    }
    break;
  case 'register':
    if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['nama'])) {
      $username = $_POST['username'];
      $password = $_POST['password'];
      $nama = $_POST['nama'];
      // TODO: Create checker to prevent SQL injection (optional)
      register($username, $password, $nama);
    } else {
      http_response_code(400);
      returnmsg(array('ok' => false, 'message' => 'Register invalid form input'));
    }
    break;
  case 'logout':
    session_unset();
    session_destroy();
    setcookie('WBD_SESSION', 'LOGOUT', time() + (1),'/');
    returnmsg(array('ok' => true, 'message' => 'logged out'));
    break;
  case 'check':
    checkIfUsernameExist($_POST['username']);
    break;
  case 'auth':
    if($_COOKIE['WBD_SESSION'] == 'LOGOUT' || !isset($_COOKIE['WBD_SESSION'])) {
      returnmsg(array('ok' => true, 'message' => ''));
    } else {
      returnmsg(array('ok' => false, 'message' => 'logout first!'));
    }
    break;
  default:
    http_response_code(400);
    returnmsg(array('ok' => false, 'message' => 'wrong request'));
    break;
}
