import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';
import { get as _get } from 'lodash';

import MHub from './MHub'
import GenericAdj from './GenericAdj'
import LoopbackFactory from './LoopbackFactory'
import WebsocketFactory from './WebsocketFactory'

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

    var loadComponent = function(adjType) {
      switch(adjType) {
        case "mHub":
          return (<MHub config={config} callback={callback} key="mHub"/>)
          break;
        case "mTransportFactory":
          switch (currentAdj.name) {
            case 'LoopbackFactory': return(<LoopbackFactory config={config} callback={callback} />);
            case 'WebsocketFactory': return(<WebsocketFactory config={config} callback={callback} />);
            default:                return(<div>Unimplemented transport component.</div>);
          }
          break;
        default:
          // return (
          //   <div>
          //     path: {config.uiState.mainWindow}<br/>
          //     type: {currentAdj.type}
          //   </div>
          // )

          return (<GenericAdj adj={currentAdj} uiState={config.uiState} callback={callback} />)
          break;
      }
    }

    return (
      <div>
        {loadComponent(currentAdj.type)}
      </div>
    );
  }
}

export default CenterWindow;
