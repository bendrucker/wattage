'use strict'

const test = require('tape')
const fs = require('fs')
const path = require('path')
const fit = require('./fit')
const findEntry = require('./entry')

const START = new Date('2016-06-25T20:49:56.000Z')
const FIT = fs.readFileSync(path.resolve(__dirname, '../example/data.fit'))

test('find entry', function (t) {
  t.plan(2)

  fit(FIT, function (err, data) {
    if (err) return t.end(err)
    const entry = findEntry({
      activity: {
        entries: data.records
      },
      player: {
        start: START,
        time: 0
      }
    })
    t.equal(entry.power, 145)
    t.equal(entry.heart_rate, 179)
  })
})
