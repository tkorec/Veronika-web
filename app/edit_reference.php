<?php
require_once 'core/init.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);

$reference_text = htmlspecialchars($data['reference']);
$referencer_name = htmlspecialchars($data['name']);
$reference_id = htmlspecialchars($data['id']);
$category = htmlspecialchars($data['category']);

// Update database
$db->query("UPDATE service_references SET reference = '$reference_text', referencer_name = '$referencer_name' WHERE id = '$reference_id'");

// Get references from the database
$sql = mysqli_query($db, "SELECT * FROM service_references WHERE category = '$category'");
$references_data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
$references_data = json_encode($references_data);

exit($references_data);

