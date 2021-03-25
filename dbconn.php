<?php

    try {
        $dbhost = 'localhost';
        $dbname = 'exincome';
        $dbuser = 'root';
        $dbpass = '';
        $conn = new \PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
        $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        $conn->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
    }
    catch(PDOException $e) {
        $isConnected = false;
        throw new Exception($e->getMessage());
    }

?>