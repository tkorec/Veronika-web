<?php
require_once 'core/init.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);

$category = htmlspecialchars($data['category']);
$reference = htmlspecialchars($data['reference']);
$referencer_name = htmlspecialchars($data['name']);

// Add new reference to the database
$db->query("INSERT INTO service_references (category, reference, referencer_name) VALUES ('{$category}', '{$reference}', '{$referencer_name}')");

// Get references from the database
$sql = mysqli_query($db, "SELECT * FROM service_references WHERE category = '$category'");
$references_data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
$references_data = json_encode($references_data);

exit($references_data);