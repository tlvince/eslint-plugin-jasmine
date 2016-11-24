'use strict'

/**
 * @fileoverview Discourage having expect in setup and teardown functions
 * @author Alexander Afanasyev
 */

module.exports = function (context) {
  var allowed = context.options.length ? context.options : ['expect()']
  var setupRegexp = /^(before|after)(Each|All)$/

  var insideSetup = false
  var setupFunctionName

  function buildName (node) {
    if (node.type === 'CallExpression') {
      return buildName(node.callee) + '()'
    }
    if (node.type === 'MemberExpression') {
      return buildName(node.object) + '.' + node.property.name
    }
    if (node.type === 'Identifier') {
      return node.name
    }
  }

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
          context.report(node, 'Unexpected "' + functionName + '" call in "' + setupFunctionName + '()"')
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
