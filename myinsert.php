<?php


include('dbconn.php');
$request_body = file_get_contents('php://input');
$data = $_POST;//json_decode($request_body, true);
    $type = $data['type'];
    $amount =$data['amount'];
    $description = $data['description'];
    $sql= "INSERT INTO incomeexpense(type,description,amount) VALUES ( '$type','$description','$amount' )";
    if (!$type) {
        $resp = array(
            'success' => false,
            'message' => 'Invalid item name',
            'amount' => $amount,
            'data' => $data
        );
        echo json_encode($resp);  
        exit;      
    }
    $err = $conn->query($sql);
    $resp = array(
        'success' => true,
        'message' => 'Added successfully!!',
        'amount' => $amount,
        'data' => $data
    );
    echo json_encode($resp);
?>