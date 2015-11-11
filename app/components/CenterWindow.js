import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Table, Glyphicon } from 'react-bootstrap';


class CenterWindow extends Component {

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
      <div>
        Center Window
      </div>
    );
  }
}

export default CenterWindow;
