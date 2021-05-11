<?php
require_once 'core/init.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);

$category = htmlspecialchars($data['category']);

$sql = mysqli_query($db, "SELECT * FROM publications WHERE category = '$category'");
$publication_data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
$publication_data = json_encode($publication_data);

exit($publication_data);