function ListItem( i ) {
  // i: item

  let li = document.createElement('li');
  li.innerHTML = `
    <input type='checkbox' id='${i.id}' class='switch selection'/>
    <span></span>

    ${ i.type === 'path' ?
      `
        <input type='checkbox' id='${i.id}' class='switch expansion'/>
        <span></span>
      `
      : ''
    }

    <span class='name'>${i.name}</span>

    <input type='checkbox' id='${i.id}' class='switch visibility'/>
    <span></span>
  `;

  li.className = `${i.type} children-v-middle`;
  li.id = i.id;

  // select / unselect item
  li.getElementsByClassName('selection')[0].on('click', e => {
    let item = loadedImage.paths.filter( p => {
      return p.id === parseInt( e.target.id )
    })[0]

    if( e.target.checked ) {
      item.select()
      mouse.selection.add( item )
    }
    else {
      item.unSelect()
      mouse.selection.remove( item )
    }
  })

  // show / hide item
  li.getElementsByClassName('visibility')[0].on('click', e => {
    if( e.target.checked ) loadedImage.paths[ e.target.id ].hide()
    else loadedImage.paths[ e.target.id ].show()
  })

  return li
}