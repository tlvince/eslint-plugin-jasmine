# Discourage making expectations in setup and teardown functions (no-expect-in-setup-teardown)

Making expectations inside test setup or teardown functions is sometimes a sign of a bad test design.

It might negatively impact readability as a reader might think you have the actual test logic splattered between setup, teardown and the test functions themselves.

Sometimes there is actually a need to test the result of a setup/teardown function call. In cases like these, it is recommended to create a separate test to test the setup/teardown process.

## Rule details

This rule triggers a warning if there is an `expect()` call inside `beforeEach()`, `afterEach()`, `beforeAll()` and `afterAll()`. 

An array of expect function names may be passed to the configuration of this rule. By default only `expect()` is used.

The following patterns are considered warnings:

```js
beforeEach(function() { expect(true).toBe(true); });
afterEach(function() { expect(true).toBe(true); });
beforeAll(function() { expect(true).toBe(true); });
afterAll(function() { expect(true).toBe(true); });
```

The following patterns are not warnings:

```js
beforeEach(function() { someOtherFunction(); });
afterEach(function() {});
beforeAll(function() { someOtherFunction(); });
afterAll(function() {});
```

### AngularJS `$httpBackend` rule configuration example

```yaml
rules:
  no-expect-in-setup-teardown:
    - 2
    - expect()
    - $httpBackend.expect()
    - $httpBackend.expectDELETE()
    - $httpBackend.expectGET()
    - $httpBackend.expectJSONP()
    - $httpBackend.expectHEAD()
    - $httpBackend.expectPATCH()
    - $httpBackend.expectPOST()
    - $httpBackend.expectPUT()
```
