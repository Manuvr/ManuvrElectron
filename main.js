var app           = require('app');
var BrowserWindow = require('browser-window');
var ipc           = require('ipc');
var fs            = require('fs');
var util          = require('util');

// I changed this....
var _cloneDeep    = require('lodash').clonedeep;
var _has          = require('lodash').has;
var _defaultsDeep = require('lodash').defaultsdeep;

var mainWindow = null;
var transportViewWindow = null;

// This is the client's version information.
var packageJSON = require('./package.json');

var mHub = require('MHB/lib/mHub.js');



/** This object stores our presently-active config. This config is the default.
 *  It may be clobbered by loadConfig().
 */
var config = {
  window_size:      [1000, 700],
  window_location:  [0, 0],
  writtenByVersion: packageJSON.version,
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
var interface_spec = {
  schema: {
    state: {
      'toggleDevTools': {
        label: 'Dev tools Open',
        type: 'boolean',
        value:  false
      }
    },
    inputs: {
      'quit': {
        label: 'Quit',
        type: 'boolean'
      },
      'toggleDevTools': {
        label: 'OpenTools',
        type: 'boolean'
      }
    },
    outputs: {
      'toggleDevTools': {
        label: 'Dev tools Open',
        type: 'boolean',
        state: 'toggleDevTools'
      }
    }
  },
  adjuncts: {
  }
};


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


  var dom_loaded = false;
  var hub = new mHub(config);

  var toWindow = function(ipc_args) {
    switch(ipc_args.target[0]) {
      case 'ready':
        // The react front-end is ready.
        hub.clientReady();
        break;

      case 'toggleDevTools':
        var toggle;
        if (mainWindow.webContents.isDevToolsOpened()) {
          toggle = false;
          mainWindow.webContents.closeDevTools();
        }
        else {
          toggle = true;
          mainWindow.webContents.openDevTools({detach: true});
        }
        mainWindow.webContents.send('api', {
          target: ["window", "toggleDevTools"],
          data:   toggle
        })
        break;
      default:
        console.log('No method named '+ipc_args.target[0]+' in toWindow().');
        break
    }
  };

  hub.on('output',
    function(message) {
      console.log(util.inspect(message));
      if ('_adjunctDef' == message.target[message.target.length-1]) {
        // If this is a _adjunctDef, we intercept it and glom it into our own.
        //var level = message.target.slice(0, message.target.length-1);
        //_defaultsDeep(interface_spec.mHub, _cloneDeep(message.data));
        message.target.unshift(['window']);
      }
      else {
        message.target.unshift(['mHub']);
      }
      mainWindow.webContents.send('api', message);
    }
  );


  // Listener to take input from the user back into MHB.
  ipc.on('api', function(event, message) {
    // This is the pass-through to the hub (or the window)
    switch (message.target[0]) {
      case 'mHub':
        // These are messages directed at MHB (the nominal case).
        if (message.target[1] === 'log') {
          // This is the client, so we observe logging in a manner appropriate for us,
          //   likely respecting some filter. But we still pass back into the hub to
          //   write to the log file.
          var body      = message.data.body;
          var verbosity = (message.data.verbosity) ? message.data.verbosity : 7;
          console.log('Renderthread:\t'+body);
        }
        hub.toHub(message);
        break;
      case 'window':
        // Window operations follow this flow. The hub doesn't know anything
        //   about the nature of this particular client.
        message.target.shift();
        toWindow(message);
        break;
      default:
        console.log('No origin named '+message.message.target[0]+'.');
        break;
    }
  });


  mainWindow.webContents.on('dom-ready', function() {
    if (dom_loaded) {
      // TODO: Unload listener?
      return;
    }
    dom_loaded = true;
  });

  mainWindow.show();

  // Instantiating a satalite window.
  //transportViewWindow = new BrowserWindow({ width: 100, height: 80 });
  //transportViewWindow.loadUrl('file://' + __dirname + '/html/xport-view.html');
  //transportViewWindow.on('closed', function() {  transportViewWindow = null;  });
  //transportViewWindow.setMenu(null);
  //transportViewWindow.show();
});
