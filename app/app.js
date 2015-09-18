'use strict';

import React from 'react';
import Root from './containers/Root';

ipc.on('toClient', function(message) {
  console.log('IPC: toClient: ' + message);
  
});

React.render(<Root />, document.getElementById('root'));


