'use strict';

/**
 * @fileoverview Disallow the use of duplicate suite names
 * @author Alexander Afanasyev
 */
var suites = [];

module.exports = function(context) {
  return {
    'CallExpression': function(node) {
      if (node.callee.name !== 'describe' || !node.arguments) {
        return;
      }

      var suite = node.arguments[0].value;

      if (suites.indexOf(suite) !== -1) {
        context.report(node, 'Duplicate suite: "{{suite}}"', {
          suite: suite
        });
      }

      suites.push(suite);
    }
  };
};
