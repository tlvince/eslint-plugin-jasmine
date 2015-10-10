# Enforce that a suites's callback does not contain any arguments

Jasmine's specs takes an argument, normally called `done`, to enable
asynchronous testing. However, a suite is only a name or title, and contains
only specs, on assertions or expectations.

Having a suite's callback take an argument and calling that in in a spec to
indicate completion of an asynchronous test is an error, and may cause
confusing errors in other parts of the code du to it's asynchronous nature

## Rule details

This rule triggers an **error** (is set to **2** by default) whenever it
encounters a suite's (`describe`) callback receiving an argument.

The following patterns are considered errors:

```js
describe('A suite', function(done) {});

describe('A suite', function(done) {
  it('A spec', function() {});
});

describe('A suite', function(done) {
  it('A spec', function(done) {});
});

describe('A suite', function(done) {
  it('A spec', function(done) {
    done();
  });
});

fdescribe('A suite', function(done) {});

ddescribe('A suite', function(done) {});

xdescribe('A suite', function(done) {});
```

The following patterns are not warnings:

```js
describe('My suite', function() {});

describe('My suite', function() {
  it('My spec', function() {});
});

describe('My suite', function() {
  it('My spec', function(done) {});
});

describe('My suite', function() {
  it('My spec', function(done) {
    done();
  });
});

fdescribe('My suite', function() {});

ddescribe('My suite', function() {});

xdescribe('My suite', function() {});
```
