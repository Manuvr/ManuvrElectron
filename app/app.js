'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import Logger from './containers/Logger';


//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

if (document.getElementById('root') !== null) {
  ReactDOM.render(<Root style={{"height" : "100%"}} />, document.getElementById('root'));
}
else if (document.getElementById('logger_root') !== null) {
  ReactDOM.render(<Logger />, document.getElementById('logger_root'));
}
else {
   alert('Don\'t know what to do now.');
}
