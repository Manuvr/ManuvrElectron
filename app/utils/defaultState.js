export default {

    "uiConfig": {
      "currentSession": "",
      "uiColorScheme": ""
    },

    "mConfig": {
      "window": {
        state: {
          "toggleDevTools": { value: false }
        },
        inputs: {
          "toggleDevTools": {
            label: "Toggle Dev Tools",
          }
        },
        outputs: {

        }
      },

      "hub": {
        state: {
          'userEnginePath': {
            type: 'string',
            value: './userEngines/'
          },
          'logPath': {
            type: 'string',
            value: './logs/'
          },
          'sessionList': {
            type: 'array',
            value: []
          },
          'engineList': {
            type: 'array',
            value: []
          },
          'transportList': {
            type: 'array',
            value: []
          }
        },
        input: {
          'quit': {
            label: 'Quit',
            type: 'boolean'
          },
          'newSession': {
            label: 'Create Session',
            type: 'string'
          },
          'assignEngine': {
            label: 'Assign Engine',
            type: 'object'
          }
        },
        output: {
          'config': {
            type: 'object',
            label: 'ConfigObj'
          },
          'log': {
            type: 'array',
            label: 'Log'
          },
          'sessionList': {
            type: 'array',
            label: 'Session list',
            state: 'sessionList'
          },
          'engineList': {
            type: 'array',
            label: 'Engine list',
            state: 'engineList'
          },
          'transportList': {
            type: 'array',
            label: 'Transport list',
            state: 'transportList'
          }
        }
      },

      "transports": {
        "transportIdHere": {
          state: {

          },
          inputs: {

          },
          outputs: {

          }
        }
      },

      "sessions": {
        "sessionIdHere": {
          "session": {
            state: {

            },
            inputs: {

            },
            outputs: {

            }
          },
          "transport": {
            state: {

            },
            inputs: {

            },
            outputs: {

            }
          },
          "engine": {
            state: {

            },
            inputs: {

            },
            outputs: {

            }
          }
        }
      }
    }
}
