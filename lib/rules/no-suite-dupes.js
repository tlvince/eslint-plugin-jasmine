'use strict'

/**
 * @fileoverview Disallow the use of duplicate suite names
 * @author Alexander Afanasyev
 */

var branchBlocks = [
  'describe'
]

var checkedBlocks = [
  'describe'
]

module.exports = require('../helpers/no-dupes')('suite', branchBlocks, checkedBlocks)
