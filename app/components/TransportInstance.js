import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';

class TransportInstance extends Component {

  constructor() {
    super();

    this.state = {
      scanResult: []
    }
    this.render = this.render.bind(this);
  }

  componentDidMount() {
  };


  render() {
    const { config, callback } = this.props;
    var output = [];
    var currentAdj = getAdjFromPath(config.uiState.mainWindow);

    if (config.outputs.listening) {
      output.push((config.outputs.listening.value) ? 'Not l' : 'L' + 'istening');
    }
    if (config.outputs.connected) {
      if (config.outputs.connected.value) {
        output.push('Connected');
        if (config.outputs.remoteAddress) {
          output.push(config.outputs.remoteAddress.value);
        }
      }
      else {
        output.push('Disconnected');
      }
    }
    if (config.outputs.localAddress) {
      output.push(config.outputs.localAddress.value);
    }
    if (config.outputs.portConfig) {
      output.push(config.outputs.portConfig.value);
    }

    return (
      <div>
        <div><b>{currentAdj.name}}</b>
          {output}
        </div>
      </div>
    );
  }
}

export default TransportInstance;
