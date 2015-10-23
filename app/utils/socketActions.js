import {merge as _merge, set as _set, get as _get, has as _has, forEach as _forEach} from 'lodash'

var buildPath = function(target) {
  var tempArray = []
  if(target.length > 2) {
    _forEach(target.slice(0, target.length - 2), function(n){
      tempArray.push(n, "adjuncts");
    })
  }
  tempArray.push(target[target.length - 2])
  return tempArray;
}

export default function socketActions(msgObj, intSpec) {

  // DO NOT MUTATE intSpec
  // we'll pass spec (the full config) to be merged with state, but reference the interface layer here as retObj
  var spec = {}
  spec.interface = {}
  var retObj = spec.interface;

  var path = buildPath(msgObj.target);
  var val = msgObj.target[msgObj.target.length - 1];

  switch(val) {
    case("_adjunctDef") :
      // clear the interface layer being replaced?  This is risky.
      _set(intSpec.interface, path, {});
      _set(retObj, path, msgObj.data);
      break;
    case("log") :

    default:
      // logging all output type packets....
      //console.log("Received: " + JSON.stringify(msgObj, null, 2));
      console.log("ui in: \""
        + msgObj.target[msgObj.target.length - 1]
        + "\" from \""
        + msgObj.target[msgObj.target.length - 2]
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
