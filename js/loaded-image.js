const LoadedImage = function( path ) {
  this.image = new Image();
  this.imageData = {};
  this.svg = '';
  this.paths = [];
  this.src = path;
  this.image.onload = () => {
    let tempCanvas = document.createElement('canvas');
    let ctx = tempCanvas.getContext('2d');
    tempCanvas.width = this.image.width;
    tempCanvas.height = this.image.height;
    ctx.drawImage(this.image, 0, 0);
    this.imageData = ctx.getImageData(
      0, 0,
      tempCanvas.width,
      tempCanvas.height
    )
    this.svg = ImageTracer.imagedataToSVG(
      this.imageData,
      {
        ltres:             1,
        qtres:             1,
        pathomit:          8,
        rightangleenhance: false,
        blurradius:        0,
        pal: [
          {
            "r": 255,
            "g": 255,
            "b": 255,
            "a": 0
          },
          {
            "r": 255,
            "g": 255,
            "b": 255,
            "a": 255
          }
        ]
      }
    )
    this.paths = this.getPaths( this.svg );
    // this.draw();
    // this.drawPaths();
  }
  this.image.src = path;
}

LoadedImage.prototype.draw = function() {
  c.save();
  const { image } = this;
  const { width, height } = image;
  c.drawImage(
    image,
    0,
    0,
    width * scale,
    height * scale
  )
  c.restore();
}

LoadedImage.prototype.getPaths = function( svgStr ) {
  let paths = [];
  // console.log(svgStr)
  // catch strings starging from "M /d" up to Z to extract paths
  paths = svgStr.match(/M(?= \d)[^Z]*\Z/g);

  // extract all numbers for each path
  paths = paths.map( path => {
    return path.match(/\d+(\.\d)?/g)
  })

  // group numbers in path into points
  paths = paths.map( path => {
    let points = [];
    let lastNumber = 0;
    for( let i = 0; i < path.length; i++ ) {
      if( i % 2 !== 0 ) {
        points.push( new Point( parseFloat(lastNumber), parseFloat(path[i])))
      }
      else {
        lastNumber = path[ i ];
      }
    }
    
    // remove the last point that is used in svg to line the end of the path to it's beggining
    points.pop()

    return new Path( points )
  })

  // remove paths that have 4 and less points to exclude image border
  for( let i = 0; i < paths.length; i++ ) {
    if( paths[i].points.length < 5 ) {
      paths.splice( i, 1 );
      i--
    }
  }

  // remove duplicate paths
  // for( let i = 0; i < paths.length; i++ ) {
  //   if(
  //     paths.length > 1 &&
  //     // paths have the same length
  //     paths[i].points.length === paths[i + 1].points.length
  //   ){
  //     paths.splice( i, 1 );
  //     i--
  //   }
  // }
  return paths
}

LoadedImage.prototype.drawPaths = function() {
  let paths = this.paths;

  paths.forEach( path => { path.draw() })
}