'use strict'

/**
 * Determines whether a function call is a Promise.property() call
 * @param {ASTNode} node A CallExpression node
 * @returns {boolean} `true` if the call is a Promise.property() call
 */
function hasIdentifier (node, property) {
  return node.callee &&
    node.callee.type === 'MemberExpression' &&
    node.callee.property.type === 'Identifier' &&
    node.callee.property.name === property
}

function hasDoneFailInReject (node, asyncParam) {
  var reject = node.arguments[1]
  return reject &&
    reject.type === 'MemberExpression' &&
    reject.object.type === 'Identifier' && reject.object.name === asyncParam &&
    reject.property.type === 'Identifier' && reject.property.name === 'fail'
}

function isPromiseThenWithoutCatch (node, asyncParam) {
  return hasIdentifier(node, 'then') &&
    !hasIdentifier(node.parent.parent, 'then') &&
    !hasDoneFailInReject(node, asyncParam) &&
    !hasIdentifier(node.parent.parent, 'catch')
}

function isSemicolon (token) {
  return (token.type === 'Punctuator' && token.value === ';')
}

function genReport (node, context) {
  return {
    node: node,
    message: 'An "it" that uses an async method should handle failure (use "done.fail")',
    fix: function (fixer) {
      const lastToken = context.getLastToken(node.parent)
      if (!isSemicolon(lastToken)) {
        return fixer.insertTextAfter(node.parent, '.catch(done.fail)')
      } else {
        return fixer.insertTextBefore(lastToken, '.catch(done.fail)')
      }
    }
  }
}

function isSpec (node) {
  return node.callee.type === 'Identifier' && node.callee.name === 'it'
}

function getDoneParamName (node) {
  var callback = node.arguments[1]
  return callback &&
    (callback.type === 'FunctionExpression' || callback.type === 'ArrowFunctionExpression') &&
    callback.params.length > 0 && callback.params[0].name
}
/**
 * @fileoverview Disallow promises without done.fail
 * @author Yaara Cohen
 */
module.exports = function (context) {
  var isInsideSpec = false
  var asyncParam
  return {
    CallExpression: function (node) {
      if (isSpec(node)) {
        isInsideSpec = true
        asyncParam = getDoneParamName(node)
      }

      if (isInsideSpec && asyncParam && isPromiseThenWithoutCatch(node, asyncParam)) {
        context.report(genReport(node, context))
      }
    },
    'CallExpression:exit': function (node) {
      if (isSpec(node)) {
        isInsideSpec = false
        asyncParam = undefined
      }
    }
  }
}
