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

var noDupes = require('../helpers/no-dupes')
var create = noDupes('spec', branchBlocks, checkedBlocks)

module.exports = {
  meta: {
    schema: create.schema
  },
  create
}
