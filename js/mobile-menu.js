$(document).ready(function () {
    // Open mobile menu
    $("#open-mobile-menu").click(function () {
        document.getElementById('mobile-menu').style.width = '100%';
    });

    // Close mobile menu
    $("#close").click(function () {
        document.getElementById('mobile-menu').style.width = '0';
    });
});

