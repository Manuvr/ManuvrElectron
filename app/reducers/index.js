import { combineReducers } from 'redux';
import counter from './counter';
import mConfig from './mConfig';

const rootReducer = combineReducers({
 counter,
 mConfig
});

export default rootReducer;
