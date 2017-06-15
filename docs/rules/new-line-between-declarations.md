# Enforce new line between declarations inside a suite

Jasmine uses `describe` to begin and name a test suite.
For readability purposes this rule enforces that there is a new line between declarations within a suite.
Declarations are `it`, `describe`, `beforeEach`, `afterEach`, `beforeAll`, `afterAll`

## Rule details

This rule triggers a **warning** (is set to **1** by default) whenever it
encounters declarations not separated by a new line.


The following patterns are considered warnings:

```js
describe("", function() {
  it("", function(){});
  it("", function(){});
});
```

```js
describe("", function() {
  beforeEach("", function(){});
  it("", function(){});
});
```
```js
describe("", function() {
  describe("", function() {});
  describe("", function() {});
});
```

The following patterns are not warnings:

```js
describe("", function() {
  describe("", function(){});
});
```

```js
describe("", function() {
  it("", function(){});

  it("", function(){});
});
```

```js
describe("", function() {
  it("", function(){});
});
describe("", function() {});
```

```js
describe("", function() {
  var a = 1;
  beforeEach(() => {})

  it("", function(){});
});
```
