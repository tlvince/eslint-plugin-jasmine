'use strict'

/**
 * @fileoverview Disallow the use of duplicate spec names
 * @author Alexander Afanasyev
 */

var branchBlocks = [
  'describe'
]

var checkedBlocks = [
  'it'
]

module.exports = require('../helpers/no-dupes')('spec', branchBlocks, checkedBlocks)
