import React, { Component, PropTypes } from 'react';
import { map as _map } from 'lodash';

// styling and components

import Window from './Window';
import LeftWindow from './LeftWindow';
import CenterWindow from './CenterWindow';


import {Grid, Row, Col, Button, Image} from 'react-bootstrap';

class RootView extends Component {

  constructor() {
    super();
    this.render = this.render.bind(this)
    this.layerCallback = this.layerCallback.bind(this)
  }

  layerCallback(object) {
    this.props.cb(object)
  }

  render() {
    const { config, callback } = this.props;

    let layerCallback = this.layerCallback;

    let topStyle = {
      backgroundColor: 'purple',
      color: 'White',
      textAlign: 'left',
      verticalAlign: 'middle',
      height: 90
    }

    let windowButtonStyle = {
      backgroundColor: 'purple',
      color: 'white',
      textAlign: 'right',
      verticalAlign: 'middle',
      height: 90
    }

    let menuStyle = {
      backgroundColor: 'LightGrey',
      color: 'black',
      textAlign: 'center',
      "height": "100%"
    }

    let imgStyle = {
      backgroundColor: 'white',
      padding: 5
    }

    var windowObj = "derp"
    if(config.interface.window.hasOwnProperty("schema")) {
      windowObj = (<Window config={config.interface.window.schema} uiState={config.uiState} callback={layerCallback} />)
    }

    return (
      <div style={{"height" : "100%"}}>
        <Grid fluid={true} style={{"height" : "100%"}}>
          <Row className="show-grid" >
            <Col xs={7} style={topStyle}>
              <h1><Image src="media/manuvr_transparent.png" height="60" rounded style={imgStyle} />&nbsp; Manuvr</h1>
            </Col>
            <Col xs={5} style={windowButtonStyle}>
              {windowObj}
            </Col>
          </Row>

          <Row className="show-grid" style={{"height" : "100%"}}>
            <Col xs={3} style={menuStyle}>
              <LeftWindow config={config} callback={layerCallback} style={{"height" : "100%"}} />
            </Col>
            <Col xs={9}>
              <CenterWindow config={config} callback={layerCallback} style={{"height" : "100%"}} />
            </Col>
          </Row>

        </Grid>

      </div>

    )

  }

}

export default RootView;
