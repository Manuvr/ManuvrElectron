import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';
import { get as _get } from 'lodash';


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

    var getElemFromPath = function(path, elem) {
      return _get(config.interface, pathBuild(path).concat([elem]))
    }

    return (
      <div>
        Main Window<br />
        {config.uiState.mainWindow}<br/>
        {getElemFromPath(config.uiState.mainWindow, "type")}
      </div>
    );
  }
}

export default CenterWindow;
