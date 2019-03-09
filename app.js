const { app, BrowserWindow } = require('electron');

var mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800, height: 600,
    minWidth: 500, minHeight: 200
  });

  mainWindow.loadFile('./public/index.html');
}

console.log("[guiChat]");

app.on('window-all-closed', function() {
  if(process.platform != 'darwin') app.quit();
});

app.on('ready', createWindow);

app.on('closed', function() {
  mainWindow = null;
});
