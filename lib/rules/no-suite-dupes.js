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

var noDupes = require('../helpers/no-dupes')
var create = noDupes('suite', branchBlocks, checkedBlocks)

module.exports = {
  meta: {
    schema: create.schema
  },
  create
}
