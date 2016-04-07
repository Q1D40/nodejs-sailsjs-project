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

  $('#sbm').on('tap', function(event){
    $('#fm').submit();
  });
  $('.sbm-sex').on('tap', function(event){
    $('#sex').val($(this).attr('v'));
    $('#fm').submit();
  });
  $('.sbm-height').on('tap', function(event){
    $('#height').val($(this).attr('v'));
    $('#fm').submit();
  });
  $('.sbm-w').on('tap', function(event){
    $('#weight').val($(this).attr('v'));
    $('#fm').submit();
  });
  $('.sbm-age').on('tap', function(event){
    $('#age').val($(this).attr('v'));
    $('#fm').submit();
  });
  $('.sbm-work').on('tap', function(event){
    $('#work').val($(this).attr('v'));
    $('#fm').submit();
  });
  $('.slc-fd').on('tap', function(event){
    $('#sfm').show();
    $('#cover').show();
    $('#cls-cover').show();
  });
  $('#cls-cover').on('tap', function(event){
    $('#sfm').hide();
    $('#cover').hide();
    $('#cls-cover').hide();
  });

});
