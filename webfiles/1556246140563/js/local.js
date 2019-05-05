var stopInterval, stopInterval1;
var infographicIndex = 0;
var infographicIndex1 = 0;
var windowwidth1 = 0;
var icounter = 2;

function autoTabTimout() {
    stopInterval = setInterval(function () {
        clearInterval(stopInterval1);
        infographicIndex1 = 0;
        var itemLength = jQuery('.infographic .tabs li').length;
        if (infographicIndex === (itemLength - 1)) {
            infographicIndex = -1;
        }
        infographicIndex++;
        jQuery('.infographic .tabs').find('li').removeClass('active');
        jQuery('.infographic .tabs li:eq(' + infographicIndex + ')').addClass('active');
        jQuery('.infographic').find('.tabs-content').removeClass('tabs-active').addClass('prev-active');
        jQuery('.infographic').find('.tabs-content:eq(' + infographicIndex + ')').addClass('tabs-active').removeClass('prev-active');
        setTimeout(function () {
            jQuery('.infographic .prev-active').each(function () {
                var itemLength = jQuery(this).parent().children().length;
                jQuery(this).find('.inner-tabs .tabs-list').removeClass('active').addClass('grey-bg');
                jQuery(this).find('.inner-tabs .tabs-list:eq(' + 0 + ')').addClass('active').removeClass('grey-bg');
                jQuery(this).find('.inner-tabs-container .inner-tabs-content').css('display', 'none');
                jQuery(this).find('.inner-tabs-container .inner-tabs-content:eq(' + 0 + ')').stop(true, true).fadeIn('slow');

            });
        }, 100);
        if (windowwidth1 > 595) {
            autoTabTimout1(infographicIndex1);
            intervalueSet = 1;
        } else {
            intervalueSet = 2;
        }
    }, 10000);
}

function autoTabTimout1(infographicIndex1) {
    stopInterval1 = setInterval(function () {
        if ($(window).width() > 595) {
            jQuery('.infographic .tabs-active').each(function () {
                var itemLength = jQuery(this).find('.inner-tabs .tabs-list').length;
                infographicIndex1++;
                jQuery(this).find('.inner-tabs .tabs-list').removeClass('active').addClass('grey-bg');
                jQuery(this).find('.inner-tabs .tabs-list:eq(' + 1 + ')').addClass('active').removeClass('grey-bg');
                jQuery(this).find('.inner-tabs-container .inner-tabs-content').css('display', 'none').addClass('pre-active');
                jQuery(this).find('.inner-tabs-container .inner-tabs-content:eq(' + 1 + ')').stop(true, true).fadeIn('slow');

            });
        }
    }, 5000);
}

