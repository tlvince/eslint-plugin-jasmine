'use strict';

module.exports = {
  rules: {
    'no-exclusive-tests': require('./lib/rules/no-exclusive-tests')
  },
  rulesConfig: {
    'no-exclusive-tests': 2
  }
};
