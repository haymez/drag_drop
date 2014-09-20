
var DragDrop = function(callback) {

  var dragging         = false;
  var currentSelection = null;
  var oldDropZone      = null;
  var touchstart       = null;
  var lastMove         = null;

  var drag = document.createElement('div');
  drag.className = 'placeholder draggable hidden';
  drag.id = 'drag';
  document.body.appendChild(drag);

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

    if(drag.className.indexOf('hidden') > -1) drag.classList.toggle('hidden');
    if(drag.childNodes.length == 0) drag.appendChild(currentSelection.cloneNode());
    drag.lastChild.innerHTML = currentSelection.innerHTML;
    drag.style.left = evt.pageX - (drag.offsetWidth/2) + 'px';
    drag.style.top = evt.pageY - (drag.offsetHeight/2) + 'px';
  }

  var moveElement = function(evt) {
    clearTimeout(touchstart);
    touchstart = null;
    if(dragging) {
      lastMove = {x: evt.pageX, y: evt.pageY};
      evt.preventDefault();
      drag.style.left = evt.pageX - (drag.offsetWidth/2) + 'px';
      drag.style.top = evt.pageY - (drag.offsetHeight/2) + 'px';
    }
  }
  
  var dropElement = function(evt) {
    if(dragging) {
      var dropped = isWithin(lastMove);
      // var dropped = isWithin({x: evt.pageX, y: evt.pageY})
      if(dropped) {
        callback.call(this, {from: oldDropZone, to: dropped, item: currentSelection})
      }
      document.getElementById('drag').classList.toggle('hidden');
    }
    drag.innerHTML = '';
    currentSelection = null;
    dragging = false;
  }

  var touchStart = function(evt) {
    var curr = evt.target;
    if(curr.className.indexOf('draggable') > -1) {
      // Hold finger for 250 ms to make element movable
      if(!touchstart) touchstart = setTimeout(function() {
        mouseDown(evt);
      }, 250);
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