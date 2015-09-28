import React, { Component, PropTypes } from 'react';
import * as Elemental from 'elemental';

import {forOwn as _forOwn} from 'lodash';

import Adjunct from './Adjunct';

class SelfDefineMaster extends Component {

  constructor() {
    super();
    this.render = this.render.bind(this);
    this.layerCallback = this.layerCallback.bind(this);
  }

  layerCallback(object) {
    //console.log(JSON.stringify(object, null, 2))
    this.props.callback(object)
  }

  render() {
    const { config, callback } = this.props;

    let Row = Elemental.Row
    let Col = Elemental.Col
    let layerCallback = this.layerCallback

    let compList = [];

    _forOwn(config, function(value, key) {
      compList.push(
        <Adjunct name={key} config={value} callback={layerCallback}/>
      );
    })

    return (
      <div>
        {compList}
        </div>
    )
  }
}

export default SelfDefineMaster;
