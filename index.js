'use strict'

const choo = require('choo')
const document = require('global/document')
const Fit = require('easy-fit').default

const fit = new Fit({
  speedUnit: 'mi/h',
  lengthUnit: 'mi',
  temperatureUnit: 'fahrenheit'
})

const app = choo()

app.model({
  state: { data: null },
  reducers: {
    json: (action, state) => ({ data: action.json })
  },
  effects: {
    file: function (action, state, send) {
      const reader = new FileReader()
      reader.onload = () => send('fit', {buffer: toBuffer(reader.result)})
      reader.readAsArrayBuffer(action.file)
    },
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
    <h1>.fit file</h1>
    <input
      type="file"
      onchange=${(e) => send('file', { file: e.target.files[0] })}>
    <h1>Data</h1>
    <pre>${JSON.stringify(state.data, null, 2)}</pre>
  </main>
`

app.router((route) => [
  route('/', mainView)
])

const tree = app.start()
document.body.appendChild(tree)

function toBuffer (arrayBuffer) {
  const buffer = new Buffer(arrayBuffer.byteLength)
  const view = new Uint8Array(arrayBuffer)
  for (var i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i]
  }
  return buffer
}
