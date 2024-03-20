<?php
require_once "../asserts/connect_mysql.php";
require_once "../asserts/connect_mongodb.php";
require_once "../asserts/connect_redis.php";

if ($mysqlConn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'connection error']);
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM login WHERE email = '$email' AND password = '$password'";
    $result = $mysqlConn->query($sql);

    if ($result->num_rows > 0) {
        $mydatabase = $mongoClient->profile;
        $userCollection = $mydatabase->register;

        $data = array(
            "email" => $email,
        );
        $find = $userCollection->findOne($data);
        if ($find) {
            $redisKey = $email;
            $redisValue = json_encode($find);
            $redis->set($redisKey, $redisValue);
            $value = $redis->get($email);

            echo json_encode(['success' => true, 'message' => 'Login successful' , "user" => $find,"value" => $value]);
        } else {
            echo json_encode(['success' => false, 'message' => 'data not found']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    }
}
$mysqlConn->close();
?>
