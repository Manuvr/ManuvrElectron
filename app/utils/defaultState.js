export default defaultState {

  "uiConfig": {
    "currentSession": "",
    "uiColorScheme": ""
  },

  "mConfig": {
    "window": {
      state: {

      },
      inputs: {
        "toggleDevTools": { label: "Toggle Dev Tools", }
      },
      outputs: {

      }
    }

    "hub": {
      state: {

      },
      inputs: {
        "newSession": { label: "New Session", type: ["string", "string"], labels: ["Session Name", "Transport Name"] }
      },
      outputs: {

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
