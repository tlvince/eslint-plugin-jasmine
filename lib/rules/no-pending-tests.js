'use strict'

/**
 * @fileoverview Disallow the use of focused tests
 * @author Tom Vincent
 */

var prohibit = require('../helpers/prohibit')

module.exports = function (context) {
  var prohibiteds = [
    'pending'
  ]

  return prohibit(prohibiteds, context)
}
