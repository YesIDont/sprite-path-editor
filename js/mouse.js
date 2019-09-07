let mouse = {
  x: 0,
  y: 0,
  xLast: 0,
  yLast: 0,
  isDown: {
    left: false,
    right: false
  },
  getPos: function( e ) {
    return {
      x: e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
      y: e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop
    }
  },
  getScaledPos: function() {
    return {
      x: ( this.x - this.xLast ) / scale,
      y: ( this.y - this.yLast ) / scale
    }
  }
}

function mouseMove( e ) {
  e = e || window.event;
  mouse.xLast = mouse.x;
  mouse.yLast = mouse.y;

  const { x, y } = mouse.getPos( e );

  mouse.x = x;
  mouse.y = y;

  let isColliding = false
  // check if mouse is coliding with any of points
  if( currentImage && !mouse.isDown.left && canvas.allowSelection ) {
    currentImage.paths.forEach( path => {
      path.points.forEach( point => {
        if( point.isCollidingWithMouse() ) {
          selectedPoint = point;
          isColliding = true
        }
      })
    })
  }
  if( !isColliding && !mouse.isDown.left ) selectedPoint = false;

  // left mouse click events
  if( mouse.isDown.left ) {
    if( selectedPoint && canvas.allowSelection ) {
      const { x, y } = mouse.getScaledPos();
      selectedPoint.add( x, y )
    }

    // pan the camera if left mouse button and space bar are down
    else if( 32 in keysDown || canvas.allowPanDragging ) {
      canvas.offset.x -= ( mouse.xLast - mouse.x ) * 0.5;
      canvas.offset.y -= ( mouse.yLast - mouse.y ) * 0.5;
    }
  }
}

function mouseDown() { mouse.isDown.left = true; };
function mouseUp() { mouse.isDown.left = false };

document.addEventListener( "mousemove", mouseMove );
document.addEventListener( "mouseup", mouseUp );
document.addEventListener( "mousedown", mouseDown );