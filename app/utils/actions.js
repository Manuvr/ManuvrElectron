/*
  cbObject:
  {
    destination: (hub, window, session, transport)
    method: (connect, input, other input types)
    module: (session, engine, transport)
    data: (typed from the input config)
    identity: (sessionID, transportID),

  }
 */

export function callbackChain(cbObject, currentState, setState) {
  // DO NOT MANIPULATE CURRENTSTATE

  switch(cbObject.destination) {
    case "local":
      break;
    case "sessionID":
      ipc.send('toHub', ["toSession", destination, input, data]);
      break;
    case "hub":
      ipc.send('hub', [t])
    default:
      console.log("wut?");
  }
}
