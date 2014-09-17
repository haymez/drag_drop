

var btn = document.getElementById('editButton');

btn.addEventListener('click', function() {
  var list = document.getElementsByClassName('draggable')
  for(var i = 0; i < list.length; i++) {
    list[i].classList.toggle('jiggly');
  }
});

var instance = new DragDrop(); //Initialize class DragDrop()