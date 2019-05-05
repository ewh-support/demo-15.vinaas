// Contact Us popup form JS

$(document).ready(function(){
    var openBtn = '<span id="openBtn">Contact Us</span>';
    var closeBtn = '<svg id="closeBtn" class="contact-icon" width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg"><path d="M16.726 15.402c.365.366.365.96 0 1.324-.178.178-.416.274-.663.274-.246 0-.484-.096-.663-.274L8.323 9.648h.353L1.6 16.726c-.177.178-.416.274-.663.274-.246 0-.484-.096-.663-.274-.365-.365-.365-.958 0-1.324L7.35 8.324v.35L.275 1.6C-.09 1.233-.09.64.274.274c.367-.365.96-.365 1.326 0l7.076 7.078h-.353L15.4.274c.366-.365.96-.365 1.326 0 .365.366.365.958 0 1.324L9.65 8.675v-.35l7.076 7.077z" fill="#FFF" fill-rule="evenodd"></path></svg>';

    var popupForm = $("body").find('section.enquiry-form').last();
    popupForm.addClass("popup-form");

    var contactButton = $('.contact-btn');

    // hide contact button if feature content is visible
    if ($('[data-js-featured-content]').length) {
        contactButton.hide();
    } else {
        contactButton.on("click", function(){
            // position form
            formResize();

            // toggle
            $("#contactPopupForm").toggleClass("active");
            var btnId = $(this).children().last().attr("id");
            if(btnId == "openBtn"){
                $(this).html(closeBtn);
            }
            else if(btnId == "closeBtn"){
                $(this).html(openBtn);
            }

            $("section.popup-form").toggle();
        });

        // tooltip for terms and conditions
        $("section.popup-form .terms-container a[title]").tooltip({
            content: function () {
                return $(this).prop('title');
            },
            show: null,
            close: function (event, ui) {
                ui.tooltip.hover(
                    function () {
                        $(this).stop(true).fadeTo(400, 1);
                    },
                    function () {
                        $(this).fadeOut("400", function () {
                            $(this).remove();
                        })
                    });
            }
        });

        $(window).resize(function(){
            var formVisible = $("section#contactPopupForm").css("display") != "none";
            if(formVisible){
               formResize();
            }
            positionButton();
        });

        function formResize(){
            var windowHt = $(window).height();
            if(windowHt <= 675 && $("section#contactPopupForm").outerHeight(true) > 0.9*windowHt){
                // set a max height and add scroll
                $("section#contactPopupForm").css(
                    {"overflow-y" : "scroll",
                        "max-height": 0.8*windowHt
                    }
                );
            }else if(windowHt > 675){
                $("section#contactPopupForm").css(
                    {"overflow-y" : "visible",
                        "max-height": "initial"
                    }
                );
            }
            positionForm();
        }

        function positionForm(){
            var formHt = $("section#contactPopupForm").outerHeight(true);
            var formTop = ($(window).height() - formHt)*0.5;
            $("section#contactPopupForm").css("top", formTop);
        }

        // reposition button
        function positionButton(){
            var btnTop = $(window).height()*.5 - contactButton.outerHeight(true);
            contactButton.css("top", btnTop).show();
        }

        // allow labels on popup form to focus input field
        $('section.popup-form .input-box label').on("click", function(){
            $(this).siblings("input").first().focus();
        });

        positionButton();
    }
});
