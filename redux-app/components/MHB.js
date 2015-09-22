import React, { Component, PropTypes } from 'react';

class Mhb extends Component {
  render() {
    const { actions, mConfig, dispatch } = this.props;

    var sessionName = "actor007";

    //actions.message(['hub', 'newSession', 'lb0', 'actor69'])

    return (
      <div>
        <button onClick={() => actions.toHub('newSession', ['lb0', sessionName])}> WAT </button>
        <br/>
        <button onClick={() => actions.toHub('window', ['dev_tools'])}> DevTools </button>
        <button onClick={() => actions.toHub('window', ['dump_sessions'])}> Sessiondump </button>
        <br/>
        <button onClick={mConfig.connecting === "Yes" ? actions.disconnect(sessionName) : actions.connect(sessionName)}>
          {mConfig.connecting === "Yes" ? "Disconnect" : "Connect"}
        </button>
      </div>
    )
  }
}

export default Mhb;
