import React, { Component, PropTypes } from 'react';
import { map as _map } from 'lodash';

// styling and components

import SelfDefineMaster from './SelfDefineMaster';
import Window from './Window';
import LeftWindow from './LeftWindow';
import CenterWindow from './CenterWindow';

// styling
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/lib/card';
import { IconButton } from 'material-ui/lib/icon-button'

import {Grid, Row, Col, Button, Image} from 'react-bootstrap';

class Mhb extends Component {

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
      height: '500px'
    }

    let imgStyle = {
      backgroundColor: 'white',
      padding: 5
    }

    var windowObj = "derp"
    if(config.interface.window.hasOwnProperty("schema")) {
      windowObj = (<Window config={config.interface.window.schema} callback={layerCallback} />)
    }

    return (
      <div>
        <Grid fluid={true}>
          <Row className="show-grid" >
            <Col xs={7} style={topStyle}>
              <h1><Image src="media/manuvr_transparent.png" height="60" rounded style={imgStyle} />&nbsp; Manuvr</h1>
            </Col>
            <Col xs={5} style={windowButtonStyle}>
              {windowObj}
            </Col>
          </Row>

          <Row className="show-grid" style={ { height: '100%' } }>
            <Col xs={3} style={menuStyle}>
              <LeftWindow config={config} callback={layerCallback} />
            </Col>
            <Col xs={7}>
              <CenterWindow config={config} callback={layerCallback} />
            </Col>
          </Row>

        </Grid>

        <Card initiallyExpanded={false}>
        <CardHeader
          title="Old Self-Define"
          showExpandableButton={true}>
        </CardHeader>
        <CardText expandable={true}>
        <SelfDefineMaster config={config.interface} callback={layerCallback} />
        </CardText>
        </Card>

        <Card initiallyExpanded={false}>
          <CardHeader
            title="Current JSON interface state"
            showExpandableButton={true}>
          </CardHeader>
          <CardText expandable={true}>
            <pre >{JSON.stringify(config, null, 2)}</pre>
          </CardText>
        </Card>

      </div>

    )

  }

}

export default Mhb;
