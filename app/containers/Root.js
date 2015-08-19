import React, { Component } from 'react';
import DebugApp from './DebugApp';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';
import configureStore from '../store/configureStore';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <DebugApp />}
      </Provider>
    );
  }
}
