var { remote } = require('electron')
var win = remote.getCurrentWindow()

document.querySelector('.icon.ion-md-remove').onclick = function() {
  win.minimize()
}

document.querySelector('.icon.ion-md-close').onclick = function() {
  win.close()
}