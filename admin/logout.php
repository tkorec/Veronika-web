<?php
require_once '../app/core/init.php';

setcookie('token', '', time() - 60);
header('Location: http://localhost:8888/Veronika/admin/login.php');
