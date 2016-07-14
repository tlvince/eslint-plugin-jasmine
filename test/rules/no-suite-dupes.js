'use strict'

var rule = require('../../lib/rules/no-suite-dupes')
var linesToCode = require('../helpers/lines_to_code')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-suite-dupes', rule, {
  valid: [
    // default
    linesToCode([
      'describe("The first suite name", function() {}); ',
      'describe("The second suite name", function() {})'
    ]),
    linesToCode([
      'unrelated("The first spec name", function() {}); ',
      'unrelated("The second spec name", function() {})'
    ], 'unrelated'),
    linesToCode([
      // used to cause bug
      'justAFunction();'
    ], 'a regular function'),
    linesToCode([
      'describe("Handling" + " string " + "concatenation", function() {}); ',
      'describe("Handling" + " it good", function() {})'
    ], 'description is concatenated string'),
    {
      code: linesToCode([
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
      code: linesToCode([
        'describe("The first suite name", function() {}); ',
        'describe("The second suite name", function() {})'
      ])
    },

    // 'branch'
    {
      options: [
        'branch'
      ],
      code: linesToCode([
        'describe("The first suite name", function() {}); ',
        'describe("The second suite name", function() {})'
      ])
    },
    {
      options: [
        'branch'
      ],
      code: linesToCode([
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
      code: linesToCode([
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
      code: linesToCode([
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
      code: linesToCode([
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
      code: linesToCode([
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
      code: linesToCode([
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
      code: linesToCode([
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
      code: linesToCode([
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
      code: linesToCode([
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
      code: linesToCode([
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
