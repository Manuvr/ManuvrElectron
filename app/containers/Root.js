import React, { Component } from 'react';

import Mhb from '../components/MHB';

import fromHub from '../utils/inboundFunctions';
import {callbackChain, direct} from '../utils/actions';
import * as defaultState from '../utils/defaultState'

class DebugApp extends Component {

  constructor() {
    super();
    this.render = this.render.bind(this);
    this.state = defaultState;
  }

  mySetState() {
    return this.setState
  }

  componentDidMount() {
    ipc.on('api', function(args){
        fromHub(args, state, mySetState());
    });
  };

  compCb(cbObject) {
    callbackChain(cbObject, this.state, this.setState);
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
