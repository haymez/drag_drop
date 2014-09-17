
var DragDrop = function(callback) {

  var dragging         = false;
  var currentSelection = null;
  var oldDropZone      = null;
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


  // For all draggable elements
  document.addEventListener('mousedown', function(evt) {
    var curr = evt.target;
    if(curr.className.indexOf('draggable') == -1 ||
      curr.className.indexOf('jiggly') == -1) return;
    oldDropZone      = evt.target.parentElement;
    currentSelection = curr;
    dragging         = true;
  });



  document.addEventListener('mousemove', function(evt) {
    if(dragging) {
      evt.preventDefault();
      if(drag.className.indexOf('hidden') > -1) drag.classList.toggle('hidden');
      if(drag.childNodes.length == 0) drag.appendChild(currentSelection.cloneNode());
      drag.lastChild.innerHTML = currentSelection.innerHTML;
      drag.style.left = evt.pageX - (drag.offsetWidth/2) + 'px';
      drag.style.top = evt.pageY - (drag.offsetHeight/2) + 'px';
    }
  })

  document.addEventListener('mouseup', function(evt) {
    if(dragging) {
      var dropped = isWithin({x: evt.pageX, y: evt.pageY})
      if(dropped) {
        callback.call(this, {from: oldDropZone, to: dropped, item: currentSelection})
      }
      document.getElementById('drag').classList.toggle('hidden');
    }
    drag.innerHTML = '';
    currentSelection = null;
    dragging = false;
  }); 
}