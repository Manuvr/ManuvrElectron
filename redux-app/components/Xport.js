import React from 'react';


var counter = 0;


class XPort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moo: 0
    };
    //ipc.on('toClient', function(event, ipc_args) {
    //  var ses    = ipc_args ? ipc_args.shift() : undefined;
    //  var origin = ipc_args ? ipc_args.shift() : undefined;
    //  var method = ipc_args ? ipc_args.shift() : undefined;
    //  var args   = ipc_args ? ipc_args.shift() : undefined;
    //  console.log('IPC: '+event+'\n' + origin+'->' +method + ipc_args);
    //  // TODO: Do something smart here? Move this to the store? Wat do, guise?   ---J. Ian
    //
    //});
  }


  moreMoo() {
    this.setState({moo: this.state.moo+1});
    // PS.... you can send events back into MHB this way....
    //ipc.send('fromClient', ['hub', 'newSession', 'lb0', 'actor99']);
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
