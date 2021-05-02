$(document).ready(function () {

    // After choosing the category of references one of two following functions is executed
    $("#consultation-category").change(function () {
        let consultation_category_value = $("#consultation-category").val();
        if (consultation_category_value === 'consultation-category') {
            defaultConsultantCategoryChoise();
            backToAddState();
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

});