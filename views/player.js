'use strict'

const yo = require('yo-yo')

module.exports = render

function render (state, events) {
  if (!state.src) return
  return yo`
    <video
      src="${state.src}"
      controls
      ontimeupdate=${(event) => events.onTime({time: event.target.currentTime})}>
    </video>
  `
}
