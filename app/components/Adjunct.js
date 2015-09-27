import React, { Component, PropTypes } from 'react';
import * as Elemental from 'elemental';

import {forOwn as _forOwn } from 'lodash';

import Schema from './Schema';

class Adjunct extends Component {

  constructor() {
    super();
    this.layerCallback = this.layerCallback.bind(this);
  }

  layerCallback(object) {
    object.unshift(this.props.name);
    this.props.callback(object)
  }

  render() {
    const { name, config, callback } = this.props;

    let Row = Elemental.Row
    let Col = Elemental.Col

    let compList = [];
    let schema = config.schema;
    let adjuncts = config.adjuncts;

    _forOwn(config, function(value, key) {
      compList.push(<Adjunt name={key} config={value} callback={layerCallback}/>);
    })

    return (
      <div>
        {name}
        <Schema schema={schema} callback={layerCallback} />
        {compList}
      </div>
    )
  }
}

export default Adjunct;
