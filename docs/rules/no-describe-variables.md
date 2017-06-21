# Disallow variables in describe blocks (no-describe-variables)

Using variables in describe blocks in jasmine can cause memory leaks, e.g.:

```js
describe('Memory leak', function() {

  var a;

  beforeEach(function() {
    a = new Array(10000000).join('a');
  });

  it('test', function() {
    expect(a).toBeDefined();
  });
});
```

Due to internal design of the library such variables can not be collected by the 
garbage collector. Instead the suggested pattern to use is:

```js
describe('Memory leak', function() {

  beforeEach(function() {
    this.a = new Array(10000000).join('a');
  });

  it('test', function() {
    expect(this.a).toBeDefined();
  });
});
```

## Rule details

The following are considered warnings:

```js
describe('Foo', function() {
  
  var foo;

  beforeEach(function () {
    foo = new Foo();
  });

  it('works', function () {
    expect(foo).toBeDefined();
  });

});
```

The following patterns are not warnings:

```js
describe('Bar', function() {

  beforeEach(function () {
    this.bar = new Bar();
  });

  it('works', function () {
    expect(this.bar).toBeDefined();
  });

});
```
