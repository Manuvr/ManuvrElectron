export default function uiActions(cbObject, currentState) {
  // DO NOT MANIPULATE CURRENTSTATE
  console.log(JSON.stringify(cbObject, null, 4));
  if (undefined !== cbObject.target)
    switch (cbObject.target[0]) {
      case ("local"):
        // change something local
        // and return some setState object
        break;
      default:
        console.log("actions:" + JSON.stringify(cbObject));
        ipc.send('api', cbObject);
    }
    // only gets here without a return... IE: emits only.
  return {};
}
