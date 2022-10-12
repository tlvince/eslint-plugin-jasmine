'use strict'

/**
 * @fileoverview Prefer toBeTrue instead of toBe(true)
 * @author Osama Yousry
 */

module.exports = {
  meta: {
    schema: [
      {
        enum: ['always', 'never']
      }
    ],
    fixable: 'code'
  },
  create: function (context) {
    const always = context.options[0] !== 'never'

    return {
      CallExpression: function (node) {
        if (always) {
          if (node.callee.type === 'MemberExpression' && node.callee.property.name === 'toBe' &&
              node.arguments[0] && node.arguments[0].type === 'Literal' && node.arguments[0].value === true) {
            context.report({
              message: 'Prefer toBeTrue() to expect true',
              node: node.callee.property,
              fix: function (fixer) {
                if (node.arguments.length === 1) {
                  return fixer.replaceTextRange([node.callee.property.start, node.arguments[0].end], 'toBeTrue(')
                } else {
                  return fixer.replaceTextRange([node.callee.property.start, node.arguments[1].start], 'toBeTrue(')
                }
              }
            })
          }
        } else {
          if (node.callee.type === 'MemberExpression' && node.callee.property.name === 'toBeTrue') {
            context.report({
              message: 'Prefer toBe(true) to expect true',
              node: node.callee.property,
              fix: function (fixer) {
                if (node.arguments.length === 0) {
                  return fixer.replaceTextRange([node.callee.property.start, node.end], 'toBe(true)')
                } else {
                  return fixer.replaceTextRange([node.callee.property.start, node.arguments[0].start], 'toBe(true, ')
                }
              }
            })
          }
        }
      }
    }
  }
}
