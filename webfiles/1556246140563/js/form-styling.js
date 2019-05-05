// Used to style form, add/remove classes

$(document).ready(function () {
    // turn off autocomplete on all form elements
    $.each($(".enquiry-form input:not([type='hidden']):not([ng-model='tos']):not([ng-model='licenseagreement'])"), function () {
        $(this).attr("autocomplete","false");
    });

    // Create field assistance text, for all input, select except email
    $(".enquiry-form input:not([type='hidden']):not([ng-model='tos']):not([ng-model='licenseagreement']), .enquiry-form select, .enquiry-form textarea").each(function(){
        var fieldAssistanceAttr = $(this).attr("data-field-assistance");
        var text = "";

        if(fieldAssistanceAttr){
            text = fieldAssistanceAttr;
        }else if($(this).get(0).nodeName == "INPUT"){
            text = "Must contain 2-50 characters.";
            $(this).parent().append(html);
        }else if($(this).get(0).nodeName == "SELECT"){
            text = "Please select an option from the dropdown menu.";
        }else{
            text = "Must contain 25 or more characters.";
        }
        var html = '';
        if($(this).is("select"))
        {
            html = '<div class="fieldAssistance"><p>' + text + '</p>';
        }else{
            html = '<div class="field-icon"></div><div class="fieldAssistance"><p>' + text + '</p></div>';
        }
        $(this).parent().append(html);
    });

    // Show form field input examples when focused in a fieldValue
    $('.enquiry-form .fieldAssistance').each(function(){
        var fieldAssistance = $(this);

        // associated fields - inputs and textareas
        var associatedField = $(this).siblings("input, textarea");

        /* On state */
        associatedField.on("focus", function() {
            // change background color
            if(!$(this).hasClass("ng-valid")){
                fieldAssistance.show();
            }
            $(this).addClass("field-focus");
        });

        /* Off state */
        associatedField.on("focusout", function() {
            if($(this).hasClass("ng-valid")){
                fieldAssistance.hide();
            }
            // change background color
            $(this).removeClass("field-focus");
        });
    });

    // show assistance message on select focus
    $(".enquiry-form .selectboxit-container .selectboxit").on("focus", function(){
        var associatedField = $(this).siblings('select');
        if(associatedField.hasClass("ng-invalid")){
            var fieldAssistance = $(this).parent().siblings('.fieldAssistance');
            fieldAssistance.show();
        }
    });

    // hide assistance message input elements
    $(".enquiry-form input").on("input", function() {
        var fieldAssistance = $(this).siblings(".fieldAssistance");
        if($(this).hasClass("ng-valid")){
            fieldAssistance.hide();
        }else if($(this).hasClass("has-error")){
            fieldAssistance.show();
        }
    });

    // hide assistance message for select elements
    $(".enquiry-form select").selectBoxIt().on("change click", function() {
        var fieldAssistance = $(this).siblings(".fieldAssistance");
        if($(this).val()){
            fieldAssistance.hide();
        }else{
            fieldAssistance.show();
        }
    });

    // allow clicking on select icon to toggle field
    $(".enquiry-form select ~ span.selectboxit-container.selectboxit-container ~ .field-icon").on("click", function(){
        var select = $(this).siblings("select");
        var selectBox = $(select).data("selectBox-selectBoxIt");

        var dropdown = $(this).siblings("span.selectboxit-container.selectboxit-container").find("span.selectboxit");
        if (dropdown.hasClass("selectboxit-open")){
            selectBox.close();
        }else{
            selectBox.open();
        };

    });
});
