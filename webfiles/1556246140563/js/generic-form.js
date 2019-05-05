$(document).ready(function () {
    // allow labels on popup form to focus input field
    $('section.enquiry-form .input-box label').on("click", function () {
        $(this).siblings("input").first().focus();
    });

    $('section.enquiry-form .text-box label').on("click", function () {
        $(this).siblings("textarea").first().focus();
    });
});
