'use strict';

module.exports = {
  rules: {
    'no-focused-tests': require('./lib/rules/no-focused-tests'),
    'no-disabled-tests': require('./lib/rules/no-disabled-tests'),
    'no-suite-dupes': require('./lib/rules/no-suite-dupes'),
    'no-spec-dupes': require('./lib/rules/no-spec-dupes'),
    'missing-expect': require('./lib/rules/missing-expect')
  },
  rulesConfig: {
    'no-focused-tests': 2,
    'no-disabled-tests': 1,
    'no-suite-dupes': 1,
    'no-spec-dupes': 1,
    'missing-expect': 0
  }
};
