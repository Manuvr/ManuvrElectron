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
        <div>
          <span>
            {verbosity}
          </span>
          <span>
            {logTime}
          </span>
          <span>
            {origin}
          </span>
          <span>
            {body}
          </span>
        </div>
    );
  }
}

export default LogItem;
