import React, { Component, PropTypes } from 'react';
import * as Elemental from 'elemental';

import {forOwn as _forOwn} from 'lodash';

class SchemaElement extends Component {

  constructor() {
    super();
    this.state = {
      data: ""
    }
    this.layerCallback = this.layerCallback.bind(this);
    this.render        = this.render.bind(this);
    this.handleChange  = this.handleChange.bind(this);
  }

  layerCallback() {
    this.props.callback(
      {
        target: [this.props.name],
        data: this.state.data
      }
    )
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({data: e.target.value})
  }


  render() {
    const { type, name, def, callback } = this.props;

    let layerCallback = this.layerCallback
    let compList = [];

    switch(type) {
      case("inputs"):
        compList.push(<label>{def.label ? def.label : name}</label>)
        compList.push(<input type="text" value={this.state.data} onChange={this.handleChange} placeholder={def.type}/>)
        compList.push(<button onClick={layerCallback}>Submit</button>)
        break;
      case ("outputs"):
        compList.push(<div>{def.label ? def.label : name}: {def.type} </div>)
        break;
      case ("state"):
        compList.push(<div>{def.label ? def.label : name}: {def.value.toString()} </div>)
        break;
      default:
        compList.push(<div>{def.label ? def.label : name}: {def}</div>)
        break;
    }

    return (
      <div>
        {compList}
      </div>
    )
  }
}

export default SchemaElement;
