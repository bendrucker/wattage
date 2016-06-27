'use strict'

const yo = require('yo-yo')
const file = require('./file')

module.exports = render

function render (state, events) {
  if (!state.session) {
    return yo`
      <div>
        ${file(null, {onFile: events.onFile})}
        ${renderError(state)}
      </div>
    `
  }

  const start = state.session.start_time
  return yo`<h3>Loaded ${state.type} from ${[start.getMonth() + 1, start.getDate()].join('/')}</h3>`
}

function renderError (state) {
  if (state.error) {
    return yo`<pre>${state.error.message}</pre>`
  }
}