jQuery.fn.overlaySize = function () {
    return this.each(function () {
        var aspectRatio = 16 / 9;
        var $width = jQuery(this).outerWidth();
        var $height = $width / aspectRatio;
        var $parentHeight = jQuery(this).parents(".logo-grid").height();
        if($parentHeight > $height){
            jQuery(this).css("height", $height + "px");
        }

    });
}
jQuery.fn.imageResponsive = function () {
    return this.each(function () {
        var img = jQuery(this).children("img"),
            parentHeight = jQuery(this).height(),
            parentWidth = jQuery(this).width();
        img.css({"height": "auto", "width": "100%", "margin-left": "0px", "max-width": "inherit"});
        if (img.height() < parentHeight) {
            img.css({"height": "100%", "width": "auto"});
            var right_margin = (img.width() - parentWidth) / 2;
            img.css({"margin-left": "-" + right_margin + "px"});
        } else if (img.width() < parentWidth) {
            img.css({"height": "auto", "width": "100%", "margin-left": "0"});
        }
    });
};
jQuery(document).ready(function () {
    /* Code for wheel overlay */
    whenNoTrackingProtection();
    windowwidth1 = jQuery(window).width();

    var tabsLength = jQuery('.section-downloads .tabs ul > li').length;
    if (tabsLength > 2) {
        jQuery('.section-downloads').addClass('iframe-tabs');
    }
    jQuery('.generic-grid-overlay').click(function (e) {
        e.stopPropagation();
        jQuery('.generic-content-overlay').addClass('active');
        var text = jQuery(this).find('.overlay-content-wrapper .overlay-text').clone();
        jQuery('.generic-content-overlay .overlay-content').append(text);
        jQuery(".generic-content-overlay .overlay-content").width();
        jQuery(".generic-content-overlay .overlay-content").overlaySize();
    });
    jQuery('.generic-grid-overlay a').click(function (e) {
        e.stopPropagation();
    });
    jQuery(document).on('click', '.generic-content-overlay .close-overlay', function (e) {
        e.stopPropagation();
        jQuery('.generic-content-overlay').removeClass('active');
        jQuery('.generic-content-overlay .overlay-content .overlay-text').remove();
    });
    jQuery(document).on("click", function () {
        jQuery('.generic-content-overlay').removeClass('active');
        jQuery('.generic-content-overlay .overlay-content .overlay-text').remove();
        jQuery('.generic-content-video-overlay').removeClass('active');
        jQuery('.generic-content-video-overlay iframe').attr("src", '');
    });
    jQuery(document).on("click", '.generic-content-overlay .overlay-content', function (a) {
        a.stopPropagation();
    });
    jQuery(document).on("click", '.generic-content-video-overlay .iframe-container', function (a) {
        a.stopPropagation();
    });
    jQuery(document).on("click", '.generic-content-overlay .watch-video', function (a) {
        a.preventDefault();
        a.stopPropagation();
        var linkvideo = jQuery(this).attr('data-video');
        jQuery('.generic-content-video-overlay iframe').attr("src", linkvideo);
        jQuery('.generic-content-video-overlay').addClass('active');
        setTimeout(function () {
            var overlaySize = jQuery(".generic-content-overlay.active .overlay-content").width();
            jQuery('.generic-content-video-overlay .iframe-container').css({"width": overlaySize + "px"});
            jQuery('.generic-content-video-overlay .iframe-container').overlaySize();
            var windowWidth = jQuery(window).width();
            if (windowWidth < 768) {
                jQuery(".generic-content-overlay").removeClass("active");
                jQuery('.generic-content-overlay .overlay-content .overlay-text').remove();
            }

        }, 500);
    });
    jQuery(document).on("click", ".generic-content-video-overlay .overlay-close", function (e) {
        e.stopPropagation();
        jQuery('.generic-content-video-overlay').removeClass('active');
        jQuery('.generic-content-video-overlay iframe').attr("src", '');
    });

    jQuery('.content-graphic .expand-overlay .image').click(function (e) {
        e.stopPropagation();
        jQuery('.content-graphic .image-overlay').css('display', 'block').animate({'opacity': '1'}, 400);
        var strut = jQuery(this).parents('.expand-overlay').parent().find('.expand-overlay .image').clone(),
            index = jQuery(this).attr('data-item'),
            slidelength = jQuery(this).parents('.inner-box').find('.expand-overlay .image').length;
        jQuery('.content-graphic .image-overlay .image-slider').append(strut);
        jQuery('.content-graphic .image-overlay .image-slider .image[data-item="' + index + '"]').addClass('active');

        if (slidelength <= 1) {
            jQuery('.content-graphic .image-overlay .image-nav').css('display', 'none');
        } else {
            jQuery('.content-graphic .image-overlay .image-nav').css('display', 'block');
        }
    });

    jQuery('.content-graphic .image-overlay .minus-div').click(function () {
        if ((icounter <= 6) && (icounter >= 4)) {
            icounter = icounter - 2;
            if (icounter == 2) {
                jQuery('.content-graphic .image-overlay .image-slider .active img').removeAttr('style');
            } else {
                jQuery('.content-graphic .image-overlay .image-slider .active img').css('transform', 'scale(1.' + icounter + ')');
            }

            jQuery('.content-graphic .image-overlay .image-slider .active .content').css('opacity', '0');
            if (icounter <= 2) {
                jQuery('.content-graphic .image-overlay .image-slider .active .content').css('opacity', '1');
            }
            if (windowwidth1 < 992) {

                jQuery('.content-graphic .image-overlay .overlay-content .image .image-wrapper').css('overflow', 'hidden');
                setTimeout(function () {
                    jQuery('.content-graphic .image-overlay .overlay-content .image .image-wrapper').css('overflow', 'scroll');
                }, 700);
            }
        }

    });
    jQuery('.content-graphic .image-overlay .plus-div').click(function () {
        if ((icounter < 6) && (icounter >= 2)) {
            icounter = icounter + 2;
            jQuery('.content-graphic .image-overlay .image-slider .active img').css('transform', 'scale(1.' + icounter + ')');
            jQuery('.content-graphic .image-overlay .image-slider .active .content').css('opacity', '0');
            if (icounter <= 2) {
                jQuery('.content-graphic .image-overlay .image-slider .active .content').css('opacity', '1');
            }
            if (windowwidth1 < 992) {
                jQuery('.content-graphic .image-overlay .overlay-content .image .image-wrapper').css('overflow', 'hidden');
                setTimeout(function () {
                    jQuery('.content-graphic .image-overlay .overlay-content .image .image-wrapper').css('overflow', 'scroll');
                }, 700);
            }
        }
    });
    jQuery('.content-graphic .image-overlay .rotate-div').click(function () {
        icounter = 2;
        jQuery('.content-graphic .image-overlay .image-slider .active img').removeAttr('style');
        jQuery('.content-graphic .image-overlay .image-slider .active .content').css('opacity', '1');
        if (windowwidth1 < 992) {
            jQuery('.content-graphic .image-overlay .overlay-content .image .image-wrapper').css('overflow', 'hidden');
            setTimeout(function () {
                jQuery('.content-graphic .image-overlay .overlay-content .image .image-wrapper').css('overflow', 'scroll');
            }, 600);
        }
    });
    jQuery('.content-graphic .image-overlay .close-icon').click(function (e) {
        e.stopPropagation();
        icounter = 2;
        jQuery('.content-graphic .image-overlay').animate({'opacity': '0'}, {
            duration: 500, complete: function () {
                jQuery('.content-graphic .image-overlay').css('display', 'none');
                jQuery('.content-graphic .image-slider').empty();

            }
        });
    });
    jQuery('.content-graphic .image-overlay').click(function (e) {
        e.stopPropagation();
    });
    jQuery('.content-graphic .image-overlay .next').click(function () {
        var index = jQuery('.content-graphic .image-overlay .image.active').index();
        var length = jQuery('.content-graphic .image-overlay .image').length;
        index++;
        if (index >= length) {
            index = 0;
        }
        jQuery('.content-graphic .image-overlay .image-slider .image img').removeAttr('style');
        icounter = 2;
        jQuery('.content-graphic .image-overlay .image').removeClass('active');
        jQuery('.content-graphic .image-overlay .image:eq(' + index + ')').addClass('active');
        jQuery('.content-graphic .image-overlay .image-slider .content').css('opacity', '1');
    });
    jQuery('.content-graphic .image-overlay .prev').click(function () {
        var index = jQuery('.content-graphic .image-overlay .image.active').index();
        var length = jQuery('.content-graphic .image-overlay .image').length;
        index--;
        if (index < 0) {
            index = length - 1;
        }
        jQuery('.content-graphic .image-overlay .image-slider .image img').removeAttr('style');
        i = 0;
        j = 0;
        jQuery('.content-graphic .image-overlay .image').removeClass('active');
        jQuery('.content-graphic .image-overlay .image:eq(' + index + ')').addClass('active');
        jQuery('.content-graphic .image-overlay .image-slider .content').css('opacity', '1');
    });
    /* Code End for wheel overlay */

    jQuery(".copy-text").click(function (d) {
        d.preventDefault();
    });
    var window_width = jQuery(window).width();
    initActiveScrollSelector();
    jQuery(document).on('hover', '.logo-grid .grid-block', function () {
    });

    jQuery(document).on('click', '.logo-grid .grid-block .flip-close', function () {
        jQuery(this).parents('.grid-block').removeClass('active');
    });
    jQuery(document).on('click', '.infographic .tabs-list', function () {
        clearInterval(stopInterval);
        clearInterval(stopInterval1);
        var window_width = jQuery(window).width();
        if (window_width > 595) {
            var index = jQuery(this).index();
            if (jQuery(this).hasClass('active')) {

            } else {
                jQuery(this).parent('.inner-tabs').find('.tabs-list').removeClass('active').addClass('grey-bg');
                jQuery(this).addClass('active').removeClass('grey-bg');
                jQuery(this).parents('.tabs-content').find('.inner-tabs-content').css('display', 'none');
                jQuery(this).parents('.tabs-content').find('.inner-tabs-content:eq(' + index + ')').stop(true, true).fadeIn('slow');
            }
        }

    });
    jQuery('.infographic .tabs li').click(function () {
        clearInterval(stopInterval);
        clearInterval(stopInterval1);
        infographicIndex = jQuery(this).index();
        jQuery(this).parent('ul').find('li').removeClass('active');
        jQuery(this).addClass('active');
        jQuery(this).parents('.infographic').find('.tabs-content').removeClass('tabs-active');
        jQuery(this).parents('.infographic').find('.tabs-content:eq(' + infographicIndex + ')').addClass('tabs-active');
//        jQuery(".infographic .tabs-content.tabs-active .tabs-list:eq(0)").trigger("click");
    });


    /* End Infographic tabs*/


    jQuery('.section-downloads .tabs').find("li").click(function (e) {
        e.preventDefault();
        var button_index = jQuery(this).index();
        jQuery(this).addClass("active");
        jQuery('.section-downloads .tabs').find("li").not(this).removeClass("active");
        jQuery('.section-downloads .tab-outer').find(".tabs-content:eq(" + button_index + ")").css("display", "block").animate({opacity: '1'}, 500);
        jQuery('.section-downloads .tab-outer').find(".tabs-content").not(".tabs-content:eq(" + button_index + ")").css({
            "display": "none",
            'opacity': '0'
        });
    });
    jQuery('#n1ql .close-btn').click(function () {
        jQuery('.section-downloads#n1ql .col-two .hide-div').css('opacity', '0');
    });
    jQuery('.section-tabs .tabs-inner').click(function () {
        jQuery('.section-downloads#n1ql .col-two .hide-div').css('opacity', '0');
    });

    jQuery('.section-tabs .tabs').find("li").click(function (e) {
        e.preventDefault();
        var button_index = jQuery(this).index();
        jQuery(this).addClass("active");
        jQuery('.section-tabs .tabs').find("li").not(this).removeClass("active");
        jQuery('.section-tabs .tab-outer').find(".tabs-content:eq(" + button_index + ")").css("display", "block").animate({opacity: '1'}, 500);
        jQuery('.section-tabs .tab-outer').find(".tabs-content").not(".tabs-content:eq(" + button_index + ")").css({
            "display": "none",
            'opacity': '0'
        });
        setTimeout(function () {
            imageResponsive4();
            imageResponsive3();
        }, 30);
    });
    jQuery(".section-tabs .tabs-inner").click(function () {
        jQuery('html,body').animate({
                scrollTop: jQuery(".section-tabs").offset().top
            },
            'slow');
    });
    jQuery('.view-tabs li').click(function (e) {
        e.preventDefault();
        var button_index = jQuery(this).index();
        jQuery(this).addClass('active');
        jQuery(this).parents('.select-tabs').find("li").not(this).removeClass("active");
        jQuery(this).parents('.select-tabs').find(".second-tabs-content:eq(" + button_index + ")").css("display", "block").animate({opacity: '1'}, 500);
        jQuery(this).parents('.select-tabs').find(".second-tabs-content").not(".second-tabs-content:eq(" + button_index + ")").css({
            "display": "none",
            'opacity': '0'
        });
    });
    jQuery('.third-tabs li').click(function (e) {
        e.preventDefault();
        var button_index = jQuery(this).index();
        jQuery(this).toggleClass('active');
        var clickedValue = jQuery(this).parents('.bottom-tabs').find('.accordian-container').attr('data-type');
        jQuery(this).parents('.bottom-tabs .third-tabs').find("li").not(this).removeClass("active");
        if (clickedValue == 0) {
            jQuery(this).parents('.bottom-tabs').find(".third-tabs-container").css('opacity', '0');
            jQuery(this).parents('.bottom-tabs').find(".third-tabs-container:eq(" + button_index + ")").stop(true, true).slideDown().css('opacity', '1');
            jQuery(this).parents('.bottom-tabs').find('.accordian-container').attr('data-type', '1');
        } else {
            if (jQuery(this).parent().find('li').hasClass('active')) {

                jQuery(this).parents('.bottom-tabs').find(".third-tabs-container").not(".third-tabs-container:eq(" + button_index + ")").css({
                    "display": "none",
                    'opacity': '0'
                });
                jQuery(this).parents('.bottom-tabs').find(".third-tabs-container:eq(" + button_index + ")").css('display', 'block').animate({'opacity': '1'});
            } else {
                jQuery(this).parents('.bottom-tabs').find(".third-tabs-container:eq(" + button_index + ")").stop(true, true).slideUp().css('opacity', '1');
                ;
                jQuery(this).parents('.bottom-tabs').find('.accordian-container').attr('data-type', '0');
            }
        }
    });
    /*jQuery('.section-downloads button.download-form').click(function (e) {
     e.stopPropagation();
     jQuery('.form-overlay').css('display', 'block').animate({'opacity': '1'}, 500);
     });*/
    jQuery('.form-overlay .close-btn').click(function () {
        jQuery('.form-overlay').animate({'opacity': '0'}, {
            duration: 500, complete: function () {
                jQuery('.form-overlay').css('display', 'none');
            }
        });
    });
    jQuery('.form-overlay .form.enquiry-form').click(function (e) {
        e.stopPropagation();
    });
    jQuery('.form-overlay').click(function (e) {
        // check if we're clicking inside the form
        if ($(e.target).closest('.form.enquiry-form').length) return null;

        // if not, close the form
        jQuery('.form-overlay').animate({'opacity': '0'}, {
            duration: 500, complete: function () {
                jQuery('.form-overlay').css('display', 'none');
            }
        });
    });
    jQuery('.pro-tabs .tabset').find("li").click(function (e) {
        e.preventDefault();
        var button_index = jQuery(this).index();
        jQuery(this).addClass("active");
        jQuery(this).parents('.tabset').find("li").not(this).removeClass("active");
        jQuery(this).parents('.pro-tabs ').find('.tab-content').find(".tab:eq(" + button_index + ")").css("display", "block").animate({opacity: '1'}, 500);
        jQuery(this).parents('.pro-tabs ').find('.tab-content').find(".tab").not(".tab:eq(" + button_index + ")").css({
            "display": "none",
            'opacity': '0'
        });
    });
    jQuery('.section-boards .tabset').find("li").click(function (e) {
        e.preventDefault();
        if (jQuery(this).parents('.tabset').hasClass('full-width')) {
            var button_index = jQuery(this).index();
            jQuery(this).addClass("active");
            jQuery(this).parents('.tabset').find("li").not(this).removeClass("active");
            jQuery(this).parents('.boards-tabs').find('.tab-content').find(".tab:eq(" + button_index + ")").css("display", "block").animate({opacity: '1'}, 500);
            jQuery(this).parents('.boards-tabs').find('.tab-content').find(".tab").not(".tab:eq(" + button_index + ")").css({
                "display": "none",
                'opacity': '0'
            });
        }
    });
    jQuery('.section-boards .tab-list > li').each(function () {
        var index = jQuery(this).index();
        var tabValue = jQuery(this).parents('.boards-tabs').find('.tab-content .tab:eq(' + index + ')').clone();
        jQuery(this).append(tabValue);
    });
    jQuery('.section-boards .tab-list li').click(function (e) {
        e.preventDefault();
        if (jQuery(this).parents('.tabset').hasClass('small-width')) {

            if (jQuery(this).hasClass('toggle-active')) {
                jQuery(this).removeClass('toggle-active');
                jQuery(this).find('.tab').stop(true, true).slideUp();
            } else {
                jQuery('.section-boards .tab-list li').removeClass('toggle-active');
                jQuery(this).addClass('toggle-active');
                jQuery('.section-boards .tab-list li .tab').stop(true, true).slideUp();
                jQuery(this).find('.tab').stop(true, true).slideDown();
            }
            if (windowwidth1 < 481) {
                var height = 0;
                if (jQuery(this).find('.tab .text-holder > h6').length > 0) {
                    height = jQuery(this).find('.tab h6').height() + 20;
                } else {
                    height = jQuery(this).find('.tab .heading-links').height();
                }
                jQuery(this).find('.tab .connect-links').css('top', (height - 10) + 'px');
            }
        }
    });
    if (window_width <= 767) {
        jQuery('.code-intro .tabset > ul').addClass('mobile-list');
        jQuery('.section-boards .board-content .tabset').addClass('small-width').removeClass('full-width');
        jQuery('.leadership-block .img-width-title').addClass('small-width').removeClass('full-width');
    } else {
        jQuery('.tabset > ul').removeClass('mobile-list');
        jQuery('.tabset > ul').removeAttr('style');
        jQuery(".caret").removeClass("closeup");
        jQuery('.section-boards .board-content .tabset').addClass('full-width').removeClass('small-width');
        jQuery('.leadership-block .img-width-title').addClass('full-width').removeClass('small-width');
    }
    jQuery(document).on('click touch', '.tabset button', function (e) {
        e.stopPropagation();
        jQuery('.mobile-list').slideToggle('fast');
        jQuery(".caret").toggleClass("closeup");
    });
    jQuery(document).on('click touch', '.mobile-list li', function () {
        var val = jQuery(this).find('a').html();
        jQuery(this).parents('.tabset').find(".copytext").html(val);
        jQuery('.mobile-list').slideUp('fast');
        jQuery(".caret").removeClass("closeup");
    });
    jQuery(document).click(function () {
        jQuery('.mobile-list').slideUp('fast');
        jQuery(".caret").removeClass("closeup");
    });
    jQuery('.section-tabs .tabs-inner').click(function () {
        var getId = jQuery(this).attr('data-id'),
            length = jQuery(this).parents('.tabs-content').find('.col-outer > div').length - 1;
        var colwidth = ('width', 100 / length + '%');
        jQuery(this).parents('.tabs-content').find('.col-outer > div').css({'width': 'calc(' + colwidth + '  - 11px)'});
        jQuery(this).parents('.col-outer').find('.tabs-inner').removeClass('hide');
        jQuery(this).addClass('hide');
        imageResponsive4();
        imageResponsive3();
        jQuery(this).parents('.tabs-content').find('.col-expand').each(function () {
            var colId = jQuery(this).attr('id');
            if (getId === colId) {
                jQuery(this).slideDown();
            } else {
                jQuery(this).slideUp();
            }
        });
    });
    jQuery('.inner-column .text-with-button .close-btn').click(function () {
        jQuery(this).parents('.tabs-content').find('.col-outer').find('.tabs-inner').removeClass('hide');
        jQuery(this).parents('.tabs-content').find('.col-expand').stop(true, true).slideUp();
        jQuery(this).parents('.tabs-content').find('.col-outer > div').attr('style', '');
        setTimeout(function () {
            imageResponsive4();
            imageResponsive3();
        }, 20);
    });
    jQuery('.enquiry-form .input-box input,.enquiry-form .text-box textarea').on('focus blur input', function () {
        var inputValue = jQuery(this).val();
        var fieldLabel = jQuery(this).prev('label');
        if (inputValue.length > 0) {
            fieldLabel.hide();
        } else {
            fieldLabel.show();
        }
    });
    jQuery('.board-director .tabset').find("a").click(function (e) {
        e.preventDefault();
        var button_index = jQuery(this).index();
        jQuery(this).parent('li').addClass("active");
        jQuery('.board-director .tabset').find("li").not(this).removeClass("active");
        jQuery('.board-director .tab-content').find(".tab:eq(" + button_index + ")").css("display", "block").animate({opacity: '1'}, 500);
        jQuery('.board-director .tab-content').find(".tab").not(".tabs-content:eq(" + button_index + ")").css({
            "display": "none",
            'opacity': '0'
        });
        setTimeout(function () {
            imageResponsive4();
            imageResponsive3();
        }, 30);
    });
    jQuery('.leadership-details .img-width-title').click(function () {
        if (jQuery(this).hasClass('full-width')) {

            if (jQuery(this).find('.tab-expand').hasClass('hide')) {
                jQuery('.leadership-details .tab-expand').removeClass('hide');
                jQuery(this).find('.tab-expand').removeClass('hide');
                jQuery(this).parents('.leadership-details').find('.leadership-info').stop(true, true).slideUp();
            } else {
                jQuery('.leadership-details .tab-expand').removeClass('hide');
                jQuery(this).find('.tab-expand').addClass('hide');
                jQuery('.leadership-details').find('.leadership-info').stop(true, true).slideUp();
                jQuery(this).parents('.leadership-details').find('.leadership-info').stop(true, true).slideDown();
            }
        }
    });
    jQuery('.leadership-details .tab-expand').click(function () {
        if (jQuery(this).parents('.img-width-title').hasClass('small-width')) {
            if (jQuery(this).hasClass('hide')) {
                jQuery('.leadership-details .tab-expand').removeClass('hide');
                jQuery(this).removeClass('hide');
                jQuery(this).parents('.img-width-title').removeClass('active');
                jQuery(this).parents('.leadership-details').find('.leadership-info').stop(true, true).slideUp();
            } else {
                jQuery('.leadership-details .tab-expand').removeClass('hide');
                jQuery(this).addClass('hide');
                jQuery('.leadership-details .img-width-title').removeClass('active');
                jQuery(this).parents('.img-width-title').addClass('active');
                jQuery('.leadership-details').find('.leadership-info').stop(true, true).slideUp();
                jQuery(this).parents('.leadership-details').find('.leadership-info').stop(true, true).slideDown();
            }
        }
    });
    var scroll = jQuery(document).scrollTop(),
        topnavHeight = jQuery('section[class*="-level-banner"]').outerHeight(true) - jQuery('.main-nav').outerHeight(true);
    jQuery(window).scroll(function () {
        var scrolled = jQuery(document).scrollTop();
        if (jQuery('.leadership-tabs').length > 0) {
            var topSpace = jQuery(".leadership-tabs").offset().top;
            if ((scrolled > scroll)) {
                if (scrolled >= topSpace) {
                    jQuery(".leadership-tabs").addClass("fixed-tab");
                    jQuery(".leadership-block").css("margin-top", "24px");
                }
                jQuery(".leadership-tabs").removeClass("off-canvas-tab");
            } else if ((scrolled < scroll)) {
                if (scrolled > topnavHeight) {
                    jQuery(".leadership-tabs.fixed-tab").addClass("off-canvas-tab");
                } else if (scrolled < topnavHeight) {
                    jQuery(".leadership-tabs").removeClass("off-canvas-tab");
                    jQuery(".leadership-tabs").removeClass("fixed-tab");
                    jQuery(".leadership-block").css("margin-top", "0");
                }
            }
        }
        scroll = jQuery(document).scrollTop();
    });
    jQuery(".leadership-tabs li > a").click(function () {
        jQuery('.leadership-tabs li').removeClass('active');
        jQuery(this).parent('li').addClass('active');
        var $dataId = jQuery(this).attr('href');
        $dataId = $dataId.split('#');
        var lastVar = $dataId.pop();
        lastVar = jQuery('#' + lastVar + '');
        var tabHeight = jQuery('.leadership-tabs').height();
        if (jQuery(".leadership-tabs").hasClass("fixed-tab")) {
            jQuery('html, body').animate({
                scrollTop: jQuery(lastVar).offset().top - tabHeight
            }, 'swing');
        } else {
            jQuery('html, body').animate({
                scrollTop: jQuery(lastVar).offset().top - 90
            }, 'swing');
        }

    });
    jQuery('.select-option .clickable-box select').change(function () {
        var id = jQuery(this).children(":selected").attr("id");
        jQuery(this).parents('.tabs-parent').find('.select-tabs, .bottom-links').each(function () {
            var tabsId = jQuery(this).attr('id');
            if (tabsId === id) {
                jQuery(this).css('display', 'block').animate({'opacity': '1'}, 500);
            } else {
                jQuery(this).css({'display': 'none', opacity: '0'});
            }
        });
    });
    if (window_width < 767) {

    }

    if (window_width > 991) {
        jQuery('.solution-col-grid .col-four').addClass('col-item');
    } else {
        jQuery('.solution-col-grid .col-four').removeClass('col-item');
    }
    jQuery('.solution-col-grid .col-four .close-icon').on('click', function (e) {
        e.stopPropagation();
        jQuery(".solution-col-grid .col-four.active-column").addClass("inactive-column");
        jQuery('.solution-col-grid .col-four').removeClass('active-column');

        setTimeout(function () {
            jQuery(".solution-col-grid .col-four").removeClass("inactive-column");
            jQuery(".solution-col-grid .col-four").removeAttr("style");
            jQuery(".solution-col-grid .col-wrapper").removeClass("active-overlay");
        }, 800);


    });

    /* Customer overlay */

    if (window_width > 767) {
        jQuery(document).on("click", ".logo-grid .open-overlay", function (e) {
            e.stopPropagation();
            var overlayContent = jQuery(this).parents(".grid-block").find(".overlay-text").html();
            jQuery(".logo-grid .grid-overlay .overlay-content").html(overlayContent);
            jQuery(".logo-grid .grid-overlay").addClass("active");
            var $this_offset = jQuery(this).offset().top;
            var $grid_offset = jQuery('.grid-overlay').offset().top;
            var aspectRatio = 16 / 9;
            var $width = jQuery('.logo-grid .grid-overlay.active .overlay-content').outerWidth();
            var overlayHeight = $width / aspectRatio;
            var overlayOffset = jQuery('.logo-grid .grid-overlay.active .overlay-content').offset().top;
            var contentOffset = jQuery('.logo-grid .grid-overlay .overlay-content').offset().top;
            var contentHeight = overlayHeight;
            var offset = jQuery(this).offset().top - jQuery('.logo-grid .grid-overlay .overlay-content').offset().top - contentHeight;
            if (jQuery('.logo-grid  .grid-container .grid-block').length < 4) {
                jQuery(".logo-grid .grid-overlay .overlay-content").css({'top': (jQuery('.logo-grid .grid-overlay').position().top - 20) + 'px'});
                jQuery(".logo-grid .video-overlay .video-inner").css({'top': (jQuery('.logo-grid .grid-overlay').position().top - 2) + 'px'});
            }else if(jQuery('.logo-grid  .grid-container .grid-block').length < 7){
                jQuery(".logo-grid .grid-overlay .overlay-content").css({'top': (jQuery('.logo-grid .grid-overlay').position().top) + 'px'});
                jQuery(".logo-grid .video-overlay .video-inner").css({'top': (jQuery('.logo-grid .grid-overlay').position().top) + 'px'});
            }else {
                if (($this_offset - $grid_offset) < overlayHeight) {
                    var offset = jQuery(this).offset().top - jQuery('.logo-grid .grid-overlay .overlay-content').offset().top;
                    jQuery(".logo-grid .grid-overlay .overlay-content").css({'top': ((contentOffset + contentHeight + offset) - (overlayHeight + overlayOffset)) - 50 + 'px'});
                    jQuery(".logo-grid .video-overlay .video-inner").css({'top': ((contentOffset + contentHeight + offset) - (overlayHeight + overlayOffset)) - 50 + 'px'});
                } else {
                    var $offset = 0;
                    if (offset < (-450)) {
                        $offset = -450;
                    } else {
                        $offset = offset + 50;
                    }
                    jQuery(".logo-grid .grid-overlay .overlay-content").css({'top': $offset + 'px'});
                    jQuery(".logo-grid .video-overlay .video-inner").css({'top': $offset + 'px'});
                }
            }
            setTimeout(function () {
                var scrollelement = jQuery(".logo-grid .grid-overlay .overlay-content");
                jQuery('html, body').animate({
                    scrollTop: $(scrollelement).offset().top - 80
                }, 1000);
            }, 500);

            var windowWidth = jQuery(window).width();
            if (windowWidth > 767) {
                setTimeout(function () {
                    jQuery(".logo-grid .grid-overlay.active .overlay-content").overlaySize();
                    jQuery(".logo-grid .grid-overlay.active .video-players").overlaySize();
                }, 200);
            }
        });
    } else if (window_width <= 767) {
        jQuery(document).on("click", ".logo-grid .open-overlay", function (e) {
            e.stopPropagation();
            var overlayContent = jQuery(this).parents(".grid-block").find(".overlay-text").html();
            jQuery(".logo-grid .grid-overlay .overlay-content").html(overlayContent);
            jQuery(".logo-grid .grid-overlay").addClass("active");
            var overlayHeight = jQuery('.logo-grid .grid-overlay.active .overlay-content').outerHeight();
            var overlayOffset = jQuery('.logo-grid .grid-overlay.active .overlay-content').offset().top;
            var contentOffset = jQuery('.logo-grid .grid-overlay .overlay-content').offset().top;
            var contentHeight = jQuery('.logo-grid .grid-overlay.active .overlay-content').outerHeight();
            var offset = jQuery(this).offset().top - jQuery('.logo-grid .grid-overlay .overlay-content').offset().top - contentHeight;
            if ((overlayOffset) < (contentOffset + offset)) {

                jQuery(".logo-grid .grid-overlay .overlay-content").css({'top': ((contentOffset + offset) - (overlayOffset)) + 'px'});
                jQuery(".logo-grid .video-overlay .video-inner").css({'top': ((contentOffset + offset) - (overlayOffset)) + 'px'});
            } else {
                var $offset = 0;
                if (offset < (-450)) {
                    $offset = -450;
                    var windowWidth = jQuery(window).width();
                    if(windowWidth < 595){
                        $offset= -20;
                    }
                    console.log("condition 1");
                } else {
                    console.log("condition 2");
                    $offset = offset + 50;
                    if($offset < (-20)){
                        $offset= -20;
                    }

                }

                jQuery(".logo-grid .grid-overlay .overlay-content").css({'top': $offset + 'px'});
                jQuery(".logo-grid .video-overlay .video-inner").css({'top': $offset + 'px'});
            }
            setTimeout(function () {
                var scrollelement = jQuery(".logo-grid .grid-overlay .overlay-content");
                jQuery('html, body').animate({
                    scrollTop: $(scrollelement).offset().top - 80
                }, 1000);
            }, 500);

            var windowWidth = jQuery(window).width();
            if (windowWidth > 767) {
                setTimeout(function () {
                    jQuery(".logo-grid .grid-overlay.active .overlay-content").overlaySize();
                }, 200);
            }
        });
    }
    jQuery(document).on("click", '.logo-grid .watch-video', function (a) {
        a.preventDefault();
        var linkvideo = jQuery(this).attr('data-video');
        jQuery('.logo-grid iframe').attr("src", linkvideo);
        jQuery('.logo-grid .video-overlay').addClass('active');
        setTimeout(function () {
            var overlaySize = jQuery(".logo-grid .grid-overlay.active .overlay-content").outerWidth();
            jQuery('.logo-grid .video-overlay .iframe-container').css({"width": overlaySize + "px"});
            jQuery('.logo-grid .video-overlay .iframe-container').overlaySize();
            var windowWidth = jQuery(window).width();
            if (windowWidth < 768) {
                jQuery(".logo-grid .grid-overlay").removeClass("active");
            }

        }, 500);
    });
    jQuery(document).on("click", ".grid-overlay .overlay-content .close-overlay", function () {

        setTimeout(function () {
            jQuery(".logo-grid .grid-overlay .overlay-content").css({'top': '0px'});
            jQuery(".logo-grid .video-overlay .video-inner").css({'top': '0px'});
        }, 300);
        jQuery(".logo-grid .grid-block").removeClass("tappable");
        jQuery(".logo-grid .grid-overlay").removeClass("active");
        jQuery(".logo-grid .grid-overlay .overlay-content").html("");
    });
    jQuery(document).on("click", ".logo-grid .overlay-close", function (e) {
        e.stopPropagation();
        jQuery('.logo-grid .video-overlay').removeClass('active');
        jQuery('.logo-grid iframe').attr("src", '');
    });

    jQuery(document).on("click", function () {
        setTimeout(function () {
            jQuery(".logo-grid .grid-overlay .overlay-content").css({'top': '0px'});
            jQuery(".logo-grid .video-overlay .video-inner").css({'top': '0px'});
        }, 300);
        jQuery(".logo-grid .grid-overlay").removeClass("active");
        jQuery('.logo-grid .video-overlay').removeClass('active');
        jQuery('.logo-grid iframe').attr("src", '');
        jQuery(".logo-grid .grid-overlay .overlay-content").html("");

    });
    jQuery(document).on("click", ".grid-overlay .overlay-content", function (a) {
        a.stopPropagation();
    });

    jQuery(document).click(function () {
        /* Search icon animation */
        if (jQuery('.grid-filter .animated-circle').hasClass('close')) {
            jQuery('.grid-filter .animated-circle').addClass('active');
            jQuery('.grid-filter .animated-circle .circle-search').velocity('reverse', {
                duration: 250, easing: 'easeOutSine', complete: function () {
                    jQuery('.grid-filter .animated-circle .circle-search').velocity({
                        width: '20px',
                        borderWidth: '4px',
                        borderRadius: '50%'
                    }, {duration: 250, easing: 'easeOutSine'});
                }
            });
            jQuery('.grid-filter .animated-circle .line-search').velocity({rotateZ: '-45deg'},
                {
                    duration: 500, easing: 'easeOutSine', complete: function () {
                    jQuery('.grid-filter .animated-circle').removeClass('active');
                }
                });
            jQuery('.grid-filter .animated-circle').addClass('search').removeClass('close');
        }

    });
    searchAnimate1();

    /*
     * Customer filter
     */
    /*
     jQuery(".grid-filter .select1 select").on("change",function(){
     var selectVal = jQuery(this).val();
     jQuery(".grid-container .grid-block").removeClass("hide");
     jQuery('.grid-filter .select2').css('display', 'block');
     jQuery(".grid-container .grid-block").each(function () {
     var selecterOne = jQuery(this).attr("data-selecter1");
     if (selectVal === selecterOne) {
     var index = jQuery(this).index();
     jQuery(this).css({"display": "block"});
     setTimeout(function () {
     jQuery(".grid-container .grid-block:eq(" + index + ")").addClass("show");
     }, 100);
     } else if (selectVal === "all") {
     jQuery(".grid-container .grid-block").css({"display": "block"});
     setTimeout(function () {
     jQuery(".grid-container .grid-block").addClass("show").removeClass("hide");
     }, 100);
     } else {
     jQuery(this).removeClass("show");
     var index = jQuery(this).index();
     setTimeout(function () {
     jQuery(".grid-container .grid-block:eq(" + index + ")").css({"display": "none"});
     }, 400);
     }
     });
     });
     jQuery(".grid-filter .select2 select").on("change", function () {
     var selectVal = jQuery(this).val();
     jQuery('.grid-filter .select3').css('display', 'block');
     jQuery(".grid-container .grid-block").each(function () {
     var selecterOne = jQuery(this).attr("data-selecter2");

     if (selectVal === selecterOne) {
     var index = jQuery(this).index();
     if (jQuery(".grid-container .grid-block:eq(" + index + ")").hasClass("show")) {
     jQuery(".grid-container .grid-block:eq(" + index + ")").css({"display": "block"});
     setTimeout(function () {
     jQuery(".grid-container .grid-block:eq(" + index + ")").removeClass("hide");
     }, 100);
     }
     } else if (selectVal === "all") {
     var index = jQuery(this).index();
     if (jQuery(".grid-container .grid-block:eq(" + index + ")").hasClass("show")) {
     jQuery(".grid-container .grid-block:eq(" + index + ")").css({"display": "block"});
     setTimeout(function () {
     jQuery(".grid-container .grid-block:eq(" + index + ")").removeClass("hide");
     }, 100);
     }
     } else {
     var index = jQuery(this).index();
     if (jQuery(".grid-container .grid-block:eq(" + index + ")").hasClass("show")) {
     jQuery(".grid-container .grid-block:eq(" + index + ")").addClass("hide");
     setTimeout(function () {

     jQuery(".grid-container .grid-block:eq(" + index + ")").css({"display": "none"});
     }, 400);
     }
     }
     });
     });
     jQuery(".grid-filter .select3 select").on("change", function () {
     var selectVal = jQuery(this).val();
     jQuery('.grid-filter .select4').css('display', 'block');
     jQuery(".grid-container .grid-block").each(function () {
     var selecterOne = jQuery(this).attr("data-selecter3");

     if (selectVal === selecterOne) {
     var index = jQuery(this).index();
     if (jQuery(".grid-container .grid-block:eq(" + index + ")").hasClass("show")) {
     jQuery(".grid-container .grid-block:eq(" + index + ")").css({"display": "block"});
     setTimeout(function () {
     jQuery(".grid-container .grid-block:eq(" + index + ")").removeClass("hide");
     }, 100);
     }
     } else if (selectVal === "all") {
     var index = jQuery(this).index();
     if (jQuery(".grid-container .grid-block:eq(" + index + ")").hasClass("show")) {
     jQuery(".grid-container .grid-block:eq(" + index + ")").css({"display": "block"});
     setTimeout(function () {
     jQuery(".grid-container .grid-block:eq(" + index + ")").removeClass("hide");
     }, 100);
     }
     } else {
     var index = jQuery(this).index();
     if (jQuery(".grid-container .grid-block:eq(" + index + ")").hasClass("show")) {
     jQuery(".grid-container .grid-block:eq(" + index + ")").addClass("hide");
     setTimeout(function () {

     jQuery(".grid-container .grid-block:eq(" + index + ")").css({"display": "none"});
     }, 400);
     }
     }
     });

     });
     jQuery(".grid-filter .select4 select").on("change", function () {
     var selectVal = jQuery(this).val();
     jQuery(".grid-container .grid-block").each(function () {
     var selecterOne = jQuery(this).attr("data-selecter3");

     if (selectVal === selecterOne) {
     var index = jQuery(this).index();
     if (jQuery(".grid-container .grid-block:eq(" + index + ")").hasClass("show")) {
     jQuery(".grid-container .grid-block:eq(" + index + ")").css({"display": "block"});
     setTimeout(function () {
     jQuery(".grid-container .grid-block:eq(" + index + ")").removeClass("hide");
     }, 100);
     }
     } else if (selectVal === "all") {
     var index = jQuery(this).index();
     if (jQuery(".grid-container .grid-block:eq(" + index + ")").hasClass("show")) {
     jQuery(".grid-container .grid-block:eq(" + index + ")").css({"display": "block"});
     setTimeout(function () {
     jQuery(".grid-container .grid-block:eq(" + index + ")").removeClass("hide");
     }, 100);
     }
     } else {
     var index = jQuery(this).index();
     if (jQuery(".grid-container .grid-block:eq(" + index + ")").hasClass("show")) {
     jQuery(".grid-container .grid-block:eq(" + index + ")").addClass("hide");
     setTimeout(function () {

     jQuery(".grid-container .grid-block:eq(" + index + ")").css({"display": "none"});
     }, 400);
     }
     }
     });

     });
     */
});

