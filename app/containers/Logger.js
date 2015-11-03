import React, { Component, PropTypes } from 'react';

class Logger extends Component {

  constructor() {
    super();
    // This is !@#$ing stupid.
    this.state = {
      scrollbackSize:  1000,
      logStack:  []
    };
    
    
    this.render = this.render.bind(this);
    this.ipcInput = this.ipcInput.bind(this);
    this.clearLog = this.clearLog.bind(this);
    this.compCb = this.compCb.bind(this);
  }

  componentDidMount() {
    ipc.on('log', this.ipcInput);
  };

  clearLog() {
    this.setState({
        logStack: []
    });
  };

  // emits coming in.  capable of setting state.  Should ONLY touch state.interface
  ipcInput(data) {
    this.setState({
        logStack: this.state.logStack.concat(data)
    });
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
          <button type="button">Clear</button>
          <button type="button">Re-render</button>
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
