const { app, BrowserWindow } = require('electron');

const mainWindow = null;

function createWindow() {
  mainWindw = new BrowserWindow({
    width: 800, height: 600,
    minWidth: 500, minHeight: 200
  });

  mainWindw.loadFile('./public/index.html');
}

console.log("[guiChat]");

app.on('window-all-closed', function() {
  if(process.platform != 'darwin') app.quit();
});

app.on('ready', createWindow);

app.on('closed', function() {
  mainWindow = null;
});
