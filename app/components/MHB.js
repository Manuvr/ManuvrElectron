import React, { Component, PropTypes } from 'react';
import * as Elemental from 'elemental';

import topNav from './topNav.js';

class Mhb extends Component {

  handleClick() {
    console.log("I ACTUALLY DID SOMETHING");
  }

  toggleDevTools() {
    this.props.cb({ origin: "window", method: "toggleDevTools", data: true})
  }

  render() {
    const { mConfig, cb } = this.props;

    var sessionName = "actor007";

    let Button = Elemental.Button
    let Row = Elemental.Row
    let Topnav = topNav

    //actions.message(['hub', 'newSession', 'lb0', 'actor69'])
    return (
      <div>
        <Row>
          <Topnav />
        </Row>
        <Row>
          Everything Else
          <Button onClick={this.handleClick}>This does nothing!</Button>
          <Button onClick={this.toggleDevTools.bind(this)}>Toggle Dev Tools</Button>
        </Row>
        Dev Tools Status: {mConfig.mConfig.window.state.toggleDevTools.value.toString()}

      </div>
    )
  }
}

export default Mhb;
