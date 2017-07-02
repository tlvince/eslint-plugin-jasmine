'use strict'

module.exports = {
  rules: {
    'named-spy': require('./lib/rules/named-spy'),
    'no-focused-tests': require('./lib/rules/no-focused-tests'),
    'no-disabled-tests': require('./lib/rules/no-disabled-tests'),
    'no-describe-variables': require('./lib/rules/no-describe-variables'),
    'no-suite-dupes': require('./lib/rules/no-suite-dupes'),
    'no-spec-dupes': require('./lib/rules/no-spec-dupes'),
    'missing-expect': require('./lib/rules/missing-expect'),
    'no-suite-callback-args': require('./lib/rules/no-suite-callback-args'),
    'valid-expect': require('./lib/rules/valid-expect'),
    'no-assign-spyon': require('./lib/rules/no-assign-spyon'),
    'no-unsafe-spy': require('./lib/rules/no-unsafe-spy'),
    'no-global-setup': require('./lib/rules/no-global-setup'),
    'no-expect-in-setup-teardown': require('./lib/rules/no-expect-in-setup-teardown'),
    'new-line-between-declarations': require('./lib/rules/new-line-between-declarations'),
    'new-line-before-expect': require('./lib/rules/new-line-before-expect'),
    'prefer-jasmine-matcher': require('./lib/rules/prefer-jasmine-matcher')
  },
  configs: {
    recommended: {
      rules: {
        'jasmine/named-spy': 0,
        'jasmine/no-focused-tests': 2,
        'jasmine/no-disabled-tests': 1,
        'jasmine/no-describe-variables': 0,
        'jasmine/no-suite-dupes': 1,
        'jasmine/no-spec-dupes': 1,
        'jasmine/missing-expect': 0,
        'jasmine/no-suite-callback-args': 2,
        'jasmine/valid-expect': 1,
        'jasmine/no-assign-spyon': 0,
        'jasmine/no-unsafe-spy': 1,
        'jasmine/no-global-setup': 2,
        'jasmine/no-expect-in-setup-teardown': 1,
        'jasmine/new-line-between-declarations': 1,
        'jasmine/new-line-before-expect': 1,
        'jasmine/prefer-jasmine-matcher': 1
      }
    }
  }
}
