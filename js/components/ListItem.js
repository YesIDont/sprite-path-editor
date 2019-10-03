function ListItem( i, color ) {
  // i: path or point

  let ui = {}

  let _li = ui.li = li({
    id: i.id,
    class: `${ i.type } id-${ i.id } children-v-middle`
  })

  ui.selection = input ({
    id: i.id,
    class: 'switch selection',
    onclick: function( e ) {
      if( e.target.checked ) i.select()
      else i.unSelect()
    }
  })
  ui.selectionSpan = span()

  ui.marker = span  ({
    style: { background: color },
    class: 'path-color'
  })

  if( i.type === 'path' ) {
    ui.listExpander = input ({ id: i.id, class: 'switch expansion' })
    ui.listExpanderSpan = span()
  }

  ui.name = span  ({ class: 'name' })
  ui.name.innerHTML = i.name

  ui.visibility = input ({
    id: i.id,
    class: 'switch visibility',
    onclick: function( e ) {
      if( e.target.checked ) i.hide()
      else i.show()
    }
  })
  ui.visibilitySpan = span()

  _li.appendChild( ui.selection )
  _li.appendChild( ui.selectionSpan )
  _li.appendChild( ui.marker )
  if( i.type === 'path' ) {
    _li.appendChild( ui.listExpander ) 
    _li.appendChild( ui.listExpanderSpan )
  }
  _li.appendChild( ui.name )
  _li.appendChild( ui.visibility )
  _li.appendChild( ui.visibilitySpan )

  return ui
}