canvas.on( 'click', function() {
  let { single } = mouse.selection;
  let { selection, pointDelete } = canvas.allow.actions;

  // if mouse isn't colliding with anything remove selection
  if( !mouse.isColliding
    && canvas.allow.actions.selection
    && !( 32 in keysDown )) {
    mouse.selection.single = undefined;
    mouse.selection.items.forEach( function( i ) {
      i.unSelect();
    });
    get('#select-all')[0].checked = false;
    Array.from( pathsList.children ).forEach( i => {
      i.getElementsByClassName('selection')[0].checked = false
    });
    mouse.selection.clear();
  }

  if( selection && mouse.isColliding && single ) {
     if( single.isSelected ) {
      single.isSelected = false;
      single.unselectUI();
      mouse.selection.remove( single )
     }
     else {
      single.isSelected = true;
      single.selectUI();
      mouse.selection.add( single )
     }
  }

  if( pointDelete && single !== undefined && !( 32 in keysDown )) {
    single.removeFromUI();
    single.remove();
  }
})

canvas.on( 'mousedown', function( e ) {
  if( !(32 in keysDown )
    && e.target.id === 'canvas'
      && canvas.allow.actions.selection ) mouse.selection.start();
});

canvas.on( "mouseup", function() {
  mouse.selection.end();
});

canvas.on( 'mousemove', function() {

  let { actions } = canvas.allow;
  
  // check if mouse is coliding with any of points
  // and add those points to hightlight to change their color
  mouse.isColliding = false
  if( loadedImage && ( actions.selection || actions.pointDelete )) {
    loadedImage.paths.forEach( path => {
      path.points.forEach( point => {
        if( point.isCollidingWithMouse() ) {
          point.isHighlighted = true;
          mouse.isColliding = true;
          mouse.selection.single = point;
        }
        else {
          point.isHighlighted = false;
        }
      })
    })
  }  
  // clear single selection if there was no collision
  if( !mouse.isColliding ) mouse.selection.single = undefined;

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
    if( 32 in keysDown || actions.panDragging ) {
      canvas.offset.x -= ( mouse.xLast - mouse.x ) * 0.5;
      canvas.offset.y -= ( mouse.yLast - mouse.y ) * 0.5;
    }
  }
});