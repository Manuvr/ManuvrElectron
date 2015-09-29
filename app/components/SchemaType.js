import React, { Component, PropTypes } from 'react';

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

    let layerCallback = this.layerCallback

    let compList = [];

    if (name !== "inputs" && name !== "outputs" && name !== "state") {
      compList.push({vals})
    } else {
      _forOwn(vals, function(value, key) {
          compList.push(<li><SchemaElement type={name} name={key} def={value} callback={layerCallback}/> </li>)
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
