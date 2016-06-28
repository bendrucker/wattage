'use strict'

const choo = require('choo')
const partial = require('ap').partial

const activityModel = require('./models/activity')
const playerModel = require('./models/player')

const activityView = require('./views/activity')
const playerView = require('./views/player')
const metricsView = require('./views/metrics')

const findEntry = require('./reducers/entry')

const app = choo()

module.exports = app

activityModel(app)
playerModel(app)

app.router((route) => [
  route('/', renderMain)
])

function renderMain (params, state, send) {
  const entry = findEntry(state)

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
      <h2>Metrics</h2>
      ${metricsView({
        speed: {
          value: get(entry, 'speed')
        }
      })}
    </main>
  `
}

function get (entry, key) {
  return entry && entry[key]
}

if (!module.parent) document.body.appendChild(app.start())
