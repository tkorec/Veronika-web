$(document).ready(function () {

    // After choosing the category of references one of two following functions is executed
    $("#consultation-category").change(function () {
        let consultation_category_value = $("#consultation-category").val();
        if (consultation_category_value === 'consultation-category') {
            defaultConsultantCategoryChoise();
            backToAddState();
        } else if (consultation_category_value === 'all') {
            getAllReferences();
        } else {
            consultationCategoryChoise(consultation_category_value);
            backToAddState();
        }
    });

    // If CONSULTATION CATEGORY is chose the page is returned to default setting
    function defaultConsultantCategoryChoise() {
        $("#content").css("display", "none");
        $("#row").html("");
    }

    // If another category is chosen references are gained from the database
    function consultationCategoryChoise(consultation_category_value) {
        $("#content").css("display", "block");
        let data = { category: consultation_category_value };
        data = JSON.stringify(data);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                displayReferences(this.responseText);
            }
        };
        xhr.open("POST", "../app/get_references.php", true);
        xhr.send(data);
    }

    // Request server for all references
    function getAllReferences() {
        $("#content").css("display", "none");
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                displayAllReferences(this.responseText);
            }
        };
        xhr.open("POST", "../app/get_all_references.php", true);
        xhr.send();
    }

    // Display all references
    function displayAllReferences(references) {
        let reference_category = {
            "individual-consultation": "Individu??ln?? konzultace",
            "school-consultation": "??koln?? poradna", "courses": "Kurzy",
            "seminars": "Semin????e", "lectures": "P??edn????ky"
        };
        let references_data = JSON.parse(references);
        let references_query = '';
        for (let i = references_data.length - 1; i >= 0; i--) {
            references_query += `
        <div class="column">
            <div class="reference">
                <div class="default-reference">
                    <p class="default-reference-category">${reference_category[references_data[i].category]}</p>
                    <p class="default-reference-text">${references_data[i].reference}</p>
                    <i class="default-reference-author">${references_data[i].referencer_name}</i>
                </div>
                <div class="default-reference-check">
                    <input type="checkbox" class="reference-checkbox" id="${references_data[i].id}">
                </div>
            </div>
        </div>
            `;
        }
        $("#row").html(references_query);
        for (let j = references_data.length - 1; j >= 0; j--) {
            if (references_data[j].defaultly_displayed === '1') {
                $("#" + references_data[j].id).prop("checked", true);
            } else {
                $("#" + references_data[j].id).prop("checked", false);
            }
        }
        $(".reference-checkbox").click(function () {
            let reference_value = $(this).prop("checked");
            let reference_id = $(this).attr('id');
            changeReferenceDisplayStatus(reference_id, reference_value);
        });
    }

    // Change status of reference ??? if user clicks on a checkbox, check or uncheck the status
    // and change it in database immediately
    function changeReferenceDisplayStatus(id, value) {
        let data = { id: id, value: value };
        data = JSON.stringify(data);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                displayAllReferences(this.responseText);
            }
        };
        xhr.open("POST", "../app/change_reference_status.php", true);
        xhr.send(data);
    }

    // Gained references of the certain category are displayed on the page
    function displayReferences(references) {
        let references_data = JSON.parse(references);
        let references_query = '';
        for (let i = references_data.length - 1; i >= 0; i--) {
            references_query += `
        <div class="column">
            <div class="reference">
                <div class="reference-edit" id="${references_data[i].id}">
                    <i class="fa fa-edit"></i>
                </div>
                <div class="reference-page-box">
                    <p class="reference-page-text" id="${"text-" + references_data[i].id}">${references_data[i].reference}</p>
                    <i class="author" id="${"name-" + references_data[i].id}">${references_data[i].referencer_name}</i>
                </div>
                <div class="reference-delete" id="${references_data[i].id}">
                    <i class="fa fa-trash"></i>
                </div>
            </div>
            <div class="delete-ensure" id="${'open-' + references_data[i].id}" value="${references_data[i].id}">
                <div class="delete-ensure-button">
                    <p>Smazat</p>
                </div>
            </div>
        </div>
            `;
        }
        $("#row").html(references_query);
        $(".reference-edit").on("click", function () {
            let id = $(this).attr('id');
            if ($("#edit-reference").is(":visible")) {
                backToAddState();
            } else {
                editThisReference(id);
                scrollUp();
            }
        });
        $(".reference-delete").on("click", function () {
            let id = $(this).attr('id');
            if ($("#open-" + id).is(":visible")) {
                $("#open-" + id).css("display", "none");
            } else {
                $("#open-" + id).css("display", "block");
            }
        });
        $(".delete-ensure").on("click", function () {
            let id = $(this).attr('value');
            deleteThisReference(id);
        })
    }

    // Insert text and name of editing reference
    function editThisReference(id) {
        let text_for_editing = $("#text-" + id).html();
        let name_for_editing = $("#name-" + id).html();
        $("#reference-text").val(text_for_editing);
        $("#referencer-name").val(name_for_editing);
        $("#add-reference").css("display", "none");
        $("#edit-reference").css("display", "block");
        $("#edit-reference").attr("value", id);
    }

    // Edit reference
    $("#edit-reference").click(function () {
        let reference_text = $("#reference-text").val();
        let referencer_name = $("#referencer-name").val();
        let consultation_category = $("#consultation-category").val();
        let reference_id = $("#edit-reference").attr("value");
        if (reference_text !== '' && referencer_name !== '') {
            let data = { reference: reference_text, name: referencer_name, id: reference_id, category: consultation_category };
            data = JSON.stringify(data);
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    displayReferences(this.responseText);
                    backToAddState();
                }
            }
            xhr.open("POST", "../app/edit_reference.php", true);
            xhr.send(data);
        }
    });

    // Return form back to ADD REFERENCE state
    function backToAddState() {
        $("#reference-text").val("");
        $("#referencer-name").val("");
        $("#edit-reference").css("display", "none");
        $("#add-reference").css("display", "block");
    }

    // Delete reference
    function deleteThisReference(id) {
        backToAddState();
        let consultation_category = $("#consultation-category").val();
        let data = { id: id, category: consultation_category };
        data = JSON.stringify(data);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                displayReferences(this.responseText);
            }
        };
        xhr.open("POST", "../app/delete_reference.php", true);
        xhr.send(data);
    }

    // Add reference
    $("#add-reference").click(function () {
        let consultation_category = $("#consultation-category").val();
        let reference = $("#reference-text").val();
        let referencer_name = $("#referencer-name").val();
        if (reference !== '' && referencer_name !== '') {
            let data = { category: consultation_category, reference: reference, name: referencer_name };
            data = JSON.stringify(data);
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    displayReferences(this.responseText);
                    clearForm();
                }
            };
            xhr.open("POST", "../app/add_reference.php", true);
            xhr.send(data);
        }
    });

    // This function is executed after adding, deleting, or editing reference
    function clearForm() {
        $("#reference-text").val("");
        $("#referencer-name").val("");
    }

    // Scroll page up
    function scrollUp() {
        let root_element = document.documentElement;
        root_element.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Choose category of publication, display relevant publications and dosplai form
    $("#publication-category").change(function () {
        let publication_category_value = $("#publication-category").val();
        if (publication_category_value === 'publication-category') {
            defaultPublicationCategoryChoise();
            backToPublicationAddState();
        } else {
            publicationCategoryChoise(publication_category_value);
            backToPublicationAddState();
        }
    });

    // If new or another than default publication category is chosen, get relevant publications
    function publicationCategoryChoise(publication_category_value) {
        $("#publication-form").css("display", "block");
        let data = { category: publication_category_value };
        data = JSON.stringify(data);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                sortPublications(this.responseText);
            }
        };
        xhr.open("POST", "../app/get_publications.php", true);
        xhr.send(data);
    }

    // If default publication category is set
    function defaultPublicationCategoryChoise() {
        $("#publication-form").css("display", "none");
        $("#publication").html("");
    }

    // Add publication
    $("#add-publication").click(function () {
        let publication_category = $("#publication-category").val();
        let author = $("#author").val();
        let year = $("#year").val();
        let title = $("#title").val();
        let edition = $("#edition").val();
        let city = $("#city").val();
        let publisher = $("#publisher").val();
        let isbn = $("#isbn").val();
        let link = $("#link").val();
        let error = false;
        if (author === '' || year === '' || title === '') {
            error = true;
        }
        if (error === true) {
            $("#publication-alert").css("display", "block");
        } else {
            let data = {
                category: publication_category,
                author: author,
                year: year,
                title: title,
                edition: edition,
                city: city,
                publisher: publisher,
                isbn: isbn,
                link: link
            };
            data = JSON.stringify(data);
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    sortPublications(this.responseText);
                    backToPublicationAddState();
                }
            };
            xhr.open("POST", "../app/add_publication.php", true);
            xhr.send(data);
        }
    });

    // Delete publication
    function deleteThisPublication(id) {
        backToPublicationAddState();
        let publication_category = $("#publication-category").val();
        let data = { id: id, category: publication_category };
        data = JSON.stringify(data);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                sortPublications(this.responseText);
            }
        };
        xhr.open("POST", "../app/delete_publication.php", true);
        xhr.send(data);
    }

    // Edit chosen publication ??? insert data to form to edit them, change button to edit button
    function editThisPublication(id) {
        let author_for_editing = $("#author-" + id).attr("value");
        let year_for_editing = $("#year-" + id).attr("value");
        let title_for_editing = $("#title-" + id).attr("value");
        let edition_for_editing = $("#edition-" + id).attr("value");
        let city_for_editing = $("#city-" + id).attr("value");
        let publisher_for_editing = $("#publisher-" + id).attr("value");
        let isbn_for_editing = $("#isbn-" + id).attr("value");
        let link_for_editing = $("#link-" + id).html();
        $("#author").val(author_for_editing);
        $("#year").val(year_for_editing);
        $("#title").val(title_for_editing);
        $("#edition").val(edition_for_editing);
        $("#city").val(city_for_editing);
        $("#publisher").val(publisher_for_editing);
        $("#isbn").val(isbn_for_editing);
        $("#link").val(link_for_editing);
        $("#add-publication").css("display", "none");
        $("#edit-publication").css("display", "block");
        $("#edit-publication").attr("value", id);
    }

    // Edit publication after clicking on EDIT BUTTON
    $("#edit-publication").click(function () {
        let author = $("#author").val();
        let year = $("#year").val();
        let title = $("#title").val();
        let edition = $("#edition").val();
        let city = $("#city").val();
        let publisher = $("#publisher").val();
        let isbn = $("#isbn").val();
        let link = $("#link").val();
        let publication_category = $("#publication-category").val();
        let publication_id = $("#edit-publication").attr("value");
        if (author !== '' && year !== '' && title !== '') {
            let data = {
                author: author,
                year: year,
                title: title,
                edition: edition,
                city: city,
                publisher: publisher,
                isbn: isbn,
                link: link,
                publication_category: publication_category,
                id: publication_id
            };
            data = JSON.stringify(data);
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    sortPublications(this.responseText);
                    backToPublicationAddState();
                }
            };
            xhr.open("POST", "../app/edit_publication.php", true);
            xhr.send(data);
        }
    });

    // Sort publications
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
                }
            }
            youngest_publication_index = publications_data.indexOf(youngest_publication);
            new_publications_data.push(youngest_publication);
            publications_data.splice(youngest_publication_index, 1);
        }
        displayPublications(new_publications_data);
    }

    // Display publications
    function displayPublications(publications) {
        let publications_data = publications;
        let publication_query = '';
        for (let i in publications_data) {
            let edition = '';
            let city = '';
            let publisher = '';
            if (publications_data[i].edition_number !== '') {
                edition = publications_data[i].edition_number + ' edn. ';
            }
            if (publications_data[i].city !== '' && publications_data[i].publisher === '') {
                city = publications_data[i].city + '. ';
            } else if (publications_data[i].city !== '' && publications_data[i].publisher !== '') {
                city = publications_data[i].city + ': ';
            }
            if (publications_data[i].publisher !== '') {
                publisher = publications_data[i].publisher + '. ';
            }
            publication_query += `
        <div class="column">
            <div class="publication">
                <div class="publication-edit" id="${publications_data[i].id}">
                    <i class="fa fa-edit"></i>
                </div>
                <div class="publication-page-box">
                    <p>
                    <a id="${'author-' + publications_data[i].id}" value="${publications_data[i].author}">${publications_data[i].author + '. '}<a> 
                    <a id="${'year-' + publications_data[i].id}" value="${publications_data[i].publication_year}">${publications_data[i].publication_year + '. '}</a> 
                    <i class="publication-title" id="${'title-' + publications_data[i].id}" value="${publications_data[i].title}">${publications_data[i].title + '. '}</i>
                    <a id="${'edition-' + publications_data[i].id}" value="${publications_data[i].edition_number}">${edition}</a>
                    <a id="${'city-' + publications_data[i].id}" value="${publications_data[i].city}">${city}</a>
                    <a id="${'publisher-' + publications_data[i].id}" value="${publications_data[i].publisher}">${publisher}</a>
                    <a id="${'isbn-' + publications_data[i].id}" value="${publications_data[i].isbn}">${'ISBN: ' + publications_data[i].isbn}</a>
                    </p>
                    <a href="${publications_data[i].link}" target="_blank" class="publication-link" id="${'link-' + publications_data[i].id}">${publications_data[i].link}</a>
                </div>
                <div class="publication-delete" id="${publications_data[i].id}">
                    <i class="fa fa-trash"></i>
                </div>
            </div>
            <div class="delete-ensure publication-delete-ensure" id="${'publication-open-' + publications_data[i].id}" value="${publications_data[i].id}">
                <div class="delete-ensure-button">
                    <p>Smazat</p>
                </div>
            </div>
        </div>
            `;
        }
        $("#publication").html(publication_query);
        $(".publication-edit").on("click", function () {
            let id = $(this).attr('id');
            if ($("#edit-publication").is(":visible")) {
                backToPublicationAddState();
            } else {
                editThisPublication(id);
                scrollUp();
            }
        });
        $(".publication-delete").on("click", function () {
            let id = $(this).attr('id');
            if ($("#publication-open-" + id).is(":visible")) {
                $("#publication-open-" + id).css("display", "none");
            } else {
                $("#publication-open-" + id).css("display", "block");
            }
        });
        $(".publication-delete-ensure").on("click", function () {
            let id = $(this).attr('value');
            deleteThisPublication(id);
        });
    }


    // Make form default ??? add state of form
    function backToPublicationAddState() {
        $("#author").val("");
        $("#year").val("");
        $("#title").val("");
        $("#edition").val("");
        $("#city").val("");
        $("#publisher").val("");
        $("#isbn").val("");
        $("#link").val("");
        $("#publication-alert").css("display", "none");
        $("#edit-publication").css("display", "none");
        $("#add-publication").css("display", "block");
    }

    // Send Login Data
    $("#login").click(function () {
        let admin_name = $("#admin-name").val();
        let admin_password = $("#admin-password").val();
        let error_message = '';
        let error = false;
        if (admin_name === '' || admin_password === '') {
            error_message += 'Jm??no/mail a heslo jsou povinn??';
            error = true;
        }
        if (error === true) {
            $("#loggin-alert-message").html(error_message);
            $("#loggin-alert").css("display", "block");
        } else {
            let access_data = { name: admin_name, password: admin_password };
            access_data = JSON.stringify(access_data);
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    logIn(this.responseText);
                }
            };
            xhr.open("POST", "../app/login.php", true);
            xhr.send(access_data);
        }

    });

    // Was login successfull?
    function logIn(login_status) {
        let login_data = JSON.parse(login_status);
        console.log(login_data['status']);
        console.log(typeof (login_data['status']));
        console.log(login_data['token']);
        let status = login_data['status'];
        let token = login_data['token'];
        if (status === 'true') {
            let date = new Date();
            date.setTime(date.getTime() + (1 * 0.25 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = "token=" + token + "; " + expires;
            location.replace('../admin/index.php');
        } else {
            let unknown_user = 'Jm??no/email nebo heslo nebyli rozpozn??ny';
            $("#loggin-alert-message").html(unknown_user);
            $("#loggin-alert").css("display", "block");
        }
    }

});