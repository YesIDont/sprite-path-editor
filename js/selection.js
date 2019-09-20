const Selection = function( parrentReference ) {
  this.mouse = parrentReference;
  this.items = [];

  this.add = function( item ) {
    this.items.push( item );
    return this
  };

  this.remove = function( beingRemoved ) {
    let index = this.items.findIndex( i => {
      if( i.type === 'path') {
        return i.id === beingRemoved.id && i.type === beingRemoved.type        
      }
      else {
        return i.id === beingRemoved.id
          && i.type === beingRemoved.type
            && i.parent.id === beingRemoved.parent.id
      }
    })

    this.items.splice( index, 1 );
  };

  this.clear = function() {
    this.items = [];
    return this
  };

  this.removeSelected = function() {
    this.items.forEach( i => {
      // remove element from UI paths list
      if( i.type === 'path' ) {
        get(`.path.id-${ i.id }`)[ 0 ].remove()

      }
      else {
        get(`.path.id-${ i.parent.id } .point.id-${ i.id }`)[ 0 ].remove()
      }
      i.remove()
    })
    this.clear()
  }

  this.isEmpty = function() {
    return this.items.length <= 0
  };

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