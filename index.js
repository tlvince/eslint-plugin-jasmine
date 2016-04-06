'use strict'

module.exports = {
  rules: {
    'named-spy': require('./lib/rules/named-spy'),
    'no-focused-tests': require('./lib/rules/no-focused-tests'),
    'no-disabled-tests': require('./lib/rules/no-disabled-tests'),
    'no-suite-dupes': require('./lib/rules/no-suite-dupes'),
    'no-spec-dupes': require('./lib/rules/no-spec-dupes'),
    'missing-expect': require('./lib/rules/missing-expect'),
    'no-suite-callback-args': require('./lib/rules/no-suite-callback-args'),
    'valid-expect': require('./lib/rules/valid-expect'),
    'no-assign-spyon': require('./lib/rules/no-assign-spyon')
  },
  configs: {
    recommended: {
      rules: {
        'jasmine/named-spy': 0,
        'jasmine/no-focused-tests': 2,
        'jasmine/no-disabled-tests': 1,
        'jasmine/no-suite-dupes': 1,
        'jasmine/no-spec-dupes': 1,
        'jasmine/missing-expect': 0,
        'jasmine/no-suite-callback-args': 2,
        'jasmine/valid-expect': 1,
        'jasmine/no-assign-spyon': 0
      }
    }
  }
}
