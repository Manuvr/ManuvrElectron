/*
  cbObject:
  {
    type: (toSession, toTransport, toHub, electronWindow, localState)

    target: (sessionID, transportID),
    destination: (transport, engine, session),
    input: (connect, sendToHost, etc),
    data: ? whatever the data is
  }
 */

export function callbackChain(cbObject, currentState, setState) {
  // DO NOT MANIPULATE CURRENTSTATE
  switch(cbObject.type) {
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
