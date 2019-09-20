var keysDown = [];

function pressKey(e) {
  keysDown[e.keyCode] = true;
  if( e.keyCode == 32 ) canvas.className = 'cursor-move'
}

function releaseKey(e) {
  delete keysDown[e.keyCode];
  if( e.keyCode == 32 ) canvas.className = ''
}

document.addEventListener("keydown", pressKey, false);
document.addEventListener("keyup", releaseKey, false);