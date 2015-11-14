import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';

class LoopbackFactory extends Component {

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
    this.state.scanResult.forEach(function(element, index) {
      output.push(
        <a>{element}</a>, /* lol
        jsx */
        <br />
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

export default LoopbackFactory;
