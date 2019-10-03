const Point = function( x, y, id, color, parent ) {
  this.parent = parent;
  this.id = id;
  this.type = 'point';
  this.name = `Point ${id}`
  this.x = x || 0;
  this.y = y || 0;
  // radius
  this.r = 2.5;
  this.isSelected = false;
  this.isHighlighted = false;
  this.isVisible = true;
  this.ui = ListItem( this, color )
  return this
};

Point.prototype.remove = function() {
  this.ui.li.remove()
  mouse.selection.remove( this )

  this.parent.points = this.parent.points.filter( p => p.id !== this.id )
  this.parent.removeHalfSelection()
  this.parent.updatePointsNumber()
  if( this.parent.points.length < 1 ) this.parent.remove()
}

Point.prototype.check = function() {
  this.ui.selection.checked = true;
  return this
}

Point.prototype.unCheck = function() {
  this.ui.selection.checked = false
  return this
}

Point.prototype.select = function() {
  this.isSelected = true
  this.check()
  mouse.selection.add( this )

  let parent = this.parent
  if( parent.hasAllSelected() && !parent.isSelected ) {
    parent.select( 'skipAllPoints' )
    parent.removeHalfSelection()
  }
  else parent.setHalfSelection()

  return this
}

Point.prototype.unSelect = function() {
  this.isSelected = false;
  this.unCheck()
  mouse.selection.remove( this )

  this.parent.unSelect( 'skipAllPoints' )
  if( this.parent.hasSomeSelected()) this.parent.setHalfSelection()
  else this.parent.removeHalfSelection()
  
  return this
}

Point.prototype.show = function() {
  this.isVisible = true;
  this.ui.visibility.checked = false
  this.parent.show( 'skipAllPoints' )
  return this
}

Point.prototype.hide = function() {
  this.isVisible = false;
  this.ui.visibility.checked = true
  if( this.parent.points.every( p => !p.isVisible )) this.parent.hide( 'skipAllPoints' )
  return this
}

Point.prototype.set = function( x, y ) {
  this.x = x;
  this.y = y;
  return this
}

// alternative allow to set with object containing x and y props
Point.prototype.setV = function( v ) {
  this.x = v.x;
  this.y = v.y;
  return this
}

Point.prototype.add = function( x, y ) {
  this.x += x;
  this.y += y;
  return this
}

// alternative allow to add with object containing x and y props
Point.prototype.addV = function( v ) {
  this.x += v.x;
  this.y += v.y;
  return this
}

Point.prototype.getCanvasPos = function() {
  return {
    x: this.x * SETTINGS.scale,
    y: this.y * SETTINGS.scale
  }
}

Point.prototype.draw = function( customColor ) {
  if( !this.isVisible ) return

  const { x, y } = this.getCanvasPos();
  let r = this.r;

  if( this.isHighlighted ) r = 5;

  if( this.isSelected ) {
    Draw.circle( x, y, r + 1, {
      stroke: customColor ? customColor.stroke : SETTINGS.colors.point.selected.stroke,
      fill: SETTINGS.colors.point.selected.fill
    });
    // Draw.circle( x, y, r - 1, {
    //   stroke: customColor ? customColor.stroke : SETTINGS.colors.point.stroke,
    //   // fill: SETTINGS.colors.point.selected.stroke
    //   fill: 'rgb( 255, 255, 255 )'
    // });
  }
  else if( this.isHighlighted ) {
    Draw.circle( x, y, r, {
      stroke: customColor ? customColor.stroke : SETTINGS.colors.point.stroke,
      fill: SETTINGS.colors.point.fill
    });    
  }
  else {
    Draw.circle( x, y, r, {
      stroke: customColor ? customColor.stroke : SETTINGS.colors.point.stroke,
      // fill: SETTINGS.colors.point.fill
    });
  }

  return this
};

Point.prototype.isCollidingWithMouse = function() {
  // calculate point's position in relation to inner window

  // point's coords
  let pos = this.getCanvasPos();
  pos.x += canvas.offset.x + (get.window.width() - canvas.width);
  pos.y += canvas.offset.y;

  // return bool indicating if Mouse position collides with point
  return this.r > get.twoPointsDistance( mouse, pos )
}

Point.prototype.isCollidingRectangle = function( r, offset ) {
  return isPointRectColliding( this, r, offset );
}