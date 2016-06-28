'use strict'

const sort = require('sort-on')
const playerDate = require('./play-date')

module.exports = getEntry

function getEntry (state) {
  return state.player.start && findEntry(state.activity.entries, function (entry) {
    return Math.abs(entry.timestamp - playerDate(state.player))
  })
}

// Not performant but it sure is simple
function findEntry (records, minimizer) {
  return sort(records, minimizer)[0]
}
