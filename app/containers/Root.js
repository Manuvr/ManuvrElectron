import React, { Component } from 'react';

import Mhb from '../components/Mhb';

import socketActions from '../utils/socketActions.js';
import uiActions from '../utils/uiActions.js';
import * as defaultState from '../utils/defaultState';

class DebugApp extends Component {

  constructor() {
    super();
    // This is !@#$ing stupid.
    this.state = defaultState;
    this.render = this.render.bind(this);
    this.ipcInput = this.ipcInput.bind(this);
    this.compCb = this.compCb.bind(this);
  }

  componentDidMount() {
    ipc.on('api', this.ipcInput);
    ipc.send('api', {
        target: ['ready', 'window'],
        data: true
    });
  };

  // emits coming in.  capable of setting state.  Should ONLY touch state.interface
  ipcInput(data) {
      this.setState(socketActions(data, this.state));
  }

  // actions from our components... mostly will emit, but capable of state setting
  compCb(cbObject) {
    this.setState(uiActions(cbObject, this.state));
  };

  render() {
    return (
        <Mhb config={this.state.interface} cb={this.compCb} />
    );
  }
}

export default DebugApp;
