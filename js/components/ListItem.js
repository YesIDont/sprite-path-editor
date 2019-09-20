function ListItem( i, color ) {
  // i: item

  const { id, name, parent } = i;

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
    li.getElementsByClassName('selection')[0].on( 'click', e => {
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
    li.getElementsByClassName('visibility')[0].on( 'click', e => {
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
    li.getElementsByClassName('selection')[0].on( 'click', e => {
        if( e.target.checked ) {
          i.select();
          mouse.selection.add( i );
        }
        else {
          i.unSelect();
          mouse.selection.remove( i );
        }
    });

    i.select = function() {
      i.isSelected = true;
      li.getElementsByClassName('selection')[0].checked = true;
      return i
    }

    i.unSelect = function() {
      i.isSelected = false;
      li.getElementsByClassName('selection')[0].checked = false;
      return i
    }

    i.remove = function() {
      let index = parent.points.findIndex( p => p.id === id );
      parent.points.splice( index, 1 );
    }

    // show / hide point
    li.getElementsByClassName('visibility')[0].on( 'click', e => {
        if( e.target.checked ) i.hide()

        else {
          i.show();
          parent.show( true );
        }
    })
  }

  return li
}