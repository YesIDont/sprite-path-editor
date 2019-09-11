const Selection = function( parrentReference ) {
  this.mouse = parrentReference;
  this.items = [];

  this.add = function( item ) {
    this.items.push( item );
    return this
  };

  this.clear = function() {
    this.items = [];
    return this
  };

  this.isEmpty = function() {
    return this.items.length <= 0
  };

  this.forEach = function( callback ) {
    this.items.forEach( callback );
    return this
  };

  // Starting point is saved when LMB is down and removed on mouse up.
  // It's used as starting point for mouse selection rectangle on mouse drag.
  this.startingPoint = new Point( 0, 0 );
  this.setStart = function() {
    this.startingPoint.setV( this.mouse.getScaledPos() );
  }

  this.draw = function() {
    const { x, y } = this.mouse.getCanvasPos();
    const p = this.startingPoint.getCanvasPos();

    Draw.rectangle(
      p.x, p.y,
      x - p.x,
      y - p.y,
      {
        stroke: 'rgba( 0, 200, 255, 0.8 )',
        fill: 'rgba( 0, 200, 255, 0.1 )'
      }
    )
  }
};

const Pointer = function() {
  this.x = 0;
  this.y = 0;
  this.xLast = 0;
  this.yLast = 0;
  this.isDown = {
    left: false,
    right: false
  };
  this.selection = new Selection( this );
};

Pointer.prototype.getPos = function( e ) {
  return {
    x: e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
    y: e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop
  }
};

Pointer.prototype.getScaledPos = function() {
  return { 
    x: (this.x - canvas.offset.x) / SETTINGS.scale,
    y: (this.y - canvas.offset.y) / SETTINGS.scale
  }
};

Pointer.prototype.getCanvasPos = function() {
  return {
    x: this.x - canvas.offset.x,
    y: this.y - canvas.offset.y
  }
};

Pointer.prototype.move = function( e ) {
  let a = canvas.allow.actions;
  let selection = this.selection;

  e = e || window.event;
  this.xLast = this.x;
  this.yLast = this.y;

  const { x, y } = this.getPos( e );

  this.x = x;
  this.y = y;

  let isColliding = false
  // check if mouse is coliding with any of points
  // and add those points to hightlight to change their color
  if( loadedImage && ( a.selection || a.pointDelete )) {
    loadedImage.paths.forEach( path => {
      path.points.forEach( point => {
        if( point.isCollidingWithMouse() ) {
          // hightlight point
          point.isHighlighted = true;
          isColliding = true;
          // if left mouse button is clicked also add point to selection
          // if( this.isDown.left ) {
          //   selection.add( point )
          // }
        }
        else {
          point.isHighlighted = false;
        }
      })
    })
  }
  // if( !isColliding && !this.isDown.left ) hightlight.clear();

  // left mouse click events
  if( this.isDown.left ) {
    // draw selection rectangle if selection is enabled
    // if( a.selection ) this.selection.drawSelectionRect();
    // if selection isn't empty and is allowed on canvas than pass mouse coords to selected points
    // if( !s.isEmpty() && a.selection ) {
    //   const { x, y } = this.getScaledPos();
    //   s.items.forEach( i => {
    //     i.add( x, y )
    //   });
    //   // s.items[0].add( x, y );
    // }

    // pan the camera if left mouse button and space bar are down
    // else
    if( 32 in keysDown || a.panDragging ) {
      canvas.offset.x -= ( this.xLast - this.x ) * 0.5;
      canvas.offset.y -= ( this.yLast - this.y ) * 0.5;
    }
  }
};

Pointer.prototype.leftDown = function() {
  this.isDown.left = true;
  this.selection.setStart();
};

Pointer.prototype.leftUp = function() {
  this.isDown.left = false;

  if( this.selection && canvas.allow.actions.pointDelete ) {
    loadedImage.paths[0].points.splice( loadedImage.paths[0].points.findIndex( point => {
      return point.x === this.selection.x && point.y === this.selection.y
    }), 1 )
  }
};

let mouse = new Pointer();

document.addEventListener( "mousemove", () => mouse.move()     );
document.addEventListener( "mouseup",   () => mouse.leftUp()   );
document.addEventListener( "mousedown", () => mouse.leftDown() );