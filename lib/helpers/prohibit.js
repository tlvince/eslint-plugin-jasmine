'use strict'

module.exports = function (prohibiteds, context) {
  var regex = new RegExp('^(' + prohibiteds.join('|') + ')$')

  return {
    'CallExpression': function (node) {
      var result = node.callee && node.callee.name && node.callee.name.match(regex)

      if (result) {
        context.report(node, 'Unexpected {{name}}.', {
          name: result[1]
        })
      }
    }
  }
}
