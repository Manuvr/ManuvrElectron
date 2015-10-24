import {merge as _merge, set as _set, get as _get, has as _has, forEachRight as _forEachRight} from 'lodash'

var buildPath = function(target) {
  var tempArray = []
  if(target.length > 2) {
    _forEachRight(target.slice(2, target.length), function(n){
      tempArray.push(n, "adjuncts");
    })
  }
  tempArray.push(target[1])
  return tempArray;
}

export default function socketActions(msgObj, intSpec) {

  // DO NOT MUTATE intSpec
  // we'll pass spec (the full config) to be merged with state, but reference the interface layer here as retObj
  var spec = {}
  spec.interface = {}
  var retObj = spec.interface;

  var path = buildPath(msgObj.target);
  var val = msgObj.target[0];

  switch(val) {
    case("_adjunctDef") :
      // clear the interface layer being replaced?  This is risky.
      _set(intSpec.interface, path, {});
      _set(retObj, path, msgObj.data);
      break;
    case("log") :

    default:
      //logging all output type packets....
      //console.log("Received: " + JSON.stringify(msgObj, null, 2));
      console.log("ui in: \""
        + msgObj.target[0]
        + "\" from \""
        + msgObj.target[1]
        + "\" : "
        + msgObj.data )

      // checks if state needs to be updated... if not, no object is returned.
      var outState = _get(intSpec.interface, path.concat("schema", "outputs", val, "state"));
      if(outState !== undefined  && _has(intSpec.interface, path.concat("schema", "state", outState))){
        _set(retObj, path.concat("schema", "state", outState, "value"), msgObj.data);
      }
  }

  //Emit? Log? Console?
  return _merge({}, intSpec, spec);
}
