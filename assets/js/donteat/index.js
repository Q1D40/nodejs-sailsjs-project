$(document).ready(function(){

  $('.submit').on('touchend', function(event){
    $(this).css('opacity', 1);
  });

  $('.submit').on('touchmove', function(event){
    $(this).css('opacity', 1);
  });

  $('.submit').on('touchcancel', function(event){
    $(this).css('opacity', 1);
  });

  $('.submit').on('touchstart', function(event){
    $(this).css('opacity', 0.5);
  });

  $('.keyword a').on('touchend', function(event){
    $(this).css('opacity', 1);
  });

  $('.keyword a').on('touchmove', function(event){
    $(this).css('opacity', 1);
  });

  $('.keyword a').on('touchcancel', function(event){
    $(this).css('opacity', 1);
  });

  $('.keyword a').on('touchstart', function(event){
    $(this).css('opacity', 0.5);
  });

  $('.submit').on('tap', function(event){
    $('.search').submit();
  });

});
