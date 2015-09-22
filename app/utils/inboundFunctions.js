import * from _merge from 'lodash.merge'

export function fromHub(args, currentState, setState) {
  // DO NOT MUTATE currentState EVAR
  const origin   = args[0];  // HUB, Session, Transport
  const ident    = args[1];  // hubID ??, sessionID, transportID

  console.log("");

  switch(name) {
    case "hub":
      const method   = args[2];  // config.output name
      const data     = args[3];  // data

      break;
    case "session":
      const module   = args[2];  // hub, session, transport, etc
      const method   = args[3];  // config.output name
      const data     = args[4];  // data

      //do something

      break;
    case "transport":

      break;
    default:
      break;

    }



    case "config":
      let temp = {};
      temp[session, ]
      setState(_merge({}, currentState, data))
    case ""
  }


}
