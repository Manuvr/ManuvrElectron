export const AWAITING_CONNECTION = 'AWAITING_CONNECTION'
export const INCOMING = 'INCOMING'


export function connect() {
  //ipc.send('fromClient', ['actor0', 'transport', 'connect', true]);
  return {
    type: AWAITING_CONNECTION,
    value: "Yes"
  };
}

export function disconnect() {
  //ipc.send('fromClient', ['actor0', 'transport', 'connect', false]);
  return {
    type: AWAITING_CONNECTION,
    value: "No"
  };
}

export function message(args) {
  //ipc.send('fromClient', [args[0], args[1], args[2], args[3]]);
  console.log("RUNNIN! ", args);
  return (args) => {
    ipc.send('fromClient', [args[0], args[1], args[2], args[3]]);
  }
}


// IPC RECEIVE ACTIONS
export function incoming(args) {
  console.log(args[0], "(", args[1], ") :: ", args[2], " = ", args[3]);
  return {
    type: INCOMING,
    sess: args[0],
    origin: args[1],
    msgType: args[2],
    payload: args[3]
  }
}
