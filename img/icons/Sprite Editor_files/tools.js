let tools = get.class('tool');
// prevSelection is used to hold the last selected item and unselect it when next item is selected
let prevSelection;
tools.forEach( tool => {
  tool.on('click', () => {
    if( prevSelection ) prevSelection.classList.toggle('icon-selected');
    tool.classList.toggle('icon-selected');
    prevSelection = tool;
  })
});

let select = get.class('select')[0];
select.on('click', () => canvas.allow('selection'));
// select selection tool at the start
select.classList.toggle('icon-selected');
prevSelection = select;

let deletePoint = get.class('select-remove')[0];
deletePoint.on('click', () => canvas.allow('pointDelete'));

let pan = get.class('pan-viewport')[0];
pan.on('click', () => canvas.allow('panDragging'));

let zoomIn = get.class('zoom-in')[0];
zoomIn.on('click', () => canvas.allow('zoomIn'));

let zoomOut = get.class('zoom-out')[0];
zoomOut.on('click', () => canvas.allow('zoomOut'));