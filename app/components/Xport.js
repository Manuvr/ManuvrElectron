import React from 'react';


var counter = 0;


class XPort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moo: 0
    };
    ipc.on('toClient', function(event, ipc_args) {
      var ses    = ipc_args.shift();
      var origin = ipc_args.shift();
      var method = ipc_args.shift();
      var args   = ipc_args.shift();
      //console.log('IPC: '+ses+'::' + origin+'->' +method + ipc_args);
      // TODO: Do something smart here? Move this to the store? Wat do, guise?   ---J. Ian
      
    });
  }
  
  
  moreMoo() {
    this.setState({moo: this.state.moo+1});
    // PS.... you can send events back into MHB this way....
    ipc.send('actor0', ['transport', 'connect', true]);
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
