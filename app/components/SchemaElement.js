import React, { Component, PropTypes } from 'react';

import {forOwn as _forOwn} from 'lodash';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import Checkbox from 'material-ui/lib/checkbox';
import {Grid, Cell} from 'react-flexr';


// input types: boolean, string, number

class SchemaElement extends Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
    this.layerCallback = this.layerCallback.bind(this);
    this.render        = this.render.bind(this);
    this.handleChange  = this.handleChange.bind(this);
    this.handleCheck  = this.handleCheck.bind(this);
  }

  layerCallback() {
    this.props.callback(
      {
        target: [this.props.name],
        data: this.state.data
      }
    )
  }

  handleChange(id, e) {
    e.preventDefault()
    let newArray = this.state.data.slice();
    newArray[id] = e.target.value
    this.setState({data: newArray})
  }

  handleCheck(id, e) {
    console.log(id);
    console.log(e);
    let newArray = this.state.data.slice();
    newArray[id] = e.target.checked;
    this.setState({data: newArray})
  }

  render() {
    const { type, name, def, callback } = this.props;

    // def will be an array on INPUT only

    let layerCallback = this.layerCallback;
    let state = this.state;
    let handleChange = this.handleChange;
    let handleCheck = this.handleCheck;
    let that = this;
    let compList = [];

    let displayLabel = def.label ? def.label : name;

    switch(type) {
      case("inputs"):
        // compList.push(<label>{def.label ? def.label : name}</label>)
        // compList.push(<input type="text" value={this.state.data} onChange={this.handleChange} placeholder={def.type}/>)
        // compList.push(<button onClick={layerCallback}>Submit</button>)
        def.map(function(currVal, index, fullArr) {
          let displayLabel = currVal.label ? currVal.label : name;
          if(currVal.type === "boolean") {
            compList.push(
              <Checkbox
                key={index}
                checked={state.data[index]}
                onCheck={handleCheck.bind(this, index)}
                label={displayLabel}
                />
            )
          } else  {
            compList.push(<TextField
              key={index}
              value={state.data[index]}
              onChange={handleChange.bind(this, index)}
              hintText={currVal.type}
              floatingLabelText={displayLabel} />);
            }
        })
        compList.push(<RaisedButton key="button" label={name} secondary={true} onClick={layerCallback} />);
        break;
      case ("outputs"):
        compList.push(<div>{displayLabel}: {def.type}</div>);
        break;
      case ("state"):
        let stateString = def.value !== undefined && def.value.toString() !== "" ? def.value.toString() : "(undefined)";
        //compList.push(<div>{def.label ? def.label : name}: {def.value.toString()}</div>)
        compList.push(<Paper ><strong style={{color: "grey"}}> {displayLabel}: </strong>{stateString}</Paper>)
        break;
      default:
        compList.push(<Paper zDepth={2}><strong style={{color: "grey"}}>{displayLabel}: </strong>{def}</Paper>)
        break;
    }

    return (
      <div>{compList}</div>
    )
  }
}

export default SchemaElement;
