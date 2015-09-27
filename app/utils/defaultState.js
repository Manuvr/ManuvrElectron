export default {


  "window": {
    schema: {
      state: {
        'toggleDevTools': {
          value: false
        }
      },
      input: {
        'quit': {
          label: 'Quit',
          type: 'boolean'
        },
        'toggleDevTools': {
          label: 'OpenTools',
          type: 'boolean'
        }
      },
      output: {
        'toggleDevTools': {
          label: 'Dev tools Open',
          type: 'boolean'
        }
      }
    },
    adjuncts: {
      hubs: {
      }
    }
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
