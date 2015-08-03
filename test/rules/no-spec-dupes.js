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

eslintTester.addRuleTest('lib/rules/no-spec-dupes', {
  valid: [
    // default
    toCode([
      'it("The first spec name", function() {}); ',
      'it("The second spec name", function() {})'
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
      'it("Handling" + " string " + "concatenation", function() {}); ',
      'it("Handling" + " it good", function() {})'
    ], 'description is concatenated string'),
    {
      code: toCode([
        'describe("context", function() {',
        '  it("different", function(){});',
        '});',
        'describe("context", function() {',
        '  it("unique", function(){});',
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
        'it("The first spec name", function() {}); ',
        'it("The second spec name", function() {})'
      ])
    },

    // 'branch'
    {
      args: [
        2,
        'branch'
      ],
      code: toCode([
        'describe("The first spec name", function() {}); ',
        'describe("The second spec name", function() {})'
      ])
    },
    {
      args: [
        2,
        'branch'
      ],
      code: toCode([
        'describe("unique", function(){',
        '  it("spec", function(){});',
        '});',
        'describe("different", function(){',
        '  it("spec", function(){});',
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
        '    it("spec", function(){});',
        '  });',
        '  describe("different", function(){',
        '    it("spec", function(){});',
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
        '    it("spec", function(){});',
        '  });',
        '});'
      ])
    },
    {
      args: [
        2,
        'branch'
      ],
      code: toCode([
        'describe("same", function(){',
        '  describe("same", function(){',
        '    it("different", function(){});',
        '  });',
        '  describe("same", function(){',
        '    it("unique", function(){});',
        '  });',
        '});'
      ], 'same branch until spec')
    }
  ],
  invalid: [
    {
      // default
      code: toCode([
        'it("Same spec name", function() {});',
        'it("Same spec name", function() {})'
      ]),
      errors: [
        {
          message: 'Duplicate spec: "Same spec name"',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: toCode([
        'it("Handling" + " string " + "concatenation", function() {}); ',
        'it("Handling string concatenation", function() {})'
      ], 'description is concatenated string'),
      errors: [
        {
          message: 'Duplicate spec: "Handling string concatenation"',
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
        'it("Same spec name", function() {}); ',
        'it("Same spec name", function() {})'
      ]),
      errors: [
        {
          message: 'Duplicate spec: "Same spec name"',
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
        '  describe("Same parent", function(){',
        '    it("Same spec", function(){});',
        '  });',
        '  describe("Same parent", function(){',
        '    it("Same spec", function(){});',
        '  });',
        '});'
      ], 'same specs withing the same branch'),
      errors: [
        {
          message: 'Duplicate spec: "Same spec"',
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
        'it("Spec name", function() {}); ',
        'it("Spec name", function() {})'
      ], 'same specs at root'),
      errors: [
        {
          message: 'Duplicate spec: "Spec name"',
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
        '    it("spec", function(){});',
        '  });',
        '  describe("same", function(){',
        '    it("spec", function(){});',
        '  });',
        '});'
      ], 'same spec in different contexts'),
      errors: [
        {
          message: 'Duplicate spec: "parent context same spec"',
          type: 'CallExpression'
        }
      ]
    }
  ]
});
