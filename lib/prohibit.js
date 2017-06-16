'use strict'

module.exports = function (prohibiteds, context) {
  var regex = new RegExp('^(' + prohibiteds.join('|') + ')$')

  var filterByNodeType = function (allowedNodeTypes) {
    return function (node) {
      return allowedNodeTypes.indexOf(node.type) > -1
    }
  }
  var sortByProperty = function (propertyName) {
    return function (a, b) {
      if (a[propertyName] === b[propertyName]) {
        return 0
      }
      return a[propertyName] > b[propertyName] ? 1 : -1
    }
  }
  var wrapIn = function (wrapperStart, wrapperEnd) {
    return function (value) {
      return wrapperStart + value + (wrapperEnd || wrapperStart)
    }
  }

  var stringifyLiterals = function (node) {
    switch (node.type) {
      case 'Literal':
        return wrapIn('"')(node.value)
      case 'TemplateLiteral':
        return wrapIn('`')([]
          .concat(node.expressions)
          .concat(node.quasis)
          .sort(sortByProperty('start'))
          .map(stringifyTemplateLiteralComponent)
          .join(''))
    }
  }

  var stringifyTemplateLiteralComponent = function (node) {
    switch (node.type) {
      case 'TemplateElement':
        return node.value.cooked

      // Expressions
      case 'Identifier':
        return wrapIn('${ ', ' }')(node.name)
      default:
        return wrapIn('${ ', ' }')('<expression>')
    }
  }

  return {
    'CallExpression': function (node) {
      var result = node.callee && node.callee.name && node.callee.name.match(regex)

      if (result) {
        context.report(node, 'Unexpected {{name}}({{arg}})', {
          name: result[1],
          arg: node.arguments
            .filter(filterByNodeType([
              'Literal',
              'TemplateLiteral'
            ]))
            .map(stringifyLiterals)
            .join()
        })
      }
    }
  }
}
