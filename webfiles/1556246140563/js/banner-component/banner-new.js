
$(document).ready(function () {

    $(".banner-new  .feature-box").on("click",function () {
        $(this).toggleClass("active");
    });

    $('.banner-new .bottom-row .slider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay:true,
        arrows: true,
        prevArrow: $('.banner-new .bottom-row .controls .prev'),
        nextArrow: $('.banner-new .bottom-row .controls .next'),
        responsive: [
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3
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
});

$(window).scroll(function() {
    if(($(window).width()) > 991) {
        var window_top = $(window).scrollTop() + 145;
    }
    else
    {
        var window_top = $(window).scrollTop() + 90;
    }
    if (($(window).width())>991) {
        if (window_top > 180) {
            $('.banner-new .feature-box.dummy').removeClass('active');
        }
        if (window_top < 180) {
            $('.banner-new .feature-box.dummy').addClass('active');
        }
    }
    else{
        if (window_top > 112) {
            $('.banner-new .feature-box.dummy').removeClass('active');
        }
        if (window_top < 112) {
            $('.banner-new .feature-box.dummy').addClass('active');
        }
    }
});
