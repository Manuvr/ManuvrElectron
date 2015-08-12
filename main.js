var app           = require('app');
var BrowserWindow = require('browser-window');
var ipc           = require('ipc');
var $             = require('jquery');

var mainWindow = null;
var transportViewWindow = null;


app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1000, height: 600});
  mainWindow.loadUrl('file://'+__dirname+'/index.html');
  mainWindow.openDevTools();

  mainWindow.on('closed', function() {  
    mainWindow = null;
    // Close any open satalite windows...
    if (transportViewWindow) transportViewWindow.close();
    if (imuGraphWindow)      imuGraphWindow.close();
  });

  mainWindow.show();

  // Instantiating a satalite window.
  //transportViewWindow = new BrowserWindow({ width: 100, height: 80 });
  //transportViewWindow.loadUrl('file://' + __dirname + '/html/xport-view.html');
  //transportViewWindow.on('closed', function() {  transportViewWindow = null;  });
  //transportViewWindow.setMenu(null);
  //transportViewWindow.show();
});

