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
  return yo`<h1>Activity: ${[start.getMonth() + 1, start.getDate()].join('/')}</h1>`
}

function renderError (state) {
  if (state.error) {
    return yo`<pre>${state.error.message}</pre>`
  }
}
