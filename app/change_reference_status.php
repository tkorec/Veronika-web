<?php
require_once 'core/init.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);

$id = htmlspecialchars($data['id']);
$value = htmlspecialchars($data['value']);

if ($value == true) {
    $status = 1;
} else {
    $status = 0;
}

// Update database
$db->query("UPDATE service_references SET defaultly_displayed = '$status' WHERE id = '$id'");

// Get references from the database
$sql = mysqli_query($db, "SELECT * FROM service_references");
$references_data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
$references_data = json_encode($references_data);

exit($references_data);