$(document).ready(function(){

  $('.titlerow').on('touchend', function(event){
    $(this).css('opacity', 1);
  });

  $('.titlerow').on('touchcancel', function(event){
    $(this).css('opacity', 1);
  });

  $('.titlerow').on('touchmove', function(event){
    $(this).css('opacity', 1);
  });

  $('.titlerow').on('touchstart', function(event){
    $(this).css('opacity', 0.5);
  });

  $('.titlerow').on('tap', function(event){
    if ($(this).children('.list').children('.cell').children('.arrow').hasClass('act')) {
      $(this).children('.list').children('.cell').children('.arrow').removeClass('act');
      $(this).next().hide();
    } else {
      $(this).children('.list').children('.cell').children('.arrow').addClass('act');
      $(this).next().show();
    }
  });

});
