const on = function( element, event, callback, bubble ) {
  element.addEventListener( event, callback, bubble || false )
};
Object.prototype.on = function( event, callback, bubble ) {
  this.addEventListener( event, callback, bubble || false )
}

const set = {};

set.pathFillOpacity = function( n ) {
  SETTINGS.colors.path.fill = SETTINGS.colors.path.fill.replace(
    /\, \d\.?\d?\d? \)/,
    `, ${n} )`
  )
}

const get = function( name, parent ) {
  if( parent ) return Array.from( parent.querySelectorAll( name ))
  return Array.from( document.querySelectorAll( name ))
}

get.id = function( name ) {
  return document.getElementById( name )
};

get.class = function( name ) {
  return Array.from( document.getElementsByClassName( name ))
};

get.tag = function( name ) {
  return Array.from( document.getElementsByTagName( name ))
};

get.first = function( name ) {
  return Array.from( document.querySelectorAll( name ))[0]
};

get.HTMLelementX = function( element ) {
  var curleft = 0;
  if ( element.offsetParent ) {
    do {
			curleft += element.offsetLeft;
    } while ( element = element.offsetParent );

    return curleft;
  }
}

get.HTMLelementPos = function( element ) {
  var curleft = curtop = 0;
  if ( element.offsetParent ) {
    do {
			curleft += element.offsetLeft;
      curtop += element.offsetTop;
    } while ( element = element.offsetParent );

    return { x: curleft, y: curtop };
  }
}

get.fixed = function( n, i ) {
  return Number(n.toString().substring(0, n.toString().indexOf(".") + i + 1))
}

const add = function( element, content ) {
  let el = document.createElement( element );
  
  if( typeof content === 'string' ) {
    
  }
}

const wait = function( condition, callback, time ) {
  setTimeout(() => {
    if( condition() ) callback()
    else wait( condition, callback, time )
  }, 1);
}

const body = get.tag('body')[0];

const pathsList = get('.paths ul')[0];

let utils = {
  get: {
    window: {
      width: function() {
        let width = window.innerWidth && document.documentElement.clientWidth ? 
                    Math.min(window.innerWidth, document.documentElement.clientWidth) : 
                    window.innerWidth || 
                    document.documentElement.clientWidth || 
                    document.getElementsByTagName('body')[0].clientWidth
        return width
      },
      height: function() {
        let height = window.innerHeight && document.documentElement.clientHeight ? 
                    Math.min(window.innerHeight, document.documentElement.clientHeight) : 
                    window.innerHeight || 
                    document.documentElement.clientHeight || 
                    document.getElementsByTagName('body')[0].clientHeight
        return height
      }
    }
  },
  compute: {
    twoPointsDistance: function( p1, p2 ) {
      // calculate triangle's sides
      let a = p1.x - p2.x;
      let b = p1.y - p2.y;	
      
      // return distance
      return Math.sqrt(( a * a ) + ( b * b ))
    }
  }
};

const isPointRectColliding = function( p, r, offset ) {
  return p.x > r.x - offset
      && p.y > r.y - offset
      && p.x < r.x + r.w + ( offset * 2 )
      && p.y < r.y + r.h + ( offset * 2 )
}

function element( options ) {
  let element = document.createElement( options.element );

  if( options.class      ) element.className = options.class;
  if( options.id         ) element.id        = options.id;
  if( options.background ) element.style.background = options.background;
  if( options.onclick    ) on( element, 'click', options.onclick );
  

  return element
}

function div( options ) {
  return element({ ...options, element:'div' })
}

function ul( options ) {
  return element({ ...options, element:'ul' })
}

function span( options ) {
  return element({ ...options, element:'span' })
}

function input( options ) {
  if( !options.type ) options.type = 'checkbox';
  return element({ ...options, element:'span' })
}

function button( options ) {
  if( !options.type ) options.type = 'button';
  return element({ ...options, element:'button' })
}

function randomRGB() {
  let x = Math.floor(Math.random() * 256);
  let y = Math.floor(Math.random() * 256);
  let z = Math.floor(Math.random() * 256);

  return `rgba( ${x}, ${y}, ${z}, 1 )`
}