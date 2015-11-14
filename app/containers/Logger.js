import React, { Component, PropTypes } from 'react';
import LogItem from '../components/LogItem';

import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';


var containerStyle = {
  backgroundImage:  'url(media/manuvr_transparent_1024.png)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
};

var opacityOverlayStyle = {
  backgroundColor: '#ffffff',
  opacity: 0.9
};

var logPaneStyle = {
  backgroundColor: '#ffffff',
  opacity: 0.9,
  height: '1024px'
};


class Logger extends Component {

  constructor() {
    super();

    this.state = {
      scrollbackSize:  1000,
      verb_filter:  7,
      logStack:  []
    };

    this.render           = this.render.bind(this);
    this.provideSingleLog = this.provideSingleLog.bind(this);
    this.setInitLogStack  = this.setInitLogStack.bind(this);
    this.clearLog         = this.clearLog.bind(this);
    this.compCb           = this.compCb.bind(this);
    this.setVerbosity     = this.setVerbosity.bind(this);
  }

  componentDidMount() {
    ipc.on('log', this.provideSingleLog);
    ipc.on('fullLog', this.setInitLogStack);
    ipc.send('loggerReady', true);
  };

  clearLog() {
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
        logStack: this.state.logStack.concat(msg)
    })
  }

  // actions from our components... mostly will emit, but capable of state setting
  compCb(cbObject) {
    //this.setState(uiActions(cbObject, this.state));
  };

  setVerbosity(nu_verb) {
    this.setState({
        verb_filter: nu_verb
    })
  };

  render() {
    var output = [];
    var vf = this.state.verb_filter;
    this.state.logStack.forEach(function(element, index) {
      if (element.verbosity <= vf) {
        console.log(JSON.stringify(element));
        output.push(
          <LogItem key={index} verbosity={element.verbosity} logTime={element.dt} body={element.body} origin={element.origin} />
        );
      }
    });

    return (
      <div style={containerStyle}>
        <div id="control_pane" style={opacityOverlayStyle}>
          <ButtonToolbar>
            <Button onClick={this.clearLog}><Glyphicon glyph="trash" /></Button>
            <ButtonGroup>
              <Button onClick={this.setVerbosity.bind(this, 0)}>0</Button>
              <Button onClick={this.setVerbosity.bind(this, 1)}>1</Button>
              <Button onClick={this.setVerbosity.bind(this, 2)}>2</Button>
              <Button onClick={this.setVerbosity.bind(this, 3)}>3</Button>
              <Button onClick={this.setVerbosity.bind(this, 4)}>4</Button>
              <Button onClick={this.setVerbosity.bind(this, 5)}>5</Button>
              <Button onClick={this.setVerbosity.bind(this, 6)}>6</Button>
              <Button onClick={this.setVerbosity.bind(this, 7)}>7</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
        <div id="filter_pane" style={opacityOverlayStyle}>
        </div>
        <div id="log_pane" style={logPaneStyle}>
          <Table responsive>
            <thead>
              <tr>
                <th>Time</th>
                <th>Origin</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {output}
            </tbody>
          </Table>
        </div>
       </div>
    );
  }
}

export default Logger;
