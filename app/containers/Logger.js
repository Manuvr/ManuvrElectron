import React, { Component, PropTypes } from 'react';
import LogItem from '../components/LogItem';

import { Button, ButtonToolbar } from 'react-bootstrap';

class Logger extends Component {

  constructor() {
    super();
    // This is !@#$ing stupid.
    this.state = {
      scrollbackSize:  1000,
      logStack:  []
    };


    this.render           = this.render.bind(this);
    this.provideSingleLog = this.provideSingleLog.bind(this);
    this.setInitLogStack  = this.setInitLogStack.bind(this);
    this.clearLog         = this.clearLog.bind(this);
    this.compCb           = this.compCb.bind(this);
  }

  componentDidMount() {
    ipc.on('log', this.provideSingleLog);
    ipc.on('fullLog', this.setInitLogStack);
    ipc.send('loggerReady', true);
  };

  clearLog(test) {
    this.setState({
        logStack: []
    });
  };

  // emits coming in.  capable of setting state.  Should ONLY touch state.interface
  setInitLogStack(data) {
    this.setState({
        logStack: data
    })
  }

  // emits coming in.  capable of setting state.  Should ONLY touch state.interface
  provideSingleLog(msg) {
    this.setState({
        logStack: this.state.logStack.concat(msg.data)
    })
  }

  // actions from our components... mostly will emit, but capable of state setting
  compCb(cbObject) {
    //this.setState(uiActions(cbObject, this.state));
  };

  render() {
    var output = [];
    this.state.logStack.forEach(function(element, index) {
        output.push(
          <LogItem key={index} verbosity={element.verbosity} logTime={element.dt} body={element.body} origin={element.origin} />
        );
    });


    return (
      <div>
        <div id="control_pane">
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={this.clearLog}>Clear Log</Button>
            <Button>Something Else</Button>
          </ButtonToolbar>
        </div>
        <div id="filter_pane">
        </div>
        <div id="log_pane">
          {output}
        </div>
       </div>
    );
  }
}

export default Logger;
