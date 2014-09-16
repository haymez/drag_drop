// Code for rate plan

var btn = $('#editButton');

btn.click(function() {
  $(this).toggleClass('active')
  $('.icon').each(function(index) {
    $(this).toggleClass('jiggly');
  });
});

var isWithin = function(needle, haystack) {
  var left = Number(needle.css('left').replace('px', ''));
  var top = Number(needle.css('top').replace('px', ''));
  return  top > haystack.offset().top &&
          top < (haystack.offset().top + haystack.height()) &&
          left > haystack.offset().left &&
          left < (haystack.offset().left + haystack.width())
}

var dragging = false;
var currentSelection = null;
$('.icon').on('mousedown', function(evt) {
  if(this.className.indexOf('jiggly') == -1) return;
  currentSelection = $(this);
  dragging = true;
});

$(document).on('mouseup', function() {
  if(dragging) {
    $('#drag').addClass('hidden')
    if(isWithin($('#drag'), $('#room2'))) {
      $('#room2').append($(currentSelection));
    }
    else if(isWithin($('#drag'), $('#room1')))
      $('#room1').append($(currentSelection));
  }
  currentSelection = null;
  dragging = false;
    
})

$('.icon').on('mousemove', function(evt) {
  if(dragging) {
    var draggable = $('#drag');
    draggable.html($(this).html());
    draggable.removeClass('hidden');
    draggable.css({
      left:     evt.pageX - 50,
      top:      evt.pageY - 50
    });
  }
});