<?php
require_once './core/init.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);

$name = htmlspecialchars($data['name']);
$password = htmlspecialchars($data['password']);

// Check if name and password exists in rhe database
$sql = mysqli_query($db, "SELECT * FROM users WHERE user_name_email = '$name'");
$num_rows = mysqli_num_rows($sql);
$user = mysqli_fetch_assoc($sql);

// If they exist create token
if ($num_rows == 1 && password_verify($password, $user['user_password'])) {
    $enable = false;
    while ($enable == false) {
        $token = uniqid();
        $sql_token = "SELECT * FROM users WHERE token = '$token'";
        $founded_token = $db->query($sql_token);
        $founded_token_number = mysqli_num_rows($founded_token);
        if ($founded_token_number > 0) {
            $enable = false;
        } else {
            $enable = true;
        }
    }
    // If unique token is created, insert it into the database and send it to browser
    $db->query("UPDATE users SET token = '$token' WHERE user_name_email = '$name'");
    $access = ["status" => "true", "token" => $token];
    $access = json_encode($access);
    exit($access);
} else {
    $access = ["status" => "false"];
    $access = json_encode($access);
    exit($access);
}
