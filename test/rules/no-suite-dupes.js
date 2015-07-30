'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');

var eslintTester = new ESLintTester(linter);

/*
 * Generate readble code lines block
 * // description
 * lines[0]
 * lines[1]
 * ...
 * lines[n]
 */
function toCode(lines, description) {
  return (description ? '// ' + description : '') + '\n' + lines.join('\n');
}

eslintTester.addRuleTest('lib/rules/no-suite-dupes', {
  valid: [
    // default
    toCode([
      'describe("The first suite name", function() {}); ',
      'describe("The second suite name", function() {})'
    ]),
    {
      code: toCode([
        'describe("Some context", function() {',
        '  // it(...',
        '});',
        'describe("Different context", function() {',
        '  // it(...',
        '});'
      ], 'same it in different context')
    },

    // 'block'
    {
      args: [
        2,
        'block'
      ],
      code: toCode([
        'describe("The first suite name", function() {}); ',
        'describe("The second suite name", function() {})'
      ])
    },

    // 'branch'
    {
      args: [
        2,
        'branch'
      ],
      code: toCode([
        'describe("The first suite name", function() {}); ',
        'describe("The second suite name", function() {})'
      ])
    },
    {
      args: [
        2,
        'branch'
      ],
      code: toCode([
        'describe("unique", function(){',
        '  // it(...',
        '});',
        'describe("different", function(){',
        '  // it(...',
        '});'
      ], 'same block in different parent blocks')
    },
    {
      args: [
        2,
        'branch'
      ],
      code: toCode([
        'describe("context", function(){',
        '  describe("unique", function(){',
        '    // it(...',
        '  });',
        '  describe("different", function(){',
        '    // it(...',
        '  });',
        '});'
      ], 'difference in middle-nest block')
    },
    {
      args: [
        2,
        'branch'
      ],
      code: toCode([
        'describe("same", function(){',
        '  describe("same", function(){',
        '    // it(...',
        '  });',
        '});'
      ])
    }
  ],
  invalid: [
    {
      // default
      code: toCode([
        'describe("Same suite name", function() {});',
        'describe("Same suite name", function() {})'
      ]),
      errors: [
        {
          message: 'Duplicate suite: "Same suite name"',
          type: 'CallExpression'
        }
      ]
    },

    // 'block'
    {
      args: [
        2,
        'block'
      ],
      code: toCode([
        'describe("Same suite name", function() {}); ',
        'describe("Same suite name", function() {})'
      ]),
      errors: [
        {
          message: 'Duplicate suite: "Same suite name"',
          type: 'CallExpression'
        }
      ]
    },
    {
      args: [
        2,
        'block'
      ],
      code: toCode([
        'describe("Parent context", function(){',
        '  describe("Same block", function(){',
        '    describe("Same block", function(){',
        '      // it(...',
        '    });',
        '  });',
        '});'
      ], 'same block withing the same branch'),
      errors: [
        {
          message: 'Duplicate suite: "Same block"',
          type: 'CallExpression'
        }
      ]
    },

    // 'branch'
    {
      args: [
        2,
        'branch'
      ],
      code: toCode([
        'describe("Same suite name", function() {}); ',
        'describe("Same suite name", function() {})'
      ], 'same blocks'),
      errors: [
        {
          message: 'Duplicate suite: "Same suite name"',
          type: 'CallExpression'
        }
      ]
    },
    {
      args: [
        2,
        'branch'
      ],
      code: toCode([
        'describe("parent context", function(){',
        '  describe("same", function(){',
        '    // it(...',
        '  });',
        '  describe("same", function(){',
        '    // it(...',
        '  });',
        '});'
      ], 'same block in different contexts'),
      errors: [
        {
          message: 'Duplicate suite: "parent context same"',
          type: 'CallExpression'
        }
      ]
    },
    {
      args: [
        2,
        'branch'
      ],
      code: toCode([
        'describe("parent context", function(){',
        '  describe("same", function(){',
        '    // it(...',
        '  });',
        '  describe("same", function(){',
        '    // it(...',
        '  });',
        '});'
      ], 'same block in the middle of branches'),
      errors: [
        {
          message: 'Duplicate suite: "parent context same"',
          type: 'CallExpression'
        }
      ]
    }
  ]
});
