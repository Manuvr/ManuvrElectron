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

export function message(sess, dest, msgType, payload) {
  ipc.send('fromClient', [sess, dest, msgType, payload]);
  return;
}


// IPC RECEIVE ACTIONS
export function incoming(sess, org, msgType, payload) {
  return {
    type: INCOMING,

  }
}
