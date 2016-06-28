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
      data: (action, state) => ({src: action.src}),
      time: (action, state) => ({time: action.time})
    },
    effects: {
      file: read
    }
  })
}

function read (action, state, send) {
  const reader = new FileReader()
  reader.onload = () => send('player:data', {url: URL.createObjectURL(action.file)})
  reader.readAsArrayBuffer(action.file)
}
