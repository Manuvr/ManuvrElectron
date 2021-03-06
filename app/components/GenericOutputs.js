import React, { Component, PropTypes } from 'react';

import {forOwn as _forOwn} from 'lodash';
import { Input, Button, Panel } from 'react-bootstrap';

// input types: boolean, string, number

class GenericOutputs extends Component {

  constructor() {
    super();
    this.render        = this.render.bind(this);
  }


  render() {
    const { key, name, def } = this.props;

    // def will be an array on INPUT only
    let layerCallback = this.layerCallback;
    let state = this.state;
    let handleChange = this.handleChange;
    let handleCheck = this.handleCheck;
    let that = this;
    let compList = [];

    let displayLabel = def.label ? def.label : name;

    var style = "success";

    if(!def.hasOwnProperty("type")){
      style = "error"
    }

    let stateString = (typeof def.value !== "object" && def.value !== undefined && def.value !== null && def.value.toString() !== "" ? def.value.toString() : "(undefined)");
    compList.push(<Input bsStyle={style} key="state" type="text" addonBefore={displayLabel} value={stateString} disabled></Input>)

    return (
      <div className="form-horizontal">{compList}</div>
    )
  }
}

export default GenericOutputs;
