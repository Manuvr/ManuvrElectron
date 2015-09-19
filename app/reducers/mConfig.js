import { AWAITING_CONNECTION } from '../actions/mActions';

const initialState = {
  connecting: "No",
  session: "",
  engine: "",
  transport: "",
  client: ""

};

export default function mConfig(state = initialState, action) {
  switch (action.type) {
  case AWAITING_CONNECTION:
    return { ...state, connecting: action.value} ;
  default:
    return state;
  }
}
