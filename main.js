var app           = require('app');
var BrowserWindow = require('browser-window');
var ipc           = require('ipc');
var $             = require('jquery');

var mainWindow = null;
var transportViewWindow = null;

var packageJSON = require('./package.json');

var util = require('util');



/****************************************************************************************************
 * Let's bring in the MHB stuff...                                                                   *
 ****************************************************************************************************/
var mSession = require('MHB/lib/mSession.js'); // session factory
var sessionGenerator = new mSession();

var LBTransport = require('MHB/lib/transports/loopback.js'); // loopback

var lb = new LBTransport();


var transports = {
  lb0: lb.transport0,
  lb1: lb.transport1
};

// We track instantiated sessions with this object.
var sessions = {};

/**
 * This fxn does the cleanup required to exit gracefully, and then ends the process.
 * This function does not return.
 */
function quit(exit_code) {
  // Write a config file if the conf is dirty.
  { //saveConfig(function(err) {
    if (exit_code) {
      console.log('Exiting with reason: ' + exit_code);
    }
    
    if (exit_code) {
      console.log('Failed to save config prior to exit. Changes will be lost.');
    }
      process.exit(); // An hero...
} //});
}


// We should bind to some things in the process, so we can clean up.
process.on('SIGHUP',  function() { quit('SIGHUP');  });
process.on('SIGINT',  function() { quit('SIGINT');  });
process.on('SIGQUIT', function() { quit('SIGQUIT'); });
process.on('SIGABRT', function() { quit('SIGABRT'); });
process.on('SIGTERM', function() { quit('SIGTERM'); });



/****************************************************************************************************
 * This is where we setup the front-end of things...                                                 *
 ****************************************************************************************************/
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow(
    {
      width: 1000,
      height: 600, 
      icon: './app/manuvr_transparent.png',
      title: 'Manuvr Host Bridge',
      'subpixel-font-scaling': true
    }
  );

  mainWindow.loadUrl('file://'+__dirname+'/app/app.html');
  mainWindow.openDevTools();

  mainWindow.on('closed', function() {  
    mainWindow = null;
    // Close any open satalite windows...
  });

  
  // By passing in the transports, we are returned sessions. When a session is successfully
  //   setup, the actor variable will become a reference to the specific kind of manuvrable
  //   that connected to the given transport.
  var buildNewSession =function(xport, name, callback) {
    if (transports.hasOwnProperty(xport)) {
      if (name != undefined && name !== '') {
        if (!sessions.hasOwnProperty(name)) {
          sessions[name] = sessionGenerator.init(transports[xport]);
          sessions[name].on('toClient', function(origin, method, data) {
              //console.log('BRDCAST TO RENDER '+ses +'(origin)'+origin+' '+ method);
              mainWindow.webContents.send('toClient', [name, origin, method, data]);
            }
          );
        }
        else {
          callback('a session by that name already exists.');
        }
      }
      else {
        callback('the provided session name is invalid.');
      }
    }
    else {
      callback('the named transport cannot be found.');
    }
  }

  
  mainWindow.webContents.on('dom-ready', function() {
    // Listener to take input from the user back into MHB.
    ipc.on('fromClient', function(event, ipc_args) {
      console.log(util.inspect(ipc_args));
      var method = ipc_args.shift();
      switch (method) {
        case 'hub':
          if (sessions.hasOwnProperty(method)) {
            // This is the pass-through to instantiated sessions.
            sessions[method].emit('fromClient', ipc_args[0], ipc_args[1], ipc_args[2]);
          }
          break;
        case 'newSession':
          buildNewSession(ipc_args[0], ipc_args[1], 
            function(err) {
              if (err) {
                console.log('Failed to add a new session because '+err);
              }
              else {
                mainWindow.webContents.send('sessionList', Object.keys(sessions));
              }
            }
          );
          break;
        case 'log':
          console.log('Renderthread:\t'+ipc_args[0]);
          break;
        default:
          console.log('Main thread received IPC message back. Logging it...\n'+method+'\n'+util.inspect(args));
          break;
      }
    });
    
    // We should tell the front-end what transports we know of.
    mainWindow.webContents.send('transportList', Object.keys(transports));
    mainWindow.webContents.send('sessionList', Object.keys(sessions));
  });

  mainWindow.show();

  // Instantiating a satalite window.
  //transportViewWindow = new BrowserWindow({ width: 100, height: 80 });
  //transportViewWindow.loadUrl('file://' + __dirname + '/html/xport-view.html');
  //transportViewWindow.on('closed', function() {  transportViewWindow = null;  });
  //transportViewWindow.setMenu(null);
  //transportViewWindow.show();
});

