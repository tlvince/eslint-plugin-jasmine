'use strict'

/**
  * @fileoverview Enforce the starting case of the first character of
  * an it statement to either be lowercase or uppercase.
  * @author rabbidkitten, Elliot Nelson
 */

function getStringLiteralNode (node) {
  // Raw string literals and straightforward string concatenation is safe to
  // verify and fix. Anything more complex and we may draw incorrect conclusions
  // (and probably can't auto-fix).
  if (node.value) {
    return node
  } else if (node.left) {
    return getStringLiteralNode(node.left)
  } else {
    return undefined
  }
}

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
        if (node.callee.name === 'it' || node.callee.name === 'fit' || node.callee.name === 'xit') {
          if (node.arguments.length >= 1) {
            var valueNode = getStringLiteralNode(node.arguments[0])
            var value = valueNode ? valueNode.value : undefined

            if (value && value.length > 0) {
              if (always && value.charAt(0).toUpperCase() !== value.charAt(0)) {
                context.report({
                  message: 'Spec must start with an upper case letter',
                  node,
                  fix: function (fixer) {
                    return fixer.replaceTextRange([valueNode.start + 1, valueNode.start + 2], value.charAt(0).toUpperCase())
                  }
                })
              } else if (!always && value.charAt(0).toLowerCase() !== value.charAt(0)) {
                context.report({
                  message: 'Spec must start with a lower case letter',
                  node,
                  fix: function (fixer) {
                    return fixer.replaceTextRange([valueNode.start + 1, valueNode.start + 2], value.charAt(0).toLowerCase())
                  }
                })
              }
            }
          }
        }
      }
    }
  }
}
