import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';

class MCore extends Component {

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
      This should contain logic to load user view components for a given engine.
      </div>
    );
  }
}

export default MCore;
