function ListItem( i, color ) {
  // i: item

  const { id, name } = i;

  let li = document.createElement('li');
  li.innerHTML = `
    <input type='checkbox' id='${ id }' class='switch selection'/>
    <span></span>

    <span class='path-color' style='background: ${ color || i.stroke }'></span>

    ${ i.type === 'path' ?
      `
        <input type='checkbox' id='${ id }' class='switch expansion'/>
        <span></span>
      `
      : ''
    }

    <span class='name'>${ name }</span>

    <input type='checkbox' id='${ id }' class='switch visibility'/>
    <span></span>
  `;

  li.className = `id-${ id } ${ i.type } children-v-middle`;
  li.id = id;



  if( i.type === 'path' ) {
    // select / unselect path
    on(
      li.getElementsByClassName('selection')[0],
      'click', e => {
        if( e.target.checked ) {
          i.select();
          mouse.selection.add( i );

          get(`.path.id-${ id } .selection`).forEach( point => point.checked = true )
        }
        else {
          i.unSelect();
          mouse.selection.remove( i );

          get(`.path.id-${ id } .selection`).forEach( point => point.checked = false )
        }
    })

    // show / hide path
    on(
      li.getElementsByClassName('visibility')[0],
      'click', e => {
        if( e.target.checked ) {
          i.hide();
          get(`.path.id-${ id } .visibility`).forEach( point => point.checked = true )
        }
        else {
          i.show()
          get(`.path.id-${ id } .visibility`).forEach( point => point.checked = false )
        }
    })
  }

  else if( i.type === 'point' ) {
    // select / unselect point
    on(
      li.getElementsByClassName('selection')[0],
      'click', e => {
        if( e.target.checked ) {
          i.select();
          mouse.selection.add( i );
        }
        else {
          i.unSelect();
          mouse.selection.remove( i );
        }
    })

    // show / hide point
    on(
      li.getElementsByClassName('visibility')[0],
      'click', e => {
        if( e.target.checked ) i.hide()

        else {
          i.show();
          i.parent.show( true );
        }
    })
  }



  return li
}