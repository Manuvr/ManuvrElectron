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
    var row_color = '#ffffff';

    switch (verbosity) {
      case 0:
      case 1:
        row_color = '#ff6666';
        break;
      case 2:
        row_color = '#ff9999';
        break;
      case 3:
        row_color = '#ffff99';
        break;
      case 4:
        row_color = '#99ff99';
        break;
      case 5:
        row_color = '#66ff66';
        break;
      case 6:
        row_color = '#9999ff';
        break;
    }

    let row_style = {backgroundColor: row_color};

    return (
        <tr>
          <td style={row_style}>
            {logTime.substring(0, 8)}
          </td>
          <td style={row_style}>
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
