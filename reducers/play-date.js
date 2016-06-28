'use strict'

module.exports = playerDate

function playerDate (player) {
  return new Date(player.start.getTime() + player.time)
}
