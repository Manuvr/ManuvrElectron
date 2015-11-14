import {merge as _merge, set as _set, get as _get, has as _has, forEachRight as _forEachRight} from 'lodash'

export default function uiActions(cbObject, currentState) {
  // DO NOT MANIPULATE CURRENTSTATE
  console.log("ui out: \""
    + cbObject.target.reduce(function(p, c, i, a){
      return p + ", " + c
    })
    + "\" : "
    + cbObject.data);

  var spec = {}
  spec.uiState = {}
  var retObj = spec.uiState;

  if (undefined !== cbObject.target) {
    if(cbObject.target[0] === "__local") {
        switch(cbObject.target[1]) {
          case "setMainWindow":
            //console.log(cbObject.data.path)
            retObj.mainWindow = cbObject.data.path;
            break;
          case "showHidden":
            //console.log(cbObject.data.path)
            retObj.showHidden = cbObject.data.value;
            break;
          case "showJsonTree":
            //console.log(cbObject.data.path)
            retObj.showJsonTree = cbObject.data.value;
            break;
          case "showDebug":
            //console.log(cbObject.data.path)
            retObj.showDebug = cbObject.data.value;
            break;
          default:
            console.log("badly formatted 'local'")
          break;
        }
    } else {
      ipc.send('api', cbObject);
    }
  }
  // only gets here without a return... IE: emits only.
  return _merge({}, currentState, spec, function(a, b, key) {
    if (Array.isArray(b)) {
      return b;
    }
  })
}
