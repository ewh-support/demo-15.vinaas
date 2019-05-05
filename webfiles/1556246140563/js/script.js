jQuery.fn.isOnScreen = function () {
    /* Find vieport for a particular section*/
    var win = $(window);

    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};
fired = 0;
newscrollvalue = 0;
jQuery(function () {
    if (jQuery("select").length > 0) {
        var selectBox = $("select").selectBoxIt();
    }
});
jQuery.fn.sameHeight = function () {
    /* Same Height Function*/
    var maxHeight = 0;
    return this.each(function (index, elem) {
        jQuery(elem).height('auto');
        var boxHeight = jQuery(elem).height();
        maxHeight = Math.max(maxHeight, boxHeight);
    }).height(maxHeight);
};
jQuery(window).on({
    'orientationchange resize scroll': function (e) {
        detect_touchDevice();
    }
});

function detect_touchDevice() {

    var is_touch_device = 'ontouchstart' in document.documentElement;
    if (is_touch_device) {
        jQuery('body').addClass('touch');
    } else {
        jQuery('body').removeClass('touch');
    }
    /* Add class on touch device*/
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        jQuery('body').addClass('touch');
    } else {
        jQuery('body').removeClass('touch');
    }
}

jQuery(document).ready(function () {
    var $windowWidth = jQuery(window).width();
    // Toggle parallax overlay
    detect_touchDevice();
    if ($windowWidth > 1024) {
        jQuery('.content-graphic').addClass('fullwidth').removeClass('smallwidth');
    }
    else {
        jQuery('.content-graphic').addClass('smallwidth').removeClass('fullwidth');
    }
    jQuery('.disable').click(function (e) {
        e.preventDefault();
    });
    jQuery('.operating-system').click(function () {
        jQuery(this).addClass("change-val");
        jQuery('.marketing-accordian .select2').removeClass('change-value');
    });
    jQuery('.marketing-accordian .select2').click(function () {
        jQuery(this).addClass("change-value");
        jQuery('.operating-system').removeClass("change-val");
    });
    jQuery(document).on('change', '.change-val select', function () {
        jQuery('.banner-marketing .download-button .red-btn').removeClass('disable');
        jQuery('.banner-marketing .download-links').removeClass('hide');
        jQuery('.banner-marketing .file-name').removeClass('hide');
        var value1 = jQuery(this).val();
        jQuery('.marketing-accordian .select2 select').val(value1).trigger("change");
    });

    jQuery(document).on('change', '.change-value select', function () {
        jQuery('.banner-marketing .download-button .red-btn').removeClass('disable');
        jQuery('.banner-marketing .download-links').removeClass('hide');
        jQuery('.banner-marketing .file-name').removeClass('hide');
        var value2 = jQuery(this).val();
        jQuery('.operating-system select').val(value2).trigger("change");
    });

    jQuery('.content-graphic .info-tooltip').hover(function () {
        if (jQuery('.content-graphic').hasClass('fullwidth')) {
            if (jQuery('.content-graphic .info-tooltip').length > 0) {
                var tip_offset = jQuery(this).offset().left;
                var containerWidth = jQuery(window).width() / 2;
                if ($windowWidth > 767) {
                    jQuery('.para-info .tip-arrow').css('left', tip_offset - containerWidth - 35);
                } else if ($windowWidth <= 767 && $windowWidth > 595) {
                    jQuery('.para-info .tip-arrow').css('left', tip_offset - 30);
                } else {
                    jQuery('.para-info .tip-arrow').css('left', tip_offset - 20);
                }
            }
            var paraLength = jQuery(this).parents(".inner-box").children("p").length;
            var parentIndex = (jQuery(this).parent().index()) + 1;
            if (paraLength > parentIndex) {
                jQuery(this).parents('.inner-box').addClass('active');
            } else {
                jQuery(this).parents('.inner-box').addClass('active tool-top');
            }
            jQuery(this).parents('.inner-box').addClass('active');
        }
    }, function () {
        if (jQuery('.content-graphic').hasClass('fullwidth')) {
            jQuery(this).parents('.inner-box').removeClass('active tool-top');
        }
    });

    jQuery('.content-graphic .para-info').hover(function () {
        if (jQuery('.content-graphic').hasClass('fullwidth')) {
            jQuery(this).parents('.inner-box').addClass('active');
        }
    }, function () {
        if (jQuery('.content-graphic').hasClass('fullwidth')) {
            jQuery(this).parents('.inner-box').removeClass('active');
        }
    });

    jQuery('.content-graphic .para-info,.content-graphic .info-tooltip').click(function () {
        if (jQuery('.content-graphic').hasClass('smallwidth')) {
            if (jQuery('.content-graphic .info-tooltip').length > 0) {
                var tip_offset = jQuery(this).offset().left;
                var containerWidth = jQuery(window).width() / 2;
                if ($windowWidth > 767) {
                    jQuery('.para-info .tip-arrow').css('left', tip_offset - containerWidth - 35);
                } else if ($windowWidth <= 767 && $windowWidth > 595) {
                    jQuery('.para-info .tip-arrow').css('left', tip_offset - 30);
                } else {
                    jQuery('.para-info .tip-arrow').css('left', tip_offset - 20);
                }
            }
            if (jQuery(this).parents('.inner-box').hasClass('active')) {
                jQuery(this).parents('.inner-box').removeClass('active');
            }
            else {
                jQuery(this).parents('.inner-box').addClass('active');
            }
        }
    });

    jQuery('.content-graphic .transparent-btn').click(function () {
        if (jQuery(this).hasClass('overlay-deactive')) {
            if (jQuery('.content-graphic1').hasClass('clicked')) {
                jQuery('.content-graphic .get-started-content').css({
                    'visibility': 'hidden',
                    'opacity': '0',
                    'display': 'none'
                });
                jQuery('.content-graphic .slider-content').addClass('active');
            }
        }
    });
    jQuery('.touch .promo-intro .col-three').click(function () {
        jQuery('.touch .promo-intro .col-three').not(jQuery(this)).removeClass("open-hover-state");
        jQuery(this).toggleClass("open-hover-state");

    });
    jQuery('.touch .grid-container .grid-block').click(function () {
        jQuery('.touch .grid-container .grid-block').removeClass('tappable');
        jQuery(this).addClass('tappable');
    });
    var $windowWidth = jQuery(window).width();
    searchPlaceholder();
    /* Call search animate function */
    searchAnimate();

    jQuery('.solution-block .box-caption').on('click', function () {
    });

    /* hover effect on hover */
    jQuery(".col-two-grid .col-two, .col-icon-grid .col-four").hover(function () {

    });

    msieversion();
    /* PARTNAR TABS */
    customer_tab();
    mouseEffect();
    imageResponsive();
    imageResponsive1();
    //  $intialLoopslider();

    jQuery('.customer-tabs .tabs-slider .tabs-container').clone().appendTo(".customer-tabs .tabs-slider .customer-slider").addClass('slick-slider');
    jQuery('.customer-tabs .tabs-slider .tabs-container .img-wrap').addClass('slide-item');
    if ($windowWidth > 595) {
        jQuery('.customer-tabs .tabs-slider .img_wrap').css('width', '100%');
        jQuery('.customer-tabs').removeClass('tabs-responsive');
    } else {
        var $wrapperWidth = jQuery('.customer-tabs').width(),
            $dataItems = 1;
        jQuery('.customer-tabs .tabs-slider .img_wrap').css('width', $wrapperWidth / $dataItems + 'px');
        jQuery('.customer-tabs').addClass('tabs-responsive');
    }
    jQuery('.customer-tabs .slick-slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: false,
        cssEase: 'linear'
    });
    jQuery('.featured-carousel .slick-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: false,
        cssEase: 'linear',
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 595,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    var slideLength = jQuery('.solution-customer-slider .slick-slider .slide-item').length;
    if (slideLength === 1) {
        jQuery(".solution-customer-slider .arrow-icon").hide();
    }
    jQuery('.solution-customer-slider .slick-slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: false,
        cssEase: 'linear'
    });
    jQuery('.content-graphic .slick-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: false,
        fade: true,
        swipe: false,
        draggable: false,
        prevArrow: jQuery('.content-graphic .slider-button .prev'),
        nextArrow: jQuery('.content-graphic .slider-button .next')
    });
    jQuery('.partner-slider .partner-content').slick({
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        customPaging: function (slider, i) {
            var thumb = $(slider.$slides[i]).data('thumb');
            return '<a class="we-pagination"></a>';
        },
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 595,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
    var ctaWidth = jQuery('.product-cta-block .button').width();
    jQuery('.product-cta-block .content').css('width', 'calc(100% - ' + ctaWidth + 'px)');
    if ($windowWidth > 991) {
        if (jQuery('.partner-slider .partner-outer .col-four').length <= 4) {
            jQuery('.partner-slider .partner-outer .slider-button').css('display', 'none');
        }

        else {
            jQuery('.partner-slider .partner-outer .slider-button').css('display', 'block');
        }
    }
    else if ($windowWidth <= 991 && $windowWidth > 595) {
        if (jQuery('.partner-slider .partner-outer .col-four').length <= 3) {
            jQuery('.partner-slider .partner-outer .slider-button').css('display', 'none');
        }
        else {
            jQuery('.partner-slider .partner-outer .slider-button').css('display', 'block');
        }
    }
    else if ($windowWidth <= 595 && $windowWidth > 480) {
        if (jQuery('.partner-slider .partner-outer .col-four').length <= 2) {
            jQuery('.partner-slider .partner-outer .slider-button').css('display', 'none');
        }
        else {
            jQuery('.partner-slider .partner-outer .slider-button').css('display', 'block');
        }
    }
    else {
        jQuery('.partner-slider .partner-outer .slider-button').css('display', 'block');
    }
    if ($windowWidth > 767) {
        if (jQuery('.featured-carousel .col-three').length <= 3) {
            jQuery('.featured-carousel .slider-button').css('display', 'none');
        }
        else {
            jQuery('.featured-carousel .slider-button').css('display', 'block');
        }
    }
    else if ($windowWidth <= 767 && $windowWidth > 595) {
        if (jQuery('.featured-carousel .col-three').length <= 2) {
            jQuery('.featured-carousel .slider-button').css('display', 'none');
        }
        else {
            jQuery('.featured-carousel .slider-button').css('display', 'block');
        }
    }
    else {
        if (jQuery('.featured-carousel .col-three').length <= 1) {
            jQuery('.featured-carousel .slider-button').css('display', 'none');
        }
        else {
            jQuery('.featured-carousel .slider-button').css('display', 'block');
        }
    }
    jQuery('.partner-slider .partner-outer .slider-button .next').click(function () {
        jQuery('.partner-slider .partner-content .slick-next').trigger('click');
    });
    jQuery('.partner-slider .partner-outer .slider-button .prev').click(function () {
        jQuery('.partner-slider .partner-content .slick-prev').trigger('click');
    });
    jQuery('.featured-carousel .slider-button .next').click(function () {
        jQuery('.featured-carousel .slick-slider  .slick-next').trigger('click');
    });
    jQuery('.featured-carousel .slider-button .prev').click(function () {
        jQuery('.featured-carousel .slick-slider .slick-prev').trigger('click');
    });

    jQuery('.customer-tabs .tabs-slider-nav .next').click(function () {
        jQuery('.customer-tabs .slick-slider .slick-next ').trigger('click');
    });
    jQuery('.customer-tabs .tabs-slider-nav .prev').click(function () {
        jQuery('.customer-tabs .slick-slider .slick-prev ').trigger('click');
    });
    jQuery('.solution-customer-slider .next').click(function () {
        jQuery('.solution-customer-slider .slick-slider .slick-next ').trigger('click');
    });
    jQuery('.solution-customer-slider .prev').click(function () {
        jQuery('.solution-customer-slider .slick-slider .slick-prev ').trigger('click');
    });
    //  jQuery('.content-graphic .slider-button .next').click(function () {
    //    jQuery('.content-graphic .slick-slider .slick-next').trigger('click');
    //  });
    //  jQuery('.content-graphic .slider-button .prev').click(function () {
    //    jQuery('.content-graphic .slick-slider .slick-prev').trigger('click');
    //  });

    /* quality-block animation */
    var $winWidth = jQuery(window).width();

    if (jQuery(".quality-block").length > 0) {
        jQuery('.quality-block .col-5 .v-middle-inner').click(function (e) {
            e.preventDefault();
            $winWidth = jQuery(window).width();
            var dataItem = jQuery(this).parents('.quality-block').attr('data-attr');
            if (!jQuery(this).parents('.col-5').hasClass('box-active') && dataItem === '1') {
                jQuery(this).parents('.quality-block').attr('data-attr','0');
                var $index = jQuery(this).parents('.col-5').index();
                var $this = jQuery(this);
                var $secOffset = jQuery(this).parents('.col-5').offset().left;
                if ($winWidth > 991) {
                    $this.parents('.col-5 ').addClass('box-active');
                    var $margin = ($winWidth - 739) / 2;
                    var $marginLeft = ($margin - $secOffset) - 20;
                    $this.parents('.quality-block').find('.col-5 .v-middle-inner').not(this).parents('.col-5').css({
                        'transform': 'scale(.5,.5)',
                        'opacity': '0',
                        'visibility': 'hidden',
                        'transition': 'all .5s ease-in-out'
                    });
                    setTimeout(function () {
                        if ($index == '1') {
                            $this.parents('.quality-block').find('.col-5:eq(0)').css({
                                'margin-left': $marginLeft + 'px',
                                'transform': 'scale(1,1.12) translatey(-9px) ',
                                'transition': 'all .5s ease-in-out'
                            });
                        } else if ($index == '2') {
                            $this.parents('.quality-block').find('.col-5:eq(1)').css({
                                'margin-left': $marginLeft + 'px',
                                'transform': 'scale(1,1.12) translatey(-9px)',
                                'transition': 'all .5s ease-in-out'
                            });
                        } else if ($index == '3') {
                            $this.parents('.quality-block').find('.col-5:eq(2)').css({
                                'margin-left': $marginLeft + 'px',
                                'transform': 'scale(1,1.12) translatey(-9px)',
                                'transition': 'all .5s ease-in-out'
                            });
                        } else if ($index == '4') {
                            $this.parents('.quality-block').find('.col-5:eq(3)').css({
                                'margin-left': $marginLeft + 'px',
                                'transform': 'scale(1,1.12) translatey(-9px)',
                                'transition': 'all .5s ease-in-out'
                            });
                        } else if ($index == '5') {
                            $this.parents('.quality-block').find('.col-5:eq(4)').css({
                                'margin-left': $marginLeft + 'px',
                                'transform': 'scale(1,1.12) translatey(-9px)',
                                'transition': 'all .5s ease-in-out'
                            });
                        }
                    }, 500);
                    $this.parents('.col-5').find('.v-middle-inner, .arrow-icon').css({
                        'opacity': '0',
                        'transition': 'all .3s ease-in-out'
                    });
                    setTimeout(function () {
                        $this.parents('.col-5').animate({'width': '739px'});
                    }, 520);
                    jQuery(this).parents('.col-5').find('.animate-view').addClass('animate-show');
                } else if (($winWidth > 767) && ($winWidth < 992)) {
                    $this.parents('.col-5 ').addClass('box-active');
                    var $margin = ($winWidth - 678) / 2;
                    var $marginLeft = ($margin - $secOffset);
                    $this.parents('.quality-block').find('.col-5 .v-middle-inner').not(this).parents('.col-5').css({
                        'transform': 'scale(.5,.5)',
                        'opacity': '0',
                        'visibility': 'hidden',
                        'transition': 'all .5s ease-in-out'
                    });
                    setTimeout(function () {
                        if ($index == '1') {
                            $this.parents('.quality-block').find('.col-5:eq(0)').css({
                                'margin-left': $marginLeft + 'px',
                                'transform': 'scale(1,1.12) translatey(-9px) ',
                                'transition': 'all .5s ease-in-out'
                            });
                        } else if ($index == '2') {
                            $this.parents('.quality-block').find('.col-5:eq(1)').css({
                                'margin-left': $marginLeft + 'px',
                                'transform': 'scale(1,1.12) translatey(-9px)',
                                'transition': 'all .5s ease-in-out'
                            });
                        } else if ($index == '3') {
                            $this.parents('.quality-block').find('.col-5:eq(2)').css({
                                'margin-left': $marginLeft + 'px',
                                'transform': 'scale(1,1.12) translatey(-9px)',
                                'transition': 'all .5s ease-in-out'
                            });
                        } else if ($index == '4') {
                            $this.parents('.quality-block').find('.col-5:eq(3)').css({
                                'margin-left': $marginLeft + 'px',
                                'transform': 'scale(1,1.12) translatey(-9px)',
                                'transition': 'all .5s ease-in-out'
                            });
                        } else if ($index == '5') {
                            $this.parents('.quality-block').find('.col-5:eq(4)').css({
                                'margin-left': $marginLeft + 'px',
                                'transform': 'scale(1,1.12) translatey(-9px)',
                                'transition': 'all .5s ease-in-out'
                            });
                        }
                    }, 500);
                    $this.parents('.col-5').find('.v-middle-inner, .arrow-icon').css({
                        'opacity': '0',
                        'visibility': 'hidden',
                        'transition': 'all .3s ease-in-out'
                    });
                    setTimeout(function () {
                        $this.parents('.col-5').animate({'width': '678px'});
                    }, 520);
                    $this.parents('.col-5').find('.animate-view').addClass('animate-show');
                } else if (($winWidth < 768) && ($winWidth > 480)) {
                    $this.parents('.quality-block').find('.box-active.col-5').css({
                        'width': '',
                        'transition': 'all .5s ease-in-out',
                        'transform': 'scale(1,1) translateY(0px)'
                    });
                    $this.parents('.quality-block').find('.box-active.col-5').css({'margin-left': '5px auto', 'transition': 'all .3s ease-in-out'});
                    $this.parents('.quality-block').find('.box-active.col-5 .animate-view').removeClass('animate-show');
                    $this.parents('.quality-block').find('.box-active.col-5 .v-middle-inner').parents('.col-5').css({
                        'transform': '',
                        'opacity': '1',
                        'visibility': 'visible',
                        'transition': 'all .3s ease-in-out'
                    });
                    $this.parents('.quality-block').find('.box-active.col-5 .v-middle-inner,.box-active.col-5 .arrow-icon').css({'opacity': '1'});
                    $this.parents('.quality-block').find('.col-5').removeClass('box-active');
                    $this.parents('.col-5 ').addClass('box-active');
                    $this.parents('.col-5').find('.v-middle-inner, .arrow-icon').css({
                        'opacity': '0',
                        'visibility': 'hidden',
                        'transition': 'all .3s ease-in-out'
                    });
                    setTimeout(function () {
                        $this.parents('.col-5').css({
                            'width': '739px',
                            'transform': 'scale(1.1,1.1) translatey(-9px) ',
                            'transition': 'all .3s ease-in-out'
                        });
                    }, 520);
                    $this.parents('.col-5').find('.animate-view').addClass('animate-show');
                } else if ($winWidth < 481) {
                    $this.parents('.quality-block').find('.box-active.col-5').css({
                        'width': '',
                        'transition': 'all .5s ease-in-out',
                        'transform': 'scale(1,1) translateY(0px)'
                    });
                    $this.parents('.quality-block').find('.box-active.col-5').css({'margin-left': '5%', 'transition': 'all .3s ease-in-out'});
                    $this.parents('.quality-block').find('.box-active.col-5 .animate-view').removeClass('animate-show');
                    $this.parents('.quality-block .box-active.col-5 .v-middle-inner').parents('.col-5').css({
                        'transform': '',
                        'opacity': '1',
                        'visibility': 'visible',
                        'transition': 'all .3s ease-in-out'
                    });
                    $this.parents('.quality-block').find('.box-active.col-5 .v-middle-inner,.box-active.col-5 .arrow-icon').css({'opacity': '1'});
                    $this.parents('.quality-block').find('.col-5').removeClass('box-active');
                    $this.parents('.col-5 ').addClass('box-active');
                    $this.parents('.col-5').find('.v-middle-inner, .arrow-icon').css({
                        'opacity': '0',
                        'visibility': 'hidden',
                        'transition': 'all .3s ease-in-out'
                    });
                    setTimeout(function () {
                        $this.parents('.col-5').css({
                            'transform': 'scale(1.1,1.1) translatey(-9px) ',
                            'transition': 'all .5s ease-in-out'
                        });
                        $this.parents('.col-5').animate({'width': '739px'});
                    }, 520);
                    jQuery(this).parents('.col-5').find('.animate-view').addClass('animate-show');
                }
            }
        });
    }

    jQuery('.infrastructure .para-14 .no-link').click(function (e) {
        e.preventDefault();
    });
    jQuery(document).on('click', '.quality-block .close-icon', function (e) {
        var $this = jQuery(this);
        jQuery(this).parents('.quality-block').find('.animate-view').removeClass('animate-show');
        jQuery(this).parents('.quality-block').find('.col-5').removeClass('box-active');
        setTimeout(function(){
            $this.parents('.quality-block').attr('data-attr','1');
        },1200)
        if ($winWidth > 767) {
            jQuery(this).parents('.quality-block').find('.col-5').css({'width': '', 'transition': 'all .5s ease-in-out'});
            setTimeout(function () {
                $this.parents('.quality-block').find('.col-5').css({'margin-left': '0px', 'transition': 'all .3s ease-in-out'});
            }, 500);
            setTimeout(function () {
                $this.parents('.quality-block').find('.col-5 .v-middle-inner').parents('.col-5').css({
                    'transform': '',
                    'opacity': '1',
                    'visibility': 'visible',
                    'transition': 'all .3s ease-in-out'
                });
                $this.parents('.quality-block').find('.col-5 .v-middle-inner,.col-5 .arrow-icon').css({'opacity': '1','visibility': 'visible'});
            }, 1000);
        } else if (($winWidth < 768) && ($winWidth > 480)) {
            $this.parents('.quality-block').find('.col-5').css({'width': '', 'transition': 'all .5s ease-in-out'});
            setTimeout(function () {
                $this.parents('.quality-block').find('.col-5').css({'margin': '5px auto', 'transition': 'all .3s ease-in-out'});
            }, 500);
            setTimeout(function () {
                $this.parents('.quality-block').find('.col-5 .v-middle-inner').parents('.col-5').css({
                    'transform': '',
                    'opacity': '1',
                    'visibility': 'visible',
                    'transition': 'all .3s ease-in-out'
                });
                $this.parents('.quality-block').find('.col-5 .v-middle-inner, .arrow-icon').css({'opacity': '1','visibility': 'visible'});
            }, 1000);
        } else if ($winWidth < 481) {

            $this.parents('.quality-block').find('.col-5').css({'width': '', 'transition': 'all .5s ease-in-out'});
            setTimeout(function () {
                $this.parents('.quality-block').find('.col-5').css({'margin-left': '5%', 'transition': 'all .3s ease-in-out'});
            }, 500);
            setTimeout(function () {
                $this.parents('.quality-block').find('.col-5 .v-middle-inner').parents('.col-5').css({
                    'transform': '',
                    'opacity': '1',
                    'visibility': 'visible',
                    'transition': 'all .3s ease-in-out'
                });
                $this.parents('.quality-block').find('.col-5 .v-middle-inner, .arrow-icon').css({'opacity': '1','visibility': 'visible'});
            }, 1000);
        }
    });



    /* Page download accordian */
    jQuery(".page-download-accordian .accordian-title").on("click", function () {
        jQuery(this).toggleClass("active");
        jQuery(this).parent().toggleClass("active-accordian");
        jQuery(this).parent().find(".accordian-block").stop(true).slideToggle();
    });

    /* ADDITIONAL LINKS */
    jQuery(".additional-link .col-four > ul > li").each(function () {
        var innerchild = jQuery(this).find("ul li").length;
        if (innerchild > 0) {
            jQuery(this).addClass('inner-plus');
        } else {
            jQuery(this).addClass('no-inner');
        }
    });
    jQuery(".additional-link .col-four .inner-plus > a").click(function (e) {
        e.preventDefault();
        jQuery(".additional-link .col-four li a").not(this).removeClass('arrow');
        jQuery(this).toggleClass('arrow');
        jQuery(".additional-link .col-four .inner-links").stop().slideUp();
        jQuery(this).parent().find(".inner-links").stop().slideToggle();
    });
});

