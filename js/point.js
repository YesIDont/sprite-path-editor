const Point = function( x, y ) {
  this.x = x;
  this.y = y;
  // radius
  this.r = 3;
  this.stroke = '#0077ff';
  this.fill = false;
  return this
};

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
  const { scale } = SETTINGS;
  return {
    x: this.x * SETTINGS.scale,
    y: this.y * SETTINGS.scale
  }
}

Point.prototype.draw = function() {
  const { stroke, fill } = this;
  const { x, y } = this.getCanvasPos();
  let color;

  if( fill ) color = { stroke, fill }
  else color = { stroke }

  Draw.circle( x, y, this.r, color );

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