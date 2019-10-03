# Sprite Path Editor
Online sprite's paths editor allowing to create vector data for game physics engines. Traces raster data to get paths that converted to points arrays that can be edited and exported.

### TECH STACK:
* HTML 5
* CSS3, LESS, COMPASS
* JS ES5/ES6

### TO DO / DONE:
- [x] apply path tracing library for convex and concave raster shapes
- [x] canvas scaling and rescaling on window size change event
- [ ] trace options
- [ ] modal / window
- [ ] toolbar with api alowing for easy addition of new tools
  - [x] body
  - [x] tooltip with hovering short description
  - [ ] mesage to abtove tooltip that right click on icon opens full description
  - [ ] full description for each tool
- [x] css clases for panels sliding from outside the window
- [ ] redo - do the last action again
  - [ ] - ui > tools icon
  - [ ] - ctrl/cmd + alt/option + z
- [ ] undo - go back to state from before the last change
  - [ ] - ui > tools icon
  - [ ] - ctrl/cmd + z
  - [ ] settings - number indicating how many actions should be possible to undo
- [ ] path & points panel with
  - [x] list of selectable:
    - [x] paths
    - [x] points
  - [x] tools:
    - [x] select/unselect all
    - [x] hide/show all
  - [x] remove selected items tool
  - [ ] indication that item is
    - [x] selected / unselected
    - [ ] half selected (for paths with only some of their points selected)
    - [x] visible / hidden
    - [ ] number of points in path next to path
  - [ ] right click menu on each item (path or point):
    - [ ] change name
    - [ ] change color
  - [ ] show only selected:
    - [ ] paths
    - [ ] points
  - [ ] join selected paths into one path
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
- [ ] workspace (canvas) options panel with icon in top right corner
  - [ ] background color options
    - [x] chessboard
    - [x] white
    - [x] gray
    - [x] dark
    - [x] red pink
    - [x] light green
    - [ ] color picker for custom colors
  - [x] paths colors override with default color
  - [x] paths colors and opacity tool
- [ ] persist options in form of:
  - [ ] local state
  - [ ] cookies
- [ ] export:
  - [ ] paths data as json
  - [ ] options allowing to select which info for paths and points (e.g. name, position etc.) should be exported
  - [ ] paths & points as fixture for box2d

### Final optimisation to do:
- [ ] switch drawing points with vectors to drawing svg or png
- [ ] sort out which elements should be animated with css
- [ ] create sprite out of all icons / images
- [ ] add selective canvas update for only when:
  - [ ] camera moved
  - [ ] change was triggered to draw part of canvas differently
- [ ] final code refactor
