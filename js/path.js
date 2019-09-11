const Path = function( points, id, name ) {
  this.id = id || 0;
  this.name = name || '';
  this.points = points;
  this.isSelected = false;
  this.isHighlighted = false;
  this.AABB = this.getAABB();
};

Path.prototype.select = function() {
  this.isSelected = true;
  this.points.forEach( p => p.select() );
  return this
};

Path.prototype.unSelect = function() {
  this.isSelected = false;
  this.points.forEach( p => p.unSelect() );
  return this
};

Path.prototype.getAABB = function() {

  let topLeft = {
    x: this.points[0].x,
    y: this.points[0].y
  };

  let bottomRight = {
    x: this.points[0].x,
    y: this.points[0].y
  };

  this.points.forEach( p => {
    // lowest x and y
    topLeft.x = Math.min( topLeft.x, p.x );
    topLeft.y = Math.min( topLeft.y, p.y );

    // hightest x and y
    bottomRight.x = Math.max( bottomRight.x, p.x );
    bottomRight.y = Math.max( bottomRight.y, p.y );
  });

  return new AABB(
    topLeft.x,
    topLeft.y,
    // width
    bottomRight.x - topLeft.x,
    // height
    bottomRight.y - topLeft.y    
  )
}

Path.prototype.draw = function() {
  let color;

  if( this.isSelected )  color = { stroke: SETTINGS.colors.path.selected.stroke }

  else if( this.isHighlighted ) color = { stroke: SETTINGS.colors.path.highlighted.stroke }

  else color = { stroke: SETTINGS.colors.path.idle.stroke }

  this.AABB.draw();

  Draw.polygon( this.points, color );

  this.points.forEach( point =>  point.draw() )

  return this
};