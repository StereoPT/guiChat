const { app, BrowserWindow } = require('electron');

function createWindow() {
  let window = new BrowserWindow({ width: 800, height: 600 });
  window.loadFile('index.html');
}

console.log("[guiChat]");

app.on('ready', createWindow);
