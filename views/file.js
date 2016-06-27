'use strict'

const yo = require('yo-yo')

module.exports = render

function render (data, events) {
  return yo`
    <input
      type="file"
      onchange=${(event) => events.onFile(event.target.files[0])})/>
  `
}
