<?php
require_once 'core/init.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);

$id = htmlspecialchars($data['id']);
$category = htmlspecialchars($data['category']);

// Delete from database
$db->query("DELETE FROM service_references WHERE id = '$id'");

// Get references from the database
$sql = mysqli_query($db, "SELECT * FROM service_references WHERE category = '$category'");
$references_data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
$references_data = json_encode($references_data);

exit($references_data);