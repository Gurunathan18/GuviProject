<?php
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $email = $_POST["email"];
    $password = $_POST["password"];
    $confirmPassword = $_POST["confirmpassword"];
    $fullname = $_POST["fullname"];
    $dob = $_POST["dob"];
    $gender = $_POST["gender"];
    $phone = $_POST["phone"];
}

require_once "../asserts/connect_mongodb.php";
require_once "../asserts/connect_mysql.php";

$mydatabase = $mongoClient->profile;
$userCollection = $mydatabase->register;

$result = $mysqlConn->query("SELECT * FROM login WHERE email='$email'");

if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already exists"]);
} else {
    if($password !== $confirmPassword){
        echo json_encode(["success" => false, "message" => "password and confirmpassword must be same"]) ;
    }else if (strlen($password) < 8 || !preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/", $password)) {
        echo json_encode(["success" => false, "message" => "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one special character"]);
    } else {
        $insertQuery = "INSERT INTO login (email, password) 
                        VALUES ('$email', '$password')";
        $mysqlConn->query($insertQuery);

        $data = array(
            "email" => $email,
            "password" => $password,
            "fullname"=>$fullname,
            "dob"=>$dob,
            "gender"=>$gender,
            "phone"=>$phone
        );
        
        $insert = $userCollection->insertOne($data);
        
        if ($insert->getInsertedCount() > 0) {
            echo json_encode(["success" => true, "message" => "Document inserted successfully!"]);
        } else {
            echo json_encode(["success" => true, "message" => "Failed to insert document."]);
        }
    }
}