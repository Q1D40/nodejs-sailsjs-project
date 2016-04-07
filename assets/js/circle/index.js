var loadData = function() {
    if (doLoading) return false;
    if (loadAll) return false;
    var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
    if ($(document).height() <= totalheight+50){
      doLoading = true;
      $.ajax({
        url: '/circle/topic-list',
        dataType: 'json',
        type: 'GET',
        data: {page: page},
        //cache: false,
        success: function(data) {
          var topicList = data.topicList;
          if (topicList.length > 0) {
            var html = '';
            for (var i = 0; i < topicList.length; i++) {
              var topic = topicList[i];
              var doctorInfo = topic.doctorInfo;
              if (!doctorInfo) doctorInfo = {};
              html    += '<li>'
                       + '<div class="po-avt-wrap">'
                       + '<img class="po-avt" src="';
              if (doctorInfo.avatar) {
                html += doctorInfo.avatar;
              }
              html    += '">'
                       + '</div>'
                       + '<div class="po-cmt">'
                       + '<div class="po-hd">'
                       + '<p class="po-name">';
              if (doctorInfo.name) {
                html  += doctorInfo.name;
              }
              html    += '</p>'
                       + '<div class="post">'
                       + '<p>';
              if (doctorInfo.description) {
                html  += doctorInfo.description;
              }
              html    += '</p>'
                       + '</div>'
                       + '</div>'
                       + '<div class="cmt-wrap">'
                       + '<a href="';
              if (topic.url) {
                html  += topic.url;
              }
              html    += '" target="_blank">'
                       + '<div class="cmt-list" style="height:50pxj; display:table; ">'
                       + '<img style="height:40px; width:40px; margin-top:5px; margin-right:10px;" src="';
              if (topic.thumb) {
                html  += topic.thumb;
              }
              html    += '">'
                       + '<span style="display:table-cell; vertical-align:middle;width:100%; font-size:15px;color:#454545;">';
              if (topic.description) {
                html  += topic.description;
              }
              html    += '</span>'
                       + '</div>'
                       + '</a>'
                       + '</div>'
                       + '<span class="time" style="margin-top:5px">'
              if (topic.pubTime) {
                html  += topic.pubTime;
              }
                       + '</span>'
                       + '</div>'
                       + '</li>';
            }
            $('#row').append(html);
            page++;
          } else {
            loadAll = true;
            $('#loading').hide();
            $('#loadall').show();
          }
          doLoading = false;
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
};

var page = 1;
var doLoading = false;
var loadAll = false;

$('#loading').show();

$(document).ready(function(){

  $('#list').on('touchstart', '.cmt-list', function(event){
    $(this).css("background", "#ccd2df");
    $(this).children("img").css("opacity", 0.7);
  });

  $(document).on('touchend', 'body', function(event){
    $('.cmt-list').css("background", "");
    $('.cmt-list').children("img").css("opacity", 1);
  });

  $(document).on('touchmove', 'body', function(event){
    $('.cmt-list').css("background", "");
    $('.cmt-list').children("img").css("opacity", 1);
  });

  $(window).scroll(function() {
    loadData();
  });

});
