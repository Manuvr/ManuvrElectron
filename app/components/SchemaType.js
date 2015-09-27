import React, { Component, PropTypes } from 'react';
import * as Elemental from 'elemental';

import {forOwn as _forOwn} from 'lodash';

import SchemaElement from './SchemaElement';

class SchemaType extends Component {

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

    if (name === "name") {
      compList.push({vals})
    } else {
      _forOwn(vals, function(value, key) {
          compList.push(<li><SchemaElement type={name} name={key} def={value} /> </li>)
      })
    }

    return (
      <ul>
        <li>{name}</li>
        <ul>{compList}</ul>
      </ul>
    )
  }
}

export default SchemaType;
