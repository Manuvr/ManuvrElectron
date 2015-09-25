import merge from 'lodash'

export function fromHub(args, currentState, setState) {

  // DO NOT MUTATE currentState EVAR
  // This is just a monkey patch for checking the previous state

  const origin = args.origin; // HUB, Session, Transport, Window
  const method = args.method;
  const module = args.module;
  const data = args.data;
  const identity = args.identity;

  switch (origin) {
    case "hub": // config.output name
      switch (method) {
        case "config":
          let temp = {};
          setState(merge({}, currentState["mConfig"], data))
      }

      break;
    case "session": // data

      break;
    case "transport":

      break;

    case "window":

      break;

    default:
      break;

  }
}
