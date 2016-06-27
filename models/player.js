'use strict'

module.exports = function (app) {
  app.model({
    namespace: 'player',
    state: {
      time: null
    },
    reducers: {
      time: (action, state) => ({time: action.time})
    }
  })
}

