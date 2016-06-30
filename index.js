'use strict'

const choo = require('choo')
const sf = require('sheetify')

const map = require('map-values')
const bulk = require('bulk-require')
const path = require('path')

const models = bulk(path.resolve(__dirname, 'models'), '*')
const {upload} = bulk(path.resolve(__dirname, 'components'), '*')

const app = choo()

module.exports = app

sf('css-wipe')
sf('tachyons-font-family')

map(models, app.model)

app.router((route) => [
  route('/', renderMain)
])

function renderMain (params, state, send) {
  return choo.view`
    <main class="sans-serif">
      ${upload(send)}
    </main>
  `
}

if (!module.parent) document.body.appendChild(app.start())
