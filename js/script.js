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

    // Load default references
    $("#reference-page-row").ready(function () {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                displayDefaultReferences(this.responseText);
            }
        }
        xhr.open("POST", "./app/get_default_references.php", true);
        xhr.send();
    });

    // Load references
    $(".reference-type").click(function () {
        let reference_type = $(this).attr("id");
        let data = { category: reference_type };
        data = JSON.stringify(data);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                displayReferencesAndChangeTitle(this.responseText, reference_type);
            }
        }
        xhr.open("POST", "./app/get_references.php", true);
        xhr.send(data);
    });

    // Display default references
    function displayDefaultReferences(references) {
        let references_data = JSON.parse(references);
        let references_query = '';
        for (let i = references_data.length - 1; i >= 0; i--) {
            references_query += `
            <div class="reference-page-column">
            <div class="reference-page-box">
                <p class="reference-page-text">${references_data[i].reference}</p>
                <i class="author">${references_data[i].referencer_name}</i>
            </div>
            </div>
            `;
        }
        $("#reference-page-row").html(references_query);
    }

    // Display references and change title
    function displayReferencesAndChangeTitle(references, type) {
        let references_data = JSON.parse(references);
        let reference_query = '';
        for (let i = references_data.length - 1; i >= 0; i--) {
            reference_query += `
            <div class="reference-page-column">
            <div class="reference-page-box">
                <p class="reference-page-text">${references_data[i].reference}</p>
                <i class="author">${references_data[i].referencer_name}</i>
            </div>
            </div>
            `;
        }
        $("#reference-page-row").html(reference_query);
        changeTitle(type);
    }

    // Change title
    function changeTitle(title_code) {
        let reference_title = {
            "individual-consultation": "Individuální konzultace",
            "school-consultation": "Školní poradna", "courses": "Kurzy",
            "seminars": "Semináře", "lectures": "Přednášky"
        };
        let title = reference_title[title_code];
        let previous_title = $("#reference-title").html();
        let new_title = previous_title.replace(previous_title, title);
        $("#reference-title").html(new_title);
    }

    // Load default publications
    $("#publication-page-row").ready(function () {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log(JSON.parse(this.responseText));
                sortPublications(this.responseText);
            }
        }
        xhr.open("POST", "./app/get_default_publications.php", true);
        xhr.send();
    });

    // Load certain publications
    $(".publication-type").click(function () {
        let publication_type = $(this).attr("id");
        let data = { category: publication_type };
        data = JSON.stringify(data);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                sortPublications(this.responseText);
            }
        }
        xhr.open("POST", "./app/get_publications.php", true);
        xhr.send(data);
    });

    // Sort publications by the year of publicastion
    function sortPublications(publications) {
        let publications_data = JSON.parse(publications);
        let new_publications_data = [];
        let youngest_publication;
        let youngest_publication_index;
        const length = publications_data.length;
        while (new_publications_data.length < length) {
            youngest_publication = publications_data[0];
            for (let j in publications_data) {
                let youngest_year = parseInt(youngest_publication.publication_year);
                let year = parseInt(publications_data[j].publication_year);
                if (year > youngest_year) {
                    youngest_publication = publications_data[j];
                    youngest_publication_index = publications_data.indexOf(youngest_publication);
                }
            }
            new_publications_data.push(youngest_publication);
            publications_data.splice(youngest_publication_index, 1);
        }
        displayPublication(new_publications_data);
    }

    // Display publications
    function displayPublication(publication) {
        let publication_data = publication;
        let publication_query = '';
        let edition = '';
        let city_and_publisher = '';
        let isbn = '';
        for (let i in publication_data) {
            if (publication_data[i].edition_number !== '') {
                edition = publication_data[i].edition_number + 'edn. ';
            }
            if (publication_data[i].city !== '' || publication_data[i].publisher !== '') {
                city_and_publisher = publication_data[i].city + publication_data[i].publisher + '. ';
            } else if (publication_data[i].city !== '' && publication_data[i].publisher !== '') {
                city_and_publisher = publication_data[i].city + ': ' + publication_data[i].publisher + '. ';
            }
            if (publication_data[i].isbn !== '') {
                isbn = 'ISBN: ' + publication_data[i].isbn + '. ';
            }
            publication_query += `
        <div class="publication-page-column">
            <div class="publication-page-box">
                <p class="publication-page-text">
                    <a id="author">${publication_data[i].author + '. '}</a>
                    <a id="year">${publication_data[i].publication_year + '. '}</a>
                    <i id="title">${publication_data[i].title + '. '}</i>
                    <a id="edition">${edition}</a>
                    <a id="city-and-publisher">${city_and_publisher}</a>
                    <a id="isbn">${isbn}</a>
                </p>
                <a href="${publication_data[i].link}" class="publication-link">${publication_data[i].link}</a>
            </div>
        </div>
            `;
        }
        $("#publication-page-row").html(publication_query);
    }

    // Scroll up function
    $("#scroll-up").click(function () {
        let root_element = document.documentElement;
        root_element.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});

