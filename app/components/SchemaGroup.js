import React, { Component, PropTypes } from 'react';
import * as Elemental from 'elemental';

import {forOwn as _forOwn} from 'lodash';

class SchemaGroup extends Component {

  constructor() {
    super();
    this.layerCallback = this.layerCallback.bind(this);
  }

  layerCallback(object) {
    // nothing for schema...
    this.props.callback(object)
  }

  render() {
    const { name, vals, callback } = this.props;

    let Row = Elemental.Row
    let Col = Elemental.Col

    let compList = [];
    let schema = config.schema;
    let adjuncts = config.adjuncts;

    _forOwn(vals, function(value, key) {
      compList.push(<div> {key} </div>);
    })

    return (
      <div>
        {name}
        {compList}
      </div>
    )
  }
}

export default SchemaGroup;