function searchAnimate1() {

    jQuery('.grid-filter .animated-circle.clickable1').one("click", function (event) {
        event.stopPropagation();
        setTimeout(function () {
            jQuery('.grid-filter .animated-circle').addClass("clickable1");
            searchAnimate1();
        }, 1000);
        jQuery(this).removeClass("clickable1");
        if (jQuery('.grid-filter .animated-circle').hasClass('active1')) {
            return false;
        } else if (jQuery('.grid-filter .animated-circle').hasClass('search1')) {
            jQuery('.animate').addClass('active1');
            jQuery('.grid-filter .animated-circle .circle-search').velocity({
                    width: '0',
                    borderRadius: '0',
                    rotateZ: '-45deg'
                },
                {
                    duration: 250, easing: 'easeOutSine', complete: function () {
                    jQuery('.grid-filter .animated-circle .circle-search').velocity({
                        left: '25px',
                        borderWidth: '1px',
                        top: '5px'
                    }, {duration: 250, easing: 'easeOutSine'});
                }
                });

            jQuery('.grid-filter .animated-circle .line-search').velocity({rotateZ: '225deg'},
                {
                    duration: 500, easing: 'easeOutSine', complete: function () {
                    jQuery('.grid-filter .animated-circle').removeClass('active1');
                }
                });
            jQuery('.grid-filter .animated-circle').removeClass('search1').addClass('close1');
            jQuery(".grid-filter").addClass("hide-filter").removeClass("show-filter");
            var rightValue = jQuery('.logo-grid .grid-filter').width() - 40;
            jQuery('.grid-filter .search-btn .animated-circle').css('right', '-' + rightValue + 'px');

        } else if (jQuery('.grid-filter .animated-circle').hasClass('close1')) {
            jQuery('.grid-filter .animated-circle').addClass('active1');
            jQuery('.grid-filter .animated-circle .circle-search').velocity('reverse', {
                duration: 250, easing: 'easeOutSine', complete: function () {
                    jQuery('.grid-filter .animated-circle .circle-search').velocity({
                            width: '20px',
                            borderRadius: '50%',
                            borderWidth: '3px'
                        },
                        {duration: 250, easing: 'easeOutSine'});
                }
            });
            jQuery('.grid-filter .animated-circle .line-search').velocity({rotateZ: '-45deg'},
                {
                    duration: 500, easing: 'easeOutSine', complete: function () {
                    jQuery('.grid-filter .animated-circle').removeClass('active1');

                }
                });
            jQuery('.grid-filter .animated-circle').addClass('search1').removeClass('close1');
            /* search form */
            jQuery(".grid-filter").removeClass("hide-filter").addClass("show-filter");
            jQuery('.grid-filter .search-btn .animated-circle').css('right', '-6px');
        }

    });
}

