const Draw = {

  line: function( x, y, a, b, color ) {
    c.save();
    c.strokeStyle = color || 'rgb( 255, 0, 0 )';
    c.moveTo( x, y );
    c.lineTo( a, b );
    c.restore();
  },
  
  circle: function( x, y, r, colors ) {
    c.save();
    c.beginPath();
    if( colors.fill ) c.fillStyle = colors.fill;
    if( colors.stroke ) c.strokeStyle = colors.stroke;
    
    c.arc( x, y, r, 0, 2 * Math.PI );

    if( colors.fill ) c.fill();
    if( colors.stroke ) c.stroke();
    c.restore();
  },

  polygon: function( points, colors ) {
    c.save();

    if( colors.fill ) c.fillStyle = colors.fill;
    if( colors.stroke ) c.strokeStyle = colors.stroke;

    // get position of the first point
    const pos = points[0].getCanvasPos();

    c.moveTo( pos.x, pos.y );
    points.forEach( point => {
      const { x, y } = point.getCanvasPos();
      c.lineTo( x, y );
    })
    c.lineTo( pos.x, pos.y );

    if( colors.fill ) c.fill();
    if( colors.stroke ) c.stroke();

    c.restore();
  },

  rectangle: function( x, y, w, h, colors, lw ) {
    c.save();
    c.strokeStyle = 'rgb( 0,150,255 )';
    c.fillStyle = 'rgba( 0, 150, 255, 0.3 )';
    if( colors ) {
      if( colors.stroke ) c.strokeStyle = colors.stroke;
      if( colors.fill ) c.fillStyle = colors.fill;
    }
    c.lineWidth = lw || 1;

    if( colors ) {
      if( colors.stroke ) {
        c.strokeRect( x, y, w, h )
      }
      if( colors.fill ) {
        c.fillRect( x, y, w, h )
      }
    }
    else {
      c.strokeRect( x, y, w, h )
    }
    
    // c.stroke();
    c.restore();
  }
}