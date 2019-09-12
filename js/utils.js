Object.prototype.on = function( event, callback, bubble ) {
  this.addEventListener( event, callback, bubble || false )
};

const get = function( name ) {
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

const pathsList  = get('.panel.paths ul')[0];

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