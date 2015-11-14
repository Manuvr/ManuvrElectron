import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';

class SerialPortFactory extends Component {

  constructor() {
    super();

    this.state = {
      scanResult: []
    }
    this.render = this.render.bind(this);
  }

  componentDidMount() {
  };


  render() {
    const { config, callback } = this.props;

    var output = [];
    var listening_mu = [];

    listening_mu.push((this.state.listening) ?
      <div>Listening</div>
      : /*More JSX abuse. Will it blend?*/
      <div>Interface not listening</div>
    );

    this.state.scanResult.forEach(function(element, index) {
      output.push(
        <a>{element}</a>, /* lol
        jsx */
        <br />,
        <div>

        </div>
      );
    });

    return (
      <div>
        <div><b>Scan results:</b>
          {output}
        </div>
        <Button bsSize="small"><Glyphicon glyph="wrench" />Scan</Button>
      </div>
    );
  }
}

export default SerialPortFactory;
