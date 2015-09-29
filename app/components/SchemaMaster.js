import React, { Component, PropTypes } from 'react';

import {forOwn as _forOwn} from 'lodash';

import SchemaType from './SchemaType';

class SchemaMaster extends Component {

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

    let layerCallback = this.layerCallback;

    let compList = [];

    _forOwn(schema, function(value, key) {
      compList.push(<SchemaType name={key} vals={value} callback={layerCallback}/>);
    })

    return (
      <div>
        {compList}
        </div>
    )
  }
}

export default SchemaMaster;
