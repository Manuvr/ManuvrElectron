import React, { Component, PropTypes } from 'react';
import * as Elemental from 'elemental';

import topNav from './topNav.js';

class Mhb extends Component {

  constructor() {
    super();
    this.toggleDevTools = this.toggleDevTools.bind(this);
  }

  handleClick() {
    console.log("I ACTUALLY DID SOMETHING");
  }

  toggleDevTools() {
    this.props.cb({ origin: "window", method: "toggleDevTools", data: true})
  }

  render() {
    const { config, callback } = this.props;

    var sessionName = "actor007";

    let Button = Elemental.Button
    let Row = Elemental.Row
    let Col = Elemental.Col
    let Topnav = topNav

    //actions.message(['hub', 'newSession', 'lb0', 'actor69'])
    return (
      <div>
        <Row>
          <Topnav />
        </Row>
        <Row>

        </Row>
        <Row>
          Stuff in MHB below here
          <Button onClick={this.handleClick}>This does nothing!</Button>
          <Button onClick={this.toggleDevTools}>Toggle Dev Tools</Button>
        </Row>
        Dev Tools Status: {config.mConfig.window.state.toggleDevTools.value.toString()}

      </div>
    )
  }
}

export default Mhb;
