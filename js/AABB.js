const AABB = function( x, y, w, h ) {
  this.x = x || 0;
  this.y = y || 0;
  this.w = w || 0;
  this.h = h || 0;
};

AABB.prototype.draw = function( color ) {
  Draw.rectangle(
    this.x * SETTINGS.scale,
    this.y * SETTINGS.scale,
    this.w * SETTINGS.scale,
    this.h * SETTINGS.scale,
    color || { stroke: SETTINGS.colors.AABB.stroke }
  )
};