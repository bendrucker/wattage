'use strict'

const toBuffer = require('typedarray-to-buffer')
const path = require('path')
const fit = require('../parsers/fit')

module.exports = function (app) {
  app.model({
    namespace: 'activity',
    state: {
      type: null,
      size: null,
      entries: [],
      error: null
    },
    reducers: {
      entries: (action, state) => ({entries: action.entries, loading: false}),
      file: (action, state) => ({type: fileType(action.file), size: action.file.size}),
      error: (action, state) => ({error: action.error})
    },
    effects: {
      file: read,
      data: parse
    }
  })
}

function read (action, state, send) {
  const reader = new FileReader()
  reader.onload = () => send('activity:data', {data: toBuffer(reader.result)})
  reader.readAsArrayBuffer(action.file)
}

function parse (action, state, send) {
  switch (state.type) {
    case 'fit':
      fit(action.data, function (err, data) {
        if (err) return send('activity:error', {error: err})
        send('activity:entries', {entries: data.records})
      })
      break
    default:
      send('activity:error', {
        error: new Error(`Unsupported file type: ${state.file.type}`)
      })
  }
}

function fileType (file) {
  return path.extname(file.name).replace(/^\./, '')
}
