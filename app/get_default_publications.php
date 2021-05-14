<?php
require_once 'core/init.php';

// Get publication from the database
$sql = mysqli_query($db, "SELECT * FROM publications");
$publication_data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
$publication_data = json_encode($publication_data);

exit($publication_data);
