let tools = get.class('tool');
// prevSelection is used to hold the last selected item and unselect it when next item is selected
let prevSelection;
tools.forEach( tool => {
  on( tool, 'click', () => {
    if( prevSelection ) prevSelection.classList.toggle('icon-selected');
    tool.classList.toggle('icon-selected');
    prevSelection = tool;
  })
});

let select = get.class('select')[0];
on( select, 'click', () => canvas.allow('selection'));
// select selection tool at the start
select.classList.toggle('icon-selected');
prevSelection = select;

let deletePoint = get.class('select-remove')[0];
on( deletePoint, 'click', () => canvas.allow('pointDelete'));

let pan = get.class('pan-viewport')[0];
on( pan, 'click', () => canvas.allow('panDragging'));

let zoomIn = get.class('zoom-in')[0];
on( zoomIn, 'click', () => canvas.allow('zoomIn'));

let zoomOut = get.class('zoom-out')[0];
on( zoomOut, 'click', () => canvas.allow('zoomOut'));