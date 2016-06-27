'use strict'

const choo = require('choo')
const document = require('global/document')
const Fit = require('easy-fit').default
const fs = require('fs')
const path = require('path')
const extend = require('xtend')
const hhMmSs = require('hhmmss')

const ride = fs.readFileSync(path.resolve(__dirname, './data.fit'))

const fit = new Fit({
  speedUnit: 'mi/h',
  lengthUnit: 'mi',
  temperatureUnit: 'fahrenheit'
})

const app = choo()

app.model({
  state: {
    video: {
      start: new Date('2016-06-25T14:50:22-07:00'),
      time: 0
    },
    data: null
  },
  subscriptions: [
    function (send) {
      send('fit', {buffer: ride})
    }
  ],
  reducers: {
    json: (action, state) => ({data: action.json}),
    tick: (action, state) => ({video: extend(state.video, {time: action.time})})
  },
  effects: {
    fit: function (action, state, send) {
      fit.parse(action.buffer, (err, data) => {
        if (err) return send('error', {error: err})
        send('json', {json: data})
      })
    },
    error: (action) => console.error(action.error)
  }
})

const mainView = (params, state, send) => choo.view`
  <main>
    ${renderVideo(state, send)}
    ${renderTable(state)}
    ${renderControls(state, send)}
  </main>
`

function renderVideo (state, send) {
  return choo.view`
    <video
      src="/example/video.mp4"
      controls
      ontimeupdate=${(e) => send('tick', {time: e.target.currentTime})}>
    </video>
  `
}

function renderTable (state) {
  return choo.view`
    <table style="text-align: left">
      <thead>
        <tr>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            ${hhMmSs(state.video.time)}
          </td>
        </tr>
      </tbody>
    </table>
  `
}

function renderControls (state, send) {
  return choo.view`
    <form>
      <label>
        <input type="text" value=${state.video.start}>
      </label>
    </form>
  `
}

app.router((route) => [
  route('/', mainView)
])

const tree = app.start()
document.body.appendChild(tree)
