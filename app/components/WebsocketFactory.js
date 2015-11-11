import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';

class WebsocketFactory extends Component {

  constructor() {
    super();

    this.state = {
      data: []
    }
    this.render = this.render.bind(this);
  }

  componentDidMount() {
  };


  render() {
    const { config, callback } = this.props;

    return (
      <div >
        omg, yu no finish WebsocketFactory?
      </div>
    );
  }
}

export default WebsocketFactory;