jQuery(window).on("load", function () {
    jQuery('.content-graphic').addClass('clicked');
    jQuery(".banner-download .animate-svg").addClass("on-load");
    jQuery(".solution-col-grid").addClass("active-hover");
    initColCounter();
    var accordion = jQuery(".download-accordion, .generic-accordion");
    accordion.on("click", ".item-title", function () {
        accordion.find(".btn-plus").not(jQuery(this).find('.btn-plus')).removeClass("btn-plus-minus");
        accordion.find(".accordion-item .accordion-content").not(jQuery(this).parents(".accordion-item").find(".accordion-content")).slideUp();
        jQuery(this).find('.btn-plus').toggleClass("btn-plus-minus");
        jQuery(this).parents(".accordion-item").find(".accordion-content").stop(true).slideToggle();
    });
    /* Basic flow select list
     jQuery(".accordian-outer.basic-flow .select1 select").val("couchbase-server").trigger("change");
     jQuery(".accordian-outer.basic-flow .select2 select").val("mac-osx").trigger("change");
     /* Previous-version select list
     jQuery(".previous-version-accordian .select1 select").val("couchbase-server").trigger("change");
     jQuery(".previous-version-accordian .select2 select").val("mac-osx").trigger("change");
     /* Marketing select list
     jQuery(".accordian-outer.marketing-accordian .select1 select").val("couchbase-server").trigger("change");
     /* Previous-version accordian
     jQuery(".previous-version-accordian .accordion-inner .accordion-item:eq(0) .item-title").trigger("click");
     */
    /* Remove hover state*/
//  jQuery(".download-accordion.previous-version-accordian table tr").mouseover(function(){
//    jQuery(this).siblings().removeClass("hover-state");
//  });
});

