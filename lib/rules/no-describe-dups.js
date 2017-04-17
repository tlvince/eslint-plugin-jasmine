'use strict';

/**
 * @fileoverview Disallow the use of duplicate suite names
 * @author Alexander Afanasyev
 */

var linter = require("eslint").linter;

module.exports = function (context) {
  var check = function (node) {

    if (node.callee.name === "describe" && node.arguments) {
      var name = node.arguments[0].value;

      if (!linter.describeNames) {
        linter.describeNames = [name];
      } else {
        if (linter.describeNames.indexOf(name) !== -1) {
          context.report(node, "Duplicate describe name: '{{name}}'", {
            name: name
          });
        }
        linter.describeNames.push(name);
      }
    }
  };

  return {
    "CallExpression": check
  }
};
