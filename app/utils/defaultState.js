export default {


  "window": {
    schema: {},
    adjuncts: {}
  },
  "mHub": {
    schema: {},
    adjuncts: {
      "sessions": {
        schema: {},
        adjuncts: {
          "sessionId": {
            schema: {},
            adjuncts: {}
          }
        }
      },
      "transportFactories": {
        schema: {},
        adjuncts: {}
      }
    }
  }

}
//
//
// {
//   target: ["mHub", "sessions", "sessionId", "session", "someOutput"],
//   data: {}
// }
//
// {
//   target: ["mHub", "sessions", "sessionId", "session", "_adjunctDef"],
//   data: {}
// }
