import React, { Component, PropTypes } from 'react';

class Mhb extends Component {
  render() {
    const { actions, mConfig } = this.props;

    return (
      <div>

        <br/>
        <button onClick={mConfig.connecting === "Yes" ? actions.disconnect : actions.connect}>
          {mConfig.connecting === "Yes" ? "Disconnect" : "Connect"}
        </button>
      </div>
    )
  }
}

export default Mhb;
