import React, { Component, PropTypes } from 'react';
import * as Elemental from 'elemental';
import { map as _map } from 'lodash';

import topNav from './topNav';
import SelfDefineMaster from './SelfDefineMaster';

class Mhb extends Component {

  constructor() {
    super();
    this.toggleDevTools = this.toggleDevTools.bind(this);
  }

  handleClick() {
    console.log("I ACTUALLY DID SOMETHING");
  }

  toggleDevTools() {
    this.props.cb({ target: ["window", "toggleDevTools"], data: true})
  }

  render() {
    const { config, callback } = this.props;

    let Button = Elemental.Button
    let Row = Elemental.Row
    let Col = Elemental.Col
    let Topnav = topNav

    return (
      <div>
        <Row>
          <Topnav />
        </Row>
        <Row>
          <SelfDefineMaster config={config} callback={callback} />
        </Row>
        <Row>
          Examples:
          <Button onClick={this.handleClick}>This does nothing!</Button>
          <Button onClick={this.toggleDevTools}>Toggle Dev Tools</Button>
          Dev Tools Status: {config.window.schema.state.toggleDevTools.value.toString()}
        </Row>

      </div>
    )
  }
}

export default Mhb;