/* Window Load: Start */
jQuery(window).on("load", function () {
    jQuery(".we-logo-slider .slides.on-load").removeClass('on-load');
    var $windowWidth = jQuery(window).width();
    imageResponsive();
    imageResponsive1();
    imageLeftAlign();
    var ctaWidth = jQuery('.product-cta-block .button').width();
    jQuery('.product-cta-block .content').css('width', 'calc(100% - ' + ctaWidth + 'px)');
});
/* Window load resize: Start */
jQuery(window).on('load resize', function () {
    var $windowWidth = jQuery(window).width();
    imageResponsive();
    imageResponsive1();
    imageLeftAlign();
    jQuery(".col-icon-grid .col-four .inner-box").sameHeight();
    jQuery(".solution-col-grid .col-four .content-box").sameHeight();
    jQuery(".section-tabs .aditional-links ul a").sameHeight();
    jQuery(".promo-intro .col-three").sameHeight();
    jQuery(".section-investors .investors-icon").sameHeight();
    //    jQuery(".new-info-block .generic-detail-block .col-wrapper .col").sameHeight();
    jQuery(".new-info-block .generic-detail-block .col-wrapper .col .box-inner").sameHeight();
    setTimeout(function () {
        jQuery(".generic-section.three-block .generic-detail-block .col-wrapper ").each(function () {
            jQuery(this).find('.col').sameHeight();
        });
        jQuery(".generic-col-two .generic-detail-block .col-wrapper ").each(function () {
            jQuery(this).find('.col').sameHeight();
        });
        jQuery(".generic-section.info-block .generic-detail-block .col-wrapper").each(function () {
            jQuery(this).find('.col').sameHeight();
        });
        jQuery(".generic-col-two .generic-detail-block .col-wrapper ").each(function () {
            jQuery(this).find('.col').sameHeight();
        });
        jQuery(".generic-col-two .generic-detail-block .col-wrapper").each(function () {
            jQuery(this).find('.column').sameHeight();
        });
    }, 30);
    if ($windowWidth > 767) {
        jQuery(".promo-block .info-box p").sameHeight();
        jQuery(".promo-block .info-box h4").sameHeight();
        jQuery(".feature-block .info-text h4").sameHeight();
        jQuery(".section-events .col-three p").sameHeight();
        jQuery(".section-events .col-three h6").sameHeight();
        jQuery(".generic-events .col-three .hover-off p").sameHeight();
        jQuery(".generic-events .col-three .hover-off h6").sameHeight();
        jQuery(".feature-block.featured-section .col-three").sameHeight();
        jQuery(".feature-block.info-block .col-three").sameHeight();
        jQuery(".feature-block.feature-info .col-three").sameHeight();
        jQuery(".intro-block .col-first .col-two").sameHeight();
        jQuery(".intro-block .col-second .col-two").sameHeight();
        jQuery(".intro-block .col-third .col-two").sameHeight();
        jQuery(".intro-block .col-fourth .col-two").sameHeight();
        jQuery(".section-downloads .multi-tab li").sameHeight();
        jQuery('.promo-intro .col-inner-content h6').sameHeight();
        jQuery('.promo-blade .promo-content .col-three').sameHeight();
        jQuery('.promo-blade .promo-content .col-three h6').sameHeight();
        jQuery('.generic-featured-block .featured-box').sameHeight();
        jQuery('.generic-featured-block.full-width .featured-box').css('height', 'auto');
        jQuery(".partner-slider .image").sameHeight();
        jQuery(".partner-slider .content").sameHeight();
        // jQuery(".generic-resources-block .col").sameHeight();
        jQuery(".section-tabs .tabs-expand").on("click", function () {
            setTimeout(function () {
                jQuery(".tab-1 .top-tabs .col-two").sameHeight();
            }, 10);
        });
    } else {
        jQuery(".promo-block .info-box p").css('height', 'auto');
        jQuery(".promo-block .info-box h4").css('height', 'auto');
        jQuery(".feature-block .info-text h4").css('height', 'auto');
        jQuery(".section-events .col-three p").css('height', 'auto');
        jQuery(".section-events .col-three h6").css('height', 'auto');
        jQuery(".generic-events .col-three .hover-off p").sameHeight();
        jQuery(".generic-events .col-three .hover-off h6").sameHeight();
        jQuery(".feature-block.featured-section .col-three").css('height', 'auto');
        jQuery(".feature-block.feature-info .col-three").css('height', 'auto');
        jQuery(".feature-block.info-block .col-three").css('height', 'auto');
        jQuery(".intro-block .col-first .col-two").css('height', 'auto');
        jQuery(".intro-block .col-second .col-two").css('height', 'auto');
        jQuery(".intro-block .col-third .col-two").css('height', 'auto');
        jQuery(".intro-block .col-fourth .col-two").css('height', 'auto');
        jQuery(".tab-1 .top-tabs .col-two").css('height', 'auto');
        jQuery(".section-downloads .multi-tab li").css('height', 'auto');
        jQuery('.promo-intro .col-inner-content h6').css('height', 'auto');
        jQuery(".partner-slider .content").css('height', 'auto');
        jQuery('.promo-blade .promo-content .col-three').css('height', 'auto');
        jQuery('.promo-blade .promo-content .col-three h6').css('height', 'auto');
        jQuery('.generic-featured-block .featured-box').css('height', 'auto');
        jQuery(".partner-slider .image").sameHeight();
    }
    if ($windowWidth > 991) {
        jQuery('.platform-link').css("height", "auto");
        var maxHeight = 0;
        jQuery('.platform-link').each(function () {
            if (jQuery(this).outerHeight() > maxHeight) {
                maxHeight = jQuery(this).outerHeight();
            }
        });
        jQuery('.platform-link').css("height", maxHeight + "px");
    } else {
        jQuery('.platform-link').css("height", "auto");
    }
    if ($windowWidth < 991 && $windowWidth > 767) {
        jQuery(".section-tabs .tabs-expand").on("click", function () {
            setTimeout(function () {
                jQuery(".tab-1 .bottom-tabs li").sameHeight();
            }, 10);
        });
    }
    if ($windowWidth < 768 && $windowWidth > 595) {
        jQuery(".section-tabs .tabs-expand").on("click", function () {
            setTimeout(function () {
                jQuery(".tab-1 .bottom-tabs li").sameHeight();
            }, 10);
        });
    } else {
        jQuery(".tab-1 .bottom-tabs li").css('height', 'auto');
    }
    if ($windowWidth > 595) {
        jQuery('.featured-carousel .col-three').sameHeight();
        jQuery('.featured-content-4column .col-four').sameHeight();

        jQuery(".section-downloads .tabs ").on("click", function () {
            setTimeout(function () {
                jQuery(".section-downloads .multi-tab li").sameHeight();

            }, 10);
        });
        jQuery(".section-downloads .multi-tab li").sameHeight();
    } else {
        jQuery(".section-downloads .multi-tab li").css('height', 'auto');
        jQuery('.featured-carousel .col-three').css('height', 'auto');
        jQuery('.featured-content-4column .col-four').css('height', 'auto');

    }
    if (jQuery(".all-responsive").length) {
        jQuery(".all-responsive").each(function () {
            var img = jQuery(this).children("img"),
                defaultWidth = img.prop('naturalWidth'),
                defaultHeight = img.prop('naturalHeight'),
                parentHeight = jQuery(this).height(),
                parentWidth = jQuery(this).width(),
                aspectRatio = defaultWidth / defaultHeight;
            img.css({"height": "auto", "width": "100%", "margin-left": "0px"});
            var imgHeight = parentWidth / aspectRatio;
            var imgTop = (imgHeight - parentHeight) / 2;
            img.css({"margin-top": "-" + imgTop + "px"});
            if (img.height() < parentHeight) {
                img.css({"height": "100%", "width": "auto"});
                var right_margin = (img.width() - parentWidth) / 2;
                img.css({"margin-left": "-" + right_margin + "px", "margin-top": "0"});
            } else if (img.width() < parentWidth) {
                img.css({"height": "auto", "width": "100%", "margin-left": "0"});
                var imgHeight = parentWidth / aspectRatio;
                var imgTop = (imgHeight - parentHeight) / 2;
                img.css({"margin-top": "-" + imgTop + "px"});
            }
        });
    }

});

