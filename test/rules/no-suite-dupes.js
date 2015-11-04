'use strict'

var rule = require('../../lib/rules/no-suite-dupes')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

/*
 * Generate readble code lines block
 * // description
 * lines[0]
 * lines[1]
 * ...
 * lines[n]
 */
function toCode (lines, description) {
  return (description ? '// ' + description : '') + '\n' + lines.join('\n')
}

eslintTester.run('no-suite-dupes', rule, {
  valid: [
    // default
    toCode([
      'describe("The first suite name", function() {}); ',
      'describe("The second suite name", function() {})'
    ]),
    toCode([
      'unrelated("The first spec name", function() {}); ',
      'unrelated("The second spec name", function() {})'
    ], 'unrelated'),
    toCode([
      // used to cause bug
      'justAFunction();'
    ], 'a regular function'),
    toCode([
      'describe("Handling" + " string " + "concatenation", function() {}); ',
      'describe("Handling" + " it good", function() {})'
    ], 'description is concatenated string'),
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
      options: [
        'block'
      ],
      code: toCode([
        'describe("The first suite name", function() {}); ',
        'describe("The second suite name", function() {})'
      ])
    },

    // 'branch'
    {
      options: [
        'branch'
      ],
      code: toCode([
        'describe("The first suite name", function() {}); ',
        'describe("The second suite name", function() {})'
      ])
    },
    {
      options: [
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
      options: [
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
      options: [
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
    {
      code: toCode([
        'describe("Handling" + " string " + "concatenation", function() {}); ',
        'describe("Handling string concatenation", function() {})'
      ], 'description is concatenated string'),
      errors: [
        {
          message: 'Duplicate suite: "Handling string concatenation"',
          type: 'CallExpression'
        }
      ]
    },

    // 'block'
    {
      options: [
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
      options: [
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
      options: [
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
      options: [
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
      options: [
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
})
