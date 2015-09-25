import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'elemental';

import topNav from './topNav';

class Mhb extends Component {

  handleClick() {
    console.log("I ACTUALLY DID SOMETHING");
  }

  render() {
    const { mConfig, cb } = this.props;
    let Elemental.Row

    var sessionName = "actor007";

    //actions.message(['hub', 'newSession', 'lb0', 'actor69'])


    return (
      <div>
        <Row>
          <topNav mConfig={mConfig} cb={cb} />
        </Row>
        <Row>
          Everything Else
          <Button onClick={this.handleClick}>This does nothing!</Button>
        </Row>

      </div>
    )
  }
}

export default Mhb;
