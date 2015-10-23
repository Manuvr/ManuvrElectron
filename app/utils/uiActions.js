export default function uiActions(cbObject, currentState) {
  // DO NOT MANIPULATE CURRENTSTATE
  console.log("ui out: \""
    + cbObject.target[cbObject.target.length - 1]
    + "\" to \""
    + cbObject.target[cbObject.target.length - 2]
    + "\" : "
    + cbObject.data);
    
  if (undefined !== cbObject.target)
    switch (cbObject.target[0]) {
      case ("local"):
        // change something local
        // and return some setState object
        break;
      default:
        ipc.send('api', cbObject);
    }
    // only gets here without a return... IE: emits only.
  return {};
}
