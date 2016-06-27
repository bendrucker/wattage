'use strict'

const test = require('tape')
const readFile = require('fs').readFile
const resolve = require('path').resolve
const toArrayBuffer = require('buffer-to-arraybuffer')
const metadata = require('./mp4')

test('mp4 metadata', function (t) {
  t.plan(2)

  readFile(resolve(__dirname, '../example/video.mp4'), function (err, buffer) {
    if (err) return t.end(err)
    metadata(toArrayBuffer(buffer), function (err, data) {
      if (err) return t.end(err)
      t.ok(data)
      t.ok(data.tracks)
    })
  })
})
