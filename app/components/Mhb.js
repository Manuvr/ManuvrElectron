import React, { Component, PropTypes } from 'react';
import { map as _map } from 'lodash';

// styling and components
import * as Elemental from 'elemental';
require('../site.less');

import SelfDefineMaster from './SelfDefineMaster';


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

    let Row = Elemental.Row
    let Col = Elemental.Col
    let layerCallback = this.layerCallback;

    return (
      <div>
          <SelfDefineMaster config={config} callback={layerCallback} />
          <br/><br/>
          <br/>
          <pre >{JSON.stringify(config, null, 2)}</pre>
      </div>
    )
  }
}

export default Mhb;
