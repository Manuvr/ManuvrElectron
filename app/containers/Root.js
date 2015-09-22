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

  componentDidMount() {
    ipc.on('toClient', function(args){
        fromHub(args, state, this.setState));
    });

    ipc.on('sessionList', function(args) {
        console.log(args);
    });

    ipc.on('transportList', function(args) {
        console.log(args);
    });
  };

  handleChange(cbObject, state, this.setState) {
    callbackChain(cbObject, state, this.setState);
  };

  render() {


    return (
      <div>
        <MHBmain mConfig={mConfig} cb={this.handleChange} />
      </div>
    );
  }
}

export default DebugApp;
