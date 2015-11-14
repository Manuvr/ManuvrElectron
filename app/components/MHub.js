import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';

import MSession from './MSession';


class MHub extends Component {

  constructor() {
    super();

    this.state = {
      data: []
    }
    this.render = this.render.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

//newSession
//assignEngine


  componentDidMount() {
  };

  handleClick(){
    console.log("clicked!")
  }


  render() {
    const { config, callback } = this.props;

    // TODO: Floppy-saved should reflect when the schema is dirty, and eligible for re-persisting (saving) the state.
    return (
      <div>
        HEYO.
        <Button onClick={this.handleClick}><Glyphicon glyph="equalizer" />  Engines</Button>
        <Button onClick={this.handleClick}><Glyphicon glyph="link" />   Transports</Button>
      </div>
    );
  }
}

export default MHub;
