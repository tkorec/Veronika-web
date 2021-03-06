<?php
require_once '../app/core/init.php';
session_start();

$current_token = $_COOKIE['token'];
$sql = mysqli_query($db, "SELECT * FROM users WHERE token = '$current_token'");
$token_count = mysqli_num_rows($sql);
if ($token_count < 1) {
    header('Location: http://localhost:8888/Veronika/admin/login.php');
}
?>

<!DOCTYPE html>
<html lang="cs-cz">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- Title Logo -->
    <link rel="icon" href="../images/logo.png" sizes="16x16">
    <!-- Style -->
    <link rel="stylesheet" href="../css/admin.css">
    <!-- jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Google Font Montserrat -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Merienda&family=Montserrat:ital,wght@0,300;1,300&display=swap" rel="stylesheet">
    <!-- Google Font Montserrat Bold -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=swap" rel="stylesheet">
</head>

<body>
    <!-- Menu -->
    <nav>
        <ul>
            <div class="nav-group">
                <li class="logo"><a href="../index.html">Web</a></li>
            </div>
            <div class="nav-group">
                <li class="item"><a href="publikace.php">Publikace</a></li>
                <li class="item"><a href="reference.php">Reference</a></li>
            </div>
            <div class="nav-group">
                <li class="logout"><a href="logout.php">Odhlásit</a></li>
            </div>
        </ul>
    </nav>

    <div class="row">
        <div class="column">
            <div class="reference-box">
                <select name="" id="consultation-category">
                    <option value="consultation-category">Oblasti poradenství</option>
                    <option value="individual-consultation">Individuální poradenství</option>
                    <option value="school-consultation">Školní poradentsví</option>
                    <option value="courses">Kurzy</option>
                    <option value="seminars">Semináře</option>
                    <option value="lectures">Přednášky</option>
                    <option value="all">Nastavení výchozích referencí</option>
                </select>
            </div>
        </div>

        <div class="column">
            <div class="reference-box">
                <div class="content" id="content">
                    <div class="text">
                        <textarea name="reference-text" id="reference-text" cols="30" rows="10" placeholder="Reference"></textarea>
                    </div>
                    <div class="name-and-button">
                        <input type="text" name="referencer-name" id="referencer-name" placeholder="Jméno referenta">
                        <button type="button" id="add-reference" class="add-button">Přidat referenci</button>
                        <button type="button" id="edit-reference" class="edit-button">Editovat referenci</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row" id="row">

    </div>

    <!-- Javascript -->
    <script src="../js/admin.js"></script>
</body>

</html>