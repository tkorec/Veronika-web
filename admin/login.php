<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrace</title>
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
<body class="loggin-form-body">

    <!-- Loggin form -->
    <form form="POST" class="loggin-form">
        <div class="loggin-item">
            <label for="admin-name">Uživatelské jméno / email</label><br>
            <input type="text" name="admin-name" id="admin-name">
        </div>
        <div class="loggin-item" id="last-loggin-item">
            <label for="admin-password">Heslo</label><br>
            <input type="password" name="admin-password" id="admin-password">
        </div>
        <div class="loggin-alert" id="loggin-alert">
            <p class="loggin-alert-message" id="loggin-alert-message">Administrátorovy údaje nebyly rozpoznány</p>
        </div>
        <div class="button" id="login">
            <p>Log in</p>
        </div>
        <div class="login-back-to-mainpage">
            <a href="http://localhost:8888/Veronika">Zpět na hlavní stránku</a>
        </div>
    </form>
    
    <!-- Javascript -->
    <script src="../js/admin.js"></script>
</body>
</html>