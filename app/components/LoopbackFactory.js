import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';

class LoopbackFactory extends Component {

  constructor() {
    super();

    this.state = {
      data: []
    }
    this.scan = this.scan.bind(this);
    this.render = this.render.bind(this);
  }

  componentDidMount() {
  };


  render() {
    const { config, callback } = this.props;
    var output = [];
    this.state.scanResult.forEach(function(element, index) {
      output.push(
        <a>{element}</a><br />
      );
    });

    return (
      <div>
        <div><b>Scan results:</b>
          {output}
        </div>
        <Button onClick={this.scan} bsSize="small"><Glyphicon glyph="wrench" />  {(config.outputs.devToolsOpen.value) ? 'Close' : 'Open'} Scan</Button>
      </div>
    );
  }
}

export default LoopbackFactory;
