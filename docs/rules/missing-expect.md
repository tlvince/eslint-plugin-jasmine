# Enforce expectation (missing-expect)

A test which doesn't make any expectations doesn't really test anything.

## Rule details

This rule triggers a warning if no expectations are made. This rule is disabled
by default.

An array of expect function names may be passed to the configuration of this
rule. By default only `expect` is used.

### Default configuration

The following patterns are considered warnings:

```js
it('should do something', function() {});
```

The following patterns are not warnings:

```js
it('should do something', function() {
  expect(something).toBeDone();
});
```

### AngularJS `$httpBackend` example

#### configuration

```yaml
rules:
  missing-expect:
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
