Object.prototype.on = function( event, callback, bubble ) {
  this.addEventListener( event, callback, bubble || false )
};

const get = {
  id: function( name ) {
    return document.getElementById( name )
  },
  class: function( name ) {
    return Array.from( document.getElementsByClassName( name ))
  },
  tag: function( name ) {
    return Array.from( document.getElementsByTagName( name ))
  },
  all: function( name ) {
    return Array.from( document.querySelectorAll( name ))
  }
}

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
      return Math.sqrt(( a * a ) + ( b * b ));
    }
  }
};