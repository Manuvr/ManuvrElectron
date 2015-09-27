import React, { Component, PropTypes } from 'react';
import * as Elemental from 'elemental';

import {forOwn as _forOwn} from 'lodash';

import SchemaGroup from './SchemaGroup';

class Schema extends Component {

  constructor() {
    super();
    this.layerCallback = this.layerCallback.bind(this);
  }

  layerCallback(object) {
    // nothing for schema...
    this.props.callback(object)
  }

  render() {
    const { schema, callback } = this.props;

    let Row = Elemental.Row
    let Col = Elemental.Col

    let compList = [];

    _forOwn(schema, function(value, key) {
      compList.push(<SchemaGroup name={key} vals={value} callback={layerCallback}/>);
    })

    return (
      <div>
        {compList}
      </div>
    )
  }
}

export default Schema;
