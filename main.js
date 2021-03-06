const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem
} = require('electron');

var fs            = require('fs');
var util          = require('util');
var _throttle     = require('lodash').throttle;
var inherits = require('util').inherits;
var ee = require('events').EventEmitter;


// I changed this....
var _has          = require('lodash').has;
var _defaultsDeep = require('lodash').defaultsDeep;

var mainWindow = null;
var loggerWindow = null;

// This is the client's version information.
var packageJSON = require('./package.json');

var mHub = require('./node_modules/MHB/lib/mHub.js');
var messageHandler = require('MHB/lib/messageHandler.js')


var SCROLLBACK_SIZE = 1000;
var cached_logs = [];


var pushToLog = function(msg) {
  if (cached_logs.push(msg.data) > SCROLLBACK_SIZE) {
    cached_logs.shift();
  }
  if (loggerWindow) {
    loggerWindow.webContents.send('log', msg.data);
  }
}


/** This object stores our presently-active config. This config is the default.
 *  It may be clobbered by loadConfig().
 */
var config = {
  window_size:      [1000, 700],
  window_location:  [0, 0],
  writtenByVersion: packageJSON.version,
  logPath: __dirname+'/logs/',
  verbosity:        7
};



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
}


// Load configuration.
loadConfig();


/****************************************************************************************************
 * Let's bring in the MHB stuff...                                                                   *
 ****************************************************************************************************/


/**
 * This fxn does the cleanup required to exit gracefully, and then ends the process.
 * This function does not return.
 */
function quit(exit_code) {
  //electronLocalshortcut.unregisterAll(mainWindow);
  if (loggerWindow) {
    //electronLocalshortcut.unregisterAll(loggerWindow);
    loggerWindow.close();
  }

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
    process.exit(0); // An hero...
  });

  // Close any open satalite windows...
  if (loggerWindow) {
    loggerWindow.close();
  }
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

var window = function() {
  ee.call(this);
  var that = this;


  this.openDevTools = function(_open) {
    // Instantiating a satalite window to view log.
    if (_open ^ !mainWindow.webContents.isDevToolsOpened()) {
      // If the present state and the desired state match,
      //   do nothing and return.
      return;
    }
    if (_open) {
      mainWindow.webContents.openDevTools({detach: true});
    }
    else {
      mainWindow.webContents.closeDevTools();
    }
    mainWindow.webContents.send('api', {
      target: ["devToolsOpen", "window"],
      data:   _open
    })
    config.devToolsOpen = _open;
    config.dirty = true;
  }

  this.openLogWindow = function(_open) {
    // Instantiating a satalite window to view log.
    if (_open ^ !loggerWindow) {
      // If the logger window state and the desired open state match,
      //   do nothing and return.
      return;
    }
    if (!loggerWindow) {
      loggerWindow = new BrowserWindow({
        'width':  (config.logwindow_size) ? config.logwindow_size[0] : 800,
        'height': (config.logwindow_size) ? config.logwindow_size[1] : 600,
        'icon': './app/media/manuvr_transparent.png',
        'title': 'Manuvr Logger',
        'subpixel-font-scaling': true,
        'skip-taskbar': true
      });
      //loggerWindow.setMenu(null);
      loggerWindow.loadURL('file://'+__dirname+'/app/logger.html');
      loggerWindow.on('closed',
        function() {
          loggerWindow = false;
          if (mainWindow && mainWindow.webContents) {
            mainWindow.webContents.send('api', {
                target: ["loggerWindowOpen", "window"],
                data:   false
            });
          }
        }
      );

      loggerWindow.on('resize',
        _throttle(function() {
          config.logwindow_size = loggerWindow.getSize();
          config.dirty = true;
        }, 500)
      );

      loggerWindow.on('move',
        _throttle(function() {
          config.logwindow_position = loggerWindow.getPosition();
          config.dirty = true;
        }, 500)
      );

      if (config.logwindow_position) {
        loggerWindow.setPosition(config.logwindow_position[0], config.logwindow_position[1]);
      }
      else {
        loggerWindow.center();
      }

      //loggerWindow.setMenu(null);
      mainWindow.webContents.send('api', {
        target: ["loggerWindowOpen", "window"],
        data:   true
      });

      config.logWindowOpen = true;
      config.dirty = true;
      loggerWindow.show();
    }
    else {
      loggerWindow.close();
      config.logWindowOpen = false;
      config.dirty = true;
    }
  };

  this.interface_spec = {
    type:  'window',
    schema: {
      inputs: {
        'quit': {
          label: "Quit",
          args: [],
          func: function(me, data) {
            quit();
          }
        },
        'toggleHiddenSchema': {
          label: "Show schema elements marked hidden",
          args: [],
          func: function(me, data) {

          }
        },
        'toggleDevTools': {
          label: "Toggle dev tools",
          args: [],
          func: function(me, data) {
            me.openDevTools(!mainWindow.webContents.isDevToolsOpened());
          }
        },
        'toggleLogWindow': {
          label: "Toggle log window",
          args: [ ],
          func: function(me, data) {
            me.openLogWindow(!loggerWindow);
          },
        },
        'ready' : {
          label: "ready",
          args: [ { label: "Ready", type: "boolean"}],
          func: function(me, data){
            mainWindow.webContents.send('api', {
                target: ["_adjunctDef", "window"],
                data:   me.getIntSpec()
            });
            // The react front-end is ready.
            me.emit('ready', {});
          },
          hidden: true
        }
      },
      outputs: {
        'showingHiddenSchema': {
          type: 'boolean',
          value:  false
        },
        'devToolsOpen': {
          label: 'Dev tools Open',
          type: 'boolean',
          value:  config.devToolsOpen
        },
        'loggerWindowOpen': {
          label: 'Log window Open',
          type: 'boolean',
          value:  config.logWindowOpen
        }
      }
    },
    adjuncts: {
    },
    taps: {
      names: {
      },
      types: {
        "mHub": {
          'log': function(me, msg, adjunctID) {
            pushToLog(msg);
            return false;
          }
        }
      }
    }
  };

  // instantiate handler
  this.mH = new messageHandler(this.interface_spec, this);
  this.mH.addAdjunct("mHub", new mHub(config));
}

