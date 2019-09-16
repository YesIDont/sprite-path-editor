const Point = function( x, y ) {
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

Point.prototype.draw = function() {
  if( !this.isVisible ) return

  const { x, y } = this.getCanvasPos();
  let color, r = this.r;

  if( this.isSelected && this.isHighlighted ) {
    r = 4;
    color = {
      stroke: SETTINGS.colors.point.selected.stroke,
      fill: SETTINGS.colors.point.selected.fill
    }
  }
  else if( this.isSelected ) {
    color = {
      stroke: SETTINGS.colors.point.selected.stroke,
      fill: SETTINGS.colors.point.selected.fill
    }
  }
  else if( this.isHighlighted ) {
    r = 4;
    color = {
      stroke: SETTINGS.colors.point.highlighted.stroke,
      fill: SETTINGS.colors.point.highlighted.fill
    }
  }
  
  else {
    color = { stroke: SETTINGS.colors.point.idle.stroke }
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