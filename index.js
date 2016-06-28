'use strict'

const choo = require('choo')
const sf = require('sheetify')

const upload = require('./components/upload')

const app = choo()

module.exports = app

sf('css-wipe')
sf('tachyons-font-family')

app.model(upload.model)

app.router((route) => [
  route('/', renderMain)
])

function renderMain (params, state, send) {
  return choo.view`
    <main class="sans-serif">
      ${upload.render(state.upload, send)}
    </main>
  `
}

if (!module.parent) document.body.appendChild(app.start())
