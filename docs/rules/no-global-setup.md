# Disallow using setup and teardown methods outside a suite

Make sure that all uses of the global `beforeEach`, `afterEach`, `beforeAll`, and `afterAll` methods are within a suite.

The only appropriate use of these methods in a global context is within jasmine helpers where the intent of the global definition is explicit (e.g. setting up globally applied matchers).
See example: [/jasmine/jasmine/lib/jasmine-core/example/node_example/spec/helpers/jasmine_examples/SpecHelper.js](https://github.com/jasmine/jasmine/blob/8624a52ee0b6f13b3b608ea6417ccc02257c5412/lib/jasmine-core/example/node_example/spec/helpers/jasmine_examples/SpecHelper.js)

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
