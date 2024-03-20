<?php
require_once "../asserts/connect_redis.php";

$email = $_GET['email'];
$jsonData = $redis->get($email);

if ($jsonData) {
    $userData = json_decode($jsonData, true);
    echo json_encode(['success' => true, 'data' => $userData]);
} else {
    echo json_encode(['success' => false, 'message' => 'Data not found']);
}
?>