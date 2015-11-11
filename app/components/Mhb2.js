import React, { Component, PropTypes } from 'react';
import { map as _map } from 'lodash';

// styling and components

import SelfDefineMaster from './SelfDefineMaster';


// styling
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/lib/card'

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

    return (
      <div>
        <AppBar title="Manuvr Debug" iconElementRight={<FlatButton label="???" />} />
        <SelfDefineMaster config={config} callback={layerCallback} />
          <br/><br/>

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
