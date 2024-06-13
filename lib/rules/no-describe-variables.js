'use strict'

/**
 * @fileoverview Disallow variables within the describe block
 * @author Emil Ajdyna
 */

function report (context, node) {
  context.report({
    message: 'Test has variable declaration in the describe block',
    node
  })
}

function create (context) {
  return {
    'CallExpression[callee.name="describe"] > FunctionExpression > BlockStatement > VariableDeclaration': report.bind(this, context),
    'CallExpression[callee.name="xdescribe"] > FunctionExpression > BlockStatement > VariableDeclaration': report.bind(this, context),
    'CallExpression[callee.name="fdescribe"] > FunctionExpression > BlockStatement > VariableDeclaration': report.bind(this, context),
    'CallExpression[callee.name="describe"] > ArrowFunctionExpression > BlockStatement > VariableDeclaration': report.bind(this, context),
    'CallExpression[callee.name="fdescribe"] > ArrowFunctionExpression > BlockStatement > VariableDeclaration': report.bind(this, context),
    'CallExpression[callee.name="xdescribe"] > ArrowFunctionExpression > BlockStatement > VariableDeclaration': report.bind(this, context)
  }
}

module.exports = {
  create
}
