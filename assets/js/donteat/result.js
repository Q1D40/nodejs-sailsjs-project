$(document).ready(function(){

  $('#eat').on('touchend', function(event){
    $(this).css('opacity', 1);
  });

  $('#eat').on('touchmove', function(event){
    $(this).css('opacity', 1);
  });

  $('#eat').on('touchcancel', function(event){
    $(this).css('opacity', 1);
  });

  $('#eat').on('touchstart', function(event){
    if (!$(this).hasClass('act')) {
      $(this).css('opacity', 0.5);
    }
  });

  $('#cnt').on('touchend', function(event){
    $(this).css('opacity', 1);
  });

  $('#cnt').on('touchmove', function(event){
    $(this).css('opacity', 1);
  });

  $('#cnt').on('touchcancel', function(event){
    $(this).css('opacity', 1);
  });

  $('#cnt').on('touchstart', function(event){
    if (!$(this).hasClass('act')) {
      $(this).css('opacity', 0.5);
    }
  });

  $('#eat').on('tap', function(event){
    if (!$(this).hasClass('act')) {
      $('#eat').addClass('act');
      $('#cnt').removeClass('act');
      $('#persion').show();
      $('#content').hide();
    }
  });

  $('#cnt').on('tap', function(event){
    if (!$(this).hasClass('act')) {
      $('#cnt').addClass('act');
      $('#eat').removeClass('act');
      $('#content').show();
      $('#persion').hide();
    }
  });

});
