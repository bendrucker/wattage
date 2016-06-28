'use strict'

const picker = require('filepicker-element')
const insertStyles = require('insert-styles')
const getCss = require('csjs/get-css')

module.exports = picker

insertStyles(getCss(picker.styles))
