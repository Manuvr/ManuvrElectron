import React, { Component, PropTypes } from 'react';
import { map as _map } from 'lodash';

// styling and components

import SelfDefineMaster from './SelfDefineMaster';
import Window from './Window';

// styling
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/lib/card';
import { IconButton } from 'material-ui/lib/icon-button'

import {Grid, Row, Col, Button} from 'react-bootstrap';

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
      color: 'white',
      textAlign: 'center'
    }

    let menuStyle = {
      backgroundColor: 'LightGrey',
      color: 'white',
      textAlign: 'center',
      height: '100%'
    }

    var windowObj = "derp"
    if(config.window.hasOwnProperty("schema")) {
      windowObj = (<Window config={config.window.schema} callback={layerCallback} />)
    }

    return (
      <div>
        <Grid fluid={true}>
          <Row className="show-grid" style={topStyle}>
            <Col xs={12}>
              <h5>Window Top Barrrrrr</h5>
              {windowObj}
            </Col>
          </Row>
          <Row className="show-grid" style={ { height: '100%' } }>
            <Col xs={2} style={menuStyle}>
              Menu test
            </Col>
            <Col xs={10}>
              <div>This is the main window</div>
              <Button bsStyle="primary">Primary</Button>
            </Col>
          </Row>

        </Grid>

      </div>

    )

  }

}

export default Mhb;

//   (
//     <AppBar title="Manuvr Debug"
//             style={style}
//             iconElementLeft={ <div /> }
//             iconElementRight={ <div /> }
//     />
//     <SelfDefineMaster config={config} callback={layerCallback} />
//       <br/><br/>
//
//       <Card initiallyExpanded={false}>
//         <CardHeader
//           title="Current JSON interface state"
//           showExpandableButton={true}>
//         </CardHeader>
//         <CardText expandable={true}>
//           <pre >{JSON.stringify(config, null, 2)}</pre>
//         </CardText>
//       </Card>
//   </div>
// )