function initColCounter() {
    jQuery('.col-wrapper').each(function () {
        var col = jQuery(this).find('.col');
        col.addClass('column-' + col.length);
    });
}

jQuery(window).on('load resize', function () {
    if (jQuery('.logo-grid .video-overlay').hasClass("active")) {
        jQuery('.logo-grid .video-overlay .iframe-container').overlaySize();
    }
    if (jQuery('.logo-grid .video-overlay').hasClass("active")) {
        jQuery(".logo-grid .grid-overlay .overlay-content").overlaySize();
    }
    var window_width = jQuery(window).width();
    if (window_width < 596) {
        intervalueSet = 2;
    } else {
        intervalueSet = 1;
    }
    if (jQuery('.grid-filter').hasClass('hide-filter')) {
        var rightValue = jQuery('.logo-grid .grid-filter').width() - 40;
        jQuery('.grid-filter .search-btn .animated-circle').css('right', '-' + rightValue + 'px');
    }
    if (window_width > 480) {
        var color = jQuery('.solution-col-grid .col-four.active-column').css('background-color');
        jQuery('.solution-col-grid .grid-overlay').removeAttr('style').css('background', color);
    }
    jQuery('.solution-col-grid .col-four').click(function (e) {
        e.stopPropagation();
        jQuery(this).parent().find('.col-four').not(this).removeClass('active-column');
        jQuery(this).addClass('active-column');
        jQuery(this).parents().find('.col-wrapper').addClass('overlay-grid');
        jQuery('.solution-col-grid .overlay-container').fadeIn();
        var color = jQuery(this).css('background-color');
        jQuery('.solution-col-grid .grid-overlay').css('background', color);
        var head = jQuery(this).find('.grid-content h4').text();
        jQuery('.solution-col-grid .grid-overlay h4').text(head);
        var para = jQuery(this).find('.grid-content p').text();
        jQuery('.solution-col-grid .grid-overlay p').text(para);
        var imglink = jQuery(this).find('.grid-content img').attr('src');
        jQuery('.solution-col-grid .grid-overlay img').attr('src', imglink);
        jQuery('.solution-col-grid .grid-overlay img').css('opacity', '1');
        if (window_width <= 480) {
            var col_index = jQuery(this).index();
            var col_height = jQuery(this).outerHeight();
            var col_margin = parseInt(jQuery(this).css("margin-bottom"));
            var overlay_height = jQuery(this).parents(".solution-col-grid").find(".grid-overlay").outerHeight();
            var top_gap = (col_index * col_height) + (col_index * col_margin);
            var total_height = top_gap + overlay_height;
            var section_height = jQuery(".solution-col-grid").height();
            if (col_index === 0) {
                jQuery('.solution-col-grid .grid-overlay').css({'top': '3%', 'bottom': 'auto'});
            } else if (total_height > section_height) {
                jQuery('.solution-col-grid .grid-overlay').css({'bottom': '3%', 'top': 'auto'});
            } else {
                jQuery('.solution-col-grid .grid-overlay').css({'top': top_gap + 'px', 'bottom': 'auto'});
            }
        } else {
            jQuery('.solution-col-grid .grid-overlay').removeAttr('style').css('background', color);
        }
    });
    jQuery(".solution-col-grid .col-four").click(function () {
        jQuery(this).parents(".col-wrapper").addClass("active-overlay");
        jQuery(this).addClass("active-column");
        var $winwidth = jQuery(window).width();
        if ($winwidth >= 1225) {
            var $leftvalue = ($winwidth - 1190) / 2;
            jQuery(this).css({"left": $leftvalue + "px"});
        } else if (window_width <= 480) {
            var col_index = jQuery(this).index();
            var col_margin = parseInt(jQuery(this).css("top"));
            var overlay_height = jQuery(this).parents(".solution-col-grid").find(".col-wrapper.primary-wrapper").outerHeight();
            var top_gap = (380 + col_margin);
            if (col_index === 0) {
                jQuery('.solution-col-grid .active-column').css({'top': '3%', 'bottom': 'auto'});
            } else if (overlay_height < top_gap) {
                jQuery('.solution-col-grid .active-column').css({'bottom': '3%', 'top': 'auto'});
            } else {
                jQuery('.solution-col-grid .active-column').css({'top': col_margin + 'px', 'bottom': 'auto'});
            }
        }
    });

    jQuery('.generic-table .info-tooltip').hover(function () {
        var position = jQuery(this).position();
        jQuery(this).parent('td').addClass('active');
        jQuery(this).find('.tooltip').css({'top': position.top + 45 + 'px'});
        jQuery(this).find('.tip-arrow').css({'left': position.left - 13 + 'px'});
    }, function () {
        jQuery(this).parent('td').removeClass('active');
        jQuery(this).find('.tooltip').css({'top': '0px'});
        jQuery(this).find('.tip-arrow').css({'left': '0px'});
    });
});
jQuery(window).resize(function () {
    var window_width = jQuery(window).width();
    windowwidth1 = jQuery(window).width();

    jQuery('.content-graphic .image-overlay .image-slider .image img').removeAttr('style');
    icounter = 2;
    jQuery('.content-graphic .image-overlay .overlay-content .image .image-wrapper').removeAttr('style');
    jQuery('.content-graphic .image-overlay .image-slider .content').css('opacity', '1');
    if (window_width > 595) {
        jQuery(".logo-grid .grid-overlay .overlay-content").removeAttr('style');
        jQuery(".logo-grid .video-overlay .video-inner").removeAttr('style');
    }
    var colwidth = ('width', 100 / length + '%');
    jQuery('.section-tabs .tabs-inner').parents('.tabs-content').find('.col-outer > div').css({'width': 'calc(' + colwidth + '- 11px)'});
    if (window_width <= 767) {
        jQuery('.code-intro .tabset > ul').addClass('mobile-list');
        jQuery('.leadership-block .img-width-title').addClass('small-width').removeClass('full-width');
        jQuery('.section-boards .board-content .tabset').addClass('small-width').removeClass('full-width');
    } else {
        jQuery('.tabset > ul').removeClass('mobile-list');
        jQuery('.tabset > ul').removeAttr('style');
        jQuery(".caret").removeClass("closeup");
        jQuery('.leadership-block .img-width-title').addClass('full-width').removeClass('small-width');
        jQuery('.leadership-details .img-width-title').removeClass('active');
        jQuery('.section-boards .board-content .tabset').addClass('full-width').removeClass('small-width');
        var maxHeight = 0,
            maxHeight1 = 0;
        // jQuery(".generic-resources .generic-inner-content .column-3 .outer-box").each(function () {
        //     var side_bar = jQuery(this).height();
        //     maxHeight = Math.max(maxHeight, side_bar);
        //     jQuery(this).parents('.col-wrapper').find('.side-line').css({'height': maxHeight + 30 + 'px', 'opacity': '1'});
        // });
        // jQuery(".generic-resources .generic-inner-content .column-2 .outer-box").each(function () {
        //     var side_bar = jQuery(this).height();
        //     maxHeight1 = Math.max(maxHeight1, side_bar);
        //     jQuery(this).parents('.col-wrapper').find('.side-line').css({'height': maxHeight1 + 30 + 'px', 'opacity': '1'});
        // });
    }
    if (window_width > 991) {
        jQuery('.solution-col-grid .col-four').addClass('col-item');
    } else {
        jQuery('.solution-col-grid .col-four').removeClass('col-item');
    }
});
jQuery(document).keydown(function (e) {
    switch (e.which) {
        case 37:
            var index = jQuery('.solution-col-grid .primary-wrapper .col-four.active-column').index(),
                length = jQuery('.solution-col-grid .primary-wrapper .col-four').length;
            if (index === 0) {
                index = length;
            }
            index = index - 1;
            jQuery('.solution-col-grid .primary-wrapper .col-four').removeClass('active-column');
            jQuery('.solution-col-grid .primary-wrapper .col-four').removeAttr("style");
            jQuery('.solution-col-grid .primary-wrapper .col-four:eq(' + index + ')').addClass('active-column');
            var $winwidth = jQuery(window).width();
            if ($winwidth >= 1225) {
                var $leftvalue = ($winwidth - 1190) / 2;
                jQuery('.solution-col-grid .primary-wrapper .col-four:eq(' + index + ')').css({"left": $leftvalue + "px"});
            }
            break;

        case 39:
            var index = jQuery('.solution-col-grid .primary-wrapper .col-four.active-column').index();
            length = jQuery('.solution-col-grid .primary-wrapper .col-four').length;
            if ((length - 1) <= index) {
                index = -1;
            }
            index = index + 1;
            jQuery('.solution-col-grid .primary-wrapper .col-four').removeClass('active-column');
            jQuery('.solution-col-grid .primary-wrapper .col-four').removeAttr("style");
            jQuery('.solution-col-grid .primary-wrapper .col-four:eq(' + index + ')').addClass('active-column');
            var $winwidth = jQuery(window).width();
            if ($winwidth >= 1225) {
                var $leftvalue = ($winwidth - 1190) / 2;
                jQuery('.solution-col-grid .primary-wrapper .col-four:eq(' + index + ')').css({"left": $leftvalue + "px"});
            }
            break;

        default:
            return;
    }
});

