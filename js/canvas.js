let canvas = document.getElementById('canvas');
canvas.allowSelection = true;
canvas.allowPanDragging = false;
canvas.allowZoomIn = false;
canvas.allowZoomOut = false;
canvas.allowPointDelete = false;

canvas.cleanPermissions = function() {
  this.allowSelection = false;
  this.allowPanDragging = false;
  this.allowZoomIn = false;
  this.allowZoomOut = false;
  this.allowPointDelete = false;
}

canvas.zoom = function( e ) {
  // zoom in / out on wheel if Mouse is over canvas
  if( !e.wheelDelta ) {
    if( e === '+' ) scale += 0.25
    else if( e === '-' ) scale -= 0.25
  }
  else scale = e.wheelDelta > 0 ? scale + 0.25 : scale - 0.25;

  // When zooming in or out update canvas offset and push it's center little bit closer
  // to where the Mouse pointer currenlty is.
  // Below factor divides distance from center of vieport to Mouse pointer
  // allowing for more smooth transition:
  let f = 5;

  if( Mouse.x < canvas.width / 2) canvas.offset.x += ( canvas.width / 2 - Mouse.x ) / f
  else canvas.offset.x -= ( Mouse.x - canvas.width / 2 ) / f

  if( Mouse.y < canvas.height / 2) canvas.offset.y += ( canvas.height / 2 - Mouse.y ) / f
  else canvas.offset.y -= ( Mouse.y - canvas.height / 2 ) / f
};

canvas.offset = {
  x: canvas.width,
  y: canvas.height,
  set: function( x, y ) {
    this.x = x;
    this.y = y;
  },
  add: function( x, y ) {
    this.x += x;
    this.y += y;
  },
  log: function() {
    console.log(`canvas offset:
    x: ${this.x}
    y: ${this.y}`)
  }  
};

canvas.addEventListener('wheel', e => {
  canvas.zoom( e )
});

canvas.updateSize = function() {
  this.width = window.innerWidth && document.documentElement.clientWidth
    ? Math.min( window.innerWidth, document.documentElement.clientWidth )
    : window.innerWidth
      || document.documentElement.clientWidth
      || document.getElementsByTagName('body')[0].clientWidth;

  this.height = window.innerHeight && document.documentElement.clientHeight
    ? Math.min(window.innerHeight, document.documentElement.clientHeight)
    : window.innerHeight
      || document.documentElement.clientHeight
      || document.getElementsByTagName('body')[0].clientHeight;
}

canvas.updateSize();

window.addEventListener("resize", canvas.updateSize, false);

canvas.addEventListener('click', () => {
  if( !(32 in keysDown) ) {
    if( canvas.allowZoomIn ) canvas.zoom( '+' )
    else if( canvas.allowZoomOut ) canvas.zoom( '-' )
  }
})

const c = canvas.getContext('2d');