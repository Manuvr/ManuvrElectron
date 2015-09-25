import React, { Component } from 'react';

import Debug from '../components/Debug';
import Mhb from '../components/MHB';

import fromHub from '../utils/inboundFunctions';
import {callbackChain, direct} from '../utils/actions';
import defaultState from '..utils/defaultState'

class DebugApp extends Component {
  getInitialState() {
    return defaultState;
  };

  mySetState() {
    return this.setState
  }

  componentDidMount() {
    ipc.on('api', function(args){
        fromHub(args, state, mySetState());
    });
  };

  compCb(cbObject, state, this.setState) {
    callbackChain(cbObject, state, mySetState());
  };

  render() {

    return (
      <div>
        <Mhb mConfig={mConfig} cb={compCb} />
      </div>
    );
  }
}

export default DebugApp;
