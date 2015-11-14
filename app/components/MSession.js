import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';

import TransportInstance from './TransportInstance';
import MCore from './MCore';

class MSession extends Component {

  constructor() {
    super();

    this.state = {
    }
    this.render = this.render.bind(this);
  }

  componentDidMount() {
  };


  render() {
    return (
      <div>
      This is the session component.
      </div>
    );
  }
}

export default MSession;
