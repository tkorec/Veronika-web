<?php
require_once 'core/init.php';

$json = file_get_contents('php://input');

$data = json_decode($json, true);

$category = htmlspecialchars($data['category']);
$author = htmlspecialchars($data['author']);
$year = htmlspecialchars($data['year']);
$title = htmlspecialchars($data['title']);
$edition = htmlspecialchars($data['edition']);
$city = htmlspecialchars($data['city']);
$publisher = htmlspecialchars($data['publisher']);
$isbn = htmlspecialchars($data['isbn']);
$link = htmlspecialchars($data['link']);

// Add new publication
$db->query("INSERT INTO publications (author, publication_year, title, city, publisher, edition_number, isbn, link, category) 
VALUES ('{$author}', '{$year}', '{$title}', '{$city}', '{$publisher}', '{$edition_number}', '{$isbn}', '{$link}', '{$category}')");

// Get publications
$sql = mysqli_query($db, "SELECT * FROM publications WHERE category = '$category'");
$publication_data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
$publication_data = json_encode($publication_data);

exit($publication_data);
