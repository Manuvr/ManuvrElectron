import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon, Collapse, Well } from 'react-bootstrap';
import { get as _get } from 'lodash';

import MHub from './MHub'
import GenericAdj from './GenericAdj'
import LoopbackFactory from './LoopbackFactory'
import WebsocketFactory from './WebsocketFactory'
import BluetoothSerialFactory from './BluetoothSerialFactory'
import SerialPortFactory from './SerialPortFactory'
import MSession from './MSession'

class CenterWindow extends Component {

  constructor() {
    super();

    this.state = {
      data: []
    }
    this.render = this.render.bind(this);
  }

  componentDidMount() {
  };

  render() {
    const { config, callback } = this.props;

    var pathBuild = function(path) {
      var newPath = path.slice().reduce(function(p, c, i, a){
        return p.concat([c, "adjuncts"])
      }, [])
      newPath.pop()
      return newPath
    }

    var getAdjFromPath = function(path) {
      return _get(config.interface, pathBuild(path))
    }

    var currentAdj = getAdjFromPath(config.uiState.mainWindow);

    var generic = (
      <GenericAdj adj={currentAdj} uiState={config.uiState} callback={callback} />
    );

    var loadComponent = function(adjType) {
      switch(adjType) {
        case "mHub":
          return (<MHub config={config} callback={callback} key="mHub"/>)
          break;
        case "mSession":
          return (<MSession config={config} callback={callback} key="{currentAdj.name}"/>)
          break;
        case "mTransportFactory":
          switch (currentAdj.name) {
            case 'LoopbackFactory':         return(<LoopbackFactory config={config} callback={callback} />);
            case 'WebSocketFactory':        return(<WebsocketFactory config={config} callback={callback} />);
            case 'SerialPortFactory':       return(<SerialPortFactory config={config} callback={callback} />);
            case 'BluetoothSerialFactory':  return(<BluetoothSerialFactory config={config} callback={callback} />);
            default:                        return(<div>Unimplemented transport component.</div>);
          }
          break;
        default:
          return;
          break;
      }
    }

    return (
      <div>
      <Button bsSize="xsmall" onClick={ ()=> this.setState({ open: !this.state.open })}>
        Show Generic Debug
      </Button>
      <Collapse in={this.state.open}>
        <div>
          <Well>
            {generic}
          </Well>
        </div>
      </Collapse>
        {loadComponent(currentAdj.type)}
      </div>
    );
  }
}

export default CenterWindow;
