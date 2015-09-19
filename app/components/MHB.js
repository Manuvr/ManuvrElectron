import React, { Component, PropTypes } from 'react';

class Mhb extends Component {
  render() {
    const { actions, mConfig, dispatch } = this.props;

    //actions.message(['hub', 'newSession', 'lb0', 'actor69'])

    return (
      <div>
        <button onClick={() => actions.toHub('newSession', ['lb0', 'actor007'])}> WAT </button>
        <br/>
        <button onClick={mConfig.connecting === "Yes" ? actions.disconnect : actions.connect}>
          {mConfig.connecting === "Yes" ? "Disconnect" : "Connect"}
        </button>
      </div>
    )
  }
}

export default Mhb;
