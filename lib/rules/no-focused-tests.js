'use strict';

/**
 * @fileoverview Disallow the use of focused tests
 * @author Tom Vincent
 */

// Rule Definition
module.exports = function(context) {
  var prohibited = [
    'fdescribe',
    'ddescribe',
    'fit',
    'iit'
  ];

  // Helpers
  function matchProhibited(name) {
    var regex = new RegExp('^(' + prohibited.join('|') + ')$');
    return name.match(regex);
  }

  function report(context, node, result) {
    context.report(node, 'Unexpected {{name}}.', {
      name: result[1]
    });
  }

  // Public
  return {
    'Identifier': function(node) {
      var result = matchProhibited(node.name);
      if (result) {
        report(context, node, result);
      }
    }
  };
};
