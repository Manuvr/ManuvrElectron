import {merge, set} from 'lodash'

export default function fromHub(args, currentState) {

  // DO NOT MUTATE currentState EVAR
  // This is just a monkey patch for checking the previous state

  const origin = args.origin; // HUB, Session, Transport, Window
  const method = args.method;
  const module = args.module; //
  const data = args.data;
  const identity = args.identity;

  switch (origin) {
    case "hub": // config.output name
      switch (method) {
        case "config":
          //let temp = {};
          return { "mConfig" : merge({}, currentState["mConfig"], data) };
          break;
        case "transportList":

          break;
      }

      break;
    case "session": // data

      break;
    case "transport":

      break;

    case "window":
      console.log("got to window")
      var tempObj = {};
      // tempObj["mConfig"] = {}
      // tempObj["mConfig"][origin] = {};
      // tempObj["mConfig"][origin]["state"] = {};
      set(tempObj, ["mConfig", origin, "state", method, "value"], data);

      console.log(tempObj)
      return tempObj;
      break;

    default:
      break;

  }
}
