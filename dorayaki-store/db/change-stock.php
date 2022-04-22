<?php
// set header for indentation
header('Content-Type: application/json');

$ip = $_SERVER['REMOTE_ADDR'];
$id = $_GET['dorayaki'];
$stok = $_POST['stok'];
$username = $_POST['username'];
$isAdmin = $_POST['isAdmin'];
$nama_varian = $_GET['nama_varian'];
$waktu = $_POST['waktu'];

if($isAdmin === 'true'){
    try {
        /* Initialize webservice with your WSDL */
        $url = "http://localhost:8888/webservice/dorayaki?wsdl";
        $client = new SoapClient($url, array("trace" => 1, "exception" => 0));
        
        /* Set your parameters for the request */
        settype($ip, "string");
        settype($url, "string");
        settype($waktu, "string");
        settype($id, "integer");
        settype($stok, "integer");
        settype($username, "string");
        $params = array(
            'arg0' => $ip,
            'arg1' => $url,
            'arg2' => $waktu,
            'arg3' => $id,
            'arg4' => $stok,
            'arg5' => $username
        );
        
        /* Invoke webservice method with your parameters, in this case: Function1 */
        /* Print webservice response 
        echo(json_encode($response));*/
        $response = $client->__soapCall("addDorayakiRequest", array($params));
    } catch (SoapFault $fault) {
        echo($fault);
    }finally{
        $db = new PDO("sqlite:dorayaki.sq3");
        $sql_request = $db->prepare("INSERT INTO `request` (id_dorayaki, nama_varian, jumlah_request, waktu_request) VALUES(".$id_dorayaki.", '".$nama_varian."', ".$stok.", '".$waktu."')");
        $sql_request->execute();
        $result = $sql_request->fetchAll(PDO::FETCH_ASSOC);
        $sql = $db->prepare("UPDATE `items` SET `stok`=$stok  WHERE `id`=$id");
        $sql->execute();
        $result2 = $sql_request->fetchAll(PDO::FETCH_ASSOC);
        echo(json_encode($result, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));
    }
}else{
    $db = new PDO("sqlite:dorayaki.sq3");
    
    $sql_riwayat = $db->prepare("INSERT INTO `riwayat` (id_dorayaki, nama_varian, username, waktu, isAdmin) VALUES ($id, '$nama_varian', '$username', '$waktu', '$isAdmin')");
    $sql_riwayat->execute();
    $result = $sql->fetchAll(PDO::FETCH_ASSOC);
    echo(json_encode($result, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK | JSON_UNESCAPED_SLASHES));
    
    unset($db);
}

?>