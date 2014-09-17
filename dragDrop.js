
var DragDrop = function() {

  var dragging = false;
  var currentSelection = null;


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
    currentSelection = curr;
    dragging = true;
  });



  document.addEventListener('mousemove', function(evt) {
    if(dragging) {
      evt.preventDefault();
      var drag = document.getElementById('drag');
      if(drag.className.indexOf('hidden') > -1) drag.classList.toggle('hidden');
      if(drag.childNodes.length == 0) drag.appendChild(currentSelection.cloneNode());
      drag.lastChild.innerHTML = currentSelection.innerHTML;
      drag.style.left = evt.pageX - (drag.offsetWidth/2) + 'px';
      drag.style.top = evt.pageY - (drag.offsetHeight/2) + 'px';
    }
  })

  document.addEventListener('mouseup', function(evt) {
    var drag = document.getElementById('drag');
    if(dragging) {
      var dropped = isWithin({x: evt.pageX, y: evt.pageY})
      if(dropped) {
        dropped.appendChild(currentSelection);
      }
      else console.log("don't move");
      document.getElementById('drag').classList.toggle('hidden');
    }
    drag.innerHTML = '';
    currentSelection = null;
    dragging = false;
  }); 
}