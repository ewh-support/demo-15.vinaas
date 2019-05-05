var canvas10, stage10, exportRoot10, anim_container10, dom_overlay_container10, fnStartAnimation10, clearInt;
var nCount11 = 0;
jQuery(window).on('load', function () {
  var window_width = jQuery(window).width();
  canvas10 = document.getElementById("canvas10");
  anim_container10 = document.getElementById("animation_container10");
  dom_overlay_container10 = document.getElementById("dom_overlay_container10");
  var comp10 = AdobeAn.getComposition("7F54B8157EEAC548A36B510B74AC033E");
  var lib10 = comp10.getLibrary();
  var loader = new createjs.LoadQueue(false);
  loader.addEventListener("fileload", function (evt) {
    handleFileLoad(evt, comp10)
  });
  loader.addEventListener("complete", function (evt) {
    handleComplete10(evt, comp10)
  });
  var lib10 = comp10.getLibrary();
  loader.loadManifest(lib10.properties.manifest);
});
function handleFileLoad(evt, comp10) {
  var images = comp10.getImages();
  if (evt && (evt.item.type == "image")) {
    images[evt.item.id] = evt.result;
  }
}
function handleComplete10(evt, comp10) {
  //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
  var lib10 = comp10.getLibrary();
  var ss = comp10.getSpriteSheet();
  var queue = evt.target;
  var ssMetadata = lib10.ssMetadata;
  for (i = 0; i < ssMetadata.length; i++) {
    ss[ssMetadata[i].name] = new createjs.SpriteSheet({"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames})
  }
  exportRoot10 = new lib10.index();
  stage10 = new lib10.Stage(canvas10);
  stage10.addChild(exportRoot10);
  stage10.enableMouseOver();
  //Registers the "tick" event listener.
  fnStartAnimation10 = function () {
    createjs.Ticker.setFPS(lib10.properties.fps);
    createjs.Ticker.addEventListener("tick", stage10);
  }
  graphIdle = function () {
    exportRoot10.gotoAndStop("idle");
  }
  graphStart = function () {
    exportRoot10.gotoAndPlay(3);
  }
  

  
  //Code to support hidpi screens and responsive scaling.
  function makeResponsive(isResp, respDim, isScale, scaleType) {
    var lastW, lastH, lastS = 1;
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    function resizeCanvas() {
      var w = lib10.properties.width, h = lib10.properties.height;
      var iw = window.innerWidth, ih = window.innerHeight;
      var pRatio = window.devicePixelRatio || 1, xRatio = iw / w, yRatio = ih / h, sRatio = 1;
      if (isResp) {
        if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
          sRatio = lastS;
        } else if (!isScale) {
          if (iw < w || ih < h)
            sRatio = Math.min(xRatio, yRatio);
        } else if (scaleType == 1) {
          sRatio = Math.min(xRatio, yRatio);
        } else if (scaleType == 2) {
          sRatio = Math.max(xRatio, yRatio);
        }
      }
      canvas10.width = w * pRatio * sRatio;
      canvas10.height = h * pRatio * sRatio;
      canvas10.style.width = dom_overlay_container10.style.width = anim_container10.style.width = w * sRatio + 'px';
      canvas10.style.height = anim_container10.style.height = dom_overlay_container10.style.height = h * sRatio + 'px';
      stage10.scaleX = pRatio * sRatio;
      stage10.scaleY = pRatio * sRatio;
      lastW = iw;
      lastH = ih;
      lastS = sRatio;
    }
  }
   graphIdle();
   var removeInterval11;
   
   removeInterval11 = setInterval(function(){

    if(nCount11 === 1){
      graphStart();
      clearInterval(removeInterval11);
    }
   },20);
  makeResponsive(false, 'both', false, 2);
  AdobeAn.compositionLoaded(lib10.properties.id);
  fnStartAnimation10();
  
}

  jQuery(document).ready(function () {
    var scroll = jQuery(window).scrollTop();
    jQuery('.content-graphic1 .get-started-content button').on('click', function () {
      if(jQuery('.content-graphic1').hasClass('one-clicked')){
      var width = 0;
      clearInt = setInterval(function () {
        width = width + 10;
        jQuery(".content-graphic1 .loadbar").css({
          'width': width + "%",
          'max-width': '90%'
        });
      }, 215);
      nCount11=1;
      jQuery(this).addClass('overlay-deactive');
      jQuery('.content-graphic1').removeClass('one-clicked');
      jQuery('.content-graphic .get-started-content').css({'visibility': 'hidden', 'opacity': '0', 'display': 'none'});
    jQuery('.content-graphic .slider-content').addClass('active');
      jQuery('.content-graphic1 .col-right').css('opacity','0');
      jQuery('.content-graphic1 .dummy-image').css('transform', 'scale(0.1)').fadeOut(300);
      jQuery('.content-graphic1 .wheel-loader').fadeIn();
      
    }
    });
    jQuery('.content-graphic1 .dummy-image').on('click', function () {
      jQuery('.content-graphic1 .get-started-content button').trigger('click');
    });
  });
  
   jQuery(window).on('load',function () {
      jQuery('.content-graphic1').addClass('one-clicked');
   });
