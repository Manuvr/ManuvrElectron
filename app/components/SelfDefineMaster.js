import React, { Component, PropTypes } from 'react';
import * as Elemental from 'elemental';

import {forOwn as _forOwn} from 'lodash';

import Adjunct from './Adjunct';

class SelfDefineMaster extends Component {

  constructor() {
    super();
    this.layerCallback = this.layerCallback.bind(this);
  }

  layerCallback(object) {
    // do nothing!
    this.props.callback(object)
  }

  render() {
    const { config, callback } = this.props;

    let Row = Elemental.Row
    let Col = Elemental.Col

    let compList = [];

    _forOwn(config, function(value, key) {
      compList.push(<Adjunct name={key} config={value} callback={layerCallback}/>);
    })

    return (
      <div>
        {compList}
      </div>
    )
  }
}

export default SelfDefineMaster;
