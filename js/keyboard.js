var keysDown = [];

function pressKey(e) {
  keysDown[e.keyCode] = true;
}

function releaseKey(e) {
  delete keysDown[e.keyCode];
}

document.addEventListener("keydown", pressKey, false);
document.addEventListener("keyup", releaseKey, false);