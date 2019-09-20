let canvas = get.id('canvas');

canvas.allow = function( action ) {
  // this returns allow object
  this.allow.actions.clearPermissions();
  this.allow.actions[ action ] = true;
};
canvas.allow.actions = {
  selection: true,
  panDragging: false,
  zoomIn: false,
  zoomOut: false,
  pointDelete: false,
  clearPermissions: function() {
    this.selection = false;
    this.panDragging = false;
    this.zoomIn = false;
    this.zoomOut = false;
    this.pointDelete = false;
  }
};

canvas.zoom = function( e ) {
  // zoom in / out on wheel if mouse is over canvas
  if( !e.wheelDelta && !e.deltaY ) {
    if( e === '+' ) SETTINGS.scale += 0.25
    else if( e === '-' ) SETTINGS.scale -= 0.25
  }
  else {
    if( e.wheelDelta ) {
      SETTINGS.scale = e.wheelDelta > 0 ? SETTINGS.scale + 0.25 : SETTINGS.scale - 0.25;
    }
    else if( e.deltaY ) {
      SETTINGS.scale = e.deltaY < 0 ? SETTINGS.scale + 0.25 : SETTINGS.scale - 0.25;
    }
  }

  // When zooming in or out update canvas offset and push it's center little bit closer
  // to where the mouse pointer currenlty is.
  // Below factor divides distance from center of vieport to mouse pointer
  // allowing for more smooth transition:
  let f = 5;

  if( mouse.x < canvas.width / 2) canvas.offset.x += ( canvas.width / 2 - mouse.x ) / f
  else canvas.offset.x -= ( mouse.x - canvas.width / 2 ) / f

  if( mouse.y < canvas.height / 2) canvas.offset.y += ( canvas.height / 2 - mouse.y ) / f
  else canvas.offset.y -= ( mouse.y - canvas.height / 2 ) / f
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

on( canvas, 'wheel', e => canvas.zoom( e ));

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

on( window, "resize", canvas.updateSize, false);

on( canvas, 'click', function(){
  if( !(32 in keysDown) ) {
    if( canvas.allow.actions.zoomIn ) canvas.zoom( '+' )
    else if( canvas.allow.actions.zoomOut ) canvas.zoom( '-' )
  }
})

const c = canvas.getContext('2d');