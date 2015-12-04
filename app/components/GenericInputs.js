import React, { Component, PropTypes } from 'react';

import {forOwn as _forOwn} from 'lodash';
import { Input, Button, Panel, Grid, Col } from 'react-bootstrap';

// input types: boolean, string, number

class GenericInputs extends Component {

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

  componentDidMount() {
    if(this.props.hasOwnProperty('def') && Array.isArray(this.props.def.args) && this.state.data.length < 2) {
      var defVals = []
      this.props.def.args.map(function(c, i, a){
        if(c.hasOwnProperty('def')){
          defVals[i] = c.def;
        } else {
          defVals[i] = ""
        }
      })
      this.setState({ data: defVals} )
    }
  }

  layerCallback() {
    this.props.callback(
      {
        target: [this.props.name],
        data: this.state.data ? this.state.data : false
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
    let newArray = this.state.data.slice();
    newArray[id] = e.target.checked;
    this.setState({data: newArray})
  }

  render() {
    const { key, name, def, callback } = this.props;

    // def will be an array on INPUT only
    let layerCallback = this.layerCallback;
    let state = this.state;
    let handleChange = this.handleChange;
    let handleCheck = this.handleCheck;
    let that = this;
    let compList = [];

    let displayLabel = def.label ? def.label : name;
    let subm = (
      <Grid fluid={true}>
      <Col xs={9}>
        {displayLabel}
      </Col>
      <Col xs={3}>
        <Button bsStyle="primary" key="button" bsSize="small" onClick={layerCallback}>Send</Button>
      </Col>
      </Grid>
    );

    //compList.push(<br key="break"></br>);
    if(Array.isArray(def.args)) {
      def.args.map(function(currVal, index, fullArr) {
        let localLabel = currVal.label ? currVal.label : name;
        if(currVal.type === "boolean") {
          compList.push(
            <Input
              wrapperClassName="col-xs-offset-6 col-xs-6"
              key={index}
              type="checkbox"
              value={state.data[index]}
              label={localLabel}
              onChange={handleCheck.bind(this, index)}
               />
          )
          if(state.data[index] === undefined) {
            state.data[index] = false;
          }
        } else  {
          compList.push(
            <Input
            labelClassName="col-xs-6" wrapperClassName="col-xs-6"
            type="text"
            key={index}
            value={state.data[index]}
            onChange={handleChange.bind(this, index)}
            placeholder={currVal.type}
            label={localLabel} />);
          }
      })
    }


    return (
      <Panel header={subm}>{compList}</Panel>
    )
  }
}

export default GenericInputs;
