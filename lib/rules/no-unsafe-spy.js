'use strict'

/**
 * @fileoverview Enforce spies to be declared in before/after/it blocks
 * @author Nicolas Fernandez @burabure
 */

var blocksWhitelistRegexp = /^(f|d|x)?(before\w+|after\w+|it)$/

function getParentJasmineBlock (ancestors) {
  for (var i = (ancestors.length - 1); i > 0; i--) {
    if (
      ancestors[i].type === 'CallExpression' &&
      blocksWhitelistRegexp.test(ancestors[i].callee.name)
    ) { return ancestors[i].callee.name }
  }
  return false
}

function create (context) {
  return {
    CallExpression: function (node) {
      if (
        node.callee.name !== 'spyOn' &&
        !(
          (node.callee.object && node.callee.object.name === 'jasmine') &&
          (
            (node.callee.property && node.callee.property.name === 'createSpy') ||
            (node.callee.property && node.callee.property.name === 'createSpyObj')
          )
        )
      ) { return }

      const ancestors = context.sourceCode
        ? context.sourceCode.getAncestors(node)
        : context.getAncestors()

      if (blocksWhitelistRegexp.test(getParentJasmineBlock(ancestors))) { return }

      context.report({
        message: 'Spy declared outside of before/after/it block',
        node
      })
    }
  }
}

module.exports = {
  create
}
