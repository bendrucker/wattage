'use strict'

const URL = require('global/window').URL

module.exports = function (app) {
  app.model({
    namespace: 'player',
    state: {
      src: null,
      time: null
    },
    reducers: {
      src: (action, state) => ({src: action.src}),
      time: (action, state) => ({time: action.time})
    },
    effects: {
      file: createUrl
    }
  })
}

function createUrl (action, state, send) {
  send('player:src', {
    src: URL.createObjectURL(action.file)
  })
}
