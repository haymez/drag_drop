

var btn = document.getElementById('editButton');

btn.addEventListener('click', function() {
  var list = document.getElementsByClassName('icon')
  for(var i = 0; i < list.length; i++) {
    list[i].classList.toggle('jiggly');
    list[i].classList.toggle('draggable');
  }
});

var fn = function(opts) {
  opts.to.appendChild(opts.item);
}
var instance = new DragDrop(fn); //Initialize class DragDrop()