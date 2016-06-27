'use strict'

const choo = require('choo')
const partial = require('ap').partial

const activityModel = require('./models/activity')
const playerModel = require('./models/player')

const activityView = require('./views/activity')
const playerView = require('./views/player')

const app = choo()

module.exports = app

activityModel(app)
playerModel(app)

app.router((route) => [
  route('/', renderMain)
])

function renderMain (params, state, send) {
  return choo.view`
    <main>
      <h2>Activity</h2>
      ${activityView(state.activity, {
        onFile: (file) => send('activity:file', {file: file})
      })}
      <h2>Video Player</h2>
      ${playerView(state.player, {
        onFile: (file) => send('player:file', {file: file}),
        onTime: partial(send, 'player:time')
      })}
    </main>
  `
}

if (!module.parent) document.body.appendChild(app.start())