function initActiveScrollSelector() {
    var activeSelector = jQuery('section'),
        nav = jQuery('.leadership-tabs'),
        topnavHeight = jQuery(".second-level-banner").outerHeight(true),
        nav_height = nav.outerHeight();
    jQuery(window).on('scroll', function () {
        var scroll = jQuery(window).scrollTop();
        activeSelector.each(function () {
            var top = jQuery(this).offset().top - (nav_height),
                bottom = top + jQuery(this).outerHeight();
            if (scroll >= top && scroll <= bottom) {
                nav.find('li.active').removeClass('active');
                nav.find('a[href="#' + jQuery(this).attr('id') + '"]').parent('li').addClass('active');
            } else if (scroll < topnavHeight) {
                nav.find('li:first-child').addClass('active');
            }
        });
    });
}

function imageResponsive4() {

    /* Image responsive code*/
    if (jQuery(".section-tabs .col-outer .col-three .bg-img").length) {
        jQuery(".section-tabs .col-outer .col-three .bg-img").each(function () {
            var img = jQuery(this).children("img"),
                parentHeight = jQuery(this).height(),
                parentWidth = jQuery(this).width();
            img.css({"height": "auto", "width": "100%", "margin-left": "0px"});
            if (img.height() < parentHeight) {
                img.css({"height": "100%", "width": "auto"});
                var right_margin = (img.width() - parentWidth) / 2;
                img.css({"margin-left": "-" + right_margin + "px"});
            } else if (img.width() < parentWidth) {
                img.css({"height": "auto", "width": "100%", "margin-left": "0"});
            }
        });
    }
    var $windowWidth = jQuery(window).width();
}

