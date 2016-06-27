'use strict'

const yo = require('yo-yo')
const file = require('./file')

module.exports = render

function render (state, events) {
  if (!state.src) {
    return yo`
      <div>
        ${file(null, {onFile: events.onFile})}
      </div>
    `
  }

  return yo`
    <div>
      <video
        src="${state.src}"
        controls
        ontimeupdate=${(event) => events.onTime({time: event.target.currentTime})}
        style="width: 100%">
      </video>
      <small>${state.start.toString()}</small>
    </div>
  `
}
