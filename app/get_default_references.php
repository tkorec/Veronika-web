<?php
require_once 'core/init.php';

// Get references from the database
$sql = mysqli_query($db, "SELECT * FROM service_references WHERE defaultly_displayed = 1");
$references_data = mysqli_fetch_all($sql, MYSQLI_ASSOC);
$references_data = json_encode($references_data);

exit($references_data);