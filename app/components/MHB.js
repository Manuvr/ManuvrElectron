import React, { Component, PropTypes } from 'react';

class Mhb extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.action}>{this.props.name}</button>
      </div>
    )
  }
}

export default Mhb;
