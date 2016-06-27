'use strict'

const yo = require('yo-yo')

module.exports = render

function render (data, events) {
  return yo`
    <table>
      <thead>
        <tr>
          <th>
            Speed
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            ${data.speed.value}
          </td>
        </tr>
      </tbody>
    </table>
  `
}
