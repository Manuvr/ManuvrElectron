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
      color: 'white',
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
      <div >
        <Grid fluid={true} >
          <Row className="show-grid" >
            <Col xs={4} style={topStyle}>
              <h1 style={{ marginTop: 10}}><Image src="media/manuvr_transparent.png" height="60" rounded style={imgStyle} /><span className="manuvr">&nbsp;manu<span style={{ color: "Violet"}}>vr</span></span></h1>
            </Col>
            <Col xs={8} style={windowButtonStyle}>
              {windowObj}
            </Col>
          </Row>
          <Row className="show-grid" >
            <Col xs={3} style={menuStyle}>
              <br />
              <LeftWindow config={config} callback={layerCallback}  />
            </Col>
            <Col xs={9}>
              <CenterWindow config={config} callback={layerCallback} />
            </Col>
          </Row>
        </Grid>
      </div>
    )

  }

}

export default RootView;
