'use strict'

const URL = require('global/window').URL
const assert = require('assert')
const mp4 = require('../reducers/mp4')

module.exports = function (app) {
  app.model({
    namespace: 'player',
    state: {
      src: null,
      start: null,
      time: null
    },
    reducers: {
      data: (action, state) => ({src: action.src, start: action.start}),
      time: (action, state) => ({time: action.time})
    },
    effects: {
      file: onFile
    }
  })
}

function onFile (action, state, send) {
  const reader = new FileReader()
  reader.onload = onLoad
  reader.readAsArrayBuffer(action.file)

  function onLoad () {
    mp4(reader.result, function (err, data) {
      assert.ifError(err)
      send('player:data', {
        start: data.created,
        src: URL.createObjectURL(action.file)
      })
    })
  }
}
