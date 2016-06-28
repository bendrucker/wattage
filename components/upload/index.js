'use strict'

const createObjectURL = require('global/document').URL.createObjectURL
const yo = require('yo-yo')
const sf = require('sheetify')
const file = require('../file')

sf('tachyons-type-scale')

module.exports = {
  model: {
    namespace: 'upload',
    state: {
      name: null,
      type: null,
      size: null,
      src: null
    },
    reducers: {
      file: (action) => ({
        name: action.file.name,
        type: action.file.type,
        size: action.file.size,
        src: createObjectURL(action.file)
      })
    }
  },
  render: render
}

function render (state, send) {
  return yo`
    <video-upload>
      <h2 class="f2">Upload</h2>
      ${file({label: 'Choose video'}, (files) => send('upload:file', {
        file: files[0]
      }))}
    </video-upload>
  `
}
