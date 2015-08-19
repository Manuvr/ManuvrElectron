import React from 'react';


var counter = 0;


class XPort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moo: 0
    };
  }
  
  
  moreMoo() {
    this.setState({moo: this.state.moo+1});
  }
  
  
  render() {
    return (
      <div>
      <div onClick={   this.moreMoo.bind(this)  }>
        Clickable moreMoo()
      </div>
      
      <div>
        { this.state.moo }
      </div>
      </div>
    )
  }
}


export default XPort;
