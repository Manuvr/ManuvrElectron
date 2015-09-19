import { AWAITING_CONNECTION } from '../actions/mActions';

export default function mConfig(state = { connecting: false }, action) {
  switch (action.type) {
  case AWAITING_CONNECTION:
    return { ...state, connecting: true} ;
  default:
    return state;
  }
}