inherits(window, ee);


var window = new window();


app.on('window-all-closed', function() {
  quit('SIGQUIT');
});


app.on('ready', function() {
  mainWindow = new BrowserWindow(
    {
      'width':  (config.window_size) ? config.window_size[0] : 800,
      'height': (config.window_size) ? config.window_size[1] : 600,
      'icon': './app/media/manuvr_transparent.png',
      'title': 'Manuvr Host Bridge',
      'subpixel-font-scaling': true
    }
  );
  mainWindow.setMenu(null);

  if (config.window_position) {
    mainWindow.setPosition(config.window_position[0], config.window_position[1]);
  }
  else {
    mainWindow.center();
  }

  mainWindow.loadURL('file://'+__dirname+'/app/app.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
    quit();
  });


  mainWindow.on('resize',
    _throttle(function() {
      config.window_size = mainWindow.getSize();
      config.dirty = true;
    }, 500)
  );

  mainWindow.on('move',
    _throttle(function(){
      config.window_position = mainWindow.getPosition();
      config.dirty = true;
    }, 500)
  );


  var dom_loaded = false;
  //const menu = new Menu();
  //menu.append(new MenuItem({
  //  label: 'Print',
  //  accelerator: 'CmdOrCtrl+P',
  //  click: () => { console.log('time to print stuff') }
  //}))

  //if (electronLocalshortcut.isRegistered(mainWindow, 'Ctrl+R')) {
  //  electronLocalshortcut.unregister(mainWindow, 'Ctrl+R');
  //}

  //electronLocalshortcut.register(mainWindow, 'Ctrl+R', function() {
    mainWindow.loadURL('file://'+__dirname+'/app/app.html');
  //});

  // Listener to take input from the user back into MHB.
  ipcMain.on('api', function(event, message) {
      if(message.target[message.target.length - 1] === "window") {
        message.target.pop();
      }
      window.emit('input', message)
      //console.log("sent a client msg:" + util.inspect(message))
  });

  // Listener to take input from the user back into MHB.
  ipcMain.on('loggerReady', function(event, message) {
    if (loggerWindow) {
      loggerWindow.webContents.send('fullLog', cached_logs);
    }
  });

  // Listener to take input from the user back into MHB.
  window.on('output', function(message) {
      message.target.push('window');
      if (message.target[0] === '_adjunctUpdate') {
        message.target[0] = '_adjunctDef';
        message.data = window.getIntSpec();
      }
      mainWindow.webContents.send('api', message)
  });


  mainWindow.webContents.on('dom-ready', function() {
    if (dom_loaded) {
      // TODO: Unload listener?
      return;
    }
    dom_loaded = true;
  });

  mainWindow.show();
  if (config.logWindowOpen) window.openLogWindow(true);
  if (config.devToolsOpen) window.openDevTools(true);
  //window.emit('input', {target:['ready']});
});
