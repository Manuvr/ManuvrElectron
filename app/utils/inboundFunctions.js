import * as _merge from 'lodash.merge'

export function fromHub(args, currentState, setState) {

  // DO NOT MUTATE currentState EVAR
  // This is just a monkey patch for checking the previous state

  const origin    = args.origin; // HUB, Session, Transport, Window
  const method    = args.method; 
  const module    = args.module;
  const data      = args.data;
  const identity  = args.identity;

  switch(origin) {
    case "hub":  // config.output name

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



    case "config":
      let temp = {};
      temp[session, ]
      setState(_merge({}, currentState["mConfig"], data))
    case ""
  }


}
