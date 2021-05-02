<?php

// Connection to database
$db = mysqli_connect('localhost', 'root', 'root', 'veronika');

// Was connection successfull
if (mysqli_connect_errno()) {
    echo 'Connection failed with following error: ' . mysqli_connect_error();
    exit();
}
