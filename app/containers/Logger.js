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


var redButtonStyle = {
  color: 'red'
};

var logPaneStyle = {
  backgroundColor: '#ffffff',
  opacity: 0.9,
  height: '1024px'
};


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
        logStack: this.state.logStack.concat(msg)
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
      <div style={containerStyle}>
        <div id="control_pane" style={opacityOverlayStyle}>
          <ButtonToolbar>
            <Button onClick={this.clearLog}><Glyphicon glyph="trash" /></Button>
            <ButtonGroup>
              <Button>0</Button>
              <Button>1</Button>
              <Button>2</Button>
              <Button>3</Button>
              <Button>4</Button>
              <Button>5</Button>
              <Button>6</Button>
              <Button>7</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
        <div id="filter_pane" style={opacityOverlayStyle}>
        </div>
        <div id="log_pane" style={logPaneStyle}>
          <Table responsive>
            <thead>
              <tr>
                <th>Verbosity</th>
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
