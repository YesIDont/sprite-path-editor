const Pointer = function() {
  this.x =  0;
  this.y = 0;
  this.xLast = 0;
  this.yLast = 0;
  this.isDown = {
    left: false,
    right: false
  };
  this.selection = false;
}

Pointer.prototype.getPos = function( e ) {
  return {
    x: e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
    y: e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop
  }
};

Pointer.prototype.getScaledPos = function() {
  return {
    x: ( this.x - this.xLast ) / SETTINGS.scale,
    y: ( this.y - this.yLast ) / SETTINGS.scale
  }
};

Pointer.prototype.move = function( e ) {
  let a = canvas.allow.actions;
  e = e || window.event;
  this.xLast = this.x;
  this.yLast = this.y;

  const { x, y } = this.getPos( e );

  this.x = x;
  this.y = y;

  let isColliding = false
  // check if mouse is coliding with any of points
  if( loadedImage && !this.isDown.left && ( a.selection || a.pointDelete )) {
    loadedImage.paths.forEach( path => {
      path.points.forEach( point => {
        if( point.isCollidingWithMouse() ) {
          mouse.selection = point;
          isColliding = true
        }
      })
    })
  }
  if( !isColliding && !this.isDown.left ) mouse.selection = false;

  // left mouse click events
  if( this.isDown.left ) {
    if( mouse.selection && a.selection ) {
      const { x, y } = this.getScaledPos();
      mouse.selection.add( x, y )
    }

    // pan the camera if left mouse button and space bar are down
    else if( 32 in keysDown || a.panDragging ) {
      canvas.offset.x -= ( this.xLast - this.x ) * 0.5;
      canvas.offset.y -= ( this.yLast - this.y ) * 0.5;
    }
  }
}

Pointer.prototype.leftDown = function() {
  this.isDown.left = true
};

Pointer.prototype.leftUp = function() {
  this.isDown.left = false;
  if( mouse.selection && canvas.allow.actions.pointDelete ) {
    loadedImage.paths[0].points.splice( loadedImage.paths[0].points.findIndex( point => {
      return point.x === mouse.selection.x && point.y === mouse.selection.y
    }), 1 )
  }
};

let mouse = new Pointer();

document.addEventListener( "mousemove", () => mouse.move()     );
document.addEventListener( "mouseup",   () => mouse.leftUp()   );
document.addEventListener( "mousedown", () => mouse.leftDown() );