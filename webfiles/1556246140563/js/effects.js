jQuery(window).bind("load scroll resize", function () {
  var $winHeight = jQuery(window).height();
  var $winwidth = jQuery(window).width();
  var $winTop = jQuery(window).scrollTop();



  /*   
   * scaling animation
   */
  if (jQuery('.resource-events .col-three-outer .col-three').length > 0) {
    jQuery(".resource-events .col-three-outer .col-three").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).css({'animation-duration': '0.3s',  'animation-name': 'scaling'});
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).css({'animation-duration': '0.3s',  'animation-name': 'scaling'});
      }
    });
  }
  /*
   * Fadein up with normal delay 
   */
 
  if (jQuery('.move-up.delay').length > 0) {
    jQuery(".move-up.delay").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '0.3s', 'animation-name': 'fadeInUp'});
        if (jQuery(this).parents().hasClass("feature-block feature-info")) {
          jQuery(this).addClass("start-animate");
        }
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '0.3s', 'animation-name': 'fadeInUp'});
        if (jQuery(this).parents().hasClass("feature-block feature-info")) {
          jQuery(this).addClass("start-animate");
        }
      }
    });
  }
  /*
   * Fadein up with delay of 0.6second
   */
  if (jQuery('.move-up.delay-1').length > 0) {
    jQuery(".move-up.delay-1").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '0.6s', 'animation-name': 'fadeInUp'});
        if (jQuery(this).parents().hasClass("feature-block feature-info")) {
          jQuery(this).addClass("start-animate");
        }
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '0.6s', 'animation-name': 'fadeInUp'});
        if (jQuery(this).parents().hasClass("feature-block feature-info")) {
          jQuery(this).addClass("start-animate");
        }
      }
    });
  }
  /*
   * Fadein up with delay of 0.9second
   */
  if (jQuery('.move-up.delay-2').length > 0) {
    jQuery(".move-up.delay-2").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '0.9s', 'animation-name': 'fadeInUp'});
        if (jQuery(this).parents().hasClass("feature-block feature-info")) {
          jQuery(this).addClass("start-animate");
        }
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '0.9s', 'animation-name': 'fadeInUp'});
        if (jQuery(this).parents().hasClass("feature-block feature-info")) {
          jQuery(this).addClass("start-animate");
        }
      }
    });
  }
  /*
   * Fadein up with delay of 1.2second
   */
  if (jQuery('.move-up.delay-3').length > 0) {
    jQuery(".move-up.delay-3").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '1.2s', 'animation-name': 'fadeInUp'});
        if (jQuery(this).parents().hasClass("feature-block feature-info")) {
          jQuery(this).addClass("start-animate");
        }
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '1.2s', 'animation-name': 'fadeInUp'});
        if (jQuery(this).parents().hasClass("feature-block feature-info")) {
          jQuery(this).addClass("start-animate");
        }
      }
    });
  }
  /*
   * Fadein up with delay of 1.5second
   */
  if (jQuery('.move-up.delay-4').length > 0) {
    jQuery(".move-up.delay-4").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '1.5s', 'animation-name': 'fadeInUp'});
        if (jQuery(this).parents().hasClass("feature-block feature-info")) {
          jQuery(this).addClass("start-animate");
        }
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '1.5s', 'animation-name': 'fadeInUp'});
        if (jQuery(this).parents().hasClass("feature-block feature-info")) {
          jQuery(this).addClass("start-animate");
        }
      }
    });
  }
  /*
   * Fadein up with delay of 1.8second
   */
  if (jQuery('.move-up.delay-5').length > 0) {
    jQuery(".move-up.delay-5").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '1.8s', 'animation-name': 'fadeInUp'});
        if (jQuery(this).parents().hasClass("feature-block feature-info")) {
          jQuery(this).addClass("start-animate");
        }
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '1.8s', 'animation-name': 'fadeInUp'});
        if (jQuery(this).parents().hasClass("feature-block feature-info")) {
          jQuery(this).addClass("start-animate");
        }
      }
    });
  }
  /*
   * Fadein up with delay of 2.1second
   */
  if (jQuery('.move-up.delay-6').length > 0) {
    jQuery(".move-up.delay-6").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '2.1s', 'animation-name': 'fadeInUp'});
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '2.1s', 'animation-name': 'fadeInUp'});
      }
    });
  }
  /*
   * Fadein up with delay of 1.8second
   */
  if (jQuery('.move-up.delay-7').length > 0) {
    jQuery(".move-up.delay-7").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '2.4s', 'animation-name': 'fadeInUp'});
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '2.4s', 'animation-name': 'fadeInUp'});
      }
    });
  }
  /*
   * Fadein up with delay of 1.8second
   */
  if (jQuery('.move-up.delay-8').length > 0) {
    jQuery(".move-up.delay-8").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '2.7s', 'animation-name': 'fadeInUp'});
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '2.7s', 'animation-name': 'fadeInUp'});
      }
    });
  }

  /*
   * Fadein up with delay of 2.1second
   */
    if (jQuery('.move-up.delay-9').length > 0) {
        jQuery(".move-up.delay-9").each(function () {
            var $offset = jQuery(this).parent().offset().top;
            var $secHeight = jQuery(this).parent().outerHeight();
            var $secPosition = $offset - $winTop;
            if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
                jQuery(this).css({'animation-duration': '1s', 'animation-delay': '3.0s', 'animation-name': 'fadeInUp'});
            } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
                jQuery(this).css({'animation-duration': '1s', 'animation-delay': '3.0s', 'animation-name': 'fadeInUp'});
            }
        });
    }
    
  /*
   * Fadein from left to right with normal delay
   */
  if (jQuery('.move-right').length > 0) {
    jQuery(".move-right").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '0.3s', 'animation-name': 'fadeInRight'});
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).css({'animation-duration': '1s', 'animation-delay': '0.3s', 'animation-name': 'fadeInRight'});
      }
    });
  }

  var $winHeight = jQuery(window).height();
  var $winTop = jQuery(window).scrollTop();
  if (jQuery('.ie9 .move-up.delay').length > 0) {
    jQuery(".ie9 .move-up.delay").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 300);
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 300);
      }
    });
  }
  if (jQuery('.ie9 .move-up.delay-1').length > 0) {
    jQuery(".ie9 .move-up.delay-1").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 600);
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 600);
      }
    });
  }
  if (jQuery('.ie9 .move-up.delay-2').length > 0) {
    jQuery(".ie9 .move-up.delay-2").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 900);
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 900);
      }
    });
  }
  if (jQuery('.ie9 .move-up.delay-3').length > 0) {
    jQuery(".ie9 .move-up.delay-3").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 1100);
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 1100);
      }
    });
  }
  if (jQuery('.ie9 .move-up.delay-4').length > 0) {
    jQuery(".ie9 .move-up.delay-4").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 1300);
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 1300);
      }
    });
  }
  if (jQuery('.ie9 .move-up.delay-5').length > 0) {
    jQuery(".ie9 .move-up.delay-5").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 1500);
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 1500);
      }
    });
  }

  if (jQuery('.ie9 .move-up.delay-6').length > 0) {
    jQuery(".ie9 .move-up.delay-5").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 1700);
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 1700);
      }
    });
  }
  if (jQuery('.ie9 .move-up.delay-7').length > 0) {
    jQuery(".ie9 .move-up.delay-5").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 1800);
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 1800);
      }
    });
  }
  if (jQuery('.ie9 .move-up.delay-8').length > 0) {
    jQuery(".ie9 .move-up.delay-5").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 1800);
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).animate({'opacity': '1', 'bottom': '0'}, 1800);
      }
    });
  }
  if (jQuery('.ie9 .move-right').length > 0) {
    jQuery(".ie9 .move-right").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).animate({'opacity': '1', 'left': '0'}, 500);
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).animate({'opacity': '1', 'left': '0'}, 500);
      }
    });
  }
  /*
   * Fadein from left to right with normal delay
   */

  if (jQuery('.move-right').length > 0) {
    jQuery(".move-right").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 150)) && ($secPosition > -500)) {
        jQuery(this).css({'animation-duration': '1.2s', 'animation-delay': '0.3s', 'animation-name': 'fadeInRight'});
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).css({'animation-duration': '1.2s', 'animation-delay': '0.3s', 'animation-name': 'fadeInRight'});
      }
    });
  }
  /*
   * Fadein from right to left with normal delay
   */
  if (jQuery('.move-left').length > 0) {
    jQuery(".move-left").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 20)) && ($secPosition > -500)) {
        jQuery(this).css({'animation-duration': '1.2s', 'animation-delay': '0.3s', 'animation-name': 'fadeInLeft'});
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
        jQuery(this).css({'animation-duration': '1.2s', 'animation-delay': '0.3s', 'animation-name': 'fadeInLeft'});
      }
    });
  }
  if (jQuery('.ie9 .move-left').length > 0) {
    jQuery(".ie9 .move-left").each(function () {
      var $offset = jQuery(this).parent().offset().top;
      var $secHeight = jQuery(this).parent().outerHeight();
      var $secPosition = $offset - $winTop;
      if (($secPosition <= ($winHeight - 20)) && ($secPosition > -500)) {
       jQuery(this).animate({'opacity': '1', 'right': '0'}, 500);
      } else if ((($secPosition - 80) >= -($secHeight)) && ($secPosition <= ($winHeight - 150))) {
       jQuery(this).animate({'opacity': '1', 'right': '0'}, 500);
      }
    });
  }
});


jQuery(window).on('load', function () {
  jQuery('.info-box.delay').css({'animation-duration': '1s', 'animation-delay': '0.3s', 'animation-name': 'fadeInUp'});
  jQuery('.info-box.delay-1').css({'animation-duration': '1s', 'animation-delay': '0.6s', 'animation-name': 'fadeInUp'});
  jQuery('.info-box.delay-2').css({'animation-duration': '1s', 'animation-delay': '0.9s', 'animation-name': 'fadeInUp'});
});