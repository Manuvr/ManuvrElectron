'use strict'

// Template for transports (bluetooth, serial, loopback, TCP/IP)
var inherits = require('util').inherits;
var ee = require('events').EventEmitter;
// may want to subscribe to global emitter?

var SerialPort = require('serialport');


var connected = false;

// Default config for a serial port.
var config = {
  portName: null,
  baudrate: 115200
};

var oldList = [];
var newList = [];



// EXPOSED OBJECT / CONSTRUCTOR
function mTransport(options) {
  var that = this;
  this.config = options;
  this.transport = new SerialPort.SerialPort(config.portName, {
    baudrate: config.baudrate,
    parser: SerialPort.parsers.raw
  });
  this.init();

  var toTransport = function(buffer) {
    that.transport = 'x';
  }

  var fromTransport = function(buffer) {
    that.emit('fromTransport', buffer)
  }

  
  var getList = function(){
    var tempList = [];
    SerialPort.list(function (err, ports) {
      ports.forEach(function(port) {
        tempList.push(port.comName);
      });
      ee.emit('serialList', tempList);
      ee.emit('mTransportCustom', {'source': this, 'method': 'found', 'ports': tempList});
    });
  };

  
  var.scanAndConnect = function() {
    if(connected) {
      console.log("Serial already connected!");
    } 
    else {
      SerialPort.list(function (err, ports) {
        if(ports) {
          ports.forEach(function (port) {
            oldList.push(port.comName);
          });
          console.log("Plug in your device within 5 seconds");

          setTimeout(function () {
            SerialPort.list(function (err, ports) {
              if (err) {
                console.log(err);
              }
              else {
                ports.forEach(function (port) {
                  newList.push(port.comName);
                });
                newList = _.difference(newList, oldList);
                if (newList.length > 1) {
                  console.log("More than one serial port changed.  Connection Failed.");
                  resetSerialState();
                }
                else if (newList.length < 1) {
                  console.log("No new serial ports detected.  Connection Failed.");
                  resetSerialState();
                } else {
                  console.log("Connecting to found device...");
                  this.connect(newList[0]);
                }
              }
            });
          }, 5000);
        } else {
          console.log("No Ports Found.");
          resetSerialState();
        }
      });
    }
  };

  // will depend on transport library....
  this.on('fromTransport', fromTransport);
  this.on('toTransport',   toTransport);
  

  this.transport.on("open", function () {
    connected = true;
    ee.emit('connected');
    console.log('Connected via serial.');

    this.transport.on("data", function(data) {
      console.log('data received: ' + data);
      this.fromTransport(data);
    });

    this.transport.on("close", function(data) {
      console.log('Serial Connection Closed.');
      connected = false;
      ee.emit('disconnected');
    });
  });

  this.transport.on("error", function(data){
    console.log("Serial error: " + data);
    connected = false;
    ee.emit("error", data)
  });
};

util.inherits(mTransport, ee);

mTransport.prototype.init = function() {

};



mTransport.prototype.send = function(buffer) {
  if(connected){
    this.transport.write(buffer, function(err, bytesWritten) {
      if (err) console.log(err);
      console.log("Sent " + bytesWritten + " bytes via serial port.");
      });
  }
};



mTransport.prototype.connect = function(options) {
  if (connected) {
    console.log("Already connected!");
  }
  else {
    console.log("Attempting to connect to " + config.portName);
    conn(config.portName);
  }
};


mTransport.prototype.disconnect = function() {
  if (connected) {
    console.log("Closing " + config.portName + "...");
    this.transport.close(function(error){
      if(error) console.log(error);
      else      console.log("Serial Connection Closed.");
    });
  }
  else {
    console.log("Serial port is not open.");
  }
  connected = false;
};


mTransport.prototype.getConfig = function(message) {
  // TBD... This involves message definitions for specific module emits
  return config;
}


