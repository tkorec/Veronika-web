<?php
require_once 'core/init.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);

$author = htmlspecialchars($data['author']);
$year = htmlspecialchars($data['year']);
$title = htmlspecialchars($data['title']);
$edition = htmlspecialchars($data['edition']);
$city = htmlspecialchars($data['city']);
$publisher = htmlspecialchars($data['publisher']);
$isbn = htmlspecialchars($data['isbn']);
$link = htmlspecialchars($data['link']);
$category = htmlspecialchars($data['publication_category']);
$id = htmlspecialchars($data['id']);

// Update database
$db->query("UPDATE publications SET author = '$author', publication_year = '$year', title = '$title', city = '$city', publisher = '$publisher', edition_number = '$edition', isbn = '$isbn', link = '$link' WHERE id = '$id'");

// Get publications from the database
$sql = mysqli_query($db, "SELECT * FROM publications WHERE category = '$category'");
$publication_data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
$publication_data = json_encode($publication_data);

exit($publication_data);