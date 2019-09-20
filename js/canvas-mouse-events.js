on( canvas, 'mousedown', function( e ) {
  if( !(32 in keysDown )
    && e.target.id === 'canvas'
      && canvas.allow.actions.selection ) mouse.selection.start()
});

on( canvas, "mouseup", function() {
  // if( mouse.selection && canvas.allow.actions.pointDelete ) {
  //   loadedImage.paths[0].points.splice( loadedImage.paths[0].points.findIndex( point => {
  //     return point.x === mouse.selection.x && point.y === mouse.selection.y
  //   }), 1 )
  // }
  mouse.selection.end();
});

on( canvas, 'move', function() {

  let { actions } = canvas.allow;
  
  // check if mouse is coliding with any of points
  // and add those points to hightlight to change their color
  let isColliding = false
  if( loadedImage && ( actions.selection || actions.pointDelete )) {
    loadedImage.paths.forEach( path => {
      path.points.forEach( point => {
        if( point.isCollidingWithMouse() ) {
          point.isHighlighted = true;
          isColliding = true;
        }
        else {
          point.isHighlighted = false;
        }
      })
    })
  }

  // left mouse click events
  if( mouse.isDown.left ) {
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
      canvas.offset.x -= ( mouse.xLast - mouse.x ) * 0.5;
      canvas.offset.y -= ( mouse.yLast - mouse.y ) * 0.5;
    }
  }
});