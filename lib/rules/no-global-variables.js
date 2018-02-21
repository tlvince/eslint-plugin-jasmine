'use strict'

/**
 * @fileoverview Disallow variables within the global (script) scope
 * @author Vadim Ruban
 */

module.exports = function (context) {
  var hasTestSuite = false
  var globalVariableDeclarationNodes = []

  return {
    'Program > VariableDeclaration': function (node) {
      var init = node.declarations[0].init

      switch (init.type) {
        case 'CallExpression': {
          if (init.callee.name !== 'require') {
            globalVariableDeclarationNodes.push(node)
          }
          break
        }
        case 'ArrowFunctionExpression':
          break
        case 'FunctionExpression':
          break
        default:
          globalVariableDeclarationNodes.push(node)
      }
    },
    'CallExpression[callee.name="describe"]': function (node) { hasTestSuite = true },
    'CallExpression[callee.name="xdescribe"]': function (node) { hasTestSuite = true },
    'CallExpression[callee.name="fdescribe"]': function (node) { hasTestSuite = true },
    'Program:exit': function () {
      if (hasTestSuite) {
        for (var i = 0, len = globalVariableDeclarationNodes.length; i < len; i++) {
          context.report({
            message: 'Test has variable declaration in the global scope',
            node: globalVariableDeclarationNodes[i]
          })
        }
      }
      globalVariableDeclarationNodes = []
    }
  }
}
