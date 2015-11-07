import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';


class MHub extends Component {

  constructor() {
    super();

    this.state = {
      data: []
    }
    this.render = this.render.bind(this);
  }

//newSession
//assignEngine


  componentDidMount() {
  };


  render() {
    const { config, callback } = this.props;

    // TODO: Floppy-saved should reflect when the schema is dirty, and eligible for re-persisting (saving) the state.
    return (
      <div>
        <Button onClick={}><Glyphicon glyph="equalizer" />  Engines</Button>
        <Button onClick={}><Glyphicon glyph="link" />   Transports</Button>
      </div>
    );
  }
}

export default MHub;
