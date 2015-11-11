import React, { Component, PropTypes } from 'react';

import {forOwn as _forOwn} from 'lodash';

import SchemaType from './SchemaType';

import { Grid, Cell } from 'react-flexr';
import 'react-flexr/styles.css'

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
      if(key === "inputs" || key === "outputs" ) {
        compList.push(
          <Cell key={key + "a"}>
            <SchemaType
            key={key}
            name={key}
            vals={value}
            callback={layerCallback}
          /></Cell>
        );
      }
    })

    return (
      <Grid>
        {compList}
      </Grid>
    )
  }
}

export default SchemaMaster;
