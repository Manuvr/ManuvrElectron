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

export default function fromHub(msgObj, intSpec) {

  // DO NOT MUTATE intSpec

  var retObj = {};
  var path = buildPath(msgObj.target);
  var val = msgObj.target[msgObj.target.length - 1];

  if(val === "_adjunctDef") {
    _set(intSpec, path, {});
    _set(retObj, path, msgObj.data);
  } else {
    var outState = _get(intSpec, path.concat("schema", "output", val, "state"));
    if(outState !== undefined  && _has(intSpec, path.concat("schema", "state", outState))){
      _set(retObj, path.concat("schema", "state", outState, "value"), msgObj.data);
    }
  }
  //Emit? Log? Console?
  console.log(JSON.stringify(msgObj, null, 2));
  return retObj
}
