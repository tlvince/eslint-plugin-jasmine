'use strict'

/**
 * @fileoverview Disallow the use of focused tests
 * @author Tom Vincent
 */

var prohibit = require('../helpers/prohibit')

module.exports = function (context) {
  var prohibiteds = [
    'fdescribe',
    'ddescribe',
    'fit',
    'iit'
  ]

  return prohibit(prohibiteds, context)
}
