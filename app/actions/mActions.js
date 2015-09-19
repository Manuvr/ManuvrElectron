export const AWAITING_CONNECTION = 'AWAITING_CONNECTION';


export function connect() {
  ipc.send('actor0','transport', 'connect', true);
  console.log("derp");
  return {
    type: AWAITING_CONNECTION
  };
}
