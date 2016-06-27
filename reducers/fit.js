'use strict'

const EasyFit = require('easy-fit').default
const fit = new EasyFit()

module.exports = fit.parse.bind(fit)
