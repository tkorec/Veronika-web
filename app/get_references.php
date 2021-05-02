<?php
require_once 'core/init.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);

$category = htmlspecialchars($data['category']);

$sql = mysqli_query($db, "SELECT * FROM service_references WHERE category = '$category'");
$references_data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
$references_data = json_encode($references_data);

exit($references_data);
