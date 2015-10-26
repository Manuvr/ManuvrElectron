'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';



//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

ReactDOM.render(<Root />, document.getElementById('root'));
