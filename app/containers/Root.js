import React, { Component } from 'react';

import Mhb from '../components/MHB';

import fromHub from '../utils/inboundFunctions';
import {callbackChain, direct} from '../utils/actions';
import * as defaultState from '../utils/defaultState'

class DebugApp extends Component {

  constructor() {
    super();
    // This is !@#$ing stupid. ES5 revert soon if we have to manually bind every freaking thing.
    this.state = defaultState;
    this.render = this.render.bind(this);
    this.ipcInput = this.ipcInput.bind(this);
    this.compCb = this.compCb.bind(this);
  }

  componentDidMount() {
    ipc.on('api', this.ipcInput);
    ipc.send('api', { origin: "window", method:"listenerReady", data: true});
  };

  ipcInput(data) {
    this.setState(fromHub(data, this.state));
  }


  compCb(cbObject) {
    this.setState(callbackChain(cbObject, this.state));
  };

  render() {

    return (
      <div>
        <Mhb config={this.state} cb={this.compCb} />
      </div>
    );
  }
}

export default DebugApp;
