'use strict';

/**
 * @fileoverview Disallow the use of duplicate suite names
 * @author Alexander Afanasyev
 */
var names = [];

module.exports = function(context) {
  return {
    'CallExpression': function(node) {
      if (node.callee.name !== 'describe' || !node.arguments) {
        return;
      }

      var name = node.arguments[0].value;

      if (names.indexOf(name) !== -1) {
        context.report(node, 'Duplicate describe name: "{{name}}"', {
          name: name
        });
      }

      names.push(name);
    }
  };
};
