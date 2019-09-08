const Pointer = function() {
  this.x =  0;
  this.y = 0,
  this.xLast = 0,
  this.yLast = 0,
  this.isDown = {
    left: false,
    right: false
  }
}

Pointer.prototype.getPos = function( e ) {
  return {
    x: e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
    y: e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop
  }
};

Pointer.prototype.getScaledPos = function() {
  return {
    x: ( this.x - this.xLast ) / scale,
    y: ( this.y - this.yLast ) / scale
  }
};

Pointer.prototype.move = function( e ) {
  e = e || window.event;
  this.xLast = this.x;
  this.yLast = this.y;

  const { x, y } = this.getPos( e );

  this.x = x;
  this.y = y;

  let isColliding = false
  // check if Mouse is coliding with any of points
  if( currentImage && !this.isDown.left && ( canvas.allowSelection || canvas.allowPointDelete )) {
    currentImage.paths.forEach( path => {
      path.points.forEach( point => {
        if( point.isCollidingWithMouse() ) {
          selectedPoint = point;
          isColliding = true
        }
      })
    })
  }
  if( !isColliding && !this.isDown.left ) selectedPoint = false;

  // left Mouse click events
  if( this.isDown.left ) {
    if( selectedPoint && canvas.allowSelection ) {
      const { x, y } = this.getScaledPos();
      selectedPoint.add( x, y )
    }

    // pan the camera if left Mouse button and space bar are down
    else if( 32 in keysDown || canvas.allowPanDragging ) {
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
  if( selectedPoint && canvas.allowPointDelete ) {
    currentImage.paths[0].points.splice( currentImage.paths[0].points.findIndex( point => {
      return point.x === selectedPoint.x && point.y === selectedPoint.y
    }), 1 )
  }
};

let Mouse = new Pointer();

document.addEventListener( "mousemove", () => Mouse.move()     );
document.addEventListener( "mouseup",   () => Mouse.leftUp()   );
document.addEventListener( "mousedown", () => Mouse.leftDown() );