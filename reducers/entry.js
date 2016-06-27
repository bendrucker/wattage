'use strict'

const sort = require('sort-on')

module.exports = findEntry

// Not performant but it sure is simple
// findEntry(activity.records, (record) => Math.abs(time - record.timestamp))

function findEntry (records, minimizer) {
  return sort(records, minimizer)[0]
}
