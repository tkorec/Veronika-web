$(document).ready(function () {
    // Open mobile menu
    $("#open-mobile-menu").click(function () {
        document.getElementById('mobile-menu').style.width = '100%';
    });

    // Close mobile menu
    $("#close").click(function () {
        document.getElementById('mobile-menu').style.width = '0';
    });

    // Scale publication button if hover
    $("#publication-button").hover(function () {
        $(this).css("font-size", "1.2rem");
    }, function () {
        $(this).css("font-size", "1.0rem");
    });

    // Contact form
    $("#message-button").click(function () {
        let name = $("#name").val();
        let surname = $("#surname").val();
        let email = $("#email").val();
        let valid_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        let phone = $("#phone").val();
        let message = $("#message").val();
        let error = false;
        let error_message = '';
        let alert_notification = $("#alert");
        let alert_text = $("#alert-text").html();
        let previous_alert_text = alert_text;
        if (email === '') {
            error_message += 'Je potřeba vyplnit email!<br>';
            error = true;
        }
        if (email !== '' && valid_email === false) {
            error_message += 'Email musí být v platném tvaru!';
            error = true;
        }
        if (error === true) {
            alert_notification.css("background-color", "lightcoral");
            alert_notification.css("border-left", "2px solid red");
            alert_notification.css("display", "block");
            $("#alert-text").css("color", "red");
            let new_alert_text = previous_alert_text.replace(previous_alert_text, error_message);
            $("#alert-text").html(new_alert_text);
        } else {
            let data = {
                name: name,
                surname: surname,
                email: email,
                phone: phone,
                message: message
            };
            data = JSON.stringify(data);
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let response = this.responseText;
                    $("#alert").css("background-color", "lightgreen");
                    $("#alert").css("border-left", "2px solid green");
                    $("#alert-text").css("color", "green");
                    let successfull_alert = previous_alert_text.replace(previous_alert_text, response);
                    $("#alert-text").html(successfull_alert);
                    $("#alert").css("display", "block");
                } else {
                    let unsuccessful_response = 'Nepovedlo se spojit se serverem.';
                    $("#alert").css("background-color", "lightcoral");
                    $("#alert").css("border-left", "2px solid red");
                    $("#alert-text").css("color", "red");
                    let unsuccessful_alert = previous_alert_text.replace(previous_alert_text, unsuccessful_response);
                    $("#alert-text").html(unsuccessful_response);
                    $("alert").css("display", "block");
                }
            }
            xhr.open("POST", "../app/contact.php", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(data);
        }
    });

});

