let tools = get.class('tool');
// prevSelection is used to hold the last selected item and unselect it when next item is selected
let prevSelection;
tools.forEach( tool => {
  tool.on('click', () => {
    if( prevSelection ) prevSelection.classList.toggle('ico-selected');
    tool.classList.toggle('ico-selected');
    prevSelection = tool;
  })
});

let select = get.class('select')[0];
select.on('click', function() {
  canvas.allow('selection');
  canvas.className = '';
});
// select selection tool at the start
select.classList.toggle('ico-selected');
prevSelection = select;

get.class('select-remove')[0].on('click', function() {
  canvas.allow('pointDelete');
});

get.class('pan-viewport')[0].on('click', function() {
  canvas.allow('panDragging');
  canvas.className = 'cursor-move';
});

get.class('zoom-in')[0].on('click', function() {
  canvas.allow('zoomIn');
  canvas.className = 'cursor-zoom-in';
});

get.class('zoom-out')[0].on('click', function(){
  canvas.allow('zoomOut');
  canvas.className = 'cursor-zoom-out';
});