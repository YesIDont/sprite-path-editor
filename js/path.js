const Path = function( points, id, name ) {
  this.type = 'path'; // path
  // reference to parent object
  this.parent = {};
  this.id = id || 0;
  this.name = name || '';
  this.points = points;
  this.color = randomRGB();
  this.isSelected = false;
  this.isHighlighted = false;
  this.isVisible = true;
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

Path.prototype.show = function() {
  this.isVisible = true;
  this.points.forEach( p => p.show() );
  return this
};

Path.prototype.hide = function() {
  this.isVisible = false;
  this.points.forEach( p => p.hide() );
  return this
};

Path.prototype.remove = function() {
  let index = this.parent.findIndex( i => i.id === this.id );
  this.parent.splice( index, 1 );
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
  if( !this.isVisible ) return

  let color;

  if( this.isSelected )  color = { stroke: SETTINGS.colors.path.selected.stroke }

  else if( this.isHighlighted ) color = { stroke: SETTINGS.colors.path.highlighted.stroke }

  else color = { stroke: SETTINGS.overridePathsColors ? SETTINGS.colors.path.idle.stroke : this.color }

  this.AABB.draw();

  Draw.polygon( this.points, color );

  this.points.forEach( point =>  point.draw( color ) )

  return this
};