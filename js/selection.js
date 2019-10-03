const Selection = function( parrentReference ) {
  this.mouse = parrentReference;
  this.items = [];

  this.add = function( item ) {
    this.items.push( item );
    return this
  };

  this.remove = function( pointBeingRemoved ) {
    let b = pointBeingRemoved

    this.items = this.items.filter( a => a.parent.id !== b.parent.id || a.id !== b.id )
  };

  this.clear = function() {
    this.items = [];
    return this
  };

  this.isEmpty = function() { return this.items.length < 1 };

  this.removeSelected = function() {
    this.items.forEach( i => i.remove())
  }

  this.forEach = function( callback ) {
    this.items.forEach( callback );
    return this
  };

  // Starting point is saved when LMB is down and removed on mouse up.
  // It's used as starting point for mouse selection rectangle on mouse drag.
  this.startingPoint = new Point( 0, 0 );
  this.isSelecting = false;
  this.start = function() {
    this.isSelecting = true;
    this.startingPoint.setV( this.mouse.getScaledPos());
  };
  this.end = function() { this.isSelecting = false };

  this.draw = function() {
    const { x, y } = this.mouse.getCanvasPos();
    const p = this.startingPoint.getCanvasPos();

    Draw.rectangle(
      p.x, p.y,
      x - p.x,
      y - p.y,
      {
        stroke: 'rgba( 0, 200, 255, 0.8 )',
        fill: 'rgba( 0, 200, 255, 0.1 )'
      }
    )
  }

  // single selection is used for items mouse is hovering over
  this.single = undefined;
};