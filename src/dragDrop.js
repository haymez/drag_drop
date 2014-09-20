
var DragDrop = function(callback) {

  var dragging         = false;
  var currentSelection = null;
  var oldDropZone      = null;
  var touchstart       = null;
  var lastMove         = null;

  var isWithin = function(needle) {
    var list = document.getElementsByClassName('drop-zone');
    for(var i = 0; i < list.length; i++) {
      var top = list[i].offsetTop;
      var left = list[i].offsetLeft;
      if(needle.x > left && needle.x < (left + list[i].offsetWidth) &&
    needle.y > top && needle.y < (top + list[i].offsetHeight)) return list[i];
    }
    return false;
  }

  var mouseDown = function(evt) {
    var curr = evt.target;
    if(curr.className.indexOf('draggable') == -1) return;
    oldDropZone      = curr.parentElement;
    currentSelection = curr;
    dragging         = true;

    var shadowSize = currentSelection.offsetWidth * .15;
    currentSelection.classList.toggle('placeholder');
    currentSelection.style.boxShadow = shadowSize + 'px ' + shadowSize + 'px ' + shadowSize + 'px ' + '#888888';
    currentSelection.style.left = evt.pageX - (currentSelection.offsetWidth/2) + 'px';
    currentSelection.style.top = evt.pageY - (currentSelection.offsetHeight/2) + 'px';
  }

  var moveElement = function(evt) {
    clearTimeout(touchstart);
    touchstart = null;
    if(dragging) {
      lastMove = {x: evt.pageX, y: evt.pageY};
      evt.preventDefault();
      currentSelection.style.left = evt.pageX - (currentSelection.offsetWidth/2) + 'px';
      currentSelection.style.top = evt.pageY - (currentSelection.offsetHeight/2) + 'px';
    }
  }
  
  var dropElement = function(evt) {
    if(dragging) {
      var dropped = isWithin(lastMove);
      // var dropped = isWithin({x: evt.pageX, y: evt.pageY})
      if(dropped) {
        callback.call(this, {from: oldDropZone, to: dropped, item: currentSelection})
      }
      currentSelection.classList.toggle('placeholder');
      currentSelection.style.boxShadow = '';
    }
    currentSelection = null;
    dragging = false;
  }

  var touchStart = function(evt) {
    var curr = evt.target;
    if(curr.className.indexOf('draggable') > -1) {
      // Hold finger for 250 ms to make element movable
      if(!touchstart) touchstart = setTimeout(function() {mouseDown(evt);}, 250);
    }
  }

  var touchEnd = function(evt) {
    if(dragging) {
      dropElement(lastMove);
      clearTimeout(touchstart);
      touchstart = null;
    }
  }

  // Events to listen for...
  document.addEventListener('mousedown'  , function(evt) {  mouseDown(evt);    });
  document.addEventListener('mousemove'  , function(evt) {  moveElement(evt);  });
  document.addEventListener('mouseup'    , function(evt) {  dropElement(evt);  });
  document.addEventListener('touchstart' , function(evt) {  touchStart(evt);   });
  document.addEventListener('touchend'   , function(evt) {  touchEnd(evt);     });
  document.addEventListener('touchmove'  , function(evt) {  moveElement(evt);  });
}