function imageResponsive3() {

    /* Image responsive code*/
    if (jQuery(".section-tabs .col-outer .col-two .bg-img").length) {
        jQuery(".section-tabs .col-outer .col-two .bg-img").each(function () {
            var img = jQuery(this).children("img"),
                parentHeight = jQuery(this).height(),
                parentWidth = jQuery(this).width();
            img.css({"height": "auto", "width": "100%", "margin-left": "0px"});
            if (img.height() < parentHeight) {
                img.css({"height": "100%", "width": "auto"});
                var right_margin = (img.width() - parentWidth) / 2;
                img.css({"margin-left": "-" + right_margin + "px"});
            } else if (img.width() < parentWidth) {
                img.css({"height": "auto", "width": "100%", "margin-left": "0"});
            }
        });
    }
    var $windowWidth = jQuery(window).width();
}


jQuery(window).on("load", function () {
    var maxHeight = 0,
        maxHeight1 = 0;
    jQuery(".generic-resources .generic-inner-content .column-3 .outer-box").each(function () {
        var side_bar = jQuery(this).height();
        maxHeight = Math.max(maxHeight, side_bar);
        jQuery(this).parents('.col-wrapper').find('.side-line').css({'height': maxHeight + 30 + 'px', 'opacity': '1'});
    });
    jQuery(".generic-resources .generic-inner-content .column-2 .outer-box").each(function () {
        var side_bar = jQuery(this).height();
        maxHeight1 = Math.max(maxHeight1, side_bar);
        jQuery(this).parents('.col-wrapper').find('.side-line').css({'height': maxHeight1 + 30 + 'px', 'opacity': '1'});
    });
    jQuery('.generic-section .col').css('opacity', '1');
    jQuery(".generic-inner-content .slide-btn").click(function () {
        var maxHeight = 0;
        jQuery(this).toggleClass("close-btn");
        if (jQuery(this).hasClass('close-btn')) {
            jQuery(this).find("p").text('Close');
            jQuery(this).parents('.generic-inner-content').find('.animate-content').stop(true, true).slideDown(function () {
                jQuery(this).parents('.generic-inner-content').find('.animate-content').find("p").addClass('active');
                jQuery(this).parents('.generic-inner-content').find(".outer-box").each(function () {
                    var side_bar = jQuery(this).height();
                    maxHeight = Math.max(maxHeight, side_bar);
                    jQuery(this).parents('.col-wrapper').find('.side-line').css({
                        'height': maxHeight + 30 + 'px',
                        'opacity': '1'
                    });
                });
            });
        } else {
            jQuery(this).find("p").text("More Resources");
            jQuery(this).parents('.generic-inner-content').find('.side-line').css({
                'height': 'calc(100% - 20px)',
                'opacity': '1'
            });
            jQuery(this).parents('.generic-inner-content').find('.animate-content').find("p").removeClass('active');
            jQuery(this).parents('.generic-inner-content').find('.animate-content').stop(true, true).delay(100).slideUp(function () {
                jQuery(this).parents('.generic-inner-content').find(".outer-box").each(function () {
                    var side_bar = jQuery(this).height();
                    maxHeight = Math.max(maxHeight, side_bar);
                    jQuery(this).parents('.col-wrapper').find('.side-line').css({
                        'height': maxHeight + 30 + 'px',
                        'opacity': '1'
                    });
                });
            });
        }
        jQuery(".generic-resources-block .side-line").css("opacity", "1");
    });

});

// jQuery(window).on("load", function () {
//
//     jQuery(window).on("resize", function () {
//         if (jQuery('.list-intro  .container').length > 0) {
//             var containerOffset = jQuery('header .container').offset().left;
// //            jQuery('.list-intro  .container').css('padding-left', (containerOffset + 20) + 'px');
//         }
//     }).resize();
// });

function clc_height() {
    var $win_width = jQuery(window).width();
    var $height = jQuery(".generic-quote.quote-with-bg .quote-text .col-outer").outerHeight();
    var $height = jQuery(".generic-quote.quote-with-bg .quote-text.font-32 .col-outer").outerHeight();
    jQuery(".generic-quote.quote-with-bg .bg-img").css('height', $height + 'px');
}

// jQuery(window).on("load resize", function () {
//     clc_height();
// });

document.addEventListener("touchstart", function () {
}, false);


// jQuery(document).ready(function(){
//     jQuery('.inner-content h6').on('click', function(e){
//         e.preventDefault();
//         jQuery(this).siblings('p').slideDown();
//         jQuery('.inner-content p').stop(true, true).slideUp();
//     });
// });


