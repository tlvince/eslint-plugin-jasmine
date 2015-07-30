'use strict';

/**
 * @fileoverview Disallow the use of duplicate suite names
 * @author Alexander Afanasyev
 */
module.exports = function(context) {
  var suites = [];
  var branch = [];
  var branchMode = context.options[0] === 'branch';

  function notJasmine(node) {
    return node.callee.name !== 'describe' || !node.arguments;
  }

  return {
    'CallExpression': function(node) {
      if (notJasmine(node)) {
        return;
      }

      var block = node.arguments[0].value;
      var suite;

      if (branchMode) {
        branch.push(block);
        suite = branch.join(' ');
      } else {
        suite = block;
      }

      if (suites.indexOf(suite) !== -1) {
        context.report(node, 'Duplicate suite: "{{suite}}"', {
          suite: suite
        });
      }

      suites.push(suite);
    },
    'CallExpression:exit': function(node) {
      if (notJasmine(node)) {
        return;
      }

      if (branchMode) {
        branch.pop();
      }
    }
  };
};

module.exports.schema = [
  {
    enum: [
      'block',
      'branch'
    ]
  }
];
