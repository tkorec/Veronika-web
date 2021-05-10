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
                <li class="item"><a href="">Publikace</a></li>
                <li class="item"><a href="">Reference</a></li>
            </div>
            <div class="nav-group">
                <li class="logout"><a href="">Odhlásit</a></li>
            </div>
        </ul>
    </nav>

    <div class="row">
        <div class="column">
            <div class="reference-box">
                <select name="" id="publication-category">
                    <option value="publication-category">Kategorie publikací</option>
                    <option value="academic-publication">Akademické publikace</option>
                    <option value="popular-science-publication">Populárně naučné publikace</option>
                </select>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="column">
            <div class="publication-box">
                <input list="author-list" type="text" name="author" id="author" placeholder="Autor" class="publication-content">
                <datalist id="author-list">
                    <option value="VERONIKA, Vitošková"></option>
                </datalist>
                <input type="text" name="year" id="year" placeholder="Rok publikace">
                <input type="text" name="title" id="title" placeholder="Název titulu">
                <input type="text" name="edition" id="edition" placeholder="Číslo edice">
                <input type="text" name="city" id="city" placeholder="Město">
                <input type="text" name="publisher" id="publisher" placeholder="Nakladatel">
                <input type="text" name="isbn" id="isbn" placeholder="ISBN">
                <input type="text" name="link" id="link" placeholder="Odkaz">
                <div class="publication-alert" id="publication-alert">
                    <p id="publication-alert-text">Jméno autora, rok vydání a titul jsou povinná pole.</p>
                </div>
                <button type="button" id="add-publication" class="add-button">Přidat publikaci</button>
                <button type="button" id="edit-publication" class="edit-button">Editovat publikaci</button>
            </div>
        </div>
    </div>

    <div class="row" id="publication">
        <div class="column">
            <div class="publication">
                <div class="publication-edit">
                    <i class="fa fa-edit"></i>
                </div>
                <div class="publication-page-box">
                    <p>VERONIKA, Vitošková. 2020. <a class="publication-title">Title</a>. ISBN: </p><br>
                    <a href=""></a>
                </div>
                <div class="publication-delete">
                    <i class="fa fa-trash"></i>
                </div>
            </div>
        </div>
    </div>


    <!-- Javascript -->
    <script src="../js/admin.js"></script>
</body>

</html>