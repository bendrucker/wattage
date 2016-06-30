'use strict'

const yo = require('yo-yo')
const sf = require('sheetify')
const drop = require('drag-drop')

module.exports = render

sf('tachyons-type-scale')

function render (send) {
  const upload = yo`
    <video-upload>
      <h2 class="f2">Upload</h2>
    </video-upload>
  `

  drop(upload, (files) => send('upload:file', {file: files[0]}))

  return upload
}
