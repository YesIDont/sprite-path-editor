

function dragRangeSlider( element ) {
  let x            = 0,
      halfWidth    = Math.floor( element.offsetWidth ),
      parent       = element.parentNode;
      parentX      = get.HTMLelementX( parent ),
      parentWidth  = parent.offsetWidth
      valueDisplay = get('.value', parent )[0]
      color = SETTINGS.colors.path.fill;
  
  element.onmousedown = startDrag

  function startDrag() {
    document.onmouseup = endDrag;
    document.onmousemove = drag;
    body.style.cursor = 'pointer';
  }

  function drag( e ) {
    e = e || window.event;
    e.preventDefault();

    x = e.clientX - parentX - halfWidth;

    element.style.left = x > parentWidth - halfWidth
      ? parentWidth - halfWidth + 'px'
      : ( x < 0 ? 0 : x + 'px' );

    let factor = x / ( parentWidth - halfWidth );
  
    let percnt = factor < 0 ? 0 : (
      factor > 1 ? 1 : factor
    );
    percnt = get.fixed( percnt, 2 );

    valueDisplay.innerHTML = parseInt( percnt * 100 ) + '%';

    set.pathFillOpacity( percnt );
  }

  function endDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
    body.style.cursor = 'default';
  }
}