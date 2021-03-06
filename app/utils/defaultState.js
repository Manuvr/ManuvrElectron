export default {

  // will be created by react anyway...
  default: {},

  // this will store our scrolling log
  log: {
    cache: 500,
    data: []
  },

  // this can store whatever ui info we need later
  uiState: {
    mainWindow: ["window", "mHub"],
    showHidden: false,
    showJsonTree: false,
    showDebug: true
  },

  // our interface spec from the host
  interface: {
    "window": {
      adjuncts: {
        "mHub": {}
      }
    }
  }
}
