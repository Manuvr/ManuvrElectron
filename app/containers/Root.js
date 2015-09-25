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

  ipcInput(data) {
    this.setState(fromHub(data, this.state));
  }

  componentDidMount() {
    ipc.on('api', this.ipcInput);
  };

  compCb(cbObject) {
    this.setState(callbackChain(cbObject, this.state));
  };

  render() {

    return (
      <div>
        <Mhb mConfig={this.state} cb={this.compCb} />
      </div>
    );
  }
}

export default DebugApp;
