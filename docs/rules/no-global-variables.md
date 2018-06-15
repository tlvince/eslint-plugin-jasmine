# Disallow using variables declaration outside in the module scope (no-global-variables).

Make sure that there is no shared variables accross the tests that are declared in the module scope.

## Rule details

The following are considered warnings:

```js
const store = configureStore({
	...
});

describe('My suite', () => {
	it('test that uses store', () => {    
    ...
  });
  it('test that uses store form the previous test', () => {
    ...
	});
});
```

The following patterns are not warnings:

```js
var smth = require('smth')

function createTheStore() { ... }

describe(function() {
  it('...');
})
```
