<?php
require_once '../../vendor/autoload.php';

use Firebase\JWT\JWT;

$dotenv = \Dotenv\Dotenv::createImmutable('../../');
$dotenv->load();

/**
 * Function to check if user is authorized
 * Returns true if is authorized
 * this function DOES NOT check the admin role, just either logged in or not
 * @return {boolean | void} 
 */
function checkAuth($token)
{
    try {
      $payload = JWT::decode($token, $_ENV['ACCESS_TOKEN_SECRET'], array("HS256"));
      return true;
    } catch (Exception $th) {
      throw new Exception("User not logged in " . $th);
      return false;
    }
}

/**
 * Function to decode JWT cookie
 * Use this to get cookie data (USERNAME)
 * @return {string | bool}
 */
function decodeCookieUsername($token)
{
  if (isset($token)) {
    try {
      $payload = \Firebase\JWT\JWT::decode($token, $_ENV['ACCESS_TOKEN_SECRET'], array("HS256"));
      return $payload->username;
    } catch (Exception $th) {
      throw new Exception("Cookie error " . $th);
    }
  } else {
    throw new Exception ("Could not get token");
  }
}

/**
 * Function to decode JWT cookie
 * Use this to get cookie data (ADMIN ROLE)
 * @return {bool | string}
 */
function decodeCookieIsAdmin($token)
{
  if (isset($token)) {
    try {
      $payload = \Firebase\JWT\JWT::decode($token, $_ENV['ACCESS_TOKEN_SECRET'], array("HS256"));
      return $payload->isAdmin;
    } catch (Exception $th) {
      throw new Exception("Cookie error " . $th);
    }
  } else {
    throw new Exception ("Could not get token");

  }
}

function returnmsg($array)
{
  echo (json_encode($array, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));
}
