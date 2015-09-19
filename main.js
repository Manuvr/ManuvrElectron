var app           = require('app');
var BrowserWindow = require('browser-window');
var ipc           = require('ipc');
var $             = require('jquery');

var mainWindow = null;
var transportViewWindow = null;

var packageJSON = require('./package.json');

var util = require('util');




/****************************************************************************************************
 This is stuff that should be cut out as soon as possible. It is hasty copy-pasta.
 ****************************************************************************************************/
var Table = require('cli-table');
var util = require('util');
/**
 * This function instantiates a table with the given header and style. Prevents redundant code.
 *
 * @param   {array}  header     An array of strings to use as a table header.
 * @returns {Table}
 */
var issueOuterTable = function(header) {
  var table = new Table({
    head: header,
    chars: {
      'top': '─',
      'top-mid': '┬',
      'top-left': '┌',
      'top-right': '┐',
      'bottom': '─',
      'bottom-mid': '┴',
      'bottom-left': '└',
      'bottom-right': '┘',
      'left': '│',
      'left-mid': '├',
      'mid': '─',
      'mid-mid': '┼',
      'right': '│',
      'right-mid': '┤',
      'middle': '│'
    },
    style: {
      'padding-left': 0,
      'padding-right': 0
    }
  });
  return table;
}

/****************************************************************************************************
 * Let's bring in the MHB stuff...                                                                   *
 ****************************************************************************************************/
var mSession = require('MHB/lib/mSession.js'); // session factory
var sessionGenerator = new mSession();

var LBTransport = require('MHB/lib/transports/loopback.js'); // loopback

var lb = new LBTransport();

// We track instantiated sessions with this object.
var sessions = {};

// By passing in the transports, we are returned sessions. When a session is successfully
//   setup, the actor variable will become a reference to the specific kind of manuvrable
//   that connected to the given transport.
sessions.actor0 = sessionGenerator.init(lb.transport0);
sessions.actor1 = sessionGenerator.init(lb.transport1);


/**
 * This function is where all toClient callbacks are funneled to (if they are not
 *   specifically handled elsewhere). Common client broadcasts should probably be handled here.
 *   
 * @param   {string}  ses     The name of the session that emitted the event.
 * @param   {string}  origin  The component of the session that emitted the event.
 * @param   {string}  method  The method being emitted.
 * @param   {object}  data    An object containing the arguments to the method.
 */
function toClientAggregation(ses, origin, method, data) {
  var ses_obj = sessions[ses];
  switch (method) {
    case 'log': // Client is getting a log from somewhere.
      if (data[1] && data[1] <= 7) {
        console.log((Math.round(Date.now()/1000).toString()+'\t'+ses) + ' (' + origin + "):\t" + data[0]+"\n");
      }
      break;
    case 'config':
      // A session is telling us that it experienced a configuration change.
      showSessionConfig(ses, data);
      break;
    default:
      {
        var table = issueOuterTable(['Source', 'Method', 'Arguments']);
        table.push([ses+'->'+origin, method, util.inspect(data, {depth: 10})]);
        console.log(table.toString());
      }
      break;
  }
}



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
  mainWindow = new BrowserWindow({width: 1000, height: 600});

  mainWindow.loadUrl('file://'+__dirname+'/app/app.html');
  mainWindow.openDevTools();

  mainWindow.on('closed', function() {  
    mainWindow = null;
    // Close any open satalite windows...
  });

  
  mainWindow.webContents.on('dom-ready', function() {
    // Now, for each session that we have, we should add the toClient listener.
    // This is the means by which events are passed from other components to be
    //   shown to the user, sent via API, etc...
    for (var ses in sessions) {
      if (sessions.hasOwnProperty(ses)) {
        var sesObj = sessions[ses];
        // Listener to inform user of goings-on inside MHB.
        sesObj.on('toClient', function(origin, method, data) {
          //console.log('BRDCAST TO RENDER '+ses +'(origin)'+origin+' '+ method);
          mainWindow.webContents.send('toClient', [ses, origin, method, data]);
        });
        
        // Listener to take input from the user back into MHB.
        ipc.on('fromClient', function(event, ipc_args) {
          if ('client' != ipc_args[1]) {
            sessions[ipc_args[0]].emit('fromClient', ipc_args[1], ipc_args[2], ipc_args[3]);
          }
          else {
            // This is something that the UI wants handled in the main thread.
            switch (method) {
              case 'log':
              default:
                console.log('Main thread received IPC message back. Logging it...\n'+method+'\n'+util.inspect(args));
                break;
            }
          }
        });
      }
    }  
    //TODO:  Perhaps at this point we should push the client object back to the session factory?
  });

  mainWindow.show();

  // Instantiating a satalite window.
  //transportViewWindow = new BrowserWindow({ width: 100, height: 80 });
  //transportViewWindow.loadUrl('file://' + __dirname + '/html/xport-view.html');
  //transportViewWindow.on('closed', function() {  transportViewWindow = null;  });
  //transportViewWindow.setMenu(null);
  //transportViewWindow.show();
});

