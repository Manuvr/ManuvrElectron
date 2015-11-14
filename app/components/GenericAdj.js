import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon, Grid, Row, Col } from 'react-bootstrap';

import { forOwn as _forOwn, has as _has, get as _get } from 'lodash';

import GenericInputs from './GenericInputs';
import GenericOutputs from './GenericOutputs';

class GenericAdj extends Component {

  constructor() {
    super();

    this.state = {
      data: []
    }
    this.render = this.render.bind(this);
    this.submit = this.submit.bind(this)
  };

  componentDidMount() {
  };

  submit(x){
    x.target = x.target.concat(this.props.uiState.mainWindow.slice().reverse())
    this.props.callback(x)
  };


  render() {
    const { adj, uiState, callback } = this.props;

    var inputs = []
    var outputs = []
    var sub = this.submit

    if(_has(adj, ["schema", "inputs"])) {
      _forOwn(adj.schema.inputs, function(val, key){
        if(_get(val, ["hidden"]) !== true || uiState.showHidden) {
          inputs.push(
            <form key={key}className="form-horizontal">
            <GenericInputs key={key} name={key} def={val} callback={sub} />
            </form>)
          }
      })
    }

    if(_has(adj, ["schema", "outputs"])) {
      _forOwn(adj.schema.outputs, function(val, key){
        if(_get(val, ["hidden"]) !== true || uiState.showHidden) {
          outputs.push(<GenericOutputs key={key} name={key} def={val} />)
        }
      })
    }

    // TODO: Floppy-saved should reflect when the schema is dirty, and eligible for re-persisting (saving) the state.
    return (
      <div>
        <Grid fluid={true}>
          <Col xs={6}>
            <h3>Inputs</h3>
            {inputs}
          </Col>
          <Col xs={6}>
            <h3>Output State</h3>
            {outputs}
          </Col>
        </Grid>
      </div>
    );
  }
}

export default GenericAdj;
