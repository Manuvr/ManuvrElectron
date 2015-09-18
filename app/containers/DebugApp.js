import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import Debug from '../components/Debug';
import * as CounterActions from '../actions/counter';
import * as MHBActions from '../actions/MHBActions';

class DebugApp extends Component {
  render() {
    const { counter, dispatch } = this.props;
    const actions = bindActionCreators(CounterActions, dispatch);

    // Counter is set up using redux. Everything below Debug is not.
    return (
      <div>
        <Counter increment={actions.increment}
          incrementIfOdd={actions.incrementIfOdd}
          incrementAsync={actions.incrementAsync}
          decrement={actions.decrement}
          counter={counter}
        />
        <Debug />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}


export default connect(mapStateToProps)(DebugApp);
