import React, { Component, PropTypes } from 'react';

class topNav extends Component {
  render() {
    const { mConfig, name, cb } = this.props;
    //actions.message(['hub', 'newSession', 'lb0', 'actor69'])

    return (
      <div>
        THIS IS THE TOP NAV
        <br /> MOAR NAV STUFFS HERE
      </div>
    )
  }
}

export default topNav;
