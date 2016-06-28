'use strict'

const createObjectURL = require('global/window').URL.createObjectURL

module.exports = (app) => ({
  namespace: 'videos',
  state: {
    videos: []
  },
  reducers: {
    add: (action, state) => state.videos.push({
      name: action.file.name,
      type: action.file.type,
      size: action.file.size,
      src: createObjectURL(action.file)
    })
  }
})
