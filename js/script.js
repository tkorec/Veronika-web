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

    // Contact form in footer
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
            error_message += 'Je potřeba vyplnit email!';
            error = true;
        }
        if (email !== '' && valid_email === false) {
            error_message += 'Email musí být v platném tvaru!';
            error = true;
        }
        if (error === true) {
            alert_notification.css("background-color", "lightcoral");
            alert_notification.css("border-left", "2px solid red");
            $("#alert-text").css("color", "red");
            let new_alert_text = previous_alert_text.replace(previous_alert_text, error_message);
            $("#alert-text").html(new_alert_text);
            $("#alert-text").css("display", "block");
            setTimeout(function () {
                $("#name").val("");
                $("#surname").val("");
                $("#email").val("");
                $("#phone").val("");
                $("#message").val("");
                $("#alert-text").css("display", "none");
                $("#alert").css("background-color", "transparent");
                $("#alert").css("border-left", "transparent");
            }, 60000);
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
                    $("#alert-text").css("display", "block");
                    setTimeout(function () {
                        $("#name").val("");
                        $("#surname").val("");
                        $("#email").val("");
                        $("#phone").val("");
                        $("#message").val("");
                        $("#alert-text").css("display", "none");
                        $("#alert").css("background-color", "transparent");
                        $("#alert").css("border-left", "transparent");
                    }, 6000);
                }
            }
            xhr.open("POST", "./app/contact.php", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(data);
        }
    });


    // Contact form on Contact page
    $("#contact-button").click(function () {
        let fname = $("#fname").val();
        let lname = $("#lname").val();
        let email_address = $("#email-address").val();
        let valid_email_address = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_address);
        let phone_number = $("#phone-number").val();
        let customer_message = $("#customer-message").val();
        let error = false;
        let error_message = '';
        let alert_notification = $("#form-alert");
        let alert_text = $("#form-alert-text").html();
        let previous_alert_text = alert_text;
        if (email_address === '') {
            error_message += 'Je potřeba vyplnit email!';
            error = true;
        }
        if (email_address !== '' && valid_email_address === false) {
            error_message += 'Email musí být v platném tvaru!';
            error = true;
        }
        if (error === true) {
            alert_notification.css("background-color", "lightcoral");
            alert_notification.css("border-left", "2px solid red");
            $("#form-alert-text").css("color", "red");
            $("#form-alert-text").css("display", "block");
            let new_alert_text = previous_alert_text.replace(previous_alert_text, error_message);
            $("#form-alert-text").html(new_alert_text);
            setTimeout(function () {
                $("#fname").val("");
                $("#lname").val("");
                $("#email-address").val("");
                $("#phone-number").val("");
                $("#customer-message").val("");
                $("#form-alert-text").css("display", "none");
                $("#form-alert").css("background-color", "transparent");
                $("#form-alert").css("border-left", "transparent");
            }, 60000);
        } else {
            let data = {
                name: fname,
                surname: lname,
                email: email_address,
                phone: phone_number,
                message: customer_message
            };
            data = JSON.stringify(data);
            let xml = new XMLHttpRequest();
            xml.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let response = this.responseText;
                    $("#form-alert").css("background-color", "lightgreen");
                    $("#form-alert").css("border-left", "2px solid green");
                    $("#form-alert-text").css("color", "green");
                    let successfull_alert = previous_alert_text.replace(previous_alert_text, response);
                    $("#form-alert-text").html(successfull_alert);
                    $("#form-alert-text").css("display", "block");
                    setTimeout(function () {
                        $("#fname").val("");
                        $("#lname").val("");
                        $("#email-address").val("");
                        $("#phone-number").val("");
                        $("#customer-message").val("");
                        $("#form-alert-text").css("display", "none");
                        $("#form-alert").css("background-color", "transparent");
                        $("#form-alert").css("border-left", "transparent");
                    }, 6000);
                }
            }
            xml.open("POST", "./app/contact.php", true);
            xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xml.send(data);
        }
    });

    // Clear all contact page form inputs after data are successfully sent
    function clearContactFormInputs() {
        // .val("")

    }
});

