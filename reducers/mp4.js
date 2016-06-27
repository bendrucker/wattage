'use strict'

const Box = require('mp4box').MP4Box
const partial = require('ap').partial

module.exports = mp4Metadata

function mp4Metadata (arrayBuffer, callback) {
  const box = new Box()
  box.onReady = partial(callback, null)
  arrayBuffer.fileStart = 0
  box.appendBuffer(arrayBuffer)
  box.flush()
}
