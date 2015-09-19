'use strict';

import React from 'react';
import Root from './containers/Root';

ipc.on('toClient', function(ses, origin, method, args) {
  console.log('IPC: '+ses+'::' + origin+'->' +method + args);
  // TODO: Do something smart here? Move this to the store? Wat do, guise?   ---J. Ian
  
  // PS.... you can send events back into MHB this way....
  //ipc.send(target_session, target_module, method, (args.length > 0 ? args : null));
  ipc.send(ses, 'client', 'log', 'Got your message. This should display in the main thread\' log.');
});

React.render(<Root />, document.getElementById('root'));


