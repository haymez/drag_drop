#Drag Drop
A minimalist JavaScript framework for handling drag and drop.

Supports mobile touch events. 

##What does it do?
Not much. 

*dragDrop.js* listens for events on all elements that have the class *draggable*. These elements can be moved freely about the page. If they are dropped in an element with class *drop-zone*, a callback is called. This callback is passed a single object containing the element that was dragged (*item*), the element that *item* came from (*old*) and the element that *item* was dropped into (*new*).

That's pretty much it.

##Sample Code
```javascript
var fn = function(opts) {
  opts.to.appendChild(opts.item);
}
var instance = new DragDrop(fn); //Initialize DragDrop()
```

This would simply append the moved item into the element that it was dropped on.
