'use strict'

/**
  * @fileoverview Enforce new line before expect inside a suite
  * @author Diana Suvorova
*/

var hasPaddingBetweenTokens = require('../helpers/hasPaddingBetweenTokens')
var getPrevTokensOnLine = require('../helpers/getPrevTokensOnLine')
var getLineIndentation = require('../helpers/getLineIndentation')

var blockRegexp = /^((f|x)?(it|describe))$/

module.exports = {
  meta: {
    fixable: 'whitespace'
  },
  create: function (context) {
    var suiteDepth = 0
    var lastExpectNode
    return {
      CallExpression: function (node) {
        if (blockRegexp.test(node.callee.name)) {
          lastExpectNode = null
          suiteDepth++
        } else if (node.callee.name === 'expect' && suiteDepth > 0) {
          if (lastExpectNode && linesDelta(node, lastExpectNode) === 1) {
            lastExpectNode = node
            return
          }
          lastExpectNode = node
          var sourceCode = context.getSourceCode()
          let prevToken = sourceCode.getTokenBefore(node)
          if (prevToken.value === 'await' || prevToken.value === 'return') {
            node = prevToken
            prevToken = sourceCode.getTokenBefore(prevToken)
          }
          if (prevToken) {
            if (prevToken.type === 'Punctuator' && prevToken.value === '{') {
              return
            }
            if (!hasPaddingBetweenTokens(prevToken, node) && isFirstExpectOnLine(node, sourceCode)) {
              context.report({
                fix (fixer) {
                  return fixer.replaceTextRange(
                    [prevToken.range[1], node.range[1]],
                    ['\n\n', withIndentation(node, sourceCode)].join('')
                  )
                },
                message: 'No new line before expect',
                node
              })
            }
          }
        }
      },
      'CallExpression:exit': function (node) {
        if (blockRegexp.test(node.callee.name)) {
          suiteDepth--
        }
      }
    }
  }
}

function linesDelta (node1, node2) {
  return Math.abs(node1.loc.start.line - node2.loc.start.line)
}

function isFirstExpectOnLine (node, sourceCode) {
  return getPrevTokensOnLine(node, sourceCode)
    .filter(token => token.value === 'expect')
    .length === 0
}

function withIndentation (node, sourceCode) {
  const indentation = getLineIndentation(node, sourceCode)
  const text = [sourceCode.getText(node)]
  for (var i = 0; i < indentation; i++) {
    text.unshift(' ')
  }
  return text.join('')
}
