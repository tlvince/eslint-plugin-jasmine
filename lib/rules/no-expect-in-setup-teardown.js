'use strict'

/**
 * @fileoverview Discourage having expect in setup and teardown functions
 * @author Alexander Afanasyev
 */

var buildName = require('../helpers/buildName')

function create (context) {
  var allowed = context.options.length ? context.options : ['expect()', 'expectAsync()']
  var setupRegexp = /^(before|after)(Each|All)$/

  var insideSetup = false
  var setupFunctionName

  return {
    CallExpression: function (node) {
      if (setupRegexp.test(node.callee.name)) {
        insideSetup = true
        setupFunctionName = node.callee.name
        return
      }

      if (insideSetup) {
        var functionName = buildName(node)
        if (allowed.indexOf(functionName) > -1) {
          context.report({
            data: { functionName, setupFunctionName },
            message: 'Unexpected "{{functionName}}" call in "{{setupFunctionName}}()"',
            node
          })
        }
      }
    },

    'CallExpression:exit': function (node) {
      if (setupRegexp.test(node.callee.name)) {
        insideSetup = false
        setupFunctionName = undefined
      }
    }
  }
}

var missingExpect = require('./missing-expect')

module.exports = {
  meta: {
    schema: missingExpect.meta.schema
  },
  create
}
