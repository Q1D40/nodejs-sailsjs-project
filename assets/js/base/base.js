(function() {
  var agent = navigator.userAgent.toLowerCase();
  var iLastTouch = null;
  if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
    document.body.addEventListener('touchend', function(event) {
      var iNow = new Date().getTime();
      iLastTouch = iLastTouch || iNow + 1;
      var delta = iNow - iLastTouch;
      if (delta < 500 && delta > 0) {
        event.preventDefault();
        return false;
      }
      iLastTouch = iNow;
    }, false);
  }
})();

$(document).ready(function(){

  $('.ck').on('touchend', function(event){
    $(this).css('opacity', 1);
  });
  $('.ck').on('touchmove', function(event){
    $(this).css('opacity', 1);
  });
  $('.ck').on('touchcancel', function(event){
    $(this).css('opacity', 1);
  });
  $('.ck').on('touchstart', function(event){
    $(this).css('opacity', 0.5);
  });

});
