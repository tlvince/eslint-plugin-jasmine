'use strict'

/**
 * @fileoverview Disallow the use of disabled tests
 * @author Tom Vincent
 */

var prohibit = require('../helpers/prohibit')

module.exports = function (context) {
  var prohibiteds = [
    'xdescribe',
    'xit'
  ]

  return prohibit(prohibiteds, context)
}
