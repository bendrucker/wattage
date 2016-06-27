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
  speedUnit: 'mph',
  lengthUnit: 'mi',
  temperatureUnit: 'fahrenheit'
})

const app = choo()

app.model({
  state: {
    video: {
      // hardcoded using known video frame of alpine dam (03:23) and strava ui for a map
      start: new Date(new Date('2016-06-25T20:53:20.000Z').getTime() - ((3 * 60 + 23) * 1000)),
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
    <table style="text-align: left; line-height: 20px;">
      <thead>
        <tr>
          <th>Elapsed</th>
          <th>Speed</th>
          <th>Cadence</th>
          <th>Power</th>
          <th>Heartrate</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            ${hhMmSs(state.video.time)}
          </td>
          <td>
            ${renderValue(state.data, videoTime(state.video), 'speed').toFixed(0)}mph
          </td>
          <td>
            ${renderValue(state.data, videoTime(state.video), 'cadence').toFixed(0)}rpm
          </td>
          <td>
            ${renderValue(state.data, videoTime(state.video), 'power').toFixed(0)}W
          </td>
          <td>
            ${renderValue(state.data, videoTime(state.video), 'heart_rate').toFixed(0)}bpm
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
        Start Time
        <input type="text" value=${state.video.start.toISOString()}>
      </label>
    </form>
  `
}

function videoTime (video) {
  return new Date(video.start.getTime() + video.time * 1000)
}

function renderValue (data, time, key) {
  if (!data || !time) return 0
  const result = data.records.find(function (record, index, array) {
    const previous = array[index - 1]
    const next = array[index + 1]
    if (!previous || !next) return
    return record.hasOwnProperty(key) &&
      delta(time, record.timestamp) < delta(time, previous.timestamp) &&
      delta(time, record.timestamp) < delta(time, next.timestamp)
  })

  if (!result) return 0
  return result[key]
}

function delta (a, b) {
  return Math.abs(Math.abs(a) - Math.abs(b))
}

app.router((route) => [
  route('/', mainView)
])

const tree = app.start()
document.body.appendChild(tree)
