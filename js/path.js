const Path = function( coordintates, id, parent ) {
  this.type = 'path';
  this.parent = parent;
  this.id = id || 0;
  
  let color = randomRGB()
  this.stroke = color
  this.fill = color.replace(
    /\d{1,3}\, 1 \)/,
    '125, 0.3 )'
  )
  
  this.isSelected = false
  this.isHighlighted = false
  this.isVisible = true

  this.ui = ListItem( this, color )

  // add points listing
  let pointsList = ul({ class: 'points' });
  this.points = coordintates.map(( p, i ) => {
    let point = new Point( p.x, p.y, i, color, this )
    wait(
      () => point.ui !== undefined,
      () => pointsList.appendChild( point.ui.li )
    )
    return point
  })
  this.ui.li.appendChild( pointsList );

  this.AABB = this.getAABB()
  this.updatePointsNumber()
}

Path.prototype.hasAllSelected = function() {
  return this.points.every( p => p.isSelected )
}

Path.prototype.hasSomeSelected = function() {
  return this.points.some( p => p.isSelected )
}

Path.prototype.hasNoneSelected = function() {
  return this.points.every( p => !p.isSelected )
}

Point.prototype.check = function() {
  this.ui.selection.checked = true;
  return this
}

Point.prototype.unCheck = function() {
  this.ui.selection.checked = false
  return this
}

Path.prototype.setHalfSelection = function() {
  this.ui.selection.className = 'switch selection half-selected'
  return this
}

Path.prototype.removeHalfSelection = function() {
  this.ui.selection.className = 'switch selection'
  return this
}

Path.prototype.select = function( skipAllPoints ) {
  this.isSelected = true
  this.ui.selection.checked = true;
  // mouse.selection.add( this )
  if( !skipAllPoints ) this.points.forEach( p => p.select() )
  this.removeHalfSelection()
  return this
}

Path.prototype.unSelect = function( skipAllPoints ) {
  this.isSelected = false
  this.ui.selection.checked = false
  // mouse.selection.remove( this )
  if( !skipAllPoints ) this.points.forEach( p => p.unSelect() )
  this.removeHalfSelection()
  return this
}

Path.prototype.show = function( skipAllPoints ) {
  this.isVisible = true
  this.ui.visibility.checked = false
  if( !skipAllPoints ) this.points.forEach( p => p.show() )
  return this
}

Path.prototype.hide = function( skipAllPoints ) {
  this.isVisible = false
  this.ui.visibility.checked = true
  if( !skipAllPoints ) this.points.forEach( p => p.hide() )
  return this
}

Path.prototype.remove = function() {
  this.ui.li.remove()
  this.parent.paths = this.parent.paths.filter( i => i.id !== this.id )
}

Path.prototype.getAABB = function() {

  let topLeft = {
    x: this.points[0].x,
    y: this.points[0].y
  }

  let bottomRight = {
    x: this.points[0].x,
    y: this.points[0].y
  }

  this.points.forEach( p => {
    // lowest x and y
    topLeft.x = Math.min( topLeft.x, p.x )
    topLeft.y = Math.min( topLeft.y, p.y )

    // hightest x and y
    bottomRight.x = Math.max( bottomRight.x, p.x )
    bottomRight.y = Math.max( bottomRight.y, p.y )
  })

  return new AABB(
    topLeft.x,
    topLeft.y,
    // width
    bottomRight.x - topLeft.x,
    // height
    bottomRight.y - topLeft.y    
  )
}

Path.prototype.updatePointsNumber = function() {
  this.ui.name.innerHTML = this.name = `Path | ${ this.points.length }`
}

Path.prototype.draw = function() {
  if( !this.isVisible ) return

  let color

  if( this.isSelected ) color = {
    stroke: SETTINGS.colors.overridePathsColors
    ? SETTINGS.colors.path.selected.stroke
    : this.stroke,

    fill: SETTINGS.colors.overridePathsColors
    ? SETTINGS.colors.path.selected.fill
    : this.fill
  }

  else color = {
    stroke: SETTINGS.colors.overridePathsColors
    ? SETTINGS.colors.path.stroke
    : this.stroke,

    fill: SETTINGS.colors.overridePathsColors
    ? SETTINGS.colors.path.fill
    : this.fill
  }

  this.AABB.draw()

  Draw.polygon( this.points, color )

  this.points.forEach( point =>  point.draw( color ))

  return this
}