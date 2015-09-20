var app           = require('app');
var BrowserWindow = require('browser-window');
var ipc           = require('ipc');
var fs            = require('fs');
var $             = require('jquery');

var mainWindow = null;
var transportViewWindow = null;

var packageJSON = require('./package.json');

var util = require('util');



/** This object stores our presently-active config. This config is the default.
 *  It may be clobbered by loadConfig().
 */
var config = {
  window_size:      [1000, 700],
  window_location:  [0, 0],
  writtenByVersion: packageJSON.version,
  verbosity:        7,
  logPath:          './logs/'
};

/** If we have an open log file, this will be a file-descriptor. */
var current_log_file = false;


/**
 * Open a new log file at the given path.
 *
 * @param   {string}  path  The filesystem path where the log directory is located.
 */
function openLogFile(path) {
  fs.open(path, 'ax',
    function(err, fd) {
      if (err) {
        console.log('Failed to create log file (' + path +
          ') with error (' + err + '). Logging disabled.');
      } else {
        current_log_file = fd;
      }
    }
  );
}


/**
 * Save the current config, if it is dirty.
 *
 * @param   {callback}  callback  The function to call when the operation is finished.
 */
function saveConfig(callback) {
  if (config.dirty) {
    delete config.dirty;
    config.writtenByVersion = packageJSON.version;
    if (!callback) {
      callback = function(err) {
        if (err) {
          config.dirty = true;
          console.log('Error saving configuration: ' + err);
        } else {
          console.log('Config was saved.');
        }
      }
    }

    fs.writeFile('./config.json', JSON.stringify(config), callback);
  } else {
    // If we don't need to save, fire the callback with no error condition.
    if (callback) callback(false);
  }
}


/**
 * Tries to load a conf file from the given path, or the default path if no path
 *   is provided. If config load fails, function will populate config with a default
 *   and mark it dirty.
 *
 * @param   {string}  path  The filesystem path where the log directory is located.
 */
function loadConfig(path) {
  if (!path) {
    path = './config.json';
  }
  
  try {
    fs.existsSync(path, fs.R_OK);
    var data = fs.readFileSync(path, 'ascii');
    if (data) {
      var temp_config = JSON.parse(data);
      config = temp_config;
    }
    else {
      console.log('The config file '+path+' seems to be empty. Using config defaults...');
      config.dirty = true;
    }
  }
  catch (err) {
    console.log('We experienced an while trying to load config from '+path+'. Error was '+err+'\nUsing config defaults...');
    config.dirty = true;
  }

  // Now we should setup logging if we need it...
  if (config.logPath) {
    fs.exists(config.logPath,
      function(exists) {
        if (exists) {
          openLogFile(config.logPath + 'mhb-' + Math.floor(new Date() / 1000) + '.log');
        }
        else {
          fs.mkdir(config.logPath,
            function(err) {
              if (err) {
                console.log('Log directory (' + config.logPath + ') does not exist and could not be created. Logging disabled.');
              }
              else {
                openLogFile(config.logPath + 'mhb-' + Math.floor(new Date() / 1000) + '.log');
              }
            }
          );
        }
      }
    );
  }
}


// Load configuration.
loadConfig();


/****************************************************************************************************
 * Let's bring in the MHB stuff...                                                                   *
 ****************************************************************************************************/
var sessionGenerator = require('MHB/lib/mSession.js'); // session factory
var mSession = new sessionGenerator();

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
  if (exit_code) {
    console.log('Exiting with reason: ' + exit_code);
  }
  
  // Write a config file if the conf is dirty.
  saveConfig(function(err) {
    if (err) {
      console.log('Failed to save config prior to exit. with error '+err+' Changes will be lost.');
    }
    if (process.platform != 'darwin') {
      app.quit();
    }
    process.exit(); // An hero...
  });
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
  quit('SIGQUIT');
});

app.on('ready', function() {
  mainWindow = new BrowserWindow(
    {
      width:  (config.window_size) ? config.window_size[0] : 800,
      height: (config.window_size) ? config.window_size[1] : 600,
      
      icon: './app/manuvr_transparent.png',
      title: 'Manuvr Host Bridge',
      'subpixel-font-scaling': true
    }
  );
  
  if (config.window_position) {
    mainWindow.setPosition(config.window_position[0], config.window_position[1]);
  }
  else {
    mainWindow.center();
  }

  mainWindow.loadUrl('file://'+__dirname+'/app/app.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
    // Close any open satalite windows...
  });


  mainWindow.on('resize', function(event) {
    config.window_size = mainWindow.getSize();
    config.dirty = true;
  });

  mainWindow.on('move', function(event) {
    config.window_position = mainWindow.getPosition();
    config.dirty = true;
  });


  // By passing in the transports, we are returned sessions. When a session is successfully
  //   setup, the actor variable will become a reference to the specific kind of manuvrable
  //   that connected to the given transport.
  var buildNewSession =function(xport, name, callback) {
    if (transports.hasOwnProperty(xport)) {
      if (name != undefined && name !== '') {
        if (!sessions.hasOwnProperty(name)) {
          sessions[name] = mSession.init(transports[xport]);
          sessions[name].on('toClient', function(origin, method, data) {
              //console.log('BRDCAST TO RENDER '+ses +'(origin)'+origin+' '+ method);
              switch (method) {
                case 'log':
                  console.log('Mainthread:\t'+data[0]);
                  break;
                default:
                  mainWindow.webContents.send('toClient', [name, origin, method, data]);
                  break;
              }
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
      var ses_name = ipc_args.shift();
      if (sessions.hasOwnProperty(ses_name)) {
        // This is the pass-through to instantiated sessions.
        sessions[ses_name].emit('fromClient', ipc_args[0], ipc_args[1], ipc_args[2]);
      }
    });
      
    ipc.on('newSession', function(event, ipc_args) {
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
    });

    ipc.on('log', function(event, ipc_args) {
      console.log('Renderthread:\t'+ipc_args[0]);
    });
    
    ipc.on('window', function(event, ipc_args) {
      switch (ipc_args.shift()) {
        case 'dump_sessions':
          for (var ses in sessions) {
            console.log(util.inspect(sessions[ses]) + '\n\n');
          }
          break;
        case 'dev_tools':
          if (ipc_args.length > 0) {
            //if () {
            //}
          }
          else {
            if (mainWindow.webContents.isDevToolsOpened()) {
              mainWindow.webContents.closeDevTools();
            }
            else {
              mainWindow.webContents.openDevTools({detach: true});
            }
          }
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
