import React, { Component, PropTypes } from 'react';

import {forOwn as _forOwn} from 'lodash';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import {Grid, Cell} from 'react-flexr';

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

    let displayLabel = def.label ? def.label : name;
    let stateString = def.value !== undefined && def.value.toString() !== "" ? def.value.toString() : "(undefined)";


    switch(type) {
      case("inputs"):
        // compList.push(<label>{def.label ? def.label : name}</label>)
        // compList.push(<input type="text" value={this.state.data} onChange={this.handleChange} placeholder={def.type}/>)
        // compList.push(<button onClick={layerCallback}>Submit</button>)
        compList.push(<TextField
          value={this.state.data}
          hintText={def.type}
          floatingLabelText={def.label ? def.label : name} />);
        compList.push(<RaisedButton label="=>" secondary={true} onClick={layerCallback} />);
        break;
      case ("outputs"):
        compList.push(<div>{displayLabel}: {def.type}</div>);
        break;
      case ("state"):
        //compList.push(<div>{def.label ? def.label : name}: {def.value.toString()}</div>)
        compList.push(<Paper ><strong style={{color: "grey"}}> {displayLabel}: </strong>{stateString}</Paper>)
        break;
      default:
        compList.push(<Paper zDepth={2}><strong style={{color: "grey"}}>{displayLabel}: </strong>{def}</Paper>)
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
