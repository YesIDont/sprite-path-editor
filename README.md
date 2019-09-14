# Sprite Path Editor
Online sprite's paths editor allowing to create vector data for game physics engines. Traces raster data to get paths that converted to points arrays that can be edited and exported.

### TECH STACK:
* HTML 4/5
* LESS, BEM, COMPASS
* JS ES5/ES6

### TO DO / DONE:
- [x] path tracing for convex and concave raster shapes
- [x] canvas scaling and rescaling on window size change event
- [x] toolbar with api alowing for quick addition of new tools
- [x] css clases for panels sliding from outside the window
- [ ] workspace (canvas) options panel with icon in top right corner
  - [ ] background color options
    - [x] chessboard
    - [x] white
    - [x] gray
    - [x] dark
    - [x] red pink
    - [x] light green
    - [ ] color picker for custom colors
- [ ] path & points panel with
  - [ ] list of selectable:
    - [x] paths
    - [ ] points
  - [x] tools:
    - [x] select/unselect all
    - [x] hide/show all
  - [x] remove selected
- [ ] selection tool allowing to select points:
  - [ ] single points
  - [ ] multiple points
- [ ] move tool alowing to move selected points
- [x] pan
  - [x] tool alowing to move vievport (canvas offset)
  - [x] pan on mouse drag + hold space
- [x] zoom in/out
  - [x] tools
  - [x] zoom on mouse scroll
- [ ] persist options in form of:
  - [ ] local state
  - [ ] cookies
- [ ] export paths data as:
  - [ ] json

Final optimisation to do:
- [ ] sortout which elements should be animated with css
- [ ] create sprite out of all icons / images
- [ ] final code refactor