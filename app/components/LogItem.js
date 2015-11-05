import React, { Component, PropTypes } from 'react';

class LogItem extends Component {

  constructor() {
    super();

    this.render = this.render.bind(this);
  }

  componentDidMount() {
  };

  render() {
    const { verbosity, logTime, body, origin } = this.props;
    
    return (
        <tr>
          <td>
            {verbosity}
          </td>
          <td>
            {logTime}
          </td>
          <td>
            {origin}
          </td>
          <td>
            {body}
          </td>
        </tr>
    );
  }
}

export default LogItem;
