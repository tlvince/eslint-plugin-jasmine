'use strict';

/**
 * @fileoverview Enforce a limit on the number of test cases in a suite of specs
 * @author Laurence Dusoswa
 *
 * options (JSON):
 *  "jasmine/spec-test-case-limit": [
 *       1,
 *      {
 *        "maxNumTestCases": 15, // maximum number of test cases allowed in a Spec
 *        "specFilenameExtension": "e2e-spec.js" // basic string which will be used as a partial match for specs
 *      }
 *  ]
 */

module.exports = {

  meta: {
    docs: {
      description: 'prevents specs from growing too large. mainly for e2e tests but can be used for unit tests also',
      category: 'Efficiency',
      recommended: false
    },
    fixable: 'code',
    schema: [
      {
        'type': 'object',
        'properties': {
          'maxNumTestCases': {
            'type': 'integer'
          }
        }
      },
      {
        'type': 'object',
        'properties': {
          'specFilenameExtension': {
            'type': 'string'
          }
        }
      }
    ]
  },

  create: function (context) {
    let testCaseCount = 0;
    let options = context.options[0];
    let specFilenameExtension = new RegExp(options.specFilenameExtension, 'g');
    let specFilename = context.getFilename();
    if (!specFilename.match(specFilenameExtension)) {
      return false;
    }

    return {
    return {
      Identifier: function (node) {
        if (node.name === 'it' && testCaseCount <= options.maxNumTestCases) {
          testCaseCount += 1;
          if (testCaseCount > options.maxNumTestCases) {
            context.report({
              message: 'Spec ' + specFilename + ' contains more than ' + options.maxNumTestCases + ' test cases',
              node
            })
          }
        }
      }
    };
  }
};
