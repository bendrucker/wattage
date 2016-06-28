'use strict'

const createObjectURL = require('global/window').URL.createObjectURL
const yo = require('yo-yo')
const sf = require('sheetify')
const drop = require('drag-drop')

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
  const upload = yo`
    <video-upload>
      <h2 class="f2">Upload</h2>
    </video-upload>
  `

  drop(upload, (files) => send('upload:file', {file: files[0]}))

  return upload
}
