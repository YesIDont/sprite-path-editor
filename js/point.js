const Point = function( x, y ) {
  this.x = x;
  this.y = y;
  // radius
  this.r = 4;
  return this
};

Point.prototype.set = function( x, y ) {
  this.x = x;
  this.y = y;
  return this
}

Point.prototype.add = function( x, y ) {
  this.x += x;
  this.y += y;
  return this
}

Point.prototype.getCanvasPos = function() {
  const { scale } = SETTINGS;
  return {
    x: this.x * scale,
    y: this.y * scale
  }
}

Point.prototype.draw = function( color ) {
  let { x, y } = this.getCanvasPos();

  Draw.circle( x, y, this.r, { fill: color || '#0077ff' } );

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