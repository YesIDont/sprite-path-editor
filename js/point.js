const Point = function( x, y, parent ) {
  this.parent = parent || undefined;
  this.id = undefined;
  this.type = 'point'; // point
  this.x = x || 0;
  this.y = y || 0;
  // radius
  this.r = 2.5;
  this.isSelected = false;
  this.isHighlighted = false;
  this.isVisible = true;
  return this
};

Point.prototype.select = function() {
  this.isSelected = true;
  return this
}

Point.prototype.unSelect = function() {
  this.isSelected = false;
  return this
}

Point.prototype.show = function() {
  this.isVisible = true;
  return this
}

Point.prototype.hide = function() {
  this.isVisible = false;
  return this
}

Point.prototype.remove = function() {
  let index = this.parent.points.findIndex( p => p.id === this.id );
  this.parent.points.splice( index, 1 );
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
  let color, r = this.r;

  if( this.isHighlighted ) r = 5;

  if( this.isSelected ) {
    color = {
      stroke: customColor ? customColor.stroke : SETTINGS.colors.point.stroke,
      fill: SETTINGS.colors.point.selected.fill
    }
  }
  
  else {
    color = {
      stroke: customColor ? customColor.stroke : SETTINGS.colors.point.stroke,
      fill: SETTINGS.colors.point.fill
    }
  }

  Draw.circle( x, y, r, color );

  return this
};

Point.prototype.isCollidingWithMouse = function() {
  // calculate point's position in relation to inner window

  // point's coords
  let pos = this.getCanvasPos();
  pos.x += canvas.offset.x + (utils.get.window.width() - canvas.width);
  pos.y += canvas.offset.y;

  // return bool indicating if Mouse position collides with point
  return this.r > utils.compute.twoPointsDistance( mouse, pos )
}

Point.prototype.isCollidingRectangle = function( r, offset ) {
  return isPointRectColliding( this, r, offset );
}