jQuery(document).ready(function () {
    jQuery(document).on('click', function () {
        jQuery('.new-info-block .inner-content .hide-content').slideUp();
        jQuery(".inner-content").removeClass('rotate_arrow');
    });
    jQuery('.new-info-block .col .inner-content h6').on('click', function (e) {
        e.stopPropagation();
        var maxHeight = 0;
        //For Rotating Arrow
        jQuery(this).parent().toggleClass('rotate_arrow');
        jQuery(this).parents(".col").find(".inner-content").not(jQuery(this).parent(".inner-content")).removeClass('rotate_arrow');

        //Accordion jquery fuction
        var display = jQuery(this).siblings(".hide-content").css("display");

        if (display === "block") {
            jQuery(this).siblings(".hide-content").slideUp();
        } else {
            jQuery(this).parents(".col").find(".inner-content .hide-content").not(jQuery(this).siblings("p")).slideUp();
            jQuery(this).siblings(".hide-content").slideDown();
        }
    });
    jQuery(window).on("load resize", function () {
        var imgBox = $(".generic-table-image .col-outer .img-box").height();
        jQuery(".generic-table-image .col-outer .title-box").css('height', imgBox + 'px');
        if ($(window).width() <= 767) {
            jQuery('.generic-table-image .col-outer .title-box').css('height', 'auto');
        }
    });
});

jQuery(window).on('load resize', function () {
    var windowWidth = jQuery(window).width();
    if (windowWidth < 596) {
        jQuery('.generic-fixed-table tbody td').css('height', '');
        jQuery('.generic-fixed-table thead th').css('height', '');
        jQuery('.generic-fixed-table table').each(function () {
            var maxHeight1 = 0;
            var maxHeight = jQuery(this).find('thead th:nth-child(2)').height();
            jQuery(this).find('tbody tr').each(function () {
                var side_bar = jQuery(this).find('td:nth-child(2)').height();
                maxHeight1 = Math.max(maxHeight1, side_bar);
            });
            if (maxHeight1 > maxHeight) {
                jQuery(this).find('tbody td:nth-child(2)').css('height', (maxHeight1 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(2)').css('height', (maxHeight1 + 40) + 'px');
            } else {
                jQuery(this).find('tbody td:nth-child(2)').css('height', (maxHeight + 40) + 'px');
                jQuery(this).find('thead th:nth-child(2)').css('height', (maxHeight + 40) + 'px');
            }

            var maxHeight2 = 0;
            var maxHeight3 = jQuery(this).find('thead th:nth-child(1)').height();
            jQuery(this).find('tbody td:nth-child(1)').css('height', '');
            jQuery(this).find('thead th:nth-child(1)').css('height', '');
            jQuery(this).find('tbody tr').each(function () {
                var side_bar = jQuery(this).find('td:nth-child(1)').height();
                maxHeight2 = Math.max(maxHeight2, side_bar);
            });
            if (maxHeight2 > maxHeight3) {
                jQuery(this).find('tbody td:nth-child(1)').css('height', (maxHeight2 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(1)').css('height', (maxHeight2 + 40) + 'px');
            } else {
                jQuery(this).find('tbody td:nth-child(1)').css('height', (maxHeight3 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(1)').css('height', (maxHeight3 + 40) + 'px');
            }

            var maxHeight3 = 0;
            var maxHeight4 = jQuery(this).find('thead th:nth-child(3)').height();
            jQuery(this).find('tbody td:nth-child(3)').css('height', '');
            jQuery(this).find('thead th:nth-child(3)').css('height', '');
            jQuery(this).find('tbody tr').each(function () {
                var side_bar = jQuery(this).find('td:nth-child(3)').height();
                maxHeight3 = Math.max(maxHeight3, side_bar);
            });
            if (maxHeight3 > maxHeight4) {
                jQuery(this).find('tbody td:nth-child(3)').css('height', (maxHeight3 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(3)').css('height', (maxHeight3 + 40) + 'px');
            } else {
                jQuery(this).find('tbody td:nth-child(3)').css('height', (maxHeight4 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(3)').css('height', (maxHeight4 + 40) + 'px');
            }

            var maxHeight5 = 0;
            var maxHeight6 = jQuery(this).find('thead th:nth-child(4)').height();
            jQuery(this).find('tbody td:nth-child(4)').css('height', '');
            jQuery(this).find('thead th:nth-child(4)').css('height', '');
            jQuery(this).find('tbody tr').each(function () {
                var side_bar = jQuery(this).find('td:nth-child(4)').height();
                maxHeight5 = Math.max(maxHeight5, side_bar);
            });

            if (maxHeight5 > maxHeight6) {
                jQuery(this).find('tbody td:nth-child(4)').css('height', (maxHeight5 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(4)').css('height', (maxHeight5 + 40) + 'px');
            } else {
                jQuery(this).find('tbody td:nth-child(4)').css('height', (maxHeight6 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(4)').css('height', (maxHeight6 + 40) + 'px');
            }

            var maxHeight7 = 0;
            var maxHeight8 = jQuery(this).find('thead th:nth-child(5)').height();
            jQuery(this).find('tbody td:nth-child(5)').css('height', '');
            jQuery(this).find('thead th:nth-child(5)').css('height', '');
            jQuery(this).find('tbody tr').each(function () {
                var side_bar = jQuery(this).find('td:nth-child(5)').height();
                maxHeight7 = Math.max(maxHeight7, side_bar);
            });

            if (maxHeight7 > maxHeight8) {
                jQuery(this).find('tbody td:nth-child(5)').css('height', (maxHeight7 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(5)').css('height', (maxHeight7 + 40) + 'px');
            } else {
                jQuery(this).find('tbody td:nth-child(5)').css('height', (maxHeight8 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(5)').css('height', (maxHeight8 + 40) + 'px');
            }

            var maxHeight9 = 0;
            var maxHeight10 = jQuery(this).find('thead th:nth-child(6)').height();
            jQuery(this).find('tbody td:nth-child(6)').css('height', '');
            jQuery(this).find('thead th:nth-child(6)').css('height', '');
            jQuery(this).find('tbody tr').each(function () {
                var side_bar = jQuery(this).find('td:nth-child(6)').height();
                maxHeight9 = Math.max(maxHeight9, side_bar);
            });

            if (maxHeight9 > maxHeight10) {
                jQuery(this).find('tbody td:nth-child(6)').css('height', (maxHeight9 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(6)').css('height', (maxHeight9 + 40) + 'px');
            } else {
                jQuery(this).find('tbody td:nth-child(6)').css('height', (maxHeight10 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(6)').css('height', (maxHeight10 + 40) + 'px');
            }

            var maxHeight11 = 0;
            var maxHeight12 = jQuery(this).find('thead th:nth-child(7)').height();
            jQuery(this).find('tbody td:nth-child(7)').css('height', '');
            jQuery(this).find('thead th:nth-child(7)').css('height', '');
            jQuery(this).find('tbody tr').each(function () {
                var side_bar = jQuery(this).find('td:nth-child(7)').height();
                maxHeight11 = Math.max(maxHeight11, side_bar);
            });

            if (maxHeight11 > maxHeight12) {
                jQuery(this).find('tbody td:nth-child(7)').css('height', (maxHeight11 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(7)').css('height', (maxHeight11 + 40) + 'px');
            } else {
                jQuery(this).find('tbody td:nth-child(7)').css('height', (maxHeight12 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(7)').css('height', (maxHeight12 + 40) + 'px');
            }

            var maxHeight13 = 0;
            var maxHeight14 = jQuery(this).find('thead th:nth-child(8)').height();
            jQuery(this).find('tbody td:nth-child(8)').css('height', '');
            jQuery(this).find('thead th:nth-child(8)').css('height', '');
            jQuery(this).find('tbody tr').each(function () {
                var side_bar = jQuery(this).find('td:nth-child(8)').height();
                maxHeight13 = Math.max(maxHeight13, side_bar);
            });

            if (maxHeight11 > maxHeight12) {
                jQuery(this).find('tbody td:nth-child(8)').css('height', (maxHeight13 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(8)').css('height', (maxHeight13 + 40) + 'px');
            } else {
                jQuery(this).find('tbody td:nth-child(8)').css('height', (maxHeight14 + 40) + 'px');
                jQuery(this).find('thead th:nth-child(8)').css('height', (maxHeight14 + 40) + 'px');
            }
        });
    } else {
        jQuery('.generic-fixed-table tbody td').css('height', '');
        jQuery('.generic-fixed-table thead th').css('height', '');
    }
});

$.fn.sameHeight1 = function () {
    var maxHeight = 0;
    return this.each(function (index, elem) {
//     $(elem).css('height','350px');
        var boxHeight = $(elem).height();
        maxHeight = Math.max(maxHeight, boxHeight);
    }).height(maxHeight);
};

function whenNoTrackingProtection() {
    if (!whenNoTrackingProtection.promise) {
        var dfd = new jQuery.Deferred();
        whenNoTrackingProtection.promise = dfd.promise();
        var time = Date.now();
        jQuery('<img/>')
            .attr('src', '//apps.facebook.com/favicon.ico')
            .on('load', dfd.resolve)
            .on('error', function () {
                if ((Date.now() - time) < 50) {
                    dfd.reject();
                } else {
                    jQuery('body').addClass('protection-ff');
                    // the request took to long, it seams this is a real network error
                    dfd.resolve();
                }
            });
    }

    return whenNoTrackingProtection.promise;
}
