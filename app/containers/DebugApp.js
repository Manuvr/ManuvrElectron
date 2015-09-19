import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import components that are used here
import Counter from '../components/Counter';
import Debug from '../components/Debug';
import Mhb from '../components/MHB';

// import action creators that are used here
import * as CounterActions from '../actions/counter';
import * as mActions from '../actions/mActions';



class DebugApp extends Component {
  render() {
    // declare the state names from your reducers.index
    const { mConfig, counter, dispatch } = this.props;
    // bind your action creators with this syntax
    const actions = bindActionCreators({...mActions, ...CounterActions}, dispatch);

    // Counter is set up using redux. Everything below Debug is not.
    return (
      <div>
        {/*
        <Counter increment={actions.increment}
          incrementIfOdd={actions.incrementIfOdd}
          incrementAsync={actions.incrementAsync}
          decrement={actions.decrement}
          counter={counter}
        />*/}
        <Debug />

        <Mhb actions={actions} mConfig={mConfig} />
        <div>Connecting?: {this.props.mConfig.connecting}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
    mConfig: state.mConfig
  }
}


export default connect(mapStateToProps)(DebugApp);
