'use strict'

// Template for transports (bluetooth, serial, loopback, TCP/IP)
var inherits = require('util').inherits;
var ee = require('events').EventEmitter;
// may want to subscribe to global emitter?

var bt = require('bluetooth-serial-port');


var connected = false;

// sample config for transport parameters
var config = {
  address: null,
  port: null
    // etc
};

// EXPOSED OBJECT / CONSTRUCTOR
function mTransport() {
  var that = this;
  this.transport = new bt(); // will change base on transport
  this.init();

  var toTransport = function(buffer) {
    that.transport = 'x';
  }

  var fromTransport = function(buffer) {
    that.emit('fromTransport', buffer)
  }

  // will depend on transport library....
  this.on('fromTransport', fromTransport);
  this.on('toTransport',   toTransport);
  
  
  // These things are bluetooth-specific callbacks that we wrap.
  this.transport.on('found', function(address, name) {
    console.log('Found "' + name + '" Bluetooth device at ' + address);
    ee.emit('mTransportCustom', {'source': this, 'method': 'found', 'name': name, 'address': address});
  });
  
  this.transport.on('data', function(buffer) {
    console.log("Getting some BT data...");
    ee.emit('fromTransport', buffer);
  });
  
  this.transport.on('closed', function(){
    console.log('BT connection closed.');
    connected = false;
    ee.emit('disconnected');
  });

};

util.inherits(mTransport, ee);

mTransport.prototype.init = function() {

};



mTransport.prototype.send = function(buffer) {
  if(connected){
    this.transport.write(buffer, function(err, bytesWritten) {
        if (err) console.log(err);
        console.log("Sent " + bytesWritten + " bytes via bluetooth.");
  	});
  } else {
    console.log("Not connected!");
  }
};



mTransport.prototype.connect = function(options) {
		console.log("Attempting to connect to " + options.address)
		ee.emit('connected', -1);
		this.transport.findSerialPortChannel(options.address, function(channel) {
				this.transport.connect(options.address, channel, function() {
					console.log("Connected on channel " + channel + ".");
					connected = true;
					ee.emit('connected');
				}, function () {
					console.log("Connection failed, but a channel was acquired");
					connected = false;
					ee.emit('disconnected');
				});
		}, function() {
			console.log("Connection failed, and no channel was acquired");
			connected = false;
			ee.emit('disconnected');
		})
};


mTransport.prototype.disconnect = function() {
  console.log("Closing BT connection...");
  this.transport.close();
};

mTransport.prototype.getConfig = function(message) {
  // TBD... This involves message definitions for specific module emits
  return config;
}





