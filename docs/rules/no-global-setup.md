# Disallow using setup and teardown methods outside a suite

Make sure that all uses of the global `beforeEach`, `afterEach`, `beforeAll`, and `afterAll` methods are within a suite.

## Rule details

The following are considered warnings:

```js
beforeEach(function() { /* ... */ })

afterEach(function() { /* ... */ })

```

The following patterns are not warnings:

```js
describe(function() {
  beforeEach(function() { /* ... */ })
})
```
