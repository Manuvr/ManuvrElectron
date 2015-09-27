import React, { Component, PropTypes } from 'react';
import * as Elemental from 'elemental';

import {forOwn as _forOwn} from 'lodash';

class SchemaType extends Component {

  constructor() {
    super();
    this.layerCallback = this.layerCallback.bind(this);
  }

  layerCallback(object) {
    this.props.callback(object)
  }

  render() {
    const { type, name, def, callback } = this.props;

    let subVal = {
      target: [name, def.value],
      data: ""
    };

    let compList = [];

    switch(type) {
      case("inputs"):
        compList.push(<label>{name}</label>)
        compList.push(<input type={def.type} ref={name} value={subVal.data} />)
        compList.push(<button onClick={this.layerCallback.bind(this, subVal)}>Submit</button>)
        break;
      case ("outputs"):
        compList.push(<div>{name}: {def.value} </div>)
        break;
      case ("state"):
        compList.push(<div>{name}: {def.label} </div>)
        break;
      default:
        compList.push(<div>{name}: {def}</div>)
        break;
    }

    return (
      <div>
        {compList}
      </div>
    )
  }
}

export default SchemaType;
