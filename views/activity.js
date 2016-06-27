'use strict'

const yo = require('yo-yo')
const file = require('./file')

module.exports = render

function render (state, events) {
  if (!state.entries.length) {
    return yo`
      <div>
        ${file(null, {onFile: events.onFile})}
        ${renderError(state)}
      </div>
    `
  }

  return yo`<h1>Activity</h1>`
}

function renderError (state) {
  if (state.error) {
    return yo`<pre>${state.error.message}</pre>`
  }
}
