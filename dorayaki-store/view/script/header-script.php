<?php
session_start();
require_once 'auth-verify.php';

if (isset($_GET['token'])) {
    $token = $_GET['token'];
    if (checkAuth($token)) {
        try {
            $username = decodeCookieUsername($token);
            $admin = decodeCookieIsAdmin($token);
            $_SESSION["username"] = $username;
            if($admin === 'true'){
                $_SESSION["isAdmin"] = true;
            }else{
                $_SESSION["isAdmin"] = false;
            }
            returnmsg(array('ok' => true, 'username' => $username, 'isadmin' => $admin));
        } catch (Exception $th) {
            throw new Exception($th);
        }
    } else {
        returnmsg(array('ok' => false));
    }
}

#debug
//returnmsg(array('ok' => true, 'username' => "Leonard", 'isadmin' => true));