/* Window load resize: End */

function customer_tab() {
    /* Partner Tabs */
    jQuery(".customer-tabs .customer-logo li.active-click").click(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var length = jQuery('.customer-tabs .img_wrap').length;
        var clickTabs = jQuery(this).attr("data-type");
        var activeIndex = jQuery(this).index();
        jQuery(".customer-tabs .customer-logo li").removeClass('clicked');
        jQuery(".customer-tabs .customer-logo li").removeClass("active");
        jQuery(this).addClass("active");

        jQuery('.customer-tabs .customer-slider-tab .img_wrap').removeClass('p-active n-active');
        jQuery('.customer-tabs .customer-slider-tab .img_wrap').each(function () {
            if (jQuery(this).hasClass(clickTabs)) {
                jQuery(this).addClass('active').removeClass('n-active p-active');

            } else {

                jQuery(this).removeClass('active');
            }
        });
        for (var i = 0; i < activeIndex; i++) {
            jQuery('.customer-tabs .customer-slider-tab .img_wrap:eq(' + i + ')').addClass('p-active');
        }
        for (var i = activeIndex + 1; i < length; i++) {
            jQuery('.customer-tabs .customer-slider-tab .img_wrap:eq(' + i + ')').addClass('n-active');
        }

    });

}

function imageResponsive() {

    /* Image responsive code*/
    if (jQuery(".customer-tabs .img_wrap .bg-img, .solution-block .view,.statistic-block .parallex-back,.second-level-banner .bg-img,.infrastructure .content-970 .bg-img,.grid-block .bg-img,.section-tabs .col-outer .col-three .bg-img,.section-tabs .col-outer .col-two .bg-img, .solution-intro .bg-img").length) {
        jQuery(".customer-tabs .img_wrap .bg-img, .solution-block .view,.statistic-block .parallex-back,.second-level-banner .bg-img,.infrastructure .content-970 .bg-img,.grid-block .bg-img,.section-tabs .col-outer .col-three .bg-img,.section-tabs .col-outer .col-two .bg-img, .solution-intro .bg-img").each(function () {
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

function imageResponsive1() {

    /* Image responsive code*/
    if (jQuery(".intro-block-parallex .parallex-back").length) {
        jQuery(".intro-block-parallex .parallex-back").each(function () {
            var img = jQuery(this).children("img"),
                defaultWidth = img.prop('naturalWidth'),
                defaultHeight = img.prop('naturalHeight'),
                parentHeight = jQuery(this).height(),
                parentWidth = jQuery(this).width(),
                aspectRatio = defaultWidth / defaultHeight;
            img.css({"height": "auto", "width": "100%", "margin-left": "0px"});
            var imgHeight = parentWidth / aspectRatio;
            var imgTop = (imgHeight - parentHeight);
            img.css({"margin-top": "-" + imgTop + "px"});
            if (img.height() < parentHeight) {
                img.css({"height": "100%", "width": "auto"});
                var right_margin = (img.width() - parentWidth) / 2;
                img.css({"margin-left": "-" + right_margin + "px", "margin-top": "0"});
            } else if (img.width() < parentWidth) {
                img.css({"height": "auto", "width": "100%", "margin-left": "0"});
                var imgHeight = parentWidth / aspectRatio;
                var imgTop = (imgHeight - parentHeight);
                img.css({"margin-top": "-" + imgTop + "px"});
            }
        });
    }
    var $windowWidth = jQuery(window).width();

}

function imageLeftAlign() {
    if (jQuery(".leadership-block .img-width-title .bg-img").length) {
        jQuery(".leadership-block .img-width-title .bg-img").each(function () {
            var img = jQuery(this).children("img"),
                defaultWidth = img.prop('naturalWidth'),
                defaultHeight = img.prop('naturalHeight'),
                parentHeight = jQuery(this).height(),
                parentWidth = jQuery(this).width(),
                aspectRatio = defaultWidth / defaultHeight;
            img.css({"height": "auto", "width": "100%"});
            var imgHeight = parentWidth / aspectRatio;
            var imgTop = (imgHeight - parentHeight) / 2;
            img.css({"margin-top": "-" + imgTop + "px"});
            if (img.height() < parentHeight) {
                img.css({"height": "100%", "width": "auto"});
                img.css({"margin-top": "0"});
            } else if (img.width() < parentWidth) {
                img.css({"height": "auto", "width": "100%"});
                var imgHeight = parentWidth / aspectRatio;
                var imgTop = (imgHeight - parentHeight) / 2;
                img.css({"margin-top": "-" + imgTop + "px"});
            }
        });
    }
    setTimeout(function () {
        if (jQuery(".solution-customer-slider .col-two .bg-img").length) {
            jQuery(".solution-customer-slider .col-two .bg-img").each(function () {
                var img = jQuery(this).children("img"),
                    defaultWidth = img.prop('naturalWidth'),
                    defaultHeight = img.prop('naturalHeight'),
                    parentHeight = jQuery(this).height(),
                    parentWidth = jQuery(this).width(),
                    aspectRatio = defaultWidth / defaultHeight;
                img.css({"height": "auto", "width": "100%"});
                var imgHeight = parentWidth / aspectRatio;
                var imgTop = (imgHeight - parentHeight) / 2;
                img.css({"margin-top": "-" + imgTop + "px"});
                if (img.height() < parentHeight) {
                    img.css({"height": "100%", "width": "auto"});
                    img.css({"margin-top": "0"});
                } else if (img.width() < parentWidth) {
                    img.css({"height": "auto", "width": "100%"});
                    var imgHeight = parentWidth / aspectRatio;
                    var imgTop = (imgHeight - parentHeight) / 2;
                    img.css({"margin-top": "-" + imgTop + "px"});
                }
            });
        }
    }, 200);
}

function counteranimate() {
    /* Counter animation */
    jQuery(".counter").each(function () {
        var $currentCounter = jQuery(this),
            $text = jQuery(this).text().replace(/[^\d.]/g, ''),
            timerValue = $text / 10,
            timer = 50000 / timerValue;
        jQuery(this).html("1");
        var i = 1;
        setTimeout(function () {
            var counter = setInterval(function () {
                i = i + 10;
                if (i <= $text) {
                    $currentCounter.html(i);
                } else if (i > $text) {
                    clearInterval(counter);
                    $currentCounter.html($text);
                }
            }, timer);
        }, 500);
    });
    fired = 1;
}

function counteranimatetwo() {
    /* Counter animation */
    jQuery(".counter-two").each(function () {
        var $currentCounter = jQuery(this),
            $text = jQuery(this).attr("data-count"),
            timerValue = $text / 10,
            timer = 3000 / timerValue;
        jQuery(this).html("1");
        var i = 1;
        setTimeout(function () {
            var counter = setInterval(function () {
                i = i + 1;
                if (i <= $text) {
                    $currentCounter.html(i);
                } else if (i > $text) {
                    clearInterval(counter);
                    $currentCounter.html($text);
                }
            }, timer);
        }, 500);
    });
    fired = 1;
}

function mouseEffect() {
    /* Mouse hover effect*/
    var imghero = jQuery('.parallex-hover');
    var win = {width: window.innerWidth, height: window.innerHeight};
    jQuery('.statistic-block').mousemove(function (event) {
        var xVal = -1 / (win.height / 2) * event.clientY + 1,
            yVal = 1 / (win.width / 2) * event.clientX - 1,
            transX = 20 / (win.width) * event.clientX - 15,
            transY = 20 / (win.height) * event.clientY - 15,
            transZ = 100 / (win.height) * event.clientY - 50;
        jQuery(this).find('.parallex-hover').css({
            'perspective': '1000px',
            '-webkit-transform': 'translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)'
        });
        jQuery(this).find('.parallex-hover').css({
            'perspective': '1000px',
            'transform': 'translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)'
        });
        //          imghero.css({'perspective':'1000px','transform':'rotate3d('+xVal+','+yVal+',0,2deg)'});
    });

    jQuery('.intro-block-parallex').mousemove(function (event) {
        var xVal = -1 / (win.height / 2) * event.clientY + 1,
            yVal = 1 / (win.width / 2) * event.clientX - 1,
            transX = 20 / (win.width) * event.clientX - 15,
            transY = 20 / (win.height) * event.clientY - 15,
            transZ = 100 / (win.height) * event.clientY - 50;
        imghero.css({
            'perspective': '1000px',
            '-webkit-transform': 'translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)'
        });
        imghero.css({
            'perspective': '1000px',
            'transform': 'translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)'
        });
    });
}

function $intialLoopslider() {
    /* Intialize loop slider*/
    var $wrapperWidth = jQuery('.customer-tabs').width(),
        $innerItem = jQuery('.customer-tabs .img_wrap'),
        $dataItems = 1,
        $itemLength = jQuery('.customer-tabs .img_wrap').length,
        $TotalWidth = $wrapperWidth * ($itemLength - $dataItems);
    $innerItem.css('width', $wrapperWidth / $dataItems + 'px');
    $nextLoopCLick();
    $prevLoopCLick();
}

function $nextLoopCLick() {
    /*
     * Loop slider for next click
     */

    jQuery('.customer-tabs .tabs-slider-nav .next').unbind().one('click', function (f) {
        f.stopImmediatePropagation();
        var $itemLength = jQuery(this).parents('.tabs-container').find('.customer-slider .img_wrap').length,
            $dataItems = 1,
            $wrapperWidth = jQuery(this).parents('.customer-tabs').width() / $dataItems;
        var $activeValue = jQuery(".customer-tabs .customer-slider .img_wrap:eq(0)").attr('data-type');
        jQuery(this).parents(".customer-tabs").find(".customer-slider .img_wrap:eq(0)").animate({"margin-left": "-" + $wrapperWidth + "px"}, {
            duration: 500, complete: function () {
                jQuery(this).parents(".customer-tabs").find(".customer-slider .img_wrap:eq(" + ($itemLength - 1) + ")").after(jQuery(this).parents(".customer-tabs").find(".customer-slider .img_wrap:eq(0)"));
                jQuery("customer-slider .customer-tabs .customer-slider .img_wrap:eq(0)").addClass('active');
                jQuery(this).parents(".customer-tabs").find(".customer-slider .img_wrap").css("margin-left", "0");
            }
        });
        setTimeout($nextLoopCLick, 500);
    });
}

function $prevLoopCLick() {
    /*
     * Loop slider for previous click
     */

    jQuery('.customer-tabs .tabs-slider-nav .prev').unbind().one('click', function (e) {
        e.stopImmediatePropagation();
        var $itemLength = jQuery(this).parents('.customer-tabs').find('.customer-slider .img_wrap').length,
            $dataItems = 1,
            $wrapperWidth = jQuery(this).parents('.customer-tabs').width() / $dataItems;
        var $activeValue = jQuery(".customer-tabs .customer-slider .img_wrap:eq(0)").attr('data-type');
        jQuery(".customer-tabs .customer-slider .tabs-container").css("margin-left", "-" + $wrapperWidth + "px");
        jQuery(this).parents(".customer-tabs").find(".customer-slider .img_wrap:eq(0)").before(jQuery(this).parents(".customer-tabs").find(".img_wrap:eq(" + ($itemLength - 1) + ")"));
        jQuery(this).parents(".customer-tabs").find(".customer-slider .tabs-container").animate({"margin-left": "0px"}, {
            duration: 500, complete: function () {
            }
        });
        setTimeout($prevLoopCLick, 500);
    });

}

function movable_paralax() {
    jQuery(window).on('scroll', function (e) {
        if (jQuery('.promo-intro .col-three-outer').length) {
            e.stopPropagation();
            var $div_offset = jQuery('.promo-intro .col-three-outer').offset().top;
            var scrollTop = jQuery(window).scrollTop();
            var $diff = ($div_offset - scrollTop) / 2 * 0.5;
            jQuery('.promo-intro .col-three-outer').stop(true, true).css({'background-position': '20%' + $diff + 'px'});
        }
    });
}

function msieversion()
/* Add class on Internet Explore*/ {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0) {
        jQuery('html').addClass('ie-all');
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        jQuery('html').addClass('ie-all');
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        jQuery('html').addClass('ie-all');
    }

    return false;
}

/* Window Scroll: Start */
jQuery(window).scroll(function () {
    /* add Animate on scroll */
    if (jQuery('.statistic-content').length > 0) {
        if (jQuery('.statistic-content').isOnScreen()) {
            if (fired === 0) {
                counteranimate();
                counteranimatetwo();
            }
        }
    }
});
/* Window SCroll: end */

/* Window resize: Start */
jQuery(window).resize(function () {
    movable_paralax();
    var $windowWidth = jQuery(window).width();
    var ctaWidth = jQuery('.product-cta-block .button').width();
    jQuery('.product-cta-block .content').css('width', 'calc(100% - ' + ctaWidth + 'px)');
    if ($windowWidth > 991) {
        if (jQuery('.partner-slider .partner-outer .col-four').length <= 4) {
            jQuery('.partner-slider .partner-outer .slider-button').css('display', 'none');
        }
        else {
            jQuery('.partner-slider .partner-outer .slider-button').css('display', 'block');
        }
    }
    else if ($windowWidth <= 991 && $windowWidth > 595) {
        if (jQuery('.partner-slider .partner-outer .col-four').length <= 3) {
            jQuery('.partner-slider .partner-outer .slider-button').css('display', 'none');
        }
        else {
            jQuery('.partner-slider .partner-outer .slider-button').css('display', 'block');
        }
    }
    else if ($windowWidth <= 595 && $windowWidth > 480) {
        if (jQuery('.partner-slider .partner-outer .col-four').length <= 2) {
            jQuery('.partner-slider .partner-outer .slider-button').css('display', 'none');
        }
        else {
            jQuery('.partner-slider .partner-outer .slider-button').css('display', 'block');
        }
    }
    else {
        jQuery('.partner-slider .partner-outer .slider-button').css('display', 'block');
    }
    if ($windowWidth > 767) {
        if (jQuery('.featured-carousel .col-three').length <= 3) {
            jQuery('.featured-carousel .slider-button').css('display', 'none');
        }
        else {
            jQuery('.featured-carousel .slider-button').css('display', 'block');
        }
    }
    else if ($windowWidth <= 767 && $windowWidth > 595) {
        if (jQuery('.featured-carousel .col-three').length <= 2) {
            jQuery('.featured-carousel .slider-button').css('display', 'none');
        }
        else {
            jQuery('.featured-carousel .slider-button').css('display', 'block');
        }
    }
    else {
        if (jQuery('.featured-carousel .col-three').length <= 1) {
            jQuery('.featured-carousel .slider-button').css('display', 'none');
        }
        else {
            jQuery('.featured-carousel .slider-button').css('display', 'block');
        }
    }
    jQuery('.content-graphic .info-tooltip').hover(function () {
        if (jQuery('.content-graphic').hasClass('fullwidth')) {
            if (jQuery('.content-graphic .info-tooltip').length > 0) {
                var tip_offset = jQuery(this).offset().left;
                var containerWidth = jQuery(window).width() / 2;
                if ($windowWidth > 767) {
                    jQuery('.para-info .tip-arrow').css('left', tip_offset - containerWidth - 35);
                } else if ($windowWidth <= 767 && $windowWidth > 595) {
                    jQuery('.para-info .tip-arrow').css('left', tip_offset - 30);
                } else {
                    jQuery('.para-info .tip-arrow').css('left', tip_offset - 20);
                }
            }
            var paraLength = jQuery(this).parents(".inner-box").children("p").length;
            var parentIndex = (jQuery(this).parent().index()) + 1;
            if (paraLength > parentIndex) {
                jQuery(this).parents('.inner-box').addClass('active');
            } else {
                jQuery(this).parents('.inner-box').addClass('active tool-top');
            }
            jQuery(this).parents('.inner-box').addClass('active');
        }
    }, function () {
        if (jQuery('.content-graphic').hasClass('fullwidth')) {
            jQuery(this).parents('.inner-box').removeClass('active tool-top');
        }
    });
    mouseEffect();

    if ($windowWidth > 595) {
        jQuery('.customer-tabs .tabs-slider .img_wrap').css('width', '100%');
        jQuery('.customer-tabs').removeClass('tabs-responsive');
    } else {
        var $wrapperWidth = jQuery('.customer-tabs').width(),
            $dataItems = 1;
        jQuery('.customer-tabs .tabs-slider .img_wrap').css('width', $wrapperWidth / $dataItems + 'px');
        jQuery('.customer-tabs').addClass('tabs-responsive');
    }
    imageResponsive();
    if ($windowWidth > 1024) {
        jQuery('.content-graphic').addClass('fullwidth').removeClass('smallwidth');
    }
    else {
        jQuery('.content-graphic').addClass('smallwidth').removeClass('fullwidth');
    }
});

jQuery(document).ready(function () {
    var $winWidth = jQuery(window).width();
    var slickWidth = null;
    var windowWidthRe = jQuery(window).width();
    jQuery('.quality-block-slider').each(function(){
        var qualitySlider = jQuery(this).find('.quality-slider').slick({
            dots: false,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            draggable: false,
            swipe: false,
            swipeToSlide: false,
            touchMove: false,
            prevArrow: jQuery(this).find('.slider-nav .prev'),
            nextArrow: jQuery(this).find('.slider-nav .next'),
            responsive: [
                {
                    breakpoint: 1240,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 595,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    })
    jQuery('.quality-block-slider .slider-nav .prev').on('click', function () {
        var $winWidth = jQuery(window).width();
        var $this = jQuery(this);
        setTimeout(function () {
            if ($winWidth > 1240) {
                var qualityItemLength = 5;
            }
            else if ($winWidth < 1241 && $winWidth > 991) {
                var qualityItemLength = 4;
            }
            var index = $this.parents('.quality-block-slider').find('.slick-current').index();
            $this.parents('.quality-block-slider').find('.col-5').removeClass('co-active');
            $this.parents('.quality-block-slider').find('.col-5:eq(' + (index + qualityItemLength) + ')').addClass('co-active');
            $this.parents('.quality-block-slider').find('.col-5:eq(' + (index - 1) + ')').addClass('co-active');
        }, 50);
    });

    jQuery('.quality-block-slider .slider-nav .next').on('click', function () {
        var $winWidth = jQuery(window).width();
        var $this = jQuery(this);
        setTimeout(function () {
            if ($winWidth > 1240) {
                var qualityItemLength = 5;
            }
            else if ($winWidth < 1241 && $winWidth > 991) {
                var qualityItemLength = 4;
            }
            var index = $this.parents('.quality-block-slider').find('.slick-current').index();
            $this.parents('.quality-block-slider').find('.col-5').removeClass('co-active');
            $this.parents('.quality-block-slider').find('.col-5:eq(' + (index + qualityItemLength) + ')').addClass('co-active');
            $this.parents('.quality-block-slider').find('.col-5:eq(' + (index - 1) + ')').addClass('co-active');
        }, 50);
    });

    if (jQuery(".quality-block-slider").length > 0) {
        jQuery('.quality-block-slider .col-5 .v-middle-inner').click(function (e) {
            e.preventDefault();
            $winWidth = jQuery(window).width();
            windowWidthRe = jQuery(window).width();
            slickWidth = jQuery(this).parents('.col-5')[0].clientWidth;
            if (!jQuery(this).parents('.col-5').hasClass('box-active')) {
                var $index = jQuery(this).parents('.col-5').index();
                var $this = jQuery(this);
                var $secOffset = jQuery(this).parents('.col-5').position().left;
                var $secWidth = jQuery(this).parents('.col-5').width() / 2;
                var $marginLeft = 0;
                $this.parents('.col-5 ').addClass('box-active');
                if ($winWidth > 991) {
                    var parentWidth = $(this).parents('.quality-block-slider').find('.quality-slider').width();
                    var $margin = (parentWidth - 739) / 2;
                    $marginLeft = ($margin - $secOffset) + 20;
                    var newitemWidth = 739;
                    var transformElement = 'scale(1,1.12) translatey(-9px)';
                } else if ($winWidth < 992 && $winWidth > 767) {
                    var parentWidth = $(this).parents('.quality-block-slider').find('.quality-slider').width();
                    var $margin = (parentWidth - 678 ) / 2;
                    $marginLeft = ($margin - $secOffset);
                    var newitemWidth = 678;
                    var transformElement = 'scale(1) translatey(0)';
                } else if ($winWidth < 768 && $winWidth > 595) {
                    var parentWidth = $(this).parents('.quality-block-slider').find('.quality-slider').width();
                    var $margin = (parentWidth - 500) / 2;
                    $marginLeft = ($margin - $secOffset);
                    var newitemWidth = 500;
                    var transformElement = 'scale(1) translatey(0)';
                }
                else {
                    var parentWidth = $(this).parents('.quality-block-slider').offset().left;
                    $marginLeft = (parentWidth - $secOffset) + 10;
                    var newitemWidth = $(this).parents('.quality-block-slider').find('.quality-slider').width() - 10;
                    var transformElement = 'scale(1) translatey(0)';
                }
                jQuery(this).parents('.quality-block-slider').find('.prev').addClass('remove');
                jQuery(this).parents('.quality-block-slider').find('.next').addClass('remove');
                jQuery(this).parents('.quality-block-slider').find('.slider-nav').css('display', 'none');
                jQuery(this).parents('.quality-block-slider').find('.col-5 .v-middle-inner').not(this).parents('.col-5').css({
                    'transform': 'scale(.5,.5)',
                    'opacity': '0',
                    'visibility': 'hidden',
                    'transition': 'all .5s ease-in-out'
                });

                jQuery(this).parents('.col-5').find('.v-middle-inner, .arrow-icon').css({
                    'opacity': '0',
                    'visibility': 'hidden',
                    'transition': 'all .3s ease-in-out'
                });

                setTimeout(function () {
                    $this.parents('.col-5').animate({
                        'margin-left': $marginLeft + 'px',
                    });
                    $this.parents('.col-5').css({
                        'transform': transformElement,
                        'transition': 'all .5s ease-in-out'
                    });
                }, 300);
                jQuery(this).parents('.col-5').find('.v-middle-inner, .arrow-icon').css({
                    'opacity': '0',
                    'visibility': 'hidden',
                    'transition': 'all .3s ease-in-out'
                });
                setTimeout(function () {
                    $this.parents('.col-5').animate({'width': newitemWidth + 'px'});
                }, 490);
                jQuery(this).parents('.col-5').find('.animate-view').addClass('animate-show');
            }

        });

    }


    jQuery(document).on('click', '.quality-block-slider .close-icon', function (e) {
        var $this = jQuery(this);
        jQuery(this).parent('.animate-view').removeClass('animate-show');
        jQuery(this).parents('.quality-block-slider').find('.slider-nav').css('display', 'block');
        jQuery(this).parents('.quality-block-slider').find('.prev').removeClass('remove');
        jQuery(this).parents('.quality-block-slider').find('.next').removeClass('remove');
        jQuery(this).parents('.quality-block-slider').find('.col-5').removeClass('box-active');
        jQuery(this).parents('.quality-block-slider').find('.col-5').css({
            'width': slickWidth + 'px',
            'transition': 'all .5s ease-in-out'
        });
        setTimeout(function () {
            $this.parents('.quality-block-slider').find('.col-5').css({'margin-left': '0px'});
        }, 500);
        setTimeout(function () {
            $this.parents('.quality-block-slider').find('.col-5 .v-middle-inner').parents('.col-5').css({
                'transform': '',
                'opacity': '1',
                'visibility': 'visible',
                'transition': 'all .3s ease-in-out 0s'
            });
            $this.parents('.quality-block-slider').find('.col-5 .v-middle-inner').css({'opacity': '1','visibility': 'visible'});
            $this.parents('.quality-block-slider').find('.col-5 .arrow-icon').css({'opacity': '1','visibility': 'visible'});
        }, 1000);

    });

    jQuery('.we-logo-slider .slides').slick({
        dots: false,
        infinite: true,
        speed: 0,
        autoplay: true,
        slidesToShow: 8,
        slidesToScroll: 8,
        cssEase: 'linear',
        arrows: false,
        draggable: false,
        swipe: false,
        swipeToSlide: false,
        responsive: [
            {
                breakpoint: 1240,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 7,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 595,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            }
        ]
    });
    jQuery('.we-logo-slider .slides').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        jQuery('.we-logo-slider .col-eight').removeClass('fade-added');
    });
    jQuery('.we-logo-slider .slides').on('afterChange', function(event, slick, currentSlide, nextSlide){
        jQuery('.we-logo-slider .slick-active').addClass('fade-added');
    });
    jQuery(window).on('resize', function () {
        var $winWidth = jQuery(window).width();
        if(windowWidthRe != jQuery(window).width()){
            jQuery('.quality-block-slider .col-5').each(function () {
                if (jQuery(this).hasClass('box-active')) {
                    jQuery(this).find('.close-icon').trigger('click');
                }
            });
            jQuery('.quality-block .col-5').each(function () {
                if (jQuery(this).hasClass('box-active')) {
                    jQuery('.quality-block .close-icon').trigger('click');
                }
            });
        }
        if ($winWidth > 1240) {
            var qualityItemLength = 5;
        }
        else if ($winWidth < 1241 && $winWidth > 991) {
            var qualityItemLength = 4;
        }
        setTimeout(function () {
            jQuery('.quality-block-slider').each(function(){
                var index = jQuery(this).find('.col-5.slick-current').index();
                jQuery(this).find('.col-5').removeClass('co-active');
                jQuery(this).find('.col-5:eq(' + (index + qualityItemLength) + ')').addClass('co-active');
                jQuery(this).find('.col-5:eq(' + (index - 1) + ')').addClass('co-active');
            });

        }, 100)

    });
});

