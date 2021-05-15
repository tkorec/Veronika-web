<?php
require_once 'core/init.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);

$id = htmlspecialchars($data['id']);
$category = htmlspecialchars($data['category']);

// Delete publication from database
$db->query("DELETE FROM publications WHERE id = '$id'");

// Get publications from the database
$sql = mysqli_query($db, "SELECT * FROM publications WHERE category = '$category'");
$publication_data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
$publication_data = json_encode($publication_data);

exit($publication_data);
