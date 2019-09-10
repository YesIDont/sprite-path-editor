const Path = function( points ) {
  this.points = points;
  this.strokeStyle = 'rgba( 0, 150, 255, 0.5 )';
  this.fillStyle = 'rgba( 0, 100, 255, 0.2 )';
};

Path.prototype.draw = function() {
  Draw.polygon( this.points, { /* fill: this.fillStyle, */ stroke: this.strokeStyle });

  this.points.forEach( point =>  point.draw() )

  return this
};