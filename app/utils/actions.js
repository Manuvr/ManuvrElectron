/*
  cbObject:
  {
    origin: (hub, window, session, transport)
    method: (connect, input, other input types)
    module: (session, engine, transport)
    data: (typed from the input config)
    identity: (sessionID, transportID),

  }
 */

export function callbackChain(cbObject, currentState, setState) {
  // DO NOT MANIPULATE CURRENTSTATE

  switch(cbObject.origin) {
    case "hub":
    case "window":
    case "session":
    case "transport":
      ipc.send('api', cbObject);
      console.log("should have sent")
      break;
    case "local":
      console.log("do something local")
      break;
    default:
      console.log("wut?");
  }
}
