<?php
require_once 'core/init.php';

// Get publication from the database
$sql = mysqli_query($db, "SELECT * FROM publications");
$publication_data = mysqli_fetch_all($sql, MYSQLI_ASSOC);

$new_publication_data = [];
$youngest_publication = $publication_data[0];
while (sizeof($publication_data) != 1) {
    foreach ($i as $publication_data) {
        $youngest_year = intval($youngest_publication['year']);
        $year = intval($publication_data[$i]['year']);
        if ($year > $youngest_year) {
            $youngest_publication = $publication_data[$i];
            $youngest_publication_index = array_search($youngest_publication, $publication_data);
        }
    } 
    array_push($new_publication_data, $youngest_publication);
    unset($publication_data[$youngest_publication_index]);
}

$new_publication_data = json_encode($new_publication_data);

exit($new_publication_data);



