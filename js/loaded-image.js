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
  }
  this.image.src = path;
}

LoadedImage.prototype.getPathById = function( id ) {
  return this.paths.filter( path => path.id === id )[0]
}

LoadedImage.prototype.arePathsLoaded = function() {
  return this.paths.length > 0
}

LoadedImage.prototype.draw = function() {
  c.save();
  const { image } = this;
  const { width, height } = image;
  const { scale } = SETTINGS;
  c.drawImage(
    image,
    0,
    0,
    width * scale,
    height * scale
  )
  c.restore();
}

LoadedImage.prototype.arePathsSimilar = function( path1, path2 ) {
  // Loop each point in second path, if they are all inside bounding box - remove second path as duplicate.
  let allPointsWithinBounds = true;

  path2.points.forEach( p => {
    if( !p.isCollidingRectangle( path1.AABB, 3 )) {
      allPointsWithinBounds = false
    }
  });

  return allPointsWithinBounds
};


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
  paths = paths.map(( path, index ) => {
    let points = [];
    let lastNumber = 0;
    for( let i = 0; i < path.length; i++ ) {
      if( i % 2 !== 0 ) {
        points.push( new Point(
          parseFloat(lastNumber),
          parseFloat(path[i])
        ));
      }
      else {
        lastNumber = path[ i ];
      }
    }
    
    // remove the last point that is used in svg to line the end of the path to it's beggining
    points.pop()

    return new Path( points, index, `Path ${index}` )
  })

  // // remove duplicate paths
  // for( let i = 0; i < paths.length; i++ ) {
  //   let path = paths[ i ];

  //   // check if path's AABB contains all other paths, if it's does it means it was builded on image's border - remove it
  //   let containsAll = true;
  //   paths.forEach( p => {
  //     if( !this.arePathsSimilar( path, p )) containsAll = false
  //   });

  //   if( containsAll ) {
  //     paths.splice( i, 1 );
  //     continue
  //   };

  //   // check if paths has any similar duplicates and remove them if it does
  //   for( let n = 0; n < paths.length; n++ ) {
  //     if( path.id === paths[ n ].id ) continue;

  //     if( this.arePathsSimilar( path, paths[ n ] )) {
  //       paths.splice( n, 1 );
  //       n--
  //     }
  //   }
  // };

  // cicle again all paths and reset their id's to mach
  paths.forEach(( p, i ) => {
    p.id = i;
    p.name = `Path ${i}`;
    p.parent = paths;

    // set name for each point and reference to parent path
    p.points.forEach(( point, i ) => {
      point.id = i;
      point.name = `Point ${i}`;
      point.parent = p;
    })
  });

  return paths
}

LoadedImage.prototype.drawPaths = function() {
  let paths = this.paths;

  paths.forEach( path => { path.draw() })
}